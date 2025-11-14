'use client';

import * as React from 'react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Button } from './Button';

// Service tier type - import from @madfam/core when available
type ServiceTier =
  | 'L1_ESSENTIALS'
  | 'L2_ADVANCED'
  | 'L3_CONSULTING'
  | 'L4_PLATFORMS'
  | 'L5_STRATEGIC';

export interface ROICalculatorProps {
  serviceTier?: ServiceTier;
  title?: string;
  currency?: 'MXN' | 'USD';
  variant?: 'compact' | 'full';
  className?: string;
  onCalculate?: (results: ROIResults) => void;
}

export interface ROIResults {
  monthlySavings: number;
  timeSaved: number;
  roiPercentage: number;
  paybackPeriod: number;
  totalBenefit: number;
  investment: number;
}

interface FormData {
  currentCosts: number;
  employeeHours: number;
  projectsPerMonth: number;
  averageProjectValue: number;
}

// Service tier pricing (MXN)
const servicePricing: Record<ServiceTier, number> = {
  L1_ESSENTIALS: 5000,
  L2_ADVANCED: 15000,
  L3_CONSULTING: 50000,
  L4_PLATFORMS: 150000,
  L5_STRATEGIC: 500000,
};

// Efficiency and cost reduction multipliers per tier
const tierMultipliers: Record<ServiceTier, { efficiency: number; costReduction: number }> = {
  L1_ESSENTIALS: { efficiency: 0.15, costReduction: 0.1 },
  L2_ADVANCED: { efficiency: 0.25, costReduction: 0.2 },
  L3_CONSULTING: { efficiency: 0.35, costReduction: 0.25 },
  L4_PLATFORMS: { efficiency: 0.5, costReduction: 0.35 },
  L5_STRATEGIC: { efficiency: 0.7, costReduction: 0.5 },
};

export const ROICalculator = React.forwardRef<HTMLDivElement, ROICalculatorProps>(
  (
    {
      serviceTier = 'L3_CONSULTING',
      title = 'ROI Calculator',
      currency = 'MXN',
      variant = 'full',
      className,
      onCalculate,
    },
    ref
  ) => {
    const [formData, setFormData] = useState<FormData>({
      currentCosts: 50000,
      employeeHours: 160,
      projectsPerMonth: 5,
      averageProjectValue: 20000,
    });

    const [results, setResults] = useState<ROIResults | null>(null);

    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('es', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0,
      }).format(value);
    };

    const formatNumber = (value: number) => {
      return new Intl.NumberFormat('es').format(value);
    };

    const calculateROI = () => {
      const { currentCosts, employeeHours, projectsPerMonth, averageProjectValue } = formData;
      const multipliers = tierMultipliers[serviceTier];

      const monthlySavings = currentCosts * multipliers.costReduction;
      const timeSaved = employeeHours * multipliers.efficiency;
      const additionalRevenue = projectsPerMonth * multipliers.efficiency * averageProjectValue;
      const totalBenefit = monthlySavings + additionalRevenue / 12;
      const investment = servicePricing[serviceTier];
      const roiPercentage = ((totalBenefit * 12 - investment) / investment) * 100;
      const paybackPeriod = investment / totalBenefit;

      const calculatedResults: ROIResults = {
        monthlySavings: Math.round(monthlySavings),
        timeSaved: Math.round(timeSaved),
        roiPercentage: Math.round(roiPercentage),
        paybackPeriod: Math.round(paybackPeriod * 10) / 10,
        totalBenefit: Math.round(totalBenefit),
        investment,
      };

      setResults(calculatedResults);
      onCalculate?.(calculatedResults);
    };

    const InputSlider = ({
      label,
      value,
      onChange,
      min,
      max,
      step = 1,
      format = 'number',
      unit = '',
    }: {
      label: string;
      value: number;
      onChange: (value: number) => void;
      min: number;
      max: number;
      step?: number;
      format?: 'number' | 'currency';
      unit?: string;
    }) => (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
        />
        <div className="text-right text-sm font-mono text-lavender">
          {format === 'currency' ? formatCurrency(value) : formatNumber(value)} {unit}
        </div>
      </div>
    );

    const ResultCard = ({
      icon,
      title,
      value,
      subtitle,
      color = 'sun',
    }: {
      icon: React.ReactNode;
      title: string;
      value: string;
      subtitle?: string;
      color?: 'sun' | 'lavender' | 'leaf';
    }) => (
      <div
        className={cn(
          'rounded-xl p-6 bg-gradient-to-r',
          color === 'sun' && 'from-sun/10 to-leaf/10',
          color === 'lavender' && 'from-lavender/10 to-sun/10',
          color === 'leaf' && 'from-leaf/10 to-lavender/10'
        )}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              'w-6 h-6',
              color === 'sun' && 'text-sun',
              color === 'lavender' && 'text-lavender',
              color === 'leaf' && 'text-leaf'
            )}
          >
            {icon}
          </div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
        </div>
        <p
          className={cn(
            'text-3xl font-heading font-bold',
            color === 'sun' && 'text-sun',
            color === 'lavender' && 'text-lavender',
            color === 'leaf' && 'text-leaf'
          )}
        >
          {value}
        </p>
        {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
    );

    if (variant === 'compact') {
      return (
        <Card ref={ref} className={cn('w-full', className)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="w-5 h-5 text-sun" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <InputSlider
                label="Costos mensuales actuales"
                value={formData.currentCosts}
                onChange={value => setFormData({ ...formData, currentCosts: value })}
                min={10000}
                max={500000}
                step={5000}
                format="currency"
              />
              <InputSlider
                label="Horas de empleados por mes"
                value={formData.employeeHours}
                onChange={value => setFormData({ ...formData, employeeHours: value })}
                min={40}
                max={500}
                step={10}
                unit="hrs"
              />
              <Button onClick={calculateROI} variant="creative" className="w-full">
                Calcular ROI
              </Button>
              {results && (
                <>
                  <div className="mt-4 p-4 bg-gradient-to-r from-sun/10 to-leaf/10 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">ROI Estimado</p>
                      <p className="text-2xl font-heading font-bold text-leaf">
                        {results.roiPercentage}%
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ahorro mensual: {formatCurrency(results.monthlySavings)}
                      </p>
                    </div>
                  </div>

                  {/* Conversion CTA - Compact */}
                  <div className="mt-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="text-2xl">🚀</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-neutral-900 mb-1">
                          Make this ROI a reality
                        </h4>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          Book a free strategy session to discuss your customized roadmap.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a
                        href="https://calendly.com/madfam/strategy-call"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                      >
                        Book Free Call
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card ref={ref} className={cn('w-full', className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <svg className="w-8 h-8 text-sun" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <InputSlider
                label="Costos operativos mensuales actuales"
                value={formData.currentCosts}
                onChange={value => setFormData({ ...formData, currentCosts: value })}
                min={10000}
                max={500000}
                step={5000}
                format="currency"
              />
              <InputSlider
                label="Horas de empleados por mes"
                value={formData.employeeHours}
                onChange={value => setFormData({ ...formData, employeeHours: value })}
                min={40}
                max={500}
                step={10}
                unit="hrs"
              />
              <InputSlider
                label="Proyectos por mes"
                value={formData.projectsPerMonth}
                onChange={value => setFormData({ ...formData, projectsPerMonth: value })}
                min={1}
                max={20}
                unit="proyectos"
              />
              <InputSlider
                label="Valor promedio por proyecto"
                value={formData.averageProjectValue}
                onChange={value => setFormData({ ...formData, averageProjectValue: value })}
                min={5000}
                max={200000}
                step={5000}
                format="currency"
              />
              <Button onClick={calculateROI} variant="creative" className="w-full">
                Calcular ROI
              </Button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {results ? (
                <div className="space-y-4 animate-fade-in">
                  <ResultCard
                    icon={
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    title="Ahorro Mensual"
                    value={formatCurrency(results.monthlySavings)}
                    color="sun"
                  />
                  <ResultCard
                    icon={
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    title="Tiempo Recuperado"
                    value={`${formatNumber(results.timeSaved)} hrs`}
                    subtitle="Por mes"
                    color="lavender"
                  />
                  <ResultCard
                    icon={
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    title="ROI Anual"
                    value={`${results.roiPercentage}%`}
                    subtitle={`Retorno en ${formatNumber(results.paybackPeriod)} meses`}
                    color="leaf"
                  />
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      * Estimaciones basadas en datos promedio de la industria y casos de éxito
                      previos. Los resultados pueden variar según el contexto específico de cada
                      empresa.
                    </p>
                  </div>

                  {/* Conversion CTA */}
                  <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">🚀</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-neutral-900 mb-2">
                          Ready to make this ROI a reality?
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          Schedule a free 30-minute strategy session to discuss how we can help you
                          achieve these results. We'll create a customized implementation roadmap
                          tailored to your specific operational needs.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="https://calendly.com/madfam/strategy-call"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Book Free Strategy Call
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </a>
                      <a
                        href="/contact"
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                      >
                        Contact Our Team
                      </a>
                    </div>
                    <p className="text-xs text-neutral-500 text-center">
                      No commitment required • Typical response time: 24 hours
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">
                      Ajusta los parámetros y calcula tu ROI estimado
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

ROICalculator.displayName = 'ROICalculator';
