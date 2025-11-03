# SEOLOGY.AI Spacing System

This document outlines the consistent spacing system used across the marketing site to create a polished, professional SaaS experience.

## Spacing Scale (8px Grid System)

All spacing follows Tailwind's 8px grid system for mathematical consistency:

```
4px   = 1 unit  (spacing-1)
8px   = 2 units (spacing-2)
12px  = 3 units (spacing-3)
16px  = 4 units (spacing-4)
24px  = 6 units (spacing-6)
32px  = 8 units (spacing-8)
48px  = 12 units (spacing-12)
64px  = 16 units (spacing-16)
96px  = 24 units (spacing-24)
128px = 32 units (spacing-32)
192px = 48 units (spacing-48)
```

## Section Spacing

### Standard Sections
**All major sections use `py-32` (128px):**
- Features sections
- How it works
- Testimonials
- Platform support
- Pricing previews
- FAQ sections
- CTA sections

### Hero Sections
**Use `min-h-[calc(100vh-112px)]` to account for fixed header:**
- Landing page hero
- Feature page hero
- Pricing page hero

The 112px accounts for:
- Announcement bar: 48px (h-12)
- Navbar: 64px (h-16)
- Total: 112px

### Alternating Backgrounds
Sections alternate between:
- `bg-black` (default)
- `bg-gray-900/50` (subtle variation)

This creates visual rhythm without being jarring.

## Container Spacing

### Horizontal Padding
**Always use responsive padding:**
```tsx
className="px-4 sm:px-6 lg:px-8"
```

This provides:
- Mobile (< 640px): 16px padding
- Tablet (640-1024px): 24px padding
- Desktop (> 1024px): 32px padding

### Max Width
**Standard container width:**
```tsx
className="max-w-7xl mx-auto"
```

This creates:
- Centered content
- Max width of 1280px (80rem)
- Prevents content from stretching too wide on large monitors

### Combined Container Class
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

## Component Spacing

### Between Major Sections
```tsx
mb-32  // 128px gap between major page sections
mb-24  // 96px gap for subsections
mb-16  // 64px gap for related components
```

### Text Hierarchy
```tsx
mb-6   // 24px after headings (H1, H2)
mb-4   // 16px after subheadings (H3, H4)
mb-8   // 32px after paragraphs
mb-12  // 48px after text blocks
```

### Grid Gaps
```tsx
gap-8  // 32px between cards (standard)
gap-6  // 24px for tighter grids
gap-4  // 16px for compact layouts
```

## Fixed Header System

### Z-Index Hierarchy
```tsx
z-50  // Announcement Bar (top-most)
z-50  // Mobile Menu (when open)
z-40  // Navbar (below announcement)
z-30  // Mobile Menu Overlay
z-10  // Sticky content
z-0   // Background elements
```

### Positioning
```tsx
// Announcement Bar
className="fixed top-0 left-0 right-0 z-50"

// Navbar
className="fixed top-12 left-0 right-0 z-40"

// Mobile Menu
className="fixed top-28 right-0 ... z-50"

// Mobile Overlay
className="fixed inset-0 top-28 ... z-30"
```

### Main Content Padding
```tsx
<main className="pt-[112px]">
  {/* All page content */}
</main>
```

This ensures content doesn't hide behind the fixed header.

## Typography Spacing

### Heading Sizes
```tsx
// H1 (Hero)
text-6xl md:text-8xl    // 60px → 96px
leading-[1.1]           // Tight line height
mb-8                    // 32px margin bottom

// H2 (Section Headers)
text-5xl md:text-6xl    // 48px → 60px
leading-tight           // Tight line height
mb-6                    // 24px margin bottom

// H3 (Subsection Headers)
text-3xl md:text-4xl    // 30px → 36px
leading-tight
mb-4                    // 16px margin bottom

// Body Text
text-xl md:text-2xl     // 20px → 24px (large body)
text-base md:text-lg    // 16px → 18px (standard body)
leading-relaxed         // Comfortable reading
mb-8                    // 32px margin bottom
```

## Responsive Spacing Adjustments

### Mobile (< 640px)
```tsx
// Reduce section padding on mobile
py-24  // Instead of py-32

// Tighter text spacing
mb-6   // Instead of mb-8

// Smaller gaps
gap-4  // Instead of gap-6 or gap-8
```

### Tablet (640px - 1024px)
```tsx
// Use standard spacing
py-32  // Standard section padding
mb-8   // Standard component spacing
```

### Desktop (> 1024px)
```tsx
// Same as tablet
py-32  // Standard section padding
mb-8   // Standard component spacing
```

## Utility Helper (lib/spacing.ts)

Import standardized spacing:

```tsx
import { spacing, sectionClass, containerClass } from '@/lib/spacing'

// Use predefined classes
<section className={sectionClass}>
  <div className={containerClass}>
    {/* Content */}
  </div>
</section>

// Access specific spacing
<div className={spacing.component.lg}>
  {/* 96px margin bottom */}
</div>
```

## Common Patterns

### Full Section
```tsx
<section className="py-32 px-4 sm:px-6 lg:px-8 bg-black">
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

### Alternating Section
```tsx
<section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
  {/* Same structure */}
</section>
```

### Hero Section
```tsx
<section className="relative min-h-[calc(100vh-112px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
  <div className="relative max-w-7xl mx-auto text-center">
    <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
      Hero Title
    </h1>
    <p className="text-xl md:text-2xl text-white/60 mb-12">
      Hero description
    </p>
    {/* CTAs */}
  </div>
</section>
```

## Do's and Don'ts

### DO
✅ Use py-32 for all major sections
✅ Use max-w-7xl for standard containers
✅ Use mb-20 (80px) for section title groups
✅ Use gap-8 for card grids
✅ Use px-4 sm:px-6 lg:px-8 for responsive padding
✅ Account for 112px fixed header height

### DON'T
❌ Mix py-16, py-20, py-24 randomly
❌ Use arbitrary max-width values
❌ Forget mobile responsive padding
❌ Overlap fixed header with content
❌ Use inconsistent gaps in grids
❌ Ignore z-index hierarchy

## Visual Rhythm

Sections follow this pattern:

```
[Announcement Bar - 48px]
[Navbar - 64px]
[Hero - ~88vh]
[Stats - 128px padding]
[Problem - 128px padding]
[How It Works - 128px padding (subtle bg)]
[Features - 128px padding]
[Testimonials - 128px padding (subtle bg)]
[Platform Support - 128px padding]
[Social Proof - 128px padding]
[Pricing Preview - 128px padding (subtle bg)]
[FAQ - 128px padding]
[CTA - 128px padding]
[Footer]
```

This creates a consistent, predictable rhythm that guides the user through the page.

## Testing Checklist

- [ ] Header doesn't overlap with content
- [ ] All sections have consistent py-32 spacing
- [ ] All containers use max-w-7xl
- [ ] Mobile padding is responsive (px-4 sm:px-6 lg:px-8)
- [ ] Hero sections account for 112px header
- [ ] Z-index hierarchy is respected
- [ ] Mobile menu doesn't overlap announcement bar
- [ ] Text spacing feels balanced (not too tight, not too loose)
- [ ] Grid gaps are consistent (gap-8 standard)
- [ ] Sections alternate backgrounds smoothly

## Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

At breakpoints:
- 375px (iPhone SE)
- 768px (iPad)
- 1024px (Desktop)
- 1440px (Large desktop)

## Maintenance

When adding new sections:

1. Use the standard section pattern
2. Apply py-32 for vertical spacing
3. Use max-w-7xl mx-auto for containers
4. Add responsive padding px-4 sm:px-6 lg:px-8
5. Follow the typography hierarchy
6. Maintain z-index hierarchy for layered elements

## Reference

World-class SaaS examples with excellent spacing:
- Linear.app
- Vercel.com
- Stripe.com
- Cal.com
- Raycast.com

Study their:
- Vertical rhythm
- Container widths
- Text spacing
- Component gaps
- Responsive behavior
