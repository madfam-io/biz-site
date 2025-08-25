import { LocalizedContent, createLocalizedContent } from '@/lib/utils/locale-helpers';

export interface EngagementModel {
  type: LocalizedContent<string>;
  duration: LocalizedContent<string>;
  price: LocalizedContent<string>;
  ideal: LocalizedContent<string>;
  includes: LocalizedContent<string[]>;
}

export const engagementModels: EngagementModel[] = [
  {
    type: createLocalizedContent('Part-time vCTO', 'vCTO Part-time', 'vCTO Part-time'),
    duration: createLocalizedContent('20 hours/week', '20 horas/semana', '20 horas/semana'),
    price: createLocalizedContent(
      'From $8,000/month',
      'Desde $8,000/mes',
      'A partir de $8.000/mês'
    ),
    ideal: createLocalizedContent(
      'Growing companies with existing tech team',
      'Empresas en crecimiento con equipo tech existente',
      'Empresas em crescimento com equipe tech existente'
    ),
    includes: createLocalizedContent(
      [
        'Strategic technology leadership',
        'Team mentoring and development',
        'Architecture reviews',
        'Board and investor presentations',
      ],
      [
        'Liderazgo tecnológico estratégico',
        'Mentoría y desarrollo de equipo',
        'Revisiones de arquitectura',
        'Presentaciones a directorio e inversores',
      ],
      [
        'Liderança tecnológica estratégica',
        'Mentoria e desenvolvimento de equipe',
        'Revisões de arquitetura',
        'Apresentações para diretoria e investidores',
      ]
    ),
  },
  {
    type: createLocalizedContent('Full-time vCTO', 'vCTO Full-time', 'vCTO Full-time'),
    duration: createLocalizedContent('40+ hours/week', '40+ horas/semana', '40+ horas/semana'),
    price: createLocalizedContent(
      'From $15,000/month',
      'Desde $15,000/mes',
      'A partir de $15.000/mês'
    ),
    ideal: createLocalizedContent(
      'Companies in digital transformation or rapid scaling',
      'Empresas en transformación digital o escalamiento rápido',
      'Empresas em transformação digital ou crescimento rápido'
    ),
    includes: createLocalizedContent(
      [
        'Complete technology leadership',
        'Team building and recruitment',
        'Direct vendor management',
        'Daily operational involvement',
      ],
      [
        'Liderazgo tecnológico completo',
        'Construcción y reclutamiento de equipo',
        'Gestión directa de proveedores',
        'Involucramiento operativo diario',
      ],
      [
        'Liderança tecnológica completa',
        'Construção e recrutamento de equipe',
        'Gestão direta de fornecedores',
        'Envolvimento operacional diário',
      ]
    ),
  },
  {
    type: createLocalizedContent('Project-based', 'Por proyecto', 'Por projeto'),
    duration: createLocalizedContent('3-12 months', '3-12 meses', '3-12 meses'),
    price: createLocalizedContent('Custom pricing', 'Precio personalizado', 'Preço personalizado'),
    ideal: createLocalizedContent(
      'Specific transformations or technology migrations',
      'Transformaciones específicas o migraciones tecnológicas',
      'Transformações específicas ou migrações tecnológicas'
    ),
    includes: createLocalizedContent(
      [
        'Project-specific leadership',
        'Dedicated transformation team',
        'Post-implementation support',
        'Knowledge transfer',
      ],
      [
        'Liderazgo específico del proyecto',
        'Equipo dedicado de transformación',
        'Soporte post-implementación',
        'Transferencia de conocimiento',
      ],
      [
        'Liderança específica do projeto',
        'Equipe dedicada de transformação',
        'Suporte pós-implementação',
        'Transferência de conhecimento',
      ]
    ),
  },
];

export interface TransformationPhase {
  phase: LocalizedContent<string>;
  duration: LocalizedContent<string>;
  focus: LocalizedContent<string>;
}

export const transformationJourney: TransformationPhase[] = [
  {
    phase: createLocalizedContent('Discovery', 'Descubrimiento', 'Descoberta'),
    duration: createLocalizedContent('30-60 days', '30-60 días', '30-60 dias'),
    focus: createLocalizedContent(
      'Current state assessment',
      'Evaluación del estado actual',
      'Avaliação do estado atual'
    ),
  },
  {
    phase: createLocalizedContent('Strategy', 'Estrategia', 'Estratégia'),
    duration: createLocalizedContent('60-90 days', '60-90 días', '60-90 dias'),
    focus: createLocalizedContent(
      'Roadmap and planning',
      'Roadmap y planificación',
      'Roadmap e planejamento'
    ),
  },
  {
    phase: createLocalizedContent('Execution', 'Ejecución', 'Execução'),
    duration: createLocalizedContent('6-12 months', '6-12 meses', '6-12 meses'),
    focus: createLocalizedContent(
      'Key initiative implementation',
      'Implementación de iniciativas clave',
      'Implementação de iniciativas-chave'
    ),
  },
  {
    phase: createLocalizedContent('Evolution', 'Evolución', 'Evolução'),
    duration: createLocalizedContent('Continuous', 'Continuo', 'Contínuo'),
    focus: createLocalizedContent(
      'Optimization and new opportunities',
      'Optimización y nuevas oportunidades',
      'Otimização e novas oportunidades'
    ),
  },
];

export interface Differentiator {
  title: LocalizedContent<string>;
  description: LocalizedContent<string>;
  icon: string;
}

export const differentiators: Differentiator[] = [
  {
    icon: '🌐',
    title: createLocalizedContent(
      'Global Expert Network',
      'Red Global de Expertos',
      'Rede Global de Especialistas'
    ),
    description: createLocalizedContent(
      'Access to 200+ specialists in emerging technologies',
      'Acceso a +200 especialistas en tecnologías emergentes',
      'Acesso a +200 especialistas em tecnologias emergentes'
    ),
  },
  {
    icon: '📊',
    title: createLocalizedContent(
      'Proven Methodology',
      'Metodología Probada',
      'Metodologia Comprovada'
    ),
    description: createLocalizedContent(
      'MADFAM digital transformation framework',
      'Framework MADFAM de transformación digital',
      'Framework MADFAM de transformação digital'
    ),
  },
  {
    icon: '🚀',
    title: createLocalizedContent(
      'Innovation Ecosystem',
      'Ecosistema de Innovación',
      'Ecossistema de Inovação'
    ),
    description: createLocalizedContent(
      'Connection with startups, VCs and R&D centers',
      'Conexión con startups, VCs y centros de I+D',
      'Conexão com startups, VCs e centros de P&D'
    ),
  },
  {
    icon: '🎯',
    title: createLocalizedContent('Tangible ROI', 'ROI Tangible', 'ROI Tangível'),
    description: createLocalizedContent(
      'Measurable results from day one',
      'Resultados medibles desde el día uno',
      'Resultados mensuráveis desde o primeiro dia'
    ),
  },
];
