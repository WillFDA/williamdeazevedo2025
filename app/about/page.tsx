import Image from 'next/image';
import ProjectLink from '@/components/project-link';
import { pictures } from '@/data/picturesandicons';
import motivai from '@/public/motivai-logo.png';
import william from '@/public/pictures/william.png';

export default function About() {
  return (
    <>
      <section className="mx-auto mt-20 flex max-w-2xl flex-col gap-8 px-4 lg:flex-row">
        <h2 className="fade-up mb-auto font-medium text-gray-500 [--animation-delay:300ms]">
          A propos de moi
        </h2>
        <div className="flex w-full flex-col gap-4">
          <span className="fade-up [--animation-delay:200ms]">
            Mon histoire et ambitions
          </span>
          <div className="group/work flex flex-col gap-4 text-gray-500 text-md">
            <span className="fade-up [--animation-delay:300ms]">
              Je suis un développeur front-end basé en Île-de-France, j&apos;ai
              27 ans. Je suis dans le monde de l&apos;infographie depuis très
              jeune.
              <br />
              J&apos;ai commencé par de la 3D, du motion design, puis du
              graphisme classique (cartes de visite, logos, affiches). Cette
              expérience m&apos;a donné une grande sensibilité artistique et ce
              parcours s&apos;est poursuivi jusqu&apos;en 2022, où la décision
              de me lancer dans le développement web s&apos;est imposée pour
              donner vie à des projets.
            </span>
            <span className="fade-up [--animation-delay:500ms]">
              Ma formation d&apos;intégrateur web chez OpenClassrooms est
              maintenant terminée avec l&apos;obtention du diplôme. Je suis
              actuellement en fin de formation de développeur JavaScript React
              après 2 ans d&apos;alternance.
            </span>
            <span className="fade-up [--animation-delay:700ms]">
              Je suis maintenant à la recherche d&apos;un poste en tant que
              développeur front-end junior pour continuer à contribuer à des
              projets stimulants et approfondir mes compétences au sein
              d&apos;entreprises innovantes
            </span>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center gap-2 overflow-auto px-2 py-10 md:gap-8 md:px-8 lg:py-20">
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
              src={picture.src}
            />
          </div>
        ))}
      </section>
      <section className="mx-auto flex max-w-2xl flex-col gap-8 px-4 lg:px-0">
        <div className="flex flex-col gap-8 lg:flex-row">
          <h2 className="mb-auto font-medium text-gray-500">Projets</h2>
          <span>
            Plus de détails des projets que j&apos;ai réalisés lors de mes
            alternances ou simplement des projets personnels que j&apos;ai menés
            du design à l&apos;intégration
          </span>
        </div>
        <div className="group/projects flex flex-col gap-8 lg:gap-4">
          <ProjectLink
            description="Développement en solo d'un SaaS de génération de lettres de motivation par IA avec Next.js. Maîtrise complète de la stack : SSR, Better Auth, Prisma, shadcn/ui et intégration de Vercel AI SDK permettant le choix du modèle d'IA. Gestion end-to-end du projet incluant architecture, CI/CD, environnements multiples et déploiements versionnés. Une expérience formatrice sur les défis techniques et organisationnels d'un projet complet."
            href="https://motivai.fr"
            image={motivai}
            technologies={[
              'NextJS',
              'TypeScript',
              'Prisma',
              'Better Auth',
              'AI',
              'CI / CD',
            ]}
            title="Motivai - Créateur de lettre de motivation"
          />
          <ProjectLink
            description="Pour ce portfolio, l'objectif était différent des anciens. Je voulais créer un portfolio simple, efficace, concis. J'avais aussi pour objectif de commencer à créer des posts de blog, pour apprendre en partageant et pour avoir un endroit où expérimenter et partager."
            href="https://github.com/WillFDA/williamdeazevedo2025"
            image={william}
            technologies={['NextJS', 'TypeScript', 'MDX']}
            title="Mon portfolio - 2025"
          />
        </div>
      </section>
    </>
  );
}
