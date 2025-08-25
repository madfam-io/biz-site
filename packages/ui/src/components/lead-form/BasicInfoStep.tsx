import type { LeadFormData, FormErrors } from '../../types/leadForm';

interface BasicInfoStepProps {
  formData: LeadFormData;
  errors: FormErrors;
  onInputChange: (name: keyof LeadFormData, value: string) => void;
  onValidateField: (name: string, value: string) => boolean;
}

export function BasicInfoStep({
  formData,
  errors,
  onInputChange,
  onValidateField,
}: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Nombre completo *</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => onInputChange('name', e.target.value)}
            onBlur={e => onValidateField('name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tu nombre completo"
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email corporativo *</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => onInputChange('email', e.target.value)}
            onBlur={e => onValidateField('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="tu@empresa.com"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Empresa</label>
          <input
            type="text"
            value={formData.company}
            onChange={e => onInputChange('company', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
            placeholder="Nombre de tu empresa"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Teléfono</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => onInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
            placeholder="+52 55 1234 5678"
          />
        </div>
      </div>
    </div>
  );
}
