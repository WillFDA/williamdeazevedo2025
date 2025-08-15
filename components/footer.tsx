'use client';

import { useGetIsActive } from '@/lib/utils';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 h-100 w-full mt-20">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <nav>
          <ol className="flex gap-4">
            <li>
              <Link
                className={` ${
                  useGetIsActive('/') ? 'text-black' : 'text-gray-500'
                }`}
                href="/"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  useGetIsActive('/about') ? 'text-black' : 'text-gray-500'
                }`}
                href="/about"
              >
                A propos
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  useGetIsActive('/blog') ? 'text-black' : 'text-gray-500'
                }`}
                href="/blog"
              >
                Blog
              </Link>
            </li>
          </ol>
        </nav>
      </div>
    </footer>
  );
}
