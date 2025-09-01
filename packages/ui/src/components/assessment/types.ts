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
    scoreLabel: string;
    recommendationsTitle: string;
    serviceRecommendationTitle: string;
    tierDescriptions: {
      L1_ESSENTIALS: string;
      L2_ADVANCED: string;
      L3_CONSULTING: string;
      L4_PLATFORMS: string;
      L5_STRATEGIC: string;
    };
    startButton: string;
    nextButton: string;
    previousButton: string;
    completeButton: string;
    restartButton: string;
    categoryLabels: {
      strategy: string;
      technology: string;
      data: string;
      culture: string;
      processes: string;
    };
    levels: {
      beginner: string;
      intermediate: string;
      advanced: string;
      expert: string;
    };
  };
}
