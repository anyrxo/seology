# SEOLOGY.AI API Endpoints Documentation

Complete API reference for the SEOLOGY.AI platform. All endpoints follow RESTful conventions and return standardized JSON responses.

## Table of Contents

1. [User Profile](#user-profile)
2. [Analytics](#analytics)
3. [Issues](#issues)
4. [Fixes](#fixes)
5. [Webhooks](#webhooks)
6. [Teams](#teams)
7. [Sites/Connections](#sitesconnections)
8. [Notifications](#notifications)
9. [Billing](#billing)
10. [Admin](#admin)

---

## Response Format

All API responses follow this structure:

```typescript
interface APIResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  meta?: {
    page?: number
    limit?: number
    total?: number
    pages?: number
  }
}
```

## Authentication

All endpoints require authentication via Clerk. Include the session cookie in your requests.

---

## User Profile

### GET /api/user/profile

Get current user profile with statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "clerkId": "clerk_id",
    "email": "user@example.com",
    "name": "John Doe",
    "plan": "GROWTH",
    "role": "USER",
    "executionMode": "AUTOMATIC",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z",
    "subscription": { ... },
    "stats": {
      "connections": 5,
      "unreadNotifications": 3,
      "webhooks": 2,
      "teams": 1
    }
  }
}
```

### PATCH /api/user/profile

Update user profile (name, executionMode).

**Request Body:**
```json
{
  "name": "Jane Doe",
  "executionMode": "PLAN"
}
```

**Valid Execution Modes:** `AUTOMATIC`, `PLAN`, `APPROVE`

### DELETE /api/user/account

Delete user account. Fails if active subscriptions exist.

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Account successfully deleted",
    "deletedAt": "2025-01-01T00:00:00Z"
  }
}
```

---

## Analytics

### GET /api/analytics/overview

Get user's overall SEO performance overview.

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalConnections": 5,
      "totalIssues": 120,
      "openIssues": 45,
      "fixedIssues": 75,
      "totalFixes": 80,
      "appliedFixes": 75,
      "failedFixes": 5,
      "successRate": 93.8
    },
    "performance": {
      "avgOrganicTraffic": 15000,
      "avgPageSpeed": 85.5,
      "metricsCount": 30
    },
    "issues": {
      "bySeverity": {
        "CRITICAL": 5,
        "HIGH": 15,
        "MEDIUM": 20,
        "LOW": 5
      },
      "byType": [
        { "type": "missing_meta", "count": 20 },
        { "type": "broken_link", "count": 15 }
      ]
    }
  }
}
```

### GET /api/analytics/trends

Get historical trends data.

**Query Parameters:**
- `days` (optional): Number of days (1-365, default: 30)
- `metric` (optional): Filter by metric type (`traffic`, `speed`, `issues`, `fixes`, `all`)

**Response:**
```json
{
  "success": true,
  "data": {
    "period": {
      "days": 30,
      "startDate": "2024-12-01",
      "endDate": "2025-01-01"
    },
    "trends": [
      {
        "date": "2024-12-01",
        "organicTraffic": 12000,
        "pageSpeed": 82.5,
        "issuesCount": 50,
        "fixesCount": 5
      }
    ]
  }
}
```

### GET /api/analytics/[siteId]

Get site-specific analytics.

**Query Parameters:**
- `days` (optional): Number of days (default: 30)

**Response:**
```json
{
  "success": true,
  "data": {
    "connection": {
      "id": "uuid",
      "platform": "SHOPIFY",
      "domain": "example.com",
      "displayName": "My Store",
      "status": "CONNECTED",
      "lastSync": "2025-01-01T00:00:00Z"
    },
    "summary": { ... },
    "performance": {
      "avgOrganicTraffic": 5000,
      "avgPageSpeed": 88.0,
      "metricsCount": 30,
      "timeline": [ ... ]
    },
    "issues": { ... },
    "fixes": { ... }
  }
}
```

---

## Issues

### GET /api/issues

List all issues for user with filtering and pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (max: 100, default: 50)
- `status` (optional): Filter by status (`OPEN`, `DETECTED`, `IN_PROGRESS`, `FIXED`, `FAILED`, `IGNORED`)
- `severity` (optional): Filter by severity (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`)
- `connectionId` (optional): Filter by connection
- `type` (optional): Filter by issue type

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "missing_meta",
      "title": "Missing meta description",
      "severity": "HIGH",
      "pageUrl": "https://example.com/page",
      "status": "OPEN",
      "connection": { ... },
      "fixes": [ ... ]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 120,
    "pages": 3
  }
}
```

### GET /api/issues/[id]

Get issue details with fix history.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "type": "missing_meta",
    "title": "Missing meta description",
    "severity": "HIGH",
    "pageUrl": "https://example.com/page",
    "details": "{ ... }",
    "recommendation": "Add meta description...",
    "status": "OPEN",
    "connection": { ... },
    "fixes": [ ... ]
  }
}
```

### POST /api/issues/[id]/ignore

Ignore an issue (won't be auto-fixed).

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "IGNORED",
    ...
  }
}
```

### DELETE /api/issues/[id]

Delete an issue and its related fixes.

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Issue deleted successfully",
    "id": "uuid"
  }
}
```

---

## Fixes

### GET /api/fixes

List all fixes for user with filtering and pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (max: 100, default: 50)
- `status` (optional): Filter by status (`PENDING`, `APPLIED`, `ROLLED_BACK`, `FAILED`)
- `connectionId` (optional): Filter by connection

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "description": "Added meta description to product page",
      "status": "APPLIED",
      "method": "AUTOMATIC",
      "appliedAt": "2025-01-01T00:00:00Z",
      "connection": { ... },
      "issue": { ... }
    }
  ],
  "meta": { ... }
}
```

### GET /api/fixes/[id]

Get fix details including before/after state.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "description": "Added meta description",
    "type": "seo_fix",
    "targetUrl": "https://example.com/page",
    "changes": "{ ... }",
    "beforeState": "{ ... }",
    "afterState": "{ ... }",
    "status": "APPLIED",
    "method": "AUTOMATIC",
    "appliedAt": "2025-01-01T00:00:00Z",
    "connection": { ... },
    "issue": { ... }
  }
}
```

### POST /api/fixes/[id]/rollback

Rollback a fix (within 90-day window).

**Response:**
```json
{
  "success": true,
  "message": "Fix rolled back successfully"
}
```

**Error Response (409):**
```json
{
  "success": false,
  "error": {
    "code": "ROLLBACK_FAILED",
    "message": "Cannot rollback: fix is older than 90 days"
  }
}
```

### POST /api/fixes/[id]/approve

Approve and apply a single pending fix (APPROVE mode).

**Response:**
```json
{
  "success": true,
  "message": "Fix approved and applied successfully",
  "data": { ... }
}
```

### POST /api/fixes/approve-plan

Approve and execute all pending fixes in a plan (PLAN mode).

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
  "message": "Plan approved and executed successfully",
  "data": {
    "appliedFixes": 10,
    "failedFixes": 0
  }
}
```

---

## Webhooks

### GET /api/webhooks

List user's webhooks.

**Response:**
```json
{
  "success": true,
  "webhooks": [
    {
      "id": "uuid",
      "url": "https://api.example.com/webhook",
      "events": ["fix.applied", "issue.detected"],
      "enabled": true,
      "failureCount": 0,
      "lastTriggeredAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### POST /api/webhooks

Create a new webhook.

**Request Body:**
```json
{
  "url": "https://api.example.com/webhook",
  "events": ["fix.applied", "issue.detected", "site.connected"],
  "secret": "optional-hmac-secret"
}
```

**Valid Events:**
- `fix.applied` - When a fix is successfully applied
- `fix.failed` - When a fix fails
- `issue.detected` - When a new issue is detected
- `site.connected` - When a site is connected
- `site.disconnected` - When a site is disconnected
- `analysis.completed` - When analysis completes

**Response:**
```json
{
  "success": true,
  "webhook": {
    "id": "uuid",
    "url": "https://api.example.com/webhook",
    "events": ["fix.applied", "issue.detected"],
    "secret": "generated-or-provided-secret",
    "enabled": true
  }
}
```

### PATCH /api/webhooks/[id]

Update a webhook.

**Request Body:**
```json
{
  "url": "https://api.example.com/new-webhook",
  "events": ["fix.applied"],
  "enabled": false
}
```

### DELETE /api/webhooks/[id]

Delete a webhook.

**Response:**
```json
{
  "success": true,
  "message": "Webhook deleted successfully"
}
```

### POST /api/webhooks/test

Test webhook delivery.

**Request Body:**
```json
{
  "webhookId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "webhookId": "uuid",
    "url": "https://api.example.com/webhook",
    "statusCode": 200,
    "statusText": "OK",
    "delivered": true,
    "timestamp": "2025-01-01T00:00:00Z"
  }
}
```

**Webhook Payload Format:**
```json
{
  "event": "webhook.test",
  "timestamp": "2025-01-01T00:00:00Z",
  "webhookId": "uuid",
  "data": {
    "message": "This is a test webhook from SEOLOGY.AI",
    "userId": "uuid"
  }
}
```

**Webhook Signature:**
Webhooks include an `X-Webhook-Signature` header with an HMAC-SHA256 signature of the payload using your secret.

---

## Teams

### GET /api/teams

List user's teams (owned and member).

**Response:**
```json
{
  "success": true,
  "teams": [
    {
      "id": "uuid",
      "name": "Marketing Team",
      "description": "SEO team for marketing sites",
      "plan": "GROWTH",
      "role": "OWNER",
      "memberCount": 5,
      "connectionCount": 3
    }
  ]
}
```

### POST /api/teams

Create a new team.

**Request Body:**
```json
{
  "name": "Marketing Team",
  "description": "SEO team for marketing sites"
}
```

**Response:**
```json
{
  "success": true,
  "team": {
    "id": "uuid",
    "name": "Marketing Team",
    "description": "SEO team for marketing sites",
    "ownerId": "uuid",
    "plan": "STARTER"
  }
}
```

### GET /api/teams/[id]

Get team details including members.

**Response:**
```json
{
  "success": true,
  "team": {
    "id": "uuid",
    "name": "Marketing Team",
    "description": "SEO team",
    "plan": "GROWTH",
    "owner": { ... },
    "members": [
      {
        "id": "uuid",
        "user": { ... },
        "role": "ADMIN",
        "joinedAt": "2025-01-01T00:00:00Z"
      }
    ],
    "connections": [ ... ]
  }
}
```

### PATCH /api/teams/[id]

Update team details (owner only).

**Request Body:**
```json
{
  "name": "Updated Team Name",
  "description": "Updated description"
}
```

### DELETE /api/teams/[id]

Delete team (owner only).

**Response:**
```json
{
  "success": true,
  "message": "Team deleted successfully"
}
```

### POST /api/teams/[id]/invite

Invite user to team.

**Request Body:**
```json
{
  "email": "user@example.com",
  "role": "MEMBER"
}
```

**Valid Roles:** `OWNER`, `ADMIN`, `MEMBER`, `VIEWER`

**Response:**
```json
{
  "success": true,
  "invitation": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "MEMBER",
    "token": "invitation-token",
    "expiresAt": "2025-01-08T00:00:00Z"
  }
}
```

### PATCH /api/teams/[id]/members

Update member role.

**Request Body:**
```json
{
  "userId": "target-user-id",
  "role": "ADMIN"
}
```

### DELETE /api/teams/[id]/members

Remove team member.

**Query Parameters:**
- `userId`: ID of user to remove

**Response:**
```json
{
  "success": true,
  "message": "Member removed successfully"
}
```

### POST /api/teams/accept

Accept team invitation.

**Request Body:**
```json
{
  "token": "invitation-token"
}
```

**Response:**
```json
{
  "success": true,
  "team": { ... },
  "message": "Successfully joined the team"
}
```

---

## Sites/Connections

### GET /api/sites

List all site connections.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "platform": "SHOPIFY",
      "domain": "example.com",
      "displayName": "My Store",
      "status": "CONNECTED",
      "lastSync": "2025-01-01T00:00:00Z",
      "stats": {
        "totalIssues": 50,
        "activeIssues": 20,
        "totalFixes": 30
      }
    }
  ]
}
```

### POST /api/sites

Create a new site connection (for custom/Magic.js sites).

**Request Body:**
```json
{
  "platform": "CUSTOM",
  "domain": "example.com",
  "displayName": "My Custom Site",
  "credentials": {
    "username": "admin",
    "password": "encrypted"
  }
}
```

### GET /api/sites/[id]

Get site connection details.

### DELETE /api/sites/[id]

Delete site connection.

### POST /api/sites/[id]/analyze

Trigger AI analysis for site.

---

## Notifications

### GET /api/notifications

Get user's notifications.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "SUCCESS",
      "title": "Fix Applied",
      "message": "Meta description added to product page",
      "actionUrl": "/fixes/uuid",
      "read": false,
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### POST /api/notifications/[id]/read

Mark notification as read.

### POST /api/notifications/read-all

Mark all notifications as read.

---

## Billing

### POST /api/billing/create-checkout

Create Stripe checkout session.

**Request Body:**
```json
{
  "plan": "GROWTH"
}
```

**Response:**
```json
{
  "success": true,
  "checkoutUrl": "https://checkout.stripe.com/..."
}
```

### GET /api/billing/portal

Get Stripe customer portal URL.

**Response:**
```json
{
  "success": true,
  "portalUrl": "https://billing.stripe.com/..."
}
```

### POST /api/billing/webhook

Stripe webhook handler (internal use).

---

## Admin

Admin endpoints require `ADMIN` role.

### GET /api/admin/analytics

Get platform-wide analytics.

### GET /api/admin/users

List all users with filtering.

### PATCH /api/admin/users/[id]

Update user (change plan, role, etc.).

### POST /api/admin/broadcast

Send notification to multiple users.

---

## Error Codes

Common error codes returned by the API:

- `UNAUTHORIZED` (401) - Authentication required
- `FORBIDDEN` (403) - Insufficient permissions
- `USER_NOT_FOUND` (404) - User not found
- `CONNECTION_NOT_FOUND` (404) - Site connection not found
- `ISSUE_NOT_FOUND` (404) - Issue not found
- `FIX_NOT_FOUND` (404) - Fix not found
- `WEBHOOK_NOT_FOUND` (404) - Webhook not found
- `INVALID_INPUT` (400) - Invalid request parameters
- `VALIDATION_ERROR` (422) - Validation failed
- `ALREADY_IGNORED` (409) - Issue already ignored
- `ACTIVE_SUBSCRIPTION` (409) - Cannot perform action with active subscription
- `DELIVERY_FAILED` (502) - Webhook delivery failed
- `INTERNAL_ERROR` (500) - Server error

---

## Rate Limiting

API rate limits are enforced based on your plan:

- **STARTER**: 1000 requests/hour
- **GROWTH**: 5000 requests/hour
- **SCALE**: Unlimited

Rate limit headers are included in responses:
- `X-RateLimit-Limit`: Total requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Timestamp when limit resets

---

## Pagination

Paginated endpoints support these query parameters:

- `page`: Page number (1-indexed)
- `limit`: Results per page (max varies by endpoint)

Pagination metadata is returned in `meta`:

```json
{
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "pages": 3
  }
}
```

---

## Filtering & Sorting

Many list endpoints support filtering via query parameters. Consult individual endpoint documentation for available filters.

Common filters:
- `status`: Filter by status
- `type`: Filter by type
- `severity`: Filter by severity
- `connectionId`: Filter by connection

---

## Best Practices

1. **Use pagination** for large datasets to reduce response size
2. **Cache responses** when appropriate (user profile, site details)
3. **Verify webhook signatures** to ensure authenticity
4. **Handle rate limits** gracefully with exponential backoff
5. **Check `success` field** before accessing `data`
6. **Log `error.code`** for debugging and monitoring
7. **Use proper HTTP methods** (GET for reads, POST for creates, PATCH for updates, DELETE for deletes)

---

## Need Help?

- Documentation: https://docs.seology.ai
- API Status: https://status.seology.ai
- Support: support@seology.ai
