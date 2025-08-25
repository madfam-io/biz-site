export const i18nConfig = {
  // UPDATED: Normalized locales (es-MX → es, en-US → en, pt-BR → pt-br)
  defaultLocale: 'es',
  locales: ['es', 'en', 'pt-br'] as const,

  localeDetection: true,

  // SEO-friendly locale names
  localeNames: {
    es: 'Español',
    en: 'English',
    'pt-br': 'Português (Brasil)',
  },

  // Hreflang mappings for SEO
  hreflangMap: {
    es: 'es-MX',
    en: 'en',
    'pt-br': 'pt-BR',
  },

  // Route translations - maps canonical routes to localized routes
  routes: {
    es: {
      // NEW: Corporate structure routes
      '/arms': '/unidades',
      '/arms/aureo-labs': '/unidades/aureo-labs',
      '/arms/primavera3d': '/unidades/primavera3d',
      '/arms/health': '/unidades/salud',
      '/arms/aero': '/unidades/aero',
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
    'pt-br': {
      // NEW: Corporate structure routes
      '/arms': '/unidades',
      '/arms/aureo-labs': '/unidades/aureo-labs',
      '/arms/primavera3d': '/unidades/primavera3d',
      '/arms/health': '/unidades/saude',
      '/arms/aero': '/unidades/aero',
      '/products': '/produtos',
      '/programs': '/programas',
      '/work': '/casos',
      '/security': '/seguranca',
      '/about': '/sobre',
      '/contact': '/contato',

      // LEGACY: Keep existing service routes for redirects
      '/services': '/servicos',
      '/services/level-1-essentials': '/servicos/nivel-1-essenciais',
      '/services/level-2-advanced': '/servicos/nivel-2-avancado',
      '/services/level-3-consulting': '/servicos/nivel-3-consultoria',
      '/services/level-4-platforms': '/servicos/nivel-4-plataformas',
      '/services/level-5-strategic': '/servicos/nivel-5-estrategico',

      // PRESERVE: Existing routes
      '/assessment': '/avaliacao',
      '/calculator': '/calculadora',
      '/blog': '/blog',
      '/careers': '/carreiras',
      '/case-studies': '/casos-de-sucesso',
      '/docs': '/documentacao',
      '/guides': '/guias',
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
