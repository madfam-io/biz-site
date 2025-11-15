# MADFAM Codebase - Current State

**Last Updated**: Friday, November 14, 2025
**Branch**: `claude/audit-ux-brand-experience-014cRyqLMKZX3xktLAx7Dxp8`
**Status**: Phase 1 UX Improvements Complete ✅

---

## Overview

The MADFAM corporate website is a Next.js 14 monorepo featuring a Solarpunk-branded corporate site with AI-powered self-serve tools, personalized user journeys, and comprehensive lead capture mechanisms.

---

## Technology Stack

### Core Framework

- **Next.js 14.2+** - App Router, Server Components, Route Handlers
- **React 18** - Client & Server Components
- **TypeScript 5** - Strict mode enabled
- **Turborepo** - Monorepo management

### Styling & UI

- **Tailwind CSS 3** - Utility-first CSS
- **CVA** (class-variance-authority) - Component variants
- **Radix UI** - Accessible primitives
- **Heroicons** - Icon library
- **Custom Design System** (`@madfam/ui` package)

### State & Data

- **React Hook Form** - Form management
- **Zod** - Schema validation
- **localStorage** - Client-side persistence
- **next-intl** - Internationalization (ES/EN/PT-BR)

### Analytics & Tracking

- **@madfam/analytics** package
- Event tracking hooks
- Conversion funnel tracking
- Error tracking

### Build & Deploy

- **Vercel** - Hosting & deployment
- **pnpm** - Package manager
- **ESLint** - Linting
- **Prettier** - Code formatting

---

## Project Structure

```
biz-site/
├── apps/
│   └── web/                      # Main Next.js application
│       ├── app/
│       │   └── [locale]/         # Internationalized routes
│       │       ├── page.tsx      # Homepage
│       │       ├── assessment/   # AI Assessment tool
│       │       ├── calculator/   # ROI Calculator
│       │       ├── contact/      # Contact page
│       │       ├── solutions/    # Solutions pages (formerly /arms)
│       │       ├── products/     # Product pages
│       │       ├── about/        # About page
│       │       └── demo/         # ✨ NEW: Demo prep pages
│       │           ├── dhanam/
│       │           └── forge-sight/
│       └── components/
│           ├── CorporateHomePage.tsx    # Main homepage component
│           ├── PersonaSelector.tsx      # ✨ NEW: Persona selection
│           ├── LeadForm.tsx             # ✨ UPDATED: Simplified form
│           ├── Navbar.tsx
│           ├── Footer.tsx
│           └── corporate/
│               ├── SolutionCard.tsx     # Solution display cards
│               ├── Badge.tsx
│               └── ProductCard.tsx
│
├── packages/
│   ├── ui/                       # Component library
│   │   └── src/components/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Container.tsx
│   │       ├── ROICalculator.tsx         # ✨ UPDATED: Email gate
│   │       └── assessment/
│   │           └── AssessmentResults.tsx # ✨ UPDATED: Recommendations
│   │
│   ├── core/                     # Business logic
│   ├── i18n/                     # Translations
│   │   └── src/translations/
│   │       ├── en/               # English
│   │       ├── es/               # Spanish
│   │       └── pt-br/            # Portuguese (Brazil)
│   │
│   └── analytics/                # Analytics hooks
│
├── docs/                         # Documentation
│   ├── UX_IMPROVEMENTS_2025.md   # ✨ NEW: Phase 1 documentation
│   ├── UX_ROADMAP.md             # ✨ NEW: Future roadmap
│   ├── CURRENT_STATE.md          # This file
│   ├── CLAUDE.md                 # AI assistant context
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── BRAND_IMPLEMENTATION_GUIDE.md
│
└── README.md
```

---

## Key Features

### 🎯 Persona-Based Experience

**Component**: `PersonaSelector.tsx`
**Location**: `apps/web/components/PersonaSelector.tsx`
**Status**: ✅ Production Ready

**Personas:**

1. 💼 CEO/Founder → Strategic transformation focus
2. 💰 CFO/Finance → ROI & cost optimization focus
3. 🔧 CTO/Tech Leader → Technical implementation focus
4. 🎨 Designer/Creative → Digital fabrication focus
5. 📚 Educator/Researcher → Learning & innovation focus

**Features:**

- Dropdown selector on homepage hero
- Stores selection in localStorage (`madfam_persona`)
- Dynamic hero content (title, subtitle, benefits, CTAs)
- Persona-specific recommended paths
- Foundation for site-wide personalization

**Integration:**

```tsx
const [persona, setPersona] = useState<Persona>('default');
const personaContent = usePersonaContent(persona);

<PersonaSelector onPersonaChange={setPersona} />;
```

---

### 📊 ROI Calculator with Email Gate

**Component**: `ROICalculator.tsx`
**Location**: `packages/ui/src/components/ROICalculator.tsx`
**Status**: ✅ Production Ready

**Features:**

- Interactive sliders for cost inputs
- Real-time ROI calculation
- **Email gate before showing results** ⭐
- Trust signals and value propositions
- Conversion CTA after results
- Both full and compact variants
- Stores email in localStorage (`madfam_roi_email`)

**Calculation Formula:**

```typescript
monthlySavings = currentCosts × tierMultiplier.costReduction
timeSaved = employeeHours × tierMultiplier.efficiency
totalBenefit = monthlySavings + (additionalRevenue / 12)
roiPercentage = ((totalBenefit × 12 - investment) / investment) × 100
paybackPeriod = investment / totalBenefit
```

**Service Tiers:**

- L1_ESSENTIALS: 15% efficiency, 10% cost reduction
- L2_ADVANCED: 25% efficiency, 20% cost reduction
- L3_CONSULTING: 35% efficiency, 25% cost reduction
- L4_PLATFORMS: 50% efficiency, 35% cost reduction
- L5_STRATEGIC: 70% efficiency, 50% cost reduction

---

### 🧠 AI Assessment with Smart Recommendations

**Components**: `Assessment.tsx` + `AssessmentResults.tsx`
**Location**: `packages/ui/src/components/assessment/`
**Status**: ✅ Production Ready

**Features:**

- Multi-step questionnaire
- 5 categories: Strategy, Technology, Data, Culture, Processes
- 4 maturity levels: Beginner, Intermediate, Advanced, Expert
- **Score interpretation section** ⭐
- **Personalized product recommendations** ⭐
- Conversion CTA (Calendly + Contact)

**Recommendation Algorithm:**

```typescript
// Based on maturity level and category weaknesses
if (level === 'beginner' || 'intermediate') {
  if (categoryScores.data < 50) → Dhanam (financial wellness)
  if (categoryScores.processes < 50) → Forge Sight (pricing intelligence)
}

if (level === 'advanced' || 'expert') {
  → PENNY (enterprise AI assistant)
}

if (categoryScores.strategy < 60) {
  → Strategic Consulting
}

// Returns max 3 recommendations
```

---

### 🎬 Demo Prep Pages

**Routes**:

- `/demo/dhanam`
- `/demo/forge-sight`

**Location**: `apps/web/app/[locale]/demo/`
**Status**: ✅ Production Ready

**Features:**

- Email capture before external redirect
- 3 qualifying questions (role, use case, volume/size)
- Product-specific benefits grid
- Trust signals ("What happens next?")
- Smart redirect with tracking parameters
- Stores lead data in localStorage
- Social proof placeholders

**Data Capture:**

```typescript
// Stored in localStorage
{
  email: string,
  role: string,
  useCase: string,
  teamSize?: string,        // Dhanam
  monthlyVolume?: string,   // Forge Sight
  timestamp: string
}

// TODO: Send to CRM via /api/leads/demo
```

**Redirect with Tracking:**

```
Dhanam:
https://www.dhan.am?source=madfam-demo-prep&role=hr&use_case=employee-wellness&team_size=51-200

Forge Sight:
https://www.forgesight.quest?source=madfam-demo-prep&role=designer&use_case=rapid-prototyping&volume=51-200
```

---

### 📝 Simplified Contact Form

**Component**: `LeadForm.tsx`
**Location**: `apps/web/components/LeadForm.tsx`
**Status**: ✅ Production Ready

**Changes:**

- **Removed**: Company and Phone fields (reduced friction)
- **Required**: Name, Email, Message (min 10 chars)
- **Updated**: Message label to "What do you need help with?"
- Zod schema validation
- React Hook Form
- Analytics tracking

**Form Fields:**

1. Name (min 2 chars)
2. Email (validated)
3. Message (min 10 chars, 5 rows)

---

## Routing Structure

```
/[locale]/                           # Homepage with persona selector
  ├── assessment                     # AI Assessment tool
  ├── calculator                     # ROI Calculator (if separate route)
  ├── contact                        # Contact form
  ├── solutions/                     # Solutions (formerly /arms)
  │   ├── aureo-labs
  │   ├── primavera3d
  │   └── colabs
  ├── products/
  │   ├── dhanam
  │   ├── forge-sight
  │   └── penny
  ├── demo/                          # ✨ NEW
  │   ├── dhanam                     # Dhanam demo prep
  │   └── forge-sight                # Forge Sight demo prep
  ├── about
  ├── work                           # Case studies
  └── careers
```

---

## Data Flow

### Lead Capture Flow

```
User Interaction → Form Submission → localStorage Storage → [TODO] API Call → CRM
                                                           ↓
                                                    Email Drip Sequence
```

### Persona Flow

```
User Selects Persona → localStorage → Homepage Updates → Future: Site-wide Personalization
```

### Assessment Flow

```
User Completes Questions → Calculate Score → Show Interpretation → Generate Recommendations → Conversion CTA
```

### Demo Prep Flow

```
User Clicks "Try Demo" → Demo Prep Page → Fill Form → localStorage → External Redirect with Tracking
```

---

## localStorage Keys

| Key                      | Type      | Purpose                    |
| ------------------------ | --------- | -------------------------- |
| `madfam_persona`         | `Persona` | Selected persona type      |
| `madfam_roi_email`       | `string`  | ROI calculator email       |
| `madfam_demo_dhanam`     | `JSON`    | Dhanam demo lead data      |
| `madfam_demo_forgesight` | `JSON`    | Forge Sight demo lead data |

---

## Environment Variables

### Required

```env
NEXT_PUBLIC_ENV=development|staging|production
NEXT_PUBLIC_API_URL=https://api.madfam.io
```

### Optional

```env
DATABASE_URL=                      # If using database
N8N_WEBHOOK_URL=                   # For n8n integration
CALENDLY_API_KEY=                  # For Calendly integration
CRM_API_KEY=                       # For CRM integration (HubSpot, etc.)
SENDGRID_API_KEY=                  # For email sequences
```

---

## API Routes

### Current (Limited)

```
/api/leads                         # Lead form submission (staging only)
```

### Needed (TODO)

```
/api/leads/demo                    # Demo prep submissions
/api/leads/roi-calculator          # ROI calculator submissions
/api/leads/assessment              # Assessment completions
```

---

## Translations

**Supported Languages:**

- 🇺🇸 English (`en`)
- 🇪🇸 Spanish (`es`)
- 🇧🇷 Portuguese - Brazil (`pt-br`)

**Translation Files:**

```
packages/i18n/src/translations/
  ├── en/
  │   ├── common.json
  │   ├── corporate.json
  │   ├── products.json
  │   └── leadForm.json
  ├── es/
  │   └── [same structure]
  └── pt-br/
      └── [same structure]
```

**Key Namespaces:**

- `common` - Shared UI strings (navbar, footer, buttons)
- `corporate` - Corporate pages (homepage, solutions, about)
- `products` - Product pages
- `leadForm` - Form labels and messages

---

## Design System

### Brand Colors (Solarpunk Theme)

```css
--color-leaf: #2c8136 /* Green */ --color-lavender: #58326f /* Purple */ --color-sun: #eebc15
  /* Yellow */ --color-obsidian: #1a1a1a /* Dark */ --color-copper: #c77c4a /* Accent */;
```

### Typography

```css
--font-heading: 'Space Grotesk', sans-serif --font-body: 'Inter', sans-serif;
```

### Components

**Button Variants:**

- `primary` - Filled, lavender background
- `secondary` - Filled, white background
- `outline` - Border only
- `ghost` - No background
- `creative` - Gradient background

**Card Variants:**

- `default` - Standard card
- `elevated` - Shadow
- `outlined` - Border only

---

## Performance Metrics

### Current Targets

- **Lighthouse Score**: 90+
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Bundle Size**: < 200KB per route

### Optimizations Applied

✅ Next.js App Router (automatic code splitting)
✅ Server Components where possible
✅ Dynamic imports for heavy components
✅ Tailwind CSS (JIT compilation)
✅ Image optimization (next/image)
✅ Font optimization (local fonts)

---

## Testing

### Manual Testing Checklist

- [x] Persona selector works on all browsers
- [x] ROI calculator email gate functions correctly
- [x] Assessment recommendations match logic
- [x] Demo prep pages redirect properly
- [x] Contact form submits successfully
- [x] Mobile responsive on all pages
- [x] Translations load correctly

### Automated Testing

**Current:**

- TypeScript compilation (`pnpm typecheck`)
- ESLint (`pnpm lint`)
- Prettier formatting (`pnpm format`)

**Needed:**

- Unit tests for components
- Integration tests for user flows
- E2E tests with Playwright/Cypress

---

## Deployment

### Current Setup

**Hosting**: Vercel
**Domains**:

- Production: `madfam.io`
- Staging: `staging.madfam.io` (if configured)

**Deployment Flow:**

```
git push → Vercel Build → Deploy to Preview
↓
Merge to main → Deploy to Production
```

### Build Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Lint & Type Check
pnpm lint
pnpm typecheck

# Clean
pnpm clean
```

---

## Known Issues & Technical Debt

### Critical

- [ ] Backend integration needed for lead capture (currently localStorage only)
- [ ] Email drip sequences not implemented
- [ ] CRM integration pending

### High Priority

- [ ] Client logos still placeholders
- [ ] Video testimonials not added
- [ ] Analytics not fully instrumented

### Medium Priority

- [ ] Unit tests missing
- [ ] E2E tests missing
- [ ] Documentation could be more comprehensive
- [ ] Some translations incomplete (PT-BR)

### Low Priority

- [ ] Bundle size could be smaller
- [ ] Some components could be more reusable
- [ ] Code splitting could be optimized

---

## Security Considerations

### Current Measures

✅ Input validation with Zod
✅ Email regex validation
✅ Environment variables for sensitive data
✅ No secrets in code
✅ HTTPS only
✅ CSP headers configured

### Needed

- [ ] Rate limiting on API routes
- [ ] CAPTCHA on forms (prevent spam)
- [ ] API authentication
- [ ] Data encryption at rest
- [ ] Regular security audits

---

## Browser Support

**Supported Browsers:**

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Mobile Chrome (Android 10+)

**Not Supported:**

- IE 11 (end of life)
- Older mobile browsers

---

## Accessibility (a11y)

### Current Compliance

✅ Semantic HTML elements
✅ ARIA labels where needed
✅ Keyboard navigation
✅ Focus states
✅ Alt text on images
✅ Form labels with htmlFor
✅ Color contrast (WCAG AA)

### Improvements Needed

- [ ] Screen reader testing
- [ ] ARIA live regions for dynamic content
- [ ] Skip navigation links
- [ ] Focus trap in modals
- [ ] Reduced motion preferences

---

## Monitoring & Analytics

### Current

- Console logging (development)
- Custom analytics hooks (`@madfam/analytics`)
- Event tracking for conversions

### Needed

- [ ] Error monitoring (Sentry, LogRocket)
- [ ] Performance monitoring (Web Vitals)
- [ ] User session recording (Hotjar, Clarity)
- [ ] A/B testing framework
- [ ] Funnel analysis
- [ ] Heatmaps

---

## Quick Start for Developers

### 1. Clone & Install

```bash
git clone [repository-url]
cd biz-site
pnpm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Make Changes

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes, commit
git add .
git commit -m "feat: your feature description"

# Push and create PR
git push origin feature/your-feature
```

---

## Common Development Tasks

### Add New Page

```typescript
// apps/web/app/[locale]/new-page/page.tsx
import { getTranslations } from 'next-intl/server';

export default async function NewPage() {
  const t = await getTranslations('newPage');
  return <main>{t('title')}</main>;
}
```

### Add New Component

```typescript
// packages/ui/src/components/NewComponent.tsx
import { cn } from '../lib/utils';

interface NewComponentProps {
  className?: string;
}

export function NewComponent({ className }: NewComponentProps) {
  return <div className={cn('base-styles', className)} />;
}
```

### Add Translation

```json
// packages/i18n/src/translations/en/newPage.json
{
  "title": "Page Title",
  "description": "Page description"
}
```

---

## Resources

### Documentation

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs/primitives)
- [next-intl](https://next-intl-docs.vercel.app/)

### Internal Docs

- [`/docs/UX_IMPROVEMENTS_2025.md`](./UX_IMPROVEMENTS_2025.md) - Phase 1 UX work
- [`/docs/UX_ROADMAP.md`](./UX_ROADMAP.md) - Future improvements
- [`/docs/CLAUDE.md`](../CLAUDE.md) - AI assistant context
- [`/docs/ARCHITECTURE.md`](./ARCHITECTURE.md) - System architecture
- [`/docs/BRAND_IMPLEMENTATION_GUIDE.md`](./BRAND_IMPLEMENTATION_GUIDE.md) - Brand guidelines

### Support

- Development team Slack channel
- Weekly standup meetings
- Code review process

---

## Changelog

### November 2025 - Phase 1 UX Improvements ✅

- ✨ Added persona selector with 5 personas
- ✨ Added email gate to ROI calculator
- ✨ Enhanced assessment results with interpretation
- ✨ Added personalized product recommendations
- ✨ Created demo prep pages (/demo/dhanam, /demo/forge-sight)
- ✨ Simplified contact form to 3 fields
- ✨ Added conversion CTAs to tools
- 📝 Comprehensive documentation created

### Previous Releases

See [CHANGELOG.md](../CHANGELOG.md) for full history.

---

**Document Version**: 1.0
**Maintainers**: MADFAM Development Team
**Last Review**: Friday, November 14, 2025
**Next Review**: Saturday, December 14, 2025
