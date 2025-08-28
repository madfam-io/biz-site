'use client';

import { useConversionTracking, useEngagementTracking } from '@madfam/analytics';
import { ServiceTier } from '@madfam/core';
import { useEffect, useCallback } from 'react';
import { throttle } from '@/types/utilities';

interface ServicePageAnalyticsProps {
  serviceTier: ServiceTier;
  source?: string;
}

export function ServicePageAnalytics({
  serviceTier,
  source = 'service-page',
}: ServicePageAnalyticsProps) {
  const { trackServiceFunnelStep, trackPurchaseIntent } = useConversionTracking();
  const { trackEngagement } = useEngagementTracking();

  useEffect(() => {
    // Track service page view (funnel step 1)
    trackServiceFunnelStep('view', serviceTier, { source });

    // Track engagement when page loads
    trackEngagement('focus', `service-${serviceTier}-page`);

    // Track scroll engagement
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercent > 25) {
        trackEngagement('scroll', `service-${serviceTier}-page-25`);
      }
      if (scrollPercent > 50) {
        trackEngagement('scroll', `service-${serviceTier}-page-50`);
      }
      if (scrollPercent > 75) {
        trackEngagement('scroll', `service-${serviceTier}-page-75`);
      }
    };

    const throttledScroll = throttle(handleScroll, 1000);
    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [serviceTier, source, trackServiceFunnelStep, trackEngagement]);

  // Track pricing section view
  const trackPricingView = useCallback(() => {
    trackServiceFunnelStep('interest', serviceTier, {
      source: 'pricing-section',
      interaction: 'view',
    });
  }, [trackServiceFunnelStep, serviceTier]);

  // Track CTA interactions
  const trackCTAClick = useCallback(
    (ctaType: 'quote' | 'contact' | 'demo') => {
      trackServiceFunnelStep('interest', serviceTier, {
        source: 'cta-click',
        cta_type: ctaType,
      });

      // Track purchase intent for high-value CTAs
      if (ctaType === 'quote' || ctaType === 'contact') {
        trackPurchaseIntent(serviceTier);
      }
    },
    [trackServiceFunnelStep, trackPurchaseIntent, serviceTier]
  );

  // Make tracking functions available globally for the page
  useEffect(() => {
    interface WindowWithTracking extends Window {
      trackServicePageEvent?: {
        trackPricingView: () => void;
        trackCTAClick: (ctaType: 'quote' | 'contact' | 'demo') => void;
        trackInterest: () => void;
        trackContact: () => void;
      };
    }

    const windowWithTracking = window as WindowWithTracking;
    windowWithTracking.trackServicePageEvent = {
      trackPricingView,
      trackCTAClick,
      trackInterest: () => trackServiceFunnelStep('interest', serviceTier, { source: 'manual' }),
      trackContact: () => trackServiceFunnelStep('contact', serviceTier, { source: 'manual' }),
    };

    return () => {
      delete windowWithTracking.trackServicePageEvent;
    };
  }, [serviceTier, trackServiceFunnelStep, trackPurchaseIntent, trackPricingView, trackCTAClick]);

  return null; // This component doesn't render anything
}
