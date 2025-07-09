import { environment } from './environment';

// Mock data for staging
const mockLeadResponse = {
  success: true,
  leadId: 'mock-lead-123',
  score: 75,
  message: 'Thank you for your interest. This is a staging environment.',
};

const mockAssessmentResponse = {
  success: true,
  assessmentId: 'mock-assessment-123',
  results: {
    score: 68,
    tier: 'L3_CONSULTING',
    strengths: ['Strong technology foundation', 'Good strategic planning'],
    weaknesses: ['Process automation needs improvement'],
    recommendations: [
      'Implement workflow automation',
      'Upgrade data analytics capabilities',
      'Consider strategic consulting engagement',
    ],
  },
};

const mockCalculatorResponse = {
  success: true,
  calculationId: 'mock-calc-123',
  results: {
    currentState: {
      monthlyLaborCost: 50000,
      monthlyOperationalCost: 25000,
      totalMonthlyCost: 75000,
      annualCost: 900000,
    },
    futureState: {
      totalMonthlyCost: 45000,
      annualCost: 540000,
      monthlySavings: 30000,
      annualSavings: 360000,
    },
    roi: {
      percentage: 120,
      paybackMonths: 8,
      firstYearNetSavings: 200000,
      fiveYearNetSavings: 1600000,
    },
    benefits: {
      productivityGain: '40%',
      capacityIncrease: '60%',
      hoursRecoveredMonthly: 120,
      costReduction: '40%',
    },
  },
};

export class ApiClient {
  private baseUrl: string;
  private isMock: boolean;

  constructor() {
    this.baseUrl = environment.api.baseUrl;
    this.isMock = environment.isStaticExport;
  }

  async submitLead(data: any) {
    if (this.isMock) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockLeadResponse;
    }

    const response = await fetch(`${this.baseUrl}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }

  async submitAssessment(data: any) {
    if (this.isMock) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return mockAssessmentResponse;
    }

    const response = await fetch(`${this.baseUrl}/assessment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }

  async getAssessmentQuestions() {
    if (this.isMock) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        questions: [
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
        ],
        totalQuestions: 5,
      };
    }

    const response = await fetch(`${this.baseUrl}/assessment`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }

  async calculateROI(data: any) {
    if (this.isMock) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      return mockCalculatorResponse;
    }

    const response = await fetch(`${this.baseUrl}/calculator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, type: 'roi' }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }

  async calculateProjectEstimate(data: any) {
    if (this.isMock) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        calculationId: 'mock-estimate-123',
        results: {
          pricing: {
            baseCost: 150000,
            featureCost: 30000,
            deliverableCost: 20000,
            subtotal: 200000,
            tax: 32000,
            total: 232000,
            currency: 'MXN',
          },
          timeline: {
            minWeeks: 4,
            maxWeeks: 8,
            urgency: 'standard',
          },
          breakdown: {
            projectType: 'consulting',
            complexity: 'moderate',
            deliverables: ['Strategy document', 'Implementation plan'],
            features: ['Workshop sessions', 'Team training'],
            teamSize: 'medium',
          },
        },
      };
    }

    const response = await fetch(`${this.baseUrl}/calculator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, type: 'project_estimate' }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();