"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type SectionCounts = {
    gallery: number;
    announcements: number;
    careers: number;
    documents: number;
    news: number;
};

const sections = [
    { key: "gallery", label: "Gallery", icon: "🖼️", desc: "Upload or remove school photos", href: "/cms/gallery" },
    { key: "announcements", label: "Announcements", icon: "📢", desc: "Add or remove public notices", href: "/cms/announcements" },
    { key: "careers", label: "Careers", icon: "💼", desc: "Manage hiring posts (text + image)", href: "/cms/careers" },
    { key: "documents", label: "Documents", icon: "📄", desc: "Prospectus, notices, circulars", href: "/cms/documents" },
    { key: "news", label: "Events & News", icon: "📰", desc: "Post events with text and images", href: "/cms/news" },
] as const;

export default function CmsDashboardPage() {
    const [counts, setCounts] = useState<SectionCounts>({
        gallery: 0, announcements: 0, careers: 0, documents: 0, news: 0,
    });
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/cms/auth")
            .then((res) => res.json())
            .then((data) => {
                if (!data.authenticated) {
                    router.push("/cms");
                } else {
                    setAuthenticated(true);
                    // Load counts
                    Promise.all(
                        sections.map((s) =>
                            fetch(`/api/cms/${s.key}`).then((r) => r.json()).then((data) => ({
                                key: s.key,
                                count: Array.isArray(data) ? data.length : 0,
                            }))
                        )
                    ).then((results) => {
                        const newCounts = { ...counts };
                        results.forEach((r) => {
                            (newCounts as Record<string, number>)[r.key] = r.count;
                        });
                        setCounts(newCounts);
                    });
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleLogout() {
        await fetch("/api/cms/auth", { method: "DELETE" });
        router.push("/cms");
    }

    if (authenticated === null) {
        return <div className="cms-page"><div className="cms-loading">Loading...</div></div>;
    }

    return (
        <div className="cms-page">
            <div className="cms-container">
                <div className="cms-dashboard-header">
                    <div>
                        <h1>Staff CMS Dashboard</h1>
                        <p className="cms-subtitle">Manage all school content from one place</p>
                    </div>
                    <button className="cms-btn cms-btn--ghost" onClick={handleLogout}>
                        Sign Out
                    </button>
                </div>

                <div className="cms-section-grid">
                    {sections.map((s) => (
                        <Link href={s.href} key={s.key} className="cms-section-card">
                            <div className="cms-section-card__icon">{s.icon}</div>
                            <div className="cms-section-card__info">
                                <h3>{s.label}</h3>
                                <p>{s.desc}</p>
                            </div>
                            <div className="cms-section-card__count">
                                {(counts as Record<string, number>)[s.key]} items
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
