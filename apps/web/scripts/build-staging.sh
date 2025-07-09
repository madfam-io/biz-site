#!/bin/bash

# Build script for GitHub Pages staging deployment
# This script temporarily removes API routes to allow static export

echo "🚀 Starting staging build for GitHub Pages..."

# Create temp directory outside of app folder
mkdir -p ../temp-staging

# Backup original files
echo "📦 Backing up original files..."
mv app/api ../temp-staging/api 2>/dev/null || true
cp next.config.js ../temp-staging/next.config.js.backup 2>/dev/null || true

# Use staging versions
echo "⚙️ Setting up staging configuration..."
cp next.config.staging.js next.config.js

# Swap dashboard page with staging version
if [ -f "app/dashboard/page.staging.tsx" ]; then
  mv app/dashboard/page.tsx ../temp-staging/page.tsx.backup 2>/dev/null || true
  cp app/dashboard/page.staging.tsx app/dashboard/page.tsx
fi

# Build the app
echo "🔨 Building Next.js app..."
NEXT_PUBLIC_ENV=staging next build

BUILD_EXIT_CODE=$?

# Restore original files
echo "♻️ Restoring original files..."
mv ../temp-staging/api app/api 2>/dev/null || true
mv ../temp-staging/next.config.js.backup next.config.js 2>/dev/null || true

# Restore dashboard page
if [ -f "../temp-staging/page.tsx.backup" ]; then
  mv ../temp-staging/page.tsx.backup app/dashboard/page.tsx
fi

# Clean up temp directory
rm -rf ../temp-staging

if [ $BUILD_EXIT_CODE -eq 0 ]; then
  echo "✅ Staging build completed successfully!"
else
  echo "❌ Staging build failed!"
  exit $BUILD_EXIT_CODE
fi