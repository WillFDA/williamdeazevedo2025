import ProjectLink from '@/components/project-link';
import { pictures } from '@/data/picturesandicons';
import motivai from '@/public/motivai-logo.png';
import william from '@/public/pictures/william.png';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <section className="flex max-w-2xl mx-auto mt-20 gap-8 ">
        <h2 className="font-medium mb-auto text-gray-500 fade-up [--animation-delay:300ms]">
          A propos de moi
        </h2>
        <div className="flex flex-col gap-4 w-full ">
          <span className="fade-up [--animation-delay:200ms]">
            Mon histoire et ambitions
          </span>
          <div className="group/work flex flex-col gap-4 text-md text-gray-500 ">
            <span className="fade-up [--animation-delay:300ms]">
              Je suis un développeur front-end basé en Île-de-France, j'ai 27
              ans. Je suis dans le monde de l'infographie depuis très jeune.
              <br />
              J'ai commencé par de la 3D, du motion design, puis du graphisme
              classique (cartes de visite, logos, affiches). Cette expérience
              m'a donné une grande sensibilité artistique et ce parcours s'est
              poursuivi jusqu'en 2022, où la décision de me lancer dans le
              développement web s'est imposée pour donner vie à des projets.
            </span>
            <span className="fade-up [--animation-delay:500ms]">
              Ma formation d'intégrateur web chez OpenClassrooms est maintenant
              terminée avec l'obtention du diplôme. Je suis actuellement en fin
              de formation de développeur JavaScript React après 2 ans
              d'alternance.
            </span>
            <span className="fade-up [--animation-delay:700ms]">
              Je suis maintenant à la recherche d'un poste en tant que
              développeur front-end junior pour continuer à contribuer à des
              projets stimulants et approfondir mes compétences au sein
              d'entreprises innovantes
            </span>
          </div>
        </div>
      </section>
      <section className="flex gap-8 py-20 px-8 items-center justify-center">
        {pictures.map((picture, index) => (
          <div
            key={picture.id}
            className={`aspect-[9/10] group w-44 overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl ${
              picture.rotate
            } transition-all duration-300 ease-in-out relative fade-up [--animation-delay:${
              200 + 200 * index
            }ms]`}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-black/70 px-4 py-1 rounded-xl ">
              <span className="text-white text-xl">{picture.alt}</span>
            </div>
            <Image
              src={picture.src}
              alt={picture.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </section>
      <section className="flex flex-col max-w-2xl mx-auto  gap-8 ">
        <div className="flex gap-8">
          <h2 className="font-medium mb-auto text-gray-500">Projets</h2>
          <span>
            Plus de détails des projets que j'ai réalisés lors de mes
            alternances ou simplement des projets personnels que j'ai menés du
            design à l'intégration
          </span>
        </div>
        <div className="group/projects flex flex-col gap-4">
          <ProjectLink
            href="https://motivai.fr"
            title="Motivai - Créateur de lettre de motivation"
            description="Développement en solo d'un SaaS de génération de lettres de motivation par IA avec Next.js. Maîtrise complète de la stack : SSR, Better Auth, Prisma, shadcn/ui et intégration de Vercel AI SDK permettant le choix du modèle d'IA. Gestion end-to-end du projet incluant architecture, CI/CD, environnements multiples et déploiements versionnés. Une expérience formatrice sur les défis techniques et organisationnels d'un projet complet."
            image={motivai}
            technologies={[
              'NextJS',
              'TypeScript',
              'Prisma',
              'Better Auth',
              'AI',
              'CI / CD',
            ]}
          />
          <ProjectLink
            href="https://github.com/WillFDA/williamdeazevedo2025"
            title="Mon portfolio - 2025"
            description="Pour ce portfolio, l'objectif était différent des anciens. Je voulais créer un portfolio simple, efficace, concis. J'avais aussi pour objectif de commencer à créer des posts de blog, pour apprendre en partageant et pour avoir un endroit où expérimenter et partager."
            image={william}
            technologies={['NextJS', 'TypeScript', 'MDX']}
          />
        </div>
      </section>
    </>
  );
}
