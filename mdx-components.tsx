import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import MotiviaOldUI from "./components/blog/motivia-old-ui";
import { Card } from "./components/blog/card";
import { codeToHtml } from "shiki";
import { type ReactNode } from "react";

async function CodeBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  // Si ce n'est pas une string (ex: inline code dans pre), on retourne tel quel
  if (typeof children !== "string") {
    return (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    );
  }

  // Extraire le langage du className (format: "language-xxx")
  const lang = className?.replace("language-", "") || "text";

  const html = await codeToHtml(children.trim(), {
    lang,
    theme: "github-dark-dimmed",
  });

  // Extraire juste le contenu du code sans les balises pre/code de Shiki
  const codeContent = html
    .replace(/<pre[^>]*><code[^>]*>/, "")
    .replace(/<\/code><\/pre>/, "");

  return <code dangerouslySetInnerHTML={{ __html: codeContent }} />;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    MotiviaOldUI,
    Card,
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
    // Inline code (ex: `code`)
    code: ({ children, className }) => {
      // Si c'est un code dans un pre (block code), le pre gère le rendu
      if (className?.startsWith("language-")) {
        return <CodeBlock className={className}>{children}</CodeBlock>;
      }
      // Sinon c'est du inline code
      return (
        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">
          {children}
        </code>
      );
    },
    // Block code (```lang)
    pre: ({ children }) => (
      <pre className="my-6 overflow-x-auto rounded-lg bg-[#22272e] p-4 text-sm max-w-2xl mx-auto font-mono leading-relaxed [&>code]:bg-transparent [&>code]:p-0">
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
