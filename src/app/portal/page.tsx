import { LocalizedText } from "@/components/language-provider";
import { SignOutButton } from "@/components/sign-out-button";
import { SubmitButton } from "@/components/submit-button";
import { siteMeta } from "@/data/site-content";
import { requireContentAdmin } from "@/lib/auth";
import { getPortalCollections } from "@/lib/content";
import { hasSupabaseEnv } from "@/lib/supabase/env";

import {
  createDocumentAction,
  createGalleryAction,
  createNewsAction,
  createResultAction,
  deleteDocumentAction,
  deleteGalleryAction,
  deleteNewsAction,
  deleteResultAction,
} from "./actions";

type PortalPageProps = {
  searchParams: Promise<{
    message?: string;
    section?: string;
    status?: string;
  }>;
};

const deleteLabel = {
  en: "Delete",
  bn: "মুছুন",
};

export default async function PortalPage({ searchParams }: PortalPageProps) {
  const params = await searchParams;

  if (!hasSupabaseEnv()) {
    return (
      <section className="portal-layout">
        <div className="shell portal-layout__grid">
          <article className="portal-card stack">
            <LocalizedText
              as="p"
              className="eyebrow"
              text={{ en: "Portal Setup", bn: "পোর্টাল সেটআপ" }}
            />
            <LocalizedText
              as="h2"
              text={{
                en: "Supabase is not connected yet",
                bn: "Supabase এখনও সংযুক্ত হয়নি",
              }}
            />
            <LocalizedText
              as="p"
              text={{
                en: "Connect Supabase to enable admin login, uploads, and content publishing for the school team.",
                bn: "বিদ্যালয়ের টিমের জন্য অ্যাডমিন লগ ইন, আপলোড ও কনটেন্ট প্রকাশ চালু করতে Supabase সংযুক্ত করুন।",
              }}
            />
            <div className="chip-row">
              <span className="chip">Run `supabase/schema.sql`</span>
              <span className="chip">Add `.env.local` keys</span>
              <span className="chip">Make yourself `super_admin`</span>
            </div>
          </article>

          <article className="portal-pane stack">
            <LocalizedText
              as="h3"
              text={{
                en: "What this portal manages",
                bn: "এই পোর্টাল যা পরিচালনা করে",
              }}
            />
            <LocalizedText
              as="p"
              text={{ en: "News posts and school updates", bn: "সংবাদ ও বিদ্যালয়ের আপডেট" }}
            />
            <LocalizedText
              as="p"
              text={{
                en: "Documents such as prospectus PDFs and circulars",
                bn: "প্রসপেক্টাস PDF, সার্কুলার ও নথি",
              }}
            />
            <LocalizedText
              as="p"
              text={{
                en: "Result notices and downloadable files",
                bn: "ফলাফলের নোটিশ ও ডাউনলোডযোগ্য ফাইল",
              }}
            />
            <LocalizedText
              as="p"
              text={{
                en: "Homepage and gallery images",
                bn: "হোমপেজ ও গ্যালারির ছবি",
              }}
            />
          </article>
        </div>
      </section>
    );
  }

  const { user, role } = await requireContentAdmin();
  const collections = await getPortalCollections();

  return (
    <section className="portal-layout">
      <div className="shell portal-layout__grid">
        <div className="portal-overview">
          <article className="portal-card stack">
            <LocalizedText
              as="p"
              className="eyebrow"
              text={{ en: "Portal Access", bn: "পোর্টাল প্রবেশাধিকার" }}
            />
            <LocalizedText
              as="h2"
              className="portal-title"
              text={{
                en: "Content management workspace",
                bn: "কনটেন্ট ব্যবস্থাপনার কর্মক্ষেত্র",
              }}
            />
            <p>
              <LocalizedText
                text={{ en: "Signed in as ", bn: "লগ ইন করেছেন " }}
              />
              <strong>{user.email}</strong>
            </p>
            <div className="chip-row">
              <span className="chip">{role}</span>
              <LocalizedText
                as="span"
                className="chip"
                text={{
                  en: "Code-free content editing",
                  bn: "কোড ছাড়া কনটেন্ট সম্পাদনা",
                }}
              />
            </div>
            <LocalizedText
              as="p"
              className="helper-text"
              text={{
                en: "Use this portal to update public school content without changing the codebase.",
                bn: "কোডবেসে পরিবর্তন না করেই এই পোর্টাল থেকে বিদ্যালয়ের পাবলিক কনটেন্ট আপডেট করুন।",
              }}
            />
            <SignOutButton />
          </article>

          {params.status || params.message || collections.error ? (
            <article className="status-banner">
              <LocalizedText
                as="strong"
                text={
                  params.status === "deleted"
                    ? { en: "Item deleted.", bn: "আইটেম মুছে ফেলা হয়েছে।" }
                    : params.status === "saved"
                      ? { en: "Item saved.", bn: "আইটেম সংরক্ষণ করা হয়েছে।" }
                      : { en: "Portal notice.", bn: "পোর্টাল বার্তা।" }
                }
              />
              <p style={{ margin: "8px 0 0" }}>
                {params.message ||
                  collections.error ||
                  (params.status === "deleted"
                    ? "The selected item was removed."
                    : "The portal was updated.")}
              </p>
            </article>
          ) : null}

          <article className="portal-card stack">
            <LocalizedText
              as="p"
              className="eyebrow"
              text={{ en: "Admin Notes", bn: "অ্যাডমিন নোট" }}
            />
            <LocalizedText
              as="h3"
              text={{ en: "Recommended role split", bn: "প্রস্তাবিত ভূমিকা ভাগ" }}
            />
            <LocalizedText
              as="p"
              text={{
                en: "`super_admin`: full control over publishing and roles.",
                bn: "`super_admin`: প্রকাশ ও ভূমিকার পূর্ণ নিয়ন্ত্রণ।",
              }}
            />
            <LocalizedText
              as="p"
              text={{
                en: "`content_admin`: staff who upload documents, results, news, and images.",
                bn: "`content_admin`: যাঁরা নথি, ফলাফল, সংবাদ ও ছবি আপলোড করবেন।",
              }}
            />
            <LocalizedText
              as="p"
              text={{
                en: "`viewer`: signed-in user without publishing rights.",
                bn: "`viewer`: প্রকাশনার অনুমতি ছাড়া সাইন-ইন করা ব্যবহারকারী।",
              }}
            />
            <p className="helper-text">
              Storage bucket: <strong>school-assets</strong>
            </p>
            <p className="helper-text">
              Public contact: <strong>{siteMeta.schoolEmail}</strong>
            </p>
          </article>
        </div>

        <div className="portal-overview">
          <article className="portal-pane stack">
            <LocalizedText
              as="p"
              className="eyebrow"
              text={{ en: "News", bn: "সংবাদ" }}
            />
            <LocalizedText
              as="h3"
              text={{
                en: "Publish updates and celebrations",
                bn: "সংবাদ ও উদ্‌যাপন প্রকাশ করুন",
              }}
            />
            <form className="portal-form" action={createNewsAction}>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Title (English)", bn: "শিরোনাম (ইংরেজি)" }}
                />
                <input name="title" placeholder="Independence Day Celebration" required />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Title (Bengali)", bn: "শিরোনাম (বাংলা)" }}
                />
                <input name="titleBn" placeholder="স্বাধীনতা দিবস উদ্‌যাপন" />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Excerpt (English)", bn: "সারাংশ (ইংরেজি)" }}
                />
                <textarea name="excerpt" placeholder="Short card summary" required />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Excerpt (Bengali)", bn: "সারাংশ (বাংলা)" }}
                />
                <textarea name="excerptBn" placeholder="সংক্ষিপ্ত বিবরণ" />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Body (English)", bn: "বিবরণ (ইংরেজি)" }}
                />
                <textarea
                  name="body"
                  placeholder="Use blank lines between paragraphs"
                  required
                />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Body (Bengali)", bn: "বিবরণ (বাংলা)" }}
                />
                <textarea
                  name="bodyBn"
                  placeholder="অনুচ্ছেদের মাঝে ফাঁকা লাইন দিন"
                />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Publish date", bn: "প্রকাশের তারিখ" }}
                />
                <input
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  name="publishedAt"
                  required
                  type="date"
                />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{
                    en: "Cover image URL (optional)",
                    bn: "কভার ছবির URL (ঐচ্ছিক)",
                  }}
                />
                <input name="coverImageUrl" placeholder="https://..." />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{
                    en: "Cover image file (optional)",
                    bn: "কভার ছবি আপলোড (ঐচ্ছিক)",
                  }}
                />
                <input accept="image/*" name="coverImageFile" type="file" />
              </label>
              <label className="chip">
                <input name="featured" type="checkbox" />
                <LocalizedText
                  text={{ en: "Feature on homepage", bn: "হোমপেজে দেখান" }}
                />
              </label>
              <SubmitButton
                idleLabel={{ en: "Publish news", bn: "সংবাদ প্রকাশ করুন" }}
                pendingLabel={{ en: "Publishing...", bn: "প্রকাশ করা হচ্ছে..." }}
              />
            </form>

            <div className="portal-list">
              {collections.news.map((item) => (
                <div className="portal-item" key={item.id}>
                  <div className="portal-item__copy">
                    <strong>{item.title}</strong>
                    <p>{item.excerpt}</p>
                  </div>
                  <form action={deleteNewsAction} className="inline-form">
                    <input name="id" type="hidden" value={item.id} />
                    <input name="slug" type="hidden" value={item.slug} />
                    <button className="danger-button" type="submit">
                      <LocalizedText text={deleteLabel} />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </article>

          <article className="portal-pane stack">
            <LocalizedText
              as="p"
              className="eyebrow"
              text={{ en: "Documents", bn: "নথি" }}
            />
            <LocalizedText
              as="h3"
              text={{
                en: "Upload PDFs and school resources",
                bn: "PDF ও বিদ্যালয়ের নথি আপলোড করুন",
              }}
            />
            <form className="portal-form" action={createDocumentAction}>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Title (English)", bn: "শিরোনাম (ইংরেজি)" }}
                />
                <input name="title" placeholder="School Prospectus" required />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Title (Bengali)", bn: "শিরোনাম (বাংলা)" }}
                />
                <input name="titleBn" placeholder="স্কুল প্রসপেক্টাস" />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Category (English)", bn: "বিভাগ (ইংরেজি)" }}
                />
                <input name="category" placeholder="Admissions" required />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Category (Bengali)", bn: "বিভাগ (বাংলা)" }}
                />
                <input name="categoryBn" placeholder="ভর্তি" />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Description (English)", bn: "বিবরণ (ইংরেজি)" }}
                />
                <textarea
                  name="description"
                  placeholder="What this file is for"
                  required
                />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Description (Bengali)", bn: "বিবরণ (বাংলা)" }}
                />
                <textarea
                  name="descriptionBn"
                  placeholder="এই ফাইলটি কী জন্য"
                />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "File URL (optional)", bn: "ফাইল URL (ঐচ্ছিক)" }}
                />
                <input name="fileUrl" placeholder="https://..." />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Upload file (optional)", bn: "ফাইল আপলোড (ঐচ্ছিক)" }}
                />
                <input name="fileUpload" type="file" />
              </label>
              <SubmitButton
                idleLabel={{ en: "Save document", bn: "নথি সংরক্ষণ করুন" }}
                pendingLabel={{ en: "Saving...", bn: "সংরক্ষণ করা হচ্ছে..." }}
              />
            </form>

            <div className="portal-list">
              {collections.documents.map((item) => (
                <div className="portal-item" key={item.id}>
                  <div className="portal-item__copy">
                    <strong>{item.title}</strong>
                    <p>{item.category}</p>
                  </div>
                  <form action={deleteDocumentAction} className="inline-form">
                    <input name="id" type="hidden" value={item.id} />
                    <button className="danger-button" type="submit">
                      <LocalizedText text={deleteLabel} />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </article>

          <article className="portal-pane stack">
            <LocalizedText
              as="p"
              className="eyebrow"
              text={{ en: "Results", bn: "ফলাফল" }}
            />
            <LocalizedText
              as="h3"
              text={{
                en: "Update notices and result pages",
                bn: "ফলাফলের নোটিশ ও পৃষ্ঠা আপডেট করুন",
              }}
            />
            <form className="portal-form" action={createResultAction}>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Title (English)", bn: "শিরোনাম (ইংরেজি)" }}
                />
                <input name="title" placeholder="Term 1 Results" required />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Title (Bengali)", bn: "শিরোনাম (বাংলা)" }}
                />
                <input name="titleBn" placeholder="টার্ম ১ ফলাফল" />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Summary (English)", bn: "সারাংশ (ইংরেজি)" }}
                />
                <textarea name="summary" placeholder="Short public notice" required />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Summary (Bengali)", bn: "সারাংশ (বাংলা)" }}
                />
                <textarea name="summaryBn" placeholder="সংক্ষিপ্ত নোটিশ" />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Details (English)", bn: "বিস্তারিত (ইংরেজি)" }}
                />
                <textarea
                  name="details"
                  placeholder="Use blank lines between paragraphs"
                  required
                />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Details (Bengali)", bn: "বিস্তারিত (বাংলা)" }}
                />
                <textarea
                  name="detailsBn"
                  placeholder="অনুচ্ছেদের মাঝে ফাঁকা লাইন দিন"
                />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Location (English)", bn: "অবস্থান (ইংরেজি)" }}
                />
                <input
                  name="location"
                  placeholder={siteMeta.eventLocation.en}
                  required
                />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Location (Bengali)", bn: "অবস্থান (বাংলা)" }}
                />
                <input name="locationBn" placeholder={siteMeta.eventLocation.bn} />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Status (English)", bn: "অবস্থা (ইংরেজি)" }}
                />
                <input name="status" placeholder="Awaiting publication" required />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Status (Bengali)", bn: "অবস্থা (বাংলা)" }}
                />
                <input name="statusBn" placeholder="প্রকাশের অপেক্ষায়" />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Result date (optional)", bn: "ফলাফলের তারিখ (ঐচ্ছিক)" }}
                />
                <input name="resultDate" type="date" />
              </label>
              <SubmitButton
                idleLabel={{ en: "Save result notice", bn: "ফলাফলের নোটিশ সংরক্ষণ করুন" }}
                pendingLabel={{ en: "Saving...", bn: "সংরক্ষণ করা হচ্ছে..." }}
              />
            </form>

            <div className="portal-list">
              {collections.results.map((item) => (
                <div className="portal-item" key={item.id}>
                  <div className="portal-item__copy">
                    <strong>{item.title}</strong>
                    <p>{item.status}</p>
                  </div>
                  <form action={deleteResultAction} className="inline-form">
                    <input name="id" type="hidden" value={item.id} />
                    <input name="slug" type="hidden" value={item.slug} />
                    <button className="danger-button" type="submit">
                      <LocalizedText text={deleteLabel} />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </article>

          <article className="portal-pane stack">
            <LocalizedText
              as="p"
              className="eyebrow"
              text={{ en: "Gallery", bn: "গ্যালারি" }}
            />
            <LocalizedText
              as="h3"
              text={{
                en: "Refresh homepage and page imagery",
                bn: "হোমপেজ ও পৃষ্ঠার ছবি আপডেট করুন",
              }}
            />
            <form className="portal-form" action={createGalleryAction}>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Title (English)", bn: "শিরোনাম (ইংরেজি)" }}
                />
                <input name="title" placeholder="School Tour" required />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Title (Bengali)", bn: "শিরোনাম (বাংলা)" }}
                />
                <input name="titleBn" placeholder="স্কুল ট্যুর" />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Caption (English)", bn: "ক্যাপশন (ইংরেজি)" }}
                />
                <textarea name="caption" placeholder="Short image note" required />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Caption (Bengali)", bn: "ক্যাপশন (বাংলা)" }}
                />
                <textarea name="captionBn" placeholder="সংক্ষিপ্ত বর্ণনা" />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Image URL (optional)", bn: "ছবির URL (ঐচ্ছিক)" }}
                />
                <input name="imageUrl" placeholder="https://..." />
              </label>
              <label className="field">
                <LocalizedText
                  as="span"
                  text={{ en: "Upload image", bn: "ছবি আপলোড করুন" }}
                />
                <input accept="image/*" name="imageFile" type="file" />
              </label>
              <SubmitButton
                idleLabel={{ en: "Save image", bn: "ছবি সংরক্ষণ করুন" }}
                pendingLabel={{ en: "Saving...", bn: "সংরক্ষণ করা হচ্ছে..." }}
              />
            </form>

            <div className="portal-list">
              {collections.gallery.map((item) => (
                <div className="portal-item" key={item.id}>
                  <div className="portal-item__copy">
                    <strong>{item.title}</strong>
                    <p>{item.caption || "Homepage gallery item"}</p>
                  </div>
                  <form action={deleteGalleryAction} className="inline-form">
                    <input name="id" type="hidden" value={item.id} />
                    <button className="danger-button" type="submit">
                      <LocalizedText text={deleteLabel} />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
