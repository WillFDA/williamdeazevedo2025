import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import MotiviaOldUI from "./components/blog/motivia-old-ui";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    MotiviaOldUI,
    h1: ({ children }) => (
      <h1 className="mb-6 mt-10 font-bold text-3xl first:mt-0 mx-auto max-w-2xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 font-bold text-2xl mx-auto max-w-2xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 font-semibold text-xl mx-auto max-w-2xl">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-gray-700 mx-auto max-w-2xl">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href || "#"}
        className="text-blue-600 underline hover:text-blue-800 mx-auto max-w-2xl"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 max-w-2xl mx-auto">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>
    ),
    li: ({ children }) => <li className="text-gray-700 -ml-2">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-gray-300 border-l-4 pl-4 italic text-gray-600 max-w-2xl mx-auto">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm mx-auto max-w-2xl">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
        {children}
      </pre>
    ),
    img: ({ src, alt }) => (
      <span className="my-6 block">
        <Image
          src={src || ""}
          alt={alt || ""}
          width={800}
          height={450}
          className="rounded-lg"
        />
      </span>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    hr: () => <hr className="my-8 border-gray-200" />,
    ...components,
  };
}
