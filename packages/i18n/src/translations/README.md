# Translation File Structure

## Overview

The translation files have been refactored from large monolithic JSON files (~1,800 lines each) into smaller, domain-specific modules for better maintainability and organization.

## Directory Structure

```
translations/
├── en/                    # English translations
│   ├── common.json       # Common UI elements (50 lines)
│   ├── assessment.json   # AI assessment feature (74 lines)
│   ├── calculator.json   # ROI calculator (49 lines)
│   ├── corporate.json    # Corporate content (545 lines)
│   ├── estimator.json    # Project estimator (145 lines)
│   ├── forms.json        # Forms & auth (55 lines)
│   ├── pages.json        # Page-specific content (381 lines)
│   ├── products.json     # Product descriptions (83 lines)
│   ├── services.json     # Service offerings (294 lines)
│   ├── system.json       # System messages (70 lines)
│   └── index.ts          # Module aggregator
├── es/                   # Spanish translations (same structure)
├── pt-br/                # Portuguese-Brazilian translations (same structure)
└── backup/               # Original monolithic files (archived)
```

## Benefits of Modular Structure

### 1. **Improved Maintainability**

- Largest file reduced from 1,797 lines to 545 lines
- Easier to locate and update specific translations
- Clear separation of concerns by domain

### 2. **Better Collaboration**

- Reduced merge conflicts when multiple developers work on translations
- Teams can own specific translation modules
- Easier code reviews with smaller, focused files

### 3. **Performance Optimization Potential**

- Ready for lazy loading implementation
- Can load only necessary translation modules per page
- Reduced initial bundle size potential

### 4. **Organization**

- **common**: Navigation, CTAs, footer, basic UI elements
- **assessment/calculator/estimator**: Interactive tools
- **corporate**: Business unit and company information
- **products/services**: Offerings and features
- **pages**: Page-specific content
- **forms**: Form fields and validation messages
- **system**: API responses, errors, dashboard

## Usage

The modular translations are automatically merged by the index files. The existing code continues to work without changes:

```typescript
// In your components
import { useTranslations } from 'next-intl';

const t = useTranslations('corporate.arms');
// Works exactly as before
```

## Migration Notes

1. **Original Files**: Backed up in `backup/` directory
2. **File Sizes**: Reduced from ~1,800 lines to max 545 lines per file
3. **Total Modules**: Split into 10 logical modules per language
4. **Backward Compatibility**: Maintained through index.ts aggregation

## Future Improvements

1. **Lazy Loading**: Implement dynamic imports for route-specific translations
2. **Type Safety**: Generate TypeScript types from translation keys
3. **Translation Management**: Consider integrating with a translation management system
4. **Further Splitting**: The corporate.json (545 lines) could be split further if needed

## Maintenance

When adding new translations:

1. Identify the appropriate module based on the domain
2. Add the translation key to the relevant JSON file
3. Keep related translations together for context
4. Update all language versions simultaneously
