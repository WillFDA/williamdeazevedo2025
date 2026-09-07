import { Inter } from "next/font/google";
import Script from "next/script";
import { ViewTransition } from "react";
import Footer from "@/components/footer";
import Navbar from "../components/navbar";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  alternates: {
    canonical: "https://williamdeazevedo.fr",
  },
  authors: [{ name: "William De Azevedo", url: "https://williamdeazevedo.fr" }],
  creator: "William De Azevedo",
  description:
    "Développeur Front-end avec 2 ans d'expérience, spécialisé en React, Next.js et TypeScript. Disponible pour CDI ou missions freelance en Île-de-France.",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  keywords: [
    "développeur front-end",
    "développeur react",
    "développeur next.js",
    "développeur typescript",
    "freelance react",
    "développeur web paris",
    "développeur île-de-france",
    "william de azevedo",
    "portfolio développeur",
    "react developer",
    "front-end developer france",
  ],
  metadataBase: new URL("https://williamdeazevedo.fr"),
  openGraph: {
    description:
      "Développeur Front-end avec 2 ans d'expérience, spécialisé en React, Next.js et TypeScript. Découvrez mes projets et compétences.",
    images: [
      {
        alt: "William De Azevedo - Développeur Front-end React & Next.js",
        height: 630,
        url: `https://williamdeazevedo.fr/api/og?title=${encodeURIComponent("William De Azevedo - Développeur Front-end")}`,
        width: 1200,
      },
    ],
    locale: "fr_FR",
    siteName: "William De Azevedo - Portfolio",
    title: "William De Azevedo | Développeur Front-end React & Next.js",
    type: "website",
    url: "https://williamdeazevedo.fr",
  },
  publisher: "William De Azevedo",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: "William De Azevedo | Développeur Front-end React & Next.js",
    template: "%s | William De Azevedo",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Williamdazevedo",
    description:
      "Développeur Front-end avec 2 ans d'expérience, spécialisé en React, Next.js et TypeScript.",
    images: [
      `https://williamdeazevedo.fr/api/og?title=${encodeURIComponent("William De Azevedo - Développeur Front-end")}`,
    ],
    title: "William De Azevedo | Développeur Front-end React & Next.js",
  },
  // verification: {
  //   google: "VOTRE_CODE_GOOGLE_SEARCH_CONSOLE",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              address: {
                "@type": "PostalAddress",
                addressCountry: "FR",
                addressRegion: "Île-de-France",
              },
              image: `https://williamdeazevedo.fr/api/og?title=${encodeURIComponent("William De Azevedo - Développeur Front-end")}`,
              jobTitle: "Développeur Front-end",
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "TailwindCSS",
                "Front-end Development",
              ],
              name: "William De Azevedo",
              sameAs: [
                "https://www.linkedin.com/in/william-de-azevedo/",
                "https://github.com/WillFDA",
                "https://www.malt.fr/profile/williamferreiradeazevedo",
              ],
              url: "https://williamdeazevedo.fr",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
            }),
          }}
          type="application/ld+json"
        />
      </head>
      <body
        className={`${inter.variable} flex min-h-screen flex-col overflow-x-hidden bg-white font-sans antialiased`}
      >
        <Navbar />
        <ViewTransition name="page-transition">{children}</ViewTransition>
        <Footer />
        {process.env.NEXT_PUBLIC_BEAM_TOKEN && (
          <Script
            data-token={process.env.NEXT_PUBLIC_BEAM_TOKEN}
            src="https://beamanalytics.b-cdn.net/beam.min.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
