import Image from "next/image";

import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";

const introEyebrow = {
  en: "Our School",
  bn: "আমাদের বিদ্যালয়",
};

const introTitle = {
  en: "A closer look at school life",
  bn: "বিদ্যালয় জীবনের আরও কাছের পরিচয়",
};

const introSummary = {
  en: "Discover the school environment, daily learning spaces, and important moments from campus life.",
  bn: "বিদ্যালয়ের পরিবেশ, প্রতিদিনের শিক্ষার পরিসর এবং ক্যাম্পাস জীবনের গুরুত্বপূর্ণ কিছু মুহূর্ত দেখুন।",
};

const welcomeTitle = {
  en: "Headteacher's Welcome",
  bn: "প্রধান শিক্ষকের শুভেচ্ছা",
};

const welcomeText = {
  en: "KM School welcomes families into a caring, child-focused environment where learning, participation, and school life grow together.",
  bn: "কেএম স্কুল পরিবারগুলিকে একটি স্নেহময়, শিশুকেন্দ্রিক পরিবেশে স্বাগত জানায়, যেখানে শিক্ষা, অংশগ্রহণ এবং বিদ্যালয়জীবন একসঙ্গে বিকশিত হয়।",
};

const spaceCards = [
  {
    title: { en: "Classrooms", bn: "শ্রেণিকক্ষ" },
    text: {
      en: "Learning spaces for children’s everyday classroom activities.",
      bn: "শিশুদের প্রতিদিনের পাঠদানের জন্য শ্রেণিকক্ষের পরিবেশ।",
    },
    imageUrl: "/media/tour-1.jpg",
  },
  {
    title: { en: "Parent Meetings", bn: "অভিভাবক বৈঠক" },
    text: {
      en: "School meetings and communication with families.",
      bn: "অভিভাবকদের সঙ্গে বৈঠক ও বিদ্যালয়ের যোগাযোগ।",
    },
    imageUrl: "/media/tour-3.jpg",
  },
  {
    title: { en: "School Celebrations", bn: "বিদ্যালয়ের উদ্‌যাপন" },
    text: {
      en: "Celebrations and public moments from school life.",
      bn: "বিদ্যালয়ের বিভিন্ন অনুষ্ঠান ও স্মরণীয় মুহূর্ত।",
    },
    imageUrl: "/media/post-independence.jpeg",
  },
];

export default function OurSchoolPage() {
  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell feature-panel">
          <div className="feature-panel__copy">
            <LocalizedText as="p" className="eyebrow" text={welcomeTitle} />
            <LocalizedText as="h2" text={welcomeTitle} />
            <LocalizedText as="p" text={welcomeText} />
          </div>
          <div className="feature-panel__image-wrap">
            <Image
              alt="KM School students"
              className="feature-panel__image"
              height={700}
              src="/media/hero-home.jpg"
              width={900}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-header">
            <div>
              <LocalizedText
                as="p"
                className="eyebrow"
                text={{ en: "School Tour", bn: "স্কুল ট্যুর" }}
              />
              <LocalizedText
                as="h2"
                text={{ en: "Explore the school environment", bn: "বিদ্যালয়ের পরিবেশ দেখুন" }}
              />
            </div>
          </div>

          <div className="grid-3">
            {spaceCards.map((card) => (
              <article className="teacher-card" key={card.title.en}>
                <div className="teacher-card__image-wrap">
                  <Image
                    alt={card.title.en}
                    className="teacher-card__image"
                    fill
                    sizes="(max-width: 1080px) 100vw, 33vw"
                    src={card.imageUrl}
                  />
                </div>
                <div className="teacher-card__body">
                  <LocalizedText as="h3" text={card.title} />
                  <LocalizedText as="p" text={card.text} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
