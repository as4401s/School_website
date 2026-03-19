"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { GalleryItem } from "@/data/site-content";

const VISIBLE = 4; // images visible at once on desktop

export function GallerySlider({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clamp = (n: number) => ((n % items.length) + items.length) % items.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setIndex((prev) => clamp(prev + dir));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsAnimating(false), 420);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAnimating, items.length],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Build a circular window of VISIBLE + 2 (buffer) images
  const visibleItems = Array.from({ length: VISIBLE }, (_, i) => {
    const src = items[clamp(index + i)];
    return { ...src, key: `${src.id}-${index + i}` };
  });

  return (
    <div className="gallery-slider" aria-label="Campus life photos">
      {/* Left arrow */}
      <button
        aria-label="Previous photos"
        className="gallery-slider__arrow gallery-slider__arrow--prev"
        disabled={isAnimating}
        onClick={() => go(-1)}
        type="button"
      >
        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Track */}
      <div className="gallery-slider__track">
        {visibleItems.map((item, i) => (
          <div
            className="gallery-slider__slide"
            key={item.key}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <Image
              alt={item.title.en}
              className="gallery-slider__image"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
              src={item.imageUrl}
            />
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        aria-label="Next photos"
        className="gallery-slider__arrow gallery-slider__arrow--next"
        disabled={isAnimating}
        onClick={() => go(1)}
        type="button"
      >
        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="gallery-slider__dots" aria-hidden="true">
        {items.map((item, i) => (
          <button
            className={`gallery-slider__dot${i === index % items.length ? " gallery-slider__dot--active" : ""}`}
            key={item.id}
            onClick={() => { if (!isAnimating) { setIndex(i); } }}
            type="button"
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
