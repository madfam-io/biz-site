export const brandColors = {
  // Core MADFAM Colors (extracted from logo)
  primary: {
    green: '#2c8136', // Growth, sustainability
    greenLight: '#52b788', // Lighter variant
    greenDark: '#1e5128', // Darker variant

    purple: '#58326f', // Innovation, creativity
    purpleLight: '#7d4f96', // Lighter variant
    purpleDark: '#3d1e4f', // Darker variant

    yellow: '#eebc15', // Energy, optimism
    yellowLight: '#f7d64a', // Lighter variant
    yellowDark: '#d4a20d', // Darker variant
  },

  // Extended Solarpunk Heritage Palette
  solarpunk: {
    solarOrange: '#ff6b35', // Solar energy
    solarAmber: '#ffa500', // Warm light
    leafGreen: '#52b788', // Natural growth
    forestGreen: '#2d6a4f', // Deep nature
    skyBlue: '#4ecdc4', // Open possibilities
    oceanBlue: '#006ba6', // Depth
    earthBrown: '#956633', // Grounded stability
    terracotta: '#c65d00', // Warmth
  },

  // Corporate Professional Palette
  corporate: {
    deepBlue: '#1e3a8a', // Trust, stability
    navyBlue: '#1e293b', // Authority
    charcoal: '#1f2937', // Professional depth
    graphite: '#374151', // Balance
    pearl: '#f9fafb', // Clean clarity
    silver: '#e5e7eb', // Elegance
    slate: '#64748b', // Balanced neutral
    steel: '#475569', // Strength
  },

  // Semantic Colors
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Gradient Definitions
  gradients: {
    // Solarpunk Heritage
    solar: 'linear-gradient(135deg, #ff6b35 0%, #ffa500 100%)',
    nature: 'linear-gradient(135deg, #52b788 0%, #2c8136 100%)',
    ocean: 'linear-gradient(135deg, #4ecdc4 0%, #006ba6 100%)',

    // Corporate Evolution
    professional: 'linear-gradient(135deg, #1e3a8a 0%, #58326f 100%)',
    innovation: 'linear-gradient(135deg, #58326f 0%, #eebc15 100%)',
    trust: 'linear-gradient(135deg, #1e293b 0%, #1e3a8a 100%)',

    // Hybrid Harmony
    bridge: 'linear-gradient(135deg, #2c8136 0%, #58326f 50%, #eebc15 100%)',
    spectrum: 'linear-gradient(90deg, #2c8136, #52b788, #4ecdc4, #58326f, #eebc15)',
    sunrise: 'linear-gradient(135deg, #eebc15 0%, #ff6b35 50%, #58326f 100%)',
  },

  // Dark Mode Variants
  dark: {
    background: '#0f172a',
    surface: '#1e293b',
    border: '#334155',
    text: {
      primary: '#f1f5f9',
      secondary: '#cbd5e1',
      muted: '#94a3b8',
    },
  },

  // Light Mode Variants
  light: {
    background: '#ffffff',
    surface: '#f8fafc',
    border: '#e2e8f0',
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      muted: '#64748b',
    },
  },
};

// CSS Custom Properties Generator
export const generateCSSVariables = (mode: 'light' | 'dark' = 'light') => {
  const colors = mode === 'dark' ? brandColors.dark : brandColors.light;

  return `
    :root {
      /* Primary Brand Colors */
      --brand-green: ${brandColors.primary.green};
      --brand-purple: ${brandColors.primary.purple};
      --brand-yellow: ${brandColors.primary.yellow};
      
      /* Solarpunk Heritage */
      --solar-orange: ${brandColors.solarpunk.solarOrange};
      --leaf-green: ${brandColors.solarpunk.leafGreen};
      --sky-blue: ${brandColors.solarpunk.skyBlue};
      
      /* Corporate Professional */
      --deep-blue: ${brandColors.corporate.deepBlue};
      --charcoal: ${brandColors.corporate.charcoal};
      --slate: ${brandColors.corporate.slate};
      
      /* Theme Colors */
      --background: ${colors.background};
      --surface: ${colors.surface};
      --border: ${colors.border};
      --text-primary: ${colors.text.primary};
      --text-secondary: ${colors.text.secondary};
      --text-muted: ${colors.text.muted};
      
      /* Gradients */
      --gradient-bridge: ${brandColors.gradients.bridge};
      --gradient-innovation: ${brandColors.gradients.innovation};
      --gradient-solar: ${brandColors.gradients.solar};
    }
  `;
};

// Tailwind Color Config Extension
export const tailwindColors = {
  brand: {
    green: brandColors.primary.green,
    'green-light': brandColors.primary.greenLight,
    'green-dark': brandColors.primary.greenDark,
    purple: brandColors.primary.purple,
    'purple-light': brandColors.primary.purpleLight,
    'purple-dark': brandColors.primary.purpleDark,
    yellow: brandColors.primary.yellow,
    'yellow-light': brandColors.primary.yellowLight,
    'yellow-dark': brandColors.primary.yellowDark,
  },
  solar: brandColors.solarpunk,
  corp: brandColors.corporate,
};
