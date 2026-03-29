import { notFound } from "next/navigation";

import { LocalizedDate, LocalizedText } from "@/components/language-provider";
import { getResultBySlug, getResults } from "@/lib/content";
import type { BilingualText } from "@/data/site-content";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function isSameBilingualText(left: BilingualText, right: BilingualText) {
  return left.en.trim() === right.en.trim() && left.bn.trim() === right.bn.trim();
}

export async function generateStaticParams() {
  const results = await getResults();

  return results.map((result) => ({
    slug: result.slug,
  }));
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const result = await getResultBySlug(slug);

  if (!result) {
    notFound();
  }

  const detailParagraphs =
    result.details[0] && isSameBilingualText(result.summary, result.details[0])
      ? result.details.slice(1)
      : result.details;

  return (
    <section className="section">
      <div className="shell stack">
        <LocalizedText
          as="p"
          className="eyebrow"
          text={{ en: "Results & Notices", bn: "ফলাফল ও নোটিশ" }}
        />
        <LocalizedText as="h1" className="page-title" text={result.title} />
        <div className="chip-row">
          <LocalizedText as="span" className="chip" text={result.status} />
          <LocalizedText as="span" className="chip" text={result.location} />
          {result.eventDate ? (
            <LocalizedDate className="chip" value={result.eventDate} />
          ) : null}
        </div>
        <article className="portal-card stack">
          <LocalizedText as="p" text={result.summary} />
          {detailParagraphs.map((paragraph) => (
            <LocalizedText as="p" key={paragraph.en} text={paragraph} />
          ))}
        </article>
      </div>
    </section>
  );
}
