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

export default async function Blog() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl flex flex-col items-center justify-center gap-4 grow">
        <h1 className="font-bold text-4xl">Blog</h1>
        <p>Il n'y a rien pour l'instant !!! 👀</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="mb-12 font-bold text-4xl">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.metadata.slug}
            href={`/blog/${post.metadata.slug}`}
            className="group relative block pl-4"
          >
            <span className="absolute left-0 bottom-0 w-0.5 h-0 bg-gray-300 transition-all duration-300 ease-out group-hover:h-full" />
            <article className="flex flex-col gap-2">
              <h2 className="font-bold text-lg text-gray-900">
                {post.metadata.title}
              </h2>
              <p className="text-gray-700 text-sm">
                {post.metadata.description}
              </p>
              <time className="block text-gray-500 text-sm mb-2">
                {new Date(post.metadata.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
