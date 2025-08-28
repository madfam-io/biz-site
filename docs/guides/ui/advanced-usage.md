# Advanced Usage & Best Practices

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
