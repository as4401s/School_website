import Image from "next/image";

import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import { admissionsSteps, siteMeta } from "@/data/site-content";

const introEyebrow = {
  en: "Admissions",
  bn: "ভর্তি",
};

const introTitle = {
  en: "Admissions information",
  bn: "ভর্তি সংক্রান্ত তথ্য",
};

const introSummary = {
  en: "Admissions information for families seeking to begin their journey with KM School.",
  bn: "যেসব পরিবার কেএম স্কুলে ভর্তি প্রক্রিয়া শুরু করতে চান, তাদের জন্য এই ভর্তি-সংক্রান্ত তথ্য।",
};

const requestDetails = {
  en: "Request admissions details",
  bn: "ভর্তি সংক্রান্ত তথ্যের অনুরোধ করুন",
};

const reviewNotice = {
  en: "After documents are submitted, the school reviews the application and shares the next steps with families.",
  bn: "নথিপত্র জমা দেওয়ার পরে বিদ্যালয় আবেদনটি পর্যালোচনা করে পরিবারকে পরবর্তী ধাপ জানায়।",
};

export default function AdmissionsPage() {
  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell grid-3">
          {admissionsSteps.map((item) => (
            <article className="portal-card" key={item.step}>
              <p className="eyebrow">{item.step}</p>
              <LocalizedText as="h3" text={item.title} />
              <LocalizedText as="p" text={item.description} />
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell grid-2">
          <article className="feature-panel">
            <div className="feature-panel__copy">
              <LocalizedText
                as="p"
                className="eyebrow"
                text={{ en: "Prospectus", bn: "প্রসপেক্টাস" }}
              />
              <LocalizedText
                as="h2"
                text={{ en: "School information for families", bn: "পরিবারের জন্য বিদ্যালয়ের তথ্য" }}
              />
              <LocalizedText
                as="p"
                text={{
                  en: "Families can contact the school for the latest admissions details and school information.",
                  bn: "সর্বশেষ ভর্তি সংক্রান্ত তথ্য ও বিদ্যালয়ের তথ্যের জন্য পরিবারগুলি স্কুলের সঙ্গে যোগাযোগ করতে পারেন।",
                }}
              />
              <a
                className="btn btn--accent"
                href={`mailto:${siteMeta.schoolEmail}?subject=Admissions%20Query`}
              >
                <LocalizedText text={requestDetails} />
              </a>
            </div>
            <div className="feature-panel__image-wrap">
              <Image
                alt="KM School classroom"
                className="feature-panel__image"
                height={650}
                src="/media/hero-home.jpg"
                width={760}
              />
            </div>
          </article>

          <article className="portal-card stack">
            <LocalizedText
              as="p"
              className="eyebrow"
              text={{ en: "Admissions Notice", bn: "ভর্তি নোটিশ" }}
            />
            <LocalizedText
              as="h3"
              text={{ en: "Review and response", bn: "পর্যালোচনা ও উত্তর" }}
            />
            <LocalizedText as="p" text={reviewNotice} />
          </article>
        </div>
      </section>
    </>
  );
}
