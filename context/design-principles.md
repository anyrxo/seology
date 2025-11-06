# SEOLOGY.AI Design Principles
## S-Tier SaaS Dashboard Standards

> **Last Updated**: 2025-11-06
> **Framework**: OneRedOak S-Tier SaaS Dashboard Standards
> **Target Score**: 98/100 (S+ Tier)

---

## Core Philosophy (8 Principles)

### 1. User-Centric Design
**Principle**: Prioritize user needs, workflows, and ease of use in every design decision.

**Implementation**:
- Progressive disclosure for complex features
- Contextual help and tooltips
- Empty states with clear CTAs
- Suggestion buttons for common actions
- Clear visual hierarchy guiding user flow

**Examples**:
```tsx
// Good: Progressive disclosure
<details className="space-y-2">
  <summary className="cursor-pointer font-medium">Advanced Settings</summary>
  <div className="pl-4 pt-2 space-y-2">
    {/* Complex options here */}
  </div>
</details>

// Good: Helpful empty state
<div className="text-center py-12">
  <h3>No sites connected yet</h3>
  <p>Connect your first site to start optimizing SEO</p>
  <button>Connect Site</button>
</div>
```

---

### 2. Craftsmanship
**Principle**: Aim for precision, polish, and high quality in every UI element and interaction.

**Implementation**:
- Pixel-perfect alignment (8px grid system)
- Consistent spacing (multiples of 8: 8, 16, 24, 32, 48, 64)
- Polished animations (150-300ms timing)
- Premium visual effects (glassmorphism, gradients)
- Attention to micro-details

**Grid System**:
```css
/* Base unit: 8px */
gap-2  /* 16px = 8 * 2 */
gap-3  /* 24px = 8 * 3 */
gap-4  /* 32px = 8 * 4 */
gap-6  /* 48px = 8 * 6 */
gap-8  /* 64px = 8 * 8 */

/* Avoid arbitrary values */
❌ gap-[13px]  /* Not on 8px grid */
✅ gap-4       /* 32px, on grid */
```

---

### 3. Performance
**Principle**: Design for fast load times and snappy, responsive interactions.

**Implementation**:
- Optimize animations for 60fps
- Use CSS transforms (GPU-accelerated)
- Lazy load images and heavy components
- Show skeleton screens during loading
- Avoid layout shifts (CLS)

**Code Patterns**:
```tsx
// Good: Skeleton loading
{isLoading ? (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-800 rounded w-3/4" />
    <div className="h-4 bg-gray-800 rounded w-1/2" />
  </div>
) : (
  <ActualContent />
)}

// Good: Lazy loading
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false
})
```

---

### 4. Simplicity
**Principle**: Clean, uncluttered interface with unambiguous labels and instructions.

**Implementation**:
- Maximum 3 primary actions per view
- Clear, descriptive labels (no jargon)
- Minimal cognitive load
- One primary CTA per section
- Hide complexity behind "Advanced" options

**Anti-patterns**:
```tsx
// Bad: Too many actions
<Card>
  <button>Edit</button>
  <button>Delete</button>
  <button>Archive</button>
  <button>Share</button>
  <button>Export</button>
  <button>Duplicate</button>
  <button>Move</button>
</Card>

// Good: Simplified with dropdown
<Card>
  <button>Edit</button>
  <DropdownMenu>
    <DropdownItem>Delete</DropdownItem>
    <DropdownItem>Archive</DropdownItem>
    <DropdownItem>More options...</DropdownItem>
  </DropdownMenu>
</Card>
```

---

### 5. Efficiency
**Principle**: Help users achieve their goals quickly with minimal friction.

**Implementation**:
- Keyboard shortcuts for common actions
- Bulk operations where applicable
- Smart defaults
- Quick filters and search
- Inline editing where possible

**Examples**:
```tsx
// Bulk actions for efficiency
{selectedItems.length > 0 && (
  <div className="flex gap-2">
    <button>Fix All ({selectedItems.length})</button>
    <button>Ignore All ({selectedItems.length})</button>
    <button>Export ({selectedItems.length})</button>
  </div>
)}

// Keyboard shortcuts
useHotkeys('cmd+k', () => openCommandPalette())
useHotkeys('cmd+/', () => openHelpPanel())
```

---

### 6. Consistency
**Principle**: Maintain a uniform design language (colors, typography, components, patterns).

**Implementation**:
- Use design tokens (CSS custom properties)
- Reusable component library
- Standardized spacing system
- Consistent interaction patterns
- Same components for same purposes

**Design Tokens**:
```css
/* Color tokens */
--accent--primary-1: #3d73ff
--system--green-300: #14ca74
--system--red-300: #ff5a65

/* Always use tokens, never hardcode */
✅ color: var(--accent--primary-1)
❌ color: #3d73ff
```

---

### 7. Accessibility
**Principle**: Design for inclusivity with WCAG AA+ compliance.

**Implementation**:
- Minimum 4.5:1 contrast ratio for text
- 44x44px minimum touch targets
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators always visible
- Semantic HTML

**Checklist**:
- [x] All buttons have aria-labels
- [x] Form inputs have associated labels
- [x] Images have alt text
- [x] Modals trap focus
- [x] Skip-to-content link present
- [x] Color not sole indicator of meaning
- [x] Text resizable to 200% without loss

**Code Requirements**:
```tsx
// Good: Accessible button
<button
  aria-label="Delete site"
  className="touch-target"  // min-h-[44px] min-w-[44px]
>
  <Trash aria-hidden="true" />
</button>

// Good: Accessible form
<label htmlFor="site-url" className="sr-only">
  Site URL
</label>
<input
  id="site-url"
  type="url"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby="url-error"
/>
{hasError && (
  <p id="url-error" className="error-message">
    Please enter a valid URL
  </p>
)}
```

---

### 8. Thoughtful Defaults
**Principle**: Establish clear, efficient default workflows and settings.

**Implementation**:
- Pre-select most common options
- Smart form auto-fill
- Sensible sort orders (newest first, critical first)
- Default time ranges (30 days)
- Safe defaults for destructive actions

---

## Design System Standards

### Color Palette

**Neutrals (8 steps)**:
```css
--neutral--100: #ffffff  /* Pure white */
--neutral--200: #f7f8fc  /* Lightest gray */
--neutral--300: #eff1f6  /* Light gray */
--neutral--400: #e6e9f1  /* Medium-light gray */
--neutral--500: #aab1c6  /* Medium gray */
--neutral--600: #828aa3  /* Medium-dark gray */
--neutral--700: #454e66  /* Dark gray */
--neutral--800: #1f2d54  /* Darkest */
```

**Semantic Colors**:
```css
/* Success */
--system--green-300: #14ca74  /* Primary success */
--system--green-400: #11845b  /* Hover state */

/* Error */
--system--red-300: #ff5a65    /* Primary error */
--system--red-400: #dc2b2b    /* Hover state */

/* Warning */
--system--orange-300: #ff9e2c /* Primary warning */
--system--orange-400: #d5691b /* Hover state */

/* Info */
--system--blue-300: #1d88fe   /* Primary info */
--system--blue-400: #086cd9   /* Hover state */
```

**Usage Rules**:
- Text on dark backgrounds: neutral-700 or neutral-800 (never pure white)
- Secondary text: neutral-600 (4.5:1 contrast minimum)
- Borders: neutral-400 or neutral-500
- Success states: green-300
- Error states: red-300
- Never use hardcoded hex values

---

### Typography

**Font Family**:
```css
font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Scale** (Modular, 1.2 ratio):
```css
/* Headings */
.display-1: 96px / 6rem   /* Hero titles */
.display-2: 64px / 4rem   /* Page titles */
.display-3: 48px / 3rem   /* Section titles */

.heading-h1: 40px / 2.5rem
.heading-h2: 32px / 2rem
.heading-h3: 24px / 1.5rem
.heading-h4: 20px / 1.25rem
.heading-h5: 18px / 1.125rem
.heading-h6: 16px / 1rem

/* Body */
.body-large: 18px / 1.125rem  /* line-height: 1.6 */
.body: 16px / 1rem            /* line-height: 1.625 */
.body-small: 14px / 0.875rem  /* line-height: 1.5 */
.body-xs: 12px / 0.75rem      /* line-height: 1.5 */
```

**Font Weights** (Limited to 4):
```css
font-regular: 400
font-medium: 500
font-semibold: 600
font-bold: 700
```

**Line Heights**:
- Headings: 1.2 - 1.4
- Body text: 1.5 - 1.7
- Labels/UI: 1.5

---

### Spacing System

**Base Unit**: 8px

**Scale**:
```
0   = 0px
0.5 = 4px   (half unit, rare)
1   = 8px   (base unit)
2   = 16px  (most common)
3   = 24px
4   = 32px
6   = 48px
8   = 64px
12  = 96px
16  = 128px
20  = 160px
24  = 192px
```

**Usage Guidelines**:
- Component padding: 16px (p-4) or 24px (p-6)
- Section spacing: 48px (gap-12) or 64px (gap-16)
- Card gaps: 16px (gap-4) or 24px (gap-6)
- Button padding: 12px 24px

---

### Border Radius

```css
/* Inputs/small elements */
rounded-md: 6px

/* Cards/containers */
rounded-xl: 12px
rounded-2xl: 16px

/* Large surfaces */
rounded-3xl: 24px

/* Pills/badges */
rounded-full: 9999px
```

---

## Component Standards

### Data Tables

**Requirements**:
- ✅ Left-aligned text columns
- ✅ Right-aligned numeric columns (with monospace font)
- ✅ Sortable column headers with visual indicators
- ✅ Adequate row height (py-4 minimum)
- ✅ Pagination for datasets > 10 items
- ✅ Bulk selection checkboxes
- ✅ Mobile card view for responsive design

**Code Template**:
```tsx
<DataTable
  data={items}
  columns={[
    { key: 'name', label: 'Name', type: 'text', sortable: true },
    { key: 'revenue', label: 'Revenue', type: 'number', sortable: true },
    { key: 'date', label: 'Date', type: 'date', sortable: true }
  ]}
  mobileCardView={true}
/>
```

---

### Forms

**Requirements**:
- ✅ Associated labels for all inputs
- ✅ Clear error messages
- ✅ Inline validation
- ✅ Required field indicators (*)
- ✅ Logical grouping with fieldsets
- ✅ Loading/disabled states

**Pattern**:
```tsx
<div>
  <label htmlFor="email" className="block text-sm font-medium mb-2">
    Email Address
    <span className="required-indicator" aria-label="required" />
  </label>
  <input
    id="email"
    type="email"
    required
    aria-required="true"
    aria-invalid={errors.email ? 'true' : 'false'}
    aria-describedby={errors.email ? 'email-error' : undefined}
    className="w-full px-4 py-3 rounded-xl border"
  />
  {errors.email && (
    <p id="email-error" className="error-message">
      {errors.email}
    </p>
  )}
</div>
```

---

### Modals/Dialogs

**Requirements**:
- ✅ Focus trap (Esc to close, Tab cycles within)
- ✅ Backdrop click to close
- ✅ Clear title (h2/h3)
- ✅ Primary and secondary actions
- ✅ Close button (X) in top-right
- ✅ Mobile-responsive (full-screen on small screens)

---

### Buttons

**Hierarchy**:
1. **Primary**: Main CTA (blue gradient)
2. **Secondary**: Alternative actions (gray)
3. **Tertiary**: Low-priority (text-only)
4. **Danger**: Destructive actions (red)

**States**: Default, Hover, Active, Focus, Disabled, Loading

**Touch Targets**: Minimum 44x44px

---

### Cards

**Structure**:
```tsx
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold">Card Title</h3>
    <button aria-label="More options">•••</button>
  </div>

  {/* Content */}
  <div className="space-y-4">
    {/* Main content */}
  </div>

  {/* Footer (optional) */}
  <div className="mt-6 pt-4 border-t border-white/10">
    {/* Actions */}
  </div>
</div>
```

---

## Interaction Standards

### Micro-interactions

**Timing**:
- Instant feedback: 0ms (button press)
- Quick transitions: 150-200ms (hover, focus)
- Smooth animations: 250-300ms (cards, modals)
- Page transitions: 400ms maximum

**Easing**: `ease-in-out` for most, `ease-out` for exits

---

### Hover States

**Requirements**:
- Visible on ALL interactive elements
- Smooth transition (150-200ms)
- Subtle elevation change (translateY(-2px))
- Color/opacity change

**Example**:
```tsx
className="transition-all duration-200 hover:scale-105 hover:-translate-y-1"
```

---

### Loading States

**Patterns**:
1. **Skeleton screens** (preferred for initial load)
2. **Spinners** (for actions/mutations)
3. **Progress bars** (for known durations)
4. **Optimistic updates** (instant UI, background save)

---

### Empty States

**Requirements**:
- Clear illustration or icon
- Explanatory title
- Helpful description
- Primary action (CTA)
- Optional secondary actions

---

## Responsive Design

### Breakpoints

```css
xs:  475px   /* Extra small devices */
sm:  640px   /* Small devices (large phones) */
md:  768px   /* Medium devices (tablets) */
lg:  992px   /* Large devices (desktops) */
xl:  1280px  /* Extra large devices */
2xl: 1536px  /* 2X large devices */
```

### Mobile-First Approach

Always design mobile-first, then enhance for larger screens:

```tsx
// Mobile first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// NOT desktop first
<div className="grid grid-cols-4 lg:grid-cols-2 md:grid-cols-1">
```

---

## Accessibility Checklist

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Logical tab order
- [ ] Skip-to-content link present
- [ ] Modal focus trap working
- [ ] Escape key closes modals/dropdowns
- [ ] Enter/Space activates buttons

### Screen Readers
- [ ] Semantic HTML (header, nav, main, article, aside)
- [ ] ARIA labels on icon-only buttons
- [ ] Form labels associated
- [ ] Live regions for dynamic content
- [ ] Alt text on images
- [ ] Proper heading hierarchy (h1 → h2 → h3)

### Visual
- [ ] 4.5:1 contrast ratio (text)
- [ ] 3:1 contrast ratio (UI elements)
- [ ] Focus indicators visible
- [ ] Color not sole indicator
- [ ] Text resizable to 200%
- [ ] No horizontal scroll

### Touch
- [ ] 44x44px minimum touch targets
- [ ] Adequate spacing between targets (8px minimum)
- [ ] Swipe gestures have alternatives

---

## Anti-Patterns (Avoid)

### ❌ Hardcoded Colors
```tsx
// Bad
<div className="text-[#3d73ff]">

// Good
<div className="text-primary">
```

### ❌ Magic Numbers
```tsx
// Bad
<div className="mt-[13px]">

// Good
<div className="mt-4">  // 16px, on 8px grid
```

### ❌ Inline Styles
```tsx
// Bad
<div style={{ marginTop: '20px' }}>

// Good
<div className="mt-5">
```

### ❌ Missing Accessibility
```tsx
// Bad
<button onClick={handleClick}>
  <Icon />
</button>

// Good
<button onClick={handleClick} aria-label="Delete item">
  <Icon aria-hidden="true" />
</button>
```

### ❌ Inconsistent Components
```tsx
// Bad: Custom button every time
<div className="px-4 py-2 bg-blue-600 rounded cursor-pointer">
  Click me
</div>

// Good: Reusable component
<Button variant="primary">
  Click me
</Button>
```

---

## Performance Guidelines

### Code Splitting
```tsx
// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
})
```

### Image Optimization
```tsx
// Use Next.js Image component
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority  // For LCP images
  placeholder="blur"
/>
```

### Animation Performance
```tsx
// Good: GPU-accelerated properties
transform, opacity

// Avoid: Layout-triggering properties
width, height, top, left, margin, padding
```

---

## Testing Checklist

### Before Commit
- [ ] TypeScript compiles without errors
- [ ] No console errors
- [ ] All links work
- [ ] Forms validate properly
- [ ] Loading states display correctly
- [ ] Error states handled gracefully

### Before PR
- [ ] Tested on mobile (375px)
- [ ] Tested on tablet (768px)
- [ ] Tested on desktop (1440px)
- [ ] Keyboard navigation works
- [ ] Screen reader tested (NVDA/VoiceOver)
- [ ] Dark mode works correctly
- [ ] No layout shifts (CLS)

---

## Quick Reference

### Common Patterns

**Glassmorphic Card**:
```tsx
className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
```

**Gradient Text**:
```tsx
className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
```

**Focus Ring**:
```tsx
className="focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
```

**Touch Target**:
```tsx
className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
```

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design Guidelines](https://material.io/design)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

**Remember**: These principles are guidelines, not rigid rules. Use judgment, but always prioritize user experience and accessibility.
