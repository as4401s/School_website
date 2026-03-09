import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * HTTP security headers applied to every response.
 *
 * Content-Security-Policy
 *   Tells browsers which origins are allowed for scripts, styles, images, etc.
 *   - default-src 'self'      → block anything not listed below
 *   - script-src 'self' 'unsafe-inline' 'unsafe-eval'
 *                             → Next.js needs these for hydration/RSC;
 *                               scripts from any external domain are still blocked
 *   - style-src 'self' 'unsafe-inline'
 *                             → inline style props used throughout the site
 *   - img-src 'self' data: blob:
 *                             → same-origin images + blob: from image-compression util
 *   - media-src 'self' blob:  → gallery videos served from /media/cms/
 *   - font-src 'self'         → all fonts are self-hosted (next/font downloads
 *                               Google Fonts at build time, no runtime CDN call)
 *   - connect-src 'self'      → fetch() calls only reach our own API routes
 *   - frame-src 'none'        → this site never loads external iframes
 *   - frame-ancestors 'none'  → nobody can embed this site in their iframe
 *                               (clickjacking prevention — stronger than X-Frame-Options)
 *   - base-uri 'self'         → blocks <base> tag injection attacks
 *   - form-action 'self'      → form submissions can only go to our own origin
 *   - object-src 'none'       → blocks Flash / legacy plugin execution entirely
 *
 * X-Content-Type-Options: nosniff
 *   Stops the browser guessing MIME type. Without this, an uploaded file with a
 *   harmless extension could be executed as JavaScript.
 *
 * X-Frame-Options: DENY
 *   Legacy clickjacking protection for browsers that don't read the CSP header.
 *
 * Referrer-Policy: strict-origin-when-cross-origin
 *   Only sends the origin (not the full path/query) on cross-origin requests,
 *   so URL-embedded sensitive values don't leak to other sites.
 *
 * Permissions-Policy
 *   Explicitly disables APIs this site never uses (camera, mic, geolocation, etc.).
 *   Prevents a compromised script from silently accessing them.
 *
 * Strict-Transport-Security (production only)
 *   Forces HTTPS for 2 years, preventing protocol-downgrade MITM attacks.
 *   Skipped in development so http://localhost still works.
 *
 * X-DNS-Prefetch-Control: on
 *   Allows DNS pre-resolution for links on the page to speed up navigation.
 */
const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob: https://res.cloudinary.com",
            "media-src 'self' blob: https://res.cloudinary.com",
            "font-src 'self'",
            "connect-src 'self'",
            "frame-src https://maps.google.com https://www.google.com",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "object-src 'none'",
        ].join("; "),
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "Permissions-Policy",
        value: [
            "camera=()",
            "microphone=()",
            "geolocation=()",
            "payment=()",
            "usb=()",
            "bluetooth=()",
            "interest-cohort=()",
        ].join(", "),
    },
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    // HSTS only in production — sending it over http:// (dev) is harmful
    ...(isProd
        ? [
              {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
              },
          ]
        : []),
];

const nextConfig: NextConfig = {
    typedRoutes: true,
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "res.cloudinary.com" },
        ],
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
