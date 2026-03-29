import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";

import { z } from "zod";

import type {
  BilingualText,
  DocumentItem,
  GalleryItem,
  NewsPost,
  ResultNotice,
} from "@/data/site-content";
import { getItems } from "@/lib/cms-store";

const contentRoot = path.join(process.cwd(), "content");
const publicRoot = path.join(process.cwd(), "public");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const naturalSort = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

type PublicImageAsset = {
  fileName: string;
  url: string;
};

const bilingualTextSchema = z.object({
  en: z.string().trim().min(1),
  bn: z.string().trim().min(1),
});

// Lenient variant — allows empty strings (used for optional bilingual fields like gallery summary)
const optionalBilingualTextSchema = z.object({
  en: z.string().trim().default(""),
  bn: z.string().trim().default(""),
});

const newsPostSchema = z.object({
  id: z.string().trim().min(1).optional(),
  slug: z.string().trim().min(1).optional(),
  published: z.boolean().default(true),
  featured: z.boolean().optional().default(false),
  showOnHome: z.boolean().optional().default(true),
  publishedAt: z.string().trim().min(1),
  title: bilingualTextSchema,
  excerpt: bilingualTextSchema,
  body: z.array(bilingualTextSchema).min(1),
  eventFolder: z.string().trim().optional().default(""),
  imageUrl: z.string().trim().optional().default(""),
});

const resultNoticeSchema = z.object({
  id: z.string().trim().min(1).optional(),
  slug: z.string().trim().min(1).optional(),
  published: z.boolean().default(true),
  publishedAt: z.string().trim().min(1).optional(),
  title: bilingualTextSchema,
  summary: bilingualTextSchema,
  details: z.array(bilingualTextSchema).min(1),
  location: bilingualTextSchema,
  eventDate: z.string().trim().min(1).optional(),
  status: bilingualTextSchema,
});

const documentSchema = z.object({
  id: z.string().trim().min(1).optional(),
  slug: z.string().trim().min(1).optional(),
  published: z.boolean().default(true),
  order: z.number().int().optional(),
  title: bilingualTextSchema,
  category: bilingualTextSchema,
  description: bilingualTextSchema,
  href: z.string().optional().default(""),
});

const galleryItemSchema = z.object({
  id: z.string().trim().min(1).optional(),
  order: z.number().int().optional(),
  published: z.boolean().default(true),
  title: bilingualTextSchema,
  summary: optionalBilingualTextSchema,
  imageUrl: z.string().trim().min(1),
  mediaType: z.enum(["image", "video"]).optional().default("image"),
});

type NewsPostFile = z.infer<typeof newsPostSchema>;
type ResultNoticeFile = z.infer<typeof resultNoticeSchema>;
type DocumentFile = z.infer<typeof documentSchema>;
type GalleryItemFile = z.infer<typeof galleryItemSchema>;
type RecordWithFileSlug<T> = T & {
  _fileSlug: string;
};

type CmsCollections = {
  news: NewsPost[];
  results: ResultNotice[];
  documents: DocumentItem[];
  gallery: GalleryItem[];
};

function compareDatesDescending(left: string | undefined, right: string | undefined) {
  const leftTime = left ? new Date(left).getTime() : 0;
  const rightTime = right ? new Date(right).getTime() : 0;
  return rightTime - leftTime;
}

async function readCollection<T extends Record<string, unknown>>(
  directory: string,
  schema: z.ZodType<T>,
) {
  const folder = path.join(contentRoot, directory);
  const entries = await fs.readdir(folder, { withFileTypes: true });

  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name)
    .sort();

  const results = await Promise.all(
    files.map(async (fileName) => {
      const filePath = path.join(folder, fileName);
      try {
        const raw = await fs.readFile(filePath, "utf8");
        return {
          ...schema.parse(JSON.parse(raw)),
          _fileSlug: fileName.replace(/\.json$/, ""),
        } as RecordWithFileSlug<T>;
      } catch (err) {
        console.error(`[content] Skipping malformed file ${directory}/${fileName}:`, err);
        return null;
      }
    }),
  );

  return results.filter((r) => r !== null) as RecordWithFileSlug<T>[];
}

function normalizeBilingualText(value: BilingualText): BilingualText {
  return {
    en: value.en.trim(),
    bn: value.bn.trim(),
  };
}

function toPublicUrl(relativePath: string) {
  return `/${relativePath
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

async function listPublicImageAssets(relativeDirectory: string): Promise<PublicImageAsset[]> {
  if (!relativeDirectory.trim()) {
    return [];
  }

  try {
    const pathSegments = relativeDirectory.split("/").filter(Boolean);
    const folder = path.join(publicRoot, ...pathSegments);
    const entries = await fs.readdir(folder, { withFileTypes: true });

    return entries
      .filter(
        (entry) =>
          entry.isFile() &&
          imageExtensions.has(path.extname(entry.name).toLowerCase()),
      )
      .sort((left, right) => naturalSort.compare(left.name, right.name))
      .map((entry) => ({
        fileName: entry.name,
        url: toPublicUrl([...pathSegments, entry.name].join("/")),
      }));
  } catch {
    return [];
  }
}

function createAutomaticGalleryItem(asset: PublicImageAsset, index: number): GalleryItem {
  const baseName = asset.fileName.replace(/\.[^.]+$/, "");
  const slug =
    baseName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `gallery-${index + 1}`;

  return {
    id: `auto-${slug}`,
    title: {
      en: `Campus Snapshot ${String(index + 1).padStart(2, "0")}`,
      bn: `ক্যাম্পাসের অতিরিক্ত ছবি ${index + 1}`,
    },
    summary: {
      en: "Additional moments from school life, classrooms, and campus activities.",
      bn: "বিদ্যালয়ের দৈনন্দিন জীবন, শ্রেণিকক্ষ ও ক্যাম্পাস কার্যক্রমের আরও কিছু মুহূর্ত।",
    },
    imageUrl: asset.url,
    mediaType: "image",
  };
}

async function getAutomaticGalleryItems(existingItems: GalleryItem[]) {
  const assets = await listPublicImageAssets("media/Humaniapota School");
  const knownFileNames = new Set(
    existingItems.map((item) => decodeURIComponent(item.imageUrl.split("/").pop() ?? "")),
  );

  return assets
    .filter((asset) => !knownFileNames.has(asset.fileName))
    .map(createAutomaticGalleryItem);
}

async function mapNewsPost(record: RecordWithFileSlug<NewsPostFile>): Promise<NewsPost> {
  const slug = record.slug || record._fileSlug;
  const galleryImages = record.eventFolder
    ? (await listPublicImageAssets(record.eventFolder)).map((asset) => asset.url)
    : [];

  return {
    id: record.id || slug,
    slug,
    publishedAt: record.publishedAt,
    featured: record.featured,
    showOnHome: record.showOnHome,
    title: normalizeBilingualText(record.title),
    excerpt: normalizeBilingualText(record.excerpt),
    body: record.body.map(normalizeBilingualText),
    imageUrl: record.imageUrl || galleryImages[0] || undefined,
    galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
  };
}

function mapResultNotice(record: RecordWithFileSlug<ResultNoticeFile>): ResultNotice {
  const slug = record.slug || record._fileSlug;

  return {
    id: record.id || slug,
    slug,
    title: normalizeBilingualText(record.title),
    summary: normalizeBilingualText(record.summary),
    details: record.details.map(normalizeBilingualText),
    location: normalizeBilingualText(record.location),
    eventDate: record.eventDate,
    status: normalizeBilingualText(record.status),
  };
}

function mapDocument(record: RecordWithFileSlug<DocumentFile>): DocumentItem {
  return {
    id: record.id || record.slug || record._fileSlug,
    title: normalizeBilingualText(record.title),
    category: normalizeBilingualText(record.category),
    description: normalizeBilingualText(record.description),
    href: record.href?.trim() || undefined,
  };
}

function mapGalleryItem(record: RecordWithFileSlug<GalleryItemFile>): GalleryItem {
  return {
    id: record.id || record._fileSlug,
    title: normalizeBilingualText(record.title),
    summary: normalizeBilingualText(record.summary),
    imageUrl: record.imageUrl,
    mediaType: record.mediaType ?? "image",
  };
}

/**
 * Parses raw Redis items through a Zod schema, attaching a synthetic _fileSlug.
 * Unknown internal fields (like _cloudinaryId) are stripped by Zod automatically.
 */
function parseRedisItems<T extends Record<string, unknown>>(
  items: Record<string, unknown>[],
  schema: z.ZodType<T>,
): RecordWithFileSlug<T>[] {
  return items.flatMap((item) => {
    try {
      const id = typeof item.id === "string" ? item.id : String(Date.now());
      return [{ ...schema.parse(item), _fileSlug: id } as RecordWithFileSlug<T>];
    } catch {
      return [];
    }
  });
}

const loadCmsCollections = cache(async (): Promise<CmsCollections> => {
  const [
    staticNewsFiles, staticResultFiles, staticDocumentFiles, staticGalleryFiles,
    dynamicNews, dynamicDocuments, dynamicGallery,
  ] = await Promise.all([
    readCollection("news", newsPostSchema).catch(() => [] as RecordWithFileSlug<NewsPostFile>[]),
    readCollection("results", resultNoticeSchema).catch(() => [] as RecordWithFileSlug<ResultNoticeFile>[]),
    readCollection("documents", documentSchema).catch(() => [] as RecordWithFileSlug<DocumentFile>[]),
    readCollection("gallery", galleryItemSchema).catch(() => [] as RecordWithFileSlug<GalleryItemFile>[]),
    getItems("news").catch(() => [] as Record<string, unknown>[]),
    getItems("documents").catch(() => [] as Record<string, unknown>[]),
    getItems("gallery").catch(() => [] as Record<string, unknown>[]),
  ]);

  const allNewsFiles = [
    ...staticNewsFiles,
    ...parseRedisItems(dynamicNews, newsPostSchema),
  ];
  const allDocumentFiles = [
    ...staticDocumentFiles,
    ...parseRedisItems(dynamicDocuments, documentSchema),
  ];
  const allGalleryFiles = [
    ...staticGalleryFiles,
    ...parseRedisItems(dynamicGallery, galleryItemSchema),
  ];

  const publishedNewsRecords = allNewsFiles
    .filter((record) => record.published)
    .sort((left, right) => compareDatesDescending(left.publishedAt, right.publishedAt));
  const curatedGallery = allGalleryFiles
    .filter((record) => record.published)
    .sort((left, right) => (left.order ?? 999) - (right.order ?? 999))
    .map(mapGalleryItem);
  const [news, automaticGallery] = await Promise.all([
    Promise.all(publishedNewsRecords.map(mapNewsPost)),
    getAutomaticGalleryItems(curatedGallery),
  ]);

  return {
    news,
    results: staticResultFiles
      .filter((record) => record.published)
      .sort((left, right) => {
        const eventSort = compareDatesDescending(left.eventDate, right.eventDate);
        return eventSort !== 0
          ? eventSort
          : compareDatesDescending(left.publishedAt, right.publishedAt);
      })
      .map(mapResultNotice),
    documents: allDocumentFiles
      .filter((record) => record.published)
      .sort((left, right) => (left.order ?? 999) - (right.order ?? 999))
      .map(mapDocument),
    gallery: [...curatedGallery, ...automaticGallery],
  };
});

export async function getNewsPosts() {
  return (await loadCmsCollections()).news;
}

export async function getHomeNewsPosts(limit = 2) {
  return (await getNewsPosts())
    .filter((post) => post.showOnHome !== false)
    .slice(0, limit);
}

export async function getNewsPostBySlug(slug: string) {
  return (await getNewsPosts()).find((post) => post.slug === slug) || null;
}

export async function getResults() {
  return (await loadCmsCollections()).results;
}

export async function getResultBySlug(slug: string) {
  return (await getResults()).find((result) => result.slug === slug) || null;
}

export async function getDocuments() {
  return (await loadCmsCollections()).documents;
}

export async function getGalleryItems() {
  return (await loadCmsCollections()).gallery;
}
