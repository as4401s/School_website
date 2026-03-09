"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type DocItem = {
    id: string;
    title: { en: string; bn: string };
    category: { en: string; bn: string };
    description: { en: string; bn: string };
    href: string;
    _fileName: string;
};

const CATEGORIES = [
    { en: "Prospectus", bn: "প্রসপেক্টাস" },
    { en: "Notice", bn: "নোটিশ" },
    { en: "Circular", bn: "সার্কুলার" },
    { en: "Admissions", bn: "ভর্তি" },
    { en: "General", bn: "সাধারণ" },
];

export default function CmsDocumentsPage() {
    const [items, setItems] = useState<DocItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [titleEn, setTitleEn] = useState("");
    const [titleBn, setTitleBn] = useState("");
    const [descEn, setDescEn] = useState("");
    const [descBn, setDescBn] = useState("");
    const [catIdx, setCatIdx] = useState(0);
    const [confirmDelete, setConfirmDelete] = useState<DocItem | null>(null);
    const [undoStack, setUndoStack] = useState<DocItem[]>([]);
    const [toast, setToast] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const loadItems = useCallback(async () => {
        const res = await fetch("/api/cms/documents");
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

        if (missing.length > 0) {
            const proceed = window.confirm(`The following fields are not filled:\n• ${missing.join("\n• ")}\n\nAre you sure?`);
            if (!proceed) return;
        }

        setSaving(true);
        try {
            let href = "";
            const file = fileRef.current?.files?.[0];
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("section", "documents");
                const uploadRes = await fetch("/api/cms/upload", { method: "POST", body: formData });
                const uploadData = await uploadRes.json();
                if (uploadRes.ok) href = uploadData.url;
            }

            const res = await fetch("/api/cms/documents", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: { en: titleEn || "Untitled", bn: titleBn || "" },
                    category: CATEGORIES[catIdx],
                    description: { en: descEn, bn: descBn },
                    href,
                }),
            });
            if (!res.ok) throw new Error("Failed");

            setTitleEn(""); setTitleBn(""); setDescEn(""); setDescBn(""); setCatIdx(0);
            if (fileRef.current) fileRef.current.value = "";
            await loadItems();
            showToast("✅ Document added!");
        } catch {
            showToast("❌ Failed to add");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(item: DocItem) {
        setConfirmDelete(null);
        try {
            await fetch(`/api/cms/documents?file=${item._fileName}`, { method: "DELETE" });
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
            await fetch("/api/cms/documents", {
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
                    <h1>📄 Documents Manager</h1>
                    <p className="cms-subtitle">{items.length} documents</p>
                </div>

                <div className="cms-card cms-add-form">
                    <h3>Upload New Document</h3>
                    <div className="cms-form-grid-2">
                        <div className="cms-field">
                            <label>Title (English) *</label>
                            <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder="Term 2 Notice" />
                        </div>
                        <div className="cms-field">
                            <label>Title (Bengali)</label>
                            <input value={titleBn} onChange={(e) => setTitleBn(e.target.value)} placeholder="টার্ম ২ নোটিশ" />
                        </div>
                        <div className="cms-field">
                            <label>Description (English)</label>
                            <textarea rows={3} value={descEn} onChange={(e) => setDescEn(e.target.value)} placeholder="Brief description..." />
                        </div>
                        <div className="cms-field">
                            <label>Description (Bengali)</label>
                            <textarea rows={3} value={descBn} onChange={(e) => setDescBn(e.target.value)} placeholder="সংক্ষিপ্ত বিবরণ..." />
                        </div>
                    </div>
                    <div className="cms-form-row" style={{ marginTop: '1rem' }}>
                        <div className="cms-field">
                            <label>Category</label>
                            <select value={catIdx} onChange={(e) => setCatIdx(Number(e.target.value))}>
                                {CATEGORIES.map((c, i) => (
                                    <option key={c.en} value={i}>{c.en} / {c.bn}</option>
                                ))}
                            </select>
                        </div>
                        <div className="cms-field">
                            <label>Document File (PDF, image, etc.)</label>
                            <input type="file" ref={fileRef} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                        </div>
                    </div>
                    <div className="cms-form-actions">
                        <button className="cms-btn cms-btn--primary" onClick={handleAdd} disabled={saving}>
                            {saving ? "Uploading..." : "➕ Add Document"}
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
                                <div className="cms-list-item__content">
                                    <h4>{item.title.en || item.title.bn}</h4>
                                    <span className="cms-badge">{item.category.en}</span>
                                    {item.description.en && <p className="cms-muted">{item.description.en}</p>}
                                </div>
                                <button className="cms-btn cms-btn--danger cms-btn--sm" onClick={() => setConfirmDelete(item)}>🗑️ Delete</button>
                            </div>
                        ))}
                        {items.length === 0 && <p className="cms-empty">No documents yet.</p>}
                    </div>
                )}

                {toast && <div className="cms-toast">{toast}</div>}
                {confirmDelete && (
                    <div className="cms-overlay">
                        <div className="cms-dialog">
                            <h3>Delete Document?</h3>
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
