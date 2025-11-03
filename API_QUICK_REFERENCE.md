# SEOLOGY.AI API Quick Reference

**Base URL (Development):** `http://localhost:3000`
**Base URL (Production):** `https://seology.ai`

---

## Essential Endpoints

### Health & Docs
```bash
GET  /api/health         # System health check (no auth)
GET  /api/docs           # OpenAPI/Swagger spec (no auth)
```

### Sites
```bash
GET    /api/sites                    # List all sites
POST   /api/sites                    # Connect new site
GET    /api/sites/{id}               # Get site details
PATCH  /api/sites/{id}               # Update site
DELETE /api/sites/{id}               # Delete site
POST   /api/sites/{id}/analyze       # Trigger AI analysis
```

### Fixes
```bash
POST /api/fixes/execute              # Execute fixes (auto/plan/approve)
POST /api/fixes/{id}/approve         # Approve single fix
POST /api/fixes/{id}/rollback        # Rollback fix
POST /api/fixes/approve-plan         # Approve entire plan
```

### Teams
```bash
GET    /api/teams                    # List teams
POST   /api/teams                    # Create team
GET    /api/teams/{id}               # Get team details
POST   /api/teams/{id}/invite        # Invite member
GET    /api/teams/{id}/members       # List members
POST   /api/teams/accept             # Accept invitation
```

### Webhooks
```bash
GET    /api/webhooks                 # List webhooks
POST   /api/webhooks                 # Register webhook
PATCH  /api/webhooks/{id}            # Update webhook
DELETE /api/webhooks/{id}            # Delete webhook
```

### Billing
```bash
POST /api/billing/create-checkout    # Create Stripe checkout
POST /api/billing/portal             # Billing portal
POST /api/billing/webhook            # Stripe webhook (internal)
```

### Other
```bash
GET  /api/usage                      # Current usage & limits
GET  /api/notifications              # User notifications
GET  /api/jobs                       # Queue statistics
GET  /api/admin/analytics            # Platform analytics (admin)
```

---

## Authentication

**All endpoints except** `/api/health`, `/api/docs`, `/api/magic/*`, and webhook receivers **require Clerk JWT authentication**.

### Get Auth Token
```bash
# Login to your app, open DevTools
# Application > Cookies > __session
# Copy the token value

export TOKEN="your-clerk-session-token-here"
```

### Use Auth Token
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/sites
```

---

## Common Request Examples

### Connect a Site
```bash
curl -X POST http://localhost:3000/api/sites \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "CUSTOM",
    "domain": "example.com",
    "displayName": "My Website"
  }'
```

### Execute Fixes
```bash
curl -X POST http://localhost:3000/api/fixes/execute \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "siteId": "site-uuid-here"
  }'
```

### Register Webhook
```bash
curl -X POST http://localhost:3000/api/webhooks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-app.com/webhook",
    "events": ["fix.applied", "issue.detected"],
    "secret": "your-hmac-secret"
  }'
```

### Create Team
```bash
curl -X POST http://localhost:3000/api/teams \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Team",
    "description": "SEO Team"
  }'
```

### Get Usage Stats
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/usage
```

---

## Response Format

### Success
```json
{
  "success": true,
  "data": { ... }
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": { ... }
  }
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request |
| 401  | Unauthorized |
| 403  | Forbidden / Usage Limit |
| 404  | Not Found |
| 500  | Internal Error |
| 503  | Service Unavailable |

---

## Error Codes

| Code | Meaning |
|------|---------|
| `UNAUTHORIZED` | Not authenticated |
| `FORBIDDEN` | Insufficient permissions |
| `USER_NOT_FOUND` | User not found |
| `RESOURCE_NOT_FOUND` | Resource doesn't exist |
| `INVALID_INPUT` | Invalid request data |
| `USAGE_LIMIT_EXCEEDED` | Plan limit reached |
| `EXECUTION_FAILED` | Fix failed to execute |
| `INTERNAL_ERROR` | Server error |

---

## Webhook Events

Subscribe to these events:
- `fix.applied` - Fix successfully applied
- `fix.failed` - Fix failed to apply
- `issue.detected` - New SEO issue found
- `site.connected` - New site connected
- `site.disconnected` - Site disconnected
- `analysis.completed` - AI analysis finished

---

## Plan Limits

| Plan | Sites | Fixes/Month |
|------|-------|-------------|
| STARTER | 3 | 500 |
| GROWTH | 10 | 5,000 |
| SCALE | Unlimited | Unlimited |

---

## Platform Types

- `SHOPIFY` - Shopify stores
- `WORDPRESS` - WordPress sites
- `WIX` - Wix websites
- `CUSTOM` - Any website (uses Magic.js)

---

## Issue Severities

- `CRITICAL` - Must fix immediately
- `HIGH` - Important issues
- `MEDIUM` - Should fix soon
- `LOW` - Minor improvements

---

## Execution Modes

User preference for how fixes are applied:

1. **AUTOMATIC** - Applies all fixes immediately (no approval)
2. **PLAN** - Creates a batch plan, single approval to apply all
3. **APPROVE** - Each fix requires individual approval

---

## Useful Links

- **Full API Audit:** `API_AUDIT_REPORT.md`
- **Testing Guide:** `API_TESTING_GUIDE.md`
- **Status Summary:** `API_STATUS_SUMMARY.md`
- **OpenAPI Docs:** `http://localhost:3000/api/docs`
- **Health Check:** `http://localhost:3000/api/health`

---

## Need Help?

1. Check `/api/docs` for detailed OpenAPI specification
2. Read `API_TESTING_GUIDE.md` for examples
3. Review `API_AUDIT_REPORT.md` for complete documentation
4. Test with `/api/health` to verify system is running

---

**Last Updated:** 2025-11-03
**API Version:** 1.0.0
