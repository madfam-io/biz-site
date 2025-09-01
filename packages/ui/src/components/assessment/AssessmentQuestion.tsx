'use client';
import { cn } from '../../lib/utils';
import { Button } from '../Button';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';
import type { AssessmentQuestion as QuestionType } from './types';

interface AssessmentQuestionProps {
  question: QuestionType;
  currentAnswer?: string;
  onAnswer: (value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  questionNumber: number;
  totalQuestions: number;
  nextButtonText?: string;
  previousButtonText?: string;
  completeButtonText?: string;
}

export function AssessmentQuestion({
  question,
  currentAnswer,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  questionNumber,
  totalQuestions,
  nextButtonText = 'Siguiente',
  previousButtonText = 'Anterior',
  completeButtonText = 'Completar',
}: AssessmentQuestionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            Pregunta {questionNumber} de {totalQuestions}
          </CardTitle>
          <span className="text-sm text-gray-500">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-medium">{question.question}</p>
        <div className="space-y-2">
          {question.options.map(option => (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className={cn(
                'w-full text-left p-3 rounded-lg border transition-all',
                currentAnswer === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              )}
            >
              {option.text}
            </button>
          ))}
        </div>
        <div className="flex justify-between pt-4">
          <Button onClick={onPrevious} variant="outline" disabled={isFirst}>
            {previousButtonText}
          </Button>
          <Button onClick={onNext} disabled={!currentAnswer}>
            {isLast ? completeButtonText : nextButtonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
