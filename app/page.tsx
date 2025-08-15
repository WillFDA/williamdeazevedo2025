import HoverTooltip from '@/components/hover-tooltip';
import { skillsIcons } from '@/data/picturesandicons';
import motivai from '@/public/motivai-logo.png';
import william from '@/public/pictures/william.png';
import Image from 'next/image';
import Link from 'next/link';

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
            className="rounded-full size-20"
          />
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-3">
              Hello moi c&apos;est William <br />
              Développeur Front end junior
            </h1>
            <div className="flex gap-2 items-center mb-8">
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
        </div>
      </section>
      <div className="flex items-center justify-between bg-white w-full relative mt-20 mb-25">
        <div className="flex items-center justify-between gap-2 mx-auto max-w-2xl w-full flex-wrap">
          {skillsIcons.map((icon, index) => (
            <HoverTooltip key={index} item={icon}>
              <div className=" aspect-square size-25 flex items-center justify-center grayscale hover:grayscale-0">
                <Image src={icon.src} alt={icon.alt} width={50} height={50} />
              </div>
            </HoverTooltip>
          ))}
        </div>
      </div>
      <section className="flex max-w-2xl mx-auto mt-20 gap-8 ">
        <h2 className="font-medium mb-auto text-gray-500">Travail</h2>
        <div className="flex flex-col gap-4 w-full">
          <span>+ 2 ans d&apos;expérience</span>
          <Link
            href="https://susu.fr"
            target="_blank"
            className="flex justify-between p-4 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-xl"
          >
            <div className="flex gap-4 items-center">
              <div className="size-13 bg-gray-200 rounded-full"></div>
              <div className="flex flex-col justify-center gap-1">
                <span className="text-gray-800 font-medium text-lg leading-tight">
                  Développeur Front end
                </span>
                <span className="text-gray-600 leading-tight font-medium">
                  Susu
                </span>
              </div>
            </div>
            <span className="text-gray-500 font-medium">2024 - Now</span>
          </Link>
          <Link
            href="https://komin.io"
            target="_blank"
            className="flex justify-between p-4 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-xl"
          >
            <div className="flex gap-4 items-center">
              <div className="size-13 bg-gray-200 rounded-full"></div>
              <div className="flex flex-col justify-center gap-1">
                <span className="text-gray-800 font-medium text-lg leading-tight">
                  Développeur Front end
                </span>
                <span className="text-gray-600 leading-tight font-medium">
                  Komin
                </span>
              </div>
            </div>
            <span className="text-gray-500 font-medium">2023 - 2024</span>
          </Link>
        </div>
      </section>
      <section className="flex max-w-2xl mx-auto mt-20 gap-8 ">
        <h2 className="font-medium mb-auto text-gray-500">Projets</h2>
        <div className="flex flex-col gap-4">
          <span>
            J&apos;aime développer des projets en solo ou collaboratif
          </span>
          <Link
            href="https://motivai.fr"
            target="_blank"
            className="flex justify-between p-4 hover:bg-gray-100 rounded-xl"
          >
            <div className="flex gap-4 items-center">
              <Image
                src={motivai}
                alt="Motivai"
                width={52}
                height={52}
                className="rounded-full"
              />
              <div className="flex flex-col justify-center gap-1">
                <span className="text-gray-800 font-medium text-lg leading-tight">
                  Motivai
                </span>
                <span className="text-gray-600 leading-tight font-medium">
                  Un SaaS de création de lettre de motivation avec IA
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
