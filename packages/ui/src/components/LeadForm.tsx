'use client';

import * as React from 'react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from './Button';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

type ServiceTier = 'L1_ESSENTIALS' | 'L2_ADVANCED' | 'L3_CONSULTING' | 'L4_PLATFORMS' | 'L5_STRATEGIC';

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

interface FormErrors {
  [key: string]: string | undefined;
}

const serviceOptions = [
  { value: 'L1_ESSENTIALS', label: 'L1 - Essentials (Diseño 3D y Gráficos)' },
  { value: 'L2_ADVANCED', label: 'L2 - Advanced (Diseño Paramétrico)' },
  { value: 'L3_CONSULTING', label: 'L3 - Consulting (Talleres y Consultoría)' },
  { value: 'L4_PLATFORMS', label: 'L4 - Platforms (SPARK y PENNY)' },
  { value: 'L5_STRATEGIC', label: 'L5 - Strategic (vCTO y Estrategia)' },
];

const industryOptions = [
  'Tecnología',
  'Manufactura',
  'Finanzas',
  'Salud',
  'Educación',
  'Retail',
  'Construcción',
  'Consultoría',
  'Servicios',
  'Otro',
];

const companySizeOptions = [
  '1-10 empleados',
  '11-50 empleados',
  '51-200 empleados',
  '201-1000 empleados',
  '1000+ empleados',
];

const budgetOptions = [
  'Menos de $50,000 MXN',
  '$50,000 - $200,000 MXN',
  '$200,000 - $500,000 MXN',
  '$500,000 - $1,000,000 MXN',
  'Más de $1,000,000 MXN',
];

const timeframeOptions = [
  'Inmediato (1-4 semanas)',
  'Corto plazo (1-3 meses)',
  'Mediano plazo (3-6 meses)',
  'Largo plazo (6+ meses)',
  'Solo explorando opciones',
];

const challengeOptions = [
  'Automatización de procesos',
  'Transformación digital',
  'Optimización de costos',
  'Mejora de eficiencia',
  'Innovación en productos',
  'Capacitación del equipo',
  'Implementación de IA',
  'Escalabilidad',
];

export const LeadForm = React.forwardRef<HTMLDivElement, LeadFormProps>(
  ({ 
    variant = 'simple', 
    tier, 
    source = 'website', 
    title = 'Solicita información', 
    description = 'Completa el formulario y nos pondremos en contacto contigo',
    submitText = 'Enviar solicitud',
    onSubmit, 
    onSuccess,
    className 
  }, ref) => {
    // Note: source will be used for analytics tracking
    const formSource = source;
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
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [currentStep, setCurrentStep] = useState(1);

    const validateField = (name: string, value: string | string[]) => {
      switch (name) {
        case 'name':
          return value.length < 2 ? 'El nombre debe tener al menos 2 caracteres' : '';
        case 'email':
          return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string) ? 'Email inválido' : '';
        default:
          return '';
      }
    };

    const handleInputChange = (name: string, value: string | string[]) => {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    };

    const handleChallengeToggle = (challenge: string) => {
      const currentChallenges = formData.challenges || [];
      const newChallenges = currentChallenges.includes(challenge)
        ? currentChallenges.filter(c => c !== challenge)
        : [...currentChallenges, challenge];
      
      handleInputChange('challenges', newChallenges);
    };

    const validateForm = () => {
      const newErrors: FormErrors = {};
      
      newErrors.name = validateField('name', formData.name);
      newErrors.email = validateField('email', formData.email);
      
      // Remove empty errors
      Object.keys(newErrors).forEach(key => {
        if (!newErrors[key]) delete newErrors[key];
      });
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateForm()) return;
      
      setIsSubmitting(true);
      setSubmitStatus('idle');
      
      try {
        // Simulate API delay for staging
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        await onSubmit?.({ ...formData, source: formSource });
        
        setSubmitStatus('success');
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
        });
        setCurrentStep(1);
        onSuccess?.();
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    };

    const renderSimpleForm = () => (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nombre *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={cn(
                'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent',
                errors.name ? 'border-red-500' : 'border-gray-300'
              )}
              placeholder="Tu nombre completo"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={cn(
                'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent',
                errors.email ? 'border-red-500' : 'border-gray-300'
              )}
              placeholder="tu@empresa.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Empresa
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
              placeholder="Nombre de tu empresa"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
              placeholder="+52 55 1234 5678"
            />
          </div>
        </div>

        {!tier && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Servicio de interés
            </label>
            <select
              value={formData.tier || ''}
              onChange={(e) => handleInputChange('tier', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
            >
              <option value="">Selecciona un servicio</option>
              {serviceOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">
            Mensaje
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
            placeholder="Cuéntanos sobre tu proyecto o necesidades..."
          />
        </div>
      </div>
    );

    const renderProgressiveForm = () => {
      const totalSteps = 3;
      
      return (
        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold',
                  step === currentStep 
                    ? 'bg-lavender text-white' 
                    : step < currentStep 
                      ? 'bg-leaf text-white' 
                      : 'bg-gray-200 text-gray-500'
                )}
              >
                {step}
              </div>
            ))}
          </div>

          {/* Step content */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={cn(
                      'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent',
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    )}
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={cn(
                      'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent',
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    )}
                    placeholder="tu@empresa.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
                    placeholder="+52 55 1234 5678"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Industria
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
                  >
                    <option value="">Selecciona industria</option>
                    {industryOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tamaño de empresa
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
                  >
                    <option value="">Selecciona tamaño</option>
                    {companySizeOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Presupuesto estimado
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
                  >
                    <option value="">Selecciona presupuesto</option>
                    {budgetOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Timeframe
                  </label>
                  <select
                    value={formData.timeframe}
                    onChange={(e) => handleInputChange('timeframe', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
                  >
                    <option value="">Selecciona timeframe</option>
                    {timeframeOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Principales desafíos (selecciona todos los que apliquen)
                </label>
                <div className="grid md:grid-cols-2 gap-2">
                  {challengeOptions.map(challenge => (
                    <label key={challenge} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.challenges?.includes(challenge) || false}
                        onChange={() => handleChallengeToggle(challenge)}
                        className="rounded border-gray-300 text-lavender focus:ring-lavender"
                      />
                      <span className="text-sm">{challenge}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Mensaje adicional
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
                  placeholder="Cuéntanos más sobre tu proyecto o necesidades específicas..."
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Anterior
            </Button>
            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={() => {
                  if (currentStep === 1 && !validateForm()) return;
                  setCurrentStep(Math.min(totalSteps, currentStep + 1));
                }}
              >
                Siguiente
              </Button>
            ) : (
              <Button type="submit" loading={isSubmitting}>
                {submitText}
              </Button>
            )}
          </div>
        </div>
      );
    };

    return (
      <Card ref={ref} className={cn('w-full max-w-2xl mx-auto', className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && (
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {variant === 'simple' && renderSimpleForm()}
            {variant === 'progressive' && renderProgressiveForm()}
            {variant === 'detailed' && renderSimpleForm()}

            {/* Status messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-leaf/10 border border-leaf/20 rounded-lg">
                <p className="text-leaf font-medium">
                  ¡Gracias! Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 font-medium">
                  Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo.
                </p>
              </div>
            )}

            {/* Submit button for simple form */}
            {variant === 'simple' && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  * Campos obligatorios
                </p>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting || submitStatus === 'success'}
                >
                  {submitText}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    );
  }
);

LeadForm.displayName = 'LeadForm';