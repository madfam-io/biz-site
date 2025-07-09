import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { analytics } from '@madfam/analytics';

// Calculator types
type CalculatorType = 'roi' | 'project_estimate';

// ROI Calculator schema
const roiCalculatorSchema = z.object({
  type: z.literal('roi'),
  email: z.string().email().optional(),
  leadId: z.string().optional(),
  inputs: z.object({
    currentCosts: z.object({
      manualProcessing: z.number().min(0),
      dataEntry: z.number().min(0),
      reportGeneration: z.number().min(0),
      customerService: z.number().min(0),
      other: z.number().min(0).default(0),
    }),
    employees: z.object({
      affectedCount: z.number().min(1),
      averageHourlyRate: z.number().min(0),
      hoursPerWeek: z.number().min(0).max(168),
    }),
    efficiency: z.object({
      expectedAutomation: z.number().min(0).max(100), // Percentage
      expectedTimeSavings: z.number().min(0).max(100), // Percentage
      implementationMonths: z.number().min(1).max(24),
    }),
  }),
});

// Project Estimate Calculator schema
const projectEstimateSchema = z.object({
  type: z.literal('project_estimate'),
  email: z.string().email().optional(),
  leadId: z.string().optional(),
  inputs: z.object({
    projectType: z.enum(['3d_design', 'automation', 'consulting', 'platform', 'custom']),
    scope: z.object({
      complexity: z.enum(['simple', 'moderate', 'complex']),
      deliverables: z.array(z.string()),
      timeline: z.enum(['urgent', 'standard', 'flexible']),
    }),
    features: z.array(z.string()).optional(),
    teamSize: z.enum(['small', 'medium', 'large']).optional(),
  }),
});

// Combined schema
const calculatorSchema = z.discriminatedUnion('type', [
  roiCalculatorSchema,
  projectEstimateSchema,
]);

// ROI Calculation logic
function calculateROI(inputs: z.infer<typeof roiCalculatorSchema>['inputs']) {
  // Calculate total current costs (monthly)
  const totalCurrentCosts = Object.values(inputs.currentCosts).reduce((sum, cost) => sum + cost, 0);
  
  // Calculate labor costs (monthly)
  const monthlyLaborHours = inputs.employees.hoursPerWeek * 4.33; // Average weeks per month
  const monthlyLaborCost = inputs.employees.affectedCount * inputs.employees.averageHourlyRate * monthlyLaborHours;
  
  // Total monthly costs before automation
  const totalMonthlyCostsBefore = totalCurrentCosts + monthlyLaborCost;
  
  // Calculate savings
  const automationSavings = totalMonthlyCostsBefore * (inputs.efficiency.expectedAutomation / 100);
  const timeSavings = monthlyLaborCost * (inputs.efficiency.expectedTimeSavings / 100);
  const totalMonthlySavings = automationSavings + timeSavings;
  
  // Calculate costs after automation
  const totalMonthlyCostsAfter = totalMonthlyCostsBefore - totalMonthlySavings;
  
  // Annual calculations
  const annualSavings = totalMonthlySavings * 12;
  const annualCostsBefore = totalMonthlyCostsBefore * 12;
  const annualCostsAfter = totalMonthlyCostsAfter * 12;
  
  // ROI calculation (assuming average implementation cost based on savings)
  const estimatedImplementationCost = totalMonthlySavings * inputs.efficiency.implementationMonths * 0.8;
  const firstYearNetSavings = annualSavings - estimatedImplementationCost;
  const roi = (firstYearNetSavings / estimatedImplementationCost) * 100;
  const paybackMonths = Math.ceil(estimatedImplementationCost / totalMonthlySavings);
  
  // Additional benefits
  const productivityGain = inputs.efficiency.expectedTimeSavings;
  const capacityIncrease = inputs.efficiency.expectedAutomation;
  
  return {
    currentState: {
      monthlyLaborCost,
      monthlyOperationalCost: totalCurrentCosts,
      totalMonthlyCost: totalMonthlyCostsBefore,
      annualCost: annualCostsBefore,
    },
    futureState: {
      totalMonthlyCost: totalMonthlyCostsAfter,
      annualCost: annualCostsAfter,
      monthlySavings: totalMonthlySavings,
      annualSavings,
    },
    roi: {
      percentage: Math.round(roi),
      paybackMonths,
      firstYearNetSavings,
      fiveYearNetSavings: (annualSavings * 5) - estimatedImplementationCost,
    },
    benefits: {
      productivityGain: `${productivityGain}%`,
      capacityIncrease: `${capacityIncrease}%`,
      hoursRecoveredMonthly: Math.round((monthlyLaborHours * inputs.employees.affectedCount * inputs.efficiency.expectedTimeSavings) / 100),
      costReduction: `${Math.round((totalMonthlySavings / totalMonthlyCostsBefore) * 100)}%`,
    },
    implementation: {
      estimatedCost: estimatedImplementationCost,
      timelineMonths: inputs.efficiency.implementationMonths,
      breakEvenMonth: paybackMonths,
    },
  };
}

// Project Estimate Calculation logic
function calculateProjectEstimate(inputs: z.infer<typeof projectEstimateSchema>['inputs']) {
  // Base rates by project type (in MXN)
  const baseRates = {
    '3d_design': { simple: 15000, moderate: 35000, complex: 75000 },
    'automation': { simple: 50000, moderate: 150000, complex: 400000 },
    'consulting': { simple: 25000, moderate: 75000, complex: 200000 },
    'platform': { simple: 200000, moderate: 500000, complex: 1500000 },
    'custom': { simple: 100000, moderate: 300000, complex: 800000 },
  };
  
  // Timeline multipliers
  const timelineMultipliers = {
    urgent: 1.5,
    standard: 1.0,
    flexible: 0.9,
  };
  
  // Team size cost factors
  const teamSizeFactors = {
    small: 1.0,
    medium: 1.5,
    large: 2.2,
  };
  
  // Calculate base cost
  let baseCost = baseRates[inputs.projectType][inputs.scope.complexity];
  
  // Apply timeline multiplier
  baseCost *= timelineMultipliers[inputs.scope.timeline];
  
  // Apply team size factor if specified
  if (inputs.teamSize) {
    baseCost *= teamSizeFactors[inputs.teamSize];
  }
  
  // Add cost for additional features
  const featureCost = (inputs.features?.length || 0) * 10000;
  
  // Add cost for deliverables
  const deliverableCost = inputs.scope.deliverables.length * 5000;
  
  // Calculate total
  const subtotal = baseCost + featureCost + deliverableCost;
  const tax = subtotal * 0.16; // IVA in Mexico
  const total = subtotal + tax;
  
  // Estimate timeline
  const complexityTimelines = {
    simple: { min: 2, max: 4 },
    moderate: { min: 4, max: 8 },
    complex: { min: 8, max: 16 },
  };
  
  const timeline = complexityTimelines[inputs.scope.complexity];
  
  // Apply timeline adjustments
  if (inputs.scope.timeline === 'urgent') {
    timeline.min = Math.max(1, Math.floor(timeline.min * 0.7));
    timeline.max = Math.floor(timeline.max * 0.7);
  } else if (inputs.scope.timeline === 'flexible') {
    timeline.max = Math.ceil(timeline.max * 1.2);
  }
  
  return {
    pricing: {
      baseCost,
      featureCost,
      deliverableCost,
      subtotal,
      tax,
      total,
      currency: 'MXN',
    },
    timeline: {
      minWeeks: timeline.min,
      maxWeeks: timeline.max,
      urgency: inputs.scope.timeline,
    },
    breakdown: {
      projectType: inputs.projectType,
      complexity: inputs.scope.complexity,
      deliverables: inputs.scope.deliverables,
      features: inputs.features || [],
      teamSize: inputs.teamSize || 'small',
    },
    nextSteps: [
      'Schedule a consultation call',
      'Review detailed project scope',
      'Meet the assigned team',
      'Finalize timeline and milestones',
      'Begin project kickoff',
    ],
  };
}

// POST endpoint - Perform calculation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = calculatorSchema.parse(body);
    
    let results;
    let totalValue = 0;
    let roi = 0;
    let paybackMonths = 0;
    
    if (validatedData.type === 'roi') {
      results = calculateROI(validatedData.inputs);
      totalValue = results.futureState.annualSavings;
      roi = results.roi.percentage;
      paybackMonths = results.roi.paybackMonths;
    } else {
      results = calculateProjectEstimate(validatedData.inputs);
      totalValue = results.pricing.total;
    }
    
    // Store calculation in database
    const calculation = await prisma.calculation.create({
      data: {
        type: validatedData.type,
        email: validatedData.email,
        leadId: validatedData.leadId,
        inputs: validatedData.inputs,
        results,
        totalValue,
        roi: roi || undefined,
        paybackMonths: paybackMonths || undefined,
      },
    });
    
    // Track analytics
    analytics.trackCalculatorUsed({
      type: validatedData.type,
    });
    
    // Track in database analytics
    await prisma.analyticsEvent.create({
      data: {
        event: 'calculator_used',
        properties: {
          calculationId: calculation.id,
          type: validatedData.type,
          totalValue,
          roi,
        },
        url: request.headers.get('referer') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });
    
    // If associated with a lead, create activity
    if (validatedData.leadId) {
      await prisma.leadActivity.create({
        data: {
          leadId: validatedData.leadId,
          type: 'calculator_used',
          description: `Used ${validatedData.type} calculator`,
          metadata: {
            calculationId: calculation.id,
            type: validatedData.type,
            totalValue,
          },
        },
      });
    }
    
    // Queue follow-up email if email provided
    if (validatedData.email) {
      await prisma.emailQueue.create({
        data: {
          to: [validatedData.email],
          subject: validatedData.type === 'roi' 
            ? 'Your MADFAM ROI Analysis Results' 
            : 'Your MADFAM Project Estimate',
          template: `${validatedData.type}-results`,
          data: {
            calculationId: calculation.id,
            results,
          },
        },
      });
    }
    
    // Trigger n8n webhook if configured
    if (process.env.N8N_WEBHOOK_URL) {
      fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.N8N_API_KEY || '',
        },
        body: JSON.stringify({
          event: 'calculator.completed',
          data: {
            calculationId: calculation.id,
            type: validatedData.type,
            email: validatedData.email,
            totalValue,
          },
        }),
      }).catch(console.error);
    }
    
    return NextResponse.json({
      success: true,
      calculationId: calculation.id,
      results,
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    
    console.error('Calculator error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error processing calculation',
      },
      { status: 500 }
    );
  }
}

// GET endpoint - Retrieve calculation results
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const calculationId = searchParams.get('id');
    
    if (!calculationId) {
      return NextResponse.json(
        { error: 'Calculation ID required' },
        { status: 400 }
      );
    }
    
    const calculation = await prisma.calculation.findUnique({
      where: { id: calculationId },
    });
    
    if (!calculation) {
      return NextResponse.json(
        { error: 'Calculation not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      calculation,
    });
    
  } catch (error) {
    console.error('Error fetching calculation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calculation' },
      { status: 500 }
    );
  }
}