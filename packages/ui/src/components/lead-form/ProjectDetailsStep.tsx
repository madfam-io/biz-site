import type { LeadFormData } from '../../types/leadForm';
import {
  industryOptions,
  companySizeOptions,
  budgetOptions,
  timeframeOptions,
} from '../../constants/leadFormOptions';

interface ProjectDetailsStepProps {
  formData: LeadFormData;
  onInputChange: (name: keyof LeadFormData, value: string) => void;
}

export function ProjectDetailsStep({ formData, onInputChange }: ProjectDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Industria</label>
          <select
            value={formData.industry || ''}
            onChange={e => onInputChange('industry', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
          >
            <option value="">Selecciona tu industria</option>
            {industryOptions.map(industry => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tamaño de empresa</label>
          <select
            value={formData.companySize || ''}
            onChange={e => onInputChange('companySize', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
          >
            <option value="">Selecciona el tamaño</option>
            {companySizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Presupuesto aproximado</label>
          <select
            value={formData.budget || ''}
            onChange={e => onInputChange('budget', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
          >
            <option value="">Selecciona tu presupuesto</option>
            {budgetOptions.map(budget => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tiempo estimado para el proyecto</label>
          <select
            value={formData.timeframe || ''}
            onChange={e => onInputChange('timeframe', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
          >
            <option value="">Selecciona el timeframe</option>
            {timeframeOptions.map(timeframe => (
              <option key={timeframe} value={timeframe}>
                {timeframe}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
