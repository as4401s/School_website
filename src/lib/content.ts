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

function mapNewsPost(record: RecordWithFileSlug<NewsPostFile>): NewsPost {
  const slug = record.slug || record._fileSlug;

  return {
    id: record.id || slug,
    slug,
    publishedAt: record.publishedAt,
    featured: record.featured,
    showOnHome: record.showOnHome,
    title: normalizeBilingualText(record.title),
    excerpt: normalizeBilingualText(record.excerpt),
    body: record.body.map(normalizeBilingualText),
    imageUrl: record.imageUrl || undefined,
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

  return {
    news: allNewsFiles
      .filter((record) => record.published)
      .sort((left, right) => compareDatesDescending(left.publishedAt, right.publishedAt))
      .map(mapNewsPost),
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
    gallery: allGalleryFiles
      .filter((record) => record.published)
      .sort((left, right) => (left.order ?? 999) - (right.order ?? 999))
      .map(mapGalleryItem),
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
