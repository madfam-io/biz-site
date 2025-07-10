import { LeadStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';

// Webhook event types
interface WebhookEvent {
  event: string;
  data: any;
  timestamp?: string;
}

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
async function handleLeadStatusUpdate(data: any) {
  try {
    const { leadId, status, note } = data;

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
        metadata: { previousStatus: data.previousStatus, note },
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
async function handleEmailEvent(data: any) {
  try {
    const { leadId, type, subject, status, error } = data;

    if (!leadId || !type) {
      throw new Error('Missing required fields: leadId, type');
    }

    // Create activity record
    await prisma.leadActivity.create({
      data: {
        leadId,
        type: `email_${type}`,
        description: `Email ${type}: ${subject || 'No subject'}`,
        metadata: { status, error },
      },
    });
  } catch (error) {
    logger.error('Failed to handle email event', error as Error, 'webhook', { data });
    throw error;
  }
}

// Handle CRM sync event
async function handleCRMSync(data: any) {
  try {
    const { leadId, crmId, action, syncData } = data;

    if (!leadId || !crmId || !action) {
      throw new Error('Missing required fields: leadId, crmId, action');
    }

    // Create activity record
    await prisma.leadActivity.create({
      data: {
        leadId,
        type: 'crm_sync',
        description: `CRM ${action}: ${crmId}`,
        metadata: { crmId, action, syncData },
      },
    });
  } catch (error) {
    logger.error('Failed to handle CRM sync', error as Error, 'webhook', { data });
    throw error;
  }
}

// Handle meeting scheduled event
async function handleMeetingScheduled(data: any) {
  try {
    const { leadId, meetingId, scheduledAt, type, attendees } = data;

    if (!leadId || !meetingId || !scheduledAt) {
      throw new Error('Missing required fields: leadId, meetingId, scheduledAt');
    }

    // Create activity record
    await prisma.leadActivity.create({
      data: {
        leadId,
        type: 'meeting_scheduled',
        description: `Meeting scheduled for ${scheduledAt}`,
        metadata: { meetingId, type, attendees },
      },
    });
  } catch (error) {
    logger.error('Failed to handle meeting scheduled', error as Error, 'webhook', { data });
    throw error;
  }
}

// Handle integration update
async function handleIntegrationUpdate(data: any) {
  try {
    const { name, enabled, config, lastSync } = data;

    if (!name) {
      throw new Error('Missing required field: name');
    }

    // Update integration
    await prisma.integration.upsert({
      where: { name },
      update: {
        enabled: enabled ?? undefined,
        config: config ?? undefined,
        lastSync: lastSync ? new Date(lastSync) : undefined,
      },
      create: {
        name,
        enabled: enabled ?? true,
        config: config ?? {},
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
        await handleLeadStatusUpdate(event.data);
        break;

      case 'email.sent':
      case 'email.delivered':
      case 'email.opened':
      case 'email.clicked':
      case 'email.bounced':
        await handleEmailEvent(event.data);
        break;

      case 'crm.synced':
      case 'crm.updated':
        await handleCRMSync(event.data);
        break;

      case 'meeting.scheduled':
        await handleMeetingScheduled(event.data);
        break;

      case 'integration.updated':
        await handleIntegrationUpdate(event.data);
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
