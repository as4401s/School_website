"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { AcademicCatMascot } from "@/components/academic-cat-mascot";
import { LocalizedText, useLanguage } from "@/components/language-provider";
import type { BilingualText } from "@/data/site-content";

export type HomeTopicItem = {
  title: BilingualText;
  teaser: BilingualText;
  paragraphs: BilingualText[];
  showMascot?: boolean;
  image: {
    src?: string;
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

function getPreviewSentence(text: string) {
  const normalized = text.trim().replace(/\s+/g, " ");
  const sentenceMatch = normalized.match(/^.*?[.!?।](?=\s|$|["')\]])/);

  if (sentenceMatch?.[0]) {
    return sentenceMatch[0].trim();
  }

  return normalized;
}

export function HomeTopicShowcase({ items }: HomeTopicShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { language } = useLanguage();

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
        {items.map((item, index) => {
          const previewText = getPreviewSentence(
            item.paragraphs[0]?.[language] ?? item.teaser[language],
          );
          const hasMascot = item.showMascot === true;
          const isReverse = index % 2 === 1;
          const cardClassName = [
            "home-topic-card",
            isReverse ? "home-topic-card--reverse" : "",
            hasMascot ? "home-topic-card--mascot" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <article className={cardClassName} key={item.title.en}>
              {/* Keep the preview to one complete sentence before the CTA. */}
              <div className="home-topic-card__media">
                {item.image.src ? (
                  <Image
                    alt={item.image.alt}
                    className="home-topic-card__image"
                    fill
                    sizes="(max-width: 720px) 100vw, 500px"
                    src={item.image.src}
                  />
                ) : (
                  <div
                    aria-label={item.image.alt}
                    className="home-topic-card__placeholder"
                    role="img"
                  />
                )}
              </div>

              <div className="home-topic-card__content">
                <LocalizedText as="h3" text={item.title} />
                <p className="home-topic-card__teaser">{previewText}</p>
                <button
                  className="btn btn--accent home-topic-card__button"
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <LocalizedText text={moreText} />
                </button>
              </div>

              {hasMascot ? (
                <div className="home-topic-card__mascot">
                  <AcademicCatMascot
                    className="home-topic-card__mascot-figure"
                    variant="feature"
                  />
                </div>
              ) : null}
            </article>
          );
        })}
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
              {activeItem.image.src ? (
                <Image
                  alt={activeItem.image.alt}
                  className="home-topic-modal__image"
                  fill
                  sizes="(max-width: 720px) 100vw, 500px"
                  src={activeItem.image.src}
                />
              ) : (
                <div
                  aria-label={activeItem.image.alt}
                  className="home-topic-modal__placeholder"
                  role="img"
                />
              )}
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
