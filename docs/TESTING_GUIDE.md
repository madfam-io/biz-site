# Testing Guide

## Overview

MADFAM's testing strategy ensures reliability and quality for our AI consultancy platform through comprehensive unit, integration, and end-to-end testing. Our multi-layered approach covers components, business logic, API endpoints, and complete user workflows.

## Testing Architecture

### **Testing Pyramid**

```
        🔺 E2E Tests (Playwright)
       /   - Critical user journeys
      /    - Cross-browser testing
     /     - Lead generation flows
    /
   🔺 Integration Tests (Vitest)
  /   - API endpoints
 /    - Database operations
/     - Service integrations
/
🔺 Unit Tests (Vitest + Testing Library)
- Components and utilities
- Business logic functions
- Form validation
- Data transformations
```

### **Technology Stack**

- **Unit/Integration**: Vitest (fast Vite-native testing)
- **Component Testing**: React Testing Library
- **E2E Testing**: Playwright (cross-browser automation)
- **Mocking**: Vitest mocks + MSW (Mock Service Worker)
- **Coverage**: c8 coverage reports
- **CI/CD**: GitHub Actions integration

---

## Test Categories

### 🧩 **Unit Tests**

Test individual components and functions in isolation.

**What to test:**

- Component rendering and props
- Utility functions and business logic
- Form validation and error handling
- Data transformations and calculations
- Hook behavior and state changes

**Example - Component Test:**

```tsx
// components/__tests__/LeadForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LeadForm } from '../LeadForm';

describe('LeadForm', () => {
  it('submits valid lead data', async () => {
    const mockOnSubmit = vi.fn();
    render(<LeadForm onSubmit={mockOnSubmit} />);

    // Fill form fields
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@company.com' },
    });
    fireEvent.change(screen.getByLabelText(/company/i), {
      target: { value: 'Test Corp' },
    });
    fireEvent.selectOption(screen.getByLabelText(/service tier/i), 'L3_CONSULTING');

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@company.com',
        company: 'Test Corp',
        tier: 'L3_CONSULTING',
      });
    });
  });

  it('validates required fields', async () => {
    render(<LeadForm onSubmit={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });
});
```

**Example - Business Logic Test:**

```tsx
// lib/__tests__/lead-scoring.test.ts
import { calculateLeadScore } from '../lead-scoring';

describe('Lead Scoring', () => {
  it('calculates score correctly for complete lead', () => {
    const lead = {
      email: 'ceo@bigcorp.com',
      company: 'Big Corp',
      phone: '+1234567890',
      tier: 'L4_PLATFORMS',
      message: 'We need enterprise AI automation for our manufacturing processes',
    };

    const score = calculateLeadScore(lead);

    expect(score).toBeGreaterThanOrEqual(80); // High-quality lead
  });

  it('applies business email bonus', () => {
    const personalEmail = { email: 'user@gmail.com' };
    const businessEmail = { email: 'user@company.com' };

    const personalScore = calculateLeadScore(personalEmail);
    const businessScore = calculateLeadScore(businessEmail);

    expect(businessScore).toBeGreaterThan(personalScore);
  });
});
```

### 🔗 **Integration Tests**

Test how different parts of the system work together.

**What to test:**

- API endpoints with database operations
- Authentication flows
- Third-party service integrations
- Data pipelines and transformations
- Multi-step business processes

**Example - API Integration Test:**

```tsx
// app/api/__tests__/leads.test.ts
import { POST, GET } from '../leads/route';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

// Mock database for testing
vi.mock('@/lib/prisma', () => ({
  prisma: {
    lead: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

describe('/api/leads', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST', () => {
    it('creates lead with valid data', async () => {
      const mockLead = {
        id: 'lead_123',
        email: 'test@company.com',
        score: 75,
      };

      (prisma.lead.create as any).mockResolvedValue(mockLead);

      const request = new NextRequest('http://localhost/api/leads', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@company.com',
          name: 'John Doe',
          company: 'Test Corp',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.leadId).toBe('lead_123');
      expect(prisma.lead.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: 'test@company.com',
          firstName: 'John',
          lastName: 'Doe',
          company: 'Test Corp',
        }),
      });
    });

    it('validates input data', async () => {
      const request = new NextRequest('http://localhost/api/leads', {
        method: 'POST',
        body: JSON.stringify({
          email: 'invalid-email',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.errors).toContainEqual(
        expect.objectContaining({
          path: ['email'],
          message: expect.stringContaining('Invalid email'),
        })
      );
    });
  });

  describe('GET', () => {
    it('requires authentication', async () => {
      const request = new NextRequest('http://localhost/api/leads');

      const response = await GET(request);

      expect(response.status).toBe(401);
    });

    it('returns paginated leads with auth', async () => {
      const mockLeads = [
        { id: 'lead_1', email: 'lead1@test.com', score: 85 },
        { id: 'lead_2', email: 'lead2@test.com', score: 75 },
      ];

      (prisma.lead.findMany as any).mockResolvedValue(mockLeads);

      const request = new NextRequest('http://localhost/api/leads', {
        headers: { Authorization: 'Bearer valid-token' },
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.leads).toHaveLength(2);
      expect(data.leads[0].score).toBe(85);
    });
  });
});
```

### 🌐 **End-to-End Tests**

Test complete user journeys across the entire application.

**What to test:**

- Critical business flows (lead generation, assessment completion)
- Cross-browser compatibility
- Mobile responsiveness
- Performance and accessibility
- Multi-language user experiences

**Example - E2E Test:**

```tsx
// e2e/lead-capture.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Lead Capture Flow', () => {
  test('completes full lead generation journey', async ({ page }) => {
    // Visit homepage
    await page.goto('/es-MX');
    await expect(page.locator('h1')).toContainText('creatividad humana');

    // Navigate to contact form
    await page.click('text=Contacto');
    await expect(page).toHaveURL(/contact/);

    // Fill lead form
    await page.fill('[name="email"]', 'test@empresa.com');
    await page.fill('[name="name"]', 'Juan Pérez');
    await page.fill('[name="company"]', 'Empresa Test SA');
    await page.fill('[name="phone"]', '+52 55 1234 5678');
    await page.selectOption('[name="tier"]', 'L3_CONSULTING');
    await page.fill('[name="message"]', 'Necesitamos automatización con IA para nuestros procesos');

    // Submit form
    await page.click('button[type="submit"]');

    // Verify success
    await expect(page.locator('.success-message')).toBeVisible();
    await expect(page).toHaveURL(/thank-you/);

    // Check thank you page content
    await expect(page.locator('h1')).toContainText('Gracias');
  });

  test('validates form fields correctly', async ({ page }) => {
    await page.goto('/es-MX/contact');

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check validation messages
    await expect(page.locator('.error-message')).toContainText('Email es requerido');

    // Fill invalid email
    await page.fill('[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');

    await expect(page.locator('.error-message')).toContainText('Email inválido');
  });
});

test.describe('AI Assessment Flow', () => {
  test('completes assessment and shows results', async ({ page }) => {
    await page.goto('/es-MX/assessment');

    // Answer all assessment questions
    const questions = await page.locator('[data-testid="assessment-question"]').count();

    for (let i = 0; i < questions; i++) {
      const question = page.locator('[data-testid="assessment-question"]').nth(i);
      await question.locator('[value="4"]').click(); // Select rating 4/5
    }

    // Submit assessment
    await page.click('button[type="submit"]');

    // Wait for results
    await expect(page.locator('[data-testid="assessment-results"]')).toBeVisible();

    // Verify score display
    await expect(page.locator('.assessment-score')).toBeVisible();
    await expect(page.locator('.recommended-tier')).toContainText('L3');

    // Check personalized recommendations
    await expect(page.locator('.strengths')).toBeVisible();
    await expect(page.locator('.recommendations')).toBeVisible();
  });
});

test.describe('Multi-language Support', () => {
  test('switches languages correctly', async ({ page }) => {
    // Start in Spanish (default)
    await page.goto('/es-MX');
    await expect(page.locator('h1')).toContainText('creatividad humana');

    // Switch to English
    await page.selectOption('[data-testid="language-switcher"]', 'en-US');
    await expect(page).toHaveURL(/en-US/);
    await expect(page.locator('h1')).toContainText('human creativity');

    // Switch to Portuguese
    await page.selectOption('[data-testid="language-switcher"]', 'pt-BR');
    await expect(page).toHaveURL(/pt-BR/);
    await expect(page.locator('h1')).toContainText('criatividade humana');
  });
});
```

---

## Test Configuration

### **Vitest Setup**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/**', 'test/**', '**/*.d.ts', '**/*.config.*', 'coverage/**'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@/components': resolve(__dirname, './components'),
      '@/lib': resolve(__dirname, './lib'),
      '@/types': resolve(__dirname, './types'),
    },
  },
});
```

**Test Setup File:**

```typescript
// test/setup.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Next.js router
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
  useLocale: () => 'es-MX',
}));

// Mock environment variables
process.env.NEXT_PUBLIC_ENV = 'test';
process.env.DATABASE_URL = 'file:./test.db';

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
```

### **Playwright Configuration**

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3002',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile testing
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'pnpm dev',
    port: 3002,
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Test Commands

### **Running Tests**

```bash
# All tests
pnpm test

# Unit tests only
pnpm test:unit

# Integration tests
pnpm test:integration

# E2E tests
pnpm test:e2e

# Watch mode for development
pnpm test:watch

# Coverage reports
pnpm test:coverage

# Specific test file
pnpm test LeadForm

# Specific test pattern
pnpm test --grep "API"
```

### **Advanced Test Commands**

```bash
# E2E with specific browser
pnpm test:e2e --project=firefox

# E2E with UI (headed mode)
pnpm test:e2e:headed

# Generate E2E test code
npx playwright codegen http://localhost:3002

# Update snapshots
pnpm test --update-snapshots

# Debug specific test
pnpm test --inspect-brk LeadForm.test.tsx
```

---

## Testing Best Practices

### **General Guidelines**

✅ **DO:**

- Write tests before fixing bugs (TDD approach)
- Test user behavior, not implementation details
- Use descriptive test names that explain the scenario
- Keep tests independent and isolated
- Mock external dependencies consistently
- Test edge cases and error scenarios
- Maintain test data fixtures centrally
- Run tests in CI/CD pipeline
- Monitor test coverage trends

❌ **DON'T:**

- Test private methods or implementation details
- Write tests that depend on specific timing
- Hardcode test data without using factories
- Skip error scenarios and edge cases
- Leave tests commented out or skipped
- Test multiple concerns in single test
- Ignore flaky tests - fix them immediately
- Test external library functionality

### **Coverage Targets**

- **Utilities and Business Logic**: 95%+
- **Components**: 85%+
- **API Routes**: 90%+
- **Integration Flows**: 80%+
- **Overall Project**: 85%+

---

Built with ❤️ by MADFAM - Ensuring quality through comprehensive testing
