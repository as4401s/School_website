import { notFound } from "next/navigation";

import { LocalizedDate, LocalizedText } from "@/components/language-provider";
import { TopicIllustration } from "@/components/topic-illustration";
import { getResultBySlug, getResults } from "@/lib/content";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

  return (
    <section className="section">
      <div className="shell stack">
        <LocalizedText
          as="p"
          className="eyebrow"
          text={{ en: "Results & Notices", bn: "ফলাফল ও নোটিশ" }}
        />
        <div className="section-heading">
          <TopicIllustration kind="results" size="md" />
          <LocalizedText as="h1" className="page-title" text={result.title} />
        </div>
        <div className="chip-row">
          <LocalizedText as="span" className="chip" text={result.status} />
          <LocalizedText as="span" className="chip" text={result.location} />
          {result.eventDate ? (
            <LocalizedDate className="chip" value={result.eventDate} />
          ) : null}
        </div>
        <article className="portal-card stack">
          <LocalizedText as="p" text={result.summary} />
          {result.details.map((paragraph) => (
            <LocalizedText as="p" key={paragraph.en} text={paragraph} />
          ))}
        </article>
      </div>
    </section>
  );
}
