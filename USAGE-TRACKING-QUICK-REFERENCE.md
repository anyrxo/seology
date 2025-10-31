# Usage Tracking System - Quick Reference Guide

## Quick Start

### Check if user can perform action
```typescript
import { checkUsageLimit } from '@/lib/usage'

const limitCheck = await checkUsageLimit(userId, 'fixes')
if (!limitCheck.allowed) {
  // User has reached limit
  console.log(limitCheck.message)
  return
}
```

### Track usage after action
```typescript
import { trackFixApplied, trackAIAnalysis, trackSiteConnected } from '@/lib/usage'

// After applying a fix
await trackFixApplied(userId, siteId)

// After AI analysis
await trackAIAnalysis(userId, siteId)

// After connecting a site
await trackSiteConnected(userId, siteId)
```

### Use in API routes
```typescript
import { checkFixLimit, getUserDbId } from '@/lib/middleware/usage-enforcement'
import { trackFixApplied } from '@/lib/usage'

export async function POST(request: NextRequest) {
  const { userId } = await auth() // Clerk user ID

  // Check limit
  const limitCheck = await checkFixLimit(userId)
  if (limitCheck) {
    return limitCheck // Returns 402 error response
  }

  // Perform action...

  // Track usage
  const userDbId = await getUserDbId(userId)
  if (userDbId) {
    await trackFixApplied(userDbId, siteId)
  }

  return NextResponse.json({ success: true })
}
```

### Display usage in UI
```typescript
import { UsageDashboardCard } from '@/components/usage/UsageDashboardCard'

export default function Page() {
  return (
    <div>
      <UsageDashboardCard />
    </div>
  )
}
```

### Custom usage display
```typescript
import { UsageBar } from '@/components/usage/UsageBar'

<UsageBar
  label="Fixes Applied"
  current={23}
  limit={50}
  unit="fixes"
/>
```

### Check for warnings
```typescript
import { useUsageWarning } from '@/hooks/useUsageWarning'

function MyComponent() {
  const { warnings, hasWarnings } = useUsageWarning()

  return (
    <div>
      {hasWarnings && (
        <Alert>
          {warnings.map(w => (
            <p key={w.type}>{w.message}</p>
          ))}
        </Alert>
      )}
    </div>
  )
}
```

## API Endpoints

### GET /api/usage
Returns current usage statistics for authenticated user.

**Response:**
```json
{
  "success": true,
  "data": {
    "fixesApplied": 23,
    "aiCallsMade": 5,
    "sitesConnected": 2,
    "limits": {
      "sites": 3,
      "fixesPerMonth": 50,
      "aiAnalysesPerMonth": 10
    },
    "percentages": {
      "fixes": 46,
      "aiAnalyses": 50,
      "sites": 66.67
    }
  }
}
```

## Plan Limits Reference

| Feature | Starter | Growth | Scale |
|---------|---------|--------|-------|
| Sites | 3 | 10 | Unlimited |
| Fixes/month | 50 | 200 | 1000 |
| AI Analyses/month | 10 | 50 | 200 |

## Error Responses

### 402 Payment Required
Returned when usage limit is reached.

```json
{
  "success": false,
  "error": "Usage limit reached",
  "message": "You've reached your monthly limit of 50 fixes. Upgrade to apply more fixes.",
  "usage": {
    "current": 50,
    "limit": 50,
    "type": "fixes"
  },
  "upgrade": {
    "message": "Upgrade to Growth plan for 10 sites, 200 fixes/month, and 50 AI analyses/month.",
    "currentPlan": "STARTER"
  }
}
```

## Common Patterns

### Pattern 1: Enforce before, track after
```typescript
// Check limit
const limitCheck = await checkFixLimit(userId)
if (limitCheck) return limitCheck

// Perform action
const result = await applyFix(...)

// Track usage
await trackFixApplied(userDbId, siteId)
```

### Pattern 2: Batch tracking
```typescript
// Apply multiple fixes
const fixCount = await applyMultipleFixes(...)

// Track all at once
for (let i = 0; i < fixCount; i++) {
  await trackFixApplied(userDbId, siteId)
}
```

### Pattern 3: Conditional tracking
```typescript
// Only track on success
const result = await performAction()
if (result.success && userDbId) {
  await trackAIAnalysis(userDbId, siteId)
}
```

## Debugging

### Check current usage
```typescript
import { getUsageStats } from '@/lib/usage'

const stats = await getUsageStats(userId)
console.log('Current usage:', stats)
```

### Manual limit check
```typescript
import { checkUsageLimit } from '@/lib/usage'

const check = await checkUsageLimit(userId, 'fixes')
console.log('Can apply fix?', check.allowed)
console.log('Current:', check.current, 'Limit:', check.limit)
```

### Verify plan limits
```typescript
import { getPlanLimits } from '@/lib/usage'

const limits = getPlanLimits('STARTER')
console.log('Starter limits:', limits)
```

## Monthly Reset

The `resetMonthlyUsage()` function should be called on the 1st of each month:

```typescript
import { resetMonthlyUsage } from '@/lib/usage'

const result = await resetMonthlyUsage()
console.log(`Reset usage for ${result.usersReset} users`)
```

## Important Notes

1. **User IDs**: Functions use database user ID, not Clerk ID
   - Use `getUserDbId(clerkUserId)` to convert

2. **Site Connections**: Tracks current count, not cumulative
   - Shows how many sites are currently connected

3. **Monthly Records**: New record created each month
   - Old records preserved for history

4. **Audit Logs**: All tracking creates audit log entry
   - Check `audit_logs` table for tracking history

5. **Percentages**: Calculated dynamically
   - Not stored in database
   - Always accurate to current limits

## Troubleshooting

### "User not found" error
- Ensure user exists in database
- Check Clerk ID matches database clerkUserId
- User may need to be created on first connection

### Usage not incrementing
- Verify tracking function is called after action
- Check for errors in console
- Ensure userId is correct database ID

### Wrong limits showing
- Verify user's plan in database
- Check `User.plan` field matches expected value
- Ensure plan limits are correctly configured

### 402 errors when shouldn't be limited
- Check current month's usage record
- Verify limit calculation is correct
- May need to manually reset if month transition failed

## Support

For issues or questions:
1. Check audit logs for tracking history
2. Verify database usage records
3. Review error logs for failed tracking
4. Check user's plan and subscription status
