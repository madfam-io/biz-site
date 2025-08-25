const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@madfam/ui', '@madfam/core', '@madfam/analytics', '@madfam/i18n'],

  // Use static export only for GitHub Pages
  output: process.env.DEPLOY_TARGET === 'github-pages' ? 'export' : undefined,

  // Configure base path only for GitHub Pages
  basePath: process.env.DEPLOY_TARGET === 'github-pages' ? '/biz-site' : '',

  // Add trailing slash only for static export
  trailingSlash: process.env.DEPLOY_TARGET === 'github-pages' ? true : false,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
    // Disable image optimization for static export
    unoptimized: process.env.DEPLOY_TARGET === 'github-pages',
  },

  async redirects() {
    return [
      // SPARK brand migration to Aureo Studio (permanent)
      {
        source: '/spark',
        destination: '/products#aureo-studio',
        permanent: true,
      },
      {
        source: '/products/spark',
        destination: '/products#aureo-studio',
        permanent: true,
      },
      {
        source: '/:locale/products/spark',
        destination: '/:locale/products#aureo-studio',
        permanent: true,
      },

      // L1-L5 Services to Programs mapping (temporary during transition)
      {
        source: '/services',
        destination: '/programs',
        permanent: false,
      },
      {
        source: '/:locale/services',
        destination: '/:locale/programs',
        permanent: false,
      },

      // Specific service tiers to programs
      {
        source: '/services/level-1-essentials',
        destination: '/programs#design-fabrication',
        permanent: false,
      },
      {
        source: '/services/level-2-advanced',
        destination: '/programs#design-fabrication',
        permanent: false,
      },
      {
        source: '/services/level-3-consulting',
        destination: '/programs#strategy-enablement',
        permanent: false,
      },
      {
        source: '/services/level-4-platforms',
        destination: '/programs#platform-pilots',
        permanent: false,
      },
      {
        source: '/services/level-5-strategic',
        destination: '/programs#strategic-partnerships',
        permanent: false,
      },

      // Localized service redirects
      {
        source: '/:locale/services/level-:tier(1|2|3|4|5)-:name',
        destination: '/:locale/programs',
        permanent: false,
      },

      // Legacy locale redirects (es-MX → es, en-US → en, pt-BR → pt-br)
      {
        source: '/es-MX/:path*',
        destination: '/es/:path*',
        permanent: true,
      },
      {
        source: '/en-US/:path*',
        destination: '/en/:path*',
        permanent: true,
      },
      {
        source: '/pt-BR/:path*',
        destination: '/pt-br/:path*',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    // Generate rewrites from i18n configuration for normalized locales
    const rewrites = [];

    // Spanish rewrites - main pages (es → localized routes)
    rewrites.push(
      { source: '/es/unidades', destination: '/es/arms' },
      { source: '/es/productos', destination: '/es/products' },
      { source: '/es/programas', destination: '/es/programs' },
      { source: '/es/casos', destination: '/es/work' },
      { source: '/es/seguridad', destination: '/es/security' },
      { source: '/es/sobre', destination: '/es/about' },
      { source: '/es/contacto', destination: '/es/contact' }
    );

    // Spanish rewrites - corporate structure
    rewrites.push(
      { source: '/es/unidades/aureo-labs', destination: '/es/arms/aureo-labs' },
      { source: '/es/unidades/primavera3d', destination: '/es/arms/primavera3d' },
      { source: '/es/unidades/salud', destination: '/es/arms/health' },
      { source: '/es/unidades/aero', destination: '/es/arms/aero' }
    );

    // Portuguese rewrites - main pages (pt-br → localized routes)
    rewrites.push(
      { source: '/pt-br/unidades', destination: '/pt-br/arms' },
      { source: '/pt-br/produtos', destination: '/pt-br/products' },
      { source: '/pt-br/programas', destination: '/pt-br/programs' },
      { source: '/pt-br/casos', destination: '/pt-br/work' },
      { source: '/pt-br/seguranca', destination: '/pt-br/security' },
      { source: '/pt-br/sobre', destination: '/pt-br/about' },
      { source: '/pt-br/contato', destination: '/pt-br/contact' },
      // Legacy routes
      { source: '/pt-br/carreiras', destination: '/pt-br/careers' },
      { source: '/pt-br/casos-de-sucesso', destination: '/pt-br/case-studies' },
      { source: '/pt-br/documentacao', destination: '/pt-br/docs' },
      { source: '/pt-br/guias', destination: '/pt-br/guides' },
      { source: '/pt-br/avaliacao', destination: '/pt-br/assessment' },
      { source: '/pt-br/calculadora', destination: '/pt-br/calculator' },
      { source: '/pt-br/estimador', destination: '/pt-br/estimator' },
      { source: '/pt-br/privacidade', destination: '/pt-br/privacy' },
      { source: '/pt-br/termos', destination: '/pt-br/terms' },
      { source: '/pt-br/cookies', destination: '/pt-br/cookies' }
    );

    // Portuguese rewrites - corporate structure
    rewrites.push(
      { source: '/pt-br/unidades/aureo-labs', destination: '/pt-br/arms/aureo-labs' },
      { source: '/pt-br/unidades/primavera3d', destination: '/pt-br/arms/primavera3d' },
      { source: '/pt-br/unidades/saude', destination: '/pt-br/arms/health' },
      { source: '/pt-br/unidades/aero', destination: '/pt-br/arms/aero' }
    );

    return rewrites;
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
      // API Routes specific headers
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_APP_URL || 'https://madfam.io',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400',
          },
        ],
      },
    ];
  },

  experimental: {
    optimizeCss: false, // Disabled to avoid critters dependency issue
    scrollRestoration: true,
  },
};

module.exports = withNextIntl(nextConfig);
