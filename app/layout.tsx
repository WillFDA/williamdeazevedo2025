import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "William De Azevedo ",
  description:
    "Portfolio & Blog de William De Azevedo, Développeur Front end React, Next.js, TypeScript, Tailwind CSS, etc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
          <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
            {children}
          </main>
          <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
            <p>
              &copy; {new Date().getFullYear()} William De Azevedo. Tous droits
              réservés.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
