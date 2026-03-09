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
        </>
    );
}
