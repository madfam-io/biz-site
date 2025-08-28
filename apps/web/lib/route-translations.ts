import { i18nConfig, type Locale } from '@madfam/i18n';

/**
 * Translates a route from one locale to another
 * @param route - The route to translate (without locale prefix)
 * @param fromLocale - The source locale
 * @param toLocale - The target locale
 * @returns The translated route
 */
export function translateRoute(route: string, fromLocale: string, toLocale: string): string {
  // If same locale, return original route
  if (fromLocale === toLocale) {
    return route;
  }

  // If translating to English, find the original English route by reverse mapping
  if (toLocale === 'en') {
    const sourceRoutes = i18nConfig.routes[fromLocale as keyof typeof i18nConfig.routes];
    if (sourceRoutes) {
      // Find the English route that maps to this localized route
      for (const [englishRoute, localizedRoute] of Object.entries(sourceRoutes)) {
        if (localizedRoute === route) {
          return englishRoute;
        }
      }
    }
    // If no translation found, return the original route
    return route;
  }

  // If translating from English to any other locale, use the direct mapping
  if (fromLocale === 'en') {
    const targetRoutes = i18nConfig.routes[toLocale as keyof typeof i18nConfig.routes];
    if (targetRoutes && typeof targetRoutes === 'object') {
      return (targetRoutes as Record<string, string>)[route] || route;
    }
    return route;
  }

  // If translating between two non-English locales, go through English as intermediary
  if (fromLocale !== 'en' && toLocale !== 'en') {
    // First translate to English
    const englishRoute = translateRoute(route, fromLocale, 'en');
    // Then translate from English to target locale
    return translateRoute(englishRoute, 'en', toLocale);
  }

  // Fallback: return original route
  return route;
}

/**
 * Translates a full pathname from one locale to another
 * @param pathname - The full pathname including locale (e.g., '/es-MX/servicios')
 * @param toLocale - The target locale
 * @returns The translated pathname
 */
export function translatePathname(pathname: string, toLocale: string): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `/${toLocale}`;
  }

  // Extract current locale and route
  const currentLocale =
    segments[0] && i18nConfig.locales.includes(segments[0] as Locale)
      ? segments[0]
      : i18nConfig.defaultLocale;

  const routeWithoutLocale =
    currentLocale === segments[0] ? `/${segments.slice(1).join('/')}` : `/${segments.join('/')}`;

  // Translate the route
  const translatedRoute = translateRoute(routeWithoutLocale, currentLocale, toLocale);

  // Return the new pathname with target locale
  return `/${toLocale}${translatedRoute}`;
}

/**
 * Gets the current locale from a pathname
 * @param pathname - The pathname to extract locale from
 * @returns The detected locale
 */
export function getLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && i18nConfig.locales.includes(firstSegment as Locale)) {
    return firstSegment;
  }

  return i18nConfig.defaultLocale;
}

/**
 * Removes the locale prefix from a pathname
 * @param pathname - The pathname with locale prefix
 * @returns The pathname without locale prefix
 */
export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return '/';
  }

  const firstSegment = segments[0];

  if (firstSegment && i18nConfig.locales.includes(firstSegment as Locale)) {
    return `/${segments.slice(1).join('/')}`;
  }

  return pathname;
}
