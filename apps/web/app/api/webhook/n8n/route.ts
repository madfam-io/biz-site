import { LeadStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import type {
  WebhookEvent,
  LeadStatusUpdateData,
  EmailEventData,
  CRMSyncData,
  MeetingScheduledData,
  IntegrationUpdateData,
} from '@/types/webhooks';

// Validate webhook authentication
function validateWebhookAuth(request: NextRequest): boolean {
  const apiKey = request.headers.get('X-API-Key');
  const expectedKey = process.env.N8N_API_KEY;

  if (!expectedKey) {
    console.warn('N8N_API_KEY not configured');
    return false;
  }

  return apiKey === expectedKey;
}

// Handle lead status update
async function handleLeadStatusUpdate(data: LeadStatusUpdateData) {
  try {
    const { leadId, newStatus: status, metadata } = data;
    const note = metadata?.notes;

    if (!leadId || !status) {
      throw new Error('Missing required fields: leadId, status');
    }

    // Update lead status
    await prisma.lead.update({
      where: { id: leadId },
      data: { status: status as LeadStatus },
    });

    // Create activity record
    await prisma.leadActivity.create({
      data: {
        leadId,
        type: 'status_changed',
        description: `Status updated to ${status}`,
        metadata: { previousStatus: data.oldStatus, note },
      },
    });

    // Add note if provided
    if (note) {
      await prisma.leadNote.create({
        data: {
          leadId,
          content: note,
        },
      });
    }
  } catch (error) {
    logger.error('Failed to handle lead status update', error as Error, 'webhook', { data });
    throw error;
  }
}

// Handle email event
async function handleEmailEvent(data: EmailEventData) {
  try {
    const { recipient, event: type, subject, metadata } = data;
    // Extract leadId from metadata or map from recipient
    const leadId = metadata?.campaignId; // Assuming leadId is stored in campaignId

    if (!leadId || !type) {
      throw new Error('Missing required fields: leadId, type');
    }

    // Create activity record
    await prisma.leadActivity.create({
      data: {
        leadId,
        type: `email_${type}`,
        description: `Email ${type}: ${subject || 'No subject'}`,
        metadata: {
          status: data.event,
          recipient,
          messageId: data.messageId,
          clickedUrl: metadata?.clickedUrl,
        },
      },
    });
  } catch (error) {
    logger.error('Failed to handle email event', error as Error, 'webhook', { data });
    throw error;
  }
}

// Handle CRM sync event
async function handleCRMSync(data: CRMSyncData) {
  try {
    const { entityId: leadId, operation: action, changes, metadata } = data;
    const crmId = metadata?.crmId || leadId;

    if (!leadId || !crmId || !action) {
      throw new Error('Missing required fields: leadId, crmId, action');
    }

    // Create activity record
    await prisma.leadActivity.create({
      data: {
        leadId,
        type: 'crm_sync',
        description: `CRM ${action}: ${crmId}`,
        metadata: {
          crmId,
          action,
          changes: JSON.stringify(changes),
          syncedAt: data.syncedAt,
        },
      },
    });
  } catch (error) {
    logger.error('Failed to handle CRM sync', error as Error, 'webhook', { data });
    throw error;
  }
}

// Handle meeting scheduled event
async function handleMeetingScheduled(data: MeetingScheduledData) {
  try {
    const { meetingId, schedule, details, metadata } = data;
    const leadId = metadata?.leadId;
    const scheduledAt = schedule.startTime;

    if (!leadId || !meetingId || !scheduledAt) {
      throw new Error('Missing required fields: leadId, meetingId, scheduledAt');
    }

    // Create activity record
    await prisma.leadActivity.create({
      data: {
        leadId,
        type: 'meeting_scheduled',
        description: `Meeting scheduled for ${scheduledAt}`,
        metadata: {
          meetingId,
          duration: schedule.duration,
          attendees: data.attendees,
          location: details.location,
          meetingUrl: details.meetingUrl,
        },
      },
    });
  } catch (error) {
    logger.error('Failed to handle meeting scheduled', error as Error, 'webhook', { data });
    throw error;
  }
}

// Handle integration update
async function handleIntegrationUpdate(data: IntegrationUpdateData) {
  try {
    const { integrationId: name, status, lastSync, metadata } = data;
    const enabled = status === 'connected';
    const config = metadata?.settings;

    if (!name) {
      throw new Error('Missing required field: name');
    }

    // Update integration
    await prisma.integration.upsert({
      where: { name },
      update: {
        enabled: enabled ?? undefined,
        config: config ? JSON.stringify(config) : undefined,
        lastSync: lastSync ? new Date(lastSync) : undefined,
      },
      create: {
        name,
        enabled: enabled ?? true,
        config: config ? JSON.stringify(config) : JSON.stringify({}),
      },
    });
  } catch (error) {
    logger.error('Failed to handle integration update', error as Error, 'webhook', { data });
    throw error;
  }
}

// Main webhook handler
export async function POST(request: NextRequest) {
  try {
    // Validate authentication
    if (!validateWebhookAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const event: WebhookEvent = body;

    // console.log('Received webhook event:', event.event);

    // Route to appropriate handler
    switch (event.event) {
      case 'lead.status_updated':
        await handleLeadStatusUpdate(event.data as LeadStatusUpdateData);
        break;

      case 'email.sent':
      case 'email.delivered':
      case 'email.opened':
      case 'email.clicked':
      case 'email.bounced':
        await handleEmailEvent(event.data as EmailEventData);
        break;

      case 'crm.synced':
      case 'crm.updated':
        await handleCRMSync(event.data as CRMSyncData);
        break;

      case 'meeting.scheduled':
        await handleMeetingScheduled(event.data as MeetingScheduledData);
        break;

      case 'integration.updated':
        await handleIntegrationUpdate(event.data as IntegrationUpdateData);
        break;

      default:
        console.warn('Unknown webhook event:', event.event);
        // Still return success to avoid retries
        return NextResponse.json({
          success: true,
          message: 'Event received but not handled',
        });
    }

    return NextResponse.json({
      success: true,
      message: 'Event processed successfully',
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for webhook health check
export async function GET(request: NextRequest) {
  // Simple health check
  if (!validateWebhookAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0',
    supportedEvents: [
      'lead.status_updated',
      'email.sent',
      'email.delivered',
      'email.opened',
      'email.clicked',
      'email.bounced',
      'crm.synced',
      'crm.updated',
      'meeting.scheduled',
      'integration.updated',
    ],
  });
}
