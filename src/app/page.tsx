import Image from "next/image";
import Link from "next/link";

import { HeroCarousel } from "@/components/hero-carousel";
import {
  LocalizedDate,
  LocalizedText,
} from "@/components/language-provider";
import {
  type BilingualText,
  type GalleryItem,
  homeHeroSlides,
} from "@/data/site-content";
import {
  getGalleryItems,
  getNewsPosts,
  getResults,
} from "@/lib/content";

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

const headTeacherCardLabel = {
  en: "School Leadership",
  bn: "বিদ্যালয়ের নেতৃত্ব",
};

const headTeacherCardTitle = {
  en: "Formal portrait to be added soon",
  bn: "আনুষ্ঠানিক ছবি শিগগিরই যুক্ত হবে",
};

const headTeacherCardSummary = {
  en: "Until then, this section carries the school's identity while the head teacher's message remains available here for families.",
  bn: "ততদিন এই অংশে বিদ্যালয়ের নিজস্ব পরিচয় থাকবে, আর পরিবারের জন্য প্রধান শিক্ষকের বার্তাটি এখানেই পড়া যাবে।",
};

const admissionFormTitle = {
  en: "Application Form",
  bn: "ভর্তি ফর্ম",
};

const admissionFormDescription = {
  en: "Families can download the printable admission form, fill in the child and parent details at home, sign it after printing, and submit it at the school office with the required documents.",
  bn: "অভিভাবকেরা এখান থেকেই ভর্তি ফর্ম ডাউনলোড করে বাড়িতে বসে শিক্ষার্থী ও পরিবারের তথ্য পূরণ করতে পারবেন, প্রিন্ট নেওয়ার পর স্বাক্ষর করে প্রয়োজনীয় নথিসহ স্কুল অফিসে জমা দিতে পারবেন।",
};

const admissionFormSteps: BilingualText[] = [
  {
    en: "Complete the student, parent, and guardian details clearly.",
    bn: "শিক্ষার্থী, অভিভাবক ও প্রয়োজনে স্থানীয় অভিভাবকের তথ্য স্পষ্টভাবে পূরণ করুন।",
  },
  {
    en: "Print the form, attach a recent passport-size photograph, and sign it by hand.",
    bn: "ফর্মটি প্রিন্ট করে সাম্প্রতিক পাসপোর্ট সাইজ ছবি সংযুক্ত করুন এবং হাতে স্বাক্ষর করুন।",
  },
  {
    en: "Submit it to the school office along with the listed supporting documents.",
    bn: "উল্লিখিত প্রয়োজনীয় কাগজপত্রসহ স্কুল অফিসে ফর্মটি জমা দিন।",
  },
];

const admissionFormDownloadText = {
  en: "Download Form (PDF)",
  bn: "ফর্ম ডাউনলোড করুন (PDF)",
};

const admissionFormLinkText = {
  en: "View Admission Details",
  bn: "ভর্তির বিস্তারিত দেখুন",
};

const admissionFormSupportText = {
  en: "The form is fillable on screen, but the signature should be added after printing before submission.",
  bn: "ফর্মটি স্ক্রিনে পূরণ করা যাবে, তবে জমা দেওয়ার আগে প্রিন্ট নিয়ে স্বাক্ষর করতে হবে।",
};

type HomeHighlight = {
  title: BilingualText;
  lead?: BilingualText;
  paragraphs: BilingualText[];
  image?: {
    src: string;
    alt: string;
  };
  variant?: "brand";
};

const learningHighlights: HomeHighlight[] = [
  {
    title: montessoriTitle,
    paragraphs: montessoriParagraphs,
    image: {
      src: "/media/Humaniapota%20School/IMG_3345.jpg",
      alt: "Children working at classroom tables with a teacher nearby",
    },
  },
  {
    title: visionTitle,
    paragraphs: visionParagraphs,
    image: {
      src: "/media/Humaniapota%20School/IMG_3254.jpg",
      alt: "A teacher and children gathered together in the courtyard",
    },
  },
  {
    title: headTeacherTitle,
    lead: headTeacherGreeting,
    paragraphs: headTeacherParagraphs,
    variant: "brand",
  },
];

const campusLifeTitle = {
  en: "Moments from Campus Life",
  bn: "ক্যাম্পাস জীবনের কিছু মুহূর্ত",
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

const featuredCampusGalleryIds = [
  "humaniapota-11",
  "humaniapota-12",
  "humaniapota-3",
  "humaniapota-20",
];

function pickFeaturedGalleryItems(items: GalleryItem[]) {
  const itemMap = new Map(items.map((item) => [item.id, item]));
  const curatedItems = featuredCampusGalleryIds
    .map((id) => itemMap.get(id))
    .filter((item): item is GalleryItem => Boolean(item));

  return curatedItems.length === featuredCampusGalleryIds.length
    ? curatedItems
    : items.slice(0, 4);
}

export default async function HomePage() {
  const [galleryItems, posts, results] = await Promise.all([
    getGalleryItems(),
    getNewsPosts(),
    getResults(),
  ]);

  const featuredPosts = posts.slice(0, 2);
  const latestResult = results[0];
  const featuredGalleryItems = pickFeaturedGalleryItems(galleryItems);

  return (
    <main className="home-page">
      <section className="hero">
        <div className="shell">
          <HeroCarousel slides={homeHeroSlides} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="feature-panel">
            <div className="feature-panel__copy">
              <LocalizedText as="h2" text={whoWeAreTitle} />
              {whoWeAreParagraphs.map((paragraph) => (
                <LocalizedText as="p" key={paragraph.en} text={paragraph} />
              ))}
            </div>
            <div className="feature-panel__image-wrap">
              <Image
                alt="Front entrance of the school campus"
                className="feature-panel__image"
                height={700}
                src="/media/Humaniapota%20School/IMG_3386.jpg"
                width={900}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell stack stack--spacious">
          {learningHighlights.map((item) => (
            <article className="feature-panel" key={item.title.en}>
              <div className="feature-panel__copy">
                <LocalizedText as="h2" text={item.title} />
                {item.lead ? <LocalizedText as="p" text={item.lead} /> : null}
                {item.paragraphs.map((paragraph) => (
                  <LocalizedText as="p" key={paragraph.en} text={paragraph} />
                ))}
              </div>
              {item.image ? (
                <div className="feature-panel__image-wrap">
                  <Image
                    alt={item.image.alt}
                    className="feature-panel__image"
                    height={700}
                    src={item.image.src}
                    width={900}
                  />
                </div>
              ) : (
                <div className="feature-panel__image-wrap feature-panel__image-wrap--brand">
                  <div className="feature-panel__brand-card">
                    <Image
                      alt="KMS logo"
                      className="feature-panel__brand-logo"
                      height={144}
                      src="/media/logo.jpg"
                      width={144}
                    />
                    <LocalizedText
                      as="span"
                      className="feature-panel__placeholder-badge"
                      text={headTeacherCardLabel}
                    />
                    <LocalizedText as="h3" text={headTeacherCardTitle} />
                    <LocalizedText
                      as="p"
                      className="feature-panel__brand-note"
                      text={headTeacherCardSummary}
                    />
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-header">
            <div>
              <LocalizedText as="h2" text={campusLifeTitle} />
            </div>
          </div>

          <div className="grid-4">
            {featuredGalleryItems.map((item) => (
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
              <LocalizedText as="h2" text={latestNewsLabel} />
              <LocalizedText as="p" className="lede" text={latestNewsDescription} />
            </div>
            <Link className="btn btn--ghost" href="/blog">
              <LocalizedText text={viewAllUpdatesText} />
            </Link>
          </div>

          <div className="grid-2">
            {featuredPosts.map((post) => (
              <article className="story-card story-card--home" key={post.id}>
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
        <div className="shell">
          <div className="section-header">
            <div>
              <LocalizedText
                as="h2"
                text={{ en: "Latest Results & Notices", bn: "সর্বশেষ ফলাফল ও নোটিশ" }}
              />
            </div>
          </div>
          {latestResult ? (
            <article className="notice-spotlight">
              <div className="notice-spotlight__header">
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
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell">
          <article className="feature-panel feature-panel--admissions">
            <div className="feature-panel__copy">
              <LocalizedText as="h2" text={admissionFormTitle} />
              <LocalizedText as="p" text={admissionFormDescription} />
              <ul className="feature-panel__list">
                {admissionFormSteps.map((item) => (
                  <li key={item.en}>
                    <LocalizedText text={item} />
                  </li>
                ))}
              </ul>
              <div className="feature-panel__actions">
                <a className="btn btn--accent" download href="/forms/kms-admission-form.pdf">
                  <LocalizedText text={admissionFormDownloadText} />
                </a>
                <Link className="btn btn--ghost" href="/admissions">
                  <LocalizedText text={admissionFormLinkText} />
                </Link>
              </div>
              <LocalizedText
                as="p"
                className="helper-text"
                text={admissionFormSupportText}
              />
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
