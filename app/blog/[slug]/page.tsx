import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import williamPicture from "@/public/pictures/william-low.png";
import { getAllPostSlugs, getPostBySlug } from "../fetch";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const { title, description, date } = post.metadata;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://williamdeazevedo.fr";
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(title)}`;

  return {
    description,
    openGraph: {
      description,
      images: [
        {
          url: ogImage,
        },
      ],
      publishedTime: date,
      title,
      type: "article",
      url: `${baseUrl}/blog/${slug}`,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: [ogImage],
      title,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://williamdeazevedo.fr";
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(post.metadata.title)}`;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            author: {
              "@type": "Person",
              name: post.metadata.author,
            },
            dateModified: post.metadata.date,
            datePublished: post.metadata.date,
            description: post.metadata.description,
            headline: post.metadata.title,
            image: ogImage,
            url: `${baseUrl}/blog/${slug}`,
          }),
        }}
        suppressHydrationWarning
        type="application/ld+json"
      />
      <header className="fade-up mx-auto max-w-2xl px-4 pt-10 pb-8 [--animation-delay:200ms]">
        <h1 className="mb-3 font-bold text-2xl text-gray-900 tracking-tight md:text-3xl">
          {post.metadata.title}
        </h1>
        <p className="mb-6 text-gray-600 text-sm">
          {post.metadata.description}
        </p>
        <div className="flex items-center gap-3">
          <Image
            alt="Photo de William"
            className="rounded-full"
            height={36}
            src={williamPicture}
            width={36}
          />
          <div className="text-sm">
            <p className="font-medium text-gray-900">{post.metadata.author}</p>
            <time className="text-gray-400" dateTime={post.metadata.date}>
              {new Date(post.metadata.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </header>
      <article className="fade-up mx-auto px-4 pb-16 [--animation-delay:400ms]">
        <post.content />
      </article>
    </>
  );
}

export const dynamicParams = false;
