import type { Metadata } from 'next';
import { Inter, Poppins, Space_Mono } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DarkModeScript } from './dark-mode-script';
import { CookieConsent } from '@/components/CookieConsent';
import { OrganizationStructuredData } from '@/components/StructuredData';
import { seoService } from '@/lib/seo';
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

export const metadata: Metadata = seoService.generateHomeMetadata('es-MX');

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
      <head>
        <DarkModeScript />
      </head>
      <body className="font-body antialiased bg-white dark:bg-obsidian text-obsidian dark:text-pearl transition-colors">
        <OrganizationStructuredData />
        <Navbar />
        <div className="pt-16">
          {children}
          <Footer />
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}