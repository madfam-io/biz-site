import * as React from 'react';
import { Container } from './Container';
import { cn } from '../lib/utils';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
  badge?: string;
}

export interface FeaturesProps {
  variant?: 'grid' | 'list' | 'cards' | 'timeline';
  title?: string;
  subtitle?: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  centered?: boolean;
  iconStyle?: 'default' | 'gradient' | 'filled';
  className?: string;
}

const iconStyles = {
  default: 'bg-gray-100 dark:bg-obsidian/10',
  gradient: 'bg-gradient-to-br from-lavender/20 to-sun/20',
  filled: 'bg-lavender text-white',
};

export const Features = React.forwardRef<HTMLElement, FeaturesProps>(
  ({ 
    variant = 'grid',
    title,
    subtitle,
    description,
    features,
    columns = 3,
    centered = false,
    iconStyle = 'gradient',
    className
  }, ref) => {
    const isGrid = variant === 'grid';
    const isList = variant === 'list';
    const isCards = variant === 'cards';
    const isTimeline = variant === 'timeline';

    const gridCols = {
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-2 lg:grid-cols-4',
    };

    return (
      <section
        ref={ref}
        className={cn('py-16 md:py-24', className)}
      >
        <Container>
          {/* Header */}
          {(title || subtitle || description) && (
            <div className={cn(
              'mb-12 md:mb-16',
              centered && 'text-center max-w-3xl mx-auto'
            )}>
              {subtitle && (
                <p className="text-lavender font-mono text-sm uppercase tracking-wider mb-2">
                  {subtitle}
                </p>
              )}
              {title && (
                <h2 className="font-heading text-heading-1 font-bold text-obsidian dark:text-pearl mb-4">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-body-lg text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Features Grid */}
          {isGrid && (
            <div className={cn(
              'grid gap-8',
              gridCols[columns]
            )}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    'group',
                    centered && 'text-center'
                  )}
                >
                  {/* Icon */}
                  <div className={cn(
                    'mb-4',
                    centered && 'flex justify-center'
                  )}>
                    <div className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300',
                      iconStyles[iconStyle],
                      'group-hover:scale-110'
                    )}>
                      {feature.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xl font-semibold text-obsidian dark:text-pearl mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {feature.description}
                  </p>

                  {/* Link */}
                  {feature.link && (
                    <a
                      href={feature.link.href}
                      className="inline-flex items-center text-lavender hover:text-lavender/80 font-medium transition-colors"
                    >
                      {feature.link.text}
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Features List */}
          {isList && (
            <div className="space-y-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-6 items-start"
                >
                  {/* Icon */}
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0',
                    iconStyles[iconStyle]
                  )}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-semibold text-obsidian dark:text-pearl mb-2">
                      {feature.title}
                      {feature.badge && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-sun/20 text-obsidian rounded-full">
                          {feature.badge}
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                    {feature.link && (
                      <a
                        href={feature.link.href}
                        className="inline-flex items-center mt-3 text-lavender hover:text-lavender/80 font-medium transition-colors"
                      >
                        {feature.link.text}
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Features Cards */}
          {isCards && (
            <div className={cn(
              'grid gap-6',
              gridCols[columns]
            )}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-obsidian/5 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-obsidian/20"
                >
                  {/* Icon */}
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center mb-4',
                    iconStyles[iconStyle],
                    'group-hover:scale-110 transition-transform'
                  )}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xl font-semibold text-obsidian dark:text-pearl mb-2">
                    {feature.title}
                    {feature.badge && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium bg-gradient-to-r from-lavender to-sun text-white rounded-full">
                        {feature.badge}
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>

                  {/* Link */}
                  {feature.link && (
                    <a
                      href={feature.link.href}
                      className="inline-flex items-center mt-4 text-lavender hover:text-lavender/80 font-medium transition-colors"
                    >
                      {feature.link.text}
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Features Timeline */}
          {isTimeline && (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-lavender via-sun to-lavender" />

              <div className="space-y-12">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="relative flex gap-6 items-start"
                  >
                    {/* Timeline dot */}
                    <div className="relative z-10">
                      <div className={cn(
                        'w-14 h-14 rounded-full flex items-center justify-center',
                        iconStyles[iconStyle],
                        'ring-4 ring-white dark:ring-obsidian'
                      )}>
                        {feature.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-3">
                      <h3 className="font-heading text-xl font-semibold text-obsidian dark:text-pearl mb-2">
                        {feature.title}
                        {feature.badge && (
                          <span className="ml-2 px-2 py-1 text-xs font-medium bg-sun/20 text-obsidian rounded-full">
                            {feature.badge}
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                      {feature.link && (
                        <a
                          href={feature.link.href}
                          className="inline-flex items-center mt-3 text-lavender hover:text-lavender/80 font-medium transition-colors"
                        >
                          {feature.link.text}
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    );
  }
);

Features.displayName = 'Features';