'use client';

import { Container, Heading, Assessment, LeadForm, Button, Card, CardContent } from '@madfam/ui';
import { useTranslations } from 'next-intl';
import { logServiceInquiry } from '@/lib/logger';
import { type Locale } from '@madfam/i18n';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function AssessmentPage() {
  const params = useParams();
  const locale = params?.locale as string;
  const currentLocale = locale as Locale;
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);

  const assessmentQuestions = [
    {
      id: 'digital_strategy',
      question: currentLocale === 'en-US' ? 'How defined is your company\'s digital transformation strategy?' : currentLocale === 'pt-BR' ? 'Quão definida está a estratégia de transformação digital da sua empresa?' : '¿Qué tan definida está la estrategia de transformación digital de tu empresa?',
      category: 'strategy' as const,
      options: [
        { 
          value: 'none', 
          text: currentLocale === 'en-US' ? 'We don\'t have a defined strategy' : currentLocale === 'pt-BR' ? 'Não temos uma estratégia definida' : 'No tenemos una estrategia definida',
          score: 0 
        },
        { 
          value: 'basic', 
          text: currentLocale === 'en-US' ? 'We have basic ideas but no formal plan' : currentLocale === 'pt-BR' ? 'Temos ideias básicas, mas sem plano formal' : 'Tenemos ideas básicas pero sin plan formal',
          score: 1 
        },
        { 
          value: 'developing', 
          text: currentLocale === 'en-US' ? 'We are developing a strategy' : currentLocale === 'pt-BR' ? 'Estamos desenvolvendo uma estratégia' : 'Estamos desarrollando una estrategia',
          score: 2 
        },
        { 
          value: 'implemented', 
          text: currentLocale === 'en-US' ? 'We have a clear and implemented strategy' : currentLocale === 'pt-BR' ? 'Temos uma estratégia clara e implementada' : 'Tenemos una estrategia clara e implementada',
          score: 3 
        },
      ],
    },
    {
      id: 'technology_infrastructure',
      question: currentLocale === 'en-US' ? 'How would you describe your company\'s current technology infrastructure?' : currentLocale === 'pt-BR' ? 'Como você descreveria a infraestrutura tecnológica atual da sua empresa?' : '¿Cómo describirías la infraestructura tecnológica actual de tu empresa?',
      category: 'technology' as const,
      options: [
        { 
          value: 'outdated', 
          text: currentLocale === 'en-US' ? 'Legacy systems and manual processes' : currentLocale === 'pt-BR' ? 'Sistemas legacy e processos manuais' : 'Sistemas legacy y procesos manuales',
          score: 0 
        },
        { 
          value: 'mixed', 
          text: currentLocale === 'en-US' ? 'Mix of modern and legacy systems' : currentLocale === 'pt-BR' ? 'Combinação de sistemas modernos e legacy' : 'Combinación de sistemas modernos y legacy',
          score: 1 
        },
        { 
          value: 'modern', 
          text: currentLocale === 'en-US' ? 'Modern systems with some automation' : currentLocale === 'pt-BR' ? 'Sistemas modernos com algumas automações' : 'Sistemas modernos con algunas automaciones',
          score: 2 
        },
        { 
          value: 'advanced', 
          text: currentLocale === 'en-US' ? 'Advanced and automated tech infrastructure' : currentLocale === 'pt-BR' ? 'Infraestrutura tecnológica avançada e automatizada' : 'Infraestructura tecnológica avanzada y automatizada',
          score: 3 
        },
      ],
    },
    {
      id: 'data_analytics',
      question: currentLocale === 'en-US' ? 'How does your company handle data and analytics?' : currentLocale === 'pt-BR' ? 'Como sua empresa lida com dados e análises?' : '¿Cómo maneja tu empresa los datos y analytics?',
      category: 'data' as const,
      options: [
        { 
          value: 'no_data', 
          text: currentLocale === 'en-US' ? 'We don\'t collect data systematically' : currentLocale === 'pt-BR' ? 'Não coletamos dados sistematicamente' : 'No recopilamos datos de forma sistemática',
          score: 0 
        },
        { 
          value: 'basic_data', 
          text: currentLocale === 'en-US' ? 'We collect basic data without analysis' : currentLocale === 'pt-BR' ? 'Coletamos dados básicos sem análise' : 'Recopilamos datos básicos sin análisis',
          score: 1 
        },
        { 
          value: 'some_analytics', 
          text: currentLocale === 'en-US' ? 'We have basic analytics tools' : currentLocale === 'pt-BR' ? 'Temos ferramentas básicas de análise' : 'Tenemos herramientas básicas de análisis',
          score: 2 
        },
        { 
          value: 'advanced_analytics', 
          text: currentLocale === 'en-US' ? 'We use advanced analytics and BI' : currentLocale === 'pt-BR' ? 'Usamos análises avançadas e BI' : 'Usamos analytics avanzados y BI',
          score: 3 
        },
      ],
    },
    {
      id: 'innovation_culture',
      question: currentLocale === 'en-US' ? 'How would you describe your company\'s innovation culture?' : currentLocale === 'pt-BR' ? 'Como é a cultura de inovação na sua empresa?' : '¿Cómo es la cultura de innovación en tu empresa?',
      category: 'culture' as const,
      options: [
        { 
          value: 'resistant', 
          text: currentLocale === 'en-US' ? 'Resistant to change and new technologies' : currentLocale === 'pt-BR' ? 'Resistente à mudança e novas tecnologias' : 'Resistente al cambio y nuevas tecnologías',
          score: 0 
        },
        { 
          value: 'cautious', 
          text: currentLocale === 'en-US' ? 'Cautious but open to gradual changes' : currentLocale === 'pt-BR' ? 'Cautelosa, mas aberta a mudanças graduais' : 'Cautelosa pero abierta a cambios graduales',
          score: 1 
        },
        { 
          value: 'adaptive', 
          text: currentLocale === 'en-US' ? 'Adaptive with a growth mindset' : currentLocale === 'pt-BR' ? 'Adaptável com mentalidade de crescimento' : 'Adaptable y con mentalidad de crecimiento',
          score: 2 
        },
        { 
          value: 'innovative', 
          text: currentLocale === 'en-US' ? 'Highly innovative and proactive' : currentLocale === 'pt-BR' ? 'Altamente inovadora e proativa' : 'Altamente innovadora y proactiva',
          score: 3 
        },
      ],
    },
    {
      id: 'process_automation',
      question: currentLocale === 'en-US' ? 'How automated are your company\'s processes?' : currentLocale === 'pt-BR' ? 'Quão automatizados são os processos da sua empresa?' : '¿Qué tan automatizados están los procesos de tu empresa?',
      category: 'processes' as const,
      options: [
        { 
          value: 'manual', 
          text: currentLocale === 'en-US' ? 'Primarily manual processes' : currentLocale === 'pt-BR' ? 'Principalmente processos manuais' : 'Principalmente procesos manuales',
          score: 0 
        },
        { 
          value: 'partially', 
          text: currentLocale === 'en-US' ? 'Some automated processes' : currentLocale === 'pt-BR' ? 'Alguns processos automatizados' : 'Algunos procesos automatizados',
          score: 1 
        },
        { 
          value: 'mostly', 
          text: currentLocale === 'en-US' ? 'Majority of processes automated' : currentLocale === 'pt-BR' ? 'Maioria dos processos automatizados' : 'Mayoría de procesos automatizados',
          score: 2 
        },
        { 
          value: 'fully', 
          text: currentLocale === 'en-US' ? 'Fully automated processes' : currentLocale === 'pt-BR' ? 'Processos completamente automatizados' : 'Procesos completamente automatizados',
          score: 3 
        },
      ],
    },
    {
      id: 'ai_experience',
      question: currentLocale === 'en-US' ? 'What is your experience with artificial intelligence?' : currentLocale === 'pt-BR' ? 'Qual é sua experiência com inteligência artificial?' : '¿Cuál es tu experiencia con inteligencia artificial?',
      category: 'technology' as const,
      options: [
        { 
          value: 'none', 
          text: currentLocale === 'en-US' ? 'No experience with AI' : currentLocale === 'pt-BR' ? 'Sem experiência com IA' : 'Sin experiencia con IA',
          score: 0 
        },
        { 
          value: 'basic', 
          text: currentLocale === 'en-US' ? 'Basic knowledge, no implementation' : currentLocale === 'pt-BR' ? 'Conhecimento básico, sem implementação' : 'Conocimiento básico, sin implementación',
          score: 1 
        },
        { 
          value: 'pilot', 
          text: currentLocale === 'en-US' ? 'Pilot projects or basic implementations' : currentLocale === 'pt-BR' ? 'Projetos piloto ou implementações básicas' : 'Proyectos piloto o implementaciones básicas',
          score: 2 
        },
        { 
          value: 'advanced', 
          text: currentLocale === 'en-US' ? 'Advanced AI implementations' : currentLocale === 'pt-BR' ? 'Implementações avançadas de IA' : 'Implementaciones avanzadas de IA',
          score: 3 
        },
      ],
    },
    {
      id: 'team_skills',
      question: currentLocale === 'en-US' ? 'How would you evaluate your team\'s technical skills?' : currentLocale === 'pt-BR' ? 'Como você avalia as habilidades técnicas da sua equipe?' : '¿Cómo evalúas las habilidades técnicas de tu equipo?',
      category: 'culture' as const,
      options: [
        { 
          value: 'basic', 
          text: currentLocale === 'en-US' ? 'Basic skills, needs training' : currentLocale === 'pt-BR' ? 'Habilidades básicas, precisa de treinamento' : 'Habilidades básicas, necesita capacitación',
          score: 0 
        },
        { 
          value: 'intermediate', 
          text: currentLocale === 'en-US' ? 'Intermediate skills with potential' : currentLocale === 'pt-BR' ? 'Habilidades intermediárias com potencial' : 'Habilidades intermedias con potencial',
          score: 1 
        },
        { 
          value: 'good', 
          text: currentLocale === 'en-US' ? 'Good technical level with adaptability' : currentLocale === 'pt-BR' ? 'Bom nível técnico com adaptabilidade' : 'Buen nivel técnico con adaptabilidad',
          score: 2 
        },
        { 
          value: 'expert', 
          text: currentLocale === 'en-US' ? 'Highly qualified and specialized team' : currentLocale === 'pt-BR' ? 'Equipe altamente qualificada e especializada' : 'Equipo altamente calificado y especializado',
          score: 3 
        },
      ],
    },
    {
      id: 'budget_commitment',
      question: currentLocale === 'en-US' ? 'What is your budget commitment for innovation?' : currentLocale === 'pt-BR' ? 'Qual é o compromisso orçamentário para inovação?' : '¿Cuál es el compromiso presupuestario para innovación?',
      category: 'strategy' as const,
      options: [
        { 
          value: 'minimal', 
          text: currentLocale === 'en-US' ? 'Very limited budget' : currentLocale === 'pt-BR' ? 'Orçamento muito limitado' : 'Presupuesto muy limitado',
          score: 0 
        },
        { 
          value: 'moderate', 
          text: currentLocale === 'en-US' ? 'Moderate budget for specific projects' : currentLocale === 'pt-BR' ? 'Orçamento moderado para projetos específicos' : 'Presupuesto moderado para proyectos específicos',
          score: 1 
        },
        { 
          value: 'significant', 
          text: currentLocale === 'en-US' ? 'Significant investment in innovation' : currentLocale === 'pt-BR' ? 'Investimento significativo em inovação' : 'Inversión significativa en innovación',
          score: 2 
        },
        { 
          value: 'substantial', 
          text: currentLocale === 'en-US' ? 'Robust budget for transformation' : currentLocale === 'pt-BR' ? 'Orçamento robusto para transformação' : 'Presupuesto robusto para transformación',
          score: 3 
        },
      ],
    },
    {
      id: 'efficiency_urgency',
      question: currentLocale === 'en-US' ? 'How urgent is improving operational efficiency?' : currentLocale === 'pt-BR' ? 'Quão urgente é melhorar a eficiência operacional?' : '¿Qué tan urgente es mejorar la eficiencia operativa?',
      category: 'processes' as const,
      options: [
        { 
          value: 'low', 
          text: currentLocale === 'en-US' ? 'Not an immediate priority' : currentLocale === 'pt-BR' ? 'Não é uma prioridade imediata' : 'No es una prioridad inmediata',
          score: 0 
        },
        { 
          value: 'moderate', 
          text: currentLocale === 'en-US' ? 'Important but not urgent' : currentLocale === 'pt-BR' ? 'Importante, mas não urgente' : 'Importante pero no urgente',
          score: 1 
        },
        { 
          value: 'high', 
          text: currentLocale === 'en-US' ? 'High priority for this year' : currentLocale === 'pt-BR' ? 'Alta prioridade para este ano' : 'Prioridad alta para este año',
          score: 2 
        },
        { 
          value: 'critical', 
          text: currentLocale === 'en-US' ? 'Critical for business survival' : currentLocale === 'pt-BR' ? 'Crítico para a sobrevivência do negócio' : 'Crítico para la supervivencia del negocio',
          score: 3 
        },
      ],
    },
    {
      id: 'competitive_position',
      question: currentLocale === 'en-US' ? 'How does your company compare technologically with competitors?' : currentLocale === 'pt-BR' ? 'Como sua empresa se compara tecnologicamente com a concorrência?' : '¿Cómo se compara tu empresa tecnológicamente con la competencia?',
      category: 'strategy' as const,
      options: [
        { 
          value: 'behind', 
          text: currentLocale === 'en-US' ? 'Significantly behind' : currentLocale === 'pt-BR' ? 'Significativamente atrás' : 'Significativamente por detrás',
          score: 0 
        },
        { 
          value: 'catching_up', 
          text: currentLocale === 'en-US' ? 'Trying to catch up' : currentLocale === 'pt-BR' ? 'Tentando se atualizar' : 'Tratando de ponerse al día',
          score: 1 
        },
        { 
          value: 'competitive', 
          text: currentLocale === 'en-US' ? 'Competitive in the market' : currentLocale === 'pt-BR' ? 'Competitiva no mercado' : 'Competitiva en el mercado',
          score: 2 
        },
        { 
          value: 'leading', 
          text: currentLocale === 'en-US' ? 'Leader in technological innovation' : currentLocale === 'pt-BR' ? 'Líder em inovação tecnológica' : 'Líder en innovación tecnológica',
          score: 3 
        },
      ],
    },
  ];

  const handleAssessmentComplete = (result: any) => {
    setAssessmentResult(result);
    setShowLeadForm(true);
    logServiceInquiry(result.recommendedTier, 'ai-readiness-assessment', {
      result,
      locale: currentLocale,
    });
  };

  if (showLeadForm) {
    return (
      <main className="min-h-screen">
        <section className="section">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Heading level={2} className="mb-4">
                  {currentLocale === 'en-US' ? 'Get your personalized strategy' : currentLocale === 'pt-BR' ? 'Receba sua estratégia personalizada' : 'Recibe tu estrategia personalizada'}
                </Heading>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  {currentLocale === 'en-US' ? 'Based on your assessment results, we\'ll create a customized roadmap for your AI transformation journey.' : currentLocale === 'pt-BR' ? 'Com base nos resultados da sua avaliação, criaremos um roteiro personalizado para sua jornada de transformação em IA.' : 'Basándose en los resultados de tu evaluación, crearemos una hoja de ruta personalizada para tu viaje de transformación en IA.'}
                </p>
              </div>
              
              <LeadForm
                variant="progressive"
                tier={assessmentResult?.recommendedTier}
                source="ai-readiness-assessment"
                title={currentLocale === 'en-US' ? 'Request your strategy session' : currentLocale === 'pt-BR' ? 'Solicite sua sessão de estratégia' : 'Solicita tu sesión de estrategia'}
                description={currentLocale === 'en-US' ? 'Let\'s discuss your results and create a personalized plan for your AI transformation' : currentLocale === 'pt-BR' ? 'Vamos discutir seus resultados e criar um plano personalizado para sua transformação em IA' : 'Vamos discutir tus resultados y crear un plan personalizado para tu transformación en IA'}
                submitText={currentLocale === 'en-US' ? 'Schedule strategy session' : currentLocale === 'pt-BR' ? 'Agendar sessão de estratégia' : 'Agendar sesión de estrategia'}
                onSubmit={async (data) => {
                  logServiceInquiry(assessmentResult?.recommendedTier, 'assessment-strategy-request', {
                    ...data,
                    assessmentResult,
                    locale: currentLocale,
                  });
                  // TODO: Implement actual form submission
                }}
              />
            </div>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-obsidian/5 to-lavender/10">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading level={1} className="mb-6">
              {currentLocale === 'en-US' ? 'AI Readiness Assessment' : currentLocale === 'pt-BR' ? 'Avaliação de Maturidade em IA' : 'Evaluación de Madurez en IA'}
            </Heading>
            <p className="text-xl text-obsidian/70 mb-8">
              {currentLocale === 'en-US' ? 'Discover your company\'s level of AI readiness and get personalized recommendations for your digital transformation journey.' : currentLocale === 'pt-BR' ? 'Descubra o nível de maturidade em IA da sua empresa e receba recomendações personalizadas para sua jornada de transformação digital.' : 'Descubre el nivel de madurez en IA de tu empresa y recibe recomendaciones personalizadas para tu viaje de transformación digital.'}
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-obsidian/60">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-leaf" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{currentLocale === 'en-US' ? '10 strategic questions' : currentLocale === 'pt-BR' ? '10 perguntas estratégicas' : '10 preguntas estratégicas'}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-sun" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{currentLocale === 'en-US' ? '5 minutes' : currentLocale === 'pt-BR' ? '5 minutos' : '5 minutos'}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-lavender" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{currentLocale === 'en-US' ? 'Instant results' : currentLocale === 'pt-BR' ? 'Resultados instantâneos' : 'Resultados instantáneos'}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Assessment Section */}
      <section className="section" id="assessment">
        <Container>
          <Assessment
            title={currentLocale === 'en-US' ? 'AI Readiness Assessment' : currentLocale === 'pt-BR' ? 'Avaliação de Maturidade em IA' : 'Evaluación de Madurez en IA'}
            description={currentLocale === 'en-US' ? 'Answer these strategic questions to understand your company\'s current AI maturity level' : currentLocale === 'pt-BR' ? 'Responda estas perguntas estratégicas para entender o nível atual de maturidade em IA da sua empresa' : 'Responde estas preguntas estratégicas para entender el nivel actual de madurez en IA de tu empresa'}
            questions={assessmentQuestions}
            locale={currentLocale}
            onComplete={handleAssessmentComplete}
          />
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="section bg-pearl">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heading level={2} className="mb-4">
                {currentLocale === 'en-US' ? 'Why take the assessment?' : currentLocale === 'pt-BR' ? 'Por que fazer a avaliação?' : '¿Por qué hacer la evaluación?'}
              </Heading>
              <p className="text-lg text-obsidian/70">
                {currentLocale === 'en-US' ? 'Get actionable insights to accelerate your AI transformation journey' : currentLocale === 'pt-BR' ? 'Obtenha insights acionáveis para acelerar sua jornada de transformação em IA' : 'Obtén insights accionables para acelerar tu viaje de transformación en IA'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="font-heading text-lg mb-2">
                    {currentLocale === 'en-US' ? 'Identify Gaps' : currentLocale === 'pt-BR' ? 'Identifique Lacunas' : 'Identifica Brechas'}
                  </h3>
                  <p className="text-obsidian/70 text-sm">
                    {currentLocale === 'en-US' ? 'Understand where your organization stands and what needs improvement' : currentLocale === 'pt-BR' ? 'Entenda onde sua organização está e o que precisa ser melhorado' : 'Entiende dónde está tu organización y qué necesita mejora'}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="font-heading text-lg mb-2">
                    {currentLocale === 'en-US' ? 'Benchmark Progress' : currentLocale === 'pt-BR' ? 'Referencie Progresso' : 'Referencia Progreso'}
                  </h3>
                  <p className="text-obsidian/70 text-sm">
                    {currentLocale === 'en-US' ? 'Compare your maturity level with industry standards and best practices' : currentLocale === 'pt-BR' ? 'Compare seu nível de maturidade com padrões da indústria e melhores práticas' : 'Compara tu nivel de madurez con estándares de la industria y mejores prácticas'}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="font-heading text-lg mb-2">
                    {currentLocale === 'en-US' ? 'Get Recommendations' : currentLocale === 'pt-BR' ? 'Receba Recomendações' : 'Recibe Recomendaciones'}
                  </h3>
                  <p className="text-obsidian/70 text-sm">
                    {currentLocale === 'en-US' ? 'Receive personalized recommendations and next steps for your AI journey' : currentLocale === 'pt-BR' ? 'Receba recomendações personalizadas e próximos passos para sua jornada de IA' : 'Recibe recomendaciones personalizadas y próximos pasos para tu viaje de IA'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section">
        <Container>
          <div className="bg-gradient-to-r from-obsidian to-lavender rounded-3xl p-12 text-center text-white">
            <Heading level={2} className="text-white mb-4">
              {currentLocale === 'en-US' ? 'Ready to transform your business?' : currentLocale === 'pt-BR' ? 'Pronto para transformar seu negócio?' : '¿Listo para transformar tu negocio?'}
            </Heading>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {currentLocale === 'en-US' ? 'Take the assessment and discover how MADFAM can help you achieve your AI transformation goals' : currentLocale === 'pt-BR' ? 'Faça a avaliação e descubra como MADFAM pode ajudá-lo a alcançar seus objetivos de transformação em IA' : 'Haz la evaluación y descubre cómo MADFAM puede ayudarte a lograr tus objetivos de transformación en IA'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {currentLocale === 'en-US' ? 'Start Assessment' : currentLocale === 'pt-BR' ? 'Começar Avaliação' : 'Comenzar Evaluación'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-obsidian"
              >
                {currentLocale === 'en-US' ? 'Schedule consultation' : currentLocale === 'pt-BR' ? 'Agendar consulta' : 'Agendar consulta'}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}