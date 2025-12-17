import Image from "next/image";
import HoverTooltip from "@/components/hover-tooltip";
import ProjectLink from "@/components/project-link";
import { skillsIcons } from "@/data/picturesandicons";
import kominLogo from "@/public/komin-logo.png";
import motivai from "@/public/motivai-logo.png";
import william from "@/public/pictures/william-low.jpg";
import susuLogo from "@/public/susu-logo.png";

export default function Home() {
  return (
    <>
      <section className="mx-auto w-full max-w-4xl p-4 lg:mt-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 lg:flex-row lg:items-start">
          <Image
            alt="Photo de profil"
            className="fade-up size-20 rounded-full [--animation-delay:200ms]"
            height={80}
            src={william}
            width={80}
          />
          <div className="flex flex-col text-center lg:text-start">
            <h1 className="fade-up mb-3 font-[family-name:var(--font-instrument-serif)] text-3xl [--animation-delay:200ms] lg:text-4xl">
              Hello moi c&apos;est William <br />
              Développeur Front end
            </h1>
            <p className="fade-up mb-4 text-gray-500 text-sm [--animation-delay:400ms] lg:text-md">
              Développeur front end, enthousiaste de l&apos;IA. Je suis
              passionné par la création de produits qui aident les gens.
            </p>
            <div className="fade-up mx-auto mb-8 flex items-center gap-2 [--animation-delay:400ms] lg:ml-0">
              <div className="relative flex size-4 items-center justify-center">
                <div className="absolute size-4 animate-ping rounded-full bg-green-400/40" />
                <div className="relative size-1.5 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-500">
                Actuellement à la recherche d&apos;un CDI
              </span>
            </div>
            <a
              className="fade-up mx-auto w-fit cursor-pointer rounded-md border border-gray-200 bg-white px-8 py-3 text-gray-800 text-sm transition-all duration-150 ease-in-out [--animation-delay:600ms] hover:border-gray-300 hover:bg-gray-50 lg:ml-0"
              download
              href="https://t9mucy7hbqrvpht0.public.blob.vercel-storage.com/cv-12-12-2025-R.pdf"
              rel="noopener"
            >
              Voir mon CV
            </a>
          </div>
        </div>
      </section>
      <div className="relative mt-12 flex w-full items-center justify-between bg-white lg:mt-20 lg:mb-25">
        <div className="group mx-auto grid w-full max-w-2xl grid-cols-5 grid-rows-2 flex-wrap items-center justify-center gap-2">
          {skillsIcons.map((icon, index) => (
            <HoverTooltip item={icon} key={`${icon.alt + index}`}>
              <div className="col-span-1 row-span-1 flex aspect-square items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 lg:size-25 group-hover:[&:not(:hover)]:opacity-30">
                <Image
                  alt={icon.alt}
                  className="max-h-[50px] max-w-[50px]"
                  height={50}
                  src={icon.src}
                  width={50}
                />
              </div>
            </HoverTooltip>
          ))}
        </div>
      </div>
      <section className="mx-auto mt-15 flex max-w-2xl flex-col gap-4 px-4 lg:mt-20 lg:flex-row lg:gap-8 lg:px-0">
        <h2 className="mb-auto font-medium text-gray-500">Travail</h2>
        <div className="flex w-full flex-col gap-4">
          <span className="hidden lg:block">+ 2 ans d&apos;expérience</span>
          <div className="group/work flex flex-col gap-4">
            <ProjectLink
              description="Susu"
              groupName="work"
              href="https://susu.fr"
              image={susuLogo}
              imageClassName=""
              imageSize={{ width: 40, height: 40 }}
              rightContent="2024 - 2025"
              title="Développeur Front end"
              variant="simple"
            />
            <ProjectLink
              description="Komin"
              groupName="work"
              href="https://komin.io"
              image={kominLogo}
              imageClassName=""
              imageSize={{ width: 40, height: 40 }}
              rightContent="2023 - 2024"
              title="Développeur Front end"
              variant="simple"
            />
          </div>
        </div>
      </section>
      <section className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 px-4 lg:mt-20 lg:flex-row lg:gap-8 lg:px-0">
        <h2 className="mb-auto font-medium text-gray-500">Projets</h2>
        <div className="flex w-full flex-col gap-4">
          <span className="hidden lg:block">
            J&apos;aime développer des projets en solo ou collaboratif
          </span>
          <div className="group/projects flex flex-col gap-4">
            <ProjectLink
              description="Un SaaS de création de lettre de motivation avec IA"
              href="https://motivai.fr"
              image={motivai}
              title="Motivai"
              variant="simple"
            />
            <ProjectLink
              description="Le site actuel que vous êtes entrain de visiter"
              href="https://github.com/WillFDA/williamdeazevedo2025"
              image={william}
              title="Mon site"
              variant="simple"
            />
          </div>
        </div>
      </section>
    </>
  );
}
