# @madfam/core

Core business logic, types, and utilities for MADFAM applications.

## Overview

This package contains the business logic, type definitions, and core functionality shared across MADFAM applications. It includes service tier definitions, feature flags, and domain models.

## Installation

This package is part of the monorepo and is automatically available to other packages.

```typescript
import { ServiceTier, FeatureFlagProvider } from '@madfam/core';
```

## Modules

### Service Tiers

The core of MADFAM's business model - the 5-tier service structure.

```typescript
import { ServiceTier, serviceTiers } from '@madfam/core';

// Access a specific tier
const consultingTier = serviceTiers[ServiceTier.L3_CONSULTING];

// Use in components
<ServiceCard service={consultingTier} />
```

#### ServiceTier Enum

```typescript
enum ServiceTier {
  L1_ESSENTIALS = 'essentials',
  L2_ADVANCED = 'advanced',
  L3_CONSULTING = 'consulting',
  L4_PLATFORMS = 'platforms',
  L5_STRATEGIC = 'strategic',
}
```

#### ServiceTierConfig Interface

```typescript
interface ServiceTierConfig {
  id: ServiceTier;
  level: number;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  startingPrice: number;
  currency: 'MXN' | 'USD';
  features: string[];
  featuresEn: string[];
  idealFor: string[];
  idealForEn: string[];
  cta: {
    text: string;
    textEn: string;
    action: 'quote' | 'contact' | 'book' | 'demo';
  };
  color: 'leaf' | 'sun' | 'lavender' | 'obsidian' | 'creative';
  icon: string;
  duration?: string;
  durationEn?: string;
}
```

### Feature Flags

Control feature availability across environments.

```typescript
import { FeatureFlagProvider } from '@madfam/core';

// Initialize
const flags = new FeatureFlagProvider();

// Check if feature is enabled
if (flags.isEnabled('NEW_LEAD_SCORING')) {
  // Use new feature
}

// Get all flags
const allFlags = flags.getAllFlags();
```

#### Available Flags

```typescript
const featureFlags = {
  NEW_LEAD_SCORING: {
    development: true,
    staging: true,
    production: false,
  },
  INTERACTIVE_CALCULATOR: {
    development: true,
    staging: true,
    production: true,
  },
  CHAT_SUPPORT: {
    development: true,
    staging: false,
    production: false,
  },
  PORTUGUESE_LOCALE: {
    development: true,
    staging: true,
    production: false,
  },
};
```

## Usage Examples

### Service Tier Selection

```typescript
import { ServiceTier, serviceTiers } from '@madfam/core';

function ServiceSelector() {
  const tiers = Object.values(serviceTiers);

  return (
    <select>
      {tiers.map(tier => (
        <option key={tier.id} value={tier.id}>
          L{tier.level} - {tier.name} (${tier.startingPrice} {tier.currency})
        </option>
      ))}
    </select>
  );
}
```

### Feature Flag Hook

```typescript
import { FeatureFlagProvider } from '@madfam/core';
import { useEffect, useState } from 'react';

function useFeatureFlag(flagKey: string): boolean {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const provider = new FeatureFlagProvider();
    setIsEnabled(provider.isEnabled(flagKey));
  }, [flagKey]);

  return isEnabled;
}

// Usage
function MyComponent() {
  const showNewFeature = useFeatureFlag('NEW_LEAD_SCORING');

  if (showNewFeature) {
    return <NewFeature />;
  }

  return <OldFeature />;
}
```

### Service Pricing Display

```typescript
import { serviceTiers, ServiceTier } from '@madfam/core';

function PricingTable() {
  const tiers = [
    ServiceTier.L1_ESSENTIALS,
    ServiceTier.L3_CONSULTING,
    ServiceTier.L5_STRATEGIC
  ];

  return (
    <div className="pricing-grid">
      {tiers.map(tierId => {
        const tier = serviceTiers[tierId];
        return (
          <div key={tier.id} className="pricing-card">
            <h3>{tier.name}</h3>
            <p className="price">
              Desde ${tier.startingPrice.toLocaleString()} {tier.currency}
            </p>
            <ul>
              {tier.features.slice(0, 3).map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button>{tier.cta.text}</button>
          </div>
        );
      })}
    </div>
  );
}
```

## Type Definitions

### Business Types

```typescript
// Lead scoring
interface LeadScore {
  value: number; // 0-100
  factors: {
    email: number;
    company: number;
    tier: number;
    engagement: number;
  };
}

// Service inquiry
interface ServiceInquiry {
  tier: ServiceTier;
  timestamp: Date;
  source: string;
  metadata?: Record<string, unknown>;
}
```

## Development

### Adding New Features

1. **New Service Tier**

   - Update `ServiceTier` enum
   - Add configuration to `serviceTiers` object
   - Update translations

2. **New Feature Flag**

   - Add to `featureFlags` object
   - Set environment defaults
   - Document usage

3. **New Business Logic**
   - Create new file in appropriate directory
   - Export from index.ts
   - Add tests

### Testing

```bash
# Run tests
pnpm test

# Test coverage
pnpm test:coverage
```

## Best Practices

1. **Type Safety**

   - Use enums for fixed values
   - Define interfaces for all data structures
   - Avoid `any` type

2. **Internationalization**

   - Include both Spanish and English text
   - Use consistent naming (field/fieldEn)

3. **Feature Flags**

   - Default to false in production
   - Test thoroughly in staging
   - Document rollout strategy

4. **Business Logic**
   - Keep pure functions
   - Avoid side effects
   - Make testable

## Future Additions

Planned additions to the core package:

- **Lead scoring algorithm** - Advanced AI-driven lead qualification
- **ROI calculation models** - Service-specific ROI projections
- **Service recommendation engine** - Intelligent tier suggestions
- **Pricing calculators** - Dynamic pricing based on requirements
- **Business rules engine** - Configurable business logic

## API Reference

### Core Classes

#### FeatureFlagProvider

```typescript
class FeatureFlagProvider {
  isEnabled(flagKey: string): boolean;
  getAllFlags(): Record<string, boolean>;
  getEnvironment(): 'development' | 'staging' | 'production';
}
```

#### ServiceTierUtils

```typescript
class ServiceTierUtils {
  static getByLevel(level: number): ServiceTierConfig | undefined;
  static getRecommendedTier(requirements: string[]): ServiceTier;
  static calculatePrice(tier: ServiceTier, requirements: object): number;
}
```

## Contributing

When contributing to the core package:

1. **Maintain backward compatibility** - Never break existing APIs
2. **Update all affected packages** - Ensure monorepo consistency
3. **Add comprehensive tests** - Cover edge cases and error paths
4. **Document new features** - Update this README and inline docs
5. **Update TypeScript definitions** - Keep types accurate and complete

## Package Information

| Property         | Value                     |
| ---------------- | ------------------------- |
| **Package Name** | @madfam/core              |
| **Version**      | 0.1.0                     |
| **Last Updated** | July 2025                 |
| **Dependencies** | Minimal (TypeScript only) |
| **Bundle Size**  | < 10KB                    |

## License

Part of MADFAM monorepo - All rights reserved.

---

**Maintained by**: MADFAM Core Team  
**Next Review**: August 2025
