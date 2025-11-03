# SEOLOGY.AI UI Components Documentation

Complete documentation of all shared layout components and UI library created for the SEOLOGY.AI platform.

## Table of Contents

1. [Overview](#overview)
2. [UI Components Library](#ui-components-library)
3. [Layout Components](#layout-components)
4. [Theme System](#theme-system)
5. [Usage Examples](#usage-examples)
6. [File Structure](#file-structure)

---

## Overview

This document provides comprehensive documentation for all UI components and layouts built for SEOLOGY.AI. All components are built with:

- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn/UI patterns** for consistency
- **Radix UI** primitives for accessibility
- **Dark mode support** out of the box

---

## UI Components Library

All UI components are located in `components/ui/` and follow Shadcn/UI conventions.

### Form Components

#### Button (`button.tsx`)
```typescript
import { Button } from '@/components/ui/button'

<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Destructive Button</Button>
<Button variant="success">Success Button</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button isLoading>Loading...</Button>
```

**Variants**: `primary`, `secondary`, `destructive`, `outline`, `ghost`, `link`, `success`
**Sizes**: `sm`, `default`, `lg`, `icon`

#### Input (`input.tsx`)
```typescript
import { Input } from '@/components/ui/input'

<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
  error="Invalid email"
/>
```

#### Textarea (`textarea.tsx`)
```typescript
import { Textarea } from '@/components/ui/textarea'

<Textarea
  label="Description"
  placeholder="Enter description"
  rows={4}
  error="Description is required"
/>
```

#### Select (`select.tsx`)
```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

#### Checkbox (`checkbox.tsx`)
```typescript
import { Checkbox } from '@/components/ui/checkbox'

<Checkbox
  label="Accept terms and conditions"
  error="You must accept to continue"
/>
```

#### Radio (`radio.tsx`)
```typescript
import { Radio } from '@/components/ui/radio'

<Radio
  label="Option 1"
  description="This is the first option"
  name="radio-group"
  value="option1"
/>
```

#### Switch (`switch.tsx`)
```typescript
import { Switch } from '@/components/ui/switch'

<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
  label="Enable notifications"
  description="Receive email notifications"
/>
```

#### Label (`label.tsx`)
```typescript
import { Label } from '@/components/ui/label'

<Label required>Email Address</Label>
```

### Display Components

#### Card (`card.tsx`)
```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

#### Badge (`badge.tsx`)
```typescript
import { Badge } from '@/components/ui/badge'

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
```

#### Avatar (`avatar.tsx`)
```typescript
import { Avatar } from '@/components/ui/avatar'

<Avatar
  src="/avatar.jpg"
  alt="User Name"
  fallback="UN"
  size="md"
/>
```

**Sizes**: `sm`, `md`, `lg`, `xl`

#### Progress (`progress.tsx`)
```typescript
import { Progress } from '@/components/ui/progress'

<Progress
  value={75}
  max={100}
  variant="success"
  showLabel
/>
```

**Variants**: `default`, `success`, `warning`, `danger`
**Sizes**: `sm`, `md`, `lg`

### Overlay Components

#### Dialog (`dialog.tsx`)
```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
    <DialogFooter>
      <Button>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### Toast (`toast.tsx`)
```typescript
import { Toast } from '@/components/ui/toast'

<Toast
  variant="default"
  title="Success"
  description="Your changes have been saved"
  onClose={() => {}}
/>
```

**Variants**: `default`, `destructive`, `success`, `warning`

#### Tooltip (`tooltip.tsx`)
```typescript
import { Tooltip } from '@/components/ui/tooltip'

<Tooltip content="Helpful tooltip text" side="top">
  <button>Hover me</button>
</Tooltip>
```

**Sides**: `top`, `right`, `bottom`, `left`

#### Dropdown Menu (`dropdown-menu.tsx`)
```typescript
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

<DropdownMenu trigger={<button>Open Menu</button>}>
  <DropdownMenuItem onClick={() => {}}>
    Menu Item 1
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem onClick={() => {}}>
    Menu Item 2
  </DropdownMenuItem>
</DropdownMenu>
```

### Navigation Components

#### Tabs (`tabs.tsx`)
```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Breadcrumbs (`breadcrumbs.tsx`)
```typescript
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings' },
  ]}
/>
```

### Utility Components

#### Loading (`loading.tsx`)
```typescript
import { Loading, LoadingDots, LoadingSkeleton } from '@/components/ui/loading'

<Loading size="md" text="Loading..." />
<LoadingDots />
<LoadingSkeleton className="h-20 w-full" />
```

#### Empty State (`empty-state.tsx`)
```typescript
import { EmptyState } from '@/components/ui/empty-state'
import { Inbox } from 'lucide-react'

<EmptyState
  icon={Inbox}
  title="No items found"
  description="Get started by creating your first item"
  action={{
    label: "Create Item",
    onClick: () => {}
  }}
/>
```

---

## Layout Components

### Marketing Site Layout

#### Root Layout (`app/layout.tsx`)
Already configured with:
- Clerk authentication provider
- Webflow CSS integration
- Global styles
- Font smoothing

#### Enhanced Navbar (`components/marketing/Navbar.tsx`)
Existing navbar with Webflow animations and styling.

#### Footer (`components/marketing/Footer.tsx`)
```typescript
import { Footer } from '@/components/marketing/Footer'

// In your marketing pages
<Footer />
```

**Features**:
- Newsletter subscription
- Multi-column link organization
- Social media links
- Responsive design
- Legal links

#### Mobile Menu (`components/marketing/MobileMenu.tsx`)
```typescript
import { MobileMenu } from '@/components/marketing/MobileMenu'

<MobileMenu
  navLinks={[
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
  ]}
/>
```

**Features**:
- Slide-in panel from right
- Overlay backdrop
- CTA buttons at bottom
- Smooth animations

### Dashboard Layout (`app/dashboard/layout.tsx`)

Already configured with:
- Authentication guard
- Sidebar navigation
- Dark theme

#### Dashboard Header (`components/dashboard/Header.tsx`)
```typescript
import { Header } from '@/components/dashboard/Header'

<Header
  title="Dashboard"
  breadcrumbs={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings' },
  ]}
  actions={
    <Button>Custom Action</Button>
  }
/>
```

**Features**:
- Sticky header with blur backdrop
- Breadcrumb navigation
- Notification center integration
- User menu (Clerk)
- Custom action buttons

#### Sidebar (`components/dashboard/Sidebar.tsx`)
Existing sidebar with:
- Navigation links
- Active state highlighting
- User profile section
- Notification center

### Admin Layout (`app/(admin)/admin/layout.tsx`)

Already configured with:
- Admin authentication guard
- Admin-specific sidebar
- Purple accent colors

#### Admin Sidebar (`components/admin/AdminSidebar.tsx`)
Existing admin sidebar with:
- Admin navigation links
- System status
- Back to user dashboard link
- Admin badge

---

## Theme System

### Theme Provider (`components/providers/ThemeProvider.tsx`)

```typescript
import { ThemeProvider } from '@/components/providers/ThemeProvider'

// In app/layout.tsx
<ThemeProvider defaultTheme="dark" storageKey="seology-theme">
  {children}
</ThemeProvider>
```

### Theme Toggle (`components/ui/theme-toggle.tsx`)

```typescript
import { ThemeToggle } from '@/components/ui/theme-toggle'

// In any component
<ThemeToggle />
```

### Using Theme in Components

```typescript
import { useTheme } from '@/components/providers/ThemeProvider'

function MyComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      Current theme: {theme}
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  )
}
```

---

## Usage Examples

### Complete Dashboard Page

```typescript
import { Header } from '@/components/dashboard/Header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function DashboardPage() {
  return (
    <>
      <Header
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Overview' },
        ]}
        actions={
          <Button variant="primary">Create Site</Button>
        }
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Sites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <Badge variant="success">+2 this month</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Issues Fixed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">247</div>
              <Progress value={75} variant="success" showLabel />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">65%</div>
              <Progress value={65} variant="default" showLabel />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
```

### Form with Validation

```typescript
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          label="Name"
          placeholder="Your name"
          required
          error={errors.name}
        />

        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          required
          error={errors.email}
        />

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Textarea
          label="Message"
          placeholder="How can we help?"
          rows={5}
          required
          error={errors.message}
        />

        <Checkbox
          label="I agree to the terms and conditions"
          error={errors.terms}
        />
      </CardContent>
      <CardFooter>
        <Button variant="primary" className="w-full">
          Send Message
        </Button>
      </CardFooter>
    </Card>
  )
}
```

---

## File Structure

```
components/
├── ui/                          # Reusable UI components
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── breadcrumbs.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── checkbox.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── empty-state.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── loading.tsx
│   ├── progress.tsx
│   ├── radio.tsx
│   ├── select.tsx
│   ├── switch.tsx
│   ├── tabs.tsx
│   ├── textarea.tsx
│   ├── theme-toggle.tsx
│   ├── toast.tsx
│   └── tooltip.tsx
│
├── marketing/                   # Marketing site components
│   ├── Footer.tsx
│   ├── MobileMenu.tsx
│   └── Navbar.tsx
│
├── dashboard/                   # Dashboard components
│   ├── Header.tsx
│   └── Sidebar.tsx
│
├── admin/                       # Admin components
│   └── AdminSidebar.tsx
│
├── providers/                   # Context providers
│   └── ThemeProvider.tsx
│
└── notifications/               # Notification components
    └── NotificationCenter.tsx
```

---

## Design Principles

### Consistency
- All components follow Shadcn/UI patterns
- Consistent color palette (gray-950 backgrounds, blue-600 primary)
- Uniform spacing using Tailwind's scale

### Accessibility
- All interactive elements have proper ARIA labels
- Keyboard navigation support
- Focus visible states
- Screen reader friendly

### Responsiveness
- Mobile-first approach
- Breakpoint system: sm (640px), md (768px), lg (1024px), xl (1280px)
- All layouts adapt smoothly across screen sizes

### Dark Mode
- Dark mode enabled by default
- System preference detection
- Persistent theme selection
- Smooth theme transitions

### Performance
- Components are client-side rendered only when needed
- Optimized re-renders with React best practices
- Minimal bundle size with tree-shaking

---

## Next Steps

1. **Integrate layouts into existing pages**:
   - Add `<Header />` to dashboard pages
   - Add `<Footer />` to marketing pages
   - Add `<MobileMenu />` to Navbar

2. **Wrap app with ThemeProvider**:
   - Add ThemeProvider to root layout
   - Add ThemeToggle to user menu

3. **Replace existing components**:
   - Gradually replace inline components with new UI library
   - Ensure consistency across all pages

4. **Test responsiveness**:
   - Test all components on mobile devices
   - Verify dark mode works correctly
   - Check accessibility with screen readers

5. **Optimize performance**:
   - Review bundle sizes
   - Implement code splitting where needed
   - Add loading states for async operations

---

## Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [Shadcn/UI Documentation](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Created**: November 3, 2025
**Author**: Claude (Senior System Architect)
**Version**: 1.0.0
