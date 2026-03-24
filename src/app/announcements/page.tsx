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
    bn: "বিদ্যালয়ের সাম্প্রতিক বিজ্ঞপ্তি, টিউশন-সংক্রান্ত খবর এবং প্রয়োজনীয় আপডেট এখানে একসঙ্গে পাওয়া যাবে।",
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
                                src="/media/simple_announcements_board.png"
                                width={760}
                            />
                        </div>

                        <div className="stack announcements-feature__card">
                            <LocalizedText
                                as="h2"
                                className="announcement-title"
                                text={{
                                    en: "Free / Low-Cost Tuition for Students",
                                    bn: "ছাত্র-ছাত্রীদের জন্য বিনামূল্যে বা স্বল্প খরচে টিউশন",
                                }}
                            />

                            <p className="announcement-salutation">
                                <LocalizedText
                                    text={{
                                        en: "Dear Parents / Guardians,",
                                        bn: "প্রিয় অভিভাবকবৃন্দ,",
                                    }}
                                />
                            </p>

                            <ul className="stack" style={{ gap: "1rem", paddingLeft: "20px", margin: "1.5rem 0", lineHeight: "1.8" }}>
                                <li>
                                    <LocalizedText
                                        text={{
                                            en: "The NGBM Pathshala, located at Humaniapota, will provide free or low-cost tuition to students from Class 2 to Class 8, starting January 2026.",
                                            bn: "হুমানিয়াপোতায় অবস্থিত এনজিবিএম পাঠশালায় ২০২৬ সালের জানুয়ারি থেকে দ্বিতীয় শ্রেণি থেকে অষ্টম শ্রেণি পর্যন্ত ছাত্র-ছাত্রীদের জন্য বিনামূল্যে বা স্বল্প খরচে টিউশনের ব্যবস্থা করা হবে।",
                                        }}
                                    />
                                </li>
                                <li>
                                    <LocalizedText
                                        text={{
                                            en: "New teachers have been appointed. Classes will be held 4 days a week (Saturday–Sunday and 2 other weekdays before or after school) for 2.5 hours each session, covering all subjects. No additional tuition from elsewhere will be needed.",
                                            bn: "নতুন শিক্ষক নিয়োগ করা হয়েছে। সপ্তাহে ৪ দিন করে পড়ানো হবে; শনি-রবি এবং সপ্তাহের আরও ২ দিন স্কুলের আগে বা পরে প্রতিটি ক্লাস হবে প্রায় আড়াই ঘণ্টা। সব বিষয়ই পড়ানো হবে, তাই আলাদা করে অন্য কোথাও টিউশনের প্রয়োজন হবে না।",
                                        }}
                                    />
                                </li>
                                <li>
                                    <LocalizedText
                                        text={{
                                            en: "Each class will have a maximum of 6 students. Parents are requested to register their children as soon as possible.",
                                            bn: "প্রতি ব্যাচে সর্বোচ্চ ৬ জন ছাত্র-ছাত্রী নেওয়া হবে। তাই আগ্রহী অভিভাবকদের যত তাড়াতাড়ি সম্ভব নাম নথিভুক্ত করার অনুরোধ জানানো হচ্ছে।",
                                        }}
                                    />
                                </li>
                                <li>
                                    <LocalizedText
                                        text={{
                                            en: "A minimal donation will be collected upon registration so that parents feel a sense of responsibility and dignity.",
                                            bn: "নাম নথিভুক্ত করার সময় সামান্য অনুদান নেওয়া হবে, যাতে এই উদ্যোগের প্রতি অভিভাবকদের অংশগ্রহণ ও দায়িত্ববোধ বজায় থাকে।",
                                        }}
                                    />
                                </li>
                                <li>
                                    <LocalizedText
                                        text={{
                                            en: "Registration will take place in the 3rd and 4th weeks of December and in January. Priority will be given to interested students on a first-come basis.",
                                            bn: "ডিসেম্বরের তৃতীয় ও চতুর্থ সপ্তাহে এবং জানুয়ারি মাস জুড়ে নাম নথিভুক্ত করা হবে। আগে এলে আগে সুযোগের ভিত্তিতে ভর্তি নেওয়া হবে।",
                                        }}
                                    />
                                </li>
                            </ul>

                            <div style={{ textAlign: "center", margin: "2.5rem 0 1.5rem" }}>
                                <p className="announcement-coop">
                                    <LocalizedText
                                        text={{
                                            en: "|| Your cooperation is appreciated ||",
                                            bn: "আপনাদের সহযোগিতা একান্তভাবে কাম্য।",
                                        }}
                                    />
                                </p>
                                <p>
                                    <LocalizedText
                                        text={{
                                            en: "For details, please contact",
                                            bn: "বিস্তারিত জানতে যোগাযোগ করুন:",
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
                                <p style={{ fontWeight: 600 }}>
                                    <LocalizedText
                                        text={{
                                            en: "- NGBM Governing body",
                                            bn: "- এনজিবিএম পরিচালন সমিতি",
                                        }}
                                    />
                                </p>
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
