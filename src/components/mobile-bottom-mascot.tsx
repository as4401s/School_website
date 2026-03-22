"use client";

import { usePathname } from "next/navigation";

import { AcademicCatMascot } from "@/components/academic-cat-mascot";

const mascotVariants = [
  {
    matches: (pathname: string) => pathname === "/",
    variant: "feature" as const,
  },
  {
    matches: (pathname: string) => pathname.startsWith("/academics"),
    variant: "reader" as const,
  },
  {
    matches: (pathname: string) => pathname.startsWith("/admissions"),
    variant: "admissions" as const,
  },
  {
    matches: (pathname: string) => pathname.startsWith("/contact"),
    variant: "contact" as const,
  },
  {
    matches: (pathname: string) => pathname.startsWith("/careers"),
    variant: "careers" as const,
  },
];

export function MobileBottomMascot() {
  const pathname = usePathname();
  const matched = pathname
    ? mascotVariants.find((item) => item.matches(pathname))
    : undefined;

  if (!matched) {
    return null;
  }

  return (
    <div aria-hidden="true" className="mobile-bottom-mascot">
      <div className="shell mobile-bottom-mascot__shell">
        <AcademicCatMascot
          className="mobile-bottom-mascot__figure"
          variant={matched.variant}
        />
      </div>
    </div>
  );
}
