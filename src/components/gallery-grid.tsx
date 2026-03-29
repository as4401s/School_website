"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/data/site-content";
import { LocalizedText } from "@/components/language-provider";

interface GalleryGridProps {
    items: GalleryItem[];
    variant?: "default" | "event";
}

export function GalleryGrid({ items, variant = "default" }: GalleryGridProps) {
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    const layoutClassName =
        variant === "event" ? "gallery-grid-layout gallery-grid-layout--event" : "gallery-grid-layout";
    const cardClassName =
        variant === "event" ? "gallery-grid-card gallery-grid-card--event" : "gallery-grid-card";
    const imageSizes =
        variant === "event"
            ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            : "(max-width: 1080px) 100vw, 33vw";

    if (items.length === 0) {
        return <p className="muted">No images found.</p>;
    }

    return (
        <>
            <div className={layoutClassName}>
                {items.map((item) => (
                    <article
                        className={cardClassName}
                        key={item.id}
                        onClick={() => setSelectedImage(item)}
                    >
                        <div className="gallery-grid-card__image-wrap">
                            <Image
                                alt={item.title.en}
                                className="gallery-grid-card__image"
                                fill
                                sizes={imageSizes}
                                src={item.imageUrl}
                            />
                        </div>
                    </article>
                ))}
            </div>

            {selectedImage && (
                <div
                    className="gallery-lightbox"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="gallery-lightbox__content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="gallery-lightbox__close"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close lightbox"
                        >
                            &times;
                        </button>
                        <div className="gallery-lightbox__image-wrap">
                            <Image
                                alt={selectedImage.title.en}
                                className="gallery-lightbox__image"
                                fill
                                sizes="100vw"
                                src={selectedImage.imageUrl}
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
