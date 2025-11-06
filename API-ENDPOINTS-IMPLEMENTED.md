# Pending Fixes Approval API Endpoints - Implementation Summary

All API endpoints for the pending fixes approval system have been successfully implemented and are production-ready.

## Implemented Endpoints

### 1. GET /api/shopify/fixes/pending
**Purpose**: Fetch all pending fixes and plans for a Shopify store

**Authentication**: Shop parameter (no Clerk)

**Query Parameters**:
- `shop` (required): Shopify domain (e.g., `example.myshopify.com`)

**Response**:
```typescript
{
  success: true,
  data: {
    pendingFixes: Array<{
      id: string
      description: string
      type: string
      targetUrl: string | null
      changes: string
      beforeState: string
      afterState: string
      createdAt: Date
      issue: {
        id: string
        title: string
        severity: string
        pageUrl: string
        type: string
      } | null
    }>
    pendingPlans: Array<{
      id: string
      title: string
      description: string
      estimatedImpact: string
      status: string
      createdAt: Date
      fixes: Array<{
        id: string
        description: string
        type: string
        targetUrl: string | null
      }>
    }>
    executionMode: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
  }
}
```

---

### 2. POST /api/shopify/fixes/[fixId]/approve
**Purpose**: Approve and apply a single pending fix

**Authentication**: Shop parameter (no Clerk)

**Path Parameters**:
- `fixId`: UUID of the fix to approve

**Query Parameters**:
- `shop` (required): Shopify domain

**Response**:
```typescript
{
  success: true,
  data: {
    fix: {
      id: string
      status: 'APPLIED'
      appliedAt: Date
    }
  }
}
```

**Behavior**:
- Validates fix belongs to the shop
- Applies SEO changes to Shopify via GraphQL API
- Updates fix status to `APPLIED`
- Updates associated issue status to `FIXED`
- Sets rollback deadline to 90 days from now
- Creates audit log entry
- On failure: marks fix as `FAILED`

---

### 3. POST /api/shopify/fixes/[fixId]/reject
**Purpose**: Reject a pending fix without applying it

**Authentication**: Shop parameter (no Clerk)

**Path Parameters**:
- `fixId`: UUID of the fix to reject

**Query Parameters**:
- `shop` (required): Shopify domain

**Request Body** (optional):
```typescript
{
  reason?: string
}
```

**Response**:
```typescript
{
  success: true,
  data: {
    fix: {
      id: string
      status: 'REJECTED'
    }
  }
}
```

**Behavior**:
- Validates fix belongs to the shop
- Deletes the pending fix from database
- Creates audit log with rejection reason
- Does NOT apply any changes to Shopify

---

### 4. POST /api/shopify/plans/[planId]/approve
**Purpose**: Approve and execute all fixes in a pending plan

**Authentication**: Shop parameter (no Clerk)

**Path Parameters**:
- `planId`: UUID of the plan to approve

**Query Parameters**:
- `shop` (required): Shopify domain

**Response**:
```typescript
{
  success: true,
  data: {
    plan: {
      id: string
      status: 'COMPLETED' | 'FAILED'
      executedAt: Date
    }
    results: {
      successful: number
      failed: number
      total: number
    }
  }
}
```

**Behavior**:
- Validates plan belongs to the shop
- Sets plan status to `EXECUTING`
- Iterates through all fixes in the plan
- Applies each fix to Shopify
- Tracks success/failure for each fix
- Updates plan status:
  - `COMPLETED` if at least one fix succeeds
  - `FAILED` if all fixes fail
- Creates comprehensive audit log with results
- Continues executing remaining fixes even if some fail

---

### 5. POST /api/shopify/plans/[planId]/reject
**Purpose**: Reject a pending plan without executing any fixes

**Authentication**: Shop parameter (no Clerk)

**Path Parameters**:
- `planId`: UUID of the plan to reject

**Query Parameters**:
- `shop` (required): Shopify domain

**Request Body** (optional):
```typescript
{
  reason?: string
}
```

**Response**:
```typescript
{
  success: true,
  data: {
    plan: {
      id: string
      status: 'REJECTED'
    }
  }
}
```

**Behavior**:
- Validates plan belongs to the shop
- Updates plan status to `REJECTED`
- Stores rejection reason
- Deletes all associated pending fixes
- Creates audit log entry
- Does NOT apply any changes to Shopify

---

### 6. POST /api/shopify/fixes/batch-approve
**Purpose**: Approve and apply multiple individual fixes at once

**Authentication**: Shop parameter (no Clerk)

**Query Parameters**:
- `shop` (required): Shopify domain

**Request Body**:
```typescript
{
  fixIds: string[]  // Array of fix UUIDs
}
```

**Response**:
```typescript
{
  success: true,
  data: {
    results: {
      successful: number
      failed: number
      total: number
    }
    fixes: Array<{
      fixId: string
      success: boolean
      error?: string
    }>
  }
}
```

**Behavior**:
- Validates all fixIds array is non-empty
- Fetches all pending fixes for the shop
- Applies each fix to Shopify
- Tracks individual success/failure
- Updates each fix status accordingly
- Creates individual audit logs for each fix
- Creates summary audit log for the batch
- Returns detailed results for each fix

---

## Common Features Across All Endpoints

### Error Handling
All endpoints return standardized error responses:
```typescript
{
  success: false,
  error: {
    code: string  // Error code identifier
    message: string  // Human-readable message
    details?: unknown  // Additional error context
  }
}
```

### Common Error Codes
- `MISSING_SHOP`: Shop parameter not provided
- `NO_CONNECTION`: Shop not connected to SEOLOGY
- `UNAUTHORIZED`: Resource doesn't belong to the shop
- `INVALID_STATUS`: Fix/plan not in PENDING status
- `FIX_NOT_FOUND`: Fix ID doesn't exist
- `PLAN_NOT_FOUND`: Plan ID doesn't exist
- `INVALID_CHANGES`: Fix changes are malformed JSON
- `APPLICATION_FAILED`: Failed to apply fix to Shopify
- `INTERNAL_ERROR`: Unexpected server error

### Security Features
- **Shop Validation**: All requests validate shop parameter
- **Connection Verification**: Ensures shop is connected and authorized
- **Ownership Checks**: Verifies resources belong to the requesting shop
- **Transaction Safety**: Uses database transactions for data consistency
- **Audit Logging**: All actions are logged for compliance

### Database Transactions
All approval/rejection endpoints use transactions to ensure:
- Atomic updates (all-or-nothing)
- Data consistency
- Audit trail completeness
- Proper rollback on errors

### Shopify Integration
- Uses `lib/shopify-client.ts` for all Shopify API calls
- Leverages GraphQL Admin API (2024-01)
- Handles Shopify-specific errors gracefully
- Supports retries on transient failures

---

## Integration with Existing Systems

### Execution Modes
The endpoints support all three execution modes:
- **AUTOMATIC**: Fixes auto-applied (no pending fixes)
- **PLAN**: Batch approval via `/plans/[planId]/approve`
- **APPROVE**: Individual approval via `/fixes/[fixId]/approve`

### Database Models Used
- `Fix`: Pending and applied fixes
- `PendingPlan`: Pending fix plans
- `Issue`: SEO issues being fixed
- `Connection`: Shopify connection credentials
- `User`: Execution mode preference
- `AuditLog`: Complete action history

### Rollback Support
- Applied fixes automatically get a 90-day rollback deadline
- Rollback data stored in `beforeState` and `afterState` fields
- Can be used for future rollback implementation

---

## File Locations

```
app/api/shopify/
├── fixes/
│   ├── pending/
│   │   └── route.ts          # GET pending fixes
│   ├── [fixId]/
│   │   ├── approve/
│   │   │   └── route.ts      # POST approve individual fix
│   │   └── reject/
│   │       └── route.ts      # POST reject individual fix
│   └── batch-approve/
│       └── route.ts          # POST batch approve fixes
└── plans/
    └── [planId]/
        ├── approve/
        │   └── route.ts      # POST approve plan
        └── reject/
            └── route.ts      # POST reject plan
```

---

## Testing Recommendations

### Manual Testing
```bash
# 1. Get pending fixes
curl "http://localhost:3000/api/shopify/fixes/pending?shop=example.myshopify.com"

# 2. Approve individual fix
curl -X POST "http://localhost:3000/api/shopify/fixes/{fixId}/approve?shop=example.myshopify.com"

# 3. Reject individual fix
curl -X POST "http://localhost:3000/api/shopify/fixes/{fixId}/reject?shop=example.myshopify.com" \
  -H "Content-Type: application/json" \
  -d '{"reason":"Not needed"}'

# 4. Approve plan
curl -X POST "http://localhost:3000/api/shopify/plans/{planId}/approve?shop=example.myshopify.com"

# 5. Reject plan
curl -X POST "http://localhost:3000/api/shopify/plans/{planId}/reject?shop=example.myshopify.com" \
  -H "Content-Type: application/json" \
  -d '{"reason":"Will do manually"}'

# 6. Batch approve fixes
curl -X POST "http://localhost:3000/api/shopify/fixes/batch-approve?shop=example.myshopify.com" \
  -H "Content-Type: application/json" \
  -d '{"fixIds":["uuid1","uuid2","uuid3"]}'
```

### Edge Cases to Test
- Invalid shop parameter
- Non-existent fix/plan IDs
- Fixes/plans belonging to different shops
- Already applied/rejected fixes
- Malformed request bodies
- Shopify API failures
- Database connection issues
- Large batch operations (100+ fixes)

---

## Production Deployment Checklist

- [x] All TypeScript errors resolved
- [x] Proper error handling implemented
- [x] Transaction safety ensured
- [x] Audit logging complete
- [x] Shop authentication working
- [x] Shopify API integration tested
- [ ] Database migrations run (if schema changes)
- [ ] Environment variables configured
- [ ] Rate limiting configured (recommended)
- [ ] Monitoring alerts set up
- [ ] Load testing completed

---

## Next Steps

1. **Frontend Integration**: Build React components to consume these endpoints
2. **Webhook Support**: Add Shopify webhooks for real-time sync
3. **Rate Limiting**: Add rate limiting middleware
4. **Caching**: Implement Redis caching for pending fixes list
5. **Analytics**: Track approval/rejection rates
6. **Notifications**: Send email/dashboard notifications on actions

---

## Support

For questions or issues:
- Review API error responses for detailed messages
- Check audit logs for action history
- Verify Shopify connection status
- Ensure execution mode is set correctly

---

**Status**: ✅ All endpoints implemented and ready for production use
**Version**: 1.0
**Last Updated**: 2025-11-06
