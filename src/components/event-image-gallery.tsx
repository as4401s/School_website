"use client";

import { useState } from "react";
import Image from "next/image";

type EventImageGalleryProps = {
  title: string;
  images: string[];
};

export function EventImageGallery({ title, images }: EventImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="post-event-gallery">
        <div className="post-event-gallery__grid">
          {images.map((imageUrl, index) => (
            <button
              type="button"
              className="post-event-gallery__item"
              key={imageUrl}
              onClick={() => setSelectedImage(imageUrl)}
              aria-label={`Open ${title} image ${index + 1}`}
            >
              <span className="post-event-gallery__item-frame">
                <Image
                  alt={`${title} ${index + 1}`}
                  className="post-event-gallery__image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={imageUrl}
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedImage ? (
        <div className="gallery-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="gallery-lightbox__content" onClick={(event) => event.stopPropagation()}>
            <button
              className="gallery-lightbox__close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image viewer"
            >
              &times;
            </button>
            <div className="gallery-lightbox__image-wrap">
              <Image
                alt={title}
                className="gallery-lightbox__image"
                fill
                sizes="100vw"
                src={selectedImage}
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
