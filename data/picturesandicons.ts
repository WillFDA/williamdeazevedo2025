// pictures

import type { StaticImageData } from 'next/image';
import figmaIcon from '@/public/icons/figma-icon.svg';
// skills pictures
import materialuiIcon from '@/public/icons/material-ui.svg';
import nextIcon from '@/public/icons/next.svg'; // done
import prismaIcon from '@/public/icons/prisma.svg'; // done
import reactIcon from '@/public/icons/react-icon.svg'; // done
import tanstackQueryIcon from '@/public/icons/react-query.svg'; // done
import shadcnIcon from '@/public/icons/shadcn-ui.svg'; // done
import tailwindIcon from '@/public/icons/tailwindcss.svg'; // done
import typescriptIcon from '@/public/icons/typescript.svg'; // done
import zustandIcon from '@/public/icons/zustand.svg'; // done
import bourgetPicture from '@/public/pictures/bourget-opti.jpg';
import setupPicture from '@/public/pictures/desktop-opti.jpg';
import gokuPicture from '@/public/pictures/goku-opti.jpg';
import madeira from '@/public/pictures/madere-opti.jpg';
import majorquePicture from '@/public/pictures/majorque-opti.jpg';

export interface Pictures {
  id: number;
  src: StaticImageData;
  alt: string;
  rotate: string;
}

export interface SkillsIcons {
  src: string;
  alt: string;
}

export const pictures: Pictures[] = [
  {
    id: 1,
    src: bourgetPicture,
    alt: 'Bourget ✈️',
    rotate: 'rotate-2 fade-up [--animation-delay:400ms]',
  },
  {
    id: 2,
    src: majorquePicture,
    alt: 'Majorque 🚂',
    rotate: '-rotate-2 fade-up [--animation-delay:600ms]',
  },
  {
    id: 3,
    src: madeira,
    alt: 'Madeira 🇵🇹',
    rotate: 'rotate-2 fade-up [--animation-delay:800ms]',
  },
  {
    id: 4,
    src: gokuPicture,
    alt: 'Goku 🐈',
    rotate: '-rotate-2 md:block hidden fade-up [--animation-delay:1000ms] ',
  },
  {
    id: 5,
    src: setupPicture,
    alt: 'Setup 🖥️',
    rotate: 'rotate-2 md:block hidden fade-up [--animation-delay:1200ms]',
  },
];

export const skillsIcons: SkillsIcons[] = [
  {
    src: reactIcon,
    alt: 'React',
  },
  {
    src: nextIcon,
    alt: 'Next.js',
  },
  {
    src: tailwindIcon,
    alt: 'Tailwind CSS',
  },
  {
    src: typescriptIcon,
    alt: 'Typescript',
  },
  {
    src: tanstackQueryIcon,
    alt: 'Tanstack Query',
  },
  {
    src: zustandIcon,
    alt: 'Zustand',
  },
  {
    src: shadcnIcon,
    alt: 'Shadcn',
  },
  {
    src: prismaIcon,
    alt: 'Prisma',
  },
  {
    src: materialuiIcon,
    alt: 'Material UI',
  },
  {
    src: figmaIcon,
    alt: 'Figma',
  },
];
