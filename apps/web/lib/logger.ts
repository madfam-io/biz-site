import { createLogger, LogLevel } from '@madfam/core';

// Create application-specific logger instance
export const appLogger = createLogger({
  level: process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO,
  enableConsole: true,
  enableRemote: process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENV === 'staging',
  remoteEndpoint: '/api/logs',
  environment:
    (process.env.NEXT_PUBLIC_ENV as 'development' | 'staging' | 'production') || 'development',
  serviceName: 'madfam-web',
  version: process.env.NEXT_PUBLIC_VERSION || '0.1.0',
  bufferSize: process.env.NODE_ENV === 'development' ? 10 : 100,
  flushInterval: process.env.NODE_ENV === 'development' ? 5000 : 30000,
});

// Context-specific loggers for different parts of the application
export const authLogger = appLogger.withContext('AUTH');
export const formLogger = appLogger.withContext('FORMS');
export const apiLogger = appLogger.withContext('API');
export const routerLogger = appLogger.withContext('ROUTER');
export const analyticsLogger = appLogger.withContext('ANALYTICS');
export const performanceLogger = appLogger.withContext('PERFORMANCE');

// Helper functions for common logging patterns
export function logPageView(path: string, userId?: string) {
  const logger = userId ? appLogger.withUserId(userId) : appLogger;
  logger.userAction('Page viewed', { path, timestamp: Date.now() });
}

export function logUserAction(action: string, metadata?: Record<string, unknown>, userId?: string) {
  const logger = userId ? appLogger.withUserId(userId) : appLogger;
  logger.userAction(action, metadata);
}

export function logBusinessEvent(event: string, metadata?: Record<string, unknown>) {
  appLogger.businessEvent(event, metadata);
}

export function logAPICall(
  method: string,
  endpoint: string,
  duration: number,
  status: number,
  metadata?: Record<string, unknown>
) {
  appLogger.apiCall(endpoint, method, duration, status, metadata);
}

export function logPerformanceMetric(
  metric: string,
  value: number,
  unit: string = 'ms',
  metadata?: Record<string, unknown>
) {
  appLogger.performanceMetric(metric, value, unit, metadata);
}

// Error logging with automatic error boundary integration
export function logError(
  error: Error,
  context: string,
  metadata?: Record<string, unknown>,
  userId?: string
) {
  const logger = userId ? appLogger.withUserId(userId) : appLogger;
  logger.error(error.message, error, context, {
    ...metadata,
    stack: error.stack,
    name: error.name,
  });
}

// Form-specific logging
export function logFormSubmission(
  formName: string,
  success: boolean,
  metadata?: Record<string, unknown>,
  userId?: string
) {
  const logger = userId ? appLogger.withUserId(userId) : appLogger;

  if (success) {
    logger.userAction(`Form submitted: ${formName}`, metadata);
  } else {
    logger.warn(`Form submission failed: ${formName}`, 'FORM', metadata);
  }
}

export function logFormValidationError(
  formName: string,
  field: string,
  error: string,
  metadata?: Record<string, unknown>
) {
  appLogger.debug(`Form validation error: ${formName}.${field}`, 'FORM', {
    ...metadata,
    field,
    error,
  });
}

// Service tier specific logging
export function logServiceInquiry(
  tier: string,
  source: string,
  metadata?: Record<string, unknown>,
  userId?: string
) {
  logBusinessEvent('Service inquiry', {
    ...metadata,
    tier,
    source,
    userId,
  });
}

export function logROICalculation(
  tier: string,
  results: unknown,
  metadata?: Record<string, unknown>,
  userId?: string
) {
  logBusinessEvent('ROI calculation', {
    ...metadata,
    tier,
    results,
    userId,
  });
}

export function logAssessmentCompleted(
  score: number,
  level: string,
  recommendedTier: string,
  metadata?: Record<string, unknown>,
  userId?: string
) {
  logBusinessEvent('Assessment completed', {
    ...metadata,
    score,
    level,
    recommendedTier,
    userId,
  });
}

// Analytics integration logging
export function logAnalyticsEvent(
  event: string,
  properties?: Record<string, unknown>,
  userId?: string
) {
  const logger = userId ? appLogger.withUserId(userId) : appLogger;
  logger.info(`Analytics event: ${event}`, 'ANALYTICS', {
    event,
    properties,
    timestamp: Date.now(),
  });
}

// Performance monitoring helpers
export function startPerformanceTimer(label: string): () => void {
  const start = performance.now();

  return () => {
    const duration = performance.now() - start;
    logPerformanceMetric(label, duration, 'ms');
  };
}

// Initialize performance monitoring for key metrics
export function initializePerformanceMonitoring() {
  // Core Web Vitals
  if (typeof window !== 'undefined') {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        logPerformanceMetric('LCP', entry.startTime, 'ms', {
          element: (entry as any).element?.tagName,
          id: (entry as any).element?.id,
          url: window.location.href,
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        logPerformanceMetric('FID', (entry as any).processingStart - entry.startTime, 'ms', {
          eventType: (entry as any).name,
          url: window.location.href,
        });
      }
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          logPerformanceMetric('CLS', (entry as any).value, 'score', {
            url: window.location.href,
          });
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
}

// Cleanup function for proper teardown
export function cleanupLogger() {
  appLogger.destroy();
}

// Export the main logger instance for direct use when needed
export { appLogger as logger };
