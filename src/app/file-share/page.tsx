import Link from "next/link";

import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import { getDocuments, getResults } from "@/lib/content";

const introEyebrow = {
  en: "Learning Tools",
  bn: "শিক্ষাসামগ্রী",
};

const introTitle = {
  en: "Documents and school resources",
  bn: "নথি ও বিদ্যালয়-সংক্রান্ত সামগ্রী",
};

const introSummary = {
  en: "Public notices, resources, and result-related links.",
  bn: "পাবলিক নোটিশ, রিসোর্স এবং ফলাফল-সংক্রান্ত লিংক।",
};

export default async function FileSharePage() {
  const [docs, results] = await Promise.all([getDocuments(), getResults()]);
  const latestResult = results[0];

  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell grid-3">
          {docs.map((doc) => (
            <article className="doc-card" key={doc.id}>
              <div className="doc-card__body stack">
                <LocalizedText as="p" className="eyebrow" text={doc.category} />
                <LocalizedText as="h3" text={doc.title} />
                <LocalizedText as="p" text={doc.description} />
                {doc.href ? (
                  <a className="btn btn--ghost" href={doc.href}>
                    <LocalizedText text={{ en: "Open", bn: "খুলুন" }} />
                  </a>
                ) : (
                  <LocalizedText
                    as="span"
                    className="chip"
                    text={{ en: "Contact school office for details", bn: "বিস্তারিত জানতে স্কুল অফিসে যোগাযোগ করুন" }}
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          {latestResult ? (
            <article className="portal-card stack">
              <LocalizedText as="p" className="eyebrow" text={{ en: "Results", bn: "ফলাফল" }} />
              <LocalizedText as="h3" text={latestResult.title} />
              <LocalizedText as="p" text={latestResult.summary} />
              <Link className="btn btn--accent" href={`/events/${latestResult.slug}`}>
                <LocalizedText text={{ en: "View Result Notice", bn: "ফলাফলের নোটিশ দেখুন" }} />
              </Link>
            </article>
          ) : null}
        </div>
      </section>
    </>
  );
}
