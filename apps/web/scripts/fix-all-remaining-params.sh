#!/bin/bash

# Fix all remaining pages with old Next.js 14 params pattern
# This script updates to Next.js 15 async params pattern

echo "Finding all pages with old params pattern..."

# Find all page.tsx files with old params pattern
FILES=$(grep -rl "params: { locale:" app/[locale] --include="page.tsx" | sort -u)

echo "Found files to fix:"
echo "$FILES"
echo ""

for file in $FILES; do
  echo "Processing: $file"

  # Fix 1: Update inline destructured params in generateMetadata
  sed -i '' 's/params: { locale }/params/g' "$file"
  sed -i '' 's/params: { locale: string }/params: Promise<{ locale: string }>/g' "$file"

  # Fix 2: Update inline destructured params in page component
  sed -i '' 's/params: { locale: _locale }/params/g' "$file"

  # Fix 3: Add await params line after function signature if not present
  # This is more complex and will be done manually if needed

  echo "  ✓ Updated params types"
done

echo ""
echo "✅ Phase 1 complete: Updated all params types to Promise"
echo ""
echo "Now manually adding await params lines where needed..."
