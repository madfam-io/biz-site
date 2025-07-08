import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const headingVariants = cva('font-heading', {
  variants: {
    level: {
      1: 'text-display',
      2: 'text-heading-1',
      3: 'text-heading-2',
      4: 'text-heading-3',
      5: 'text-xl',
      6: 'text-lg',
    },
    gradient: {
      true: 'bg-gradient-to-r from-lavender to-sun bg-clip-text text-transparent',
      false: '',
    },
  },
  defaultVariants: {
    level: 1,
    gradient: false,
  },
});

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, gradient, as, children, ...props }, ref) => {
    const Comp = as || (`h${level}` as any);

    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ level, gradient }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Heading.displayName = 'Heading';