export type AnimatedCharacterKind =
  | "book"
  | "cloud"
  | "globe"
  | "pencil"
  | "rocket"
  | "star";

type AnimatedCharacterProps = {
  kind: AnimatedCharacterKind;
  size?: "sm" | "md" | "lg";
  className?: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function renderCharacter(kind: AnimatedCharacterKind) {
  switch (kind) {
    case "book":
      return (
        <svg viewBox="0 0 120 120">
          <path
            d="M24 30c0-8 6-14 14-14h22v62H38c-8 0-14-6-14-14V30Z"
            fill="#fff8ee"
            stroke="#2d3e50"
            strokeWidth="4"
          />
          <path
            d="M60 16h22c8 0 14 6 14 14v34c0 8-6 14-14 14H60V16Z"
            fill="#fff8ee"
            stroke="#2d3e50"
            strokeWidth="4"
          />
          <path d="M60 16v62" stroke="#2d3e50" strokeWidth="4" />
          <path
            d="M28 28c0-4.4 3.6-8 8-8h20v54H36c-4.4 0-8-3.6-8-8V28Z"
            fill="#41c1b8"
          />
          <path
            d="M64 20h20c4.4 0 8 3.6 8 8v38c0 4.4-3.6 8-8 8H64V20Z"
            fill="#ff8a7f"
          />
          <circle cx="52" cy="50" r="3.4" fill="#2d3e50" />
          <circle cx="68" cy="50" r="3.4" fill="#2d3e50" />
          <path
            d="M52 60c2.3 3.4 13.7 3.4 16 0"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="3.4"
          />
          <circle cx="45" cy="58" r="3.5" fill="#ffb7c6" />
          <circle cx="75" cy="58" r="3.5" fill="#ffb7c6" />
          <path
            className="animated-character__arm animated-character__arm--left"
            d="M28 52c-9 0-14 3-18 10"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="animated-character__arm animated-character__arm--right"
            d="M92 52c9 0 14 3 18 10"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="animated-character__leg animated-character__leg--left"
            d="M48 80v14"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="animated-character__leg animated-character__leg--right"
            d="M72 80v14"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 120 120">
          <path
            d="M31 74h50c15 0 27-9 27-21 0-11-9-19-21-20-2-13-13-22-27-22-16 0-29 11-31 25-10 1-19 9-19 19 0 11 9 19 21 19Z"
            fill="#fefefe"
            stroke="#2d3e50"
            strokeWidth="4"
          />
          <circle cx="48" cy="51" r="3.4" fill="#2d3e50" />
          <circle cx="69" cy="51" r="3.4" fill="#2d3e50" />
          <path
            d="M48 61c3 3.6 18 3.6 21 0"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="3.4"
          />
          <circle cx="41" cy="59" r="3.5" fill="#ffb7c6" />
          <circle cx="76" cy="59" r="3.5" fill="#ffb7c6" />
          <path
            className="animated-character__arm animated-character__arm--left"
            d="M28 56c-8 2-12 7-14 12"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="animated-character__arm animated-character__arm--right"
            d="M92 56c8 2 12 7 14 12"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="animated-character__leg animated-character__leg--left"
            d="M50 74v13"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="animated-character__leg animated-character__leg--right"
            d="M69 74v13"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="48" r="28" fill="#67c8f0" stroke="#2d3e50" strokeWidth="4" />
          <path
            d="M46 29c-5 5-8 11-8 18 4 2 7 4 8 8 5 0 8-3 11-8 0-4-1-7-5-10 1-3-1-6-6-8Z"
            fill="#72b84e"
          />
          <path
            d="M69 31c5 1 9 4 11 8-3 4-2 8 1 11 5 0 8 3 9 8-4 7-10 12-18 15-5-3-9-8-10-14 2-4 3-7 0-11 2-7 4-13 7-17Z"
            fill="#72b84e"
          />
          <circle cx="53" cy="47" r="3.4" fill="#2d3e50" />
          <circle cx="68" cy="47" r="3.4" fill="#2d3e50" />
          <path
            d="M53 57c2.2 3 12.8 3 15 0"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="3.4"
          />
          <circle cx="46" cy="55" r="3.5" fill="#ffb7c6" />
          <circle cx="75" cy="55" r="3.5" fill="#ffb7c6" />
          <path d="M60 76v10" stroke="#2d3e50" strokeLinecap="round" strokeWidth="4" />
          <path
            d="M44 90h32"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="animated-character__arm animated-character__arm--left"
            d="M34 50c-9 2-13 6-15 12"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="animated-character__arm animated-character__arm--right"
            d="M86 50c9 2 13 6 15 12"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
        </svg>
      );
    case "pencil":
      return (
        <svg viewBox="0 0 120 120">
          <path
            d="M42 18h36l8 11v55H34V29l8-11Z"
            fill="#ffd45f"
            stroke="#2d3e50"
            strokeWidth="4"
          />
          <path d="M42 18h36l-6 11H48l-6-11Z" fill="#ff8fb0" stroke="#2d3e50" strokeWidth="4" />
          <path d="M34 84h52l-26 20-26-20Z" fill="#f6d1a5" stroke="#2d3e50" strokeWidth="4" />
          <path d="M48 92h24l-12 9-12-9Z" fill="#2d3e50" />
          <path d="M60 29v55" stroke="#f5b827" strokeWidth="3" />
          <circle cx="51" cy="49" r="3.4" fill="#2d3e50" />
          <circle cx="69" cy="49" r="3.4" fill="#2d3e50" />
          <path
            d="M51 59c2.4 3.4 15.6 3.4 18 0"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="3.4"
          />
          <circle cx="44" cy="57" r="3.5" fill="#ffb7c6" />
          <circle cx="76" cy="57" r="3.5" fill="#ffb7c6" />
          <path
            className="animated-character__arm animated-character__arm--left"
            d="M34 54c-9 0-14 4-18 10"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="animated-character__arm animated-character__arm--right"
            d="M86 54c9 0 14 4 18 10"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
        </svg>
      );
    case "rocket":
      return (
        <svg viewBox="0 0 120 120">
          <path
            d="M60 16c16 10 28 30 28 49 0 17-12 33-28 33S32 82 32 65c0-19 12-39 28-49Z"
            fill="#fff8ee"
            stroke="#2d3e50"
            strokeWidth="4"
          />
          <path d="M60 16c8 6 15 16 19 27H41c4-11 11-21 19-27Z" fill="#ff7f79" />
          <circle cx="60" cy="52" r="11" fill="#67c8f0" stroke="#2d3e50" strokeWidth="4" />
          <circle cx="56" cy="51" r="2.6" fill="#2d3e50" />
          <circle cx="64" cy="51" r="2.6" fill="#2d3e50" />
          <path
            d="M55 58c1.4 2.1 8.6 2.1 10 0"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <path d="M32 68 20 80l18 4 6-14Z" fill="#41c1b8" stroke="#2d3e50" strokeWidth="4" />
          <path d="m88 68 12 12-18 4-6-14Z" fill="#41c1b8" stroke="#2d3e50" strokeWidth="4" />
          <path d="M48 87 40 101h14l6-10Z" fill="#ffd45f" stroke="#2d3e50" strokeWidth="4" />
          <path d="M72 87l8 14H66l-6-10Z" fill="#ffd45f" stroke="#2d3e50" strokeWidth="4" />
          <path
            className="animated-character__flame"
            d="M60 96c8 7 9 16 0 24-9-8-8-17 0-24Z"
            fill="#ff8a41"
          />
        </svg>
      );
    case "star":
    default:
      return (
        <svg viewBox="0 0 120 120">
          <path
            d="m60 14 13 27 30 4-22 21 6 30-27-15-27 15 6-30-22-21 30-4 13-27Z"
            fill="#ffd45f"
            stroke="#2d3e50"
            strokeLinejoin="round"
            strokeWidth="4"
          />
          <circle cx="50" cy="54" r="3.6" fill="#2d3e50" />
          <circle cx="70" cy="54" r="3.6" fill="#2d3e50" />
          <path
            d="M50 65c3 3.6 17 3.6 20 0"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="3.4"
          />
          <circle cx="43" cy="63" r="3.8" fill="#ffb7c6" />
          <circle cx="77" cy="63" r="3.8" fill="#ffb7c6" />
          <path
            className="animated-character__arm animated-character__arm--left"
            d="M39 58c-8 0-14 3-17 9"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="animated-character__arm animated-character__arm--right"
            d="M81 58c8 0 14 3 17 9"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="animated-character__leg animated-character__leg--left"
            d="M52 81v13"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="animated-character__leg animated-character__leg--right"
            d="M68 81v13"
            fill="none"
            stroke="#2d3e50"
            strokeLinecap="round"
            strokeWidth="4"
          />
        </svg>
      );
  }
}

export function AnimatedCharacter({
  kind,
  size = "md",
  className,
}: AnimatedCharacterProps) {
  return (
    <span
      aria-hidden="true"
      className={joinClasses("animated-character", `animated-character--${size}`, className)}
      data-kind={kind}
    >
      {renderCharacter(kind)}
      <span className="animated-character__spark animated-character__spark--one" />
      <span className="animated-character__spark animated-character__spark--two" />
    </span>
  );
}
