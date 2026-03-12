"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validateFileFormat, compressImage, IMAGE_EXTENSIONS } from "@/lib/cms-utils";

type CareerPost = {
    id: string;
    title: { en: string; bn: string };
    description: { en: string; bn: string };
    qualifications: { en: string; bn: string }[];
    imageUrl?: string | null;
    contactInfo?: string | null;
    _fileName: string;
};

export default function CmsCareersPage() {
    const [items, setItems] = useState<CareerPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [titleEn, setTitleEn] = useState("");
    const [titleBn, setTitleBn] = useState("");
    const [descEn, setDescEn] = useState("");
    const [descBn, setDescBn] = useState("");
    const [qualsEn, setQualsEn] = useState("");
    const [qualsBn, setQualsBn] = useState("");
    const [contact, setContact] = useState("");
    const [confirmDelete, setConfirmDelete] = useState<CareerPost | null>(null);
    const [undoStack, setUndoStack] = useState<CareerPost[]>([]);
    const [toast, setToast] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const loadItems = useCallback(async () => {
        const res = await fetch("/api/cms/careers");
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
        if (!titleEn && !titleBn) missing.push("Title (at least one language)");
        if (!descEn && !descBn) missing.push("Description (at least one language)");

        if (missing.length > 0) {
            const proceed = window.confirm(
                `The following fields are not filled:\n• ${missing.join("\n• ")}\n\nAre you sure you want to proceed?`
            );
            if (!proceed) return;
        }

        setSaving(true);
        try {
            let imageUrl = null;
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
                formData.append("section", "careers");
                const uploadRes = await fetch("/api/cms/upload", { method: "POST", body: formData });
                const uploadData = await uploadRes.json();
                if (!uploadRes.ok) { showToast(`⚠️ ${uploadData.error}`); setSaving(false); return; }
                imageUrl = uploadData.url;
            }

            const qualLines = qualsEn.split("\n").filter(Boolean);
            const qualLinesBn = qualsBn.split("\n").filter(Boolean);
            const maxLen = Math.max(qualLines.length, qualLinesBn.length, 0);

            const qualifications = maxLen > 0
                ? Array.from({ length: maxLen }, (_, i) => ({ en: qualLines[i] || "", bn: qualLinesBn[i] || "" }))
                : [];

            const res = await fetch("/api/cms/careers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: { en: titleEn, bn: titleBn },
                    description: { en: descEn, bn: descBn },
                    qualifications,
                    imageUrl,
                    contactInfo: contact || null,
                }),
            });
            if (!res.ok) throw new Error("Failed");

            setTitleEn(""); setTitleBn(""); setDescEn(""); setDescBn("");
            setQualsEn(""); setQualsBn(""); setContact("");
            if (fileRef.current) fileRef.current.value = "";
            await loadItems();
            showToast("✅ Career post added!");
        } catch {
            showToast("❌ Failed to add");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(item: CareerPost) {
        setConfirmDelete(null);
        try {
            await fetch(`/api/cms/careers?file=${item._fileName}`, { method: "DELETE" });
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
            await fetch("/api/cms/careers", {
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
                    <h1>💼 Careers Manager</h1>
                    <p className="cms-subtitle">{items.length} career posts</p>
                </div>

                <div className="cms-card cms-add-form">
                    <h3>Add New Career Post</h3>
                    <p className="cms-helper">You can upload just an image, or image + text, or just text. Fill whichever fields you have.<br />📷 Supported images: {IMAGE_EXTENSIONS} (auto-compressed if over 2MB)</p>
                    <div className="cms-form-grid-2">
                        <div className="cms-field">
                            <label>Title (English)</label>
                            <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder="We Are Hiring" />
                        </div>
                        <div className="cms-field">
                            <label>Title (Bengali)</label>
                            <input value={titleBn} onChange={(e) => setTitleBn(e.target.value)} placeholder="আমরা নিয়োগ করছি" />
                        </div>
                        <div className="cms-field">
                            <label>Description (English)</label>
                            <textarea rows={4} value={descEn} onChange={(e) => setDescEn(e.target.value)} placeholder="Job details..." />
                        </div>
                        <div className="cms-field">
                            <label>Description (Bengali)</label>
                            <textarea rows={4} value={descBn} onChange={(e) => setDescBn(e.target.value)} placeholder="কাজের বিবরণ..." />
                        </div>
                        <div className="cms-field">
                            <label>Qualifications (English) — one per line</label>
                            <textarea rows={3} value={qualsEn} onChange={(e) => setQualsEn(e.target.value)} placeholder="Graduate&#10;Teaching experience" />
                        </div>
                        <div className="cms-field">
                            <label>Qualifications (Bengali) — one per line</label>
                            <textarea rows={3} value={qualsBn} onChange={(e) => setQualsBn(e.target.value)} placeholder="স্নাতক&#10;শিক্ষকতার অভিজ্ঞতা" />
                        </div>
                    </div>
                    <div className="cms-form-row" style={{ marginTop: '1rem' }}>
                        <div className="cms-field">
                            <label>Image (optional)</label>
                            <input type="file" ref={fileRef} accept=".jpg,.jpeg,.png,.webp,.heic,.heif,.gif,.bmp,.svg" />
                        </div>
                        <div className="cms-field">
                            <label>Contact Info (optional)</label>
                            <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="9830384958" />
                        </div>
                    </div>
                    <div className="cms-form-actions">
                        <button className="cms-btn cms-btn--primary" onClick={handleAdd} disabled={saving}>
                            {saving ? "Saving..." : "➕ Add Career Post"}
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
                                    {item.imageUrl && (
                                        <Image
                                            src={item.imageUrl}
                                            alt=""
                                            width={80}
                                            height={80}
                                            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12 }}
                                        />
                                    )}
                                    <div>
                                        <h4>{item.title.en || item.title.bn || "Untitled"}</h4>
                                        {item.title.bn && <p className="cms-muted">{item.title.bn}</p>}
                                    </div>
                                </div>
                                <button className="cms-btn cms-btn--danger cms-btn--sm" onClick={() => setConfirmDelete(item)}>🗑️ Delete</button>
                            </div>
                        ))}
                        {items.length === 0 && <p className="cms-empty">No career posts yet.</p>}
                    </div>
                )}

                {toast && <div className="cms-toast">{toast}</div>}
                {confirmDelete && (
                    <div className="cms-overlay">
                        <div className="cms-dialog">
                            <h3>Delete Career Post?</h3>
                            <p>Are you sure you want to delete &quot;{confirmDelete.title.en || confirmDelete.title.bn}&quot;?</p>
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
