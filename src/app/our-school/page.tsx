import Image from "next/image";

import {
  TopicIllustration,
  type TopicIllustrationKind,
} from "@/components/topic-illustration";
import { LocalizedText } from "@/components/language-provider";
import type { BilingualText } from "@/data/site-content";
import { PageIntro } from "@/components/page-intro";

type AboutCard = {
  title: BilingualText;
  intro: BilingualText;
  listIntro: BilingualText;
  bullets: BilingualText[];
  imageUrl: string;
  character: TopicIllustrationKind;
};

const introEyebrow = {
  en: "About",
  bn: "আমাদের সম্পর্কে",
};

const introTitle = {
  en: "A closer look at life and learning at KMS",
  bn: "কেএমএস-এর শেখা ও বিদ্যালয়জীবনের আরও কাছের পরিচয়",
};

const introSummary = {
  en: "This page brings together the environment, values, and learning culture that shape everyday life at Krishnarati Montessori School.",
  bn: "কৃষ্ণরাতি মন্টেসরি স্কুলের প্রতিদিনের পরিবেশ, মূল্যবোধ এবং শেখার সংস্কৃতির একটি সমন্বিত পরিচয় এই পৃষ্ঠায় তুলে ধরা হয়েছে।",
};

const learningEnvironmentTitle = {
  en: "Our Learning Environment",
  bn: "আমাদের শিক্ষার পরিবেশ",
};

const learningEnvironmentParagraphs: BilingualText[] = [
  {
    en: "At KMS, we believe that children learn best in an environment where they feel safe, happy, and encouraged to explore.",
    bn: "কেএমএস-এ আমাদের বিশ্বাস, শিশুরা সবচেয়ে ভালো শেখে এমন পরিবেশে যেখানে তারা নিরাপদ বোধ করে, আনন্দে থাকে এবং নতুন কিছু জানতে উৎসাহ পায়।",
  },
  {
    en: "Our classrooms are designed to support curiosity, creativity, and active learning through daily routines that are warm, engaging, and age-appropriate.",
    bn: "আমাদের শ্রেণিকক্ষ এমনভাবে গড়ে তোলা হয়, যাতে উষ্ণ, অংশগ্রহণমূলক এবং বয়সোপযোগী কার্যক্রমের মধ্য দিয়ে কৌতূহল, সৃজনশীলতা ও সক্রিয় শেখা বিকশিত হয়।",
  },
];

const learningEnvironmentListIntro = {
  en: "In our school, children experience:",
  bn: "আমাদের বিদ্যালয়ে শিশুরা পায়:",
};

const learningEnvironmentBullets: BilingualText[] = [
  {
    en: "Bright and welcoming classrooms that encourage exploration",
    bn: "অনুসন্ধিৎসু মনকে উৎসাহিত করে এমন উজ্জ্বল ও আন্তরিক শ্রেণিকক্ষ",
  },
  {
    en: "Learning through play, stories, songs, and creative activities",
    bn: "খেলা, গল্প, গান ও সৃজনশীল কাজের মধ্য দিয়ে শেখার সুযোগ",
  },
  {
    en: "Teachers who guide children with patience and care",
    bn: "ধৈর্য ও স্নেহের সঙ্গে শিশুদের পথ দেখান এমন শিক্ষক",
  },
  {
    en: "Activities that support both individual learning and group interaction",
    bn: "ব্যক্তিগত শেখা ও দলগত অংশগ্রহণ দুটোকেই গুরুত্ব দেয় এমন কার্যক্রম",
  },
  {
    en: "A positive atmosphere where children feel confident to express themselves",
    bn: "এমন ইতিবাচক পরিবেশ, যেখানে শিশুরা আত্মবিশ্বাসের সঙ্গে নিজেদের প্রকাশ করতে পারে",
  },
  {
    en: "Opportunities to develop social skills, creativity, and early communication",
    bn: "সামাজিক দক্ষতা, সৃজনশীলতা এবং প্রাথমিক যোগাযোগক্ষমতা গড়ে তোলার সুযোগ",
  },
];

const aboutCards: AboutCard[] = [
  {
    title: {
      en: "Our Approach to Early Education",
      bn: "প্রারম্ভিক শিক্ষায় আমাদের দৃষ্টিভঙ্গি",
    },
    intro: {
      en: "At KMS, early education focuses on building a strong foundation for lifelong learning. We believe that young children learn best when learning is engaging, meaningful, and enjoyable.",
      bn: "কেএমএস-এ প্রারম্ভিক শিক্ষার মূল লক্ষ্য হল এমন এক দৃঢ় ভিত্তি গড়ে তোলা, যা শিশুর আজীবন শিক্ষাযাত্রাকে শক্তপোক্ত করে। আমাদের বিশ্বাস, ছোটরা সবচেয়ে ভালো শেখে যখন শেখা আনন্দময়, অর্থপূর্ণ এবং মনোযোগ টানে।",
    },
    listIntro: {
      en: "Our approach includes:",
      bn: "আমাদের এই দৃষ্টিভঙ্গির প্রধান দিকগুলি হল:",
    },
    bullets: [
      {
        en: "Encouraging curiosity and natural exploration",
        bn: "কৌতূহল ও স্বাভাবিক অনুসন্ধিৎসু মনকে উৎসাহ দেওয়া",
      },
      {
        en: "Developing early language and communication skills",
        bn: "ভাষা ও যোগাযোগের প্রাথমিক দক্ষতা গড়ে তোলা",
      },
      {
        en: "Introducing numbers and basic problem-solving through activities",
        bn: "কার্যক্রমের মাধ্যমে সংখ্যা-জ্ঞান ও প্রাথমিক সমস্যা সমাধানের চর্চা শুরু করা",
      },
      {
        en: "Promoting creativity through drawing, storytelling, and play",
        bn: "আঁকা, গল্প বলা ও খেলার মাধ্যমে সৃজনশীলতা লালন করা",
      },
      {
        en: "Helping children build confidence and independence",
        bn: "শিশুদের আত্মবিশ্বাস ও স্বনির্ভরতা গড়ে তুলতে সাহায্য করা",
      },
      {
        en: "Supporting emotional and social development through group interaction",
        bn: "দলগত মেলামেশার মাধ্যমে মানসিক ও সামাজিক বিকাশে সহায়তা করা",
      },
    ],
    imageUrl: "/media/Humaniapota%20School/IMG_3343.jpg",
    character: "montessori",
  },
  {
    title: {
      en: "Our Commitment",
      bn: "আমাদের অঙ্গীকার",
    },
    intro: {
      en: "At KMS, we are committed to creating a supportive and inspiring place where children can begin their educational journey with confidence.",
      bn: "কেএমএস-এ আমরা এমন একটি সহায়ক ও অনুপ্রেরণাময় পরিবেশ গড়ে তুলতে প্রতিশ্রুতিবদ্ধ, যেখানে শিশুরা আত্মবিশ্বাসের সঙ্গে তাদের শিক্ষাযাত্রা শুরু করতে পারে।",
    },
    listIntro: {
      en: "Our commitment includes:",
      bn: "আমাদের অঙ্গীকারের প্রধান দিকগুলি হল:",
    },
    bullets: [
      {
        en: "Providing a safe and caring learning environment",
        bn: "নিরাপদ ও স্নেহময় শিক্ষার পরিবেশ তৈরি করা",
      },
      {
        en: "Giving personal attention to every child",
        bn: "প্রতিটি শিশুকে ব্যক্তিগত যত্ন ও মনোযোগ দেওয়া",
      },
      {
        en: "Supporting each child’s individual pace of learning",
        bn: "প্রতিটি শিশুর নিজস্ব গতিতে শেখার পথকে সম্মান করা",
      },
      {
        en: "Encouraging positive values such as kindness and respect",
        bn: "সহমর্মিতা, সৌজন্য ও পারস্পরিক সম্মানের মতো ইতিবাচক মূল্যবোধ গড়ে তোলা",
      },
      {
        en: "Building a strong foundation for future academic success",
        bn: "ভবিষ্যতের শিক্ষাজীবনের জন্য একটি শক্ত ভিত্তি তৈরি করা",
      },
    ],
    imageUrl: "/media/tour-3.jpg",
    character: "vision",
  },
];

const environmentTiles = learningEnvironmentBullets.map((item, index) => ({
  text: item,
  character: (["school", "media", "montessori", "application", "vision", "contact"] as TopicIllustrationKind[])[index],
}));

const futureUpdateLabel = {
  en: "More Updates",
  bn: "পরবর্তী সংযোজন",
};

const futureUpdateTitle = {
  en: "Teacher information will be added later",
  bn: "শিক্ষক-শিক্ষিকাদের তথ্য পরে যুক্ত করা হবে",
};

const futureUpdateText = {
  en: "Additional teacher details and other school information will be added to this page once the material is received.",
  bn: "শিক্ষক-শিক্ষিকাদের বিস্তারিত পরিচিতি এবং বিদ্যালয়ের আরও কিছু তথ্য প্রয়োজনীয় উপকরণ পাওয়া গেলে পরে এই পৃষ্ঠাতেই যুক্ত করা হবে।",
};

export default function OurSchoolPage() {
  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell feature-panel">
          <div className="feature-panel__copy">
            <LocalizedText as="p" className="eyebrow" text={learningEnvironmentTitle} />
            <div className="section-heading">
              <TopicIllustration kind="school" />
              <LocalizedText as="h2" text={learningEnvironmentTitle} />
            </div>
            {learningEnvironmentParagraphs.map((paragraph) => (
              <LocalizedText as="p" key={paragraph.en} text={paragraph} />
            ))}
            <LocalizedText as="p" text={learningEnvironmentListIntro} />
            <div className="mini-tile-grid">
              {environmentTiles.map((item) => (
                <article className="mini-tile" key={item.text.en}>
                  <TopicIllustration kind={item.character} />
                  <LocalizedText as="p" text={item.text} />
                </article>
              ))}
            </div>
          </div>
          <div className="feature-panel__image-wrap">
            <Image
              alt="KMS classroom"
              className="feature-panel__image"
              height={700}
              src="/media/hero-home.jpg"
              width={900}
            />
          </div>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell grid-2">
          {aboutCards.map((card) => (
            <article className="tour-card" key={card.title.en}>
              <div className="tour-card__image-wrap">
                <Image
                  alt={card.title.en}
                  className="tour-card__image"
                  fill
                  sizes="(max-width: 1080px) 100vw, 50vw"
                  src={card.imageUrl}
                />
              </div>
              <div className="tour-card__body stack">
                <TopicIllustration kind={card.character} />
                <LocalizedText as="h3" text={card.title} />
                <LocalizedText as="p" text={card.intro} />
                <LocalizedText as="p" text={card.listIntro} />
                <ul className="about-list">
                  {card.bullets.map((item) => (
                    <li key={item.en}>
                      <LocalizedText text={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell" style={{ maxWidth: "980px" }}>
          <article className="portal-card stack">
            <LocalizedText as="p" className="eyebrow" text={futureUpdateLabel} />
            <LocalizedText as="h2" className="portal-title" text={futureUpdateTitle} />
            <LocalizedText as="p" text={futureUpdateText} />
          </article>
        </div>
      </section>
    </>
  );
}
