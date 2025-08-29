'use client';

import * as React from 'react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from './Button';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: {
    value: string;
    text: string;
    score: number;
  }[];
  category: 'strategy' | 'technology' | 'data' | 'culture' | 'processes';
}

export interface AssessmentResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  categoryScores: {
    strategy: number;
    technology: number;
    data: number;
    culture: number;
    processes: number;
  };
  recommendations: string[];
  recommendedTier:
    | 'L1_ESSENTIALS'
    | 'L2_ADVANCED'
    | 'L3_CONSULTING'
    | 'L4_PLATFORMS'
    | 'L5_STRATEGIC';
}

export interface AssessmentProps {
  title?: string;
  description?: string;
  questions: AssessmentQuestion[];
  onComplete?: (result: AssessmentResult) => void;
  className?: string;
  locale?: 'es' | 'en' | 'pt';
  translations?: {
    resultTitle: string;
    levelLabel: string;
    recommendationsTitle: string;
    recommendedServiceTitle: string;
    recommendedServiceDescription: string;
    restartButton: string;
    requestConsultationButton: string;
    previousButton: string;
    nextButton: string;
    finishButton: string;
    categoryLabels: {
      strategy: string;
      technology: string;
      data: string;
      culture: string;
      processes: string;
    };
    levelDescriptions: {
      beginner: string;
      intermediate: string;
      advanced: string;
      expert: string;
    };
  };
}

const defaultQuestions: AssessmentQuestion[] = [
  {
    id: 'strategy',
    question: '¿Qué tan definida está la estrategia de transformación digital de tu empresa?',
    category: 'strategy',
    options: [
      { value: 'none', text: 'No tenemos una estrategia definida', score: 0 },
      { value: 'basic', text: 'Tenemos ideas básicas pero sin plan formal', score: 1 },
      { value: 'developing', text: 'Estamos desarrollando una estrategia', score: 2 },
      { value: 'implemented', text: 'Tenemos una estrategia clara e implementada', score: 3 },
    ],
  },
  {
    id: 'technology',
    question: '¿Cómo describirías la infraestructura tecnológica actual de tu empresa?',
    category: 'technology',
    options: [
      { value: 'outdated', text: 'Sistemas legacy y procesos manuales', score: 0 },
      { value: 'mixed', text: 'Combinación de sistemas modernos y legacy', score: 1 },
      { value: 'modern', text: 'Sistemas modernos con algunas automaciones', score: 2 },
      { value: 'advanced', text: 'Infraestructura tecnológica avanzada y automatizada', score: 3 },
    ],
  },
  {
    id: 'data',
    question: '¿Cómo maneja tu empresa los datos y analytics?',
    category: 'data',
    options: [
      { value: 'no_data', text: 'No recopilamos datos de forma sistemática', score: 0 },
      { value: 'basic_data', text: 'Recopilamos datos básicos sin análisis', score: 1 },
      { value: 'some_analytics', text: 'Tenemos herramientas básicas de análisis', score: 2 },
      { value: 'advanced_analytics', text: 'Usamos analytics avanzados y BI', score: 3 },
    ],
  },
  {
    id: 'culture',
    question: '¿Cómo es la cultura de innovación en tu empresa?',
    category: 'culture',
    options: [
      { value: 'resistant', text: 'Resistente al cambio y nuevas tecnologías', score: 0 },
      { value: 'cautious', text: 'Cautelosa pero abierta a cambios graduales', score: 1 },
      { value: 'adaptive', text: 'Adaptable y con mentalidad de crecimiento', score: 2 },
      { value: 'innovative', text: 'Altamente innovadora y proactiva', score: 3 },
    ],
  },
  {
    id: 'processes',
    question: '¿Qué tan automatizados están los procesos de tu empresa?',
    category: 'processes',
    options: [
      { value: 'manual', text: 'Principalmente procesos manuales', score: 0 },
      { value: 'partially', text: 'Algunos procesos automatizados', score: 1 },
      { value: 'mostly', text: 'Mayoría de procesos automatizados', score: 2 },
      { value: 'fully', text: 'Procesos completamente automatizados', score: 3 },
    ],
  },
  {
    id: 'ai_experience',
    question: '¿Cuál es tu experiencia con inteligencia artificial?',
    category: 'technology',
    options: [
      { value: 'none', text: 'Sin experiencia con IA', score: 0 },
      { value: 'basic', text: 'Conocimiento básico, sin implementación', score: 1 },
      { value: 'pilot', text: 'Proyectos piloto o implementaciones básicas', score: 2 },
      { value: 'advanced', text: 'Implementaciones avanzadas de IA', score: 3 },
    ],
  },
  {
    id: 'team_skills',
    question: '¿Cómo evalúas las habilidades técnicas de tu equipo?',
    category: 'culture',
    options: [
      { value: 'basic', text: 'Habilidades básicas, necesita capacitación', score: 0 },
      { value: 'intermediate', text: 'Habilidades intermedias con potencial', score: 1 },
      { value: 'good', text: 'Buen nivel técnico con adaptabilidad', score: 2 },
      { value: 'expert', text: 'Equipo altamente calificado y especializado', score: 3 },
    ],
  },
  {
    id: 'budget_commitment',
    question: '¿Cuál es el compromiso presupuestario para innovación?',
    category: 'strategy',
    options: [
      { value: 'minimal', text: 'Presupuesto muy limitado', score: 0 },
      { value: 'moderate', text: 'Presupuesto moderado para proyectos específicos', score: 1 },
      { value: 'significant', text: 'Inversión significativa en innovación', score: 2 },
      { value: 'substantial', text: 'Presupuesto robusto para transformación', score: 3 },
    ],
  },
  {
    id: 'efficiency_goals',
    question: '¿Qué tan urgente es mejorar la eficiencia operativa?',
    category: 'processes',
    options: [
      { value: 'low', text: 'No es una prioridad inmediata', score: 0 },
      { value: 'moderate', text: 'Importante pero no urgente', score: 1 },
      { value: 'high', text: 'Prioridad alta para este año', score: 2 },
      { value: 'critical', text: 'Crítico para la supervivencia del negocio', score: 3 },
    ],
  },
  {
    id: 'competition',
    question: '¿Cómo se compara tu empresa tecnológicamente con la competencia?',
    category: 'strategy',
    options: [
      { value: 'behind', text: 'Significativamente por detrás', score: 0 },
      { value: 'catching_up', text: 'Tratando de ponerse al día', score: 1 },
      { value: 'competitive', text: 'Competitiva en el mercado', score: 2 },
      { value: 'leading', text: 'Líder en innovación tecnológica', score: 3 },
    ],
  },
];

const getDefaultTranslations = (locale: 'es' | 'en' | 'pt' = 'es') => ({
  resultTitle:
    locale === 'en'
      ? 'Assessment Results'
      : locale === 'pt'
        ? 'Resultados da Avaliação'
        : 'Resultado de tu Evaluación',
  levelLabel: locale === 'en' ? 'Level' : locale === 'pt' ? 'Nível' : 'Nivel',
  recommendationsTitle:
    locale === 'en'
      ? 'Recommendations for your company'
      : locale === 'pt'
        ? 'Recomendações para sua empresa'
        : 'Recomendaciones para tu empresa',
  recommendedServiceTitle:
    locale === 'en'
      ? 'Recommended Service'
      : locale === 'pt'
        ? 'Serviço Recomendado'
        : 'Servicio Recomendado',
  recommendedServiceDescription:
    locale === 'en'
      ? 'Based on your maturity level, this service best fits your current needs'
      : locale === 'pt'
        ? 'Baseado no seu nível de maturidade, este serviço se adapta melhor às suas necessidades atuais'
        : 'Basado en tu nivel de madurez, este servicio se adapta mejor a tus necesidades actuales',
  restartButton:
    locale === 'en'
      ? 'Retake assessment'
      : locale === 'pt'
        ? 'Refazer avaliação'
        : 'Volver a evaluar',
  requestConsultationButton:
    locale === 'en'
      ? 'Request consultation'
      : locale === 'pt'
        ? 'Solicitar consulta'
        : 'Solicitar consulta',
  previousButton: locale === 'en' ? 'Previous' : locale === 'pt' ? 'Anterior' : 'Anterior',
  nextButton: locale === 'en' ? 'Next' : locale === 'pt' ? 'Próximo' : 'Siguiente',
  finishButton: locale === 'en' ? 'Finish' : locale === 'pt' ? 'Finalizar' : 'Finalizar',
  categoryLabels: {
    strategy: locale === 'en' ? 'Strategy' : locale === 'pt' ? 'Estratégia' : 'Estrategia',
    technology: locale === 'en' ? 'Technology' : locale === 'pt' ? 'Tecnologia' : 'Tecnología',
    data: locale === 'en' ? 'Data' : locale === 'pt' ? 'Dados' : 'Datos',
    culture: locale === 'en' ? 'Culture' : locale === 'pt' ? 'Cultura' : 'Cultura',
    processes: locale === 'en' ? 'Processes' : locale === 'pt' ? 'Processos' : 'Procesos',
  },
  levelDescriptions: {
    beginner: locale === 'en' ? 'beginner' : locale === 'pt' ? 'iniciante' : 'principiante',
    intermediate:
      locale === 'en' ? 'intermediate' : locale === 'pt' ? 'intermediário' : 'intermedio',
    advanced: locale === 'en' ? 'advanced' : locale === 'pt' ? 'avançado' : 'avanzado',
    expert: locale === 'en' ? 'expert' : locale === 'pt' ? 'especialista' : 'experto',
  },
});

export const Assessment = React.forwardRef<HTMLDivElement, AssessmentProps>(
  (
    {
      title,
      description,
      questions = defaultQuestions,
      onComplete,
      className,
      locale = 'es',
      translations,
    },
    ref
  ) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [result, setResult] = useState<AssessmentResult | null>(null);
    const [showResult, setShowResult] = useState(false);

    const t = translations || getDefaultTranslations(locale);
    const defaultTitle =
      locale === 'en'
        ? 'AI Readiness Assessment'
        : locale === 'pt'
          ? 'Avaliação de Maturidade em IA'
          : 'Evaluación de Madurez en IA';

    const handleAnswer = (questionId: string, value: string) => {
      setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const calculateResult = (): AssessmentResult => {
      let totalScore = 0;
      const maxScore = questions.length * 3;
      const categoryScores = {
        strategy: 0,
        technology: 0,
        data: 0,
        culture: 0,
        processes: 0,
      };
      const categoryCounts = {
        strategy: 0,
        technology: 0,
        data: 0,
        culture: 0,
        processes: 0,
      };

      questions.forEach(question => {
        const answer = answers[question.id];
        if (answer) {
          const option = question.options.find(opt => opt.value === answer);
          if (option) {
            totalScore += option.score;
            categoryScores[question.category] += option.score;
            categoryCounts[question.category]++;
          }
        }
      });

      // Normalize category scores
      Object.keys(categoryScores).forEach(category => {
        const key = category as keyof typeof categoryScores;
        if (categoryCounts[key] > 0) {
          categoryScores[key] = ((categoryScores[key] / categoryCounts[key]) * 100) / 3;
        }
      });

      const percentage = (totalScore / maxScore) * 100;

      let level: AssessmentResult['level'] = 'beginner';
      let recommendedTier: AssessmentResult['recommendedTier'] = 'L1_ESSENTIALS';

      if (percentage >= 80) {
        level = 'expert';
        recommendedTier = 'L5_STRATEGIC';
      } else if (percentage >= 60) {
        level = 'advanced';
        recommendedTier = 'L4_PLATFORMS';
      } else if (percentage >= 40) {
        level = 'intermediate';
        recommendedTier = 'L3_CONSULTING';
      } else if (percentage >= 20) {
        level = 'beginner';
        recommendedTier = 'L2_ADVANCED';
      }

      const recommendations = generateRecommendations(level, categoryScores);

      return {
        totalScore,
        maxScore,
        percentage,
        level,
        categoryScores,
        recommendations,
        recommendedTier,
      };
    };

    const generateRecommendations = (
      level: AssessmentResult['level'],
      categoryScores: AssessmentResult['categoryScores']
    ): string[] => {
      const recommendations = [];

      if (level === 'beginner') {
        recommendations.push('Comienza con procesos básicos de digitalización');
        recommendations.push('Establece una estrategia clara de transformación digital');
        recommendations.push('Invierte en capacitación técnica del equipo');
      } else if (level === 'intermediate') {
        recommendations.push('Implementa soluciones de automatización avanzada');
        recommendations.push('Desarrolla capacidades de análisis de datos');
        recommendations.push('Explora casos de uso específicos de IA');
      } else if (level === 'advanced') {
        recommendations.push('Despliega plataformas de IA a escala empresarial');
        recommendations.push('Optimiza procesos existentes con ML');
        recommendations.push('Construye ventajas competitivas basadas en datos');
      } else {
        recommendations.push('Lidera la innovación en tu industria');
        recommendations.push('Desarrolla productos y servicios habilitados por IA');
        recommendations.push('Comparte conocimientos y mejores prácticas');
      }

      // Add category-specific recommendations
      if (categoryScores.strategy < 50) {
        recommendations.push('Fortalece la estrategia digital empresarial');
      }
      if (categoryScores.technology < 50) {
        recommendations.push('Moderniza la infraestructura tecnológica');
      }
      if (categoryScores.data < 50) {
        recommendations.push('Mejora las capacidades de gestión de datos');
      }

      return recommendations;
    };

    const handleNext = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const calculatedResult = calculateResult();
        setResult(calculatedResult);
        setShowResult(true);
        onComplete?.(calculatedResult);
      }
    };

    const handlePrevious = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      }
    };

    const handleRestart = () => {
      setCurrentQuestion(0);
      setAnswers({});
      setResult(null);
      setShowResult(false);
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    if (showResult && result) {
      return (
        <Card ref={ref} className={cn('w-full max-w-4xl mx-auto', className)}>
          <CardHeader>
            <CardTitle className="text-center">{t.resultTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Overall Score */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-lavender to-sun mb-4">
                  <div className="text-4xl font-bold text-white">
                    {Math.round(result.percentage)}%
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2">
                  {t.levelLabel}: {result.level.charAt(0).toUpperCase() + result.level.slice(1)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {locale === 'en'
                    ? 'Your company is at a'
                    : locale === 'pt'
                      ? 'Sua empresa está em um nível'
                      : 'Tu empresa está en un nivel'}{' '}
                  {t.levelDescriptions[result.level]}{' '}
                  {locale === 'en'
                    ? 'level of AI maturity'
                    : locale === 'pt'
                      ? 'de maturidade em IA'
                      : 'de madurez en IA'}
                </p>
              </div>

              {/* Category Breakdown */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(result.categoryScores).map(([category, score]) => (
                  <div key={category} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium capitalize">
                        {t.categoryLabels[category as keyof typeof t.categoryLabels]}
                      </span>
                      <span className="text-sm font-bold">{Math.round(score)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-lavender to-sun h-2 rounded-full transition-all duration-500"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-lavender/10 to-sun/10 dark:from-lavender/20 dark:to-sun/20 rounded-lg p-6">
                <h4 className="text-lg font-heading font-bold mb-4">{t.recommendationsTitle}</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-leaf mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Service */}
              <div className="bg-gradient-to-r from-obsidian to-lavender rounded-lg p-6 text-white text-center">
                <h4 className="text-lg font-heading font-bold mb-2">{t.recommendedServiceTitle}</h4>
                <p className="text-2xl font-bold mb-2">
                  {result.recommendedTier === 'L5_STRATEGIC'
                    ? 'L5 - Strategic'
                    : result.recommendedTier === 'L4_PLATFORMS'
                      ? 'L4 - Platforms'
                      : result.recommendedTier === 'L3_CONSULTING'
                        ? 'L3 - Consulting'
                        : result.recommendedTier === 'L2_ADVANCED'
                          ? 'L2 - Advanced'
                          : 'L1 - Essentials'}
                </p>
                <p className="text-sm opacity-90 mb-4">{t.recommendedServiceDescription}</p>
                <div className="flex gap-4 justify-center">
                  <Button variant="secondary" onClick={handleRestart}>
                    {t.restartButton}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-obsidian"
                  >
                    {t.requestConsultationButton}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    const question = questions[currentQuestion];
    if (!question) return null;

    const currentAnswer = answers[question.id];

    return (
      <Card ref={ref} className={cn('w-full max-w-2xl mx-auto', className)}>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>{title || defaultTitle}</CardTitle>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentQuestion + 1} {locale === 'en' ? 'of' : locale === 'pt' ? 'de' : 'de'}{' '}
              {questions.length}
            </span>
          </div>
          {description && <p className="text-gray-600 dark:text-gray-400">{description}</p>}

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
            <div
              className="bg-gradient-to-r from-lavender to-sun h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">{question.question}</h3>
              <div className="space-y-3">
                {question.options.map(option => (
                  <label
                    key={option.value}
                    className={cn(
                      'flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all',
                      currentAnswer === option.value
                        ? 'border-lavender bg-lavender/5'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    )}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={currentAnswer === option.value}
                      onChange={e => handleAnswer(question.id, e.target.value)}
                      className="text-lavender focus:ring-lavender"
                    />
                    <span className="text-sm">{option.text}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={handlePrevious} disabled={currentQuestion === 0}>
                {t.previousButton}
              </Button>
              <Button onClick={handleNext} disabled={!currentAnswer}>
                {currentQuestion === questions.length - 1 ? t.finishButton : t.nextButton}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

Assessment.displayName = 'Assessment';
