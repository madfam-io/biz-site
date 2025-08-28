#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const BACKUP_DIR = 'packages/i18n/src/translations/backup';
const OUTPUT_DIR = 'packages/i18n/src/translations/backup/split';
const MAX_LINES = 800;

// Languages to process
const LANGUAGES = ['en', 'es', 'pt-br'];

// Main sections to split by
const SECTIONS = [
  'common',
  'footer',
  'home',
  'services',
  'products',
  'corporate',
  'assessment',
  'calculator',
  'estimator',
  'legal',
  'system',
  'forms',
  'pages',
];

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function countLines(text) {
  return text.split('\n').length;
}

function splitTranslationFile(language) {
  const inputFile = path.join(BACKUP_DIR, `${language}.json`);

  if (!fs.existsSync(inputFile)) {
    console.log(`⚠️  File not found: ${inputFile}`);
    return;
  }

  console.log(`📄 Processing: ${language}.json`);

  // Read and parse the original file
  const content = fs.readFileSync(inputFile, 'utf8');
  const translations = JSON.parse(content);

  // Create output directory for this language
  const langOutputDir = path.join(OUTPUT_DIR, language);
  ensureDirectoryExists(langOutputDir);

  // Split by sections
  const sectionFiles = {};
  let remainingData = {};

  SECTIONS.forEach(section => {
    if (translations[section]) {
      const sectionData = { [section]: translations[section] };
      const sectionJson = JSON.stringify(sectionData, null, 2);
      const lineCount = countLines(sectionJson);

      if (lineCount > MAX_LINES) {
        // Further split large sections
        const subsections = Object.keys(translations[section]);
        const chunks = [];
        let currentChunk = {};
        let currentLines = 0;

        for (const subsection of subsections) {
          const subsectionData = { [subsection]: translations[section][subsection] };
          const subsectionJson = JSON.stringify(subsectionData, null, 2);
          const subsectionLines = countLines(subsectionJson);

          if (currentLines + subsectionLines > MAX_LINES && Object.keys(currentChunk).length > 0) {
            chunks.push({ ...currentChunk });
            currentChunk = {};
            currentLines = 0;
          }

          currentChunk[subsection] = translations[section][subsection];
          currentLines += subsectionLines;
        }

        if (Object.keys(currentChunk).length > 0) {
          chunks.push(currentChunk);
        }

        // Write chunks
        chunks.forEach((chunk, index) => {
          const filename = chunks.length > 1 ? `${section}-${index + 1}.json` : `${section}.json`;
          const chunkData = { [section]: chunk };
          const outputFile = path.join(langOutputDir, filename);
          const finalJson = JSON.stringify(chunkData, null, 2);

          fs.writeFileSync(outputFile, finalJson);
          console.log(`  ✅ Created: ${filename} (${countLines(finalJson)} lines)`);
        });
      } else {
        const outputFile = path.join(langOutputDir, `${section}.json`);
        fs.writeFileSync(outputFile, sectionJson);
        console.log(`  ✅ Created: ${section}.json (${lineCount} lines)`);
      }

      sectionFiles[section] = true;
    }
  });

  // Handle remaining data
  Object.keys(translations).forEach(key => {
    if (!sectionFiles[key]) {
      remainingData[key] = translations[key];
    }
  });

  if (Object.keys(remainingData).length > 0) {
    const remainingJson = JSON.stringify(remainingData, null, 2);
    const remainingLines = countLines(remainingJson);

    if (remainingLines > MAX_LINES) {
      console.log(`  ⚠️  Remaining data still large: ${remainingLines} lines`);
    }

    const outputFile = path.join(langOutputDir, 'misc.json');
    fs.writeFileSync(outputFile, remainingJson);
    console.log(`  ✅ Created: misc.json (${remainingLines} lines)`);
  }

  // Create index file
  const indexContent = `# Translation Files for ${language.toUpperCase()}

This directory contains split translation files to keep each under 800 lines.

Original file: \`${language}.json\` (${countLines(content)} lines)

## Split Files:
${fs
  .readdirSync(langOutputDir)
  .filter(f => f.endsWith('.json'))
  .map(f => {
    const filePath = path.join(langOutputDir, f);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = countLines(fileContent);
    return `- \`${f}\` (${lines} lines)`;
  })
  .join('\n')}

## Usage:
These files can be imported individually or combined as needed.
`;

  fs.writeFileSync(path.join(langOutputDir, 'README.md'), indexContent);
  console.log(`  📋 Created: README.md`);
}

// Main execution
function main() {
  console.log('🚀 Starting translation file splitting...\n');

  ensureDirectoryExists(OUTPUT_DIR);

  LANGUAGES.forEach(language => {
    splitTranslationFile(language);
    console.log('');
  });

  console.log('✨ Translation splitting complete!');
}

main();
