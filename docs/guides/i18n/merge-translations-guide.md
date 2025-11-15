# Translation Merge Guide

## Overview

This guide provides instructions for merging the missing translations into the existing translation files for all three locales (en-US, es-MX, pt-BR).

## Files Created

1. `missing-translations-en-US.json` - English (US) translations
2. `missing-translations-es-MX.json` - Spanish (Mexico) translations
3. `missing-translations-pt-BR.json` - Portuguese (Brazil) translations

## Missing Translation Categories

### 1. Calculator Page (`calculator`)

- **meta**: Page metadata (title, description)
- **hero.subtitle**: Hero section subtitle
- **selectionHint**: Instructions for using the calculator
- **cta**: Call-to-action section with title, subtitle, and buttons

### 2. Contact Page (`contact`)

- **hero**: Hero section with title prefix, highlight, and subtitle
- **form.title**: Form section title
- **alternativeContact**: Alternative contact methods section
- **immediateHelp**: Immediate help section for scheduling quick calls

### 3. Estimator Page (`estimator`)

- **meta**: Page metadata (title, description)
- **hero.subtitle**: Hero section subtitle
- **trust**: Trust indicators section with three key points
- **disclaimer**: Disclaimer text about estimates

### 4. Showcase Component (`showcase`)

- **title**: Component showcase title
- **toggleDarkMode**: Dark mode toggle button text
- **sections**: Section labels
- **buttons**: Button variant labels
- **badges**: Badge labels
- **featureFlag**: Feature flag related messages
- **features**: Features section subtitle and description

### 5. Common Terms (`common`)

- **metadata**: Common metadata labels (email, whatsapp)

## Merge Instructions

### Step 1: Backup Current Files

```bash
cd /Users/aldoruizluna/labspace/biz-site/packages/i18n/src/translations
cp en-US.json en-US.json.backup
cp es-MX.json es-MX.json.backup
cp pt-BR.json pt-BR.json.backup
```

### Step 2: Merge Translations

For each locale file, you need to merge the corresponding missing translations. The translations should be added to the existing structure, maintaining the hierarchical organization.

#### For en-US.json:

1. Add the `calculator.meta`, `calculator.hero.subtitle`, `calculator.selectionHint`, and `calculator.cta` objects
2. Add the missing `contact` sections
3. Add the missing `estimator` sections
4. Add the new `showcase` section
5. Add `common.metadata`

#### For es-MX.json:

1. Similar structure as en-US, but with Spanish translations
2. Note: Some sections like `calculator` and `estimator` already exist, so only add the missing nested properties

#### For pt-BR.json:

1. Similar structure as en-US, but with Portuguese translations
2. Note: Some sections already exist, so only add the missing nested properties

### Step 3: Validate JSON

After merging, validate that the JSON files are properly formatted:

```bash
# Install jq if not already installed
# brew install jq (macOS)

# Validate each file
jq . en-US.json > /dev/null && echo "en-US.json is valid"
jq . es-MX.json > /dev/null && echo "es-MX.json is valid"
jq . pt-BR.json > /dev/null && echo "pt-BR.json is valid"
```

### Step 4: Test in Application

1. Start the development server
2. Test each locale by changing the URL:
   - `/en-US/calculator`
   - `/es-MX/calculator`
   - `/pt-BR/calculator`
3. Verify all new translations appear correctly

## Translation Quality Notes

### English (en-US)

- Professional, clear, and concise language
- Business-oriented terminology
- Active voice preferred

### Spanish (es-MX)

- Formal "usted" form used for business context
- Mexican Spanish idioms and terminology
- Consistent with existing translations

### Portuguese (pt-BR)

- Brazilian Portuguese conventions
- Formal business language
- Consistent with existing voice and tone

## Components to Update

After merging translations, update these components to use the new keys:

1. `/app/[locale]/calculator/page.tsx`
   - Replace hardcoded Spanish text with translation keys
   - Update metadata to use translations

2. `/app/[locale]/contact/page.tsx`
   - Replace all hardcoded text with translation keys
   - Ensure form labels use translations

3. `/app/[locale]/estimator/page.tsx`
   - Replace hardcoded Spanish text with translation keys
   - Update metadata to use translations

4. `/components/ShowcaseContent.tsx`
   - Replace all hardcoded English text with translation keys
   - Ensure all UI elements are translatable

## Example Usage in Components

```typescript
// In calculator/page.tsx
import { useTranslations } from 'next-intl';

export default function CalculatorPage() {
  const t = useTranslations();

  return (
    <>
      <h1>{t('calculator.hero.subtitle')}</h1>
      <p>{t('calculator.selectionHint')}</p>
      {/* ... */}
    </>
  );
}
```

## Verification Checklist

- [ ] All JSON files are valid
- [ ] No duplicate keys exist
- [ ] All translations maintain consistent tone
- [ ] Special characters are properly escaped
- [ ] All three locales have the same key structure
- [ ] Components are updated to use new keys
- [ ] Application displays correct translations
- [ ] No console errors related to missing translations

## Common Issues and Solutions

1. **Nested key conflicts**: If a key already exists, merge the nested properties carefully
2. **Character encoding**: Ensure UTF-8 encoding for special characters
3. **JSON syntax errors**: Use a JSON validator to check syntax
4. **Missing imports**: Ensure `useTranslations` hook is imported in components

## Next Steps

1. After successful merge, delete the temporary translation files
2. Commit changes with clear message: "feat: add missing translations for calculator, contact, estimator, and showcase"
3. Run full test suite to ensure no regressions
4. Deploy to staging for final verification
