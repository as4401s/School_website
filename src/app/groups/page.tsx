import Link from "next/link";

import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";

const introEyebrow = {
  en: "Groups",
  bn: "গ্রুপস",
};

const introTitle = {
  en: "Community groups",
  bn: "কমিউনিটি গ্রুপ",
};

const introSummary = {
  en: "School groups and shared updates for authorised members.",
  bn: "অনুমোদিত সদস্যদের জন্য স্কুল গ্রুপ ও শেয়ার করা আপডেট।",
};

export default function GroupsPage() {
  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />
      <section className="section">
        <div className="shell">
          <article className="portal-card stack">
            <LocalizedText
              as="p"
              text={{
                en: "This area is available to authorised members after sign-in.",
                bn: "লগ ইন করার পর অনুমোদিত সদস্যদের জন্য এই অংশ উপলব্ধ।",
              }}
            />
            <Link className="btn btn--accent" href="/login?next=/portal">
              <LocalizedText text={{ en: "Go to Login", bn: "লগ ইন করুন" }} />
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
