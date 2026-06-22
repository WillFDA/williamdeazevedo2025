"use client";
import Link from "next/link";
import { useGetIsActive } from "@/lib/utils";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 mx-auto flex w-full bg-white/50 backdrop-blur-sm p-4">
      <nav className="mx-auto w-2xl">
        <ol className="flex items-center justify-center gap-6 w-full">
          <li>
            <Link
              className={`fade-up rounded-full px-4 py-2 font-medium text-sm transition-all duration-300 ease-in-out [--animation-delay:50ms] ${
                useGetIsActive("/")
                  ? "bg-gray-400/20 text-black"
                  : "text-gray-900/60 hover:text-black"
              }`}
              href="/"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              className={`fade-up rounded-full px-4 py-2 font-medium text-sm transition-all duration-300 ease-in-out [--animation-delay:100ms] ${
                useGetIsActive("/about")
                  ? "bg-gray-400/20 text-black"
                  : "text-gray-900/60 hover:text-black"
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
                useGetIsActive("/blog")
                  ? "bg-gray-400/20 text-black"
                  : "text-gray-900/60 hover:text-black"
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
