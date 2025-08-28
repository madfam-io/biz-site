import { ServiceTier } from '@madfam/core';

/**
 * UI ServiceTier type used in UI components
 * This matches the format expected by ROICalculator and LeadForm
 */
export type UIServiceTier =
  | 'L1_ESSENTIALS'
  | 'L2_ADVANCED'
  | 'L3_CONSULTING'
  | 'L4_PLATFORMS'
  | 'L5_STRATEGIC';

/**
 * Maps core ServiceTier enum values to UI component tier format
 * This provides a clean abstraction between business logic and UI components
 */
export function mapServiceTierToUI(tier: ServiceTier): UIServiceTier {
  const mapping: Record<ServiceTier, UIServiceTier> = {
    [ServiceTier.L1_ESSENTIALS]: 'L1_ESSENTIALS',
    [ServiceTier.L2_ADVANCED]: 'L2_ADVANCED',
    [ServiceTier.L3_CONSULTING]: 'L3_CONSULTING',
    [ServiceTier.L4_PLATFORMS]: 'L4_PLATFORMS',
    [ServiceTier.L5_STRATEGIC]: 'L5_STRATEGIC',
  };

  return mapping[tier];
}

/**
 * Maps UI tier format back to core ServiceTier enum
 * Useful for API calls and business logic
 */
export function mapUIToServiceTier(uiTier: UIServiceTier): ServiceTier {
  const mapping: Record<UIServiceTier, ServiceTier> = {
    L1_ESSENTIALS: ServiceTier.L1_ESSENTIALS,
    L2_ADVANCED: ServiceTier.L2_ADVANCED,
    L3_CONSULTING: ServiceTier.L3_CONSULTING,
    L4_PLATFORMS: ServiceTier.L4_PLATFORMS,
    L5_STRATEGIC: ServiceTier.L5_STRATEGIC,
  };

  return mapping[uiTier];
}

/**
 * Gets the UI tier for a specific service level
 * This is useful when you know the exact service level at compile time
 */
export const SERVICE_TIER_UI = {
  L1_ESSENTIALS: 'L1_ESSENTIALS' as const,
  L2_ADVANCED: 'L2_ADVANCED' as const,
  L3_CONSULTING: 'L3_CONSULTING' as const,
  L4_PLATFORMS: 'L4_PLATFORMS' as const,
  L5_STRATEGIC: 'L5_STRATEGIC' as const,
} as const;
