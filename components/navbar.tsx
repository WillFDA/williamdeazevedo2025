'use client';
import Link from 'next/link';
import { useGetIsActive } from '@/lib/utils';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 mx-auto my-5 flex w-full items-center bg-white/50 p-4 backdrop-blur-sm">
      <nav className="mx-auto max-w-lg lg:min-w-lg">
        <ol className="ml-8 flex items-center gap-6">
          <li>
            <Link
              className={`fade-up rounded-full px-4 py-2 font-medium text-sm transition-all duration-300 ease-in-out [--animation-delay:50ms] ${
                useGetIsActive('/')
                  ? 'bg-gray-400/20 text-black'
                  : 'text-gray-900/60 hover:text-black'
              }`}
              href="/"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              className={`fade-up rounded-full px-4 py-2 font-medium text-sm transition-all duration-300 ease-in-out [--animation-delay:100ms] ${
                useGetIsActive('/about')
                  ? 'bg-gray-400/20 text-black'
                  : 'text-gray-900/60 hover:text-black'
              }`}
              href="/about"
              prefetch
            >
              A propos
            </Link>
          </li>
          <li>
            <Link
              className={`fade-up rounded-full px-4 py-2 font-medium text-sm transition-all duration-300 ease-in-out [--animation-delay:200ms] ${
                useGetIsActive('/blog')
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-900/60 hover:text-black'
              }`}
              href="/blog"
            >
              Blog
            </Link>
          </li>
        </ol>
      </nav>
    </header>
  );
}
