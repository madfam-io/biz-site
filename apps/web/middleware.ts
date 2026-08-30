import { i18nConfig } from '@madfam/i18n';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['es', 'en', 'pt'] as const;

const intlMiddleware = createIntlMiddleware({
  locales: LOCALES as unknown as string[],
  defaultLocale: i18nConfig.defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});

/**
 * The Nauta product apex.
 *
 * `nauta.quest` is the standalone Nauta product's own front door — it is served
 * by THIS app (madfam-web), but its home is the Nauta landing (`/[locale]/nauta`),
 * not the MADFAM corporate homepage. So for the Nauta host, and ONLY for the
 * locale-root path (`/es`, `/en`, `/pt` — where next-intl lands `/` after its
 * always-prefix redirect), we internally REWRITE to the Nauta page. The address
 * bar stays at `nauta.quest/es`; every other path on the host (e.g. deep links,
 * `/products`) is served unchanged, so the whole site stays reachable under the
 * apex. `madfam.io` is untouched — this branch only fires for the nauta host.
 */
const NAUTA_HOSTS = new Set(['nauta.quest', 'www.nauta.quest']);

function hostname(request: NextRequest): string {
  // Behind the Cloudflare tunnel the forwarded host is authoritative; fall back
  // to the request host for local/dev.
  const forwarded = request.headers.get('x-forwarded-host');
  const host = (forwarded ?? request.headers.get('host') ?? '').toLowerCase();
  // Strip any port for a clean comparison.
  return host.split(':')[0] ?? host;
}

/** True when `pathname` is exactly a bare locale root (`/es`, `/en`, `/pt`). */
function isLocaleRoot(pathname: string): boolean {
  return LOCALES.some(l => pathname === `/${l}`);
}

export default function middleware(request: NextRequest) {
  // The Nauta apex serves the Nauta landing as its home. next-intl runs first
  // (so `/` → `/{detected-locale}` and locale detection both still work); we then
  // rewrite the resulting locale root to `/{locale}/nauta` for the nauta host.
  const isNautaHost = NAUTA_HOSTS.has(hostname(request));

  // Let next-intl middleware handle all routing including root path
  const response = intlMiddleware(request);

  if (isNautaHost) {
    const { pathname } = request.nextUrl;
    // Only the locale root is rewritten to the Nauta landing; a redirect
    // response from next-intl (bare `/` → `/{locale}`) is left to complete first,
    // and the follow-up request for `/{locale}` is the one we rewrite.
    if (isLocaleRoot(pathname) && response.status === 200) {
      const locale = pathname.slice(1);
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/nauta`;
      const rewrite = NextResponse.rewrite(url, { request });
      // Carry over the headers next-intl set on the original response (locale
      // cookie, etc.) so behaviour is otherwise identical.
      response.headers.forEach((value, key) => rewrite.headers.set(key, value));
      return applySecurityHeaders(rewrite);
    }
  }

  return applySecurityHeaders(response);
}

function applySecurityHeaders(response: NextResponse): NextResponse {
  // Generate a cryptographic nonce for CSP
  // Using crypto.randomUUID() which is available in Edge Runtime,
  // then base64-encoding it for use in CSP headers.
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // Content Security Policy with nonce-based script-src
  // - 'nonce-...' allows only scripts with the matching nonce attribute
  // - 'unsafe-inline' is kept as a fallback for older browsers that do not
  //   support nonces (browsers that DO support nonces will ignore 'unsafe-inline')
  // - 'strict-dynamic' propagates trust to scripts loaded by nonced scripts
  // - style-src keeps 'unsafe-inline' because Tailwind injects styles at runtime
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline' https://vercel.live https://www.googletagmanager.com https://www.google-analytics.com https://plausible.io;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://vitals.vercel-insights.com https://www.google-analytics.com https://analytics.google.com https://plausible.io;
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

  // Expose the nonce to server components via a request header
  // so layout.tsx can read it with headers() and pass it to script tags
  response.headers.set('x-nonce', nonce);

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
