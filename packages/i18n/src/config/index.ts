export const i18nConfig = {
  // UPDATED: Normalized locales (es-MX → es, en-US → en, pt-BR → pt)
  defaultLocale: 'es',
  locales: ['es', 'en', 'pt'] as const,

  localeDetection: true,

  // SEO-friendly locale names
  localeNames: {
    es: 'Español',
    en: 'English',
    pt: 'Português',
  },

  // Hreflang mappings for SEO
  hreflangMap: {
    es: 'es-MX',
    en: 'en',
    pt: 'pt-BR',
  },

  // Route translations - maps canonical routes to localized routes
  routes: {
    es: {
      // NEW: Corporate structure routes (updated to use '/solutions')
      '/solutions': '/soluciones',
      '/solutions/aureo-labs': '/soluciones/aureo-labs',
      '/solutions/primavera3d': '/soluciones/primavera3d',
      '/solutions/colabs': '/soluciones/colabs',
      '/solutions/showtech': '/soluciones/showtech',
      '/products': '/productos',
      '/programs': '/programas',
      '/work': '/casos',
      '/security': '/seguridad',
      '/about': '/sobre',
      '/contact': '/contacto',

      // LEGACY: Keep existing service routes for redirects
      '/services': '/servicios',
      '/services/level-1-essentials': '/servicios/nivel-1-esenciales',
      '/services/level-2-advanced': '/servicios/nivel-2-avanzado',
      '/services/level-3-consulting': '/servicios/nivel-3-consultoria',
      '/services/level-4-platforms': '/servicios/nivel-4-plataformas',
      '/services/level-5-strategic': '/servicios/nivel-5-estrategico',

      // PRESERVE: Existing routes
      '/assessment': '/evaluacion',
      '/calculator': '/calculadora',
      '/blog': '/blog',
      '/careers': '/carreras',
      '/case-studies': '/casos-de-estudio',
      '/docs': '/documentacion',
      '/privacy': '/privacidad',
      '/terms': '/terminos',
      '/cookies': '/cookies',
    },
    pt: {
      // Portuguese routes (updated to use '/solutions')
      '/solutions': '/solucoes',
      '/solutions/aureo-labs': '/solucoes/aureo-labs',
      '/solutions/primavera3d': '/solucoes/primavera3d',
      '/solutions/colabs': '/solucoes/colabs',
      '/solutions/showtech': '/solucoes/showtech',
      '/products': '/produtos',
      '/programs': '/programas',
      '/work': '/casos',
      '/security': '/seguranca',
      '/about': '/sobre',
      '/contact': '/contato',
      '/careers': '/carreiras',
      '/case-studies': '/casos-de-sucesso',
      '/docs': '/documentacao',
      '/guides': '/guias',
      '/assessment': '/avaliacao',
      '/calculator': '/calculadora',
      '/estimator': '/estimador',
      '/privacy': '/privacidade',
      '/terms': '/termos',
      '/cookies': '/cookies',
    },
    en: {
      // English routes are the canonical/default routes - no mapping needed
    },
  },
} as const;

export type Locale = (typeof i18nConfig.locales)[number];
export type LocalePrefix = 'always' | 'as-needed' | 'never';
