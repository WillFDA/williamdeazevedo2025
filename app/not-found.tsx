import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto mt-32 flex max-w-2xl flex-col items-center justify-center gap-8">
      <div className="fade-up text-center [--animation-delay:200ms]">
        <h1 className="mb-4 font-bold text-6xl text-gray-900">404</h1>
        <p className="mb-8 max-w-md text-gray-500">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été
          déplacée.
        </p>
      </div>

      <div className="fade-up flex gap-4 [--animation-delay:400ms]">
        <Link
          className="rounded-lg bg-black px-6 py-3 text-white shadow-[0_8px_30px_rgb(0,0,0,0.15)] transition-all duration-150 ease-in-out hover:bg-black/85"
          href="/"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
