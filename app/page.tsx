import Image from "next/image";
import HoverTooltip from "@/components/hover-tooltip";
import { skillsIcons } from "@/data/picturesandicons";
import william from "@/public/pictures/william-low.png";

export default function Home() {
  return (
    <main className="flex flex-col gap-10 py-10 lg:max-w-2xl max-w-xl px-4 mx-auto w-full grow">
      {/* Hero */}
      <section className="fade-up flex flex-col gap-4 [--animation-delay:200ms]">
        <div className="flex items-center gap-3">
          <Image
            alt="Photo de profil"
            className="size-12 rounded-full"
            height={48}
            src={william}
            width={48}
            priority
          />
          <div>
            <h1 className="text-lg font-medium text-gray-900">
              William De Azevedo
            </h1>
            <p className="text-sm text-gray-600">
              Développeur Front-end
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Développeur front-end avec compétences full stack. Passionné par
          l&apos;IA et la création de produits complets de A à Z.
        </p>
        <p className="text-sm text-gray-600">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-green-500" />
            Disponible pour un CDI ou missions freelance
          </span>
        </p>
        <p className="text-sm text-gray-600">
          <a
            className="underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-900"
            href="mailto:william.ferreirapro@gmail.com"
          >
            Email
          </a>
          {", "}
          <a
            className="underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-900"
            href="https://github.com/WillFDA"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {", "}
          <a
            className="underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-900"
            href="https://www.linkedin.com/in/william-de-azevedo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          {", "}
          <a
            className="underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-900"
            href="https://www.malt.fr/profile/williamferreiradeazevedo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Malt
          </a>
          {" et "}
          <a
            className="underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-900"
            href="https://t9mucy7hbqrvpht0.public.blob.vercel-storage.com/cv-12-12-2025-R.pdf"
            download
            rel="noopener"
          >
            CV
          </a>
          .
        </p>
      </section>

      {/* Skills */}
      <section className="fade-up grid w-full grid-cols-5 grid-rows-2 gap-2 [--animation-delay:400ms]">
        {skillsIcons.map((icon, index) => (
          <HoverTooltip item={icon} key={`${icon.alt + index}`}>
            <div className="group/icon flex aspect-square items-center justify-center grayscale transition-all duration-300 hover:grayscale-0">
              <Image
                alt={icon.alt}
                className="max-h-[40px] max-w-[40px] lg:max-h-[50px] lg:max-w-[50px]"
                height={50}
                src={icon.src}
                width={50}
              />
            </div>
          </HoverTooltip>
        ))}
      </section>

      {/* Expérience */}
      <section className="fade-up flex flex-col gap-2 [--animation-delay:500ms]">
        <h2 className="text-sm text-gray-400">Expérience · 2 ans</h2>
        <div className="flex flex-col gap-1">
          <a
            className="group flex items-baseline gap-1 text-sm text-gray-600 transition-colors hover:text-gray-900"
            href="https://susu.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Susu · Développeur Front-end</span>
            <span className="dot-leaders min-w-4 flex-1" />
            <span className="text-gray-400 group-hover:text-gray-600">2024 - 2025</span>
          </a>
          <a
            className="group flex items-baseline gap-1 text-sm text-gray-600 transition-colors hover:text-gray-900"
            href="https://komin.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Komin · Développeur Front-end</span>
            <span className="dot-leaders min-w-4 flex-1" />
            <span className="text-gray-400 group-hover:text-gray-600">2023 - 2024</span>
          </a>
        </div>
      </section>

      {/* Projets */}
      <section className="fade-up flex flex-col gap-2 [--animation-delay:600ms]">
        <h2 className="text-sm text-gray-400">Projets</h2>
        <div className="flex flex-col gap-1">
          <a
            className="group flex items-baseline gap-1 text-sm text-gray-600 transition-colors hover:text-gray-900"
            href="https://motivai.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Motivai</span>
            <span className="dot-leaders min-w-4 flex-1" />
            <span className="text-gray-400 group-hover:text-gray-600">SaaS lettres de motivation IA</span>
          </a>
          <a
            className="group flex items-baseline gap-1 text-sm text-gray-600 transition-colors hover:text-gray-900"
            href="https://github.com/WillFDA/williamdeazevedo2025"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Portfolio 2025</span>
            <span className="dot-leaders min-w-4 flex-1" />
            <span className="text-gray-400 group-hover:text-gray-600">Ce site</span>
          </a>
        </div>
      </section>

      {/* Ce que je recherche */}
      <section className="fade-up flex flex-col gap-2 [--animation-delay:700ms]">
        <h2 className="text-sm text-gray-400">Ce que je recherche</h2>
        <p className="text-sm text-gray-600">
          CDI ou missions freelance · Startup/Scale-up · Paris/Remote
        </p>
      </section>
    </main>
  );
}
