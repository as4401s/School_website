import type { Route } from "next";

export type Language = "en" | "bn";

export type BilingualText = {
  en: string;
  bn: string;
};

export type NavigationItem = {
  href?: Route;
  label: BilingualText;
  children?: { href: Route; label: BilingualText }[];
};

export type GalleryItem = {
  id: string;
  title: BilingualText;
  imageUrl: string;
  summary: BilingualText;
  mediaType?: "image" | "video";
};

export type Subject = {
  title: BilingualText;
  description: BilingualText;
  accent: string;
  imageUrl?: string;
};

export type NewsPost = {
  id: string;
  title: BilingualText;
  slug: string;
  excerpt: BilingualText;
  body: BilingualText[];
  imageUrl: string;
  publishedAt: string;
  featured?: boolean;
};

export type ResultNotice = {
  id: string;
  title: BilingualText;
  slug: string;
  summary: BilingualText;
  details: BilingualText[];
  location: BilingualText;
  eventDate?: string;
  status: BilingualText;
};

export type DocumentItem = {
  id: string;
  title: BilingualText;
  category: BilingualText;
  description: BilingualText;
  href?: string;
};

export const siteMeta = {
  name: {
    en: "Krishnarati Montessori School (KMS)",
    bn: "কৃষ্ণরাতি মন্টেসরি স্কুল (কেএমএস)",
  },
  shortName: "KMS",
  foundation: "NGBM Foundation",
  foundationUrl: "https://ngbmfoundation.com/",
  heroTitle: {
    en: "Welcome to KMS",
    bn: "কেএমএস-এ স্বাগতম",
  },
  heroSummary: {
    en: "A warm learning environment focused on safety, joyful classroom life, and everyday growth.",
    bn: "নিরাপত্তা, আনন্দময় শ্রেণিকক্ষের পরিবেশ এবং প্রতিদিনের অগ্রগতিকে গুরুত্ব দিয়ে গড়ে ওঠা একটি স্নেহময় শিক্ষাঙ্গন।",
  },
  safetyMessage: {
    en: "SAFETY FIRST: We're taking extra measures to ensure your children are safe in our school.",
    bn: "সুরক্ষা সবার আগে: আপনার সন্তানের নিরাপত্তা নিশ্চিত করতে আমাদের বিদ্যালয়ে অতিরিক্ত ব্যবস্থা নেওয়া হয়েছে।",
  },
  address: {
    en: "Post & Village - Humaniapota, Thakurbari, PS - Gangnapur, Ranaghat - II, Nadia, Pin - 741238",
    bn: "ডাকঘর ও গ্রাম - হুমানিয়া পোতা, ঠাকুরবাড়ি, থানা - গাংনাপুর, রাণাঘাট - ২, নদীয়া, পিন - ৭৪১২৩৮",
  },
  eventLocation: {
    en: "Post & Village - Humaniapota, Thakurbari, PS - Gangnapur, Ranaghat - II, Nadia, Pin - 741238",
    bn: "ডাকঘর ও গ্রাম - হুমানিয়া পোতা, ঠাকুরবাড়ি, থানা - গাংনাপুর, রাণাঘাট - ২, নদীয়া, পিন - ৭৪১২৩৮",
  },
  schoolPhone: "+91-8756339237",
  schoolEmail: "info@kmschool.co.in",
  foundationEmail: "contact@ngbmfoundation.com",
};

export const navigation: NavigationItem[] = [
  { href: "/", label: { en: "HOME", bn: "হোম" } },
  { href: "/our-school", label: { en: "ABOUT", bn: "আমাদের সম্পর্কে" } },
  { href: "/academics", label: { en: "LEARNING AT KMS", bn: "কেএমএস-এ শেখা" } },
  { href: "/admissions", label: { en: "ADMISSIONS", bn: "ভর্তি" } },
  { href: "/announcements", label: { en: "ANNOUNCEMENTS", bn: "বিজ্ঞপ্তি" } },
  {
    label: { en: "MEDIA", bn: "মিডিয়া" },
    children: [
      { href: "/blog", label: { en: "EVENTS & NEWS", bn: "অনুষ্ঠান ও সংবাদ" } },
      { href: "/gallery", label: { en: "GALLERY", bn: "গ্যালারি" } },
    ],
  },

  { href: "/careers", label: { en: "CAREERS", bn: "ক্যারিয়ার" } },
  { href: "/contact", label: { en: "CONTACT", bn: "যোগাযোগ" } },
];

export const heroStats = [
  {
    label: { en: "School Tour", bn: "স্কুল ট্যুর" },
    value: {
      en: "Campus and classroom glimpses",
      bn: "ক্যাম্পাস ও শ্রেণিকক্ষের ঝলক",
    },
  },
  {
    label: { en: "Latest News", bn: "সাম্প্রতিক সংবাদ" },
    value: {
      en: "Celebrations and school updates",
      bn: "উৎসব ও বিদ্যালয়ের আপডেট",
    },
  },

];

export const homeHeroSlides = [
  "/media/Humaniapota%20School/IMG_3260.jpg",
  "/media/Humaniapota%20School/IMG_3340.jpg",
  "/media/Humaniapota%20School/IMG_3280.jpg",
  "/media/Humaniapota%20School/IMG_3345.jpg",
  "/media/Humaniapota%20School/IMG_3319.jpg",
];

export const academicSubjects: Subject[] = [
  {
    title: { en: "Literacy", bn: "ভাষা ও পাঠ" },
    description: {
      en: "Reading, speaking, and comprehension activities for foundational learning.",
      bn: "ভিত্তিমূলক শিক্ষার জন্য পড়া, বলা ও অনুধাবনের কার্যক্রম।",
    },
    accent: "var(--tone-sand)",
    imageUrl: "/media/nano_banana_literacy.png",
  },
  {
    title: { en: "Writing", bn: "লেখা" },
    description: {
      en: "Guided written expression and classroom practice.",
      bn: "নির্দেশিত লিখনচর্চা ও শ্রেণিকক্ষভিত্তিক অনুশীলন।",
    },
    accent: "var(--tone-orange)",
    imageUrl: "/media/nano_banana_writing.png",
  },
  {
    title: { en: "Mathematics", bn: "গণিত" },
    description: {
      en: "Number work, problem solving, and foundational numeracy.",
      bn: "সংখ্যা জ্ঞান, সমস্যা সমাধান ও ভিত্তিমূলক গণিতচর্চা।",
    },
    accent: "var(--tone-navy)",
    imageUrl: "/media/nano_banana_mathematics.png",
  },
  {
    title: { en: "Science", bn: "বিজ্ঞান" },
    description: {
      en: "Observation, discovery, and early scientific learning.",
      bn: "পর্যবেক্ষণ, অনুসন্ধান ও প্রাথমিক বৈজ্ঞানিক শিক্ষা।",
    },
    accent: "var(--tone-green)",
    imageUrl: "/media/nano_banana_science.png",
  },
  {
    title: { en: "Geography", bn: "ভূগোল" },
    description: {
      en: "Learning about environment, place, and community.",
      bn: "পরিবেশ, স্থান ও সমাজ সম্পর্কে শিক্ষা।",
    },
    accent: "var(--tone-red)",
    imageUrl: "/media/nano_banana_geography.png",
  },
  {
    title: { en: "Physical Education", bn: "শারীরিক শিক্ষা" },
    description: {
      en: "Movement, discipline, and healthy activity.",
      bn: "চলাফেরা, শৃঙ্খলা ও স্বাস্থ্যকর কার্যকলাপ।",
    },
    accent: "var(--tone-ink)",
    imageUrl: "/media/nano_banana_pe.png",
  },
];
