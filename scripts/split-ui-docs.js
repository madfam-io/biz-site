#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'docs/guides/MADFAM-UI-DOCUMENTATION.md';
const OUTPUT_DIR = 'docs/guides/ui';
const MAX_LINES = 800;

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function countLines(text) {
  return text.split('\n').length;
}

function extractSections(content) {
  const lines = content.split('\n');
  const sections = [];
  let currentSection = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for major sections (## level)
    if (line.match(/^## /)) {
      // Save previous section
      if (currentSection) {
        sections.push(currentSection);
      }

      // Start new section
      currentSection = {
        title: line.replace(/^## /, ''),
        slug: line
          .replace(/^## /, '')
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-'),
        content: [line],
        startLine: i,
      };
    } else if (currentSection) {
      currentSection.content.push(line);
    }
  }

  // Don't forget the last section
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

function groupSections(sections) {
  const groups = [
    {
      name: 'getting-started',
      title: 'Getting Started',
      sections: ['overview', 'installation-setup', 'design-system'],
      maxLines: MAX_LINES,
    },
    {
      name: 'core-components',
      title: 'Core Components',
      sections: ['assessment', 'button', 'card', 'container'],
      maxLines: MAX_LINES,
    },
    {
      name: 'interface-components',
      title: 'Interface Components',
      sections: ['cta-call-to-action', 'features', 'heading', 'hero'],
      maxLines: MAX_LINES,
    },
    {
      name: 'form-components',
      title: 'Form Components',
      sections: ['leadform', 'newsletter', 'roicalculator'],
      maxLines: MAX_LINES,
    },
    {
      name: 'display-components',
      title: 'Display Components',
      sections: ['productcard', 'servicecard', 'spinner', 'testimonial-testimonialcard'],
      maxLines: MAX_LINES,
    },
    {
      name: 'advanced-usage',
      title: 'Advanced Usage & Best Practices',
      sections: [
        'utility-functions',
        'best-practices',
        'advanced-usage',
        'typescript-support',
        'contributing',
        'support-resources',
      ],
      maxLines: MAX_LINES,
    },
  ];

  const sectionMap = {};
  sections.forEach(section => {
    sectionMap[section.slug] = section;
  });

  const groupedFiles = [];

  groups.forEach(group => {
    let combinedContent = [`# ${group.title}\n`];
    let totalLines = 1;
    let currentBatch = [];
    let batchNumber = 1;

    group.sections.forEach(sectionSlug => {
      const section = sectionMap[sectionSlug];
      if (section) {
        const sectionLines = section.content.length;

        if (totalLines + sectionLines > group.maxLines && currentBatch.length > 0) {
          // Save current batch and start new one
          groupedFiles.push({
            filename:
              group.sections.length > 3 ? `${group.name}-${batchNumber}.md` : `${group.name}.md`,
            content: combinedContent.join('\n'),
            lineCount: totalLines,
          });

          combinedContent = [`# ${group.title} (Part ${batchNumber + 1})\n`];
          totalLines = 1;
          currentBatch = [];
          batchNumber++;
        }

        combinedContent.push(`## ${section.title}\n`);
        combinedContent.push(...section.content.slice(1)); // Skip the title line as we've already added it
        combinedContent.push(''); // Add spacing
        totalLines += sectionLines + 1;
        currentBatch.push(section);
      }
    });

    // Save final batch
    if (currentBatch.length > 0) {
      const filename = batchNumber === 1 ? `${group.name}.md` : `${group.name}-${batchNumber}.md`;
      groupedFiles.push({
        filename,
        content: combinedContent.join('\n'),
        lineCount: totalLines,
      });
    }
  });

  return groupedFiles;
}

function main() {
  console.log('🚀 Starting UI documentation splitting...\n');

  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ Input file not found: ${INPUT_FILE}`);
    process.exit(1);
  }

  ensureDirectoryExists(OUTPUT_DIR);

  // Read original file
  const originalContent = fs.readFileSync(INPUT_FILE, 'utf8');
  const originalLines = countLines(originalContent);

  console.log(`📄 Processing: MADFAM-UI-DOCUMENTATION.md (${originalLines} lines)`);

  // Extract sections
  const sections = extractSections(originalContent);
  console.log(`🔍 Found ${sections.length} sections`);

  // Group sections into files
  const groupedFiles = groupSections(sections);

  // Write grouped files
  groupedFiles.forEach(file => {
    const outputPath = path.join(OUTPUT_DIR, file.filename);
    fs.writeFileSync(outputPath, file.content);
    console.log(`  ✅ Created: ${file.filename} (${file.lineCount} lines)`);
  });

  // Create index file
  const indexContent = `# MADFAM UI Documentation Index

This directory contains the modular MADFAM UI component library documentation.

Original file: \`MADFAM-UI-DOCUMENTATION.md\` (${originalLines} lines) → Split into ${groupedFiles.length} files

## Documentation Files:

${groupedFiles
  .map(
    file =>
      `- [${file.filename
        .replace('.md', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())}](./${file.filename}) (${file.lineCount} lines)`
  )
  .join('\n')}

## Quick Navigation:

- **[Getting Started](./getting-started.md)** - Installation, setup, and design system
- **[Core Components](./core-components.md)** - Assessment, Button, Card, Container
- **[Interface Components](./interface-components.md)** - CTA, Features, Heading, Hero
- **[Form Components](./form-components.md)** - LeadForm, Newsletter, ROI Calculator
- **[Display Components](./display-components.md)** - ProductCard, ServiceCard, Spinner, Testimonials
- **[Advanced Usage](./advanced-usage.md)** - Best practices, TypeScript, contributing

## Original File:

The original comprehensive documentation is available at \`../MADFAM-UI-DOCUMENTATION.md\` and can be removed after verifying the split files are complete.
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'README.md'), indexContent);
  console.log(`  📋 Created: README.md`);

  console.log(`\n✨ UI documentation splitting complete!`);
  console.log(
    `📊 Summary: ${originalLines} lines → ${groupedFiles.length} files (max ${Math.max(...groupedFiles.map(f => f.lineCount))} lines per file)`
  );
}

main();
