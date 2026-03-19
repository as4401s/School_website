import Link from "next/link";

import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import {
  TopicIllustration,
  type TopicIllustrationKind,
} from "@/components/topic-illustration";
import type { BilingualText } from "@/data/site-content";

type MediaSection = {
  href: "/blog" | "/gallery" | "/announcements";
  title: BilingualText;
  summary: BilingualText;
  action: BilingualText;
  illustration: TopicIllustrationKind;
};

const introEyebrow = {
  en: "Media",
  bn: "মিডিয়া",
};

const introTitle = {
  en: "Media",
  bn: "মিডিয়া",
};

const introSummary = {
  en: "Find school stories, photo highlights, and important notices for families in one place.",
  bn: "বিদ্যালয়ের অনুষ্ঠান, ছবির ঝলক এবং পরিবারের জন্য প্রয়োজনীয় বিজ্ঞপ্তিগুলি একসঙ্গে এই অংশে পাওয়া যাবে।",
};

const mediaOverviewLabel = {
  en: "Subsections",
  bn: "উপবিভাগ",
};

const mediaOverviewTitle = {
  en: "Three sections inside the media tab",
  bn: "মিডিয়া ট্যাবের তিনটি বিভাগ",
};

const mediaOverviewSummary = {
  en: "The media section brings together public updates from across school life so families can quickly find the kind of information they need.",
  bn: "স্কুলজীবনের বিভিন্ন দিকের প্রকাশ্য আপডেট একত্রে সাজানো হয়েছে এই অংশে, যাতে পরিবারগুলি সহজে প্রয়োজনীয় তথ্য খুঁজে পেতে পারেন।",
};

const mediaSections: MediaSection[] = [
  {
    href: "/blog",
    title: {
      en: "Events & News",
      bn: "অনুষ্ঠান ও সংবাদ",
    },
    summary: {
      en: "School celebrations, recent activities, and public updates from campus life.",
      bn: "বিদ্যালয়ের অনুষ্ঠান, সাম্প্রতিক কার্যক্রম এবং ক্যাম্পাস-জীবনের গুরুত্বপূর্ণ খবর এই অংশে প্রকাশিত হয়।",
    },
    action: {
      en: "Open Events & News",
      bn: "অনুষ্ঠান ও সংবাদ দেখুন",
    },
    illustration: "news",
  },
  {
    href: "/gallery",
    title: {
      en: "Gallery",
      bn: "গ্যালারি",
    },
    summary: {
      en: "A visual collection of classrooms, campus moments, and school celebrations.",
      bn: "শ্রেণিকক্ষ, ক্যাম্পাসের মুহূর্ত এবং বিদ্যালয়ের বিভিন্ন উদ্‌যাপনের ছবি এখানে দেখা যাবে।",
    },
    action: {
      en: "Open Gallery",
      bn: "গ্যালারি দেখুন",
    },
    illustration: "gallery",
  },
  {
    href: "/announcements",
    title: {
      en: "Announcements",
      bn: "বিজ্ঞপ্তি",
    },
    summary: {
      en: "Important notices, circulars, and updates that families may need to follow.",
      bn: "পরিবারগুলির জন্য প্রয়োজনীয় গুরুত্বপূর্ণ নোটিশ, সার্কুলার ও আপডেট এই বিভাগে প্রকাশ করা হয়।",
    },
    action: {
      en: "Open Announcements",
      bn: "বিজ্ঞপ্তি দেখুন",
    },
    illustration: "media",
  },
];

export default function MediaPage() {
  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell stack">
          <article className="portal-card stack">
            <LocalizedText as="p" className="eyebrow" text={mediaOverviewLabel} />
            <div className="section-heading">
              <TopicIllustration kind="media" />
              <LocalizedText as="h2" className="portal-title" text={mediaOverviewTitle} />
            </div>
            <LocalizedText as="p" text={mediaOverviewSummary} />
          </article>

          <div className="grid-3">
            {mediaSections.map((section) => (
              <article className="portal-card stack" key={section.href}>
                <TopicIllustration kind={section.illustration} />
                <LocalizedText as="p" className="eyebrow" text={introEyebrow} />
                <LocalizedText as="h3" text={section.title} />
                <LocalizedText as="p" text={section.summary} />
                <Link className="btn btn--ghost" href={section.href}>
                  <LocalizedText text={section.action} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
