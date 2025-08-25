import type { ServiceTier } from '../constants/leadFormOptions';

export interface LeadFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  tier?: ServiceTier;
  industry?: string;
  companySize?: string;
  budget?: string;
  timeframe?: string;
  challenges?: string[];
  message?: string;
  source?: string;
}

export interface LeadFormProps {
  variant?: 'simple' | 'progressive' | 'detailed';
  tier?: ServiceTier;
  source?: string;
  title?: string;
  description?: string;
  submitText?: string;
  onSubmit?: (data: LeadFormData) => Promise<void>;
  onSuccess?: () => void;
  className?: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export type SubmitStatus = 'idle' | 'success' | 'error';
