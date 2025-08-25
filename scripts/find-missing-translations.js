#!/usr/bin/env node

/**
 * Find Missing Translations Script
 * Scans codebase for translation key usage and identifies missing keys
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const TRANSLATIONS_DIR = path.join(__dirname, '../packages/i18n/src/translations');
const APPS_DIR = path.join(__dirname, '../apps/web');
const PACKAGES_DIR = path.join(__dirname, '../packages');

// Load translation files
const translations = {};
const LOCALES = ['es', 'en', 'pt-br'];

console.log('🔍 Loading translation files...\n');

LOCALES.forEach(locale => {
  const filePath = path.join(TRANSLATIONS_DIR, `${locale}.json`);
  try {
    translations[locale] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`✅ Loaded ${locale}.json`);
  } catch (error) {
    console.error(`❌ Error loading ${locale}.json:`, error.message);
    process.exit(1);
  }
});

// Extract all translation keys from files
function getAllTranslationKeys(obj, prefix = '') {
  const keys = new Set();

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const subKeys = getAllTranslationKeys(value, fullKey);
      subKeys.forEach(k => keys.add(k));
    } else {
      keys.add(fullKey);
    }
  }

  return keys;
}

// Get all available translation keys
const availableKeys = new Set();
LOCALES.forEach(locale => {
  const keys = getAllTranslationKeys(translations[locale]);
  keys.forEach(key => availableKeys.add(key));
});

console.log(`\n📊 Total available translation keys: ${availableKeys.size}\n`);

// Find all TypeScript/JavaScript files
console.log('🔍 Scanning codebase for translation usage...\n');

const patterns = [`${APPS_DIR}/**/*.{ts,tsx,js,jsx}`, `${PACKAGES_DIR}/**/*.{ts,tsx,js,jsx}`];

const files = [];
patterns.forEach(pattern => {
  const matches = glob.sync(pattern, {
    ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
  });
  files.push(...matches);
});

console.log(`📁 Found ${files.length} files to scan\n`);

// Regular expressions to find translation usage
const translationPatterns = [
  /t\(['"`]([^'"`]+)['"`]\)/g, // t('key')
  /t\(['"`]([^'"`]+)['"`],/g, // t('key', ...)
  /useTranslations\(['"`]([^'"`]+)['"`]\)/g, // useTranslations('namespace')
  /getTranslations\(['"`]([^'"`]+)['"`]\)/g, // getTranslations('namespace')
  /\$t\(['"`]([^'"`]+)['"`]\)/g, // $t('key')
];

const usedKeys = new Set();
const keyUsage = {};

// Scan files for translation keys
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  translationPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const key = match[1];
      usedKeys.add(key);

      if (!keyUsage[key]) {
        keyUsage[key] = [];
      }
      keyUsage[key].push(file.replace(path.join(__dirname, '..'), ''));
    }
  });
});

console.log(`📊 Found ${usedKeys.size} translation keys used in code\n`);

// Find missing keys (used but not defined)
const missingKeys = [];
usedKeys.forEach(key => {
  if (!availableKeys.has(key)) {
    // Check if it's a partial key that might be completed with namespace
    const possibleKeys = Array.from(availableKeys).filter(k => k.endsWith(`.${key}`));
    if (possibleKeys.length === 0) {
      missingKeys.push(key);
    }
  }
});

// Find unused keys (defined but not used)
const unusedKeys = [];
availableKeys.forEach(key => {
  let isUsed = false;

  // Check direct usage
  if (usedKeys.has(key)) {
    isUsed = true;
  }

  // Check partial usage (namespace.key pattern)
  const keyParts = key.split('.');
  for (let i = 0; i < keyParts.length; i++) {
    const partialKey = keyParts.slice(i).join('.');
    if (usedKeys.has(partialKey)) {
      isUsed = true;
      break;
    }
  }

  if (!isUsed) {
    unusedKeys.push(key);
  }
});

// Report results
console.log('📋 Analysis Results:\n');

if (missingKeys.length > 0) {
  console.log(`❌ Missing Keys (used in code but not in translations): ${missingKeys.length}`);
  missingKeys.slice(0, 10).forEach(key => {
    console.log(`   - ${key}`);
    if (keyUsage[key] && keyUsage[key].length > 0) {
      console.log(`     Used in: ${keyUsage[key][0]}`);
    }
  });
  if (missingKeys.length > 10) {
    console.log(`   ... and ${missingKeys.length - 10} more`);
  }
} else {
  console.log('✅ No missing keys found');
}

console.log('');

if (unusedKeys.length > 0) {
  console.log(`⚠️  Potentially Unused Keys: ${unusedKeys.length}`);
  if (process.env.SHOW_UNUSED === 'true') {
    unusedKeys.slice(0, 20).forEach(key => {
      console.log(`   - ${key}`);
    });
    if (unusedKeys.length > 20) {
      console.log(`   ... and ${unusedKeys.length - 20} more`);
    }
  } else {
    console.log('   Run with SHOW_UNUSED=true to see unused keys');
  }
} else {
  console.log('✅ No unused keys found');
}

// Check for hardcoded strings
console.log('\n🔍 Checking for potential hardcoded strings...\n');

const hardcodedPatterns = [
  /aria-label=["']([^"']+)["']/g,
  /title=["']([^"']+)["']/g,
  /placeholder=["']([^"']+)["']/g,
  /alt=["']([^"']+)["']/g,
];

const hardcodedStrings = new Map();

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  hardcodedPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const text = match[1];
      // Filter out dynamic values and common patterns
      if (
        text.length > 3 &&
        !text.includes('{') &&
        !text.includes('$') &&
        !text.match(/^[a-z-]+$/) && // Skip kebab-case identifiers
        !text.match(/^[A-Z_]+$/)
      ) {
        // Skip constants

        if (!hardcodedStrings.has(text)) {
          hardcodedStrings.set(text, []);
        }
        hardcodedStrings.get(text).push(file.replace(path.join(__dirname, '..'), ''));
      }
    }
  });
});

if (hardcodedStrings.size > 0) {
  console.log(`⚠️  Found ${hardcodedStrings.size} potential hardcoded strings:`);
  const entries = Array.from(hardcodedStrings.entries()).slice(0, 10);
  entries.forEach(([text, files]) => {
    console.log(`   - "${text}"`);
    console.log(`     Found in: ${files[0]}`);
  });
  if (hardcodedStrings.size > 10) {
    console.log(`   ... and ${hardcodedStrings.size - 10} more`);
  }
} else {
  console.log('✅ No obvious hardcoded strings found');
}

// Summary
console.log('\n📊 Summary:');
console.log(`   Files scanned: ${files.length}`);
console.log(`   Translation keys in use: ${usedKeys.size}`);
console.log(`   Available translation keys: ${availableKeys.size}`);
console.log(`   Missing keys: ${missingKeys.length}`);
console.log(`   Potentially unused keys: ${unusedKeys.length}`);
console.log(`   Hardcoded strings: ${hardcodedStrings.size}`);

process.exit(missingKeys.length > 0 ? 1 : 0);
