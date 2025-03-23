import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section>
        <span>Joseph Joubert</span>
        <h1>&quot;Transmettre, c&apos;est apprendre deux fois&quot;</h1>
        <Link href="/about">En savoir plus</Link>
      </section>
      <section className="flex gap-16">
        <div className="flex flex-col gap-4">
          <h2>Derniers posts</h2>
          <div className="flex flex-col gap-1">
            <span>Oct 24</span>
            <span className="font-bold text-2xl">
              Comment j&apos;ai construit mon blog
            </span>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
            <Link href="/post/1">Lire plus</Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold">Catégories</h3>
          <div className="flex flex-col gap-1">
            <Link href="/category/1">JavaScript</Link>
            <Link href="/category/2">React</Link>
            <Link href="/category/3">Next.js</Link>
          </div>
          <h3 className="text-sm font-bold mt-4">Posts populaires</h3>
          <div className="flex gap-2 items-center">
            <MoveRight />
            <span className="font-bold">La différence entre flex et grid</span>
          </div>
        </div>
      </section>
    </>
  );
}
