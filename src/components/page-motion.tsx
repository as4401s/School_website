"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = [
  ".page-intro__inner",
  ".hero-slider",
  ".section-header",
  ".feature-panel",
  ".notice-spotlight",
  ".portal-card",
  ".prospectus-panel",
  ".story-card",
  ".tour-card",
  ".doc-card",
  ".gallery-card",
  ".subject-card",
  ".contact-panel",
  ".contact-form-card",
  ".login-card",
  ".status-banner",
  ".gallery-slider",
  ".video-reel",
  ".home-topic-card",
].join(", ");

function getRevealVariant(element: Element) {
  if (element.classList.contains("hero-slider")) {
    return "hero";
  }

  if (element.classList.contains("page-intro__inner")) {
    return "intro";
  }

  if (element.classList.contains("section-header")) {
    return "soft";
  }

  if (element.classList.contains("gallery-slider")) {
    return "wide";
  }

  if (element.classList.contains("video-reel")) {
    return "wide";
  }

  return "up";
}

function getRevealDelay(element: Element) {
  let sibling = element.previousElementSibling;
  let index = 0;

  while (sibling) {
    if (sibling.matches(REVEAL_SELECTOR)) {
      index += 1;
    }
    sibling = sibling.previousElementSibling;
  }

  return Math.min(index * 100, 320);
}

export function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 820px)");
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    const resetElements = () => {
      for (const element of elements) {
        element.classList.remove("reveal-on-scroll", "is-visible");
        element.removeAttribute("data-reveal");
        element.style.removeProperty("--reveal-delay");
      }
    };

    if (reducedMotion.matches || mobileViewport.matches) {
      root.classList.remove("has-motion");
      resetElements();

      return () => {
        resetElements();
      };
    }

    root.classList.add("has-motion");

    for (const element of elements) {
      element.classList.add("reveal-on-scroll");
      element.dataset.reveal = getRevealVariant(element);
      element.style.setProperty("--reveal-delay", `${getRevealDelay(element)}ms`);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    const frameId = window.requestAnimationFrame(() => {
      for (const element of elements) {
        observer.observe(element);
      }
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      resetElements();
    };
  }, [pathname]);

  return null;
}
