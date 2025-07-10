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

  async rewrites() {
    // Generate rewrites from i18n configuration
    const rewrites = [];

    // Spanish rewrites - main pages
    rewrites.push(
      { source: '/es-MX/servicios', destination: '/es-MX/services' },
      { source: '/es-MX/productos', destination: '/es-MX/products' },
      { source: '/es-MX/nosotros', destination: '/es-MX/about' },
      { source: '/es-MX/contacto', destination: '/es-MX/contact' }
    );

    // Spanish rewrites - service subpages (using dynamic [slug] route)
    rewrites.push(
      {
        source: '/es-MX/servicios/nivel-1-esenciales',
        destination: '/es-MX/services/nivel-1-esenciales',
      },
      {
        source: '/es-MX/servicios/nivel-2-avanzado',
        destination: '/es-MX/services/nivel-2-avanzado',
      },
      {
        source: '/es-MX/servicios/nivel-3-consultoria',
        destination: '/es-MX/services/nivel-3-consultoria',
      },
      {
        source: '/es-MX/servicios/nivel-4-plataformas',
        destination: '/es-MX/services/nivel-4-plataformas',
      },
      {
        source: '/es-MX/servicios/nivel-5-estrategico',
        destination: '/es-MX/services/nivel-5-estrategico',
      }
    );

    // Portuguese rewrites - main pages
    rewrites.push(
      { source: '/pt-BR/servicos', destination: '/pt-BR/services' },
      { source: '/pt-BR/produtos', destination: '/pt-BR/products' },
      { source: '/pt-BR/sobre', destination: '/pt-BR/about' },
      { source: '/pt-BR/contato', destination: '/pt-BR/contact' },
      { source: '/pt-BR/carreiras', destination: '/pt-BR/careers' },
      { source: '/pt-BR/casos-de-sucesso', destination: '/pt-BR/case-studies' },
      { source: '/pt-BR/documentacao', destination: '/pt-BR/docs' },
      { source: '/pt-BR/guias', destination: '/pt-BR/guides' },
      { source: '/pt-BR/avaliacao', destination: '/pt-BR/assessment' },
      { source: '/pt-BR/calculadora', destination: '/pt-BR/calculator' },
      { source: '/pt-BR/estimador', destination: '/pt-BR/estimator' },
      { source: '/pt-BR/privacidade', destination: '/pt-BR/privacy' },
      { source: '/pt-BR/termos', destination: '/pt-BR/terms' },
      { source: '/pt-BR/cookies', destination: '/pt-BR/cookies' }
    );

    // Portuguese rewrites - service subpages (using dynamic [slug] route)
    rewrites.push(
      {
        source: '/pt-BR/servicos/nivel-1-essenciais',
        destination: '/pt-BR/services/nivel-1-essenciais',
      },
      {
        source: '/pt-BR/servicos/nivel-2-avancado',
        destination: '/pt-BR/services/nivel-2-avancado',
      },
      {
        source: '/pt-BR/servicos/nivel-3-consultoria',
        destination: '/pt-BR/services/nivel-3-consultoria',
      },
      {
        source: '/pt-BR/servicos/nivel-4-plataformas',
        destination: '/pt-BR/services/nivel-4-plataformas',
      },
      {
        source: '/pt-BR/servicos/nivel-5-estrategico',
        destination: '/pt-BR/services/nivel-5-estrategico',
      }
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
