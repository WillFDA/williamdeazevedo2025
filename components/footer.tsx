'use client';

import { useGetIsActive } from '@/lib/utils';
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className=" py-12 lg:h-50 w-full mt-8 lg:mt-20 px-4 lg:px-0 lg:mb-0">
      <div className="flex items-center lg:items-start lg:justify-between max-w-2xl mx-auto lg:flex-row flex-col-reverse gap-4 lg:gap-0">
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
          <div className="flex gap-2 mx-auto lg:mr-0">
            <Link target="_blank" href="https://github.com/WillFDA">
              <Github className="size-4 text-gray-500 hover:text-black hover:-translate-y-1 transition-all duration-300 ease-in-out" />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/william-de-azevedo/"
            >
              <Linkedin className="size-4 text-gray-500 hover:text-black hover:-translate-y-1 transition-all duration-300 ease-in-out" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
