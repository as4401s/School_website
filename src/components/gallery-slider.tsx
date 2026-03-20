"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { GalleryItem } from "@/data/site-content";

function getVisibleCount(width: number) {
  if (width <= 430) {
    return 1;
  }

  if (width <= 1120) {
    return 2;
  }

  return 3;
}

export function GallerySlider({ items }: { items: GalleryItem[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const lastIndex = Math.max(items.length - visibleCount, 0);

  const getStepWidth = useCallback(() => {
    const track = trackRef.current;
    const slide = track?.querySelector<HTMLElement>(".gallery-slider__slide");

    if (!track || !slide) {
      return 0;
    }

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");

    return slide.getBoundingClientRect().width + gap;
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount(window.innerWidth));
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  useEffect(() => {
    setIndex((current) => Math.min(current, Math.max(items.length - visibleCount, 0)));
  }, [items.length, visibleCount]);

  useEffect(() => {
    const track = trackRef.current;
    const step = getStepWidth();

    if (!track || !step) {
      return;
    }

    track.scrollLeft = index * step;
  }, [getStepWidth, items.length, visibleCount]);

  const syncIndex = useCallback(() => {
    const track = trackRef.current;
    const step = getStepWidth();

    if (!track || !step) {
      return;
    }

    const nextIndex = Math.round(track.scrollLeft / step);
    setIndex(Math.max(0, Math.min(nextIndex, Math.max(items.length - visibleCount, 0))));
  }, [getStepWidth, items.length, visibleCount]);

  const scrollToIndex = useCallback(
    (nextIndex: number) => {
      const track = trackRef.current;
      const step = getStepWidth();

      if (!track || !step) {
        return;
      }

      track.scrollTo({
        left: Math.max(0, Math.min(nextIndex, lastIndex)) * step,
        behavior: "smooth",
      });
    },
    [getStepWidth, lastIndex],
  );

  const go = useCallback(
    (dir: 1 | -1) => {
      scrollToIndex(index + dir);
    },
    [index, scrollToIndex],
  );

  const handleScroll = useCallback(() => {
    if (scrollFrameRef.current) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = window.requestAnimationFrame(syncIndex);
  }, [syncIndex]);

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="gallery-slider" aria-label="Campus life photos">
      <button
        aria-label="Previous photos"
        className="gallery-slider__arrow gallery-slider__arrow--prev"
        disabled={index <= 0}
        onClick={() => go(-1)}
        type="button"
      >
        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="gallery-slider__track" onScroll={handleScroll} ref={trackRef}>
        {items.map((item) => (
          <div
            className="gallery-slider__slide"
            key={item.id}
          >
            <Image
              alt={item.title.en}
              className="gallery-slider__image"
              fill
              sizes="(max-width: 430px) 82vw, (max-width: 1120px) 50vw, 33vw"
              src={item.imageUrl}
            />
          </div>
        ))}
      </div>

      <button
        aria-label="Next photos"
        className="gallery-slider__arrow gallery-slider__arrow--next"
        disabled={index >= lastIndex}
        onClick={() => go(1)}
        type="button"
      >
        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="gallery-slider__dots" aria-hidden="true">
        {Array.from({ length: lastIndex + 1 }, (_, i) => (
          <button
            className={`gallery-slider__dot${i === index ? " gallery-slider__dot--active" : ""}`}
            key={`dot-${i}`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to photo group ${i + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
