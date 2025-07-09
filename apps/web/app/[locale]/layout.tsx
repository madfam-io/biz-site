import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { OrganizationStructuredData } from '@/components/StructuredData';
import { AuthProvider } from '@/components/AuthProvider';
import { LoggerProvider } from '@/components/LoggerProvider';
import { locales, getMessages } from '@/i18n.config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
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