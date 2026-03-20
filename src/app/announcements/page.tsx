import Link from "next/link";
import Image from "next/image";

import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import { getResults } from "@/lib/content";

const introEyebrow = {
    en: "Announcements",
    bn: "বিজ্ঞপ্তি",
};

const introTitle = {
    en: "Notices & Updates",
    bn: "বিজ্ঞপ্তি ও আপডেট",
};

const introSummary = {
    en: "Stay informed with the latest school notices, tuition programs, and important updates from NGBM Foundation.",
    bn: "NGBM ফাউন্ডেশনের সর্বশেষ বিদ্যালয়ের বিজ্ঞপ্তি, টিউশন প্রোগ্রাম এবং গুরুত্বপূর্ণ আপডেট সম্পর্কে জানুন।",
};

const upcomingNotice = {
    en: "Upcoming Notice",
    bn: "আসন্ন নোটিশ",
};

const viewNotice = {
    en: "View Notice",
    bn: "নোটিশ দেখুন",
};

export default async function AnnouncementsPage() {
    const results = await getResults();
    const latestResult = results[0];

    return (
        <>
            <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

            <section className="section">
                <div className="shell" style={{ maxWidth: "1080px" }}>
                    <div className="announcements-feature">
                        <div aria-hidden="true" className="announcements-feature__art">
                            <Image
                                alt=""
                                className="announcements-feature__art-image"
                                height={900}
                                src="/media/illustrations/announcements-board.svg"
                                width={760}
                            />
                        </div>

                        <div
                            className="stack announcements-feature__card"
                            style={{
                                background: "white",
                                padding: "clamp(2rem, 5vw, 3rem)",
                                borderRadius: "28px",
                                border: "1px solid var(--line)",
                                boxShadow: "var(--shadow)",
                            }}
                        >
                            <LocalizedText
                                as="h2"
                                className="announcement-title"
                                text={{
                                    en: "Free / Low-Cost Tuition for Students",
                                    bn: "ছাত্র-ছাত্রীদের বিনামূল্যে/স্বল্পমূল্যে টিউশন প্রদান",
                                }}
                            />

                            <p className="announcement-salutation">
                                <LocalizedText
                                    text={{
                                        en: "Dear Parents / Guardians,",
                                        bn: "মাননীয়/মাননীয়া অভিভাবক/অভিভাবিকা,",
                                    }}
                                />
                            </p>

                            <ul className="stack" style={{ gap: "1rem", paddingLeft: "20px", margin: "1.5rem 0", lineHeight: "1.8" }}>
                                <li>
                                    <LocalizedText
                                        text={{
                                            en: "The NGBM Pathshala, located at Humaniapota, will provide free or low-cost tuition to students from Class 2 to Class 8, starting January 2026.",
                                            bn: "হুমানিয়াপোতা-স্থিত NGBM পাঠশালা ২য় শ্রেণি থেকে ৮ম শ্রেণি পর্যন্ত ছাত্র-ছাত্রীদের স্বল্প ব্যয়ে/বিনা ব্যয়ে টিউশন প্রদান করবে, ২০২৬-র জানুয়ারি থেকে।",
                                        }}
                                    />
                                </li>
                                <li>
                                    <LocalizedText
                                        text={{
                                            en: "New teachers have been appointed. Classes will be held 4 days a week (Saturday–Sunday and 2 other weekdays before or after school) for 2.5 hours each session, covering all subjects. No additional tuition from elsewhere will be needed.",
                                            bn: "নতুন শিক্ষক নিযুক্ত করা হয়েছে। সপ্তাহে ৪দিন (শনি-রবি ও সপ্তাহের অন্য দুইদিন স্কুলের আগে বা পরে) ২.৫ ঘন্টা করে পড়ানো হবে (সমস্ত বিষয়ে)। অন্য কোথাও টিউশন নেওয়ার প্রয়োজন হবে না।",
                                        }}
                                    />
                                </li>
                                <li>
                                    <LocalizedText
                                        text={{
                                            en: "Each class will have a maximum of 6 students. Parents are requested to register their children as soon as possible.",
                                            bn: "প্রতি ক্লাসে সর্বোচ্চ ৬ জনের বেশি ছাত্র-ছাত্রী নেওয়া হবে না। অভিভাবকদের অনুরোধ করা হচ্ছে, আপনারা যথাশীঘ্র ছাত্র-ছাত্রীদের নাম নিবন্ধন করুন।",
                                        }}
                                    />
                                </li>
                                <li>
                                    <LocalizedText
                                        text={{
                                            en: "A minimal donation will be collected upon registration so that parents feel a sense of responsibility and dignity.",
                                            bn: "নাম নিবন্ধনের জন্য ন্যূনতম অনুদান নেওয়া হবে যাতে অভিভাবকরা নিজেদের সম্মানিত ও দায়িত্ব বোধ মনে করেন।",
                                        }}
                                    />
                                </li>
                                <li>
                                    <LocalizedText
                                        text={{
                                            en: "Registration will take place in the 3rd and 4th weeks of December and in January. Priority will be given to interested students on a first-come basis.",
                                            bn: "ডিসেম্বরের ৩য় ও ৪ সপ্তাহে এবং জানুয়ারিতে নাম নিবন্ধন করা হবে। আগ্রহী ছাত্র-ছাত্রীদের সুযোগের অগ্রাধিকার দেওয়া হবে।",
                                        }}
                                    />
                                </li>
                            </ul>

                            <div style={{ textAlign: "center", margin: "2.5rem 0 1.5rem" }}>
                                <p className="announcement-coop">
                                    <LocalizedText
                                        text={{
                                            en: "|| Your cooperation is appreciated ||",
                                            bn: "|| আপনাদের সহযোগিতা কাম্য ||",
                                        }}
                                    />
                                </p>
                                <p>
                                    <LocalizedText
                                        text={{
                                            en: "For details, please contact",
                                            bn: "বিস্তারিত জানতে যোগাযোগ করুন",
                                        }}
                                    />
                                </p>
                            </div>

                            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center", textAlign: "center" }}>
                                <div>
                                    <strong>Bandana Mukherjee</strong><br />
                                    <a href="tel:7501124310">7501124310</a>
                                </div>
                                <div>
                                    <strong>Manisha Roy</strong><br />
                                    <a href="tel:9382908027">9382908027</a>
                                </div>
                            </div>

                            <div style={{ textAlign: "center", marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--line)" }}>
                                <p style={{ fontWeight: 600 }}>- NGBM Governing body</p>
                                <p><a href="mailto:contact@ngbmfoundation.com">contact@ngbmfoundation.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {latestResult ? (
                <section className="section section--tight-top">
                    <div className="shell" style={{ maxWidth: "860px" }}>
                        <article className="portal-card stack">
                            <LocalizedText as="p" className="eyebrow" text={upcomingNotice} />
                            <LocalizedText as="h3" text={latestResult.title} />
                            <LocalizedText as="p" text={latestResult.summary} />
                            <div className="chip-row">
                                <LocalizedText as="span" className="chip" text={latestResult.status} />
                                <LocalizedText as="span" className="chip" text={latestResult.location} />
                            </div>
                            <Link className="btn btn--accent" href={`/events/${latestResult.slug}`}>
                                <LocalizedText text={viewNotice} />
                            </Link>
                        </article>
                    </div>
                </section>
            ) : null}
        </>
    );
}
