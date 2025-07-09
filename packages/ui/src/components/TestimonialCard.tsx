import * as React from 'react';
import { Card, CardContent } from './Card';
import { cn } from '../lib/utils';

export interface TestimonialCardProps {
  quote: string;
  author: {
    name: string;
    role: string;
    company?: string;
    image?: string;
  };
  rating?: number;
  logo?: string;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    className={cn(
      'w-5 h-5',
      filled ? 'text-sun fill-current' : 'text-gray-300'
    )}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const QuoteIcon = () => (
  <svg
    className="w-8 h-8 text-lavender/20"
    fill="currentColor"
    viewBox="0 0 32 32"
  >
    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
  </svg>
);

export const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ quote, author, rating, logo, variant = 'default', className }, ref) => {
    const isCompact = variant === 'compact';
    const isFeatured = variant === 'featured';

    return (
      <Card
        ref={ref}
        variant={isFeatured ? 'gradient' : 'default'}
        padding={isCompact ? 'sm' : 'lg'}
        className={cn(
          'relative',
          isFeatured && 'border-2 border-lavender/20',
          className
        )}
      >
        {!isCompact && (
          <div className="absolute top-4 right-4 opacity-20">
            <QuoteIcon />
          </div>
        )}

        <CardContent className="relative z-10">
          {/* Rating */}
          {rating && (
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < rating} />
              ))}
            </div>
          )}

          {/* Quote */}
          <blockquote className={cn(
            'mb-6',
            isCompact ? 'text-base' : 'text-lg',
            isFeatured && 'text-xl'
          )}>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              "{quote}"
            </p>
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {author.image && (
                <div className={cn(
                  'rounded-full overflow-hidden bg-gradient-to-br from-lavender to-sun p-0.5',
                  isCompact ? 'w-10 h-10' : 'w-12 h-12'
                )}>
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
              )}
              <div>
                <p className={cn(
                  'font-semibold text-obsidian dark:text-pearl',
                  isCompact ? 'text-sm' : 'text-base'
                )}>
                  {author.name}
                </p>
                <p className={cn(
                  'text-gray-600 dark:text-gray-400',
                  isCompact ? 'text-xs' : 'text-sm'
                )}>
                  {author.role}
                  {author.company && ` at ${author.company}`}
                </p>
              </div>
            </div>

            {logo && !isCompact && (
              <div className="ml-4">
                <img
                  src={logo}
                  alt={author.company}
                  className="h-8 opacity-60 grayscale hover:grayscale-0 transition-all"
                />
              </div>
            )}
          </div>

          {/* Featured badge */}
          {isFeatured && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-lavender to-sun text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                Featured Review
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

TestimonialCard.displayName = 'TestimonialCard';