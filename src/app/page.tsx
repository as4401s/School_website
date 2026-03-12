import Image from "next/image";
import Link from "next/link";

import {
  LocalizedDate,
  LocalizedText,
} from "@/components/language-provider";
import {
  type BilingualText,
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
  en: "WELCOME ON OUR SITE",
  bn: "আমাদের সাইটে স্বাগতম",
};

const schoolTourLabel = {
  en: "School Tour",
  bn: "স্কুল ট্যুর",
};

const learnMoreLabel = {
  en: "Learn more >",
  bn: "আরও জানুন >",
};

const latestNewsLabel = {
  en: "Latest News & Announcements",
  bn: "সাম্প্রতিক সংবাদ ও বিজ্ঞপ্তি",
};

const latestNewsDescription = {
  en: "Recent celebrations, school stories, and important public updates from the current school year.",
  bn: "চলতি শিক্ষাবর্ষের উল্লেখযোগ্য অনুষ্ঠান, বিদ্যালয়ের গল্প এবং গুরুত্বপূর্ণ বিদ্যালয়সংক্রান্ত আপডেট।",
};

const whoWeAreTitle = {
  en: "Who We Are",
  bn: "আমাদের পরিচয়",
};

const whoWeAreParagraphs: BilingualText[] = [
  {
    en: "Krishnarati Montessori School (KMS) is an initiative of the NGBM Foundation, started in the second half of 2022 at the foundation's ancestral home in Humania Pota.",
    bn: "কৃষ্ণরাতি মন্টেসরি স্কুল (কেএমএস) হল এনজিবিএম ফাউন্ডেশনের একটি উদ্যোগ। ২০২২ সালের দ্বিতীয়ার্ধে হুমানিয়া পোতার পৈতৃক ভিটেতে এই বিদ্যালয়ের সূচনা হয়।",
  },
  {
    en: "The school was founded with a simple aim: to bring quality English-medium early education closer to local families and give children a joyful beginning to their learning journey.",
    bn: "স্থানীয় ও আশপাশের পরিবারের শিশুদের জন্য মানসম্মত ইংরেজি মাধ্যমে প্রাথমিক শিক্ষা সহজলভ্য করা এবং তাদের শেখার শুরুটাকে আনন্দময় করে তোলাই বিদ্যালয়ের মূল উদ্দেশ্য।",
  },
  {
    en: "At KMS, school life is shaped by stories, songs, play, creative work, and caring relationships so that children grow with confidence, curiosity, and a strong sense of belonging.",
    bn: "কেএমএস-এ গল্প, গান, খেলা, সৃজনশীল কাজ এবং স্নেহময় যত্নের মধ্য দিয়ে শিশুদের আত্মবিশ্বাস, কৌতূহল ও একাত্মবোধ গড়ে তোলা হয়।",
  },
];

const montessoriTitle = {
  en: "Montessori Philosophy",
  bn: "মন্টেসরি শিক্ষাদর্শ",
};

const montessoriParagraphs: BilingualText[] = [
  {
    en: "KMS follows the Montessori approach, which respects each child as an individual learner and encourages discovery through observation, movement, and hands-on experiences.",
    bn: "কেএমএস-এ মন্টেসরি শিক্ষাদর্শ অনুসরণ করা হয়, যেখানে প্রতিটি শিশুকে নিজস্ব স্বভাব ও গতির শিক্ষার্থী হিসেবে সম্মান করা হয়।",
  },
  {
    en: "Children are guided step by step to explore materials, ask questions, make choices, and think independently rather than only memorizing or listening.",
    bn: "এখানে হাতে-কলমে কাজ, পর্যবেক্ষণ, স্পর্শ, অনুসন্ধান এবং নিজের মতো করে ভাবার সুযোগের মধ্য দিয়ে শেখার অভ্যাস গড়ে ওঠে।",
  },
  {
    en: "With patient guidance and a supportive environment, this method helps children build independence, concentration, creativity, and problem-solving skills.",
    bn: "ধাপে ধাপে সঠিক দিকনির্দেশনা ও সহায়ক পরিবেশের মাধ্যমে শিশুদের স্বনির্ভরতা, মনোযোগ, সৃজনশীলতা এবং সমস্যা সমাধানের দক্ষতা বিকশিত হয়।",
  },
];

const visionTitle = {
  en: "Our Vision",
  bn: "আমাদের স্বপ্ন",
};

const visionParagraphs: BilingualText[] = [
  {
    en: "Our vision is to inspire young minds to learn with curiosity, grow with confidence, and live with strong values.",
    bn: "আমাদের স্বপ্ন এমন একটি শিক্ষাভিত্তি গড়ে তোলা, যেখানে শিশুরা কৌতূহলী মন নিয়ে শিখবে, আত্মবিশ্বাসের সঙ্গে বড় হবে এবং মানবিক মূল্যবোধে সমৃদ্ধ হয়ে উঠবে।",
  },
  {
    en: "We want every child to build a strong foundation of knowledge, character, and a lifelong love for learning.",
    bn: "প্রতিটি শিশুর জ্ঞান, চরিত্র এবং আজীবন শেখার আনন্দকে একসঙ্গে লালন করাই আমাদের লক্ষ্য।",
  },
];

const headTeacherTitle = {
  en: "A Message from the Head Teacher",
  bn: "প্রধান শিক্ষকের বার্তা",
};

const headTeacherGreeting = {
  en: "Welcome to KMS.",
  bn: "কেএমএস-এ আপনাদের আন্তরিক স্বাগতম।",
};

const headTeacherParagraphs: BilingualText[] = [
  {
    en: "It is a pleasure to welcome you to a school where every child is cared for, respected, and encouraged to grow. We believe the early years should be joyful, meaningful, and full of discovery.",
    bn: "এমন একটি বিদ্যালয়ে আপনাদের স্বাগত জানাতে পেরে আমরা আনন্দিত, যেখানে প্রতিটি শিশুকে যত্ন, সম্মান এবং উৎসাহের সঙ্গে বড় হতে সাহায্য করা হয়। আমাদের বিশ্বাস, শৈশবের শিক্ষা হওয়া উচিত আনন্দময়, অর্থপূর্ণ এবং আবিষ্কারের উচ্ছ্বাসে ভরা।",
  },
  {
    en: "Our teachers work with dedication to create a warm and safe environment where children feel confident to explore, ask questions, and express themselves.",
    bn: "আমাদের শিক্ষকরা আন্তরিক নিষ্ঠার সঙ্গে এমন এক উষ্ণ ও নিরাপদ পরিবেশ গড়ে তোলেন, যেখানে শিশুরা নির্ভয়ে জানতে, প্রশ্ন করতে এবং নিজেকে প্রকাশ করতে শেখে।",
  },
  {
    en: "We also believe that close communication between school and parents plays an essential role in a child's progress. Together, we hope to build a strong foundation for confidence, curiosity, and a lifelong love for learning.",
    bn: "আমরা আরও বিশ্বাস করি, স্কুল ও অভিভাবকের ঘনিষ্ঠ যোগাযোগ শিশুর অগ্রগতির জন্য অত্যন্ত গুরুত্বপূর্ণ। একসঙ্গে আমরা এমন একটি মজবুত ভিত্তি গড়ে তুলতে চাই, যা প্রতিটি শিশুর আত্মবিশ্বাস, কৌতূহল এবং শেখার প্রতি ভালোবাসাকে লালন করবে।",
  },
];

const campusLifeTitle = {
  en: "Moments from Campus Life",
  bn: "ক্যাম্পাস জীবনের কিছু মুহূর্ত",
};

const upcomingNoticeLabel = {
  en: "Latest Announcements",
  bn: "সাম্প্রতিক বিজ্ঞপ্তি",
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

const noticeSupportText = {
  en: "Latest public notices, circulars, and result updates for families.",
  bn: "অভিভাবকদের জন্য সর্বশেষ বিজ্ঞপ্তি, নোটিশ এবং ফলাফলের আপডেট।",
};

const prospectusImageBadge = {
  en: "KMS",
  bn: "কেএমএস",
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
                  <Link className="btn btn--primary" href="/our-school">
                    <LocalizedText text={learnMoreLabel} />
                  </Link>
                </div>
              </div>

              <div className="hero__stat-board">
                <Link href="/academics" className="stat-pill">
                  <strong><LocalizedText text={{ en: "All classes >", bn: "সকল ক্লাস >" }} /></strong>
                </Link>
                <Link href="/contact" className="stat-pill">
                  <strong><LocalizedText text={{ en: "Contact us >", bn: "যোগাযোগ করুন >" }} /></strong>
                </Link>
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
              <LocalizedText as="p" className="eyebrow" text={whoWeAreTitle} />
              <LocalizedText as="h2" text={whoWeAreTitle} />
              {whoWeAreParagraphs.map((paragraph) => (
                <LocalizedText as="p" key={paragraph.en} text={paragraph} />
              ))}
            </div>
            <div className="feature-panel__image-wrap">
              <Image
                alt="KMS classroom"
                className="feature-panel__image"
                height={700}
                src="/media/tour-1.jpg"
                width={900}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell grid-2">
          <article className="portal-card stack">
            <LocalizedText as="p" className="eyebrow" text={montessoriTitle} />
            <LocalizedText as="h2" className="portal-title" text={montessoriTitle} />
            {montessoriParagraphs.map((paragraph) => (
              <LocalizedText as="p" key={paragraph.en} text={paragraph} />
            ))}
          </article>

          <article className="portal-card stack">
            <LocalizedText as="p" className="eyebrow" text={visionTitle} />
            <LocalizedText as="h2" className="portal-title" text={visionTitle} />
            {visionParagraphs.map((paragraph) => (
              <LocalizedText as="p" key={paragraph.en} text={paragraph} />
            ))}
          </article>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell">
          <article className="portal-card stack">
            <LocalizedText as="p" className="eyebrow" text={headTeacherTitle} />
            <LocalizedText as="h2" className="portal-title" text={headTeacherTitle} />
            <LocalizedText as="p" text={headTeacherGreeting} />
            {headTeacherParagraphs.map((paragraph) => (
              <LocalizedText as="p" key={paragraph.en} text={paragraph} />
            ))}
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-header">
            <div>
              <LocalizedText as="p" className="eyebrow" text={schoolTourLabel} />
              <LocalizedText as="h2" text={campusLifeTitle} />
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

      <section className="section section--tight-top">
        <div className="shell home-cta-grid">
          {latestResult ? (
            <article className="notice-spotlight">
              <div className="notice-spotlight__header">
                <LocalizedText as="p" className="eyebrow" text={upcomingNoticeLabel} />
                <LocalizedText as="h3" text={latestResult.title} />
              </div>
              <LocalizedText
                as="p"
                className="notice-spotlight__summary"
                text={latestResult.summary}
              />
              <div className="notice-spotlight__chips">
                <LocalizedText as="span" className="chip" text={latestResult.status} />
                <LocalizedText as="span" className="chip" text={latestResult.location} />
              </div>
              <div className="notice-spotlight__footer">
                <Link className="btn btn--accent" href={`/events/${latestResult.slug}`}>
                  <LocalizedText text={viewNoticeText} />
                </Link>
                <LocalizedText
                  as="p"
                  className="helper-text"
                  text={noticeSupportText}
                />
              </div>
            </article>
          ) : (
            <article className="notice-spotlight">
              <div className="notice-spotlight__header">
                <LocalizedText as="p" className="eyebrow" text={upcomingNoticeLabel} />
                <LocalizedText
                  as="h3"
                  text={{ en: "Notice board updates", bn: "নোটিশ বোর্ডের আপডেট" }}
                />
              </div>
              <LocalizedText
                as="p"
                className="notice-spotlight__summary"
                text={{
                  en: "Important public notices will appear here as soon as they are published.",
                  bn: "গুরুত্বপূর্ণ জনসাধারণের নোটিশ প্রকাশিত হলে সেগুলি এখানেই দেখা যাবে।",
                }}
              />
            </article>
          )}

          <article className="prospectus-panel">
            <div className="prospectus-panel__copy">
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
            <div className="prospectus-panel__image-wrap">
              <LocalizedText
                as="span"
                className="prospectus-panel__image-badge"
                text={prospectusImageBadge}
              />
              <Image
                alt="KMS event"
                className="prospectus-panel__image"
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
