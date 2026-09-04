import { Metadata } from 'next';
import { headers } from 'next/headers';
import { Inter, Poppins, Space_Mono } from 'next/font/google';
import { DarkModeScript } from './dark-mode-script';
import { BrandThemeProvider } from '@/components/ui';
import { PLAUSIBLE_HOST } from '@/lib/plausible';
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
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0E27' },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') ?? undefined;
  const plausibleHost = PLAUSIBLE_HOST;

  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${spaceMono.variable}`}
    >
      <head>
        <DarkModeScript nonce={nonce} />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src={`${plausibleHost}/js/script.js`}
            nonce={nonce}
          />
        )}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html:
                `window.__PLAUSIBLE_DOMAIN__="${process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}";` +
                `window.__PLAUSIBLE_HOST__="${plausibleHost}";`,
            }}
          />
        )}
      </head>
      <body className="font-body antialiased bg-white dark:bg-obsidian text-obsidian dark:text-pearl transition-colors">
        <BrandThemeProvider defaultBrandMode="solarpunk-legacy" defaultColorMode="light">
          {children}
        </BrandThemeProvider>
      </body>
    </html>
  );
}
