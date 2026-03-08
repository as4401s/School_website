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

const contentRoot = path.join(process.cwd(), "content");

const bilingualTextSchema = z.object({
  en: z.string().trim().min(1),
  bn: z.string().trim().min(1),
});

const newsPostSchema = z.object({
  id: z.string().trim().min(1).optional(),
  slug: z.string().trim().min(1).optional(),
  published: z.boolean().default(true),
  featured: z.boolean().optional().default(false),
  publishedAt: z.string().trim().min(1),
  title: bilingualTextSchema,
  excerpt: bilingualTextSchema,
  body: z.array(bilingualTextSchema).min(1),
  imageUrl: z.string().trim().min(1),
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
  summary: bilingualTextSchema,
  imageUrl: z.string().trim().min(1),
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

  const records = await Promise.all(
    files.map(async (fileName) => {
      const filePath = path.join(folder, fileName);
      const raw = await fs.readFile(filePath, "utf8");
      return {
        ...schema.parse(JSON.parse(raw)),
        _fileSlug: fileName.replace(/\.json$/, ""),
      } as RecordWithFileSlug<T>;
    }),
  );

  return records;
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
    title: normalizeBilingualText(record.title),
    excerpt: normalizeBilingualText(record.excerpt),
    body: record.body.map(normalizeBilingualText),
    imageUrl: record.imageUrl,
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
  };
}

const loadCmsCollections = cache(async (): Promise<CmsCollections> => {
  const [newsFiles, resultFiles, documentFiles, galleryFiles] = await Promise.all([
    readCollection("news", newsPostSchema),
    readCollection("results", resultNoticeSchema),
    readCollection("documents", documentSchema),
    readCollection("gallery", galleryItemSchema),
  ]);

  return {
    news: newsFiles
      .filter((record) => record.published)
      .sort((left, right) => compareDatesDescending(left.publishedAt, right.publishedAt))
      .map(mapNewsPost),
    results: resultFiles
      .filter((record) => record.published)
      .sort((left, right) => {
        const eventSort = compareDatesDescending(left.eventDate, right.eventDate);
        return eventSort !== 0
          ? eventSort
          : compareDatesDescending(left.publishedAt, right.publishedAt);
      })
      .map(mapResultNotice),
    documents: documentFiles
      .filter((record) => record.published)
      .sort((left, right) => (left.order ?? 999) - (right.order ?? 999))
      .map(mapDocument),
    gallery: galleryFiles
      .filter((record) => record.published)
      .sort((left, right) => (left.order ?? 999) - (right.order ?? 999))
      .map(mapGalleryItem),
  };
});

export async function getNewsPosts() {
  return (await loadCmsCollections()).news;
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
