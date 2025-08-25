'use client';

import { useState, useCallback } from 'react';
import type { LeadFormData, FormErrors } from '../types/leadForm';

export interface ValidationRules {
  [key: string]: (value: any) => string;
}

const defaultValidationRules: ValidationRules = {
  name: (value: string) => (value.length < 2 ? 'El nombre debe tener al menos 2 caracteres' : ''),
  email: (value: string) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email inválido' : ''),
};

export function useFormValidation(customRules: ValidationRules = {}) {
  const [errors, setErrors] = useState<FormErrors>({});
  const rules = { ...defaultValidationRules, ...customRules };

  const validateField = useCallback(
    (name: string, value: string | string[]) => {
      const rule = rules[name];
      if (rule) {
        const error = rule(value);
        setErrors(prev => ({ ...prev, [name]: error }));
        return error === '';
      }
      return true;
    },
    [rules]
  );

  const validateForm = useCallback(
    (formData: LeadFormData) => {
      const newErrors: FormErrors = {};
      let isValid = true;

      Object.entries(rules).forEach(([field, rule]) => {
        const value = formData[field as keyof LeadFormData];
        if (value !== undefined) {
          const error = rule(value);
          if (error) {
            newErrors[field] = error;
            isValid = false;
          }
        }
      });

      setErrors(newErrors);
      return isValid;
    },
    [rules]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError,
  };
}
