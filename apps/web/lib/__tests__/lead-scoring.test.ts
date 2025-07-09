import { describe, it, expect } from 'vitest';
import { ServiceTier } from '@madfam/core';

// Mock lead scoring function (copied from API route)
function calculateLeadScore(lead: any): number {
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

describe('Lead Scoring Algorithm', () => {
  it('should score personal email addresses lower', () => {
    const personalLead = {
      email: 'john@gmail.com',
      name: 'John Doe',
    };
    
    const businessLead = {
      email: 'john@company.com',
      name: 'John Doe',
    };

    expect(calculateLeadScore(personalLead)).toBe(0);
    expect(calculateLeadScore(businessLead)).toBe(20);
  });

  it('should increase score with more information provided', () => {
    const basicLead = {
      email: 'contact@company.com',
      name: 'Jane Doe',
    };

    const detailedLead = {
      email: 'contact@company.com',
      name: 'Jane Doe',
      company: 'Tech Corp',
      phone: '+1234567890',
      message: 'We are interested in implementing AI solutions for our operations department.',
    };

    expect(calculateLeadScore(basicLead)).toBe(20);
    expect(calculateLeadScore(detailedLead)).toBe(60);
  });

  it('should score higher for advanced service tiers', () => {
    const l1Lead = {
      email: 'contact@company.com',
      tier: ServiceTier.L1_ESSENTIALS,
    };

    const l5Lead = {
      email: 'contact@company.com',
      tier: ServiceTier.L5_STRATEGIC,
    };

    expect(calculateLeadScore(l1Lead)).toBe(30); // 20 + 10
    expect(calculateLeadScore(l5Lead)).toBe(70); // 20 + 50
  });

  it('should cap score at 100', () => {
    const perfectLead = {
      email: 'ceo@fortune500.com',
      company: 'Fortune 500 Corp',
      phone: '+1234567890',
      tier: ServiceTier.L5_STRATEGIC,
      message: 'We need a comprehensive digital transformation strategy with immediate implementation.',
    };

    expect(calculateLeadScore(perfectLead)).toBe(100);
  });

  it('should handle missing optional fields gracefully', () => {
    const minimalLead = {
      email: 'test@test.com',
      name: 'Test User',
    };

    expect(() => calculateLeadScore(minimalLead)).not.toThrow();
    expect(calculateLeadScore(minimalLead)).toBeGreaterThanOrEqual(0);
  });
});