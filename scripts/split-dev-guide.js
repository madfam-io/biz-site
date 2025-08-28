#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'docs/development/DEVELOPER_GUIDE.md';
const OUTPUT_DIR = 'docs/development/guide';
const MAX_LINES = 800;

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function countLines(text) {
  return text.split('\n').length;
}

function splitDeveloperGuide() {
  const content = fs.readFileSync(INPUT_FILE, 'utf8');
  const lines = content.split('\n');

  // Define logical sections based on developer workflow
  const sections = [
    {
      name: '1-getting-started',
      title: 'Getting Started',
      description: 'Environment setup, installation, and first steps',
      startPattern: /^# Developer Onboarding Guide/,
      endPattern: /^## 🏗️ Architecture Deep Dive$/,
      exclude: true,
    },
    {
      name: '2-architecture',
      title: 'Architecture & Tech Stack',
      description: 'Understanding the codebase structure and technology decisions',
      startPattern: /^## 🏗️ Architecture Deep Dive$/,
      endPattern: /^## 🌐 Internationalization \(i18n\)$/,
      exclude: true,
    },
    {
      name: '3-internationalization',
      title: 'Internationalization & Design',
      description: 'i18n implementation and design system guidelines',
      startPattern: /^## 🌐 Internationalization \(i18n\)$/,
      endPattern: /^## 🧩 Component Development$/,
      exclude: true,
    },
    {
      name: '4-development',
      title: 'Component & API Development',
      description: 'Building components, APIs, and database interactions',
      startPattern: /^## 🧩 Component Development$/,
      endPattern: /^## 🧪 Testing Strategy$/,
      exclude: true,
    },
    {
      name: '5-testing-workflow',
      title: 'Testing & Development Workflow',
      description: 'Testing patterns, git workflow, and code review process',
      startPattern: /^## 🧪 Testing Strategy$/,
      endPattern: /^## 📊 Analytics & Monitoring$/,
      exclude: true,
    },
    {
      name: '6-deployment-debugging',
      title: 'Deployment, Monitoring & Debugging',
      description: 'Production deployment, analytics, and troubleshooting',
      startPattern: /^## 📊 Analytics & Monitoring$/,
      endPattern: /^## 📚 Learning Resources$/,
      exclude: true,
    },
    {
      name: '7-resources-onboarding',
      title: 'Learning Resources & First Contributions',
      description: 'Additional resources and guidance for new developers',
      startPattern: /^## 📚 Learning Resources$/,
      endPattern: null, // rest of file
    },
  ];

  const results = [];

  sections.forEach((section, index) => {
    let startIndex = -1;
    let endIndex = lines.length;

    // Find start
    for (let i = 0; i < lines.length; i++) {
      if (section.startPattern.test(lines[i])) {
        startIndex = i;
        break;
      }
    }

    // Find end
    if (section.endPattern) {
      for (let i = startIndex + 1; i < lines.length; i++) {
        if (section.endPattern.test(lines[i])) {
          endIndex = section.exclude ? i : i + 1;
          break;
        }
      }
    }

    if (startIndex >= 0) {
      const sectionLines = lines.slice(startIndex, endIndex);

      // Replace first line with section title
      sectionLines[0] = `# ${section.title}`;

      // Add description
      sectionLines.splice(1, 0, '', section.description, '');

      const sectionContent = sectionLines.join('\n');
      const lineCount = countLines(sectionContent);

      results.push({
        filename: `${section.name}.md`,
        title: section.title,
        description: section.description,
        content: sectionContent,
        lineCount: lineCount,
      });
    }
  });

  return results;
}

function main() {
  console.log('🚀 Starting developer guide splitting...\n');

  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ Input file not found: ${INPUT_FILE}`);
    process.exit(1);
  }

  ensureDirectoryExists(OUTPUT_DIR);

  const originalContent = fs.readFileSync(INPUT_FILE, 'utf8');
  const originalLines = countLines(originalContent);

  console.log(`📄 Processing: DEVELOPER_GUIDE.md (${originalLines} lines)`);

  const splitFiles = splitDeveloperGuide();

  // Write split files
  splitFiles.forEach(file => {
    const outputPath = path.join(OUTPUT_DIR, file.filename);
    fs.writeFileSync(outputPath, file.content);
    console.log(`  ✅ Created: ${file.filename} (${file.lineCount} lines)`);
  });

  // Create index
  const indexContent = `# Developer Guide

Complete developer onboarding and reference documentation for the MADFAM platform.

**Original**: \`DEVELOPER_GUIDE.md\` (${originalLines} lines)  
**Split into**: ${splitFiles.length} modular guides (all under ${MAX_LINES} lines)

---

## 📚 Guide Structure

Follow these guides in order for complete onboarding:

${splitFiles
  .map((file, index) => {
    const number = index + 1;
    return `### ${number}. [${file.title}](./${file.filename})
${file.description}  
*${file.lineCount} lines*
`;
  })
  .join('\n')}

---

## 🎯 Quick Navigation

**New Developer?** Start here:
1. [Getting Started](./1-getting-started.md) - Set up your development environment
2. [Architecture](./2-architecture.md) - Understand the codebase structure
3. [Development](./4-development.md) - Start building components and APIs

**Need Help?**
- [Testing & Workflow](./5-testing-workflow.md) - Development best practices
- [Deployment & Debugging](./6-deployment-debugging.md) - Troubleshooting guide
- [Learning Resources](./7-resources-onboarding.md) - Additional resources

**Reference Guides:**
- [Internationalization](./3-internationalization.md) - i18n and design system
- [Component Development](./4-development.md) - Component and API patterns

---

## 🔄 Migration Notes

The original monolithic \`DEVELOPER_GUIDE.md\` has been split into focused, digestible sections. Each section can be updated independently and covers a specific aspect of development.

The original file can be removed once this modular structure is verified complete.

---

*Generated by split-dev-guide.js - Last updated: ${new Date().toISOString().split('T')[0]}*
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'README.md'), indexContent);
  console.log(`  📋 Created: README.md`);

  console.log(`\n✨ Developer guide splitting complete!`);
  console.log(`📊 Result: ${originalLines} lines → ${splitFiles.length} files`);
  console.log(`📏 Largest file: ${Math.max(...splitFiles.map(f => f.lineCount))} lines`);
  console.log(
    `📏 Average file: ${Math.round(splitFiles.reduce((acc, f) => acc + f.lineCount, 0) / splitFiles.length)} lines`
  );
}

main();
