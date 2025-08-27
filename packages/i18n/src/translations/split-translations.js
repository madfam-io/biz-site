#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Function to split translations
function splitTranslations(locale) {
  const inputFile = path.join(__dirname, `${locale}.json`);
  const outputDir = path.join(__dirname, locale);

  // Read the main translation file
  const translations = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

  // Ensure output directory exists
  ensureDir(outputDir);

  // Group related keys
  const groups = {
    // Core/Common translations
    common: {
      nav: translations.common?.nav,
      cta: translations.common?.cta,
      footer: translations.common?.footer || translations.footer,
      darkMode: translations.common?.darkMode,
      metadata: translations.common?.metadata,
      ...Object.fromEntries(
        Object.entries(translations.common || {}).filter(
          ([key]) => !['nav', 'cta', 'footer', 'darkMode', 'metadata'].includes(key)
        )
      ),
    },

    // Assessment & Calculator
    assessment: translations.assessment,
    calculator: translations.calculator,
    estimator: translations.estimator,

    // Products & Services
    products: translations.products,
    services: translations.services,

    // Corporate & Business
    corporate: translations.corporate,

    // Pages
    pages: {
      home: translations.home,
      about: translations.about,
      contact: translations.contact,
      careers: translations.careers,
      caseStudies: translations.caseStudies,
      showcase: translations.showcase,
      blog: translations.blog,
      guides: translations.guides,
      docs: translations.docs,
      search: translations.search,
      privacy: translations.privacy,
      terms: translations.terms,
      cookies: translations.cookies,
    },

    // Forms & Auth
    forms: {
      leadForm: translations.leadForm,
      auth: translations.auth,
    },

    // System & API
    system: {
      api: translations.api,
      dashboard: translations.dashboard,
      error: translations.error,
      notFound: translations.notFound,
    },
  };

  // Write each group to its own file
  Object.entries(groups).forEach(([groupName, content]) => {
    const outputFile = path.join(outputDir, `${groupName}.json`);

    // Skip if content is empty or just contains undefined values
    const hasContent = content && Object.values(content).some(v => v !== undefined);
    if (!hasContent) return;

    // Clean up undefined values
    const cleanContent = JSON.parse(JSON.stringify(content));

    fs.writeFileSync(outputFile, JSON.stringify(cleanContent, null, 2));
    console.log(`✅ Created ${locale}/${groupName}.json`);
  });

  // Create index.ts that merges all translations
  const indexContent = `// Auto-generated file - Do not edit manually
import common from './common.json';
import assessment from './assessment.json';
import calculator from './calculator.json';
import estimator from './estimator.json';
import products from './products.json';
import services from './services.json';
import corporate from './corporate.json';
import pages from './pages.json';
import forms from './forms.json';
import system from './system.json';

export default {
  common,
  ...common, // Spread common at root level for backward compatibility
  assessment,
  calculator,
  estimator,
  products,
  services,
  corporate,
  ...pages,
  ...forms,
  ...system
};
`;

  fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
  console.log(`✅ Created ${locale}/index.ts`);

  // Count lines saved
  const originalLines = fs.readFileSync(inputFile, 'utf8').split('\n').length;
  console.log(
    `📊 Split ${locale}.json (${originalLines} lines) into ${Object.keys(groups).length} modules`
  );
}

// Process all locales
const locales = ['en', 'es', 'pt-br'];

console.log('🚀 Starting translation file refactoring...\n');

locales.forEach(locale => {
  console.log(`\n📁 Processing ${locale}...`);
  splitTranslations(locale);
});

console.log('\n✨ Translation refactoring complete!');
console.log('\n📝 Next steps:');
console.log('1. Update your i18n configuration to use the new modular structure');
console.log('2. Test that all translations are still working');
console.log('3. Consider removing the original large JSON files after verification');
