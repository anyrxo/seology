# SEOLOGY.AI API Reference

Complete API documentation for the SEOLOGY.AI platform. All endpoints follow RESTful conventions and return JSON responses.

## Table of Contents

- [Authentication](#authentication)
- [Response Format](#response-format)
- [Error Codes](#error-codes)
- [Rate Limiting](#rate-limiting)
- [Endpoints](#endpoints)
  - [Sites](#sites)
  - [Issues](#issues)
  - [Fixes](#fixes)
  - [Jobs](#jobs)
  - [Notifications](#notifications)
  - [Webhooks](#webhooks)
  - [Teams](#teams)
  - [Billing](#billing)
  - [Admin](#admin)

---

## Authentication

All API requests require authentication via Clerk. Include the session token in your requests.

### Headers

```http
Authorization: Bearer <your-clerk-session-token>
Content-Type: application/json
```

### Getting a Session Token

For client-side requests in Next.js:

```typescript
import { auth } from '@clerk/nextjs/server'

const session = await auth()
if (!session.userId) {
  // User not authenticated
}
```

---

## Response Format

All API responses follow this structure:

### Success Response

```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message",
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { /* additional error context */ }
  }
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | User not authenticated |
| `FORBIDDEN` | 403 | User lacks permission |
| `NOT_FOUND` | 404 | Resource not found |
| `INVALID_INPUT` | 400 | Invalid request parameters |
| `USAGE_LIMIT_EXCEEDED` | 403 | Plan limit reached |
| `PLAN_LIMIT_EXCEEDED` | 403 | Subscription plan limit reached |
| `EXECUTION_FAILED` | 400 | Fix execution failed |
| `CONNECTION_ERROR` | 500 | External API connection failed |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Rate Limiting

Rate limits vary by plan:

| Plan | Rate Limit |
|------|------------|
| STARTER | 100 requests/hour |
| GROWTH | 500 requests/hour |
| SCALE | 2000 requests/hour |

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## Endpoints

### Sites

#### List Sites

Get all connected sites for the authenticated user.

```http
GET /api/sites
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "platform": "SHOPIFY",
      "domain": "example.myshopify.com",
      "displayName": "My Store",
      "status": "CONNECTED",
      "lastSync": "2025-11-03T12:00:00Z",
      "createdAt": "2025-11-01T10:00:00Z",
      "stats": {
        "totalIssues": 45,
        "activeIssues": 12,
        "totalFixes": 33
      }
    }
  ]
}
```

#### Create Site Connection

Create a new site connection (for CUSTOM platform sites).

```http
POST /api/sites
```

**Request Body:**

```json
{
  "platform": "CUSTOM",
  "domain": "example.com",
  "displayName": "My Website",
  "credentials": {
    "username": "admin",
    "password": "encrypted-password"
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "platform": "CUSTOM",
    "domain": "example.com",
    "displayName": "My Website",
    "status": "PENDING",
    "createdAt": "2025-11-03T12:00:00Z"
  }
}
```

#### Get Site Details

```http
GET /api/sites/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "platform": "SHOPIFY",
    "domain": "example.myshopify.com",
    "displayName": "My Store",
    "status": "CONNECTED",
    "lastSync": "2025-11-03T12:00:00Z",
    "createdAt": "2025-11-01T10:00:00Z",
    "issues": [],
    "fixes": [],
    "metrics": {}
  }
}
```

#### Update Site

```http
PATCH /api/sites/:id
```

**Request Body:**

```json
{
  "displayName": "Updated Store Name",
  "status": "CONNECTED"
}
```

#### Delete Site

```http
DELETE /api/sites/:id
```

**Response:**

```json
{
  "success": true,
  "message": "Site connection deleted successfully"
}
```

#### Analyze Site

Trigger AI analysis for a site to detect SEO issues.

```http
POST /api/sites/:id/analyze
```

**Response:**

```json
{
  "success": true,
  "message": "Site analysis started",
  "data": {
    "jobId": "uuid"
  }
}
```

---

### Issues

#### List Issues

Get all issues for a site.

```http
GET /api/sites/:siteId/issues?status=OPEN&severity=HIGH&page=1&limit=20
```

**Query Parameters:**

- `status` (optional): Filter by status (`OPEN`, `FIXED`, `IGNORED`, etc.)
- `severity` (optional): Filter by severity (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20, max: 100)

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "missing_meta_title",
      "title": "Missing Meta Title on Product Page",
      "severity": "HIGH",
      "pageUrl": "/products/example-product",
      "details": "{\"currentTitle\":\"\",\"suggestedTitle\":\"Example Product\"}",
      "recommendation": "Add a descriptive meta title",
      "status": "OPEN",
      "detectedAt": "2025-11-03T10:00:00Z",
      "createdAt": "2025-11-03T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

#### Get Issue Details

```http
GET /api/issues/:id
```

#### Ignore Issue

Mark an issue as ignored.

```http
POST /api/issues/:id/ignore
```

---

### Fixes

#### Execute Fixes

Execute fixes for a site based on the user's execution mode.

```http
POST /api/fixes/execute
```

**Request Body:**

```json
{
  "siteId": "uuid",
  "issueIds": ["uuid1", "uuid2"]  // Optional: specific issues to fix
}
```

**Response (AUTOMATIC mode):**

```json
{
  "success": true,
  "message": "Applied 5 fixes automatically",
  "data": {
    "fixesApplied": 5,
    "errors": 0,
    "results": [
      {
        "issueId": "uuid",
        "issueTitle": "Missing Meta Title",
        "success": true,
        "message": "Product SEO updated successfully"
      }
    ]
  }
}
```

**Response (PLAN mode):**

```json
{
  "success": true,
  "message": "Created plan with 5 fixes",
  "data": {
    "fixesCreated": 5,
    "fixes": [
      {
        "fixId": "uuid",
        "issueId": "uuid",
        "issueTitle": "Missing Meta Title",
        "description": "Fix missing_meta_title: Missing Meta Title",
        "code": "{\"title\":\"Example Product\"}"
      }
    ],
    "approvalUrl": "/dashboard/sites/uuid/approve-plan"
  }
}
```

**Response (APPROVE mode):**

```json
{
  "success": true,
  "message": "Created 5 fixes for approval",
  "data": {
    "fixesCreated": 5,
    "fixes": [
      {
        "fixId": "uuid",
        "issueId": "uuid",
        "issueTitle": "Missing Meta Title",
        "description": "Fix missing_meta_title: Missing Meta Title"
      }
    ]
  }
}
```

#### Approve Single Fix

Approve and apply a single fix (APPROVE mode only).

```http
POST /api/fixes/:id/approve
```

**Response:**

```json
{
  "success": true,
  "message": "Fix applied successfully",
  "data": {
    "fixesApplied": 1
  }
}
```

#### Approve Plan

Approve and apply all pending fixes in a plan (PLAN mode only).

```http
POST /api/fixes/approve-plan
```

**Request Body:**

```json
{
  "siteId": "uuid"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Applied 5 of 5 fixes",
  "data": {
    "fixesApplied": 5,
    "errors": 0,
    "results": [...]
  }
}
```

#### Rollback Fix

Rollback a fix to restore the previous state (within 90-day window).

```http
POST /api/fixes/:id/rollback
```

**Response:**

```json
{
  "success": true,
  "message": "Fix rolled back successfully"
}
```

---

### Jobs

#### List Jobs

Get all background jobs.

```http
GET /api/jobs?status=PENDING&type=CRAWL_SITE&page=1&limit=20
```

**Query Parameters:**

- `status` (optional): Filter by status (`PENDING`, `RUNNING`, `COMPLETED`, `FAILED`)
- `type` (optional): Filter by type (`CRAWL_SITE`, `ANALYZE_SITE`, etc.)

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "CRAWL_SITE",
      "status": "RUNNING",
      "progress": 45,
      "result": null,
      "createdAt": "2025-11-03T10:00:00Z",
      "startedAt": "2025-11-03T10:01:00Z",
      "completedAt": null
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 10
  }
}
```

#### Get Job Status

```http
GET /api/jobs/:id
```

---

### Notifications

#### List Notifications

```http
GET /api/notifications?read=false&page=1&limit=20
```

**Query Parameters:**

- `read` (optional): Filter by read status (`true`, `false`)

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "SUCCESS",
      "title": "Fix Applied Automatically",
      "message": "Fixed: Missing Meta Title on Product Page",
      "actionUrl": "/dashboard/sites/uuid",
      "read": false,
      "createdAt": "2025-11-03T12:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "unreadCount": 3
  }
}
```

#### Mark Notification as Read

```http
POST /api/notifications/:id/read
```

#### Mark All as Read

```http
POST /api/notifications/read-all
```

---

### Webhooks

#### List Webhooks

```http
GET /api/webhooks
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "url": "https://example.com/webhook",
      "events": ["fix.applied", "issue.detected"],
      "enabled": true,
      "failureCount": 0,
      "lastTriggeredAt": "2025-11-03T10:00:00Z",
      "createdAt": "2025-11-01T10:00:00Z"
    }
  ]
}
```

#### Create Webhook

```http
POST /api/webhooks
```

**Request Body:**

```json
{
  "url": "https://example.com/webhook",
  "events": ["fix.applied", "issue.detected", "site.analyzed"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "url": "https://example.com/webhook",
    "events": ["fix.applied", "issue.detected", "site.analyzed"],
    "secret": "whsec_...",
    "enabled": true,
    "createdAt": "2025-11-03T12:00:00Z"
  }
}
```

#### Update Webhook

```http
PATCH /api/webhooks/:id
```

#### Delete Webhook

```http
DELETE /api/webhooks/:id
```

---

### Teams

#### Create Team

```http
POST /api/teams
```

**Request Body:**

```json
{
  "name": "Marketing Team",
  "description": "Team for marketing sites"
}
```

#### List Teams

```http
GET /api/teams
```

#### Invite Team Member

```http
POST /api/teams/:id/invite
```

**Request Body:**

```json
{
  "email": "member@example.com",
  "role": "MEMBER"
}
```

#### Accept Team Invitation

```http
POST /api/teams/accept
```

**Request Body:**

```json
{
  "token": "invitation-token"
}
```

---

### Billing

#### Create Checkout Session

```http
POST /api/billing/create-checkout
```

**Request Body:**

```json
{
  "plan": "GROWTH",
  "returnUrl": "/dashboard/billing"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "sessionUrl": "https://checkout.stripe.com/..."
  }
}
```

#### Get Billing Portal

```http
GET /api/billing/portal
```

**Response:**

```json
{
  "success": true,
  "data": {
    "url": "https://billing.stripe.com/..."
  }
}
```

#### Get Usage Stats

```http
GET /api/usage
```

**Response:**

```json
{
  "success": true,
  "data": {
    "plan": "GROWTH",
    "limits": {
      "sites": 10,
      "fixesPerMonth": 5000
    },
    "usage": {
      "sites": 3,
      "fixesThisMonth": 125
    },
    "remaining": {
      "sites": 7,
      "fixes": 4875
    }
  }
}
```

---

### Admin

Admin endpoints require the `ADMIN` role.

#### Get Analytics

```http
GET /api/admin/analytics?startDate=2025-11-01&endDate=2025-11-30
```

**Response:**

```json
{
  "success": true,
  "data": {
    "users": {
      "total": 1250,
      "active": 980,
      "new": 45
    },
    "sites": {
      "total": 3420,
      "byPlatform": {
        "SHOPIFY": 1200,
        "WORDPRESS": 1500,
        "CUSTOM": 720
      }
    },
    "issues": {
      "total": 45678,
      "fixed": 38234,
      "open": 7444
    },
    "fixes": {
      "total": 38234,
      "automatic": 30000,
      "manual": 8234
    },
    "revenue": {
      "mrr": 12450,
      "arr": 149400
    }
  }
}
```

---

## Webhook Events

When you configure webhooks, SEOLOGY.AI will send POST requests to your URL with the following format:

### Event Payload

```json
{
  "event": "fix.applied",
  "timestamp": "2025-11-03T12:00:00Z",
  "data": {
    "fixId": "uuid",
    "issueId": "uuid",
    "siteId": "uuid",
    "issueType": "missing_meta_title",
    "issueTitle": "Missing Meta Title",
    "status": "APPLIED"
  }
}
```

### Signature Verification

All webhook requests include an `X-Signature` header with an HMAC signature:

```typescript
import crypto from 'crypto'

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}
```

### Event Types

- `fix.applied` - Fix successfully applied
- `fix.failed` - Fix application failed
- `fix.rolled_back` - Fix rolled back
- `issue.detected` - New issue detected
- `site.analyzed` - Site analysis completed
- `site.connected` - New site connected
- `usage.limit_reached` - Plan limit reached

---

## Magic.js API

For CUSTOM platform sites using Magic.js connector.

### Get Pending Fixes

```http
GET /api/magic/:siteId/pending
```

No authentication required (uses site ID as identifier).

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "missing_meta_title",
      "target": "#product-title",
      "code": "document.querySelector('#product-title').setAttribute('content', 'Example Product')",
      "priority": 1
    }
  ]
}
```

### Report Fix Status

```http
POST /api/magic/:siteId/fixes/:fixId/status
```

**Request Body:**

```json
{
  "status": "APPLIED",
  "message": "Fix applied successfully"
}
```

### Send Analytics

```http
POST /api/magic/:siteId/analytics
```

**Request Body:**

```json
{
  "pageUrl": "/products/example",
  "metrics": {
    "loadTime": 1250,
    "domReady": 850
  }
}
```

---

## Example Usage

### JavaScript/TypeScript (Fetch)

```typescript
async function executeFixes(siteId: string, issueIds?: string[]) {
  const response = await fetch('/api/fixes/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ siteId, issueIds }),
  })

  const result = await response.json()

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}
```

### cURL

```bash
curl -X POST https://seology.ai/api/fixes/execute \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "siteId": "uuid",
    "issueIds": ["uuid1", "uuid2"]
  }'
```

### Python

```python
import requests

def execute_fixes(site_id, issue_ids=None):
    url = "https://seology.ai/api/fixes/execute"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_TOKEN"
    }
    payload = {
        "siteId": site_id,
        "issueIds": issue_ids or []
    }

    response = requests.post(url, json=payload, headers=headers)
    result = response.json()

    if not result["success"]:
        raise Exception(result["error"]["message"])

    return result["data"]
```

---

## Support

For API support, contact:
- Email: support@seology.ai
- Documentation: https://docs.seology.ai
- Status: https://status.seology.ai
