import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import {
  TopicIllustration,
  type TopicIllustrationKind,
} from "@/components/topic-illustration";
import type { BilingualText } from "@/data/site-content";
import { siteMeta } from "@/data/site-content";

type DetailBlock = {
  title: BilingualText;
  body: BilingualText;
};

type AdmissionsQuickCard = {
  title: BilingualText;
  summary: BilingualText;
  character: TopicIllustrationKind;
};

const introEyebrow = {
  en: "Admissions",
  bn: "ভর্তি",
};

const introTitle = {
  en: "Admissions",
  bn: "ভর্তি",
};

const introSummary = {
  en: "Key admission details, class eligibility, required documents, and the admission form are available here.",
  bn: "ভর্তি-সংক্রান্ত মূল তথ্য, শ্রেণিভিত্তিক বয়সের যোগ্যতা, প্রয়োজনীয় নথি এবং ভর্তি ফর্মের ডাউনলোড ব্যবস্থা এখানে একসঙ্গে দেওয়া হয়েছে।",
};

const classesOfferedTitle = {
  en: "Classes Offered",
  bn: "যে শ্রেণিগুলিতে ভর্তি চলছে",
};

const classesOfferedIntro = {
  en: "These classes support children through their early learning years and help prepare them for primary school.",
  bn: "এই শ্রেণিগুলি শিশুদের প্রারম্ভিক শিক্ষার ভিত গড়ে তোলে এবং পরবর্তী প্রাথমিক শিক্ষার জন্য প্রস্তুত হতে সাহায্য করে।",
};

const classesOffered: BilingualText[] = [
  { en: "Montessori", bn: "মন্টেসরি" },
  { en: "Nursery", bn: "নার্সারি" },
  { en: "UKG", bn: "ইউকেজি" },
];

const ageCriteriaTitle = {
  en: "Age Criteria",
  bn: "বয়সভিত্তিক যোগ্যতা",
};

const ageCriteria: DetailBlock[] = [
  {
    title: { en: "Montessori", bn: "মন্টেসরি" },
    body: { en: "2+ years onwards", bn: "২ বছর বা তার বেশি" },
  },
  {
    title: { en: "Nursery", bn: "নার্সারি" },
    body: { en: "3+ years onwards", bn: "৩ বছর বা তার বেশি" },
  },
  {
    title: { en: "UKG", bn: "ইউকেজি" },
    body: { en: "4+ years onwards", bn: "৪ বছর বা তার বেশি" },
  },
];

const admissionProcessTitle = {
  en: "Admission Process",
  bn: "ভর্তি-প্রক্রিয়ার ধাপ",
};

const admissionProcess: DetailBlock[] = [
  {
    title: {
      en: "Collect or download the admission form",
      bn: "ভর্তি ফর্ম সংগ্রহ করুন বা ডাউনলোড করুন",
    },
    body: {
      en: "Parents may collect the form from the school office or use the download option provided on this page.",
      bn: "অভিভাবকেরা স্কুল অফিস থেকে ফর্ম সংগ্রহ করতে পারেন, অথবা এই পৃষ্ঠায় দেওয়া ডাউনলোডের ব্যবস্থা ব্যবহার করতে পারেন।",
    },
  },
  {
    title: {
      en: "Fill in the form carefully",
      bn: "ফর্মটি যত্নসহকারে পূরণ করুন",
    },
    body: {
      en: "Please complete all required details clearly and attach the necessary documents before submission.",
      bn: "ফর্ম জমা দেওয়ার আগে প্রয়োজনীয় সব তথ্য স্পষ্টভাবে পূরণ করুন এবং নির্ধারিত নথিগুলি সংযুক্ত করুন।",
    },
  },
  {
    title: {
      en: "Submit the form at the school office",
      bn: "স্কুল অফিসে ফর্ম জমা দিন",
    },
    body: {
      en: "There is currently no online admission system. Completed forms should be submitted directly at the school office.",
      bn: "বর্তমানে অনলাইন ভর্তি ব্যবস্থা চালু নেই। পূরণ করা ফর্ম সরাসরি স্কুল অফিসে জমা দিতে হবে।",
    },
  },
  {
    title: {
      en: "Wait for the school's next instructions",
      bn: "বিদ্যালয়ের পরবর্তী নির্দেশের জন্য অপেক্ষা করুন",
    },
    body: {
      en: "After submission, the school will guide families about the next formalities, if required.",
      bn: "ফর্ম জমা দেওয়ার পর প্রয়োজন হলে বিদ্যালয় পরিবারকে পরবর্তী আনুষ্ঠানিক ধাপ সম্পর্কে জানাবে।",
    },
  },
];

const documentsTitle = {
  en: "Documents Required",
  bn: "প্রয়োজনীয় নথিপত্র",
};

const requiredDocuments: BilingualText[] = [
  {
    en: "Student's Aadhaar card",
    bn: "শিক্ষার্থীর আধার কার্ড",
  },
  {
    en: "Student's birth certificate (original + 4 photocopies)",
    bn: "শিক্ষার্থীর জন্ম সনদপত্র (মূল কপি ও ৪টি ফটোকপি)",
  },
  {
    en: "Parents' Aadhaar card",
    bn: "অভিভাবকের আধার কার্ড",
  },
  {
    en: "Both parents' latest academic qualification certificates",
    bn: "উভয় অভিভাবকের সর্বশেষ শিক্ষাগত যোগ্যতার সনদপত্র",
  },
  {
    en: "Passport-size photographs of parents (2 copies)",
    bn: "অভিভাবকের পাসপোর্ট সাইজ ছবি (২ কপি)",
  },
  {
    en: "Local guardian's Aadhaar card and one passport-size photograph, if applicable",
    bn: "প্রযোজ্য ক্ষেত্রে স্থানীয় অভিভাবকের আধার কার্ড ও একটি পাসপোর্ট সাইজ ছবি",
  },
];

const formLabel = {
  en: "Admission Form",
  bn: "ভর্তি ফর্ম",
};

const formTitle = {
  en: "Download the admission form",
  bn: "ভর্তি ফর্ম ডাউনলোড করুন",
};

const formSummary = {
  en: "For now, admissions are handled offline. Families may download the form, fill it in, and submit it to the school office.",
  bn: "এই মুহূর্তে ভর্তি-প্রক্রিয়া অফলাইনে সম্পন্ন হচ্ছে। পরিবারগুলি ফর্ম ডাউনলোড করে পূরণ করে স্কুল অফিসে জমা দিতে পারবেন।",
};

const formButton = {
  en: "Download Admission Form",
  bn: "ভর্তি ফর্ম ডাউনলোড করুন",
};

const contactLabel = {
  en: "School Office",
  bn: "স্কুল অফিস",
};

const contactTitle = {
  en: "Admissions contact",
  bn: "ভর্তি সংক্রান্ত যোগাযোগ",
};

const contactSummary = {
  en: "For form collection, document clarification, or admission queries, families may contact the school office directly.",
  bn: "ফর্ম সংগ্রহ, নথিপত্র সম্পর্কে স্পষ্ট ধারণা বা ভর্তি-সংক্রান্ত অন্য কোনো প্রয়োজনে পরিবারগুলি সরাসরি স্কুল অফিসের সঙ্গে যোগাযোগ করতে পারেন।",
};

const admissionsQuickCards: AdmissionsQuickCard[] = [
  {
    title: { en: "3 entry levels", bn: "৩টি শ্রেণি" },
    summary: {
      en: "Montessori, Nursery, and UKG admissions are currently open.",
      bn: "মন্টেসরি, নার্সারি ও ইউকেজিতে ভর্তি চলছে।",
    },
    character: "application",
  },
  {
    title: { en: "Simple age guide", bn: "সহজ বয়স নির্দেশিকা" },
    summary: {
      en: "Families can quickly match age bands before visiting the office.",
      bn: "অফিসে আসার আগে বয়সভিত্তিক যোগ্যতা সহজে দেখে নেওয়া যাবে।",
    },
    character: "results",
  },
  {
    title: { en: "Offline process", bn: "অফলাইন প্রক্রিয়া" },
    summary: {
      en: "Download, print, sign, and submit the form directly at school.",
      bn: "ফর্ম ডাউনলোড, প্রিন্ট, স্বাক্ষর ও স্কুলে সরাসরি জমা দিতে হবে।",
    },
    character: "application",
  },
  {
    title: { en: "Documents ready", bn: "নথিপত্র প্রস্তুত রাখুন" },
    summary: {
      en: "Keep child, parent, and photo documents ready for a smoother visit.",
      bn: "শিক্ষার্থী, অভিভাবক ও ছবিসহ প্রয়োজনীয় নথি প্রস্তুত রাখুন।",
    },
    character: "media",
  },
];

export default function AdmissionsPage() {
  const schoolPhoneHref = siteMeta.schoolPhone.replace(/-/g, "");

  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell grid-4">
          {admissionsQuickCards.map((card) => (
            <article className="glance-card glance-card--compact" key={card.title.en}>
              <TopicIllustration kind={card.character} />
              <LocalizedText as="h2" text={card.title} />
              <LocalizedText as="p" text={card.summary} />
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell grid-2">
          <article className="portal-card stack">
            <LocalizedText as="p" className="eyebrow" text={classesOfferedTitle} />
            <div className="section-heading">
              <TopicIllustration kind="school" />
              <LocalizedText as="h2" className="portal-title" text={classesOfferedTitle} />
            </div>
            <LocalizedText as="p" text={classesOfferedIntro} />
            <div className="chip-row">
              {classesOffered.map((item) => (
                <LocalizedText as="span" className="chip chip--playful" key={item.en} text={item} />
              ))}
            </div>
          </article>

          <article className="portal-card stack">
            <LocalizedText as="p" className="eyebrow" text={ageCriteriaTitle} />
            <div className="section-heading">
              <TopicIllustration kind="results" />
              <LocalizedText as="h2" className="portal-title" text={ageCriteriaTitle} />
            </div>
            <div className="mini-tile-grid">
              {ageCriteria.map((item) => (
                <article className="mini-tile" key={item.title.en}>
                  <TopicIllustration kind="results" />
                  <LocalizedText as="h3" text={item.title} />
                  <LocalizedText as="p" text={item.body} />
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell stack">
          <div className="section-header">
            <div>
              <LocalizedText as="p" className="eyebrow" text={admissionProcessTitle} />
              <div className="section-heading">
                <TopicIllustration kind="application" />
                <LocalizedText as="h2" text={admissionProcessTitle} />
              </div>
            </div>
          </div>
          <div className="process-grid">
            {admissionProcess.map((item, index) => (
              <article className="process-card" key={item.title.en}>
                <span className="process-card__number">{index + 1}</span>
                <TopicIllustration kind={index % 2 === 0 ? "application" : "school"} />
                <LocalizedText as="h3" text={item.title} />
                <LocalizedText as="p" text={item.body} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell grid-2">
          <article className="portal-card stack">
            <LocalizedText as="p" className="eyebrow" text={documentsTitle} />
            <div className="section-heading">
              <TopicIllustration kind="media" />
              <LocalizedText as="h2" className="portal-title" text={documentsTitle} />
            </div>
            <ul className="about-list">
              {requiredDocuments.map((item) => (
                <li key={item.en}>
                  <LocalizedText text={item} />
                </li>
              ))}
            </ul>
          </article>

          <article className="portal-card stack">
            <LocalizedText as="p" className="eyebrow" text={formLabel} />
            <div className="section-heading">
              <TopicIllustration kind="application" />
              <LocalizedText as="h2" className="portal-title" text={formTitle} />
            </div>
            <LocalizedText as="p" text={formSummary} />
            <a
              className="btn btn--accent"
              download="kms-admission-form.pdf"
              href="/forms/kms-admission-form.pdf"
            >
              <LocalizedText text={formButton} />
            </a>
          </article>

          <article className="contact-panel stack">
            <LocalizedText as="p" className="eyebrow" text={contactLabel} />
            <div className="section-heading">
              <TopicIllustration kind="contact" />
              <LocalizedText as="h3" text={contactTitle} />
            </div>
            <LocalizedText as="p" text={contactSummary} />
            <div className="stack" style={{ gap: "0.75rem" }}>
              <div>
                <strong>
                  <LocalizedText text={{ en: "Address", bn: "ঠিকানা" }} />
                </strong>
                <LocalizedText as="p" text={siteMeta.address} />
              </div>
              <div>
                <strong>
                  <LocalizedText text={{ en: "Phone", bn: "ফোন" }} />
                </strong>
                <p>
                  <a href={`tel:${schoolPhoneHref}`}>{siteMeta.schoolPhone}</a>
                </p>
              </div>
              <div>
                <strong>
                  <LocalizedText text={{ en: "Email", bn: "ইমেল" }} />
                </strong>
                <p>
                  <a href={`mailto:${siteMeta.schoolEmail}`}>{siteMeta.schoolEmail}</a>
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
