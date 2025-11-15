# Security Documentation

Security guidelines, implementation details, and best practices.

## Contents

- **SECURITY.md** - Security overview and policies
- **SECURITY_IMPLEMENTATION.md** - Detailed security implementation guide

## Key Topics

- Authentication & Authorization
- CSRF Protection
- Input Validation
- API Security
- Environment Variables
- Security Headers

## Quick Reference

```typescript
// Input validation with Zod
import { z } from 'zod';
const schema = z.object({
  /* ... */
});
const validated = schema.parse(input);

// CSRF protection
import { validateCSRF } from '@/lib/csrf';
await validateCSRF(request);
```

---

Last Updated: November 2024
