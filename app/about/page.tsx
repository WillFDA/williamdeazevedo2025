import Image from "next/image";
import ProjectLink from "@/components/project-link";
import { pictures } from "@/data/picturesandicons";
import motivai from "@/public/motivai-logo.png";
import william from "@/public/pictures/william-low.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Développeur front-end avec compétences full stack. Du design graphique au développement web, 2 ans d'expérience en React, Next.js, TypeScript et Node.js.",
  openGraph: {
    title: "À propos | William De Azevedo",
    description:
      "Développeur front-end avec compétences full stack. 2 ans d'expérience en React, Next.js et TypeScript.",
  },
  alternates: {
    canonical: "https://williamdeazevedo.fr/about",
  },
};

export default function About() {
  return (
    <>
      {/* Section À propos */}
      <div className="flex flex-col gap-12 py-8 lg:gap-16 lg:max-w-2xl max-w-xl px-4 mx-auto w-full">
        <section className="fade-up [--animation-delay:200ms]">
          <div className="mb-3 flex flex-col gap-1">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-700">
              A propos de moi
            </h2>
            <p className="text-gray-600">Mon histoire et ambitions</p>
          </div>
          <div className="flex flex-col gap-4 text-gray-600">
            <p className="fade-up [--animation-delay:300ms]">
              Développeur front-end de 27 ans basé en Île-de-France, avec une
              approche full stack. Mon parcours atypique dans l&apos;infographie
              (3D, motion design, graphisme) m&apos;a donné un{" "}
              <span className="text-gray-900 font-medium">
                oeil aiguisé pour le design
              </span>{" "}
              et une sensibilité particulière pour l&apos;expérience
              utilisateur.
            </p>
            <p className="fade-up [--animation-delay:400ms]">
              En 2022, j&apos;ai fait le choix de me reconvertir dans le
              développement web pour{" "}
              <span className="text-gray-900 font-medium">
                donner vie à mes propres projets
              </span>
              . Après ma formation chez OpenClassrooms et 2 ans
              d&apos;alternance en tant que développeur JavaScript React,
              j&apos;ai acquis une maîtrise solide de l&apos;écosystème moderne
              du web.
            </p>
            <p className="fade-up [--animation-delay:500ms]">
              Aujourd&apos;hui, je développe des applications complètes : du
              front-end React/Next.js au back-end avec Prisma et les API, en
              passant par l&apos;authentification et le déploiement CI/CD. Je
              suis à la recherche d&apos;opportunités pour{" "}
              <span className="text-gray-900 font-medium">
                contribuer à des produits ambitieux
              </span>{" "}
              au sein d&apos;équipes innovantes.
            </p>
          </div>
        </section>
      </div>

      {/* Section Compétences - titre en 2xl, cartes en 3xl */}
      <section className="fade-up [--animation-delay:600ms]">
        <div className="lg:max-w-2xl max-w-xl mx-auto px-4 mb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-700">
              Compétences
            </h2>
            <p className="text-gray-600">
              Ma stack technique pour créer des produits complets
            </p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4">
          <div className="group/skills grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:border-gray-200 group-hover/skills:[&:not(:hover)]:opacity-50">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                  <svg
                    className="size-[18px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">Front-end</h4>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                React, Next.js, TypeScript, Tailwind CSS, Zustand, Tanstack
                Query
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:border-gray-200 group-hover/skills:[&:not(:hover)]:opacity-50">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-green-50 text-green-500">
                  <svg
                    className="size-[18px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">Back-end</h4>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Node.js, Prisma, PostgreSQL, REST API, Better Auth
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:border-gray-200 group-hover/skills:[&:not(:hover)]:opacity-50">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                  <svg
                    className="size-[18px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">Outils & DevOps</h4>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Git, CI/CD, Vercel, Docker, Figma
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:border-gray-200 group-hover/skills:[&:not(:hover)]:opacity-50">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
                  <svg
                    className="size-[18px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">IA & Innovation</h4>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Vercel AI SDK, OpenAI, Claude, Prompt Engineering
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Photos - full width */}
      <section className="flex items-center justify-center gap-2 overflow-auto px-2 py-10 md:gap-8 md:px-8 lg:py-16">
        {pictures.map((picture) => (
          <div
            className={`group aspect-[9/10] w-44 overflow-hidden rounded-md bg-zinc-100 sm:w-72 md:rounded-xl lg:rounded-2xl ${picture.rotate} relative transition-all duration-300 ease-in-out`}
            key={picture.id}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex items-center justify-center rounded-xl bg-black/70 px-4 py-1 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
              <span className="text-white text-xl">{picture.alt}</span>
            </div>
            <Image
              alt={picture.alt}
              className="h-full w-full object-cover"
              fill
              loading="lazy"
              placeholder="blur"
              sizes="(max-width: 640px) 176px, (max-width: 768px) 288px, 288px"
              src={picture.src}
            />
          </div>
        ))}
      </section>

      {/* Section Projets */}
      <div className="flex flex-col gap-12 pb-8 lg:gap-16 lg:max-w-2xl max-w-xl px-4 mx-auto w-full">
        <section className="fade-up [--animation-delay:700ms]">
          <div className="mb-6 flex flex-col gap-1">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-700">
              Projets
            </h2>
            <p className="text-gray-600">
              Des projets complets, du design au déploiement
            </p>
          </div>
          <div className="group/projects flex flex-col gap-4">
            <ProjectLink
              description="Développement en solo d'un SaaS de génération de lettres de motivation par IA avec Next.js. Maîtrise complète de la stack : SSR, Better Auth, Prisma, shadcn/ui et intégration de Vercel AI SDK permettant le choix du modèle d'IA. Gestion end-to-end du projet incluant architecture, CI/CD, environnements multiples et déploiements versionnés."
              href="https://motivai.fr"
              image={motivai}
              technologies={[
                "NextJS",
                "TypeScript",
                "Prisma",
                "Better Auth",
                "AI",
                "CI / CD",
              ]}
              title="Motivai - Créateur de lettre de motivation"
            />
            <ProjectLink
              description="Portfolio minimaliste et efficace avec blog intégré en MDX. Un espace pour partager mes apprentissages et expérimenter de nouvelles technologies."
              href="https://github.com/WillFDA/williamdeazevedo2025"
              image={william}
              technologies={["NextJS", "TypeScript", "MDX"]}
              title="Mon portfolio - 2025"
            />
          </div>
        </section>
      </div>
    </>
  );
}
