import { LocalizedText } from "@/components/language-provider";
import { LoginForm } from "@/components/login-form";
import { PageIntro } from "@/components/page-intro";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

const introEyebrow = {
  en: "Log In",
  bn: "লগ ইন",
};

const introTitle = {
  en: "Members and staff login",
  bn: "সদস্য ও কর্মীদের লগ ইন",
};

const introSummary = {
  en: "Use this page to sign in to member or staff areas.",
  bn: "সদস্য বা কর্মীদের অংশে প্রবেশ করতে এই পৃষ্ঠা ব্যবহার করুন।",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = params.next || "/portal";

  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="login-layout">
        <div className="shell login-layout__grid">
          <article className="portal-card stack">
            <LocalizedText
              as="p"
              className="eyebrow"
              text={{ en: "Members", bn: "সদস্য" }}
            />
            <LocalizedText
              as="h3"
              text={{ en: "Access your account", bn: "আপনার অ্যাকাউন্টে প্রবেশ করুন" }}
            />
            <LocalizedText
              as="p"
              text={{
                en: "Members, staff, and administrators can sign in here to access their authorised areas.",
                bn: "সদস্য, কর্মী ও প্রশাসকরা এখান থেকে তাদের অনুমোদিত অংশে প্রবেশ করতে পারেন।",
              }}
            />
          </article>

          <LoginForm nextPath={nextPath} />
        </div>
      </section>
    </>
  );
}
