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
          <StaffAccessCard />
        </div>
      </section>
    </>
  );
}
