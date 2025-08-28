import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Spinner } from './Spinner';

/**
 * Mobile-optimized button with proper touch targets
 * Minimum touch target: 44x44px (Apple HIG)
 * Recommended: 48x48px for better accessibility
 */
const mobileButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2 ' +
    'disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] ' +
    // Touch optimizations
    'touch-manipulation select-none cursor-pointer ' +
    // Improved tap highlight
    'tap-highlight-transparent hover:brightness-110 active:brightness-95',
  {
    variants: {
      variant: {
        primary: 'bg-obsidian text-pearl hover:bg-obsidian/90 shadow-lg hover:shadow-xl',
        secondary: 'bg-sun text-obsidian hover:bg-sun/90 shadow-md hover:shadow-lg',
        ghost: 'hover:bg-obsidian/5 hover:text-obsidian',
        creative:
          'bg-gradient-to-r from-lavender to-sun text-pearl hover:opacity-90 shadow-lg hover:shadow-xl',
        outline: 'border-2 border-obsidian text-obsidian hover:bg-obsidian hover:text-pearl',
        danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg',
        success: 'bg-leaf text-white hover:bg-leaf/90 shadow-md hover:shadow-lg',
      },
      size: {
        // All sizes meet 44px minimum touch target
        xs: 'min-h-[44px] px-3 text-sm', // Mobile optimized
        sm: 'min-h-[44px] px-4 text-sm',
        md: 'min-h-[48px] px-6 text-base', // Recommended size
        lg: 'min-h-[52px] px-8 text-lg',
        xl: 'min-h-[56px] px-10 text-xl',
        icon: 'min-h-[44px] min-w-[44px]', // Square touch target
        iconLg: 'min-h-[48px] min-w-[48px]',
      },
      fullWidth: {
        true: 'w-full',
      },
      mobileOptimized: {
        true: 'min-h-[48px] text-base font-semibold', // Force optimal mobile size
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      mobileOptimized: false,
    },
  }
);

export interface MobileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mobileButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  hapticFeedback?: boolean; // For future haptic implementation
}

const MobileButton = React.forwardRef<HTMLButtonElement, MobileButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      mobileOptimized,
      asChild = false,
      loading,
      children,
      disabled,
      icon,
      iconPosition = 'left',
      hapticFeedback = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    // Enhanced click handler with haptic feedback (if available)
    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        // Trigger haptic feedback on supported devices
        if (hapticFeedback && 'vibrate' in navigator) {
          navigator.vibrate(10); // Light haptic tap
        }

        onClick?.(e);
      },
      [onClick, hapticFeedback]
    );

    const content = (
      <>
        {loading && <Spinner size="sm" className="mr-2" />}
        {!loading && icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {!loading && icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </>
    );

    return (
      <Comp
        className={cn(
          mobileButtonVariants({ variant, size, fullWidth, mobileOptimized, className })
        )}
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        // Accessibility improvements
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {asChild ? children : content}
      </Comp>
    );
  }
);

MobileButton.displayName = 'MobileButton';

export { MobileButton, mobileButtonVariants };
