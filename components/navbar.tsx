'use client';
import { useGetIsActive } from '@/lib/utils';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="my-5 flex items-center mx-auto p-4 sticky top-0 bg-white/50 backdrop-blur-sm z-10 w-full">
      <nav className="max-w-lg min-w-lg mx-auto ">
        <ol className="flex gap-6 items-center ml-8">
          <li>
            <Link
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ease-in-out fade-up [--animation-delay:50ms] ${
                useGetIsActive('/')
                  ? 'bg-gray-400/20 text-black'
                  : 'text-gray-900/50 hover:text-black'
              }`}
              href="/"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ease-in-out fade-up [--animation-delay:100ms] ${
                useGetIsActive('/about')
                  ? 'bg-gray-400/20 text-black'
                  : 'text-gray-900/50 hover:text-black'
              }`}
              href="/about"
            >
              A propos
            </Link>
          </li>
          <li>
            <Link
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ease-in-out fade-up [--animation-delay:200ms]  ${
                useGetIsActive('/blog')
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-900/50 hover:text-black'
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
