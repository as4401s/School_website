import type { BilingualText } from "@/data/site-content";
import { LocalizedText } from "@/components/language-provider";

type PageIntroProps = {
  eyebrow: BilingualText;
  title: BilingualText;
  summary: BilingualText;
};

export function PageIntro({ eyebrow, title, summary }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="shell page-intro__inner">
        <LocalizedText as="p" className="eyebrow" text={eyebrow} />
        <LocalizedText as="h1" text={title} />
        <LocalizedText as="p" className="lede" text={summary} />
      </div>
    </section>
  );
}
