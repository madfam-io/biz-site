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
      'es-MX': 'Essentials',
      'en-US': 'Essentials',
      'pt-BR': 'Essenciais',
    },
    description: {
      'es-MX': 'Diseño 3D y servicios gráficos para necesidades inmediatas',
      'en-US': '3D design and graphic services for immediate needs',
      'pt-BR': 'Design 3D e serviços gráficos para necessidades imediatas',
    },
    startingPrice: 5000,
    currency: 'MXN',
    features: {
      'es-MX': [
        'Modelado y renderizado 3D',
        'Diseño gráfico para digital/impreso',
        'Animaciones básicas',
        'Entrega en 48 horas',
        'Revisiones ilimitadas por 7 días',
      ],
      'en-US': [
        '3D modeling and rendering',
        'Graphic design for digital/print',
        'Basic animations',
        '48-hour turnaround',
        'Unlimited revisions for 7 days',
      ],
      'pt-BR': [
        'Modelagem e renderização 3D',
        'Design gráfico para digital/impresso',
        'Animações básicas',
        'Entrega em 48 horas',
        'Revisões ilimitadas por 7 dias',
      ],
    },
    idealFor: {
      'es-MX': ['Startups', 'Proyectos pequeños', 'Equipos de marketing'],
      'en-US': ['Startups', 'Small projects', 'Marketing teams'],
      'pt-BR': ['Startups', 'Projetos pequenos', 'Equipes de marketing'],
    },
    cta: {
      text: {
        'es-MX': 'Obtener cotización instantánea',
        'en-US': 'Get instant quote',
        'pt-BR': 'Obter cotação instantânea',
      },
      action: 'quote',
    },
    color: 'leaf',
    icon: '🎨',
    duration: {
      'es-MX': 'Por proyecto',
      'en-US': 'Per project',
      'pt-BR': 'Por projeto',
    },
  },
  [ServiceTier.L2_ADVANCED]: {
    id: ServiceTier.L2_ADVANCED,
    level: 2,
    name: {
      'es-MX': 'Advanced',
      'en-US': 'Advanced',
      'pt-BR': 'Avançado',
    },
    description: {
      'es-MX': 'Diseño paramétrico y experiencias interactivas avanzadas',
      'en-US': 'Parametric design and advanced interactive experiences',
      'pt-BR': 'Design paramétrico e experiências interativas avançadas',
    },
    startingPrice: 25000,
    currency: 'MXN',
    features: {
      'es-MX': [
        'Diseño paramétrico con nodos',
        'Experiencias AR/VR básicas',
        'Visualización de datos 3D',
        'Integración con herramientas existentes',
        'Soporte prioritario',
      ],
      'en-US': [
        'Node-based parametric design',
        'Basic AR/VR experiences',
        '3D data visualization',
        'Integration with existing tools',
        'Priority support',
      ],
      'pt-BR': [
        'Design paramétrico baseado em nós',
        'Experiências AR/VR básicas',
        'Visualização de dados 3D',
        'Integração com ferramentas existentes',
        'Suporte prioritário',
      ],
    },
    idealFor: {
      'es-MX': ['Agencias creativas', 'Proyectos de innovación', 'Presentaciones ejecutivas'],
      'en-US': ['Creative agencies', 'Innovation projects', 'Executive presentations'],
      'pt-BR': ['Agências criativas', 'Projetos de inovação', 'Apresentações executivas'],
    },
    cta: {
      text: {
        'es-MX': 'Agendar consulta',
        'en-US': 'Schedule consultation',
        'pt-BR': 'Agendar consulta',
      },
      action: 'book',
    },
    color: 'sun',
    icon: '🚀',
    duration: {
      'es-MX': '2-4 semanas',
      'en-US': '2-4 weeks',
      'pt-BR': '2-4 semanas',
    },
  },
  [ServiceTier.L3_CONSULTING]: {
    id: ServiceTier.L3_CONSULTING,
    level: 3,
    name: {
      'es-MX': 'Consulting',
      'en-US': 'Consulting',
      'pt-BR': 'Consultoria',
    },
    description: {
      'es-MX': 'Workshops, capacitación y consultoría para transformación digital',
      'en-US': 'Workshops, training, and consulting for digital transformation',
      'pt-BR': 'Workshops, treinamento e consultoria para transformação digital',
    },
    startingPrice: 75000,
    currency: 'MXN',
    features: {
      'es-MX': [
        'Workshops personalizados de IA',
        'Capacitación de equipos técnicos',
        'Auditoría de procesos digitales',
        'Roadmap de transformación',
        'Implementación de mejores prácticas',
        'Sesiones de seguimiento mensuales',
      ],
      'en-US': [
        'Custom AI workshops',
        'Technical team training',
        'Digital process audit',
        'Transformation roadmap',
        'Best practices implementation',
        'Monthly follow-up sessions',
      ],
      'pt-BR': [
        'Workshops personalizados de IA',
        'Treinamento de equipes técnicas',
        'Auditoria de processos digitais',
        'Roadmap de transformação',
        'Implementação de melhores práticas',
        'Sessões de acompanhamento mensais',
      ],
    },
    idealFor: {
      'es-MX': ['Empresas en crecimiento', 'Equipos de innovación', 'Transformación digital'],
      'en-US': ['Growing companies', 'Innovation teams', 'Digital transformation'],
      'pt-BR': ['Empresas em crescimento', 'Equipes de inovação', 'Transformação digital'],
    },
    cta: {
      text: {
        'es-MX': 'Solicitar propuesta',
        'en-US': 'Request proposal',
        'pt-BR': 'Solicitar proposta',
      },
      action: 'contact',
    },
    color: 'lavender',
    icon: '💡',
    duration: {
      'es-MX': '3-6 meses',
      'en-US': '3-6 months',
      'pt-BR': '3-6 meses',
    },
  },
  [ServiceTier.L4_PLATFORMS]: {
    id: ServiceTier.L4_PLATFORMS,
    level: 4,
    name: {
      'es-MX': 'Platforms',
      'en-US': 'Platforms',
      'pt-BR': 'Plataformas',
    },
    description: {
      'es-MX': 'Implementación de SPARK, PENNY y soluciones empresariales',
      'en-US': 'Implementation of SPARK, PENNY, and enterprise solutions',
      'pt-BR': 'Implementação de SPARK, PENNY e soluções empresariais',
    },
    startingPrice: 250000,
    currency: 'MXN',
    features: {
      'es-MX': [
        'Implementación completa de SPARK',
        'Automatización con PENNY',
        'Integraciones empresariales',
        'Dashboards personalizados',
        'Capacitación de administradores',
        'Soporte 24/7',
        'SLA garantizado',
      ],
      'en-US': [
        'Complete SPARK implementation',
        'PENNY automation setup',
        'Enterprise integrations',
        'Custom dashboards',
        'Administrator training',
        '24/7 support',
        'Guaranteed SLA',
      ],
      'pt-BR': [
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
      'es-MX': ['Medianas empresas', 'Operaciones complejas', 'Escalamiento rápido'],
      'en-US': ['Medium enterprises', 'Complex operations', 'Rapid scaling'],
      'pt-BR': ['Médias empresas', 'Operações complexas', 'Escalonamento rápido'],
    },
    cta: {
      text: {
        'es-MX': 'Ver demo',
        'en-US': 'View demo',
        'pt-BR': 'Ver demonstração',
      },
      action: 'demo',
    },
    color: 'creative',
    icon: '⚡',
    duration: {
      'es-MX': '6-12 meses',
      'en-US': '6-12 months',
      'pt-BR': '6-12 meses',
    },
  },
  [ServiceTier.L5_STRATEGIC]: {
    id: ServiceTier.L5_STRATEGIC,
    level: 5,
    name: {
      'es-MX': 'Strategic',
      'en-US': 'Strategic',
      'pt-BR': 'Estratégico',
    },
    description: {
      'es-MX': 'Asociación vCTO para transformación integral del negocio',
      'en-US': 'vCTO partnership for comprehensive business transformation',
      'pt-BR': 'Parceria vCTO para transformação integral do negócio',
    },
    startingPrice: 500000,
    currency: 'MXN',
    features: {
      'es-MX': [
        'CTO virtual dedicado',
        'Estrategia tecnológica completa',
        'Gestión de equipos técnicos',
        'Arquitectura empresarial',
        'Innovación continua',
        'Representación ejecutiva',
        'KPIs y métricas avanzadas',
        'Transformación cultural',
      ],
      'en-US': [
        'Dedicated virtual CTO',
        'Complete technology strategy',
        'Technical team management',
        'Enterprise architecture',
        'Continuous innovation',
        'Executive representation',
        'Advanced KPIs and metrics',
        'Cultural transformation',
      ],
      'pt-BR': [
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
      'es-MX': ['Grandes empresas', 'Transformación total', 'Innovación disruptiva'],
      'en-US': ['Large enterprises', 'Total transformation', 'Disruptive innovation'],
      'pt-BR': ['Grandes empresas', 'Transformação total', 'Inovação disruptiva'],
    },
    cta: {
      text: {
        'es-MX': 'Agendar reunión ejecutiva',
        'en-US': 'Schedule executive meeting',
        'pt-BR': 'Agendar reunião executiva',
      },
      action: 'contact',
    },
    color: 'obsidian',
    icon: '👁️',
    duration: {
      'es-MX': '12+ meses',
      'en-US': '12+ months',
      'pt-BR': '12+ meses',
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