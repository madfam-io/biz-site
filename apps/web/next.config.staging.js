/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@madfam/ui', '@madfam/core', '@madfam/analytics', '@madfam/i18n'],
  
  // Static export for GitHub Pages
  output: 'export',
  
  // Configure base path for GitHub Pages
  basePath: '/biz-site',
  
  // Enable trailing slash for static export
  trailingSlash: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
    // Disable image optimization for static export
    unoptimized: true,
  },

  // Disable features that don't work with static export
  // No headers, rewrites, or redirects in static export
  
  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
  }
};

module.exports = nextConfig;