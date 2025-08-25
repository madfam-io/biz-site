/**
 * CMS Client
 * Core client for communicating with PayloadCMS API
 */

import { environment } from '../environment';
import { CMSCache, DEFAULT_CACHE_CONFIG } from './cache';
import { RetryHandler, DEFAULT_RETRY_CONFIG, fetchWithTimeout } from './retry';
import type {
  BlogPost,
  CaseStudy,
  TeamMember,
  CacheConfig,
  RetryConfig,
  CMSApiResponse,
  CMSRequestParams,
} from './types';

const CMS_URL = environment.cms.url || 'http://localhost:3001';
const CMS_API_URL = `${CMS_URL}/api`;

export class CMSClient {
  private baseUrl: string;
  private cache: CMSCache;
  private retry: RetryHandler;

  constructor(
    cacheConfig: CacheConfig = DEFAULT_CACHE_CONFIG,
    retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG
  ) {
    this.baseUrl = CMS_API_URL;
    this.cache = new CMSCache(cacheConfig);
    this.retry = new RetryHandler(retryConfig);
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // Try cache first
    const cached = this.cache.get<T>(endpoint, options);
    if (cached) {
      return cached;
    }

    // Check for stale data
    const stale = this.cache.getStale<T>(endpoint, options);
    if (stale && options?.method !== 'POST') {
      // Return stale data immediately and update in background
      this.backgroundRefresh<T>(endpoint, options);
      return stale;
    }

    // Fetch fresh data
    const data = await this.fetchFresh<T>(endpoint, options);
    this.cache.set(endpoint, data, options);
    return data;
  }

  private async backgroundRefresh<T>(endpoint: string, options?: RequestInit): Promise<void> {
    try {
      const freshData = await this.fetchFresh<T>(endpoint, options);
      this.cache.set(endpoint, freshData, options);
    } catch (error) {
      console.warn('Background refresh failed:', error);
    }
  }

  private async fetchFresh<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    return this.retry.execute(async () => {
      const response = await fetchWithTimeout(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`CMS API error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    }, `CMS request to ${endpoint}`);
  }

  // Blog Posts
  async getBlogPosts(params?: CMSRequestParams): Promise<CMSApiResponse<BlogPost>> {
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

    const response = await this.fetch<CMSApiResponse<BlogPost>>(
      `/blog-posts?${queryParams.toString()}`
    );
    return response.docs[0] || null;
  }

  // Case Studies
  async getCaseStudies(params?: CMSRequestParams): Promise<CMSApiResponse<CaseStudy>> {
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

    const response = await this.fetch<CMSApiResponse<CaseStudy>>(
      `/case-studies?${queryParams.toString()}`
    );
    return response.docs[0] || null;
  }

  // Team Members
  async getTeamMembers(params?: CMSRequestParams): Promise<CMSApiResponse<TeamMember>> {
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

  // Cache management
  clearCache(endpoint?: string): void {
    this.cache.clear(endpoint);
  }

  getCacheStats(): { size: number; keys: string[] } {
    return this.cache.getStats();
  }
}
