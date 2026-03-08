import {
  documents,
  gallery,
  newsPosts,
  resultNotices,
  type BilingualText,
  type DocumentItem,
  type GalleryItem,
  type NewsPost,
  type ResultNotice,
} from "@/data/site-content";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type RawNewsPost = {
  id: string;
  title: string;
  title_bn?: string | null;
  slug: string;
  excerpt: string;
  excerpt_bn?: string | null;
  body: string;
  body_bn?: string | null;
  cover_image_url: string | null;
  published_at: string;
  featured: boolean | null;
};

type RawDocument = {
  id: string;
  title: string;
  title_bn?: string | null;
  category: string;
  category_bn?: string | null;
  description: string;
  description_bn?: string | null;
  file_url: string | null;
};

type RawResult = {
  id: string;
  title: string;
  title_bn?: string | null;
  slug: string;
  summary: string;
  summary_bn?: string | null;
  details: string;
  details_bn?: string | null;
  location: string;
  location_bn?: string | null;
  result_date: string | null;
  status: string;
  status_bn?: string | null;
};

type RawGalleryItem = {
  id: string;
  title: string;
  title_bn?: string | null;
  caption: string | null;
  caption_bn?: string | null;
  image_url: string;
};

type PortalCollections = {
  news: RawNewsPost[];
  documents: RawDocument[];
  results: RawResult[];
  gallery: RawGalleryItem[];
  error?: string;
};

function toBilingualText(
  english: string | null | undefined,
  bengali: string | null | undefined,
): BilingualText {
  const fallback = english?.trim() || "";

  return {
    en: fallback,
    bn: bengali?.trim() || fallback,
  };
}

function splitBody(value: string | null | undefined, fallback?: string | null | undefined) {
  if (!value) {
    return [];
  }

  const englishParts = value
    .split("\n\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
  const bengaliParts = fallback
    ? fallback
        .split("\n\n")
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];

  return englishParts.map((entry, index) =>
    toBilingualText(entry, bengaliParts[index]),
  );
}

function mapNewsPost(row: RawNewsPost): NewsPost {
  return {
    id: row.id,
    title: toBilingualText(row.title, row.title_bn),
    slug: row.slug,
    excerpt: toBilingualText(row.excerpt, row.excerpt_bn),
    body: splitBody(row.body, row.body_bn),
    imageUrl: row.cover_image_url || "/media/post-raksha.jpeg",
    publishedAt: row.published_at,
    featured: Boolean(row.featured),
  };
}

function mapDocument(row: RawDocument): DocumentItem {
  return {
    id: row.id,
    title: toBilingualText(row.title, row.title_bn),
    category: toBilingualText(row.category, row.category_bn),
    description: toBilingualText(row.description, row.description_bn),
    href: row.file_url || undefined,
  };
}

function mapResult(row: RawResult): ResultNotice {
  return {
    id: row.id,
    title: toBilingualText(row.title, row.title_bn),
    slug: row.slug,
    summary: toBilingualText(row.summary, row.summary_bn),
    details: splitBody(row.details, row.details_bn),
    location: toBilingualText(row.location, row.location_bn),
    eventDate: row.result_date || undefined,
    status: toBilingualText(row.status, row.status_bn),
  };
}

function mapGalleryItem(row: RawGalleryItem): GalleryItem {
  return {
    id: row.id,
    title: toBilingualText(row.title, row.title_bn),
    imageUrl: row.image_url,
    summary: toBilingualText(
      row.caption || "School gallery image.",
      row.caption_bn,
    ),
  };
}

export async function getNewsPosts() {
  if (!hasSupabaseEnv()) {
    return newsPosts;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("news_posts")
      .select(
        "id,title,title_bn,slug,excerpt,excerpt_bn,body,body_bn,cover_image_url,published_at,featured",
      )
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error || !data?.length) {
      return newsPosts;
    }

    return data.map((row) => mapNewsPost(row as RawNewsPost));
  } catch {
    return newsPosts;
  }
}

export async function getNewsPostBySlug(slug: string) {
  const items = await getNewsPosts();
  return items.find((item) => item.slug === slug) || null;
}

export async function getResults() {
  if (!hasSupabaseEnv()) {
    return resultNotices;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("results")
      .select(
        "id,title,title_bn,slug,summary,summary_bn,details,details_bn,location,location_bn,result_date,status,status_bn",
      )
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error || !data?.length) {
      return resultNotices;
    }

    return data.map((row) => mapResult(row as RawResult));
  } catch {
    return resultNotices;
  }
}

export async function getResultBySlug(slug: string) {
  const items = await getResults();
  return items.find((item) => item.slug === slug) || null;
}

export async function getDocuments() {
  if (!hasSupabaseEnv()) {
    return documents;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("documents")
      .select(
        "id,title,title_bn,category,category_bn,description,description_bn,file_url",
      )
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error || !data?.length) {
      return documents;
    }

    return data.map((row) => mapDocument(row as RawDocument));
  } catch {
    return documents;
  }
}

export async function getGalleryItems() {
  if (!hasSupabaseEnv()) {
    return gallery;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("gallery_items")
      .select("id,title,title_bn,caption,caption_bn,image_url")
      .eq("published", true)
      .order("display_order", { ascending: true });

    if (error || !data?.length) {
      return gallery;
    }

    return data.map((row) => mapGalleryItem(row as RawGalleryItem));
  } catch {
    return gallery;
  }
}

export async function getPortalCollections(): Promise<PortalCollections> {
  if (!hasSupabaseEnv()) {
    return {
      news: [],
      documents: [],
      results: [],
      gallery: [],
      error: "Supabase is not configured yet.",
    };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const [newsQuery, documentsQuery, resultsQuery, galleryQuery] =
      await Promise.all([
        supabase
          .from("news_posts")
          .select(
            "id,title,title_bn,slug,excerpt,excerpt_bn,body,body_bn,cover_image_url,published_at,featured",
          )
          .order("published_at", { ascending: false }),
        supabase
          .from("documents")
          .select(
            "id,title,title_bn,category,category_bn,description,description_bn,file_url",
          )
          .order("created_at", { ascending: false }),
        supabase
          .from("results")
          .select(
            "id,title,title_bn,slug,summary,summary_bn,details,details_bn,location,location_bn,result_date,status,status_bn",
          )
          .order("created_at", { ascending: false }),
        supabase
          .from("gallery_items")
          .select("id,title,title_bn,caption,caption_bn,image_url")
          .order("display_order", { ascending: true }),
      ]);

    const firstError = [
      newsQuery.error,
      documentsQuery.error,
      resultsQuery.error,
      galleryQuery.error,
    ].find(Boolean);

    return {
      news: (newsQuery.data || []) as RawNewsPost[],
      documents: (documentsQuery.data || []) as RawDocument[],
      results: (resultsQuery.data || []) as RawResult[],
      gallery: (galleryQuery.data || []) as RawGalleryItem[],
      error: firstError?.message,
    };
  } catch (error) {
    return {
      news: [],
      documents: [],
      results: [],
      gallery: [],
      error:
        error instanceof Error ? error.message : "Portal collections could not be loaded.",
    };
  }
}
