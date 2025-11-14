import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * Mobile-optimized input with proper touch targets and mobile keyboard support
 * Minimum height: 44px for comfortable touch interaction
 */
const mobileInputVariants = cva(
  'flex w-full rounded-lg border bg-white text-obsidian transition-colors ' +
    'file:border-0 file:bg-transparent file:text-sm file:font-medium ' +
    'placeholder:text-gray-500 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2 ' +
    'disabled:cursor-not-allowed disabled:opacity-50 ' +
    // Mobile optimizations
    'touch-manipulation ' + // Disable double-tap zoom
    'appearance-none ' + // Remove native styling
    'text-[16px] ', // Prevent zoom on iOS (16px minimum)
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-lavender',
        error: 'border-red-500 focus:border-red-600',
        success: 'border-leaf focus:border-leaf',
      },
      inputSize: {
        sm: 'min-h-[44px] px-3 py-2', // Minimum touch target
        md: 'min-h-[48px] px-4 py-3', // Recommended
        lg: 'min-h-[52px] px-5 py-3.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

export interface MobileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof mobileInputVariants> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  // Mobile-specific props
  mobileKeyboard?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal' | 'url' | 'search';
  enableAutoComplete?: boolean;
  floatingLabel?: boolean;
}

const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  (
    {
      className,
      variant,
      inputSize,
      type = 'text',
      label,
      error,
      hint,
      icon,
      rightElement,
      mobileKeyboard,
      enableAutoComplete = true,
      floatingLabel = false,
      disabled,
      required,
      placeholder,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    // Determine input mode for mobile keyboards
    const getInputMode = (): React.HTMLAttributes<HTMLInputElement>['inputMode'] => {
      if (mobileKeyboard) {
        // Map our keyboard types to valid inputMode values
        if (mobileKeyboard === 'numeric' || mobileKeyboard === 'decimal') return mobileKeyboard;
        if (mobileKeyboard === 'tel') return 'tel';
        if (mobileKeyboard === 'email') return 'email';
        if (mobileKeyboard === 'url') return 'url';
        if (mobileKeyboard === 'search') return 'search';
        return 'text';
      }
      switch (type) {
        case 'email':
          return 'email';
        case 'tel':
          return 'tel';
        case 'number':
          return 'numeric';
        case 'url':
          return 'url';
        case 'search':
          return 'search';
        default:
          return 'text';
      }
    };

    // Autocomplete suggestions for common fields
    const getAutoComplete = () => {
      if (!enableAutoComplete) return 'off';
      const fieldName = props.name?.toLowerCase() || '';

      if (fieldName.includes('email')) return 'email';
      if (fieldName.includes('name')) {
        if (fieldName.includes('first')) return 'given-name';
        if (fieldName.includes('last')) return 'family-name';
        return 'name';
      }
      if (fieldName.includes('phone') || fieldName.includes('tel')) return 'tel';
      if (fieldName.includes('company') || fieldName.includes('organization'))
        return 'organization';
      if (fieldName.includes('address')) return 'street-address';
      if (fieldName.includes('city')) return 'address-level2';
      if (fieldName.includes('postal') || fieldName.includes('zip')) return 'postal-code';
      if (fieldName.includes('country')) return 'country';

      return 'on';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    return (
      <div className="relative w-full">
        {label && !floatingLabel && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              mobileInputVariants({ variant: error ? 'error' : variant, inputSize }),
              Boolean(icon) && 'pl-10',
              Boolean(rightElement) && 'pr-10',
              Boolean(floatingLabel) && 'pt-5',
              className
            )}
            disabled={disabled}
            required={required}
            placeholder={floatingLabel && !isFocused && !hasValue ? '' : placeholder}
            inputMode={getInputMode()}
            autoComplete={getAutoComplete()}
            autoCapitalize={type === 'email' ? 'off' : undefined}
            autoCorrect={type === 'email' || type === 'password' ? 'off' : undefined}
            spellCheck={type === 'email' || type === 'password' ? false : undefined}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            // iOS specific - prevent zoom on focus
            style={{ fontSize: '16px' }}
            {...props}
          />

          {floatingLabel && label && (
            <label
              htmlFor={inputId}
              className={cn(
                'absolute left-3 transition-all pointer-events-none',
                'text-gray-500',
                isFocused || hasValue || placeholder
                  ? [
                      'top-1.5 text-xs font-medium',
                      error ? 'text-red-500' : isFocused ? 'text-lavender' : 'text-gray-600',
                    ]
                  : 'top-1/2 -translate-y-1/2 text-base'
              )}
            >
              {label}
              {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
          )}

          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
          )}
        </div>

        {(error || hint) && (
          <p className={cn('mt-1.5 text-sm', error ? 'text-red-500' : 'text-gray-500')}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

MobileInput.displayName = 'MobileInput';

export { MobileInput, mobileInputVariants };
