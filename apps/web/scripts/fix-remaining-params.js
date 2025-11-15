#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('Finding all pages with old params pattern...\n');

// Find all page.tsx files with old pattern
const files = execSync(`grep -rl "params: { locale:" app/\\[locale\\] --include="page.tsx"`, {
  encoding: 'utf-8',
})
  .trim()
  .split('\n')
  .filter(Boolean);

console.log(`Found ${files.length} files to fix:\n`);
files.forEach(f => console.log(`  - ${f}`));
console.log('');

files.forEach(file => {
  console.log(`Processing: ${file}`);
  let content = fs.readFileSync(file, 'utf-8');
  let modified = false;

  // Pattern 1: generateMetadata with inline destructuring
  if (content.match(/export async function generateMetadata\(\{\s*params: \{ locale \}/)) {
    content = content.replace(
      /export async function generateMetadata\(\{\s*params: \{ locale \},?\s*\}:/g,
      'export async function generateMetadata({\n  params,\n}:'
    );
    content = content.replace(
      /params: \{ locale: string \};?\s*\}\): Promise<Metadata> \{/g,
      'params: Promise<{ locale: string }>;\n}): Promise<Metadata> {\n  const { locale } = await params;'
    );
    modified = true;
    console.log('  ✓ Fixed generateMetadata');
  }

  // Pattern 2: Page component with inline destructuring (used locale)
  if (content.match(/export default async function \w+Page\(\{\s*params: \{ locale: _locale \}/)) {
    content = content.replace(
      /export default async function (\w+Page)\(\{\s*params: \{ locale: _locale \},?\s*\}:/g,
      'export default async function $1({\n  params,\n}:'
    );
    content = content.replace(
      /params: \{ locale: string \};?\s*\}\) \{/g,
      'params: Promise<{ locale: string }>;\n}) {\n  await params; // Validate params exist'
    );
    modified = true;
    console.log('  ✓ Fixed page component with _locale');
  }

  // Pattern 3: Page component with inline destructuring (destructured locale)
  if (content.match(/export default async function \w+Page\(\{\s*params: \{ locale \}/)) {
    content = content.replace(
      /export default async function (\w+Page)\(\{\s*params: \{ locale \},?\s*\}:/g,
      'export default async function $1({\n  params,\n}:'
    );
    // Check if already has Promise type
    if (!content.match(/params: Promise<\{ locale: string \}>/)) {
      content = content.replace(
        /params: \{ locale: string \};?\s*\}\) \{/g,
        'params: Promise<{ locale: string }>;\n}) {\n  const { locale } = await params;'
      );
    }
    modified = true;
    console.log('  ✓ Fixed page component with locale destructuring');
  }

  // Pattern 4: Already has Promise type but missing await
  const promiseWithoutAwait = content.match(
    /params: Promise<\{ locale: string \}>;?\s*\}\): Promise<Metadata> \{\s*const t = await getTranslations/
  );
  if (promiseWithoutAwait) {
    content = content.replace(
      /(params: Promise<\{ locale: string \}>;?\s*\}\): Promise<Metadata> \{\s*)(const t = await getTranslations)/g,
      '$1const { locale } = await params;\n  $2'
    );
    modified = true;
    console.log('  ✓ Added missing await in generateMetadata');
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`  ✅ Saved ${file}\n`);
  } else {
    console.log(`  ⚠️  No changes needed or pattern not recognized\n`);
  }
});

console.log('\n✅ All files processed!');
console.log('\nRunning typecheck to verify fixes...\n');

try {
  execSync('pnpm typecheck', { stdio: 'inherit' });
  console.log('\n✅ Typecheck passed!');
} catch (error) {
  console.log('\n❌ Typecheck failed - manual review needed');
  process.exit(1);
}
