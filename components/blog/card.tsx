import Image from "next/image";

interface CardProps {
  desc: string;
  image?: string;
  link: string;
  title: string;
}

/**
 * Card component for external link previews in MDX blog posts.
 * Displays a clickable card with title, description, and optional image.
 *
 * @example
 * ```mdx
 * <Card
 *   title="Next.js Documentation"
 *   desc="The React Framework for Production"
 *   link="https://nextjs.org/docs"
 *   image="https://nextjs.org/static/twitter-cards/home.jpg"
 * />
 * ```
 */
export function Card({ title, desc, link, image }: CardProps) {
  return (
    <a
      className="mt-7 block rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-400 hover:bg-gray-50"
      href={link}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="flex gap-4">
        {image && (
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
            <Image
              alt=""
              className="object-cover"
              fill
              src={image}
              unoptimized={image.startsWith("http")}
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="mt-1 line-clamp-2 text-gray-600 text-sm">{desc}</p>
        </div>
      </div>
    </a>
  );
}
