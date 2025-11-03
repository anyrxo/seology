# Page Catalog

Complete documentation of all pages in the SEOLOGY.AI application.

## Table of Contents

- [Marketing Pages](#marketing-pages)
  - [Landing Page](#landing-page)
  - [Pricing Page](#pricing-page)
  - [Features Page](#features-page)
  - [About Page](#about-page)
  - [Docs Page](#docs-page)
- [Authentication Pages](#authentication-pages)
  - [Sign In](#sign-in)
  - [Sign Up](#sign-up)
- [User Dashboard Pages](#user-dashboard-pages)
  - [Dashboard Overview](#dashboard-overview)
  - [Sites List](#sites-list)
  - [Connect Site](#connect-site)
  - [Site Details](#site-details)
  - [Issues List](#issues-list)
  - [Fixes List](#fixes-list)
  - [Analytics](#analytics)
  - [AI Analysis](#ai-analysis)
  - [Billing](#billing)
  - [Settings](#settings)
  - [Notifications](#notifications)
  - [Onboarding Wizard](#onboarding-wizard)
- [Admin Pages](#admin-pages)
  - [Admin Dashboard](#admin-dashboard)
  - [Admin Users](#admin-users)
  - [Admin Sites](#admin-sites)
  - [Admin Jobs](#admin-jobs)
  - [Admin Analytics](#admin-analytics)
  - [Admin Broadcast](#admin-broadcast)

---

## Marketing Pages

### Landing Page

**Path**: `/`
**File**: `app/page.tsx` or `app/(marketing)/page.tsx`
**Auth Required**: No

#### Purpose
First page visitors see. Explains SEOLOGY.AI value proposition and drives sign-ups.

#### Key Features
- Hero section with main value proposition
- "How It Works" 3-step process
- Feature grid showcasing 6 main features
- Call-to-action sections
- Navigation bar with pricing/sign-in links

#### Components Used
- `FeatureCard` - Display individual features
- Custom navigation bar
- Inline footer

#### API Endpoints
- None (static marketing page)

#### Props/Data Requirements
- User session checked via Clerk `auth()` - redirects to dashboard if logged in

#### Performance Notes
- Server-side rendered (SSR)
- Minimal JavaScript - mostly static content
- Should be optimized for SEO

#### Accessibility Notes
- Semantic HTML headings (h1, h2, h3)
- Focus states on CTAs
- Sufficient color contrast on gradient backgrounds

#### Code Example
```tsx
// Redirect logged-in users
const session = await auth()
if (session.userId) {
  redirect('/dashboard')
}

// Simple marketing content with CTAs
<Link href="/sign-up" className="bg-blue-600...">
  Get Started Free
</Link>
```

---

### Pricing Page

**Path**: `/pricing`
**File**: `app/pricing/page.tsx`
**Auth Required**: No (redirects to `/dashboard/billing` if logged in)

#### Purpose
Display pricing tiers and plan features to help users choose the right plan.

#### Key Features
- Three pricing tiers (Starter $29, Growth $99, Scale $299)
- Feature comparison for each tier
- FAQ section answering common billing questions
- Popular plan badge on Growth tier
- CTA buttons for sign-up or contact sales

#### Components Used
- `PricingCard` - Custom component for plan display
- `FAQItem` - Custom component for FAQ accordion

#### API Endpoints
- None (static pricing page)

#### Props/Data Requirements
- User session - redirects logged-in users to billing page

#### Performance Notes
- SSR for SEO optimization
- Static content - no client-side fetching

#### Accessibility Notes
- Clear pricing information
- Keyboard navigable CTAs
- Screen reader friendly FAQ items

#### Code Example
```tsx
<PricingCard
  name="Growth"
  price={99}
  description="For growing businesses"
  features={['Up to 10 sites', '5,000 fixes/month', ...]}
  popular={true}
/>
```

---

### Features Page

**Path**: `/features`
**File**: `app/(marketing)/features/page.tsx`
**Auth Required**: No

#### Purpose
Detailed showcase of product features and capabilities.

#### Key Features
- Feature highlights with descriptions
- Use case scenarios
- Platform integration showcase
- Visual examples of features

#### Components Used
- `MarketingLayout` - Consistent marketing page wrapper
- `FeatureCard` - Feature display components
- `CTASection` - Call-to-action sections

#### API Endpoints
- None

#### Performance Notes
- Optimized images for feature demonstrations
- Lazy loading for below-fold content

---

### About Page

**Path**: `/about`
**File**: `app/(marketing)/about/page.tsx`
**Auth Required**: No

#### Purpose
Company story, mission, and team information.

#### Key Features
- Company mission statement
- Team member profiles
- Company values
- Contact information

#### Components Used
- `MarketingLayout`
- Custom team member cards

---

### Docs Page

**Path**: `/docs` or `/docs.html`
**File**: `app/docs/page.tsx`
**Auth Required**: No

#### Purpose
Public documentation and help resources.

#### Key Features
- Getting started guides
- Integration tutorials
- API documentation links
- Video tutorials

#### Components Used
- Documentation navigation
- Code examples
- Step-by-step guides

---

## Authentication Pages

### Sign In

**Path**: `/sign-in`
**File**: `app/(auth)/sign-in/[[...sign-in]]/page.tsx`
**Auth Required**: No

#### Purpose
User authentication via Clerk.

#### Key Features
- Email/password login
- Social login options (Google, GitHub, etc.)
- "Forgot password" flow
- Link to sign-up page

#### Components Used
- `<SignIn />` from `@clerk/nextjs`

#### API Endpoints
- Clerk handles authentication API calls

#### Props/Data Requirements
None - Clerk component handles everything

#### Performance Notes
- Clerk component loads external resources
- Consider preconnect to Clerk domains

#### Accessibility Notes
- Clerk component is WCAG compliant
- Keyboard navigation support

---

### Sign Up

**Path**: `/sign-up`
**File**: `app/(auth)/sign-up/[[...sign-up]]/page.tsx`
**Auth Required**: No

#### Purpose
New user registration via Clerk.

#### Key Features
- Email/password registration
- Social sign-up options
- Email verification
- Link to sign-in page

#### Components Used
- `<SignUp />` from `@clerk/nextjs`

#### API Endpoints
- Clerk handles registration API calls
- Webhook to `/api/webhooks/clerk` creates user in database

---

## User Dashboard Pages

### Dashboard Overview

**Path**: `/dashboard`
**File**: `app/dashboard/page.tsx`
**Auth Required**: Yes

#### Purpose
Main dashboard showing user's SEO automation overview and quick actions.

#### Key Features
- Welcome message with user's first name
- 4 stat cards: Sites Connected, Issues Detected, Fixes Applied, Usage This Month
- Quick action cards for common tasks
- Recent activity list showing connected sites
- Empty state when no sites connected

#### Components Used
- `StatCard` - Displays key metrics
- `QuickActionCard` - Clickable action cards
- Custom activity list items

#### API Endpoints
None - data fetched server-side

#### Props/Data Requirements
```tsx
// Fetches from database
const dbUser = await db.user.findUnique({
  where: { clerkId: userId },
  include: {
    connections: {
      include: {
        issues: { where: { status: { not: 'FIXED' } } },
        fixes: { /* this month */ }
      }
    }
  }
})
```

#### Performance Notes
- Server component - no client-side JavaScript for data
- Database query includes necessary relations
- Consider caching user stats

#### Accessibility Notes
- Semantic heading structure
- Color-coded status indicators with text labels
- Keyboard navigable action cards

#### Code Example
```tsx
<StatCard
  title="Sites Connected"
  value={sitesCount.toString()}
  icon="🌐"
  trend={sitesCount > 0 ? `${sitesCount} active` : 'Get started'}
  trendUp={true}
/>
```

---

### Sites List

**Path**: `/dashboard/sites`
**File**: `app/dashboard/sites/page.tsx`
**Auth Required**: Yes

#### Purpose
Display all connected sites/stores with status and metrics.

#### Key Features
- Grid of site cards showing domain, platform, status
- Active issues and total fixes counters
- Last sync timestamp
- Empty state with connection options
- "Connect New Site" CTA button
- Platform icons (Shopify, WordPress, Custom)

#### Components Used
- `SiteCard` - Individual site display
- `ConnectionOption` - Empty state connection buttons
- `FeatureCard` - Feature highlights in empty state

#### API Endpoints
None - data fetched server-side

#### Props/Data Requirements
```tsx
const user = await db.user.findUnique({
  where: { clerkId: userId },
  include: {
    connections: {
      include: {
        issues: { where: { status: { not: 'FIXED' } } },
        _count: { select: { issues: true, fixes: true } }
      }
    }
  }
})
```

#### Performance Notes
- Displays last sync date - consider real-time sync status
- Card grid responsive (1 col mobile, 2 tablet, 3 desktop)

#### Accessibility Notes
- Each site card is a clickable link
- Status badges have semantic colors and text
- Platform icons have text alternatives

#### Code Example
```tsx
<SiteCard
  id={connection.id}
  platform={connection.platform}
  domain={connection.domain}
  status={connection.status}
  activeIssues={connection.issues.length}
/>
```

---

### Connect Site

**Path**: `/dashboard/sites/connect`
**File**: `app/dashboard/sites/connect/page.tsx`
**Auth Required**: Yes

#### Purpose
Guide users through connecting a new site (Shopify, WordPress, or Magic.js).

#### Key Features
- Platform selection (Shopify, WordPress, Custom)
- OAuth flow for Shopify
- REST API credentials form for WordPress
- Magic.js snippet generator for custom sites
- Connection testing
- Success/error feedback

#### Components Used
- Platform selection buttons
- Form inputs (URL, credentials)
- Code snippet display
- Loading states during connection

#### API Endpoints
- `/api/auth/shopify` - Initiate Shopify OAuth
- `/api/auth/shopify/callback` - OAuth callback
- `/api/sites` (POST) - Create site connection

#### Props/Data Requirements
- Form state for credentials
- Connection status tracking

#### Performance Notes
- OAuth redirects can be slow - show loading states
- Test connection before saving

#### Accessibility Notes
- Form validation with error messages
- Clear instructions for each platform
- Focus management through multi-step flow

---

### Site Details

**Path**: `/dashboard/sites/[id]`
**File**: `app/dashboard/sites/[id]/page.tsx`
**Auth Required**: Yes

#### Purpose
Detailed view of a single site with issues, fixes, and settings.

#### Key Features
- Site overview (domain, platform, status)
- Issues list for this site
- Applied fixes history
- Analytics specific to site
- Disconnect/reconnect options
- Trigger manual scan button

#### Components Used
- Site header with metadata
- Issue cards/table
- Fix history list
- Charts for site analytics

#### API Endpoints
- `/api/sites/[id]` (GET) - Fetch site details
- `/api/sites/[id]/analyze` (POST) - Trigger analysis
- `/api/sites/[id]` (DELETE) - Disconnect site

#### Props/Data Requirements
```tsx
params: { id: string } // Site ID from URL
```

#### Performance Notes
- Large issue lists should be paginated
- Consider lazy loading fix history

#### Accessibility Notes
- Breadcrumb navigation back to sites list
- Action buttons clearly labeled

---

### Issues List

**Path**: `/dashboard/issues`
**File**: `app/dashboard/issues/page.tsx`
**Auth Required**: Yes

#### Purpose
Aggregated view of all SEO issues across all connected sites.

#### Key Features
- Issue statistics (Total, Critical, Warning, Info)
- Filterable table by severity, type, site
- "Scan All Sites" action button
- Empty state when no issues
- Issue type breakdown chart
- "How It Works" explanation section

#### Components Used
- `IssueStatCard` - Severity statistics
- `IssueTypeRow` - Issue type breakdown
- Commented-out table for future use

#### API Endpoints
- `/api/issues` - Fetch all user's issues
- POST to trigger scans

#### Props/Data Requirements
```tsx
// Should fetch from API or database
const issues = await db.issue.findMany({
  where: {
    connection: { userId },
    status: { not: 'FIXED' }
  }
})
```

#### Performance Notes
- Currently shows empty state
- Will need pagination for large issue lists
- Filters should work client-side for responsiveness

#### Accessibility Notes
- Filter dropdowns keyboard accessible
- Table should have proper headers when implemented

#### Code Example
```tsx
<IssueStatCard
  title="Critical"
  value="0"
  severity="critical"
/>
```

---

### Fixes List

**Path**: `/dashboard/fixes`
**File**: `app/dashboard/fixes/page.tsx`
**Auth Required**: Yes

#### Purpose
View all applied SEO fixes with status and rollback capability.

#### Key Features
- Fixes history table
- Status indicators (Applied, Pending, Failed, Rolled Back)
- Rollback buttons (within 90-day window)
- Filter by site, date range, status
- Fix details modal
- Before/after comparison

#### Components Used
- Fixes table with sortable columns
- Status badges
- Rollback confirmation dialog
- Fix detail modal

#### API Endpoints
- `/api/fixes` - Get all fixes
- `/api/fixes/[id]/rollback` - Rollback a fix

#### Props/Data Requirements
```tsx
const fixes = await db.fix.findMany({
  where: { connection: { userId } },
  include: { issue: true, connection: true },
  orderBy: { createdAt: 'desc' }
})
```

#### Performance Notes
- Paginate large fix lists
- Cache before/after states efficiently

#### Accessibility Notes
- Rollback actions require confirmation
- Table row focus states
- Screen reader announces status changes

---

### Analytics

**Path**: `/dashboard/analytics`
**File**: `app/dashboard/analytics/page.tsx`
**Auth Required**: Yes

#### Purpose
SEO performance metrics and trend visualization.

#### Key Features
- Traffic trends chart
- Keyword rankings over time
- Issues fixed timeline
- Site-specific analytics
- Date range selector
- Export data functionality

#### Components Used
- `Chart` component from `components/ui/Chart.tsx`
- Date range picker
- Metric cards
- Line/bar charts

#### API Endpoints
- `/api/analytics/overview` - Overall stats
- `/api/analytics/[siteId]` - Site-specific data
- `/api/analytics/trends` - Time-series data

#### Props/Data Requirements
```tsx
// Analytics data structure
{
  traffic: { date: string, visits: number }[],
  rankings: { keyword: string, position: number }[],
  fixesApplied: { date: string, count: number }[]
}
```

#### Performance Notes
- Chart rendering can be expensive - use React.memo
- Fetch data incrementally for large date ranges

#### Accessibility Notes
- Charts should have text alternatives
- Data tables as fallback for screen readers

---

### AI Analysis

**Path**: `/dashboard/ai-analysis`
**File**: `app/dashboard/ai-analysis/page.tsx`
**Auth Required**: Yes

#### Purpose
View Claude AI's analysis and recommendations for SEO improvements.

#### Key Features
- AI-generated insights
- Priority recommendations
- Automatic fix suggestions
- Manual review for complex issues
- Accept/reject recommendations

#### Components Used
- Recommendation cards
- AI insight panels
- Accept/reject action buttons

#### API Endpoints
- `/api/sites/[id]/analyze` - Trigger AI analysis

#### Props/Data Requirements
- Site to analyze
- Previous analysis results

#### Performance Notes
- AI analysis can take time - show progress indicators
- Cache results to avoid re-analysis

---

### Billing

**Path**: `/dashboard/billing`
**File**: `app/dashboard/billing/page.tsx`
**Auth Required**: Yes

#### Purpose
Manage subscription, view usage, and access billing portal.

#### Key Features
- Current plan display
- Usage statistics vs. limits
- Upgrade/downgrade options
- Access to Stripe Customer Portal
- Invoice history
- Payment method management

#### Components Used
- Plan cards
- Usage progress bars
- Billing history table

#### API Endpoints
- `/api/billing/create-checkout` - Stripe checkout session
- `/api/billing/portal` - Stripe customer portal
- `/api/usage` - Current usage stats

#### Props/Data Requirements
```tsx
const user = await db.user.findUnique({
  where: { clerkId: userId },
  include: { subscription: true }
})
```

#### Performance Notes
- Stripe portal redirect can take a moment
- Show loading state during portal creation

#### Accessibility Notes
- Clear pricing information
- Confirm before plan changes
- Accessible invoice table

---

### Settings

**Path**: `/dashboard/settings`
**File**: `app/dashboard/settings/page.tsx`
**Auth Required**: Yes

#### Purpose
User profile and application settings management.

#### Key Features
- Profile information (name, email)
- Execution mode preference (Automatic, Plan, Approve)
- Notification preferences
- API key management
- Team settings
- Account deletion

#### Components Used
- Form inputs
- Toggle switches
- Select dropdowns
- Confirmation dialogs

#### API Endpoints
- `/api/user/profile` - Update user settings
- PATCH requests for individual settings

#### Props/Data Requirements
```tsx
const user = await db.user.findUnique({
  where: { clerkId: userId }
})
```

#### Performance Notes
- Optimistic updates for better UX
- Save settings individually or batched

#### Accessibility Notes
- Form labels properly associated
- Validation error messages
- Keyboard navigation through settings

---

### Notifications

**Path**: `/dashboard/notifications`
**File**: `app/dashboard/notifications/page.tsx`
**Auth Required**: Yes

#### Purpose
View and manage in-app notifications about fixes, issues, and system updates.

#### Key Features
- Notification list (newest first)
- Read/unread status
- Mark as read individually or all
- Notification type icons
- Delete notifications
- Real-time updates

#### Components Used
- `NotificationCenter` from `components/notifications/NotificationCenter.tsx`
- `NotificationActions` from `components/notifications/NotificationActions.tsx`
- Notification list items

#### API Endpoints
- `/api/notifications` (GET) - Fetch notifications
- `/api/notifications/[id]/read` (POST) - Mark as read
- `/api/notifications/read-all` (POST) - Mark all as read

#### Props/Data Requirements
```tsx
const notifications = await db.notification.findMany({
  where: { userId },
  orderBy: { createdAt: 'desc' }
})
```

#### Performance Notes
- Pagination for long notification lists
- Real-time updates via polling or websockets

#### Accessibility Notes
- Notification type conveyed with icons and text
- Keyboard shortcuts for mark as read
- Screen reader announcements for new notifications

---

### Onboarding Wizard

**Path**: `/dashboard/onboarding`
**File**: `app/dashboard/onboarding/page.tsx`
**Auth Required**: Yes

#### Purpose
Guide new users through initial setup and first fix.

#### Key Features
- 7-step wizard flow
- Progress bar showing current step
- Skip to dashboard option
- Step components:
  1. Welcome
  2. Connect Site
  3. Scanning
  4. Review Issues
  5. Execution Mode Selection
  6. First Fix
  7. Complete

#### Components Used
- `WelcomeStep`
- `ConnectSiteStep`
- `ScanningStep`
- `ReviewIssuesStep`
- `ExecutionModeStep`
- `FirstFixStep`
- `CompleteStep`

#### API Endpoints
- Various endpoints called by step components
- `/api/user/profile` to mark onboarding complete

#### Props/Data Requirements
```tsx
interface OnboardingData {
  siteId?: string
  siteName?: string
  platform?: string
  executionMode?: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
  issuesFound?: number
}
```

#### Performance Notes
- Client component for state management
- Progress persisted to prevent data loss
- Lazy load step components

#### Accessibility Notes
- Clear step indicators
- Back/next navigation
- Skip option prominently displayed
- Focus management between steps

#### Code Example
```tsx
const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome')
const [data, setData] = useState<OnboardingData>({})

const handleNext = (stepData?: Partial<OnboardingData>) => {
  if (stepData) {
    setData(prev => ({ ...prev, ...stepData }))
  }
  // Advance to next step
}
```

---

## Admin Pages

### Admin Dashboard

**Path**: `/admin`
**File**: `app/(admin)/admin/page.tsx`
**Auth Required**: Yes (Admin role)

#### Purpose
System-wide overview for administrators.

#### Key Features
- Platform statistics (total users, sites, fixes)
- Recent user activity
- System health indicators
- Quick admin actions
- Revenue metrics

#### Components Used
- `AnalyticsOverview` from `components/admin/AnalyticsOverview.tsx`
- `AdminSidebar` for navigation
- Metric cards

#### API Endpoints
- `/api/admin/analytics` - Platform-wide stats

#### Props/Data Requirements
- Admin role verification via Clerk
- Platform-wide database aggregations

#### Performance Notes
- Cache dashboard stats (refresh every 5-10 minutes)
- Expensive aggregations should be pre-computed

#### Accessibility Notes
- Admin-only notice for screen readers
- Keyboard navigation through stats

---

### Admin Users

**Path**: `/admin/users`
**File**: `app/(admin)/admin/users/page.tsx`
**Auth Required**: Yes (Admin role)

#### Purpose
User management for administrators.

#### Key Features
- User list with search/filter
- User details (plan, sites, usage)
- Manual plan upgrades/downgrades
- Ban/unban users
- View user activity logs
- Impersonate user (for support)

#### Components Used
- User table with sortable columns
- `SearchFilter` component
- User detail modals
- Action buttons

#### API Endpoints
- `/api/admin/users` - List all users
- `/api/admin/users/[userId]` - User details and actions

#### Props/Data Requirements
```tsx
const users = await db.user.findMany({
  include: {
    connections: true,
    subscription: true,
    _count: { select: { connections: true } }
  }
})
```

#### Performance Notes
- Paginate user list
- Server-side search and filtering
- Lazy load user details

#### Accessibility Notes
- Table headers for screen readers
- Confirm destructive actions (ban user)
- Search input properly labeled

---

### Admin Sites

**Path**: `/admin/sites`
**File**: `app/(admin)/admin/sites/page.tsx`
**Auth Required**: Yes (Admin role)

#### Purpose
Monitor all connected sites across platform.

#### Key Features
- All sites list with owner information
- Connection status monitoring
- Force re-sync sites
- Disconnect problematic sites
- View site errors
- Filter by platform, status

#### Components Used
- Sites table
- Status indicators
- Admin action buttons

#### API Endpoints
- `/api/admin/sites` - All sites

#### Props/Data Requirements
```tsx
const sites = await db.connection.findMany({
  include: {
    user: true,
    _count: { select: { issues: true, fixes: true } }
  }
})
```

#### Performance Notes
- Paginate sites list
- Filter on server-side

---

### Admin Jobs

**Path**: `/admin/jobs`
**File**: `app/(admin)/admin/jobs/page.tsx`
**Auth Required**: Yes (Admin role)

#### Purpose
Monitor background job queue and processing.

#### Key Features
- Job queue status (active, completed, failed)
- Job type breakdown
- Retry failed jobs
- View job logs
- Queue health metrics
- Clear old jobs

#### Components Used
- Job status table
- Queue metrics cards
- Job log viewer

#### API Endpoints
- `/api/admin/jobs` - Job queue status
- `/api/jobs/[id]` - Job details

#### Props/Data Requirements
```tsx
const jobs = await db.job.findMany({
  orderBy: { createdAt: 'desc' },
  take: 100
})
```

#### Performance Notes
- Real-time job status updates
- Paginate job history

#### Accessibility Notes
- Job status conveyed with text and color
- Error logs readable by screen readers

---

### Admin Analytics

**Path**: `/admin/analytics`
**File**: `app/(admin)/admin/analytics/page.tsx`
**Auth Required**: Yes (Admin role)

#### Purpose
Platform-wide analytics and reporting.

#### Key Features
- Revenue metrics
- User growth trends
- Fix application rates
- Platform usage by type
- Error rate monitoring
- Export analytics data

#### Components Used
- Chart components
- Metric cards
- Date range selectors

#### API Endpoints
- `/api/admin/analytics` - Aggregated platform data

#### Props/Data Requirements
- Time-series data for charts
- Aggregated metrics

#### Performance Notes
- Pre-compute analytics in background job
- Cache results aggressively

---

### Admin Broadcast

**Path**: `/admin/broadcast`
**File**: `app/(admin)/admin/broadcast/page.tsx`
**Auth Required**: Yes (Admin role)

#### Purpose
Send platform-wide or targeted notifications to users.

#### Key Features
- Create notification broadcasts
- Target by plan, activity, or all users
- Preview notification
- Schedule broadcasts
- View broadcast history
- Track read rates

#### Components Used
- Broadcast form
- User targeting selector
- Preview panel
- Broadcast history table

#### API Endpoints
- `/api/admin/broadcast` (POST) - Create broadcast
- `/api/admin/broadcast` (GET) - Broadcast history

#### Props/Data Requirements
```tsx
interface Broadcast {
  title: string
  message: string
  targetUsers: 'ALL' | 'PLAN' | 'CUSTOM'
  planFilter?: 'STARTER' | 'GROWTH' | 'SCALE'
  userIds?: string[]
  scheduledFor?: Date
}
```

#### Performance Notes
- Large broadcasts should be queued
- Preview generates sample recipient list

#### Accessibility Notes
- Form validation with clear errors
- Preview accessible to screen readers

---

## Summary Statistics

### Page Count by Category

- **Marketing Pages**: 5
- **Authentication Pages**: 2
- **User Dashboard Pages**: 11
- **Admin Pages**: 6
- **Total Pages**: 24

### Auth Requirements

- **Public Pages**: 7 (marketing + auth)
- **Authenticated Pages**: 17 (dashboard + admin)
- **Admin-Only Pages**: 6

### Data Fetching Patterns

- **Server Components (SSR)**: 18 pages
- **Client Components**: 6 pages (onboarding, interactive dashboards)
- **Hybrid**: Some pages use both patterns

### Performance Considerations

- Most dashboard pages fetch data server-side to reduce client-side JavaScript
- Pagination needed for: users list, sites list, issues, fixes, notifications
- Consider implementing data caching for expensive aggregations
- Real-time updates needed for: notifications, job queue status

### Common UI Patterns

- **Empty States**: Used in sites, issues, notifications
- **Loading States**: Needed for async operations
- **Error States**: Form validation and API errors
- **Success Feedback**: Toast notifications for actions
- **Confirmation Dialogs**: For destructive actions (delete, rollback)

---

## Development Notes

### Adding a New Page

1. Create file in appropriate route group: `app/(auth)`, `app/dashboard`, `app/(admin)`, or `app/(marketing)`
2. Determine if page should be Server or Client Component
3. Add authentication check if required
4. Fetch necessary data server-side or via API
5. Implement empty states
6. Add to navigation if needed
7. Update this catalog

### Page Layout Hierarchy

```
app/layout.tsx (root)
├── app/(marketing)/layout.tsx (marketing pages)
├── app/(auth)/[...]/page.tsx (auth pages - Clerk components)
├── app/dashboard/layout.tsx (dashboard layout with sidebar)
│   └── app/dashboard/*/page.tsx (dashboard pages)
└── app/(admin)/admin/layout.tsx (admin layout with sidebar)
    └── app/(admin)/admin/*/page.tsx (admin pages)
```

### Navigation Structure

**Marketing**: Top navbar → Home, Pricing, Features, About, Docs, Sign In, Sign Up

**Dashboard**: Left sidebar → Dashboard, Sites, Issues, Fixes, Analytics, AI Analysis, Billing, Settings, Notifications

**Admin**: Left sidebar → Dashboard, Users, Sites, Jobs, Analytics, Broadcast

