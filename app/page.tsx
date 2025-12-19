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
      <div className="flex flex-col gap-12 py-8 lg:gap-12 lg:max-w-2xl max-w-xl px-4 mx-auto w-full">
        <section className="flex flex-col gap-4 justify-center">
          <div className="w-full flex gap-2">
            <Image
              alt="Photo de profil"
              className="fade-up size-30 rounded-full [--animation-delay:200ms]"
              height={120}
              src={william}
              width={120}
            />
            <div className="flex flex-col gap-2 justify-center">
              <h1 className="fade-up font-display font-normal text-3xl [--animation-delay:200ms] lg:text-6xl italic leading-none">
                William De Azevedo
              </h1>
              <h2 className="fade-up font-display font-normal text-2xl [--animation-delay:200ms] lg:text-4xl italic leading-none ">
                Développeur Front end
              </h2>
            </div>
          </div>
          <div className="flex flex-col text-center lg:text-start gap-4">
            <p className="fade-up text-gray-500 [--animation-delay:400ms] italic">
              Développeur front end, enthousiaste de l&apos;IA. Je suis
              passionné par la création de produits qui aident les gens.
            </p>
            <div className="fade-up mx-auto flex items-center gap-2 [--animation-delay:400ms] lg:ml-0">
              <div className="relative flex size-4 items-center justify-center">
                <div className="absolute size-4 animate-ping rounded-full bg-green-400/40" />
                <div className="relative size-1.5 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-500">Actuellement disponible</span>
            </div>
            <div className="fade-up flex gap-2 mx-auto lg:ml-0 [--animation-delay:600ms]">
              <a
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
                href="https://www.linkedin.com/in/william-de-azevedo/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>
              <a
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
                href="https://github.com/WillFDA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Github
              </a>
              <a
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
                href="https://t9mucy7hbqrvpht0.public.blob.vercel-storage.com/cv-12-12-2025-R.pdf"
                download
                rel="noopener"
              >
                <svg className="hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                CV
              </a>
            </div>
          </div>
        </section>
        <section className="group mx-auto -my-3 grid w-full max-w-2xl grid-cols-5 grid-rows-2 flex-wrap items-center justify-center gap-2">
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
        </section>
        <section className="flex max-w-2xl flex-col gap-4 px-4 lg:flex-row lg:gap-8 lg:px-0">
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
        <section className="flex max-w-2xl flex-col gap-4 px-4 lg:flex-row lg:gap-8 lg:px-0">
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
      </div>
    </>
  );
}
