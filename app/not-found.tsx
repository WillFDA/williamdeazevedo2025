import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center max-w-2xl mx-auto mt-32 gap-8">
      <div className="text-center fade-up [--animation-delay:200ms]">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-4">
          Page introuvable
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été
          déplacée.
        </p>
      </div>

      <div className="flex gap-4 fade-up [--animation-delay:400ms]">
        <Link
          href="/"
          className="bg-black hover:bg-black/85 text-white px-6 py-3 rounded-lg transition-all duration-150 ease-in-out shadow-[0_8px_30px_rgb(0,0,0,0.15)]"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
