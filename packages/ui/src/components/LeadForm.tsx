'use client';

/**
 * Legacy Re-export for Backward Compatibility
 *
 * This file re-exports the modular LeadForm component from './lead-form/'
 *
 * Architecture Note:
 * - This is a MULTI-STEP, feature-rich implementation for reusable UI
 * - For simpler, app-specific forms, see apps/web/components/LeadForm.tsx
 * - Both implementations serve different purposes and are NOT duplicates
 *
 * @deprecated Import directly from './lead-form' for new code
 */
export { LeadForm } from './lead-form';
export type { LeadFormData, LeadFormProps, FormErrors, SubmitStatus } from './lead-form';
export type { SelectOption } from '../constants/leadFormOptions';
