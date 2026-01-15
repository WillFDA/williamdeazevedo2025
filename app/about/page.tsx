import Image from "next/image";
import Link from "next/link";
import { pictures } from "@/data/picturesandicons";
import motivai from "@/public/motivai-logo.png";
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
    <main className="flex flex-col gap-16 py-10 lg:max-w-2xl max-w-xl mx-auto px-4 w-full">
      {/* Section Projets */}
      <section className="fade-up flex flex-col gap-8 [--animation-delay:200ms]">
        <div>
          <h2 className="mb-3 text-sm text-gray-400">Projets</h2>
          <p className="text-sm text-gray-600">
            Des projets personnels qui m&apos;ont permis de maîtriser
            l&apos;écosystème moderne du développement web, de l&apos;architecture
            au déploiement.
          </p>
        </div>

        {/* Motivai */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Image
              alt="Motivai"
              className="size-8 rounded-md"
              height={32}
              src={motivai}
              width={32}
            />
            <span className="font-medium text-gray-900">Motivai</span>
          </div>
          <p className="text-sm text-gray-600">
            SaaS de génération de lettres de motivation par IA, développé en solo
            depuis 2024. J&apos;ai conçu l&apos;architecture complète avec{" "}
            <span className="text-gray-900">Next.js</span>,{" "}
            <span className="text-gray-900">Prisma</span> et{" "}
            <span className="text-gray-900">Better Auth</span>. L&apos;intégration
            du <span className="text-gray-900">Vercel AI SDK</span> permet aux
            utilisateurs de choisir leur modèle d&apos;IA. Un projet formateur
            sur les défis d&apos;un produit complet : CI/CD, environnements
            multiples et déploiements versionnés.
          </p>
          <div className="flex gap-2">
            <Link
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              href="https://motivai.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              Website
            </Link>
          </div>
        </div>

        {/* Portfolio */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-md bg-gray-900 text-white text-xs font-medium">
              W
            </div>
            <span className="font-medium text-gray-900">Portfolio 2025</span>
          </div>
          <p className="text-sm text-gray-600">
            Un portfolio minimaliste avec un blog intégré en{" "}
            <span className="text-gray-900">MDX</span>. L&apos;objectif : un
            espace simple et efficace pour partager mes apprentissages et
            expérimenter. Construit avec <span className="text-gray-900">Next.js 16</span>,{" "}
            <span className="text-gray-900">TypeScript</span> et{" "}
            <span className="text-gray-900">Tailwind CSS</span>.
          </p>
          <div className="flex gap-2">
            <Link
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              href="https://williamdeazevedo.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              Website
            </Link>
            <Link
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              href="https://github.com/WillFDA/williamdeazevedo2025"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Source
            </Link>
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section className="fade-up flex flex-col gap-4 [--animation-delay:300ms]">
        <h2 className="text-sm text-gray-400">À propos</h2>
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          <p>
            Développeur front-end de 27 ans basé en Île-de-France, avec une
            approche full stack. Mon parcours atypique dans l&apos;infographie
            (3D, motion design, graphisme) m&apos;a donné un{" "}
            <span className="text-gray-900">œil aiguisé pour le design</span>{" "}
            et une sensibilité particulière pour l&apos;expérience utilisateur.
          </p>
          <p>
            En 2022, j&apos;ai fait le choix de me reconvertir dans le
            développement web pour{" "}
            <span className="text-gray-900">donner vie à mes propres projets</span>.
            Après ma formation chez OpenClassrooms et 2 ans d&apos;alternance en
            tant que développeur JavaScript React, j&apos;ai acquis une maîtrise
            solide de l&apos;écosystème moderne du web.
          </p>
          <p>
            Aujourd&apos;hui, je développe des applications complètes : du
            front-end React/Next.js au back-end avec Prisma et les API. Je suis
            à la recherche d&apos;opportunités pour{" "}
            <span className="text-gray-900">contribuer à des produits ambitieux</span>{" "}
            au sein d&apos;équipes innovantes.
          </p>
        </div>
      </section>

      {/* Section Compétences */}
      <section className="fade-up flex flex-col gap-4 [--animation-delay:400ms]">
        <h2 className="text-sm text-gray-400">Compétences</h2>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-baseline gap-1">
            <span className="text-gray-900">Front-end</span>
            <span className="dot-leaders min-w-4 flex-1" />
            <span className="text-gray-600">React, Next.js, TypeScript, Tailwind</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-gray-900">Back-end</span>
            <span className="dot-leaders min-w-4 flex-1" />
            <span className="text-gray-600">Node.js, Prisma, PostgreSQL, API</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-gray-900">Outils</span>
            <span className="dot-leaders min-w-4 flex-1" />
            <span className="text-gray-600">Git, Vercel, Docker, Figma</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-gray-900">IA</span>
            <span className="dot-leaders min-w-4 flex-1" />
            <span className="text-gray-600">Vercel AI SDK, OpenAI, Claude</span>
          </div>
        </div>
      </section>

      {/* Section Photos */}
      <section className="fade-up flex items-center justify-center gap-2 -mx-4 overflow-auto px-4 md:gap-6 [--animation-delay:500ms]">
        {pictures.map((picture) => (
          <div
            className={`group aspect-[9/10] w-36 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-44 ${picture.rotate} relative transition-all duration-300`}
            key={picture.id}
          >
            <Image
              alt={picture.alt}
              className="h-full w-full object-cover"
              fill
              loading="lazy"
              placeholder="blur"
              sizes="(max-width: 640px) 144px, 176px"
              src={picture.src}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
