/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@madfam/ui', '@madfam/core', '@madfam/analytics', '@madfam/i18n'],
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
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

  async rewrites() {
    return {
      beforeFiles: [
        // Locale rewrites
        {
          source: '/servicios/:path*',
          destination: '/es-MX/services/:path*',
        },
        {
          source: '/productos/:path*',
          destination: '/es-MX/products/:path*',
        },
      ],
    };
  },

  experimental: {
    optimizeCss: false, // Disabled to avoid critters dependency issue
    scrollRestoration: true,
  }
};

module.exports = nextConfig;