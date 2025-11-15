# MADFAM Brand Identity Implementation Guide

## Quick Start

This guide provides step-by-step instructions for implementing the MADFAM brand identity preservation system in your codebase.

## 1. Installation & Setup

### Step 1: Install Dependencies

```bash
# Navigate to UI package
cd packages/ui

# Install required dependencies
pnpm add framer-motion class-variance-authority

# Install font packages
pnpm add @fontsource/inter @fontsource-variable/clash-display @fontsource/jetbrains-mono
```

### Step 2: Update Tailwind Configuration

```javascript
// apps/web/tailwind.config.ts
import { tailwindColors } from '@madfam/ui/themes/brand-colors';

export default {
  // ... existing config
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
};
```

### Step 3: Initialize Brand Theme Provider

```tsx
// apps/web/app/layout.tsx
import { BrandThemeProvider } from '@madfam/ui/themes/brand-bridge';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BrandThemeProvider defaultBrandMode="hybrid-harmony">
          {/* Your existing providers */}
          {children}
        </BrandThemeProvider>
      </body>
    </html>
  );
}
```

## 2. Component Integration

### Logo Implementation

```tsx
// Replace existing logo references
import { LogoSystem, AnimatedLogo } from '@madfam/ui/components/brand/LogoSystem';

// Basic usage
<LogoSystem size="md" colorMode="color" />

// Hero section with animation
<AnimatedLogo size="xl" />

// Navigation with responsive sizing
<LogoSystem
  variant="full"
  size={isScrolled ? 'sm' : 'md'}
  animated
/>
```

### Brand Navbar Integration

```tsx
// apps/web/app/[locale]/layout.tsx
import { BrandNavbar } from '@/components/BrandNavbar';

export default function LocaleLayout({ children }) {
  return (
    <>
      <BrandNavbar /> {/* Replace existing Navbar */}
      {children}
    </>
  );
}
```

### Particle Effects (Optional)

```tsx
// For hero sections or landing pages
import { BrandParticles } from '@madfam/ui/components/brand/BrandParticles';

<div className="relative">
  <BrandParticles density="low" movement="gentle" interactive />
  {/* Your content */}
</div>;
```

## 3. Theme Modes Usage

### Theme Selector Implementation

```tsx
import { ThemeModeSelector } from '@madfam/ui/themes/brand-bridge';

// Add to navigation or settings
<ThemeModeSelector className="flex items-center gap-2" />;
```

### Programmatic Theme Control

```tsx
import { useBrandTheme } from '@madfam/ui/themes/brand-bridge';

function MyComponent() {
  const { brandMode, setBrandMode, colorMode, toggleColorMode } = useBrandTheme();

  // Switch to corporate mode for specific pages
  useEffect(() => {
    if (pathname.includes('/enterprise')) {
      setBrandMode('corporate-evolution');
    }
  }, [pathname]);
}
```

## 4. Brand-Aware Components

### Buttons with Brand Styling

```tsx
// Create brand-aware button variants
import { cn } from '@madfam/ui/lib/utils';

<button
  className={cn(
    'px-4 py-2 rounded-lg font-medium',
    'bg-gradient-to-r from-brand-green to-brand-purple',
    'text-white hover:shadow-lg transform hover:scale-105',
    'transition-all duration-300'
  )}
>
  Get Started
</button>;
```

### Cards with Geometric Patterns

```tsx
<div className="relative p-6 rounded-xl bg-surface">
  {/* Subtle geometric overlay */}
  <div
    className="absolute inset-0 opacity-5"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232c8136' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }}
  />
  {/* Card content */}
</div>
```

## 5. Migration Checklist

### Phase 1: Foundation (Immediate)

- [x] Move logo to `/public/assets/brand/`
- [x] Create `LogoSystem` component
- [x] Set up `BrandThemeProvider`
- [x] Configure Tailwind with brand colors

### Phase 2: Core Components (Week 1)

- [ ] Replace all logo instances with `LogoSystem`
- [ ] Update Navbar to `BrandNavbar`
- [ ] Add `ThemeModeSelector` to settings
- [ ] Implement brand color variables globally

### Phase 3: Enhanced Experience (Week 2)

- [ ] Add `BrandParticles` to hero sections
- [ ] Implement animated logo in key areas
- [ ] Create brand-aware button components
- [ ] Add geometric patterns to cards

### Phase 4: Optimization (Week 3)

- [ ] Performance test particle effects
- [ ] A/B test theme modes
- [ ] Optimize logo loading
- [ ] Implement responsive adjustments

## 6. CSS Variables Reference

```css
/* Automatically injected by BrandThemeProvider */
:root {
  /* Brand Colors */
  --brand-green: #2c8136;
  --brand-purple: #58326f;
  --brand-yellow: #eebc15;

  /* Gradients */
  --gradient-bridge: linear-gradient(135deg, #2c8136 0%, #58326f 50%, #eebc15 100%);
  --gradient-innovation: linear-gradient(135deg, #58326f 0%, #eebc15 100%);
  --gradient-solar: linear-gradient(135deg, #ff6b35 0%, #ffa500 100%);
}

/* Data attributes for theme modes */
[data-brand-mode='solarpunk-legacy'] {
  /* Solarpunk styles */
}
[data-brand-mode='corporate-evolution'] {
  /* Corporate styles */
}
[data-brand-mode='hybrid-harmony'] {
  /* Hybrid styles */
}
```

## 7. TypeScript Types

```typescript
// Import types for proper IDE support
import type { LogoSystemProps, BrandMode, ColorMode } from '@madfam/ui';

// Use in your components
const logoProps: LogoSystemProps = {
  variant: 'full',
  size: 'md',
  colorMode: 'color',
  animated: true,
};
```

## 8. Performance Guidelines

### Logo Optimization

- Use `priority` prop for above-fold logos
- Implement lazy loading for footer logos
- Preload logo SVG in document head

### Particle Performance

- Disable on mobile by default
- Use `density="low"` for better performance
- Consider `StaticBrandPattern` for static backgrounds

### Theme Switching

- Persist user preferences in localStorage
- Avoid theme flash with inline script
- Use CSS transitions for smooth changes

## 9. Accessibility Requirements

### Logo Accessibility

```tsx
<LogoSystem
  aria-label="MADFAM - Where AI meets human creativity"
  role="img"
  focusable={isClickable}
/>
```

### Theme Controls

```tsx
<ThemeModeSelector aria-label="Change theme mode" role="group" />
```

### Color Contrast

- All brand colors meet WCAG AA standards
- Dark mode automatically adjusts contrast
- Test with browser accessibility tools

## 10. Troubleshooting

### Issue: Logo not displaying

```bash
# Ensure logo is copied to public folder
cp madfam_logo_v03.svg apps/web/public/assets/brand/madfam-logo.svg
```

### Issue: Theme not persisting

```javascript
// Check localStorage key
const theme = localStorage.getItem('madfam-theme');
console.log('Saved theme:', theme);
```

### Issue: Particles causing performance issues

```tsx
// Disable particles conditionally
const isMobile = window.innerWidth < 768;
{
  !isMobile && <BrandParticles density="low" />;
}
```

## Next Steps

1. **Test Implementation**: Run the application and verify all brand elements render correctly
2. **Gather Feedback**: Share with team for design review
3. **Monitor Performance**: Use Lighthouse to ensure no regression
4. **Document Customizations**: Add any project-specific modifications to this guide

## Support

For issues or questions about brand implementation:

- Review the [Brand Architecture Document](./BRAND_IDENTITY_PRESERVATION.md)
- Check component source code in `packages/ui/src/components/brand/`
- Create an issue in the project repository

---

_Last Updated: Implementation Guide v1.0_
