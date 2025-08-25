import { LocalizedContent, createLocalizedContent } from '@/lib/utils/locale-helpers';

export interface VCTOServiceArea {
  area: LocalizedContent<string>;
  icon: string;
  responsibilities: LocalizedContent<string[]>;
}

export const vCTOServices: VCTOServiceArea[] = [
  {
    icon: '🎯',
    area: createLocalizedContent(
      'Technology Strategy',
      'Estrategia Tecnológica',
      'Estratégia Tecnológica'
    ),
    responsibilities: createLocalizedContent(
      [
        '3-5 year technology roadmap',
        'Technology evaluation and selection',
        'Enterprise architecture',
        'Innovation and digital transformation',
        'IT governance and policies',
      ],
      [
        'Roadmap tecnológico a 3-5 años',
        'Evaluación y selección de tecnologías',
        'Arquitectura empresarial',
        'Innovación y transformación digital',
        'Gobierno de TI y políticas',
      ],
      [
        'Roadmap tecnológico de 3-5 anos',
        'Avaliação e seleção de tecnologias',
        'Arquitetura empresarial',
        'Inovação e transformação digital',
        'Governança de TI e políticas',
      ]
    ),
  },
  {
    icon: '👥',
    area: createLocalizedContent('Team Leadership', 'Liderazgo de Equipos', 'Liderança de Equipes'),
    responsibilities: createLocalizedContent(
      [
        'Tech talent recruitment',
        'Team development and mentoring',
        'Innovation culture',
        'Agile methodologies',
        'Vendor management',
      ],
      [
        'Reclutamiento de talento tech',
        'Desarrollo y mentoría de equipos',
        'Cultura de innovación',
        'Metodologías ágiles',
        'Gestión de proveedores',
      ],
      [
        'Recrutamento de talentos tech',
        'Desenvolvimento e mentoria de equipes',
        'Cultura de inovação',
        'Metodologias ágeis',
        'Gestão de fornecedores',
      ]
    ),
  },
  {
    icon: '⚙️',
    area: createLocalizedContent(
      'Operations & Delivery',
      'Operaciones y Entrega',
      'Operações e Entrega'
    ),
    responsibilities: createLocalizedContent(
      [
        'DevOps and CI/CD',
        'System scalability',
        'Security and compliance',
        'Monitoring and performance',
        'Disaster recovery planning',
      ],
      [
        'DevOps y CI/CD',
        'Escalabilidad de sistemas',
        'Seguridad y compliance',
        'Monitoreo y rendimiento',
        'Plan de recuperación ante desastres',
      ],
      [
        'DevOps e CI/CD',
        'Escalabilidade de sistemas',
        'Segurança e compliance',
        'Monitoramento e desempenho',
        'Plano de recuperação de desastres',
      ]
    ),
  },
  {
    icon: '💰',
    area: createLocalizedContent(
      'Budget & Investments',
      'Presupuesto e Inversiones',
      'Orçamento e Investimentos'
    ),
    responsibilities: createLocalizedContent(
      [
        'Technology budget planning',
        'Investment ROI analysis',
        'Cost optimization',
        'Contract negotiation',
        'CapEx/OpEx management',
      ],
      [
        'Planificación de presupuesto tecnológico',
        'Análisis de ROI de inversiones',
        'Optimización de costos',
        'Negociación de contratos',
        'Gestión de CapEx/OpEx',
      ],
      [
        'Planejamento de orçamento tecnológico',
        'Análise de ROI de investimentos',
        'Otimização de custos',
        'Negociação de contratos',
        'Gestão de CapEx/OpEx',
      ]
    ),
  },
];

export interface SuccessMetric {
  metric: LocalizedContent<string>;
  improvement: string;
  icon: string;
}

export const successMetrics: SuccessMetric[] = [
  {
    icon: '📈',
    metric: createLocalizedContent(
      'Average revenue increase',
      'Aumento promedio de ingresos',
      'Aumento médio de receita'
    ),
    improvement: '37%',
  },
  {
    icon: '⚡',
    metric: createLocalizedContent(
      'Development acceleration',
      'Aceleración de desarrollo',
      'Aceleração de desenvolvimento'
    ),
    improvement: '2.5x',
  },
  {
    icon: '💵',
    metric: createLocalizedContent('Cost reduction', 'Reducción de costos', 'Redução de custos'),
    improvement: '43%',
  },
  {
    icon: '🎯',
    metric: createLocalizedContent(
      'Successful digital transformation',
      'Transformación digital exitosa',
      'Transformação digital bem-sucedida'
    ),
    improvement: '95%',
  },
];

export interface CaseStudy {
  company: string;
  industry: LocalizedContent<string>;
  challenge: LocalizedContent<string>;
  solution: LocalizedContent<string>;
  results: LocalizedContent<string[]>;
}

export const caseStudies: CaseStudy[] = [
  {
    company: 'TechCorp México',
    industry: createLocalizedContent('Fintech', 'Fintech', 'Fintech'),
    challenge: createLocalizedContent(
      'Needed to modernize legacy banking systems while maintaining 24/7 operations',
      'Necesitaba modernizar sistemas bancarios legacy manteniendo operación 24/7',
      'Precisava modernizar sistemas bancários legados mantendo operação 24/7'
    ),
    solution: createLocalizedContent(
      'vCTO partnership providing technology leadership and strategic planning',
      'Asociación vCTO proporcionando liderazgo tecnológico y planificación estratégica',
      'Parceria vCTO fornecendo liderança tecnológica e planejamento estratégico'
    ),
    results: createLocalizedContent(
      [
        '99.99% uptime maintained during migration',
        '60% reduction in transaction processing time',
        'New product launch cycle reduced from 6 months to 3 weeks',
      ],
      [
        '99.99% de uptime mantenido durante la migración',
        '60% de reducción en tiempo de procesamiento de transacciones',
        'Ciclo de lanzamiento de nuevos productos reducido de 6 meses a 3 semanas',
      ],
      [
        '99,99% de uptime mantido durante a migração',
        '60% de redução no tempo de processamento de transações',
        'Ciclo de lançamento de novos produtos reduzido de 6 meses para 3 semanas',
      ]
    ),
  },
  {
    company: 'RetailMax LATAM',
    industry: createLocalizedContent('E-commerce', 'E-commerce', 'E-commerce'),
    challenge: createLocalizedContent(
      'Scaling to handle Black Friday traffic and expanding to new markets',
      'Escalar para manejar tráfico de Black Friday y expandirse a nuevos mercados',
      'Escalar para lidar com tráfego de Black Friday e expandir para novos mercados'
    ),
    solution: createLocalizedContent(
      'Complete technology overhaul with cloud-native architecture',
      'Renovación tecnológica completa con arquitectura cloud-native',
      'Renovação tecnológica completa com arquitetura cloud-native'
    ),
    results: createLocalizedContent(
      [
        '10x traffic capacity without downtime',
        'Launch in 5 new countries in 12 months',
        '45% increase in conversion rate',
      ],
      [
        '10x capacidad de tráfico sin downtime',
        'Lanzamiento en 5 nuevos países en 12 meses',
        '45% de aumento en tasa de conversión',
      ],
      [
        '10x capacidade de tráfego sem downtime',
        'Lançamento em 5 novos países em 12 meses',
        '45% de aumento na taxa de conversão',
      ]
    ),
  },
];
