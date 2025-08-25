/**
 * CMS Types and Interfaces
 */

export interface CacheConfig {
  ttl: number; // Time to live in seconds
  staleWhileRevalidate: number; // Serve stale content for this duration while revalidating
  maxAge: number; // Maximum age for cache
}

export interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
}

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

export interface CacheEntry {
  data: unknown;
  timestamp: number;
  ttl: number;
}

export interface CMSApiResponse<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
}

export interface CMSRequestParams {
  status?: 'draft' | 'published' | 'active' | 'inactive';
  limit?: number;
  page?: number;
  locale?: string;
}
