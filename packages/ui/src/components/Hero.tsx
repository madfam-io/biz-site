import * as React from 'react';
import { Button } from './Button';
import { Container } from './Container';
import { cn } from '../lib/utils';

export interface HeroProps {
  variant?: 'home' | 'service' | 'product' | 'simple';
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  cta?: {
    primary?: {
      text: string;
      href: string;
      variant?: 'primary' | 'secondary' | 'creative';
      icon?: React.ReactNode;
    };
    secondary?: {
      text: string;
      href: string;
      variant?: 'outline' | 'ghost';
      icon?: React.ReactNode;
    };
  };
  background?: 'gradient' | 'mesh' | 'particles' | 'none';
  overlay?: boolean;
  centered?: boolean;
  fullHeight?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const backgroundStyles = {
  gradient: 'bg-gradient-to-br from-obsidian via-obsidian/95 to-lavender/10',
  mesh: 'bg-obsidian bg-mesh-pattern',
  particles: 'bg-obsidian',
  none: '',
};

export const Hero = React.forwardRef<HTMLElement, HeroProps>(
  ({ 
    variant = 'home',
    title,
    subtitle,
    description,
    cta,
    background = 'gradient',
    overlay = true,
    centered = true,
    fullHeight = true,
    children,
    className
  }, ref) => {
    const isHome = variant === 'home';
    const isService = variant === 'service';
    const isProduct = variant === 'product';

    return (
      <section
        ref={ref}
        className={cn(
          'relative overflow-hidden',
          fullHeight ? 'min-h-[80vh]' : 'py-24',
          'flex items-center',
          backgroundStyles[background],
          className
        )}
      >
        {/* Background overlay */}
        {overlay && background !== 'none' && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/50 to-obsidian/80" />
        )}

        {/* Animated background elements */}
        {background === 'mesh' && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-lavender rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sun rounded-full filter blur-3xl animate-float animation-delay-2000" />
          </div>
        )}

        {/* Content */}
        <Container className="relative z-10">
          <div className={cn(
            'max-w-5xl',
            centered ? 'mx-auto text-center' : ''
          )}>
            {/* Subtitle */}
            {subtitle && (
              <div className={cn(
                'mb-6',
                isHome && 'animate-fade-up'
              )}>
                {typeof subtitle === 'string' ? (
                  <p className="text-sun font-mono text-sm md:text-base uppercase tracking-wider">
                    {subtitle}
                  </p>
                ) : (
                  subtitle
                )}
              </div>
            )}

            {/* Title */}
            <div className={cn(
              'mb-6',
              isHome && 'animate-fade-up animation-delay-200'
            )}>
              {typeof title === 'string' ? (
                <h1 className={cn(
                  'font-heading font-bold',
                  isHome ? 'text-display-xl' : 'text-display',
                  'text-pearl',
                  'leading-tight'
                )}>
                  {title}
                </h1>
              ) : (
                title
              )}
            </div>

            {/* Description */}
            {description && (
              <div className={cn(
                'mb-10',
                isHome && 'animate-fade-up animation-delay-400'
              )}>
                {typeof description === 'string' ? (
                  <p className={cn(
                    'text-body-lg text-gray-300',
                    centered ? 'max-w-3xl mx-auto' : ''
                  )}>
                    {description}
                  </p>
                ) : (
                  description
                )}
              </div>
            )}

            {/* CTAs */}
            {cta && (cta.primary || cta.secondary) && (
              <div className={cn(
                'flex flex-col sm:flex-row gap-4',
                centered ? 'justify-center' : '',
                isHome && 'animate-fade-up animation-delay-600'
              )}>
                {cta.primary && (
                  <Button
                    variant={cta.primary.variant || 'creative'}
                    size="lg"
                    icon={cta.primary.icon}
                    asChild
                  >
                    <a href={cta.primary.href}>{cta.primary.text}</a>
                  </Button>
                )}
                {cta.secondary && (
                  <Button
                    variant={cta.secondary.variant || 'outline'}
                    size="lg"
                    icon={cta.secondary.icon}
                    className="border-pearl text-pearl hover:bg-pearl hover:text-obsidian"
                    asChild
                  >
                    <a href={cta.secondary.href}>{cta.secondary.text}</a>
                  </Button>
                )}
              </div>
            )}

            {/* Additional content */}
            {children && (
              <div className={cn(
                'mt-12',
                isHome && 'animate-fade-up animation-delay-800'
              )}>
                {children}
              </div>
            )}
          </div>
        </Container>

        {/* Decorative elements */}
        {isService && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lavender to-transparent" />
        )}
        {isProduct && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-10">
            <div className="w-full h-full bg-gradient-conic from-lavender via-sun to-lavender animate-spin-slow" />
          </div>
        )}
      </section>
    );
  }
);

Hero.displayName = 'Hero';