import { LocalizedText } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import { siteMeta } from "@/data/site-content";
import Image from "next/image";

const introEyebrow = {
    en: "Opportunities",
    bn: "সুযোগ",
};

const introTitle = {
    en: "Careers",
    bn: "ক্যারিয়ার",
};

const introSummary = {
    en: "Join our team and help shape the future of education at KMS.",
    bn: "আমাদের দলে যোগ দিন এবং কেএমএস-এ শিক্ষার ভবিষ্যৎ গড়তে সাহায্য করুন।",
};

export default function CareersPage() {
    return (
        <>
            <PageIntro eyebrow={introEyebrow} summary={introSummary} title={introTitle} />

            <section className="section" style={{ background: 'var(--tone-sand)' }}>
                <div className="shell grid-2" style={{ alignItems: 'center' }}>
                    <div className="feature-panel__content stack" style={{ padding: '2rem 0' }}>
                        <h2 style={{ color: 'var(--accent-strong)', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                            <LocalizedText text={{ en: "WE ARE HIRING", bn: "আমরা নিয়োগ করছি" }} />
                        </h2>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                            <LocalizedText text={{
                                en: `Join Our Happy Team!\nAt ${siteMeta.name.en}`,
                                bn: `আমাদের আনন্দময় দলে যোগ দিন!\n${siteMeta.name.bn}-তে`,
                            }} />
                        </h3>

                        <div className="stack" style={{ gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <p><strong><LocalizedText text={{ en: "Available Positions:", bn: "উপলব্ধ পদসমূহ:" }} /></strong></p>
                            <ul style={{ paddingLeft: '20px' }}>
                                <li><LocalizedText text={{ en: "Primary / Pre-school Teacher", bn: "প্রাইমারি / প্রি-স্কুল শিক্ষক" }} /></li>
                                <li><LocalizedText text={{ en: "Administrator", bn: "প্রশাসক" }} /></li>
                            </ul>
                        </div>

                        <div className="stack" style={{ gap: '0.5rem' }}>
                            <p><strong><LocalizedText text={{ en: "Qualifications:", bn: "যোগ্যতা:" }} /></strong></p>
                            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li>
                                    <strong><LocalizedText text={{ en: "Pre-school:", bn: "প্রি-স্কুল:" }} /></strong>{" "}
                                    <LocalizedText text={{ en: "Higher Secondary, convent educated & teaching experience", bn: "উচ্চ মাধ্যমিক, কনভেন্ট শিক্ষিত ও শিক্ষকতার অভিজ্ঞতা" }} />
                                </li>
                                <li>
                                    <strong><LocalizedText text={{ en: "Primary:", bn: "প্রাইমারি:" }} /></strong>{" "}
                                    <LocalizedText text={{ en: "Graduate, convent educated & teaching experience", bn: "স্নাতক, কনভেন্ট শিক্ষিত ও শিক্ষকতার অভিজ্ঞতা" }} />
                                </li>
                                <li>
                                    <strong><LocalizedText text={{ en: "Admin:", bn: "প্রশাসন:" }} /></strong>{" "}
                                    <LocalizedText text={{ en: "Graduate & Computer Proficient, Experience in school administration", bn: "স্নাতক ও কম্পিউটারে দক্ষ, বিদ্যালয় প্রশাসনে অভিজ্ঞতা" }} />
                                </li>
                            </ul>
                        </div>

                        <p style={{ marginTop: '1.5rem', color: 'var(--muted)' }}>
                            <em><LocalizedText text={{ en: "Note: T&C / Salary negotiable", bn: "দ্রষ্টব্য: শর্তাবলী / বেতন আলোচনাসাপেক্ষ" }} /></em>
                        </p>

                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.6)', borderRadius: '16px' }}>
                            <p style={{ marginBottom: '8px' }}>
                                <strong><LocalizedText text={{ en: "Location:", bn: "অবস্থান:" }} /></strong> Humaniapota, PS - Gangnapur
                            </p>
                            <p style={{ marginBottom: '8px' }}>
                                <strong><LocalizedText text={{ en: "Contact:", bn: "যোগাযোগ:" }} /></strong> 9830384958 / 9382738446 / 8756339237
                            </p>
                            <p>
                                <strong><LocalizedText text={{ en: "Email:", bn: "ইমেইল:" }} /></strong> {siteMeta.foundationEmail}
                            </p>
                        </div>

                        <a className="btn btn--accent" href={`mailto:${siteMeta.foundationEmail}`} style={{ width: 'fit-content', marginTop: '1rem' }}>
                            <LocalizedText text={{ en: "Apply Now", bn: "এখনই আবেদন করুন" }} />
                        </a>
                    </div>

                    <div className="feature-panel__image-wrap" style={{ borderRadius: '28px', overflow: 'hidden', height: '100%', minHeight: '500px' }}>
                        <Image
                            alt="Hiring Banner"
                            src="/media/Hiring/hiring.jpg"
                            width={800}
                            height={1000}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
