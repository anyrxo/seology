# Typography System Implementation Guide

## Overview

A comprehensive typography system has been implemented across SEOLOGY.AI to ensure perfect visual hierarchy and readability throughout the application.

## Typography Utility Location

**File**: `C:\Users\manna\Downloads\iimagined.webflow (1)\lib\typography.ts`

## Typography Scale

### Headings

- **H1 (Page Title)**: `text-6xl md:text-7xl font-bold tracking-tight leading-none`
  - Use for: Main landing page titles, hero sections
  - Max width: `max-w-4xl`

- **H2 (Section)**: `text-4xl md:text-5xl font-bold tracking-tight leading-tight`
  - Use for: Section titles, major page divisions
  - Max width: `max-w-4xl`

- **H3 (Subsection)**: `text-2xl md:text-3xl font-semibold tracking-tight leading-snug`
  - Use for: Subsection titles, card group titles

- **H4 (Card Title)**: `text-xl md:text-2xl font-semibold leading-snug`
  - Use for: Individual card titles, modal titles

### Body Text

- **Body XL**: `text-lg md:text-xl leading-relaxed`
  - Use for: Hero descriptions, important callouts
  - Max width: `max-w-2xl` or `max-w-3xl`

- **Body Large**: `text-base md:text-lg leading-relaxed`
  - Use for: Emphasized body text
  - Max width: `max-w-2xl` or `max-w-3xl`

- **Body**: `text-base leading-relaxed`
  - Use for: Standard paragraph text
  - Max width: `max-w-2xl` or `max-w-3xl`

- **Body Small**: `text-sm md:text-base leading-normal`
  - Use for: Secondary descriptions, metadata

- **Caption**: `text-xs md:text-sm leading-normal`
  - Use for: Labels, hints, timestamps
  - Letter spacing: `tracking-wide`

### Color Hierarchy

```typescript
color: {
  primary: 'text-white',      // Main headings, important text
  secondary: 'text-white/80',  // Body text, labels
  tertiary: 'text-white/60',   // Descriptions, secondary info
  muted: 'text-white/40',      // Captions, hints
  disabled: 'text-white/20',   // Disabled state
}
```

## Usage Examples

### Import the Typography System

```typescript
import { typography, typographyPatterns, typo } from '@/lib/typography'
```

### Pattern 1: Page Title

```tsx
<h1 className={typo(typographyPatterns.pageTitle, 'mb-8 mx-auto')}>
  Stop Reporting SEO Issues. Start Fixing Them Automatically.
</h1>
```

### Pattern 2: Section Title with Subtitle

```tsx
<h2 className={typo(typographyPatterns.sectionTitle, 'mb-4')}>
  How It Works
</h2>
<p className={typo(typographyPatterns.heroBody)}>
  Three simple steps to automated SEO success
</p>
```

### Pattern 3: Card Title

```tsx
<h3 className={typo(typographyPatterns.cardTitle, 'mb-3')}>
  Automatic SEO Fixes
</h3>
<p className={typo(typographyPatterns.body)}>
  Stop wasting time on manual SEO tasks.
</p>
```

### Pattern 4: Stats/Metrics

```tsx
<div className={typo(typographyPatterns.stat)}>
  {value}
  <span className={typo(typography.h5, typography.color.muted)}>/mo</span>
</div>
```

### Pattern 5: Small Text (Features, Lists)

```tsx
<li className={typo('flex items-center', typographyPatterns.smallBody)}>
  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
  14-day free trial
</li>
```

### Pattern 6: Captions and Labels

```tsx
<span className={typo(typographyPatterns.caption, 'uppercase')}>
  Most Popular
</span>
```

## Files Already Updated

The following files have been updated with the new typography system:

1. **C:\Users\manna\Downloads\iimagined.webflow (1)\components\marketing\LandingPageContent.tsx**
   - All headings (H1, H2, H3)
   - All body text and descriptions
   - Trust indicators
   - Pricing cards
   - FAQ section
   - Stats and captions

## Files That Need Updates

### High Priority (Marketing Pages)

1. **C:\Users\manna\Downloads\iimagined.webflow (1)\app\(marketing)\pricing\page.tsx**
   - Update hero title (lines 175-184)
   - Update plan names and prices (lines 289-313)
   - Update feature comparison table (lines 376-451)
   - Update FAQ section (lines 611-678)

2. **C:\Users\manna\Downloads\iimagined.webflow (1)\app\(marketing)\features\page.tsx**
   - Apply to all section titles
   - Apply to feature cards
   - Apply to body text

3. **C:\Users\manna\Downloads\iimagined.webflow (1)\app\(marketing)\about\page.tsx**
   - Apply to page title
   - Apply to section titles
   - Apply to team member bios

### Medium Priority (Dashboard)

4. **C:\Users\manna\Downloads\iimagined.webflow (1)\components\dashboard\DashboardClient.tsx**
   - Update welcome header (lines 32-37)
   - Update stat card titles (line 266)
   - Update quick action titles (lines 290-293)
   - Update activity section (line 190-196)

5. **C:\Users\manna\Downloads\iimagined.webflow (1)\components\ui\MetricCard.tsx**
   - Update title styling (line 61)
   - Update value styling (line 62)
   - Update description (line 112)

6. **C:\Users\manna\Downloads\iimagined.webflow (1)\components\ui\StatCard.tsx**
   - Update title styling (line 48)
   - Update value styling (line 50)
   - Update description (line 68-69)

### Low Priority (Other Components)

7. **C:\Users\manna\Downloads\iimagined.webflow (1)\components\onboarding\*.tsx**
   - All onboarding step titles
   - All onboarding descriptions

8. **C:\Users\manna\Downloads\iimagined.webflow (1)\components\marketing\FeatureCard.tsx**
   - Card titles
   - Card descriptions

9. **C:\Users\manna\Downloads\iimagined.webflow (1)\components\marketing\TestimonialCard.tsx**
   - Author names
   - Roles and companies
   - Quote text

10. **C:\Users\manna\Downloads\iimagined.webflow (1)\components\marketing\StatsSection.tsx**
    - Stat values
    - Stat labels

## Quick Update Patterns

### For Headings
Replace:
```tsx
className="text-4xl font-bold text-white mb-4"
```
With:
```tsx
className={typo(typographyPatterns.sectionTitle, 'mb-4')}
```

### For Body Text
Replace:
```tsx
className="text-xl text-gray-400"
```
With:
```tsx
className={typo(typographyPatterns.heroBody)}
```

### For Card Titles
Replace:
```tsx
className="text-2xl font-semibold text-white mb-3"
```
With:
```tsx
className={typo(typographyPatterns.cardTitle, 'mb-3')}
```

### For Small Text
Replace:
```tsx
className="text-sm text-gray-300"
```
With:
```tsx
className={typo(typographyPatterns.smallBody)}
```

### For Stats
Replace:
```tsx
className="text-3xl font-bold text-white"
```
With:
```tsx
className={typo(typographyPatterns.stat)}
```

## Design Principles

1. **Consistency**: Use typography patterns consistently across all pages
2. **Hierarchy**: Maintain clear visual hierarchy with heading levels
3. **Readability**: Use appropriate line heights and max-widths for body text
4. **Responsiveness**: All typography scales appropriately on mobile
5. **Accessibility**: Color contrast meets WCAG AA standards

## Benefits

- **Maintainability**: Change typography system-wide from one file
- **Consistency**: Same visual hierarchy across all pages
- **Performance**: No duplicate CSS, reusable classes
- **Developer Experience**: Easy to use patterns, clear naming
- **Scalability**: Easy to add new patterns or update existing ones

## Testing Checklist

After applying typography to a page:

- [ ] Check all heading levels (H1-H4) are visually distinct
- [ ] Verify body text max-width for readability
- [ ] Test responsive scaling on mobile (md breakpoint)
- [ ] Confirm color hierarchy (primary > secondary > tertiary > muted)
- [ ] Verify line heights for comfortable reading
- [ ] Check letter spacing on headings and small text
- [ ] Ensure proper contrast ratios for accessibility

## Additional Notes

- Always import typography utilities at the top of components
- Use `typo()` helper to combine multiple classes
- Prefer typography patterns over individual classes
- Add custom spacing (margin, padding) after pattern classes
- Keep typography system separate from layout styles
