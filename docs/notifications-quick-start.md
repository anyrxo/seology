# Notifications Quick Start Guide

## Setup (One-Time)

### 1. Add ToastProvider to Layout

**File:** `app/layout.tsx`
```tsx
import { ToastProvider } from '@/components/notifications/Toast'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
```

### 2. Add NotificationCenter to Dashboard

**File:** `app/dashboard/layout.tsx` or your dashboard header component
```tsx
import NotificationCenter from '@/components/notifications/NotificationCenter'

// In your header/nav
<NotificationCenter />
```

---

## Usage Examples

### In-App Notifications

```typescript
import { createNotification, NotificationType } from '@/lib/notifications'

// Basic notification
await createNotification({
  userId: user.id,
  type: NotificationType.FIX_APPLIED,
  title: 'SEO Fix Applied',
  message: 'Successfully fixed: Missing meta title',
  actionUrl: `/dashboard/sites/${siteId}`
})

// Use helper functions (recommended)
import { notifyFixApplied, notifyFixFailed } from '@/lib/notifications'

await notifyFixApplied(userId, connectionId, fixId, 'Missing meta title')
await notifyFixFailed(userId, connectionId, fixId, 'Missing meta title', errorMessage)
```

### Toast Notifications

```typescript
import { toast } from '@/components/notifications/Toast'

// Success
toast.success('Fix applied successfully')

// Error
toast.error('Failed to apply fix', error.message)

// Info
toast.info('Scanning site...', 'This may take a few minutes')

// Warning
toast.warning('Approaching usage limit', "You've used 80% of your fixes")

// With action button
toast.custom('Fix requires approval', {
  description: 'Review and approve this SEO fix',
  action: {
    label: 'Review',
    onClick: () => router.push('/dashboard/fixes')
  }
})

// Promise-based (automatic handling)
toast.promise(
  applyFixAsync(),
  {
    loading: 'Applying fix...',
    success: 'Fix applied!',
    error: 'Failed to apply fix'
  }
)
```

---

## Common Patterns

### When a fix is applied
```typescript
// Backend
await notifyFixApplied(userId, connectionId, fixId, issueTitle)

// Frontend (for immediate feedback)
toast.success('SEO fix applied', 'Meta title updated')
```

### When a job completes
```typescript
await createNotification({
  userId,
  type: NotificationType.CRAWL_COMPLETE,
  title: 'Site Crawl Completed',
  message: `Found ${pagesFound} pages and ${issuesFound} issues`,
  actionUrl: `/dashboard/sites/${siteId}/issues`
})
```

### When approaching usage limits
```typescript
import { notifyUsageLimitApproaching } from '@/lib/notifications'

await notifyUsageLimitApproaching(userId, 'fixes', 80) // 80% used
```

---

## All Notification Types

```typescript
enum NotificationType {
  // Fix-related
  FIX_APPLIED
  FIX_FAILED
  FIX_REQUIRES_APPROVAL
  PLAN_READY

  // Job-related
  CRAWL_COMPLETE
  ANALYSIS_COMPLETE
  JOB_FAILED

  // Usage/Billing
  USAGE_WARNING
  USAGE_LIMIT
  PAYMENT_FAILED
  SUBSCRIPTION_RENEWED

  // System
  ISSUE_DETECTED
  SITE_HEALTH
  SYSTEM_ANNOUNCEMENT
  SITE_CONNECTED
}
```

---

## API Endpoints

- `GET /api/notifications` - List notifications
- `GET /api/notifications/unread-count` - Get unread count
- `PATCH /api/notifications/[id]/read` - Mark as read
- `PATCH /api/notifications/read-all` - Mark all as read

---

## Helper Functions

Available in `lib/notifications.ts`:

- `notifyFixApplied(userId, connectionId, fixId, issueTitle, description?)`
- `notifyFixFailed(userId, connectionId, fixId, issueTitle, error)`
- `notifySiteConnected(userId, connectionId, siteUrl)`
- `notifyAnalysisComplete(userId, connectionId, siteUrl, issuesFound)`
- `notifyUsageLimitApproaching(userId, limitType, percentage)`
- `notifyPlanUpgraded(userId, planName, oldPlan?)`
- `notifyFixPendingApproval(userId, connectionId, fixId, issueTitle)`

---

## Best Practices

1. **Use helper functions** when available instead of `createNotification()` directly
2. **Combine in-app + toast** for important actions (e.g., fix applied)
3. **In-app only** for background events (e.g., crawl complete)
4. **Toast only** for quick feedback (e.g., button click response)
5. **Always include actionUrl** when there's a relevant page to navigate to
6. **Use appropriate notification type** for proper icon and styling

---

## Need Help?

See full documentation: `NOTIFICATIONS_SYSTEM.md`
