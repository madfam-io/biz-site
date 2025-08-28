'use client';

import React, { useMemo } from 'react';
import { cn } from '../../lib/utils';
import Image from 'next/image';

export interface LogoSystemProps {
  variant?: 'full' | 'icon' | 'wordmark';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  colorMode?: 'color' | 'mono' | 'white';
  animated?: boolean;
  responsive?: boolean;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
  role?: string;
  focusable?: boolean;
  tabIndex?: number;
}

const sizeMap = {
  xs: { width: 32, height: 32, fontSize: '0.75rem' },
  sm: { width: 48, height: 48, fontSize: '0.875rem' },
  md: { width: 64, height: 64, fontSize: '1rem' },
  lg: { width: 96, height: 96, fontSize: '1.25rem' },
  xl: { width: 128, height: 128, fontSize: '1.5rem' },
};

const colorFilters = {
  color: '',
  mono: 'grayscale(100%) contrast(1.2)',
  white: 'brightness(0) invert(1)',
};

export const LogoSystem: React.FC<LogoSystemProps> = ({
  variant = 'full',
  size = 'md',
  colorMode = 'color',
  animated = false,
  responsive = false,
  className,
  priority = false,
  onClick,
  'aria-label': ariaLabel = 'MADFAM - Where AI meets human creativity',
  role = 'img',
  focusable = false,
  tabIndex,
}) => {
  const dimensions = sizeMap[size];
  const filter = colorFilters[colorMode];

  const containerClasses = cn(
    'inline-flex items-center justify-center transition-all',
    animated && 'hover:scale-105 transform-gpu',
    responsive && 'w-auto h-auto max-w-full',
    onClick && 'cursor-pointer',
    className
  );

  const imageClasses = cn('transition-all duration-300', animated && 'hover:drop-shadow-lg');

  const renderLogo = () => {
    switch (variant) {
      case 'icon':
        // Icon-only version (extracted from full logo)
        return (
          <div
            className={cn('relative', imageClasses)}
            style={{
              width: dimensions.width,
              height: dimensions.height,
              filter,
            }}
          >
            <svg
              viewBox="0 0 942 942"
              width={dimensions.width}
              height={dimensions.height}
              style={{ filter }}
              className="fill-current"
            >
              <path
                d="M 453.5,2.5 C 464.822,1.78648 476.155,2.95314 487.5,6C 529.03,29.9255 570.03,54.5921 610.5,80C 647.623,100.059 683.957,121.392 719.5,144C 763.5,169.333 807.5,194.667 851.5,220C 864.822,229.157 874.988,240.99 882,255.5C 883.644,260.077 884.978,264.744 886,269.5C 886.171,298.405 886.671,327.239 887.5,356C 886.719,447.766 886.719,540.766 887.5,635C 888.913,662.163 879.58,684.83 859.5,703C 795.845,745.167 731.178,785.834 665.5,825C 611.143,860.333 556.476,895.333 501.5,930C 475.204,943.192 449.871,942.525 425.5,928C 389.004,904.249 352.004,881.249 314.5,859C 279.241,834.428 242.908,811.428 205.5,790C 163.012,762.178 120.012,735.178 76.5,709C 60.9177,697.753 50.4177,682.92 45,664.5C 44.8211,653.923 44.3211,643.423 43.5,633C 44.8333,519 44.8333,405 43.5,291C 40.6553,265.186 48.9886,243.852 68.5,227C 132.668,188.082 197.001,149.415 261.5,111C 285.005,97.4134 308.671,84.0801 332.5,71C 363.181,51.9945 393.847,32.9945 424.5,14C 434.021,9.56469 443.687,5.73136 453.5,2.5 Z"
                fill={colorMode === 'color' ? '#030303' : 'currentColor'}
              />
              <path
                d="M 687.5,654.5 C 694.748,653.578 699.582,656.578 702,663.5C 704.057,673.547 703.724,683.547 701,693.5C 692.285,718.429 680.785,741.929 666.5,764C 664.167,764.667 661.833,764.667 659.5,764C 632.218,752.255 620.385,731.755 624,702.5C 626.898,692.936 632.731,685.77 641.5,681C 649.542,677.932 656.542,679.432 662.5,685.5C 666.897,671.791 675.231,661.458 687.5,654.5 Z"
                fill={colorMode === 'color' ? '#2c8136' : 'currentColor'}
              />
              <path
                d="M 235.5,655.5 C 242.208,655.013 247.875,657.179 252.5,662C 258.394,668.968 263.394,676.468 267.5,684.5C 279.144,676.618 289.311,678.285 298,689.5C 311.04,713.969 307.207,735.469 286.5,754C 280.99,758.168 274.99,761.502 268.5,764C 263.438,765.291 259.938,763.458 258,758.5C 245.57,737.973 235.57,716.306 228,693.5C 224.022,681.811 224.689,670.478 230,659.5C 231.812,658.023 233.645,656.69 235.5,655.5 Z"
                fill={colorMode === 'color' ? '#58326f' : 'currentColor'}
              />
            </svg>
          </div>
        );

      case 'wordmark':
        // Text-only version
        return (
          <div
            className={cn('font-bold tracking-tight', imageClasses)}
            style={{
              fontSize: dimensions.fontSize,
              filter,
              color: colorMode === 'color' ? '#030303' : 'currentColor',
            }}
          >
            MADFAM
          </div>
        );

      case 'full':
      default:
        // Full logo from SVG file
        return (
          <div className={cn('relative', imageClasses)} style={{ filter }}>
            <Image
              src="/assets/brand/madfam-logo.svg"
              alt={ariaLabel}
              width={dimensions.width}
              height={dimensions.height}
              priority={priority}
              className={responsive ? 'w-full h-auto' : ''}
            />
          </div>
        );
    }
  };

  const handleClick = onClick ? () => onClick() : undefined;
  const handleKeyDown = onClick
    ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }
    : undefined;

  return (
    <div
      className={containerClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      role={role}
      tabIndex={tabIndex ?? (onClick ? 0 : -1)}
      data-logo-variant={variant}
      data-logo-size={size}
      data-logo-color={colorMode}
    >
      {renderLogo()}
    </div>
  );
};

// Animated Logo Variant for special occasions
export const AnimatedLogo: React.FC<Omit<LogoSystemProps, 'animated'>> = props => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-purple-400 to-yellow-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
      <LogoSystem {...props} animated={true} />
    </div>
  );
};

// Loading Logo Variant
export const LoadingLogo: React.FC<Pick<LogoSystemProps, 'size' | 'colorMode'>> = ({
  size = 'md',
  colorMode = 'color',
}) => {
  return (
    <div className="animate-pulse">
      <LogoSystem variant="icon" size={size} colorMode={colorMode} className="opacity-50" />
    </div>
  );
};

// Logo with Tagline
export const LogoWithTagline: React.FC<LogoSystemProps & { tagline?: string }> = ({
  tagline = 'Where AI meets human creativity',
  size = 'md',
  ...props
}) => {
  const fontSize = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }[size];

  return (
    <div className="flex flex-col items-center gap-2">
      <LogoSystem size={size} {...props} />
      <p className={cn(fontSize, 'text-muted-foreground font-medium')}>{tagline}</p>
    </div>
  );
};
