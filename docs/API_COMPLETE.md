# MADFAM API Documentation

## Overview

The MADFAM website provides a comprehensive REST API for lead generation, assessments, calculations, and business automation. All endpoints are built with Next.js 14 API routes and provide robust validation, rate limiting, and integration capabilities.

## Base URL

- **Development**: `http://localhost:3002/api`
- **Staging**: `https://staging.madfam.io/api`
- **Production**: `https://madfam.io/api`

## Authentication

### Bearer Token

Protected endpoints require authentication via Bearer token:

```bash
Authorization: Bearer YOUR_API_SECRET
```

### NextAuth.js Integration

Authentication system built with NextAuth.js supporting:

- Credentials provider with bcrypt password hashing
- JWT strategy with Prisma adapter
- Role-based access control (ADMIN, EDITOR, VIEWER)

## Rate Limiting

All endpoints implement rate limiting with different tiers:

| Endpoint Type | Limit        | Window     |
| ------------- | ------------ | ---------- |
| Public POST   | 10 req/min   | 60 seconds |
| Public GET    | 100 req/min  | 60 seconds |
| Protected     | 1000 req/min | 60 seconds |

**Headers returned:**

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704067260
```

---

## Endpoints

### 🎯 Assessment API

#### POST `/api/assessment`

Submit AI readiness assessment and receive personalized recommendations.

**Rate Limit:** 5 requests/minute

**Request Body:**

```json
{
  "email": "user@company.com",
  "answers": {
    "current_tech": 4,
    "team_size": 3,
    "ai_readiness": 5,
    "process_automation": 2,
    "data_quality": 4,
    "change_management": 3,
    "innovation_culture": 5,
    "resource_allocation": 3,
    "strategic_alignment": 4,
    "success_measurement": 3
  },
  "leadId": "lead_abc123" // optional
}
```

**Validation Schema:**

```typescript
{
  email: z.string().email().optional(),
  answers: z.record(z.number().min(1).max(5)), // 10 questions, 1-5 scale
  leadId: z.string().optional()
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "assessmentId": "assessment_1704067200000_xyz",
  "score": 76,
  "tier": "L3_CONSULTING",
  "results": {
    "strengths": [
      "Strong innovation culture",
      "Good strategic alignment",
      "Above-average technology adoption"
    ],
    "weaknesses": ["Process automation needs improvement", "Resource allocation challenges"],
    "recommendations": [
      "Start with Level 3 Consulting services",
      "Focus on process mapping before automation",
      "Implement change management framework"
    ]
  }
}
```

**Features:**

- Intelligent scoring algorithm (weighted by category)
- Service tier recommendation (L1-L5)
- Personalized strengths/weaknesses analysis
- Integration with lead generation system
- Automatic email triggers and n8n webhooks

#### GET `/api/assessment`

Retrieve assessment questions or existing results.

**Query Parameters:**

- `assessmentId` (optional) - Get specific assessment results

**Response - Questions:**

```json
{
  "questions": [
    {
      "id": "current_tech",
      "category": "technology",
      "text": "How would you rate your current technology adoption?",
      "scale": "1 (Basic) to 5 (Cutting-edge)"
    }
    // ... 9 more questions
  ]
}
```

---

### 🧮 Calculator API

#### POST `/api/calculator`

Calculate ROI projections and project estimates for MADFAM services.

**Request Body (ROI Calculator):**

```json
{
  "type": "roi",
  "email": "user@company.com", // optional
  "leadId": "lead_abc123", // optional
  "data": {
    "employees": 50,
    "avgSalary": 600000,
    "hoursPerEmployee": 40,
    "inefficiencyPercentage": 25,
    "automationSavingsPercentage": 60,
    "implementationCostMonthly": 150000
  }
}
```

**Request Body (Project Estimate):**

```json
{
  "type": "project_estimate",
  "data": {
    "projectType": "automation",
    "complexity": "medium",
    "timeline": "standard",
    "additionalServices": ["training", "support"]
  }
}
```

**Response (ROI Calculator):**

```json
{
  "success": true,
  "calculationId": "calc_1704067200000_abc",
  "type": "roi",
  "results": {
    "currentAnnualCost": 7500000,
    "potentialSavings": 1875000,
    "implementationCost": 1800000,
    "netAnnualBenefit": 75000,
    "paybackMonths": 24,
    "roi": 4.17,
    "breakdownByYear": [
      {
        "year": 1,
        "savings": 1875000,
        "costs": 1800000,
        "netBenefit": 75000
      }
    ]
  }
}
```

**Response (Project Estimate):**

```json
{
  "success": true,
  "results": {
    "basePrice": 450000,
    "taxes": 72000,
    "totalPrice": 522000,
    "currency": "MXN",
    "timeline": {
      "weeks": 12,
      "phases": ["discovery", "development", "testing", "deployment"]
    },
    "included": ["Project management", "Training", "3 months support"]
  }
}
```

#### GET `/api/calculator`

Retrieve stored calculation results.

**Query Parameters:**

- `id` (required) - Calculation ID

---

### 👥 Leads API

#### POST `/api/leads`

Create a new lead with intelligent scoring and tier assignment.

**Rate Limit:** 10 requests/minute

**Request Body:**

```json
{
  "email": "juan@empresa.com",
  "name": "Juan Pérez", // or separate firstName/lastName
  "company": "Empresa SA",
  "phone": "+52 55 1234 5678",
  "tier": "L3_CONSULTING", // L1_ESSENTIALS, L2_ADVANCED, etc.
  "message": "Interested in AI automation for our manufacturing process",
  "source": "WEBSITE", // WEBSITE, REFERRAL, SOCIAL, EVENT, DIRECT, OTHER
  "metadata": {
    "industry": "manufacturing",
    "companySize": "medium",
    "budget": "100k-500k",
    "timeframe": "3-6-months",
    "utmSource": "google",
    "utmMedium": "cpc",
    "utmCampaign": "ai-automation-q3"
  }
}
```

**Validation Schema:**

```typescript
{
  email: z.string().email(),
  name: z.string().min(2).max(100).optional(),
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  tier: z.nativeEnum(ServiceTier).optional(),
  message: z.string().max(2000).optional(),
  source: z.nativeEnum(LeadSource).default("WEBSITE"),
  metadata: z.object({
    industry: z.string().optional(),
    companySize: z.enum(["startup", "small", "medium", "large", "enterprise"]).optional(),
    budget: z.string().optional(),
    timeframe: z.string().optional(),
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
    referrer: z.string().optional()
  }).optional()
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "leadId": "lead_1704067200000_abc123",
  "score": 85,
  "tier": "L3_CONSULTING",
  "message": "Gracias por tu interés. Nos pondremos en contacto pronto."
}
```

**Lead Scoring Algorithm:**

- Base score: 40 points
- Company provided: +15 points
- Phone provided: +10 points
- Business email domain: +20 points
- Detailed message (>50 chars): +10 points
- Tier selection: +5 points
- Industry match: up to +15 points
- Company size: up to +10 points

#### GET `/api/leads`

Retrieve leads with filtering and pagination (Protected).

**Authentication:** Required (Bearer token)
**Rate Limit:** 100 requests/minute

**Query Parameters:**

- `page` (default: 1) - Page number
- `limit` (default: 20) - Items per page
- `status` - Filter by LeadStatus
- `tier` - Filter by ServiceTier
- `search` - Search in name, email, company

**Response:**

```json
{
  "leads": [
    {
      "id": "lead_1704067200000_abc123",
      "email": "juan@empresa.com",
      "firstName": "Juan",
      "lastName": "Pérez",
      "company": "Empresa SA",
      "phone": "+52 55 1234 5678",
      "tier": "L3_CONSULTING",
      "score": 85,
      "status": "NEW",
      "source": "WEBSITE",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "notes": [],
      "activities": []
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}
```

---

### 🚩 Feature Flags API

#### GET `/api/feature-flags`

Retrieve feature flag configurations.

**Query Parameters:**

- `flag` (optional) - Specific flag key
- `env` (optional) - Environment (development, staging, production)

**Response:**

```json
{
  "flags": {
    "NEW_LEAD_SCORING": {
      "enabled": true,
      "rolloutPercentage": 100
    },
    "INTERACTIVE_CALCULATOR": {
      "enabled": false,
      "rolloutPercentage": 0
    },
    "CHAT_SUPPORT": {
      "enabled": true,
      "rolloutPercentage": 50
    }
  },
  "environment": "development"
}
```

**Available Flags:**

- `NEW_LEAD_SCORING` - Enhanced lead scoring algorithm
- `INTERACTIVE_CALCULATOR` - Advanced calculator features
- `CHAT_SUPPORT` - Live chat integration
- `A11Y_IMPROVEMENTS` - Accessibility enhancements
- `PERFORMANCE_MONITORING` - Advanced analytics

#### POST/PATCH `/api/feature-flags`

Create or update feature flags (Protected - TODO: Authentication not implemented).

---

### 📊 Logs API

#### POST `/api/logs`

Centralized logging endpoint for client-side and server-side events.

**Request Body:**

```json
{
  "entries": [
    {
      "level": "info",
      "message": "User completed assessment",
      "timestamp": "2024-01-01T12:00:00.000Z",
      "source": "client",
      "metadata": {
        "userId": "user_123",
        "assessmentId": "assessment_abc",
        "userAgent": "Mozilla/5.0...",
        "url": "/assessment"
      },
      "error": null
    }
  ]
}
```

**Log Levels:** `debug`, `info`, `warn`, `error`, `fatal`

**Response:**

```json
{
  "success": true,
  "processed": 1,
  "message": "Logs ingested successfully"
}
```

#### GET `/api/logs`

Health check endpoint for log ingestion service.

---

### 🔗 Webhook API

#### POST `/api/webhook/n8n`

Handle automation webhooks from n8n workflows.

**Authentication:** X-API-Key header (N8N_API_KEY)

**Supported Events:**

**Lead Status Update:**

```json
{
  "event": "lead.status_updated",
  "data": {
    "leadId": "lead_abc123",
    "status": "CONTACTED",
    "updatedBy": "system",
    "notes": "Called and left voicemail"
  }
}
```

**Email Events:**

```json
{
  "event": "email.delivered",
  "data": {
    "leadId": "lead_abc123",
    "emailType": "welcome",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "metadata": {
      "messageId": "msg_123",
      "recipient": "user@company.com"
    }
  }
}
```

**Meeting Scheduled:**

```json
{
  "event": "meeting.scheduled",
  "data": {
    "leadId": "lead_abc123",
    "scheduledFor": "2024-01-15T14:00:00.000Z",
    "duration": 30,
    "type": "consultation",
    "meetingLink": "https://meet.google.com/abc-xyz"
  }
}
```

#### GET `/api/webhook/n8n`

List supported webhook events and health check.

**Response:**

```json
{
  "status": "active",
  "supportedEvents": [
    "lead.status_updated",
    "email.delivered",
    "email.opened",
    "email.clicked",
    "email.bounced",
    "crm.synced",
    "meeting.scheduled",
    "integration.updated"
  ],
  "version": "1.0"
}
```

---

## Error Handling

All endpoints follow consistent error response format:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required",
      "code": "REQUIRED_FIELD"
    }
  ],
  "requestId": "req_1704067200000_xyz"
}
```

### HTTP Status Codes

| Code | Description                      |
| ---- | -------------------------------- |
| 200  | Success                          |
| 201  | Created                          |
| 400  | Bad Request (validation error)   |
| 401  | Unauthorized                     |
| 403  | Forbidden                        |
| 404  | Not Found                        |
| 429  | Too Many Requests (rate limited) |
| 500  | Internal Server Error            |

### Common Error Codes

- `VALIDATION_ERROR` - Input validation failed
- `REQUIRED_FIELD` - Required field missing
- `INVALID_FORMAT` - Invalid field format
- `NOT_FOUND` - Resource not found
- `UNAUTHORIZED` - Missing or invalid authentication
- `RATE_LIMITED` - Too many requests
- `DUPLICATE_ENTRY` - Resource already exists
- `SERVER_ERROR` - Internal server error

---

## Integration Examples

### JavaScript/TypeScript

```typescript
// Lead creation
async function createLead(leadData: CreateLeadRequest) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(leadData),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Assessment submission
async function submitAssessment(answers: Record<string, number>) {
  const response = await fetch('/api/assessment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      answers,
      email: 'user@company.com',
    }),
  });

  return response.json();
}

// ROI calculation
async function calculateROI(metrics: ROIMetrics) {
  const response = await fetch('/api/calculator', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'roi',
      data: metrics,
    }),
  });

  return response.json();
}
```

### cURL Examples

```bash
# Create a lead
curl -X POST https://madfam.io/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@company.com",
    "name": "Test User",
    "company": "Test Company",
    "tier": "L3_CONSULTING",
    "message": "Interested in AI automation"
  }'

# Submit assessment
curl -X POST https://madfam.io/api/assessment \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@company.com",
    "answers": {
      "current_tech": 4,
      "team_size": 3,
      "ai_readiness": 5
    }
  }'

# Get leads (protected)
curl https://madfam.io/api/leads \
  -H "Authorization: Bearer YOUR_API_SECRET"

# Calculate ROI
curl -X POST https://madfam.io/api/calculator \
  -H "Content-Type: application/json" \
  -d '{
    "type": "roi",
    "data": {
      "employees": 50,
      "avgSalary": 600000,
      "inefficiencyPercentage": 25
    }
  }'
```

---

## Webhooks & Integrations

### n8n Automation

The API integrates with n8n for workflow automation:

- **Lead Processing**: Automatic CRM sync, email sequences
- **Assessment Follow-up**: Personalized recommendations via email
- **Meeting Scheduling**: Calendar integration and reminders
- **Analytics**: Custom event tracking and reporting

### Email Integration

Built-in email queue system:

- **Welcome Emails**: Automatic onboarding sequences
- **Assessment Results**: Personalized reports and recommendations
- **Follow-up Communications**: Automated nurture campaigns
- **Notifications**: Real-time alerts for high-value leads

### Analytics Integration

Comprehensive tracking via @madfam/analytics package:

- **Lead Attribution**: UTM tracking and source attribution
- **Conversion Funnels**: Assessment completion and lead qualification
- **Performance Metrics**: API response times and error rates
- **User Behavior**: Interaction patterns and feature adoption

---

## Security & Compliance

### Data Protection

- Input validation using Zod schemas
- XSS prevention via React's built-in protection
- CSRF protection through Next.js
- SQL injection prevention via Prisma ORM

### Privacy

- GDPR-compliant data handling
- Privacy-first analytics (Plausible)
- Minimal data collection
- User consent management

### Rate Limiting

- IP-based rate limiting
- Environment-specific configurations
- Graceful degradation under load
- Request queuing for high-priority endpoints

---

## API Versioning

Current version: `v1` (implicit)

Future versions will be available at:

- `/api/v2/*` - Next major version
- Backwards compatibility maintained for minimum 12 months
- Deprecation warnings provided via response headers

---

## Support & Resources

- **Documentation**: [/docs/API_COMPLETE.md](./API_COMPLETE.md)
- **OpenAPI Spec**: Coming soon
- **SDK**: TypeScript SDK planned
- **Postman Collection**: Available on request
- **Support**: technical@madfam.io

---

Built with ❤️ by MADFAM - Where AI meets human creativity
