'use client';

import Link from 'next/link';
import { Badge } from './Badge';
import { cn } from '@/lib/utils';

interface ProgramCardProps {
  program: {
    id: string;
    name: string;
    description: string;
    provider: string;
    badge: string;
    icon: React.ElementType;
    timeline: string;
    targetMarket: string;
    deliverables: string[];
    originalTiers: string[];
    investment: string;
    color: 'green' | 'amber' | 'blue' | 'purple';
    platforms?: string[];
  };
}

const colorClasses = {
  green: {
    border: 'border-green-200 hover:border-green-300',
    bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
    icon: 'text-green-600 bg-green-100',
    badge: 'bg-green-100 text-green-700',
  },
  amber: {
    border: 'border-amber-200 hover:border-amber-300',
    bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
    icon: 'text-amber-600 bg-amber-100',
    badge: 'bg-amber-100 text-amber-700',
  },
  blue: {
    border: 'border-blue-200 hover:border-blue-300',
    bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    icon: 'text-blue-600 bg-blue-100',
    badge: 'bg-blue-100 text-blue-700',
  },
  purple: {
    border: 'border-purple-200 hover:border-purple-300',
    bg: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    icon: 'text-purple-600 bg-purple-100',
    badge: 'bg-purple-100 text-purple-700',
  },
};

export function ProgramCard({ program }: ProgramCardProps) {
  const colors = colorClasses[program.color];
  const IconComponent = program.icon;

  return (
    <div
      className={cn('p-6 border rounded-xl transition-all duration-200', colors.border, colors.bg)}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colors.icon)}>
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-neutral-900 mb-1">{program.name}</h3>
            <Badge variant={program.badge.includes('Aureo') ? 'aureo-product' : 'by-madfam'}>
              {program.badge}
            </Badge>
          </div>
        </div>

        <p className="text-neutral-600 text-sm leading-relaxed mb-4">{program.description}</p>

        {/* Migration info */}
        <div className="bg-white/60 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <span>Antes:</span>
            <div className="flex gap-1">
              {program.originalTiers.map((tier, index) => (
                <span key={tier} className={cn('px-2 py-0.5 rounded', colors.badge)}>
                  {tier}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <h4 className="font-semibold text-neutral-900 text-sm mb-2">Cronograma y mercado</h4>
          <div className="space-y-1 text-sm text-neutral-600">
            <p>
              <span className="font-medium">Duración:</span> {program.timeline}
            </p>
            <p>
              <span className="font-medium">Ideal para:</span> {program.targetMarket}
            </p>
            <p>
              <span className="font-medium">Inversión:</span> {program.investment}
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-neutral-900 text-sm mb-2">Entregables principales</h4>
          <ul className="space-y-1">
            {program.deliverables.slice(0, 3).map((deliverable, index) => (
              <li key={index} className="text-neutral-600 text-sm flex items-start gap-2">
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0',
                    `bg-${program.color}-400`
                  )}
                ></span>
                {deliverable}
              </li>
            ))}
            {program.deliverables.length > 3 && (
              <li className="text-neutral-500 text-sm italic">
                +{program.deliverables.length - 3} más...
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Platforms (for Platform Pilots) */}
      {program.platforms && (
        <div className="mb-6">
          <h4 className="font-semibold text-neutral-900 text-sm mb-2">Plataformas incluidas</h4>
          <div className="flex gap-2">
            {program.platforms.map(platform => (
              <span key={platform} className={cn('px-2 py-1 rounded text-xs', colors.badge)}>
                {platform}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Provider */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <span>Entregado por:</span>
          <span className="font-medium text-neutral-900">{program.provider}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          href="/contact"
          className="flex-1 px-4 py-2 bg-neutral-900 text-white rounded-lg text-center text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          Solicitar información
        </Link>
        <Link
          href="/assessment"
          className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
        >
          Evaluar
        </Link>
      </div>
    </div>
  );
}
