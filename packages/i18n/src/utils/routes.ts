import { Locale } from '../config';

export type RouteKey =
  | 'home'
  // NEW: Corporate structure routes
  | 'arms'
  | 'arms.aureo-labs'
  | 'arms.primavera3d'
  | 'arms.health'
  | 'arms.aero'
  | 'programs'
  | 'work'
  | 'security'
  // LEGACY: Services routes (for backward compatibility)
  | 'services'
  | 'services.level1'
  | 'services.level2'
  | 'services.level3'
  | 'services.level4'
  | 'services.level5'
  // EXISTING: Core routes
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
  services: {
    en: '/services',
    es: '/servicios',
    'pt-br': '/servicos',
  },
  'services.level1': {
    en: '/services/level-1-essentials',
    es: '/servicios/nivel-1-esenciales',
    'pt-br': '/servicos/nivel-1-essenciais',
  },
  'services.level2': {
    en: '/services/level-2-advanced',
    es: '/servicios/nivel-2-avanzado',
    'pt-br': '/servicos/nivel-2-avancado',
  },
  'services.level3': {
    en: '/services/level-3-consulting',
    es: '/servicios/nivel-3-consultoria',
    'pt-br': '/servicos/nivel-3-consultoria',
  },
  'services.level4': {
    en: '/services/level-4-platforms',
    es: '/servicios/nivel-4-plataformas',
    'pt-br': '/servicos/nivel-4-plataformas',
  },
  'services.level5': {
    en: '/services/level-5-strategic',
    es: '/servicios/nivel-5-estrategico',
    'pt-br': '/servicos/nivel-5-estrategico',
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

// Service-specific slug mappings (Updated for normalized locales)
const serviceSlugs: Record<string, Record<Locale, string>> = {
  'level-1-essentials': {
    en: 'level-1-essentials',
    es: 'nivel-1-esenciales',
    'pt-br': 'nivel-1-essenciais',
  },
  'level-2-advanced': {
    en: 'level-2-advanced',
    es: 'nivel-2-avanzado',
    'pt-br': 'nivel-2-avancado',
  },
  'level-3-consulting': {
    en: 'level-3-consulting',
    es: 'nivel-3-consultoria',
    'pt-br': 'nivel-3-consultoria',
  },
  'level-4-platforms': {
    en: 'level-4-platforms',
    es: 'nivel-4-plataformas',
    'pt-br': 'nivel-4-plataformas',
  },
  'level-5-strategic': {
    en: 'level-5-strategic',
    es: 'nivel-5-estrategico',
    'pt-br': 'nivel-5-estrategico',
  },
};

// Get service level from localized slug
export function getServiceLevelFromSlug(slug: string, locale: Locale): string | null {
  for (const [englishSlug, localeSlugs] of Object.entries(serviceSlugs)) {
    if (localeSlugs[locale] === slug) {
      return englishSlug;
    }
  }
  return null;
}

// Get localized service slug
export function getLocalizedServiceSlug(englishSlug: string, locale: Locale): string {
  const slug = serviceSlugs[englishSlug];
  if (!slug) return englishSlug;
  return slug[locale] || englishSlug;
}
