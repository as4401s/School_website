import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import { StaffAccessCard } from "@/components/staff-access-card";
import {
  getDocuments,
  getGalleryItems,
  getNewsPosts,
  getResults,
} from "@/lib/content";

const introEyebrow = {
  en: "Staff Portal",
  bn: "স্টাফ পোর্টাল",
};

const introTitle = {
  en: "Publish school content without coding",
  bn: "কোড ছাড়াই বিদ্যালয়ের কনটেন্ট প্রকাশ করুন",
};

const introSummary = {
  en: "The staff CMS gives authorised editors a simple place to upload images, post notices, update results, and manage public documents.",
  bn: "স্টাফ সিএমএস-এর মাধ্যমে অনুমোদিত সম্পাদকরা সহজে ছবি আপলোড, নোটিশ প্রকাশ, ফলাফল হালনাগাদ এবং প্রয়োজনীয় নথি পরিচালনা করতে পারবেন।",
};

export default async function PortalPage() {
  const [news, documents, results, gallery] = await Promise.all([
    getNewsPosts(),
    getDocuments(),
    getResults(),
    getGalleryItems(),
  ]);

  return (
    <>
      <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

      <section className="portal-layout">
        <div className="shell portal-layout__grid">
          <div className="portal-overview">
            <article className="portal-card stack">
              <LocalizedText
                as="p"
                className="eyebrow"
                text={{ en: "What editors can update", bn: "সম্পাদকরা যা হালনাগাদ করতে পারবেন" }}
              />
              <div className="chip-row">
                <LocalizedText
                  as="span"
                  className="chip"
                  text={{ en: `${news.length} news items`, bn: `${news.length}টি সংবাদ` }}
                />
                <LocalizedText
                  as="span"
                  className="chip"
                  text={{ en: `${results.length} result notices`, bn: `${results.length}টি ফলাফল-সংক্রান্ত নোটিশ` }}
                />
                <LocalizedText
                  as="span"
                  className="chip"
                  text={{ en: `${documents.length} documents`, bn: `${documents.length}টি নথি` }}
                />
                <LocalizedText
                  as="span"
                  className="chip"
                  text={{ en: `${gallery.length} gallery items`, bn: `${gallery.length}টি গ্যালারি ছবি` }}
                />
              </div>
              <LocalizedText
                as="p"
                text={{
                  en: "Use the CMS for bilingual public content, document uploads, image galleries, and school announcements.",
                  bn: "দ্বিভাষিক কনটেন্ট, নথি আপলোড, গ্যালারির ছবি এবং বিদ্যালয়ের বিজ্ঞপ্তি প্রকাশের জন্য সিএমএস ব্যবহার করুন।",
                }}
              />
            </article>

            <article className="portal-card stack">
              <LocalizedText
                as="p"
                className="eyebrow"
                text={{ en: "Recommended permissions", bn: "প্রবেশাধিকার ও দায়িত্ব" }}
              />
              <LocalizedText
                as="p"
                text={{
                  en: "You stay the main repository owner and deployment admin. Other staff can be invited to submit content updates through the CMS with GitHub accounts.",
                  bn: "মূল রিপোজিটরি ও ডিপ্লয়মেন্টের দায়িত্ব প্রধান প্রশাসকের কাছেই থাকবে। অন্য কর্মীদের GitHub অ্যাকাউন্টের মাধ্যমে সিএমএস ব্যবহার করে কনটেন্ট জমা দেওয়ার সুযোগ দেওয়া যেতে পারে।",
                }}
              />
              <LocalizedText
                as="p"
                className="helper-text"
                text={{
                  en: "This keeps code access separate from school content editing.",
                  bn: "এতে কোডের প্রবেশাধিকার এবং বিদ্যালয়ের কনটেন্ট সম্পাদনার কাজ আলাদা রাখা যায়।",
                }}
              />
            </article>
          </div>

          <StaffAccessCard />
        </div>
      </section>
    </>
  );
}
