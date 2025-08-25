/**
 * CMS Module
 * Modular CMS integration with caching, retry logic, and fallback handling
 */

// Main API functions (most commonly used)
export {
  getPublishedBlogPosts,
  getPublishedCaseStudies,
  getActiveTeamMembers,
  cmsClient,
} from './api';

// Utility functions
export {
  preloadCriticalContent,
  warmupCache,
  getCMSPerformanceMetrics,
  clearCMSCache,
} from './utils';

// Core classes (for advanced usage)
export { CMSClient } from './client';
export { CMSCache } from './cache';
export { RetryHandler } from './retry';

// Types
export type {
  BlogPost,
  CaseStudy,
  TeamMember,
  CacheConfig,
  RetryConfig,
  CMSApiResponse,
  CMSRequestParams,
  CacheEntry,
} from './types';
