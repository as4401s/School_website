import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
    createSessionToken,
    validateSessionToken,
    createPendingToken,
    validatePendingToken,
    verifyTOTP,
    isTOTPEnabled,
    checkRateLimit,
    recordFailedAttempt,
    clearRateLimit,
} from "@/lib/cms-security";

const SESSION_COOKIE = "cms_session";
const PENDING_COOKIE = "cms_totp_pending";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getClientIp(request: NextRequest): string {
    return (
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        request.headers.get("x-real-ip") ||
        "unknown"
    );
}

// ── Step 1: verify password ──────────────────────────────────────────────────
// POST { password } → { step: "totp" } or { success: true } (if TOTP disabled)

async function handlePasswordStep(request: NextRequest, ip: string) {
    const body = await request.json();
    const { password } = body;

    const cmsPassword = process.env.CMS_PASSWORD;
    if (!cmsPassword) {
        return NextResponse.json(
            { error: "CMS_PASSWORD not configured on server" },
            { status: 500 }
        );
    }

    if (password !== cmsPassword) {
        recordFailedAttempt(ip);
        const updated = checkRateLimit(ip);
        if (!updated.allowed) {
            const minutes = Math.ceil((updated.retryAfterSeconds ?? 0) / 60);
            return NextResponse.json(
                {
                    error: `Too many failed attempts. Locked out for ${minutes} minute${minutes !== 1 ? "s" : ""}.`,
                    lockedOut: true,
                    retryAfterSeconds: updated.retryAfterSeconds,
                },
                { status: 429 }
            );
        }
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Password correct
    clearRateLimit(ip);

    // If TOTP is not configured, skip to full session immediately
    if (!isTOTPEnabled()) {
        const token = createSessionToken();
        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: SESSION_MAX_AGE,
            path: "/",
        });
        return NextResponse.json({ success: true });
    }

    // Issue a short-lived pending cookie, ask client for TOTP code
    const pendingToken = createPendingToken();
    const cookieStore = await cookies();
    cookieStore.set(PENDING_COOKIE, pendingToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 5 * 60, // 5 minutes
        path: "/",
    });

    return NextResponse.json({ step: "totp" });
}

// ── Step 2: verify TOTP code ─────────────────────────────────────────────────
// POST { totp } → { success: true }

async function handleTOTPStep(request: NextRequest, ip: string) {
    const cookieStore = await cookies();
    const pendingToken = cookieStore.get(PENDING_COOKIE)?.value;

    // Pending cookie must exist and be valid (proves step 1 was passed)
    if (!pendingToken || !validatePendingToken(pendingToken)) {
        return NextResponse.json(
            { error: "Session expired. Please start over." },
            { status: 401 }
        );
    }

    const body = await request.json();
    const { totp } = body;

    if (!totp || !(await verifyTOTP(String(totp).replace(/\s/g, "")))) {
        recordFailedAttempt(ip);
        const updated = checkRateLimit(ip);
        if (!updated.allowed) {
            const minutes = Math.ceil((updated.retryAfterSeconds ?? 0) / 60);
            cookieStore.delete(PENDING_COOKIE);
            return NextResponse.json(
                {
                    error: `Too many failed attempts. Locked out for ${minutes} minute${minutes !== 1 ? "s" : ""}.`,
                    lockedOut: true,
                    retryAfterSeconds: updated.retryAfterSeconds,
                },
                { status: 429 }
            );
        }
        return NextResponse.json({ error: "Invalid code. Try again." }, { status: 401 });
    }

    // Both steps passed — issue full session
    clearRateLimit(ip);
    cookieStore.delete(PENDING_COOKIE);

    const token = createSessionToken();
    cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_MAX_AGE,
        path: "/",
    });

    return NextResponse.json({ success: true });
}

// ── Route handlers ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
    const ip = getClientIp(request);

    // Rate limit applies to both steps
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
        const minutes = Math.ceil((rateLimit.retryAfterSeconds ?? 0) / 60);
        return NextResponse.json(
            {
                error: `Too many failed attempts. Try again in ${minutes} minute${minutes !== 1 ? "s" : ""}.`,
                lockedOut: true,
                retryAfterSeconds: rateLimit.retryAfterSeconds,
            },
            { status: 429 }
        );
    }

    try {
        const url = new URL(request.url);
        const step = url.searchParams.get("step");

        if (step === "totp") {
            return await handleTOTPStep(request, ip);
        }
        return await handlePasswordStep(request, ip);
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    cookieStore.delete(PENDING_COOKIE);
    return NextResponse.json({ success: true });
}

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    const authenticated = !!token && validateSessionToken(token);
    return NextResponse.json({ authenticated });
}
