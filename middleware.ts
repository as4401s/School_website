import { type NextRequest, NextResponse } from "next/server";

// Routes that require CMS authentication
const CMS_PROTECTED = [
    "/cms/dashboard",
    "/cms/gallery",
    "/cms/announcements",
    "/cms/careers",
    "/cms/documents",
    "/cms/news",
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect CMS dashboard pages — redirect to login if no session cookie present.
    // Full HMAC token validation still happens inside each API route handler.
    if (CMS_PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
        const session = request.cookies.get("cms_session");
        if (!session?.value) {
            const loginUrl = request.nextUrl.clone();
            loginUrl.pathname = "/cms";
            loginUrl.search = "";
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next({ request });
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
