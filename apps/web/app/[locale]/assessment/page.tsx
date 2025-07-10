import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { AssessmentClient } from '@/components/AssessmentClient';

interface AssessmentPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale },
}: AssessmentPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'assessment' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function AssessmentPage({ params: { locale } }: AssessmentPageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('assessment');
  const tCommon = await getTranslations('common');

  const translations = {
    title: t('title'),
    subtitle: t('subtitle'),
    strategicQuestions: '10 strategic questions',
    minutes: '5 minutes',
    instantResults: 'Instant results',
    assessmentTitle: t('title'),
    assessmentDescription: t('intro'),
    getPersonalizedStrategy: 'Get your personalized strategy',
    strategySubtitle:
      "Based on your assessment results, we'll create a customized roadmap for your AI transformation journey.",
    requestSession: 'Request your strategy session',
    sessionDescription:
      "Let's discuss your results and create a personalized plan for your AI transformation",
    scheduleSession: 'Schedule strategy session',
    whyAssessment: 'Why take the assessment?',
    whySubtitle: 'Get actionable insights to accelerate your AI transformation journey',
    identifyGaps: 'Identify Gaps',
    identifyGapsDesc: 'Understand where your organization stands and what needs improvement',
    benchmarkProgress: 'Benchmark Progress',
    benchmarkDesc: 'Compare your maturity level with industry standards and best practices',
    getRecommendations: 'Get Recommendations',
    recommendationsDesc: 'Receive personalized recommendations and next steps for your AI journey',
    readyToTransform: 'Ready to transform your business?',
    ctaSubtitle:
      'Take the assessment and discover how MADFAM can help you achieve your AI transformation goals',
    startAssessment: t('start'),
    scheduleConsultation: tCommon('cta.scheduleConsultation'),
  };

  // Assessment questions with hardcoded translations for now
  // TODO: Move these to translation files
  const assessmentQuestions = [
    {
      id: 'digital_strategy',
      question:
        locale === 'en-US'
          ? "How defined is your company's digital transformation strategy?"
          : locale === 'pt-BR'
            ? 'Quão definida está a estratégia de transformação digital da sua empresa?'
            : '¿Qué tan definida está la estrategia de transformación digital de tu empresa?',
      category: 'strategy' as const,
      options: [
        {
          value: 'none',
          text:
            locale === 'en-US'
              ? "We don't have a defined strategy"
              : locale === 'pt-BR'
                ? 'Não temos uma estratégia definida'
                : 'No tenemos una estrategia definida',
          score: 0,
        },
        {
          value: 'basic',
          text:
            locale === 'en-US'
              ? 'We have basic ideas but no formal plan'
              : locale === 'pt-BR'
                ? 'Temos ideias básicas, mas sem plano formal'
                : 'Tenemos ideas básicas pero sin plan formal',
          score: 1,
        },
        {
          value: 'developing',
          text:
            locale === 'en-US'
              ? 'We are developing a strategy'
              : locale === 'pt-BR'
                ? 'Estamos desenvolvendo uma estratégia'
                : 'Estamos desarrollando una estrategia',
          score: 2,
        },
        {
          value: 'implemented',
          text:
            locale === 'en-US'
              ? 'We have a clear and implemented strategy'
              : locale === 'pt-BR'
                ? 'Temos uma estratégia clara e implementada'
                : 'Tenemos una estrategia clara e implementada',
          score: 3,
        },
      ],
    },
    {
      id: 'technology_infrastructure',
      question:
        locale === 'en-US'
          ? "How would you describe your company's current technology infrastructure?"
          : locale === 'pt-BR'
            ? 'Como você descreveria a infraestrutura tecnológica atual da sua empresa?'
            : '¿Cómo describirías la infraestructura tecnológica actual de tu empresa?',
      category: 'technology' as const,
      options: [
        {
          value: 'outdated',
          text:
            locale === 'en-US'
              ? 'Legacy systems and manual processes'
              : locale === 'pt-BR'
                ? 'Sistemas legacy e processos manuais'
                : 'Sistemas legacy y procesos manuales',
          score: 0,
        },
        {
          value: 'mixed',
          text:
            locale === 'en-US'
              ? 'Mix of modern and legacy systems'
              : locale === 'pt-BR'
                ? 'Combinação de sistemas modernos e legacy'
                : 'Combinación de sistemas modernos y legacy',
          score: 1,
        },
        {
          value: 'modern',
          text:
            locale === 'en-US'
              ? 'Modern systems with some automation'
              : locale === 'pt-BR'
                ? 'Sistemas modernos com algumas automações'
                : 'Sistemas modernos con algunas automaciones',
          score: 2,
        },
        {
          value: 'advanced',
          text:
            locale === 'en-US'
              ? 'Advanced and automated tech infrastructure'
              : locale === 'pt-BR'
                ? 'Infraestrutura tecnológica avançada e automatizada'
                : 'Infraestructura tecnológica avanzada y automatizada',
          score: 3,
        },
      ],
    },
    {
      id: 'data_analytics',
      question:
        locale === 'en-US'
          ? 'How does your company handle data and analytics?'
          : locale === 'pt-BR'
            ? 'Como sua empresa lida com dados e análises?'
            : '¿Cómo maneja tu empresa los datos y analytics?',
      category: 'data' as const,
      options: [
        {
          value: 'no_data',
          text:
            locale === 'en-US'
              ? "We don't collect data systematically"
              : locale === 'pt-BR'
                ? 'Não coletamos dados sistematicamente'
                : 'No recopilamos datos de forma sistemática',
          score: 0,
        },
        {
          value: 'basic_data',
          text:
            locale === 'en-US'
              ? 'We collect basic data without analysis'
              : locale === 'pt-BR'
                ? 'Coletamos dados básicos sem análise'
                : 'Recopilamos datos básicos sin análisis',
          score: 1,
        },
        {
          value: 'some_analytics',
          text:
            locale === 'en-US'
              ? 'We have basic analytics tools'
              : locale === 'pt-BR'
                ? 'Temos ferramentas básicas de análise'
                : 'Tenemos herramientas básicas de análisis',
          score: 2,
        },
        {
          value: 'advanced_analytics',
          text:
            locale === 'en-US'
              ? 'We use advanced analytics and BI'
              : locale === 'pt-BR'
                ? 'Usamos análises avançadas e BI'
                : 'Usamos analytics avanzados y BI',
          score: 3,
        },
      ],
    },
    {
      id: 'innovation_culture',
      question:
        locale === 'en-US'
          ? "How would you describe your company's innovation culture?"
          : locale === 'pt-BR'
            ? 'Como é a cultura de inovação na sua empresa?'
            : '¿Cómo es la cultura de innovación en tu empresa?',
      category: 'culture' as const,
      options: [
        {
          value: 'resistant',
          text:
            locale === 'en-US'
              ? 'Resistant to change and new technologies'
              : locale === 'pt-BR'
                ? 'Resistente à mudança e novas tecnologias'
                : 'Resistente al cambio y nuevas tecnologías',
          score: 0,
        },
        {
          value: 'cautious',
          text:
            locale === 'en-US'
              ? 'Cautious but open to gradual changes'
              : locale === 'pt-BR'
                ? 'Cautelosa, mas aberta a mudanças graduais'
                : 'Cautelosa pero abierta a cambios graduales',
          score: 1,
        },
        {
          value: 'adaptive',
          text:
            locale === 'en-US'
              ? 'Adaptive with a growth mindset'
              : locale === 'pt-BR'
                ? 'Adaptável com mentalidade de crescimento'
                : 'Adaptable y con mentalidad de crecimiento',
          score: 2,
        },
        {
          value: 'innovative',
          text:
            locale === 'en-US'
              ? 'Highly innovative and proactive'
              : locale === 'pt-BR'
                ? 'Altamente inovadora e proativa'
                : 'Altamente innovadora y proactiva',
          score: 3,
        },
      ],
    },
    {
      id: 'process_automation',
      question:
        locale === 'en-US'
          ? "How automated are your company's processes?"
          : locale === 'pt-BR'
            ? 'Quão automatizados são os processos da sua empresa?'
            : '¿Qué tan automatizados están los procesos de tu empresa?',
      category: 'processes' as const,
      options: [
        {
          value: 'manual',
          text:
            locale === 'en-US'
              ? 'Primarily manual processes'
              : locale === 'pt-BR'
                ? 'Principalmente processos manuais'
                : 'Principalmente procesos manuales',
          score: 0,
        },
        {
          value: 'partially',
          text:
            locale === 'en-US'
              ? 'Some automated processes'
              : locale === 'pt-BR'
                ? 'Alguns processos automatizados'
                : 'Algunos procesos automatizados',
          score: 1,
        },
        {
          value: 'mostly',
          text:
            locale === 'en-US'
              ? 'Majority of processes automated'
              : locale === 'pt-BR'
                ? 'Maioria dos processos automatizados'
                : 'Mayoría de procesos automatizados',
          score: 2,
        },
        {
          value: 'fully',
          text:
            locale === 'en-US'
              ? 'Fully automated processes'
              : locale === 'pt-BR'
                ? 'Processos completamente automatizados'
                : 'Procesos completamente automatizados',
          score: 3,
        },
      ],
    },
    {
      id: 'ai_experience',
      question:
        locale === 'en-US'
          ? 'What is your experience with artificial intelligence?'
          : locale === 'pt-BR'
            ? 'Qual é sua experiência com inteligência artificial?'
            : '¿Cuál es tu experiencia con inteligencia artificial?',
      category: 'technology' as const,
      options: [
        {
          value: 'none',
          text:
            locale === 'en-US'
              ? 'No experience with AI'
              : locale === 'pt-BR'
                ? 'Sem experiência com IA'
                : 'Sin experiencia con IA',
          score: 0,
        },
        {
          value: 'basic',
          text:
            locale === 'en-US'
              ? 'Basic knowledge, no implementation'
              : locale === 'pt-BR'
                ? 'Conhecimento básico, sem implementação'
                : 'Conocimiento básico, sin implementación',
          score: 1,
        },
        {
          value: 'pilot',
          text:
            locale === 'en-US'
              ? 'Pilot projects or basic implementations'
              : locale === 'pt-BR'
                ? 'Projetos piloto ou implementações básicas'
                : 'Proyectos piloto o implementaciones básicas',
          score: 2,
        },
        {
          value: 'advanced',
          text:
            locale === 'en-US'
              ? 'Advanced AI implementations'
              : locale === 'pt-BR'
                ? 'Implementações avançadas de IA'
                : 'Implementaciones avanzadas de IA',
          score: 3,
        },
      ],
    },
    {
      id: 'team_skills',
      question:
        locale === 'en-US'
          ? "How would you evaluate your team's technical skills?"
          : locale === 'pt-BR'
            ? 'Como você avalia as habilidades técnicas da sua equipe?'
            : '¿Cómo evalúas las habilidades técnicas de tu equipo?',
      category: 'culture' as const,
      options: [
        {
          value: 'basic',
          text:
            locale === 'en-US'
              ? 'Basic skills, needs training'
              : locale === 'pt-BR'
                ? 'Habilidades básicas, precisa de treinamento'
                : 'Habilidades básicas, necesita capacitación',
          score: 0,
        },
        {
          value: 'intermediate',
          text:
            locale === 'en-US'
              ? 'Intermediate skills with potential'
              : locale === 'pt-BR'
                ? 'Habilidades intermediárias com potencial'
                : 'Habilidades intermedias con potencial',
          score: 1,
        },
        {
          value: 'good',
          text:
            locale === 'en-US'
              ? 'Good technical level with adaptability'
              : locale === 'pt-BR'
                ? 'Bom nível técnico com adaptabilidade'
                : 'Buen nivel técnico con adaptabilidad',
          score: 2,
        },
        {
          value: 'expert',
          text:
            locale === 'en-US'
              ? 'Highly qualified and specialized team'
              : locale === 'pt-BR'
                ? 'Equipe altamente qualificada e especializada'
                : 'Equipo altamente calificado y especializado',
          score: 3,
        },
      ],
    },
    {
      id: 'budget_commitment',
      question:
        locale === 'en-US'
          ? 'What is your budget commitment for innovation?'
          : locale === 'pt-BR'
            ? 'Qual é o compromisso orçamentário para inovação?'
            : '¿Cuál es el compromiso presupuestario para innovación?',
      category: 'strategy' as const,
      options: [
        {
          value: 'minimal',
          text:
            locale === 'en-US'
              ? 'Very limited budget'
              : locale === 'pt-BR'
                ? 'Orçamento muito limitado'
                : 'Presupuesto muy limitado',
          score: 0,
        },
        {
          value: 'moderate',
          text:
            locale === 'en-US'
              ? 'Moderate budget for specific projects'
              : locale === 'pt-BR'
                ? 'Orçamento moderado para projetos específicos'
                : 'Presupuesto moderado para proyectos específicos',
          score: 1,
        },
        {
          value: 'significant',
          text:
            locale === 'en-US'
              ? 'Significant investment in innovation'
              : locale === 'pt-BR'
                ? 'Investimento significativo em inovação'
                : 'Inversión significativa en innovación',
          score: 2,
        },
        {
          value: 'substantial',
          text:
            locale === 'en-US'
              ? 'Robust budget for transformation'
              : locale === 'pt-BR'
                ? 'Orçamento robusto para transformação'
                : 'Presupuesto robusto para transformación',
          score: 3,
        },
      ],
    },
    {
      id: 'efficiency_urgency',
      question:
        locale === 'en-US'
          ? 'How urgent is improving operational efficiency?'
          : locale === 'pt-BR'
            ? 'Quão urgente é melhorar a eficiência operacional?'
            : '¿Qué tan urgente es mejorar la eficiencia operativa?',
      category: 'processes' as const,
      options: [
        {
          value: 'low',
          text:
            locale === 'en-US'
              ? 'Not an immediate priority'
              : locale === 'pt-BR'
                ? 'Não é uma prioridade imediata'
                : 'No es una prioridad inmediata',
          score: 0,
        },
        {
          value: 'moderate',
          text:
            locale === 'en-US'
              ? 'Important but not urgent'
              : locale === 'pt-BR'
                ? 'Importante, mas não urgente'
                : 'Importante pero no urgente',
          score: 1,
        },
        {
          value: 'high',
          text:
            locale === 'en-US'
              ? 'High priority for this year'
              : locale === 'pt-BR'
                ? 'Alta prioridade para este ano'
                : 'Prioridad alta para este año',
          score: 2,
        },
        {
          value: 'critical',
          text:
            locale === 'en-US'
              ? 'Critical for business survival'
              : locale === 'pt-BR'
                ? 'Crítico para a sobrevivência do negócio'
                : 'Crítico para la supervivencia del negocio',
          score: 3,
        },
      ],
    },
    {
      id: 'competitive_position',
      question:
        locale === 'en-US'
          ? 'How does your company compare technologically with competitors?'
          : locale === 'pt-BR'
            ? 'Como sua empresa se compara tecnologicamente com a concorrência?'
            : '¿Cómo se compara tu empresa tecnológicamente con la competencia?',
      category: 'strategy' as const,
      options: [
        {
          value: 'behind',
          text:
            locale === 'en-US'
              ? 'Significantly behind'
              : locale === 'pt-BR'
                ? 'Significativamente atrás'
                : 'Significativamente por detrás',
          score: 0,
        },
        {
          value: 'catching_up',
          text:
            locale === 'en-US'
              ? 'Trying to catch up'
              : locale === 'pt-BR'
                ? 'Tentando se atualizar'
                : 'Tratando de ponerse al día',
          score: 1,
        },
        {
          value: 'competitive',
          text:
            locale === 'en-US'
              ? 'Competitive in the market'
              : locale === 'pt-BR'
                ? 'Competitiva no mercado'
                : 'Competitiva en el mercado',
          score: 2,
        },
        {
          value: 'leading',
          text:
            locale === 'en-US'
              ? 'Leader in technological innovation'
              : locale === 'pt-BR'
                ? 'Líder em inovação tecnológica'
                : 'Líder en innovación tecnológica',
          score: 3,
        },
      ],
    },
  ];

  return <AssessmentClient translations={translations} assessmentQuestions={assessmentQuestions} />;
}
