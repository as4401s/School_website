import Image from "next/image";
import Link from "next/link";

import {
  LocalizedDate,
  LocalizedText,
} from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import { getNewsPosts, getResults } from "@/lib/content";

const introEyebrow = {
  en: "Events & News",
  bn: "অনুষ্ঠান ও সংবাদ",
};

const introTitle = {
  en: "School updates and celebrations",
  bn: "বিদ্যালয়ের সংবাদ ও উদ্‌যাপন",
};

const introSummary = {
  en: "Latest public updates, school celebrations, and notices.",
  bn: "সাম্প্রতিক পাবলিক আপডেট, বিদ্যালয়ের উদ্‌যাপন ও নোটিশ।",
};

const readArticle = {
  en: "Read Article",
  bn: "খবরটি পড়ুন",
};

const upcomingNotice = {
  en: "Upcoming Notice",
  bn: "আসন্ন নোটিশ",
};

export default async function BlogPage() {
  const [posts, results] = await Promise.all([getNewsPosts(), getResults()]);
  const latestResult = results[0];

  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell grid-2">
          {posts.map((post) => (
            <article className="story-card" key={post.id}>
              <div className="story-card__image-wrap">
                <Image
                  alt={post.title.en}
                  className="story-card__image"
                  fill
                  sizes="(max-width: 1080px) 100vw, 50vw"
                  src={post.imageUrl}
                />
              </div>
              <div className="story-card__body stack">
                <LocalizedDate className="story-card__meta" value={post.publishedAt} />
                <LocalizedText as="h3" text={post.title} />
                <LocalizedText as="p" text={post.excerpt} />
                <Link className="btn btn--ghost" href={`/post/${post.slug}`}>
                  <LocalizedText text={readArticle} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <article className="portal-card stack">
            <LocalizedText as="p" className="eyebrow" text={upcomingNotice} />
            <LocalizedText as="h3" text={latestResult.title} />
            <LocalizedText as="p" text={latestResult.summary} />
            <div className="chip-row">
              <LocalizedText as="span" className="chip" text={latestResult.status} />
              <LocalizedText as="span" className="chip" text={latestResult.location} />
            </div>
            <Link className="btn btn--accent" href={`/events/${latestResult.slug}`}>
              <LocalizedText text={{ en: "View Notice", bn: "নোটিশ দেখুন" }} />
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
