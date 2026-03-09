import Image from "next/image";

import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import { academicSubjects } from "@/data/site-content";

const introEyebrow = {
  en: "Academics",
  bn: "পাঠক্রম",
};

const introTitle = {
  en: "Core learning areas",
  bn: "মূল শিক্ষাক্ষেত্র",
};

const introSummary = {
  en: "Explore the key learning areas that support children through everyday classroom work.",
  bn: "যে প্রধান শিক্ষাক্ষেত্রগুলি প্রতিদিনের পাঠদানে শিক্ষার্থীদের এগিয়ে নিয়ে যায়, সেগুলি এখানে দেখুন।",
};

const learningTitle = {
  en: "Learning in everyday practice",
  bn: "প্রতিদিনের শিক্ষার চর্চা",
};

const learningText = {
  en: "Children engage with foundational subjects through guided practice, observation, discussion, and regular classroom routines.",
  bn: "নির্দেশিত অনুশীলন, পর্যবেক্ষণ, আলোচনা এবং নিয়মিত শ্রেণিকক্ষের কাজের মাধ্যমে শিশুরা ভিত্তিমূলক বিষয়গুলির সঙ্গে যুক্ত হয়।",
};

export default function AcademicsPage() {
  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell grid-3">
          {academicSubjects.map((subject) => (
            <article className="subject-card" key={subject.title.en}>
              <div
                style={{
                  background: subject.accent,
                  height: 10,
                }}
              />
              {subject.imageUrl && (
                <div className="subject-card__image-wrap">
                  <Image
                    alt={subject.title.en}
                    src={subject.imageUrl}
                    width={400}
                    height={300}
                    className="subject-card__image"
                  />
                </div>
              )}
              <div className="subject-card__body">
                <LocalizedText as="h3" text={subject.title} />
                <LocalizedText as="p" text={subject.description} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell feature-panel">
          <div className="feature-panel__copy">
            <LocalizedText as="p" className="eyebrow" text={learningTitle} />
            <LocalizedText as="h2" text={learningTitle} />
            <LocalizedText as="p" text={learningText} />
          </div>
          <div className="feature-panel__image-wrap">
            <Image
              alt="KM School classroom"
              className="feature-panel__image"
              height={820}
              src="/media/tour-1.jpg"
              width={900}
            />
          </div>
        </div>
      </section>
    </>
  );
}
