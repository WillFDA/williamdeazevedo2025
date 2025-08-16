import HoverTooltip from '@/components/hover-tooltip';
import ProjectLink from '@/components/project-link';
import { skillsIcons } from '@/data/picturesandicons';
import kominLogo from '@/public/komin-logo.png';
import motivai from '@/public/motivai-logo.png';
import william from '@/public/pictures/william.png';
import susuLogo from '@/public/susu-logo.png';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <section className="w-full mt-20 max-w-4xl mx-auto p-4">
        <div className="flex mx-auto max-w-2xl gap-8">
          <Image
            src={william}
            alt="Photo de profil"
            width={80}
            height={80}
            className="rounded-full size-20 fade-up [--animation-delay:200ms]"
          />
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-3 fade-up [--animation-delay:200ms]">
              Hello moi c&apos;est William <br />
              Développeur Front end junior
            </h1>
            <p className="text-gray-500 text-md mb-4 fade-up [--animation-delay:400ms]">
              Développeur front end, enthousiaste de l'IA. Je suis passionné par
              la création de produits qui aident les gens.
            </p>
            <div className="flex gap-2 items-center mb-8 fade-up [--animation-delay:400ms]">
              <div className="size-4 bg-green-100 rounded-full flex items-center justify-center">
                <div className="size-1 bg-green-400 rounded-full"></div>
              </div>
              <span className="text-gray-500">
                Actuellement à la recherche d&apos;un CDI
              </span>
            </div>
            <button className="bg-black fade-up [--animation-delay:600ms] hover:bg-black/85 cursor-pointer text-white px-8 py-4 w-full rounded-lg transition-all duration-150 ease-in-out shadow-[0_8px_30px_rgb(0,0,0,0.15)]">
              Voir mon CV
            </button>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-between bg-white w-full relative mt-20 mb-25">
        <div className="grid grid-cols-5 grid-rows-2 gap-2 mx-auto max-w-2xl w-full flex-wrap justify-center items-center group">
          {skillsIcons.map((icon, index) => (
            <HoverTooltip key={index} item={icon}>
              <div className="aspect-square col-span-1 row-span-1 size-25 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 group-hover:[&:not(:hover)]:opacity-30">
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={50}
                  height={50}
                  className="max-w-[50px] max-h-[50px]"
                />
              </div>
            </HoverTooltip>
          ))}
        </div>
      </div>
      <section className="flex max-w-2xl mx-auto mt-20 gap-8 ">
        <h2 className="font-medium mb-auto text-gray-500">Travail</h2>
        <div className="flex flex-col gap-4 w-full ">
          <span>+ 2 ans d&apos;expérience</span>
          <div className="group/work flex flex-col gap-4">
            <ProjectLink
              href="https://susu.fr"
              title="Développeur Front end"
              description="Susu"
              image={susuLogo}
              variant="simple"
              groupName="work"
              rightContent="2024 - Now"
              imageContainer="size-13 rounded-full flex items-center justify-center overflow-hidden"
              imageSize={{ width: 40, height: 40 }}
            />
            <ProjectLink
              href="https://komin.io"
              title="Développeur Front end"
              description="Komin"
              image={kominLogo}
              variant="simple"
              groupName="work"
              rightContent="2023 - 2024"
              imageContainer="size-13 rounded-full flex items-center justify-center overflow-hidden"
              imageSize={{ width: 40, height: 40 }}
            />
          </div>
        </div>
      </section>
      <section className="flex max-w-2xl mx-auto mt-20 gap-8 ">
        <h2 className="font-medium mb-auto text-gray-500">Projets</h2>
        <div className="flex flex-col gap-4 w-full">
          <span>
            J&apos;aime développer des projets en solo ou collaboratif
          </span>
          <div className="group/projects flex flex-col gap-4">
            <ProjectLink
              href="https://motivai.fr"
              title="Motivai"
              description="Un SaaS de création de lettre de motivation avec IA"
              image={motivai}
              variant="simple"
            />
            <ProjectLink
              href="https://github.com/WillFDA/williamdeazevedo2025"
              title="Mon site"
              description="Le site actuel que vous êtes entrain de visiter"
              image={william}
              variant="simple"
            />
          </div>
        </div>
      </section>
    </>
  );
}
