import {
  AnimatedCharacter,
  type AnimatedCharacterKind,
} from "@/components/animated-character";
import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import type { BilingualText } from "@/data/site-content";

const introEyebrow = {
  en: "Announcements",
  bn: "বিজ্ঞপ্তি",
};

const introTitle = {
  en: "Notices & Updates",
  bn: "বিজ্ঞপ্তি ও আপডেট",
};

const introSummary = {
  en: "Stay informed with the latest school notices, tuition programs, and important updates from NGBM Foundation.",
  bn: "NGBM ফাউন্ডেশনের সর্বশেষ বিদ্যালয়ের বিজ্ঞপ্তি, টিউশন প্রোগ্রাম এবং গুরুত্বপূর্ণ আপডেট সম্পর্কে জানুন।",
};

type AnnouncementPoint = {
  body: BilingualText;
  character: AnimatedCharacterKind;
};

const tuitionTitle = {
  en: "Free / Low-Cost Tuition for Students",
  bn: "ছাত্র-ছাত্রীদের বিনামূল্যে/স্বল্পমূল্যে টিউশন প্রদান",
};

const tuitionLead = {
  en: "NGBM Pathshala at Humaniapota will support students from Class 2 to Class 8 starting January 2026.",
  bn: "হুমানিয়াপোতা-স্থিত NGBM পাঠশালা ২০২৬ সালের জানুয়ারি থেকে ২য় শ্রেণি থেকে ৮ম শ্রেণি পর্যন্ত ছাত্র-ছাত্রীদের সহায়তা করবে।",
};

const announcementPoints: AnnouncementPoint[] = [
  {
    body: {
      en: "New teachers have been appointed. Classes will run 4 days a week for 2.5 hours per session and cover all subjects.",
      bn: "নতুন শিক্ষক নিযুক্ত করা হয়েছে। সপ্তাহে ৪ দিন, প্রতিদিন ২.৫ ঘণ্টা করে সমস্ত বিষয়ে ক্লাস হবে।",
    },
    character: "book",
  },
  {
    body: {
      en: "Each class will have a maximum of 6 students so children can receive closer attention.",
      bn: "প্রতি ক্লাসে সর্বোচ্চ ৬ জন ছাত্র-ছাত্রী থাকবে যাতে প্রত্যেকে বেশি মনোযোগ পায়।",
    },
    character: "star",
  },
  {
    body: {
      en: "A minimal donation will be collected during registration to support responsibility and dignity in the program.",
      bn: "নিবন্ধনের সময় ন্যূনতম অনুদান নেওয়া হবে যাতে অংশগ্রহণে দায়িত্ববোধ ও মর্যাদাবোধ তৈরি হয়।",
    },
    character: "pencil",
  },
  {
    body: {
      en: "Registration will take place in the 3rd and 4th weeks of December and in January. First interested students will get priority.",
      bn: "ডিসেম্বরের ৩য় ও ৪র্থ সপ্তাহে এবং জানুয়ারিতে নাম নিবন্ধন হবে। আগ্রহী ছাত্র-ছাত্রীদের অগ্রাধিকার দেওয়া হবে।",
    },
    character: "rocket",
  },
];

const contactTitle = {
  en: "Registration Contacts",
  bn: "নিবন্ধনের যোগাযোগ",
};

export default function AnnouncementsPage() {
  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell stack">
          <article className="feature-panel feature-panel--admissions">
            <div className="feature-panel__copy">
              <div className="feature-panel__character-row">
                <AnimatedCharacter kind="book" size="sm" />
                <AnimatedCharacter kind="rocket" size="sm" />
                <AnimatedCharacter kind="star" size="sm" />
              </div>
              <LocalizedText as="p" className="eyebrow" text={{ en: "Public Notice", bn: "জনসাধারণের নোটিশ" }} />
              <LocalizedText as="h2" text={tuitionTitle} />
              <LocalizedText as="p" text={tuitionLead} />
              <div className="chip-row">
                <LocalizedText
                  as="span"
                  className="chip chip--playful"
                  text={{ en: "Classes 2 to 8", bn: "২য় থেকে ৮ম শ্রেণি" }}
                />
                <LocalizedText
                  as="span"
                  className="chip chip--playful"
                  text={{ en: "Starting January 2026", bn: "শুরু জানুয়ারি ২০২৬" }}
                />
                <LocalizedText
                  as="span"
                  className="chip chip--playful"
                  text={{ en: "4 days each week", bn: "সপ্তাহে ৪ দিন" }}
                />
              </div>
            </div>
          </article>

          <div className="grid-2">
            {announcementPoints.map((item) => (
              <article className="glance-card glance-card--compact" key={item.body.en}>
                <AnimatedCharacter kind={item.character} size="sm" />
                <LocalizedText as="p" text={item.body} />
              </article>
            ))}
          </div>

          <article className="portal-card stack">
            <LocalizedText as="p" className="eyebrow" text={contactTitle} />
            <LocalizedText as="h2" className="portal-title" text={contactTitle} />
            <div className="contact-mini-grid">
              <article className="contact-mini-card">
                <AnimatedCharacter kind="cloud" size="sm" />
                <p>
                  <strong>Bandana Mukherjee</strong>
                </p>
                <p>
                  <a href="tel:7501124310">7501124310</a>
                </p>
              </article>
              <article className="contact-mini-card">
                <AnimatedCharacter kind="globe" size="sm" />
                <p>
                  <strong>Manisha Roy</strong>
                </p>
                <p>
                  <a href="tel:9382908027">9382908027</a>
                </p>
              </article>
            </div>
            <LocalizedText
              as="p"
              text={{
                en: "NGBM Governing Body can also be reached at contact@ngbmfoundation.com.",
                bn: "NGBM Governing Body-এর সঙ্গে contact@ngbmfoundation.com-এও যোগাযোগ করা যাবে।",
              }}
            />
          </article>
        </div>
      </section>
    </>
  );
}
