# Internationalization (i18n)

Documentation for internationalization and translation management.

## Contents

- **INTERNATIONALIZATION.md** - Comprehensive i18n implementation guide
- **i18n-audit-report.md** - i18n audit findings and recommendations
- **merge-translations-guide.md** - Translation merging and management guide

## Supported Locales

- Spanish (es) - Default
- English (en)
- Portuguese (pt)

## Quick Start

```tsx
// Server components
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('namespace');

// Client components
import { useTranslations } from 'next-intl';
const t = useTranslations('namespace');
```

---

Last Updated: November 2024
