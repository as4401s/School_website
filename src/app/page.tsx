import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import {
  BookOpen,
  FileText,
  Users,
} from "lucide-react";

import { HeroCarousel } from "@/components/hero-carousel";
import {
  LocalizedDate,
  LocalizedText,
} from "@/components/language-provider";
import {
  type BilingualText,
  homeHeroSlides,
} from "@/data/site-content";
import { GallerySlider } from "@/components/gallery-slider";
import { AcademicCatMascot } from "@/components/academic-cat-mascot";
import {
  HomeTopicShowcase,
  type HomeTopicItem,
} from "@/components/home-topic-showcase";
import { HomeVideoReel } from "@/components/home-video-reel";
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

const homeLaunchpadTiles = [
  {
    href: "/academics" as Route,
    icon: BookOpen,
    label: {
      en: "Learning Journey",
      bn: "শেখার যাত্রা",
    },
    accentClass: "home-launchpad__tile--coral",
  },
  {
    href: "/our-school" as Route,
    icon: Users,
    label: {
      en: "School Life",
      bn: "স্কুল জীবন",
    },
    accentClass: "home-launchpad__tile--teal",
  },
  {
    href: "/admissions" as Route,
    icon: FileText,
    label: {
      en: "Admissions",
      bn: "ভর্তি",
    },
    accentClass: "home-launchpad__tile--yellow",
  },
];

const homeTopics: HomeTopicItem[] = [
  {
    title: whoWeAreTitle,
    teaser: whoWeAreParagraphs[0],
    paragraphs: whoWeAreParagraphs,
    image: {
      src: "/media/Humaniapota%20School/IMG_3386.jpg",
      alt: "Front entrance of the school campus",
    },
  },
  {
    title: montessoriTitle,
    teaser: montessoriParagraphs[0],
    paragraphs: montessoriParagraphs,
    image: {
      src: "/media/Humaniapota%20School/IMG_3345.jpg",
      alt: "Children working at classroom tables with a teacher nearby",
    },
  },
  {
    title: headTeacherTitle,
    paragraphs: headTeacherParagraphs,
    teaser: headTeacherGreeting,
    image: {
      src: "/media/Humaniapota%20School/pricipal.jpg",
      alt: "Placeholder for the head teacher message image",
    },
  },
];

const campusLifeTitle = {
  en: "Moments from Campus Life",
  bn: "ক্যাম্পাস জীবনের কিছু মুহূর্ত",
};

const campusReelTitle = {
  en: "Campus Videos",
  bn: "ক্যাম্পাস ভিডিও",
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

// IDs of gallery photos to show in the campus-life slider (in display order)
const campusSliderIds = [
  "humaniapota-11",
  "humaniapota-5",
  "humaniapota-13",
  "humaniapota-10",
  "humaniapota-12",
  "humaniapota-6",
  "humaniapota-3",
  "humaniapota-8",
  "humaniapota-15",
  "humaniapota-20",
  "humaniapota-17",
  "humaniapota-4",
];

const campusVideos = [
  {
    src: "/media/Humaniapota%20School/School%20Video.mp4",
    poster: "/media/Humaniapota%20School/IMG_3260.jpg",
  },
  {
    src: "/media/Humaniapota%20School/School%20Video02.mp4",
    poster: "/media/Humaniapota%20School/IMG_3345.jpg",
  },
  {
    src: "/media/Humaniapota%20School/Feb%2026_video.mp4",
    poster: "/media/Humaniapota%20School/IMG_3319.jpg",
  },
];

export default async function HomePage() {
  const [galleryItems, posts, results] = await Promise.all([
    getGalleryItems(),
    getNewsPosts(),
    getResults(),
  ]);

  const featuredPosts = posts.slice(0, 2);
  const latestResult = results[0];

  // Build the ordered, deduped slider items from the full gallery
  const galleryMap = new Map(galleryItems.map((item) => [item.id, item]));
  const sliderItems = campusSliderIds
    .map((id) => galleryMap.get(id))
    .filter(Boolean) as typeof galleryItems;

  return (
    <main className="home-page">
      <section className="hero">
        <div className="shell">
          <HeroCarousel slides={homeHeroSlides} />
        </div>
      </section>

      <section className="section section--tight-top home-launchpad-section">
        <div className="shell">
          <div className="home-launchpad">
            <div className="home-launchpad__band-grid">
              {homeLaunchpadTiles.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    className={`home-launchpad__tile ${item.accentClass}`}
                    href={item.href}
                    key={item.label.en}
                  >
                    <Icon aria-hidden="true" size={24} strokeWidth={2.2} />
                    <LocalizedText as="span" text={item.label} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight-top home-mascot-section">
        <div className="shell">
          <div className="home-mascot-stage">
            <AcademicCatMascot />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <HomeTopicShowcase items={homeTopics} />
        </div>
      </section>

      <section className="section campus-life-section">
        <div className="shell">
          <div className="section-header">
            <div className="mascot-float">
              <Image
                alt="Nano banana mascot waving"
                className="nano-banana"
                height={120}
                src="/media/nano-banana.png"
                width={120}
              />
              <div>
                <div className="rainbow-divider" />
                <LocalizedText as="h2" text={campusLifeTitle} />
              </div>
            </div>
          </div>

          <GallerySlider items={sliderItems} />
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell">
          <div className="section-header">
            <div>
              <LocalizedText as="h2" text={campusReelTitle} />
            </div>
          </div>

          <HomeVideoReel videos={campusVideos} />
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
              <div className="notice-spotlight__footer">
                <Link className="btn btn--accent" href={`/events/${latestResult.slug}`}>
                  <LocalizedText text={viewNoticeText} />
                </Link>
                <LocalizedText
                  as="p"
                  className="notice-spotlight__status"
                  text={latestResult.status}
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
