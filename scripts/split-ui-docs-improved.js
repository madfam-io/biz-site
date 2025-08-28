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

function splitUIDocumentation() {
  const content = fs.readFileSync(INPUT_FILE, 'utf8');
  const lines = content.split('\n');

  // Define split points based on analysis
  const sections = [
    {
      name: 'getting-started',
      title: 'Getting Started with MADFAM UI',
      startPattern: /^# MADFAM UI Component Library Documentation/,
      endPattern: /^## Components$/,
      exclude: true, // exclude end marker
    },
    {
      name: 'components-core',
      title: 'Core Components',
      startPattern: /^## Components$/,
      endPattern: /^### CTA \(Call-to-Action\)$/,
      exclude: true,
    },
    {
      name: 'components-interface',
      title: 'Interface & Form Components',
      startPattern: /^### CTA \(Call-to-Action\)$/,
      endPattern: /^### ServiceCard$/,
      exclude: true,
    },
    {
      name: 'components-display',
      title: 'Display & Utility Components',
      startPattern: /^### ServiceCard$/,
      endPattern: /^## Utility Functions$/,
      exclude: true,
    },
    {
      name: 'advanced-guide',
      title: 'Advanced Usage & Best Practices',
      startPattern: /^## Utility Functions$/,
      endPattern: null, // rest of file
    },
  ];

  const results = [];

  sections.forEach(section => {
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

      const sectionContent = sectionLines.join('\n');
      const lineCount = countLines(sectionContent);

      if (lineCount > MAX_LINES) {
        // Further split large sections
        const chunks = splitLargeSection(sectionLines, section.name, MAX_LINES);
        results.push(...chunks);
      } else {
        results.push({
          filename: `${section.name}.md`,
          content: sectionContent,
          lineCount: lineCount,
        });
      }
    }
  });

  return results;
}

function splitLargeSection(lines, baseName, maxLines) {
  const chunks = [];
  let currentChunk = [];
  let chunkNumber = 1;

  let currentLines = 0;
  const title = lines[0]; // Keep the title

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if we're at a component boundary (###)
    const isComponentStart = line.match(/^### /);

    if (currentLines > maxLines * 0.8 && isComponentStart && currentChunk.length > 10) {
      // Save current chunk
      const chunkTitle =
        chunkNumber === 1
          ? title
          : title.replace(/^# /, `# ${baseName.replace(/-/g, ' ')} (Part ${chunkNumber}) - `);

      chunks.push({
        filename: `${baseName}-${chunkNumber}.md`,
        content: [chunkTitle, ...currentChunk.slice(1)].join('\n'),
        lineCount: currentChunk.length,
      });

      // Start new chunk
      currentChunk = [title];
      currentLines = 1;
      chunkNumber++;
    }

    currentChunk.push(line);
    currentLines++;
  }

  // Save final chunk
  if (currentChunk.length > 1) {
    const chunkTitle =
      chunkNumber === 1
        ? title
        : title.replace(/^# /, `# ${baseName.replace(/-/g, ' ')} (Part ${chunkNumber}) - `);
    currentChunk[0] = chunkTitle;

    chunks.push({
      filename: chunkNumber === 1 ? `${baseName}.md` : `${baseName}-${chunkNumber}.md`,
      content: currentChunk.join('\n'),
      lineCount: currentChunk.length,
    });
  }

  return chunks;
}

function main() {
  console.log('🚀 Starting improved UI documentation splitting...\n');

  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ Input file not found: ${INPUT_FILE}`);
    process.exit(1);
  }

  ensureDirectoryExists(OUTPUT_DIR);

  const originalContent = fs.readFileSync(INPUT_FILE, 'utf8');
  const originalLines = countLines(originalContent);

  console.log(`📄 Processing: MADFAM-UI-DOCUMENTATION.md (${originalLines} lines)`);

  const splitFiles = splitUIDocumentation();

  // Write split files
  splitFiles.forEach(file => {
    const outputPath = path.join(OUTPUT_DIR, file.filename);
    fs.writeFileSync(outputPath, file.content);
    console.log(`  ✅ Created: ${file.filename} (${file.lineCount} lines)`);
  });

  // Create index
  const indexContent = `# MADFAM UI Documentation

Modular documentation for the MADFAM UI component library.

**Original**: \`MADFAM-UI-DOCUMENTATION.md\` (${originalLines} lines)  
**Split into**: ${splitFiles.length} files (all under ${MAX_LINES} lines)

## 📚 Documentation Sections

${splitFiles
  .map(file => {
    const title = file.filename
      .replace('.md', '')
      .replace(/-(\d+)$/, ' (Part $1)')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    return `- [${title}](./${file.filename}) - ${file.lineCount} lines`;
  })
  .join('\n')}

## 🎯 Quick Start

1. **[Getting Started](./getting-started.md)** - Setup, installation, design system
2. **[Core Components](./components-core-1.md)** - Essential UI building blocks  
3. **[Interface Components](./components-interface-1.md)** - User interaction elements
4. **[Display Components](./components-display-1.md)** - Data presentation components
5. **[Advanced Guide](./advanced-guide.md)** - Best practices and advanced usage

---
*Generated by split-ui-docs-improved.js*
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.md'), indexContent);
  console.log(`  📋 Created: index.md`);

  console.log(`\n✨ UI documentation splitting complete!`);
  console.log(`📊 Result: ${originalLines} lines → ${splitFiles.length} files`);
  console.log(`📏 Largest file: ${Math.max(...splitFiles.map(f => f.lineCount))} lines`);
}

main();
