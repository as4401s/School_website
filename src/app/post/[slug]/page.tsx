import Image from "next/image";
import { notFound } from "next/navigation";

import {
  LocalizedDate,
  LocalizedText,
} from "@/components/language-provider";
import { getNewsPostBySlug } from "@/lib/content";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    notFound();
  }

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

        <article className="story-card">
          <div className="story-card__image-wrap">
            <Image
              alt={post.title.en}
              className="story-card__image"
              fill
              sizes="100vw"
              src={post.imageUrl}
            />
          </div>
          <div className="story-card__body stack">
            <LocalizedText as="p" text={post.excerpt} />
            {post.body.map((paragraph) => (
              <LocalizedText as="p" key={paragraph.en} text={paragraph} />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
