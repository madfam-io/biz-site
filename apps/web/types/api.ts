/**
 * Shared API Types and Interfaces
 * Centralizes type definitions for API requests and responses
 */

// Common API Response Structure
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

// Error Response
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

// Lead Data Types
export interface LeadData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  source: string;
  urgency?: 'low' | 'medium' | 'high';
  budget?: string;
  timeline?: string;
  services?: string[];
  referral?: string;
}

export interface LeadResponse {
  leadId: string;
  score: number;
  priority: 'low' | 'medium' | 'high';
  estimatedValue: number;
  nextSteps: string[];
}

// Assessment Data Types
export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'scale' | 'text';
  options?: string[];
  required: boolean;
  category: string;
}

export interface AssessmentAnswer {
  questionId: string;
  value: string | string[] | number;
  timestamp: string;
}

export interface AssessmentData {
  sessionId: string;
  answers: AssessmentAnswer[];
  metadata: {
    startTime: string;
    endTime?: string;
    userAgent: string;
    locale: string;
    source: string;
  };
}

export interface AssessmentResponse {
  sessionId: string;
  score: number;
  category: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  recommendations: {
    services: string[];
    resources: string[];
    nextSteps: string[];
  };
  reportUrl?: string;
}

// ROI Calculator Types
export interface ROIData {
  currentState: {
    revenue: number;
    costs: number;
    teamSize: number;
    timeToMarket: number;
    efficiencyScore: number;
  };
  targetState: {
    revenueIncrease: number;
    costReduction: number;
    productivityGain: number;
    timeReduction: number;
  };
  investment: {
    initialCost: number;
    monthlyRecurring: number;
    implementationTime: number;
  };
  assumptions: {
    discountRate: number;
    projectDuration: number;
    riskFactor: number;
  };
}

export interface ROIResponse {
  calculations: {
    netPresentValue: number;
    returnOnInvestment: number;
    paybackPeriod: number;
    internalRateOfReturn: number;
  };
  projections: {
    year1: number;
    year2: number;
    year3: number;
    totalReturn: number;
  };
  riskAnalysis: {
    bestCase: number;
    worstCase: number;
    mostLikely: number;
  };
  recommendations: string[];
}

// Project Estimator Types
export interface ProjectRequirement {
  id: string;
  category: string;
  name: string;
  description: string;
  complexity: 'low' | 'medium' | 'high';
  estimatedHours: number;
  dependencies: string[];
  optional: boolean;
}

export interface ProjectEstimateData {
  project: {
    name: string;
    description: string;
    type: 'web' | 'mobile' | 'api' | 'integration' | 'custom';
    industry: string;
    urgency: 'standard' | 'fast' | 'urgent';
  };
  requirements: ProjectRequirement[];
  preferences: {
    budget: {
      min: number;
      max: number;
      preferred: number;
    };
    timeline: {
      desired: number;
      flexible: boolean;
    };
    team: {
      size: 'small' | 'medium' | 'large';
      experience: 'junior' | 'mid' | 'senior';
    };
    technology: {
      preferences: string[];
      constraints: string[];
    };
  };
  contact: LeadData;
}

export interface ProjectEstimateResponse {
  estimateId: string;
  summary: {
    totalHours: number;
    totalCost: number;
    duration: number;
    confidence: number;
  };
  breakdown: {
    development: number;
    design: number;
    testing: number;
    deployment: number;
    projectManagement: number;
    contingency: number;
  };
  timeline: {
    phases: Array<{
      name: string;
      duration: number;
      deliverables: string[];
    }>;
    milestones: Array<{
      name: string;
      date: string;
      dependencies: string[];
    }>;
  };
  recommendations: {
    alternativeApproaches: string[];
    costOptimizations: string[];
    riskMitigations: string[];
  };
  nextSteps: string[];
}

// Feature Flag Types
export interface FeatureFlag {
  key: string;
  enabled: boolean;
  description: string;
  conditions?: {
    userSegments?: string[];
    environments?: string[];
    rolloutPercentage?: number;
  };
  metadata?: {
    owner: string;
    createdAt: string;
    updatedAt: string;
    expiresAt?: string;
  };
}

export interface FeatureFlagResponse {
  flags: Record<string, boolean>;
  metadata: {
    environment: string;
    userId?: string;
    sessionId: string;
    evaluatedAt: string;
  };
}

// Log Data Types
export interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  userId?: string;
  sessionId?: string;
  requestId?: string;
  source: string;
  metadata?: {
    userAgent?: string;
    ip?: string;
    locale?: string;
  };
}

export interface LogData {
  logs: LogEntry[];
  batch: {
    size: number;
    timestamp: string;
    source: string;
  };
}

// Generic Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
