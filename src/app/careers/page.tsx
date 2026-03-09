import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import { siteMeta } from "@/data/site-content";
import Image from "next/image";

const introEyebrow = {
    en: "Opportunities & Notices",
    bn: "সুযোগ ও বিজ্ঞপ্তি",
};

const introTitle = {
    en: "Careers and Announcements",
    bn: "ক্যারিয়ার এবং ঘোষণাসমূহ",
};

const introSummary = {
    en: "Join our team or stay updated with the latest school notices and tuition programs.",
    bn: "আমাদের দলে যোগ দিন অথবা বিদ্যালয়ের সর্বশেষ বিজ্ঞপ্তি এবং টিউশন প্রোগ্রাম সম্পর্কে জানুন।",
};

export default function CareersPage() {
    return (
        <>
            <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

            <section className="section" style={{ background: 'var(--tone-sand)' }}>
                <div className="shell grid-2" style={{ alignItems: 'center' }}>
                    <div className="feature-panel__content stack" style={{ padding: '2rem 0' }}>
                        <h2 style={{ color: 'var(--accent-strong)', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>WE ARE HIRING</h2>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                            Join Our Happy Team!<br />At {siteMeta.name.en}
                        </h3>

                        <div className="stack" style={{ gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <p><strong>Available Positions:</strong></p>
                            <ul style={{ paddingLeft: '20px' }}>
                                <li>Primary / Pre-school Teacher</li>
                                <li>Administrator</li>
                            </ul>
                        </div>

                        <div className="stack" style={{ gap: '0.5rem' }}>
                            <p><strong>Qualifications:</strong></p>
                            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li><strong>Pre-school:</strong> Higher Secondary, convent educated & teaching experience</li>
                                <li><strong>Primary:</strong> Graduate, convent educated & teaching experience</li>
                                <li><strong>Admin:</strong> Graduate & Computer Proficient, Experience in school administration</li>
                            </ul>
                        </div>

                        <p style={{ marginTop: '1.5rem', color: 'var(--muted)' }}>
                            <em>Note: T&C / Salary negotiable</em>
                        </p>

                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.6)', borderRadius: '16px' }}>
                            <p style={{ marginBottom: '8px' }}><strong>Location:</strong> Humaniapota, PS - Gangnapur</p>
                            <p style={{ marginBottom: '8px' }}><strong>Contact:</strong> 9830384958 / 9382738446 / 8756339237</p>
                            <p><strong>Email:</strong> {siteMeta.foundationEmail}</p>
                        </div>

                        <a className="btn btn--accent" href={`mailto:${siteMeta.foundationEmail}`} style={{ width: 'fit-content', marginTop: '1rem' }}>
                            Apply Now
                        </a>
                    </div>

                    <div className="feature-panel__image-wrap" style={{ borderRadius: '28px', overflow: 'hidden', height: '100%', minHeight: '500px' }}>
                        <Image
                            alt="Hiring Banner Illustration"
                            src="/media/hiring_banner.png"
                            width={800}
                            height={1000}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--tone-orange)' }}>
                <div className="shell grid-2" style={{ alignItems: 'center' }}>
                    <div className="feature-panel__image-wrap" style={{ borderRadius: '28px', overflow: 'hidden', height: '100%', minHeight: '500px' }}>
                        <Image
                            alt="Free Tuition Notice Illustration"
                            src="/media/free_tuition_notice.png"
                            width={800}
                            height={1000}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    <div className="feature-panel__content stack" style={{ background: 'white', padding: 'clamp(2rem, 5vw, 3rem)', borderRadius: '28px' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', color: 'var(--accent-strong)' }}>বিজ্ঞপ্তি</h2>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                            ছাত্র-ছাত্রীদের বিনামূল্যে/স্বল্পমূল্যে টিউশন প্রদান
                        </h3>

                        <p style={{ fontWeight: 600 }}>মাননীয়/মাননীয়া অভিভাবক/অভিভাবিকা,</p>

                        <ul className="stack" style={{ gap: '1rem', paddingLeft: '20px', margin: '1.5rem 0', lineHeight: '1.6' }}>
                            <li>হুমানিয়াপোতা-স্থিত NGBM পাঠশালা ২য় শ্রেণি থেকে ৮ম শ্রেণি পর্যন্ত ছাত্র-ছাত্রীদের স্বল্প ব্যয়ে/বিনা ব্যয়ে টিউশন প্রদান করবে, ২০২৬-র জানুয়ারি থেকে।</li>
                            <li>নতুন শিক্ষক নিযুক্ত করা হয়েছে। সপ্তাহে ৪দিন (শনি-রবি ও সপ্তাহের অন্য দুইদিন স্কুলের আগে বা পরে) ২.৫ ঘন্টা করে পড়ানো হবে (সমস্ত বিষয়ে)। অন্য কোথাও টিউশন নেওয়ার প্রয়োজন হবে না।</li>
                            <li>প্রতি ক্লাসে সর্বোচ্চ ৬ জনের বেশি ছাত্র-ছাত্রী নেওয়া হবে না। অভিভাবকদের অনুরোধ করা হচ্ছে, আপনারা যথাশীঘ্র ছাত্র-ছাত্রীদের নাম নিবন্ধন করুন।</li>
                            <li>নাম নিবন্ধনের জন্য ন্যূনতম অনুদান নেওয়া হবে যাতে অভিভাবকরা নিজেদের সম্মানিত ও দায়িত্ব বোধ মনে করেন।</li>
                            <li>ডিসেম্বরের ৩য় ও ৪ সপ্তাহে এবং জানুয়ারিতে নাম নিবন্ধন করা হবে। আগ্রহী ছাত্র-ছাত্রীদের সুযোগের অগ্রাধিকার দেওয়া হবে।</li>
                        </ul>

                        <div style={{ textAlign: 'center', margin: '2.5rem 0 1.5rem' }}>
                            <p style={{ fontSize: '1.1rem', color: 'var(--accent-strong)', marginBottom: '8px' }}><strong>|| আপনাদের সহযোগিতা কাম্য ||</strong></p>
                            <p>বিস্তারিত জানতে যোগাযোগ করুন</p>
                        </div>

                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center' }}>
                            <div>
                                <strong>Bandana Mukherjee</strong><br />
                                7501124310
                            </div>
                            <div>
                                <strong>Manisha Roy</strong><br />
                                9382908027
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)' }}>
                            <p style={{ fontWeight: 600 }}>- NGBM Governing body</p>
                            <p><a href="mailto:contact@ngbmfoundation.com">contact@ngbmfoundation.com</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
