'use client';

import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';

interface ArmCardProps {
  arm: {
    id: string;
    name: string;
    tagline: string;
    description: string;
    badge: string;
    accent: 'green' | 'copper' | 'teal' | 'blue';
    capabilities: string[];
    products: Array<{
      name: string;
      url: string;
      comingSoon?: boolean;
    }>;
    externalUrl?: string;
    comingSoon?: boolean;
  };
}

const accentColors = {
  green: {
    border: 'border-green-200 hover:border-green-300',
    bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
    accent: 'text-green-600',
    button: 'bg-green-100 text-green-700 hover:bg-green-200',
  },
  copper: {
    border: 'border-amber-200 hover:border-amber-300',
    bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
    accent: 'text-amber-600',
    button: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
  },
  teal: {
    border: 'border-teal-200 hover:border-teal-300',
    bg: 'bg-gradient-to-br from-teal-50 to-cyan-50',
    accent: 'text-teal-600',
    button: 'bg-teal-100 text-teal-700 hover:bg-teal-200',
  },
  blue: {
    border: 'border-blue-200 hover:border-blue-300',
    bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    accent: 'text-blue-600',
    button: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  },
};

export function ArmCard({ arm }: ArmCardProps) {
  const colors = accentColors[arm.accent];
  const href = `/arms/${arm.id}`;

  return (
    <div
      className={cn(
        'relative p-6 border rounded-xl transition-all duration-200 group',
        colors.border,
        colors.bg,
        arm.comingSoon && 'opacity-75'
      )}
    >
      {/* Coming Soon Badge */}
      {arm.comingSoon && (
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
            Próximamente
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-1">{arm.name}</h3>
            <Badge variant="by-madfam" />
          </div>
        </div>

        <p className={cn('font-medium text-sm mb-3', colors.accent)}>{arm.tagline}</p>

        <p className="text-neutral-600 text-sm leading-relaxed">{arm.description}</p>
      </div>

      {/* Capabilities */}
      <div className="mb-6">
        <h4 className="font-semibold text-neutral-900 text-sm mb-3">Capacidades principales</h4>
        <div className="grid grid-cols-2 gap-2">
          {arm.capabilities.slice(0, 4).map((capability, index) => (
            <div key={index} className="text-xs text-neutral-600 flex items-center gap-1">
              <span className={cn('w-1.5 h-1.5 rounded-full', `bg-${arm.accent}-400`)} />
              {capability}
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="mb-6">
        <h4 className="font-semibold text-neutral-900 text-sm mb-3">Productos principales</h4>
        <div className="flex flex-wrap gap-2">
          {arm.products.slice(0, 3).map((product, index) => (
            <span
              key={index}
              className={cn(
                'px-2 py-1 rounded text-xs border',
                product.comingSoon
                  ? 'bg-neutral-50 text-neutral-500 border-neutral-200'
                  : `${colors.button} border-transparent`
              )}
            >
              {product.name}
              {product.comingSoon && ' (próximamente)'}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {!arm.comingSoon && (
          <Link
            href={href}
            className={cn(
              'flex-1 px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors',
              colors.button
            )}
          >
            Ver detalles
          </Link>
        )}

        {arm.externalUrl && !arm.comingSoon && (
          <Link
            href={arm.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <ArrowUpRightIcon className="w-4 h-4" />
          </Link>
        )}

        {arm.comingSoon && (
          <div className="flex-1 px-4 py-2 bg-neutral-100 text-neutral-500 rounded-lg text-center text-sm font-medium cursor-not-allowed">
            Próximamente
          </div>
        )}
      </div>
    </div>
  );
}
