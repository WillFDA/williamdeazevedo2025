import { getAllPosts } from "./fetch";
import Link from "next/link";

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-12 font-bold text-4xl">Blog</h1>

      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.metadata.slug}
            href={`/blog/${post.metadata.slug}`}
            className="block rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-lg"
          >
            <article>
              <h2 className="mb-2 font-bold text-2xl text-gray-900">
                {post.metadata.title}
              </h2>

              <time className="mb-4 block text-gray-500 text-sm">
                {new Date(post.metadata.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              <p className="mb-4 text-gray-700">{post.metadata.description}</p>

              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-gray-600 text-xs"
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
