# Dashflow X Components - Complete Implementation Guide

## Overview

All Dashflow X CSS components are now properly loaded and working. This guide documents the correct usage of all components.

## CSS Loading Order (CRITICAL)

```html
<link href="/dashflow/normalize.css" rel="stylesheet" type="text/css" />
<link href="/dashflow/webflow.css" rel="stylesheet" type="text/css" />
<link href="/dashflow/dashflow.css" rel="stylesheet" type="text/css" />
<link href="/dashflow/dashflow-utilities.css" rel="stylesheet" type="text/css" />
```

Order matters! Load in this exact sequence.

## Button System

### Primary Button (.btn-primary)
Gradient blue background with hover effects.

```tsx
<button className="btn-primary">
  Primary Button
</button>

<button className="btn-primary large">
  Large Primary Button
</button>

<button className="btn-primary white">
  White Primary Button (for dark backgrounds)
</button>

<button className="btn-primary disabled">
  Disabled Button
</button>
```

### Secondary Button (.btn-secondary)
White background with border and subtle shadow.

```tsx
<button className="btn-secondary">
  Secondary Button
</button>

<button className="btn-secondary disabled">
  Disabled Secondary
</button>
```

## Card System

### Base Card (.card)
Foundation for all card components with border, shadow, and rounded corners.

```tsx
<div className="card">
  Base card with no padding
</div>
```

### Card Padding Variants

```tsx
// Smallest padding (16px)
<div className="card pd-16px">
  Compact card content
</div>

// Standard padding (24px)
<div className="card pd-24px">
  Standard card content
</div>

// Medium padding (22px vertical, 18px horizontal)
<div className="card pd-22px---18px">
  Medium card content
</div>

// Large padding (24px vertical, 18px horizontal)
<div className="card pd-24px---18px">
  Large card content
</div>

// Extra large padding (32px vertical, 24px horizontal)
<div className="card pd-32px---24px">
  Extra large card content
</div>

// Largest padding (32px vertical, 44px horizontal)
<div className="card pd-32px---44px">
  Largest card content
</div>
```

### Hover Card Effect

```tsx
<div className="card pd-24px hover-card-link">
  Card with hover lift effect
</div>
```

## Icon System (.card-icon-square)

Square icon containers with proper sizing and styling.

```tsx
// Small icons (26px)
<div className="card-icon-square _26px">
  <Icon className="w-4 h-4" />
</div>

// Medium icons (40px)
<div className="card-icon-square _40px">
  <Icon className="w-5 h-5" />
</div>

// Large icons (48px) - not in current CSS but can be added
<div className="card-icon-square _48px">
  <Icon className="w-6 h-6" />
</div>

// Neutral variant
<div className="card-icon-square _26px neutral-icon">
  <Icon className="w-4 h-4" />
</div>
```

## Badge System

### Color Badges
```tsx
// Green success badge
<div className="badge green">
  <div className="text-50 medium">Active</div>
</div>

// Blue info badge
<div className="badge blue">
  <div className="text-50 medium">Info</div>
</div>

// Red error badge
<div className="badge red">
  <div className="text-50 medium">Error</div>
</div>

// Orange warning badge
<div className="badge orange">
  <div className="text-50 medium">Warning</div>
</div>

// Primary gradient badge
<div className="badge primary">
  <div className="text-50 medium">Premium</div>
</div>

// Neutral badge
<div className="badge neutral">
  <div className="text-50 medium">Neutral</div>
</div>
```

### Legacy Badge Classes (also supported)
```tsx
<div className="color-badge green">Green</div>
<div className="color-badge blue">Blue</div>
<div className="color-badge red">Red</div>
<div className="color-badge orange">Orange</div>

<div className="primary-badge">Primary</div>
<div className="primary-badge light">Light</div>
<div className="primary-badge white">White</div>

<div className="neutral-badge">Neutral</div>
<div className="neutral-badge neutral-500">Neutral 500</div>
```

## Grid System

### Column Grids
```tsx
// 1 column
<div className="grid-1-column gap-row-24px">
  {/* items */}
</div>

// 2 columns
<div className="grid-2-columns gap-row-24px gap-column-12px">
  {/* items */}
</div>

// 3 columns
<div className="grid-3-columns gap-row-24px gap-column-12px">
  {/* items */}
</div>

// 4 columns
<div className="grid-4-columns gap-row-24px gap-column-12px">
  {/* items */}
</div>
```

### Responsive Grid Modifiers
```tsx
// 4 columns on desktop, 1 on tablet
<div className="grid-4-columns _1-column-tablet gap-row-24px">
  {/* items */}
</div>

// 3 columns on desktop, 1 on mobile
<div className="grid-3-columns _1-column-mbl gap-row-24px">
  {/* items */}
</div>

// 2 columns on desktop, stays 2 on mobile
<div className="grid-2-columns _2-col-mbl gap-row-24px">
  {/* items */}
</div>
```

## Typography System

### Text Sizes (.text-*)
```tsx
<div className="text-50">Smallest text (12px)</div>
<div className="text-100">Small text (14px)</div>
<div className="text-200">Base text (16px)</div>
<div className="text-300">Medium text (18px)</div>
<div className="text-400">Large text (20px)</div>
<div className="text-500">Extra large text (24px)</div>
<div className="text-600">Huge text (30px)</div>
```

### Text Weights
```tsx
<div className="text-200 medium">Medium weight (500)</div>
<div className="text-200 bold">Bold weight (700)</div>
```

### Display Headings
```tsx
<h1 className="display-1 color-neutral-800">
  Display 1 (48px, bold)
</h1>

<h2 className="display-2 color-neutral-800">
  Display 2 (40px, bold)
</h2>

<h3 className="display-3 color-neutral-800">
  Display 3 (36px, bold)
</h3>
```

### Semantic Headings
```tsx
<h1>H1 Heading (28px)</h1>
<h2>H2 Heading (24px)</h2>
<h3>H3 Heading (22px)</h3>
<h4>H4 Heading (16px)</h4>
<h5>H5 Heading (14px)</h5>
<h6>H6 Heading (12px)</h6>
```

## Color Utilities

```tsx
<div className="color-accent-1">Primary accent color</div>
<div className="color-neutral-500">Neutral 500</div>
<div className="color-neutral-600">Neutral 600</div>
<div className="color-neutral-700">Neutral 700</div>
<div className="color-neutral-800">Neutral 800 (dark text)</div>
```

## Layout Utilities

### Flexbox
```tsx
// Vertical flex
<div className="flex-vertical gap-row-16px">
  {/* vertically stacked items */}
</div>

// Horizontal flex
<div className="flex-horizontal gap-column-12px align-center">
  {/* horizontally aligned items */}
</div>

// Space between
<div className="flex-horizontal space-between align-center">
  <div>Left</div>
  <div>Right</div>
</div>
```

### Gap Utilities
```tsx
// Row gaps
<div className="flex-vertical gap-row-8px">...</div>
<div className="flex-vertical gap-row-12px">...</div>
<div className="flex-vertical gap-row-16px">...</div>
<div className="flex-vertical gap-row-24px">...</div>
<div className="flex-vertical gap-row-32px">...</div>

// Column gaps
<div className="flex-horizontal gap-column-4px">...</div>
<div className="flex-horizontal gap-column-8px">...</div>
<div className="flex-horizontal gap-column-12px">...</div>
<div className="flex-horizontal gap-column-16px">...</div>
```

### Margin Utilities
```tsx
<div className="mg-bottom-8px">8px bottom margin</div>
<div className="mg-bottom-12px">12px bottom margin</div>
<div className="mg-bottom-16px">16px bottom margin</div>
<div className="mg-bottom-24px">24px bottom margin</div>
<div className="mg-bottom-32px">32px bottom margin</div>
<div className="mg-bottom-48px">48px bottom margin</div>

<div className="mg-top-12px">12px top margin</div>
<div className="mg-top-16px">16px top margin</div>
<div className="mg-top-24px">24px top margin</div>
```

## Card Amount Container

Used for displaying large numbers/amounts in cards.

```tsx
<div className="card-amount-container green">
  <div className="display-2 color-neutral-800">1,234</div>
</div>

<div className="card-amount-container red">
  <div className="display-2 color-neutral-800">56</div>
</div>

<div className="card-amount-container">
  <div className="display-2 color-neutral-800">789</div>
</div>
```

## Progress Bar

```tsx
<div className="progress-bar-wrapper">
  <div className="progress-bar-bg">
    <div className="progress-bar green" style={{ width: '75%' }}></div>
  </div>
</div>

<div className="progress-bar-wrapper">
  <div className="progress-bar-bg">
    <div className="progress-bar orange" style={{ width: '85%' }}></div>
  </div>
</div>

<div className="progress-bar-wrapper">
  <div className="progress-bar-bg">
    <div className="progress-bar red" style={{ width: '95%' }}></div>
  </div>
</div>
```

## Complete Example: Stats Card

```tsx
<div className="card pd-24px hover-card-link">
  {/* Header with icon and badge */}
  <div className="flex-horizontal space-between align-center mg-bottom-16px">
    <div className="card-icon-square _40px">
      <Icon className="w-5 h-5 color-accent-1" />
    </div>
    <div className="badge green">
      <div className="text-50 medium">↑ 12%</div>
    </div>
  </div>

  {/* Title */}
  <div className="text-100 medium color-neutral-600 mg-bottom-12px">
    Total Sites
  </div>

  {/* Amount */}
  <div className="card-amount-container green">
    <div className="display-2 color-neutral-800">1,234</div>
  </div>
</div>
```

## Complete Example: Dashboard Grid

```tsx
<div className="grid-4-columns _1-column-tablet gap-row-32px gap-column-12px">
  {/* Stats Card 1 */}
  <div className="card pd-24px">
    <div className="flex-horizontal space-between align-center mg-bottom-16px">
      <div className="card-icon-square _26px">
        <div className="text-200">🌐</div>
      </div>
      <div className="badge green">
        <div className="text-50 medium">Active</div>
      </div>
    </div>
    <div className="flex-vertical gap-row-12px">
      <div className="text-100 medium color-neutral-600">Sites Connected</div>
      <div className="card-amount-container green">
        <div className="display-2 color-neutral-800">8</div>
      </div>
    </div>
  </div>

  {/* Stats Card 2 */}
  <div className="card pd-24px">
    <div className="flex-horizontal space-between align-center mg-bottom-16px">
      <div className="card-icon-square _26px neutral-icon">
        <div className="text-200">🔍</div>
      </div>
      <div className="badge red">
        <div className="text-50 medium">Needs attention</div>
      </div>
    </div>
    <div className="flex-vertical gap-row-12px">
      <div className="text-100 medium color-neutral-600">Issues Detected</div>
      <div className="card-amount-container red">
        <div className="display-2 color-neutral-800">23</div>
      </div>
    </div>
  </div>

  {/* Stats Card 3 */}
  <div className="card pd-22px---18px">
    <div className="flex-horizontal space-between align-center mg-bottom-16px">
      <div className="card-icon-square _26px">
        <div className="text-200">✅</div>
      </div>
      <div className="badge green">
        <div className="text-50 medium">This month</div>
      </div>
    </div>
    <div className="flex-vertical gap-row-12px">
      <div className="text-100 medium color-neutral-600">Fixes Applied</div>
      <div className="card-amount-container green">
        <div className="display-2 color-neutral-800">156</div>
      </div>
    </div>
  </div>

  {/* Stats Card 4 */}
  <div className="card pd-16px">
    <div className="flex-horizontal space-between align-center mg-bottom-16px">
      <div className="card-icon-square _26px neutral-icon">
        <div className="text-200">📊</div>
      </div>
      <div className="badge orange">
        <div className="text-50 medium">75/100</div>
      </div>
    </div>
    <div className="flex-vertical gap-row-12px">
      <div className="text-100 medium color-neutral-600">Usage This Month</div>
      <div className="card-amount-container green">
        <div className="display-2 color-neutral-800">75%</div>
      </div>
    </div>
  </div>
</div>
```

## Skeleton Loading States

```tsx
<div className="card pd-24px">
  <div className="flex-vertical gap-row-12px">
    <div className="skeleton-box" style={{ height: '26px', width: '26px' }} />
    <div className="skeleton-box" style={{ height: '16px', width: '60%' }} />
    <div className="skeleton-box" style={{ height: '40px', width: '40%' }} />
  </div>
</div>
```

## Form Inputs

```tsx
<input
  type="text"
  className="input"
  placeholder="Enter text..."
/>

<input
  type="text"
  className="input disabled"
  disabled
  placeholder="Disabled input"
/>
```

## Webflow Layout Helpers

```tsx
// Block container
<div className="w-layout-blockcontainer container-default w-container">
  {/* content */}
</div>

// Horizontal flex
<div className="w-layout-hflex flex-horizontal gap-column-16px align-center">
  {/* horizontal items */}
</div>

// Vertical flex
<div className="w-layout-vflex flex-vertical gap-row-24px">
  {/* vertical items */}
</div>

// Inline block
<div className="w-inline-block">
  {/* inline block content */}
</div>
```

## CSS Variables (Color Palette)

All Dashflow X color variables are available:

```css
--neutral--100: white;
--neutral--200: #f7f8fc;
--neutral--300: #eff1f6;
--neutral--400: #e6e9f1;
--neutral--500: #aab1c6;
--neutral--600: #828aa3;
--neutral--700: #454e66;
--neutral--800: #1f2d54;

--accent--primary-1: #3d73ff;

--system--green-100: #def2e6;
--system--green-200: #7fdca4;
--system--green-300: #14ca74;
--system--green-400: #11845b;

--system--blue-100: #eaf4ff;
--system--blue-200: #8fc3ff;
--system--blue-300: #1d88fe;
--system--blue-400: #086cd9;

--system--red-100: #ffeff0;
--system--red-200: #ffbec2;
--system--300: #ff5a65;
--system--red-400: #dc2b2b;

--system--orange-100: #fff3e4;
--system--orange-200: #ffd19b;
--system--orange-300: #ff9e2c;
--system--orange-400: #d5691b;
```

## Best Practices

1. **Always use Dashflow X classes first** for dashboard UI components
2. **Combine with Tailwind** only when Dashflow X doesn't provide the utility
3. **Use card padding variants** consistently across the dashboard
4. **Badge colors** should match the semantic meaning (green=success, red=error, etc.)
5. **Icon sizes** should match their container: `_26px` → `w-4 h-4`, `_40px` → `w-5 h-5`
6. **Grid responsive classes** ensure mobile-friendly layouts
7. **Color variables** maintain consistent theming

## Component Examples in Codebase

See these files for working examples:
- `components/dashboard/StatsCard.tsx` - All card padding variants
- `components/dashboard/DashboardClient.tsx` - Complete dashboard layout
- `components/ui/dashflow-button.tsx` - React button components
- `components/ui/dashflow-card.tsx` - React card components

## Troubleshooting

**Problem**: Buttons don't have gradient background
**Solution**: Ensure `dashflow.css` is loaded and `.btn-primary` class is used

**Problem**: Cards have no shadow
**Solution**: Check `.card` base class is applied before padding variant

**Problem**: Badges are too large
**Solution**: Use `.text-50 medium` inside badge for proper text sizing

**Problem**: Grid not responsive
**Solution**: Add `_1-column-tablet` or `_1-column-mbl` modifier classes

**Problem**: Icons not centered in card-icon-square
**Solution**: Ensure icon has proper size class (`w-4 h-4`, `w-5 h-5`, etc.)
