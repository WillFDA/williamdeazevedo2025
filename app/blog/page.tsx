import Link from 'next/link';
import { posts } from '@/data/posts';

export default function Blog() {
  if (posts.length === 0) {
    return (
      <div className="container mx-auto flex max-w-4xl grow items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="mb-8 font-bold text-4xl">Blog</h1>
          <p className="text-gray-600 text-xl">
            Il n&apos;y a rien pour l&apos;instant. Revenez bientôt !
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-12 font-bold text-4xl">Blog</h1>

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group rounded-lg border border-gray-200 p-6 transition-all hover:border-gray-400 hover:shadow-md"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>

                <h2 className="font-bold text-2xl transition-colors group-hover:text-gray-600">
                  {post.title}
                </h2>

                <p className="text-gray-600">{post.description}</p>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-gray-700 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
