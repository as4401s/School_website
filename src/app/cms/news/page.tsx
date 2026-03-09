"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validateFileFormat, compressImage, IMAGE_EXTENSIONS } from "@/lib/cms-utils";

type NewsItem = {
    id: string;
    title: { en: string; bn: string };
    excerpt: { en: string; bn: string };
    body: { en: string; bn: string }[];
    imageUrl: string;
    publishedAt: string;
    _fileName: string;
};

export default function CmsNewsPage() {
    const [items, setItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [titleEn, setTitleEn] = useState("");
    const [titleBn, setTitleBn] = useState("");
    const [excerptEn, setExcerptEn] = useState("");
    const [excerptBn, setExcerptBn] = useState("");
    const [bodyEn, setBodyEn] = useState("");
    const [bodyBn, setBodyBn] = useState("");
    const [confirmDelete, setConfirmDelete] = useState<NewsItem | null>(null);
    const [undoStack, setUndoStack] = useState<NewsItem[]>([]);
    const [toast, setToast] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const loadItems = useCallback(async () => {
        const res = await fetch("/api/cms/news");
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
        if (!bodyEn) missing.push("Body (English)");

        if (missing.length > 0) {
            const proceed = window.confirm(`The following fields are not filled:\n• ${missing.join("\n• ")}\n\nAre you sure?`);
            if (!proceed) return;
        }

        setSaving(true);
        try {
            let imageUrl = "";
            let uploadPublicId: string | undefined;
            let uploadResourceType: string | undefined;
            const file = fileRef.current?.files?.[0];
            if (file) {
                const validation = validateFileFormat(file, "image");
                if (!validation.valid) {
                    showToast(`⚠️ ${validation.message}`);
                    setSaving(false);
                    return;
                }
                const compressed = await compressImage(file);
                const formData = new FormData();
                formData.append("file", compressed);
                formData.append("section", "news");
                const uploadRes = await fetch("/api/cms/upload", { method: "POST", body: formData });
                const uploadData = await uploadRes.json();
                if (!uploadRes.ok) { showToast(`⚠️ ${uploadData.error}`); setSaving(false); return; }
                imageUrl = uploadData.url;
                uploadPublicId = uploadData.publicId;
                uploadResourceType = uploadData.resourceType;
            }

            const paragraphs = bodyEn.split("\n").filter(Boolean);
            const paragraphsBn = bodyBn.split("\n").filter(Boolean);
            const maxLen = Math.max(paragraphs.length, paragraphsBn.length, 1);
            const body = Array.from({ length: maxLen }, (_, i) => ({
                en: paragraphs[i] || "",
                bn: paragraphsBn[i] || "",
            }));

            const res = await fetch("/api/cms/news", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: { en: titleEn || "Untitled", bn: titleBn || "" },
                    excerpt: { en: excerptEn, bn: excerptBn },
                    body,
                    imageUrl,
                    publicId: uploadPublicId,
                    resourceType: uploadResourceType,
                }),
            });
            if (!res.ok) throw new Error("Failed");

            setTitleEn(""); setTitleBn(""); setExcerptEn(""); setExcerptBn("");
            setBodyEn(""); setBodyBn("");
            if (fileRef.current) fileRef.current.value = "";
            await loadItems();
            showToast("✅ Event/news posted!");
        } catch {
            showToast("❌ Failed to add");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(item: NewsItem) {
        setConfirmDelete(null);
        try {
            await fetch(`/api/cms/news?file=${item._fileName}`, { method: "DELETE" });
            setUndoStack((prev) => [...prev, item]);
            await loadItems();
            showToast("🗑️ Deleted");
        } catch {
            showToast("❌ Failed");
        }
    }

    async function handleUndo() {
        const last = undoStack[undoStack.length - 1];
        if (!last) return;
        try {
            await fetch("/api/cms/news", {
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
                    <h1>📰 Events & News Manager</h1>
                    <p className="cms-subtitle">{items.length} posts</p>
                </div>

                <div className="cms-card cms-add-form">
                    <h3>Add New Event / News</h3>
                    <div className="cms-form-grid-2">
                        <div className="cms-field">
                            <label>Title (English) *</label>
                            <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder="Annual Day Celebration" />
                        </div>
                        <div className="cms-field">
                            <label>Title (Bengali)</label>
                            <input value={titleBn} onChange={(e) => setTitleBn(e.target.value)} placeholder="বার্ষিক দিবস উদযাপন" />
                        </div>
                        <div className="cms-field">
                            <label>Short Summary (English)</label>
                            <input value={excerptEn} onChange={(e) => setExcerptEn(e.target.value)} placeholder="Brief one-liner..." />
                        </div>
                        <div className="cms-field">
                            <label>Short Summary (Bengali)</label>
                            <input value={excerptBn} onChange={(e) => setExcerptBn(e.target.value)} placeholder="সংক্ষিপ্ত বিবরণ..." />
                        </div>
                        <div className="cms-field">
                            <label>Full Story (English) — one paragraph per line</label>
                            <textarea rows={5} value={bodyEn} onChange={(e) => setBodyEn(e.target.value)} placeholder="Write the full story..." />
                        </div>
                        <div className="cms-field">
                            <label>Full Story (Bengali) — one paragraph per line</label>
                            <textarea rows={5} value={bodyBn} onChange={(e) => setBodyBn(e.target.value)} placeholder="সম্পূর্ণ গল্প লিখুন..." />
                        </div>
                    </div>
                    <div className="cms-field" style={{ marginTop: '1rem' }}>
                        <label>Cover Image (optional) — Supported: {IMAGE_EXTENSIONS}</label>
                        <input type="file" ref={fileRef} accept=".jpg,.jpeg,.png,.webp,.heic,.heif,.gif" />
                    </div>
                    <div className="cms-form-actions">
                        <button className="cms-btn cms-btn--primary" onClick={handleAdd} disabled={saving}>
                            {saving ? "Posting..." : "➕ Publish Event/News"}
                        </button>
                        {undoStack.length > 0 && (
                            <button className="cms-btn cms-btn--ghost" onClick={handleUndo}>↩️ Undo</button>
                        )}
                    </div>
                </div>

                {loading ? <div className="cms-loading">Loading...</div> : (
                    <div className="cms-list">
                        {items.map((item) => (
                            <div key={item._fileName} className="cms-list-item">
                                <div className="cms-list-item__content" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    {item.imageUrl && <img src={item.imageUrl} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12 }} />}
                                    <div>
                                        <h4>{item.title.en || item.title.bn}</h4>
                                        {item.publishedAt && <span className="cms-badge">{item.publishedAt}</span>}
                                        {item.excerpt?.en && <p className="cms-muted">{item.excerpt.en}</p>}
                                    </div>
                                </div>
                                <button className="cms-btn cms-btn--danger cms-btn--sm" onClick={() => setConfirmDelete(item)}>🗑️ Delete</button>
                            </div>
                        ))}
                        {items.length === 0 && <p className="cms-empty">No events or news yet.</p>}
                    </div>
                )}

                {toast && <div className="cms-toast">{toast}</div>}
                {confirmDelete && (
                    <div className="cms-overlay">
                        <div className="cms-dialog">
                            <h3>Delete this post?</h3>
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
