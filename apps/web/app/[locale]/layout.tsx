import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { AuthProvider } from '@/components/AuthProvider';
import { CookieConsent } from '@/components/CookieConsent';
import { Footer } from '@/components/Footer';
import { GlobalAnalytics } from '@/components/GlobalAnalytics';
import { LoggerProvider } from '@/components/LoggerProvider';
import { Navbar } from '@/components/Navbar';
import { OrganizationStructuredData } from '@/components/StructuredData';
import { locales, getMessages } from '@/i18n.config';

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
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the locale
  const messages = getMessages(locale);

  return (
    <LoggerProvider>
      <AuthProvider>
        <NextIntlClientProvider messages={messages}>
          <OrganizationStructuredData />
          <GlobalAnalytics />
          <Navbar />
          <div className="pt-16">
            {children}
            <Footer />
          </div>
          <CookieConsent />
        </NextIntlClientProvider>
      </AuthProvider>
    </LoggerProvider>
  );
}
