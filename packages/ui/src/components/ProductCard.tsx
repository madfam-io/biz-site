import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from './Button';
import { cn } from '../lib/utils';

export interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  features: Array<{
    icon?: React.ReactNode;
    text: string;
  }>;
  image?: string;
  logo?: React.ReactNode;
  badge?: {
    text: string;
    variant?: 'new' | 'beta' | 'popular';
  };
  cta?: {
    primary?: {
      text: string;
      href: string;
    };
    secondary?: {
      text: string;
      href: string;
    };
  };
  gradient?: string;
  className?: string;
}

const badgeVariants = {
  new: 'bg-gradient-to-r from-leaf to-sun text-obsidian',
  beta: 'bg-gradient-to-r from-lavender to-creative text-white',
  popular: 'bg-gradient-to-r from-sun to-creative text-obsidian',
};

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      name,
      tagline,
      description,
      features,
      image,
      logo,
      badge,
      cta,
      gradient = 'from-lavender/10 to-sun/10',
      className,
    },
    ref
  ) => {
    return (
      <Card ref={ref} variant="product" className={cn('group relative overflow-hidden', className)}>
        {/* Background gradient effect */}
        <div
          className={cn(
            'absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-500',
            `bg-gradient-to-br ${gradient}`
          )}
        />

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-conic from-lavender via-sun to-lavender animate-spin-slow" />
        </div>

        <div className="relative z-10">
          {badge && (
            <div className="absolute top-4 right-4">
              <span
                className={cn(
                  'px-3 py-1 text-xs font-bold rounded-full shadow-md',
                  badgeVariants[badge.variant || 'new']
                )}
              >
                {badge.text}
              </span>
            </div>
          )}

          <CardHeader>
            <div className="flex items-center space-x-4 mb-4">
              {logo && (
                <div className="w-16 h-16 rounded-xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  {logo}
                </div>
              )}
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-obsidian to-lavender bg-clip-text text-transparent dark:from-pearl dark:to-sun">
                  {name}
                </CardTitle>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
                  {tagline}
                </p>
              </div>
            </div>
            <CardDescription className="text-base">{description}</CardDescription>
          </CardHeader>

          <CardContent>
            {image && (
              <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {feature.icon ? (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lavender/20 to-sun/20 flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-lavender to-sun mt-2 flex-shrink-0" />
                  )}
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </CardContent>

          {cta && (
            <CardFooter className="flex gap-3">
              {cta.primary && (
                <Button
                  variant="creative"
                  className="flex-1"
                  onClick={() => (window.location.href = cta.primary?.href || '#')}
                >
                  {cta.primary.text}
                </Button>
              )}
              {cta.secondary && (
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => (window.location.href = cta.secondary?.href || '#')}
                >
                  {cta.secondary.text}
                </Button>
              )}
            </CardFooter>
          )}
        </div>
      </Card>
    );
  }
);

ProductCard.displayName = 'ProductCard';
