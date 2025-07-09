'use client';

import { ServiceTier } from '@madfam/core';
import { useConversionTracking, useEngagementTracking } from '@madfam/analytics';
import { useEffect } from 'react';

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
  const trackPricingView = () => {
    trackServiceFunnelStep('interest', serviceTier, {
      source: 'pricing-section',
      interaction: 'view',
    });
  };

  // Track CTA interactions
  const trackCTAClick = (ctaType: 'quote' | 'contact' | 'demo') => {
    trackServiceFunnelStep('interest', serviceTier, {
      source: 'cta-click',
      cta_type: ctaType,
    });

    // Track purchase intent for high-value CTAs
    if (ctaType === 'quote' || ctaType === 'contact') {
      trackPurchaseIntent(serviceTier);
    }
  };

  // Make tracking functions available globally for the page
  useEffect(() => {
    (window as any).trackServicePageEvent = {
      trackPricingView,
      trackCTAClick,
      trackInterest: () => trackServiceFunnelStep('interest', serviceTier, { source: 'manual' }),
      trackContact: () => trackServiceFunnelStep('contact', serviceTier, { source: 'manual' }),
    };

    return () => {
      delete (window as any).trackServicePageEvent;
    };
  }, [serviceTier, trackServiceFunnelStep, trackPurchaseIntent]);

  return null; // This component doesn't render anything
}

// Utility function to throttle scroll events
function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
