/**
 * Content Types for CMS and Rich Text
 * Defines structured types for content management and rich text rendering
 */

// Rich Text Content Types
export interface RichTextNode {
  type: string;
  content?: RichTextNode[];
  text?: string;
  marks?: RichTextMark[];
  attrs?: Record<string, unknown>;
}

export interface RichTextMark {
  type: string;
  attrs?: Record<string, unknown>;
}

export interface RichTextDocument {
  type: 'doc';
  content: RichTextNode[];
}

// Common rich text node types
export interface ParagraphNode extends RichTextNode {
  type: 'paragraph';
  content: TextNode[];
}

export interface TextNode extends RichTextNode {
  type: 'text';
  text: string;
  marks?: RichTextMark[];
}

export interface HeadingNode extends RichTextNode {
  type: 'heading';
  attrs: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
  };
  content: TextNode[];
}

export interface ListNode extends RichTextNode {
  type: 'bulletList' | 'orderedList';
  content: ListItemNode[];
}

export interface ListItemNode extends RichTextNode {
  type: 'listItem';
  content: (ParagraphNode | ListNode)[];
}

export interface LinkNode extends RichTextNode {
  type: 'text';
  text: string;
  marks: Array<{
    type: 'link';
    attrs: {
      href: string;
      target?: string;
      title?: string;
    };
  }>;
}

export interface ImageNode extends RichTextNode {
  type: 'image';
  attrs: {
    src: string;
    alt?: string;
    title?: string;
    width?: number;
    height?: number;
  };
}

export interface CodeBlockNode extends RichTextNode {
  type: 'codeBlock';
  attrs?: {
    language?: string;
  };
  content: TextNode[];
}

// Translation and i18n types
export interface TranslationFunction {
  (key: string, values?: Record<string, unknown>): string;
}

export interface LocaleConfig {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  default?: boolean;
}

// Testimonial and social proof types
export interface Testimonial {
  id: string;
  author: {
    name: string;
    title: string;
    role?: string;
    company: string;
    avatar?: string;
    image?: string;
  };
  content: string;
  rating?: number;
  featured: boolean;
  verified: boolean;
  service?: string;
  results?: Array<{
    metric: string;
    value: string;
    description: string;
  }>;
  metadata?: {
    source: string;
    date: string;
    project?: string;
  };
}

// Product types

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  benefits: string[];
  pricing: {
    plans: Array<{
      id: string;
      name: string;
      description: string;
      features: string[];
      pricing: {
        type: 'fixed' | 'hourly' | 'custom';
        amount?: number;
        currency: string;
        period?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'project';
      };
      popular?: boolean;
      available: boolean;
    }>;
    freeTrialDays?: number;
    moneyBackGuarantee?: number;
  };
  testimonials: Testimonial[];
  media: {
    hero?: string;
    gallery?: string[];
    video?: string;
  };
  status: 'draft' | 'published' | 'archived';
  metadata: {
    category: string;
    tags: string[];
    publishedAt?: string;
    updatedAt: string;
  };
}

// Assessment and quiz types
export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'scale' | 'text' | 'boolean';
  options?: Array<{
    id: string;
    text: string;
    value: string | number;
    weight?: number;
  }>;
  required: boolean;
  category: string;
  weight: number;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  scoring: {
    method: 'weighted' | 'percentage' | 'points';
    ranges: Array<{
      min: number;
      max: number;
      label: string;
      description: string;
      recommendations: string[];
    }>;
  };
  metadata: {
    estimatedTime: number;
    category: string;
    version: string;
  };
}

// Form field types
export interface FormField {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'phone'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'date'
    | 'number';
  placeholder?: string;
  required: boolean;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
  options?: Array<{
    value: string;
    label: string;
  }>;
  helpText?: string;
  defaultValue?: string | number | boolean;
}

export interface FormConfig {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  submitButton: {
    text: string;
    loadingText?: string;
  };
  validation: {
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    showErrorSummary?: boolean;
  };
  styling?: {
    layout: 'vertical' | 'horizontal' | 'inline';
    spacing: 'compact' | 'normal' | 'relaxed';
    theme?: string;
  };
}

// SEO and meta types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph: {
    title: string;
    description: string;
    image?: string;
    type: 'website' | 'article' | 'product';
    url?: string;
  };
  twitter: {
    card: 'summary' | 'summary_large_image' | 'app' | 'player';
    title: string;
    description: string;
    image?: string;
    creator?: string;
  };
  schema?: Record<string, unknown>;
}

// Analytics and tracking types
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, unknown>;
  timestamp?: string;
}

export interface PageView {
  url: string;
  title: string;
  referrer?: string;
  timestamp: string;
  userId?: string;
  sessionId: string;
  metadata?: Record<string, unknown>;
}
