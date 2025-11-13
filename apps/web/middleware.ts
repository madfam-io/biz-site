import { i18nConfig } from '@madfam/i18n';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createIntlMiddleware({
  locales: ['es', 'en', 'pt'],
  defaultLocale: i18nConfig.defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});

export default function middleware(request: NextRequest) {
  // Run the intl middleware for es and en routes
  const response = intlMiddleware(request);

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // Content Security Policy
  // NOTE: We keep 'unsafe-inline' for script-src and style-src to support:
  // 1. Dark mode script that must execute before hydration
  // 2. Inline styles from Tailwind CSS and component libraries
  // TODO: Implement nonce-based CSP for better security
  // See: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://vercel.live https://www.googletagmanager.com https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://vitals.vercel-insights.com https://www.google-analytics.com https://analytics.google.com;
    media-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'none';
    worker-src 'self' blob:;
    manifest-src 'self';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, ' ')
    .trim();

  response.headers.set('Content-Security-Policy', cspHeader);

  // Add Strict-Transport-Security for production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (_next)
  // - Internal Next.js/Vercel routes (_vercel)
  // - Files with extensions (e.g. favicon.ico)
  matcher: [
    // Enhanced matcher for hyphenated locales like pt-br
    // Excludes /api, /_next, /_vercel, and files with extensions
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
