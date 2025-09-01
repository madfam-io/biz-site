import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { AuthProvider } from '@/components/AuthProvider';
import { CookieConsent } from '@/components/CookieConsent';
import { Footer } from '@/components/Footer';
import { GlobalAnalytics } from '@/components/GlobalAnalytics';
import { LoggerProvider } from '@/components/LoggerProvider';
import { LuxuryNavbar } from '@/components/LuxuryNavbar';
import { OrganizationStructuredData } from '@/components/StructuredData';
import { locales, getMessages, type Locale } from '@/i18n.config';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure valid locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Get messages for the locale
  const messages = getMessages(locale);

  return (
    <LoggerProvider>
      <AuthProvider>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <OrganizationStructuredData />
          <GlobalAnalytics />

          {/* Skip Navigation Link for Accessibility */}
          <a href="#main-content" className="skip-link sr-only-focusable">
            Skip to main content
          </a>

          <LuxuryNavbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
      </AuthProvider>
    </LoggerProvider>
  );
}
