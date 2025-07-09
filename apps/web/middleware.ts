import createMiddleware from 'next-intl/middleware';
import { i18nConfig } from '@madfam/i18n';

export default createMiddleware({
  locales: i18nConfig.locales,
  defaultLocale: i18nConfig.defaultLocale,
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - Internal Next.js routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};