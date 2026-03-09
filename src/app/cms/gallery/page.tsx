"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validateFileFormat, compressImage, isVideoFile, IMAGE_EXTENSIONS, VIDEO_EXTENSIONS } from "@/lib/cms-utils";

type GalleryItem = {
    id: string;
    title: { en: string; bn: string };
    summary: { en: string; bn: string };
    imageUrl: string;
    mediaType?: "image" | "video";
    _fileName: string;
};

function ConfirmDialog({ open, title, message, onConfirm, onCancel }: {
    open: boolean; title: string; message: string; onConfirm: () => void; onCancel: () => void;
}) {
    if (!open) return null;
    return (
        <div className="cms-overlay">
            <div className="cms-dialog">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="cms-dialog__actions">
                    <button className="cms-btn cms-btn--ghost" onClick={onCancel}>Cancel</button>
                    <button className="cms-btn cms-btn--danger" onClick={onConfirm}>Yes, delete</button>
                </div>
            </div>
        </div>
    );
}

export default function CmsGalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [titleEn, setTitleEn] = useState("");
    const [titleBn, setTitleBn] = useState("");
    const [summaryEn, setSummaryEn] = useState("");
    const [summaryBn, setSummaryBn] = useState("");
    const [activeTab, setActiveTab] = useState<"images" | "videos">("images");
    const [confirmDelete, setConfirmDelete] = useState<GalleryItem | null>(null);
    const [undoStack, setUndoStack] = useState<{ action: string; data: GalleryItem }[]>([]);
    const [toast, setToast] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const loadItems = useCallback(async () => {
        const res = await fetch("/api/cms/gallery");
        if (res.status === 401) { router.push("/cms"); return; }
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
    }, [router]);

    useEffect(() => { loadItems(); }, [loadItems]);

    function showToast(msg: string) {
        setToast(msg);
        setTimeout(() => setToast(""), 4000);
    }

    const images = items.filter((i) => i.mediaType !== "video");
    const videos = items.filter((i) => i.mediaType === "video");

    async function handleUpload() {
        const file = fileRef.current?.files?.[0];
        if (!file) return;

        // Validate format
        const isVideo = isVideoFile(file);
        const validation = validateFileFormat(file, isVideo ? "video" : "image");
        if (!validation.valid) {
            showToast(`⚠️ ${validation.message}`);
            return;
        }

        // Check missing fields
        const missing: string[] = [];
        if (!titleEn) missing.push("Title (English)");
        if (!titleBn) missing.push("Title (Bengali)");
        if (missing.length > 0) {
            const proceed = window.confirm(`The following fields are not filled:\n• ${missing.join("\n• ")}\n\nAre you sure you want to proceed?`);
            if (!proceed) return;
        }

        setUploading(true);
        try {
            // Compress image if needed (skip for videos)
            let processedFile = file;
            if (!isVideo) {
                processedFile = await compressImage(file);
                if (processedFile !== file) {
                    showToast("🗜️ Image auto-compressed for better performance");
                }
            }

            // Upload file
            const formData = new FormData();
            formData.append("file", processedFile);
            formData.append("section", "gallery");
            const uploadRes = await fetch("/api/cms/upload", { method: "POST", body: formData });
            const uploadData = await uploadRes.json();
            if (!uploadRes.ok) {
                showToast(`⚠️ ${uploadData.error}`);
                setUploading(false);
                return;
            }

            // Create JSON entry
            const res = await fetch("/api/cms/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    imageUrl: uploadData.url,
                    title: { en: titleEn || "Untitled", bn: titleBn || "শিরোনামহীন" },
                    summary: { en: summaryEn, bn: summaryBn },
                    mediaType: isVideo ? "video" : "image",
                    publicId: uploadData.publicId,
                    resourceType: uploadData.resourceType,
                }),
            });
            if (!res.ok) throw new Error("Failed to create entry");

            setTitleEn(""); setTitleBn(""); setSummaryEn(""); setSummaryBn("");
            if (fileRef.current) fileRef.current.value = "";
            await loadItems();
            showToast(`✅ ${isVideo ? "Video" : "Image"} uploaded successfully!`);
        } catch (err) {
            showToast(`❌ Error: ${err instanceof Error ? err.message : "Upload failed"}`);
        } finally {
            setUploading(false);
        }
    }

    async function handleDelete(item: GalleryItem) {
        setConfirmDelete(null);
        try {
            const res = await fetch(`/api/cms/gallery?file=${item._fileName}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Delete failed");
            const data = await res.json();
            setUndoStack((prev) => [...prev, { action: "delete", data: { ...data.deleted, _fileName: item._fileName } }]);
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
            await fetch("/api/cms/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(last.data),
            });
            setUndoStack((prev) => prev.slice(0, -1));
            await loadItems();
            showToast("↩️ Undo successful");
        } catch {
            showToast("❌ Undo failed");
        }
    }

    const displayItems = activeTab === "images" ? images : videos;

    return (
        <div className="cms-page">
            <div className="cms-container">
                <div className="cms-page-header">
                    <Link href="/cms/dashboard" className="cms-back">← Dashboard</Link>
                    <h1>🖼️ Gallery Manager</h1>
                    <p className="cms-subtitle">{images.length} images · {videos.length} videos</p>
                </div>

                {/* Add form */}
                <div className="cms-card cms-add-form">
                    <h3>Add New Media</h3>
                    <p className="cms-helper">
                        📷 Images: {IMAGE_EXTENSIONS} (auto-compressed if over 2MB)<br />
                        🎥 Videos: {VIDEO_EXTENSIONS}
                    </p>
                    <div className="cms-form-row">
                        <div className="cms-field">
                            <label>Media File *</label>
                            <input type="file" ref={fileRef} accept="image/*,video/*" />
                        </div>
                        <div className="cms-field">
                            <label>Title (English)</label>
                            <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder="e.g. School Event" />
                        </div>
                        <div className="cms-field">
                            <label>Title (Bengali)</label>
                            <input value={titleBn} onChange={(e) => setTitleBn(e.target.value)} placeholder="e.g. বিদ্যালয়ের অনুষ্ঠান" />
                        </div>
                        <div className="cms-field">
                            <label>Caption (English) <span className="cms-muted">— optional</span></label>
                            <input value={summaryEn} onChange={(e) => setSummaryEn(e.target.value)} placeholder="Short description of the photo" />
                        </div>
                        <div className="cms-field">
                            <label>Caption (Bengali) <span className="cms-muted">— optional</span></label>
                            <input value={summaryBn} onChange={(e) => setSummaryBn(e.target.value)} placeholder="ছবির সংক্ষিপ্ত বিবরণ" />
                        </div>
                    </div>
                    <div className="cms-form-actions">
                        <button className="cms-btn cms-btn--primary" onClick={handleUpload} disabled={uploading}>
                            {uploading ? "Uploading..." : "➕ Add to Gallery"}
                        </button>
                        {undoStack.length > 0 && (
                            <button className="cms-btn cms-btn--ghost" onClick={handleUndo}>↩️ Undo Last Delete</button>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="cms-tabs">
                    <button
                        className={`cms-tab ${activeTab === "images" ? "cms-tab--active" : ""}`}
                        onClick={() => setActiveTab("images")}
                    >
                        📷 Images ({images.length})
                    </button>
                    <button
                        className={`cms-tab ${activeTab === "videos" ? "cms-tab--active" : ""}`}
                        onClick={() => setActiveTab("videos")}
                    >
                        🎥 Videos ({videos.length})
                    </button>
                </div>

                {/* Items grid */}
                {loading ? (
                    <div className="cms-loading">Loading gallery...</div>
                ) : (
                    <div className="cms-gallery-grid">
                        {displayItems.map((item) => (
                            <div key={item._fileName} className="cms-gallery-item">
                                {item.mediaType === "video" ? (
                                    <video src={item.imageUrl} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} muted />
                                ) : (
                                    <img src={item.imageUrl} alt={item.title.en} />
                                )}
                                <div className="cms-gallery-item__info">
                                    <p className="cms-gallery-item__title">{item.title.en}</p>
                                    {item.title.bn && <p className="cms-gallery-item__subtitle">{item.title.bn}</p>}
                                </div>
                                <button className="cms-btn cms-btn--danger cms-btn--sm" onClick={() => setConfirmDelete(item)}>
                                    🗑️ Delete
                                </button>
                            </div>
                        ))}
                        {displayItems.length === 0 && (
                            <p className="cms-empty" style={{ gridColumn: '1/-1' }}>
                                No {activeTab} yet. Upload one above!
                            </p>
                        )}
                    </div>
                )}

                {toast && <div className="cms-toast">{toast}</div>}
                <ConfirmDialog
                    open={!!confirmDelete}
                    title={`Delete ${confirmDelete?.mediaType === "video" ? "Video" : "Image"}?`}
                    message={`Are you sure you want to delete "${confirmDelete?.title.en}"?`}
                    onConfirm={() => confirmDelete && handleDelete(confirmDelete)}
                    onCancel={() => setConfirmDelete(null)}
                />
            </div>
        </div>
    );
}
