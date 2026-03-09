import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

const SESSION_COOKIE = "cms_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function generateToken() {
    return crypto.randomBytes(32).toString("hex");
}

export async function POST(request: NextRequest) {
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
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        const token = generateToken();
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
    const session = cookieStore.get(SESSION_COOKIE);
    return NextResponse.json({ authenticated: !!session?.value });
}
