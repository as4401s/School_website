/**
 * Server-side CMS auth helpers shared across all API routes.
 * Centralises token validation and safe filename checking.
 */
import { cookies } from "next/headers";
import path from "node:path";
import { validateSessionToken } from "./cms-security";

/** Validates the CMS session cookie using HMAC signature. */
export async function checkCmsAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get("cms_session")?.value;
    if (!token) return false;
    return validateSessionToken(token);
}

/**
 * Validates that a filename from user input is safe to use within a directory.
 * Prevents path traversal attacks (e.g. ../../etc/passwd).
 *
 * Returns { ok: true, filePath } or { ok: false, error }.
 */
export function safeFilePath(
    fileName: string | null | undefined,
    contentDir: string
): { ok: true; filePath: string } | { ok: false; error: string } {
    if (!fileName) {
        return { ok: false, error: "File name required" };
    }

    // Allow only safe filename characters — no path separators or dots at start
    if (!/^[a-zA-Z0-9._-]+$/.test(fileName)) {
        return { ok: false, error: "Invalid file name" };
    }

    const resolved = path.resolve(contentDir, fileName);

    // Must stay inside contentDir
    if (!resolved.startsWith(path.resolve(contentDir) + path.sep)) {
        return { ok: false, error: "File path outside allowed directory" };
    }

    return { ok: true, filePath: resolved };
}
