# Dashflow X Components - Complete Documentation

This document provides complete documentation for all Dashflow X Webflow template components that have been extracted and converted to React/TypeScript.

**Source**: `C:\Users\manna\Downloads\Website inspo\anyros-wondrous-site.webflow\components.html`

## Component Overview

All components follow the **exact HTML structure** from the Dashflow X template, ensuring pixel-perfect design fidelity. Each component uses the original Webflow CSS classes and patterns.

### Complete Component List

1. **DashflowTooltip** - Directional tooltips (top, bottom, left, right)
2. **DashflowModal** - Modal dialogs (standard and centered variants)
3. **DashflowTabs** - Tabbed content (badge and underline styles)
4. **DashflowTable** - Data tables (DataTable and UserTable)
5. **DashflowBreadcrumbs** - Navigation breadcrumbs (simple and badge styles)
6. **DashflowEmptyState** - Empty state cards (centered and left-aligned)

---

## 1. DashflowTooltip

**File**: `components/ui/dashflow-tooltip.tsx`

### Description
Simple, elegant tooltips that appear on hover with directional arrows.

### Variants
- **Top** - Tooltip appears above the trigger
- **Bottom** - Tooltip appears below the trigger
- **Left** - Tooltip appears to the left
- **Right** - Tooltip appears to the right

### Props

```typescript
interface DashflowTooltipProps {
  children: React.ReactNode      // Trigger element
  content: string                 // Tooltip text
  position?: "top" | "bottom" | "left" | "right"
  className?: string
}
```

### Usage

```tsx
import { DashflowTooltip } from "@/components/ui/dashflow-tooltip"

<DashflowTooltip content="Right tooltip" position="right">
  <div className="text-100 medium color-neutral-800">Hover me</div>
</DashflowTooltip>
```

### CSS Classes Used
- `.tooltip` - Base tooltip class
- `.tooltip.top`, `.tooltip.bottom`, `.tooltip.left`, `.tooltip.right` - Position variants
- `.tooltip-triangle-*` - Arrow elements
- `.display-inline-block`, `.position-relative---z-index-1` - Positioning

---

## 2. DashflowModal

**File**: `components/ui/dashflow-modal.tsx`

### Description
Modal dialogs with overlay backdrop. Two visual variants for different use cases.

### Variants

#### Standard Modal
- Left-aligned content
- Close button in top-right
- Title, body text, action buttons

#### Centered Modal
- Center-aligned text
- Optional icon at top
- Close button in top-right
- Title, body text, centered action buttons

### Components

```typescript
DashflowModal              // Main modal wrapper
DashflowModalHeader        // Header with title and close button
DashflowModalBody          // Body text content
DashflowModalActions       // Button group
DashflowModalTrigger       // Button to open modal
DashflowModalIcon          // Icon for centered variant
DashflowModalTitle         // Title for centered variant
```

### Props

```typescript
interface DashflowModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  variant?: "standard" | "centered"
  className?: string
}
```

### Usage

#### Standard Modal

```tsx
import {
  DashflowModal,
  DashflowModalHeader,
  DashflowModalBody,
  DashflowModalActions,
  DashflowModalTrigger
} from "@/components/ui/dashflow-modal"

const [isOpen, setIsOpen] = useState(false)

<DashflowModalTrigger onClick={() => setIsOpen(true)}>
  Launch Modal
</DashflowModalTrigger>

<DashflowModal isOpen={isOpen} onClose={() => setIsOpen(false)} variant="standard">
  <DashflowModalHeader title="Modal title" onClose={() => setIsOpen(false)} />
  <DashflowModalBody>
    Your content here...
  </DashflowModalBody>
  <DashflowModalActions>
    <a href="#" className="btn-secondary w-inline-block">
      <div className="flex-horizontal gap-column-4px"><div>Cancel</div></div>
    </a>
    <a href="#" className="btn-primary w-inline-block">
      <div className="flex-horizontal gap-column-4px">
        <div>Accept</div>
        <img src="/images/primary-button-icon-right-dashflow-webflow-template.svg" />
      </div>
    </a>
  </DashflowModalActions>
</DashflowModal>
```

#### Centered Modal

```tsx
<DashflowModal isOpen={isOpen} onClose={() => setIsOpen(false)} variant="centered">
  <div onClick={() => setIsOpen(false)} className="close-icon-wrapper floating-icon-top-right">
    <div className="close-icon-line first"></div>
    <div className="close-icon-line second"></div>
  </div>
  <DashflowModalIcon src="/images/card-square-icon.png" />
  <DashflowModalTitle>Modal title</DashflowModalTitle>
  <DashflowModalBody>Your content here...</DashflowModalBody>
  <DashflowModalActions centered>
    {/* buttons */}
  </DashflowModalActions>
</DashflowModal>
```

### CSS Classes Used
- `.modal-wrapper` - Full-screen modal container
- `.modal-content-wrapper` - Centers modal content
- `.modal-close-overlay` - Click-to-close backdrop
- `.card.pd-24px---18px` - Modal card styling
- `.close-icon-wrapper.floating-icon-top-right` - Close button
- `.buttons-row` - Action button container

---

## 3. DashflowTabs

**File**: `components/ui/dashflow-tabs.tsx`

### Description
Tabbed content with two visual styles. Context-based API for managing active state.

### Variants

#### Badge Style
- Pill-shaped tab buttons
- Background highlight on active tab
- Centered alignment

#### Underline Style
- Simple text links
- Underline on active tab
- Left-aligned

### Components

```typescript
DashflowTabs           // Root container with context
DashflowTabsList       // Container for tab triggers
DashflowTabsTrigger    // Individual tab button
DashflowTabsContent    // Container for all panels
DashflowTabPanel       // Individual content panel
```

### Props

```typescript
interface DashflowTabsProps {
  defaultTab?: string
  variant?: "badge" | "underline"
  children: React.ReactNode
  className?: string
}
```

### Usage

```tsx
import {
  DashflowTabs,
  DashflowTabsList,
  DashflowTabsTrigger,
  DashflowTabsContent,
  DashflowTabPanel
} from "@/components/ui/dashflow-tabs"

<DashflowTabs variant="badge" defaultTab="Tab 1">
  <DashflowTabsList>
    <DashflowTabsTrigger value="Tab 1">Overview</DashflowTabsTrigger>
    <DashflowTabsTrigger value="Tab 2">Details</DashflowTabsTrigger>
    <DashflowTabsTrigger value="Tab 3">Settings</DashflowTabsTrigger>
  </DashflowTabsList>

  <DashflowTabsContent>
    <DashflowTabPanel value="Tab 1">
      <div className="card pd-32px---24px">
        <h3 className="text-200 bold">Overview</h3>
        <p>Content here...</p>
      </div>
    </DashflowTabPanel>
    <DashflowTabPanel value="Tab 2">...</DashflowTabPanel>
    <DashflowTabPanel value="Tab 3">...</DashflowTabPanel>
  </DashflowTabsContent>
</DashflowTabs>
```

### CSS Classes Used
- `.w-tabs` - Webflow tabs wrapper
- `.tabs-menu.w-tab-menu` - Tab buttons container
- `.tab-menu-badge-link` - Badge variant tab button
- `.tab-menu-underline-link` - Underline variant tab button
- `.w-tab-link.w--current` - Active tab state
- `.w-tab-content` - Content container
- `.w-tab-pane.w--tab-active` - Active panel

---

## 4. DashflowTable

**File**: `components/ui/dashflow-table.tsx`

### Description
Two specialized table components for different data types.

### Variants

#### DashflowDataTable
Simple data table with 5-column grid layout

**Props**:
```typescript
interface DashflowDataTableProps {
  headers: string[]
  rows: Array<Record<string, string | number>>
  className?: string
}
```

**Usage**:
```tsx
import { DashflowDataTable } from "@/components/ui/dashflow-table"

const headers = ["Name", "Email", "Phone", "Company", "Country"]
const rows = [
  {
    name: "John Carter",
    email: "john@dataplus.com",
    phone: "(487) 180 - 5048",
    company: "Dataplus X",
    country: "United States"
  }
]

<DashflowDataTable headers={headers} rows={rows} />
```

#### DashflowUserTable
User table with avatars, specialized for user management

**Props**:
```typescript
interface UserRow {
  avatar: string
  name: string
  email: string
  title: string
  company: string
  status: "Active" | "Inactive" | "Pending"
  role: string
}

interface DashflowUserTableProps {
  users: UserRow[]
  className?: string
}
```

**Usage**:
```tsx
import { DashflowUserTable } from "@/components/ui/dashflow-table"

const users = [
  {
    avatar: "/images/avatar.jpg",
    name: "John Carter",
    email: "john@dashflow.com",
    title: "CEO & Founder",
    company: "BRIX Templates",
    status: "Active",
    role: "Admin"
  }
]

<DashflowUserTable users={users} />
```

### CSS Classes Used
- `.data-table-row` - Table row (5-column grid)
- `.user-table-row` - User table row (4-column grid)
- `.table-header` - Header row styling
- `.rows` - Body rows container
- `.avatar-circle._40px` - User avatar
- `.color-badge.green/red/yellow` - Status badges
- `.overflow-auto` - Horizontal scroll on mobile

---

## 5. DashflowBreadcrumbs

**File**: `components/ui/dashflow-breadcrumbs.tsx`

### Description
Navigation breadcrumbs showing page hierarchy.

### Variants

#### Simple Style
- Text links with underline hover effect
- Simple divider icons
- Current page shown as plain text

#### Badge Style
- Badge-shaped links with icons
- Arrow dividers
- Disabled styling for current page

### Props

```typescript
interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string    // Only for badge variant
}

interface DashflowBreadcrumbsProps {
  items: BreadcrumbItem[]
  variant?: "simple" | "badge"
  className?: string
}
```

### Usage

#### Simple Variant
```tsx
import { DashflowBreadcrumbs } from "@/components/ui/dashflow-breadcrumbs"

<DashflowBreadcrumbs
  variant="simple"
  items={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Sites", href: "/dashboard/sites" },
    { label: "Analytics" }  // Last item has no href
  ]}
/>
```

#### Badge Variant with Icons
```tsx
<DashflowBreadcrumbs
  variant="badge"
  items={[
    {
      label: "Home",
      href: "/",
      icon: "/images/breadcrumb-icon-1.svg"
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: "/images/breadcrumb-icon-2.svg"
    },
    {
      label: "Current Page",
      icon: "/images/breadcrumb-icon-3.svg"
    }
  ]}
/>
```

### CSS Classes Used
- `.breadcrumb-wrapper` - Container
- `.breadcrumb-link-wrapper` - Link with underline (simple)
- `.breadcrumb-underline` - Animated underline
- `.breadcrumb-current` - Current page text
- `.breadcrumb-badge` - Badge-style link
- `.breadcrumb-badge.current` - Current page badge
- `.breadcrumb-divider` - Separator icon
- `.cursor-not-allowed` - Disabled state

---

## 6. DashflowEmptyState

**File**: `components/ui/dashflow-empty-state.tsx`

### Description
Empty state cards for when there's no data to display.

### Variants

#### Centered
- Icon and text centered
- Button below description
- Best for full-page empty states

#### Left-aligned
- Icon and text in horizontal layout
- Button inline with text
- Best for section empty states

### Props

```typescript
interface DashflowEmptyStateProps {
  icon: string
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  variant?: "centered" | "left"
  className?: string
}
```

### Usage

#### Centered
```tsx
import { DashflowEmptyState } from "@/components/ui/dashflow-empty-state"

<DashflowEmptyState
  variant="centered"
  icon="/images/empty-state-card-icon.png"
  title="No sites connected"
  description="Connect your first site to start fixing SEO issues automatically."
  actionLabel="Connect Site"
  onAction={() => router.push('/dashboard/connect')}
/>
```

#### Left-aligned
```tsx
<DashflowEmptyState
  variant="left"
  icon="/images/empty-state-card-icon.png"
  title="No issues found"
  description="Great! Your site has no SEO issues at the moment."
  actionLabel="Scan Again"
  onAction={() => handleScan()}
/>
```

### CSS Classes Used
- `.card.pd-32px---18px` - Card wrapper
- `.text-center` - Centered variant
- `.card-icon-square.neutral-icon` - Icon styling
- `.text-200.bold.mg-bottom-4px` - Title
- `.btn-secondary.w-inline-block` - Action button
- `.flex.align-start.gap-column-16px` - Left variant layout

---

## Complete Examples

See `components/ui/dashflow-components-examples.tsx` for complete working examples of all components.

### Demo Page

Create a demo page to see all components:

```tsx
// app/dashflow-demo/page.tsx
import { DashflowComponentsShowcase } from "@/components/ui/dashflow-components-examples"

export default function DashflowDemoPage() {
  return <DashflowComponentsShowcase />
}
```

---

## CSS Requirements

All components require the Dashflow X CSS files to be loaded. Ensure these are included in your layout:

```tsx
// app/layout.tsx
<link href="/webflow/normalize.css" rel="stylesheet" />
<link href="/webflow/webflow.css" rel="stylesheet" />
<link href="/webflow/dashflow.css" rel="stylesheet" />
```

---

## Design Patterns

### Webflow Class Naming
All components use exact Webflow class names:
- Utility classes: `.text-100`, `.mg-bottom-24px`, `.pd-32px---18px`
- Component classes: `.card`, `.btn-primary`, `.badge`
- State classes: `.w--current`, `.w--tab-active`

### Responsive Behavior
Components inherit Webflow's responsive breakpoints:
- Desktop: 1920px+
- Laptop: 1440px - 1919px
- Tablet: 768px - 1439px
- Mobile: < 768px

### Accessibility
- Keyboard navigation supported
- Semantic HTML structure
- ARIA attributes where needed
- Focus states on interactive elements

---

## Migration Guide

### From Existing Components

If you already have similar components:

1. **Tooltips**: Replace with `DashflowTooltip` for consistent styling
2. **Modals**: Use `DashflowModal` for dashboard pages
3. **Tabs**: Switch to `DashflowTabs` for Webflow-style tabs
4. **Tables**: Use `DashflowDataTable` or `DashflowUserTable` as needed
5. **Breadcrumbs**: Replace navigation breadcrumbs with `DashflowBreadcrumbs`
6. **Empty States**: Standardize with `DashflowEmptyState`

### Gradual Adoption

You can mix Dashflow components with existing ones:
- Use Dashflow components for new features
- Gradually replace old components in existing pages
- Keep both component systems during transition

---

## Component Status

| Component | Status | File | Variants |
|-----------|--------|------|----------|
| Tooltip | ✅ Complete | `dashflow-tooltip.tsx` | 4 (top, bottom, left, right) |
| Modal | ✅ Complete | `dashflow-modal.tsx` | 2 (standard, centered) |
| Tabs | ✅ Complete | `dashflow-tabs.tsx` | 2 (badge, underline) |
| Table | ✅ Complete | `dashflow-table.tsx` | 2 (data, user) |
| Breadcrumbs | ✅ Complete | `dashflow-breadcrumbs.tsx` | 2 (simple, badge) |
| Empty State | ✅ Complete | `dashflow-empty-state.tsx` | 2 (centered, left) |

All components are production-ready and match the exact Dashflow X template design.

---

## Support

For issues or questions:
1. Check the examples file: `dashflow-components-examples.tsx`
2. Review the original template: `anyros-wondrous-site.webflow/components.html`
3. Inspect Webflow CSS: `anyros-wondrous-site.webflow/css/anyros-wondrous-site.webflow.css`

---

**Last Updated**: 2025-11-04
**Template Version**: Dashflow X (Webflow)
**Components**: 6 complete, production-ready
