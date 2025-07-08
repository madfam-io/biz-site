import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ServiceTier } from '@madfam/core';
import { analytics } from '@madfam/analytics';

// Lead schema validation
const leadSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  company: z.string().optional(),
  phone: z.string().optional(),
  tier: z.nativeEnum(ServiceTier).optional(),
  message: z.string().optional(),
  source: z.string().default('website'),
  preferredLanguage: z.enum(['es-MX', 'en-US']).default('es-MX'),
  metadata: z.record(z.unknown()).optional(),
});

type LeadData = z.infer<typeof leadSchema>;

// Simple lead scoring algorithm
function calculateLeadScore(lead: LeadData): number {
  let score = 0;

  // Email domain scoring
  if (lead.email) {
    const domain = lead.email.split('@')[1];
    if (domain && !domain.includes('gmail') && !domain.includes('hotmail') && !domain.includes('yahoo')) {
      score += 20; // Business email
    }
  }

  // Company provided
  if (lead.company) {
    score += 15;
  }

  // Phone provided
  if (lead.phone) {
    score += 10;
  }

  // Service tier interest
  if (lead.tier) {
    const tierScores = {
      [ServiceTier.L1_ESSENTIALS]: 10,
      [ServiceTier.L2_ADVANCED]: 20,
      [ServiceTier.L3_CONSULTING]: 30,
      [ServiceTier.L4_PLATFORMS]: 40,
      [ServiceTier.L5_STRATEGIC]: 50,
    };
    score += tierScores[lead.tier] || 0;
  }

  // Message length (shows engagement)
  if (lead.message && lead.message.length > 50) {
    score += 15;
  }

  return Math.min(score, 100); // Cap at 100
}

// Simulate lead storage (in production, this would be a database)
const leads: Array<LeadData & { id: string; score: number; createdAt: Date }> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = leadSchema.parse(body);
    
    // Calculate lead score
    const score = calculateLeadScore(validatedData);
    
    // Create lead record
    const lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...validatedData,
      score,
      createdAt: new Date(),
    };
    
    // Store lead (in production, save to database)
    leads.push(lead);
    
    // Track analytics
    analytics.trackLeadCaptured({
      tier: validatedData.tier,
      source: validatedData.source,
      form: 'main-lead-form',
    });
    
    // In production, you would:
    // 1. Save to database
    // 2. Send to CRM
    // 3. Trigger n8n webhook
    // 4. Send confirmation email
    
    // Simulate n8n webhook (in production, use actual webhook)
    if (process.env.N8N_WEBHOOK_URL) {
      fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'lead.created',
          data: lead,
        }),
      }).catch(console.error);
    }
    
    return NextResponse.json({
      success: true,
      leadId: lead.id,
      score: lead.score,
      message: validatedData.preferredLanguage === 'es-MX' 
        ? 'Gracias por tu interés. Nos pondremos en contacto pronto.'
        : 'Thank you for your interest. We will contact you soon.',
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    
    console.error('Lead creation error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error al procesar la solicitud',
      },
      { status: 500 }
    );
  }
}

// Get leads (protected endpoint - in production, add authentication)
export async function GET(request: NextRequest) {
  // In production, check authentication
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.API_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Return leads sorted by score
  const sortedLeads = [...leads].sort((a, b) => b.score - a.score);
  
  return NextResponse.json({
    leads: sortedLeads,
    total: leads.length,
  });
}