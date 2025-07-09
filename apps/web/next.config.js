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
    
    // Spanish rewrites
    rewrites.push(
      { source: '/es-MX/servicios', destination: '/es-MX/services' },
      { source: '/es-MX/productos', destination: '/es-MX/products' },
      { source: '/es-MX/nosotros', destination: '/es-MX/about' },
      { source: '/es-MX/contacto', destination: '/es-MX/contact' },
    );
    
    // TODO: Portuguese rewrites (when translations are complete)
    // rewrites.push(
    //   { source: '/pt-BR/servicos', destination: '/pt-BR/services' },
    //   { source: '/pt-BR/produtos', destination: '/pt-BR/products' },
    //   { source: '/pt-BR/sobre', destination: '/pt-BR/about' },
    //   { source: '/pt-BR/contato', destination: '/pt-BR/contact' },
    // );
    
    return rewrites;
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ];
  },


  experimental: {
    optimizeCss: false, // Disabled to avoid critters dependency issue
    scrollRestoration: true,
  }
};

module.exports = withNextIntl(nextConfig);