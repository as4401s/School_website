"use client";

import { LocalizedText } from "@/components/language-provider";

type StaffAccessCardProps = {
  nextHref?: string;
};

export function StaffAccessCard({
  nextHref = "/admin/",
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
          text={{ en: "School content access", bn: "বিদ্যালয়ের কনটেন্ট অ্যাক্সেস" }}
        />
        <LocalizedText
          as="p"
          text={{
            en: "Authorised staff can sign in with GitHub and update news, notices, documents, and gallery images without editing code.",
            bn: "অনুমোদিত কর্মীরা GitHub দিয়ে সাইন ইন করে কোড ছাড়াই সংবাদ, নোটিশ, নথি ও গ্যালারির ছবি আপডেট করতে পারবেন।",
          }}
        />
      </div>

      <div className="chip-row">
        <LocalizedText as="span" className="chip" text={{ en: "News", bn: "সংবাদ" }} />
        <LocalizedText as="span" className="chip" text={{ en: "Results", bn: "ফলাফল" }} />
        <LocalizedText as="span" className="chip" text={{ en: "Documents", bn: "নথি" }} />
        <LocalizedText as="span" className="chip" text={{ en: "Gallery", bn: "গ্যালারি" }} />
      </div>

      <div className="login-form__actions">
        <a className="btn btn--accent" href={nextHref}>
          <LocalizedText text={{ en: "Open Staff CMS", bn: "স্টাফ সিএমএস খুলুন" }} />
        </a>
        <a className="btn btn--ghost" href="https://github.com/signup" rel="noreferrer" target="_blank">
          <LocalizedText text={{ en: "Create GitHub Account", bn: "GitHub অ্যাকাউন্ট তৈরি করুন" }} />
        </a>
      </div>

      <LocalizedText
        as="p"
        className="helper-text"
        text={{
          en: "You control the repository and deployment. Other staff only need GitHub access to the content editor.",
          bn: "রিপোজিটরি ও ডিপ্লয়মেন্ট আপনার নিয়ন্ত্রণে থাকবে। অন্য কর্মীদের জন্য শুধু কনটেন্ট এডিটরে GitHub প্রবেশাধিকারই যথেষ্ট।",
        }}
      />
    </div>
  );
}
