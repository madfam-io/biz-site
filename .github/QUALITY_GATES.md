# Quality Gates Configuration

This document describes the quality gates configured for the MADFAM corporate website repository.

## Overview

Quality gates are automated checks that run on every pull request and push to ensure code quality, security, and maintainability. All checks must pass before code can be merged to protected branches.

## GitHub Actions Workflows

### 1. CI Workflow (`ci.yml`)

**Trigger**: Push to `main`, `develop`, `staging` branches, or PR to these branches

**Jobs**:

- **Quality Gates**
  - TypeScript type checking (`pnpm typecheck`)
  - ESLint linting (`pnpm lint`)
  - Prettier formatting check
  - Unit tests (`pnpm test`)

- **Build Check**
  - Full production build (`pnpm build`)
  - Ensures the application builds successfully

- **Security Audit**
  - npm audit for vulnerable dependencies
  - audit-ci for configurable vulnerability checks

**Status**: ✅ Required for merge

### 2. PR Checks Workflow (`pr-checks.yml`)

**Trigger**: Pull request opened, synchronized, or reopened

**Jobs**:

- **PR Validation**
  - Validates PR title follows conventional commits format
  - Required formats: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`, `chore:`, `revert:`

- **Changed Files Detection**
  - Detects which parts of the codebase changed
  - Optimizes which checks to run

- **Lighthouse CI** (if web files changed)
  - Performance testing
  - Accessibility testing
  - Best practices
  - SEO checks

- **Bundle Size Check** (if web files changed)
  - Monitors bundle size changes
  - Prevents bundle bloat

- **Accessibility Tests** (if web files changed)
  - Automated a11y testing with Playwright
  - Ensures WCAG compliance

**Status**: ✅ Required for merge

### 3. Deploy Workflow (`deploy.yml`)

**Trigger**: Push to `main`, `staging`, or `develop` branches, or manual workflow dispatch

**Jobs**:

- Runs all quality checks before deployment
- Builds the application
- Deploys to Vercel based on branch:
  - `main` → Production
  - `staging` → Staging
  - `develop` → Development

**Status**: ℹ️ Informational (not blocking)

## Branch Protection Rules

### Required Settings for `main` branch:

```yaml
Protection Rules:
  - Require pull request reviews before merging: ✅
    - Required approvals: 1
    - Dismiss stale reviews: ✅
    - Require review from code owners: ✅

  - Require status checks to pass before merging: ✅
    Required checks:
      - quality-gates (CI)
      - build (CI)
      - pr-validation (PR Checks)
    - Require branches to be up to date: ✅

  - Require conversation resolution before merging: ✅

  - Require signed commits: ✅ (recommended)

  - Require linear history: ✅

  - Include administrators: ✅

  - Restrict pushes that create matching branches: ✅

  - Allow force pushes: ❌

  - Allow deletions: ❌
```

### Required Settings for `staging` branch:

```yaml
Protection Rules:
  - Require pull request reviews before merging: ✅
    - Required approvals: 1

  - Require status checks to pass before merging: ✅
    Required checks:
      - quality-gates (CI)
      - build (CI)
    - Require branches to be up to date: ✅

  - Require conversation resolution before merging: ✅

  - Allow force pushes: ❌
```

### Required Settings for `develop` branch:

```yaml
Protection Rules:
  - Require status checks to pass before merging: ✅
    Required checks:
      - quality-gates (CI)
    - Require branches to be up to date: ❌

  - Allow force pushes: ❌
```

## Dependabot Configuration

**Location**: `.github/dependabot.yml`

**Settings**:

- Weekly updates on Mondays for root dependencies
- Weekly updates on Tuesdays for web app
- Weekly updates on Wednesdays for packages
- Automatic labeling and assignment
- Ignore major version updates for critical packages (Next.js, React)

## Required Secrets

Configure these secrets in GitHub repository settings:

### Vercel Deployment

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
PRODUCTION_DOMAIN
STAGING_DOMAIN
```

### Optional (for enhanced features)

```
TURBO_TOKEN          # For Turborepo remote caching
TURBO_TEAM           # For Turborepo remote caching
LHCI_GITHUB_APP_TOKEN    # For Lighthouse CI
BUNDLEWATCH_GITHUB_TOKEN # For bundle size tracking
```

## Local Development

### Running Quality Checks Locally

Before pushing code, run these commands:

```bash
# Install dependencies
pnpm install

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Fix linting issues automatically
pnpm lint --fix

# Format code
pnpm format

# Run tests
pnpm test

# Full quality check
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

### Git Hooks

The repository uses Husky for git hooks:

**Pre-commit**:

- Runs `lint-staged` on changed files
- Ensures code is formatted and linted before commit

**Pre-push** (recommended):

- Runs type checking
- Prevents pushing code with type errors

## Troubleshooting

### Type Errors After Prisma Schema Changes

```bash
cd apps/web
npx prisma generate
pnpm typecheck
```

### Build Failures

```bash
# Clean and reinstall
pnpm clean
pnpm install
pnpm build
```

### Linting Errors

```bash
# Auto-fix most issues
pnpm lint --fix

# Check specific files
pnpm lint path/to/file.ts
```

## Metrics and Monitoring

### Performance Budgets

- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Total Blocking Time (TBT): < 200ms
- Cumulative Layout Shift (CLS): < 0.1

### Bundle Size Limits

- Main bundle: < 200KB (gzipped)
- Vendor bundle: < 150KB (gzipped)
- Total initial load: < 350KB (gzipped)

### Accessibility Requirements

- WCAG 2.1 Level AA compliance
- No critical or serious accessibility violations
- All interactive elements keyboard accessible
- Proper ARIA labels and roles

## Continuous Improvement

Quality gates should be reviewed and updated quarterly to:

1. Add new checks as technology evolves
2. Update performance budgets based on analytics
3. Incorporate new security best practices
4. Improve CI/CD pipeline efficiency

## Support

For issues with quality gates:

1. Check the [GitHub Actions](../../actions) tab for detailed logs
2. Review the [troubleshooting section](#troubleshooting)
3. Contact the development team via Slack or create an issue

---

**Last Updated**: November 2024
**Maintained by**: MADFAM Development Team
