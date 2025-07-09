'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@madfam/ui';
import { ServiceTier } from '@madfam/core';
import { useTranslations, useLocale } from 'next-intl';

const createLeadFormSchema = (t: any) => z.object({
  name: z.string().min(2, t('errors.nameMin')),
  email: z.string().email(t('errors.emailInvalid')),
  company: z.string().optional(),
  phone: z.string().optional(),
  tier: z.nativeEnum(ServiceTier).optional(),
  message: z.string().optional(),
});

type LeadFormData = z.infer<ReturnType<typeof createLeadFormSchema>>;

interface LeadFormProps {
  tier?: ServiceTier;
  source?: string;
  onSuccess?: () => void;
}

export function LeadForm({ tier, source = 'website', onSuccess }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const t = useTranslations('leadForm');
  const locale = useLocale();
  
  const leadFormSchema = createLeadFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      tier,
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // In staging environment, simulate submission without API call
    if (process.env.NEXT_PUBLIC_ENV === 'staging') {
      console.log('Staging environment - Lead form submission:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      reset();
      onSuccess?.();
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source,
          preferredLanguage: locale,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        reset();
        onSuccess?.();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.name')} *
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
            placeholder={t('placeholders.name')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.email')} *
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
            placeholder={t('placeholders.email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.company')}
          </label>
          <input
            {...register('company')}
            type="text"
            id="company"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
            placeholder={t('placeholders.company')}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.phone')}
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
            placeholder={t('placeholders.phone')}
          />
        </div>
      </div>

      {!tier && (
        <div>
          <label htmlFor="tier" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.tier')}
          </label>
          <select
            {...register('tier')}
            id="tier"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
          >
            <option value="">{t('tiers.select')}</option>
            <option value={ServiceTier.L1_ESSENTIALS}>{t('tiers.l1')}</option>
            <option value={ServiceTier.L2_ADVANCED}>{t('tiers.l2')}</option>
            <option value={ServiceTier.L3_CONSULTING}>{t('tiers.l3')}</option>
            <option value={ServiceTier.L4_PLATFORMS}>{t('tiers.l4')}</option>
            <option value={ServiceTier.L5_STRATEGIC}>{t('tiers.l5')}</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {t('fields.message')}
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
          placeholder={t('placeholders.message')}
        />
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-leaf/10 border border-leaf/20 rounded-lg">
          <p className="text-leaf font-medium">
            {t('messages.success')}
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">
            {t('messages.error')}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          * {t('requiredFields')}
        </p>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting || submitStatus === 'success'}
        >
          {t('submit')}
        </Button>
      </div>
    </form>
  );
}