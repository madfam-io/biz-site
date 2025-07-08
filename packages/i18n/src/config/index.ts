export const i18nConfig = {
  defaultLocale: 'es-MX',
  locales: ['es-MX', 'en-US'] as const,
  
  localeDetection: true,
  
  // SEO-friendly locale names
  localeNames: {
    'es-MX': 'Español (México)',
    'en-US': 'English (US)',
  },
  
  // Route translations
  routes: {
    'es-MX': {
      '/services': '/servicios',
      '/products': '/productos',
      '/about': '/nosotros',
      '/contact': '/contacto',
      '/services/level-1-essentials': '/servicios/nivel-1-essentials',
      '/services/level-2-advanced': '/servicios/nivel-2-avanzado',
      '/services/level-3-consulting': '/servicios/nivel-3-consultoria',
      '/services/level-4-platforms': '/servicios/nivel-4-plataformas',
      '/services/level-5-strategic': '/servicios/nivel-5-estrategico',
    },
    'en-US': {
      // English routes are the default
    },
  },
} as const;

export type Locale = (typeof i18nConfig.locales)[number];
export type LocalePrefix = 'always' | 'as-needed' | 'never';