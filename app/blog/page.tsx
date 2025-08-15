import { pictures } from '@/data/picturesandicons';
import Image from 'next/image';

export default function Blog() {
  return (
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
  );
}
