import { LocalizedText } from "@/components/language-provider";
import { LoginForm } from "@/components/login-form";
import { PageIntro } from "@/components/page-intro";

const introEyebrow = {
  en: "Members",
  bn: "সদস্য",
};

const introTitle = {
  en: "Members access",
  bn: "সদস্য প্রবেশাধিকার",
};

const introSummary = {
  en: "Use this page to sign in to member areas.",
  bn: "সদস্যদের অংশে প্রবেশ করতে এই পৃষ্ঠা ব্যবহার করুন।",
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
              text={{ en: "Member login", bn: "সদস্য লগ ইন" }}
            />
            <LocalizedText
              as="p"
              text={{
                en: "Authorised members can use this area to sign in.",
                bn: "অনুমোদিত সদস্যরা এই অংশ ব্যবহার করে লগ ইন করতে পারবেন।",
              }}
            />
          </article>
          <LoginForm nextPath="/portal" />
        </div>
      </section>
    </>
  );
}
