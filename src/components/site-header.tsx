"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  LanguageToggle,
  LocalizedText,
  useLanguage,
} from "@/components/language-provider";
import { navigation, siteMeta } from "@/data/site-content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="brand-mark" href="/" onClick={() => setOpen(false)}>
          <Image
            alt={`${siteMeta.shortName} logo`}
            className="brand-mark__logo"
            height={64}
            src="/media/logo.png"
            width={64}
          />
          <span className="brand-mark__copy">
            <strong>{siteMeta.shortName}</strong>
            <LocalizedText as="span" text={siteMeta.name} />
          </span>
        </Link>

        <button
          aria-expanded={open}
          aria-label={language === "bn" ? "মেনু খুলুন" : "Toggle menu"}
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <LocalizedText
            text={
              open
                ? { en: "Close", bn: "বন্ধ করুন" }
                : { en: "Menu", bn: "মেনু" }
            }
          />
        </button>

        <nav
          aria-label="Primary"
          className={cn("site-nav", open && "site-nav--open")}
        >
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === item.href
                : pathname?.startsWith(item.href);

            return (
              <Link
                className={cn("site-nav__link", active && "site-nav__link--active")}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                <LocalizedText text={item.label} />
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <LanguageToggle />
          <Link className="btn btn--ghost" href="/login">
            <LocalizedText text={{ en: "Staff CMS", bn: "স্টাফ সিএমএস" }} />
          </Link>
        </div>
      </div>
    </header>
  );
}
