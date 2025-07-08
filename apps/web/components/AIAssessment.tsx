'use client';

import { useState } from 'react';
import { Button, Card, CardContent, Heading } from '@madfam/ui';
import { analytics } from '@madfam/analytics';

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    points: number;
  }[];
}

const assessmentQuestions: Question[] = [
  {
    id: 'current_tech',
    question: '¿Cuál es el nivel tecnológico actual de tu empresa?',
    options: [
      { value: 'basic', label: 'Básico - Principalmente herramientas manuales', points: 0 },
      { value: 'intermediate', label: 'Intermedio - Algunas herramientas digitales', points: 25 },
      { value: 'advanced', label: 'Avanzado - Múltiples sistemas integrados', points: 50 },
      { value: 'cutting_edge', label: 'Vanguardia - IA y automatización existente', points: 75 },
    ],
  },
  {
    id: 'team_size',
    question: '¿Cuál es el tamaño de tu equipo técnico?',
    options: [
      { value: 'small', label: '1-5 personas', points: 10 },
      { value: 'medium', label: '6-20 personas', points: 20 },
      { value: 'large', label: '21-50 personas', points: 30 },
      { value: 'enterprise', label: 'Más de 50 personas', points: 40 },
    ],
  },
  {
    id: 'ai_interest',
    question: '¿Qué área de IA te interesa más?',
    options: [
      { value: 'automation', label: 'Automatización de procesos', points: 30 },
      { value: 'analytics', label: 'Análisis predictivo', points: 35 },
      { value: 'customer', label: 'Experiencia del cliente', points: 25 },
      { value: 'operations', label: 'Optimización operativa', points: 40 },
    ],
  },
  {
    id: 'timeline',
    question: '¿Cuál es tu horizonte de implementación?',
    options: [
      { value: 'immediate', label: 'Inmediato (0-3 meses)', points: 50 },
      { value: 'short', label: 'Corto plazo (3-6 meses)', points: 35 },
      { value: 'medium', label: 'Mediano plazo (6-12 meses)', points: 20 },
      { value: 'long', label: 'Largo plazo (12+ meses)', points: 10 },
    ],
  },
  {
    id: 'budget',
    question: '¿Cuál es tu presupuesto estimado para transformación digital?',
    options: [
      { value: 'low', label: 'Menos de $100k MXN', points: 10 },
      { value: 'medium', label: '$100k - $500k MXN', points: 25 },
      { value: 'high', label: '$500k - $1M MXN', points: 40 },
      { value: 'enterprise', label: 'Más de $1M MXN', points: 60 },
    ],
  },
];

export function AIAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: string, points: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    const newScore = score + points;
    setScore(newScore);

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment complete
      showAssessmentResults(newScore);
    }
  };

  const showAssessmentResults = (finalScore: number) => {
    setShowResults(true);
    
    // Track completion
    analytics.trackAssessmentComplete({
      score: finalScore,
      recommendation: getRecommendation(finalScore).tier,
    });
  };

  const getRecommendation = (assessmentScore: number) => {
    if (assessmentScore >= 200) {
      return {
        tier: 'L5 - Strategic',
        title: 'Transformación estratégica completa',
        description: 'Tu empresa está lista para una asociación vCTO y transformación integral.',
        color: 'obsidian',
      };
    } else if (assessmentScore >= 150) {
      return {
        tier: 'L4 - Platforms',
        title: 'Implementación de plataformas empresariales',
        description: 'Es momento de implementar SPARK o PENNY para escalar tu operación.',
        color: 'creative',
      };
    } else if (assessmentScore >= 100) {
      return {
        tier: 'L3 - Consulting',
        title: 'Consultoría y capacitación especializada',
        description: 'Workshops y consultoría te ayudarán a definir tu estrategia de IA.',
        color: 'lavender',
      };
    } else if (assessmentScore >= 50) {
      return {
        tier: 'L2 - Advanced',
        title: 'Soluciones avanzadas de diseño',
        description: 'Diseño paramétrico y experiencias interactivas para innovar.',
        color: 'sun',
      };
    } else {
      return {
        tier: 'L1 - Essentials',
        title: 'Servicios esenciales de diseño',
        description: 'Comienza con servicios de diseño 3D y gráfico profesional.',
        color: 'leaf',
      };
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const recommendation = getRecommendation(score);
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Heading level={2} className="mb-4">
            Resultados de tu evaluación
          </Heading>
          <div className="flex justify-center mb-6">
            <div className="text-6xl font-bold text-lavender">{score}</div>
            <div className="text-2xl text-gray-500 self-end mb-2">/280</div>
          </div>
        </div>

        <Card variant="elevated" className="mb-8">
          <CardContent className="p-8 text-center">
            <div className={`inline-block px-4 py-2 rounded-full bg-${recommendation.color}/20 text-${recommendation.color} font-medium mb-4`}>
              {recommendation.tier}
            </div>
            <h3 className="font-heading text-2xl mb-4">{recommendation.title}</h3>
            <p className="text-lg text-gray-600 mb-6">{recommendation.description}</p>
            <Button variant="creative" size="lg">
              Conocer más sobre {recommendation.tier}
            </Button>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button variant="ghost" onClick={resetAssessment}>
            Realizar evaluación nuevamente
          </Button>
        </div>
      </div>
    );
  }

  const question = assessmentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  if (!question) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Pregunta {currentQuestion + 1} de {assessmentQuestions.length}
          </span>
          <span className="text-sm text-gray-600">{Math.round(progress)}% completado</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-lavender rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card variant="default">
        <CardContent className="p-8">
          <h3 className="font-heading text-xl mb-6">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(question.id, option.value, option.points)}
                className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-lavender hover:bg-lavender/5 transition-all"
              >
                {option.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}