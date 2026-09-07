// pictures

import type { StaticImageData } from "next/image";
import figmaIcon from "@/public/icons/figma-icon.svg";
// skills pictures
import materialuiIcon from "@/public/icons/material-ui.svg";
import nextIcon from "@/public/icons/next.svg"; // done
import prismaIcon from "@/public/icons/prisma.svg"; // done
import reactIcon from "@/public/icons/react-icon.svg"; // done
import tanstackQueryIcon from "@/public/icons/react-query.svg"; // done
import shadcnIcon from "@/public/icons/shadcn-ui.svg"; // done
import tailwindIcon from "@/public/icons/tailwindcss.svg"; // done
import typescriptIcon from "@/public/icons/typescript.svg"; // done
import zustandIcon from "@/public/icons/zustand.svg"; // done
// certifications
import learnJsCertificate from "@/public/learn-js-jade.png";
import ocDevCertificate from "@/public/oc-dev-jav-react-2025.png";
import ocIntegCertificate from "@/public/oc-integ-web-2023.png";
import bourgetPicture from "@/public/pictures/bourget-opti.jpg";
import setupPicture from "@/public/pictures/desktop-opti.jpg";
import gokuPicture from "@/public/pictures/goku-opti.jpg";
import madeira from "@/public/pictures/madere-opti.jpg";
import majorquePicture from "@/public/pictures/majorque-opti.jpg";

export interface Pictures {
  alt: string;
  id: number;
  rotate: string;
  src: StaticImageData;
}

export interface SkillsIcons {
  alt: string;
  src: string;
}

export const pictures: Pictures[] = [
  {
    alt: "Bourget ✈️",
    id: 1,
    rotate: "rotate-2 fade-up [--animation-delay:400ms]",
    src: bourgetPicture,
  },
  {
    alt: "Majorque 🚂",
    id: 2,
    rotate: "-rotate-2 fade-up [--animation-delay:600ms]",
    src: majorquePicture,
  },
  {
    alt: "Madeira 🇵🇹",
    id: 3,
    rotate: "rotate-2 fade-up [--animation-delay:800ms]",
    src: madeira,
  },
  {
    alt: "Goku 🐈",
    id: 4,
    rotate: "-rotate-2 md:block hidden fade-up [--animation-delay:1000ms] ",
    src: gokuPicture,
  },
  {
    alt: "Setup 🖥️",
    id: 5,
    rotate: "rotate-2 md:block hidden fade-up [--animation-delay:1200ms]",
    src: setupPicture,
  },
];

export interface Certification {
  certificate: StaticImageData;
  id: number;
  issuer: string;
  name: string;
  url?: string;
  year: string;
}

export const certifications: Certification[] = [
  {
    certificate: learnJsCertificate,
    id: 1,
    issuer: "Jade Joubran",
    name: "Learn JavaScript",
    url: "https://learnjavascript.online",
    year: "2024",
  },
  {
    certificate: ocIntegCertificate,
    id: 2,
    issuer: "OpenClassrooms",
    name: "Developpeur integrateur web",
    url: "https://openclassrooms.com",
    year: "2023",
  },
  {
    certificate: ocDevCertificate,
    id: 3,
    issuer: "OpenClassrooms",
    name: "Developpeur concepteur logiciel",
    url: "https://openclassrooms.com",
    year: "2025",
  },
];

export const skillsIcons: SkillsIcons[] = [
  {
    alt: "React",
    src: reactIcon,
  },
  {
    alt: "Next.js",
    src: nextIcon,
  },
  {
    alt: "Tailwind CSS",
    src: tailwindIcon,
  },
  {
    alt: "Typescript",
    src: typescriptIcon,
  },
  {
    alt: "Tanstack Query",
    src: tanstackQueryIcon,
  },
  {
    alt: "Zustand",
    src: zustandIcon,
  },
  {
    alt: "Shadcn",
    src: shadcnIcon,
  },
  {
    alt: "Prisma",
    src: prismaIcon,
  },
  {
    alt: "Material UI",
    src: materialuiIcon,
  },
  {
    alt: "Figma",
    src: figmaIcon,
  },
];
