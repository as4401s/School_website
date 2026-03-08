import Image from "next/image";
import Link from "next/link";

import {
  LocalizedDate,
  LocalizedText,
} from "@/components/language-provider";
import {
  heroStats,
  homeHeroSlides,
  siteMeta,
} from "@/data/site-content";
import {
  getDocuments,
  getGalleryItems,
  getNewsPosts,
  getResults,
} from "@/lib/content";

const homeIntro = {
  en: "Welcome",
  bn: "স্বাগতম",
};

const schoolTourLabel = {
  en: "School Tour",
  bn: "স্কুল ট্যুর",
};

const latestNewsLabel = {
  en: "Our Latest News",
  bn: "আমাদের সাম্প্রতিক সংবাদ",
};

const latestNewsDescription = {
  en: "Recent celebrations and school updates from the current school year.",
  bn: "চলতি শিক্ষাবর্ষের সাম্প্রতিক উদ্‌যাপন ও বিদ্যালয়ের আপডেট।",
};

const aboutSchoolTitle = {
  en: "About KM School",
  bn: "কেএম স্কুল সম্পর্কে",
};

const aboutSchoolText = {
  en: "KM School offers a warm learning environment shaped by classroom life, school celebrations, parent meetings, and steady daily progress.",
  bn: "শ্রেণিকক্ষের জীবন, বিদ্যালয়ের উদ্‌যাপন, অভিভাবক বৈঠক এবং প্রতিদিনের অগ্রগতির মাধ্যমে কেএম স্কুল একটি স্নেহময় শিক্ষার পরিবেশ গড়ে তোলে।",
};

const upcomingNoticeLabel = {
  en: "Our Upcoming Events",
  bn: "আমাদের আসন্ন নোটিশ",
};

const prospectusLabel = {
  en: "Download Prospectus",
  bn: "প্রসপেক্টাস",
};

const prospectusTitle = {
  en: "School information for parents",
  bn: "অভিভাবকদের জন্য বিদ্যালয়ের তথ্য",
};

const prospectusText = {
  en: "For admissions guidance and school information, families can request the current prospectus from the school office.",
  bn: "ভর্তি-সংক্রান্ত দিকনির্দেশনা ও বিদ্যালয়ের তথ্যের জন্য পরিবারগুলি স্কুল অফিস থেকে বর্তমান প্রসপেক্টাসের অনুরোধ করতে পারেন।",
};

const requestProspectusText = {
  en: "Request Prospectus",
  bn: "প্রসপেক্টাসের অনুরোধ করুন",
};

const viewAllUpdatesText = {
  en: "View all updates",
  bn: "সব আপডেট দেখুন",
};

const readMoreText = {
  en: "Read More",
  bn: "আরও পড়ুন",
};

const viewNoticeText = {
  en: "View Notice",
  bn: "নোটিশ দেখুন",
};

export default async function HomePage() {
  const [galleryItems, posts, results, documents] = await Promise.all([
    getGalleryItems(),
    getNewsPosts(),
    getResults(),
    getDocuments(),
  ]);

  const featuredPosts = posts.slice(0, 2);
  const latestResult = results[0];

  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="hero__panel">
            <div className="hero__slides" aria-hidden="true">
              {homeHeroSlides.map((src, index) => (
                <Image
                  alt=""
                  className="hero__slide"
                  data-index={index}
                  fill
                  key={src}
                  priority={index === 0}
                  sizes="100vw"
                  src={src}
                />
              ))}
            </div>
            <div className="hero__overlay" />

            <div className="hero__content">
              <div className="hero__copy">
                <LocalizedText
                  as="p"
                  className="eyebrow hero__eyebrow"
                  text={homeIntro}
                />
                <LocalizedText as="h1" text={siteMeta.heroTitle} />
                <LocalizedText as="p" text={siteMeta.heroSummary} />
                <div className="hero__actions">
                  <Link className="btn btn--accent" href="/our-school">
                    <LocalizedText text={schoolTourLabel} />
                  </Link>
                  <Link className="btn btn--ghost" href="/blog">
                    <LocalizedText text={latestNewsLabel} />
                  </Link>
                </div>
              </div>

              <div className="hero__stat-board">
                {heroStats.map((item) => (
                  <div className="stat-pill" key={item.label.en}>
                    <LocalizedText as="strong" text={item.label} />
                    <LocalizedText as="span" text={item.value} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell stack">
          <div className="notice-strip">
            <LocalizedText as="p" className="eyebrow" text={{ en: "Safety First", bn: "সুরক্ষা সবার আগে" }} />
            <LocalizedText as="p" className="lede" text={siteMeta.safetyMessage} />
          </div>

          <div className="feature-panel">
            <div className="feature-panel__copy">
              <LocalizedText as="p" className="eyebrow" text={aboutSchoolTitle} />
              <LocalizedText as="h2" text={aboutSchoolTitle} />
              <LocalizedText as="p" text={aboutSchoolText} />
            </div>
            <div className="feature-panel__image-wrap">
              <Image
                alt="KM School classroom"
                className="feature-panel__image"
                height={700}
                src="/media/tour-1.jpg"
                width={900}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-header">
            <div>
              <LocalizedText as="p" className="eyebrow" text={schoolTourLabel} />
              <LocalizedText
                as="h2"
                text={{ en: "Moments from campus life", bn: "বিদ্যালয় জীবনের কিছু মুহূর্ত" }}
              />
            </div>
          </div>

          <div className="grid-4">
            {galleryItems.slice(0, 4).map((item) => (
              <article className="gallery-card" key={item.id}>
                <div className="gallery-card__image-wrap">
                  <Image
                    alt={item.title.en}
                    className="media-card__image"
                    fill
                    sizes="(max-width: 1080px) 100vw, 25vw"
                    src={item.imageUrl}
                  />
                </div>
                <div className="gallery-card__body">
                  <LocalizedText as="h3" text={item.title} />
                  <LocalizedText as="p" text={item.summary} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-header">
            <div>
              <LocalizedText as="p" className="eyebrow" text={latestNewsLabel} />
              <LocalizedText as="h2" text={latestNewsLabel} />
              <LocalizedText as="p" className="lede" text={latestNewsDescription} />
            </div>
            <Link className="btn btn--ghost" href="/blog">
              <LocalizedText text={viewAllUpdatesText} />
            </Link>
          </div>

          <div className="grid-2">
            {featuredPosts.map((post) => (
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
                    <LocalizedText text={readMoreText} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid-2">
          {latestResult ? (
            <article className="portal-card stack">
              <LocalizedText as="p" className="eyebrow" text={upcomingNoticeLabel} />
              <LocalizedText as="h3" text={latestResult.title} />
              <LocalizedText as="p" text={latestResult.summary} />
              <div className="chip-row">
                <LocalizedText as="span" className="chip" text={latestResult.status} />
                <LocalizedText as="span" className="chip" text={latestResult.location} />
              </div>
              <Link className="btn btn--accent" href={`/events/${latestResult.slug}`}>
                <LocalizedText text={viewNoticeText} />
              </Link>
            </article>
          ) : (
            <article className="portal-card stack">
              <LocalizedText as="p" className="eyebrow" text={upcomingNoticeLabel} />
              <LocalizedText
                as="h3"
                text={{ en: "Notice board updates", bn: "নোটিশ বোর্ডের আপডেট" }}
              />
              <LocalizedText
                as="p"
                text={{
                  en: "Important public notices will appear here as soon as they are published.",
                  bn: "গুরুত্বপূর্ণ জনসাধারণের নোটিশ প্রকাশিত হলে সেগুলি এখানেই দেখা যাবে।",
                }}
              />
            </article>
          )}

          <article className="feature-panel">
            <div className="feature-panel__copy">
              <LocalizedText as="p" className="eyebrow" text={prospectusLabel} />
              <LocalizedText as="h2" text={prospectusTitle} />
              <LocalizedText as="p" text={prospectusText} />
              <div className="chip-row">
                {documents.map((item) => (
                  <LocalizedText as="span" className="chip" key={item.id} text={item.category} />
                ))}
              </div>
              <a
                className="btn btn--accent"
                href={`mailto:${siteMeta.schoolEmail}?subject=School%20Prospectus%20Request`}
              >
                <LocalizedText text={requestProspectusText} />
              </a>
            </div>
            <div className="feature-panel__image-wrap">
              <Image
                alt="KM School event"
                className="feature-panel__image"
                height={650}
                src="/media/post-independence.jpeg"
                width={760}
              />
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
