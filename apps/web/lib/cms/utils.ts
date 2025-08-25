/**
 * CMS Utility Functions
 * Content preloading, cache warmup, and performance monitoring
 */

import { environment } from '../environment';
import {
  getFallbackBlogPosts,
  getFallbackCaseStudies,
  getFallbackTeamMembers,
} from '../fallback-data';
import { performanceMonitor } from '../performance-monitor';
import {
  getPublishedBlogPosts,
  getPublishedCaseStudies,
  getActiveTeamMembers,
  cmsClient,
} from './api';

/**
 * Preload critical content for faster page loads with performance tracking
 */
export async function preloadCriticalContent(locale?: string) {
  if (!environment.cms.enabled) {
    // Warm up fallback data cache
    getFallbackBlogPosts(locale);
    getFallbackCaseStudies(locale);
    getFallbackTeamMembers();
    return;
  }

  try {
    const { result } = await performanceMonitor.measureCMSRequest(
      'preloadCriticalContent',
      async () => {
        // Preload most commonly accessed content
        const results = await Promise.allSettled([
          getPublishedBlogPosts(locale, 5),
          getPublishedCaseStudies(locale, 3),
          getActiveTeamMembers(10),
        ]);

        return results
          .map(settledResult => (settledResult.status === 'fulfilled' ? settledResult.value : null))
          .filter(Boolean);
      }
    );

    if (environment.isDevelopment) {
      // Log to performance monitor instead of console
      performanceMonitor.recordMetric({
        name: 'content_preload_completed',
        value: result.length,
        unit: 'count',
        timestamp: Date.now(),
      });
    }
  } catch (error) {
    console.warn('Failed to preload critical content:', error);
  }
}

/**
 * Warmup cache with critical content and performance monitoring
 */
export function warmupCache() {
  if (typeof window !== 'undefined') {
    // Only run on client-side
    setTimeout(() => {
      preloadCriticalContent();

      // Log cache warmup completion
      performanceMonitor.recordMetric({
        name: 'cache_warmup_completed',
        value: 1,
        unit: 'count',
        timestamp: Date.now(),
      });
    }, 1000);
  }
}

/**
 * Get CMS performance metrics
 */
export function getCMSPerformanceMetrics() {
  const summary = performanceMonitor.getPerformanceSummary();
  const cacheStats = cmsClient.getCacheStats();

  return {
    ...summary,
    cache: cacheStats,
    environment: environment.type,
    cmsEnabled: environment.cms.enabled,
  };
}

/**
 * Clear CMS cache for specific endpoint or all cache
 */
export function clearCMSCache(endpoint?: string): void {
  cmsClient.clearCache(endpoint);
}
