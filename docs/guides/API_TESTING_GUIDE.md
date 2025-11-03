# SEOLOGY.AI API Testing Guide

Quick reference for testing all API endpoints manually or programmatically.

---

## Quick Start

### 1. Get Authentication Token

```bash
# Login to your app and get Clerk session token from browser DevTools
# Application > Cookies > __session

export TOKEN="your-clerk-session-token"
export BASE_URL="http://localhost:3000"
```

### 2. Test Health Endpoint (No Auth Required)

```bash
curl -X GET "$BASE_URL/api/health"
```

Expected Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-03T12:00:00.000Z",
  "services": {
    "api": "operational",
    "database": "operational"
  },
  "version": "1.0.0"
}
```

---

## API Endpoint Testing

### Sites Management

**List all sites**
```bash
curl -X GET "$BASE_URL/api/sites" \
  -H "Authorization: Bearer $TOKEN"
```

**Create new site**
```bash
curl -X POST "$BASE_URL/api/sites" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "CUSTOM",
    "domain": "example.com",
    "displayName": "Example Site"
  }'
```

**Get site details**
```bash
curl -X GET "$BASE_URL/api/sites/{siteId}" \
  -H "Authorization: Bearer $TOKEN"
```

**Analyze site**
```bash
curl -X POST "$BASE_URL/api/sites/{siteId}/analyze" \
  -H "Authorization: Bearer $TOKEN"
```

**Delete site**
```bash
curl -X DELETE "$BASE_URL/api/sites/{siteId}" \
  -H "Authorization: Bearer $TOKEN"
```

---

### Fixes Execution

**Execute fixes (automatic/plan/approve mode)**
```bash
curl -X POST "$BASE_URL/api/fixes/execute" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "siteId": "site-uuid-here",
    "issueIds": ["issue-1", "issue-2"]
  }'
```

**Approve single fix**
```bash
curl -X POST "$BASE_URL/api/fixes/{fixId}/approve" \
  -H "Authorization: Bearer $TOKEN"
```

**Approve entire plan**
```bash
curl -X POST "$BASE_URL/api/fixes/approve-plan" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "siteId": "site-uuid-here"
  }'
```

**Rollback fix**
```bash
curl -X POST "$BASE_URL/api/fixes/{fixId}/rollback" \
  -H "Authorization: Bearer $TOKEN"
```

---

### Teams

**List teams**
```bash
curl -X GET "$BASE_URL/api/teams" \
  -H "Authorization: Bearer $TOKEN"
```

**Create team**
```bash
curl -X POST "$BASE_URL/api/teams" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Team",
    "description": "Team for managing SEO"
  }'
```

**Get team details**
```bash
curl -X GET "$BASE_URL/api/teams/{teamId}" \
  -H "Authorization: Bearer $TOKEN"
```

**Invite member**
```bash
curl -X POST "$BASE_URL/api/teams/{teamId}/invite" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "role": "MEMBER"
  }'
```

**List team members**
```bash
curl -X GET "$BASE_URL/api/teams/{teamId}/members" \
  -H "Authorization: Bearer $TOKEN"
```

**Accept invitation**
```bash
curl -X POST "$BASE_URL/api/teams/accept" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "invitation-token-from-email"
  }'
```

---

### Webhooks

**List webhooks**
```bash
curl -X GET "$BASE_URL/api/webhooks" \
  -H "Authorization: Bearer $TOKEN"
```

**Register webhook**
```bash
curl -X POST "$BASE_URL/api/webhooks" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-app.com/webhook",
    "events": [
      "fix.applied",
      "issue.detected",
      "analysis.completed"
    ],
    "secret": "your-hmac-secret-optional"
  }'
```

**Update webhook**
```bash
curl -X PATCH "$BASE_URL/api/webhooks/{webhookId}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": false
  }'
```

**Delete webhook**
```bash
curl -X DELETE "$BASE_URL/api/webhooks/{webhookId}" \
  -H "Authorization: Bearer $TOKEN"
```

---

### Billing

**Create checkout session**
```bash
curl -X POST "$BASE_URL/api/billing/create-checkout" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "plan": "GROWTH"
  }'
```

**Access billing portal**
```bash
curl -X POST "$BASE_URL/api/billing/portal" \
  -H "Authorization: Bearer $TOKEN"
```

---

### Usage & Limits

**Get current usage**
```bash
curl -X GET "$BASE_URL/api/usage" \
  -H "Authorization: Bearer $TOKEN"
```

---

### Notifications

**Get notifications**
```bash
curl -X GET "$BASE_URL/api/notifications" \
  -H "Authorization: Bearer $TOKEN"
```

**Mark notification as read**
```bash
curl -X POST "$BASE_URL/api/notifications/{notificationId}/read" \
  -H "Authorization: Bearer $TOKEN"
```

**Mark all as read**
```bash
curl -X POST "$BASE_URL/api/notifications/read-all" \
  -H "Authorization: Bearer $TOKEN"
```

---

### Background Jobs

**Get queue statistics**
```bash
curl -X GET "$BASE_URL/api/jobs" \
  -H "Authorization: Bearer $TOKEN"
```

**Create background job**
```bash
curl -X POST "$BASE_URL/api/jobs" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "CRAWL_SITE",
    "data": {
      "siteId": "site-uuid",
      "url": "https://example.com"
    }
  }'
```

**Get job status**
```bash
curl -X GET "$BASE_URL/api/jobs/{jobId}" \
  -H "Authorization: Bearer $TOKEN"
```

---

### Magic.js API (No Auth Required)

**Get pending fixes**
```bash
curl -X GET "$BASE_URL/api/magic/{siteId}/pending"
```

**Update fix status**
```bash
curl -X POST "$BASE_URL/api/magic/{siteId}/fixes/{fixId}/status" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "APPLIED"
  }'
```

**Get site analytics**
```bash
curl -X GET "$BASE_URL/api/magic/{siteId}/analytics"
```

---

### Admin Endpoints (Admin Email Required)

**Get platform analytics**
```bash
curl -X GET "$BASE_URL/api/admin/analytics?days=30" \
  -H "Authorization: Bearer $TOKEN"
```

---

### Cron Endpoints (Requires CRON_SECRET)

**Cleanup old rollbacks**
```bash
curl -X GET "$BASE_URL/api/cron/cleanup" \
  -H "Authorization: Bearer $CRON_SECRET"
```

**Reset monthly usage**
```bash
curl -X GET "$BASE_URL/api/cron/reset-usage" \
  -H "Authorization: Bearer $CRON_SECRET"
```

**Trigger backup**
```bash
curl -X POST "$BASE_URL/api/cron/backup" \
  -H "Authorization: Bearer $CRON_SECRET"
```

---

## Testing with JavaScript/TypeScript

### Example: Using Fetch API

```typescript
const BASE_URL = 'http://localhost:3000'
const TOKEN = 'your-clerk-token'

async function listSites() {
  const response = await fetch(`${BASE_URL}/api/sites`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return data
}

async function executeFixes(siteId: string, issueIds?: string[]) {
  const response = await fetch(`${BASE_URL}/api/fixes/execute`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      siteId,
      issueIds,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Failed to execute fixes')
  }

  return await response.json()
}

// Usage
try {
  const sites = await listSites()
  console.log('Sites:', sites)

  const result = await executeFixes(sites.data[0].id)
  console.log('Fixes executed:', result)
} catch (error) {
  console.error('Error:', error)
}
```

---

## Testing with Postman

### Import OpenAPI Spec

1. Open Postman
2. Click "Import"
3. Select "Link" tab
4. Enter: `http://localhost:3000/api/docs`
5. Click "Import"

All endpoints will be imported with:
- Request schemas
- Response examples
- Authentication requirements

### Set Environment Variables

Create a Postman environment with:
- `baseUrl`: `http://localhost:3000`
- `clerkToken`: Your Clerk session token
- `cronSecret`: Your CRON_SECRET value

---

## Common Response Formats

### Success Response

```json
{
  "success": true,
  "data": {
    // Resource data here
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
    "details": {
      // Additional error context
    }
  }
}
```

### Paginated Response (Future)

```json
{
  "success": true,
  "data": [
    // Array of resources
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "hasMore": true
  }
}
```

---

## Error Codes Reference

| Code | Status | Meaning |
|------|--------|---------|
| `UNAUTHORIZED` | 401 | Not authenticated |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `USER_NOT_FOUND` | 404 | User account not found |
| `RESOURCE_NOT_FOUND` | 404 | Resource doesn't exist |
| `INVALID_INPUT` | 400 | Invalid request body/params |
| `USAGE_LIMIT_EXCEEDED` | 403 | Plan limit reached |
| `EXECUTION_FAILED` | 400 | Fix execution failed |
| `APPROVAL_FAILED` | 400 | Fix approval failed |
| `INTERNAL_ERROR` | 500 | Server-side error |

---

## Automated Testing

### Using Vitest

```typescript
import { describe, it, expect, beforeAll } from 'vitest'

describe('API Tests', () => {
  let authToken: string
  const baseUrl = 'http://localhost:3000'

  beforeAll(async () => {
    // Get auth token (mock or real)
    authToken = process.env.TEST_AUTH_TOKEN || 'mock-token'
  })

  describe('GET /api/health', () => {
    it('should return healthy status', async () => {
      const response = await fetch(`${baseUrl}/api/health`)
      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.status).toBe('healthy')
      expect(data.services.api).toBe('operational')
      expect(data.services.database).toBe('operational')
    })
  })

  describe('GET /api/sites', () => {
    it('should require authentication', async () => {
      const response = await fetch(`${baseUrl}/api/sites`)
      expect(response.status).toBe(401)
    })

    it('should return sites for authenticated user', async () => {
      const response = await fetch(`${baseUrl}/api/sites`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })
      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })
  })

  describe('POST /api/fixes/execute', () => {
    it('should reject when usage limit exceeded', async () => {
      // Test implementation
    })

    it('should execute fixes in AUTOMATIC mode', async () => {
      // Test implementation
    })
  })
})
```

---

## Next Steps

1. **Set up test environment**
   - Create test database
   - Seed with sample data
   - Configure test Stripe keys

2. **Create test fixtures**
   - Sample users
   - Sample sites
   - Sample issues
   - Sample fixes

3. **Write integration tests**
   - Test all endpoints
   - Test error scenarios
   - Test authentication
   - Test authorization

4. **Set up CI/CD**
   - Run tests on every commit
   - Deploy on passing tests
   - Monitor API health

---

## Resources

- Full API Documentation: `/api/docs`
- API Audit Report: `API_AUDIT_REPORT.md`
- Swagger/OpenAPI Spec: `http://localhost:3000/api/docs`
- Health Check: `http://localhost:3000/api/health`

---

**Last Updated:** 2025-11-03
