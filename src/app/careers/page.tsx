import { AcademicCatMascot } from "@/components/academic-cat-mascot";
import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import type { BilingualText } from "@/data/site-content";

const introEyebrow = {
  en: "Careers",
  bn: "ক্যারিয়ার",
};

const introTitle = {
  en: "Careers at KMS",
  bn: "কেএমএস-এ ক্যারিয়ার",
};

const introSummary = {
  en: "This section will be used for future recruitment notices and career-related updates from KMS.",
  bn: "ভবিষ্যতে কেএমএস-এর নিয়োগ-সংক্রান্ত বিজ্ঞপ্তি ও ক্যারিয়ার আপডেট এই অংশে প্রকাশ করা হবে।",
};

const careersLabel = {
  en: "Careers Notice",
  bn: "ক্যারিয়ার সংক্রান্ত বিজ্ঞপ্তি",
};

const careersTitle = {
  en: "No openings at present",
  bn: "এই মুহূর্তে কোনো শূন্যপদ নেই",
};

const careersParagraphs: BilingualText[] = [
  {
    en: "KMS welcomes individuals who are interested in working with young learners and contributing meaningfully to early childhood education.",
    bn: "কেএমএস এমন মানুষদের স্বাগত জানায়, যাঁরা ছোটদের সঙ্গে কাজ করতে আগ্রহী এবং প্রারম্ভিক শিক্ষার ক্ষেত্রে আন্তরিকভাবে যুক্ত হতে চান।",
  },
  {
    en: "At present, there are no open positions available. Any future job opportunities or announcements will be posted in this section.",
    bn: "বর্তমানে কোনো পদ খালি নেই। ভবিষ্যতে কোনো নিয়োগ বা সংশ্লিষ্ট বিজ্ঞপ্তি থাকলে তা এই অংশেই জানানো হবে।",
  },
  {
    en: "Interested candidates are encouraged to check this page regularly for updates.",
    bn: "আগ্রহী প্রার্থীদের অনুরোধ, পরবর্তী আপডেটের জন্য এই পৃষ্ঠাটি নিয়মিত দেখে নিন।",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell careers-stage" style={{ maxWidth: "980px" }}>
          <article className="portal-card stack">
            <LocalizedText as="p" className="eyebrow" text={careersLabel} />
            <LocalizedText as="h2" className="portal-title" text={careersTitle} />
            {careersParagraphs.map((paragraph) => (
              <LocalizedText as="p" key={paragraph.en} text={paragraph} />
            ))}
          </article>

          <div aria-hidden="true" className="careers-stage__mascot">
            <AcademicCatMascot variant="careers" />
          </div>
        </div>
      </section>
    </>
  );
}
