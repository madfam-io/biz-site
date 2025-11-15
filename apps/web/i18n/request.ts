import { messages } from '@madfam/i18n';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Define supported locales
const locales = ['es', 'en', 'pt'] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the locale from Next.js 15+ async request API
  let locale = await requestLocale;

  // Validate that the incoming locale parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: messages[locale as keyof typeof messages] as any,
  };
});
