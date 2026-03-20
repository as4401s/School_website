"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { LocalizedText } from "@/components/language-provider";
import type { BilingualText } from "@/data/site-content";

export type HomeTopicItem = {
  title: BilingualText;
  teaser: BilingualText;
  paragraphs: BilingualText[];
  image: {
    src: string;
    alt: string;
  };
};

type HomeTopicShowcaseProps = {
  items: HomeTopicItem[];
};

const moreText = {
  en: "More",
  bn: "আরও",
};

const closeText = {
  en: "Close",
  bn: "বন্ধ করুন",
};

export function HomeTopicShowcase({ items }: HomeTopicShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  const activeItem = activeIndex === null ? null : items[activeIndex];

  return (
    <>
      <div className="home-topics">
        {items.map((item, index) => (
          <article
            className={`home-topic-card${index % 2 === 1 ? " home-topic-card--reverse" : ""}${index > 1 ? " home-topic-card--raised" : ""}`}
            key={item.title.en}
          >
            <div className="home-topic-card__media">
              <Image
                alt={item.image.alt}
                className="home-topic-card__image"
                fill
                sizes="(max-width: 720px) 100vw, 50vw"
                src={item.image.src}
              />
            </div>

            <div className="home-topic-card__content">
              <LocalizedText as="h3" text={item.title} />
              <LocalizedText as="p" className="home-topic-card__teaser" text={item.teaser} />
              <button
                className="btn btn--accent home-topic-card__button"
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <LocalizedText text={moreText} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {activeItem ? (
        <div
          aria-modal="true"
          className="home-topic-modal"
          onClick={() => setActiveIndex(null)}
          role="dialog"
        >
          <div
            className="home-topic-modal__card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label={closeText.en}
              className="home-topic-modal__close"
              onClick={() => setActiveIndex(null)}
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className="home-topic-modal__media">
              <Image
                alt={activeItem.image.alt}
                className="home-topic-modal__image"
                fill
                sizes="(max-width: 720px) 100vw, 50vw"
                src={activeItem.image.src}
              />
            </div>

            <div className="home-topic-modal__content">
              <LocalizedText as="h3" text={activeItem.title} />
              {activeItem.paragraphs.map((paragraph) => (
                <LocalizedText as="p" key={paragraph.en} text={paragraph} />
              ))}
              <button
                className="btn btn--ghost home-topic-modal__dismiss"
                onClick={() => setActiveIndex(null)}
                type="button"
              >
                <LocalizedText text={closeText} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
