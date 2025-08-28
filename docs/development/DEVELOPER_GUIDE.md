# Developer Onboarding Guide

Welcome to the MADFAM development team! This comprehensive guide will get you up and running with our AI consultancy platform, from initial setup to advanced development patterns.

## 🚀 Quick Start Checklist

- [ ] **Environment Setup** - Node.js, pnpm, VS Code
- [ ] **Repository Access** - Clone and install dependencies
- [ ] **Database Setup** - Initialize SQLite for development
- [ ] **Environment Variables** - Configure API keys and secrets
- [ ] **Development Server** - Start local development environment
- [ ] **First Contribution** - Make a small change and create PR

**Estimated Time:** 30-45 minutes

---

## 🛠️ Development Environment

### **Prerequisites**

**Required:**

- **Node.js** 20.x (use nvm: `nvm install 20 && nvm use 20`)
- **pnpm** 8+ (`npm install -g pnpm`)
- **Git** with SSH keys configured
- **VS Code** (recommended) or preferred editor

**Optional but Recommended:**

- **Docker** for CMS and external services
- **PostgreSQL** for production-like database testing
- **Postman** for API testing

### **Installation**

```bash
# 1. Clone the repository
git clone git@github.com:madfam-io/biz-site.git
cd biz-site

# 2. Install dependencies (this may take 2-3 minutes)
pnpm install

# 3. Setup environment variables
cp apps/web/.env.example apps/web/.env
# Edit apps/web/.env with your values (see Environment Variables section)

# 4. Initialize database
cd apps/web
npx prisma db push
npx prisma db seed  # Optional: adds sample data

# 5. Start development server
cd ../..
pnpm dev  # or pnpm dev:web for just the web app

# 6. Verify setup
open http://localhost:3002/es-MX
```

### **VS Code Setup**

Install recommended extensions (workspace file will prompt you):

- **TypeScript** - Enhanced TypeScript support
- **Prisma** - Database schema highlighting
- **Tailwind CSS IntelliSense** - CSS class suggestions
- **ESLint** - Code linting and formatting
- **GitLens** - Enhanced Git integration

**Workspace Settings** (`.vscode/settings.json`):

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "'([^']*)'"],
    ["clsx\\(([^)]*)\\)", "\"([^\"]*)\""]
  ]
}
```

---

## 🏗️ Architecture Deep Dive

### **Monorepo Structure**

```
biz-site/
├── apps/
│   ├── web/              # Next.js 14 main application
│   │   ├── app/          # App Router (pages and API routes)
│   │   ├── components/   # App-specific components
│   │   ├── lib/          # Utilities and business logic
│   │   ├── prisma/       # Database schema and migrations
│   │   └── public/       # Static assets
│   └── cms/              # Payload CMS application
├── packages/
│   ├── ui/               # Shared component library
│   ├── core/             # Business logic and types
│   ├── i18n/             # Internationalization system
│   ├── analytics/        # Analytics integration
│   └── email/            # Email templates and sending
├── docs/                 # Project documentation
├── scripts/              # Build and deployment scripts
└── infrastructure/       # Docker and deployment configs
```

### **Technology Decisions**

| **Choice**   | **Alternative Considered**     | **Why We Chose This**                   |
| ------------ | ------------------------------ | --------------------------------------- |
| Next.js 14   | Remix, SvelteKit               | App Router, RSC, edge optimization      |
| TypeScript   | JavaScript                     | Type safety, better DX, fewer bugs      |
| Tailwind CSS | Styled Components, CSS Modules | Rapid development, consistency          |
| Prisma       | Drizzle, TypeORM               | Type safety, migrations, great DX       |
| Turborepo    | Nx, Rush                       | Simple, fast, great Next.js integration |
| pnpm         | npm, yarn                      | Disk efficiency, monorepo support       |

### **Design Patterns**

#### **1. Component Architecture**

```
components/
├── ui/           # Pure UI components (from @madfam/ui)
├── features/     # Business logic components
├── layouts/      # Page layout components
└── forms/        # Form-specific components
```

#### **2. API Route Structure**

```
app/api/
├── leads/        # Lead management
├── assessment/   # AI assessments
├── calculator/   # ROI calculations
├── webhook/      # External integrations
└── auth/         # Authentication endpoints
```

#### **3. State Management Patterns**

- **Server State**: React Server Components (RSC)
- **Client State**: React Context for global state
- **Form State**: React Hook Form + Zod validation
- **URL State**: Next.js searchParams and routing

---

## 🌐 Internationalization (i18n)

### **Supported Locales**

- **Spanish (es-MX)** - Primary market and default
- **English (en-US)** - International business
- **Portuguese (pt-BR)** - Brazilian market expansion

### **Implementation**

```tsx
// Server Components
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('home');

  return <h1>{t('hero.title')}</h1>;
}

// Client Components
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');

  return <button>{t('submit')}</button>;
}
```

### **Adding New Translations**

1. Add keys to `packages/i18n/src/translations/[locale].json`
2. Use hierarchical structure: `page.section.element`
3. Test in all locales before committing
4. Update `missing-translations.md` if incomplete

---

## 🎨 Design System

### **Color Palette**

```tsx
// Primary Brand Colors
const colors = {
  primary: '#0A0E27', // Obsidian (dark navy)
  secondary: '#FFD93D', // Sun (bright yellow)
  accent: '#9B59B6', // Lavender (purple)
  success: '#6BCB77', // Leaf (green)
  surface: '#FAFAFA', // Pearl (off-white)

  // Semantic Colors
  error: '#E74C3C',
  warning: '#F39C12',
  info: '#3498DB',

  // Neutral Grays
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    // ... full scale
    900: '#0F172A',
  },
};
```

### **Typography Scale**

```tsx
const typography = {
  // Headings (Poppins)
  'display-1': 'text-5xl md:text-6xl font-bold font-heading',
  'display-2': 'text-4xl md:text-5xl font-bold font-heading',
  h1: 'text-3xl md:text-4xl font-bold font-heading',
  h2: 'text-2xl md:text-3xl font-semibold font-heading',
  h3: 'text-xl md:text-2xl font-semibold font-heading',

  // Body text (Inter)
  'body-lg': 'text-lg font-body',
  body: 'text-base font-body',
  'body-sm': 'text-sm font-body',

  // Code (Space Mono)
  code: 'text-sm font-mono',
};
```

### **Spacing System** (8px grid)

```tsx
const spacing = {
  xs: '0.5rem', // 8px
  sm: '1rem', // 16px
  md: '2rem', // 32px
  lg: '3rem', // 48px
  xl: '4rem', // 64px
  '2xl': '6rem', // 96px
  '3xl': '8rem', // 128px
};
```

---

## 🧩 Component Development

### **Creating a New Component**

1. **Create component file** in appropriate package:

```tsx
// packages/ui/src/components/NewComponent.tsx
import React from 'react';
import { cn } from '../lib/utils';

interface NewComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const NewComponent = React.forwardRef<HTMLDivElement, NewComponentProps>(
  ({ variant = 'primary', size = 'md', children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'base-styles',
          variant === 'primary' && 'primary-styles',
          variant === 'secondary' && 'secondary-styles',
          size === 'sm' && 'small-styles',
          size === 'lg' && 'large-styles',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NewComponent.displayName = 'NewComponent';
```

2. **Export from index file**:

```tsx
// packages/ui/src/index.ts
export { NewComponent } from './components/NewComponent';
export type { NewComponentProps } from './components/NewComponent';
```

3. **Write tests**:

```tsx
// packages/ui/src/components/__tests__/NewComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { NewComponent } from '../NewComponent';

describe('NewComponent', () => {
  it('renders children correctly', () => {
    render(<NewComponent>Test content</NewComponent>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<NewComponent variant="secondary">Test</NewComponent>);
    expect(screen.getByText('Test')).toHaveClass('secondary-styles');
  });
});
```

### **Component Best Practices**

- **Forward refs** for proper DOM access
- **Composable API** with sensible defaults
- **TypeScript interfaces** for all props
- **Responsive design** with mobile-first approach
- **Accessibility** with proper ARIA attributes
- **Dark mode support** using CSS variables

---

## 🗄️ Database Development

### **Schema Changes**

```bash
# 1. Modify prisma/schema.prisma
# 2. Create migration
npx prisma migrate dev --name add-new-feature

# 3. Generate updated client
npx prisma generate

# 4. Update TypeScript types (automatic)
```

### **Common Patterns**

#### **Creating Models with Relations**

```prisma
model NewModel {
  id        String   @id @default(cuid())
  name      String
  leadId    String
  lead      Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
  data      Json     // Flexible data storage
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([leadId])
  @@index([createdAt])
}
```

#### **Database Queries**

```tsx
// Read operations
const leads = await prisma.lead.findMany({
  where: {
    status: 'NEW',
    tier: 'L3_CONSULTING',
  },
  include: {
    assessments: true,
    activities: {
      orderBy: { createdAt: 'desc' },
      take: 5,
    },
  },
  orderBy: { score: 'desc' },
});

// Write operations
const newLead = await prisma.lead.create({
  data: {
    email: 'user@company.com',
    firstName: 'John',
    lastName: 'Doe',
    tier: 'L3_CONSULTING',
    activities: {
      create: {
        type: 'lead_created',
        description: 'Lead created via website form',
      },
    },
  },
  include: { activities: true },
});
```

---

## 🚀 API Development

### **Creating New Endpoints**

1. **Create API route file**:

```tsx
// apps/web/app/api/new-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { rateLimiter } from '@/lib/rate-limit';

// Input validation schema
const CreateSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  type: z.enum(['type1', 'type2']),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimiter.check(request);
    if (!rateLimitResult.success) {
      return NextResponse.json({ success: false, message: 'Too many requests' }, { status: 429 });
    }

    // Parse and validate input
    const body = await request.json();
    const validatedData = CreateSchema.parse(body);

    // Business logic
    const result = await prisma.newModel.create({
      data: validatedData,
    });

    // Success response
    return NextResponse.json({
      success: true,
      id: result.id,
      message: 'Created successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('API Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Implementation for GET method
}
```

2. **Add TypeScript types**:

```tsx
// apps/web/types/api.ts
export interface CreateNewEndpointRequest {
  name: string;
  email: string;
  type: 'type1' | 'type2';
}

export interface CreateNewEndpointResponse {
  success: boolean;
  id?: string;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}
```

3. **Create client helper**:

```tsx
// apps/web/lib/api-client.ts
export async function createNewEndpoint(data: CreateNewEndpointRequest) {
  const response = await fetch('/api/new-endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response.json() as Promise<CreateNewEndpointResponse>;
}
```

### **API Best Practices**

- **Input Validation**: Always use Zod schemas
- **Rate Limiting**: Implement on public endpoints
- **Error Handling**: Consistent error response format
- **Type Safety**: Define request/response types
- **Authentication**: Protect sensitive endpoints
- **Logging**: Log errors and important events

---

## 🧪 Testing Strategy

### **Test Types**

1. **Unit Tests** (Vitest + Testing Library)

   - Components and utilities
   - Business logic functions
   - Database models

2. **Integration Tests** (Vitest)

   - API endpoints
   - Database operations
   - Service integrations

3. **E2E Tests** (Playwright)
   - Critical user journeys
   - Lead generation flows
   - Cross-browser testing

### **Running Tests**

```bash
# Unit tests
pnpm test                    # Run all tests
pnpm test:watch             # Watch mode
pnpm test --filter=@madfam/ui  # Package-specific

# E2E tests
pnpm test:e2e               # All E2E tests
pnpm test:e2e:ui            # With UI
pnpm test:e2e:headed        # With browser visible

# Coverage
pnpm test:coverage          # Generate coverage report
```

### **Writing Tests**

#### **Component Tests**

```tsx
// apps/web/components/__tests__/LeadForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LeadForm } from '../LeadForm';

describe('LeadForm', () => {
  it('submits form with valid data', async () => {
    const onSubmit = jest.fn();
    render(<LeadForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@company.com' },
    });
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@company.com',
        name: 'John Doe',
      });
    });
  });
});
```

#### **API Tests**

```tsx
// apps/web/app/api/__tests__/leads.test.ts
import { POST } from '../leads/route';
import { NextRequest } from 'next/server';

describe('/api/leads', () => {
  it('creates lead with valid data', async () => {
    const request = new NextRequest('http://localhost:3000/api/leads', {
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
    expect(data.leadId).toBeDefined();
  });
});
```

#### **E2E Tests**

```tsx
// apps/web/e2e/lead-capture.spec.ts
import { test, expect } from '@playwright/test';

test('lead capture flow', async ({ page }) => {
  await page.goto('/es-MX/contact');

  await page.fill('[name="email"]', 'test@company.com');
  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="company"]', 'Test Corp');
  await page.selectOption('[name="tier"]', 'L3_CONSULTING');

  await page.click('button[type="submit"]');

  await expect(page.locator('.success-message')).toBeVisible();
  await expect(page).toHaveURL(/thank-you/);
});
```

---

## 🔄 Development Workflow

### **Git Flow**

```bash
# 1. Create feature branch
git checkout -b feature/new-assessment-questions

# 2. Make changes and commit frequently
git add .
git commit -m "feat: add industry-specific assessment questions"

# 3. Push branch and create PR
git push origin feature/new-assessment-questions
# Create PR via GitHub UI

# 4. Code review and merge
# 5. Delete branch after merge
git branch -d feature/new-assessment-questions
```

### **Commit Conventions**

```bash
feat: new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code change that neither fixes a bug nor adds a feature
test: adding tests
chore: updating build tasks, package manager configs, etc.
```

### **Code Review Checklist**

**Before Submitting PR:**

- [ ] All tests pass (`pnpm test`)
- [ ] No TypeScript errors (`pnpm typecheck`)
- [ ] No linting errors (`pnpm lint`)
- [ ] Components work in all locales
- [ ] Mobile responsive design
- [ ] Accessibility considerations
- [ ] Performance impact minimal

**Reviewer Checklist:**

- [ ] Code follows established patterns
- [ ] Business logic is sound
- [ ] Error handling is comprehensive
- [ ] Tests cover new functionality
- [ ] Documentation is updated
- [ ] Security considerations addressed

---

## 📊 Analytics & Monitoring

### **Custom Events**

```tsx
// Track business events
import { analytics } from '@madfam/analytics';

// Lead generation
analytics.trackLeadGenerated({
  tier: 'L3_CONSULTING',
  source: 'website',
  score: 85,
});

// Assessment completion
analytics.trackAssessmentCompleted({
  score: 76,
  recommendedTier: 'L3_CONSULTING',
  timeToComplete: 180, // seconds
});

// Conversion events
analytics.trackConversion({
  type: 'meeting_scheduled',
  value: 50000, // estimated deal size
  tier: 'L4_PLATFORMS',
});
```

### **Performance Monitoring**

```tsx
// Performance tracking
import { performanceMonitor } from '@/lib/performance';

export async function createLead(data: CreateLeadData) {
  return performanceMonitor.track('lead.create', async () => {
    // Business logic here
    return await leadService.create(data);
  });
}
```

### **Error Tracking**

```tsx
// Error reporting
import { logger } from '@/lib/logger';

try {
  // Risky operation
} catch (error) {
  logger.error('Lead creation failed', {
    error: error.message,
    email: lead.email,
    tier: lead.tier,
    context: 'lead-form-submission',
  });

  throw error; // Re-throw for user feedback
}
```

---

## 🚀 Deployment

### **Environments**

1. **Development** (`localhost:3002`)

   - Local development with hot reload
   - SQLite database
   - All feature flags enabled

2. **Staging** (`staging.madfam.io`)

   - GitHub Pages deployment
   - Production-like environment
   - PostgreSQL database
   - Selected feature flags

3. **Production** (`madfam.io`)
   - Vercel deployment
   - PostgreSQL with backups
   - Conservative feature flags
   - Full monitoring

### **Deploy Commands**

```bash
# Staging deployment
git checkout staging
git merge develop
git push origin staging  # Auto-deploys via GitHub Actions

# Production deployment
git checkout main
git merge staging
git tag v1.2.0
git push origin main --tags  # Auto-deploys to Vercel
```

### **Environment Variables**

```bash
# Required for all environments
DATABASE_URL=
NEXTAUTH_SECRET=
NEXT_PUBLIC_ENV=

# Production only
RESEND_API_KEY=
N8N_WEBHOOK_URL=
PLAUSIBLE_API_KEY=
SENTRY_DSN=
```

---

## 🐛 Debugging Guide

### **Common Issues**

#### **Build Errors**

```bash
# TypeScript errors
pnpm typecheck  # Fix type issues

# Dependency issues
rm -rf node_modules .next
pnpm install

# Package linking issues
pnpm build --filter=@madfam/ui
```

#### **Runtime Errors**

```bash
# Database connection issues
npx prisma db push
npx prisma generate

# Environment variable issues
cp apps/web/.env.example apps/web/.env
# Edit .env with correct values

# Port conflicts
lsof -i :3000  # Find process using port
kill -9 <PID>  # Kill process
```

#### **Development Server Issues**

```bash
# Clear Next.js cache
rm -rf apps/web/.next

# Clear Turborepo cache
pnpm clean

# Reset development database
npx prisma migrate reset
```

### **Debugging Tools**

#### **VS Code Debugging**

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/apps/web/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}/apps/web",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

#### **Database Inspection**

```bash
# Prisma Studio (visual database browser)
npx prisma studio

# Raw SQL queries
npx prisma db execute --stdin < query.sql
```

#### **API Testing**

```bash
# Test API endpoints
curl -X POST http://localhost:3002/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"test@company.com","name":"Test User"}'

# Check API logs
tail -f apps/web/logs/api.log
```

---

## 📚 Learning Resources

### **Project-Specific**

- [Architecture Documentation](./ARCHITECTURE.md)
- [API Documentation](./API_COMPLETE.md)
- [Database Schema](./DATABASE_SCHEMA.md)
- [Component Library](./UI_COMPONENTS.md)

### **Technologies**

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

### **Best Practices**

- [React Patterns](https://reactpatterns.com/)
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [API Design Guidelines](https://github.com/microsoft/api-guidelines)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🆘 Getting Help

### **Internal Resources**

- **Slack Channels**:

  - `#dev-team` - General development discussions
  - `#dev-help` - Ask questions and get help
  - `#dev-deployments` - Deployment notifications
  - `#dev-alerts` - Error monitoring and alerts

- **Team Members**:
  - **Tech Lead** - Architecture and complex technical decisions
  - **Senior Developers** - Code review and mentoring
  - **Product Manager** - Business requirements and priorities
  - **Designer** - UI/UX questions and asset creation

### **External Resources**

- **GitHub Issues** - Bug reports and feature requests
- **Documentation** - This guide and related docs
- **Stack Overflow** - General programming questions
- **Discord Communities** - Technology-specific help

### **Escalation Path**

1. **Self-help** - Check docs, search existing issues
2. **Peer Help** - Ask in Slack channels
3. **Senior Developer** - Complex technical issues
4. **Tech Lead** - Architectural decisions
5. **Management** - Resource or priority issues

---

## 🎯 Your First Contributions

### **Good First Issues**

Look for GitHub issues labeled `good-first-issue`:

- [ ] **Update translations** - Add missing Spanish/English translations
- [ ] **Component variants** - Add new button or card variants
- [ ] **Test coverage** - Write tests for existing components
- [ ] **Documentation** - Improve code comments or README files
- [ ] **Bug fixes** - Fix small, well-defined bugs

### **Learning Path**

1. **Week 1-2**: Setup environment, understand architecture, make small UI changes
2. **Week 3-4**: Work on components and forms, learn the database schema
3. **Month 2**: Take on API development and business logic features
4. **Month 3+**: Lead feature development, review others' code, mentor new developers

### **Success Metrics**

- [ ] Comfortable with monorepo structure and tools
- [ ] Can create components following design system
- [ ] Understands database schema and can write queries
- [ ] Can build API endpoints with proper validation
- [ ] Writes tests for new functionality
- [ ] Participates in code reviews effectively
- [ ] Contributes to technical discussions and decisions

---

Welcome to the team! We're excited to have you contribute to building the future of AI-driven business automation. Remember, everyone starts somewhere, and we're here to help you succeed.

**Questions?** Don't hesitate to ask in `#dev-help` or reach out to any team member directly.

---

Built with ❤️ by the MADFAM development team
