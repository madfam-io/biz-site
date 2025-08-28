# Architecture & Tech Stack

Understanding the codebase structure and technology decisions

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
