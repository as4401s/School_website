"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CmsLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [lockedOut, setLockedOut] = useState(false);
    const [countdown, setCountdown] = useState(0);
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

    async function handleLogin(e: React.FormEvent) {
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

            if (res.ok) {
                router.push("/cms/dashboard");
                return;
            }

            if (res.status === 429 || data.lockedOut) {
                setLockedOut(true);
                setCountdown(data.retryAfterSeconds ?? 900);
                setError(data.error || "Too many attempts. Please wait.");
            } else {
                setError(data.error || "Incorrect password. Please try again.");
            }
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
                    <div className="cms-login-icon">{lockedOut ? "🔐" : "🔒"}</div>
                    <h1>Staff CMS</h1>
                    <p>Enter the staff password to manage school content</p>
                </div>

                <form onSubmit={handleLogin} className="cms-login-form">
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
                        {lockedOut
                            ? `Locked out (${countdownStr})`
                            : loading
                            ? "Signing in..."
                            : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
