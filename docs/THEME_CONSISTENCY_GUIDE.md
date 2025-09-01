# Theme Consistency & Dark Mode Implementation Guide

## Current Issues Summary

### 🔴 Critical Problems

1. **Inconsistent dark mode implementation** - Some components have dark variants, others don't
2. **Hardcoded colors** - Direct color values instead of CSS variables
3. **Missing theme tokens** - No systematic color palette for dark mode
4. **Opacity abuse** - Using opacity for color variations causes contrast issues

---

## Systematic Theme Architecture

### 1. CSS Variables Structure

Create a complete theme system in `apps/web/app/globals.css`:

```css
:root {
  /* ===== SEMANTIC COLOR TOKENS ===== */

  /* Background Colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-tertiary: #f3f4f6;
  --bg-accent: #eff6ff;
  --bg-inverse: #111827;

  /* Text Colors */
  --text-primary: #111827;
  --text-secondary: #4b5563;
  --text-tertiary: #6b7280;
  --text-muted: #9ca3af;
  --text-inverse: #ffffff;

  /* Border Colors */
  --border-primary: #e5e7eb;
  --border-secondary: #d1d5db;
  --border-accent: #3b82f6;

  /* Interactive Colors */
  --interactive-primary: #3b82f6;
  --interactive-primary-hover: #2563eb;
  --interactive-secondary: #8b5cf6;
  --interactive-secondary-hover: #7c3aed;
  --interactive-danger: #ef4444;
  --interactive-danger-hover: #dc2626;
  --interactive-success: #10b981;
  --interactive-success-hover: #059669;

  /* Brand Colors (unchanged in dark mode) */
  --brand-green: #2c8136;
  --brand-purple: #58326f;
  --brand-yellow: #eebc15;
  --brand-obsidian: #090a0a;
  --brand-lavender: #bd9fe4;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

.dark {
  /* Dark Mode Overrides */

  /* Background Colors */
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --bg-accent: #1e3a8a;
  --bg-inverse: #ffffff;

  /* Text Colors */
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --text-muted: #64748b;
  --text-inverse: #0f172a;

  /* Border Colors */
  --border-primary: #334155;
  --border-secondary: #475569;
  --border-accent: #60a5fa;

  /* Interactive Colors (slightly lighter for dark backgrounds) */
  --interactive-primary: #60a5fa;
  --interactive-primary-hover: #3b82f6;
  --interactive-secondary: #a78bfa;
  --interactive-secondary-hover: #8b5cf6;
  --interactive-danger: #f87171;
  --interactive-danger-hover: #ef4444;
  --interactive-success: #34d399;
  --interactive-success-hover: #10b981;

  /* Shadows (more subtle in dark mode) */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.25);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4);
}
```

### 2. Tailwind Configuration Update

Update `tailwind.config.ts` to use CSS variables:

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Map to CSS variables
        background: {
          DEFAULT: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          accent: 'var(--bg-accent)',
          inverse: 'var(--bg-inverse)',
        },
        foreground: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },
        border: {
          DEFAULT: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          accent: 'var(--border-accent)',
        },
        primary: {
          DEFAULT: 'var(--interactive-primary)',
          hover: 'var(--interactive-primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--interactive-secondary)',
          hover: 'var(--interactive-secondary-hover)',
        },
        danger: {
          DEFAULT: 'var(--interactive-danger)',
          hover: 'var(--interactive-danger-hover)',
        },
        success: {
          DEFAULT: 'var(--interactive-success)',
          hover: 'var(--interactive-success-hover)',
        },
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
    },
  },
};
```

---

## Component Migration Pattern

### ❌ OLD Pattern (Inconsistent)

```tsx
// Bad: Hardcoded colors with manual dark mode
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <p className="text-gray-600 dark:text-gray-400">Secondary text</p>
</div>
```

### ✅ NEW Pattern (Consistent)

```tsx
// Good: Semantic color tokens
<div className="bg-background text-foreground">
  <p className="text-foreground-secondary">Secondary text</p>
</div>
```

---

## Migration Checklist by Component

### 1. Navbar Component

```tsx
// Before
<nav className="bg-white dark:bg-obsidian border-gray-200 dark:border-gray-800">

// After
<nav className="bg-background border-border">
```

### 2. Footer Component

```tsx
// Before
<footer className="bg-gray-50 dark:bg-obsidian text-obsidian/70 dark:text-white/70">

// After
<footer className="bg-background-secondary text-foreground-secondary">
```

### 3. Card Components

```tsx
// Before
<div className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-xl">

// After
<div className="bg-background shadow-md">
```

### 4. Form Inputs

```tsx
// Before
<input className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                  border-gray-300 dark:border-gray-600">

// After
<input className="bg-background text-foreground border-border">
```

### 5. Buttons

```tsx
// Before
<button className="bg-blue-600 hover:bg-blue-700 text-white
                   dark:bg-blue-500 dark:hover:bg-blue-600">

// After
<button className="bg-primary hover:bg-primary-hover text-foreground-inverse">
```

---

## Utility Classes for Common Patterns

Create reusable utility classes in `apps/web/app/globals.css`:

```css
/* Surface Elevations */
.surface-primary {
  @apply bg-background text-foreground;
}

.surface-secondary {
  @apply bg-background-secondary text-foreground;
}

.surface-tertiary {
  @apply bg-background-tertiary text-foreground;
}

/* Card Styles */
.card {
  @apply surface-primary border border-border rounded-lg shadow-sm;
}

.card-hover {
  @apply hover:shadow-md transition-shadow;
}

/* Interactive Elements */
.interactive-primary {
  @apply bg-primary text-foreground-inverse hover:bg-primary-hover 
         focus-visible:outline focus-visible:outline-2 
         focus-visible:outline-offset-2 focus-visible:outline-primary;
}

.interactive-secondary {
  @apply bg-secondary text-foreground-inverse hover:bg-secondary-hover 
         focus-visible:outline focus-visible:outline-2 
         focus-visible:outline-offset-2 focus-visible:outline-secondary;
}

/* Text Hierarchy */
.text-primary {
  @apply text-foreground;
}

.text-secondary {
  @apply text-foreground-secondary;
}

.text-muted {
  @apply text-foreground-muted;
}

/* Form Elements */
.input {
  @apply bg-background text-foreground border border-border rounded-md
         px-3 py-2 text-base
         focus:border-accent focus:outline-none focus:ring-2 
         focus:ring-primary focus:ring-offset-2
         dark:focus:ring-offset-gray-900;
}
```

---

## Testing Dark Mode Consistency

### Visual Testing Checklist

- [ ] Toggle between light/dark mode - no flash of unstyled content
- [ ] All text remains readable (contrast ratios maintained)
- [ ] Interactive elements have visible hover/focus states
- [ ] Shadows are appropriate for each mode
- [ ] Images/icons adapt or remain neutral
- [ ] No hardcoded colors visible

### Automated Testing

```javascript
// test-theme-consistency.js
const elements = document.querySelectorAll('*');
const hardcodedColors = [
  'bg-white',
  'bg-black',
  'bg-gray-',
  'text-gray-',
  'border-gray-',
  'text-white',
  'text-black',
];

elements.forEach(el => {
  const classes = el.className;
  hardcodedColors.forEach(color => {
    if (classes.includes(color) && !classes.includes('dark:')) {
      console.warn('Hardcoded color without dark variant:', el, color);
    }
  });
});
```

---

## Implementation Plan

### Phase 1: Core Setup (Day 1)

1. [ ] Update `globals.css` with complete CSS variables
2. [ ] Update `tailwind.config.ts` with semantic colors
3. [ ] Create utility classes
4. [ ] Test theme toggle functionality

### Phase 2: Component Migration (Days 2-3)

1. [ ] Migrate Navbar component
2. [ ] Migrate Footer component
3. [ ] Migrate all Card components
4. [ ] Migrate Form components
5. [ ] Migrate Button variants

### Phase 3: Page Updates (Days 4-5)

1. [ ] Update landing page
2. [ ] Update assessment pages
3. [ ] Update documentation pages
4. [ ] Update error pages

### Phase 4: Testing & Refinement (Day 6)

1. [ ] Visual regression testing
2. [ ] Contrast ratio validation
3. [ ] Cross-browser testing
4. [ ] Mobile device testing

---

## Dark Mode Best Practices

### DO ✅

- Use semantic color tokens (background, foreground, etc.)
- Maintain contrast ratios in both modes
- Test with system preferences
- Use CSS variables for consistency
- Consider reduced motion preferences
- Test with actual users

### DON'T ❌

- Use opacity for color variations (affects contrast)
- Hardcode color values
- Mix semantic and literal color names
- Forget hover/focus states
- Ignore loading states
- Skip dark mode for new components

---

## Debugging Tools

### Browser DevTools

```javascript
// Check for hardcoded colors in Console
Array.from(document.querySelectorAll('*')).filter(el => {
  const styles = getComputedStyle(el);
  return (
    styles.backgroundColor.includes('rgb(255, 255, 255)') || styles.color.includes('rgb(0, 0, 0)')
  );
});
```

### VS Code Search Patterns

Search for problematic patterns:

- `bg-white(?!.*dark:)` - White backgrounds without dark variant
- `text-gray-\d{3}(?!.*dark:)` - Gray text without dark variant
- `#[0-9a-fA-F]{6}` - Hardcoded hex colors
- `rgb\(` - RGB color values

---

## Component Library Documentation

### Theme-Aware Component Template

```tsx
// components/ui/ThemeAwareComponent.tsx
import { cn } from '@/lib/utils';

interface ThemeAwareComponentProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  children: React.ReactNode;
}

export function ThemeAwareComponent({
  variant = 'primary',
  className,
  children,
}: ThemeAwareComponentProps) {
  const variants = {
    primary: 'surface-primary',
    secondary: 'surface-secondary',
    tertiary: 'surface-tertiary',
  };

  return (
    <div
      className={cn(variants[variant], 'p-4 rounded-lg transition-colors duration-200', className)}
    >
      {children}
    </div>
  );
}
```

---

## Success Metrics

### Measurable Goals

- **0 hardcoded colors** in component files
- **100% components** with dark mode support
- **All contrast ratios** meet WCAG AA in both modes
- **No FOUC** (Flash of Unstyled Content) on theme switch
- **<100ms** theme transition time

### Quality Checks

- [ ] Automated theme consistency tests pass
- [ ] No console warnings about missing dark variants
- [ ] User preference persistence works
- [ ] System preference detection works
- [ ] Theme toggle animation smooth

---

_Last Updated: December 2024_  
_Next Review: After Phase 4 completion_
