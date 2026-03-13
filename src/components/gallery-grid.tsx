"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/data/site-content";
import { LocalizedText } from "@/components/language-provider";

interface GalleryGridProps {
    items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    if (items.length === 0) {
        return <p className="muted">No images found.</p>;
    }

    return (
        <>
            <div className="gallery-grid-layout">
                {items.map((item) => (
                    <article
                        className="gallery-grid-card"
                        key={item.id}
                        onClick={() => setSelectedImage(item)}
                    >
                        <div className="gallery-grid-card__image-wrap">
                            <Image
                                alt={item.title.en}
                                className="gallery-grid-card__image"
                                fill
                                sizes="(max-width: 1080px) 100vw, 33vw"
                                src={item.imageUrl}
                            />
                        </div>
                        <div className="gallery-grid-card__body">
                            <LocalizedText as="h3" text={item.title} />
                            <LocalizedText as="p" text={item.summary} />
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
                        <div className="gallery-lightbox__caption">
                            <LocalizedText as="h3" text={selectedImage.title} />
                            <LocalizedText as="p" text={selectedImage.summary} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
