// pictures
import setupPicture from '@/public/pictures/Gr3V6nfWwAAQQrE.jpeg';
import gokuPicture from '@/public/pictures/IMG_1320.jpeg';
import majorquePicture from '@/public/pictures/IMG_1939.jpeg';
import madeira from '@/public/pictures/IMG_3175.jpeg';
import bourgetPicture from '@/public/pictures/IMG_9465.jpeg';
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

export const pictures = [
  {
    id: 1,
    src: bourgetPicture,
    alt: 'Bourget ✈️',
    rotate: 'rotate-2',
  },
  {
    id: 2,
    src: majorquePicture,
    alt: 'Majorque 🚂',
    rotate: '-rotate-2',
  },
  {
    id: 3,
    src: madeira,
    alt: 'Madeira 🇵🇹',
    rotate: 'rotate-2',
  },
  {
    id: 4,
    src: gokuPicture,
    alt: 'Goku 🐈',
    rotate: '-rotate-2',
  },
  {
    id: 5,
    src: setupPicture,
    alt: 'Setup 🖥️',
    rotate: 'rotate-2',
  },
];

export const skillsIcons = [
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
];
