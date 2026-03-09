"use client";

import Image from "next/image";
import Link from "next/link";

import { LocalizedText } from "@/components/language-provider";
import { navigation, siteMeta } from "@/data/site-content";

const footerAddressLabel = {
  en: "Address",
  bn: "ঠিকানা",
};

const footerContactLabel = {
  en: "Contact Us",
  bn: "যোগাযোগ",
};

const footerFoundationLabel = {
  en: "Foundation",
  bn: "ফাউন্ডেশন",
};

const footerLinksLabel = {
  en: "Quick Links",
  bn: "দ্রুত লিংক",
};

const footerCopyright = {
  en: `Copyright © 2025 ${siteMeta.foundation}`,
  bn: `কপিরাইট © ২০২৫ ${siteMeta.foundation}`,
};

const footerSummary = {
  en: "Official school information, admissions guidance, and public notices for families.",
  bn: "পরিবারের জন্য বিদ্যালয়ের অফিসিয়াল তথ্য, ভর্তি-সংক্রান্ত দিকনির্দেশনা এবং জনসাধারণের নোটিশ।",
};

const footerContactAction = {
  en: "Write to School",
  bn: "স্কুলে লিখুন",
};

const footerContactPage = {
  en: "Contact Page",
  bn: "যোগাযোগ পৃষ্ঠা",
};

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__panel">
        <div className="site-footer__lead">
          <div className="site-footer__brand">
            <Image
              alt={`${siteMeta.shortName} logo`}
              className="site-footer__logo"
              height={120}
              src="/media/logo.jpg"
              width={120}
            />
            <div className="site-footer__brand-copy">
              <LocalizedText as="p" className="eyebrow" text={siteMeta.name} />
              <LocalizedText as="h2" text={siteMeta.name} />
              <LocalizedText as="p" text={footerSummary} />
            </div>
          </div>

          <div className="site-footer__cta">
            <a className="btn btn--ghost" href={`mailto:${siteMeta.schoolEmail}`}>
              <LocalizedText text={footerContactAction} />
            </a>
            <Link className="btn btn--accent" href="/contact">
              <LocalizedText text={footerContactPage} />
            </Link>
          </div>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__block">
            <LocalizedText as="p" className="eyebrow" text={footerAddressLabel} />
            <LocalizedText as="p" text={siteMeta.address} />
          </div>

          <div className="site-footer__block">
            <LocalizedText as="p" className="eyebrow" text={footerContactLabel} />
            <p style={{ marginBottom: "1.5rem" }}>
              <a href={`mailto:${siteMeta.schoolEmail}`}>{siteMeta.schoolEmail}</a>
            </p>
            <LocalizedText as="p" className="eyebrow" text={footerFoundationLabel} />
            <p className="stack" style={{ gap: "0.5rem" }}>
              <a href={siteMeta.foundationUrl} rel="noreferrer" target="_blank">
                {siteMeta.foundation}
              </a>
              <a href="tel:+918756339237">+91-8756339237</a>
              <a href="mailto:contact@ngbmfoundation.com">contact@ngbmfoundation.com</a>
            </p>
          </div>

          <div className="site-footer__block">
            <LocalizedText as="p" className="eyebrow" text={footerLinksLabel} />
            <div className="site-footer__links">
              {(navigation.flatMap((item) =>
                item.children ? item.children : item.href ? [{ href: item.href, label: item.label }] : []
              ) as { href: string; label: { en: string; bn: string } }[]).map((item) => (
                <Link href={item.href as never} key={item.label.en}>
                  <LocalizedText text={item.label} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer__meta">
          <a href={siteMeta.foundationUrl} rel="noreferrer" target="_blank">
            <LocalizedText text={footerCopyright} />
          </a>
          <span>{siteMeta.schoolEmail}</span>
        </div>
      </div>
    </footer>
  );
}
