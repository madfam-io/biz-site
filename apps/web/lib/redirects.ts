/**
 * MADFAM Corporate Restructure Redirects
 * Handles migration from old structure to new corporate architecture
 */

export const legacyRedirects = [
  // L1-L5 Services to Programs mapping
  {
    source: '/services',
    destination: '/programs',
    permanent: false, // Temporary during transition
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
    source: '/:locale/services/level-1-essentials',
    destination: '/:locale/programs#design-fabrication',
    permanent: false,
  },
  {
    source: '/:locale/services/level-2-advanced',
    destination: '/:locale/programs#design-fabrication',
    permanent: false,
  },
  {
    source: '/:locale/services/level-3-consulting',
    destination: '/:locale/programs#strategy-enablement',
    permanent: false,
  },
  {
    source: '/:locale/services/level-4-platforms',
    destination: '/:locale/programs#platform-pilots',
    permanent: false,
  },
  {
    source: '/:locale/services/level-5-strategic',
    destination: '/:locale/programs#strategic-partnerships',
    permanent: false,
  },

  // Localized Spanish service redirects
  {
    source: '/servicios',
    destination: '/programas',
    permanent: false,
  },
  {
    source: '/servicios/nivel-1-esenciales',
    destination: '/programas#design-fabrication',
    permanent: false,
  },
  {
    source: '/servicios/nivel-2-avanzado',
    destination: '/programas#design-fabrication',
    permanent: false,
  },
  {
    source: '/servicios/nivel-3-consultoria',
    destination: '/programas#strategy-enablement',
    permanent: false,
  },
  {
    source: '/servicios/nivel-4-plataformas',
    destination: '/programas#platform-pilots',
    permanent: false,
  },
  {
    source: '/servicios/nivel-5-estrategico',
    destination: '/programas#strategic-partnerships',
    permanent: false,
  },

  // Portuguese service redirects
  {
    source: '/servicos',
    destination: '/programas',
    permanent: false,
  },
  {
    source: '/servicos/nivel-1-essenciais',
    destination: '/programas#design-fabrication',
    permanent: false,
  },
  {
    source: '/servicos/nivel-2-avancado',
    destination: '/programas#design-fabrication',
    permanent: false,
  },
  {
    source: '/servicos/nivel-3-consultoria',
    destination: '/programas#strategy-enablement',
    permanent: false,
  },
  {
    source: '/servicos/nivel-4-plataformas',
    destination: '/programas#platform-pilots',
    permanent: false,
  },
  {
    source: '/servicos/nivel-5-estrategico',
    destination: '/programas#strategic-partnerships',
    permanent: false,
  },
];

/**
 * Corporate structure navigation mapping
 * Maps old URLs to new corporate structure
 */
export const corporateMapping = {
  // Old L1-L5 to new Programs
  L1_ESSENTIALS: {
    program: 'design-fabrication',
    arm: 'primavera3d',
    provider: 'Primavera3D',
  },
  L2_ADVANCED: {
    program: 'design-fabrication',
    arm: 'primavera3d',
    provider: 'Primavera3D',
  },
  L3_CONSULTING: {
    program: 'strategy-enablement',
    arm: 'madfam-aureo',
    provider: 'MADFAM/Aureo',
  },
  L4_PLATFORMS: {
    program: 'platform-pilots',
    arm: 'aureo-labs',
    provider: 'Aureo Labs',
  },
  L5_STRATEGIC: {
    program: 'strategic-partnerships',
    arm: 'madfam',
    provider: 'MADFAM',
  },
};

/**
 * Product ownership mapping
 * Defines which ARM owns which product
 */
export const productOwnership = {
  penny: {
    arm: 'aureo-labs',
    badge: 'un producto de Aureo Labs',
    url: '/products/penny',
  },
  'cotiza-studio': {
    arm: 'aureo-labs',
    badge: 'un producto de Aureo Labs',
    url: 'https://cotiza.studio',
  },
  'forge-sight': {
    arm: 'aureo-labs',
    badge: 'plataforma de Aureo Labs',
    url: 'https://forgesight.quest',
  },
  dhanam: {
    arm: 'madfam',
    badge: 'por MADFAM',
    url: '#',
  },
  avala: {
    arm: 'aureo-labs',
    badge: 'plataforma de Aureo Labs',
    url: '#',
  },
  'renec-harvester': {
    arm: 'open-data',
    badge: 'datos abiertos',
    url: '#',
  },
  mundii: {
    arm: 'tbd',
    badge: 'por determinar',
    url: '#',
  },
};
