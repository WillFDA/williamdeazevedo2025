import SkillIcons from '@/components/skill-icons';
import william from '@/public/pictures/william.png';
import Image from 'next/image';
import { pictures } from './data/picturesandicons';
export default function Home() {
  return (
    <main>
      <header className="my-5 flex justify-between items-center mx-auto p-4 border border-gay-100 max-w-2xl"></header>
      <div className="xl:max-w-7xl max-w-3xl absolute top-0 bottom-0 w-full mx-auto  left-1/2 -translate-x-1/2 border border-gray-200 z-[-1]"></div>
      <section className="w-full mt-20 max-w-4xl mx-auto p-4">
        <div className="flex flex-col mx-auto max-w-lg">
          <div className="size-20 bg-gray-200 rounded-full mb-4 overflow-hidden flex items-center justify-center">
            <Image src={william} alt="Photo de profil" width={80} height={80} />
          </div>
          <h1 className="text-4xl font-bold mb-3">
            Hello moi c&apos;est William <br />
            Développeur Front end junior
          </h1>
          <div className="flex gap-2 items-center mb-4">
            <div className="size-4 bg-green-100 rounded-full flex items-center justify-center">
              <div className="size-1 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-gray-500">
              Actuellement à la recherche d&apos;un CDI
            </span>
          </div>
          <button className="bg-black hover:bg-black/85 cursor-pointer text-white px-8 py-4 w-full rounded-lg transition-all duration-150 ease-in-out">
            Voir mon CV
          </button>
        </div>
      </section>
      <div className="flex items-center justify-between bg-white w-full relative border border-gray-200 border-l-0 border-r-0 mt-20 mb-25">
        <div className="flex items-center justify-between gap-2 mx-auto xl:max-w-7xl max-w-3xl w-full">
          <SkillIcons />
        </div>
      </div>
      <div className=" flex gap-8 bg-white py-12 z-10 relative border border-gray-200 border-l-0 border-r-0 px-8 items-center justify-center">
        {pictures.map((picture) => (
          <div
            key={picture.id}
            className={`aspect-[9/10] group w-44 overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl ${picture.rotate} transition-all duration-300 ease-in-out relative`}
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
      </div>
      <section className="max-w-lg mx-auto p-4 mt-15 s">
        <h2 className="text-4xl font-bold mb-4">A propos de moi</h2>
        <p className="text-gray-500">
          Je suis un développeur front end passionné par le design et
          l&apos;expérience utilisateur. J&apos;ai crée Motiv.ai, une plateforme
          {/* de création de lettre de motivation avec IA.wi */}
        </p>
      </section>
      <section className="bg-white border border-gray-200 rounded-2xl  mt-20  w-full max-w-4xl mx-auto p-4">
        <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-[12px] bg-gradient-to-r from-white to-gray-100">
          <div className="flex items-center gap-2">
            <div className="size-10 bg-gray-200 rounded-full"></div>
            <span>Motiv.ai</span>
          </div>
          <span className="text-gray-500">
            Motivai est une plateforme de création de lettre de motivation avec
            IA. Que j&apos;ai crée en side project.
          </span>
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 sm:w-fit dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
            Voir le projet
          </button>
        </div>
      </section>
    </main>
  );
}
