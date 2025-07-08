# API Documentation

## Overview

The MADFAM website API provides endpoints for lead generation, assessment, and analytics. All API routes are implemented as Next.js API routes under `/api`.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Staging**: `https://staging.madfam.io/api`
- **Production**: `https://madfam.io/api`

## Authentication

Currently, the API uses a simple bearer token for protected endpoints:

```bash
Authorization: Bearer YOUR_API_SECRET
```

## Endpoints

### Lead Management

#### Create Lead

Capture a new lead with optional tier interest and scoring.

```http
POST /api/leads
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@empresa.com",
  "company": "Empresa SA", // optional
  "phone": "+52 55 1234 5678", // optional
  "tier": "consulting", // optional: essentials | advanced | consulting | platforms | strategic
  "message": "Interested in AI workshops", // optional
  "source": "website", // default: website
  "preferredLanguage": "es-MX", // default: es-MX
  "metadata": { // optional
    "referrer": "google",
    "campaign": "q1-2024"
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "leadId": "lead_1704067200000_abc123def",
  "score": 75,
  "message": "Gracias por tu interés. Nos pondremos en contacto pronto."
}
```

**Response (Error):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

**Status Codes:**
- `200` - Lead created successfully
- `400` - Validation error
- `500` - Server error

#### Get Leads (Protected)

Retrieve all leads sorted by score.

```http
GET /api/leads
Authorization: Bearer YOUR_API_SECRET
```

**Response:**
```json
{
  "leads": [
    {
      "id": "lead_1704067200000_abc123def",
      "name": "Juan Pérez",
      "email": "juan@empresa.com",
      "company": "Empresa SA",
      "tier": "consulting",
      "score": 75,
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
  ],
  "total": 42
}
```

### Assessment

#### Submit Assessment (Coming Soon)

Process AI readiness assessment results.

```http
POST /api/assessment
Content-Type: application/json
```

**Request Body:**
```json
{
  "answers": {
    "current_tech": "intermediate",
    "team_size": "medium",
    "ai_interest": "automation",
    "timeline": "short",
    "budget": "medium"
  },
  "score": 150,
  "email": "user@company.com" // optional
}
```

### Calculator

#### ROI Calculator (Coming Soon)

Calculate potential ROI for services.

```http
POST /api/calculator
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "roi", // roi | project | savings
  "tier": "consulting",
  "metrics": {
    "employees": 50,
    "hoursSaved": 20,
    "currentCost": 100000
  }
}
```

## Webhooks

### n8n Integration

The API can trigger n8n workflows for lead processing:

```javascript
// Webhook payload sent to n8n
{
  "event": "lead.created",
  "data": {
    "leadId": "lead_1704067200000_abc123def",
    "email": "juan@empresa.com",
    "tier": "consulting",
    "score": 75
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

Configure webhook URL via environment variable:
```env
N8N_WEBHOOK_URL=https://n8n.madfam.io/webhook/xxx
```

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": [ // Optional field-specific errors
    {
      "field": "email",
      "message": "Email is required"
    }
  ],
  "code": "VALIDATION_ERROR" // Optional error code
}
```

### Common Error Codes

- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `UNAUTHORIZED` - Missing or invalid authentication
- `RATE_LIMITED` - Too many requests
- `SERVER_ERROR` - Internal server error

## Rate Limiting

API endpoints are rate limited to prevent abuse:

- **Public endpoints**: 100 requests per minute
- **Protected endpoints**: 1000 requests per minute

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704067260
```

## Data Validation

All input is validated using Zod schemas:

```typescript
const leadSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  company: z.string().optional(),
  phone: z.string().optional(),
  tier: z.enum(['essentials', 'advanced', 'consulting', 'platforms', 'strategic']).optional(),
  message: z.string().max(1000).optional()
});
```

## CORS Policy

The API supports CORS for allowed origins:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://staging.madfam.io',
  'https://madfam.io'
];
```

## Testing

### cURL Examples

**Create a lead:**
```bash
curl -X POST https://madfam.io/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "tier": "consulting"
  }'
```

**Get leads (protected):**
```bash
curl https://madfam.io/api/leads \
  -H "Authorization: Bearer YOUR_API_SECRET"
```

### JavaScript/TypeScript

```typescript
// Create a lead
const response = await fetch('/api/leads', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    tier: 'consulting'
  })
});

const data = await response.json();
console.log('Lead ID:', data.leadId);
```

## Versioning

The API currently uses URL path versioning. Future versions will be available at:

- `/api/v1/` - Current version
- `/api/v2/` - Future version (backwards compatible)

## SDK (Coming Soon)

A TypeScript SDK is planned for easier integration:

```typescript
import { MadfamAPI } from '@madfam/sdk';

const api = new MadfamAPI({
  apiKey: 'YOUR_API_KEY'
});

const lead = await api.leads.create({
  name: 'Test User',
  email: 'test@example.com'
});
```