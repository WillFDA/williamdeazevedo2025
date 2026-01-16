import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getAllPostSlugs } from "../fetch";
import williamPicture from "@/public/pictures/william-low.png";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
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
    process.env.NEXT_PUBLIC_BASE_URL || "https://williamdeazevedo.com";
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      url: `${baseUrl}/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
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
    process.env.NEXT_PUBLIC_BASE_URL || "https://williamdeazevedo.com";
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(post.metadata.title)}`;

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            description: post.metadata.description,
            image: ogImage,
            url: `${baseUrl}/blog/${slug}`,
            author: {
              "@type": "Person",
              name: post.metadata.author,
            },
          }),
        }}
      />
      <header className="fade-up max-w-2xl mx-auto px-4 pt-10 pb-8 [--animation-delay:200ms]">
        <h1 className="font-bold text-2xl md:text-3xl tracking-tight text-gray-900 mb-3">
          {post.metadata.title}
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          {post.metadata.description}
        </p>
        <div className="flex items-center gap-3">
          <Image
            alt="Photo de William"
            src={williamPicture}
            width={36}
            height={36}
            className="rounded-full"
          />
          <div className="text-sm">
            <p className="font-medium text-gray-900">{post.metadata.author}</p>
            <time dateTime={post.metadata.date} className="text-gray-400">
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
