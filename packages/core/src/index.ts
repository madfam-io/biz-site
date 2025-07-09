// Core exports - All code consolidated to avoid module resolution issues

// Service Tiers
export enum ServiceTier {
  L1_ESSENTIALS = 'essentials',
  L2_ADVANCED = 'advanced',
  L3_CONSULTING = 'consulting',
  L4_PLATFORMS = 'platforms',
  L5_STRATEGIC = 'strategic',
}

export interface ServiceTierConfig {
  id: ServiceTier;
  level: number;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  startingPrice: number;
  currency: 'MXN' | 'USD';
  features: string[];
  featuresEn: string[];
  idealFor: string[];
  idealForEn: string[];
  cta: {
    text: string;
    textEn: string;
    action: 'quote' | 'contact' | 'book' | 'demo';
  };
  color: 'leaf' | 'sun' | 'lavender' | 'obsidian' | 'creative';
  icon: string;
  duration?: string;
  durationEn?: string;
}

export const serviceTiers: Record<ServiceTier, ServiceTierConfig> = {
  [ServiceTier.L1_ESSENTIALS]: {
    id: ServiceTier.L1_ESSENTIALS,
    level: 1,
    name: 'Essentials',
    nameEn: 'Essentials',
    description: 'Diseño 3D y servicios gráficos para necesidades inmediatas',
    descriptionEn: '3D design and graphic services for immediate needs',
    startingPrice: 5000,
    currency: 'MXN',
    features: [
      'Modelado y renderizado 3D',
      'Diseño gráfico para digital/impreso',
      'Animaciones básicas',
      'Entrega en 48 horas',
      'Revisiones ilimitadas por 7 días',
    ],
    featuresEn: [
      '3D modeling and rendering',
      'Graphic design for digital/print',
      'Basic animations',
      '48-hour turnaround',
      'Unlimited revisions for 7 days',
    ],
    idealFor: ['Startups', 'Proyectos pequeños', 'Equipos de marketing'],
    idealForEn: ['Startups', 'Small projects', 'Marketing teams'],
    cta: { 
      text: 'Obtener cotización instantánea', 
      textEn: 'Get instant quote',
      action: 'quote' 
    },
    color: 'leaf',
    icon: '🎨',
    duration: 'Por proyecto',
    durationEn: 'Per project',
  },
  [ServiceTier.L2_ADVANCED]: {
    id: ServiceTier.L2_ADVANCED,
    level: 2,
    name: 'Advanced',
    nameEn: 'Advanced',
    description: 'Diseño paramétrico y experiencias interactivas avanzadas',
    descriptionEn: 'Parametric design and advanced interactive experiences',
    startingPrice: 25000,
    currency: 'MXN',
    features: [
      'Diseño paramétrico con nodos',
      'Experiencias AR/VR básicas',
      'Visualización de datos 3D',
      'Integración con herramientas existentes',
      'Soporte prioritario',
    ],
    featuresEn: [
      'Node-based parametric design',
      'Basic AR/VR experiences',
      '3D data visualization',
      'Integration with existing tools',
      'Priority support',
    ],
    idealFor: ['Agencias creativas', 'Proyectos de innovación', 'Presentaciones ejecutivas'],
    idealForEn: ['Creative agencies', 'Innovation projects', 'Executive presentations'],
    cta: { 
      text: 'Agendar consulta', 
      textEn: 'Schedule consultation',
      action: 'book' 
    },
    color: 'sun',
    icon: '🚀',
    duration: '2-4 semanas',
    durationEn: '2-4 weeks',
  },
  [ServiceTier.L3_CONSULTING]: {
    id: ServiceTier.L3_CONSULTING,
    level: 3,
    name: 'Consulting',
    nameEn: 'Consulting',
    description: 'Workshops, capacitación y consultoría para transformación digital',
    descriptionEn: 'Workshops, training, and consulting for digital transformation',
    startingPrice: 75000,
    currency: 'MXN',
    features: [
      'Workshops personalizados de IA',
      'Capacitación de equipos técnicos',
      'Auditoría de procesos digitales',
      'Roadmap de transformación',
      'Implementación de mejores prácticas',
      'Sesiones de seguimiento mensuales',
    ],
    featuresEn: [
      'Custom AI workshops',
      'Technical team training',
      'Digital process audit',
      'Transformation roadmap',
      'Best practices implementation',
      'Monthly follow-up sessions',
    ],
    idealFor: ['Empresas en crecimiento', 'Equipos de innovación', 'Transformación digital'],
    idealForEn: ['Growing companies', 'Innovation teams', 'Digital transformation'],
    cta: { 
      text: 'Solicitar propuesta', 
      textEn: 'Request proposal',
      action: 'contact' 
    },
    color: 'lavender',
    icon: '💡',
    duration: '3-6 meses',
    durationEn: '3-6 months',
  },
  [ServiceTier.L4_PLATFORMS]: {
    id: ServiceTier.L4_PLATFORMS,
    level: 4,
    name: 'Platforms',
    nameEn: 'Platforms',
    description: 'Implementación de SPARK, PENNY y soluciones empresariales',
    descriptionEn: 'Implementation of SPARK, PENNY, and enterprise solutions',
    startingPrice: 250000,
    currency: 'MXN',
    features: [
      'Implementación completa de SPARK',
      'Automatización con PENNY',
      'Integraciones empresariales',
      'Dashboards personalizados',
      'Capacitación de administradores',
      'Soporte 24/7',
      'SLA garantizado',
    ],
    featuresEn: [
      'Complete SPARK implementation',
      'PENNY automation setup',
      'Enterprise integrations',
      'Custom dashboards',
      'Administrator training',
      '24/7 support',
      'Guaranteed SLA',
    ],
    idealFor: ['Medianas empresas', 'Operaciones complejas', 'Escalamiento rápido'],
    idealForEn: ['Medium enterprises', 'Complex operations', 'Rapid scaling'],
    cta: { 
      text: 'Ver demo', 
      textEn: 'View demo',
      action: 'demo' 
    },
    color: 'creative',
    icon: '⚡',
    duration: '6-12 meses',
    durationEn: '6-12 months',
  },
  [ServiceTier.L5_STRATEGIC]: {
    id: ServiceTier.L5_STRATEGIC,
    level: 5,
    name: 'Strategic',
    nameEn: 'Strategic',
    description: 'Asociación vCTO para transformación integral del negocio',
    descriptionEn: 'vCTO partnership for comprehensive business transformation',
    startingPrice: 500000,
    currency: 'MXN',
    features: [
      'CTO virtual dedicado',
      'Estrategia tecnológica completa',
      'Gestión de equipos técnicos',
      'Arquitectura empresarial',
      'Innovación continua',
      'Representación ejecutiva',
      'KPIs y métricas avanzadas',
      'Transformación cultural',
    ],
    featuresEn: [
      'Dedicated virtual CTO',
      'Complete technology strategy',
      'Technical team management',
      'Enterprise architecture',
      'Continuous innovation',
      'Executive representation',
      'Advanced KPIs and metrics',
      'Cultural transformation',
    ],
    idealFor: ['Grandes empresas', 'Transformación total', 'Innovación disruptiva'],
    idealForEn: ['Large enterprises', 'Total transformation', 'Disruptive innovation'],
    cta: { 
      text: 'Agendar reunión ejecutiva', 
      textEn: 'Schedule executive meeting',
      action: 'contact' 
    },
    color: 'obsidian',
    icon: '👁️',
    duration: '12+ meses',
    durationEn: '12+ months',
  },
};

// Feature Flags
export interface FeatureFlag {
  key: string;
  name: string;
  description: string;
  defaultValue: boolean;
  environments: {
    development: boolean;
    staging: boolean;
    production: boolean;
  };
  rolloutPercentage?: number;
  userGroups?: string[];
}

export const featureFlags: Record<string, FeatureFlag> = {
  NEW_LEAD_SCORING: {
    key: 'new_lead_scoring',
    name: 'AI Lead Scoring v2',
    description: 'Enhanced AI-powered lead scoring algorithm',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: false,
    },
    rolloutPercentage: 10,
  },
  INTERACTIVE_CALCULATOR: {
    key: 'interactive_calculator',
    name: 'ROI Calculator',
    description: 'Interactive ROI calculator for services',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: true,
    },
  },
  CHAT_SUPPORT: {
    key: 'chat_support',
    name: 'Live Chat Support',
    description: 'Real-time chat with support team',
    defaultValue: false,
    environments: {
      development: true,
      staging: false,
      production: false,
    },
  },
  PORTUGUESE_LOCALE: {
    key: 'portuguese_locale',
    name: 'Portuguese Language',
    description: 'Full Portuguese (BR) translation',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: false,
    },
  },
  ADVANCED_ANALYTICS: {
    key: 'advanced_analytics',
    name: 'Advanced Analytics Dashboard',
    description: 'Enhanced analytics with AI insights',
    defaultValue: false,
    environments: {
      development: true,
      staging: true,
      production: false,
    },
  },
  N8N_WORKFLOWS: {
    key: 'n8n_workflows',
    name: 'n8n Workflow Integration',
    description: 'Automated workflows with n8n',
    defaultValue: true,
    environments: {
      development: true,
      staging: true,
      production: true,
    },
  },
};

export type Environment = 'development' | 'staging' | 'production';

export class FeatureFlagProvider {
  private environment: Environment;
  private userId?: string;

  constructor(environment?: string, userId?: string) {
    this.environment = (environment as Environment) || 'development';
    this.userId = userId;
  }

  isEnabled(flagKey: string): boolean {
    const flag = featureFlags[flagKey];
    if (!flag) return false;

    // Check environment-specific setting
    const envEnabled = flag.environments[this.environment];
    if (!envEnabled) return false;

    // Check rollout percentage if in production
    if (this.environment === 'production' && flag.rolloutPercentage) {
      return this.checkRolloutPercentage(flagKey, flag.rolloutPercentage);
    }

    return true;
  }

  getAllFlags(): Record<string, boolean> {
    const flags: Record<string, boolean> = {};
    
    Object.keys(featureFlags).forEach(key => {
      flags[key] = this.isEnabled(key);
    });

    return flags;
  }

  private checkRolloutPercentage(flagKey: string, percentage: number): boolean {
    if (!this.userId) return false;
    
    // Create a stable hash based on user ID and flag key
    const hash = this.hashString(`${this.userId}-${flagKey}`);
    return (hash % 100) < percentage;
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}