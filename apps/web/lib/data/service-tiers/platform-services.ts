import { LocalizedContent, createLocalizedContent } from '@/lib/utils/locale-helpers';

export interface Platform {
  name: string;
  tagline: LocalizedContent<string>;
  description: LocalizedContent<string>;
  features: LocalizedContent<string[]>;
  benefits: LocalizedContent<string[]>;
  icon: string;
  color: string;
}

export const platforms: Platform[] = [
  {
    name: 'SPARK',
    tagline: createLocalizedContent(
      'Intelligent Process Automation',
      'Automatización Inteligente de Procesos',
      'Automação Inteligente de Processos'
    ),
    description: createLocalizedContent(
      'Revolutionary platform that transforms manual processes into intelligent automated workflows',
      'Plataforma revolucionaria que transforma procesos manuales en flujos automatizados inteligentes',
      'Plataforma revolucionária que transforma processos manuais em fluxos automatizados inteligentes'
    ),
    features: createLocalizedContent(
      [
        'AI-powered workflow automation',
        'Visual process builder',
        'Smart decision making',
        'Real-time analytics',
        'Open API and webhooks',
      ],
      [
        'Automatización de workflows con IA',
        'Constructor visual de procesos',
        'Toma de decisiones inteligente',
        'Analytics en tiempo real',
        'API abierta y webhooks',
      ],
      [
        'Automação de workflows com IA',
        'Construtor visual de processos',
        'Tomada de decisões inteligente',
        'Analytics em tempo real',
        'API aberta e webhooks',
      ]
    ),
    benefits: createLocalizedContent(
      ['70% reduction in process time', 'ROI in less than 6 months', 'Infinite scalability'],
      ['70% reducción en tiempo de procesos', 'ROI en menos de 6 meses', 'Escalabilidad infinita'],
      ['70% redução no tempo de processos', 'ROI em menos de 6 meses', 'Escalabilidade infinita']
    ),
    icon: '⚡',
    color: 'from-lavender to-sun',
  },
  {
    name: 'PENNY',
    tagline: createLocalizedContent(
      'Zero-Touch Business Automation',
      'Automatización Empresarial Zero-Touch',
      'Automação Empresarial Zero-Touch'
    ),
    description: createLocalizedContent(
      'Next-generation platform that automates complex business processes without human intervention',
      'Plataforma de próxima generación que automatiza procesos empresariales complejos sin intervención humana',
      'Plataforma de próxima geração que automatiza processos empresariais complexos sem intervenção humana'
    ),
    features: createLocalizedContent(
      [
        'Machine learning algorithms',
        'Natural language processing',
        'Computer vision',
        'Predictive analytics',
        'Self-healing workflows',
      ],
      [
        'Algoritmos de machine learning',
        'Procesamiento de lenguaje natural',
        'Visión por computadora',
        'Analytics predictivo',
        'Workflows auto-reparables',
      ],
      [
        'Algoritmos de machine learning',
        'Processamento de linguagem natural',
        'Visão computacional',
        'Analytics preditivo',
        'Workflows auto-reparáveis',
      ]
    ),
    benefits: createLocalizedContent(
      ['85% fewer human errors', '24/7 continuous operation', '3x team productivity'],
      ['85% menos errores humanos', '24/7 operación continua', '3x productividad del equipo'],
      ['85% menos erros humanos', '24/7 operação contínua', '3x produtividade da equipe']
    ),
    icon: '🤖',
    color: 'from-leaf to-sun',
  },
];

export interface ImplementationPhase {
  name: string;
  duration: LocalizedContent<string>;
  deliverables: LocalizedContent<string[]>;
}

export const implementationPhases: ImplementationPhase[] = [
  {
    name: 'Discovery & Planning',
    duration: createLocalizedContent('2-3 weeks', '2-3 semanas', '2-3 semanas'),
    deliverables: createLocalizedContent(
      [
        'Current process audit',
        'Automation opportunities map',
        'Solution architecture',
        'Implementation roadmap',
      ],
      [
        'Auditoría de procesos actuales',
        'Mapa de oportunidades de automatización',
        'Arquitectura de solución',
        'Roadmap de implementación',
      ],
      [
        'Auditoria de processos atuais',
        'Mapa de oportunidades de automação',
        'Arquitetura de solução',
        'Roadmap de implementação',
      ]
    ),
  },
  {
    name: 'Setup & Configuration',
    duration: createLocalizedContent('4-6 weeks', '4-6 semanas', '4-6 semanas'),
    deliverables: createLocalizedContent(
      ['Installation and configuration', 'Core integrations', 'Main workflows', 'Test environment'],
      [
        'Instalación y configuración',
        'Integraciones core',
        'Workflows principales',
        'Ambiente de pruebas',
      ],
      [
        'Instalação e configuração',
        'Integrações principais',
        'Workflows principais',
        'Ambiente de testes',
      ]
    ),
  },
  {
    name: 'Pilot & Testing',
    duration: createLocalizedContent('2-4 weeks', '2-4 semanas', '2-4 semanas'),
    deliverables: createLocalizedContent(
      [
        'Pilot with selected team',
        'Adjustments and optimization',
        'Process documentation',
        'Performance metrics',
      ],
      [
        'Piloto con equipo selecto',
        'Ajustes y optimización',
        'Documentación de procesos',
        'Métricas de performance',
      ],
      [
        'Piloto com equipe selecionada',
        'Ajustes e otimização',
        'Documentação de processos',
        'Métricas de performance',
      ]
    ),
  },
  {
    name: 'Rollout & Training',
    duration: createLocalizedContent('2-3 weeks', '2-3 semanas', '2-3 semanas'),
    deliverables: createLocalizedContent(
      ['Full deployment', 'User training', 'Operational playbooks', 'Center of excellence'],
      [
        'Despliegue completo',
        'Capacitación de usuarios',
        'Playbooks operativos',
        'Centro de excelencia',
      ],
      [
        'Implantação completa',
        'Capacitação de usuários',
        'Playbooks operacionais',
        'Centro de excelência',
      ]
    ),
  },
];

export interface SupportFeature {
  title: LocalizedContent<string>;
  features: LocalizedContent<string[]>;
}

export const supportDetails: SupportFeature = {
  title: createLocalizedContent('Continuous Support', 'Soporte Continuo', 'Suporte Contínuo'),
  features: createLocalizedContent(
    [
      '99.9% guaranteed SLA',
      '24/7 support',
      'Monthly updates',
      'Continuous optimization',
      'Access to new features',
    ],
    [
      'SLA garantizado 99.9%',
      'Soporte 24/7',
      'Actualizaciones mensuales',
      'Optimización continua',
      'Acceso a nuevas features',
    ],
    [
      'SLA garantido 99.9%',
      'Suporte 24/7',
      'Atualizações mensais',
      'Otimização contínua',
      'Acesso a novas funcionalidades',
    ]
  ),
};

export interface ROIMetric {
  label: LocalizedContent<string>;
  value: string;
}

export const roiMetrics: ROIMetric[] = [
  {
    label: createLocalizedContent(
      'Operational cost reduction',
      'Reducción de costos operativos',
      'Redução de custos operacionais'
    ),
    value: '45-60%',
  },
  {
    label: createLocalizedContent(
      'Productivity increase',
      'Incremento en productividad',
      'Aumento de produtividade'
    ),
    value: '3-5x',
  },
  {
    label: createLocalizedContent('Error reduction', 'Reducción de errores', 'Redução de erros'),
    value: '85-95%',
  },
  {
    label: createLocalizedContent('ROI time', 'Tiempo de ROI', 'Tempo de ROI'),
    value: '4-8',
  },
];

export interface Testimonial {
  quote: LocalizedContent<string>;
  author: string;
  role: string;
  metric: LocalizedContent<string>;
}

export const testimonial: Testimonial = {
  quote: createLocalizedContent(
    'SPARK completely transformed our operation. What used to take days, now takes hours.',
    'SPARK transformó completamente nuestra operación. Lo que antes tomaba días, ahora se hace en horas.',
    'SPARK transformou completamente nossa operação. O que antes levava dias, agora é feito em horas.'
  ),
  author: 'María González',
  role: 'COO, TechCorp México',
  metric: createLocalizedContent(
    '70% reduction in cycle time',
    '70% reducción en tiempo de ciclo',
    '70% redução no tempo de ciclo'
  ),
};

export interface Integration {
  name: string;
  category: LocalizedContent<string> | string;
}

export const integrations: Integration[] = [
  { name: 'Salesforce', category: 'CRM' },
  { name: 'HubSpot', category: 'Marketing' },
  { name: 'SAP', category: 'ERP' },
  {
    name: 'Slack',
    category: createLocalizedContent('Communication', 'Comunicación', 'Comunicação'),
  },
  {
    name: 'Google Workspace',
    category: createLocalizedContent('Productivity', 'Productividad', 'Produtividade'),
  },
  {
    name: 'Microsoft 365',
    category: createLocalizedContent('Productivity', 'Productividad', 'Produtividade'),
  },
  { name: 'AWS', category: 'Cloud' },
  {
    name: 'Stripe',
    category: createLocalizedContent('Payments', 'Pagos', 'Pagamentos'),
  },
];
