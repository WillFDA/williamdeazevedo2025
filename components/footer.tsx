"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useGetIsActive } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Top section */}
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <p className="text-gray-600">
            Disponible pour un CDI ou des missions freelance
          </p>
          <a
            href="mailto:william.ferreirapro@gmail.com"
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-gray-900 text-white border-gray-900 hover:bg-gray-800 h-10 rounded-md gap-2 px-5"
          >
            <Mail className="size-4" />
            Me contacter
          </a>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px bg-gray-100" />

        {/* Bottom section */}
        <div className="flex flex-col-reverse items-center gap-6 lg:flex-row lg:justify-between">
          {/* Navigation */}
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link
                  className={`text-sm transition-colors hover:text-gray-900 ${
                    useGetIsActive("/") ? "font-medium text-gray-900" : "text-gray-500"
                  }`}
                  href="/"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  className={`text-sm transition-colors hover:text-gray-900 ${
                    useGetIsActive("/about") ? "font-medium text-gray-900" : "text-gray-500"
                  }`}
                  href="/about"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  className={`text-sm transition-colors hover:text-gray-900 ${
                    useGetIsActive("/blog") ? "font-medium text-gray-900" : "text-gray-500"
                  }`}
                  href="/blog"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social + Copyright */}
          <div className="flex flex-col items-center gap-4 lg:items-end">
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/WillFDA"
                target="_blank"
                aria-label="GitHub"
              >
                <Github className="size-5 text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:text-gray-900" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/william-de-azevedo/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5 text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:text-gray-900" />
              </Link>
              <Link
                href="https://www.malt.fr/profile/williamferreiradeazevedo"
                target="_blank"
                aria-label="Malt"
                className="group"
              >
                <svg
                  className="size-5 transition-all duration-300 group-hover:-translate-y-0.5"
                  viewBox="0 0 512 512"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="fill-gray-500 transition-colors duration-300 group-hover:fill-[#FC5656]"
                    d="m408.4 103.8c-32.5-32.4-67.1-11.4-88.8 10.2L114.8 318.8c-21.7 21.7-44.4 54.7-10.2 88.8c34.1 34.1 67 11.4 88.7-10.3l204.8-204.8c21.7-21.6 42.7-56.3 10.3-88.7zm-195.7-8.4 43.4 43.4 44.1-44.2c3-3 6-5.8 9.1-8.4c-4.6-23.3-17.9-44.4-53.3-44.4c-35.4 0-48.7 21.2-53.2 44.5c3.3 2.9 6.6 5.8 9.9 9.1zm87.5 322.1-44.1-44.1-43.4 43.3c-3.3 3.3-6.5 6.4-9.8 9.2c5 23.8 19 45.5 53.1 45.5c34.2 0 48.3-21.9 53.2-45.7c-3-2.6-6-5.2-9-8.2zm-105.9-217h-83.6c-30.7 0-70 9.7-70 55.5c0 34.3 21.9 48.3 45.8 53.2c2.8-3.2 107.8-108.7 107.8-108.7zm231.5 2.3c-2.6 3-107.9 108.8-107.9 108.8h82.4c30.7 0 70-7.3 70-55.6c0-35.3-21.1-48.6-44.5-53.2zm-204.1-29.7 14.9-14.9-43.3-43.4c-21.7-21.7-54.6-44.4-88.8-10.2c-25 25-19.4 49.4-6.2 69.1c4.1-.3 123.4-.6 123.4-.6zm68.7 165.9-15 15 44.2 44.1c21.7 21.7 56.3 42.7 88.7 10.3c24.2-24.2 18.7-49.7 5.3-70c-4.3.3-123.2.6-123.2.6z"
                  />
                </svg>
              </Link>
              <a
                href="mailto:william.ferreirapro@gmail.com"
                aria-label="Email"
              >
                <Mail className="size-5 text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:text-gray-900" />
              </a>
            </div>
            <span className="text-xs text-gray-400">
              © 2026 William De Azevedo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
