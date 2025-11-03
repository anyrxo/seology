# SEOLOGY.AI Component Library

Complete catalog of reusable UI components used throughout the SEOLOGY.AI platform. All components are built with React, TypeScript, and Tailwind CSS.

## Table of Contents

- [Design System](#design-system)
- [Layout Components](#layout-components)
- [Form Components](#form-components)
- [Feedback Components](#feedback-components)
- [Data Display](#data-display)
- [Navigation](#navigation)
- [Overlay Components](#overlay-components)
- [Domain-Specific Components](#domain-specific-components)

---

## Design System

### Color Palette

```typescript
// Primary Colors
const colors = {
  gray: {
    900: '#111827',  // Backgrounds
    800: '#1F2937',  // Cards, Inputs
    700: '#374151',  // Borders
    600: '#4B5563',  // Disabled states
    500: '#6B7280',  // Placeholder text
    400: '#9CA3AF',  // Secondary text
    300: '#D1D5DB',  // Primary text (light)
    200: '#E5E7EB',
    100: '#F3F4F6',
  },
  blue: {
    600: '#2563EB',  // Primary actions
    500: '#3B82F6',  // Hover states
  },
  green: {
    600: '#059669',  // Success
  },
  red: {
    600: '#DC2626',  // Danger
  },
  yellow: {
    600: '#D97706',  // Warning
  }
}
```

### Typography

```typescript
// Font Sizes
const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem' // 30px
}

// Font Weights
const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700
}
```

### Spacing

Uses Tailwind's default spacing scale (4px increments):
- `space-1` = 4px
- `space-2` = 8px
- `space-3` = 12px
- `space-4` = 16px
- `space-6` = 24px
- `space-8` = 32px

---

## Layout Components

### Container

Responsive container for page content.

```tsx
<div className="container mx-auto px-4 max-w-7xl">
  {/* Content */}
</div>
```

**Props:**
- `className` - Additional CSS classes

**Variants:**
- `max-w-7xl` - Default (1280px)
- `max-w-6xl` - Narrow (1152px)
- `max-w-4xl` - Article width (896px)

### Card

Basic card component for grouping content.

```tsx
<div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
  <h3 className="text-lg font-semibold text-white mb-4">Card Title</h3>
  <p className="text-gray-400">Card content goes here</p>
</div>
```

**Variants:**

```tsx
// Hover effect
<div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors cursor-pointer">

// With shadow
<div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">

// Highlighted
<div className="bg-gray-800 border border-blue-500 rounded-lg p-6">
```

### Grid

Responsive grid layout.

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**Common Patterns:**

```tsx
// Stats Grid (4 columns)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

// Content Grid (2 columns)
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

// Auto-fit Grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
```

---

## Form Components

### Button

```tsx
// components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

// Usage
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

**Variants:**

```tsx
// Primary (default)
<Button variant="primary">Primary Action</Button>

// Secondary
<Button variant="secondary">Secondary Action</Button>

// Danger
<Button variant="danger">Delete</Button>

// Ghost
<Button variant="ghost">Cancel</Button>
```

**Sizes:**

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

**States:**

```tsx
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
```

**Implementation:**

```tsx
export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = 'rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-gray-800 text-gray-300'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''}`}
    >
      {loading && <Spinner className="mr-2" />}
      {children}
    </button>
  )
}
```

### Input

```tsx
interface InputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'password' | 'url' | 'search'
  error?: string
  disabled?: boolean
  required?: boolean
}

// Usage
<Input
  label="Site URL"
  placeholder="https://example.com"
  value={url}
  onChange={setUrl}
  error={error}
  required
/>
```

**Implementation:**

```tsx
export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  disabled = false,
  required = false
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-2 bg-gray-800 border rounded-lg text-white
          placeholder-gray-500 focus:outline-none focus:border-blue-500
          transition-colors disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-700'}
        `}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
```

### Select

```tsx
interface SelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: Array<{ label: string; value: string }>
  placeholder?: string
  disabled?: boolean
}

// Usage
<Select
  label="Execution Mode"
  value={mode}
  onChange={setMode}
  options={[
    { label: 'Automatic', value: 'AUTOMATIC' },
    { label: 'Plan', value: 'PLAN' },
    { label: 'Approve', value: 'APPROVE' }
  ]}
/>
```

### Textarea

```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-300">
    Description
  </label>
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows={4}
    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
  />
</div>
```

### Checkbox

```tsx
<label className="flex items-center space-x-2 cursor-pointer">
  <input
    type="checkbox"
    checked={isEnabled}
    onChange={(e) => setIsEnabled(e.target.checked)}
    className="w-4 h-4 bg-gray-800 border-gray-700 rounded text-blue-600 focus:ring-blue-500"
  />
  <span className="text-gray-300">Enable feature</span>
</label>
```

---

## Feedback Components

### Modal

Full-featured modal dialog component.

**File:** `components/ui/Modal.tsx`

```tsx
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// Usage
const [isOpen, setIsOpen] = useState(false)

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  <p>Modal content goes here</p>
  <div className="mt-4 flex justify-end space-x-3">
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleConfirm}>
      Confirm
    </Button>
  </div>
</Modal>
```

**Features:**
- Backdrop click to close
- Escape key to close
- Body scroll lock when open
- Customizable sizes
- Smooth transitions

### ConfirmDialog

Specialized dialog for confirmations.

**File:** `components/ui/ConfirmDialog.tsx`

```tsx
interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  loading?: boolean
}

// Usage
<ConfirmDialog
  isOpen={showDelete}
  onClose={() => setShowDelete(false)}
  onConfirm={handleDelete}
  title="Delete Site"
  message="Are you sure you want to delete this site? This action cannot be undone."
  confirmText="Delete"
  variant="danger"
  loading={isDeleting}
/>
```

**Variants:**
- `danger` - Red theme for destructive actions
- `warning` - Yellow theme for warnings
- `info` - Blue theme for informational confirmations

### Toast Notification

```tsx
// Using react-hot-toast (recommended)
import toast from 'react-hot-toast'

// Success
toast.success('Fix applied successfully!')

// Error
toast.error('Failed to apply fix')

// Loading
const toastId = toast.loading('Applying fix...')
// Later:
toast.success('Fix applied!', { id: toastId })

// Custom
toast.custom((t) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg">
    <p className="text-white">Custom notification</p>
  </div>
))
```

### Alert

```tsx
<div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
  <div className="flex items-start">
    <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
    <div>
      <h4 className="text-sm font-medium text-blue-400">Information</h4>
      <p className="mt-1 text-sm text-gray-400">This is an informational message.</p>
    </div>
  </div>
</div>
```

**Variants:**

```tsx
// Success (Green)
<div className="bg-green-900/20 border border-green-700 rounded-lg p-4">

// Warning (Yellow)
<div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">

// Error (Red)
<div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
```

### Loading Spinner

```tsx
<div className="flex items-center justify-center p-8">
  <svg className="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
</div>
```

### Progress Bar

```tsx
<div className="w-full bg-gray-700 rounded-full h-2">
  <div
    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
    style={{ width: `${progress}%` }}
  ></div>
</div>
```

---

## Data Display

### Table

```tsx
<div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="border-b border-gray-700">
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-700">
      {items.map((item) => (
        <tr key={item.id} className="hover:bg-gray-800 transition-colors">
          <td className="px-6 py-4 text-sm text-white">{item.name}</td>
          <td className="px-6 py-4 text-sm">
            <Badge variant={item.status === 'active' ? 'success' : 'default'}>
              {item.status}
            </Badge>
          </td>
          <td className="px-6 py-4 text-sm">
            <Button size="sm" variant="ghost">Edit</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### Badge

```tsx
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
}

// Usage
<Badge variant="success">Active</Badge>
<Badge variant="danger">Failed</Badge>
<Badge variant="warning">Pending</Badge>
```

**Implementation:**

```tsx
export default function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-700 text-gray-300',
    success: 'bg-green-900/30 text-green-400 border border-green-700',
    warning: 'bg-yellow-900/30 text-yellow-400 border border-yellow-700',
    danger: 'bg-red-900/30 text-red-400 border border-red-700',
    info: 'bg-blue-900/30 text-blue-400 border border-blue-700'
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  }

  return (
    <span className={`${variants[variant]} ${sizes[size]} rounded-full font-medium inline-block`}>
      {children}
    </span>
  )
}
```

### Stat Card

```tsx
<div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
  <div className="flex items-center justify-between mb-2">
    <h3 className="text-sm font-medium text-gray-400">Active Issues</h3>
    <span className="text-2xl">🔍</span>
  </div>
  <p className="text-3xl font-bold text-white">247</p>
  <p className="text-sm text-green-500 mt-2">↑ 12% from last month</p>
</div>
```

### Empty State

```tsx
<div className="text-center py-12">
  <div className="text-6xl mb-4">📭</div>
  <h3 className="text-lg font-semibold text-white mb-2">No sites connected</h3>
  <p className="text-gray-400 mb-6">Get started by connecting your first site</p>
  <Button variant="primary" onClick={handleConnect}>
    Connect Site
  </Button>
</div>
```

---

## Navigation

### Sidebar

**File:** `components/dashboard/Sidebar.tsx`

```tsx
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Sites', href: '/dashboard/sites', icon: GlobeIcon },
  { name: 'Issues', href: '/dashboard/issues', icon: AlertIcon },
  { name: 'Fixes', href: '/dashboard/fixes', icon: CheckIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartIcon },
]

<aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
  <nav className="p-4 space-y-2">
    {navigation.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
      >
        <item.icon className="w-5 h-5" />
        <span>{item.name}</span>
      </Link>
    ))}
  </nav>
</aside>
```

### Tabs

```tsx
const [activeTab, setActiveTab] = useState('overview')

<div className="border-b border-gray-700">
  <nav className="flex space-x-8">
    {['Overview', 'Issues', 'Fixes', 'Settings'].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab.toLowerCase())}
        className={`
          px-1 py-4 border-b-2 font-medium text-sm transition-colors
          ${activeTab === tab.toLowerCase()
            ? 'border-blue-500 text-blue-500'
            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
          }
        `}
      >
        {tab}
      </button>
    ))}
  </nav>
</div>
```

### Breadcrumbs

```tsx
<nav className="flex items-center space-x-2 text-sm text-gray-400">
  <Link href="/dashboard" className="hover:text-white transition-colors">
    Dashboard
  </Link>
  <span>/</span>
  <Link href="/dashboard/sites" className="hover:text-white transition-colors">
    Sites
  </Link>
  <span>/</span>
  <span className="text-white">example.com</span>
</nav>
```

### Pagination

```tsx
<div className="flex items-center justify-between mt-6">
  <p className="text-sm text-gray-400">
    Showing {start} to {end} of {total} results
  </p>
  <div className="flex items-center space-x-2">
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
    >
      Previous
    </Button>
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setPage(i + 1)}
        className={`
          px-3 py-1 rounded text-sm
          ${page === i + 1
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }
        `}
      >
        {i + 1}
      </button>
    ))}
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setPage(page + 1)}
      disabled={page === totalPages}
    >
      Next
    </Button>
  </div>
</div>
```

---

## Overlay Components

### Dropdown Menu

```tsx
<div className="relative">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
  >
    <span>Options</span>
    <ChevronDownIcon className="w-4 h-4" />
  </button>

  {isOpen && (
    <>
      <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
      <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20">
        <button
          onClick={handleEdit}
          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </>
  )}
</div>
```

### Tooltip

```tsx
<div className="relative group">
  <button className="text-gray-400 hover:text-white">
    ℹ️
  </button>
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
    Helpful tooltip text
  </div>
</div>
```

---

## Domain-Specific Components

### SearchFilter

Combined search and filter component.

**File:** `components/ui/SearchFilter.tsx`

```tsx
interface SearchFilterProps {
  placeholder?: string
  filterLabel?: string
  filterOptions?: FilterOption[]
  onSearch?: (query: string) => void
  onFilter?: (value: string) => void
  showSort?: boolean
  sortOptions?: FilterOption[]
  onSort?: (value: string) => void
}

// Usage
<SearchFilter
  placeholder="Search issues..."
  filterLabel="Severity"
  filterOptions={[
    { label: 'Critical', value: 'CRITICAL' },
    { label: 'High', value: 'HIGH' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'Low', value: 'LOW' }
  ]}
  onSearch={handleSearch}
  onFilter={handleFilter}
  showSort
  sortOptions={[
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' }
  ]}
  onSort={handleSort}
/>
```

### NotificationCenter

**File:** `components/notifications/NotificationCenter.tsx`

Displays in-app notifications with real-time updates.

```tsx
<NotificationCenter />
```

**Features:**
- Unread count badge
- Mark as read
- Mark all as read
- Action links
- Auto-refresh

### IssueCard

```tsx
<div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
  <div className="flex items-start justify-between mb-4">
    <div className="flex-1">
      <div className="flex items-center space-x-2 mb-2">
        <Badge variant="danger">CRITICAL</Badge>
        <span className="text-xs text-gray-500">2 hours ago</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">
        Missing Meta Title
      </h3>
      <p className="text-sm text-gray-400">/products/example-product</p>
    </div>
    <button className="text-gray-400 hover:text-white transition-colors">
      <MoreIcon className="w-5 h-5" />
    </button>
  </div>

  <p className="text-gray-300 mb-4">
    This page is missing a meta title tag, which is crucial for SEO...
  </p>

  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-500">Detected by AI Analysis</span>
    <Button size="sm" variant="primary">
      Fix Now
    </Button>
  </div>
</div>
```

---

## Usage Examples

### Form with Validation

```tsx
const [formData, setFormData] = useState({ name: '', email: '' })
const [errors, setErrors] = useState({})

const handleSubmit = async (e) => {
  e.preventDefault()
  const newErrors = {}

  if (!formData.name) newErrors.name = 'Name is required'
  if (!formData.email) newErrors.email = 'Email is required'

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }

  // Submit form
}

return (
  <form onSubmit={handleSubmit} className="space-y-4">
    <Input
      label="Name"
      value={formData.name}
      onChange={(value) => setFormData({ ...formData, name: value })}
      error={errors.name}
      required
    />
    <Input
      label="Email"
      type="email"
      value={formData.email}
      onChange={(value) => setFormData({ ...formData, email: value })}
      error={errors.email}
      required
    />
    <Button type="submit" variant="primary" fullWidth>
      Submit
    </Button>
  </form>
)
```

### Data Table with Actions

```tsx
<div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
  <SearchFilter
    placeholder="Search sites..."
    filterOptions={[
      { label: 'All', value: '' },
      { label: 'Shopify', value: 'SHOPIFY' },
      { label: 'WordPress', value: 'WORDPRESS' }
    ]}
    onSearch={handleSearch}
    onFilter={handleFilter}
  />

  <table className="w-full mt-4">
    {/* Table content */}
  </table>

  <div className="p-4 border-t border-gray-700">
    {/* Pagination */}
  </div>
</div>
```

### Multi-step Wizard

```tsx
const steps = ['Connect', 'Configure', 'Review', 'Complete']
const [currentStep, setCurrentStep] = useState(0)

<div className="max-w-2xl mx-auto">
  {/* Progress */}
  <div className="mb-8">
    <div className="flex items-center justify-between mb-2">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}
          `}>
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-24 h-1 mx-2 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-700'}`} />
          )}
        </div>
      ))}
    </div>
    <p className="text-center text-sm text-gray-400">{steps[currentStep]}</p>
  </div>

  {/* Step Content */}
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
    {currentStep === 0 && <ConnectStep />}
    {currentStep === 1 && <ConfigureStep />}
    {currentStep === 2 && <ReviewStep />}
    {currentStep === 3 && <CompleteStep />}
  </div>

  {/* Navigation */}
  <div className="flex justify-between mt-6">
    <Button
      variant="ghost"
      onClick={() => setCurrentStep(currentStep - 1)}
      disabled={currentStep === 0}
    >
      Back
    </Button>
    <Button
      variant="primary"
      onClick={() => setCurrentStep(currentStep + 1)}
      disabled={currentStep === steps.length - 1}
    >
      Next
    </Button>
  </div>
</div>
```

---

## Accessibility Guidelines

All components follow WCAG 2.1 AA standards:

1. **Keyboard Navigation**
   - All interactive elements accessible via keyboard
   - Logical tab order
   - Escape key closes modals/dropdowns

2. **ARIA Labels**
   ```tsx
   <button aria-label="Close dialog">×</button>
   <input aria-describedby="email-error" />
   ```

3. **Focus States**
   ```tsx
   className="focus:outline-none focus:ring-2 focus:ring-blue-500"
   ```

4. **Color Contrast**
   - Text on background: 4.5:1 minimum
   - Large text: 3:1 minimum
   - Interactive elements clearly visible

5. **Loading States**
   ```tsx
   <button aria-busy={loading} aria-live="polite">
     {loading ? 'Loading...' : 'Submit'}
   </button>
   ```

---

## Best Practices

1. **Component Composition**
   - Build complex UIs from simple components
   - Use props for customization
   - Keep components focused and single-purpose

2. **Responsive Design**
   - Mobile-first approach
   - Use Tailwind responsive classes (`sm:`, `md:`, `lg:`)
   - Test on multiple screen sizes

3. **Performance**
   - Use React.memo for expensive renders
   - Lazy load heavy components
   - Optimize images and assets

4. **Type Safety**
   - Define clear TypeScript interfaces
   - Use proper prop types
   - Avoid `any` types

5. **Consistency**
   - Follow established patterns
   - Use design system tokens
   - Maintain consistent spacing and sizing

---

## Component Checklist

When creating a new component:

- [ ] TypeScript interface for props
- [ ] Default prop values where appropriate
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Keyboard navigation support
- [ ] ARIA labels for accessibility
- [ ] Loading and error states
- [ ] JSDoc documentation
- [ ] Unit tests (if complex logic)
- [ ] Storybook story (optional but recommended)

---

## Further Reading

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI (Headless Components)](https://www.radix-ui.com)
- [React Aria (Accessibility)](https://react-spectrum.adobe.com/react-aria/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
