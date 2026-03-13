"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setOpen(false);
      setExpandedDropdown(null);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [open]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1121px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpen(false);
        setExpandedDropdown(null);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <header className={cn("site-header", open && "site-header--menu-open")}>
      <button
        aria-hidden={!open}
        className={cn("site-nav-backdrop", open && "site-nav-backdrop--visible")}
        onClick={() => setOpen(false)}
        tabIndex={open ? 0 : -1}
        type="button"
      />

      <div className="shell site-header__inner">
        <Link className="brand-mark" href="/" onClick={() => setOpen(false)}>
          <Image
            alt={`${siteMeta.shortName} logo`}
            className="brand-mark__logo"
            height={64}
            src="/media/logo.jpg"
            width={64}
          />
          <span className="brand-mark__copy">
            <strong>{siteMeta.shortName}</strong>
            <LocalizedText as="span" text={siteMeta.name} />
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className={cn("site-nav", open && "site-nav--open")}
        >
          <div className="site-nav__panel-head">
            <LocalizedText
              as="p"
              className="eyebrow"
              text={{ en: "Explore", bn: "এক নজরে" }}
            />
            <LocalizedText
              as="p"
              className="site-nav__panel-title"
              text={{ en: "Navigate KMS", bn: "কেএমএস ঘুরে দেখুন" }}
            />
          </div>

          <div className="site-nav__list">
            {navigation.map((item) => {
              const itemActive =
                item.href &&
                (item.href === "/"
                  ? pathname === item.href
                  : pathname?.startsWith(item.href as string));
              const childActive = item.children?.some((child) =>
                pathname?.startsWith(child.href),
              );
              const active = Boolean(itemActive || childActive);
              const submenuOpen = expandedDropdown === item.label.en;

              if (item.children) {
                return (
                  <div
                    className={cn(
                      "site-nav__dropdown",
                      submenuOpen && "site-nav__dropdown--open",
                    )}
                    key={item.label.en}
                  >
                    <div className="site-nav__dropdown-row">
                      {item.href ? (
                        <Link
                          className={cn(
                            "site-nav__link site-nav__dropdown-link",
                            active && "site-nav__link--active",
                          )}
                          href={item.href as NonNullable<typeof item.href>}
                          onClick={() => setOpen(false)}
                        >
                          <LocalizedText text={item.label} />
                          <svg
                            className="site-nav__dropdown-caret"
                            fill="none"
                            height="12"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="12"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </Link>
                      ) : (
                        <span
                          className={cn(
                            "site-nav__link site-nav__dropdown-link site-nav__dropdown-label",
                            active && "site-nav__link--active",
                          )}
                        >
                          <LocalizedText text={item.label} />
                          <svg
                            className="site-nav__dropdown-caret"
                            fill="none"
                            height="12"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="12"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      )}

                      <button
                        aria-expanded={submenuOpen}
                        aria-label={language === "bn" ? "সাবমেনু খুলুন" : "Toggle submenu"}
                        className="site-nav__submenu-button"
                        onClick={() =>
                          setExpandedDropdown((value) =>
                            value === item.label.en ? null : item.label.en,
                          )
                        }
                        type="button"
                      >
                        <svg
                          fill="none"
                          height="16"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="16"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    </div>

                    <div
                      className={cn(
                        "site-nav__dropdown-menu",
                        submenuOpen && "site-nav__dropdown-menu--open",
                      )}
                    >
                      {item.children.map((child) => (
                        <Link
                          className="site-nav__link"
                          href={child.href as NonNullable<typeof child.href>}
                          key={child.href}
                          onClick={() => setOpen(false)}
                        >
                          <LocalizedText text={child.label} />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  className={cn("site-nav__link", active && "site-nav__link--active")}
                  href={item.href as NonNullable<typeof item.href>}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  <LocalizedText text={item.label} />
                </Link>
              );
            })}
          </div>

          <div className="site-nav__mobile-actions">
            <div className="site-nav__mobile-language">
              <LanguageToggle />
            </div>
            <Link className="btn btn--accent" href="/login" onClick={() => setOpen(false)}>
              <LocalizedText text={{ en: "Staff CMS", bn: "স্টাফ সিএমএস" }} />
            </Link>
            <Link className="btn btn--ghost" href="/contact" onClick={() => setOpen(false)}>
              <LocalizedText
                text={{ en: "Contact School", bn: "বিদ্যালয়ের সঙ্গে যোগাযোগ" }}
              />
            </Link>
          </div>
        </nav>

        <div className="site-header__actions">
          <LanguageToggle />
          <Link className="btn btn--accent site-header__staff-link" href="/login">
            <LocalizedText text={{ en: "Staff CMS", bn: "স্টাফ সিএমএস" }} />
          </Link>
          <button
            aria-expanded={open}
            aria-label={language === "bn" ? "মেনু খুলুন" : "Toggle menu"}
            className={cn("menu-button", open && "menu-button--open")}
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <span className="menu-button__label">
              <LocalizedText
                text={
                  open
                    ? { en: "Close", bn: "বন্ধ করুন" }
                    : { en: "Menu", bn: "মেনু" }
                }
              />
            </span>
            <span aria-hidden="true" className="menu-button__icon">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
