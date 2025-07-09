import { i18nConfig } from '@madfam/i18n';

/**
 * Translates a route from one locale to another
 * @param route - The route to translate (without locale prefix)
 * @param fromLocale - The source locale
 * @param toLocale - The target locale
 * @returns The translated route
 */
export function translateRoute(route: string, fromLocale: string, toLocale: string): string {
  // If translating from Spanish to English, find the original English route
  if (fromLocale === 'es-MX' && toLocale === 'en-US') {
    const spanishRoutes = i18nConfig.routes['es-MX'];
    // Find the English route that maps to this Spanish route
    for (const [englishRoute, spanishRoute] of Object.entries(spanishRoutes)) {
      if (spanishRoute === route) {
        return englishRoute;
      }
    }
    // If no translation found, return the original route
    return route;
  }
  
  // If translating from English to Spanish, use the direct mapping
  if (fromLocale === 'en-US' && toLocale === 'es-MX') {
    const spanishRoutes = i18nConfig.routes['es-MX'];
    return spanishRoutes[route as keyof typeof spanishRoutes] || route;
  }
  
  // If same locale or no translation needed, return original route
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
  const currentLocale = segments[0] && i18nConfig.locales.includes(segments[0] as any) 
    ? segments[0] 
    : i18nConfig.defaultLocale;
    
  const routeWithoutLocale = currentLocale === segments[0] 
    ? '/' + segments.slice(1).join('/')
    : '/' + segments.join('/');
    
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
  
  if (firstSegment && i18nConfig.locales.includes(firstSegment as any)) {
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
  
  if (firstSegment && i18nConfig.locales.includes(firstSegment as any)) {
    return '/' + segments.slice(1).join('/');
  }
  
  return pathname;
}