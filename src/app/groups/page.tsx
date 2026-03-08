import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";

const introEyebrow = {
  en: "Staff Workflow",
  bn: "স্টাফ ওয়ার্কফ্লো",
};

const introTitle = {
  en: "How content approval works",
  bn: "কনটেন্ট অনুমোদনের ধাপ",
};

const introSummary = {
  en: "School editors can submit updates through the CMS, and the main administrator keeps repository control.",
  bn: "বিদ্যালয়ের সম্পাদকরা সিএমএসের মাধ্যমে আপডেট জমা দিতে পারবেন, আর প্রধান প্রশাসক রিপোজিটরির নিয়ন্ত্রণ বজায় রাখবেন।",
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
                en: "Use the staff CMS to upload documents, gallery images, notices, and news. The site owner can review and publish those changes through GitHub and Vercel.",
                bn: "নথি, গ্যালারির ছবি, নোটিশ ও সংবাদ আপলোড করতে স্টাফ সিএমএস ব্যবহার করুন। সাইটের প্রধান প্রশাসক GitHub ও Vercel-এর মাধ্যমে সেই পরিবর্তনগুলি পর্যালোচনা ও প্রকাশ করতে পারবেন।",
              }}
            />
          </article>
        </div>
      </section>
    </>
  );
}
