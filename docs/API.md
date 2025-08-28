# API Documentation

## Overview

The MADFAM website API provides endpoints for lead generation, assessment, and analytics. All API routes are implemented as Next.js API routes.

## Base Configuration

- **Development**: `http://localhost:3000/api`
- **Staging**: `https://staging.madfam.io/api`
- **Production**: `https://madfam.io/api`

## Available Endpoints

### 📊 Assessment API

**POST** `/api/assessment`

- AI readiness assessment evaluation
- Returns scores and recommendations

### 🔐 Authentication

**[...nextauth]** `/api/auth/*`

- NextAuth.js authentication endpoints
- Handles signin, signout, sessions

### 💰 ROI Calculator

**POST** `/api/calculator`

- Calculate ROI for AI implementations
- Returns financial projections

### 🚩 Feature Flags

**GET** `/api/feature-flags`

- Retrieve active feature flags
- Controls feature visibility

### 📧 Lead Management

**POST** `/api/leads`

- Capture new leads
- Tier interest scoring
- CRM integration

### 📝 Logging

**POST** `/api/logs`

- Application logging endpoint
- Error tracking

### 🔗 Webhooks

**POST** `/api/webhook/n8n`

- N8N workflow integration
- Process automation triggers

## Request/Response Format

All endpoints use JSON format:

### Request Headers

```http
Content-Type: application/json
Authorization: Bearer {API_SECRET} (if required)
```

### Standard Response

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per API key

## Security

- All endpoints use HTTPS in production
- Input validation with Zod schemas
- CORS configured for allowed origins
- CSP headers enforced

## Examples

### Create Lead

```bash
curl -X POST https://madfam.io/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "company": "Acme Corp",
    "tier": "consulting"
  }'
```

### Get Feature Flags

```bash
curl https://madfam.io/api/feature-flags
```

## Error Codes

| Code | Description                             |
| ---- | --------------------------------------- |
| 400  | Bad Request - Invalid input             |
| 401  | Unauthorized - Missing/invalid token    |
| 404  | Not Found - Resource doesn't exist      |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error                   |

## Environment Variables

Required for API functionality:

```env
API_SECRET=your-secret-key
DATABASE_URL=postgresql://...
N8N_WEBHOOK_URL=https://...
NEXT_PUBLIC_API_URL=https://...
```

---

Last Updated: November 2024
