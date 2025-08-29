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
        locale === 'en'
          ? "How defined is your company's digital transformation strategy?"
          : locale === 'pt'
            ? 'Quão definida está a estratégia de transformação digital da sua empresa?'
            : '¿Qué tan definida está la estrategia de transformación digital de tu empresa?',
      category: 'strategy' as const,
      options: [
        {
          value: 'none',
          text:
            locale === 'en'
              ? "We don't have a defined strategy"
              : locale === 'pt'
                ? 'Não temos uma estratégia definida'
                : 'No tenemos una estrategia definida',
          score: 0,
        },
        {
          value: 'basic',
          text:
            locale === 'en'
              ? 'We have basic ideas but no formal plan'
              : locale === 'pt'
                ? 'Temos ideias básicas, mas sem plano formal'
                : 'Tenemos ideas básicas pero sin plan formal',
          score: 1,
        },
        {
          value: 'developing',
          text:
            locale === 'en'
              ? 'We are developing a strategy'
              : locale === 'pt'
                ? 'Estamos desenvolvendo uma estratégia'
                : 'Estamos desarrollando una estrategia',
          score: 2,
        },
        {
          value: 'implemented',
          text:
            locale === 'en'
              ? 'We have a clear and implemented strategy'
              : locale === 'pt'
                ? 'Temos uma estratégia clara e implementada'
                : 'Tenemos una estrategia clara e implementada',
          score: 3,
        },
      ],
    },
    {
      id: 'technology_infrastructure',
      question:
        locale === 'en'
          ? "How would you describe your company's current technology infrastructure?"
          : locale === 'pt'
            ? 'Como você descreveria a infraestrutura tecnológica atual da sua empresa?'
            : '¿Cómo describirías la infraestructura tecnológica actual de tu empresa?',
      category: 'technology' as const,
      options: [
        {
          value: 'outdated',
          text:
            locale === 'en'
              ? 'Legacy systems and manual processes'
              : locale === 'pt'
                ? 'Sistemas legacy e processos manuais'
                : 'Sistemas legacy y procesos manuales',
          score: 0,
        },
        {
          value: 'mixed',
          text:
            locale === 'en'
              ? 'Mix of modern and legacy systems'
              : locale === 'pt'
                ? 'Combinação de sistemas modernos e legacy'
                : 'Combinación de sistemas modernos y legacy',
          score: 1,
        },
        {
          value: 'modern',
          text:
            locale === 'en'
              ? 'Modern systems with some automation'
              : locale === 'pt'
                ? 'Sistemas modernos com algumas automações'
                : 'Sistemas modernos con algunas automaciones',
          score: 2,
        },
        {
          value: 'advanced',
          text:
            locale === 'en'
              ? 'Advanced and automated tech infrastructure'
              : locale === 'pt'
                ? 'Infraestrutura tecnológica avançada e automatizada'
                : 'Infraestructura tecnológica avanzada y automatizada',
          score: 3,
        },
      ],
    },
    {
      id: 'data_analytics',
      question:
        locale === 'en'
          ? 'How does your company handle data and analytics?'
          : locale === 'pt'
            ? 'Como sua empresa lida com dados e análises?'
            : '¿Cómo maneja tu empresa los datos y analytics?',
      category: 'data' as const,
      options: [
        {
          value: 'no_data',
          text:
            locale === 'en'
              ? "We don't collect data systematically"
              : locale === 'pt'
                ? 'Não coletamos dados sistematicamente'
                : 'No recopilamos datos de forma sistemática',
          score: 0,
        },
        {
          value: 'basic_data',
          text:
            locale === 'en'
              ? 'We collect basic data without analysis'
              : locale === 'pt'
                ? 'Coletamos dados básicos sem análise'
                : 'Recopilamos datos básicos sin análisis',
          score: 1,
        },
        {
          value: 'some_analytics',
          text:
            locale === 'en'
              ? 'We have basic analytics tools'
              : locale === 'pt'
                ? 'Temos ferramentas básicas de análise'
                : 'Tenemos herramientas básicas de análisis',
          score: 2,
        },
        {
          value: 'advanced_analytics',
          text:
            locale === 'en'
              ? 'We use advanced analytics and BI'
              : locale === 'pt'
                ? 'Usamos análises avançadas e BI'
                : 'Usamos analytics avanzados y BI',
          score: 3,
        },
      ],
    },
    {
      id: 'innovation_culture',
      question:
        locale === 'en'
          ? "How would you describe your company's innovation culture?"
          : locale === 'pt'
            ? 'Como é a cultura de inovação na sua empresa?'
            : '¿Cómo es la cultura de innovación en tu empresa?',
      category: 'culture' as const,
      options: [
        {
          value: 'resistant',
          text:
            locale === 'en'
              ? 'Resistant to change and new technologies'
              : locale === 'pt'
                ? 'Resistente à mudança e novas tecnologias'
                : 'Resistente al cambio y nuevas tecnologías',
          score: 0,
        },
        {
          value: 'cautious',
          text:
            locale === 'en'
              ? 'Cautious but open to gradual changes'
              : locale === 'pt'
                ? 'Cautelosa, mas aberta a mudanças graduais'
                : 'Cautelosa pero abierta a cambios graduales',
          score: 1,
        },
        {
          value: 'adaptive',
          text:
            locale === 'en'
              ? 'Adaptive with a growth mindset'
              : locale === 'pt'
                ? 'Adaptável com mentalidade de crescimento'
                : 'Adaptable y con mentalidad de crecimiento',
          score: 2,
        },
        {
          value: 'innovative',
          text:
            locale === 'en'
              ? 'Highly innovative and proactive'
              : locale === 'pt'
                ? 'Altamente inovadora e proativa'
                : 'Altamente innovadora y proactiva',
          score: 3,
        },
      ],
    },
    {
      id: 'process_automation',
      question:
        locale === 'en'
          ? "How automated are your company's processes?"
          : locale === 'pt'
            ? 'Quão automatizados são os processos da sua empresa?'
            : '¿Qué tan automatizados están los procesos de tu empresa?',
      category: 'processes' as const,
      options: [
        {
          value: 'manual',
          text:
            locale === 'en'
              ? 'Primarily manual processes'
              : locale === 'pt'
                ? 'Principalmente processos manuais'
                : 'Principalmente procesos manuales',
          score: 0,
        },
        {
          value: 'partially',
          text:
            locale === 'en'
              ? 'Some automated processes'
              : locale === 'pt'
                ? 'Alguns processos automatizados'
                : 'Algunos procesos automatizados',
          score: 1,
        },
        {
          value: 'mostly',
          text:
            locale === 'en'
              ? 'Majority of processes automated'
              : locale === 'pt'
                ? 'Maioria dos processos automatizados'
                : 'Mayoría de procesos automatizados',
          score: 2,
        },
        {
          value: 'fully',
          text:
            locale === 'en'
              ? 'Fully automated processes'
              : locale === 'pt'
                ? 'Processos completamente automatizados'
                : 'Procesos completamente automatizados',
          score: 3,
        },
      ],
    },
    {
      id: 'ai_experience',
      question:
        locale === 'en'
          ? 'What is your experience with artificial intelligence?'
          : locale === 'pt'
            ? 'Qual é sua experiência com inteligência artificial?'
            : '¿Cuál es tu experiencia con inteligencia artificial?',
      category: 'technology' as const,
      options: [
        {
          value: 'none',
          text:
            locale === 'en'
              ? 'No experience with AI'
              : locale === 'pt'
                ? 'Sem experiência com IA'
                : 'Sin experiencia con IA',
          score: 0,
        },
        {
          value: 'basic',
          text:
            locale === 'en'
              ? 'Basic knowledge, no implementation'
              : locale === 'pt'
                ? 'Conhecimento básico, sem implementação'
                : 'Conocimiento básico, sin implementación',
          score: 1,
        },
        {
          value: 'pilot',
          text:
            locale === 'en'
              ? 'Pilot projects or basic implementations'
              : locale === 'pt'
                ? 'Projetos piloto ou implementações básicas'
                : 'Proyectos piloto o implementaciones básicas',
          score: 2,
        },
        {
          value: 'advanced',
          text:
            locale === 'en'
              ? 'Advanced AI implementations'
              : locale === 'pt'
                ? 'Implementações avançadas de IA'
                : 'Implementaciones avanzadas de IA',
          score: 3,
        },
      ],
    },
    {
      id: 'team_skills',
      question:
        locale === 'en'
          ? "How would you evaluate your team's technical skills?"
          : locale === 'pt'
            ? 'Como você avalia as habilidades técnicas da sua equipe?'
            : '¿Cómo evalúas las habilidades técnicas de tu equipo?',
      category: 'culture' as const,
      options: [
        {
          value: 'basic',
          text:
            locale === 'en'
              ? 'Basic skills, needs training'
              : locale === 'pt'
                ? 'Habilidades básicas, precisa de treinamento'
                : 'Habilidades básicas, necesita capacitación',
          score: 0,
        },
        {
          value: 'intermediate',
          text:
            locale === 'en'
              ? 'Intermediate skills with potential'
              : locale === 'pt'
                ? 'Habilidades intermediárias com potencial'
                : 'Habilidades intermedias con potencial',
          score: 1,
        },
        {
          value: 'good',
          text:
            locale === 'en'
              ? 'Good technical level with adaptability'
              : locale === 'pt'
                ? 'Bom nível técnico com adaptabilidade'
                : 'Buen nivel técnico con adaptabilidad',
          score: 2,
        },
        {
          value: 'expert',
          text:
            locale === 'en'
              ? 'Highly qualified and specialized team'
              : locale === 'pt'
                ? 'Equipe altamente qualificada e especializada'
                : 'Equipo altamente calificado y especializado',
          score: 3,
        },
      ],
    },
    {
      id: 'budget_commitment',
      question:
        locale === 'en'
          ? 'What is your budget commitment for innovation?'
          : locale === 'pt'
            ? 'Qual é o compromisso orçamentário para inovação?'
            : '¿Cuál es el compromiso presupuestario para innovación?',
      category: 'strategy' as const,
      options: [
        {
          value: 'minimal',
          text:
            locale === 'en'
              ? 'Very limited budget'
              : locale === 'pt'
                ? 'Orçamento muito limitado'
                : 'Presupuesto muy limitado',
          score: 0,
        },
        {
          value: 'moderate',
          text:
            locale === 'en'
              ? 'Moderate budget for specific projects'
              : locale === 'pt'
                ? 'Orçamento moderado para projetos específicos'
                : 'Presupuesto moderado para proyectos específicos',
          score: 1,
        },
        {
          value: 'significant',
          text:
            locale === 'en'
              ? 'Significant investment in innovation'
              : locale === 'pt'
                ? 'Investimento significativo em inovação'
                : 'Inversión significativa en innovación',
          score: 2,
        },
        {
          value: 'substantial',
          text:
            locale === 'en'
              ? 'Robust budget for transformation'
              : locale === 'pt'
                ? 'Orçamento robusto para transformação'
                : 'Presupuesto robusto para transformación',
          score: 3,
        },
      ],
    },
    {
      id: 'efficiency_urgency',
      question:
        locale === 'en'
          ? 'How urgent is improving operational efficiency?'
          : locale === 'pt'
            ? 'Quão urgente é melhorar a eficiência operacional?'
            : '¿Qué tan urgente es mejorar la eficiencia operativa?',
      category: 'processes' as const,
      options: [
        {
          value: 'low',
          text:
            locale === 'en'
              ? 'Not an immediate priority'
              : locale === 'pt'
                ? 'Não é uma prioridade imediata'
                : 'No es una prioridad inmediata',
          score: 0,
        },
        {
          value: 'moderate',
          text:
            locale === 'en'
              ? 'Important but not urgent'
              : locale === 'pt'
                ? 'Importante, mas não urgente'
                : 'Importante pero no urgente',
          score: 1,
        },
        {
          value: 'high',
          text:
            locale === 'en'
              ? 'High priority for this year'
              : locale === 'pt'
                ? 'Alta prioridade para este ano'
                : 'Prioridad alta para este año',
          score: 2,
        },
        {
          value: 'critical',
          text:
            locale === 'en'
              ? 'Critical for business survival'
              : locale === 'pt'
                ? 'Crítico para a sobrevivência do negócio'
                : 'Crítico para la supervivencia del negocio',
          score: 3,
        },
      ],
    },
    {
      id: 'competitive_position',
      question:
        locale === 'en'
          ? 'How does your company compare technologically with competitors?'
          : locale === 'pt'
            ? 'Como sua empresa se compara tecnologicamente com a concorrência?'
            : '¿Cómo se compara tu empresa tecnológicamente con la competencia?',
      category: 'strategy' as const,
      options: [
        {
          value: 'behind',
          text:
            locale === 'en'
              ? 'Significantly behind'
              : locale === 'pt'
                ? 'Significativamente atrás'
                : 'Significativamente por detrás',
          score: 0,
        },
        {
          value: 'catching_up',
          text:
            locale === 'en'
              ? 'Trying to catch up'
              : locale === 'pt'
                ? 'Tentando se atualizar'
                : 'Tratando de ponerse al día',
          score: 1,
        },
        {
          value: 'competitive',
          text:
            locale === 'en'
              ? 'Competitive in the market'
              : locale === 'pt'
                ? 'Competitiva no mercado'
                : 'Competitiva en el mercado',
          score: 2,
        },
        {
          value: 'leading',
          text:
            locale === 'en'
              ? 'Leader in technological innovation'
              : locale === 'pt'
                ? 'Líder em inovação tecnológica'
                : 'Líder en innovación tecnológica',
          score: 3,
        },
      ],
    },
  ];

  return <AssessmentClient translations={translations} assessmentQuestions={assessmentQuestions} />;
}
