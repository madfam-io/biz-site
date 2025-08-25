#!/usr/bin/env node

/**
 * Translation Validation Script
 * Validates that all translation keys exist across all locales
 */

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '../packages/i18n/src/translations');
const LOCALES = ['es', 'en', 'pt-br'];

// Load all translation files
const translations = {};
let allKeys = new Set();

console.log('🔍 Loading translation files...\n');

LOCALES.forEach(locale => {
  const filePath = path.join(TRANSLATIONS_DIR, `${locale}.json`);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    translations[locale] = JSON.parse(content);
    console.log(`✅ Loaded ${locale}.json`);
  } catch (error) {
    console.error(`❌ Error loading ${locale}.json:`, error.message);
    process.exit(1);
  }
});

// Extract all keys from all locales
function extractKeys(obj, prefix = '') {
  const keys = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...extractKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

// Get all unique keys from all locales
LOCALES.forEach(locale => {
  const keys = extractKeys(translations[locale]);
  keys.forEach(key => allKeys.add(key));
});

console.log(`\n📊 Total unique keys found: ${allKeys.size}\n`);

// Check for missing keys in each locale
let hasErrors = false;
const missingKeys = {};

LOCALES.forEach(locale => {
  missingKeys[locale] = [];
  const localeKeys = new Set(extractKeys(translations[locale]));

  allKeys.forEach(key => {
    if (!localeKeys.has(key)) {
      missingKeys[locale].push(key);
      hasErrors = true;
    }
  });
});

// Report results
console.log('🔍 Validation Results:\n');

LOCALES.forEach(locale => {
  const missing = missingKeys[locale];
  const total = allKeys.size;
  const coverage = (((total - missing.length) / total) * 100).toFixed(1);

  if (missing.length === 0) {
    console.log(`✅ ${locale}: Complete (${total} keys, 100% coverage)`);
  } else {
    console.log(`❌ ${locale}: Missing ${missing.length} keys (${coverage}% coverage)`);

    if (process.env.VERBOSE === 'true') {
      console.log('   Missing keys:');
      missing.slice(0, 10).forEach(key => {
        console.log(`   - ${key}`);
      });
      if (missing.length > 10) {
        console.log(`   ... and ${missing.length - 10} more`);
      }
    }
  }
});

// Check for keys that exist in only one locale (potential typos)
console.log('\n🔍 Checking for potential typos (keys in only one locale):\n');

const keyLocaleCount = {};
allKeys.forEach(key => {
  keyLocaleCount[key] = 0;
  LOCALES.forEach(locale => {
    const localeKeys = new Set(extractKeys(translations[locale]));
    if (localeKeys.has(key)) {
      keyLocaleCount[key]++;
    }
  });
});

const orphanKeys = Object.entries(keyLocaleCount)
  .filter(([key, count]) => count === 1)
  .map(([key]) => key);

if (orphanKeys.length > 0) {
  console.log(`⚠️  Found ${orphanKeys.length} keys that exist in only one locale:`);
  orphanKeys.slice(0, 5).forEach(key => {
    const locale = LOCALES.find(l => new Set(extractKeys(translations[l])).has(key));
    console.log(`   - ${key} (only in ${locale})`);
  });
  if (orphanKeys.length > 5) {
    console.log(`   ... and ${orphanKeys.length - 5} more`);
  }
} else {
  console.log('✅ No orphan keys found');
}

// Summary
console.log('\n📋 Summary:');
console.log(`   Total locales: ${LOCALES.length}`);
console.log(`   Total unique keys: ${allKeys.size}`);
console.log(`   Validation: ${hasErrors ? '❌ Failed' : '✅ Passed'}`);

if (hasErrors) {
  console.log('\n💡 Run with VERBOSE=true to see all missing keys:');
  console.log('   VERBOSE=true node scripts/validate-translations.js');
}

process.exit(hasErrors ? 1 : 0);
