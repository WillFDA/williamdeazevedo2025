import Link from 'next/link';
import Content from './content.mdx';

export const metadata = {
  title: 'Mon premier side project : Motivai | Blog - William De Azevedo',
  description:
    "Hello, bienvenue sur mon premier post ! Je partage mon expérience avec mon premier side project et ce que j'ai appris en le créant.",
};

export default function Page() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Retour au blog
      </Link>

      <header className="mb-10">
        <div className="mb-4 flex items-center gap-2 text-gray-500 text-sm">
          <time dateTime="2025-12-15">15 décembre 2025</time>
          <span>•</span>
          <span>William De Azevedo</span>
        </div>

        <h1 className="mb-4 font-bold text-4xl">
          Mon premier side project : Motivai
        </h1>

        <div className="flex flex-wrap gap-2">
          {['side-project', 'apprentissage', 'développement', 'IA'].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-gray-700 text-sm"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </header>

      <div className="prose-content">
        <Content />
      </div>
    </article>
  );
}
