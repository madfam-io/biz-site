"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ChevronLeft, DollarSign, Clock, Users } from 'lucide-react';
import { Button } from '@madfam/ui';
import { ServiceTier } from '@madfam/core';

interface ProjectRequirements {
  projectType: string;
  complexity: 'simple' | 'medium' | 'complex';
  features: string[];
  timeline: 'urgent' | 'normal' | 'flexible';
  teamSize: 'small' | 'medium' | 'large';
  industry: string;
}

interface ProjectEstimate {
  serviceTier: ServiceTier;
  estimatedCost: { min: number; max: number };
  estimatedDuration: { min: number; max: number };
  recommendedTeam: string[];
  suggestedFeatures: string[];
}

const projectTypes = [
  { id: 'web-app', name: 'Aplicación Web', icon: '🌐' },
  { id: 'mobile-app', name: 'App Móvil', icon: '📱' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'automation', name: 'Automatización', icon: '🤖' },
  { id: 'consulting', name: 'Consultoría', icon: '💡' },
  { id: 'custom', name: 'Proyecto Personalizado', icon: '🎯' },
];

const features = [
  { id: 'ai-integration', name: 'Integración de IA', category: 'tech' },
  { id: 'real-time', name: 'Tiempo Real', category: 'tech' },
  { id: 'payment', name: 'Procesamiento de Pagos', category: 'business' },
  { id: 'analytics', name: 'Analytics Avanzado', category: 'business' },
  { id: 'multi-language', name: 'Multi-idioma', category: 'ux' },
  { id: 'offline', name: 'Funcionalidad Offline', category: 'ux' },
  { id: 'notifications', name: 'Notificaciones Push', category: 'engagement' },
  { id: 'social-login', name: 'Login Social', category: 'auth' },
  { id: 'api', name: 'API REST/GraphQL', category: 'tech' },
  { id: 'admin-panel', name: 'Panel de Administración', category: 'management' },
];

const industries = [
  'Retail',
  'Fintech',
  'Salud',
  'Educación',
  'Manufactura',
  'Servicios',
  'Gobierno',
  'ONG',
  'Otro',
];

export function ProjectEstimator() {
  const [step, setStep] = useState(1);
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    projectType: '',
    complexity: 'medium',
    features: [],
    timeline: 'normal',
    teamSize: 'medium',
    industry: '',
  });
  const [estimate, setEstimate] = useState<ProjectEstimate | null>(null);

  const calculateEstimate = () => {
    // Base costs and durations by project type
    const baseCosts = {
      'web-app': { min: 50000, max: 150000 },
      'mobile-app': { min: 80000, max: 200000 },
      'ecommerce': { min: 100000, max: 300000 },
      'automation': { min: 30000, max: 100000 },
      'consulting': { min: 50000, max: 200000 },
      'custom': { min: 100000, max: 500000 },
    };

    const baseDurations = {
      'web-app': { min: 2, max: 4 },
      'mobile-app': { min: 3, max: 6 },
      'ecommerce': { min: 3, max: 6 },
      'automation': { min: 1, max: 3 },
      'consulting': { min: 2, max: 6 },
      'custom': { min: 3, max: 12 },
    };

    // Complexity multipliers
    const complexityMultipliers = {
      simple: 0.7,
      medium: 1.0,
      complex: 1.5,
    };

    // Timeline multipliers
    const timelineMultipliers = {
      urgent: 1.3,
      normal: 1.0,
      flexible: 0.9,
    };

    // Feature cost additions (per feature)
    const featureCosts = 5000;

    // Calculate base values
    const projectBase = baseCosts[requirements.projectType as keyof typeof baseCosts] || baseCosts.custom;
    const durationBase = baseDurations[requirements.projectType as keyof typeof baseDurations] || baseDurations.custom;

    // Apply multipliers
    const complexityMultiplier = complexityMultipliers[requirements.complexity];
    const timelineMultiplier = timelineMultipliers[requirements.timeline];
    const featureAddition = requirements.features.length * featureCosts;

    // Calculate final estimates
    const estimatedCost = {
      min: Math.round((projectBase.min * complexityMultiplier * timelineMultiplier) + featureAddition),
      max: Math.round((projectBase.max * complexityMultiplier * timelineMultiplier) + featureAddition),
    };

    const estimatedDuration = {
      min: Math.round(durationBase.min * complexityMultiplier),
      max: Math.round(durationBase.max * complexityMultiplier),
    };

    // Determine service tier based on cost
    let serviceTier: ServiceTier;
    const avgCost = (estimatedCost.min + estimatedCost.max) / 2;
    if (avgCost < 30000) {
      serviceTier = ServiceTier.L1_ESSENTIALS;
    } else if (avgCost < 80000) {
      serviceTier = ServiceTier.L2_ADVANCED;
    } else if (avgCost < 150000) {
      serviceTier = ServiceTier.L3_CONSULTING;
    } else if (avgCost < 300000) {
      serviceTier = ServiceTier.L4_PLATFORMS;
    } else {
      serviceTier = ServiceTier.L5_STRATEGIC;
    }

    // Recommend team based on project
    const recommendedTeam = [];
    if (requirements.projectType === 'mobile-app') {
      recommendedTeam.push('Desarrollador iOS/Android', 'Diseñador UI/UX');
    }
    if (requirements.features.includes('ai-integration')) {
      recommendedTeam.push('Ingeniero de IA/ML');
    }
    if (requirements.complexity === 'complex') {
      recommendedTeam.push('Arquitecto de Software', 'Project Manager');
    }
    recommendedTeam.push('Desarrollador Full Stack', 'QA Engineer');

    // Suggest additional features
    const suggestedFeatures = [];
    if (!requirements.features.includes('analytics') && requirements.projectType !== 'consulting') {
      suggestedFeatures.push('Analytics Dashboard');
    }
    if (!requirements.features.includes('api') && ['web-app', 'mobile-app'].includes(requirements.projectType)) {
      suggestedFeatures.push('API para Integraciones Futuras');
    }

    setEstimate({
      serviceTier,
      estimatedCost,
      estimatedDuration,
      recommendedTeam,
      suggestedFeatures,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">¿Qué tipo de proyecto necesitas?</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setRequirements({ ...requirements, projectType: type.id });
                    setStep(2);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    requirements.projectType === type.id
                      ? 'border-sun bg-sun/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-sun/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="font-medium">{type.name}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">¿Cuál es la complejidad del proyecto?</h3>
            <div className="space-y-3">
              {[
                { value: 'simple', label: 'Simple', description: 'Funcionalidad básica, diseño estándar' },
                { value: 'medium', label: 'Medio', description: 'Funciones personalizadas, integración moderada' },
                { value: 'complex', label: 'Complejo', description: 'Arquitectura avanzada, múltiples integraciones' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setRequirements({ ...requirements, complexity: option.value as any });
                    setStep(3);
                  }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    requirements.complexity === option.value
                      ? 'border-sun bg-sun/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-sun/50'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">¿Qué características necesitas?</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((feature) => (
                <label
                  key={feature.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    requirements.features.includes(feature.id)
                      ? 'border-sun bg-sun/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-sun/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={requirements.features.includes(feature.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRequirements({
                          ...requirements,
                          features: [...requirements.features, feature.id],
                        });
                      } else {
                        setRequirements({
                          ...requirements,
                          features: requirements.features.filter((f) => f !== feature.id),
                        });
                      }
                    }}
                    className="sr-only"
                  />
                  <div className="flex-1">{feature.name}</div>
                </label>
              ))}
            </div>
            <Button
              onClick={() => setStep(4)}
              variant="primary"
              className="w-full"
            >
              Continuar
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">¿Cuál es tu línea de tiempo?</h3>
            <div className="space-y-3">
              {[
                { value: 'urgent', label: 'Urgente', description: 'Necesito empezar de inmediato' },
                { value: 'normal', label: 'Normal', description: '1-2 meses para empezar' },
                { value: 'flexible', label: 'Flexible', description: 'Sin prisa específica' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setRequirements({ ...requirements, timeline: option.value as any });
                    setStep(5);
                  }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    requirements.timeline === option.value
                      ? 'border-sun bg-sun/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-sun/50'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">¿En qué industria operas?</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => {
                    setRequirements({ ...requirements, industry });
                    calculateEstimate();
                    setStep(6);
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    requirements.industry === industry
                      ? 'border-sun bg-sun/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-sun/50'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return estimate ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold mb-4">Tu estimación personalizada</h3>
            
            {/* Cost Estimate */}
            <div className="bg-gradient-to-r from-sun/10 to-leaf/10 dark:from-sun/20 dark:to-leaf/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-sun" />
                <h4 className="font-semibold">Inversión estimada</h4>
              </div>
              <p className="text-2xl font-heading">
                {formatCurrency(estimate.estimatedCost.min)} - {formatCurrency(estimate.estimatedCost.max)}
              </p>
            </div>

            {/* Duration Estimate */}
            <div className="bg-gradient-to-r from-lavender/10 to-sun/10 dark:from-lavender/20 dark:to-sun/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-lavender" />
                <h4 className="font-semibold">Duración estimada</h4>
              </div>
              <p className="text-2xl font-heading">
                {estimate.estimatedDuration.min} - {estimate.estimatedDuration.max} meses
              </p>
            </div>

            {/* Recommended Team */}
            <div className="bg-gradient-to-r from-leaf/10 to-lavender/10 dark:from-leaf/20 dark:to-lavender/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-leaf" />
                <h4 className="font-semibold">Equipo recomendado</h4>
              </div>
              <ul className="space-y-1">
                {estimate.recommendedTeam.map((role, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-leaf">•</span>
                    {role}
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested Features */}
            {estimate.suggestedFeatures.length > 0 && (
              <div className="p-4 bg-obsidian/5 dark:bg-obsidian/20 rounded-lg">
                <p className="text-sm font-medium mb-2">También podrías considerar:</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {estimate.suggestedFeatures.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => window.location.href = '/contact'}
              >
                Solicitar propuesta detallada
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setStep(1);
                  setRequirements({
                    projectType: '',
                    complexity: 'medium',
                    features: [],
                    timeline: 'normal',
                    teamSize: 'medium',
                    industry: '',
                  });
                  setEstimate(null);
                }}
              >
                Hacer otra estimación
              </Button>
            </div>
          </motion.div>
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-8 h-8 text-sun" />
        <h2 className="font-heading text-2xl">Estimador de Proyectos</h2>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Paso {step} de 6
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {Math.round((step / 6) * 100)}% completado
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sun to-leaf"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 6) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Content */}
      {renderStep()}

      {/* Navigation */}
      {step > 1 && step < 6 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver
        </button>
      )}
    </div>
  );
}