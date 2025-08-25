import { LocalizedContent, createLocalizedContent } from '@/lib/utils/locale-helpers';

export interface Technology {
  name: string;
  description: string;
  icon: string;
  tools: string[];
}

export interface CaseStudy {
  client: LocalizedContent<string>;
  project: LocalizedContent<string>;
  challenge: LocalizedContent<string>;
  solution: LocalizedContent<string>;
  results: LocalizedContent<string[]>;
  tech: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    client: createLocalizedContent('TechCorp México', 'TechCorp México', 'TechCorp México'),
    project: createLocalizedContent(
      'Interactive 3D Dashboard',
      'Dashboard 3D Interactivo',
      'Dashboard 3D Interativo'
    ),
    challenge: createLocalizedContent(
      'Visualize complex IoT data in real time',
      'Visualizar datos complejos de IoT en tiempo real',
      'Visualizar dados complexos de IoT em tempo real'
    ),
    solution: createLocalizedContent(
      'Parametric system that adapts visualization based on data volume',
      'Sistema paramétrico que adapta la visualización según el volumen de datos',
      'Sistema paramétrico que adapta a visualização conforme o volume de dados'
    ),
    results: createLocalizedContent(
      ['85% better data comprehension', '3x faster decision making', 'ROI in 2 months'],
      ['85% mejor comprensión de datos', '3x velocidad en toma de decisiones', 'ROI en 2 meses'],
      ['85% melhor compreensão de dados', '3x velocidade na tomada de decisões', 'ROI em 2 meses']
    ),
    tech: ['Three.js', 'Node.js', 'WebGL'],
  },
  {
    client: createLocalizedContent(
      'Digital Art Museum',
      'Museo de Arte Digital',
      'Museu de Arte Digital'
    ),
    project: createLocalizedContent(
      'AR Experience for Exhibition',
      'Experiencia AR para Exposición',
      'Experiência AR para Exposição'
    ),
    challenge: createLocalizedContent(
      'Create an interactive digital layer over physical works',
      'Crear una capa digital interactiva sobre obras físicas',
      'Criar uma camada digital interativa sobre obras físicas'
    ),
    solution: createLocalizedContent(
      'AR app that reveals stories and animations when pointing at artworks',
      'App AR que revela historias y animaciones al apuntar a las obras',
      'App AR que revela histórias e animações ao apontar para as obras'
    ),
    results: createLocalizedContent(
      ['50K+ downloads', '+120% time in museum', 'Cultural innovation award'],
      ['50K+ descargas', '+120% tiempo en museo', 'Premio a innovación cultural'],
      ['50K+ downloads', '+120% tempo no museu', 'Prêmio de inovação cultural']
    ),
    tech: ['ARCore', 'Unity', 'Cloud Anchors'],
  },
];

export interface ProcessPhase {
  phase: LocalizedContent<string>;
  duration: LocalizedContent<string>;
  activities: LocalizedContent<string[]>;
}

export const processPhases: ProcessPhase[] = [
  {
    phase: createLocalizedContent('Discovery', 'Descubrimiento', 'Descoberta'),
    duration: createLocalizedContent('3-5 days', '3-5 días', '3-5 dias'),
    activities: createLocalizedContent(
      ['Ideation workshop', 'Technical analysis', 'Scope definition', 'Conceptual prototype'],
      ['Workshop de ideación', 'Análisis técnico', 'Definición de alcance', 'Prototipo conceptual'],
      ['Workshop de ideação', 'Análise técnica', 'Definição de escopo', 'Protótipo conceitual']
    ),
  },
  {
    phase: createLocalizedContent('Design', 'Diseño', 'Design'),
    duration: createLocalizedContent('1-2 weeks', '1-2 semanas', '1-2 semanas'),
    activities: createLocalizedContent(
      ['Parametric architecture', 'Interaction design', 'User testing', 'Rapid iterations'],
      [
        'Arquitectura paramétrica',
        'Diseño de interacciones',
        'Pruebas de usuario',
        'Iteraciones rápidas',
      ],
      ['Arquitetura paramétrica', 'Design de interações', 'Testes de usuário', 'Iterações rápidas']
    ),
  },
  {
    phase: createLocalizedContent('Development', 'Desarrollo', 'Desenvolvimento'),
    duration: createLocalizedContent('2-4 weeks', '2-4 semanas', '2-4 semanas'),
    activities: createLocalizedContent(
      ['Agile sprints', 'Continuous integration', 'Performance optimization', 'Security testing'],
      [
        'Sprints ágiles',
        'Integración continua',
        'Optimización de rendimiento',
        'Pruebas de seguridad',
      ],
      ['Sprints ágeis', 'Integração contínua', 'Otimização de performance', 'Testes de segurança']
    ),
  },
  {
    phase: createLocalizedContent('Launch', 'Lanzamiento', 'Lançamento'),
    duration: createLocalizedContent('1 week', '1 semana', '1 semana'),
    activities: createLocalizedContent(
      ['Production deployment', 'Monitoring setup', 'Training', 'Post-launch support'],
      [
        'Despliegue en producción',
        'Configuración de monitoreo',
        'Capacitación',
        'Soporte post-lanzamiento',
      ],
      [
        'Deploy em produção',
        'Configuração de monitoramento',
        'Treinamento',
        'Suporte pós-lançamento',
      ]
    ),
  },
];

export interface Pricing {
  type: LocalizedContent<string>;
  price: LocalizedContent<string>;
  timeline: LocalizedContent<string>;
  ideal: LocalizedContent<string>;
  includes: LocalizedContent<string[]>;
}

export const pricingOptions: Pricing[] = [
  {
    type: createLocalizedContent('MVP', 'MVP', 'MVP'),
    price: createLocalizedContent('From $15,000', 'Desde $15,000', 'A partir de $15.000'),
    timeline: createLocalizedContent('4-6 weeks', '4-6 semanas', '4-6 semanas'),
    ideal: createLocalizedContent(
      'Proof of concepts and validations',
      'Proof of concepts y validaciones',
      'Proof of concepts e validações'
    ),
    includes: createLocalizedContent(
      ['Functional prototype', 'Core interactions', 'Basic deployment', '30 days support'],
      ['Prototipo funcional', 'Interacciones core', 'Despliegue básico', '30 días de soporte'],
      ['Protótipo funcional', 'Interações principais', 'Deploy básico', '30 dias de suporte']
    ),
  },
  {
    type: createLocalizedContent('Production', 'Producción', 'Produção'),
    price: createLocalizedContent('From $30,000', 'Desde $30,000', 'A partir de $30.000'),
    timeline: createLocalizedContent('6-10 weeks', '6-10 semanas', '6-10 semanas'),
    ideal: createLocalizedContent(
      'Complete projects ready for market',
      'Proyectos completos listos para el mercado',
      'Projetos completos prontos para o mercado'
    ),
    includes: createLocalizedContent(
      [
        'Complete development',
        'Advanced optimizations',
        'Scalable infrastructure',
        '90 days support',
      ],
      [
        'Desarrollo completo',
        'Optimizaciones avanzadas',
        'Infraestructura escalable',
        '90 días de soporte',
      ],
      [
        'Desenvolvimento completo',
        'Otimizações avançadas',
        'Infraestrutura escalável',
        '90 dias de suporte',
      ]
    ),
  },
  {
    type: createLocalizedContent('Enterprise', 'Enterprise', 'Enterprise'),
    price: createLocalizedContent('Custom', 'Personalizado', 'Personalizado'),
    timeline: createLocalizedContent('10+ weeks', '10+ semanas', '10+ semanas'),
    ideal: createLocalizedContent(
      'Complex solutions for large companies',
      'Soluciones complejas para grandes empresas',
      'Soluções complexas para grandes empresas'
    ),
    includes: createLocalizedContent(
      ['End-to-end solution', 'Multiple integrations', 'Dedicated team', '12 months support'],
      ['Solución end-to-end', 'Múltiples integraciones', 'Equipo dedicado', '12 meses de soporte'],
      ['Solução end-to-end', 'Múltiplas integrações', 'Equipe dedicada', '12 meses de suporte']
    ),
  },
];

export interface FAQ {
  question: LocalizedContent<string>;
  answer: LocalizedContent<string>;
}

export const faqs: FAQ[] = [
  {
    question: createLocalizedContent(
      'What makes your technical approach different?',
      '¿Qué hace diferente su enfoque técnico?',
      'O que torna sua abordagem técnica diferente?'
    ),
    answer: createLocalizedContent(
      'We combine parametric design, AI, and emerging technologies to create adaptive solutions that evolve with your needs.',
      'Combinamos diseño paramétrico, IA y tecnologías emergentes para crear soluciones adaptativas que evolucionan con tus necesidades.',
      'Combinamos design paramétrico, IA e tecnologias emergentes para criar soluções adaptativas que evoluem com suas necessidades.'
    ),
  },
  {
    question: createLocalizedContent(
      'Can we integrate with our existing systems?',
      '¿Podemos integrarnos con nuestros sistemas existentes?',
      'Podemos integrar com nossos sistemas existentes?'
    ),
    answer: createLocalizedContent(
      'Absolutely. We specialize in creating solutions that seamlessly integrate with legacy systems through modern APIs and microservices.',
      'Absolutamente. Nos especializamos en crear soluciones que se integran perfectamente con sistemas legacy a través de APIs modernas y microservicios.',
      'Absolutamente. Especializamo-nos em criar soluções que se integram perfeitamente com sistemas legados através de APIs modernas e microsserviços.'
    ),
  },
  {
    question: createLocalizedContent(
      'What post-launch support do you offer?',
      '¿Qué soporte post-lanzamiento ofrecen?',
      'Que suporte pós-lançamento vocês oferecem?'
    ),
    answer: createLocalizedContent(
      'We provide continuous support with SLA guarantees, proactive monitoring, regular updates, and a dedicated technical team.',
      'Brindamos soporte continuo con garantías de SLA, monitoreo proactivo, actualizaciones regulares y un equipo técnico dedicado.',
      'Fornecemos suporte contínuo com garantias de SLA, monitoramento proativo, atualizações regulares e uma equipe técnica dedicada.'
    ),
  },
];
