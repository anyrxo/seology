# Seology.ai Notification System

## Overview
Comprehensive real-time notification system for the Seology.ai SaaS platform. Keeps users informed about crawls, fixes, usage limits, payments, and rollback expirations.

## Architecture

### 1. Database Schema (`prisma/schema.prisma`)

**Notification Model:**
```prisma
model Notification {
  id        String           @id @default(uuid())
  userId    String
  type      NotificationType
  message   String
  metadata  Json?
  read      Boolean          @default(false)
  readAt    DateTime?
  createdAt DateTime         @default(now())

  @@map("notifications")
  @@index([userId, read])
  @@index([userId, createdAt])
}

enum NotificationType {
  CRAWL_COMPLETE
  FIX_APPLIED
  FIX_FAILED
  USAGE_WARNING
  USAGE_LIMIT_REACHED
  SUBSCRIPTION_UPDATED
  PAYMENT_FAILED
  ROLLBACK_EXPIRING
}
```

**To apply schema changes:**
```bash
npm run db:push
npm run db:generate
```

---

## 2. Notification Service (`lib/notifications.ts`)

### Core Functions

#### Creating Notifications
```typescript
import { createNotification, NotificationMessages } from '@/lib/notifications'

// Generic create
await createNotification({
  userId: 'user-id',
  type: 'CRAWL_COMPLETE',
  message: 'Site crawl completed. Found 15 SEO issues.',
  metadata: { issueCount: 15, connectionId: 'site-id' }
})
```

#### Helper Functions (Recommended)
```typescript
// After crawl completes
await notifyCrawlComplete(userId, issueCount, connectionId)

// After fix applied
await notifyFixApplied(userId, fixType, fixId)

// After fix fails
await notifyFixFailed(userId, fixType, fixId, errorMessage)

// Usage warning (90% threshold)
await notifyUsageWarning(userId, usagePercent, resourceType)

// Usage limit reached (100%)
await notifyUsageLimitReached(userId, resourceType)

// Subscription updated
await notifySubscriptionUpdated(userId, planName)

// Payment failed
await notifyPaymentFailed(userId)

// Rollback expiring (7 days warning)
await notifyRollbackExpiring(userId, daysLeft, fixId)
```

#### Reading Notifications
```typescript
// Get unread notifications
const unread = await getUnreadNotifications(userId)

// Get unread count
const count = await getUnreadCount(userId)

// Get notification history (paginated)
const { notifications, total, hasMore } = await getNotificationHistory(
  userId,
  limit: 50,
  offset: 0
)
```

#### Marking as Read
```typescript
// Mark single notification as read
await markAsRead(notificationId)

// Mark all as read for user
await markAllAsRead(userId)
```

---

## 3. API Endpoints

### GET `/api/notifications`
Get user's notifications (paginated).

**Query Parameters:**
- `limit` (optional): Number of notifications to return (default: 50)
- `offset` (optional): Offset for pagination (default: 0)
- `unreadOnly` (optional): Return only unread notifications (boolean)

**Response:**
```json
{
  "notifications": [...],
  "total": 150,
  "hasMore": true
}
```

---

### GET `/api/notifications/unread`
Get unread notification count.

**Response:**
```json
{
  "count": 5
}
```

---

### PATCH `/api/notifications/[id]/read`
Mark a specific notification as read.

**Response:**
```json
{
  "notification": {
    "id": "...",
    "read": true,
    "readAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### PATCH `/api/notifications/read-all`
Mark all notifications as read for the current user.

**Response:**
```json
{
  "success": true,
  "updated": 12
}
```

---

### POST `/api/notifications/test` (Development Only)
Create a test notification. Only works in development mode.

**Request Body:**
```json
{
  "type": "CRAWL_COMPLETE",
  "message": "Test notification message",
  "metadata": { "foo": "bar" }
}
```

---

## 4. UI Components

### NotificationBell (`components/notifications/NotificationBell.tsx`)
The bell icon in the header with unread count badge.

**Features:**
- Displays unread count (shows "9+" if more than 9)
- Opens dropdown on click
- Polls for new notifications every 30 seconds
- Closes when clicking outside

**Usage:**
```tsx
import { NotificationBell } from '@/components/notifications/NotificationBell'

<NotificationBell />
```

---

### NotificationDropdown (`components/notifications/NotificationDropdown.tsx`)
Dropdown that shows recent notifications.

**Features:**
- Shows last 10 notifications
- Mark individual as read on click
- Mark all as read button
- Link to full notification center
- Auto-refreshes when opened

**Props:**
```typescript
interface NotificationDropdownProps {
  onClose?: () => void
}
```

---

### NotificationItem (`components/notifications/NotificationItem.tsx`)
Individual notification display.

**Features:**
- Icon based on notification type
- Visual distinction for unread (blue background)
- Unread indicator dot
- Relative time display ("2h ago", "3d ago")
- Click handler

**Props:**
```typescript
interface NotificationItemProps {
  id: string
  type: NotificationType
  message: string
  read: boolean
  createdAt: Date
  onClick?: () => void
}
```

---

### NotificationCenter (`components/notifications/NotificationCenter.tsx`)
Full-page notification view.

**Features:**
- Filter by all/unread
- Displays unread count badge
- Mark all as read button
- Pagination support
- Loading states
- Empty states

**Usage:**
```tsx
import { NotificationCenter } from '@/components/notifications/NotificationCenter'

// In a page
export default function NotificationsPage() {
  return <NotificationCenter />
}
```

---

## 5. React Hook

### useNotifications (`hooks/useNotifications.ts`)

Custom hook for managing notifications in components.

**Usage:**
```tsx
import { useNotifications } from '@/hooks/useNotifications'

function MyComponent() {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    refresh
  } = useNotifications(30000) // Poll every 30 seconds

  // Use the data...
}
```

**Parameters:**
- `pollingInterval` (optional): Milliseconds between polling (default: 30000)

**Returns:**
- `notifications`: Array of notification objects
- `unreadCount`: Number of unread notifications
- `loading`: Boolean loading state
- `error`: Error message or null
- `markAsRead(id)`: Function to mark notification as read
- `markAllAsRead()`: Function to mark all as read
- `refresh()`: Function to manually refresh

---

## 6. Integration Points

### After Site Crawl Completes (`lib/jobs.ts`)
```typescript
import { notifyCrawlComplete } from '@/lib/notifications'

// In processCrawlJob function
await notifyCrawlComplete(userId, issues.length, siteId)
```

---

### After Fix Applied (`lib/execution-modes.ts`)
```typescript
import { notifyFixApplied, notifyFixFailed } from '@/lib/notifications'

// On success
await notifyFixApplied(userId, fix.type, fix.id)

// On failure
await notifyFixFailed(userId, fix.type, fix.id, result.error)
```

---

### Usage Tracking (`lib/usage.ts`)
```typescript
import { notifyUsageWarning, notifyUsageLimitReached } from '@/lib/notifications'

// After tracking a fix
const usagePercent = (newCount / limits.fixesPerMonth) * 100

if (usagePercent >= 100) {
  await notifyUsageLimitReached(userId, 'fixes')
} else if (usagePercent >= 90) {
  await notifyUsageWarning(userId, Math.round(usagePercent), 'fixes')
}
```

---

### Rollback Expiration Warnings (`lib/jobs.ts`)
```typescript
import { notifyRollbackExpiring } from '@/lib/notifications'

// In cleanup job processor
const daysLeft = Math.ceil(
  (fix.rollbackExpiresAt!.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
)
await notifyRollbackExpiring(userId, daysLeft, fix.id)
```

---

## 7. Notification Types & Triggers

| Type | When Triggered | Message Template | Metadata |
|------|---------------|------------------|----------|
| `CRAWL_COMPLETE` | After site crawl finishes | "Site crawl completed. Found X SEO issues." | `issueCount`, `connectionId` |
| `FIX_APPLIED` | After fix successfully applied | "Fix applied successfully: [type]" | `fixType`, `fixId` |
| `FIX_FAILED` | After fix application fails | "Fix failed: [type] - [error]" | `fixType`, `fixId`, `error` |
| `USAGE_WARNING` | When usage hits 90% | "Approaching [resource] limit (X% used). Consider upgrading." | `usagePercent`, `resourceType` |
| `USAGE_LIMIT_REACHED` | When usage hits 100% | "[Resource] limit reached. Upgrade to continue." | `resourceType` |
| `SUBSCRIPTION_UPDATED` | After plan change | "Your plan has been updated to [plan]." | `planName` |
| `PAYMENT_FAILED` | After payment processing fails | "Payment failed. Please update your payment method." | N/A |
| `ROLLBACK_EXPIRING` | 7 days before rollback expires | "Rollback expires in X days." | `daysLeft`, `fixId` |

---

## 8. Notification Icons

Each notification type has a distinct icon and color:

- **CRAWL_COMPLETE**: Blue Search icon
- **FIX_APPLIED**: Green CheckCircle icon
- **FIX_FAILED**: Red XCircle icon
- **USAGE_WARNING**: Yellow AlertTriangle icon
- **USAGE_LIMIT_REACHED**: Red AlertCircle icon
- **SUBSCRIPTION_UPDATED**: Purple Settings icon
- **PAYMENT_FAILED**: Red CreditCard icon
- **ROLLBACK_EXPIRING**: Orange Info icon

---

## 9. Real-Time Updates

### Current Implementation: Polling
The system uses **polling** (every 30 seconds) for real-time updates.

**Pros:**
- Simple to implement
- Works everywhere
- No external dependencies

**Cons:**
- Not truly real-time
- Extra API calls

### Future Enhancement: WebSockets/SSE
For true real-time notifications, consider:

1. **Pusher** - Managed WebSocket service
2. **Ably** - Real-time messaging platform
3. **Supabase Realtime** - PostgreSQL changes via WebSocket
4. **Server-Sent Events (SSE)** - One-way real-time updates

**Implementation Example (Pusher):**
```typescript
// In NotificationBell component
import Pusher from 'pusher-js'

useEffect(() => {
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
  })

  const channel = pusher.subscribe(`user-${userId}`)
  channel.bind('notification', (data: any) => {
    // Update state with new notification
    setUnreadCount(prev => prev + 1)
    // Optionally show toast
  })

  return () => {
    pusher.unsubscribe(`user-${userId}`)
  }
}, [userId])
```

---

## 10. Email Notifications (Optional)

For critical notifications, send emails using **Resend** or **SendGrid**.

### Setup Resend
```bash
npm install resend
```

**Create email service (`lib/email.ts`):**
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendNotificationEmail(
  to: string,
  subject: string,
  html: string
) {
  await resend.emails.send({
    from: 'Seology <notifications@seology.ai>',
    to,
    subject,
    html,
  })
}
```

**Integration:**
```typescript
// After creating notification
if (type === 'PAYMENT_FAILED' || type === 'USAGE_LIMIT_REACHED') {
  const user = await db.user.findUnique({ where: { id: userId } })
  await sendNotificationEmail(
    user.email,
    'Important: ' + message,
    `<p>${message}</p>`
  )
}
```

---

## 11. Testing

### Test Notification Endpoint (Dev Only)
```bash
# Create test notification
curl -X POST http://localhost:3000/api/notifications/test \
  -H "Content-Type: application/json" \
  -d '{
    "type": "CRAWL_COMPLETE",
    "message": "Test: Site crawl completed with 10 issues",
    "metadata": { "issueCount": 10 }
  }'
```

### Manual Testing Checklist
- [ ] Bell icon appears in header
- [ ] Unread count displays correctly
- [ ] Dropdown opens/closes properly
- [ ] Notifications load in dropdown
- [ ] Click notification marks as read
- [ ] "Mark all as read" works
- [ ] Full notifications page accessible at `/notifications`
- [ ] Filtering (all/unread) works
- [ ] Polling updates count every 30 seconds
- [ ] Icons and colors display correctly
- [ ] Relative time displays correctly

---

## 12. Performance Considerations

### Database Indexes
The schema includes indexes for optimal query performance:
```prisma
@@index([userId, read])    // For filtering unread notifications
@@index([userId, createdAt]) // For pagination by date
```

### Cleanup Old Notifications
Add to monthly cron job:
```typescript
import { deleteOldNotifications } from '@/lib/notifications'

// Delete read notifications older than 90 days
await deleteOldNotifications(90)
```

### Pagination
Always use pagination for notification history:
```typescript
// Good
const { notifications } = await getNotificationHistory(userId, 50, 0)

// Bad (could load thousands of notifications)
const all = await db.notification.findMany({ where: { userId } })
```

---

## 13. Security

### Authentication
All notification endpoints require authentication via Clerk:
```typescript
const { userId } = await auth()
if (!userId) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

### Authorization
Notifications are scoped to the authenticated user:
```typescript
// Always filter by userId
const notifications = await db.notification.findMany({
  where: { userId: userId }
})
```

### Validation
The test endpoint is disabled in production:
```typescript
if (process.env.NODE_ENV === 'production') {
  return NextResponse.json({ error: 'Not available' }, { status: 403 })
}
```

---

## 14. Deployment Checklist

- [ ] Run `npm run db:push` to apply schema
- [ ] Run `npm run db:generate` to update Prisma client
- [ ] Set up cron job for cleanup (monthly)
- [ ] Set up cron job for rollback warnings (daily)
- [ ] Configure polling interval in production (30s recommended)
- [ ] Optional: Set up Resend/SendGrid for emails
- [ ] Optional: Set up Pusher/Ably for real-time
- [ ] Test notification creation after deployment
- [ ] Monitor notification delivery and performance

---

## 15. File Structure

```
app-saas/
├── prisma/
│   └── schema.prisma                   # Notification model
├── lib/
│   ├── notifications.ts                # Core notification service
│   ├── jobs.ts                         # Job processor with notifications
│   ├── execution-modes.ts              # Fix notifications
│   └── usage.ts                        # Usage notifications
├── components/
│   ├── shared/
│   │   └── Header.tsx                  # Header with notification bell
│   └── notifications/
│       ├── NotificationBell.tsx        # Bell icon component
│       ├── NotificationDropdown.tsx    # Dropdown component
│       ├── NotificationItem.tsx        # Single notification
│       └── NotificationCenter.tsx      # Full page view
├── hooks/
│   └── useNotifications.ts             # React hook
├── app/
│   ├── api/
│   │   └── notifications/
│   │       ├── route.ts                # List notifications
│   │       ├── unread/route.ts         # Get unread count
│   │       ├── read-all/route.ts       # Mark all read
│   │       ├── test/route.ts           # Test endpoint (dev)
│   │       └── [id]/
│   │           └── read/route.ts       # Mark single as read
│   └── (dashboard)/
│       └── notifications/
│           └── page.tsx                # Notifications page
└── NOTIFICATIONS-SYSTEM.md             # This documentation
```

---

## 16. Future Enhancements

1. **Real-time with WebSockets**: Replace polling with Pusher/Ably
2. **Email Notifications**: Add Resend integration for critical alerts
3. **In-app Toast Notifications**: Show toast when new notification arrives
4. **Notification Preferences**: Let users customize which notifications they receive
5. **Notification Categories**: Group by type, allow filtering
6. **Rich Notifications**: Add action buttons (e.g., "View Issue", "Upgrade Plan")
7. **Notification Sound**: Optional sound on new notification
8. **Browser Push Notifications**: Web Push API for desktop notifications
9. **Slack/Discord Integration**: Send notifications to team channels
10. **Analytics**: Track notification open rates and engagement

---

## Support

For issues or questions about the notification system:
1. Check this documentation
2. Review code comments in `lib/notifications.ts`
3. Test using `/api/notifications/test` endpoint (dev mode)
4. Check browser console for errors
5. Verify Prisma schema is up to date

---

**Last Updated**: 2025-01-15
**Version**: 1.0.0
