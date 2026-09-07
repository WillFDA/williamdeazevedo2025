import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { codeToHtml } from "shiki";
import { Card } from "./components/blog/card";
import MotiviaOldUI from "./components/blog/motivia-old-ui";

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
    a: ({ href, children }) => (
      <Link
        className="underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-900"
        href={href || "#"}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        target={href?.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </Link>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mx-auto my-6 max-w-2xl border-gray-200 border-l-2 pl-4 text-gray-500 text-sm italic">
        {children}
      </blockquote>
    ),
    Card,
    // Inline code (ex: `code`)
    code: ({ children, className }) => {
      // Si c'est un code dans un pre (block code), le pre gère le rendu
      if (className?.startsWith("language-")) {
        return <CodeBlock className={className}>{children}</CodeBlock>;
      }
      // Sinon c'est du inline code
      return (
        <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-gray-900 text-xs">
          {children}
        </code>
      );
    },
    em: ({ children }) => <em className="italic">{children}</em>,
    h1: ({ children }) => (
      <h1 className="mx-auto mt-8 mb-4 max-w-2xl font-bold text-gray-900 text-xl first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mx-auto mt-8 mb-3 max-w-2xl font-bold text-gray-900 text-lg">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mx-auto mt-6 mb-2 max-w-2xl font-semibold text-base text-gray-900">
        {children}
      </h3>
    ),
    hr: () => <hr className="mx-auto my-8 max-w-2xl border-gray-200" />,
    img: ({ src, alt }) => (
      <span className="mx-auto my-6 block max-w-2xl">
        <Image
          alt={alt || ""}
          className="rounded-lg"
          height={450}
          src={src || ""}
          width={800}
        />
      </span>
    ),
    li: ({ children }) => <li>{children}</li>,
    MotiviaOldUI,
    ol: ({ children }) => (
      <ol className="mx-auto mb-4 max-w-2xl list-decimal space-y-1 pl-5 text-gray-600 text-sm">
        {children}
      </ol>
    ),
    p: ({ children }) => (
      <p className="mx-auto mb-4 max-w-2xl text-gray-600 text-sm leading-relaxed">
        {children}
      </p>
    ),
    // Block code (```lang)
    pre: ({ children }) => (
      <pre className="mx-auto my-6 max-w-2xl overflow-x-auto rounded-lg bg-[#22272e] p-4 font-mono text-xs leading-relaxed [&>code]:bg-transparent [&>code]:p-0">
        {children}
      </pre>
    ),
    strong: ({ children }) => (
      <strong className="font-medium text-gray-900">{children}</strong>
    ),
    ul: ({ children }) => (
      <ul className="mx-auto mb-4 max-w-2xl list-disc space-y-1 pl-5 text-gray-600 text-sm">
        {children}
      </ul>
    ),
    ...components,
  };
}
