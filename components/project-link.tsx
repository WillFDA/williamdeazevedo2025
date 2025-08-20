import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

enum GroupHoverClasses {
  work = 'group-hover/work:[&:not(:hover)]:opacity-30',
  projects = 'group-hover/projects:[&:not(:hover)]:opacity-30',
}

type GroupName = keyof typeof GroupHoverClasses;

interface ProjectLinkProps {
  href: string;
  title: string;
  description: string;
  image: StaticImageData;
  technologies?: string[];
  target?: '_blank' | '_self';
  variant?: 'detailed' | 'simple';
  groupName?: GroupName;
  rightContent?: string;
  imageClassName?: string;
  imageSize?: { width: number; height: number };
}

export default function ProjectLink({
  href,
  title,
  description,
  image,
  technologies,
  target = '_blank',
  variant = 'detailed',
  groupName = 'projects',
  rightContent,
  imageClassName = 'rounded-full',
  imageSize = { width: 52, height: 52 },
}: ProjectLinkProps) {
  const groupHoverClass = GroupHoverClasses[groupName];

  return (
    <Link
      href={href}
      target={target}
      className={`flex justify-between p-2 lg:p-4 hover:bg-gray-50 transition-all duration-300 ease-in-out rounded-xl ${groupHoverClass}`}
    >
      <div className={`flex gap-4 items-center`}>
        <Image
          className={imageClassName}
          src={image}
          alt={title}
          width={imageSize.width}
          height={imageSize.height}
        />
        <div className="flex flex-col justify-center gap-1">
          <span
            className={`text-gray-800 font-${
              variant === 'detailed' ? 'semibold' : 'medium'
            } text-${variant === 'detailed' ? 'md' : 'lg'} leading-tight`}
          >
            {title}
          </span>
          <span
            className={`text-gray-600 leading-tight ${
              variant === 'detailed' ? 'text-sm' : 'font-medium'
            }`}
          >
            {description}
          </span>
          {variant === 'detailed' && technologies && (
            <div className="flex flex-wrap mt-3 gap-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className=" bg-gray-100 px-3 py-1 leading-tight rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {rightContent && (
        <span className="text-gray-500 font-medium">{rightContent}</span>
      )}
    </Link>
  );
}
