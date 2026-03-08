"use client";

import { createContext, useContext, useEffect, useState, type ElementType } from "react";

import type { BilingualText, Language } from "@/data/site-content";
import { cn } from "@/lib/utils";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    const saved = window.localStorage.getItem("kms-language");
    return saved === "bn" ? "bn" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem("kms-language", language);
    document.documentElement.lang = language === "bn" ? "bn" : "en";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);

  if (!value) {
    throw new Error("useLanguage must be used inside LanguageProvider.");
  }

  return value;
}

export function LocalizedText<TTag extends ElementType = "span">({
  as,
  className,
  text,
}: {
  as?: TTag;
  className?: string;
  text: BilingualText;
}) {
  const { language } = useLanguage();
  const Component = (as || "span") as ElementType;

  return <Component className={className}>{text[language]}</Component>;
}

export function LocalizedDate({
  className,
  value,
}: {
  className?: string;
  value: string;
}) {
  const { language } = useLanguage();

  return (
    <span className={className}>
      {new Intl.DateTimeFormat(language === "bn" ? "bn-BD" : "en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(value))}
    </span>
  );
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-toggle" role="group" aria-label="Language switcher">
      <button
        className={cn("language-toggle__button", language === "en" && "language-toggle__button--active")}
        onClick={() => setLanguage("en")}
        type="button"
      >
        English
      </button>
      <button
        className={cn("language-toggle__button", language === "bn" && "language-toggle__button--active")}
        onClick={() => setLanguage("bn")}
        type="button"
      >
        বাংলা
      </button>
    </div>
  );
}
