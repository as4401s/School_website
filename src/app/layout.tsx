import type { Metadata } from "next";
import localFont from "next/font/local";

import { LanguageProvider } from "@/components/language-provider";
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

export const metadata: Metadata = {
  title: `${siteMeta.shortName} | KM School`,
  description:
    "KM School official website with school information, events, admissions, learning tools, and contact details.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <LanguageProvider>
          <div className="site-backdrop" />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
