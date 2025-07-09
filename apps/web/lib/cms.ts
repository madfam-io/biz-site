/**
 * CMS Integration Client
 * Handles communication with PayloadCMS API
 */

import { environment } from './environment';

const CMS_URL = environment.cms.url || 'http://localhost:3001';
const CMS_API_URL = `${CMS_URL}/api`;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: {
    id: string;
    name: string;
    email: string;
  } | string;
  status: 'draft' | 'published';
  publishedDate: string;
  excerpt: string;
  content?: any; // Rich text content
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
  solution: any; // Rich text content or string
  results: Array<{
    metric: string;
    value: string;
    description: string;
  }> | string[];
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

  constructor() {
    this.baseUrl = CMS_API_URL;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`CMS API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('CMS API request failed:', error);
      throw error;
    }
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

  async getBlogPost(
    slug: string,
    locale?: string
  ): Promise<BlogPost | null> {
    const queryParams = new URLSearchParams();
    queryParams.append('where[slug][equals]', slug);
    
    if (locale) {
      queryParams.append('locale', locale);
    }

    const response = await this.fetch<{ docs: BlogPost[] }>(`/blog-posts?${queryParams.toString()}`);
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

  async getCaseStudy(
    slug: string,
    locale?: string
  ): Promise<CaseStudy | null> {
    const queryParams = new URLSearchParams();
    queryParams.append('where[slug][equals]', slug);
    
    if (locale) {
      queryParams.append('locale', locale);
    }

    const response = await this.fetch<{ docs: CaseStudy[] }>(`/case-studies?${queryParams.toString()}`);
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

// Create singleton instance
export const cmsClient = new CMSClient();

// Helper functions for common operations
export async function getPublishedBlogPosts(locale?: string, limit = 10) {
  try {
    return await cmsClient.getBlogPosts({
      status: 'published',
      limit,
      locale,
    });
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return { docs: [], totalDocs: 0, totalPages: 0 };
  }
}

export async function getPublishedCaseStudies(locale?: string, limit = 10) {
  try {
    return await cmsClient.getCaseStudies({
      status: 'published',
      limit,
      locale,
    });
  } catch (error) {
    console.error('Failed to fetch case studies:', error);
    return { docs: [], totalDocs: 0, totalPages: 0 };
  }
}

export async function getActiveTeamMembers(limit = 20) {
  try {
    return await cmsClient.getTeamMembers({
      status: 'active',
      limit,
    });
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    return { docs: [], totalDocs: 0 };
  }
}