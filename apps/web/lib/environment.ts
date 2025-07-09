export const environment = {
  isStaging: process.env.NEXT_PUBLIC_ENV === 'staging',
  isProduction: process.env.NEXT_PUBLIC_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isStaticExport: process.env.DEPLOY_TARGET === 'github-pages',
  
  // Features available in different environments
  features: {
    database: process.env.DEPLOY_TARGET !== 'github-pages',
    authentication: process.env.DEPLOY_TARGET !== 'github-pages',
    emailQueue: process.env.DEPLOY_TARGET !== 'github-pages',
    webhooks: process.env.DEPLOY_TARGET !== 'github-pages',
    analytics: true,
    featureFlags: process.env.NEXT_PUBLIC_FEATURE_FLAGS_ENABLED === 'true',
  },
  
  // API endpoints
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 
             (process.env.DEPLOY_TARGET === 'github-pages' ? 'https://api.madfam.io' : '/api'),
  },
  
  // External services
  services: {
    plausible: {
      domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'madfam.io',
      enabled: true,
    },
    n8n: {
      enabled: process.env.DEPLOY_TARGET !== 'github-pages',
    },
  },
};