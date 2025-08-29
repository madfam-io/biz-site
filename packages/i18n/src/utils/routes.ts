import { Locale } from '../config';

export type RouteKey =
  | 'home'
  // Corporate structure routes
  | 'arms'
  | 'arms.aureo-labs'
  | 'arms.primavera3d'
  | 'arms.health'
  | 'arms.aero'
  | 'programs'
  | 'work'
  | 'security'
  // Core routes
  | 'products'
  | 'about'
  | 'contact'
  | 'blog'
  | 'careers'
  | 'privacy'
  | 'terms'
  | 'cookies';

// Define localized slugs for each route (Updated for normalized locales)
const routes: Record<RouteKey, Record<Locale, string>> = {
  home: {
    en: '/',
    es: '/',
    'pt-br': '/',
  },
  // NEW: Corporate structure routes
  arms: {
    en: '/arms',
    es: '/unidades',
    'pt-br': '/unidades',
  },
  'arms.aureo-labs': {
    en: '/arms/aureo-labs',
    es: '/unidades/aureo-labs',
    'pt-br': '/unidades/aureo-labs',
  },
  'arms.primavera3d': {
    en: '/arms/primavera3d',
    es: '/unidades/primavera3d',
    'pt-br': '/unidades/primavera3d',
  },
  'arms.health': {
    en: '/arms/health',
    es: '/unidades/salud',
    'pt-br': '/unidades/saude',
  },
  'arms.aero': {
    en: '/arms/aero',
    es: '/unidades/aero',
    'pt-br': '/unidades/aero',
  },
  programs: {
    en: '/programs',
    es: '/programas',
    'pt-br': '/programas',
  },
  work: {
    en: '/work',
    es: '/casos',
    'pt-br': '/casos',
  },
  security: {
    en: '/security',
    es: '/seguridad',
    'pt-br': '/seguranca',
  },
  products: {
    en: '/products',
    es: '/productos',
    'pt-br': '/produtos',
  },
  about: {
    en: '/about',
    es: '/nosotros',
    'pt-br': '/sobre',
  },
  contact: {
    en: '/contact',
    es: '/contacto',
    'pt-br': '/contato',
  },
  blog: {
    en: '/blog',
    es: '/blog',
    'pt-br': '/blog',
  },
  careers: {
    en: '/careers',
    es: '/carreras',
    'pt-br': '/carreiras',
  },
  privacy: {
    en: '/privacy',
    es: '/privacidad',
    'pt-br': '/privacidade',
  },
  terms: {
    en: '/terms',
    es: '/terminos',
    'pt-br': '/termos',
  },
  cookies: {
    en: '/cookies',
    es: '/cookies',
    'pt-br': '/cookies',
  },
};

// Get the localized path for a route
export function getLocalizedPath(route: RouteKey, locale: Locale): string {
  const routeConfig = routes[route];
  if (!routeConfig) {
    console.warn(`Route "${route}" not found in routes configuration`);
    return `/${route}`; // Fallback to basic path
  }

  const localizedPath = routeConfig[locale];
  if (!localizedPath) {
    console.warn(`Locale "${locale}" not found for route "${route}"`);
    // Try to fallback to English, then Spanish
    return routeConfig['en'] || routeConfig['es'] || `/${route}`;
  }

  return localizedPath;
}

// Get the full URL with locale prefix
export function getLocalizedUrl(route: RouteKey, locale: Locale): string {
  const path = getLocalizedPath(route, locale);
  return `/${locale}${path}`;
}

// Parse a path to find the matching route key
export function getRouteKeyFromPath(path: string, locale: Locale): RouteKey | null {
  // Remove locale prefix if present
  const pathWithoutLocale = path.replace(new RegExp(`^/${locale}`), '');

  for (const [key, localePaths] of Object.entries(routes)) {
    if (localePaths[locale] === pathWithoutLocale) {
      return key as RouteKey;
    }
  }

  return null;
}
