# Testing Strategy & Implementation Plan

## Overview

Target: Achieve 60%+ test coverage with comprehensive testing pyramid

## Testing Pyramid Structure

```
E2E Tests (10%)     ← Playwright (existing ✅)
Integration (30%)   ← API routes + Database
Unit Tests (60%)    ← Pure functions + Components
```

## Phase 1: Unit Testing Foundation

### 1. Utility Functions Testing

```bash
# Priority files to test first
apps/web/lib/utils.ts
apps/web/lib/formatting.ts
apps/web/lib/seo.ts ✅
apps/web/lib/lead-scoring.ts ✅
apps/web/lib/environment.ts
```

### 2. Component Testing Strategy

```typescript
// Example test structure
describe('LeadForm', () => {
  it('validates required fields');
  it('submits form with correct data');
  it('handles API errors gracefully');
  it('tracks analytics events');
});
```

### 3. API Routes Testing

Priority routes:

- `/api/leads` - Business critical
- `/api/assessment` - User engagement
- `/api/calculator` - Lead generation
- `/api/webhook/n8n` - Integration

## Phase 2: Integration Testing

### Database Operations

```typescript
// Test database operations
describe('Database Operations', () => {
  beforeEach(() => setupTestDB());
  afterEach(() => cleanupTestDB());

  it('creates lead with valid data');
  it('handles duplicate email gracefully');
});
```

### CMS Integration

```typescript
// Test CMS fallback behavior
describe('CMS Integration', () => {
  it('falls back to static data when CMS unavailable');
  it('caches CMS responses correctly');
});
```

## Implementation Timeline

### Week 1

- [ ] Set up test database
- [ ] Create test utilities and fixtures
- [ ] Write unit tests for critical utilities
- [ ] Add component tests for LeadForm and key components

### Week 2

- [ ] Add API route testing
- [ ] Implement integration tests
- [ ] Set up test coverage reporting
- [ ] Add mutation testing with Stryker

## Tools & Configuration

### Vitest Configuration Enhancement

```typescript
// vitest.config.ts additions
export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
      thresholds: {
        global: {
          branches: 60,
          functions: 60,
          lines: 60,
          statements: 60,
        },
      },
    },
    setupFiles: ['./test/setup.ts'],
    env: {
      NODE_ENV: 'test',
    },
  },
});
```

### Test Database Setup

```typescript
// test/setup.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});
```

## Success Metrics

- [ ] 60%+ code coverage
- [ ] All API routes have tests
- [ ] Critical user flows covered
- [ ] CI/CD pipeline includes test gates
- [ ] Performance regression testing
