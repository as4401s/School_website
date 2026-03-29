import Image from "next/image";

import { AcademicCatMascot } from "@/components/academic-cat-mascot";
import { LocalizedText } from "@/components/language-provider";
import type { BilingualText } from "@/data/site-content";
import { PageIntro } from "@/components/page-intro";

type LearningCard = {
  title: BilingualText;
  intro: BilingualText[];
  listIntro?: BilingualText;
  bullets?: BilingualText[];
  imageUrl: string;
  accent: string;
};

const introEyebrow = {
  en: "Learning at KMS",
  bn: "শিক্ষণ পদ্ধতি",
};

const introTitle = {
  en: "Learning at KMS",
  bn: "শিক্ষণ পদ্ধতি",
};

const introSummary = {
  en: "Learning at KMS is designed to help children explore, discover, and grow with confidence.",
  bn: "কেএমএস-এর শিক্ষণ পদ্ধতি এমনভাবে গড়ে তোলা, যাতে শিশুদের মধ্যে অনুসন্ধিৎসু মনোভাব, নতুন কিছু জানার ও শেখার আগ্রহ তৈরি হয় এবং তারা আত্মবিশ্বাসের সাথে বেড়ে উঠতে পারে।",
};

const learningIntroParagraphs: BilingualText[] = [
  {
    en: "**We believe that young children learn best when they are curious and actively involved in the learning process.**",
    bn: "**আমাদের বিশ্বাস, ছোট শিশুরা তখনই সবচেয়ে ভালো শেখে যখন তারা নিজে সক্রিয়ভাবে শিক্ষণীয় কাজে অংশগ্রহণ করে।**",
  },
  {
    en: "**Through a variety of carefully designed tools and activities, children experience learning in ways that are engaging, meaningful, and enjoyable.**",
    bn: "**যত্নসহকারে পরিকল্পিত বিভিন্ন উপকরণ ও কার্যক্রমের মাধ্যমে শিক্ষাপদ্ধতিকে এমনভাবে উপস্থাপন করা হয়, যা শিশুদের কাছে আনন্দদায়ক, অর্থপূর্ণ এবং অংশগ্রহণমূলক হয়ে ওঠে।**",
  },
];

const learningCards: LearningCard[] = [
  {
    title: {
      en: "Hands-on Learning Materials",
      bn: "হাতে-কলমে শেখার উপকরণ",
    },
    intro: [
      {
        en: "Children learn by touching, observing, and exploring different learning materials that help them understand ideas in a simple and natural way.",
        bn: "শিশুরা স্পর্শ, পর্যবেক্ষণ এবং বিভিন্ন উপকরণ ব্যবহার করার মাধ্যমেই যে কোনো ধারণা খুব সহজ ও স্বাভাবিকভাবে বুঝতে শেখে।",
      },
    ],
    listIntro: {
      en: "Examples include:",
      bn: "এই ধরনের কার্যক্রমের মধ্যে রয়েছে:",
    },
    bullets: [
      {
        en: "Shape and pattern blocks",
        bn: "আকৃতি ও নকশা বোঝার ব্লক",
      },
      {
        en: "Number boards and counting objects",
        bn: "সংখ্যা বোর্ড ও গণনার সামগ্রী",
      },
      {
        en: "Sorting and matching activities",
        bn: "বাছাই ও মিল খোঁজার কার্যক্রম",
      },
      {
        en: "Building blocks and puzzles",
        bn: "গঠনমূলক ব্লক ও ধাঁধা",
      },
    ],
    imageUrl: "/media/nano_banana_mathematics.png",
    accent: "var(--tone-orange)",
  },
  {
    title: {
      en: "Creative Activities",
      bn: "সৃজনশীল কার্যক্রম",
    },
    intro: [
      {
        en: "Creativity plays an important role in early childhood learning.",
        bn: "শৈশবের শিক্ষায় সৃজনশীলতা এক গুরুত্বপূর্ণ ভূমিকা পালন করে।",
      },
      {
        en: "Children regularly take part in activities that help them imagine, express, and create with joy.",
        bn: "শিশুরা নিয়মিত এমন সব কাজে অংশ নেয় যা তাদের কল্পনা করতে, নিজেদের প্রকাশ করতে এবং আনন্দের সাথে নতুন কিছু তৈরি করতে সাহায্য করে।",
      },
    ],
    listIntro: {
      en: "Children regularly participate in activities such as:",
      bn: "এ ধরনের কার্যক্রমের মধ্যে রয়েছে:",
    },
    bullets: [
      {
        en: "Drawing and coloring",
        bn: "ছবি আঁকা এবং রং করা",
      },
      {
        en: "Paper crafts and simple art projects",
        bn: "কাগজের কাজ এবং সহজ শিল্পকর্ম",
      },
      {
        en: "Clay modeling",
        bn: "মাটির কাজ বা ক্লে মডেলিং",
      },
      {
        en: "Creative storytelling",
        bn: "সৃজনশীল গল্প বলা",
      },
    ],
    imageUrl: "/media/nano_banana_writing.png",
    accent: "var(--tone-red)",
  },
  {
    title: {
      en: "Language Development",
      bn: "ভাষার বিকাশ",
    },
    intro: [
      {
        en: "Strong communication skills begin at an early age.",
        bn: "যোগাযোগের শক্তিশালী দক্ষতা অর্জনের শুরু হয় শৈশব থেকেই।",
      },
      {
        en: "At KMS, language learning supports listening, speaking, understanding, and confident expression.",
        bn: "KMS-এ ভাষা শিক্ষা শিশুদের শোনা, বলা, বোঝা এবং আত্মবিশ্বাসের সাথে নিজেদের প্রকাশ করার ক্ষমতা তৈরি করতে সাহায্য করে।",
      },
    ],
    listIntro: {
      en: "At KMS, language learning includes:",
      bn: "এই ধরনের কার্যক্রমের মধ্যে রয়েছে :",
    },
    bullets: [
      {
        en: "Storytelling sessions",
        bn: "গল্প বলার আসর",
      },
      {
        en: "Rhymes and songs",
        bn: "ভাষা ও ছন্দের গান",
      },
      {
        en: "Picture reading activities",
        bn: "ছবি দেখে ভাষা বোঝার কাজ",
      },
      {
        en: "Simple speaking and listening exercises",
        bn: "সহজ ভাষা বলা ও শোনার অভ্যাস",
      },
    ],
    imageUrl: "/media/nano_banana_literacy.png",
    accent: "var(--tone-navy)",
  },
  {
    title: {
      en: "Play-Based Learning",
      bn: "খেলাধুলোর মাধ্যমে শিক্ষা",
    },
    intro: [
      {
        en: "Play is an important part of how children understand the world around them.",
        bn: "শিশুরা তাদের চারপাশের পৃথিবীকে বুঝতে শেখে অনেকটাই খেলার মাধ্যমে।",
      },
      {
        en: "Play-based experiences help them build curiosity, teamwork, imagination, and confidence in a natural way.",
        bn: "খেলার ছলে অর্জিত অভিজ্ঞতা শিশুদের কৌতূহল, দলগতভাবে কাজ করার মানসিকতা, কল্পনাশক্তি এবং আত্মবিশ্বাস গড়ে তুলতে সাহায্য করে।",
      },
    ],
    listIntro: {
      en: "Our play-based learning includes:",
      bn: "এই ধরনের কার্যক্রমের মধ্যে রয়েছে :",
    },
    bullets: [
      {
        en: "Group games",
        bn: "দলগত খেলাধুলো",
      },
      {
        en: "Interactive classroom activities",
        bn: "শ্রেণিকক্ষে মিথস্ক্রিয়ামূলক কাজ",
      },
      {
        en: "Outdoor play",
        bn: "বাইরে মুক্তভাবে খেলাধুলো",
      },
      {
        en: "Role-play and imagination games",
        bn: "ভূমিকা অভিনয় ও কল্পনাভিত্তিক খেলাধুলো",
      },
    ],
    imageUrl: "/media/nano_banana_pe.png",
    accent: "var(--tone-green)",
  },
  {
    title: {
      en: "Practical Life Activities",
      bn: "দৈনন্দিন জীবনচর্চামূলক কার্যক্রম",
    },
    intro: [
      {
        en: "This Montessori element encourages children to develop independence through everyday tasks and purposeful movement.",
        bn: "মন্টেশরি শিক্ষার এই অংশে শিশুদের প্রতিদিনের ছোট ছোট কাজ এবং উদ্দেশ্যমূলক চলাফেরার মাধ্যমে স্বাবলম্বী হয়ে উঠতে উৎসাহিত করে।",
      },
    ],
    listIntro: {
      en: "Examples include:",
      bn: "এই ধরনের কার্যক্রমের মধ্যে রয়েছে :",
    },
    bullets: [
      {
        en: "Organizing learning materials",
        bn: "শেখার উপকরণ গুছিয়ে রাখা",
      },
      {
        en: "Simple classroom responsibilities",
        bn: "শ্রেণিকক্ষের ছোটখাটো দায়িত্ব পালন করা",
      },
      {
        en: "Hands-on tasks that improve coordination and focus",
        bn: "হাতে-কলমে কাজ করা, যা শিশুদের মনোযোগ এবং সমন্বয় বাড়াতে সাহায্য করে",
      },
      {
        en: "Sensory activities",
        bn: "ইন্দ্রিয়নির্ভর অনুশীলন",
      },
    ],
    imageUrl: "/media/nano_banana_science.png",
    accent: "var(--tone-sand)",
  },
];

export default function AcademicsPage() {
  const primaryCards = learningCards.slice(0, 3);
  const secondaryCards = learningCards.slice(3);

  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell" style={{ maxWidth: "980px" }}>
          <article className="portal-card stack">
            {learningIntroParagraphs.map((paragraph) => (
              <LocalizedText as="p" key={paragraph.en} text={paragraph} />
            ))}
          </article>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell grid-3 learning-grid" style={{ alignItems: "stretch" }}>
          {primaryCards.map((card) => (
            <article className="subject-card subject-card--detail" key={card.title.en}>
              <div
                style={{
                  background: card.accent,
                  height: 10,
                }}
              />
              <div className="subject-card__image-wrap">
                <Image
                  alt={card.title.en}
                  src={card.imageUrl}
                  width={400}
                  height={300}
                  className="subject-card__image"
                />
              </div>
              <div className="subject-card__body">
                <LocalizedText as="h3" text={card.title} />
                {card.intro.map((paragraph) => (
                  <LocalizedText as="p" key={paragraph.en} text={paragraph} />
                ))}
                {card.listIntro ? <LocalizedText as="p" text={card.listIntro} /> : null}
                {card.bullets ? (
                  <ul className="about-list">
                    {card.bullets.map((item) => (
                      <li key={item.en}>
                        <LocalizedText text={item} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell learning-grid-secondary-shell">
          <div className="learning-grid-secondary">
            {secondaryCards.map((card) => (
              <article className="subject-card subject-card--detail" key={card.title.en}>
                <div
                  style={{
                    background: card.accent,
                    height: 10,
                  }}
                />
                <div className="subject-card__image-wrap">
                  <Image
                    alt={card.title.en}
                    src={card.imageUrl}
                    width={400}
                    height={300}
                    className="subject-card__image"
                  />
                </div>
                <div className="subject-card__body">
                  <LocalizedText as="h3" text={card.title} />
                  {card.intro.map((paragraph) => (
                    <LocalizedText as="p" key={paragraph.en} text={paragraph} />
                  ))}
                  {card.listIntro ? <LocalizedText as="p" text={card.listIntro} /> : null}
                  {card.bullets ? (
                    <ul className="about-list">
                      {card.bullets.map((item) => (
                        <li key={item.en}>
                          <LocalizedText text={item} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div aria-hidden="true" className="learning-grid-secondary__mascot">
            <AcademicCatMascot variant="reader" />
          </div>
        </div>
      </section>
    </>
  );
}
