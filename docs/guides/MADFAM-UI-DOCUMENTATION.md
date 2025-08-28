# MADFAM UI Component Library Documentation

A comprehensive React component library built with TypeScript, Tailwind CSS, and modern design patterns for the MADFAM platform.

## Overview

The MADFAM UI library provides a collection of reusable, accessible, and customizable components designed specifically for business automation, AI consulting, and digital transformation platforms. All components follow consistent design patterns, support dark mode, and include comprehensive TypeScript definitions.

## Installation & Setup

```bash
npm install @madfam/ui
# or
pnpm add @madfam/ui
```

### Dependencies

- React 18+
- Tailwind CSS 3+
- TypeScript 5+
- Class Variance Authority
- Radix UI (for primitives)

## Design System

### Color Palette

```css
/* Brand Colors */
--color-sun: #ffd93d; /* Bright yellow for energy and optimism */
--color-leaf: #6bcb77; /* Fresh green for growth and success */
--color-lavender: #9b59b6; /* Purple for creativity and innovation */
--color-obsidian: #0a0e27; /* Deep blue-black for sophistication */
--color-pearl: #fafafa; /* Off-white for surfaces */
```

### Typography

- **Headings**: Poppins (modern, friendly)
- **Body**: Inter (readable, professional)
- **Code**: Space Mono (distinctive, technical)

### Responsive Sizes

- **Display XL**: `clamp(3rem, 5vw, 5rem)`
- **Display**: `clamp(2.5rem, 4vw, 4rem)`
- **Heading 1**: `clamp(2rem, 3vw, 3rem)`
- **Heading 2**: `clamp(1.5rem, 2.5vw, 2.5rem)`
- **Heading 3**: `clamp(1.25rem, 2vw, 2rem)`

---

## Components

### Assessment

**Purpose**: Interactive AI readiness assessment with multi-step questions and detailed results.

#### Props Interface

```typescript
interface AssessmentProps {
  title?: string;
  description?: string;
  questions: AssessmentQuestion[];
  onComplete?: (result: AssessmentResult) => void;
  className?: string;
  locale?: 'es-MX' | 'en-US' | 'pt-BR';
  translations?: TranslationObject;
}

interface AssessmentQuestion {
  id: string;
  question: string;
  options: {
    value: string;
    text: string;
    score: number;
  }[];
  category: 'strategy' | 'technology' | 'data' | 'culture' | 'processes';
}

interface AssessmentResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  categoryScores: Record<string, number>;
  recommendations: string[];
  recommendedTier:
    | 'L1_ESSENTIALS'
    | 'L2_ADVANCED'
    | 'L3_CONSULTING'
    | 'L4_PLATFORMS'
    | 'L5_STRATEGIC';
}
```

#### Usage Examples

```tsx
import { Assessment } from '@madfam/ui';

// Basic usage
<Assessment
  questions={myQuestions}
  onComplete={(result) => console.log('Assessment result:', result)}
/>

// With custom title and multilingual support
<Assessment
  title="AI Maturity Assessment"
  locale="en-US"
  questions={questions}
  onComplete={handleResults}
  className="max-w-4xl mx-auto"
/>
```

#### Features

- Multi-language support (Spanish, English, Portuguese)
- Progress tracking with visual progress bar
- Category-based scoring (Strategy, Technology, Data, Culture, Processes)
- Automatic service tier recommendations
- Responsive design with mobile optimization
- Built-in result visualization with charts

---

### Button

**Purpose**: Versatile button component with multiple variants, sizes, and states.

#### Props Interface

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'creative' | 'outline' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  fullWidth?: boolean;
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}
```

#### Variants & Styling

- **Primary**: `bg-obsidian text-pearl` - Main actions
- **Secondary**: `bg-sun text-obsidian` - Secondary actions
- **Ghost**: `hover:bg-obsidian/5` - Subtle actions
- **Creative**: `bg-gradient-to-r from-lavender to-sun` - Special CTAs
- **Outline**: `border-2 border-obsidian` - Alternative style
- **Danger**: `bg-red-600 text-white` - Destructive actions
- **Success**: `bg-leaf text-white` - Success states

#### Usage Examples

```tsx
import { Button } from '@madfam/ui';

// Primary button
<Button variant="primary" size="lg">
  Get Started
</Button>

// With icon and loading state
<Button
  variant="creative"
  icon={<StarIcon />}
  loading={isSubmitting}
  onClick={handleSubmit}
>
  Submit Assessment
</Button>

// As link (using asChild)
<Button asChild variant="outline">
  <Link href="/contact">Contact Us</Link>
</Button>
```

#### Features

- 7 distinct visual variants
- 6 size options (xs to xl, plus icon)
- Loading states with spinner
- Icon support (left/right positioning)
- Full width option
- Polymorphic with `asChild` prop
- Built-in accessibility features

---

### Card

**Purpose**: Flexible container component with multiple variants and consistent styling.

#### Props Interface

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'ghost' | 'elevated' | 'glass' | 'gradient' | 'service' | 'product';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}
```

#### Subcomponents

- `CardHeader` - Header section with spacing
- `CardTitle` - Styled heading element
- `CardDescription` - Subtitle/description text
- `CardContent` - Main content area
- `CardFooter` - Footer section with flex layout

#### Variants

- **Default**: Basic card with subtle shadow
- **Ghost**: Transparent with hover effect
- **Elevated**: Enhanced shadow with hover lift
- **Glass**: Glassmorphism effect with backdrop blur
- **Gradient**: Subtle gradient background
- **Service**: Specialized for service offerings
- **Product**: Enhanced styling for product showcases

#### Usage Examples

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@madfam/ui';

// Basic card
<Card variant="default" padding="md">
  <CardHeader>
    <CardTitle>Service Overview</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here...</p>
  </CardContent>
</Card>

// Glass effect card
<Card variant="glass" className="backdrop-blur-lg">
  <CardContent>
    Glassmorphism styled content
  </CardContent>
</Card>
```

---

### Container

**Purpose**: Responsive wrapper component for consistent layout and spacing.

#### Props Interface

```typescript
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
```

#### Sizes

- **sm**: `max-w-3xl` (768px)
- **md**: `max-w-5xl` (1024px)
- **lg**: `max-w-7xl` (1280px) - Default
- **xl**: `max-w-[90rem]` (1440px)
- **full**: `max-w-full` (No limit)

#### Usage Examples

```tsx
import { Container } from '@madfam/ui';

// Default container
<Container>
  <h1>Page Content</h1>
</Container>

// Large container for wide layouts
<Container size="xl">
  <div className="grid grid-cols-3 gap-8">
    {/* Wide grid content */}
  </div>
</Container>
```

---

### CTA (Call-to-Action)

**Purpose**: Prominent section component for driving user actions with multiple layouts.

#### Props Interface

```typescript
interface CTAProps {
  variant?: 'default' | 'centered' | 'split' | 'minimal';
  title: string;
  description?: string;
  cta: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'creative';
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text: string;
    href: string;
    variant?: 'outline' | 'ghost';
    icon?: React.ReactNode;
  };
  background?: 'gradient' | 'solid' | 'pattern' | 'none';
  icon?: React.ReactNode;
  image?: string;
  className?: string;
}
```

#### Variants

- **Default**: Standard layout with title, description, and buttons
- **Centered**: Center-aligned content for maximum impact
- **Split**: Two-column layout with image support
- **Minimal**: Compact version for inline use

#### Backgrounds

- **Gradient**: `bg-gradient-to-r from-lavender to-sun`
- **Solid**: `bg-obsidian`
- **Pattern**: Obsidian with decorative pattern overlay
- **None**: Transparent background

#### Usage Examples

```tsx
import { CTA } from '@madfam/ui';

// Basic centered CTA
<CTA
  variant="centered"
  title="Ready to Transform Your Business?"
  description="Join hundreds of companies already benefiting from AI automation"
  cta={{
    text: "Start Assessment",
    href: "/assessment",
    variant: "creative"
  }}
  secondaryCta={{
    text: "Learn More",
    href: "/services",
    variant: "outline"
  }}
  background="gradient"
/>

// Split layout with image
<CTA
  variant="split"
  title="See SPARK in Action"
  image="/products/spark-demo.jpg"
  cta={{ text: "Book Demo", href: "/demo" }}
/>
```

---

### Features

**Purpose**: Showcase product or service features in various layouts with icons and descriptions.

#### Props Interface

```typescript
interface FeaturesProps {
  variant?: 'grid' | 'list' | 'cards' | 'timeline';
  title?: string;
  subtitle?: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  centered?: boolean;
  iconStyle?: 'default' | 'gradient' | 'filled';
  className?: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
  badge?: string;
}
```

#### Variants

- **Grid**: Traditional grid layout (default)
- **List**: Vertical list with side-by-side icon/content
- **Cards**: Each feature in individual cards with hover effects
- **Timeline**: Vertical timeline layout with connecting line

#### Icon Styles

- **Default**: `bg-gray-100` neutral background
- **Gradient**: `bg-gradient-to-br from-lavender/20 to-sun/20`
- **Filled**: `bg-lavender text-white` solid background

#### Usage Examples

```tsx
import { Features } from '@madfam/ui';

const features = [
  {
    icon: <AiIcon />,
    title: "AI-Powered Automation",
    description: "Intelligent process automation that learns and adapts",
    link: { text: "Learn More", href: "/ai-automation" }
  },
  {
    icon: <IntegrationIcon />,
    title: "Seamless Integrations",
    description: "Connect with 100+ popular business tools",
    badge: "New"
  }
];

// Grid layout
<Features
  variant="grid"
  title="Platform Capabilities"
  subtitle="What makes us different"
  features={features}
  columns={3}
  iconStyle="gradient"
  centered
/>

// Timeline layout
<Features
  variant="timeline"
  title="Implementation Process"
  features={processSteps}
  iconStyle="filled"
/>
```

---

### Heading

**Purpose**: Semantic heading component with consistent typography and gradient options.

#### Props Interface

```typescript
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  gradient?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
```

#### Typography Scale

- **Level 1**: `text-display` - Main page headings
- **Level 2**: `text-heading-1` - Section headings
- **Level 3**: `text-heading-2` - Subsection headings
- **Level 4**: `text-heading-3` - Component headings
- **Level 5**: `text-xl` - Small headings
- **Level 6**: `text-lg` - Micro headings

#### Usage Examples

```tsx
import { Heading } from '@madfam/ui';

// Main page heading with gradient
<Heading level={1} gradient>
  Transform Your Business with AI
</Heading>

// Section heading with custom element
<Heading level={2} as="h1">
  Services Overview
</Heading>
```

---

### Hero

**Purpose**: Large banner component for page headers with multiple layout and background options.

#### Props Interface

```typescript
interface HeroProps {
  variant?: 'home' | 'service' | 'product' | 'simple';
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  cta?: {
    primary?: {
      text: string;
      href: string;
      variant?: 'primary' | 'secondary' | 'creative';
      icon?: React.ReactNode;
    };
    secondary?: {
      text: string;
      href: string;
      variant?: 'outline' | 'ghost';
      icon?: React.ReactNode;
    };
  };
  background?: 'gradient' | 'mesh' | 'particles' | 'none';
  overlay?: boolean;
  centered?: boolean;
  fullHeight?: boolean;
  children?: React.ReactNode;
  className?: string;
}
```

#### Variants

- **Home**: Maximum impact with large text and animations
- **Service**: Focused on service-specific messaging
- **Product**: Product-centric with subtle animations
- **Simple**: Clean layout for basic pages

#### Backgrounds

- **Gradient**: `bg-gradient-to-br from-obsidian via-obsidian/95 to-lavender/10`
- **Mesh**: Obsidian with animated mesh pattern
- **Particles**: Solid obsidian (particle effects via JS)
- **None**: Transparent background

#### Usage Examples

```tsx
import { Hero } from '@madfam/ui';

// Home page hero
<Hero
  variant="home"
  subtitle="AI Business Transformation"
  title="Automate, Optimize, Accelerate"
  description="Transform your business with intelligent automation and AI-powered solutions"
  background="gradient"
  cta={{
    primary: { text: "Start Assessment", href: "/assessment" },
    secondary: { text: "View Services", href: "/services" }
  }}
  fullHeight
  centered
/>

// Service page hero
<Hero
  variant="service"
  title="L3 - Consulting Services"
  description="Strategic AI implementation guidance"
  background="mesh"
  cta={{ primary: { text: "Book Consultation", href: "/contact" } }}
/>
```

---

### LeadForm

**Purpose**: Comprehensive form component for lead capture with multiple variants and validation.

#### Props Interface

```typescript
interface LeadFormProps {
  variant?: 'simple' | 'progressive' | 'detailed';
  tier?: ServiceTier;
  source?: string;
  title?: string;
  description?: string;
  submitText?: string;
  onSubmit?: (data: LeadFormData) => Promise<void>;
  onSuccess?: () => void;
  className?: string;
}

interface LeadFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  tier?: ServiceTier;
  industry?: string;
  companySize?: string;
  budget?: string;
  timeframe?: string;
  challenges?: string[];
  message?: string;
  source?: string;
}

type ServiceTier =
  | 'L1_ESSENTIALS'
  | 'L2_ADVANCED'
  | 'L3_CONSULTING'
  | 'L4_PLATFORMS'
  | 'L5_STRATEGIC';
```

#### Variants

- **Simple**: Basic contact form with essential fields
- **Progressive**: Multi-step form with progress indicator
- **Detailed**: All fields in single view (same as simple currently)

#### Features

- Built-in validation for required fields
- Progressive disclosure in multi-step variant
- Service tier pre-selection
- Industry and company size options
- Budget and timeframe selection
- Challenge selection (multiple choice)
- Form state management with error handling
- Loading states and success/error messages

#### Usage Examples

```tsx
import { LeadForm } from '@madfam/ui';

// Simple lead capture
<LeadForm
  variant="simple"
  title="Get Started Today"
  onSubmit={async (data) => {
    await submitLead(data);
  }}
  onSuccess={() => router.push('/thank-you')}
/>

// Progressive form with service tier
<LeadForm
  variant="progressive"
  tier="L3_CONSULTING"
  source="consulting-page"
  onSubmit={handleLeadSubmission}
/>
```

---

### Newsletter

**Purpose**: Email subscription component with multiple layouts and states.

#### Props Interface

```typescript
interface NewsletterProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: 'card' | 'inline' | 'footer';
  size?: 'sm' | 'md' | 'lg';
  onSubscribe?: (email: string) => Promise<void>;
  className?: string;
}
```

#### Variants

- **Card**: Full card layout with icon, title, and description
- **Inline**: Compact horizontal layout
- **Footer**: Dark theme variant for footer use

#### Usage Examples

```tsx
import { Newsletter } from '@madfam/ui';

// Card variant
<Newsletter
  title="Stay Updated"
  description="Get the latest insights on AI and automation"
  onSubscribe={async (email) => {
    await subscribeToNewsletter(email);
  }}
/>

// Inline variant for sidebars
<Newsletter
  variant="inline"
  size="sm"
  placeholder="Enter your email"
  buttonText="Subscribe"
/>

// Footer variant
<Newsletter
  variant="footer"
  title="Newsletter"
  description="Monthly updates and insights"
/>
```

---

### ProductCard

**Purpose**: Specialized card component for showcasing products with features, badges, and CTAs.

#### Props Interface

```typescript
interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  features: Array<{
    icon?: React.ReactNode;
    text: string;
  }>;
  image?: string;
  logo?: React.ReactNode;
  badge?: {
    text: string;
    variant?: 'new' | 'beta' | 'popular';
  };
  cta?: {
    primary?: {
      text: string;
      href: string;
    };
    secondary?: {
      text: string;
      href: string;
    };
  };
  gradient?: string;
  className?: string;
}
```

#### Badge Variants

- **New**: `bg-gradient-to-r from-leaf to-sun`
- **Beta**: `bg-gradient-to-r from-lavender to-creative`
- **Popular**: `bg-gradient-to-r from-sun to-creative`

#### Usage Examples

```tsx
import { ProductCard } from '@madfam/ui';

<ProductCard
  name="SPARK"
  tagline="Integration Platform"
  description="Connect and automate your entire tech stack"
  logo={<SparkLogo />}
  badge={{ text: 'Popular', variant: 'popular' }}
  features={[
    { icon: <IntegrationIcon />, text: '100+ Integrations' },
    { icon: <AutomationIcon />, text: 'No-code Automation' },
    { icon: <ScaleIcon />, text: 'Enterprise Scale' },
  ]}
  image="/products/spark-dashboard.jpg"
  cta={{
    primary: { text: 'Try Free', href: '/spark/trial' },
    secondary: { text: 'Learn More', href: '/spark' },
  }}
  gradient="from-blue/10 to-purple/10"
/>;
```

---

### ROICalculator

**Purpose**: Interactive calculator for estimating return on investment with service-specific parameters.

#### Props Interface

```typescript
interface ROICalculatorProps {
  serviceTier?: ServiceTier;
  title?: string;
  currency?: 'MXN' | 'USD';
  variant?: 'compact' | 'full';
  className?: string;
  onCalculate?: (results: ROIResults) => void;
}

interface ROIResults {
  monthlySavings: number;
  timeSaved: number;
  roiPercentage: number;
  paybackPeriod: number;
  totalBenefit: number;
  investment: number;
}
```

#### Service Tier Pricing (MXN)

- **L1_ESSENTIALS**: $5,000
- **L2_ADVANCED**: $15,000
- **L3_CONSULTING**: $50,000
- **L4_PLATFORMS**: $150,000
- **L5_STRATEGIC**: $500,000

#### Variants

- **Compact**: Simplified inputs with basic results
- **Full**: Complete calculator with detailed breakdown and charts

#### Usage Examples

```tsx
import { ROICalculator } from '@madfam/ui';

// Full calculator
<ROICalculator
  serviceTier="L3_CONSULTING"
  title="Calculate Your ROI"
  currency="MXN"
  variant="full"
  onCalculate={(results) => {
    trackEvent('roi_calculated', results);
  }}
/>

// Compact version for sidebars
<ROICalculator
  variant="compact"
  serviceTier="L2_ADVANCED"
/>
```

---

### ServiceCard

**Purpose**: Specialized card for displaying service tiers with pricing, features, and tier-specific styling.

#### Props Interface

```typescript
interface ServiceCardProps {
  tier: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  title: string;
  description: string;
  price?: {
    amount: number;
    currency: 'MXN' | 'USD';
    period?: 'hour' | 'project' | 'month';
  };
  features: string[];
  cta?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'creative';
  };
  badge?: string;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}
```

#### Tier Colors & Gradients

- **L1**: Leaf green (`border-leaf`, `from-leaf/10 to-leaf/5`)
- **L2**: Sun yellow (`border-sun`, `from-sun/10 to-sun/5`)
- **L3**: Lavender purple (`border-lavender`, `from-lavender/10 to-lavender/5`)
- **L4**: Creative blend (`border-creative`, `from-creative/10 to-creative/5`)
- **L5**: Obsidian dark (`border-obsidian`, `from-obsidian/10 to-obsidian/5`)

#### Usage Examples

```tsx
import { ServiceCard } from '@madfam/ui';

<ServiceCard
  tier="L3"
  title="AI Consulting"
  description="Strategic guidance for AI implementation"
  price={{ amount: 50000, currency: 'MXN', period: 'project' }}
  features={[
    'AI strategy development',
    'Technology assessment',
    'Implementation roadmap',
    'Team training',
  ]}
  badge="Most Popular"
  cta={{
    text: 'Get Started',
    href: '/contact?tier=L3',
    variant: 'creative',
  }}
  icon={<ConsultingIcon />}
/>;
```

---

### Spinner

**Purpose**: Loading indicator component with size variants.

#### Props Interface

```typescript
interface SpinnerProps extends React.SVGAttributes<SVGElement> {
  size?: 'sm' | 'md' | 'lg';
}
```

#### Sizes

- **sm**: `h-4 w-4` (16px)
- **md**: `h-6 w-6` (24px)
- **lg**: `h-8 w-8` (32px)

#### Usage Examples

```tsx
import { Spinner } from '@madfam/ui';

// In buttons
<Button loading={isSubmitting}>
  {isSubmitting && <Spinner size="sm" />}
  Submit
</Button>

// Standalone
<div className="flex justify-center">
  <Spinner size="lg" />
</div>
```

---

### Testimonial & TestimonialCard

**Purpose**: Display customer testimonials with ratings, author info, and results.

#### Testimonial Props Interface

```typescript
interface TestimonialProps {
  testimonial: TestimonialData;
  variant?: 'card' | 'quote' | 'featured';
  showResults?: boolean;
  className?: string;
}

interface TestimonialData {
  id: string;
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    image?: string;
  };
  rating?: number;
  service?: string;
  results?: {
    metric: string;
    value: string;
    description: string;
  }[];
}
```

#### TestimonialCard Props Interface

```typescript
interface TestimonialCardProps {
  quote: string;
  author: {
    name: string;
    role: string;
    company?: string;
    image?: string;
  };
  rating?: number;
  logo?: string;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}
```

#### Variants

- **Card**: Standard card layout with full content
- **Quote**: Stylized quote format with decorative elements
- **Featured**: Enhanced layout with results showcase
- **Compact**: Minimal space usage
- **Default**: Standard testimonial card

#### Usage Examples

```tsx
import { Testimonial, TestimonialCard, TestimonialGrid } from '@madfam/ui';

// Individual testimonial
<Testimonial
  variant="featured"
  testimonial={{
    id: "1",
    content: "MADFAM transformed our entire workflow...",
    author: {
      name: "Ana García",
      role: "CTO",
      company: "TechCorp",
      image: "/testimonials/ana.jpg"
    },
    rating: 5,
    service: "L3 - Consulting",
    results: [
      { metric: "Efficiency Gain", value: "65%", description: "Process improvement" },
      { metric: "Cost Reduction", value: "$50k", description: "Annual savings" }
    ]
  }}
  showResults
/>

// Simple testimonial card
<TestimonialCard
  quote="Outstanding service and results"
  author={{
    name: "Carlos Mendoza",
    role: "Operations Director",
    company: "InnovateCorp"
  }}
  rating={5}
  variant="default"
/>

// Grid of testimonials
<TestimonialGrid
  testimonials={testimonialData}
  variant="grid"
  columns={3}
/>
```

---

## Utility Functions

### cn() - Class Name Utility

```typescript
import { cn } from '@madfam/ui';

// Combines class names with tailwind-merge
<div className={cn(
  'base-classes',
  condition && 'conditional-classes',
  className // external className prop
)}>
```

---

## Best Practices

### Component Composition

```tsx
// Good: Compose complex layouts
<Container size="lg">
  <div className="space-y-12">
    <Hero
      title="Welcome to MADFAM"
      background="gradient"
      cta={{ primary: { text: 'Get Started', href: '/assessment' } }}
    />
    <Features title="Our Services" variant="grid" features={serviceFeatures} />
    <CTA
      variant="centered"
      title="Ready to Transform?"
      cta={{ text: 'Start Now', href: '/contact' }}
    />
  </div>
</Container>
```

### Responsive Design

```tsx
// Components are responsive by default
<Features
  columns={3} // Automatically adjusts: 1 col mobile, 2 col tablet, 3 col desktop
  className="space-y-8 md:space-y-12 lg:space-y-16"
/>
```

### Dark Mode Support

```tsx
// All components support dark mode automatically
<Card className="bg-white dark:bg-obsidian/5">
  <CardContent>
    <p className="text-gray-800 dark:text-gray-200">Content adapts to theme</p>
  </CardContent>
</Card>
```

### Accessibility

```tsx
// Components include ARIA attributes and keyboard navigation
<Button aria-label="Submit assessment form" disabled={!isValid} loading={isSubmitting}>
  Submit Assessment
</Button>
```

---

## Advanced Usage

### Custom Variants

```tsx
// Extend existing variants with additional styling
<Button
  variant="creative"
  className={cn(
    'shadow-2xl transform hover:scale-105',
    'bg-gradient-to-r from-purple-600 to-blue-600'
  )}
>
  Custom Styled Button
</Button>
```

### Form Integration

```tsx
// Integrate with form libraries
<form onSubmit={handleSubmit}>
  <LeadForm
    variant="progressive"
    onSubmit={async data => {
      await submitToAPI(data);
      toast.success('Form submitted successfully!');
    }}
    onSuccess={() => router.push('/thank-you')}
  />
</form>
```

### Animation Integration

```tsx
// Components work with animation libraries
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
  <ServiceCard tier="L3" title="AI Consulting" features={features} />
</motion.div>
```

---

## TypeScript Support

All components include comprehensive TypeScript definitions:

```typescript
// Type-safe props
interface MyPageProps {
  services: ServiceTier[];
  testimonials: TestimonialData[];
}

// Proper component typing
const MyPage: React.FC<MyPageProps> = ({ services, testimonials }) => {
  return (
    <Container>
      <Features features={typedFeatures} />
      <TestimonialGrid testimonials={testimonials} />
    </Container>
  );
};
```

---

## Contributing

When adding new components:

1. Follow the established prop interface patterns
2. Include comprehensive TypeScript definitions
3. Support all standard HTML attributes via rest props
4. Use `React.forwardRef` for ref forwarding
5. Include `displayName` for debugging
6. Support dark mode with appropriate classes
7. Follow the design system color palette
8. Include responsive behavior by default
9. Add proper ARIA attributes for accessibility
10. Document all props and usage examples

---

## Support & Resources

- **Package**: `@madfam/ui`
- **Repository**: `/packages/ui/`
- **Dependencies**: React 18+, Tailwind CSS 3+, TypeScript 5+
- **Design System**: Built around MADFAM brand colors and typography
- **Framework**: Next.js compatible, RSC ready

For questions or contributions, refer to the main project documentation and contribution guidelines.
