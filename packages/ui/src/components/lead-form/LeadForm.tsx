'use client';

import * as React from 'react';
import { Button } from '../Button';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';
import { cn } from '../../lib/utils';
import { useLeadForm } from '../../hooks/useLeadForm';
import type { LeadFormProps } from '../../types/leadForm';
import { BasicInfoStep } from './BasicInfoStep';
import { ProjectDetailsStep } from './ProjectDetailsStep';
import { AdditionalInfoStep } from './AdditionalInfoStep';

export const LeadForm = React.forwardRef<HTMLDivElement, LeadFormProps>(
  (
    {
      variant = 'simple',
      source = 'website',
      title = 'Solicita información',
      description = 'Completa el formulario y nos pondremos en contacto contigo',
      submitText = 'Enviar solicitud',
      onSubmit,
      onSuccess,
      className,
    },
    ref
  ) => {
    const {
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
    } = useLeadForm({ variant, source, onSubmit, onSuccess });

    const totalSteps = variant === 'progressive' ? 3 : 1;

    const getStepTitle = (step: number) => {
      switch (step) {
        case 1:
          return 'Información básica';
        case 2:
          return 'Detalles del proyecto';
        case 3:
          return 'Información adicional';
        default:
          return '';
      }
    };

    const renderCurrentStep = () => {
      if (variant === 'simple') {
        return (
          <div className="space-y-6">
            <BasicInfoStep
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onValidateField={validateField}
            />
            <ProjectDetailsStep formData={formData} onInputChange={handleInputChange} />
            <AdditionalInfoStep
              formData={formData}
              onInputChange={handleInputChange}
              onChallengeToggle={handleChallengeToggle}
            />
          </div>
        );
      }

      switch (currentStep) {
        case 1:
          return (
            <BasicInfoStep
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onValidateField={validateField}
            />
          );
        case 2:
          return <ProjectDetailsStep formData={formData} onInputChange={handleInputChange} />;
        case 3:
          return (
            <AdditionalInfoStep
              formData={formData}
              onInputChange={handleInputChange}
              onChallengeToggle={handleChallengeToggle}
            />
          );
        default:
          return null;
      }
    };

    const canProceed = () => {
      if (currentStep === 1) {
        return formData.name.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      }
      return true;
    };

    if (submitStatus === 'success') {
      return (
        <Card ref={ref} className={cn('w-full max-w-2xl mx-auto', className)}>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">¡Gracias por tu interés!</h3>
            <p className="text-gray-600">
              Hemos recibido tu solicitud. Nos pondremos en contacto contigo dentro de las próximas
              24 horas.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card ref={ref} className={cn('w-full max-w-2xl mx-auto', className)}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
          {description && <p className="text-gray-600 text-center">{description}</p>}
          {variant === 'progressive' && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {getStepTitle(currentStep)}
                </span>
                <span className="text-sm text-gray-500">
                  {currentStep} de {totalSteps}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-lavender h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderCurrentStep()}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  Ha ocurrido un error al enviar el formulario. Por favor, inténtalo de nuevo.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              {variant === 'progressive' && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Anterior
                </Button>
              )}

              {variant === 'progressive' && currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={() => {
                    if (!canProceed()) return;
                    setCurrentStep(Math.min(totalSteps, currentStep + 1));
                  }}
                  disabled={!canProceed()}
                  className="ml-auto"
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={variant === 'progressive' && !canProceed()}
                  className={variant === 'progressive' ? 'ml-auto' : 'w-full'}
                >
                  {submitText}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
);

LeadForm.displayName = 'LeadForm';
