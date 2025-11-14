'use client';

import { useAnalytics } from '@madfam/analytics';
import { useLocale } from 'next-intl';
import { useEffect, useRef } from 'react';

export function GlobalAnalytics() {
  const analytics = useAnalytics();
  const locale = useLocale();

  // Track initial values
  const initialLocale = useRef<string | undefined>(undefined);

  useEffect(() => {
    // Track language changes
    if (initialLocale.current && initialLocale.current !== locale) {
      analytics.trackLanguageChanged(initialLocale.current, locale);
    }
    initialLocale.current = locale;
  }, [locale, analytics]);

  // Track page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        analytics.trackEngagement('focus', 'page-hidden', Date.now());
      } else {
        analytics.trackEngagement('focus', 'page-visible', Date.now());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [analytics]);

  // Track unhandled errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      analytics.trackError(
        event.message,
        `${event.filename}:${event.lineno}:${event.colno}`,
        'high'
      );
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      analytics.trackError('Unhandled Promise Rejection', String(event.reason), 'high');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [analytics]);

  // Track session quality metrics
  useEffect(() => {
    const sessionStart = Date.now();
    let interactionCount = 0;
    let scrollDepth = 0;

    const trackInteraction = () => {
      interactionCount++;
    };

    const trackScroll = () => {
      const depth = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      scrollDepth = Math.max(scrollDepth, depth);
    };

    // Add interaction listeners
    document.addEventListener('click', trackInteraction);
    document.addEventListener('keydown', trackInteraction);
    document.addEventListener('scroll', trackScroll);

    // Track session quality on page unload
    const handleUnload = () => {
      const sessionDuration = Date.now() - sessionStart;
      const qualityScore = Math.min(
        100,
        interactionCount * 10 + scrollDepth * 0.5 + (sessionDuration / 1000) * 0.1
      );

      analytics.trackSessionQuality(qualityScore, {
        interactions: interactionCount.toString(),
        scroll_depth: scrollDepth.toFixed(1),
        duration: (sessionDuration / 1000).toFixed(1),
      });
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      document.removeEventListener('click', trackInteraction);
      document.removeEventListener('keydown', trackInteraction);
      document.removeEventListener('scroll', trackScroll);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [analytics]);

  return null;
}
