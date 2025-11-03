# SEOLOGY.AI Notifications System

Complete real-time in-app notification center with toast notifications.

## Overview

The notifications system provides:
- **In-app notification center** with bell icon and dropdown
- **Toast notifications** for quick feedback
- **Real-time updates** via polling (30-second intervals)
- **Unread badge** on notification bell
- **Mark as read** functionality
- **Comprehensive notification types** for all system events

---

## 1. Notification Types

Defined in `lib/notifications.ts`:

```typescript
enum NotificationType {
  // Fix-related
  FIX_APPLIED              // "SEO fix applied to Product X"
  FIX_FAILED               // "Failed to apply fix: [reason]"
  FIX_REQUIRES_APPROVAL    // (APPROVE mode) "Fix requires your approval"
  PLAN_READY               // (PLAN mode) "Fix plan ready for review"

  // Job-related
  CRAWL_COMPLETE           // "Site crawl completed: 45 pages found"
  ANALYSIS_COMPLETE        // "Analysis complete: 12 issues detected"
  JOB_FAILED               // "Job failed: [details]"

  // Usage/Billing
  USAGE_WARNING            // "70% of monthly fixes used"
  USAGE_LIMIT              // "Monthly limit reached"
  PAYMENT_FAILED           // "Payment failed"
  SUBSCRIPTION_RENEWED     // "Subscription renewed"

  // System
  ISSUE_DETECTED           // "New SEO issue detected"
  SITE_HEALTH              // "Site health score changed"
  SYSTEM_ANNOUNCEMENT      // Admin broadcasts
  SITE_CONNECTED           // "Site connected successfully"
}
```

---

## 2. Backend Implementation

### Core Functions (`lib/notifications.ts`)

```typescript
// Create notification
createNotification({
  userId: string
  type: NotificationType
  title: string
  message: string
  actionUrl?: string
  actionLabel?: string
  metadata?: Record<string, any>
})

// Get notifications
getNotifications(userId, { limit?, offset?, unreadOnly? })

// Get unread count
getUnreadCount(userId)

// Mark as read
markAsRead(notificationId, userId)

// Mark all as read
markAllAsRead(userId)

// Clean up old notifications
cleanupOldNotifications(daysOld = 30)
```

### Helper Functions

Pre-built helper functions for common notification scenarios:

- `notifyFixApplied()` - When a fix is successfully applied
- `notifyFixFailed()` - When a fix fails
- `notifySiteConnected()` - When a site connects
- `notifyAnalysisComplete()` - When analysis finishes
- `notifyUsageLimitApproaching()` - When approaching usage limits
- `notifyPlanUpgraded()` - When plan is upgraded
- `notifyFixPendingApproval()` - When fix needs approval

---

## 3. API Routes

All routes in `app/api/notifications/`:

### GET /api/notifications
Get user's notifications (paginated)

**Query Parameters:**
- `limit` (default: 20)
- `offset` (default: 0)
- `unreadOnly` (boolean)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "notification-id",
      "type": "FIX_APPLIED",
      "title": "SEO Fix Applied",
      "message": "Successfully applied fix for: Missing meta title",
      "actionUrl": "/dashboard/sites/123",
      "read": false,
      "createdAt": "2025-11-03T10:30:00Z"
    }
  ],
  "meta": {
    "total": 45,
    "limit": 20,
    "offset": 0
  }
}
```

### GET /api/notifications/unread-count
Get unread notification count

**Response:**
```json
{
  "success": true,
  "data": { "count": 5 }
}
```

### PATCH /api/notifications/[id]/read
Mark specific notification as read

**Response:**
```json
{
  "success": true
}
```

### PATCH /api/notifications/read-all
Mark all notifications as read

**Response:**
```json
{
  "success": true
}
```

---

## 4. Frontend Components

### NotificationCenter (`components/notifications/NotificationCenter.tsx`)

**Features:**
- Bell icon with unread badge
- Dropdown panel with notification list
- Real-time updates (polls every 30 seconds)
- Mark as read on click
- "Mark all as read" action
- Empty state
- Click notification → navigate to actionUrl

**Usage:**
```tsx
import NotificationCenter from '@/components/notifications/NotificationCenter'

<NotificationCenter />
```

**Placement:**
Add to dashboard header/nav bar for persistent access.

### Toast Notifications (`components/notifications/Toast.tsx`)

**Features:**
- Success/error/info/warning toasts
- Auto-dismiss after 5-7 seconds
- Action buttons support
- Promise-based toasts for async operations
- Custom styling

**Usage:**
```tsx
import { toast } from '@/components/notifications/Toast'

// Success toast
toast.success('SEO fix applied successfully',
  'Meta title updated on Product X'
)

// Error toast
toast.error('Failed to apply fix', error.message)

// Info toast
toast.info('Scanning site...', 'This may take a few minutes')

// Warning toast
toast.warning('Approaching usage limit',
  "You've used 80% of your monthly fixes"
)

// Loading toast
const loadingToast = toast.loading('Applying fix...')
// Later: dismiss it or update to success/error

// Promise toast (automatic success/error handling)
toast.promise(
  applyFixAsync(),
  {
    loading: 'Applying fix...',
    success: 'Fix applied successfully!',
    error: 'Failed to apply fix'
  }
)

// Custom toast with action button
toast.custom('Fix requires approval', {
  description: 'Review and approve this SEO fix',
  action: {
    label: 'Review',
    onClick: () => router.push('/dashboard/fixes')
  }
})
```

### ToastProvider (`components/notifications/Toast.tsx`)

Add to root layout (`app/layout.tsx`):

```tsx
import { ToastProvider } from '@/components/notifications/Toast'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
```

---

## 5. Integration Guide

### Step 1: Add ToastProvider to Layout

In `app/layout.tsx`:
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

### Step 2: Add NotificationCenter to Dashboard Header

In `app/dashboard/layout.tsx` or dashboard header component:
```tsx
import NotificationCenter from '@/components/notifications/NotificationCenter'

// In your header/nav
<nav className="flex items-center gap-4">
  <NotificationCenter />
  {/* Other nav items */}
</nav>
```

### Step 3: Create Notifications in Your Code

Example: When a fix is applied

```tsx
import { notifyFixApplied } from '@/lib/notifications'
import { toast } from '@/components/notifications/Toast'

// Apply fix
const result = await applyFix(issueId)

if (result.success) {
  // Create in-app notification
  await notifyFixApplied(
    userId,
    connectionId,
    fixId,
    'Missing meta title',
    'Added SEO-optimized title'
  )

  // Show toast for immediate feedback
  toast.success('SEO fix applied successfully', {
    description: 'Meta title updated',
    action: {
      label: 'View',
      onClick: () => router.push(`/dashboard/sites/${connectionId}`)
    }
  })
} else {
  toast.error('Failed to apply fix', result.message)
}
```

---

## 6. Notification Creation Examples

### Fix Applied
```typescript
import { NotificationType, createNotification } from '@/lib/notifications'

await createNotification({
  userId,
  type: NotificationType.FIX_APPLIED,
  title: 'SEO Fix Applied',
  message: `Successfully fixed: ${issueTitle}`,
  actionUrl: `/dashboard/sites/${siteId}`
})
```

### Crawl Complete
```typescript
await createNotification({
  userId,
  type: NotificationType.CRAWL_COMPLETE,
  title: 'Site Crawl Completed',
  message: `Found ${pagesFound} pages and ${issuesFound} issues`,
  actionUrl: `/dashboard/sites/${siteId}/issues`
})
```

### Usage Warning
```typescript
await createNotification({
  userId,
  type: NotificationType.USAGE_WARNING,
  title: 'Approaching Usage Limit',
  message: `You've used ${percentage}% of your monthly fixes`,
  actionUrl: '/dashboard/billing'
})
```

### Plan Ready (PLAN execution mode)
```typescript
await createNotification({
  userId,
  type: NotificationType.PLAN_READY,
  title: 'Fix Plan Ready for Review',
  message: `${fixCount} fixes are ready to apply`,
  actionUrl: `/dashboard/plans/${planId}`
})
```

---

## 7. Database Schema

The `Notification` model in `prisma/schema.prisma`:

```prisma
model Notification {
  id     String @id @default(uuid())
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  type      String  // NotificationType enum value
  title     String
  message   String
  actionUrl String? // Optional link to relevant page

  read Boolean @default(false)

  createdAt DateTime @default(now())

  @@index([userId])
  @@index([read])
}
```

---

## 8. Real-Time Updates

The NotificationCenter polls for updates every 30 seconds:

```typescript
useEffect(() => {
  if (user) {
    fetchNotifications()
    fetchUnreadCount()

    const interval = setInterval(() => {
      fetchUnreadCount()
      if (isOpen) {
        fetchNotifications()
      }
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }
}, [user, isOpen])
```

**Future Enhancement:** Replace polling with WebSocket/Server-Sent Events for true real-time updates.

---

## 9. Notification Icons

The system includes visual icons for different notification types:

- `FIX_APPLIED` → ✅
- `FIX_FAILED` → ❌
- `CRAWL_COMPLETE` → 🔍
- `ANALYSIS_COMPLETE` → 📊
- `USAGE_WARNING` → ⚠️
- `SITE_CONNECTED` → 🔗
- `PLAN_READY` → 📋
- `ISSUE_DETECTED` → 🔴
- Default → 📬

---

## 10. Styling

The components use Tailwind CSS with a dark theme matching SEOLOGY.AI's design:

- Background: `bg-gray-900`
- Border: `border-gray-800`
- Text: `text-white` / `text-gray-400`
- Accent: `bg-blue-500` for unread indicators
- Hover: `hover:bg-gray-800`

Toast notifications use Sonner's built-in styling with custom dark theme overrides.

---

## 11. Testing

### Manual Testing Checklist

- [ ] Bell icon appears in dashboard header
- [ ] Unread count badge shows correct number
- [ ] Clicking bell opens dropdown panel
- [ ] Notifications load correctly
- [ ] Clicking notification marks it as read
- [ ] Unread badge updates when marking as read
- [ ] "Mark all as read" works correctly
- [ ] Clicking notification navigates to actionUrl
- [ ] Empty state shows when no notifications
- [ ] Real-time polling works (count updates every 30s)
- [ ] Toast notifications appear and auto-dismiss
- [ ] Toast action buttons work correctly

### API Testing

```bash
# Get notifications
curl http://localhost:3000/api/notifications \
  -H "Cookie: __session=..."

# Get unread count
curl http://localhost:3000/api/notifications/unread-count \
  -H "Cookie: __session=..."

# Mark as read
curl -X PATCH http://localhost:3000/api/notifications/{id}/read \
  -H "Cookie: __session=..."

# Mark all as read
curl -X PATCH http://localhost:3000/api/notifications/read-all \
  -H "Cookie: __session=..."
```

---

## 12. Files Created/Modified

### New Files
- `lib/notifications.ts` - Backend notification functions (enhanced)
- `app/api/notifications/route.ts` - List notifications
- `app/api/notifications/unread-count/route.ts` - Get unread count
- `app/api/notifications/[id]/read/route.ts` - Mark single as read
- `app/api/notifications/read-all/route.ts` - Mark all as read
- `components/notifications/NotificationCenter.tsx` - Main UI component (enhanced)
- `components/notifications/Toast.tsx` - Toast notification wrapper

### Modified Files
- `package.json` - Added `sonner` dependency
- `prisma/schema.prisma` - Notification model (already existed)

---

## 13. Performance Considerations

- **Polling Interval:** 30 seconds balances real-time feel with server load
- **Notification Limit:** API returns max 20 notifications per request
- **Cleanup:** Old read notifications auto-deleted after 30 days (via `cleanupOldNotifications`)
- **Database Indexes:** `userId` and `read` fields indexed for fast queries

---

## 14. Future Enhancements

1. **WebSocket Integration** - Replace polling with real-time push
2. **Notification Preferences** - Let users customize which notifications they receive
3. **Email Digests** - Daily/weekly email summaries
4. **Push Notifications** - Browser push notifications for critical events
5. **Notification Groups** - Group related notifications together
6. **Rich Media** - Add images/thumbnails to notifications
7. **Notification History Page** - Full-page view of all notifications with filtering
8. **Mark as unread** - Allow users to mark notifications as unread

---

## 15. Troubleshooting

### Notifications not appearing
- Check that `createNotification()` is being called with correct `userId`
- Verify database has notification records
- Check browser console for API errors
- Ensure user is authenticated

### Unread count not updating
- Check that polling interval is running (30s)
- Verify `/api/notifications/unread-count` endpoint returns correct data
- Check browser console for fetch errors

### Toast not showing
- Ensure `<ToastProvider />` is added to root layout
- Check that `toast.*()` methods are being called correctly
- Verify `sonner` package is installed

---

## Summary

The SEOLOGY.AI notifications system provides a complete solution for keeping users informed of system events through:

1. **In-app notification center** - Persistent bell icon with dropdown
2. **Toast notifications** - Quick feedback for immediate actions
3. **Comprehensive notification types** - Cover all system events
4. **Real-time updates** - 30-second polling for fresh data
5. **Clean API** - Simple backend functions and REST endpoints
6. **Responsive UI** - Tailwind-styled dark theme components

The system is production-ready and fully integrated with the existing SEOLOGY.AI architecture.
