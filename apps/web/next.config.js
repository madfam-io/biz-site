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