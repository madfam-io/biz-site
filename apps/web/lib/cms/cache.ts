/**
 * CMS Caching System
 */

import { recordCacheHit, recordCacheMiss } from '../performance-monitor';
import type { CacheConfig, CacheEntry } from './types';

export const DEFAULT_CACHE_CONFIG: CacheConfig = {
  ttl: 3600, // 1 hour
  staleWhileRevalidate: 86400, // 24 hours
  maxAge: 604800, // 7 days
};

// In-memory cache for development/small deployments
const cache = new Map<string, CacheEntry>();

export class CMSCache {
  private config: CacheConfig;

  constructor(config: CacheConfig = DEFAULT_CACHE_CONFIG) {
    this.config = config;
  }

  private getCacheKey(endpoint: string, options?: RequestInit): string {
    const method = options?.method || 'GET';
    const body = options?.body ? JSON.stringify(options.body) : '';
    return `${method}:${endpoint}:${body}`;
  }

  private isValidCache(cacheEntry: CacheEntry): boolean {
    const isValid = Date.now() - cacheEntry.timestamp < cacheEntry.ttl * 1000;
    const key = 'cache-check';

    if (isValid) {
      recordCacheHit(key);
    } else {
      recordCacheMiss(key);
    }

    return isValid;
  }

  get<T>(endpoint: string, options?: RequestInit): T | null {
    const cacheKey = this.getCacheKey(endpoint, options);
    const cachedEntry = cache.get(cacheKey);

    if (cachedEntry && this.isValidCache(cachedEntry)) {
      return cachedEntry.data as T;
    }

    return null;
  }

  getStale<T>(endpoint: string, options?: RequestInit): T | null {
    const cacheKey = this.getCacheKey(endpoint, options);
    const cachedEntry = cache.get(cacheKey);

    if (cachedEntry) {
      const isStaleValid =
        Date.now() - cachedEntry.timestamp < this.config.staleWhileRevalidate * 1000;
      if (isStaleValid) {
        return cachedEntry.data as T;
      }
    }

    return null;
  }

  set<T>(endpoint: string, data: T, options?: RequestInit): void {
    if (options?.method === 'POST') {
      return; // Don't cache POST requests
    }

    const cacheKey = this.getCacheKey(endpoint, options);
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      ttl: this.config.ttl,
    });
  }

  clear(endpoint?: string): void {
    if (endpoint) {
      const keysToDelete = Array.from(cache.keys()).filter(key => key.includes(endpoint));
      keysToDelete.forEach(key => cache.delete(key));
    } else {
      cache.clear();
    }
  }

  getStats(): { size: number; keys: string[] } {
    return {
      size: cache.size,
      keys: Array.from(cache.keys()),
    };
  }
}
