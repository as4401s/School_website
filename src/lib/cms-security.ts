import crypto from "node:crypto";
import { TOTP } from "otplib";

/**
 * Server-side session + rate limiting utilities for the CMS.
 * Tokens are HMAC-signed so they can be validated without a database.
 */

const SECRET = process.env.CMS_PASSWORD || "fallback-secret-do-not-use";

// ── HMAC-Signed Session Tokens ──

export function createSessionToken(): string {
    const payload = `cms_${Date.now()}_${crypto.randomBytes(16).toString("hex")}`;
    const hmac = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
    return `${payload}.${hmac}`;
}

export function validateSessionToken(token: string): boolean {
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return false;

    const payload = token.substring(0, dotIndex);
    const signature = token.substring(dotIndex + 1);

    const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");

    // Timing-safe comparison to prevent timing attacks
    if (signature.length !== expected.length) return false;
    try {
        return crypto.timingSafeEqual(
            Buffer.from(signature, "hex"),
            Buffer.from(expected, "hex")
        );
    } catch {
        return false;
    }
}

// ── Rate Limiting ──

type RateLimitEntry = {
    attempts: number;
    lockedUntil: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

/**
 * Check if an IP is currently rate-limited.
 * Returns { allowed: true } or { allowed: false, retryAfterSeconds }.
 */
export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
    const entry = rateLimitMap.get(ip);

    if (!entry) return { allowed: true };

    if (entry.lockedUntil > Date.now()) {
        const retryAfterSeconds = Math.ceil((entry.lockedUntil - Date.now()) / 1000);
        return { allowed: false, retryAfterSeconds };
    }

    // Lock expired, reset
    if (entry.lockedUntil > 0 && entry.lockedUntil <= Date.now()) {
        rateLimitMap.delete(ip);
        return { allowed: true };
    }

    return { allowed: true };
}

/**
 * Record a failed login attempt. Locks out after MAX_ATTEMPTS.
 */
export function recordFailedAttempt(ip: string): void {
    const entry = rateLimitMap.get(ip) || { attempts: 0, lockedUntil: 0 };
    entry.attempts += 1;

    if (entry.attempts >= MAX_ATTEMPTS) {
        entry.lockedUntil = Date.now() + LOCKOUT_MINUTES * 60 * 1000;
    }

    rateLimitMap.set(ip, entry);
}

/**
 * Clear rate limit for an IP after a successful login.
 */
export function clearRateLimit(ip: string): void {
    rateLimitMap.delete(ip);
}

// ── Input Sanitization ──

/**
 * Strip potentially dangerous HTML/script tags from text input.
 * Keeps text content, removes <script>, <iframe>, event handlers, etc.
 */
export function sanitizeText(input: string): string {
    return input
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
        .replace(/<object[\s\S]*?<\/object>/gi, "")
        .replace(/<embed[\s\S]*?>/gi, "")
        .replace(/<link[\s\S]*?>/gi, "")
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
        .replace(/javascript\s*:/gi, "")
        .trim();
}

/**
 * Sanitize bilingual text objects recursively.
 */
export function sanitizeBilingual(obj: { en?: string; bn?: string }): { en: string; bn: string } {
    return {
        en: sanitizeText(obj.en || ""),
        bn: sanitizeText(obj.bn || ""),
    };
}

// ── TOTP (Two-Factor Authentication) ──

/**
 * Verify a 6-digit TOTP code against the CMS_TOTP_SECRET env variable.
 * Uses a ±1 step window (30 seconds either side) to handle clock drift.
 */
export async function verifyTOTP(token: string): Promise<boolean> {
    const secret = process.env.CMS_TOTP_SECRET;
    if (!secret) return false;
    try {
        const totp = new TOTP();
        const result = await totp.verify(token, { secret, epochTolerance: 30 });
        return result.valid;
    } catch {
        return false;
    }
}

/** Returns true if CMS_TOTP_SECRET is configured on the server. */
export function isTOTPEnabled(): boolean {
    return !!process.env.CMS_TOTP_SECRET;
}

// ── Pending Token (bridges password step → TOTP step) ──
// After the password is verified we issue a short-lived signed cookie so the
// TOTP endpoint can confirm the user actually passed step 1.

const PENDING_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function createPendingToken(): string {
    const payload = `pending_${Date.now()}_${crypto.randomBytes(12).toString("hex")}`;
    const hmac = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
    return `${payload}.${hmac}`;
}

export function validatePendingToken(token: string): boolean {
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return false;

    const payload = token.substring(0, dotIndex);
    const signature = token.substring(dotIndex + 1);

    // Verify HMAC
    const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
    if (signature.length !== expected.length) return false;
    try {
        const valid = crypto.timingSafeEqual(
            Buffer.from(signature, "hex"),
            Buffer.from(expected, "hex")
        );
        if (!valid) return false;
    } catch {
        return false;
    }

    // Check it hasn't expired
    const parts = payload.split("_");
    const timestamp = parseInt(parts[1], 10);
    if (isNaN(timestamp) || Date.now() - timestamp > PENDING_TTL_MS) return false;

    return true;
}

// ── File Size Limits ──

export const FILE_SIZE_LIMITS = {
    image: 10 * 1024 * 1024,     // 10 MB
    video: 100 * 1024 * 1024,    // 100 MB
    document: 20 * 1024 * 1024,  // 20 MB
} as const;

export function checkFileSize(
    file: { size: number; name: string },
    category: "image" | "video" | "document"
): { allowed: boolean; message: string } {
    const limit = FILE_SIZE_LIMITS[category];
    if (file.size <= limit) {
        return { allowed: true, message: "" };
    }

    const limitMB = Math.round(limit / (1024 * 1024));
    const fileMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
        allowed: false,
        message: `File "${file.name}" is ${fileMB}MB, which exceeds the ${limitMB}MB limit for ${category} files.`,
    };
}
