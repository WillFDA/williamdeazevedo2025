import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface ProjectLinkProps {
  href: string;
  title: string;
  description: string;
  image: StaticImageData;
  technologies: string[];
  target?: '_blank' | '_self';
}

export default function ProjectLink({
  href,
  title,
  description,
  image,
  technologies,
  target = '_blank',
}: ProjectLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      className="flex justify-between p-4 hover:bg-gray-50 transition-all duration-300 ease-in-out rounded-xl group-hover/projects:[&:not(:hover)]:opacity-30"
    >
      <div className="flex gap-4 items-start">
        <Image
          src={image}
          alt={title}
          width={52}
          height={52}
          className="rounded-full"
        />
        <div className="flex flex-col justify-center gap-1">
          <span className="text-gray-800 font-semibold text-md leading-tight">
            {title}
          </span>
          <span className="text-gray-600 leading-tight text-sm">
            {description}
          </span>
          <div className="flex flex-wrap mt-3 gap-3">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="border bg-gray-100 px-3 py-1 leading-tight rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
