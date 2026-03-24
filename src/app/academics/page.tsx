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
  bn: "কেএমএস-এর শিক্ষণ পদ্ধতি এমনভাবে গড়ে তোলা, যাতে শিশুরা অনুসন্ধান করতে পারে, নতুন কিছু আবিষ্কার করতে পারে এবং আত্মবিশ্বাসের সঙ্গে বেড়ে উঠতে পারে।",
};

const learningIntroParagraphs: BilingualText[] = [
  {
    en: "**We believe that young children learn best when they are curious and actively involved in the learning process.**",
    bn: "**আমাদের বিশ্বাস, ছোট শিশুরা সবচেয়ে ভালো শেখে যখন তাদের মনে কৌতূহল জাগে এবং তারা নিজে সক্রিয়ভাবে শেখার কাজে অংশ নেয়।**",
  },
  {
    en: "**Through a variety of carefully designed tools and activities, children experience learning in ways that are engaging, meaningful, and enjoyable.**",
    bn: "**যত্নসহকারে পরিকল্পিত নানা উপকরণ ও কার্যক্রমের মাধ্যমে শেখাকে আমরা এমনভাবে উপস্থাপন করি, যা শিশুদের কাছে আনন্দদায়ক, অর্থপূর্ণ এবং অংশগ্রহণমূলক হয়ে ওঠে।**",
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
        bn: "শিশুরা স্পর্শ, পর্যবেক্ষণ ও অন্বেষণের মাধ্যমে নানা শিক্ষাসামগ্রী ব্যবহার করে সহজ ও স্বাভাবিকভাবে ধারণা বুঝতে শেখে।",
      },
    ],
    listIntro: {
      en: "Examples include:",
      bn: "এর মধ্যে রয়েছে:",
    },
    bullets: [
      {
        en: "Shape and pattern blocks",
        bn: "আকৃতি ও নকশা বোঝার ব্লক",
      },
      {
        en: "Number boards and counting objects",
        bn: "সংখ্যা বোর্ড ও গোনার উপকরণ",
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
        bn: "প্রারম্ভিক শিক্ষায় সৃজনশীলতার ভূমিকা অত্যন্ত গুরুত্বপূর্ণ।",
      },
      {
        en: "Children regularly take part in activities that help them imagine, express, and create with joy.",
        bn: "শিশুরা নিয়মিত এমন কার্যক্রমে অংশ নেয়, যা তাদের কল্পনা, প্রকাশক্ষমতা ও আনন্দের সঙ্গে সৃষ্টি করার অভ্যাস গড়ে তোলে।",
      },
    ],
    listIntro: {
      en: "Children regularly participate in activities such as:",
      bn: "এ ধরনের কার্যক্রমের মধ্যে রয়েছে:",
    },
    bullets: [
      {
        en: "Drawing and coloring",
        bn: "আঁকাআঁকি ও রং করা",
      },
      {
        en: "Paper crafts and simple art projects",
        bn: "কাগজের কাজ ও সহজ শিল্পচর্চা",
      },
      {
        en: "Clay modeling",
        bn: "মাটির কাজে আকার তৈরি",
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
        bn: "ভাষা ও যোগাযোগের শক্ত ভিত তৈরি হয় ছোটবেলা থেকেই।",
      },
      {
        en: "At KMS, language learning supports listening, speaking, understanding, and confident expression.",
        bn: "কেএমএস-এ ভাষা শেখার চর্চায় শোনা, বলা, বোঝা এবং আত্মবিশ্বাসের সঙ্গে নিজেকে প্রকাশ করার দক্ষতা একসঙ্গে গড়ে তোলা হয়।",
      },
    ],
    listIntro: {
      en: "At KMS, language learning includes:",
      bn: "কেএমএস-এ ভাষা শেখার অংশ হিসেবে রয়েছে:",
    },
    bullets: [
      {
        en: "Storytelling sessions",
        bn: "গল্প শোনানো ও গল্প বলা",
      },
      {
        en: "Rhymes and songs",
        bn: "ছড়া ও গান",
      },
      {
        en: "Picture reading activities",
        bn: "ছবি দেখে বলা ও বোঝার কাজ",
      },
      {
        en: "Simple speaking and listening exercises",
        bn: "সহজ বলা ও শোনার অনুশীলন",
      },
    ],
    imageUrl: "/media/nano_banana_literacy.png",
    accent: "var(--tone-navy)",
  },
  {
    title: {
      en: "Play-Based Learning",
      bn: "খেলার মাধ্যমে শেখা",
    },
    intro: [
      {
        en: "Play is an important part of how children understand the world around them.",
        bn: "শিশুরা চারপাশের জগৎকে বুঝতে শেখে অনেকটাই খেলার মধ্য দিয়ে।",
      },
      {
        en: "Play-based experiences help them build curiosity, teamwork, imagination, and confidence in a natural way.",
        bn: "খেলাভিত্তিক অভিজ্ঞতা তাদের কৌতূহল, দলগত অংশগ্রহণ, কল্পনাশক্তি ও আত্মবিশ্বাসকে স্বাভাবিকভাবে বিকশিত করে।",
      },
    ],
    listIntro: {
      en: "Our play-based learning includes:",
      bn: "আমাদের খেলাভিত্তিক শেখার মধ্যে রয়েছে:",
    },
    bullets: [
      {
        en: "Group games",
        bn: "দলগত খেলা",
      },
      {
        en: "Interactive classroom activities",
        bn: "শ্রেণিকক্ষে অংশগ্রহণমূলক কার্যক্রম",
      },
      {
        en: "Outdoor play",
        bn: "বাইরে মুক্তভাবে খেলা",
      },
      {
        en: "Role-play and imagination games",
        bn: "রোল-প্লে ও কল্পনাভিত্তিক খেলা",
      },
    ],
    imageUrl: "/media/nano_banana_pe.png",
    accent: "var(--tone-green)",
  },
  {
    title: {
      en: "Practical Life Activities",
      bn: "দৈনন্দিন জীবনভিত্তিক কার্যক্রম",
    },
    intro: [
      {
        en: "This Montessori element encourages children to develop independence through everyday tasks and purposeful movement.",
        bn: "মন্টেসরি শিক্ষাপদ্ধতির এই অংশে দৈনন্দিন কাজের মধ্য দিয়ে শিশুদের স্বনির্ভরতা ও মনোযোগ গড়ে তোলা হয়।",
      },
    ],
    listIntro: {
      en: "Examples include:",
      bn: "উদাহরণ হিসেবে রয়েছে:",
    },
    bullets: [
      {
        en: "Organizing learning materials",
        bn: "শেখার উপকরণ গুছিয়ে রাখা",
      },
      {
        en: "Simple classroom responsibilities",
        bn: "শ্রেণিকক্ষের সহজ দায়িত্ব পালন",
      },
      {
        en: "Hands-on tasks that improve coordination and focus",
        bn: "হাতের কাজের মাধ্যমে সমন্বয় ও একাগ্রতা বাড়ানো",
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
