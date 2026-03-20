import Image from "next/image";

import { AcademicCatMascot } from "@/components/academic-cat-mascot";
import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import type { BilingualText } from "@/data/site-content";
import { siteMeta } from "@/data/site-content";

type DetailBlock = {
  title: BilingualText;
  body: BilingualText;
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

export default function AdmissionsPage() {
  const schoolPhoneHref = siteMeta.schoolPhone.replace(/-/g, "");

  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell admissions-overview">
          <div className="admissions-overview__grid">
            <article className="portal-card stack">
              <LocalizedText as="p" className="eyebrow" text={classesOfferedTitle} />
              <LocalizedText as="h2" className="portal-title" text={classesOfferedTitle} />
              <LocalizedText as="p" text={classesOfferedIntro} />
              <ul className="about-list">
                {classesOffered.map((item) => (
                  <li key={item.en}>
                    <LocalizedText text={item} />
                  </li>
                ))}
              </ul>
            </article>

            <article className="portal-card stack">
              <LocalizedText as="p" className="eyebrow" text={ageCriteriaTitle} />
              <LocalizedText as="h2" className="portal-title" text={ageCriteriaTitle} />
              <ul className="about-list">
                {ageCriteria.map((item) => (
                  <li key={item.title.en}>
                    <strong>
                      <LocalizedText text={item.title} />
                    </strong>
                    <span>{": "}</span>
                    <LocalizedText text={item.body} />
                  </li>
                ))}
              </ul>
            </article>

            <article className="portal-card stack">
              <LocalizedText as="p" className="eyebrow" text={admissionProcessTitle} />
              <LocalizedText as="h2" className="portal-title" text={admissionProcessTitle} />
              <ol
                className="about-list"
                style={{ listStyleType: "lower-alpha", paddingLeft: "1.4rem" }}
              >
                {admissionProcess.map((item) => (
                  <li key={item.title.en}>
                    <strong>
                      <LocalizedText text={item.title} />
                    </strong>
                    <LocalizedText as="p" text={item.body} />
                  </li>
                ))}
              </ol>
            </article>

            <article className="portal-card stack">
              <LocalizedText as="p" className="eyebrow" text={documentsTitle} />
              <LocalizedText as="h2" className="portal-title" text={documentsTitle} />
              <ul className="about-list">
                {requiredDocuments.map((item) => (
                  <li key={item.en}>
                    <LocalizedText text={item} />
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <aside aria-hidden="true" className="admissions-overview__art">
            <Image
              alt=""
              className="admissions-overview__art-image"
              height={960}
              src="/media/simple_admissions_desk.png"
              width={760}
            />
          </aside>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell grid-2">
          <div className="admissions-form-panel">
            <article className="portal-card stack">
              <LocalizedText as="p" className="eyebrow" text={formLabel} />
              <LocalizedText as="h2" className="portal-title" text={formTitle} />
              <LocalizedText as="p" text={formSummary} />
              <a
                className="btn btn--accent"
                download="kms-admission-form.pdf"
                href="/forms/kms-admission-form.pdf"
              >
                <LocalizedText text={formButton} />
              </a>
            </article>

            <div aria-hidden="true" className="admissions-form-panel__mascot">
              <AcademicCatMascot variant="admissions" />
            </div>
          </div>

          <article className="contact-panel stack">
            <LocalizedText as="p" className="eyebrow" text={contactLabel} />
            <LocalizedText as="h3" text={contactTitle} />
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
