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
            <ol className="flex gap-6">
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
            </ol>
          </nav>

          {/* Social + Copyright */}
          <div className="flex flex-col items-center gap-4 lg:items-end">
            <div className="flex gap-4">
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
              <a
                href="mailto:william.ferreirapro@gmail.com"
                aria-label="Email"
              >
                <Mail className="size-5 text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:text-gray-900" />
              </a>
            </div>
            <span className="text-xs text-gray-400">
              © 2025 William De Azevedo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
