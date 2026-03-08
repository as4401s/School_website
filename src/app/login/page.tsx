import { PageIntro } from "@/components/page-intro";
import { StaffAccessCard } from "@/components/staff-access-card";
import { LocalizedText } from "@/components/language-provider";

const introEyebrow = {
  en: "Staff Access",
  bn: "স্টাফ অ্যাক্সেস",
};

const introTitle = {
  en: "School content management",
  bn: "বিদ্যালয়ের কনটেন্ট ব্যবস্থাপনা",
};

const introSummary = {
  en: "Authorised staff can use the school CMS to upload images, publish notices, and update documents without touching code.",
  bn: "অনুমোদিত কর্মীরা কোডে হাত না দিয়েই বিদ্যালয়ের সিএমএস ব্যবহার করে ছবি আপলোড, নোটিশ প্রকাশ এবং নথি আপডেট করতে পারবেন।",
};

export default function LoginPage() {
  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="login-layout">
        <div className="shell login-layout__grid">
          <article className="portal-card stack">
            <LocalizedText
              as="p"
              className="eyebrow"
              text={{ en: "How access works", bn: "অ্যাক্সেসের নিয়ম" }}
            />
            <LocalizedText
              as="h3"
              text={{ en: "GitHub-based staff sign-in", bn: "GitHub-ভিত্তিক স্টাফ সাইন-ইন" }}
            />
            <LocalizedText
              as="p"
              text={{
                en: "Each authorised editor signs in with a GitHub account. You keep full control of the repository and deployment, while staff only manage school content through the editor.",
                bn: "প্রত্যেক অনুমোদিত সম্পাদক একটি GitHub অ্যাকাউন্ট দিয়ে সাইন ইন করবেন। রিপোজিটরি ও ডিপ্লয়মেন্ট আপনার নিয়ন্ত্রণে থাকবে, আর কর্মীরা শুধু এডিটরের মাধ্যমে বিদ্যালয়ের কনটেন্ট পরিচালনা করবেন।",
              }}
            />
            <LocalizedText
              as="p"
              className="helper-text"
              text={{
                en: "Recommended: keep final merge and code access with you, and let other staff submit content updates from the CMS.",
                bn: "প্রস্তাবিত ব্যবস্থা: চূড়ান্ত মার্জ ও কোড অ্যাক্সেস আপনার কাছে রাখুন, আর অন্য কর্মীরা সিএমএস থেকে কনটেন্ট আপডেট জমা দিন।",
              }}
            />
          </article>

          <StaffAccessCard />
        </div>
      </section>
    </>
  );
}
