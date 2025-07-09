"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { Button } from '@madfam/ui';
import { ServiceTier } from '@madfam/core';

interface ROICalculatorProps {
  serviceTier?: ServiceTier;
}

export function ROICalculator({ serviceTier }: ROICalculatorProps) {
  const [formData, setFormData] = useState({
    currentCosts: 50000,
    employeeHours: 160,
    projectsPerMonth: 5,
    averageProjectValue: 20000,
  });

  const [results, setResults] = useState<{
    monthlySavings: number;
    timeSaved: number;
    roiPercentage: number;
    paybackPeriod: number;
  } | null>(null);

  // Service tier pricing (MXN)
  const servicePricing = {
    [ServiceTier.L1_ESSENTIALS]: 5000,
    [ServiceTier.L2_ADVANCED]: 15000,
    [ServiceTier.L3_CONSULTING]: 50000,
    [ServiceTier.L4_PLATFORMS]: 150000,
    [ServiceTier.L5_STRATEGIC]: 500000,
  };

  const calculateROI = () => {
    const { currentCosts, employeeHours, projectsPerMonth, averageProjectValue } = formData;
    
    // Base calculations vary by service tier
    let efficiencyGain = 0.2; // 20% base efficiency gain
    let costReduction = 0.15; // 15% base cost reduction
    
    switch (serviceTier) {
      case ServiceTier.L1_ESSENTIALS:
        efficiencyGain = 0.15;
        costReduction = 0.1;
        break;
      case ServiceTier.L2_ADVANCED:
        efficiencyGain = 0.25;
        costReduction = 0.2;
        break;
      case ServiceTier.L3_CONSULTING:
        efficiencyGain = 0.35;
        costReduction = 0.25;
        break;
      case ServiceTier.L4_PLATFORMS:
        efficiencyGain = 0.5;
        costReduction = 0.35;
        break;
      case ServiceTier.L5_STRATEGIC:
        efficiencyGain = 0.7;
        costReduction = 0.5;
        break;
    }

    const monthlySavings = currentCosts * costReduction;
    const timeSaved = employeeHours * efficiencyGain;
    const additionalRevenue = (projectsPerMonth * efficiencyGain) * averageProjectValue;
    const totalBenefit = monthlySavings + (additionalRevenue / 12);
    const investment = servicePricing[serviceTier || ServiceTier.L3_CONSULTING];
    const roiPercentage = ((totalBenefit * 12 - investment) / investment) * 100;
    const paybackPeriod = investment / totalBenefit;

    setResults({
      monthlySavings: Math.round(monthlySavings),
      timeSaved: Math.round(timeSaved),
      roiPercentage: Math.round(roiPercentage),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-8 h-8 text-sun" />
        <h3 className="font-heading text-2xl">Calculadora de ROI</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Costos operativos mensuales actuales
            </label>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={formData.currentCosts}
              onChange={(e) => setFormData({ ...formData, currentCosts: Number(e.target.value) })}
              className="w-full"
            />
            <div className="text-right mt-1 font-mono text-sun">
              {formatCurrency(formData.currentCosts)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Horas de empleados por mes
            </label>
            <input
              type="range"
              min="40"
              max="500"
              step="10"
              value={formData.employeeHours}
              onChange={(e) => setFormData({ ...formData, employeeHours: Number(e.target.value) })}
              className="w-full"
            />
            <div className="text-right mt-1 font-mono text-sun">
              {formData.employeeHours} horas
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Proyectos por mes
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={formData.projectsPerMonth}
              onChange={(e) => setFormData({ ...formData, projectsPerMonth: Number(e.target.value) })}
              className="w-full"
            />
            <div className="text-right mt-1 font-mono text-sun">
              {formData.projectsPerMonth} proyectos
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Valor promedio por proyecto
            </label>
            <input
              type="range"
              min="5000"
              max="200000"
              step="5000"
              value={formData.averageProjectValue}
              onChange={(e) => setFormData({ ...formData, averageProjectValue: Number(e.target.value) })}
              className="w-full"
            />
            <div className="text-right mt-1 font-mono text-sun">
              {formatCurrency(formData.averageProjectValue)}
            </div>
          </div>

          <Button
            onClick={calculateROI}
            variant="creative"
            className="w-full"
          >
            Calcular ROI
          </Button>
        </div>

        <div className="space-y-4">
          {results ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-r from-sun/10 to-leaf/10 dark:from-sun/20 dark:to-leaf/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-6 h-6 text-sun" />
                  <h4 className="font-semibold">Ahorro mensual estimado</h4>
                </div>
                <p className="text-3xl font-heading text-sun">
                  {formatCurrency(results.monthlySavings)}
                </p>
              </div>

              <div className="bg-gradient-to-r from-lavender/10 to-sun/10 dark:from-lavender/20 dark:to-sun/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-6 h-6 text-lavender" />
                  <h4 className="font-semibold">Tiempo ahorrado</h4>
                </div>
                <p className="text-3xl font-heading text-lavender">
                  {results.timeSaved} horas/mes
                </p>
              </div>

              <div className="bg-gradient-to-r from-leaf/10 to-lavender/10 dark:from-leaf/20 dark:to-lavender/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-leaf" />
                  <h4 className="font-semibold">ROI esperado</h4>
                </div>
                <p className="text-3xl font-heading text-leaf">
                  {results.roiPercentage}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Período de recuperación: {results.paybackPeriod} meses
                </p>
              </div>

              <div className="mt-6 p-4 bg-obsidian/5 dark:bg-obsidian/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  * Cálculos basados en promedios de la industria y resultados de clientes actuales.
                  Los resultados reales pueden variar según la implementación específica.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Calculator className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Ajusta los valores y presiona "Calcular ROI" para ver tus resultados estimados
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}