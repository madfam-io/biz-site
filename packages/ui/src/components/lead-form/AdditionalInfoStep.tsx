import type { LeadFormData } from '../../types/leadForm';
import { challengeOptions } from '../../constants/leadFormOptions';

interface AdditionalInfoStepProps {
  formData: LeadFormData;
  onInputChange: (name: keyof LeadFormData, value: string) => void;
  onChallengeToggle: (challenge: string) => void;
}

export function AdditionalInfoStep({
  formData,
  onInputChange,
  onChallengeToggle,
}: AdditionalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">
          Principales desafíos o necesidades (selecciona todas las que apliquen)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {challengeOptions.map(challenge => (
            <label key={challenge} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.challenges?.includes(challenge) || false}
                onChange={() => onChallengeToggle(challenge)}
                className="rounded border-gray-300 text-lavender focus:ring-lavender"
              />
              <span className="text-sm">{challenge}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Mensaje adicional</label>
        <textarea
          value={formData.message || ''}
          onChange={e => onInputChange('message', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
          placeholder="Cuéntanos más sobre tu proyecto o necesidades específicas..."
        />
      </div>
    </div>
  );
}
