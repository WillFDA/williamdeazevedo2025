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
      {/* Hero Section */}
      <section className="fade-up mb-16 text-center [--animation-delay:200ms]">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
          "Enseigner, c'est apprendre deux fois"
        </h1>
        <p className="text-gray-500 text-sm">— Joseph Joubert</p>
      </section>

      <h2 className="fade-up mb-12 font-bold text-2xl [--animation-delay:300ms]">Articles</h2>
      <ul className="space-y-8">
        {posts.map((post, index) => (
          <li
            key={post.metadata.slug}
            className="fade-up"
            style={{ "--animation-delay": `${400 + index * 100}ms` } as React.CSSProperties}
          >
            <Link
              href={`/blog/${post.metadata.slug}`}
              className="group block"
            >
              <div className="flex items-baseline gap-2 mb-1">
                <h2 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {post.metadata.title}
                </h2>
                <span className="dot-leaders flex-1 min-w-[2rem]" />
                <time className="text-gray-400 text-sm tabular-nums whitespace-nowrap">
                  {formatDate(post.metadata.date)}
                </time>
              </div>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                {post.metadata.description}
              </p>
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full"
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
