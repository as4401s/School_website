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
  bn: "কোড ছাড়া বিদ্যালয়ের কনটেন্ট প্রকাশ করুন",
};

const introSummary = {
  en: "The staff CMS gives authorised editors a simple place to upload images, post notices, update results, and manage public documents.",
  bn: "স্টাফ সিএমএস অনুমোদিত সম্পাদকদের জন্য ছবি আপলোড, নোটিশ প্রকাশ, ফলাফল আপডেট এবং পাবলিক নথি পরিচালনার একটি সহজ জায়গা দেয়।",
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
                text={{ en: "What editors can update", bn: "সম্পাদকরা যা আপডেট করতে পারবেন" }}
              />
              <div className="chip-row">
                <span className="chip">{news.length} news items</span>
                <span className="chip">{results.length} result notices</span>
                <span className="chip">{documents.length} documents</span>
                <span className="chip">{gallery.length} gallery items</span>
              </div>
              <LocalizedText
                as="p"
                text={{
                  en: "Use the CMS for bilingual public content, document uploads, image galleries, and school announcements.",
                  bn: "দ্বিভাষিক পাবলিক কনটেন্ট, নথি আপলোড, ছবি গ্যালারি এবং বিদ্যালয়ের ঘোষণার জন্য সিএমএস ব্যবহার করুন।",
                }}
              />
            </article>

            <article className="portal-card stack">
              <LocalizedText
                as="p"
                className="eyebrow"
                text={{ en: "Recommended permissions", bn: "প্রস্তাবিত অনুমতি" }}
              />
              <LocalizedText
                as="p"
                text={{
                  en: "You stay the main repository owner and deployment admin. Other staff can be invited to submit content updates through the CMS with GitHub accounts.",
                  bn: "আপনি প্রধান রিপোজিটরি মালিক ও ডিপ্লয়মেন্ট অ্যাডমিন থাকবেন। অন্য কর্মীদের GitHub অ্যাকাউন্ট দিয়ে সিএমএসের মাধ্যমে কনটেন্ট আপডেট জমা দেওয়ার অনুমতি দেওয়া যাবে।",
                }}
              />
              <LocalizedText
                as="p"
                className="helper-text"
                text={{
                  en: "This keeps code access separate from school content editing.",
                  bn: "এতে কোড অ্যাক্সেস এবং বিদ্যালয়ের কনটেন্ট সম্পাদনা আলাদা থাকে।",
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
