export const i18nConfig = {
  defaultLocale: 'es-MX',
  locales: ['es-MX', 'en-US', 'pt-BR'] as const,
  
  localeDetection: true,
  
  // SEO-friendly locale names
  localeNames: {
    'es-MX': 'Español (México)',
    'en-US': 'English (US)',
    'pt-BR': 'Português (Brasil)',
  },
  
  // Route translations - maps canonical routes to localized routes
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
    'pt-BR': {
      '/services': '/servicos',
      '/products': '/produtos',
      '/about': '/sobre',
      '/contact': '/contato',
      '/blog': '/blog',
      '/careers': '/carreiras',
      '/case-studies': '/casos-de-sucesso',
      '/docs': '/documentacao',
      '/guides': '/guias',
      '/api': '/api',
      '/assessment': '/avaliacao',
      '/calculator': '/calculadora',
      '/estimator': '/estimador',
      '/privacy': '/privacidade',
      '/terms': '/termos',
      '/cookies': '/cookies',
      '/services/level-1-essentials': '/servicos/nivel-1-essenciais',
      '/services/level-2-advanced': '/servicos/nivel-2-avancado',
      '/services/level-3-consulting': '/servicos/nivel-3-consultoria',
      '/services/level-4-platforms': '/servicos/nivel-4-plataformas',
      '/services/level-5-strategic': '/servicos/nivel-5-estrategico',
    },
    'en-US': {
      // English routes are the canonical/default routes
    },
  },
} as const;

export type Locale = (typeof i18nConfig.locales)[number];
export type LocalePrefix = 'always' | 'as-needed' | 'never';