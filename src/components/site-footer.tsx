"use client";

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

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div className="site-footer__block">
          <LocalizedText as="p" className="eyebrow" text={footerAddressLabel} />
          <LocalizedText as="p" text={siteMeta.address} />
        </div>

        <div className="site-footer__block">
          <LocalizedText as="p" className="eyebrow" text={footerContactLabel} />
          <p>
            <a href={`mailto:${siteMeta.schoolEmail}`}>{siteMeta.schoolEmail}</a>
          </p>
          <LocalizedText as="p" className="eyebrow" text={footerFoundationLabel} />
          <p>
            <a href={siteMeta.foundationUrl} rel="noreferrer" target="_blank">
              {siteMeta.foundation}
            </a>
          </p>
        </div>

        <div className="site-footer__block">
          <LocalizedText as="p" className="eyebrow" text={footerLinksLabel} />
          <div className="site-footer__links">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                <LocalizedText text={item.label} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="shell site-footer__meta">
        <a href={siteMeta.foundationUrl} rel="noreferrer" target="_blank">
          <LocalizedText text={footerCopyright} />
        </a>
        <span>{siteMeta.schoolEmail}</span>
      </div>
    </footer>
  );
}
