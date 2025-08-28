# Security Implementation Framework

## Immediate Security Fixes (Week 1)

### 1. Dependency Vulnerabilities

```bash
# Fix critical vulnerabilities
pnpm audit --audit-level critical
pnpm update form-data express
pnpm add -D audit-ci

# Add to CI/CD
echo "pnpm audit --audit-level moderate" >> .github/workflows/security.yml
```

### 2. API Security Middleware

```typescript
// middleware/security.ts
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Limit 500 users per minute
});

export async function securityMiddleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const pathname = request.nextUrl.pathname;

  // Rate limiting for API routes
  if (pathname.startsWith('/api')) {
    try {
      await limiter.check(10, request.ip || 'anonymous'); // 10 requests per minute
    } catch {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
  }

  // CORS handling
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}
```

### 3. Input Validation Enhancement

```typescript
// lib/validation.ts
import { z } from 'zod';

// Sanitize HTML input
export function sanitizeHtml(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

// Enhanced lead validation
export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\u00C0-\u017F]+$/, 'Name contains invalid characters'),

  email: z.string().email('Invalid email format').max(254, 'Email too long'),

  company: z.string().max(100, 'Company name too long').optional(),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message too long')
    .transform(sanitizeHtml),

  phone: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone format')
    .optional(),
});

// API route usage
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = leadSchema.parse(body);

    // Process validated data
    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    throw error;
  }
}
```

### 4. Environment Variable Security

```typescript
// lib/env-validation.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url('Invalid database URL'),
  NEXTAUTH_SECRET: z.string().min(32, 'NextAuth secret too short'),
  NEXTAUTH_URL: z.string().url('Invalid NextAuth URL'),
  RESEND_API_KEY: z.string().startsWith('re_', 'Invalid Resend API key'),
  OPENAI_API_KEY: z.string().startsWith('sk-', 'Invalid OpenAI API key').optional(),
});

export const env = envSchema.parse(process.env);

// Usage in API routes
import { env } from '@/lib/env-validation';

export async function POST() {
  // Environment variables are now type-safe and validated
  const result = await sendEmail({
    apiKey: env.RESEND_API_KEY,
    // ...
  });
}
```

## Authentication & Authorization

### 1. Enhanced Session Security

```typescript
// lib/auth.ts
import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub!;
      session.user.role = token.role;
      session.user.permissions = token.permissions;
      return session;
    },
  },
  providers: [
    // Provider configuration
  ],
  events: {
    async signIn({ user, account, profile }) {
      // Log successful sign-in
      logger.info({
        event: 'user_signin',
        userId: user.id,
        provider: account?.provider,
      });
    },
    async signOut({ token }) {
      // Log sign-out
      logger.info({
        event: 'user_signout',
        userId: token?.sub,
      });
    },
  },
};
```

### 2. Role-Based Access Control

```typescript
// lib/permissions.ts
export enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export enum Permission {
  READ_LEADS = 'read_leads',
  WRITE_LEADS = 'write_leads',
  DELETE_LEADS = 'delete_leads',
  MANAGE_USERS = 'manage_users',
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    Permission.READ_LEADS,
    Permission.WRITE_LEADS,
    Permission.DELETE_LEADS,
    Permission.MANAGE_USERS,
  ],
  [Role.EDITOR]: [Permission.READ_LEADS, Permission.WRITE_LEADS],
  [Role.VIEWER]: [Permission.READ_LEADS],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

// Usage in API routes
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.user.role, Permission.DELETE_LEADS)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Process deletion
}
```

## Data Protection & Privacy

### 1. Personal Data Handling

```typescript
// lib/data-protection.ts
export class PersonalDataHandler {
  // Hash sensitive data
  static async hashSensitiveData(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Anonymize user data for analytics
  static anonymizeUser(user: { id: string; email: string; name?: string }) {
    return {
      userId: this.hashSensitiveData(user.id),
      domain: user.email.split('@')[1],
      hasName: !!user.name,
    };
  }

  // GDPR data export
  static async exportUserData(userId: string) {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        leads: true,
        assessments: true,
      },
    });

    // Remove sensitive fields
    return {
      ...userData,
      password: undefined,
      internalNotes: undefined,
    };
  }

  // GDPR data deletion
  static async deleteUserData(userId: string) {
    await prisma.$transaction([
      prisma.assessment.deleteMany({ where: { userId } }),
      prisma.lead.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);
  }
}
```

### 2. Audit Logging

```typescript
// lib/audit-log.ts
export enum AuditEvent {
  USER_LOGIN = 'user_login',
  USER_LOGOUT = 'user_logout',
  LEAD_CREATED = 'lead_created',
  DATA_EXPORTED = 'data_exported',
  DATA_DELETED = 'data_deleted',
}

export interface AuditLogEntry {
  event: AuditEvent;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  resource?: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export class AuditLogger {
  static async log(entry: Omit<AuditLogEntry, 'timestamp'>) {
    await prisma.auditLog.create({
      data: {
        ...entry,
        timestamp: new Date(),
      },
    });

    // Also log to external service for compliance
    if (process.env.NODE_ENV === 'production') {
      await this.logToExternalService(entry);
    }
  }

  private static async logToExternalService(entry: AuditLogEntry) {
    // Log to Sentry, DataDog, or compliance service
  }
}

// Usage in API routes
export async function POST(request: Request) {
  const session = await getServerSession();
  const lead = await createLead(leadData);

  await AuditLogger.log({
    event: AuditEvent.LEAD_CREATED,
    userId: session?.user?.id,
    ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    resource: 'lead',
    resourceId: lead.id,
  });
}
```

## Security Monitoring

### 1. Security Event Detection

```typescript
// lib/security-monitor.ts
export class SecurityMonitor {
  // Detect suspicious activity
  static async detectSuspiciousActivity(request: Request) {
    const ip = request.headers.get('x-forwarded-for');
    const userAgent = request.headers.get('user-agent');

    const suspiciousPatterns = [
      /bot|crawler|spider/i.test(userAgent),
      /sql|script|javascript|<|>/i.test(request.url),
      await this.isFromSuspiciousIP(ip),
    ];

    if (suspiciousPatterns.some(Boolean)) {
      await this.reportSuspiciousActivity({
        ip,
        userAgent,
        url: request.url,
        timestamp: new Date(),
      });
    }
  }

  private static async isFromSuspiciousIP(ip: string): Promise<boolean> {
    // Check against threat intelligence feeds
    // This is a simplified example
    const knownMaliciousIPs = new Set([
      // Add known malicious IPs
    ]);
    return knownMaliciousIPs.has(ip);
  }

  private static async reportSuspiciousActivity(activity: any) {
    // Send alert to security team
    await fetch(process.env.SECURITY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        alert: 'Suspicious Activity Detected',
        details: activity,
      }),
    });
  }
}
```

## Implementation Timeline

### Week 1 - Critical Fixes

- [ ] Fix dependency vulnerabilities
- [ ] Implement input validation
- [ ] Add security middleware
- [ ] Environment variable validation

### Week 2 - Authentication & Authorization

- [ ] Enhanced session security
- [ ] Role-based access control
- [ ] Audit logging system
- [ ] Security monitoring

### Week 3 - Data Protection

- [ ] Personal data handling
- [ ] GDPR compliance features
- [ ] Data encryption at rest
- [ ] Secure data transmission

### Week 4 - Monitoring & Response

- [ ] Security event detection
- [ ] Automated threat response
- [ ] Security dashboard
- [ ] Incident response plan

## Security Checklist

### API Security

- [ ] All endpoints have rate limiting
- [ ] Input validation on all user inputs
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Authentication on sensitive endpoints

### Infrastructure Security

- [ ] HTTPS enforced everywhere
- [ ] Security headers configured
- [ ] Database encryption at rest
- [ ] Secrets management
- [ ] Regular security updates

### Monitoring

- [ ] Failed login attempt monitoring
- [ ] Suspicious activity detection
- [ ] Audit logging for all actions
- [ ] Regular security scans
- [ ] Incident response procedures

This framework provides comprehensive security coverage while maintaining development velocity.
