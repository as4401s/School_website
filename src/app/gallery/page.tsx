import { getGalleryItems } from "@/lib/content";
import { LocalizedText } from "@/components/language-provider";
import { GalleryGrid } from "@/components/gallery-grid";
import { PageIntro } from "@/components/page-intro";

const introEyebrow = {
    en: "Gallery",
    bn: "গ্যালারি",
};

const pageTitle = {
    en: "Gallery",
    bn: "গ্যালারি",
};

const pageIntro = {
    en: "Glimpses into our vibrant campus, classroom activities, and school celebrations.",
    bn: "আমাদের প্রাণবন্ত ক্যাম্পাস, শ্রেণিকক্ষের কার্যক্রম এবং বিদ্যালয়ের উদযাপনের একঝলক।",
};

export default async function GalleryPage() {
    const items = await getGalleryItems();

    return (
        <>
            <PageIntro eyebrow={introEyebrow} summary={pageIntro} title={pageTitle} />

            <section className="section">
                <div className="shell">
                    <GalleryGrid items={items} />
                </div>
            </section>
        </>
    );
}
