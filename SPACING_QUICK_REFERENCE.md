# Spacing Quick Reference Card

## Standard Section Template

```tsx
<section className="py-32 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
        Section Title
      </h2>
      <p className="text-xl text-white/60 max-w-2xl mx-auto">
        Section description
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Cards */}
    </div>
  </div>
</section>
```

## Quick Spacing Guide

| Use Case | Class | Pixels |
|----------|-------|--------|
| Section padding | `py-32` | 128px |
| Container max width | `max-w-7xl` | 1280px |
| Responsive padding | `px-4 sm:px-6 lg:px-8` | 16px → 24px → 32px |
| Card grid gap | `gap-8` | 32px |
| Heading spacing | `mb-6` | 24px |
| Paragraph spacing | `mb-8` | 32px |
| Section title group | `mb-20` | 80px |

## Header Heights

```tsx
Announcement Bar: 48px (h-12)
Navbar: 64px (h-16)
Total: 112px

Main content padding: pt-[112px]
Hero height: min-h-[calc(100vh-112px)]
```

## Z-Index Stack

```
50 - Announcement Bar
50 - Mobile Menu
40 - Navbar
30 - Mobile Overlay
10 - Content
0  - Background
```

## Typography Scale

```tsx
// Hero (H1)
className="text-6xl md:text-8xl font-bold text-white mb-8"

// Section Header (H2)
className="text-5xl md:text-6xl font-bold text-white mb-6"

// Subsection (H3)
className="text-3xl md:text-4xl font-bold text-white mb-4"

// Large Body
className="text-xl md:text-2xl text-white/60 mb-12"

// Standard Body
className="text-base md:text-lg text-white/70 mb-8"
```

## Background Alternation

```tsx
// Default
className="bg-black"

// Alternate
className="bg-gray-900/50"
```

## Common Patterns

### Two Column Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
```

### Three Column Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
```

### Centered Text Block
```tsx
<div className="max-w-2xl mx-auto text-center">
```

### Centered Content
```tsx
<div className="max-w-4xl mx-auto">
```

## Import Spacing Utilities

```tsx
import { spacing, sectionClass, containerClass } from '@/lib/spacing'

<section className={sectionClass}>
  <div className={containerClass}>
    {/* Content */}
  </div>
</section>
```

## Checklist for New Sections

- [ ] Use `py-32` for vertical padding
- [ ] Use `px-4 sm:px-6 lg:px-8` for responsive horizontal padding
- [ ] Use `max-w-7xl mx-auto` for container
- [ ] Use `mb-20` for section title group spacing
- [ ] Use `gap-8` for grid layouts
- [ ] Alternate background (black → gray-900/50)
- [ ] Follow typography hierarchy
- [ ] Test on mobile, tablet, desktop

## Common Mistakes to Avoid

❌ `py-20` (inconsistent - use py-32)
❌ `max-w-5xl` (use max-w-7xl for sections)
❌ `mb-10` (use mb-8, mb-12, mb-16, etc.)
❌ `gap-6` (use gap-8 for standard grids)
❌ Fixed top padding values (use pt-[112px])

## Need Help?

See full documentation:
- `SPACING_SYSTEM.md` - Complete spacing system guide
- `LAYOUT_FIXES_SUMMARY.md` - Summary of all fixes applied
- `lib/spacing.ts` - Spacing constants and utilities
