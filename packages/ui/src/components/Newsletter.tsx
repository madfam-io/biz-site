'use client';

import * as React from 'react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from './Button';
import { Card, CardContent } from './Card';

// Translation function type
type TranslationFunction = (key: string) => string;

export interface NewsletterProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: 'card' | 'inline' | 'footer';
  size?: 'sm' | 'md' | 'lg';
  onSubscribe?: (email: string) => Promise<void>;
  className?: string;
  // Translation function - should be provided by parent component
  t?: TranslationFunction;
}

export const Newsletter = React.forwardRef<HTMLDivElement, NewsletterProps>(
  (
    {
      title,
      description,
      placeholder,
      buttonText,
      variant = 'card',
      size = 'md',
      onSubscribe,
      className,
      t,
    },
    ref
  ) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Get translated text or fallback to defaults
    const getText = (key: string, fallback: string) => t?.(key) || fallback;
    const finalTitle = title || getText('newsletter.title', 'Stay up to date');
    const finalDescription =
      description || getText('newsletter.description', 'Get the latest updates');
    const finalPlaceholder = placeholder || getText('newsletter.placeholder', 'your@email.com');
    const finalButtonText = buttonText || getText('newsletter.buttonText', 'Subscribe');

    const validateEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateEmail(email)) {
        setStatus('error');
        setErrorMessage(
          getText('newsletter.validation.invalidEmail', 'Please enter a valid email')
        );
        return;
      }

      setIsSubmitting(true);
      setStatus('idle');
      setErrorMessage('');

      try {
        // Simulate API call for staging
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        await onSubscribe?.(email);
        setStatus('success');
        setEmail('');
      } catch (error) {
        setStatus('error');
        setErrorMessage(
          getText(
            'newsletter.validation.subscriptionError',
            'Subscription error. Please try again.'
          )
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const inputSizeClasses = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-4',
      lg: 'h-12 px-4 text-lg',
    };

    const buttonSizeClasses = {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    };

    if (variant === 'inline') {
      return (
        <div ref={ref} className={cn('w-full max-w-md', className)}>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={finalPlaceholder}
                disabled={isSubmitting}
                className={cn(
                  'flex-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent transition-colors',
                  inputSizeClasses[size],
                  status === 'error' && 'border-red-500'
                )}
              />
              <Button
                type="submit"
                variant="creative"
                size={buttonSizeClasses[size] as any}
                loading={isSubmitting}
                disabled={isSubmitting || !email}
              >
                {finalButtonText}
              </Button>
            </div>

            {status === 'success' && (
              <p className="text-sm text-leaf font-medium">
                {getText('newsletter.messages.success', 'Thank you for subscribing!')}
              </p>
            )}

            {status === 'error' && <p className="text-sm text-red-600">{errorMessage}</p>}
          </form>
        </div>
      );
    }

    if (variant === 'footer') {
      return (
        <div ref={ref} className={cn('w-full', className)}>
          <div className="mb-4">
            <h3 className={cn('font-heading font-bold mb-2', sizeClasses[size])}>{finalTitle}</h3>
            <p className={cn('text-gray-300 mb-4', size === 'sm' ? 'text-sm' : 'text-base')}>
              {finalDescription}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={finalPlaceholder}
                disabled={isSubmitting}
                className={cn(
                  'flex-1 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/90 focus:ring-2 focus:ring-sun focus:border-transparent transition-colors focus:outline-none',
                  inputSizeClasses[size],
                  status === 'error' && 'border-red-400'
                )}
                required
                aria-required="true"
                aria-label={finalPlaceholder}
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? `newsletter-error-${variant}` : undefined}
              />
              <Button
                type="submit"
                variant="secondary"
                size={buttonSizeClasses[size] as any}
                loading={isSubmitting}
                disabled={isSubmitting || !email}
              >
                {finalButtonText}
              </Button>
            </div>

            {status === 'success' && (
              <p className="text-sm text-sun font-medium" role="status" aria-live="polite">
                {getText('newsletter.messages.success', 'Thank you for subscribing!')}
              </p>
            )}

            {status === 'error' && (
              <p
                id={`newsletter-error-${variant}`}
                className="text-sm text-red-400 font-medium"
                role="alert"
                aria-live="assertive"
              >
                <span className="sr-only">Error:</span>
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      );
    }

    // Default card variant
    return (
      <Card ref={ref} className={cn('w-full max-w-md mx-auto', className)}>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-lavender to-sun rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <h3 className={cn('font-heading font-bold mb-2', sizeClasses[size])}>{finalTitle}</h3>
            <p
              className={cn(
                'text-gray-600 dark:text-gray-400',
                size === 'sm' ? 'text-sm' : 'text-base'
              )}
            >
              {finalDescription}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={finalPlaceholder}
                disabled={isSubmitting}
                className={cn(
                  'w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent transition-colors',
                  inputSizeClasses[size],
                  status === 'error' && 'border-red-500'
                )}
              />
            </div>

            <Button
              type="submit"
              variant="creative"
              size={buttonSizeClasses[size] as any}
              fullWidth
              loading={isSubmitting}
              disabled={isSubmitting || !email}
            >
              {buttonText}
            </Button>

            {status === 'success' && (
              <div className="text-center">
                <p className="text-sm text-leaf font-medium">
                  {getText('newsletter.messages.success', 'Thank you for subscribing!')}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {getText(
                    'newsletter.messages.successDetails',
                    "We'll keep you informed about our latest news."
                  )}
                </p>
              </div>
            )}

            {status === 'error' && (
              <p className="text-sm text-red-600 text-center">{errorMessage}</p>
            )}
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            {getText('newsletter.messages.noSpam', 'No spam. You can unsubscribe at any time.')}
          </p>
        </CardContent>
      </Card>
    );
  }
);

Newsletter.displayName = 'Newsletter';
