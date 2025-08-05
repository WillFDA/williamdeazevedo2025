'use client';
import { skillsIcons } from '@/app/data/picturesandicons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';

export default function SkillIcons() {
  return (
    <>
      {skillsIcons.map((icon, index) => (
        <Tooltip key={index + icon.alt}>
          <TooltipTrigger asChild>
            <div
              key={index + icon.alt}
              className=" aspect-square size-25 border border-gray-200 border-t-0 border-b-0 flex items-center justify-center grayscale hover:grayscale-0"
            >
              <Image src={icon.src} alt={icon.alt} width={50} height={50} />
            </div>
          </TooltipTrigger>
          <TooltipContent>{icon.alt}</TooltipContent>
        </Tooltip>
      ))}
    </>
  );
}
