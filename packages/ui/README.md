# @madfam/ui

Shared UI component library for MADFAM applications.

## Overview

This package contains reusable React components built with TypeScript and styled with Tailwind CSS. All components follow MADFAM's design system and are optimized for performance and accessibility.

## Installation

This package is part of the monorepo and is automatically available to other packages.

```typescript
import { Button, Card, Container } from '@madfam/ui';
```

## Components

### Layout Components

#### Container
Responsive container with max-width variants.

```tsx
<Container size="lg">
  {/* Content */}
</Container>
```

Props:
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'

### Typography

#### Heading
Semantic heading component with levels and styling.

```tsx
<Heading level={1} gradient>
  Welcome to MADFAM
</Heading>
```

Props:
- `level`: 1 | 2 | 3 | 4 | 5 | 6
- `gradient`: boolean
- `as`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

### Interactive Components

#### Button
Versatile button component with multiple variants.

```tsx
<Button variant="primary" size="lg" loading={isLoading}>
  Click me
</Button>
```

Props:
- `variant`: 'primary' | 'secondary' | 'ghost' | 'creative' | 'outline'
- `size`: 'sm' | 'md' | 'lg' | 'icon'
- `loading`: boolean
- `asChild`: boolean

### Card Components

#### Card
Flexible card component with subcomponents.

```tsx
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

Card Props:
- `variant`: 'default' | 'ghost' | 'elevated' | 'glass'
- `padding`: 'none' | 'sm' | 'md' | 'lg'

## Design System

### Colors

The UI package uses CSS variables for theming:

```css
--color-sun: #FFD93D;
--color-leaf: #6BCB77;
--color-lavender: #9B59B6;
--color-obsidian: #0A0E27;
--color-pearl: #FAFAFA;
```

### Typography

- Headings: Poppins
- Body: Inter
- Code: Space Mono

### Spacing

Based on 8px grid:
- xs: 0.5rem (4px)
- sm: 1rem (8px)
- md: 2rem (16px)
- lg: 3rem (24px)
- xl: 4rem (32px)

## Utilities

### cn()
Class name utility for merging Tailwind classes.

```tsx
import { cn } from '@madfam/ui';

<div className={cn('base-class', conditional && 'conditional-class', className)} />
```

## Development

### Adding a New Component

1. Create component file in `src/components/ComponentName.tsx`
2. Export from `src/index.ts`
3. Add tests in `src/components/ComponentName.test.tsx`
4. Document usage

### Component Template

```tsx
import * as React from 'react';
import { cn } from '../lib/utils';

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add specific props
}

export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('base-styles', className)}
        {...props}
      />
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### Testing

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch
```

## Best Practices

1. **Accessibility**
   - Use semantic HTML
   - Include ARIA labels where needed
   - Ensure keyboard navigation
   - Test with screen readers

2. **Performance**
   - Use React.memo for expensive components
   - Implement proper loading states
   - Optimize bundle size

3. **Styling**
   - Use Tailwind utilities
   - Follow mobile-first approach
   - Extract repeated patterns

4. **TypeScript**
   - Define all prop types
   - Use generics where appropriate
   - Avoid `any` type

## Examples

### Form with Components

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from '@madfam/ui';

function ContactForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          {/* Form fields */}
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Loading State

```tsx
<Button loading disabled>
  Processing...
</Button>
```

### Responsive Layout

```tsx
<Container size="lg">
  <div className="grid md:grid-cols-2 gap-8">
    <Card>Content 1</Card>
    <Card>Content 2</Card>
  </div>
</Container>
```

## Contributing

When contributing to the UI package:

1. Follow the existing component patterns
2. Include comprehensive TypeScript types
3. Add unit tests for new components
4. Update this README with usage examples
5. Ensure accessibility standards are met

## License

Part of MADFAM monorepo - All rights reserved.