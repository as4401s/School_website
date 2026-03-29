import Image from "next/image";
import { notFound } from "next/navigation";

import {
  LocalizedDate,
  LocalizedText,
} from "@/components/language-provider";
import { GalleryGrid } from "@/components/gallery-grid";
import { getNewsPostBySlug, getNewsPosts } from "@/lib/content";
import type { BilingualText, GalleryItem } from "@/data/site-content";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function isSameBilingualText(left: BilingualText, right: BilingualText) {
  return left.en.trim() === right.en.trim() && left.bn.trim() === right.bn.trim();
}

export async function generateStaticParams() {
  const posts = await getNewsPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const bodyParagraphs =
    post.body[0] && isSameBilingualText(post.excerpt, post.body[0])
      ? post.body.slice(1)
      : post.body;
  const hasEventGallery = (post.galleryImages?.length ?? 0) > 0;
  const eventGalleryItems: GalleryItem[] = (post.galleryImages ?? []).map((imageUrl, index) => ({
    id: `${post.id}-${index + 1}`,
    title: post.title,
    summary: { en: "", bn: "" },
    imageUrl,
    mediaType: "image",
  }));

  return (
    <section className="section">
      <div className="shell stack">
        <LocalizedText
          as="p"
          className="eyebrow"
          text={{ en: "Events & News", bn: "অনুষ্ঠান ও সংবাদ" }}
        />
        <LocalizedText
          as="h1"
          text={post.title}
          className="page-title"
        />
        <LocalizedDate className="story-card__meta" value={post.publishedAt} />
        {hasEventGallery ? (
          <div className="post-event-gallery">
            <GalleryGrid items={eventGalleryItems} variant="event" />
          </div>
        ) : null}

        <article className={hasEventGallery ? "portal-card stack" : "story-card"}>
          {!hasEventGallery && post.imageUrl ? (
            <div className="story-card__image-wrap">
              <Image
                alt={post.title.en}
                className="story-card__image"
                fill
                sizes="100vw"
                src={post.imageUrl}
              />
            </div>
          ) : null}
          <div className={hasEventGallery ? "stack" : "story-card__body stack"}>
            <LocalizedText as="p" text={post.excerpt} />
            {bodyParagraphs.map((paragraph) => (
              <LocalizedText as="p" key={paragraph.en} text={paragraph} />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
