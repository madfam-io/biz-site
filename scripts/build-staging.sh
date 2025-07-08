#!/bin/bash

echo "🚀 Building for GitHub Pages staging..."

# Set environment variables
export NEXT_PUBLIC_ENV=staging
export NODE_ENV=production

# Install dependencies
pnpm install --frozen-lockfile

# Build the project
pnpm build:staging

# Export static files
cd apps/web
pnpm export

# Create .nojekyll file to prevent GitHub Pages from processing files
touch out/.nojekyll

# Add CNAME if using custom domain (uncomment if needed)
# echo 'staging.madfam.io' > out/CNAME

echo "✅ Build complete! Static files in apps/web/out/"