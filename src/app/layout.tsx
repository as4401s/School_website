import type { Metadata } from "next";
import localFont from "next/font/local";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LanguageProvider } from "@/components/language-provider";
import { MobileBottomMascot } from "@/components/mobile-bottom-mascot";
import { PageMotion } from "@/components/page-motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteMeta } from "@/data/site-content";

import "./globals.css";

const displayFont = localFont({
  src: [
    {
      path: "./fonts/alfabet-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/alfabet-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
});

const bodyFont = localFont({
  src: [
    {
      path: "./fonts/helvetica-roman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/helvetica-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
});

const bengaliFont = localFont({
  src: [
    {
      path: "./fonts/noto-sans-bengali-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/noto-sans-bengali-semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/noto-sans-bengali-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: `${siteMeta.shortName} | Krishnarati Montessori School`,
  description:
    "KMS official website with school information, events, admissions, and contact details.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${bengaliFont.variable}`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <PageMotion />
          <div className="site-backdrop" />
          <SiteHeader />
          <main>{children}</main>
          <MobileBottomMascot />
          <SiteFooter />
          <Analytics />
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  );
}
