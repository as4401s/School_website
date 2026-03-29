import { AcademicCatMascot } from "@/components/academic-cat-mascot";
import { ContactForm } from "@/components/contact-form";
import { FacebookIcon } from "@/components/facebook-icon";
import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import { siteMeta } from "@/data/site-content";

const introEyebrow = {
  en: "Contact",
  bn: "যোগাযোগ",
};

const introTitle = {
  en: "Get in touch with the school",
  bn: "বিদ্যালয়ের সঙ্গে যোগাযোগ করুন",
};

const introSummary = {
  en: "Use the school email, map, and enquiry form to get in touch.",
  bn: "বিদ্যালয়ের ইমেল, মানচিত্র ও যোগাযোগ ফর্ম ব্যবহার করে আমাদের সঙ্গে যোগাযোগ করুন।",
};

export default function ContactPage() {
  const mapQuery = encodeURIComponent(siteMeta.eventLocation.en);

  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="section">
        <div className="shell contact-grid">
          <article className="contact-panel stack">
            <LocalizedText as="p" className="eyebrow" text={{ en: "Address", bn: "ঠিকানা" }} />
            <LocalizedText as="h3" text={{ en: "Visit or write to us", bn: "আমাদের সঙ্গে যোগাযোগ করুন" }} />
            <LocalizedText as="p" text={siteMeta.address} />
            <div className="chip-row">
              <a className="chip" href={`mailto:${siteMeta.schoolEmail}`}>
                {siteMeta.schoolEmail}
              </a>
              <a
                className="chip chip--facebook"
                href={siteMeta.facebookUrl}
                rel="noreferrer"
                target="_blank"
              >
                <FacebookIcon />
                <LocalizedText text={{ en: "Facebook Page", bn: "ফেসবুক পেজ" }} />
              </a>
            </div>
          </article>

          <article className="contact-panel stack">
            <LocalizedText as="p" className="eyebrow" text={{ en: "Map", bn: "মানচিত্র" }} />
            <LocalizedText as="h3" text={{ en: "School location", bn: "বিদ্যালয়ের অবস্থান" }} />
            <div className="map-frame">
              <iframe
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                title="KMS location"
              />
            </div>
          </article>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="shell grid-2">
          <div className="contact-form-shell">
            <ContactForm />
          </div>

          <article className="contact-panel stack contact-office-panel">
            <LocalizedText
              as="p"
              className="eyebrow"
              text={{ en: "School Office", bn: "স্কুল অফিস" }}
            />
            <LocalizedText
              as="h3"
              text={{ en: "Public contact and support", bn: "যোগাযোগ ও সহায়তা" }}
            />
            <LocalizedText
              as="p"
              text={{
                en: "For admissions, school updates, or general enquiries, guardians may write to the school email shown here.",
                bn: "ভর্তি, বিদ্যালয়ের আপডেট বা সাধারণ কোনো জিজ্ঞাসার জন্য অভিভাবকগণ এখানে দেওয়া বিদ্যালয়ের ইমেলে যোগাযোগ করতে পারেন।",
              }}
            />
            <p>
              <a href={`mailto:${siteMeta.schoolEmail}`}>{siteMeta.schoolEmail}</a>
            </p>
            <p>
              <a href={siteMeta.facebookUrl} rel="noreferrer" target="_blank">
                <LocalizedText text={{ en: "Visit the school Facebook page", bn: "স্কুলের ফেসবুক পেজে যান" }} />
              </a>
            </p>
            <div aria-hidden="true" className="contact-office-panel__mascot">
              <AcademicCatMascot variant="contact" />
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
