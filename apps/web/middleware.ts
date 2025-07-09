import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { i18nConfig } from '@madfam/i18n';

const intlMiddleware = createMiddleware({
  locales: i18nConfig.locales,
  defaultLocale: i18nConfig.defaultLocale,
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle Spanish route translations
  if (pathname.startsWith('/es-MX/')) {
    const spanishRoutes = i18nConfig.routes['es-MX'];
    
    // Check if this is a Spanish route that needs to be mapped to English internally
    for (const [englishRoute, spanishRoute] of Object.entries(spanishRoutes)) {
      if (pathname === `/es-MX${spanishRoute}`) {
        // Rewrite to the English route structure internally
        const rewriteUrl = new URL(`/es-MX${englishRoute}`, request.url);
        return NextResponse.rewrite(rewriteUrl);
      }
    }
  }
  
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - Internal Next.js routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};