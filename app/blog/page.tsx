import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "./fetch";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://williamdeazevedo.fr/blog",
  },
  description:
    "Articles sur le développement front-end, React, Next.js, TypeScript et mes retours d'expérience en tant que développeur.",
  openGraph: {
    description:
      "Articles sur le développement front-end, React, Next.js et TypeScript.",
    title: "Blog | William De Azevedo",
  },
  title: "Blog",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function Blog() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="container mx-auto flex max-w-2xl grow flex-col items-center justify-center gap-4 px-4 py-16">
        <h1 className="font-bold text-4xl">Blog</h1>
        <p>Il n'y a rien pour l'instant !</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      {/* Hero Section */}
      <section className="fade-up mb-16 text-center [--animation-delay:200ms]">
        <h1 className="mb-4 font-bold text-3xl leading-tight md:text-4xl lg:text-5xl">
          "Enseigner, c'est apprendre deux fois"
        </h1>
        <p className="text-gray-500 text-sm">— Joseph Joubert</p>
      </section>

      <h2 className="fade-up mb-12 font-bold text-2xl [--animation-delay:300ms]">
        Articles
      </h2>
      <ul className="space-y-8">
        {posts.map((post, index) => (
          <li
            className="fade-up"
            key={post.metadata.slug}
            style={
              {
                "--animation-delay": `${400 + index * 100}ms`,
              } as React.CSSProperties
            }
          >
            <Link className="group block" href={`/blog/${post.metadata.slug}`}>
              <div className="mb-1 flex items-baseline gap-2">
                <h2 className="font-medium text-gray-900 transition-colors group-hover:text-gray-600">
                  {post.metadata.title}
                </h2>
                <span className="dot-leaders min-w-[2rem] flex-1" />
                <time className="whitespace-nowrap text-gray-400 text-sm tabular-nums">
                  {formatDate(post.metadata.date)}
                </time>
              </div>
              <p className="mb-2 line-clamp-2 text-gray-500 text-sm">
                {post.metadata.description}
              </p>
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.metadata.tags.map((tag) => (
                    <span
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-400 text-xs"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
