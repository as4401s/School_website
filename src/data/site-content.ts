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
    en: "4MPP+5XP, Humania Pota, West Bengal 741238, India",
    bn: "4MPP+5XP, হুমানিয়া পোতা, পশ্চিমবঙ্গ ৭৪১২৩৮, ভারত",
  },
  eventLocation: {
    en: "4MPP+5XP, Humania Pota, West Bengal 741238, India",
    bn: "4MPP+5XP, হুমানিয়া পোতা, পশ্চিমবঙ্গ ৭৪১২৩৮, ভারত",
  },
  schoolEmail: "info@kmschool.co.in",
  foundationEmail: "contact@ngbmfoundation.com",
};

export const navigation: NavigationItem[] = [
  { href: "/", label: { en: "HOME", bn: "হোম" } },
  {
    label: { en: "ABOUT", bn: "আমাদের সম্পর্কিত" },
    children: [
      { href: "/our-school", label: { en: "OUR SCHOOL", bn: "বিদ্যালয় সম্পর্কে" } },
      { href: "/academics", label: { en: "ACADEMICS", bn: "পাঠক্রম" } },
    ],
  },
  { href: "/admissions", label: { en: "ADMISSIONS", bn: "ভর্তি" } },
  {
    label: { en: "MEDIA", bn: "মিডিয়া" },
    children: [
      { href: "/blog", label: { en: "EVENTS & NEWS", bn: "অনুষ্ঠান ও সংবাদ" } },
      { href: "/gallery", label: { en: "GALLERY", bn: "গ্যালারি" } },
      { href: "/announcements", label: { en: "ANNOUNCEMENTS", bn: "বিজ্ঞপ্তি" } },
    ],
  },
  { href: "/file-share", label: { en: "LEARNING TOOLS", bn: "শিক্ষাসামগ্রী" } },
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
  {
    label: { en: "Learning Tools", bn: "শিক্ষাসামগ্রী" },
    value: {
      en: "Notices, resources, and results",
      bn: "নোটিশ, রিসোর্স ও ফলাফলের তথ্য",
    },
  },
];

export const homeHeroSlides = [
  "/media/hero-home.jpg",
  "/media/tour-1.jpg",
  "/media/post-independence.jpeg",
  "/media/post-raksha.jpeg",
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
      bn: "চলাফেরা, শৃঙ্খলা ও সুস্থ জীবনযাপনের অনুশীলন।",
    },
    accent: "var(--tone-ink)",
    imageUrl: "/media/nano_banana_pe.png",
  },
];

export const admissionsSteps = [
  {
    step: "01",
    title: { en: "Request the prospectus", bn: "প্রসপেক্টাস সংগ্রহ করুন" },
    description: {
      en: "Start with the prospectus and admissions information.",
      bn: "প্রথমে প্রসপেক্টাস ও ভর্তি-সংক্রান্ত তথ্য সংগ্রহ করুন।",
    },
  },
  {
    step: "02",
    title: { en: "Submit the application", bn: "আবেদন জমা দিন" },
    description: {
      en: "Fill in the required details carefully and share the necessary documents.",
      bn: "প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করে প্রয়োজনীয় নথি জমা দিন।",
    },
  },
  {
    step: "03",
    title: { en: "Review and confirmation", bn: "পর্যালোচনা ও নিশ্চিতকরণ" },
    description: {
      en: "The school will review the application and update you with the decision.",
      bn: "বিদ্যালয় আবেদন পর্যালোচনা করে সিদ্ধান্ত জানাবে।",
    },
  },
];
