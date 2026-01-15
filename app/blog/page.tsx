import { getAllPosts } from "./fetch";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles sur le développement front-end, React, Next.js, TypeScript et mes retours d'expérience en tant que développeur.",
  openGraph: {
    title: "Blog | William De Azevedo",
    description:
      "Articles sur le développement front-end, React, Next.js et TypeScript.",
  },
  alternates: {
    canonical: "https://williamdeazevedo.fr/blog",
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Blog() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl flex flex-col items-center justify-center gap-4 grow">
        <h1 className="font-bold text-4xl">Blog</h1>
        <p>Il n'y a rien pour l'instant !</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="mb-12 font-bold text-4xl">Blog</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.metadata.slug} className="font-medium">
            <Link
              href={`/blog/${post.metadata.slug}`}
              className="group flex items-baseline gap-2"
            >
              <span className="text-gray-900 group-hover:text-gray-600 transition-colors">
                {post.metadata.title}
              </span>
              <span className="dot-leaders flex-1 min-w-[2rem]" />
              <time className="text-gray-400 text-sm tabular-nums whitespace-nowrap">
                {formatDate(post.metadata.date)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
