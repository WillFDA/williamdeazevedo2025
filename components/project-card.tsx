import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  description: string;
  date: string;
  image: StaticImageData;
  technologies: string[];
  websiteUrl?: string;
  sourceUrl?: string;
  badge?: string;
};

export default function ProjectCard({
  title,
  description,
  date,
  image,
  technologies,
  websiteUrl,
  sourceUrl,
  badge,
}: ProjectCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:border-gray-300">
      {/* Image Preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <Image
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 340px"
          src={image}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-3">
        {/* Title + Date */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <span className="text-xs text-gray-400 shrink-0">{date}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1">
          {technologies.map((tech) => (
            <span
              className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-1.5 pt-1">
          {websiteUrl && (
            <Link
              className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="size-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              Site
            </Link>
          )}
          {sourceUrl && (
            <Link
              className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="size-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Code
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
