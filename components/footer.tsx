'use client';

import { useGetIsActive } from '@/lib/utils';
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 h-100 w-full mt-20">
      <div className="flex justify-between max-w-2xl mx-auto">
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
        <div className="flex flex-col gap-4 items-end">
          <span className="text-sm text-gray-500">
            © 2025 William Ferreira De Azevedo. All rights reserved.
          </span>
          <div>
            <Github className="size-4 text-gray-500 hover:text-black hover:-translate-y-2 transition-all duration-300 ease-in-out" />
          </div>
        </div>
      </div>
    </footer>
  );
}
