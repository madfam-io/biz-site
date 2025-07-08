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
  | 'Newsletter Signup';

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
      ? Object.entries(props).reduce((acc, [key, value]) => {
          if (value !== undefined) {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, string>)
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
}

export const analytics = Analytics.getInstance();

// React hook for analytics
export function useAnalytics() {
  return analytics;
}