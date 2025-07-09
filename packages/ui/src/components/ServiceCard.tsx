import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from './Button';
import { cn } from '../lib/utils';

export interface ServiceCardProps {
  tier: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  title: string;
  description: string;
  price?: {
    amount: number;
    currency: 'MXN' | 'USD';
    period?: 'hour' | 'project' | 'month';
  };
  features: string[];
  cta?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'creative';
  };
  badge?: string;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}

const tierColors = {
  L1: 'border-leaf',
  L2: 'border-sun',
  L3: 'border-lavender',
  L4: 'border-creative',
  L5: 'border-obsidian',
};

const tierGradients = {
  L1: 'from-leaf/10 to-leaf/5',
  L2: 'from-sun/10 to-sun/5',
  L3: 'from-lavender/10 to-lavender/5',
  L4: 'from-creative/10 to-creative/5',
  L5: 'from-obsidian/10 to-obsidian/5',
};

export const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ tier, title, description, price, features, cta, badge, icon, color, className }, ref) => {
    const tierColor = color || tierColors[tier];
    const tierGradient = tierGradients[tier];

    return (
      <Card
        ref={ref}
        variant="service"
        className={cn(
          'group relative overflow-hidden',
          `hover:${tierColor}`,
          className
        )}
      >
        {badge && (
          <div className="absolute top-4 right-4">
            <span className={cn(
              'px-3 py-1 text-xs font-semibold rounded-full',
              `bg-gradient-to-r ${tierGradient} text-obsidian`
            )}>
              {badge}
            </span>
          </div>
        )}

        <div className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          `bg-gradient-to-br ${tierGradient}`
        )} />

        <div className="relative z-10">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              {icon && (
                <div className={cn(
                  'w-12 h-12 rounded-lg flex items-center justify-center mb-4',
                  `bg-gradient-to-br ${tierGradient}`
                )}>
                  {icon}
                </div>
              )}
              <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                {tier}
              </span>
            </div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-base mt-2">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {price && (
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-obsidian dark:text-pearl">
                    {price.currency === 'MXN' ? '$' : '$'}
                    {price.amount.toLocaleString()}
                  </span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {price.currency} {price.period && `/ ${price.period}`}
                  </span>
                </div>
              </div>
            )}

            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className={cn('w-5 h-5 mr-3 mt-0.5 flex-shrink-0', tierColor.replace('border-', 'text-'))}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          {cta && (
            <CardFooter>
              <Button
                variant={cta.variant || 'primary'}
                fullWidth
                asChild
              >
                <a href={cta.href}>{cta.text}</a>
              </Button>
            </CardFooter>
          )}
        </div>
      </Card>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';