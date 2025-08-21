import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

type ProjectLinkProps = {
  href: string;
  title: string;
  description: string;
  image: StaticImageData;
  technologies?: string[];
  target?: '_blank' | '_self';
  variant?: 'detailed' | 'simple';
  groupName?: string;
  rightContent?: string;
  imageClassName?: string;
  imageSize?: { width: number; height: number };
};

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
  const groupHoverClass = `group-hover/${groupName}:[&:not(:hover)]:opacity-30`;

  return (
    <Link
      className={`flex justify-between rounded-xl p-2 transition-all duration-300 ease-in-out hover:bg-gray-50 lg:p-4 ${groupHoverClass}`}
      href={href}
      target={target}
    >
      <div className={'flex items-center gap-4'}>
        <Image
          alt={title}
          className={imageClassName}
          height={imageSize.height}
          src={image}
          width={imageSize.width}
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
            <div className="mt-3 flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <span
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm leading-tight"
                  key={tech}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {rightContent && (
        <span className="font-medium text-gray-500">{rightContent}</span>
      )}
    </Link>
  );
}
