import type { AssessmentProps } from './types';

export function getDefaultTranslations(
  locale: 'es' | 'en' | 'pt' = 'es'
): AssessmentProps['translations'] {
  const translations = {
    es: {
      resultTitle: 'Resultados de la Evaluación',
      levelLabel: 'Nivel',
      scoreLabel: 'Puntuación Total',
      recommendationsTitle: 'Recomendaciones',
      serviceRecommendationTitle: 'Servicio Recomendado',
      tierDescriptions: {
        L1_ESSENTIALS:
          'Fundamentos de IA - Ideal para empresas iniciando su transformación digital',
        L2_ADVANCED: 'Soluciones Avanzadas - Para organizaciones con bases digitales establecidas',
        L3_CONSULTING: 'Consultoría Estratégica - Transformación integral con IA',
        L4_PLATFORMS: 'Plataformas Enterprise - Soluciones escalables de IA',
        L5_STRATEGIC: 'Partnership Estratégico - Innovación continua y liderazgo en IA',
      },
      startButton: 'Comenzar Evaluación',
      nextButton: 'Siguiente',
      previousButton: 'Anterior',
      completeButton: 'Completar',
      restartButton: 'Realizar Nueva Evaluación',
      categoryLabels: {
        strategy: 'Estrategia',
        technology: 'Tecnología',
        data: 'Datos',
        culture: 'Cultura',
        processes: 'Procesos',
      },
      levels: {
        beginner: 'Principiante',
        intermediate: 'Intermedio',
        advanced: 'Avanzado',
        expert: 'Experto',
      },
    },
    en: {
      resultTitle: 'Assessment Results',
      levelLabel: 'Level',
      scoreLabel: 'Total Score',
      recommendationsTitle: 'Recommendations',
      serviceRecommendationTitle: 'Recommended Service',
      tierDescriptions: {
        L1_ESSENTIALS:
          'AI Fundamentals - Ideal for companies starting their digital transformation',
        L2_ADVANCED: 'Advanced Solutions - For organizations with established digital foundations',
        L3_CONSULTING: 'Strategic Consulting - Comprehensive AI transformation',
        L4_PLATFORMS: 'Enterprise Platforms - Scalable AI solutions',
        L5_STRATEGIC: 'Strategic Partnership - Continuous innovation and AI leadership',
      },
      startButton: 'Start Assessment',
      nextButton: 'Next',
      previousButton: 'Previous',
      completeButton: 'Complete',
      restartButton: 'Take New Assessment',
      categoryLabels: {
        strategy: 'Strategy',
        technology: 'Technology',
        data: 'Data',
        culture: 'Culture',
        processes: 'Processes',
      },
      levels: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        expert: 'Expert',
      },
    },
    pt: {
      resultTitle: 'Resultados da Avaliação',
      levelLabel: 'Nível',
      scoreLabel: 'Pontuação Total',
      recommendationsTitle: 'Recomendações',
      serviceRecommendationTitle: 'Serviço Recomendado',
      tierDescriptions: {
        L1_ESSENTIALS:
          'Fundamentos de IA - Ideal para empresas iniciando sua transformação digital',
        L2_ADVANCED: 'Soluções Avançadas - Para organizações com bases digitais estabelecidas',
        L3_CONSULTING: 'Consultoria Estratégica - Transformação integral com IA',
        L4_PLATFORMS: 'Plataformas Enterprise - Soluções escaláveis de IA',
        L5_STRATEGIC: 'Parceria Estratégica - Inovação contínua e liderança em IA',
      },
      startButton: 'Iniciar Avaliação',
      nextButton: 'Próximo',
      previousButton: 'Anterior',
      completeButton: 'Completar',
      restartButton: 'Fazer Nova Avaliação',
      categoryLabels: {
        strategy: 'Estratégia',
        technology: 'Tecnologia',
        data: 'Dados',
        culture: 'Cultura',
        processes: 'Processos',
      },
      levels: {
        beginner: 'Iniciante',
        intermediate: 'Intermediário',
        advanced: 'Avançado',
        expert: 'Especialista',
      },
    },
  };

  return translations[locale];
}
