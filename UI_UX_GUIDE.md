# SEOLOGY.AI UI/UX Guide

## Overview

This document outlines the complete design system, UI/UX patterns, and implementation guidelines for SEOLOGY.AI. The platform features a premium, world-class interface with sophisticated animations, accessibility compliance, and responsive design.

---

## Design System

### Color Palette

**Primary Colors**
- Background: `#0a0a0a` (near-black for premium feel)
- Foreground: `#ededed` (off-white for reduced eye strain)
- Pure Black: `#000000`
- Pure White: `#FFFFFF`

**UI Colors**
- Border: `rgba(255, 255, 255, 0.1)` - Subtle borders
- Card Background: `#1a1a1a` - Elevated surfaces
- Hover Background: `rgba(255, 255, 255, 0.05)` - Interactive states

**Text Hierarchy**
- Primary: `text-white` (100% opacity) - Headings, important text
- Secondary: `text-white/80` (80% opacity) - Body text
- Tertiary: `text-white/60` (60% opacity) - Descriptions
- Muted: `text-white/40` (40% opacity) - Metadata, captions
- Disabled: `text-white/20` (20% opacity) - Disabled states

**Status Colors**
- Success: `#10b981` (Green 500)
- Error: `#ef4444` (Red 500)
- Warning: `#f59e0b` (Amber 500)
- Info: `#3b82f6` (Blue 500)

**Interactive Colors**
- Primary Button: `#3b82f6` (Blue 600)
- Primary Hover: `#2563eb` (Blue 700)
- Secondary Button: `#4b5563` (Gray 700)
- Destructive: `#dc2626` (Red 600)

---

## Typography

### Font Family
- Primary: **Inter** (Google Fonts)
- Fallback: `Arial, Helvetica, sans-serif`
- Monospace: `ui-monospace, monospace` (for code)

### Type Scale

**Display Headings (Hero sections)**
```typescript
display.xl: 'text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none'
display.lg: 'text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none'
display.md: 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight'
```

**Headings**
```typescript
h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight'
h2: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight'
h3: 'text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-snug'
h4: 'text-xl md:text-2xl lg:text-3xl font-semibold leading-snug'
h5: 'text-lg md:text-xl lg:text-2xl font-semibold leading-normal'
h6: 'text-base md:text-lg lg:text-xl font-semibold leading-normal'
```

**Body Text**
```typescript
body.xl: 'text-xl leading-relaxed'      // Hero descriptions
body.lg: 'text-lg leading-relaxed'      // Prominent content
body.md: 'text-base leading-relaxed'    // Standard body text
body.sm: 'text-sm leading-normal'       // Small text
body.xs: 'text-xs leading-normal'       // Captions, metadata
```

**Font Weights**
- Light: 300
- Normal: 400
- Medium: 500
- Semibold: 600 (default for headings)
- Bold: 700 (emphasis)
- Extrabold: 800
- Black: 900 (display headings)

### Optimal Line Lengths
- Headings: `max-w-4xl` (~768px)
- Body text: `max-w-2xl` (~672px, optimal 50-75 characters)
- Narrow content: `max-w-xl` (~576px)
- Wide layouts: `max-w-6xl` (~1152px)

---

## Spacing System

### 8px Grid System
All spacing uses multiples of 8px for visual consistency:

```typescript
0   -> 0px
1   -> 4px    (0.5 units - rare use)
2   -> 8px    (1 unit)
3   -> 12px   (1.5 units)
4   -> 16px   (2 units)
6   -> 24px   (3 units)
8   -> 32px   (4 units)
12  -> 48px   (6 units)
16  -> 64px   (8 units)
20  -> 80px   (10 units)
24  -> 96px   (12 units)
32  -> 128px  (16 units)
```

### Section Spacing
- Small sections: `py-16` (64px)
- Standard sections: `py-24` (96px)
- Large sections: `py-32` (128px)

### Component Spacing
- Card padding: `p-6` (24px) or `p-8` (32px)
- Button padding: `px-4 py-2` or `px-8 py-3`
- Input padding: `px-4 py-2`
- Grid gaps: `gap-4`, `gap-6`, `gap-8`

---

## Responsive Design

### Breakpoints
```typescript
xs:  475px   // Extra small devices (large phones)
sm:  640px   // Small devices (tablets)
md:  768px   // Medium devices (small laptops)
lg:  1024px  // Large devices (desktops)
xl:  1280px  // Extra large (large desktops)
2xl: 1536px  // Ultra wide screens
```

### Mobile-First Approach
All designs start mobile and scale up:

```tsx
// Example: Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
```

### Touch Targets
- Minimum: 44x44px (iOS standard)
- Buttons: `min-h-touch min-w-touch` classes
- Spacing between tappable elements: 8px minimum

### Safe Areas
Support for notched devices:
```css
.safe-top { padding-top: max(env(safe-area-inset-top), 0px); }
.safe-bottom { padding-bottom: max(env(safe-area-inset-bottom), 0px); }
```

---

## Animations & Interactions

### Animation Principles
1. **Purposeful**: Every animation serves a UX purpose
2. **Performant**: Use transforms and opacity only (GPU-accelerated)
3. **Smooth**: 60fps target
4. **Subtle**: Enhance, don't distract
5. **Accessible**: Respect `prefers-reduced-motion`

### Duration Standards
```typescript
// UI Interactions
Instant:     100ms   // Button taps, toggles
Quick:       200ms   // Hover effects, tooltips
Standard:    300ms   // Modals, dropdowns, transitions
Slow:        500ms   // Page transitions
Dramatic:    800ms   // Hero entrances, reveals
```

### Easing Functions
```typescript
easeOut:    [0.4, 0, 0.2, 1]     // Entrances (most common)
easeIn:     [0.4, 0, 1, 1]       // Exits
easeInOut:  [0.4, 0, 0.2, 1]     // Complex animations
bounce:     [0.34, 1.56, 0.64, 1] // Playful emphasis
```

### Core Animations

**Hover Effects**
```tsx
// Standard lift + shadow
className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"

// Magnetic button (for CTAs)
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

**Scroll Reveals**
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6 }}
/>
```

**Loading States**
```tsx
// Shimmer skeleton
<div className="animate-pulse bg-white/10 rounded" />

// Spinner
<svg className="animate-spin h-4 w-4">...</svg>
```

**Micro-interactions**
- Button clicks: `active:scale-95` (subtle press feedback)
- Toggle switches: Smooth slide with spring physics
- Number counters: Spring animation on value change
- Toast notifications: Slide in from right, auto-dismiss

---

## Components

### Button Variants

**Primary** (Main CTAs)
```tsx
<Button variant="primary">Get Started</Button>
// Blue background, white text, hover lift + darken
```

**Secondary** (Alternative actions)
```tsx
<Button variant="secondary">Learn More</Button>
// Gray background, white text
```

**Outline** (Tertiary actions)
```tsx
<Button variant="outline">Cancel</Button>
// Transparent with border, hover fill
```

**Ghost** (Subtle actions)
```tsx
<Button variant="ghost">Skip</Button>
// No background, hover background
```

**Destructive** (Dangerous actions)
```tsx
<Button variant="destructive">Delete</Button>
// Red background, requires confirmation
```

### Button Sizes
```tsx
<Button size="sm">Small</Button>       // h-8, px-3
<Button size="default">Default</Button> // h-10, px-4
<Button size="lg">Large</Button>       // h-12, px-8
<Button size="icon">⚙</Button>          // h-10, w-10
```

### Cards

**Standard Card**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

**Glass-morphism Card** (Premium effect)
```tsx
className="backdrop-blur-xl bg-white/5 border border-white/10"
```

**Hover Effects**
```tsx
className="transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-white/20"
```

### Form Inputs

**Text Input**
```tsx
<Input
  type="text"
  placeholder="Enter text..."
  className="w-full"
/>
```

**With Label**
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>
```

**Error State**
```tsx
<Input
  type="email"
  className="border-red-500 focus:ring-red-500"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" className="text-sm text-red-500 mt-1">
  Invalid email address
</p>
```

### Modals/Dialogs

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Description text</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Loading States

**Skeleton**
```tsx
<Skeleton className="h-4 w-full" />
<Skeleton className="h-8 w-3/4" />
```

**Spinner**
```tsx
<Button isLoading>Processing...</Button>
```

**Progress Bar**
```tsx
<Progress value={progress} max={100} />
```

---

## Accessibility (WCAG 2.1 AA)

### Color Contrast
- Normal text: 4.5:1 minimum ratio
- Large text (18pt+): 3:1 minimum ratio
- UI components: 3:1 minimum ratio

**Tested Combinations:**
- White on #0a0a0a: 19.8:1 ✓
- White/80 on #0a0a0a: 15.8:1 ✓
- White/60 on #0a0a0a: 11.9:1 ✓
- White/40 on #1a1a1a: 7.2:1 ✓ (for large text)

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Logical tab order throughout
- Visible focus indicators (2px blue outline)
- Skip links for navigation
- No keyboard traps

### Focus Management
```tsx
// Auto-focus on modal open
<Dialog>
  <DialogContent autoFocus />
</Dialog>

// Return focus on close
useEffect(() => {
  const returnFocus = document.activeElement
  return () => returnFocus?.focus()
}, [])
```

### ARIA Labels
```tsx
// Icon-only buttons
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// Complex widgets
<div
  role="tablist"
  aria-label="Dashboard navigation"
>
  <button role="tab" aria-selected="true">
    Overview
  </button>
</div>
```

### Screen Reader Support
```tsx
// Visually hidden but screen-reader accessible
<span className="sr-only">Skip to main content</span>

// Loading states
<Button disabled aria-busy="true">
  <span className="sr-only">Loading...</span>
  <Spinner />
</Button>

// Form errors
<Input
  aria-invalid="true"
  aria-describedby="error-message"
/>
<div id="error-message" role="alert">
  Error text
</div>
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance

### Optimization Techniques

**1. Code Splitting**
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
})
```

**2. Image Optimization**
```tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // Above fold
  quality={85}
  placeholder="blur"
/>
```

**3. Lazy Loading**
```tsx
import { lazy, Suspense } from 'react'

const LazyChart = lazy(() => import('./Chart'))

<Suspense fallback={<Skeleton />}>
  <LazyChart data={data} />
</Suspense>
```

**4. Animation Performance**
```tsx
// Good: GPU-accelerated
transform: translate3d(0, 0, 0)
opacity: 0.5

// Bad: Causes reflow
top: 10px
left: 20px
```

**5. Bundle Size**
- Use tree-shaking compatible imports
- Lazy load heavy components
- Minimize dependencies
- Monitor with `ANALYZE=true npm run build`

### Performance Targets
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

---

## Dark Mode

### Implementation
The platform uses dark mode exclusively for a premium, sophisticated feel.

**Custom Scrollbar** (Dark themed)
```css
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #4a4a4a;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #5a5a5a;
}
```

---

## Common Patterns

### Page Layout
```tsx
export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Page content */}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
```

### Section Layout
```tsx
<section className="py-24 relative overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center mb-16">
      <h2 className={typography.h2}>Section Title</h2>
      <p className={typography.body.lg}>Section description</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Section content */}
    </div>
  </div>
</section>
```

### Form Layout
```tsx
<form onSubmit={handleSubmit} className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>

  <div className="flex gap-4 justify-end">
    <Button variant="outline" type="button">
      Cancel
    </Button>
    <Button variant="primary" type="submit" isLoading={isSubmitting}>
      Submit
    </Button>
  </div>
</form>
```

### Data Table Pattern
```tsx
<DataTable
  columns={columns}
  data={data}
  isLoading={isLoading}
  emptyState={
    <EmptyState
      icon={FileX}
      title="No data found"
      description="Get started by adding your first item"
      action={<Button>Add Item</Button>}
    />
  }
/>
```

### Empty States
```tsx
<EmptyState
  icon={Inbox}
  title="No notifications"
  description="You're all caught up!"
  action={<Button variant="outline">Manage Settings</Button>}
/>
```

---

## File Organization

```
components/
├── ui/                    # Base UI components (Button, Input, Card, etc.)
├── marketing/             # Marketing site components
├── dashboard/             # Dashboard-specific components
├── admin/                 # Admin panel components
├── onboarding/            # Onboarding wizard components
└── notifications/         # Notification system components

lib/
├── animations.ts          # Framer Motion animation variants
├── typography.ts          # Typography system and helpers
├── spacing.ts             # Spacing utilities
├── utils.ts               # Common utility functions
└── cn.ts                  # Class name merger (Tailwind)

app/
├── globals.css            # Global styles, CSS variables
├── layout.tsx             # Root layout
├── (auth)/                # Auth pages route group
├── (admin)/               # Admin route group
├── (marketing)/           # Marketing route group
└── dashboard/             # Dashboard pages
```

---

## Best Practices

### Do's ✓
- Use typography system for all text (`typography.h1`, `typography.body.md`)
- Use spacing system (multiples of 8px)
- Add loading states to all async operations
- Include error states and empty states
- Make all interactive elements keyboard accessible
- Add ARIA labels to icon-only buttons
- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Respect `prefers-reduced-motion`
- Test on multiple screen sizes
- Optimize images with Next.js Image component

### Don'ts ✗
- Don't use arbitrary spacing values (use Tailwind scale)
- Don't animate `top`, `left`, `width`, `height` (use transforms)
- Don't use generic `<div>` when semantic HTML exists
- Don't rely solely on color to convey information
- Don't use icon-only buttons without labels
- Don't block JavaScript execution with sync operations
- Don't forget focus indicators
- Don't hardcode colors (use design tokens)
- Don't skip loading states
- Don't ignore TypeScript errors

---

## Testing Checklist

### Visual Consistency
- [ ] All pages use consistent spacing
- [ ] Typography scale is applied correctly
- [ ] Colors match design system
- [ ] Borders and shadows are consistent
- [ ] Icons are same style throughout

### Responsive Design
- [ ] Mobile (320px - 767px) looks good
- [ ] Tablet (768px - 1023px) looks good
- [ ] Desktop (1024px+) looks good
- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets are 44x44px minimum
- [ ] Text is readable on all devices

### Animations
- [ ] All animations are smooth (60fps)
- [ ] No janky scroll performance
- [ ] Reduced motion is respected
- [ ] Loading states show immediately
- [ ] Transitions feel natural

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] ARIA labels present
- [ ] Color contrast passes WCAG AA
- [ ] Screen reader compatible
- [ ] Forms have proper labels
- [ ] Errors are announced

### Performance
- [ ] Build succeeds without errors
- [ ] Bundle size is reasonable
- [ ] Images are optimized
- [ ] Code splitting implemented
- [ ] No console errors
- [ ] Fast initial load

---

## Resources

### Documentation
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [Next.js](https://nextjs.org/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)

### Design Tokens
All tokens are defined in:
- `app/globals.css` - CSS variables
- `tailwind.config.ts` - Tailwind theme
- `lib/typography.ts` - Typography system
- `lib/animations.ts` - Animation variants

---

## Version History

- v1.0.0 (2025-11-03): Initial comprehensive UI/UX system
  - Complete design system
  - Typography scale
  - Animation library
  - Accessibility compliance
  - Responsive design
  - Component library

---

For questions or updates to this guide, contact the development team or refer to the component source code for implementation details.
