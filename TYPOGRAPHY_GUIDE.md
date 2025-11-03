# Typography & Spacing Guide for SEOLOGY.AI

This document provides comprehensive guidelines for using the typography and spacing systems in SEOLOGY.AI to achieve pixel-perfect visual harmony.

## Typography System

### Overview

Our typography system is based on a modular scale with responsive variants, ensuring perfect visual hierarchy across all devices.

**Location**: `lib/typography.ts`

### Typography Scale

#### Display Text (Hero Headings)

Use for landing page heroes and major marketing headlines:

```tsx
import { typography } from '@/lib/typography'

// Extra Large Display (128px → 96px → 72px)
<h1 className={typography.display.xl}>Revolutionary SEO Platform</h1>

// Large Display (96px → 72px → 60px)
<h1 className={typography.display.lg}>Transform Your SEO</h1>

// Medium Display (72px → 60px → 48px)
<h1 className={typography.display.md}>AI-Powered Automation</h1>
```

#### Headings

Standard heading hierarchy for all pages:

```tsx
// H1 (60px → 48px → 36px) - Page titles
<h1 className={typography.h1}>Dashboard Overview</h1>

// H2 (48px → 36px → 30px) - Section titles
<h2 className={typography.h2}>Active Sites</h2>

// H3 (36px → 30px → 24px) - Subsection titles
<h3 className={typography.h3}>Recent Activity</h3>

// H4 (30px → 24px → 20px) - Card titles
<h4 className={typography.h4}>Site Performance</h4>

// H5 (24px → 20px → 18px) - Component titles
<h5 className={typography.h5}>Quick Stats</h5>

// H6 (18px → 16px → 14px) - Minor headings
<h6 className={typography.h6}>Details</h6>
```

#### Body Text

Different sizes for various contexts:

```tsx
// Extra Large (20px) - Hero descriptions
<p className={typography.body.xl}>
  The first platform that actually fixes SEO issues automatically.
</p>

// Large (18px) - Lead paragraphs
<p className={typography.body.lg}>
  Connect your CMS and let AI handle the rest.
</p>

// Medium (16px) - Standard body text
<p className={typography.body.md}>
  Our platform analyzes and fixes SEO issues in real-time.
</p>

// Small (14px) - Secondary text, captions
<p className={typography.body.sm}>
  Last updated 2 hours ago
</p>

// Extra Small (12px) - Labels, metadata
<span className={typography.body.xs}>
  Beta
</span>
```

For complete usage examples and best practices, see the sections below.

---

## Best Practices

### Typography

1. **Heading Hierarchy**: Always use headings in order (h1 → h2 → h3). Never skip levels.
2. **Line Length**: Keep body text between 50-75 characters per line using `typography.width.body`.
3. **Color Hierarchy**: Use the color scale consistently (primary → secondary → tertiary → muted).
4. **Responsive Scaling**: Headings automatically scale down on mobile. Test on all breakpoints.
5. **Font Weights**: Use semibold (600) for headings, medium (500) for emphasis, normal (400) for body.

### Spacing

1. **8px Grid**: Always use multiples of 8px for spacing. Never use arbitrary values like `p-[17px]`.
2. **Section Spacing**: Use `py-24` or `py-32` for sections. Smaller spacing looks cramped.
3. **Card Padding**: Use `p-6` or `p-8` for cards. Consistent padding creates visual unity.
4. **Gap vs Margin**: Use `gap` for flex/grid layouts. Use `space-y` or `mb` for stacks.
5. **Responsive Spacing**: Spacing can be responsive but maintain ratios.

## Resources

- **Typography System**: `lib/typography.ts`
- **Spacing System**: `lib/spacing.ts`
- **Tailwind Config**: `tailwind.config.ts`
- **Global Styles**: `app/globals.css`
