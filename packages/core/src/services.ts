import { LocaleContent } from '@madfam/i18n';

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
  name: LocaleContent;
  description: LocaleContent;
  startingPrice: number;
  currency: 'MXN' | 'USD';
  features: LocaleContent<string[]>;
  idealFor: LocaleContent<string[]>;
  cta: {
    text: LocaleContent;
    action: 'quote' | 'contact' | 'book' | 'demo';
  };
  color: 'leaf' | 'sun' | 'lavender' | 'obsidian' | 'creative';
  icon: string;
  duration?: LocaleContent;
}

export const serviceTiers: Record<ServiceTier, ServiceTierConfig> = {
  [ServiceTier.L1_ESSENTIALS]: {
    id: ServiceTier.L1_ESSENTIALS,
    level: 1,
    name: {
      es: 'Essentials',
      en: 'Essentials',
      'pt-br': 'Essenciais',
    },
    description: {
      es: 'Diseño 3D y servicios gráficos para necesidades inmediatas',
      en: '3D design and graphic services for immediate needs',
      'pt-br': 'Design 3D e serviços gráficos para necessidades imediatas',
    },
    startingPrice: 5000,
    currency: 'MXN',
    features: {
      es: [
        'Modelado y renderizado 3D',
        'Diseño gráfico para digital/impreso',
        'Animaciones básicas',
        'Entrega en 48 horas',
        'Revisiones ilimitadas por 7 días',
      ],
      en: [
        '3D modeling and rendering',
        'Graphic design for digital/print',
        'Basic animations',
        '48-hour turnaround',
        'Unlimited revisions for 7 days',
      ],
      'pt-br': [
        'Modelagem e renderização 3D',
        'Design gráfico para digital/impresso',
        'Animações básicas',
        'Entrega em 48 horas',
        'Revisões ilimitadas por 7 dias',
      ],
    },
    idealFor: {
      es: ['Startups', 'Proyectos pequeños', 'Equipos de marketing'],
      en: ['Startups', 'Small projects', 'Marketing teams'],
      'pt-br': ['Startups', 'Projetos pequenos', 'Equipes de marketing'],
    },
    cta: {
      text: {
        es: 'Obtener cotización instantánea',
        en: 'Get instant quote',
        'pt-br': 'Obter cotação instantânea',
      },
      action: 'quote',
    },
    color: 'leaf',
    icon: '🎨',
    duration: {
      es: 'Por proyecto',
      en: 'Per project',
      'pt-br': 'Por projeto',
    },
  },
  [ServiceTier.L2_ADVANCED]: {
    id: ServiceTier.L2_ADVANCED,
    level: 2,
    name: {
      es: 'Advanced',
      en: 'Advanced',
      'pt-br': 'Avançado',
    },
    description: {
      es: 'Diseño paramétrico y experiencias interactivas avanzadas',
      en: 'Parametric design and advanced interactive experiences',
      'pt-br': 'Design paramétrico e experiências interativas avançadas',
    },
    startingPrice: 25000,
    currency: 'MXN',
    features: {
      es: [
        'Diseño paramétrico con nodos',
        'Experiencias AR/VR básicas',
        'Visualización de datos 3D',
        'Integración con herramientas existentes',
        'Soporte prioritario',
      ],
      en: [
        'Node-based parametric design',
        'Basic AR/VR experiences',
        '3D data visualization',
        'Integration with existing tools',
        'Priority support',
      ],
      'pt-br': [
        'Design paramétrico baseado em nós',
        'Experiências AR/VR básicas',
        'Visualização de dados 3D',
        'Integração com ferramentas existentes',
        'Suporte prioritário',
      ],
    },
    idealFor: {
      es: ['Agencias creativas', 'Proyectos de innovación', 'Presentaciones ejecutivas'],
      en: ['Creative agencies', 'Innovation projects', 'Executive presentations'],
      'pt-br': ['Agências criativas', 'Projetos de inovação', 'Apresentações executivas'],
    },
    cta: {
      text: {
        es: 'Agendar consulta',
        en: 'Schedule consultation',
        'pt-br': 'Agendar consulta',
      },
      action: 'book',
    },
    color: 'sun',
    icon: '🚀',
    duration: {
      es: '2-4 semanas',
      en: '2-4 weeks',
      'pt-br': '2-4 semanas',
    },
  },
  [ServiceTier.L3_CONSULTING]: {
    id: ServiceTier.L3_CONSULTING,
    level: 3,
    name: {
      es: 'Consulting',
      en: 'Consulting',
      'pt-br': 'Consultoria',
    },
    description: {
      es: 'Workshops, capacitación y consultoría para transformación digital',
      en: 'Workshops, training, and consulting for digital transformation',
      'pt-br': 'Workshops, treinamento e consultoria para transformação digital',
    },
    startingPrice: 75000,
    currency: 'MXN',
    features: {
      es: [
        'Workshops personalizados de IA',
        'Capacitación de equipos técnicos',
        'Auditoría de procesos digitales',
        'Roadmap de transformación',
        'Implementación de mejores prácticas',
        'Sesiones de seguimiento mensuales',
      ],
      en: [
        'Custom AI workshops',
        'Technical team training',
        'Digital process audit',
        'Transformation roadmap',
        'Best practices implementation',
        'Monthly follow-up sessions',
      ],
      'pt-br': [
        'Workshops personalizados de IA',
        'Treinamento de equipes técnicas',
        'Auditoria de processos digitais',
        'Roadmap de transformação',
        'Implementação de melhores práticas',
        'Sessões de acompanhamento mensais',
      ],
    },
    idealFor: {
      es: ['Empresas en crecimiento', 'Equipos de innovación', 'Transformación digital'],
      en: ['Growing companies', 'Innovation teams', 'Digital transformation'],
      'pt-br': ['Empresas em crescimento', 'Equipes de inovação', 'Transformação digital'],
    },
    cta: {
      text: {
        es: 'Solicitar propuesta',
        en: 'Request proposal',
        'pt-br': 'Solicitar proposta',
      },
      action: 'contact',
    },
    color: 'lavender',
    icon: '💡',
    duration: {
      es: '3-6 meses',
      en: '3-6 months',
      'pt-br': '3-6 meses',
    },
  },
  [ServiceTier.L4_PLATFORMS]: {
    id: ServiceTier.L4_PLATFORMS,
    level: 4,
    name: {
      es: 'Platforms',
      en: 'Platforms',
      'pt-br': 'Plataformas',
    },
    description: {
      es: 'Implementación de SPARK, PENNY y soluciones empresariales',
      en: 'Implementation of SPARK, PENNY, and enterprise solutions',
      'pt-br': 'Implementação de SPARK, PENNY e soluções empresariais',
    },
    startingPrice: 250000,
    currency: 'MXN',
    features: {
      es: [
        'Implementación completa de SPARK',
        'Automatización con PENNY',
        'Integraciones empresariales',
        'Dashboards personalizados',
        'Capacitación de administradores',
        'Soporte 24/7',
        'SLA garantizado',
      ],
      en: [
        'Complete SPARK implementation',
        'PENNY automation setup',
        'Enterprise integrations',
        'Custom dashboards',
        'Administrator training',
        '24/7 support',
        'Guaranteed SLA',
      ],
      'pt-br': [
        'Implementação completa do SPARK',
        'Configuração de automação PENNY',
        'Integrações empresariais',
        'Dashboards personalizados',
        'Treinamento de administradores',
        'Suporte 24/7',
        'SLA garantido',
      ],
    },
    idealFor: {
      es: ['Medianas empresas', 'Operaciones complejas', 'Escalamiento rápido'],
      en: ['Medium enterprises', 'Complex operations', 'Rapid scaling'],
      'pt-br': ['Médias empresas', 'Operações complexas', 'Escalonamento rápido'],
    },
    cta: {
      text: {
        es: 'Ver demo',
        en: 'View demo',
        'pt-br': 'Ver demonstração',
      },
      action: 'demo',
    },
    color: 'creative',
    icon: '⚡',
    duration: {
      es: '6-12 meses',
      en: '6-12 months',
      'pt-br': '6-12 meses',
    },
  },
  [ServiceTier.L5_STRATEGIC]: {
    id: ServiceTier.L5_STRATEGIC,
    level: 5,
    name: {
      es: 'Strategic',
      en: 'Strategic',
      'pt-br': 'Estratégico',
    },
    description: {
      es: 'Asociación vCTO para transformación integral del negocio',
      en: 'vCTO partnership for comprehensive business transformation',
      'pt-br': 'Parceria vCTO para transformação integral do negócio',
    },
    startingPrice: 500000,
    currency: 'MXN',
    features: {
      es: [
        'CTO virtual dedicado',
        'Estrategia tecnológica completa',
        'Gestión de equipos técnicos',
        'Arquitectura empresarial',
        'Innovación continua',
        'Representación ejecutiva',
        'KPIs y métricas avanzadas',
        'Transformación cultural',
      ],
      en: [
        'Dedicated virtual CTO',
        'Complete technology strategy',
        'Technical team management',
        'Enterprise architecture',
        'Continuous innovation',
        'Executive representation',
        'Advanced KPIs and metrics',
        'Cultural transformation',
      ],
      'pt-br': [
        'CTO virtual dedicado',
        'Estratégia tecnológica completa',
        'Gestão de equipes técnicas',
        'Arquitetura empresarial',
        'Inovação contínua',
        'Representação executiva',
        'KPIs e métricas avançadas',
        'Transformação cultural',
      ],
    },
    idealFor: {
      es: ['Grandes empresas', 'Transformación total', 'Innovación disruptiva'],
      en: ['Large enterprises', 'Total transformation', 'Disruptive innovation'],
      'pt-br': ['Grandes empresas', 'Transformação total', 'Inovação disruptiva'],
    },
    cta: {
      text: {
        es: 'Agendar reunión ejecutiva',
        en: 'Schedule executive meeting',
        'pt-br': 'Agendar reunião executiva',
      },
      action: 'contact',
    },
    color: 'obsidian',
    icon: '👁️',
    duration: {
      es: '12+ meses',
      en: '12+ months',
      'pt-br': '12+ meses',
    },
  },
};

/**
 * Get service tier by ID
 */
export function getServiceTier(id: ServiceTier): ServiceTierConfig | undefined {
  return serviceTiers[id];
}

/**
 * Get all service tiers as array
 */
export function getAllServiceTiers(): ServiceTierConfig[] {
  return Object.values(serviceTiers);
}

/**
 * Get service tiers by level range
 */
export function getServiceTiersByLevel(minLevel: number, maxLevel: number): ServiceTierConfig[] {
  return getAllServiceTiers().filter(tier => tier.level >= minLevel && tier.level <= maxLevel);
}
