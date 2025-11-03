# Component Usage Guide

Comprehensive documentation for all UI components in the SEOLOGY.AI application.

## Table of Contents

- [Base UI Components](#base-ui-components)
  - [Button](#button)
  - [Input](#input)
  - [Textarea](#textarea)
  - [Select](#select)
  - [Checkbox](#checkbox)
  - [Radio](#radio)
  - [Switch](#switch)
  - [Label](#label)
- [Data Display Components](#data-display-components)
  - [Card](#card)
  - [Badge](#badge)
  - [Avatar](#avatar)
  - [Chart](#chart)
  - [Breadcrumbs](#breadcrumbs)
  - [Progress](#progress)
- [Feedback Components](#feedback-components)
  - [Toast](#toast)
  - [Dialog](#dialog)
  - [Modal](#modal)
  - [ConfirmDialog](#confirmdialog)
  - [Tooltip](#tooltip)
- [State Components](#state-components)
  - [Loading](#loading)
  - [EmptyState](#emptystate)
- [Navigation Components](#navigation-components)
  - [Tabs](#tabs)
  - [Dropdown Menu](#dropdown-menu)
- [Layout Components](#layout-components)
  - [Sidebar](#sidebar)
  - [Header](#header)
  - [MarketingLayout](#marketinglayout)
- [Domain-Specific Components](#domain-specific-components)
  - [NotificationCenter](#notificationcenter)
  - [SearchFilter](#searchfilter)
  - [FeatureCard](#featurecard)
  - [TestimonialCard](#testimonialcard)
  - [StatsSection](#statssection)
  - [CTASection](#ctasection)

---

## Base UI Components

### Button

**Location**: `components/ui/button.tsx`

#### Purpose
Primary action component with multiple variants and states.

#### Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link' | 'success'
  size?: 'sm' | 'default' | 'lg' | 'icon'
  asChild?: boolean
  isLoading?: boolean
}
```

#### Variants

- **primary** (default): Blue background, white text - main CTAs
- **secondary**: Gray background - secondary actions
- **destructive**: Red background - delete, remove actions
- **outline**: Transparent with border - less prominent actions
- **ghost**: No background, hover effect - tertiary actions
- **link**: Text-only, underline on hover - inline links
- **success**: Green background - confirmation actions

#### Sizes

- **sm**: Small button (h-8, text-xs)
- **default**: Standard button (h-10)
- **lg**: Large button (h-12, text-base)
- **icon**: Square button for icons only (h-10 w-10)

#### Usage Examples

```tsx
// Primary CTA
<Button variant="primary" size="lg">
  Get Started
</Button>

// Delete action with confirmation
<Button variant="destructive" onClick={handleDelete}>
  Delete Site
</Button>

// Loading state
<Button isLoading disabled>
  Processing...
</Button>

// Icon button
<Button variant="ghost" size="icon">
  <X className="h-4 w-4" />
</Button>

// As a Link (using asChild with Radix Slot)
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

#### Best Practices

DO:
- Use `primary` for main actions (one per section)
- Use `destructive` for dangerous actions with confirmation
- Use `isLoading` to prevent double-clicks
- Provide clear, action-oriented text

DON'T:
- Don't use multiple `primary` buttons in same section
- Don't use `destructive` without confirmation dialog
- Don't make buttons too small for touch targets
- Don't use vague text like "Click here"

#### Accessibility

- Automatically disabled when `isLoading` is true
- Focus ring visible with `focus-visible:ring-2`
- Proper cursor states (`disabled:cursor-not-allowed`)
- Use `aria-label` for icon-only buttons

---

### Input

**Location**: `components/ui/input.tsx`

#### Purpose
Text input field with label and error state support.

#### Props

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}
```

#### Usage Examples

```tsx
// Basic input
<Input
  type="text"
  placeholder="Enter your email"
/>

// With label
<Input
  type="email"
  label="Email Address"
  placeholder="you@example.com"
/>

// With error state
<Input
  type="password"
  label="Password"
  error="Password must be at least 8 characters"
/>

// Required field
<Input
  type="text"
  label="Site Name"
  required
/>

// Disabled state
<Input
  type="text"
  label="Domain"
  value="example.com"
  disabled
/>
```

#### States

- **Default**: Gray border, blue focus ring
- **Error**: Red border, red focus ring, error message below
- **Disabled**: Reduced opacity, no interaction
- **Required**: Red asterisk next to label

#### Best Practices

DO:
- Always provide a `label` for accessibility
- Use appropriate `type` (email, password, number, etc.)
- Show error messages immediately below input
- Use `placeholder` for examples, not instructions

DON'T:
- Don't use placeholder as label
- Don't show errors before user interaction
- Don't make inputs too narrow (min-width)
- Don't forget keyboard navigation

#### Accessibility

- Label automatically associated with input
- Required fields marked with asterisk
- Error messages announced to screen readers
- Proper focus management

---

### Textarea

**Location**: `components/ui/textarea.tsx`

#### Purpose
Multi-line text input for longer content.

#### Props

```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
}
```

#### Usage Examples

```tsx
// Basic textarea
<Textarea
  label="Description"
  placeholder="Describe your site..."
  rows={4}
/>

// With error
<Textarea
  label="Content"
  error="Content must be at least 50 characters"
  value={content}
  onChange={handleChange}
/>

// Character limit
<Textarea
  label="Meta Description"
  maxLength={160}
  placeholder="Max 160 characters"
/>
```

#### Best Practices

DO:
- Set appropriate `rows` for expected content
- Show character count for length limits
- Use for content longer than 1-2 lines
- Allow resize when appropriate

DON'T:
- Don't use for short inputs (use Input instead)
- Don't make too small (min 3-4 rows)
- Don't prevent all resizing

---

### Select

**Location**: `components/ui/select.tsx`

#### Purpose
Dropdown selection component built on Radix UI.

#### Usage Examples

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Basic select
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a plan" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="starter">Starter</SelectItem>
    <SelectItem value="growth">Growth</SelectItem>
    <SelectItem value="scale">Scale</SelectItem>
  </SelectContent>
</Select>

// With state management
const [plan, setPlan] = useState('starter')

<Select value={plan} onValueChange={setPlan}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="starter">Starter - $29/mo</SelectItem>
    <SelectItem value="growth">Growth - $99/mo</SelectItem>
    <SelectItem value="scale">Scale - $299/mo</SelectItem>
  </SelectContent>
</Select>
```

#### Best Practices

DO:
- Use for 4+ options (use Radio for 2-3)
- Provide clear option labels
- Show selected value in trigger
- Group related options

DON'T:
- Don't use for yes/no (use Switch)
- Don't use for too many options (use searchable select)
- Don't forget keyboard navigation

---

### Checkbox

**Location**: `components/ui/checkbox.tsx`

#### Usage Examples

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Basic checkbox
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

// Controlled checkbox
const [agreed, setAgreed] = useState(false)

<div className="flex items-center space-x-2">
  <Checkbox
    id="terms"
    checked={agreed}
    onCheckedChange={setAgreed}
  />
  <Label htmlFor="terms">I agree to the terms</Label>
</div>

// Multiple checkboxes
const [selected, setSelected] = useState<string[]>([])

<div className="space-y-2">
  {options.map(option => (
    <div key={option.id} className="flex items-center space-x-2">
      <Checkbox
        id={option.id}
        checked={selected.includes(option.id)}
        onCheckedChange={(checked) => {
          setSelected(checked
            ? [...selected, option.id]
            : selected.filter(id => id !== option.id)
          )
        }}
      />
      <Label htmlFor={option.id}>{option.label}</Label>
    </div>
  ))}
</div>
```

---

### Switch

**Location**: `components/ui/switch.tsx`

#### Purpose
Toggle switch for boolean settings.

#### Usage Examples

```tsx
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Basic switch
<div className="flex items-center space-x-2">
  <Switch id="auto-mode" />
  <Label htmlFor="auto-mode">Automatic mode</Label>
</div>

// Controlled switch
const [autoMode, setAutoMode] = useState(false)

<div className="flex items-center justify-between">
  <div>
    <Label htmlFor="auto-mode">Automatic Fixes</Label>
    <p className="text-sm text-gray-400">
      Apply fixes without approval
    </p>
  </div>
  <Switch
    id="auto-mode"
    checked={autoMode}
    onCheckedChange={setAutoMode}
  />
</div>
```

#### Best Practices

DO:
- Use for immediate on/off settings
- Provide clear label
- Show current state visually
- Consider adding description

DON'T:
- Don't use for actions that need confirmation
- Don't use for multiple options (use Select)
- Don't hide important context

---

## Data Display Components

### Card

**Location**: `components/ui/card.tsx`

#### Purpose
Container component for grouping related content.

#### Components

- `Card` - Main container
- `CardHeader` - Top section
- `CardTitle` - Heading
- `CardDescription` - Subheading
- `CardContent` - Main content area
- `CardFooter` - Bottom section (actions)

#### Usage Examples

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Site Analytics</CardTitle>
    <CardDescription>Last 30 days</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Chart goes here...</p>
  </CardContent>
</Card>

// Card with footer actions
<Card>
  <CardHeader>
    <CardTitle>Shopify Store</CardTitle>
    <CardDescription>example.myshopify.com</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <div>Active Issues: 5</div>
      <div>Fixes Applied: 23</div>
    </div>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Disconnect</Button>
    <Button>View Details</Button>
  </CardFooter>
</Card>

// Clickable card
<Card className="hover:border-blue-500 cursor-pointer transition-colors">
  <CardHeader>
    <CardTitle>Connect WordPress</CardTitle>
  </CardHeader>
</Card>
```

#### Styling

- Default: Dark background (`bg-gray-800`), gray border
- Rounded corners (`rounded-lg`)
- Can be customized with `className` prop

---

### Badge

**Location**: `components/ui/badge.tsx`

#### Purpose
Small label for status, categories, or counts.

#### Variants

- **default**: Primary color
- **success**: Green - completed, active, success states
- **warning**: Yellow - pending, warning states
- **danger**: Red - error, critical states
- **info**: Blue - informational
- **secondary**: Gray - less important info
- **outline**: Border only

#### Usage Examples

```tsx
import { Badge } from "@/components/ui/badge"

// Status badges
<Badge variant="success">Connected</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="info">New</Badge>

// Count badges
<div className="flex items-center space-x-2">
  <span>Issues</span>
  <Badge>{issueCount}</Badge>
</div>

// Category badges
<div className="flex gap-2">
  <Badge variant="outline">SEO</Badge>
  <Badge variant="outline">Meta Tags</Badge>
  <Badge variant="outline">Performance</Badge>
</div>
```

#### Best Practices

DO:
- Use for status indicators
- Keep text short (1-2 words)
- Use semantic colors
- Combine with icons when needed

DON'T:
- Don't use for clickable actions (use Button)
- Don't use too many in one place
- Don't rely only on color for meaning

---

### Avatar

**Location**: `components/ui/avatar.tsx`

#### Purpose
User profile picture or initials display.

#### Usage Examples

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// With image
<Avatar>
  <AvatarImage src={user.imageUrl} alt={user.name} />
  <AvatarFallback>{user.initials}</AvatarFallback>
</Avatar>

// Fallback with initials
<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Different sizes
<Avatar className="h-8 w-8"> {/* Small */}
  <AvatarFallback>SM</AvatarFallback>
</Avatar>

<Avatar className="h-16 w-16"> {/* Large */}
  <AvatarFallback>LG</AvatarFallback>
</Avatar>
```

---

### Progress

**Location**: `components/ui/progress.tsx`

#### Purpose
Visual indicator of progress or completion.

#### Usage Examples

```tsx
import { Progress } from "@/components/ui/progress"

// Basic progress bar
<Progress value={66} />

// With label
<div>
  <div className="flex justify-between mb-2">
    <span>Usage</span>
    <span>{fixesUsed}/{fixLimit}</span>
  </div>
  <Progress value={(fixesUsed / fixLimit) * 100} />
</div>

// Different colors based on value
<Progress
  value={usagePercent}
  className={usagePercent > 90 ? "bg-red-600" : "bg-blue-600"}
/>
```

---

## Feedback Components

### Dialog

**Location**: `components/ui/dialog.tsx`

#### Purpose
Modal dialog for important actions or information. Built on Radix UI.

#### Components

- `Dialog` - Root component
- `DialogTrigger` - Opens dialog
- `DialogContent` - Main content
- `DialogHeader` - Top section
- `DialogTitle` - Title
- `DialogDescription` - Description
- `DialogFooter` - Action buttons
- `DialogClose` - Close button

#### Usage Examples

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Basic dialog
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Controlled dialog
const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Settings</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Site Settings</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      {/* Form fields */}
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSave}>
        Save Changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### Best Practices

DO:
- Use for important actions
- Keep content focused
- Provide clear actions (Cancel/Confirm)
- Use for forms that need focus

DON'T:
- Don't nest dialogs
- Don't use for simple messages (use Toast)
- Don't make too large (consider full page instead)
- Don't forget close button

#### Accessibility

- Focus trapped in dialog
- ESC key closes dialog
- Close button has sr-only text
- Proper ARIA attributes

---

### ConfirmDialog

**Location**: `components/ui/ConfirmDialog.tsx`

#### Purpose
Reusable confirmation dialog for destructive actions.

#### Usage Examples

```tsx
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"

// Basic confirmation
<ConfirmDialog
  open={confirmOpen}
  onOpenChange={setConfirmOpen}
  onConfirm={handleDelete}
  title="Delete Site"
  description="Are you sure you want to delete this site? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
/>

// Dangerous action
<ConfirmDialog
  open={confirmOpen}
  onOpenChange={setConfirmOpen}
  onConfirm={handleRollback}
  title="Rollback Fix"
  description="This will revert changes made to your site. Are you sure?"
  confirmText="Rollback"
  variant="destructive"
/>
```

---

### Toast

**Location**: `components/ui/toast.tsx`

#### Purpose
Temporary notification messages.

#### Usage Examples

```tsx
import { toast } from "@/components/ui/toast"

// Success message
toast.success("Site connected successfully!")

// Error message
toast.error("Failed to connect site")

// Info message
toast.info("Scanning site for issues...")

// With action
toast.success("Fix applied", {
  action: {
    label: "View",
    onClick: () => router.push('/dashboard/fixes')
  }
})

// Custom duration
toast.info("Processing...", { duration: 5000 })
```

#### Toast Types

- **success**: Green checkmark
- **error**: Red X
- **info**: Blue info icon
- **warning**: Yellow warning icon

---

### Tooltip

**Location**: `components/ui/tooltip.tsx`

#### Purpose
Contextual help on hover. Built on Radix UI.

#### Usage Examples

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Basic tooltip
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <HelpCircle className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Click to learn more about execution modes</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// Icon with tooltip
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <Info className="h-4 w-4 text-gray-400" />
    </TooltipTrigger>
    <TooltipContent>
      This feature is only available on Growth plan
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

#### Best Practices

DO:
- Use for additional context
- Keep text concise
- Use for icon-only buttons
- Provide keyboard access

DON'T:
- Don't use for critical information
- Don't make too long (>2 lines)
- Don't use for mobile (no hover)
- Don't nest interactive elements

---

## State Components

### Loading

**Location**: `components/ui/loading.tsx`

#### Purpose
Loading indicators and skeleton screens.

#### Components

- `Loading` - Spinner with optional text
- `LoadingDots` - Animated dots
- `LoadingSkeleton` - Skeleton placeholder

#### Usage Examples

```tsx
import { Loading, LoadingDots, LoadingSkeleton } from "@/components/ui/loading"

// Spinner with text
<Loading text="Loading sites..." size="lg" />

// Small spinner
<Loading size="sm" />

// Loading dots (inline)
<div>
  Processing <LoadingDots />
</div>

// Skeleton loaders
<div className="space-y-4">
  <LoadingSkeleton className="h-12 w-full" />
  <LoadingSkeleton className="h-32 w-full" />
  <LoadingSkeleton className="h-8 w-1/2" />
</div>

// Skeleton grid
<div className="grid grid-cols-3 gap-4">
  {Array(6).fill(0).map((_, i) => (
    <LoadingSkeleton key={i} className="h-40" />
  ))}
</div>
```

#### Best Practices

DO:
- Match skeleton to final layout
- Use for data fetching
- Show during async operations
- Provide context (what's loading)

DON'T:
- Don't show spinner for <500ms operations
- Don't use skeleton everywhere
- Don't forget to remove when loaded

---

### EmptyState

**Location**: `components/ui/empty-state.tsx`

#### Purpose
Placeholder when no data exists.

#### Usage Examples

```tsx
import { EmptyState } from "@/components/ui/empty-state"
import { Inbox } from "lucide-react"

// Basic empty state
<EmptyState
  icon={Inbox}
  title="No notifications"
  description="You're all caught up!"
/>

// With action
<EmptyState
  icon={Globe}
  title="No sites connected"
  description="Connect your first site to start automating SEO fixes"
  action={{
    label: "Connect Site",
    onClick: () => router.push('/dashboard/sites/connect')
  }}
/>

// Custom styling
<EmptyState
  icon={Search}
  title="No results found"
  description="Try adjusting your search terms"
  className="py-12"
/>
```

#### Best Practices

DO:
- Use friendly, encouraging copy
- Provide clear next action
- Use relevant icon
- Explain why it's empty

DON'T:
- Don't use negative language
- Don't show for loading states
- Don't make too large
- Don't forget the call-to-action

---

## Domain-Specific Components

### NotificationCenter

**Location**: `components/notifications/NotificationCenter.tsx`

#### Purpose
Display and manage user notifications.

#### Usage Examples

```tsx
import { NotificationCenter } from "@/components/notifications/NotificationCenter"

// In header/navbar
<NotificationCenter
  notifications={notifications}
  unreadCount={unreadCount}
  onMarkAsRead={handleMarkAsRead}
  onMarkAllAsRead={handleMarkAllAsRead}
/>
```

#### Features

- Unread count badge
- Mark as read
- Mark all as read
- Notification types (success, error, info, warning)
- Real-time updates

---

### SearchFilter

**Location**: `components/ui/SearchFilter.tsx`

#### Purpose
Combined search and filter component for tables and lists.

#### Usage Examples

```tsx
import { SearchFilter } from "@/components/ui/SearchFilter"

<SearchFilter
  searchPlaceholder="Search sites..."
  searchValue={search}
  onSearchChange={setSearch}
  filters={[
    {
      key: 'platform',
      label: 'Platform',
      options: [
        { value: 'all', label: 'All Platforms' },
        { value: 'shopify', label: 'Shopify' },
        { value: 'wordpress', label: 'WordPress' },
      ]
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'connected', label: 'Connected' },
        { value: 'error', label: 'Error' },
      ]
    }
  ]}
  onFilterChange={handleFilterChange}
/>
```

---

## Common Patterns

### Form with Validation

```tsx
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function SiteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = async (data) => {
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Site URL"
        {...register('url', {
          required: 'URL is required',
          pattern: {
            value: /^https?:\/\/.+/,
            message: 'Must be a valid URL'
          }
        })}
        error={errors.url?.message}
      />

      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  )
}
```

### Data Table

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

function SitesTable({ sites }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Sites</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-4">Site</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Issues</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sites.map(site => (
              <tr key={site.id} className="border-b border-gray-800">
                <td className="p-4">{site.domain}</td>
                <td className="p-4">
                  <Badge variant={site.status === 'CONNECTED' ? 'success' : 'warning'}>
                    {site.status}
                  </Badge>
                </td>
                <td className="p-4">{site.issueCount}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
```

### Confirmation Flow

```tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { toast } from '@/components/ui/toast'

function DeleteButton({ siteId, onSuccess }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleDelete = async () => {
    try {
      await fetch(`/api/sites/${siteId}`, { method: 'DELETE' })
      toast.success('Site deleted successfully')
      onSuccess()
    } catch (error) {
      toast.error('Failed to delete site')
    }
    setConfirmOpen(false)
  }

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setConfirmOpen(true)}
      >
        Delete
      </Button>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleDelete}
        title="Delete Site"
        description="This will disconnect the site and remove all data."
        confirmText="Delete"
        variant="destructive"
      />
    </>
  )
}
```

---

## Component Development Guidelines

### Creating New Components

1. **File location**: Place in appropriate directory
   - Base UI: `components/ui/`
   - Domain-specific: `components/[domain]/`
   - Layout: `components/layout/`

2. **TypeScript interfaces**: Always define prop types
   ```typescript
   interface ComponentProps {
     required: string
     optional?: boolean
   }
   ```

3. **Forwarding refs**: Use `React.forwardRef` for form components
   ```typescript
   const Component = React.forwardRef<HTMLInputElement, ComponentProps>(
     (props, ref) => { /* ... */ }
   )
   ```

4. **Styling**: Use Tailwind + CVA for variants
   ```typescript
   const variants = cva("base-classes", {
     variants: {
       size: {
         sm: "size-classes",
         lg: "size-classes"
       }
     }
   })
   ```

5. **Accessibility**: Include ARIA attributes
   - Labels for inputs
   - Alt text for images
   - sr-only text for icons
   - Keyboard navigation

6. **Documentation**: Add JSDoc comments
   ```typescript
   /**
    * Button component for actions and navigation
    * @param variant - Visual style variant
    * @param size - Size of the button
    * @param isLoading - Shows loading spinner
    */
   ```

### Testing Components

- Test all variants
- Test error states
- Test keyboard navigation
- Test with screen readers
- Test responsive behavior

