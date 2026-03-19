export type TopicIllustrationKind =
  | "application"
  | "contact"
  | "gallery"
  | "media"
  | "montessori"
  | "news"
  | "results"
  | "school"
  | "vision";

type TopicIllustrationProps = {
  kind: TopicIllustrationKind;
  size?: "sm" | "md";
  className?: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function renderIllustration(kind: TopicIllustrationKind) {
  switch (kind) {
    case "application":
      return (
        <svg viewBox="0 0 160 120">
          <rect x="28" y="16" width="82" height="90" rx="18" fill="#fff9f0" stroke="#2d3e50" strokeWidth="4" />
          <rect x="46" y="8" width="46" height="20" rx="10" fill="#ffd45f" stroke="#2d3e50" strokeWidth="4" />
          <path d="M48 44h42M48 58h42M48 72h30" stroke="#2d3e50" strokeLinecap="round" strokeWidth="4" />
          <path d="M114 70 132 34l12 12-36 18 6-14Z" fill="#ff8fb0" stroke="#2d3e50" strokeLinejoin="round" strokeWidth="4" />
          <circle cx="124" cy="90" r="16" fill="#67c8f0" stroke="#2d3e50" strokeWidth="4" />
          <path d="M117 90h14M124 83v14" stroke="#2d3e50" strokeLinecap="round" strokeWidth="4" />
        </svg>
      );
    case "contact":
      return (
        <svg viewBox="0 0 160 120">
          <rect x="22" y="24" width="76" height="62" rx="18" fill="#fff9f0" stroke="#2d3e50" strokeWidth="4" />
          <path d="m34 40 26 18 26-18" fill="none" stroke="#2d3e50" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <circle cx="118" cy="60" r="26" fill="#67c8f0" stroke="#2d3e50" strokeWidth="4" />
          <path d="M110 52c4-6 14-6 18 0 2 3 2 7 0 10l-10 12-10-12c-2-3-2-7 0-10Z" fill="#ff8a7f" stroke="#2d3e50" strokeWidth="4" />
          <circle cx="118" cy="58" r="5" fill="#fff9f0" stroke="#2d3e50" strokeWidth="3" />
        </svg>
      );
    case "gallery":
      return (
        <svg viewBox="0 0 160 120">
          <rect x="20" y="18" width="120" height="84" rx="22" fill="#fff9f0" stroke="#2d3e50" strokeWidth="4" />
          <circle cx="52" cy="42" r="10" fill="#ffd45f" stroke="#2d3e50" strokeWidth="4" />
          <path d="M36 82 62 58l18 16 16-12 28 20H36Z" fill="#72b84e" stroke="#2d3e50" strokeLinejoin="round" strokeWidth="4" />
          <path d="M98 46c8 0 16 6 18 14" fill="none" stroke="#ff8fb0" strokeLinecap="round" strokeWidth="4" />
          <circle cx="124" cy="32" r="12" fill="#67c8f0" stroke="#2d3e50" strokeWidth="4" />
        </svg>
      );
    case "media":
      return (
        <svg viewBox="0 0 160 120">
          <rect x="22" y="20" width="56" height="78" rx="16" fill="#fff9f0" stroke="#2d3e50" strokeWidth="4" />
          <path d="M36 42h28M36 56h28M36 70h18" stroke="#2d3e50" strokeLinecap="round" strokeWidth="4" />
          <rect x="88" y="34" width="50" height="40" rx="14" fill="#67c8f0" stroke="#2d3e50" strokeWidth="4" />
          <path d="M98 68 112 54l10 10 8-6 8 10H98Z" fill="#72b84e" stroke="#2d3e50" strokeLinejoin="round" strokeWidth="4" />
          <circle cx="126" cy="28" r="12" fill="#ffd45f" stroke="#2d3e50" strokeWidth="4" />
        </svg>
      );
    case "montessori":
      return (
        <svg viewBox="0 0 160 120">
          <rect x="20" y="46" width="34" height="46" rx="10" fill="#ff8a7f" stroke="#2d3e50" strokeWidth="4" />
          <rect x="56" y="34" width="34" height="58" rx="10" fill="#ffd45f" stroke="#2d3e50" strokeWidth="4" />
          <rect x="92" y="22" width="34" height="70" rx="10" fill="#67c8f0" stroke="#2d3e50" strokeWidth="4" />
          <circle cx="132" cy="34" r="14" fill="#fff9f0" stroke="#2d3e50" strokeWidth="4" />
          <path d="M132 22v24M120 34h24" stroke="#2d3e50" strokeLinecap="round" strokeWidth="4" />
        </svg>
      );
    case "news":
      return (
        <svg viewBox="0 0 160 120">
          <rect x="24" y="18" width="88" height="84" rx="20" fill="#fff9f0" stroke="#2d3e50" strokeWidth="4" />
          <rect x="40" y="34" width="24" height="24" rx="8" fill="#ff8fb0" stroke="#2d3e50" strokeWidth="4" />
          <path d="M74 38h24M74 50h24M40 72h58M40 84h44" stroke="#2d3e50" strokeLinecap="round" strokeWidth="4" />
          <circle cx="126" cy="50" r="18" fill="#ffd45f" stroke="#2d3e50" strokeWidth="4" />
          <path d="m118 50 6 6 10-12" fill="none" stroke="#2d3e50" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </svg>
      );
    case "results":
      return (
        <svg viewBox="0 0 160 120">
          <path d="M80 18 94 46h32L100 64l10 30-30-18-30 18 10-30-26-18h32L80 18Z" fill="#ffd45f" stroke="#2d3e50" strokeLinejoin="round" strokeWidth="4" />
          <rect x="106" y="60" width="32" height="34" rx="10" fill="#fff9f0" stroke="#2d3e50" strokeWidth="4" />
          <path d="M114 74h16M114 84h10" stroke="#2d3e50" strokeLinecap="round" strokeWidth="4" />
          <circle cx="30" cy="78" r="16" fill="#67c8f0" stroke="#2d3e50" strokeWidth="4" />
          <path d="M22 78h16M30 70v16" stroke="#2d3e50" strokeLinecap="round" strokeWidth="4" />
        </svg>
      );
    case "vision":
      return (
        <svg viewBox="0 0 160 120">
          <path d="M36 80c8-18 26-30 46-30 18 0 34 9 44 24" fill="none" stroke="#67c8f0" strokeLinecap="round" strokeWidth="10" />
          <path d="M40 82c9-14 23-22 40-22 15 0 28 6 38 18" fill="none" stroke="#ffd45f" strokeLinecap="round" strokeWidth="10" />
          <path d="M46 84c8-10 19-16 33-16 11 0 22 4 30 12" fill="none" stroke="#ff8fb0" strokeLinecap="round" strokeWidth="10" />
          <circle cx="122" cy="30" r="14" fill="#fff9f0" stroke="#2d3e50" strokeWidth="4" />
          <path d="M122 18v24M110 30h24" stroke="#2d3e50" strokeLinecap="round" strokeWidth="4" />
        </svg>
      );
    case "school":
    default:
      return (
        <svg viewBox="0 0 160 120">
          <path d="M24 58 80 20l56 38" fill="#ff8fb0" stroke="#2d3e50" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M40 52h80v46H40z" fill="#fff9f0" stroke="#2d3e50" strokeWidth="4" />
          <path d="M68 98V70h24v28" fill="#67c8f0" stroke="#2d3e50" strokeWidth="4" />
          <rect x="50" y="62" width="12" height="12" rx="3" fill="#ffd45f" stroke="#2d3e50" strokeWidth="3" />
          <rect x="98" y="62" width="12" height="12" rx="3" fill="#ffd45f" stroke="#2d3e50" strokeWidth="3" />
          <circle cx="128" cy="34" r="12" fill="#72b84e" stroke="#2d3e50" strokeWidth="4" />
        </svg>
      );
  }
}

export function TopicIllustration({
  kind,
  size = "sm",
  className,
}: TopicIllustrationProps) {
  return (
    <span
      aria-hidden="true"
      className={joinClasses("topic-illustration", `topic-illustration--${size}`, className)}
      data-kind={kind}
    >
      {renderIllustration(kind)}
    </span>
  );
}
