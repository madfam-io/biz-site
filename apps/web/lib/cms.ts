/**
 * CMS Integration Client
 * Handles communication with PayloadCMS API with advanced caching and error recovery
 */

import { environment } from './environment';
import {
  getFallbackBlogPosts,
  getFallbackCaseStudies,
  getFallbackTeamMembers,
} from './fallback-data';
import { performanceMonitor, recordCacheHit, recordCacheMiss } from './performance-monitor';

// Advanced caching configuration
interface CacheConfig {
  ttl: number; // Time to live in seconds
  staleWhileRevalidate: number; // Serve stale content for this duration while revalidating
  maxAge: number; // Maximum age for cache
}

const DEFAULT_CACHE_CONFIG: CacheConfig = {
  ttl: 3600, // 1 hour
  staleWhileRevalidate: 86400, // 24 hours
  maxAge: 604800, // 7 days
};

// In-memory cache for development/small deployments
const cache = new Map<string, { data: unknown; timestamp: number; ttl: number }>();

// Retry configuration
interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
};

const CMS_URL = environment.cms.url || 'http://localhost:3001';
const CMS_API_URL = `${CMS_URL}/api`;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author:
    | {
        id: string;
        name: string;
        email: string;
      }
    | string;
  status: 'draft' | 'published';
  publishedDate: string;
  excerpt: string;
  content?: import('@/types/content').RichTextDocument; // Rich text content
  featuredImage?: {
    id: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  tags?: Array<{
    tag: string;
  }>;
  createdAt: string;
  updatedAt: string;
  locale?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: import('@/types/content').RichTextDocument | string; // Rich text content or string
  results:
    | Array<{
        metric: string;
        value: string;
        description: string;
      }>
    | string[];
  technologies?: Array<{
    technology: string;
  }>;
  status: 'draft' | 'published';
  publishedDate: string;
  featuredImage?: {
    id: string;
    url: string;
    alt?: string;
  };
  createdAt: string;
  updatedAt: string;
  locale?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  avatar?: {
    id: string;
    url: string;
    alt?: string;
  };
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  status: 'active' | 'inactive';
}

class CMSClient {
  private baseUrl: string;
  private cacheConfig: CacheConfig;
  private retryConfig: RetryConfig;

  constructor(cacheConfig = DEFAULT_CACHE_CONFIG, retryConfig = DEFAULT_RETRY_CONFIG) {
    this.baseUrl = CMS_API_URL;
    this.cacheConfig = cacheConfig;
    this.retryConfig = retryConfig;
  }

  private getCacheKey(endpoint: string, options?: RequestInit): string {
    const method = options?.method || 'GET';
    const body = options?.body ? JSON.stringify(options.body) : '';
    return `${method}:${endpoint}:${body}`;
  }

  private isValidCache(cacheEntry: { timestamp: number; ttl: number }): boolean {
    const isValid = Date.now() - cacheEntry.timestamp < cacheEntry.ttl * 1000;
    if (isValid) {
      recordCacheHit(this.getCacheKey('', {}));
    } else {
      recordCacheMiss(this.getCacheKey('', {}));
    }
    return isValid;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private calculateRetryDelay(attempt: number): number {
    const delay = this.retryConfig.baseDelay * Math.pow(2, attempt);
    return Math.min(delay, this.retryConfig.maxDelay);
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const cacheKey = this.getCacheKey(endpoint, options);
    const cachedEntry = cache.get(cacheKey);

    // Return cached data if valid
    if (cachedEntry && this.isValidCache(cachedEntry)) {
      return cachedEntry.data as T;
    }

    // Return stale data if available while fetching fresh data in background
    const hasStaleData =
      cachedEntry &&
      Date.now() - cachedEntry.timestamp < this.cacheConfig.staleWhileRevalidate * 1000;

    if (hasStaleData && options?.method !== 'POST') {
      // Serve stale data immediately
      const staleData = cachedEntry.data;

      // Fetch fresh data in background
      this.fetchWithRetry<T>(endpoint, options)
        .then(freshData => {
          cache.set(cacheKey, {
            data: freshData,
            timestamp: Date.now(),
            ttl: this.cacheConfig.ttl,
          });
        })
        .catch(error => {
          console.warn('Background refresh failed:', error);
        });

      return staleData as T;
    }

    // Fetch fresh data
    const data = await this.fetchWithRetry<T>(endpoint, options);

    // Cache the response
    if (options?.method !== 'POST') {
      cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        ttl: this.cacheConfig.ttl,
      });
    }

    return data as T;
  }

  private async fetchWithRetry<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
          signal: controller.signal,
          ...options,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          // Don't retry client errors (4xx), only server errors (5xx) and network issues
          if (response.status >= 400 && response.status < 500) {
            throw new Error(`CMS API client error: ${response.status} ${response.statusText}`);
          }
          throw new Error(`CMS API server error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        lastError = error as Error;

        if (attempt < this.retryConfig.maxRetries) {
          const delay = this.calculateRetryDelay(attempt);
          console.warn(
            `CMS API request failed (attempt ${attempt + 1}), retrying in ${delay}ms:`,
            error
          );
          await this.sleep(delay);
        }
      }
    }

    console.error('CMS API request failed after all retries:', lastError);
    throw lastError || new Error('Unknown error occurred during CMS API request');
  }

  /**
   * Clear cache for specific endpoint or all cache
   */
  public clearCache(endpoint?: string): void {
    if (endpoint) {
      const keysToDelete = Array.from(cache.keys()).filter(key => key.includes(endpoint));
      keysToDelete.forEach(key => cache.delete(key));
    } else {
      cache.clear();
    }
  }

  /**
   * Get cache statistics
   */
  public getCacheStats(): { size: number; keys: string[] } {
    return {
      size: cache.size,
      keys: Array.from(cache.keys()),
    };
  }

  // Blog Posts
  async getBlogPosts(params?: {
    status?: 'draft' | 'published';
    limit?: number;
    page?: number;
    locale?: string;
  }): Promise<{ docs: BlogPost[]; totalDocs: number; totalPages: number }> {
    const queryParams = new URLSearchParams();

    if (params?.status) {
      queryParams.append('where[status][equals]', params.status);
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.locale) {
      queryParams.append('locale', params.locale);
    }

    return this.fetch(`/blog-posts?${queryParams.toString()}`);
  }

  async getBlogPost(slug: string, locale?: string): Promise<BlogPost | null> {
    const queryParams = new URLSearchParams();
    queryParams.append('where[slug][equals]', slug);

    if (locale) {
      queryParams.append('locale', locale);
    }

    const response = await this.fetch<{ docs: BlogPost[] }>(
      `/blog-posts?${queryParams.toString()}`
    );
    return response.docs[0] || null;
  }

  // Case Studies
  async getCaseStudies(params?: {
    status?: 'draft' | 'published';
    limit?: number;
    page?: number;
    locale?: string;
  }): Promise<{ docs: CaseStudy[]; totalDocs: number; totalPages: number }> {
    const queryParams = new URLSearchParams();

    if (params?.status) {
      queryParams.append('where[status][equals]', params.status);
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.locale) {
      queryParams.append('locale', params.locale);
    }

    return this.fetch(`/case-studies?${queryParams.toString()}`);
  }

  async getCaseStudy(slug: string, locale?: string): Promise<CaseStudy | null> {
    const queryParams = new URLSearchParams();
    queryParams.append('where[slug][equals]', slug);

    if (locale) {
      queryParams.append('locale', locale);
    }

    const response = await this.fetch<{ docs: CaseStudy[] }>(
      `/case-studies?${queryParams.toString()}`
    );
    return response.docs[0] || null;
  }

  // Team Members
  async getTeamMembers(params?: {
    status?: 'active' | 'inactive';
    limit?: number;
  }): Promise<{ docs: TeamMember[]; totalDocs: number }> {
    const queryParams = new URLSearchParams();

    if (params?.status) {
      queryParams.append('where[status][equals]', params.status);
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }

    return this.fetch(`/team-members?${queryParams.toString()}`);
  }

  // Media
  async getMediaUrl(mediaId: string): Promise<string> {
    return `${CMS_URL}/api/media/file/${mediaId}`;
  }
}

// Create singleton instance with environment-specific configuration
export const cmsClient = new CMSClient(
  {
    ttl: environment.isDevelopment ? 300 : 3600, // 5 min dev, 1 hour prod
    staleWhileRevalidate: environment.isDevelopment ? 600 : 86400, // 10 min dev, 24 hours prod
    maxAge: 604800, // 7 days
  },
  {
    maxRetries: environment.isDevelopment ? 1 : 3,
    baseDelay: 1000,
    maxDelay: 10000,
  }
);

// Helper functions with enhanced error handling, performance monitoring, and fallback data
export async function getPublishedBlogPosts(
  locale?: string,
  limit = 10,
  fallbackData?: BlogPost[]
) {
  if (!environment.cms.enabled) {
    const fallbackPosts = fallbackData || getFallbackBlogPosts(locale);
    return {
      docs: fallbackPosts.slice(0, limit),
      totalDocs: fallbackPosts.length,
      totalPages: Math.ceil(fallbackPosts.length / limit),
      source: 'fallback' as const,
    };
  }

  try {
    const { result, metrics } = await performanceMonitor.measureCMSRequest('getBlogPosts', () =>
      cmsClient.getBlogPosts({
        status: 'published',
        limit,
        locale,
      })
    );

    return { ...result, source: 'cms' as const, metrics };
  } catch (error) {
    console.error('Failed to fetch blog posts from CMS:', error);

    // Return fallback data
    const fallbackPosts = fallbackData || getFallbackBlogPosts(locale);
    console.warn('Using fallback blog post data');
    return {
      docs: fallbackPosts.slice(0, limit),
      totalDocs: fallbackPosts.length,
      totalPages: Math.ceil(fallbackPosts.length / limit),
      source: 'fallback' as const,
    };
  }
}

export async function getPublishedCaseStudies(
  locale?: string,
  limit = 10,
  fallbackData?: CaseStudy[]
) {
  if (!environment.cms.enabled) {
    const fallbackStudies = fallbackData || getFallbackCaseStudies(locale);
    return {
      docs: fallbackStudies.slice(0, limit),
      totalDocs: fallbackStudies.length,
      totalPages: Math.ceil(fallbackStudies.length / limit),
      source: 'fallback' as const,
    };
  }

  try {
    const { result, metrics } = await performanceMonitor.measureCMSRequest('getCaseStudies', () =>
      cmsClient.getCaseStudies({
        status: 'published',
        limit,
        locale,
      })
    );

    return { ...result, source: 'cms' as const, metrics };
  } catch (error) {
    console.error('Failed to fetch case studies from CMS:', error);

    // Return fallback data
    const fallbackStudies = fallbackData || getFallbackCaseStudies(locale);
    console.warn('Using fallback case study data');
    return {
      docs: fallbackStudies.slice(0, limit),
      totalDocs: fallbackStudies.length,
      totalPages: Math.ceil(fallbackStudies.length / limit),
      source: 'fallback' as const,
    };
  }
}

export async function getActiveTeamMembers(limit = 20, fallbackData?: TeamMember[]) {
  if (!environment.cms.enabled) {
    const fallbackMembers = fallbackData || getFallbackTeamMembers();
    return {
      docs: fallbackMembers.slice(0, limit),
      totalDocs: fallbackMembers.length,
      source: 'fallback' as const,
    };
  }

  try {
    const { result, metrics } = await performanceMonitor.measureCMSRequest('getTeamMembers', () =>
      cmsClient.getTeamMembers({
        status: 'active',
        limit,
      })
    );

    return { ...result, source: 'cms' as const, metrics };
  } catch (error) {
    console.error('Failed to fetch team members from CMS:', error);

    // Return fallback data
    const fallbackMembers = fallbackData || getFallbackTeamMembers();
    console.warn('Using fallback team member data');
    return {
      docs: fallbackMembers.slice(0, limit),
      totalDocs: fallbackMembers.length,
      source: 'fallback' as const,
    };
  }
}

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
      // eslint-disable-next-line no-console
      console.log(`✅ Preloaded ${result.length} content types`);
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
