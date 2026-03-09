import { getGalleryItems } from "@/lib/content";
import { LocalizedText } from "@/components/language-provider";
import { GalleryGrid } from "@/components/gallery-grid";

const pageTitle = {
    en: "Gallery",
    bn: "গ্যালারি",
};

const pageIntro = {
    en: "Glimpses into our vibrant campus, classroom activities, and school celebrations.",
    bn: "আমাদের প্রাণবন্ত ক্যাম্পাস, শ্রেণিকক্ষের কার্যক্রম এবং বিদ্যালয়ের উদ্‌যাপনের একঝলক।",
};

export default async function GalleryPage() {
    const items = await getGalleryItems();

    return (
        <div className="page-layout">
            <header className="page-header">
                <div className="shell stack">
                    <LocalizedText as="h1" className="page-title" text={pageTitle} />
                    <div className="page-intro">
                        <div className="page-intro__inner">
                            <LocalizedText as="p" className="lede" text={pageIntro} />
                        </div>
                    </div>
                </div>
            </header>

            <section className="page-content bg-surface">
                <div className="shell">
                    <GalleryGrid items={items} />
                </div>
            </section>
        </div>
    );
}
