"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Announcement = {
    id: string;
    title: { en: string; bn: string };
    content: { en: string; bn: string }[];
    contactInfo?: string | null;
    publishedAt?: string;
    _fileName: string;
};

export default function CmsAnnouncementsPage() {
    const [items, setItems] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [titleEn, setTitleEn] = useState("");
    const [titleBn, setTitleBn] = useState("");
    const [contentEn, setContentEn] = useState("");
    const [contentBn, setContentBn] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [confirmDelete, setConfirmDelete] = useState<Announcement | null>(null);
    const [undoStack, setUndoStack] = useState<Announcement[]>([]);
    const [toast, setToast] = useState("");
    const router = useRouter();

    const loadItems = useCallback(async () => {
        const res = await fetch("/api/cms/announcements");
        if (res.status === 401) { router.push("/cms"); return; }
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
    }, [router]);

    useEffect(() => { loadItems(); }, [loadItems]);

    function showToast(msg: string) {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    }

    async function handleAdd() {
        const missing: string[] = [];
        if (!titleEn) missing.push("Title (English)");
        if (!titleBn) missing.push("Title (Bengali)");
        if (!contentEn) missing.push("Content (English)");
        if (!contentBn) missing.push("Content (Bengali)");

        if (missing.length > 0) {
            const proceed = window.confirm(
                `The following fields are not filled:\n• ${missing.join("\n• ")}\n\nAre you sure you want to proceed?`
            );
            if (!proceed) return;
        }

        setSaving(true);
        try {
            const paragraphs = contentEn.split("\n").filter(Boolean);
            const paragraphsBn = contentBn.split("\n").filter(Boolean);
            const maxLen = Math.max(paragraphs.length, paragraphsBn.length, 1);

            const content = Array.from({ length: maxLen }, (_, i) => ({
                en: paragraphs[i] || "",
                bn: paragraphsBn[i] || "",
            }));

            const res = await fetch("/api/cms/announcements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: { en: titleEn || "Untitled", bn: titleBn || "" },
                    content,
                    contactInfo: contactInfo || null,
                }),
            });
            if (!res.ok) throw new Error("Failed to add");

            setTitleEn(""); setTitleBn(""); setContentEn(""); setContentBn(""); setContactInfo("");
            await loadItems();
            showToast("✅ Announcement added!");
        } catch {
            showToast("❌ Failed to add");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(item: Announcement) {
        setConfirmDelete(null);
        try {
            const res = await fetch(`/api/cms/announcements?file=${item._fileName}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Delete failed");
            setUndoStack((prev) => [...prev, item]);
            await loadItems();
            showToast("🗑️ Deleted successfully");
        } catch {
            showToast("❌ Failed to delete");
        }
    }

    async function handleUndo() {
        const last = undoStack[undoStack.length - 1];
        if (!last) return;
        try {
            await fetch("/api/cms/announcements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(last),
            });
            setUndoStack((prev) => prev.slice(0, -1));
            await loadItems();
            showToast("↩️ Undo successful");
        } catch {
            showToast("❌ Undo failed");
        }
    }

    return (
        <div className="cms-page">
            <div className="cms-container">
                <div className="cms-page-header">
                    <Link href="/cms/dashboard" className="cms-back">← Dashboard</Link>
                    <h1>📢 Announcements Manager</h1>
                    <p className="cms-subtitle">{items.length} announcements</p>
                </div>

                <div className="cms-card cms-add-form">
                    <h3>Add New Announcement</h3>
                    <div className="cms-form-grid-2">
                        <div className="cms-field">
                            <label>Title (English)</label>
                            <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder="Free Tuition Program" />
                        </div>
                        <div className="cms-field">
                            <label>Title (Bengali)</label>
                            <input value={titleBn} onChange={(e) => setTitleBn(e.target.value)} placeholder="বিনামূল্যে টিউশন" />
                        </div>
                        <div className="cms-field">
                            <label>Content (English) — one paragraph per line</label>
                            <textarea rows={5} value={contentEn} onChange={(e) => setContentEn(e.target.value)} placeholder="Enter announcement details..." />
                        </div>
                        <div className="cms-field">
                            <label>Content (Bengali) — one paragraph per line</label>
                            <textarea rows={5} value={contentBn} onChange={(e) => setContentBn(e.target.value)} placeholder="ঘোষণার বিবরণ লিখুন..." />
                        </div>
                    </div>
                    <div className="cms-field" style={{ marginTop: '1rem' }}>
                        <label>Contact Info (optional)</label>
                        <input value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} placeholder="Name: 1234567890" />
                    </div>
                    <div className="cms-form-actions">
                        <button className="cms-btn cms-btn--primary" onClick={handleAdd} disabled={saving}>
                            {saving ? "Saving..." : "➕ Add Announcement"}
                        </button>
                        {undoStack.length > 0 && (
                            <button className="cms-btn cms-btn--ghost" onClick={handleUndo}>↩️ Undo Last Delete</button>
                        )}
                    </div>
                </div>

                {loading ? <div className="cms-loading">Loading...</div> : (
                    <div className="cms-list">
                        {items.map((item) => (
                            <div key={item._fileName} className="cms-list-item">
                                <div className="cms-list-item__content">
                                    <h4>{item.title.en || item.title.bn}</h4>
                                    {item.title.bn && <p className="cms-muted">{item.title.bn}</p>}
                                    {item.publishedAt && <span className="cms-badge">{item.publishedAt}</span>}
                                </div>
                                <button className="cms-btn cms-btn--danger cms-btn--sm" onClick={() => setConfirmDelete(item)}>
                                    🗑️ Delete
                                </button>
                            </div>
                        ))}
                        {items.length === 0 && <p className="cms-empty">No announcements yet. Add one above!</p>}
                    </div>
                )}

                {toast && <div className="cms-toast">{toast}</div>}

                {confirmDelete && (
                    <div className="cms-overlay">
                        <div className="cms-dialog">
                            <h3>Delete Announcement?</h3>
                            <p>Are you sure you want to delete &quot;{confirmDelete.title.en}&quot;?</p>
                            <div className="cms-dialog__actions">
                                <button className="cms-btn cms-btn--ghost" onClick={() => setConfirmDelete(null)}>Cancel</button>
                                <button className="cms-btn cms-btn--danger" onClick={() => handleDelete(confirmDelete)}>Yes, delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
