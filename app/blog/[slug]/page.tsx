import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getAllPostSlugs } from "../fetch";
import { Metadata, ResolvingMetadata } from "next";

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

  return (
    <article className="prose mx-auto max-w-3xl px-4 py-8">
      {post.content}
    </article>
  );
}

export const dynamicParams = false;
