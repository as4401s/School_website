import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import { StaffAccessCard } from "@/components/staff-access-card";

const introEyebrow = {
  en: "Staff Access",
  bn: "স্টাফ অ্যাক্সেস",
};

const introTitle = {
  en: "Authorised editor access",
  bn: "অনুমোদিত সম্পাদক প্রবেশাধিকার",
};

const introSummary = {
  en: "This school website uses a staff CMS for editor access rather than a public members area.",
  bn: "এই বিদ্যালয়ের ওয়েবসাইটে জনসাধারণের সদস্য অংশের বদলে সম্পাদকদের জন্য স্টাফ সিএমএস ব্যবহার করা হয়।",
};

export default function MembersPage() {
  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />
      <section className="login-layout">
        <div className="shell login-layout__grid">
          <article className="portal-card stack">
            <LocalizedText
              as="h3"
              text={{ en: "No public member accounts", bn: "কোনও পাবলিক সদস্য অ্যাকাউন্ট নেই" }}
            />
            <LocalizedText
              as="p"
              text={{
                en: "Only authorised school editors receive access to the content management area.",
                bn: "শুধু অনুমোদিত বিদ্যালয় সম্পাদকরাই কনটেন্ট ব্যবস্থাপনার অংশে প্রবেশাধিকার পাবেন।",
              }}
            />
          </article>
          <StaffAccessCard />
        </div>
      </section>
    </>
  );
}
