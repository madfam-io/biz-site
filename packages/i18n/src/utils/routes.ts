import { Locale } from '../config';

export type RouteKey = 
  | 'home'
  | 'services'
  | 'services.level1'
  | 'services.level2'
  | 'services.level3'
  | 'services.level4'
  | 'services.level5'
  | 'products'
  | 'about'
  | 'contact'
  | 'blog'
  | 'careers'
  | 'privacy'
  | 'terms'
  | 'cookies';

// Define localized slugs for each route
const routes: Record<RouteKey, Record<Locale, string>> = {
  home: {
    'en-US': '/',
    'es-MX': '/',
    'pt-BR': '/'
  },
  services: {
    'en-US': '/services',
    'es-MX': '/servicios',
    'pt-BR': '/servicos'
  },
  'services.level1': {
    'en-US': '/services/level-1-essentials',
    'es-MX': '/servicios/nivel-1-esenciales',
    'pt-BR': '/servicos/nivel-1-essenciais'
  },
  'services.level2': {
    'en-US': '/services/level-2-advanced',
    'es-MX': '/servicios/nivel-2-avanzado',
    'pt-BR': '/servicos/nivel-2-avancado'
  },
  'services.level3': {
    'en-US': '/services/level-3-consulting',
    'es-MX': '/servicios/nivel-3-consultoria',
    'pt-BR': '/servicos/nivel-3-consultoria'
  },
  'services.level4': {
    'en-US': '/services/level-4-platforms',
    'es-MX': '/servicios/nivel-4-plataformas',
    'pt-BR': '/servicos/nivel-4-plataformas'
  },
  'services.level5': {
    'en-US': '/services/level-5-strategic',
    'es-MX': '/servicios/nivel-5-estrategico',
    'pt-BR': '/servicos/nivel-5-estrategico'
  },
  products: {
    'en-US': '/products',
    'es-MX': '/productos',
    'pt-BR': '/produtos'
  },
  about: {
    'en-US': '/about',
    'es-MX': '/nosotros',
    'pt-BR': '/sobre'
  },
  contact: {
    'en-US': '/contact',
    'es-MX': '/contacto',
    'pt-BR': '/contato'
  },
  blog: {
    'en-US': '/blog',
    'es-MX': '/blog',
    'pt-BR': '/blog'
  },
  careers: {
    'en-US': '/careers',
    'es-MX': '/carreras',
    'pt-BR': '/carreiras'
  },
  privacy: {
    'en-US': '/privacy',
    'es-MX': '/privacidad',
    'pt-BR': '/privacidade'
  },
  terms: {
    'en-US': '/terms',
    'es-MX': '/terminos',
    'pt-BR': '/termos'
  },
  cookies: {
    'en-US': '/cookies',
    'es-MX': '/cookies',
    'pt-BR': '/cookies'
  }
};

// Get the localized path for a route
export function getLocalizedPath(route: RouteKey, locale: Locale): string {
  return routes[route][locale];
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

// Service-specific slug mappings
const serviceSlugs: Record<string, Record<Locale, string>> = {
  'level-1-essentials': {
    'en-US': 'level-1-essentials',
    'es-MX': 'nivel-1-esenciales',
    'pt-BR': 'nivel-1-essenciais'
  },
  'level-2-advanced': {
    'en-US': 'level-2-advanced',
    'es-MX': 'nivel-2-avanzado',
    'pt-BR': 'nivel-2-avancado'
  },
  'level-3-consulting': {
    'en-US': 'level-3-consulting',
    'es-MX': 'nivel-3-consultoria',
    'pt-BR': 'nivel-3-consultoria'
  },
  'level-4-platforms': {
    'en-US': 'level-4-platforms',
    'es-MX': 'nivel-4-plataformas',
    'pt-BR': 'nivel-4-plataformas'
  },
  'level-5-strategic': {
    'en-US': 'level-5-strategic',
    'es-MX': 'nivel-5-estrategico',
    'pt-BR': 'nivel-5-estrategico'
  }
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