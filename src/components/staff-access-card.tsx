"use client";

import { LocalizedText } from "@/components/language-provider";

type StaffAccessCardProps = {
  nextHref?: string;
};

export function StaffAccessCard({
  nextHref = "/cms",
}: StaffAccessCardProps) {
  return (
    <div className="login-card stack">
      <div className="login-card__header">
        <LocalizedText
          as="p"
          className="eyebrow"
          text={{ en: "Staff CMS", bn: "স্টাফ সিএমএস" }}
        />
        <LocalizedText
          as="h2"
          text={{ en: "School content access", bn: "বিদ্যালয়ের কনটেন্টে প্রবেশ" }}
        />
        <LocalizedText
          as="p"
          text={{
            en: "Authorised staff can update news, notices, documents, and gallery images through the content editor.",
            bn: "অনুমোদিত কর্মীরা কনটেন্ট এডিটরের মাধ্যমে সংবাদ, নোটিশ, নথি ও গ্যালারির ছবি হালনাগাদ করতে পারবেন।",
          }}
        />
      </div>

      <div className="chip-row">
        <LocalizedText as="span" className="chip" text={{ en: "News", bn: "সংবাদ" }} />
        <LocalizedText as="span" className="chip" text={{ en: "Announcements", bn: "বিজ্ঞপ্তি" }} />
        <LocalizedText as="span" className="chip" text={{ en: "Documents", bn: "নথি" }} />
        <LocalizedText as="span" className="chip" text={{ en: "Gallery", bn: "গ্যালারি" }} />
      </div>

      <div className="login-form__actions">
        <a className="btn btn--accent" href={nextHref}>
          <LocalizedText text={{ en: "Open Staff CMS", bn: "স্টাফ সিএমএস খুলুন" }} />
        </a>
      </div>

      <LocalizedText
        as="p"
        className="helper-text"
        text={{
          en: "Contact the school administrator if you need access.",
          bn: "প্রবেশাধিকার প্রয়োজন হলে বিদ্যালয়ের প্রশাসকের সঙ্গে যোগাযোগ করুন।",
        }}
      />
    </div>
  );
}
