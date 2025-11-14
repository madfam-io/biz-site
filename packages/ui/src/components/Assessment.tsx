/**
 * Re-export for Backward Compatibility
 *
 * This file re-exports the refactored Assessment component and types from './assessment/'
 *
 * Architecture Note:
 * - The actual implementation is in ./assessment/Assessment.tsx (modular structure)
 * - This re-export provides a clean public API for package consumers
 * - Not a duplicate - proper separation of public API vs internal implementation
 *
 * @see ./assessment/Assessment.tsx for implementation details
 */
export { Assessment } from './assessment/Assessment';
export type { AssessmentProps, AssessmentResult } from './assessment/types';
export type { AssessmentQuestion } from './assessment/types';
export type { AssessmentQuestion as AssessmentQuestionType } from './assessment/types';
export { defaultAssessmentQuestions } from './assessment/assessment-data';
export { getDefaultTranslations } from './assessment/assessment-translations';
