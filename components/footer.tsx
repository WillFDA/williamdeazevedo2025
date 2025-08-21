'use client';

import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useGetIsActive } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="mt-8 w-full px-4 py-12 lg:mt-20 lg:mb-0 lg:h-50 lg:px-0">
      <div className="mx-auto flex max-w-2xl flex-col-reverse items-center gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
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
        <div className="flex flex-col items-end gap-4">
          <span className="text-gray-500 text-sm">
            © 2025 William Ferreira De Azevedo. All rights reserved.
          </span>
          <div className="mx-auto flex gap-2 lg:mr-0">
            <Link href="https://github.com/WillFDA" target="_blank">
              <Github className="hover:-translate-y-1 size-4 text-gray-500 transition-all duration-300 ease-in-out hover:text-black" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/william-de-azevedo/"
              target="_blank"
            >
              <Linkedin className="hover:-translate-y-1 size-4 text-gray-500 transition-all duration-300 ease-in-out hover:text-black" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
