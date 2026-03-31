import Image from "next/image";

import { LocalizedText } from "@/components/language-provider";
import type { BilingualText } from "@/data/site-content";
import { PageIntro } from "@/components/page-intro";

type AboutCard = {
  title: BilingualText;
  intro: BilingualText;
  listIntro: BilingualText;
  bullets: BilingualText[];
  imageUrl: string;
};

type StaffMember = {
  name: BilingualText;
  details: BilingualText[];
  imageUrl?: string;
};

const introEyebrow = {
  en: "About",
  bn: "আমাদের সম্পর্কে",
};

const introTitle = {
  en: "A closer look at life and learning at KMS",
  bn: "কেএমএস (KMS)-এ পড়াশোনা ও বেড়ে ওঠার এক ঝলক",
};

const introSummary = {
  en: "This page brings together the environment, values, and learning culture that shape everyday life at Krishnarati Montessori School.",
  bn: "কৃষ্ণারতি মন্টেসরি স্কুলের পড়াশোনার ধরণ, স্কুলের পরিবেশ এবং এখানকার মূল লক্ষ্যগুলো এই পাতায় তুলে ধরা হয়েছে।",
};

const learningEnvironmentTitle = {
  en: "Our Learning Environment",
  bn: "আমাদের শিক্ষার পরিবেশ",
};

const learningEnvironmentParagraphs: BilingualText[] = [
  {
    en: "At KMS, we believe that children learn best in an environment where they feel safe, happy, and encouraged to explore.",
    bn: "কেএমএস (KMS)-এ আমরা বিশ্বাস করি যে, শিশুরা তখনই সবচেয়ে ভালো শেখে যখন শ্রেণীকক্ষের পরিবেশ হয় নিরাপদ ও আনন্দময় ও যেখানে তারা নতুন কিছু জানতে ও অনুসন্ধান করতে উৎসাহ পায়।",
  },
  {
    en: "Our classrooms are designed to support curiosity, creativity, and active learning through daily routines that are warm, engaging, and age-appropriate.",
    bn: "আমাদের শ্রেণিকক্ষগুলো এমনভাবে তৈরি যেখানে শিশুরা স্বতঃস্ফূর্ত অংশগ্রহণের মাধ্যমে শিখতে পারে।",
  },
];

const learningEnvironmentListIntro = {
  en: "In our school, children experience:",
  bn: "আমাদের স্কুলে শিশুরা দৈনন্দিন যা অভিজ্ঞতা করে:",
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
    bn: "ধৈর্য ও পরম মমতায় শিশুদের সঠিক পথ দেখানোর জন্য সহমর্মী শিক্ষক",
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
      en: "At KMS, early education focuses on building a strong foundation for lifelong learning.",
      bn: "কেএমএস-এ প্রারম্ভিক শিক্ষার মূল লক্ষ্য হল এমন এক দৃঢ় ভিত্তি গড়ে তোলা, যা শিশুর আজীবন শিক্ষাযাত্রাকে শক্তপোক্ত করে।",
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
        bn: "সৃজনশীল হয়ে উঠতে সাহায্য করা।",
      },
      {
        en: "Helping children build confidence and independence",
        bn: "আত্মবিশ্বাসী ও স্বনির্ভর হয়ে উঠতে",
      },
      {
        en: "Supporting emotional and social development through group interaction",
        bn: "দলগত মেলামেশার মাধ্যমে মানসিক ও সামাজিক বিকাশে সহায়তা করা",
      },
    ],
    imageUrl: "/media/Humaniapota%20School/IMG_3343.jpg",
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
        bn: "প্রতিটি শিশুর শেখার ছন্দকে সম্মান করা",
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
  },
];

const staffLabel = {
  en: "Our Staff",
  bn: "আমাদের স্টাফ",
};

const staffTitle = {
  en: "Our Staff",
  bn: "আমাদের স্টাফ",
};

const staffMembers: StaffMember[] = [
  {
    name: {
      en: "Mamata Shee",
      bn: "Mamata Shee",
    },
    details: [
      {
        en: "Graduate (NTT)",
        bn: "Graduate (NTT)",
      },
    ],
    imageUrl: "/media/teachers/Mamata.jpeg",
  },
  {
    name: {
      en: "Aritri Raha",
      bn: "Aritri Raha",
    },
    details: [
      {
        en: "Trainee Teacher",
        bn: "Trainee Teacher",
      },
      {
        en: "B.A. Honours in English",
        bn: "B.A. Honours in English",
      },
      {
        en: "M.A. in English (Pursuing)",
        bn: "M.A. in English (Pursuing)",
      },
    ],
    imageUrl: "/media/teachers/aritri.jpeg",
  },
  {
    name: {
      en: "Aditi Das Biswas",
      bn: "Aditi Das Biswas",
    },
    details: [
      {
        en: "H.S.",
        bn: "H.S.",
      },
      {
        en: "NTT",
        bn: "NTT",
      },
      {
        en: "Trainee Teacher",
        bn: "Trainee Teacher",
      },
    ],
    imageUrl: "/media/teachers/aditi.jpeg",
  },
  {
    name: {
      en: "Manisha Roy",
      bn: "Manisha Roy",
    },
    details: [
      {
        en: "Trainee Teacher",
        bn: "Trainee Teacher",
      },
      {
        en: "B.A Honours in Bengali",
        bn: "B.A Honours in Bengali",
      },
      {
        en: "M.A in Bengali",
        bn: "M.A in Bengali",
      },
      {
        en: "D.el ed (Diploma in Elementary Education)",
        bn: "D.el ed (Diploma in Elementary Education)",
      },
    ],
    imageUrl: "/media/teachers/manisha.jpeg",
  },
];

export default function OurSchoolPage() {
  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell feature-panel">
          <div className="feature-panel__copy">
            <LocalizedText as="p" className="eyebrow" text={learningEnvironmentTitle} />
            <LocalizedText as="h2" text={learningEnvironmentTitle} />
            {learningEnvironmentParagraphs.map((paragraph) => (
              <LocalizedText as="p" key={paragraph.en} text={paragraph} />
            ))}
            <LocalizedText as="p" text={learningEnvironmentListIntro} />
            <ul className="about-list">
              {learningEnvironmentBullets.map((item) => (
                <li key={item.en}>
                  <LocalizedText text={item} />
                </li>
              ))}
            </ul>
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
        <div className="shell staff-showcase">
          <div className="staff-showcase__header">
            <div>
              <LocalizedText as="p" className="eyebrow" text={staffLabel} />
              <LocalizedText as="h2" text={staffTitle} />
            </div>
          </div>

          <div className="staff-grid">
            {staffMembers.map((member) => (
              <article
                className={`staff-card${member.name.en === "Manisha Roy" ? " staff-card--middle" : ""}`}
                key={member.name.en}
              >
                <div
                  aria-label={member.name.en}
                  className={`staff-card__avatar${member.imageUrl ? " staff-card__avatar--has-image" : ""}`}
                >
                  {member.imageUrl && (
                    <Image
                      alt={member.name.en}
                      fill
                      sizes="160px"
                      src={member.imageUrl}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <LocalizedText as="h3" text={member.name} />
                <div className="staff-card__details">
                  {member.details.map((detail) => (
                    <LocalizedText as="p" key={`${member.name.en}-${detail.en}`} text={detail} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
