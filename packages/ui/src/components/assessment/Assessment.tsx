'use client';

import { useState, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card';
import { AssessmentQuestion } from './AssessmentQuestion';
import { AssessmentResults } from './AssessmentResults';
import { calculateResult } from './assessment-utils';
import { getDefaultTranslations } from './assessment-translations';
import { defaultAssessmentQuestions } from './assessment-data';
import type { AssessmentProps } from './types';

export function Assessment({
  title,
  description,
  questions = defaultAssessmentQuestions,
  onComplete,
  className,
  locale = 'es',
  translations = getDefaultTranslations(locale),
}: AssessmentProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex]!;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const result = useMemo(() => {
    if (isCompleted && Object.keys(answers).length === questions.length) {
      return calculateResult(answers, questions);
    }
    return null;
  }, [isCompleted, answers, questions]);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const calculatedResult = calculateResult(answers, questions);
      setIsCompleted(true);
      onComplete?.(calculatedResult);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setIsStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsCompleted(false);
  };

  // Not started state
  if (!isStarted) {
    return (
      <div className={cn('w-full max-w-4xl mx-auto', className)}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{title || 'Evaluación de Madurez de IA'}</CardTitle>
            {description && (
              <CardDescription className="text-base mt-2">{description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => setIsStarted(true)} size="lg" className="min-w-[200px]">
              {translations?.startButton || 'Comenzar Evaluación'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Completed state
  if (isCompleted && result) {
    return (
      <div className={cn('w-full max-w-4xl mx-auto', className)}>
        <AssessmentResults result={result} translations={translations} onRestart={handleRestart} />
      </div>
    );
  }

  // Question state
  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      <AssessmentQuestion
        question={currentQuestion}
        currentAnswer={answers[currentQuestion.id]}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isFirst={isFirstQuestion}
        isLast={isLastQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        nextButtonText={translations?.nextButton}
        previousButtonText={translations?.previousButton}
        completeButtonText={translations?.completeButton}
      />
    </div>
  );
}
