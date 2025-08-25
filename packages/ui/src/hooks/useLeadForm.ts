'use client';

import { useState, useCallback } from 'react';
import type { LeadFormData, LeadFormProps, SubmitStatus } from '../types/leadForm';
import { useFormValidation } from './useFormValidation';

export function useLeadForm(props: LeadFormProps) {
  const { tier, source = 'website', onSubmit, onSuccess } = props;

  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    tier,
    industry: '',
    companySize: '',
    budget: '',
    timeframe: '',
    challenges: [],
    message: '',
    source,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [currentStep, setCurrentStep] = useState(1);

  const { errors, validateField, validateForm, clearFieldError } = useFormValidation();

  const handleInputChange = useCallback(
    (name: keyof LeadFormData, value: string) => {
      setFormData(prev => ({ ...prev, [name]: value }));
      clearFieldError(name);
    },
    [clearFieldError]
  );

  const handleChallengeToggle = useCallback((challenge: string) => {
    setFormData(prev => {
      const challenges = prev.challenges || [];
      const updatedChallenges = challenges.includes(challenge)
        ? challenges.filter(c => c !== challenge)
        : [...challenges, challenge];

      return { ...prev, challenges: updatedChallenges };
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm(formData)) {
        return;
      }

      setIsSubmitting(true);
      setSubmitStatus('idle');

      try {
        if (onSubmit) {
          await onSubmit(formData);
        } else {
          // Default submission behavior
          const response = await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        setSubmitStatus('success');

        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          tier,
          industry: '',
          companySize: '',
          budget: '',
          timeframe: '',
          challenges: [],
          message: '',
          source,
        });

        onSuccess?.();
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, onSubmit, onSuccess, tier, source]
  );

  return {
    formData,
    handleInputChange,
    handleChallengeToggle,
    handleSubmit,
    errors,
    validateField,
    isSubmitting,
    submitStatus,
    currentStep,
    setCurrentStep,
  };
}
