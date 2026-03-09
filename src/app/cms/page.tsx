"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CmsLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/cms/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/cms/dashboard");
            } else {
                setError("Incorrect password. Please try again.");
            }
        } catch {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="cms-login-page">
            <div className="cms-login-card">
                <div className="cms-login-header">
                    <div className="cms-login-icon">🔒</div>
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
                        />
                    </div>

                    {error && <p className="cms-error">{error}</p>}

                    <button type="submit" className="cms-btn cms-btn--primary" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
