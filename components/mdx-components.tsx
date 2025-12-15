import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BaseProps {
  children?: ReactNode;
}

interface LinkProps extends BaseProps {
  href?: string;
}

interface ImageProps {
  src?: string;
  alt?: string;
}

export const mdxComponents = {
  h1: ({ children }: BaseProps) => (
    <h1 className="mb-6 mt-10 font-bold text-3xl first:mt-0">{children}</h1>
  ),
  h2: ({ children }: BaseProps) => (
    <h2 className="mb-4 mt-8 font-bold text-2xl">{children}</h2>
  ),
  h3: ({ children }: BaseProps) => (
    <h3 className="mb-3 mt-6 font-semibold text-xl">{children}</h3>
  ),
  p: ({ children }: BaseProps) => (
    <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
  ),
  a: ({ href, children }: LinkProps) => (
    <Link
      href={href || '#'}
      className="text-blue-600 underline hover:text-blue-800"
    >
      {children}
    </Link>
  ),
  ul: ({ children }: BaseProps) => (
    <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>
  ),
  ol: ({ children }: BaseProps) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>
  ),
  li: ({ children }: BaseProps) => (
    <li className="text-gray-700">{children}</li>
  ),
  blockquote: ({ children }: BaseProps) => (
    <blockquote className="my-6 border-gray-300 border-l-4 pl-4 italic text-gray-600">
      {children}
    </blockquote>
  ),
  code: ({ children }: BaseProps) => (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">
      {children}
    </code>
  ),
  pre: ({ children }: BaseProps) => (
    <pre className="my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
      {children}
    </pre>
  ),
  img: ({ src, alt }: ImageProps) => (
    <span className="my-6 block">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={450}
        className="rounded-lg"
      />
    </span>
  ),
  strong: ({ children }: BaseProps) => (
    <strong className="font-bold text-gray-900">{children}</strong>
  ),
  em: ({ children }: BaseProps) => <em className="italic">{children}</em>,
  hr: () => <hr className="my-8 border-gray-200" />,
};
