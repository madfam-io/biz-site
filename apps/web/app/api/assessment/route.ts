import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { ServiceTier as PrismaServiceTier, AssessmentStatus } from '@prisma/client';
import { analytics } from '@madfam/analytics';

// Assessment question types
interface AssessmentQuestion {
  id: string;
  question: string;
  category: 'technology' | 'process' | 'team' | 'strategy';
  weight: number;
}

// Assessment questions
const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    question: 'What is your current level of AI/automation adoption?',
    category: 'technology',
    weight: 3,
  },
  {
    id: 'q2',
    question: 'How would you describe your data management practices?',
    category: 'process',
    weight: 2,
  },
  {
    id: 'q3',
    question: 'What is your team\'s technical expertise level?',
    category: 'team',
    weight: 2,
  },
  {
    id: 'q4',
    question: 'How clear is your digital transformation strategy?',
    category: 'strategy',
    weight: 3,
  },
  {
    id: 'q5',
    question: 'What is your budget for technology initiatives?',
    category: 'strategy',
    weight: 2,
  },
  {
    id: 'q6',
    question: 'How automated are your current business processes?',
    category: 'process',
    weight: 2,
  },
  {
    id: 'q7',
    question: 'What is your timeline for implementing new solutions?',
    category: 'strategy',
    weight: 1,
  },
  {
    id: 'q8',
    question: 'How do you currently handle customer data and analytics?',
    category: 'technology',
    weight: 2,
  },
  {
    id: 'q9',
    question: 'What is your organization\'s change readiness?',
    category: 'team',
    weight: 2,
  },
  {
    id: 'q10',
    question: 'How integrated are your current systems?',
    category: 'technology',
    weight: 2,
  },
];

// Schema for assessment submission
const assessmentSchema = z.object({
  email: z.string().email(),
  answers: z.record(z.number().min(1).max(5)), // Answer values 1-5
  leadId: z.string().optional(),
});

// Schema for getting assessment questions (removed - unused)

// Calculate assessment score and recommendations
function calculateAssessmentResults(answers: Record<string, number>) {
  let totalScore = 0;
  let totalWeight = 0;
  const categoryScores: Record<string, { score: number; weight: number }> = {
    technology: { score: 0, weight: 0 },
    process: { score: 0, weight: 0 },
    team: { score: 0, weight: 0 },
    strategy: { score: 0, weight: 0 },
  };

  // Calculate scores
  assessmentQuestions.forEach((question) => {
    const answer = answers[question.id] || 0;
    const weightedScore = answer * question.weight;
    
    totalScore += weightedScore;
    totalWeight += question.weight;
    
    const categoryData = categoryScores[question.category];
    if (categoryData) {
      categoryData.score += weightedScore;
      categoryData.weight += question.weight;
    }
  });

  // Normalize score to 0-100
  const normalizedScore = Math.round((totalScore / (totalWeight * 5)) * 100);

  // Determine recommended tier based on score
  let recommendedTier: PrismaServiceTier;
  if (normalizedScore < 20) {
    recommendedTier = PrismaServiceTier.L1_ESSENTIALS;
  } else if (normalizedScore < 40) {
    recommendedTier = PrismaServiceTier.L2_ADVANCED;
  } else if (normalizedScore < 60) {
    recommendedTier = PrismaServiceTier.L3_CONSULTING;
  } else if (normalizedScore < 80) {
    recommendedTier = PrismaServiceTier.L4_PLATFORMS;
  } else {
    recommendedTier = PrismaServiceTier.L5_STRATEGIC;
  }

  // Identify strengths and weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  Object.entries(categoryScores).forEach(([category, data]) => {
    const categoryScore = (data.score / (data.weight * 5)) * 100;
    
    if (categoryScore >= 70) {
      strengths.push(`Strong ${category} foundation`);
    } else if (categoryScore < 40) {
      weaknesses.push(`${category.charAt(0).toUpperCase() + category.slice(1)} needs improvement`);
      
      // Add specific recommendations based on weaknesses
      switch (category) {
        case 'technology':
          recommendations.push('Consider upgrading your technology infrastructure');
          recommendations.push('Implement modern data analytics tools');
          break;
        case 'process':
          recommendations.push('Automate repetitive business processes');
          recommendations.push('Establish clear workflows and documentation');
          break;
        case 'team':
          recommendations.push('Invest in team training and upskilling');
          recommendations.push('Build a culture of innovation');
          break;
        case 'strategy':
          recommendations.push('Develop a clear digital transformation roadmap');
          recommendations.push('Align technology initiatives with business goals');
          break;
      }
    }
  });

  // Add tier-specific recommendations
  switch (recommendedTier) {
    case PrismaServiceTier.L1_ESSENTIALS:
      recommendations.push('Start with basic automation and design services');
      break;
    case PrismaServiceTier.L2_ADVANCED:
      recommendations.push('Explore parametric design and advanced visualization');
      break;
    case PrismaServiceTier.L3_CONSULTING:
      recommendations.push('Engage in strategic consulting for transformation');
      break;
    case PrismaServiceTier.L4_PLATFORMS:
      recommendations.push('Consider implementing SPARK or PENNY platforms');
      break;
    case PrismaServiceTier.L5_STRATEGIC:
      recommendations.push('Explore vCTO partnership for comprehensive transformation');
      break;
  }

  return {
    score: normalizedScore,
    tier: recommendedTier,
    strengths: strengths.slice(0, 3), // Top 3 strengths
    weaknesses: weaknesses.slice(0, 3), // Top 3 weaknesses
    recommendations: recommendations.slice(0, 5), // Top 5 recommendations
  };
}

// GET endpoint - Get assessment questions or results
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const assessmentId = searchParams.get('assessmentId');

    if (assessmentId) {
      // Fetch existing assessment results
      const assessment = await prisma.assessment.findUnique({
        where: { id: assessmentId },
        include: {
          lead: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
              company: true,
            },
          },
        },
      });

      if (!assessment) {
        return NextResponse.json(
          { error: 'Assessment not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        assessment,
        questions: assessmentQuestions,
      });
    }

    // Return assessment questions for new assessment
    return NextResponse.json({
      questions: assessmentQuestions,
      totalQuestions: assessmentQuestions.length,
    });
  } catch (error) {
    console.error('Error fetching assessment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assessment' },
      { status: 500 }
    );
  }
}

// POST endpoint - Submit assessment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = assessmentSchema.parse(body);

    // Calculate results
    const results = calculateAssessmentResults(validatedData.answers);

    // Create assessment record
    const assessment = await prisma.assessment.create({
      data: {
        email: validatedData.email,
        leadId: validatedData.leadId,
        status: AssessmentStatus.COMPLETED,
        answers: validatedData.answers,
        score: results.score,
        tier: results.tier,
        strengths: results.strengths,
        weaknesses: results.weaknesses,
        recommendations: results.recommendations,
        completedAt: new Date(),
      },
    });

    // Track analytics
    analytics.trackAssessmentComplete({
      score: results.score,
      recommendation: results.tier,
    });

    // Track in database analytics
    await prisma.analyticsEvent.create({
      data: {
        event: 'assessment_completed',
        properties: {
          assessmentId: assessment.id,
          score: results.score,
          tier: results.tier,
        },
        url: request.headers.get('referer') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    // Queue follow-up email
    await prisma.emailQueue.create({
      data: {
        to: [validatedData.email],
        subject: 'Your MADFAM AI Readiness Assessment Results',
        template: 'assessment-results',
        data: {
          assessmentId: assessment.id,
          score: results.score,
          tier: results.tier,
          strengths: results.strengths,
          recommendations: results.recommendations,
        },
      },
    });

    // If associated with a lead, update the lead
    if (validatedData.leadId) {
      await prisma.lead.update({
        where: { id: validatedData.leadId },
        data: {
          tier: results.tier,
          score: Math.max(results.score, 50), // Minimum score of 50 for completing assessment
        },
      });

      // Create lead activity
      await prisma.leadActivity.create({
        data: {
          leadId: validatedData.leadId,
          type: 'assessment_completed',
          description: `Completed AI readiness assessment with score ${results.score}`,
          metadata: {
            assessmentId: assessment.id,
            score: results.score,
            tier: results.tier,
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
          event: 'assessment.completed',
          data: {
            assessmentId: assessment.id,
            email: validatedData.email,
            score: results.score,
            tier: results.tier,
          },
        }),
      }).catch(console.error);
    }

    return NextResponse.json({
      success: true,
      assessmentId: assessment.id,
      results: {
        score: results.score,
        tier: results.tier,
        strengths: results.strengths,
        weaknesses: results.weaknesses,
        recommendations: results.recommendations,
      },
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

    console.error('Assessment submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error processing assessment',
      },
      { status: 500 }
    );
  }
}