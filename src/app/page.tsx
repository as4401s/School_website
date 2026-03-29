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
import {
  HomeTopicShowcase,
  type HomeTopicItem,
} from "@/components/home-topic-showcase";
import { HomeVideoReel } from "@/components/home-video-reel";
import {
  getGalleryItems,
  getHomeNewsPosts,
  getResults,
} from "@/lib/content";

const latestNewsLabel = {
  en: "Latest News & Announcements",
  bn: "সাম্প্রতিক সংবাদ ও বিজ্ঞপ্তি",
};

const latestNewsDescription = {
  en: "Recent celebrations, school stories, and important public updates from the current school year.",
  bn: "বর্তমান শিক্ষাবর্ষের সাম্প্রতিক উৎসব ও বিদ্যালয়-সম্পর্কিত তথ্য।",
};

const whoWeAreTitle = {
  en: "Who We Are",
  bn: "আমাদের পরিচয়",
};

const whoWeAreParagraphs: BilingualText[] = [
  {
    en: "Krishnarati Montessori School (KMS) is an initiative of the NGBM Foundation, started in the second half of 2022 at the foundation's ancestral home in Humania Pota.",
    bn: "কৃষ্ণারতি মন্টেসরি স্কুল (কেএমএস) হল এনজিবিএম ফাউন্ডেশনের একটি উদ্যোগ, যা ২০২২ সালের দ্বিতীয়ার্ধে হুমানিয়াপোতায় প্রতিষ্ঠাতার পৈতৃক নিবাসে শুরু হয়।",
  },
  {
    en: "The school was founded with a simple aim: to bring quality English-medium early education closer to local families and give children a joyful beginning to their learning journey.",
    bn: "স্কুলটির মূল লক্ষ্য হল: স্থানীয় পরিবারের শিশুদের কাছে মানসম্মত ইংরেজি মাধ্যমের প্রারম্ভিক শিক্ষাকে আরও সহজলভ্য করে তোলা এবং তাদের শিক্ষাজীবনকে আরও আনন্দময় করে তোলা।",
  },
  {
    en: "At KMS, school life is shaped by stories, songs, play, creative work, and caring relationships so that children grow with confidence, curiosity, and a strong sense of belonging.",
    bn: "কেএমএস-এ শিশুদের স্কুল জীবন গল্প, গান, খেলাধুলা, সৃজনশীল কাজ এবং স্নেহপূর্ণ সম্পর্কের মাধ্যমে এমনভাবে সাজানো হয়, যাতে তারা আত্মবিশ্বাস, কৌতূহল এবং প্রবল একাত্মবোধ নিয়ে বেড়ে উঠতে পারে।",
  },
];

const montessoriTitle = {
  en: "Montessori Philosophy",
  bn: "মন্টেসরি শিক্ষাদর্শ",
};

const montessoriParagraphs: BilingualText[] = [
  {
    en: "KMS follows the Montessori approach, which respects each child as an individual learner and encourages discovery through observation, movement, and hands-on experiences.",
    bn: "কেএমএস-এ মন্টেসরি শিক্ষাদর্শ অনুসরণ করা হয়, যা প্রতিটি শিশুকে একজন স্বতন্ত্র শিক্ষার্থী হিসেবে মূল্যায়ন করে এবং বিভিন্ন হাতে-কলমে অভিজ্ঞতার মাধ্যমে শিক্ষা অর্জন করতে উৎসাহিত করে।",
  },
  {
    en: "Children are guided step by step to explore materials, ask questions, make choices, and think independently rather than only memorizing or listening.",
    bn: "শিশুদের কেবল প্রথাগত শিক্ষার মধ্যে সীমাবদ্ধ না রেখে, বিভিন্ন উপকরণের মাধ্যমে প্রশ্ন করতে, নিজেদের পছন্দ নির্বাচন করতে এবং স্বাধীনভাবে চিন্তা করতে উৎসাহ দেওয়া হয়।",
  },
  {
    en: "With patient guidance and a supportive environment, this method helps children build independence, concentration, creativity, and problem-solving skills.",
    bn: "সঠিক পরিচালনা ও সহায়ক পরিবেশ শিশুদের স্বনির্ভর, মনোযোগী, সৃজনশীল ও বিভিন্ন সমস্যা সমাধানে দক্ষ হতে সাহায্য করে।",
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
    bn: "এমন একটি বিদ্যালয়ে আপনাদের স্বাগত জানাতে পেরে আমরা আনন্দিত, যেখানে প্রতিটি শিশুকে যত্ন, সম্মান এবং উৎসাহের সঙ্গে বড় হতে সাহায্য করা হয়। আমাদের বিশ্বাস, শৈশবের শিক্ষা হওয়া উচিত আনন্দময়, অর্থপূর্ণ ও বৈচিত্রের উচ্ছ্বাসে ভরা।",
  },
  {
    en: "Our teachers work with dedication to create a warm and safe environment where children feel confident to explore, ask questions, and express themselves.",
    bn: "আমাদের শিক্ষকবৃন্দ অত্যন্ত নিষ্ঠার সাথে একটি মমতাময় ও নিরাপদ পরিবেশ গড়ে তুলতে কাজ করেন, যেখানে শিশুরা আত্মবিশ্বাসের সাথে অজানাকে জানতে, প্রশ্ন করতে এবং নিজেদের প্রকাশ করতে স্বাচ্ছন্দ্য বোধ করে।",
  },
  {
    en: "We also believe that close communication between school and parents plays an essential role in a child's progress. Together, we hope to build a strong foundation for confidence, curiosity, and a lifelong love for learning.",
    bn: "আমরা আরও বিশ্বাস করি যে, শিশুর সার্বিক উন্নতিতে বিদ্যালয় এবং অভিভাবকদের মধ্যে নিবিড় যোগাযোগ একটি অপরিহার্য ভূমিকা পালন করে। আমরা আশাবাদী যে, সকলে মিলে আমরা শিশুদের আত্মবিশ্বাস, কৌতূহল এবং শেখার প্রতি ভালোবাসার এক সুদৃঢ় ভিত্তি গড়ে তুলতে পারব।",
  },
  {
    en: "Bandana Mukherjee",
    bn: "Bandana Mukherjee",
  },
  {
    en: "Principal, KMS",
    bn: "Principal, KMS",
  },
];

const admissionFormTitle = {
  en: "Application Form",
  bn: "ভর্তি ফর্ম",
};

const admissionFormDescription = {
  en: "Guardians can download the printable admission form, fill in the child and parent details at home, sign it after printing, and submit it at the school office with the required documents.",
  bn: "অভিভাবকগণ এখান থেকেই ভর্তি ফর্ম ডাউনলোড করে বাড়িতে বসে সকল প্রয়োজনীয় তথ্য পূরণ করতে পারবেন, প্রিন্ট নেওয়ার পর স্বাক্ষর করে প্রয়োজনীয় নথিসহ স্কুল অফিসে জমা দিতে পারবেন।",
};

const admissionFormSteps: BilingualText[] = [
  {
    en: "Complete the student, parent, and guardian details clearly.",
    bn: "শিক্ষার্থী, অভিভাবক ও প্রয়োজনে স্থানীয় অভিভাবকের তথ্য স্পষ্টভাবে পূরণ করতে হবে।",
  },
  {
    en: "Print the form, attach a recent passport-size photograph, and sign it by hand.",
    bn: "ফর্মটি প্রিন্ট করে সাম্প্রতিক পাসপোর্ট সাইজ ছবি সংযুক্ত করতে হবে এবং হাতে স্বাক্ষর করতে হবে।",
  },
  {
    en: "Submit it to the school office along with the listed supporting documents.",
    bn: "উল্লিখিত প্রয়োজনীয় কাগজপত্রসহ স্কুল অফিসে ফর্মটি জমা দিতে হবে।",
  },
];

const admissionFormDownloadText = {
  en: "Download Form (PDF)",
  bn: "ফর্ম ডাউনলোড",
};

const admissionFormLinkText = {
  en: "View Admission Details",
  bn: "ভর্তির বিস্তারিত তথ্য",
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
    showMascot: true,
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
      src: "/media/head_teacher.jpg",
      alt: "Head Teacher of KMS",
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

const viewGalleryText = {
  en: "View Gallery",
  bn: "গ্যালারি দেখুন",
};

const viewAllUpdatesText = {
  en: "View all updates",
  bn: "সব আপডেট দেখুন",
};

const announcementMetaText = {
  en: "Announcement",
  bn: "বিজ্ঞপ্তি",
};

const announcementActionText = {
  en: "Open Announcements",
  bn: "বিজ্ঞপ্তি দেখুন",
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
  en: "Latest public notices, circulars, and result updates for guardians.",
  bn: "অভিভাবকদের জন্য সাম্প্রতিক খবর ও ফলাফল-সম্পর্কিত তথ্য।",
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
  const [galleryItems, featuredPosts, results] = await Promise.all([
    getGalleryItems(),
    getHomeNewsPosts(),
    getResults(),
  ]);

  const latestResult = results[0];
  const announcementHighlights: {
    id: string;
    title: BilingualText;
    excerpt: BilingualText;
    href: string;
    imageUrl?: string;
    meta: BilingualText;
    action: BilingualText;
  }[] = [
    {
      id: "announcement-tuition-support",
      title: {
        en: "Free / Low-Cost Tuition for Students",
        bn: "ছাত্র-ছাত্রীদের জন্য বিনামূল্যে বা স্বল্প খরচে টিউশন",
      },
      excerpt: {
        en: "The NGBM Pathshala at Humaniapota will offer free or low-cost tuition for students from Class 2 to Class 8 starting January 2026.",
        bn: "হুমানিয়াপোতায় অবস্থিত এনজিবিএম পাঠশালায় ২০২৬ সালের জানুয়ারি থেকে দ্বিতীয় শ্রেণি থেকে অষ্টম শ্রেণি পর্যন্ত ছাত্র-ছাত্রীদের জন্য বিনামূল্যে বা স্বল্প খরচে টিউশনের ব্যবস্থা করা হবে।",
      },
      href: "/announcements" as Route,
      imageUrl: "/media/simple_announcements_board.png",
      meta: announcementMetaText,
      action: announcementActionText,
    },
    latestResult
      ? {
          id: `announcement-${latestResult.id}`,
          title: latestResult.title,
          excerpt: latestResult.summary,
          href: `/events/${latestResult.slug}` as Route,
          imageUrl: "/media/simple_media_announcements.png",
          meta: { en: "Results & Notice", bn: "ফলাফল ও নোটিশ" },
          action: viewNoticeText,
        }
      : {
          id: "announcement-general-updates",
          title: {
            en: "Notices & Updates",
            bn: "বিজ্ঞপ্তি ও আপডেট",
          },
          excerpt: {
            en: "Important school notices, tuition programs, and public updates are available on the announcements page.",
            bn: "বিদ্যালয়ের গুরুত্বপূর্ণ বিজ্ঞপ্তি, টিউশন-সংক্রান্ত খবর এবং প্রয়োজনীয় আপডেট ঘোষণাপত্রের পাতায় পাওয়া যাবে।",
          },
          href: "/announcements" as Route,
          imageUrl: "/media/simple_media_announcements.png",
          meta: announcementMetaText,
          action: announcementActionText,
        },
  ];
  const homeHighlights =
    featuredPosts.length > 0
      ? featuredPosts.map((post) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          href: `/post/${post.slug}` as Route,
          imageUrl: post.imageUrl,
          publishedAt: post.publishedAt,
          action: readMoreText,
        }))
      : announcementHighlights;

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
            <Link className="btn btn--ghost" href="/gallery">
              <LocalizedText text={viewGalleryText} />
            </Link>
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
            {homeHighlights.map((item) => (
              <article className="story-card story-card--home" key={item.id}>
                <div className="story-card__image-wrap" style={{ backgroundColor: '#000' }}>
                  {item.imageUrl ? (
                    <Image
                      alt={item.title.en}
                      className="story-card__image"
                      fill
                      sizes="(max-width: 1080px) 100vw, 50vw"
                      src={item.imageUrl}
                    />
                  ) : null}
                </div>
                <div className="story-card__body stack">
                  {"publishedAt" in item ? (
                    <LocalizedDate className="story-card__meta" value={item.publishedAt} />
                  ) : (
                    <LocalizedText as="p" className="story-card__meta" text={item.meta} />
                  )}
                  <LocalizedText as="h3" text={item.title} />
                  <LocalizedText as="p" text={item.excerpt} />
                  <Link className="btn btn--ghost" href={item.href as Route}>
                    <LocalizedText text={item.action} />
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
                  bn: "গুরুত্বপূর্ণ নোটিশ প্রকাশিত হলে সেগুলি এখানেই দেখা যাবে।",
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
