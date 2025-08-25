/**
 * CMS API Layer
 * High-level functions with fallback handling and performance monitoring
 */

import { environment } from '../environment';
import { performanceMonitor } from '../performance-monitor';
import {
  getFallbackBlogPosts,
  getFallbackCaseStudies,
  getFallbackTeamMembers,
} from '../fallback-data';
import { CMSClient } from './client';
import type { BlogPost, CaseStudy, TeamMember } from './types';

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

interface ApiResponse<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  source: 'cms' | 'fallback';
  metrics?: any;
}

export async function getPublishedBlogPosts(
  locale?: string,
  limit = 10,
  fallbackData?: BlogPost[]
): Promise<ApiResponse<BlogPost>> {
  if (!environment.cms.enabled) {
    const fallbackPosts = fallbackData || getFallbackBlogPosts(locale);
    return {
      docs: fallbackPosts.slice(0, limit),
      totalDocs: fallbackPosts.length,
      totalPages: Math.ceil(fallbackPosts.length / limit),
      source: 'fallback',
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

    return { ...result, source: 'cms', metrics };
  } catch (error) {
    console.error('Failed to fetch blog posts from CMS:', error);

    // Return fallback data
    const fallbackPosts = fallbackData || getFallbackBlogPosts(locale);
    console.warn('Using fallback blog post data');
    return {
      docs: fallbackPosts.slice(0, limit),
      totalDocs: fallbackPosts.length,
      totalPages: Math.ceil(fallbackPosts.length / limit),
      source: 'fallback',
    };
  }
}

export async function getPublishedCaseStudies(
  locale?: string,
  limit = 10,
  fallbackData?: CaseStudy[]
): Promise<ApiResponse<CaseStudy>> {
  if (!environment.cms.enabled) {
    const fallbackStudies = fallbackData || getFallbackCaseStudies(locale);
    return {
      docs: fallbackStudies.slice(0, limit),
      totalDocs: fallbackStudies.length,
      totalPages: Math.ceil(fallbackStudies.length / limit),
      source: 'fallback',
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

    return { ...result, source: 'cms', metrics };
  } catch (error) {
    console.error('Failed to fetch case studies from CMS:', error);

    // Return fallback data
    const fallbackStudies = fallbackData || getFallbackCaseStudies(locale);
    console.warn('Using fallback case study data');
    return {
      docs: fallbackStudies.slice(0, limit),
      totalDocs: fallbackStudies.length,
      totalPages: Math.ceil(fallbackStudies.length / limit),
      source: 'fallback',
    };
  }
}

export async function getActiveTeamMembers(
  limit = 20,
  fallbackData?: TeamMember[]
): Promise<ApiResponse<TeamMember>> {
  if (!environment.cms.enabled) {
    const fallbackMembers = fallbackData || getFallbackTeamMembers();
    return {
      docs: fallbackMembers.slice(0, limit),
      totalDocs: fallbackMembers.length,
      totalPages: Math.ceil(fallbackMembers.length / limit),
      source: 'fallback',
    };
  }

  try {
    const { result, metrics } = await performanceMonitor.measureCMSRequest('getTeamMembers', () =>
      cmsClient.getTeamMembers({
        status: 'active',
        limit,
      })
    );

    return { ...result, source: 'cms', metrics };
  } catch (error) {
    console.error('Failed to fetch team members from CMS:', error);

    // Return fallback data
    const fallbackMembers = fallbackData || getFallbackTeamMembers();
    console.warn('Using fallback team member data');
    return {
      docs: fallbackMembers.slice(0, limit),
      totalDocs: fallbackMembers.length,
      totalPages: Math.ceil(fallbackMembers.length / limit),
      source: 'fallback',
    };
  }
}
