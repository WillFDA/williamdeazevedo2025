import { Inter } from "next/font/google";
import Script from "next/script";
import { ViewTransition } from "react";
import Footer from "@/components/footer";
import Navbar from "../components/navbar";
import "./globals.css";
import { Metadata } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://williamdeazevedo.fr"),
  title: {
    default: "William De Azevedo | Développeur Front-end React & Next.js",
    template: "%s | William De Azevedo",
  },
  description:
    "Développeur Front-end avec 2 ans d'expérience, spécialisé en React, Next.js et TypeScript. Disponible pour CDI ou missions freelance en Île-de-France.",
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
  authors: [{ name: "William De Azevedo", url: "https://williamdeazevedo.fr" }],
  creator: "William De Azevedo",
  publisher: "William De Azevedo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://williamdeazevedo.fr",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://williamdeazevedo.fr",
    siteName: "William De Azevedo - Portfolio",
    title: "William De Azevedo | Développeur Front-end React & Next.js",
    description:
      "Développeur Front-end avec 2 ans d'expérience, spécialisé en React, Next.js et TypeScript. Découvrez mes projets et compétences.",
    images: [
      {
        url: "/api/og?title=William De Azevedo | Développeur Front-end",
        width: 1200,
        height: 630,
        alt: "William De Azevedo - Développeur Front-end React & Next.js",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "William De Azevedo | Développeur Front-end React & Next.js",
    description:
      "Développeur Front-end avec 2 ans d'expérience, spécialisé en React, Next.js et TypeScript.",
    images: ["/api/og?title=William De Azevedo | Développeur Front-end"],
    creator: "@Williamdazevedo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "William De Azevedo",
              url: "https://williamdeazevedo.fr",
              image:
                "https://williamdeazevedo.fr/william-de-azevedo-og-image.jpg",
              sameAs: [
                "https://www.linkedin.com/in/william-de-azevedo/",
                "https://github.com/WillFDA",
                "https://www.malt.fr/profile/williamferreiradeazevedo",
              ],
              jobTitle: "Développeur Front-end",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              address: {
                "@type": "PostalAddress",
                addressRegion: "Île-de-France",
                addressCountry: "FR",
              },
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "TailwindCSS",
                "Front-end Development",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} flex min-h-screen flex-col overflow-x-hidden bg-white font-sans antialiased`}
      >
        <Navbar />
        <ViewTransition name="page-transition">
          {children}
        </ViewTransition>
        <Footer />
        {process.env.NEXT_PUBLIC_BEAM_TOKEN && (
          <Script
            src="https://beamanalytics.b-cdn.net/beam.min.js"
            data-token={process.env.NEXT_PUBLIC_BEAM_TOKEN}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
