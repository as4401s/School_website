"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireContentAdmin } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

const schoolAssetBucket = "school-assets";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value || null;
}

async function uploadAsset(
  formData: FormData,
  urlField: string,
  fileField: string,
  folder: string,
) {
  const directUrl = getString(formData, urlField);
  const upload = formData.get(fileField);

  if (directUrl) {
    return directUrl;
  }

  if (!(upload instanceof File) || upload.size === 0) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const extension = upload.name.split(".").pop() || "bin";
  const fileName = `${folder}/${crypto.randomUUID()}.${extension}`;
  const buffer = Buffer.from(await upload.arrayBuffer());
  const { error } = await supabase.storage
    .from(schoolAssetBucket)
    .upload(fileName, buffer, {
      cacheControl: "3600",
      contentType: upload.type || undefined,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(schoolAssetBucket).getPublicUrl(fileName);
  return data.publicUrl;
}

function finish(section: string, status: "saved" | "deleted" | "error", message?: string) {
  const params = new URLSearchParams({ section, status });

  if (message) {
    params.set("message", message);
  }

  redirect(`/portal?${params.toString()}`);
}

export async function createNewsAction(formData: FormData) {
  try {
    const { user } = await requireContentAdmin();
    const payload = z
      .object({
        title: z.string().min(3),
        excerpt: z.string().min(12),
        body: z.string().min(20),
        publishedAt: z.string().min(10),
      })
      .parse({
        title: getString(formData, "title"),
        excerpt: getString(formData, "excerpt"),
        body: getString(formData, "body"),
        publishedAt: getString(formData, "publishedAt"),
      });

    const coverImageUrl = await uploadAsset(
      formData,
      "coverImageUrl",
      "coverImageFile",
      "news",
    );

    const supabase = await createServerSupabaseClient();
    const slug = slugify(payload.title);
    const { error } = await supabase.from("news_posts").insert({
      title: payload.title,
      title_bn: getOptionalString(formData, "titleBn"),
      slug,
      excerpt: payload.excerpt,
      excerpt_bn: getOptionalString(formData, "excerptBn"),
      body: payload.body,
      body_bn: getOptionalString(formData, "bodyBn"),
      cover_image_url: coverImageUrl,
      published_at: payload.publishedAt,
      featured: Boolean(formData.get("featured")),
      published: true,
      created_by: user.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/post/${slug}`);
    finish("news", "saved");
  } catch (error) {
    finish(
      "news",
      "error",
      error instanceof Error ? error.message : "News post could not be saved.",
    );
  }
}

export async function deleteNewsAction(formData: FormData) {
  try {
    await requireContentAdmin();
    const id = getString(formData, "id");
    const slug = getString(formData, "slug");
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("news_posts").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/post/${slug}`);
    finish("news", "deleted");
  } catch (error) {
    finish(
      "news",
      "error",
      error instanceof Error ? error.message : "News post could not be deleted.",
    );
  }
}

export async function createDocumentAction(formData: FormData) {
  try {
    const { user } = await requireContentAdmin();
    const payload = z
      .object({
        title: z.string().min(3),
        category: z.string().min(3),
        description: z.string().min(12),
      })
      .parse({
        title: getString(formData, "title"),
        category: getString(formData, "category"),
        description: getString(formData, "description"),
      });

    const fileUrl = await uploadAsset(
      formData,
      "fileUrl",
      "fileUpload",
      "documents",
    );

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("documents").insert({
      title: payload.title,
      title_bn: getOptionalString(formData, "titleBn"),
      slug: slugify(payload.title),
      category: payload.category,
      category_bn: getOptionalString(formData, "categoryBn"),
      description: payload.description,
      description_bn: getOptionalString(formData, "descriptionBn"),
      file_url: fileUrl,
      published: true,
      created_by: user.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/file-share");
    finish("documents", "saved");
  } catch (error) {
    finish(
      "documents",
      "error",
      error instanceof Error ? error.message : "Document could not be saved.",
    );
  }
}

export async function deleteDocumentAction(formData: FormData) {
  try {
    await requireContentAdmin();
    const id = getString(formData, "id");
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("documents").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/file-share");
    finish("documents", "deleted");
  } catch (error) {
    finish(
      "documents",
      "error",
      error instanceof Error ? error.message : "Document could not be deleted.",
    );
  }
}

export async function createResultAction(formData: FormData) {
  try {
    const { user } = await requireContentAdmin();
    const payload = z
      .object({
        title: z.string().min(3),
        summary: z.string().min(12),
        details: z.string().min(20),
        location: z.string().min(3),
        status: z.string().min(3),
      })
      .parse({
        title: getString(formData, "title"),
        summary: getString(formData, "summary"),
        details: getString(formData, "details"),
        location: getString(formData, "location"),
        status: getString(formData, "status"),
      });

    const slug = slugify(payload.title);
    const resultDate = getString(formData, "resultDate") || null;
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("results").insert({
      title: payload.title,
      title_bn: getOptionalString(formData, "titleBn"),
      slug,
      summary: payload.summary,
      summary_bn: getOptionalString(formData, "summaryBn"),
      details: payload.details,
      details_bn: getOptionalString(formData, "detailsBn"),
      location: payload.location,
      location_bn: getOptionalString(formData, "locationBn"),
      result_date: resultDate,
      status: payload.status,
      status_bn: getOptionalString(formData, "statusBn"),
      published: true,
      created_by: user.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath(`/events/${slug}`);
    finish("results", "saved");
  } catch (error) {
    finish(
      "results",
      "error",
      error instanceof Error ? error.message : "Result notice could not be saved.",
    );
  }
}

export async function deleteResultAction(formData: FormData) {
  try {
    await requireContentAdmin();
    const id = getString(formData, "id");
    const slug = getString(formData, "slug");
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("results").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath(`/events/${slug}`);
    finish("results", "deleted");
  } catch (error) {
    finish(
      "results",
      "error",
      error instanceof Error ? error.message : "Result notice could not be deleted.",
    );
  }
}

export async function createGalleryAction(formData: FormData) {
  try {
    const { user } = await requireContentAdmin();
    const payload = z
      .object({
        title: z.string().min(3),
        caption: z.string().min(8),
      })
      .parse({
        title: getString(formData, "title"),
        caption: getString(formData, "caption"),
      });

    const imageUrl = await uploadAsset(
      formData,
      "imageUrl",
      "imageFile",
      "gallery",
    );

    if (!imageUrl) {
      throw new Error("An image file or URL is required.");
    }

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("gallery_items").insert({
      title: payload.title,
      title_bn: getOptionalString(formData, "titleBn"),
      caption: payload.caption,
      caption_bn: getOptionalString(formData, "captionBn"),
      image_url: imageUrl,
      published: true,
      created_by: user.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");
    finish("gallery", "saved");
  } catch (error) {
    finish(
      "gallery",
      "error",
      error instanceof Error ? error.message : "Gallery image could not be saved.",
    );
  }
}

export async function deleteGalleryAction(formData: FormData) {
  try {
    await requireContentAdmin();
    const id = getString(formData, "id");
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("gallery_items").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");
    finish("gallery", "deleted");
  } catch (error) {
    finish(
      "gallery",
      "error",
      error instanceof Error ? error.message : "Gallery image could not be deleted.",
    );
  }
}
