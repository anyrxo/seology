# SEOLOGY.AI Design System - Quick Reference

## Color System

### Primary Colors
```tsx
// Primary Blue (Dashflow X)
className="color-primary"      // Text: #3d73ff
className="bg-primary"         // Background: #3d73ff
className="border-primary"     // Border: #3d73ff
```

### System Colors (Status)
```tsx
// Success (Green)
className="color-success"      // Text: #14ca74
className="bg-success"         // Background: #14ca74
className="badge-success"      // Success badge

// Warning (Orange)
className="color-warning"      // Text: #ff9e2c
className="bg-warning"         // Background: #ff9e2c
className="badge-warning"      // Warning badge

// Error/Danger (Red)
className="color-error"        // Text: #ff5a65
className="bg-danger"          // Background: #ff5a65
className="badge-danger"       // Danger badge

// Info (Blue)
className="color-info"         // Text: #1d88fe
className="bg-info"            // Background: #1d88fe
className="badge-info"         // Info badge
```

### Neutral Colors
```tsx
// Text Colors (Light to Dark)
className="color-text-tertiary"   // Lightest text: #828aa3
className="color-text-secondary"  // Secondary text: #828aa3
className="color-text-primary"    // Primary text: #454e66
className="color-heading"         // Heading text: #1f2d54

// Background Colors
className="bg-base"            // Main background: #f7f8fc
className="bg-surface"         // Surface: #ffffff
className="bg-elevated"        // Elevated: #eff1f6

// Border Colors
className="border-light"       // Light border: #eff1f6
className="border-base"        // Base border: #e6e9f1
```

### Button Colors
```tsx
<button className="btn-color-primary">Primary</button>
<button className="btn-color-success">Success</button>
<button className="btn-color-danger">Danger</button>
<button className="btn-color-secondary">Secondary</button>
```

### Badge Colors
```tsx
<span className="badge-primary">Primary</span>
<span className="badge-success">Success</span>
<span className="badge-warning">Warning</span>
<span className="badge-danger">Danger</span>
<span className="badge-info">Info</span>
<span className="badge-neutral">Neutral</span>
```

---

## Typography System

### Headings
```tsx
// H1 - 48-60px (responsive)
<h1 className="heading-h1 color-heading">
  Main Page Title
</h1>

// H2 - 36-48px (responsive)
<h2 className="heading-h2 color-heading">
  Section Title
</h2>

// H3 - 24-30px (responsive)
<h3 className="heading-h3 color-heading">
  Subsection Title
</h3>

// H4 - 20px
<h4 className="heading-h4 color-heading">
  Card Title
</h4>

// H5 - 18px
<h5 className="heading-h5 color-heading">
  Small Heading
</h5>

// H6 - 16px
<h6 className="heading-h6 color-heading">
  Smallest Heading
</h6>
```

### Body Text
```tsx
// Large Body - 18px
<p className="body-large color-text-primary">
  Large body text for important content
</p>

// Standard Body - 16px
<p className="body color-text-primary">
  Standard body text for most content
</p>

// Small Body - 14px
<p className="body-small color-text-secondary">
  Small text for captions and labels
</p>

// Extra Small - 12px
<p className="body-xs color-text-tertiary">
  Extra small text for timestamps
</p>
```

### Display Text (Marketing/Hero)
```tsx
// Display 1 - 72-96px (responsive)
<h1 className="display-1 color-heading">
  Massive Hero Title
</h1>

// Display 2 - 60-72px (responsive)
<h1 className="display-2 color-heading">
  Large Hero Title
</h1>

// Display 3 - 48-60px (responsive)
<h2 className="display-3 color-heading">
  Medium Hero Title
</h2>
```

### Font Weights
```tsx
<span className="font-regular">Regular (400)</span>
<span className="font-medium">Medium (500)</span>
<span className="font-semibold">Semibold (600)</span>
<span className="font-bold">Bold (700)</span>
```

---

## Dark Mode

### Using Dark Mode
```tsx
import { useTheme } from '@/components/theme/ThemeProvider'

function MyComponent() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

### Dark Mode Colors
All color utilities automatically adapt in dark mode:
```tsx
// Same classes work in both light and dark mode
<div className="bg-base color-text-primary">
  Automatically adapts to theme
</div>
```

### Custom Dark Mode Styles
```css
/* Light mode */
.my-component {
  background: var(--neutral--200);
  color: var(--neutral--800);
}

/* Dark mode */
.dark .my-component {
  background: var(--neutral--300);
  color: var(--neutral--100);
}
```

---

## Common Patterns

### Card with Title
```tsx
<div className="card pd-32px bg-surface border-base">
  <h3 className="heading-h3 color-heading mg-bottom-16px">
    Card Title
  </h3>
  <p className="body color-text-primary">
    Card content goes here
  </p>
</div>
```

### Button Group
```tsx
<div className="flex-horizontal gap-column-12px">
  <button className="btn-color-primary">Primary Action</button>
  <button className="btn-color-secondary">Secondary Action</button>
</div>
```

### Status Badge
```tsx
<div className="flex-horizontal align-center gap-column-8px">
  <span className="badge-success">Active</span>
  <span className="body-small color-text-secondary">
    Last updated 2 hours ago
  </span>
</div>
```

### Hero Section
```tsx
<section className="bg-gradient-to-b from-blue-50 to-white py-20">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="display-1 color-heading mg-bottom-24px">
      Hero Title
    </h1>
    <p className="body-large color-text-secondary">
      Hero subtitle or description
    </p>
  </div>
</section>
```

### Form Input
```tsx
<div className="mg-bottom-16px">
  <label className="body-small font-semibold color-heading mg-bottom-8px">
    Label
  </label>
  <input
    type="text"
    className="input large"
    placeholder="Enter value"
  />
</div>
```

---

## CSS Variables

### Accessing Variables
```tsx
// In inline styles
<div style={{
  backgroundColor: 'var(--accent--primary-1)',
  color: 'var(--neutral--800)'
}}>
  Content
</div>

// In CSS
.my-component {
  background: var(--accent--primary-1);
  color: var(--neutral--800);
  border: 1px solid var(--neutral--400);
}
```

### Available Variables

**Primary:**
- `--accent--primary-1` - Primary blue (#3d73ff)

**System Colors:**
- `--system--green-300` - Success (#14ca74)
- `--system--orange-300` - Warning (#ff9e2c)
- `--system--300` - Error (#ff5a65)
- `--system--blue-300` - Info (#1d88fe)

**Neutrals (Light Mode):**
- `--neutral--100` - #ffffff (white)
- `--neutral--200` - #f7f8fc (lightest gray)
- `--neutral--300` - #eff1f6 (light gray)
- `--neutral--400` - #e6e9f1 (medium gray)
- `--neutral--500` - #aab1c6 (gray)
- `--neutral--600` - #828aa3 (dark gray)
- `--neutral--700` - #454e66 (darker gray)
- `--neutral--800` - #1f2d54 (darkest)

**Neutrals (Dark Mode):**
- `--neutral--100` - #0f1319 (darkest)
- `--neutral--200` - #1a1d2e (main bg)
- `--neutral--300` - #252938 (card bg)
- `--neutral--400` - #2f3447 (elevated)
- `--neutral--500` - #52566d (borders)
- `--neutral--600` - #9095a8 (secondary text)
- `--neutral--700` - #c5c9d6 (primary text)
- `--neutral--800` - #e6e8f0 (heading text)

---

## Responsive Breakpoints

```tsx
// Tailwind breakpoints
sm:  640px  // Small devices (large phones)
md:  768px  // Medium devices (tablets)
lg:  992px  // Large devices (desktops)
xl:  1280px // Extra large devices
2xl: 1536px // 2X large devices

// Usage
<h1 className="text-4xl md:text-5xl lg:text-6xl">
  Responsive Title
</h1>
```

---

## Spacing Scale

```tsx
// Dashflow X spacing (use existing classes)
mg-top-8px, mg-bottom-8px    // 8px margin
mg-top-16px, mg-bottom-16px  // 16px margin
mg-top-24px, mg-bottom-24px  // 24px margin
mg-top-32px, mg-bottom-32px  // 32px margin
mg-top-48px, mg-bottom-48px  // 48px margin
mg-top-64px, mg-bottom-64px  // 64px margin

pd-16px   // 16px padding
pd-24px   // 24px padding
pd-32px   // 32px padding
pd-64px   // 64px padding

gap-column-8px, gap-row-8px    // 8px gap
gap-column-12px, gap-row-12px  // 12px gap
gap-column-16px, gap-row-16px  // 16px gap
gap-column-24px, gap-row-24px  // 24px gap
```

---

## Best Practices

### 1. Always use utility classes for colors
❌ Don't:
```tsx
<h1 style={{ color: '#1f2d54' }}>Title</h1>
```

✅ Do:
```tsx
<h1 className="heading-h1 color-heading">Title</h1>
```

### 2. Use semantic color names
❌ Don't:
```tsx
<span className="text-green-500">Active</span>
```

✅ Do:
```tsx
<span className="badge-success">Active</span>
```

### 3. Combine typography with color utilities
❌ Don't:
```tsx
<h2 style={{ fontSize: '36px', color: '#1f2d54' }}>Title</h2>
```

✅ Do:
```tsx
<h2 className="heading-h2 color-heading">Title</h2>
```

### 4. Use consistent spacing
❌ Don't:
```tsx
<div style={{ marginBottom: '15px' }}>Content</div>
```

✅ Do:
```tsx
<div className="mg-bottom-16px">Content</div>
```

### 5. Let dark mode adapt automatically
❌ Don't:
```tsx
<div className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
```

✅ Do:
```tsx
<div className="bg-surface">
```

---

## Component Examples

### Dashboard Card
```tsx
<div className="card pd-32px bg-surface border-base">
  <div className="flex-horizontal align-center space-between mg-bottom-16px">
    <h3 className="heading-h4 color-heading">Card Title</h3>
    <span className="badge-success">Active</span>
  </div>
  <p className="body color-text-primary mg-bottom-16px">
    Card description goes here
  </p>
  <button className="btn-color-primary">Action</button>
</div>
```

### Stat Card
```tsx
<div className="card pd-24px bg-elevated border-base text-center">
  <div className="heading-h2 color-primary mg-bottom-8px">
    1,234
  </div>
  <div className="body-small color-text-secondary">
    Total Items
  </div>
</div>
```

### Alert Banner
```tsx
<div className="card pd-24px bg-warning border-warning flex-horizontal gap-column-12px">
  <AlertCircle className="h-5 w-5 color-warning" />
  <div>
    <h4 className="body font-semibold color-heading mg-bottom-4px">
      Warning
    </h4>
    <p className="body-small color-text-primary">
      This is a warning message
    </p>
  </div>
</div>
```

---

## Migration Guide

### Old Style → New Style

```tsx
// Typography
<h1 className="text-5xl font-bold text-gray-900">
  ↓
<h1 className="heading-h1 color-heading">

// Colors
<button className="bg-blue-600 text-white">
  ↓
<button className="btn-color-primary">

// Status Badges
<span className="bg-green-100 text-green-800">
  ↓
<span className="badge-success">

// Body Text
<p className="text-base text-gray-700">
  ↓
<p className="body color-text-primary">
```

---

## Reference Links

- Full documentation: `CRITICAL_FIXES_SUMMARY.md`
- Project guide: `CLAUDE.md`
- Components: `UI_COMPONENTS_DOCUMENTATION.md`

---

**Last Updated:** November 4, 2025
**Version:** 1.0.0
