import Footer from '@/components/footer';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '../components/navbar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'William De Azevedo',
  description: 'Développeur Front-end React / NextJS',
  openGraph: {
    title: 'William De Azevedo - Portfolio',
    description:
      'Développeur Front-end React / NextJS | Explorez mes projets et compétences',
    url: 'https://williamdeazevedo.fr/',
    siteName: 'Portfolio de William De Azevedo',
    images: [
      {
        url: 'https://williamdeazevedo.fr/william-de-azevedo-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'William De Azevedo - Développeur Front-end',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'William De Azevedo - Développeur Front-end',
    description: 'Explorez mon portfolio de développeur React / NextJS',
    images: ['https://williamdeazevedo.fr/og-image.jpg'],
    creator: '@Williamdazevedo',
  },
  other: {
    'linkedin:author': 'https://www.linkedin.com/in/william-de-azevedo/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
