import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
    createSessionToken,
    validateSessionToken,
    checkRateLimit,
    recordFailedAttempt,
    clearRateLimit,
} from "@/lib/cms-security";

const SESSION_COOKIE = "cms_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getClientIp(request: NextRequest): string {
    return (
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        request.headers.get("x-real-ip") ||
        "unknown"
    );
}

export async function POST(request: NextRequest) {
    const ip = getClientIp(request);

    // Rate limit check
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

            // Tell the client how many attempts remain
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

        // Success — clear rate limit and issue HMAC-signed token
        clearRateLimit(ip);
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
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    return NextResponse.json({ success: true });
}

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    const authenticated = !!token && validateSessionToken(token);
    return NextResponse.json({ authenticated });
}
