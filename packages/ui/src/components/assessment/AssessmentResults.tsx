'use client';
import { cn } from '../../lib/utils';
import { Button } from '../Button';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';
import type { AssessmentResult, AssessmentProps } from './types';

interface AssessmentResultsProps {
  result: AssessmentResult;
  translations: AssessmentProps['translations'];
  onRestart: () => void;
}

export function AssessmentResults({ result, translations, onRestart }: AssessmentResultsProps) {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const tierColors = {
    L1_ESSENTIALS: 'from-blue-500 to-blue-600',
    L2_ADVANCED: 'from-purple-500 to-purple-600',
    L3_CONSULTING: 'from-indigo-500 to-indigo-600',
    L4_PLATFORMS: 'from-violet-500 to-violet-600',
    L5_STRATEGIC: 'from-pink-500 to-pink-600',
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{translations?.resultTitle || 'Resultados de la Evaluación'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Score */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">
                {translations?.scoreLabel || 'Puntuación Total'}
              </span>
              <span className="text-sm font-medium">
                {result.percentage}% - {translations?.levels?.[result.level] || result.level}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={cn(
                  'h-3 rounded-full transition-all',
                  getProgressColor(result.percentage)
                )}
                style={{ width: `${result.percentage}%` }}
              />
            </div>
          </div>

          {/* Category Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(result.categoryScores).map(([category, score]) => (
              <CategoryScoreCard
                key={category}
                score={score}
                label={
                  translations?.categoryLabels?.[category as keyof typeof result.categoryScores] ||
                  category
                }
              />
            ))}
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">
                {translations?.recommendationsTitle || 'Recomendaciones'}
              </h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Service Recommendation */}
          <div
            className={cn(
              'p-4 rounded-lg bg-gradient-to-r text-white',
              tierColors[result.recommendedTier]
            )}
          >
            <h3 className="font-semibold mb-2">
              {translations?.serviceRecommendationTitle || 'Servicio Recomendado'}
            </h3>
            <p className="text-sm">
              {translations?.tierDescriptions?.[result.recommendedTier] ||
                `Nivel recomendado: ${result.recommendedTier}`}
            </p>
          </div>

          {/* Restart Button */}
          <Button onClick={onRestart} className="w-full">
            {translations?.restartButton || 'Realizar Nueva Evaluación'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function CategoryScoreCard({ score, label }: { score: number; label: string }) {
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-500';
    if (score >= 50) return 'text-blue-500';
    if (score >= 25) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <span className="text-sm font-medium capitalize">{label}</span>
      <span className={cn('text-lg font-bold', getScoreColor(score))}>{score}%</span>
    </div>
  );
}
