# Design System

Complete design system documentation for SEOLOGY.AI.

## Table of Contents

- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing System](#spacing-system)
- [Component Variants](#component-variants)
- [Layout Patterns](#layout-patterns)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Icons](#icons)
- [Shadows](#shadows)
- [Borders and Radius](#borders-and-radius)

---

## Color Palette

### Core Colors

SEOLOGY.AI uses a dark theme with blue accents.

#### Background Colors

```css
/* Main backgrounds */
--background: #0a0a0a          /* Body background */
--surface-primary: #111111     /* Primary surfaces (cards, modals) */
--surface-secondary: #1a1a1a   /* Secondary surfaces */

/* Tailwind equivalents */
bg-gray-950   /* #0a0a0a */
bg-gray-900   /* #111827 */
bg-gray-800   /* #1f2937 */
```

#### Text Colors

```css
/* Text hierarchy */
--text-primary: #ededed        /* Main text, headings */
--text-secondary: #9ca3af      /* Secondary text */
--text-tertiary: #6b7280       /* Tertiary text, placeholders */
--text-disabled: #4b5563       /* Disabled state */

/* Tailwind equivalents */
text-white       /* #ffffff - Primary */
text-gray-300    /* #d1d5db - Secondary */
text-gray-400    /* #9ca3af - Tertiary */
text-gray-500    /* #6b7280 - Placeholders */
text-gray-600    /* #4b5563 - Disabled */
```

#### Brand Colors

```css
/* Primary (Blue) */
--blue-50: #eff6ff
--blue-100: #dbeafe
--blue-200: #bfdbfe
--blue-300: #93c5fd
--blue-400: #60a5fa
--blue-500: #3b82f6   /* Primary brand color */
--blue-600: #2563eb   /* Buttons, links */
--blue-700: #1d4ed8   /* Button hover */
--blue-800: #1e40af
--blue-900: #1e3a8a

/* Usage */
bg-blue-600       /* Buttons */
bg-blue-700       /* Button hover */
text-blue-500     /* Links */
border-blue-500   /* Focus states */
```

#### Semantic Colors

```css
/* Success (Green) */
--green-500: #10b981
--green-600: #059669
--green-700: #047857
--green-900: #064e3b   /* Success badge background */

/* Warning (Yellow) */
--yellow-500: #f59e0b
--yellow-600: #d97706
--yellow-900: #78350f   /* Warning badge background */

/* Error/Danger (Red) */
--red-500: #ef4444
--red-600: #dc2626
--red-700: #b91c1c
--red-900: #7f1d1d     /* Error badge background */

/* Info (Blue) - same as brand */
--blue-500: #3b82f6
--blue-600: #2563eb
--blue-900: #1e3a8a
```

#### Neutral Colors (Gray)

```css
/* Border and divider colors */
--gray-700: #374151   /* Borders */
--gray-800: #1f2937   /* Subtle borders, secondary surfaces */
--gray-900: #111827   /* Primary surfaces */
```

### Color Usage Guidelines

#### Buttons

```tsx
// Primary action
<Button className="bg-blue-600 hover:bg-blue-700 text-white">
  Primary Action
</Button>

// Secondary action
<Button className="bg-gray-700 hover:bg-gray-600 text-white">
  Secondary Action
</Button>

// Destructive action
<Button className="bg-red-600 hover:bg-red-700 text-white">
  Delete
</Button>

// Success action
<Button className="bg-green-600 hover:bg-green-700 text-white">
  Approve
</Button>
```

#### Status Badges

```tsx
// Success
<Badge className="bg-green-900 text-green-200">Connected</Badge>

// Warning
<Badge className="bg-yellow-900 text-yellow-200">Pending</Badge>

// Error
<Badge className="bg-red-900 text-red-200">Error</Badge>

// Info
<Badge className="bg-blue-900 text-blue-200">New</Badge>
```

#### Links

```css
.link {
  color: #3b82f6;        /* blue-500 */
  transition: color 150ms;
}

.link:hover {
  color: #60a5fa;        /* blue-400 */
}
```

---

## Typography

### Font Family

```css
body {
  font-family: Inter, Arial, Helvetica, sans-serif;
}

/* Code/monospace */
code, pre {
  font-family: 'Courier New', Courier, monospace;
}
```

### Font Sizes

```css
/* Tailwind scale */
text-xs    /* 12px - 0.75rem   - Small labels, captions */
text-sm    /* 14px - 0.875rem  - Body text (small) */
text-base  /* 16px - 1rem      - Body text (default) */
text-lg    /* 18px - 1.125rem  - Emphasized text */
text-xl    /* 20px - 1.25rem   - Small headings */
text-2xl   /* 24px - 1.5rem    - H3 headings */
text-3xl   /* 30px - 1.875rem  - H2 headings */
text-4xl   /* 36px - 2.25rem   - H1 headings */
text-5xl   /* 48px - 3rem      - Large headings */
text-6xl   /* 60px - 3.75rem   - Hero headings */
text-7xl   /* 72px - 4.5rem    - Extra large */
```

### Font Weights

```css
font-normal    /* 400 - Regular text */
font-medium    /* 500 - Emphasized text */
font-semibold  /* 600 - Subheadings */
font-bold      /* 700 - Headings */
```

### Line Heights

```css
leading-none      /* 1 */
leading-tight     /* 1.25 - Headings */
leading-normal    /* 1.5 - Body text */
leading-relaxed   /* 1.75 - Long-form content */
```

### Typography Scale Examples

```tsx
// Page heading
<h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
  Welcome to SEOLOGY.AI
</h1>

// Section heading
<h2 className="text-3xl font-bold text-white mb-4">
  Your Sites
</h2>

// Subsection heading
<h3 className="text-2xl font-semibold text-white mb-3">
  Recent Activity
</h3>

// Card title
<h4 className="text-xl font-semibold text-white">
  Site Details
</h4>

// Body text
<p className="text-base text-gray-300 leading-normal">
  This is regular body text...
</p>

// Small text
<p className="text-sm text-gray-400">
  Last updated 2 hours ago
</p>

// Label
<label className="text-sm font-medium text-gray-300">
  Email Address
</label>

// Caption
<span className="text-xs text-gray-500">
  Required field
</span>
```

### Text Hierarchy

```
Hero Title       text-7xl font-bold        (Landing pages)
Page Title       text-4xl font-bold        (Main page heading)
Section Title    text-3xl font-bold        (Major sections)
Subsection       text-2xl font-semibold    (Minor sections)
Card Title       text-xl font-semibold     (Cards, panels)
Body Large       text-lg font-normal       (Emphasized content)
Body Default     text-base font-normal     (Regular text)
Body Small       text-sm font-normal       (Secondary text)
Caption          text-xs font-normal       (Metadata, timestamps)
```

---

## Spacing System

### Spacing Scale

Based on Tailwind's 4px base unit.

```css
0     /* 0px */
1     /* 4px    - 0.25rem */
2     /* 8px    - 0.5rem  */
3     /* 12px   - 0.75rem */
4     /* 16px   - 1rem    */
5     /* 20px   - 1.25rem */
6     /* 24px   - 1.5rem  */
8     /* 32px   - 2rem    */
10    /* 40px   - 2.5rem  */
12    /* 48px   - 3rem    */
16    /* 64px   - 4rem    */
20    /* 80px   - 5rem    */
24    /* 96px   - 6rem    */
32    /* 128px  - 8rem    */
```

### Spacing Usage

#### Component Internal Spacing

```tsx
// Button padding
<button className="px-4 py-2">        /* 16px horizontal, 8px vertical */
<button className="px-6 py-3">        /* 24px horizontal, 12px vertical */
<button className="px-8 py-4">        /* 32px horizontal, 16px vertical */

// Card padding
<div className="p-6">                 /* 24px all sides */
<div className="p-8">                 /* 32px all sides */

// Input padding
<input className="px-3 py-2">         /* 12px horizontal, 8px vertical */
```

#### Layout Spacing

```tsx
// Gap between elements
<div className="space-y-4">           /* 16px vertical gap */
<div className="space-y-6">           /* 24px vertical gap */
<div className="space-y-8">           /* 32px vertical gap */

// Grid gaps
<div className="grid grid-cols-3 gap-4">  /* 16px gap */
<div className="grid grid-cols-3 gap-6">  /* 24px gap */

// Margin
<div className="mb-4">                /* 16px bottom margin */
<div className="mb-6">                /* 24px bottom margin */
<div className="mb-8">                /* 32px bottom margin */
```

#### Section Spacing

```tsx
// Between page sections
<section className="py-12">           /* 48px vertical padding */
<section className="py-16">           /* 64px vertical padding */
<section className="py-20">           /* 80px vertical padding */

// Page container padding
<main className="p-6">                /* Mobile: 24px */
<main className="p-8">                /* Desktop: 32px */
```

### Spacing Guidelines

| Context | Size | Usage |
|---------|------|-------|
| Tight spacing | 2-3 (8-12px) | Related items, form fields |
| Default spacing | 4-6 (16-24px) | General layout, cards |
| Loose spacing | 8-12 (32-48px) | Section separation |
| Extra loose | 16-24 (64-96px) | Major sections, hero |

---

## Component Variants

### Button Variants

```tsx
// Variant + Size combinations
<Button variant="primary" size="sm">Small Primary</Button>
<Button variant="primary" size="default">Default Primary</Button>
<Button variant="primary" size="lg">Large Primary</Button>

<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link Style</Button>
<Button variant="success">Approve</Button>

// Icon button
<Button variant="ghost" size="icon">
  <X className="h-4 w-4" />
</Button>
```

### Badge Variants

```tsx
<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
```

### Input Variants

```tsx
// Default
<Input type="text" />

// With label
<Input label="Email" type="email" />

// With error
<Input error="This field is required" />

// Disabled
<Input disabled />

// Required
<Input required label="Name" />
```

### Card Compositions

```tsx
// Basic card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Card with description
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Card with footer actions
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

---

## Layout Patterns

### Container Widths

```tsx
// Full width
<div className="w-full">

// Constrained containers
<div className="max-w-7xl mx-auto">    /* 1280px max */
<div className="max-w-6xl mx-auto">    /* 1152px max */
<div className="max-w-4xl mx-auto">    /* 896px max */
<div className="max-w-2xl mx-auto">    /* 672px max */
<div className="max-w-md mx-auto">     /* 448px max */
```

### Grid Layouts

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>

// Stats grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Stat cards */}
</div>

// Two column layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <div>{/* Left column */}</div>
  <div>{/* Right column */}</div>
</div>
```

### Flexbox Layouts

```tsx
// Horizontal with gap
<div className="flex items-center gap-4">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</div>

// Space between
<div className="flex items-center justify-between">
  <h2>Title</h2>
  <Button>Action</Button>
</div>

// Vertical stack
<div className="flex flex-col space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Center content
<div className="flex items-center justify-center min-h-screen">
  <div>Centered content</div>
</div>
```

### Dashboard Layout

```tsx
// Sidebar + main content
<div className="flex min-h-screen">
  {/* Sidebar */}
  <aside className="w-64 bg-gray-900 border-r border-gray-800">
    <Sidebar />
  </aside>

  {/* Main content */}
  <main className="flex-1 p-8">
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </main>
</div>
```

### Marketing Layout

```tsx
// Hero section
<section className="py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto text-center">
    <h1 className="text-5xl md:text-7xl font-bold">
      Hero Title
    </h1>
    <p className="text-xl text-gray-400 mt-6">
      Subtitle
    </p>
  </div>
</section>

// Feature grid
<section className="py-20 px-4">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Feature cards */}
    </div>
  </div>
</section>
```

---

## Responsive Breakpoints

### Tailwind Breakpoints

```css
/* Mobile first approach */
sm:   /* 640px  - Small tablets */
md:   /* 768px  - Tablets */
lg:   /* 1024px - Small laptops */
xl:   /* 1280px - Laptops */
2xl:  /* 1536px - Large screens */
```

### Usage Examples

```tsx
// Responsive grid
<div className="
  grid
  grid-cols-1      /* Mobile: 1 column */
  sm:grid-cols-2   /* Tablet: 2 columns */
  lg:grid-cols-3   /* Desktop: 3 columns */
  gap-4
">

// Responsive text size
<h1 className="
  text-3xl         /* Mobile */
  md:text-5xl      /* Tablet */
  lg:text-6xl      /* Desktop */
">

// Responsive padding
<div className="
  p-4              /* Mobile: 16px */
  md:p-6           /* Tablet: 24px */
  lg:p-8           /* Desktop: 32px */
">

// Hide on mobile
<div className="hidden md:block">
  Only visible on tablet and up
</div>

// Show only on mobile
<div className="block md:hidden">
  Only visible on mobile
</div>
```

### Responsive Patterns

```tsx
// Sidebar toggle on mobile
<div className="flex">
  {/* Mobile: hidden, Desktop: visible */}
  <aside className="hidden lg:block w-64">
    <Sidebar />
  </aside>

  {/* Mobile menu button */}
  <button className="lg:hidden">
    <Menu />
  </button>
</div>

// Responsive container padding
<div className="px-4 sm:px-6 lg:px-8">
  Content with responsive padding
</div>

// Stack on mobile, row on desktop
<div className="flex flex-col lg:flex-row gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## Icons

SEOLOGY.AI uses **Lucide React** icons.

### Installation

```bash
npm install lucide-react
```

### Usage

```tsx
import {
  Home,
  Globe,
  Settings,
  AlertCircle,
  Check,
  X,
  Search,
  Menu,
  ChevronDown,
  Plus,
  Trash2,
  Edit,
  Eye,
  Download
} from 'lucide-react'

// In component
<Home className="h-5 w-5 text-gray-400" />
<Globe className="h-6 w-6" />

// With button
<Button variant="ghost" size="icon">
  <Settings className="h-4 w-4" />
</Button>
```

### Icon Sizes

```tsx
// Small (16px)
<Icon className="h-4 w-4" />

// Default (20px)
<Icon className="h-5 w-5" />

// Medium (24px)
<Icon className="h-6 w-6" />

// Large (32px)
<Icon className="h-8 w-8" />
```

### Common Icons

| Icon | Usage |
|------|-------|
| `Home` | Dashboard, home page |
| `Globe` | Sites, websites |
| `Settings` | Settings, configuration |
| `AlertCircle` | Issues, warnings |
| `Check` | Success, completed |
| `X` | Close, delete, remove |
| `Search` | Search functionality |
| `Menu` | Mobile menu toggle |
| `ChevronDown` | Dropdown indicators |
| `Plus` | Add, create new |
| `Trash2` | Delete action |
| `Edit` | Edit action |
| `Eye` | View action |

---

## Shadows

### Shadow Scale

```css
/* Tailwind shadows */
shadow-sm      /* Subtle - Cards */
shadow         /* Default - Dropdowns */
shadow-md      /* Medium - Modals */
shadow-lg      /* Large - Important modals */
shadow-xl      /* Extra large - Overlays */
shadow-2xl     /* Maximum - Hero elements */

/* No shadow */
shadow-none
```

### Usage

```tsx
// Card with subtle shadow
<div className="bg-gray-900 rounded-lg shadow-sm">
  Card content
</div>

// Elevated card
<div className="bg-gray-900 rounded-lg shadow-lg">
  Important content
</div>

// Button hover shadow
<button className="shadow-sm hover:shadow-lg transition-shadow">
  Hover me
</button>

// Modal overlay
<div className="fixed inset-0 bg-gray-900 shadow-2xl">
  Modal content
</div>
```

---

## Borders and Radius

### Border Width

```css
border         /* 1px */
border-2       /* 2px */
border-4       /* 4px */

border-t       /* Top only */
border-r       /* Right only */
border-b       /* Bottom only */
border-l       /* Left only */
```

### Border Radius

```css
rounded-none   /* 0px */
rounded-sm     /* 2px */
rounded        /* 4px */
rounded-md     /* 6px */
rounded-lg     /* 8px   - Default for cards/buttons */
rounded-xl     /* 12px */
rounded-2xl    /* 16px */
rounded-3xl    /* 24px */
rounded-full   /* 9999px - Circles, pills */
```

### Border Colors

```css
border-gray-800    /* Default border */
border-gray-700    /* Lighter border */
border-blue-500    /* Focus state */
border-red-500     /* Error state */
```

### Usage

```tsx
// Card border
<div className="border border-gray-800 rounded-lg">

// Hover effect
<div className="border border-gray-800 hover:border-blue-500 transition-colors">

// Focus state
<input className="border border-gray-700 focus:border-blue-500 focus:outline-none">

// Divider
<hr className="border-t border-gray-800" />

// Rounded button
<button className="rounded-lg">Button</button>

// Circular avatar
<div className="rounded-full h-10 w-10">
```

---

## Design Tokens (CSS Variables)

For easy theming, consider using CSS variables:

```css
:root {
  /* Colors */
  --color-background: #0a0a0a;
  --color-surface: #111827;
  --color-surface-hover: #1f2937;

  --color-text-primary: #ededed;
  --color-text-secondary: #9ca3af;
  --color-text-tertiary: #6b7280;

  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;

  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  --color-border: #374151;

  /* Spacing */
  --space-xs: 0.5rem;    /* 8px */
  --space-sm: 0.75rem;   /* 12px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */

  /* Radius */
  --radius-sm: 0.25rem;  /* 4px */
  --radius-md: 0.5rem;   /* 8px */
  --radius-lg: 0.75rem;  /* 12px */

  /* Transitions */
  --transition-fast: 150ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;
}
```

---

## Component Library Checklist

When building new components:

- [ ] Use design system colors
- [ ] Follow spacing scale
- [ ] Include all variants
- [ ] Support dark theme
- [ ] Responsive by default
- [ ] Accessible (ARIA, keyboard)
- [ ] Consistent with existing components
- [ ] Document in Storybook (if available)

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [Radix UI](https://www.radix-ui.com/) (for accessible components)
- [Color Hunt](https://colorhunt.co/) (color inspiration)
- [Type Scale](https://typescale.com/) (typography scale generator)

