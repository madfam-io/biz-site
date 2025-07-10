/**
 * Webhook Event Types
 * Defines the structure for different webhook events from external services
 */

// Base webhook interface
export interface WebhookEvent<T = unknown> {
  event: string;
  timestamp: string;
  source: string;
  data: T;
  signature?: string;
  version?: string;
}

// Lead Status Update Events
export interface LeadStatusUpdateData {
  leadId: string;
  oldStatus: string;
  newStatus: string;
  updatedBy: string;
  timestamp: string;
  metadata?: {
    source: string;
    reason?: string;
    notes?: string;
  };
}

// Email Event Data
export interface EmailEventData {
  messageId: string;
  recipient: string;
  sender: string;
  subject: string;
  event: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained';
  timestamp: string;
  metadata?: {
    campaignId?: string;
    templateId?: string;
    clickedUrl?: string;
    bounceReason?: string;
    userAgent?: string;
    ipAddress?: string;
  };
}

// CRM Sync Data
export interface CRMSyncData {
  operation: 'create' | 'update' | 'delete';
  entityType: 'contact' | 'lead' | 'opportunity' | 'account';
  entityId: string;
  changes: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  syncedAt: string;
  metadata?: {
    crmId: string;
    crmType: string;
    userId?: string;
    syncDirection: 'inbound' | 'outbound';
  };
}

// Meeting Scheduled Data
export interface MeetingScheduledData {
  meetingId: string;
  title: string;
  organizer: {
    id: string;
    name: string;
    email: string;
  };
  attendees: Array<{
    id?: string;
    name: string;
    email: string;
    status: 'pending' | 'accepted' | 'declined' | 'tentative';
  }>;
  schedule: {
    startTime: string;
    endTime: string;
    timezone: string;
    duration: number;
  };
  details: {
    description?: string;
    location?: string;
    meetingUrl?: string;
    calendarProvider: string;
  };
  metadata?: {
    leadId?: string;
    opportunityId?: string;
    source: string;
    remindersSent?: number;
  };
}

// Integration Update Data
export interface IntegrationUpdateData {
  integrationId: string;
  integrationType: string;
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync?: string;
  nextSync?: string;
  syncStats?: {
    recordsSynced: number;
    recordsSkipped: number;
    recordsFailed: number;
    syncDuration: number;
  };
  errors?: Array<{
    code: string;
    message: string;
    field?: string;
    recordId?: string;
  }>;
  metadata?: {
    userId: string;
    accountId: string;
    version: string;
    settings: Record<string, unknown>;
  };
}

// Payment Event Data
export interface PaymentEventData {
  paymentId: string;
  customerId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'disputed';
  paymentMethod: {
    type: 'card' | 'bank' | 'digital_wallet' | 'crypto';
    last4?: string;
    brand?: string;
  };
  invoice?: {
    id: string;
    number: string;
    url: string;
  };
  metadata?: {
    orderId?: string;
    subscriptionId?: string;
    planId?: string;
    userId?: string;
  };
}

// Analytics Event Data
export interface AnalyticsEventData {
  userId?: string;
  sessionId: string;
  event: string;
  timestamp: string;
  properties: Record<string, unknown>;
  context: {
    page: {
      url: string;
      title: string;
      referrer?: string;
    };
    user?: {
      id?: string;
      email?: string;
      role?: string;
    };
    device: {
      type: 'mobile' | 'tablet' | 'desktop';
      os?: string;
      browser?: string;
      viewport?: {
        width: number;
        height: number;
      };
    };
    geo?: {
      country?: string;
      region?: string;
      city?: string;
    };
  };
}

// Security Event Data
export interface SecurityEventData {
  eventType:
    | 'login_attempt'
    | 'password_reset'
    | 'suspicious_activity'
    | 'account_locked'
    | 'permission_changed';
  userId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  success: boolean;
  details: {
    attempts?: number;
    reason?: string;
    location?: string;
    riskScore?: number;
  };
  metadata?: {
    sessionId?: string;
    deviceFingerprint?: string;
    previousLogin?: string;
  };
}

// Webhook response types
export interface WebhookResponse {
  success: boolean;
  processed: boolean;
  message?: string;
  errors?: string[];
  metadata?: {
    processingTime: number;
    handlerVersion: string;
    timestamp: string;
  };
}

// Union type for all webhook events
export type WebhookEventData =
  | LeadStatusUpdateData
  | EmailEventData
  | CRMSyncData
  | MeetingScheduledData
  | IntegrationUpdateData
  | PaymentEventData
  | AnalyticsEventData
  | SecurityEventData;

// Typed webhook events
export type LeadStatusUpdateEvent = WebhookEvent<LeadStatusUpdateData>;
export type EmailEvent = WebhookEvent<EmailEventData>;
export type CRMSyncEvent = WebhookEvent<CRMSyncData>;
export type MeetingScheduledEvent = WebhookEvent<MeetingScheduledData>;
export type IntegrationUpdateEvent = WebhookEvent<IntegrationUpdateData>;
export type PaymentEvent = WebhookEvent<PaymentEventData>;
export type AnalyticsEvent = WebhookEvent<AnalyticsEventData>;
export type SecurityEvent = WebhookEvent<SecurityEventData>;

// Generic webhook handler type
export type WebhookHandler<T extends WebhookEventData> = (
  event: WebhookEvent<T>
) => Promise<WebhookResponse>;
