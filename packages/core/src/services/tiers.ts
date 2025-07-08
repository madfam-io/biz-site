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