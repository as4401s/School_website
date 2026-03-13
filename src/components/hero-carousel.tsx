"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 4500;

export function HeroCarousel({ slides }: { slides: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, AUTO_ADVANCE_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPaused, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div
      aria-label="KMS campus image slider"
      className="hero-slider"
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-slider__viewport">
        <div
          className="hero-slider__track"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {slides.map((src, index) => (
            <div aria-hidden={activeIndex !== index} className="hero-slider__slide" key={src}>
              <Image
                alt={`KMS campus view ${index + 1}`}
                className="hero-slider__image"
                fill
                priority={index === 0}
                sizes="(max-width: 1120px) calc(100vw - 32px), 1400px"
                src={src}
              />
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="hero-slider__controls">
          {slides.map((src, index) => (
            <button
              aria-label={`Show slide ${index + 1}`}
              className={cn(
                "hero-slider__dot",
                activeIndex === index && "hero-slider__dot--active",
              )}
              key={`${src}-dot`}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
