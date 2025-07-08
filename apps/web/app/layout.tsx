import type { Metadata } from 'next';
import { Inter, Poppins, Space_Mono } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MADFAM - AI-Driven Consultancy & Product Studio',
    template: '%s | MADFAM',
  },
  description:
    'Transform your business with MADFAM\'s AI-powered solutions. From 3D design to strategic vCTO partnerships, we deliver innovation at every level.',
  keywords: [
    'AI consultancy',
    'digital transformation',
    'product studio',
    'SPARK platform',
    'PENNY automation',
    '3D design',
    'Mexico tech',
    'LATAM innovation',
  ],
  authors: [{ name: 'MADFAM', url: 'https://madfam.io' }],
  creator: 'MADFAM',
  metadataBase: new URL('https://madfam.io'),
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: ['en_US', 'pt_BR'],
    url: 'https://madfam.io',
    siteName: 'MADFAM',
    title: 'MADFAM - AI-Driven Consultancy & Product Studio',
    description:
      'Transform your business with MADFAM\'s AI-powered solutions. From 3D design to strategic vCTO partnerships.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MADFAM - Where AI meets Human Creativity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MADFAM - AI-Driven Consultancy & Product Studio',
    description:
      'Transform your business with MADFAM\'s AI-powered solutions.',
    site: '@madfam_io',
    creator: '@madfam_io',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0E27' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable} ${spaceMono.variable}`}>
      <body className="font-body antialiased">
        <Navbar />
        <div className="pt-16">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}