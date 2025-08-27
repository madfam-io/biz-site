# API Documentation

## Overview

MADFAM Corporate Website API endpoints for lead generation, assessments, and integrations.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://madfam.io/api`

## Authentication

Most endpoints are public for lead generation. Internal endpoints require API key.

```typescript
// For internal endpoints
headers: {
  'Authorization': 'Bearer ' + process.env.API_SECRET
}
```

## Endpoints

### Lead Management

#### POST `/api/leads`

Create a new lead from contact forms.

**Request Body:**

```typescript
interface LeadRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  interestedService?: string;
  source: 'contact-form' | 'assessment' | 'calculator';
  urgency?: 'low' | 'medium' | 'high';
}
```

**Response:**

```typescript
interface LeadResponse {
  id: string;
  score: number;
  priority: 'low' | 'medium' | 'high';
  recommendedService: string;
  followUpDate: string;
}
```

**Example:**

```bash
curl -X POST https://madfam.io/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@company.com",
    "company": "Tech Startup",
    "message": "Interested in AI consultation",
    "interestedService": "level-3-consulting",
    "source": "contact-form"
  }'
```

### Assessment System

#### POST `/api/assessment`

Submit AI readiness assessment responses.

**Request Body:**

```typescript
interface AssessmentRequest {
  responses: {
    currentTech: 'basic' | 'intermediate' | 'advanced' | 'cutting-edge';
    teamSize: 'small' | 'medium' | 'large' | 'enterprise';
    budget: 'startup' | 'growth' | 'enterprise';
    timeline: 'immediate' | 'quarter' | 'year';
    // ... more assessment fields
  };
  contactInfo: {
    email: string;
    company?: string;
    role?: string;
  };
}
```

**Response:**

```typescript
interface AssessmentResponse {
  level: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  recommendations: string[];
  nextSteps: string[];
  estimatedBudget: {
    min: number;
    max: number;
    currency: 'USD' | 'MXN';
  };
}
```

### ROI Calculator

#### POST `/api/calculator`

Calculate ROI based on digital transformation inputs.

**Request Body:**

```typescript
interface CalculatorRequest {
  currentMetrics: {
    monthlyRevenue: number;
    teamSize: number;
    hoursPerProject: number;
    projectsPerMonth: number;
  };
  improvements: {
    efficiencyGain: number; // percentage
    qualityImprovement: number;
    timeReduction: number;
  };
}
```

**Response:**

```typescript
interface CalculatorResponse {
  roi: {
    monthly: number;
    annual: number;
    threeYear: number;
  };
  paybackPeriod: number; // months
  recommendations: string[];
}
```

### Webhooks

#### POST `/api/webhook/n8n`

Receive webhooks from n8n automation platform.

**Headers:**

```
Authorization: Bearer <N8N_API_KEY>
Content-Type: application/json
```

## Error Handling

All endpoints return consistent error responses:

```typescript
interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  correlationId: string;
}
```

### Common Error Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid API key)
- `429` - Rate Limited
- `500` - Internal Server Error

## Rate Limiting

- **Public endpoints**: 100 requests per 15 minutes per IP
- **Authenticated endpoints**: 1000 requests per hour per API key

## SDKs and Integration

### JavaScript/TypeScript

```typescript
import { MADFAMApi } from '@madfam/api-client';

const client = new MADFAMApi({
  baseUrl: 'https://madfam.io/api',
  apiKey: process.env.MADFAM_API_KEY, // for authenticated endpoints
});

// Create lead
const lead = await client.leads.create({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Interested in AI consultation',
});
```

### cURL Examples

```bash
# Health check
curl https://madfam.io/api/health

# Submit assessment
curl -X POST https://madfam.io/api/assessment \
  -H "Content-Type: application/json" \
  -d @assessment-payload.json

# Calculate ROI
curl -X POST https://madfam.io/api/calculator \
  -H "Content-Type: application/json" \
  -d '{
    "currentMetrics": {
      "monthlyRevenue": 50000,
      "teamSize": 10,
      "hoursPerProject": 40,
      "projectsPerMonth": 3
    },
    "improvements": {
      "efficiencyGain": 25,
      "qualityImprovement": 15,
      "timeReduction": 30
    }
  }'
```

## Monitoring & Analytics

### Health Check

```bash
curl https://madfam.io/api/health
```

Response includes:

- Database connectivity
- External service status
- System metrics

### Analytics Events

The API automatically tracks:

- Lead conversion rates
- Assessment completion rates
- Popular service interests
- Geographic distribution

## Development

### Local Setup

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local

# Run development server
pnpm dev

# API will be available at http://localhost:3000/api
```

### Testing

```bash
# Run API tests
pnpm test:api

# Test specific endpoint
pnpm test -- --grep "leads endpoint"
```

## Changelog

### v1.2.0 (Latest)

- Added assessment endpoint
- Improved error handling
- Added rate limiting

### v1.1.0

- ROI calculator endpoint
- Enhanced lead scoring
- Added webhook support

### v1.0.0

- Initial API release
- Basic lead management
- Health check endpoint
