# UX Patterns

Comprehensive guide to user experience patterns and best practices in SEOLOGY.AI.

## Table of Contents

- [Loading States](#loading-states)
- [Empty States](#empty-states)
- [Error States](#error-states)
- [Success Feedback](#success-feedback)
- [Form Patterns](#form-patterns)
- [Navigation Patterns](#navigation-patterns)
- [Data Display Patterns](#data-display-patterns)
- [Confirmation Patterns](#confirmation-patterns)
- [Onboarding Patterns](#onboarding-patterns)

---

## Loading States

### 1. Spinner Loading

Use for short operations (1-5 seconds).

```tsx
import { Loading } from '@/components/ui/loading'

function SitesPage() {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Loading sites..." size="lg" />
      </div>
    )
  }

  return <SitesList sites={sites} />
}
```

**When to use:**
- Initial page load
- Button click actions (use `isLoading` prop)
- Small data fetches

**Best practices:**
- Show descriptive text ("Loading sites..." not just "Loading...")
- Center the spinner vertically and horizontally
- Don't show spinner for <500ms operations
- Replace entire content area, not just part of it

---

### 2. Skeleton Loading

Use for predictable content structure.

```tsx
import { LoadingSkeleton } from '@/components/ui/loading'

function SitesPageSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="bg-gray-900 rounded-lg p-6">
          <LoadingSkeleton className="h-12 w-12 rounded-full mb-4" />
          <LoadingSkeleton className="h-6 w-3/4 mb-2" />
          <LoadingSkeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}

function SitesPage() {
  if (isLoading) {
    return <SitesPageSkeleton />
  }

  return <SitesList sites={sites} />
}
```

**When to use:**
- Initial page load with complex layouts
- Card grids
- Tables
- Lists

**Best practices:**
- Match skeleton to actual content layout
- Use same grid/spacing as real content
- Animate with pulse effect
- Show realistic content proportions

---

### 3. Progress Indicator

Use for long operations with known progress.

```tsx
import { Progress } from '@/components/ui/progress'

function AnalysisProgress({ progress, stage }) {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Analyzing Site</h3>
        <p className="text-gray-400">{stage}</p>
      </div>
      <Progress value={progress} />
      <p className="text-sm text-gray-500 text-center">
        {progress}% complete
      </p>
    </div>
  )
}
```

**Stages example:**
1. Crawling pages... (0-30%)
2. Analyzing content... (30-70%)
3. Generating fixes... (70-100%)

**Best practices:**
- Show current stage description
- Update progress smoothly
- Don't jump backwards
- Show percentage when helpful

---

### 4. Inline Loading

Use for partial page updates.

```tsx
function NotificationsList() {
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  return (
    <div>
      {notifications.map(n => (
        <NotificationItem key={n.id} notification={n} />
      ))}

      {hasMore && (
        <button
          onClick={loadMore}
          disabled={isLoadingMore}
          className="w-full py-3"
        >
          {isLoadingMore ? (
            <div className="flex items-center justify-center gap-2">
              <Loading size="sm" />
              <span>Loading more...</span>
            </div>
          ) : (
            'Load More'
          )}
        </button>
      )}
    </div>
  )
}
```

**When to use:**
- Infinite scroll
- "Load more" buttons
- Real-time updates
- Background refreshes

---

### 5. Optimistic UI

Update UI immediately, revert on error.

```tsx
function FixApproveButton({ fixId }) {
  const [isPending, startTransition] = useTransition()
  const [optimisticStatus, setOptimisticStatus] = useState('pending')

  const handleApprove = () => {
    // Optimistically update UI
    setOptimisticStatus('approved')

    startTransition(async () => {
      try {
        await fetch(`/api/fixes/${fixId}/approve`, { method: 'POST' })
        toast.success('Fix approved')
      } catch (error) {
        // Revert on error
        setOptimisticStatus('pending')
        toast.error('Failed to approve fix')
      }
    })
  }

  return (
    <Button
      onClick={handleApprove}
      disabled={isPending || optimisticStatus === 'approved'}
      variant={optimisticStatus === 'approved' ? 'success' : 'primary'}
    >
      {optimisticStatus === 'approved' ? (
        <>✓ Approved</>
      ) : isPending ? (
        'Approving...'
      ) : (
        'Approve Fix'
      )}
    </Button>
  )
}
```

**Best practices:**
- Only for non-destructive actions
- Always handle errors
- Revert on failure
- Show subtle pending indicator

---

## Empty States

### 1. First-Time Empty State

When user hasn't created anything yet.

```tsx
import { EmptyState } from '@/components/ui/empty-state'
import { Globe } from 'lucide-react'

function SitesEmptyState() {
  return (
    <EmptyState
      icon={Globe}
      title="No sites connected yet"
      description="Connect your first website to start automating SEO fixes with Claude AI"
      action={{
        label: "Connect Your First Site",
        onClick: () => router.push('/dashboard/sites/connect')
      }}
    />
  )
}
```

**Best practices:**
- Use friendly, encouraging tone
- Explain what this section is for
- Provide clear call-to-action
- Use relevant icon
- Don't blame the user

---

### 2. Search/Filter Empty State

When filters return no results.

```tsx
function SearchEmptyState({ searchTerm, onClear }) {
  return (
    <div className="text-center py-12">
      <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">
        No results for "{searchTerm}"
      </h3>
      <p className="text-gray-400 mb-6">
        Try adjusting your search terms or filters
      </p>
      <Button variant="outline" onClick={onClear}>
        Clear Filters
      </Button>
    </div>
  )
}
```

**Best practices:**
- Show what was searched
- Suggest alternatives
- Provide way to clear filters
- Don't say "No results found" (too negative)

---

### 3. All Done Empty State

When user has completed everything.

```tsx
function IssuesEmptyState() {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🎉</div>
      <h3 className="text-xl font-semibold text-white mb-2">
        All caught up!
      </h3>
      <p className="text-gray-400">
        No active SEO issues detected. Great job!
      </p>
    </div>
  )
}
```

**Best practices:**
- Celebrate the achievement
- Positive, encouraging tone
- Consider next steps suggestion

---

### 4. Error Empty State

When something went wrong.

```tsx
function ErrorEmptyState({ onRetry }) {
  return (
    <div className="text-center py-12">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">
        Failed to load sites
      </h3>
      <p className="text-gray-400 mb-6">
        There was a problem loading your sites. Please try again.
      </p>
      <Button onClick={onRetry}>
        Try Again
      </Button>
    </div>
  )
}
```

---

## Error States

### 1. Inline Form Errors

Show errors directly below fields.

```tsx
import { Input } from '@/components/ui/input'

function SiteForm() {
  const [errors, setErrors] = useState({})

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Site URL"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        error={errors.url}
        placeholder="https://example.com"
      />

      <Input
        label="API Key"
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        error={errors.apiKey}
      />

      <Button type="submit">Connect Site</Button>
    </form>
  )
}
```

**Best practices:**
- Show errors after blur or submit attempt
- Clear error when user starts typing
- Use red color and icon
- Be specific ("Email is required" not "Invalid input")

---

### 2. Toast Notifications

For action feedback.

```tsx
import { toast } from '@/components/ui/toast'

async function deleteSite(siteId) {
  try {
    await fetch(`/api/sites/${siteId}`, { method: 'DELETE' })
    toast.success('Site deleted successfully')
    router.push('/dashboard/sites')
  } catch (error) {
    toast.error('Failed to delete site. Please try again.')
  }
}
```

**Error toast types:**
- **Error**: Failed operations
- **Warning**: Partial success or limitations
- **Info**: FYI messages

**Best practices:**
- Auto-dismiss after 5-7 seconds
- Allow manual dismiss
- Don't stack too many toasts
- Keep message concise

---

### 3. Error Boundaries

Catch React errors gracefully.

```tsx
// components/ErrorBoundary.tsx
import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo)
    // Log to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-6">
              We've been notified and are working on a fix.
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

---

### 4. API Error Handling

Consistent error responses.

```tsx
// Pattern for handling API errors
async function fetchSites() {
  try {
    const response = await fetch('/api/sites')

    if (!response.ok) {
      const error = await response.json()

      switch (response.status) {
        case 401:
          router.push('/sign-in')
          toast.error('Please sign in to continue')
          break
        case 403:
          toast.error('You don\'t have permission to access this')
          break
        case 404:
          toast.error('Sites not found')
          break
        case 429:
          toast.error('Too many requests. Please try again later.')
          break
        default:
          toast.error(error.message || 'Something went wrong')
      }

      return null
    }

    return await response.json()
  } catch (error) {
    toast.error('Network error. Please check your connection.')
    return null
  }
}
```

---

## Success Feedback

### 1. Toast Success

Quick confirmation.

```tsx
async function approveFix(fixId) {
  try {
    await fetch(`/api/fixes/${fixId}/approve`, { method: 'POST' })
    toast.success('Fix approved and applied!')
  } catch (error) {
    toast.error('Failed to approve fix')
  }
}
```

---

### 2. Inline Success State

Update button to show success.

```tsx
function SaveButton() {
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    await saveSettings()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Button
      onClick={handleSave}
      variant={saved ? 'success' : 'primary'}
    >
      {saved ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Saved!
        </>
      ) : (
        'Save Changes'
      )}
    </Button>
  )
}
```

---

### 3. Success Page/Modal

For important completions.

```tsx
function OnboardingComplete() {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-3xl font-bold text-white mb-4">
        You're all set!
      </h2>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Your site is connected and we're already analyzing it for SEO issues.
        You'll see your first recommendations soon!
      </p>
      <Button size="lg" onClick={() => router.push('/dashboard')}>
        Go to Dashboard
      </Button>
    </div>
  )
}
```

---

## Form Patterns

### 1. Multi-Step Forms

Break complex forms into steps.

```tsx
function ConnectSiteWizard() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({})

  return (
    <div>
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm">Step {step} of 3</span>
        </div>
        <Progress value={(step / 3) * 100} />
      </div>

      {/* Step content */}
      {step === 1 && (
        <PlatformSelection
          onNext={(platform) => {
            setData({ ...data, platform })
            setStep(2)
          }}
        />
      )}

      {step === 2 && (
        <Credentials
          platform={data.platform}
          onNext={(credentials) => {
            setData({ ...data, credentials })
            setStep(3)
          }}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <Confirmation
          data={data}
          onConfirm={handleSubmit}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  )
}
```

**Best practices:**
- Show progress
- Allow back navigation
- Validate each step
- Save progress
- Clear step transition

---

### 2. Inline Validation

Validate as user types.

```tsx
function EmailInput() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (value) => {
    if (!value) {
      setError('Email is required')
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setError('Please enter a valid email')
    } else {
      setError('')
    }
  }

  return (
    <Input
      label="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={(e) => validateEmail(e.target.value)}
      error={error}
    />
  )
}
```

---

### 3. Dependent Fields

Show/hide fields based on selection.

```tsx
function IntegrationForm() {
  const [platform, setPlatform] = useState('')

  return (
    <div className="space-y-4">
      <Select value={platform} onValueChange={setPlatform}>
        <SelectTrigger>
          <SelectValue placeholder="Select platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="shopify">Shopify</SelectItem>
          <SelectItem value="wordpress">WordPress</SelectItem>
        </SelectContent>
      </Select>

      {platform === 'shopify' && (
        <Input
          label="Store URL"
          placeholder="yourstore.myshopify.com"
        />
      )}

      {platform === 'wordpress' && (
        <>
          <Input label="Site URL" />
          <Input label="Application Password" type="password" />
        </>
      )}
    </div>
  )
}
```

---

### 4. Autosave

Save form data automatically.

```tsx
function SettingsForm() {
  const [settings, setSettings] = useState({})
  const [lastSaved, setLastSaved] = useState(null)

  useEffect(() => {
    const timer = setTimeout(async () => {
      await fetch('/api/settings', {
        method: 'PATCH',
        body: JSON.stringify(settings)
      })
      setLastSaved(new Date())
    }, 1000) // Debounce 1 second

    return () => clearTimeout(timer)
  }, [settings])

  return (
    <div>
      <Input
        label="Display Name"
        value={settings.displayName}
        onChange={(e) => setSettings({
          ...settings,
          displayName: e.target.value
        })}
      />

      {lastSaved && (
        <p className="text-sm text-gray-500 mt-2">
          Last saved: {lastSaved.toLocaleTimeString()}
        </p>
      )}
    </div>
  )
}
```

---

## Navigation Patterns

### 1. Breadcrumbs

Show page hierarchy.

```tsx
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

function SiteDetailsPage({ site }) {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Sites', href: '/dashboard/sites' },
          { label: site.domain }
        ]}
      />

      {/* Page content */}
    </div>
  )
}
```

---

### 2. Tabs

Organize related content.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

function SiteDetails({ site }) {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="issues">Issues</TabsTrigger>
        <TabsTrigger value="fixes">Fixes</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <SiteOverview site={site} />
      </TabsContent>

      <TabsContent value="issues">
        <SiteIssues siteId={site.id} />
      </TabsContent>

      <TabsContent value="fixes">
        <SiteFixes siteId={site.id} />
      </TabsContent>

      <TabsContent value="settings">
        <SiteSettings site={site} />
      </TabsContent>
    </Tabs>
  )
}
```

---

### 3. Sidebar Navigation

Main app navigation.

```tsx
function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'Sites', href: '/dashboard/sites', icon: Globe },
    { label: 'Issues', href: '/dashboard/issues', icon: AlertCircle },
    { label: 'Fixes', href: '/dashboard/fixes', icon: Check },
  ]

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800">
      <nav className="p-4 space-y-2">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
```

---

## Data Display Patterns

### 1. Tables with Sorting

```tsx
function SitesTable({ sites }) {
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const sorted = [...sites].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1
    return a[sortBy] > b[sortBy] ? order : -order
  })

  const toggleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(key)
      setSortOrder('asc')
    }
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th onClick={() => toggleSort('name')}>
            Name
            {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => toggleSort('issues')}>
            Issues
            {sortBy === 'issues' && (sortOrder === 'asc' ? '↑' : '↓')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sorted.map(site => (
          <tr key={site.id}>
            <td>{site.name}</td>
            <td>{site.issues}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

---

### 2. Pagination

```tsx
function PaginatedList({ items, itemsPerPage = 10 }) {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div>
      <div className="space-y-4">
        {currentItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <span className="text-sm text-gray-400">
          Page {page} of {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
```

---

## Confirmation Patterns

### 1. Destructive Action Confirmation

```tsx
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

function DeleteSiteButton({ siteId, siteName }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleDelete = async () => {
    await fetch(`/api/sites/${siteId}`, { method: 'DELETE' })
    toast.success('Site deleted')
    router.push('/dashboard/sites')
  }

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setConfirmOpen(true)}
      >
        Delete Site
      </Button>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleDelete}
        title="Delete Site"
        description={`Are you sure you want to delete "${siteName}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  )
}
```

---

### 2. Leave Confirmation

Warn about unsaved changes.

```tsx
function EditForm() {
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasChanges])

  return (
    <form onChange={() => setHasChanges(true)}>
      {/* Form fields */}
    </form>
  )
}
```

---

## Onboarding Patterns

### 1. Welcome Tour

Guide new users through features.

```tsx
function WelcomeTour() {
  const [step, setStep] = useState(0)

  const steps = [
    {
      target: '.connect-site-btn',
      content: 'Start by connecting your first website here'
    },
    {
      target: '.sidebar-issues',
      content: 'View all detected SEO issues in this section'
    },
    {
      target: '.execution-mode',
      content: 'Choose how you want fixes to be applied'
    }
  ]

  // Implementation using a tour library like react-joyride
}
```

---

### 2. Progressive Disclosure

Show advanced options gradually.

```tsx
function SettingsForm() {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div>
      {/* Basic settings */}
      <Input label="Site Name" />
      <Select label="Execution Mode" />

      {/* Advanced toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-blue-500 text-sm mt-4"
      >
        {showAdvanced ? 'Hide' : 'Show'} Advanced Options
      </button>

      {/* Advanced settings */}
      {showAdvanced && (
        <div className="mt-4 space-y-4 border-t border-gray-800 pt-4">
          <Input label="Custom User Agent" />
          <Input label="Crawl Delay (ms)" type="number" />
        </div>
      )}
    </div>
  )
}
```

---

## Best Practices Summary

### Loading States
- Show loading for operations >500ms
- Use skeleton screens for known layouts
- Provide progress for long operations
- Never block the entire UI

### Empty States
- Be encouraging, not negative
- Provide clear next action
- Explain purpose of the section
- Use appropriate illustration/icon

### Error States
- Be specific about what went wrong
- Provide actionable solutions
- Don't blame the user
- Always offer a way to recover

### Success Feedback
- Confirm successful actions
- Don't interrupt user flow
- Auto-dismiss when appropriate
- Use positive, celebratory tone

### Forms
- Validate inline when possible
- Show helpful error messages
- Save progress
- Confirm before destructive actions

### Navigation
- Always show current location
- Provide breadcrumbs for depth
- Make navigation predictable
- Allow easy back navigation

