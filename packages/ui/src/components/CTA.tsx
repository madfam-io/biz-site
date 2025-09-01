import * as React from 'react';
import { Button } from './Button';
import { Container } from './Container';
import { cn } from '../lib/utils';

export interface CTAProps {
  variant?: 'default' | 'centered' | 'split' | 'minimal';
  title: string;
  description?: string;
  cta: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'creative';
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text: string;
    href: string;
    variant?: 'outline' | 'ghost';
    icon?: React.ReactNode;
  };
  background?: 'gradient' | 'solid' | 'pattern' | 'none';
  icon?: React.ReactNode;
  image?: string;
  className?: string;
}

const backgroundStyles = {
  gradient: 'bg-gradient-to-r from-lavender to-sun',
  solid: 'bg-obsidian',
  pattern: 'bg-obsidian bg-pattern',
  none: 'bg-transparent',
};

export const CTA = React.forwardRef<HTMLElement, CTAProps>(
  (
    {
      variant = 'default',
      title,
      description,
      cta,
      secondaryCta,
      background = 'gradient',
      icon,
      image,
      className,
    },
    ref
  ) => {
    const isCentered = variant === 'centered';
    const isSplit = variant === 'split';
    const isMinimal = variant === 'minimal';

    return (
      <section
        ref={ref}
        className={cn(
          'relative overflow-hidden',
          !isMinimal && 'py-16 md:py-24',
          isMinimal && 'py-12',
          backgroundStyles[background],
          className
        )}
      >
        {/* Pattern overlay for pattern background */}
        {background === 'pattern' && (
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-grid-pattern" />
          </div>
        )}

        <Container>
          <div
            className={cn(
              'relative z-10',
              isCentered && 'text-center max-w-3xl mx-auto',
              isSplit && 'grid md:grid-cols-2 gap-12 items-center',
              isMinimal && 'max-w-2xl'
            )}
          >
            {/* Content */}
            <div className={isSplit ? 'order-2 md:order-1' : ''}>
              {/* Icon */}
              {icon && !isSplit && (
                <div className={cn('mb-6', isCentered && 'flex justify-center')}>
                  <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    {icon}
                  </div>
                </div>
              )}

              {/* Title */}
              <h2
                className={cn(
                  'font-heading font-bold mb-4',
                  isMinimal ? 'text-heading-2' : 'text-heading-1',
                  background === 'gradient' || background === 'solid'
                    ? 'text-white'
                    : 'text-obsidian dark:text-pearl'
                )}
              >
                {title}
              </h2>

              {/* Description */}
              {description && (
                <p
                  className={cn(
                    'mb-8',
                    isMinimal ? 'text-base' : 'text-body-lg',
                    background === 'gradient' || background === 'solid'
                      ? 'text-white/90'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {description}
                </p>
              )}

              {/* CTAs */}
              <div
                className={cn(
                  'flex flex-col sm:flex-row gap-4',
                  isCentered && 'justify-center',
                  isMinimal && 'sm:flex-row'
                )}
              >
                <Button
                  variant={cta.variant || (background === 'none' ? 'primary' : 'secondary')}
                  size={isMinimal ? 'md' : 'lg'}
                  icon={cta.icon}
                  className={
                    background === 'gradient' || background === 'solid'
                      ? 'bg-white text-obsidian hover:bg-white/90'
                      : ''
                  }
                  onClick={() => (window.location.href = cta.href)}
                >
                  {cta.text}
                </Button>

                {secondaryCta && (
                  <Button
                    variant={secondaryCta.variant || 'ghost'}
                    size={isMinimal ? 'md' : 'lg'}
                    icon={secondaryCta.icon}
                    className={
                      background === 'gradient' || background === 'solid'
                        ? 'text-white border-white hover:bg-white hover:text-obsidian'
                        : ''
                    }
                    onClick={() => (window.location.href = secondaryCta.href)}
                  >
                    {secondaryCta.text}
                  </Button>
                )}
              </div>
            </div>

            {/* Image for split variant */}
            {isSplit && image && (
              <div className="order-1 md:order-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-lavender to-sun rounded-2xl transform rotate-3" />
                  <img src={image} alt="" className="relative rounded-2xl shadow-2xl w-full" />
                </div>
              </div>
            )}
          </div>
        </Container>

        {/* Decorative elements */}
        {!isMinimal && background === 'gradient' && (
          <>
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl opacity-10 translate-x-1/2 translate-y-1/2" />
          </>
        )}
      </section>
    );
  }
);

CTA.displayName = 'CTA';
