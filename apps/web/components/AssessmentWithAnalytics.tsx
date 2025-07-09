'use client';

import { useFeatureTracking, useConversionTracking } from '@madfam/analytics';
import { Assessment, AssessmentProps, AssessmentResult } from '@madfam/ui';
import { useEffect, useState } from 'react';

interface AssessmentWithAnalyticsProps extends AssessmentProps {
  source?: string;
}

export function AssessmentWithAnalytics({
  onComplete,
  source = 'assessment',
  ...props
}: AssessmentWithAnalyticsProps) {
  const { trackAssessmentComplete, trackFeatureUsed } = useFeatureTracking();
  const { trackServiceFunnelStep, trackPurchaseIntent } = useConversionTracking();
  const [startTime, setStartTime] = useState<number>();

  useEffect(() => {
    // Track assessment start
    trackFeatureUsed('assessment', source);
    setStartTime(Date.now());
  }, [trackFeatureUsed, source]);

  const handleComplete = (result: AssessmentResult) => {
    const completionTime = startTime ? Date.now() - startTime : 0;

    // Track assessment completion
    trackAssessmentComplete({
      score: result.percentage,
      recommendation: result.recommendedTier,
    });

    // Track service funnel step based on result
    trackServiceFunnelStep('interest', result.recommendedTier, {
      source: 'assessment',
      score: result.percentage.toString(),
      completion_time: (completionTime / 1000).toString(),
    });

    // Track purchase intent for higher-tier recommendations
    if (['L4_PLATFORMS', 'L5_STRATEGIC'].includes(result.recommendedTier)) {
      trackPurchaseIntent(result.recommendedTier);
    }

    // Call original onComplete handler
    onComplete?.(result);
  };

  return <Assessment {...props} onComplete={handleComplete} />;
}
