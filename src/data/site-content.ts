import type { Route } from "next";

export type Language = "en" | "bn";

export type BilingualText = {
  en: string;
  bn: string;
};

export type NavigationItem = {
  href: Route;
  label: BilingualText;
};

export type GalleryItem = {
  id: string;
  title: BilingualText;
  imageUrl: string;
  summary: BilingualText;
};

export type Subject = {
  title: BilingualText;
  description: BilingualText;
  accent: string;
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
    en: "KM School",
    bn: "কেএম স্কুল",
  },
  shortName: "KMS",
  foundation: "NGBM Foundation",
  foundationUrl: "https://ngbmfoundation.com/",
  heroTitle: {
    en: "Welcome to KM School",
    bn: "কেএম স্কুলে স্বাগতম",
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
    en: "Humaniapota, Thakurbari, PS - Gangnapur, Ranaghat - II, Nadia, Pin - 741238",
    bn: "হুমানিয়াপোতা, ঠাকুরবাড়ি, পি.এস - গাংনাপুর, রানাঘাট - ২, নদিয়া, পিন - ৭৪১২৩৮",
  },
  eventLocation: {
    en: "Humania Pota, West Bengal 741238, India",
    bn: "হুমানিয়া পোতা, পশ্চিমবঙ্গ ৭৪১২৩৮, ভারত",
  },
  schoolEmail: "info@kmschool.co.in",
  foundationEmail: "contact@ngbmfoundation.com",
};

export const navigation: NavigationItem[] = [
  { href: "/", label: { en: "HOME", bn: "হোম" } },
  { href: "/our-school", label: { en: "OUR SCHOOL", bn: "আমাদের বিদ্যালয়" } },
  { href: "/academics", label: { en: "ACADEMICS", bn: "পাঠক্রম" } },
  { href: "/admissions", label: { en: "ADMISSIONS", bn: "ভর্তি" } },
  { href: "/blog", label: { en: "EVENTS & NEWS", bn: "অনুষ্ঠান ও সংবাদ" } },
  { href: "/file-share", label: { en: "LEARNING TOOLS", bn: "শিক্ষাসামগ্রী" } },
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

export const gallery: GalleryItem[] = [
  {
    id: "tour-1",
    title: { en: "Classroom Space", bn: "শ্রেণিকক্ষের পরিবেশ" },
    imageUrl: "/media/tour-1.jpg",
    summary: {
      en: "A look inside the school’s learning environment.",
      bn: "বিদ্যালয়ের শিক্ষার পরিবেশের একটি ঝলক।",
    },
  },
  {
    id: "tour-2",
    title: { en: "Independence Day", bn: "স্বাধীনতা দিবস" },
    imageUrl: "/media/tour-2.jpg",
    summary: {
      en: "Teachers and children during school celebrations.",
      bn: "বিদ্যালয়ের অনুষ্ঠানে শিক্ষক ও শিক্ষার্থীরা।",
    },
  },
  {
    id: "tour-3",
    title: { en: "Parent Meeting", bn: "অভিভাবক বৈঠক" },
    imageUrl: "/media/tour-3.jpg",
    summary: {
      en: "Moments from a school meeting with families.",
      bn: "অভিভাবকদের সঙ্গে বিদ্যালয়ের এক বৈঠকের মুহূর্ত।",
    },
  },
  {
    id: "tour-4",
    title: { en: "Raksha Bandhan", bn: "রক্ষাবন্ধন" },
    imageUrl: "/media/tour-4.jpeg",
    summary: {
      en: "Children taking part in a cultural celebration.",
      bn: "সাংস্কৃতিক উদ্‌যাপনে শিশুদের অংশগ্রহণ।",
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
  },
  {
    title: { en: "Writing", bn: "লেখা" },
    description: {
      en: "Guided written expression and classroom practice.",
      bn: "নির্দেশিত লিখনচর্চা ও শ্রেণিকক্ষভিত্তিক অনুশীলন।",
    },
    accent: "var(--tone-orange)",
  },
  {
    title: { en: "Mathematics", bn: "গণিত" },
    description: {
      en: "Number work, problem solving, and foundational numeracy.",
      bn: "সংখ্যা জ্ঞান, সমস্যা সমাধান ও ভিত্তিমূলক গণিতচর্চা।",
    },
    accent: "var(--tone-navy)",
  },
  {
    title: { en: "Science", bn: "বিজ্ঞান" },
    description: {
      en: "Observation, discovery, and early scientific learning.",
      bn: "পর্যবেক্ষণ, অনুসন্ধান ও প্রাথমিক বৈজ্ঞানিক শিক্ষা।",
    },
    accent: "var(--tone-green)",
  },
  {
    title: { en: "Geography", bn: "ভূগোল" },
    description: {
      en: "Learning about environment, place, and community.",
      bn: "পরিবেশ, স্থান ও সমাজ সম্পর্কে শিক্ষা।",
    },
    accent: "var(--tone-red)",
  },
  {
    title: { en: "Physical Education", bn: "শারীরিক শিক্ষা" },
    description: {
      en: "Movement, discipline, and healthy activity.",
      bn: "চলাফেরা, শৃঙ্খলা ও সুস্থ জীবনযাপনের অনুশীলন।",
    },
    accent: "var(--tone-ink)",
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

export const newsPosts: NewsPost[] = [
  {
    id: "raksha-bandhan",
    title: {
      en: "Raksha Bandhan",
      bn: "রক্ষাবন্ধন",
    },
    slug: "raksha-bandhan",
    excerpt: {
      en: "Celebration of Raksha Bandhan among students through cultural activities and togetherness.",
      bn: "সাংস্কৃতিক কার্যক্রম ও ভ্রাতৃত্বের বন্ধনের মধ্য দিয়ে শিক্ষার্থীদের রক্ষাবন্ধন উদ্‌যাপন।",
    },
    body: [
      {
        en: "Students celebrated Raksha Bandhan together in a joyful atmosphere inside the school. The programme reflected care, friendship, and participation.",
        bn: "শিক্ষার্থীরা বিদ্যালয়ে আনন্দঘন পরিবেশে একসঙ্গে রক্ষাবন্ধন উদ্‌যাপন করেছে। এই অনুষ্ঠান যত্ন, বন্ধুত্ব ও অংশগ্রহণের মূল্যবোধকে তুলে ধরে।",
      },
      {
        en: "Events like this help make school life memorable and strengthen the sense of community among children.",
        bn: "এ ধরনের অনুষ্ঠান স্কুলজীবনকে আরও স্মরণীয় করে তোলে এবং শিশুদের মধ্যে সম্প্রদায়বোধকে দৃঢ় করে।",
      },
    ],
    imageUrl: "/media/post-raksha.jpeg",
    publishedAt: "2025-09-08",
    featured: true,
  },
  {
    id: "independence-day-celebration",
    title: {
      en: "Independence Day Celebration",
      bn: "স্বাধীনতা দিবস উদ্‌যাপন",
    },
    slug: "independence-day-celebration",
    excerpt: {
      en: "Celebration of Independence Day on 15th August with cultural programs and the hoisting of the national flag.",
      bn: "১৫ই আগস্ট সাংস্কৃতিক অনুষ্ঠান ও জাতীয় পতাকা উত্তোলনের মাধ্যমে স্বাধীনতা দিবস উদ্‌যাপন।",
    },
    body: [
      {
        en: "Children and teachers marked Independence Day through cultural participation and a formal flag hoisting ceremony.",
        bn: "শিক্ষার্থী ও শিক্ষকরা সাংস্কৃতিক অংশগ্রহণ এবং আনুষ্ঠানিক পতাকা উত্তোলনের মাধ্যমে স্বাধীনতা দিবস পালন করেছেন।",
      },
      {
        en: "The event brought together the school community in a spirit of pride, participation, and celebration.",
        bn: "এই অনুষ্ঠান বিদ্যালয় পরিবারকে গর্ব, অংশগ্রহণ ও উৎসবের আবহে একত্র করেছে।",
      },
    ],
    imageUrl: "/media/post-independence.jpeg",
    publishedAt: "2025-09-08",
  },
];

export const resultNotices: ResultNotice[] = [
  {
    id: "term-1-results",
    title: {
      en: "Term 1 Results",
      bn: "টার্ম ১ ফলাফল",
    },
    slug: "term-1-results",
    summary: {
      en: "Term 1 examinations are over. Results awaited. Follow for more updates.",
      bn: "টার্ম ১ পরীক্ষা সম্পন্ন হয়েছে। ফলাফলের জন্য অপেক্ষা করুন। আরও আপডেটের জন্য নজর রাখুন।",
    },
    details: [
      {
        en: "The Term 1 examination cycle has concluded and the result notice will be updated here.",
        bn: "টার্ম ১ পরীক্ষার পর্ব সম্পন্ন হয়েছে এবং ফলাফলের নোটিশ এখানেই জানানো হবে।",
      },
      {
        en: "Please check this page again for the release notice and any related instructions.",
        bn: "প্রকাশের তারিখ ও সংশ্লিষ্ট নির্দেশাবলীর জন্য এই পৃষ্ঠা আবার দেখুন।",
      },
    ],
    location: siteMeta.eventLocation,
    status: {
      en: "Awaiting publication",
      bn: "প্রকাশের অপেক্ষায়",
    },
  },
];

export const documents: DocumentItem[] = [
  {
    id: "school-prospectus",
    title: {
      en: "School Prospectus",
      bn: "স্কুল প্রসপেক্টাস",
    },
    category: {
      en: "Admissions",
      bn: "ভর্তি",
    },
    description: {
      en: "Overview of the school and admissions information for parents.",
      bn: "অভিভাবকদের জন্য বিদ্যালয় ও ভর্তি-সংক্রান্ত সংক্ষিপ্ত তথ্য।",
    },
  },
  {
    id: "term-1-update",
    title: {
      en: "Term 1 Notice",
      bn: "টার্ম ১ নোটিশ",
    },
    category: {
      en: "Results",
      bn: "ফলাফল",
    },
    description: {
      en: "Latest public notice related to Term 1 updates.",
      bn: "টার্ম ১ সংক্রান্ত সর্বশেষ জনসাধারণের নোটিশ।",
    },
    href: "/events/term-1-results",
  },
  {
    id: "general-circulars",
    title: {
      en: "General Circulars",
      bn: "সাধারণ বিজ্ঞপ্তি",
    },
    category: {
      en: "School Updates",
      bn: "বিদ্যালয় আপডেট",
    },
    description: {
      en: "Important notices and school information for families.",
      bn: "অভিভাবক ও শিক্ষার্থীদের জন্য গুরুত্বপূর্ণ নোটিশ ও বিদ্যালয়ের তথ্য।",
    },
  },
];
