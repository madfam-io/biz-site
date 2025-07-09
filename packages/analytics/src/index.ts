import Plausible, { PlausibleOptions } from 'plausible-tracker';

export interface AnalyticsConfig {
  domain: string;
  apiHost?: string;
  trackLocalhost?: boolean;
}

export type CustomEvents =
  | 'Service Inquiry'
  | 'Resource Download'
  | 'Calculator Used'
  | 'Assessment Complete'
  | 'Lead Captured'
  | 'Demo Requested'
  | 'Consultation Booked'
  | 'Newsletter Signup'
  | 'Purchase Intent'
  | 'Pricing Viewed'
  | 'Contact Started'
  | 'Contact Completed'
  | 'Video Played'
  | 'Case Study Viewed'
  | 'Testimonial Viewed'
  | 'Feature Used'
  | 'Error Occurred'
  | 'Search Performed'
  | 'Filter Applied'
  | 'Language Changed'
  | 'Theme Changed';

export interface ServiceInquiryProps {
  tier: string;
  source?: string;
}

export interface ResourceDownloadProps {
  resource: string;
  type: 'pdf' | 'case-study' | 'whitepaper' | 'guide';
}

export interface CalculatorProps {
  type: 'roi' | 'project' | 'savings';
  result?: number;
}

export interface AssessmentProps {
  score: number;
  recommendation?: string;
}

export interface LeadProps {
  tier?: string;
  source: string;
  form: string;
}

class Analytics {
  private static instance: Analytics;
  private plausible: ReturnType<typeof Plausible> | null = null;

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  initialize(config: AnalyticsConfig): void {
    if (this.plausible) {
      console.warn('Analytics already initialized');
      return;
    }

    const options: PlausibleOptions = {
      domain: config.domain,
      apiHost: config.apiHost || 'https://plausible.io',
      trackLocalhost: config.trackLocalhost || false,
    };

    this.plausible = Plausible(options);

    // Enable automatic pageview tracking
    this.plausible.enableAutoPageviews();
  }

  // Page views
  trackPageView(): void {
    if (!this.plausible) {
      console.warn('Analytics not initialized');
      return;
    }

    // Plausible automatically tracks the current page
    this.plausible.trackPageview();
  }

  // Service inquiry tracking
  trackServiceInquiry(props: ServiceInquiryProps): void {
    this.trackEvent('Service Inquiry', {
      tier: props.tier,
      source: props.source || 'website',
    });
  }

  // Resource download tracking
  trackResourceDownload(props: ResourceDownloadProps): void {
    this.trackEvent('Resource Download', {
      resource: props.resource,
      type: props.type,
    });
  }

  // Calculator usage tracking
  trackCalculatorUsed(props: CalculatorProps): void {
    this.trackEvent('Calculator Used', {
      calculator_type: props.type,
      result: props.result?.toString(),
    });
  }

  // Assessment completion tracking
  trackAssessmentComplete(props: AssessmentProps): void {
    this.trackEvent('Assessment Complete', {
      score: props.score.toString(),
      recommendation: props.recommendation,
    });
  }

  // Lead capture tracking
  trackLeadCaptured(props: LeadProps): void {
    this.trackEvent('Lead Captured', {
      tier: props.tier,
      source: props.source,
      form: props.form,
    });
  }

  // Demo request tracking
  trackDemoRequested(product: string): void {
    this.trackEvent('Demo Requested', {
      product,
    });
  }

  // Consultation booking tracking
  trackConsultationBooked(tier?: string): void {
    this.trackEvent('Consultation Booked', {
      tier: tier || 'general',
    });
  }

  // Newsletter signup tracking
  trackNewsletterSignup(source: string): void {
    this.trackEvent('Newsletter Signup', {
      source,
    });
  }

  // Generic event tracking
  private trackEvent(event: CustomEvents, props?: Record<string, string | undefined>): void {
    if (!this.plausible) {
      console.warn('Analytics not initialized');
      return;
    }

    // Filter out undefined values
    const cleanProps = props
      ? Object.entries(props).reduce(
          (acc, [key, value]) => {
            if (value !== undefined) {
              acc[key] = value;
            }
            return acc;
          },
          {} as Record<string, string>
        )
      : undefined;

    this.plausible.trackEvent(event, { props: cleanProps });
  }

  // Conversion funnel tracking
  trackFunnelStep(funnel: string, step: number, metadata?: Record<string, string>): void {
    this.trackEvent(`Funnel: ${funnel}` as CustomEvents, {
      step: step.toString(),
      ...metadata,
    });
  }

  // Goal tracking
  trackGoal(goalId: string, revenue?: number): void {
    if (!this.plausible) {
      console.warn('Analytics not initialized');
      return;
    }

    const props: Record<string, string> = {};
    if (revenue) {
      props.revenue = revenue.toString();
    }

    this.plausible.trackEvent(`Goal: ${goalId}` as any, { props });
  }

  // 404 error tracking
  track404(url: string): void {
    this.trackEvent('404' as any, {
      url,
    });
  }

  // Outbound link tracking
  trackOutboundLink(url: string): void {
    if (!this.plausible) {
      console.warn('Analytics not initialized');
      return;
    }

    this.plausible.trackEvent('Outbound Link: Click' as any, {
      props: { url },
    });
  }

  // File download tracking
  trackFileDownload(filename: string): void {
    this.trackEvent('File Download' as any, {
      filename,
    });
  }

  // Enhanced conversion tracking methods
  trackPurchaseIntent(tier: string, estimatedValue?: number): void {
    this.trackEvent('Purchase Intent', {
      tier,
      estimated_value: estimatedValue?.toString(),
    });
  }

  trackPricingViewed(tier: string, duration?: number): void {
    this.trackEvent('Pricing Viewed', {
      tier,
      duration: duration?.toString(),
    });
  }

  trackContactStarted(form: string, tier?: string): void {
    this.trackEvent('Contact Started', {
      form,
      tier,
    });
  }

  trackContactCompleted(form: string, tier?: string, leadScore?: number): void {
    this.trackEvent('Contact Completed', {
      form,
      tier,
      lead_score: leadScore?.toString(),
    });
  }

  trackVideoPlayed(videoId: string, title: string, duration?: number): void {
    this.trackEvent('Video Played', {
      video_id: videoId,
      title,
      duration: duration?.toString(),
    });
  }

  trackCaseStudyViewed(caseStudyId: string, title: string): void {
    this.trackEvent('Case Study Viewed', {
      case_study_id: caseStudyId,
      title,
    });
  }

  trackTestimonialViewed(testimonialId: string, source: string): void {
    this.trackEvent('Testimonial Viewed', {
      testimonial_id: testimonialId,
      source,
    });
  }

  trackFeatureUsed(feature: string, context?: string): void {
    this.trackEvent('Feature Used', {
      feature,
      context,
    });
  }

  trackError(error: string, context?: string, severity?: 'low' | 'medium' | 'high'): void {
    this.trackEvent('Error Occurred', {
      error,
      context,
      severity,
    });
  }

  trackSearch(query: string, results?: number, source?: string): void {
    this.trackEvent('Search Performed', {
      query,
      results: results?.toString(),
      source,
    });
  }

  trackFilterApplied(filter: string, value: string, context?: string): void {
    this.trackEvent('Filter Applied', {
      filter,
      value,
      context,
    });
  }

  trackLanguageChanged(from: string, to: string): void {
    this.trackEvent('Language Changed', {
      from,
      to,
    });
  }

  trackThemeChanged(theme: 'light' | 'dark'): void {
    this.trackEvent('Theme Changed', {
      theme,
    });
  }

  // Conversion funnel tracking with predefined funnels
  trackServiceFunnelStep(
    step: 'view' | 'interest' | 'contact' | 'quote' | 'conversion',
    tier: string,
    metadata?: Record<string, string>
  ): void {
    this.trackFunnelStep('Service Conversion', this.getServiceFunnelStepNumber(step), {
      tier,
      ...metadata,
    });
  }

  trackProductFunnelStep(
    step: 'view' | 'demo' | 'trial' | 'purchase',
    product: string,
    metadata?: Record<string, string>
  ): void {
    this.trackFunnelStep('Product Conversion', this.getProductFunnelStepNumber(step), {
      product,
      ...metadata,
    });
  }

  private getServiceFunnelStepNumber(
    step: 'view' | 'interest' | 'contact' | 'quote' | 'conversion'
  ): number {
    const steps = { view: 1, interest: 2, contact: 3, quote: 4, conversion: 5 };
    return steps[step];
  }

  private getProductFunnelStepNumber(step: 'view' | 'demo' | 'trial' | 'purchase'): number {
    const steps = { view: 1, demo: 2, trial: 3, purchase: 4 };
    return steps[step];
  }

  // Revenue tracking for conversions
  trackRevenue(amount: number, currency: string, tier?: string, product?: string): void {
    this.trackEvent('Revenue' as any, {
      amount: amount.toString(),
      currency,
      tier,
      product,
    });
  }

  // User engagement tracking
  trackEngagement(
    action: 'scroll' | 'click' | 'hover' | 'focus',
    element: string,
    duration?: number
  ): void {
    this.trackEvent('Engagement' as any, {
      action,
      element,
      duration: duration?.toString(),
    });
  }

  // A/B test tracking
  trackABTest(testName: string, variant: string, outcome?: 'conversion' | 'bounce'): void {
    this.trackEvent('AB Test' as any, {
      test_name: testName,
      variant,
      outcome,
    });
  }

  // Session quality tracking
  trackSessionQuality(score: number, factors: Record<string, string>): void {
    this.trackEvent('Session Quality' as any, {
      score: score.toString(),
      ...factors,
    });
  }

  // Advanced goal tracking with attribution
  trackGoalWithAttribution(
    goalId: string,
    revenue?: number,
    attribution?: {
      source: string;
      medium: string;
      campaign?: string;
    }
  ): void {
    if (!this.plausible) {
      console.warn('Analytics not initialized');
      return;
    }

    const props: Record<string, string> = {};
    if (revenue) {
      props.revenue = revenue.toString();
    }
    if (attribution) {
      props.source = attribution.source;
      props.medium = attribution.medium;
      if (attribution.campaign) {
        props.campaign = attribution.campaign;
      }
    }

    this.plausible.trackEvent(`Goal: ${goalId}` as any, { props });
  }

  // Batch event tracking for performance
  private eventQueue: Array<{ event: CustomEvents; props?: Record<string, string> }> = [];
  private batchTimeout: NodeJS.Timeout | null = null;

  trackEventBatched(event: CustomEvents, props?: Record<string, string>): void {
    this.eventQueue.push({ event, props });

    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
    }

    this.batchTimeout = setTimeout(() => {
      this.flushEventQueue();
    }, 1000); // Batch events for 1 second
  }

  private flushEventQueue(): void {
    if (this.eventQueue.length === 0) return;

    this.eventQueue.forEach(({ event, props }) => {
      this.trackEvent(event, props);
    });

    this.eventQueue = [];
    this.batchTimeout = null;
  }

  // Manual flush for immediate tracking
  flush(): void {
    this.flushEventQueue();
  }
}

export const analytics = Analytics.getInstance();

// React hooks for analytics
export function useAnalytics() {
  return analytics;
}

// Hook for conversion tracking
export function useConversionTracking() {
  return {
    trackServiceFunnelStep: (
      step: 'view' | 'interest' | 'contact' | 'quote' | 'conversion',
      tier: string,
      metadata?: Record<string, string>
    ) => analytics.trackServiceFunnelStep(step, tier, metadata),
    trackProductFunnelStep: (
      step: 'view' | 'demo' | 'trial' | 'purchase',
      product: string,
      metadata?: Record<string, string>
    ) => analytics.trackProductFunnelStep(step, product, metadata),
    trackPurchaseIntent: (tier: string, estimatedValue?: number) =>
      analytics.trackPurchaseIntent(tier, estimatedValue),
    trackRevenue: (amount: number, currency: string, tier?: string, product?: string) =>
      analytics.trackRevenue(amount, currency, tier, product),
  };
}

// Hook for form tracking
export function useFormTracking() {
  return {
    trackContactStarted: (form: string, tier?: string) => analytics.trackContactStarted(form, tier),
    trackContactCompleted: (form: string, tier?: string, leadScore?: number) =>
      analytics.trackContactCompleted(form, tier, leadScore),
    trackLeadCaptured: (props: LeadProps) => analytics.trackLeadCaptured(props),
  };
}

// Hook for engagement tracking
export function useEngagementTracking() {
  return {
    trackEngagement: (
      action: 'scroll' | 'click' | 'hover' | 'focus',
      element: string,
      duration?: number
    ) => analytics.trackEngagement(action, element, duration),
    trackVideoPlayed: (videoId: string, title: string, duration?: number) =>
      analytics.trackVideoPlayed(videoId, title, duration),
    trackCaseStudyViewed: (caseStudyId: string, title: string) =>
      analytics.trackCaseStudyViewed(caseStudyId, title),
    trackTestimonialViewed: (testimonialId: string, source: string) =>
      analytics.trackTestimonialViewed(testimonialId, source),
  };
}

// Hook for feature usage tracking
export function useFeatureTracking() {
  return {
    trackFeatureUsed: (feature: string, context?: string) =>
      analytics.trackFeatureUsed(feature, context),
    trackCalculatorUsed: (props: CalculatorProps) => analytics.trackCalculatorUsed(props),
    trackAssessmentComplete: (props: AssessmentProps) => analytics.trackAssessmentComplete(props),
    trackSearch: (query: string, results?: number, source?: string) =>
      analytics.trackSearch(query, results, source),
    trackFilterApplied: (filter: string, value: string, context?: string) =>
      analytics.trackFilterApplied(filter, value, context),
  };
}

// Hook for error tracking
export function useErrorTracking() {
  return {
    trackError: (error: string, context?: string, severity?: 'low' | 'medium' | 'high') =>
      analytics.trackError(error, context, severity),
  };
}
