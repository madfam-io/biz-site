# Internationalization & Design

i18n implementation and design system guidelines

### **Supported Locales**

- **Spanish (es-MX)** - Primary market and default
- **English (en-US)** - International business
- **Portuguese (pt-BR)** - Brazilian market expansion

### **Implementation**

```tsx
// Server Components
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('home');

  return <h1>{t('hero.title')}</h1>;
}

// Client Components
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');

  return <button>{t('submit')}</button>;
}
```

### **Adding New Translations**

1. Add keys to `packages/i18n/src/translations/[locale].json`
2. Use hierarchical structure: `page.section.element`
3. Test in all locales before committing
4. Update `missing-translations.md` if incomplete

---

## 🎨 Design System

### **Color Palette**

```tsx
// Primary Brand Colors
const colors = {
  primary: '#0A0E27', // Obsidian (dark navy)
  secondary: '#FFD93D', // Sun (bright yellow)
  accent: '#9B59B6', // Lavender (purple)
  success: '#6BCB77', // Leaf (green)
  surface: '#FAFAFA', // Pearl (off-white)

  // Semantic Colors
  error: '#E74C3C',
  warning: '#F39C12',
  info: '#3498DB',

  // Neutral Grays
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    // ... full scale
    900: '#0F172A',
  },
};
```

### **Typography Scale**

```tsx
const typography = {
  // Headings (Poppins)
  'display-1': 'text-5xl md:text-6xl font-bold font-heading',
  'display-2': 'text-4xl md:text-5xl font-bold font-heading',
  h1: 'text-3xl md:text-4xl font-bold font-heading',
  h2: 'text-2xl md:text-3xl font-semibold font-heading',
  h3: 'text-xl md:text-2xl font-semibold font-heading',

  // Body text (Inter)
  'body-lg': 'text-lg font-body',
  body: 'text-base font-body',
  'body-sm': 'text-sm font-body',

  // Code (Space Mono)
  code: 'text-sm font-mono',
};
```

### **Spacing System** (8px grid)

```tsx
const spacing = {
  xs: '0.5rem', // 8px
  sm: '1rem', // 16px
  md: '2rem', // 32px
  lg: '3rem', // 48px
  xl: '4rem', // 64px
  '2xl': '6rem', // 96px
  '3xl': '8rem', // 128px
};
```

---
