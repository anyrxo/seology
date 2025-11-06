# SEOLOGY.AI Shopify App - API Documentation

Complete API reference for all endpoints in the SEOLOGY.AI Shopify app.

## Table of Contents

1. [Authentication](#authentication)
2. [Base URL](#base-url)
3. [Rate Limits](#rate-limits)
4. [Response Format](#response-format)
5. [Error Codes](#error-codes)
6. [Endpoints](#endpoints)
   - [Overview & Dashboard](#overview--dashboard)
   - [Products](#products)
   - [Analysis & Fixes](#analysis--fixes)
   - [Agents](#agents)
   - [Timeline & Checkpoints](#timeline--checkpoints)
   - [Analytics](#analytics)
   - [Monitoring](#monitoring)
   - [Settings](#settings)
   - [Automation](#automation)
   - [Webhooks](#webhooks)

---

## Authentication

The Shopify app uses **shop parameter authentication** instead of traditional bearer tokens.

### Shop Parameter

All requests must include the `shop` parameter:

```
GET /api/shopify/products?shop=your-store.myshopify.com
```

The shop parameter:
- Identifies which Shopify store is making the request
- Links to stored OAuth access token
- Validates the request is from an authorized merchant

### Session Management

After OAuth installation:
1. User authorizes app
2. Access token is stored encrypted in database
3. Subsequent requests use shop parameter to retrieve session
4. Session includes access token for Shopify Admin API calls

### Security

- All tokens are encrypted using AES-256
- Sessions expire after 90 days of inactivity
- Requests validate shop domain format
- CSRF protection on OAuth flow

---

## Base URL

**Production**: `https://your-app.vercel.app`
**Development**: `http://localhost:3000`

All API routes are under `/api/shopify/` prefix.

---

## Rate Limits

### Shopify API Limits

The app respects Shopify's rate limits:
- **REST API**: 2 requests/second (bucket-based)
- **GraphQL API**: 1000 points/second (cost-based)

### Internal Rate Limits

To protect Claude API and database:

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/shopify/analyze` | 30 requests | 1 minute |
| `/api/shopify/fix` | 60 requests | 1 minute |
| `/api/shopify/chat` | 20 requests | 1 minute |
| `/api/shopify/agents/*/execute` | 10 requests | 1 minute |
| All other endpoints | 100 requests | 1 minute |

**Rate Limit Response**:
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again in 60 seconds.",
    "retryAfter": 60
  }
}
```

### Handling Rate Limits

**Recommended retry strategy**:
```javascript
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (error.code === 'RATE_LIMIT_EXCEEDED' && i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 2 ** i * 1000))
        continue
      }
      throw error
    }
  }
}
```

---

## Response Format

### Success Response

All successful responses follow this structure:

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "meta": {
    "timestamp": "2025-11-07T12:34:56.789Z",
    "requestId": "req_abc123"
  }
}
```

### Paginated Response

For list endpoints with pagination:

```json
{
  "success": true,
  "data": [
    // Array of items
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 145,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPreviousPage": false
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

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `AUTHENTICATION_REQUIRED` | 401 | Missing or invalid shop parameter |
| `UNAUTHORIZED` | 403 | User not authorized for this resource |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request parameters |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `SHOPIFY_API_ERROR` | 502 | Shopify API returned an error |
| `CLAUDE_API_ERROR` | 502 | Claude API returned an error |
| `DATABASE_ERROR` | 500 | Database operation failed |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected server error |
| `MISSING_CONNECTION` | 404 | No Shopify connection found |
| `EXECUTION_MODE_ERROR` | 400 | Invalid execution mode |
| `INSUFFICIENT_CREDITS` | 402 | Not enough AI credits |
| `WEBHOOK_VALIDATION_FAILED` | 403 | Webhook signature invalid |

---

## Endpoints

### Overview & Dashboard

#### GET /api/shopify/overview

Get dashboard overview statistics.

**Parameters**:
- `shop` (required) - Shopify store domain

**Response**:
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalProducts": 234,
      "productsAnalyzed": 189,
      "issuesFound": 456,
      "issuesFixed": 312,
      "avgSeoScore": 72.5,
      "pendingFixes": 12
    },
    "recentActivity": [
      {
        "id": "act_123",
        "type": "fix_applied",
        "description": "Fixed missing meta description for Product A",
        "timestamp": "2025-11-07T10:30:00Z"
      }
    ],
    "topIssues": [
      {
        "type": "missing_meta_description",
        "count": 45,
        "severity": "HIGH"
      }
    ]
  }
}
```

**Example**:
```bash
curl "https://your-app.vercel.app/api/shopify/overview?shop=your-store.myshopify.com"
```

---

### Products

#### GET /api/shopify/products

Fetch products with SEO analysis.

**Parameters**:
- `shop` (required) - Shopify store domain
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 20, max: 100)
- `sortBy` (optional) - Sort field: `seoScore`, `title`, `createdAt`
- `sortOrder` (optional) - `asc` or `desc` (default: `asc`)
- `filter` (optional) - Filter: `low_score`, `missing_alt`, `no_meta`

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "gid://shopify/Product/123456789",
      "title": "Premium Yoga Mat",
      "handle": "premium-yoga-mat",
      "seoScore": 65,
      "issues": [
        {
          "type": "missing_meta_description",
          "severity": "HIGH",
          "title": "Missing meta description"
        },
        {
          "type": "short_title",
          "severity": "MEDIUM",
          "title": "Title too short (< 50 chars)"
        }
      ],
      "lastAnalyzed": "2025-11-07T08:15:00Z",
      "image": {
        "url": "https://cdn.shopify.com/...",
        "altText": "Premium Yoga Mat"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 234,
    "totalPages": 12
  }
}
```

**Example**:
```bash
curl "https://your-app.vercel.app/api/shopify/products?shop=your-store.myshopify.com&sortBy=seoScore&sortOrder=asc&limit=10"
```

---

### Analysis & Fixes

#### POST /api/shopify/analyze

Analyze a product or collection with Claude AI.

**Parameters**:
- `shop` (required) - Shopify store domain

**Request Body**:
```json
{
  "productId": "gid://shopify/Product/123456789",
  "resourceType": "product" // or "collection"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "analysis": {
      "seoScore": 65,
      "issues": [
        {
          "type": "missing_meta_description",
          "severity": "HIGH",
          "title": "Missing meta description",
          "description": "This product has no meta description, which is critical for search engine visibility.",
          "recommendation": "Add a compelling meta description (150-160 characters) highlighting key benefits.",
          "suggestedFix": "Experience ultimate comfort with our premium eco-friendly yoga mat. Non-slip surface, 6mm thickness, perfect for all yoga styles. Free shipping."
        }
      ],
      "strengths": [
        "Title contains target keyword",
        "Product has featured image with alt text"
      ],
      "opportunities": [
        "Add structured data (Product schema)",
        "Optimize image alt text with keywords"
      ]
    },
    "tokensUsed": 1250,
    "cost": 0.0045
  }
}
```

**Example**:
```bash
curl -X POST "https://your-app.vercel.app/api/shopify/analyze?shop=your-store.myshopify.com" \
  -H "Content-Type: application/json" \
  -d '{"productId": "gid://shopify/Product/123456789", "resourceType": "product"}'
```

#### POST /api/shopify/fix

Apply SEO fixes to a product.

**Parameters**:
- `shop` (required) - Shopify store domain

**Request Body**:
```json
{
  "productId": "gid://shopify/Product/123456789",
  "fixes": [
    {
      "type": "meta_description",
      "value": "Experience ultimate comfort with our premium yoga mat..."
    },
    {
      "type": "meta_title",
      "value": "Premium Yoga Mat - Eco-Friendly, Non-Slip | YogaStore"
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "fixId": "fix_abc123",
    "status": "APPLIED", // or "PENDING" if in APPROVE/PLAN mode
    "appliedAt": "2025-11-07T12:34:56Z",
    "rollbackDeadline": "2026-02-05T12:34:56Z", // 90 days
    "changes": {
      "before": {
        "metaTitle": "Premium Yoga Mat",
        "metaDescription": null
      },
      "after": {
        "metaTitle": "Premium Yoga Mat - Eco-Friendly, Non-Slip | YogaStore",
        "metaDescription": "Experience ultimate comfort with our premium yoga mat..."
      }
    }
  }
}
```

**Example**:
```bash
curl -X POST "https://your-app.vercel.app/api/shopify/fix?shop=your-store.myshopify.com" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "gid://shopify/Product/123456789",
    "fixes": [
      {"type": "meta_description", "value": "New meta description..."}
    ]
  }'
```

#### GET /api/shopify/fixes/pending

Get pending fixes for approval (APPROVE/PLAN modes).

**Parameters**:
- `shop` (required) - Shopify store domain
- `status` (optional) - Filter: `PENDING`, `APPROVED`, `REJECTED`

**Response**:
```json
{
  "success": true,
  "data": {
    "fixes": [
      {
        "id": "fix_abc123",
        "productTitle": "Premium Yoga Mat",
        "description": "Add meta description",
        "changes": {
          "before": null,
          "after": "Experience ultimate comfort..."
        },
        "estimatedImpact": "15% traffic increase",
        "createdAt": "2025-11-07T10:00:00Z"
      }
    ],
    "plans": [
      {
        "id": "plan_xyz789",
        "title": "SEO Optimization Plan - Nov 7, 2025",
        "description": "Comprehensive SEO fixes for 15 products",
        "fixCount": 15,
        "estimatedImpact": "Overall 25% traffic improvement",
        "createdAt": "2025-11-07T09:00:00Z",
        "fixes": [
          // Array of fixes in this plan
        ]
      }
    ]
  }
}
```

#### POST /api/shopify/fixes/{fixId}/approve

Approve a pending fix (APPROVE mode).

**Parameters**:
- `shop` (required) - Shopify store domain
- `fixId` (required) - Fix ID

**Response**:
```json
{
  "success": true,
  "data": {
    "fixId": "fix_abc123",
    "status": "APPLIED",
    "appliedAt": "2025-11-07T12:34:56Z"
  }
}
```

#### POST /api/shopify/plans/{planId}/approve

Approve an entire plan (PLAN mode).

**Parameters**:
- `shop` (required) - Shopify store domain
- `planId` (required) - Plan ID

**Response**:
```json
{
  "success": true,
  "data": {
    "planId": "plan_xyz789",
    "status": "EXECUTING",
    "fixesApplied": 15,
    "fixesFailed": 0,
    "completedAt": "2025-11-07T12:40:00Z"
  }
}
```

---

### Agents

#### GET /api/shopify/agents

List all AI agents (templates + custom).

**Parameters**:
- `shop` (required) - Shopify store domain
- `filter` (optional) - `templates`, `custom`, `public`

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "agent_123",
      "name": "Meta Description Optimizer",
      "description": "AI agent specialized in crafting compelling meta descriptions",
      "specialty": "meta_description",
      "isTemplate": true,
      "rating": 4.8,
      "totalRuns": 1250,
      "avgExecutionTime": 3.2,
      "avgCostPerRun": 0.015
    }
  ]
}
```

#### POST /api/shopify/agents

Create a custom AI agent.

**Request Body**:
```json
{
  "name": "My Custom SEO Agent",
  "description": "Optimizes product titles for keyword density",
  "specialty": "custom",
  "systemPrompt": "You are an expert SEO copywriter...",
  "targetIssueTypes": ["missing_title", "short_title"],
  "autoApply": false
}
```

#### POST /api/shopify/agents/{agentId}/execute

Execute an AI agent on products.

**Request Body**:
```json
{
  "targetType": "product", // or "collection", "batch"
  "targetId": "gid://shopify/Product/123456789",
  "batchSize": 1 // for batch operations
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "executionId": "exec_abc123",
    "status": "RUNNING",
    "estimatedCompletion": "2025-11-07T12:38:00Z",
    "progress": 0
  }
}
```

---

### Timeline & Checkpoints

#### GET /api/shopify/timeline

Get fix history timeline.

**Parameters**:
- `shop` (required) - Shopify store domain
- `startDate` (optional) - ISO date
- `endDate` (optional) - ISO date

**Response**:
```json
{
  "success": true,
  "data": {
    "timeline": [
      {
        "date": "2025-11-07",
        "events": [
          {
            "id": "event_123",
            "type": "checkpoint",
            "name": "Pre-automation checkpoint",
            "timestamp": "2025-11-07T09:00:00Z",
            "fixCount": 15,
            "canRollback": true
          },
          {
            "id": "event_124",
            "type": "fix_applied",
            "description": "Fixed meta description for Product A",
            "timestamp": "2025-11-07T09:15:00Z"
          }
        ]
      }
    ]
  }
}
```

#### POST /api/shopify/checkpoints

Create a manual checkpoint.

**Request Body**:
```json
{
  "name": "Before Black Friday optimizations",
  "description": "Checkpoint before major SEO changes",
  "type": "MANUAL"
}
```

#### POST /api/shopify/checkpoints/{checkpointId}/restore

Rollback to a previous checkpoint.

**Response**:
```json
{
  "success": true,
  "data": {
    "checkpointId": "checkpoint_abc123",
    "fixesReverted": 25,
    "restoredAt": "2025-11-07T14:00:00Z"
  }
}
```

---

### Analytics

#### GET /api/shopify/analytics/overview

Get usage analytics overview.

**Response**:
```json
{
  "success": true,
  "data": {
    "currentPeriod": {
      "start": "2025-11-01T00:00:00Z",
      "end": "2025-11-30T23:59:59Z"
    },
    "usage": {
      "tokensUsed": 125000,
      "totalCost": 4.25,
      "requestCount": 345
    },
    "budget": {
      "monthlyLimit": 50.00,
      "remaining": 45.75,
      "percentUsed": 8.5
    },
    "topModels": [
      {
        "model": "claude-3-5-sonnet-20241022",
        "requests": 320,
        "cost": 4.10
      }
    ]
  }
}
```

#### GET /api/shopify/analytics/usage

Get time-series usage data with forecast.

**Parameters**:
- `period` (optional) - `day`, `week`, `month` (default: `month`)

**Response**:
```json
{
  "success": true,
  "data": {
    "timeSeries": [
      {
        "date": "2025-11-01",
        "tokensUsed": 5200,
        "cost": 0.18,
        "requests": 12
      }
    ],
    "forecast": {
      "projectedMonthlyTotal": 48.50,
      "budgetExceedDate": null,
      "recommendation": "On track to stay within budget"
    }
  }
}
```

#### POST /api/shopify/analytics/export

Export analytics data.

**Request Body**:
```json
{
  "format": "csv", // or "pdf"
  "startDate": "2025-11-01",
  "endDate": "2025-11-30"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://your-app.vercel.app/exports/usage-nov-2025.csv",
    "expiresAt": "2025-11-08T12:00:00Z"
  }
}
```

---

### Monitoring

#### GET /api/shopify/monitor/live

Server-Sent Events (SSE) stream for real-time execution monitoring.

**Response**: SSE stream
```
event: execution_started
data: {"executionId":"exec_123","agentName":"Title Optimizer"}

event: execution_progress
data: {"executionId":"exec_123","progress":50,"currentTask":"Analyzing product 5/10"}

event: execution_completed
data: {"executionId":"exec_123","status":"COMPLETED","fixesApplied":10}
```

**Example** (JavaScript):
```javascript
const eventSource = new EventSource('/api/shopify/monitor/live?shop=your-store.myshopify.com')

eventSource.addEventListener('execution_progress', (event) => {
  const data = JSON.parse(event.data)
  console.log(`Progress: ${data.progress}%`)
})
```

#### GET /api/shopify/monitor/health

System health status.

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "services": {
      "database": "healthy",
      "shopify_api": "healthy",
      "claude_api": "healthy"
    },
    "stats": {
      "activeExecutions": 3,
      "queuedJobs": 12,
      "avgResponseTime": 245
    }
  }
}
```

---

### Settings

#### GET /api/shopify/settings

Get user settings.

**Response**:
```json
{
  "success": true,
  "data": {
    "executionMode": "AUTOMATIC",
    "dailyAutomation": {
      "enabled": true,
      "time": "09:00",
      "timezone": "America/New_York"
    },
    "notifications": {
      "email": true,
      "dashboard": true
    }
  }
}
```

#### POST /api/shopify/settings

Update settings.

**Request Body**:
```json
{
  "executionMode": "PLAN",
  "dailyAutomation": {
    "enabled": true,
    "time": "08:00",
    "timezone": "America/Los_Angeles"
  }
}
```

---

### Automation

#### POST /api/cron/auto-scan

Trigger background automation (cron endpoint).

**Headers**:
- `Authorization: Bearer {CRON_SECRET}`

**Response**:
```json
{
  "success": true,
  "data": {
    "jobsCreated": 45,
    "sitesScanned": 12,
    "estimatedCompletion": "2025-11-07T15:30:00Z"
  }
}
```

**Note**: This endpoint is called automatically by Vercel Cron every 6 hours.

---

### Webhooks

#### POST /api/webhooks/shopify

Receive Shopify webhooks.

**Headers**:
- `X-Shopify-Topic` - Event type
- `X-Shopify-Shop-Domain` - Store domain
- `X-Shopify-Hmac-Sha256` - Signature for validation

**Supported Topics**:
- `app/uninstalled` - App uninstalled
- `products/create` - Product created
- `products/update` - Product updated
- `products/delete` - Product deleted

**Request Body**: Shopify webhook payload (varies by topic)

**Response**:
```json
{
  "success": true
}
```

**Example** (products/update):
```json
{
  "id": 123456789,
  "title": "Updated Product Title",
  "handle": "updated-product",
  "updated_at": "2025-11-07T12:00:00Z"
}
```

---

## SDK Examples

### JavaScript/TypeScript

```typescript
class SeologyClient {
  constructor(private shop: string, private baseUrl: string) {}

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}?shop=${this.shop}`
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Request failed')
    }

    return response.json()
  }

  async getProducts(page = 1, limit = 20) {
    return this.request(`/api/shopify/products&page=${page}&limit=${limit}`)
  }

  async analyzeProduct(productId: string) {
    return this.request('/api/shopify/analyze', {
      method: 'POST',
      body: JSON.stringify({ productId, resourceType: 'product' }),
    })
  }

  async applyFix(productId: string, fixes: any[]) {
    return this.request('/api/shopify/fix', {
      method: 'POST',
      body: JSON.stringify({ productId, fixes }),
    })
  }
}

// Usage
const client = new SeologyClient('your-store.myshopify.com', 'https://your-app.vercel.app')
const products = await client.getProducts()
```

---

## Changelog

### v1.0.0 (2025-11-07)
- Initial API release
- 51 endpoints across 10 categories
- Support for Automatic, Plan, and Approve execution modes
- AI agent system with 5 pre-built templates
- Timeline and checkpoint management
- Real-time monitoring with SSE
- Usage analytics and cost tracking

---

## Support

For API questions or issues:
- Email: support@seology.ai
- Documentation: https://docs.seology.ai
- Status Page: https://status.seology.ai
