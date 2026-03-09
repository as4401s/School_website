"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CmsLoginPage() {
    const [step, setStep] = useState<"password" | "totp">("password");
    const [password, setPassword] = useState("");
    const [totp, setTotp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [lockedOut, setLockedOut] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const totpRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Countdown timer when locked out
    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    useEffect(() => {
        if (countdown === 0 && lockedOut) {
            setLockedOut(false);
            setError("");
        }
    }, [countdown, lockedOut]);

    // Auto-focus TOTP input when step changes
    useEffect(() => {
        if (step === "totp") totpRef.current?.focus();
    }, [step]);

    function handleLockout(data: { error?: string; retryAfterSeconds?: number }) {
        setLockedOut(true);
        setCountdown(data.retryAfterSeconds ?? 900);
        setError(data.error || "Too many attempts. Please wait.");
    }

    async function handlePasswordSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (lockedOut) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/cms/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();

            if (res.status === 429 || data.lockedOut) { handleLockout(data); return; }
            if (!res.ok) { setError(data.error || "Incorrect password."); return; }

            if (data.step === "totp") {
                // Password correct, now ask for 2FA code
                setStep("totp");
                setTotp("");
            } else {
                // TOTP not configured — logged in directly
                router.push("/cms/dashboard");
            }
        } catch {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleTOTPSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (lockedOut) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/cms/auth?step=totp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ totp: totp.replace(/\s/g, "") }),
            });
            const data = await res.json();

            if (res.status === 429 || data.lockedOut) { handleLockout(data); return; }
            if (!res.ok) {
                setError(data.error || "Invalid code.");
                setTotp("");
                totpRef.current?.focus();
                return;
            }
            router.push("/cms/dashboard");
        } catch {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    const countdownStr = minutes > 0
        ? `${minutes}m ${seconds.toString().padStart(2, "0")}s`
        : `${seconds}s`;

    return (
        <div className="cms-login-page">
            <div className="cms-login-card">
                <div className="cms-login-header">
                    <div className="cms-login-icon">
                        {lockedOut ? "🔐" : step === "totp" ? "📱" : "🔒"}
                    </div>
                    <h1>Staff CMS</h1>
                    <p>
                        {step === "totp"
                            ? "Enter the 6-digit code from your authenticator app"
                            : "Enter the staff password to manage school content"}
                    </p>
                </div>

                {/* ── Step 1: Password ── */}
                {step === "password" && (
                    <form onSubmit={handlePasswordSubmit} className="cms-login-form">
                        <div className="cms-field">
                            <label htmlFor="cms-password">Password</label>
                            <input
                                id="cms-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter staff password"
                                autoFocus
                                required
                                disabled={lockedOut}
                            />
                        </div>

                        {error && (
                            <p className={`cms-error ${lockedOut ? "cms-error--lockout" : ""}`}>
                                {error}
                                {lockedOut && countdown > 0 && (
                                    <span className="cms-lockout-timer"> ({countdownStr})</span>
                                )}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="cms-btn cms-btn--primary"
                            disabled={loading || lockedOut}
                        >
                            {lockedOut ? `Locked out (${countdownStr})` : loading ? "Checking..." : "Continue"}
                        </button>
                    </form>
                )}

                {/* ── Step 2: TOTP ── */}
                {step === "totp" && (
                    <form onSubmit={handleTOTPSubmit} className="cms-login-form">
                        <div className="cms-field">
                            <label htmlFor="cms-totp">6-Digit Code</label>
                            <input
                                id="cms-totp"
                                ref={totpRef}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9 ]*"
                                maxLength={7}
                                value={totp}
                                onChange={(e) => setTotp(e.target.value.replace(/[^0-9]/g, ""))}
                                placeholder="000000"
                                autoComplete="one-time-code"
                                required
                                disabled={lockedOut}
                                className="cms-totp-input"
                            />
                            <p className="cms-field-hint">Open Google Authenticator and enter the code for KMSchool CMS</p>
                        </div>

                        {error && (
                            <p className={`cms-error ${lockedOut ? "cms-error--lockout" : ""}`}>
                                {error}
                                {lockedOut && countdown > 0 && (
                                    <span className="cms-lockout-timer"> ({countdownStr})</span>
                                )}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="cms-btn cms-btn--primary"
                            disabled={loading || lockedOut || totp.length < 6}
                        >
                            {lockedOut ? `Locked out (${countdownStr})` : loading ? "Verifying..." : "Sign In"}
                        </button>
                        <button
                            type="button"
                            className="cms-btn cms-btn--ghost"
                            onClick={() => { setStep("password"); setError(""); setTotp(""); }}
                        >
                            ← Back
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
