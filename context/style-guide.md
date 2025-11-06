# SEOLOGY.AI Style Guide

## Brand-Specific Styling Guidelines

This document defines SEOLOGY.AI's unique visual identity, brand voice, and styling patterns. This complements the [Design Principles](./design-principles.md) with brand-specific implementation details.

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Logo & Brand Marks](#logo--brand-marks)
5. [Illustrations & Icons](#illustrations--icons)
6. [Photography & Imagery](#photography--imagery)
7. [Voice & Tone](#voice--tone)
8. [Component Styling](#component-styling)
9. [Animation & Motion](#animation--motion)
10. [Dark Mode](#dark-mode)

---

## Brand Identity

### Core Brand Attributes

**SEOLOGY.AI** is:
- **Intelligent**: AI-powered automation that thinks ahead
- **Trustworthy**: Transparent fixes with full rollback capability
- **Efficient**: Does the work instead of just reporting
- **Modern**: Cutting-edge technology with sophisticated design
- **Accessible**: Professional tools that anyone can use

### Brand Personality

- **Professional but approachable** - Not stuffy, but credible
- **Smart but not condescending** - Explains complexity simply
- **Confident but humble** - Shows capability without arrogance
- **Forward-thinking** - Innovation without being trendy

---

## Color System

### Primary Brand Colors

```css
/* Primary - Electric Blue */
--brand-primary-50: #eff6ff;
--brand-primary-100: #dbeafe;
--brand-primary-200: #bfdbfe;
--brand-primary-300: #93c5fd;
--brand-primary-400: #60a5fa;
--brand-primary-500: #3b82f6;  /* Main brand color */
--brand-primary-600: #2563eb;
--brand-primary-700: #1d4ed8;
--brand-primary-800: #1e40af;
--brand-primary-900: #1e3a8a;

/* Secondary - Purple */
--brand-secondary-50: #faf5ff;
--brand-secondary-100: #f3e8ff;
--brand-secondary-200: #e9d5ff;
--brand-secondary-300: #d8b4fe;
--brand-secondary-400: #c084fc;
--brand-secondary-500: #a855f7;  /* Accent color */
--brand-secondary-600: #9333ea;
--brand-secondary-700: #7e22ce;
--brand-secondary-800: #6b21a8;
--brand-secondary-900: #581c87;

/* Accent - Cyan (AI/Tech feel) */
--brand-accent-50: #ecfeff;
--brand-accent-100: #cffafe;
--brand-accent-200: #a5f3fc;
--brand-accent-300: #67e8f9;
--brand-accent-400: #22d3ee;
--brand-accent-500: #06b6d4;  /* Highlights */
--brand-accent-600: #0891b2;
--brand-accent-700: #0e7490;
--brand-accent-800: #155e75;
--brand-accent-900: #164e63;
```

### Semantic Colors (From Design System)

```css
/* Success - Green */
--semantic-success: #14ca74;
--semantic-success-bg: rgba(20, 202, 116, 0.1);
--semantic-success-border: rgba(20, 202, 116, 0.3);

/* Error - Red */
--semantic-error: #ff5a65;
--semantic-error-bg: rgba(255, 90, 101, 0.1);
--semantic-error-border: rgba(255, 90, 101, 0.3);

/* Warning - Orange */
--semantic-warning: #ff9e2c;
--semantic-warning-bg: rgba(255, 158, 44, 0.1);
--semantic-warning-border: rgba(255, 158, 44, 0.3);

/* Info - Blue */
--semantic-info: #1d88fe;
--semantic-info-bg: rgba(29, 136, 254, 0.1);
--semantic-info-border: rgba(29, 136, 254, 0.3);
```

### Neutrals (Dark Theme Optimized)

```css
/* Neutrals */
--neutral-0: #000000;
--neutral-50: #0a0f1f;    /* Background base */
--neutral-100: #1f2d54;   /* Card backgrounds */
--neutral-200: #2a3a6a;
--neutral-300: #3d5080;
--neutral-400: #5a6b9a;
--neutral-500: #7a8ab5;
--neutral-600: #9ca3af;   /* Accessible gray text */
--neutral-700: #d1d5db;
--neutral-800: #e5e7eb;
--neutral-900: #f3f4f6;
--neutral-1000: #ffffff;
```

### Gradients

```css
/* Primary Gradient - Hero sections */
.gradient-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%);
}

/* Accent Gradient - CTAs */
.gradient-accent {
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #a855f7 100%);
}

/* Subtle Background - Cards */
.gradient-subtle {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
}

/* Glass Effect - Dashboard elements */
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Color Usage Guidelines

#### Primary Blue (#3b82f6)
**Use for:**
- Primary CTAs
- Links
- Active states
- Focus indicators
- Primary buttons

**Don't use for:**
- Large background areas
- Body text
- Error states

#### Secondary Purple (#a855f7)
**Use for:**
- Secondary CTAs
- Highlights
- Premium features
- Accent elements
- Hover states on primary elements

**Don't use for:**
- Primary actions
- Critical information
- Warnings

#### Accent Cyan (#06b6d4)
**Use for:**
- AI-related features
- Processing indicators
- Tech-focused elements
- Data visualizations
- Loading states

**Don't use for:**
- Main navigation
- Primary CTAs

---

## Typography

### Font Families

```css
/* Primary - Inter (UI text) */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Secondary - DM Sans (Headers) */
--font-secondary: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace - Roboto Mono (Code, metrics) */
--font-mono: 'Roboto Mono', 'SF Mono', Monaco, 'Cascadia Code', monospace;
```

### Type Scale (Desktop)

```css
/* Display - Marketing heroes */
.text-display {
  font-family: var(--font-secondary);
  font-size: 72px;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* H1 - Page titles */
.text-h1 {
  font-family: var(--font-secondary);
  font-size: 48px;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
}

/* H2 - Section headers */
.text-h2 {
  font-family: var(--font-secondary);
  font-size: 36px;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: -0.01em;
}

/* H3 - Subsection headers */
.text-h3 {
  font-family: var(--font-secondary);
  font-size: 24px;
  line-height: 1.4;
  font-weight: 600;
}

/* H4 - Card titles */
.text-h4 {
  font-family: var(--font-primary);
  font-size: 18px;
  line-height: 1.5;
  font-weight: 600;
}

/* Body - Default text */
.text-body {
  font-family: var(--font-primary);
  font-size: 16px;
  line-height: 1.6;
  font-weight: 400;
}

/* Small - Helper text */
.text-small {
  font-family: var(--font-primary);
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
}

/* Caption - Metadata */
.text-caption {
  font-family: var(--font-primary);
  font-size: 12px;
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: 0.01em;
}
```

### Responsive Typography

```css
/* Mobile adjustments */
@media (max-width: 767px) {
  .text-display {
    font-size: 48px;
  }

  .text-h1 {
    font-size: 32px;
  }

  .text-h2 {
    font-size: 24px;
  }

  .text-h3 {
    font-size: 20px;
  }
}
```

### Typography Guidelines

1. **Hierarchy is Critical**: Use only one H1 per page
2. **Don't Skip Levels**: H1 → H2 → H3 (never H1 → H3)
3. **Line Length**: 60-80 characters for body text
4. **Contrast**: Minimum 4.5:1 for body, 3:1 for large text
5. **Monospace for Data**: Always use monospace for numbers in tables

---

## Logo & Brand Marks

### Primary Logo

```
SEOLOGY.AI
```

**Specifications:**
- Font: DM Sans Bold
- Color: White (#FFFFFF) on dark backgrounds
- Color: Primary Blue (#3b82f6) on light backgrounds
- Minimum size: 120px wide
- Clear space: 16px on all sides

### Logo Variations

#### Full Logo (Preferred)
```
[Icon] SEOLOGY.AI
```
Use: Navigation, marketing materials, emails

#### Logo Mark Only
```
[Icon]
```
Use: Favicons, social media avatars, mobile app icons

#### Wordmark Only
```
SEOLOGY.AI
```
Use: Footer, tight spaces, minimal contexts

### Logo Usage Rules

**Do:**
- Use on dark backgrounds with white color
- Use on light backgrounds with primary blue
- Maintain clear space
- Use SVG format for web

**Don't:**
- Stretch or distort
- Change colors outside brand palette
- Add effects (drop shadow, outlines)
- Use on busy backgrounds without contrast
- Place on medium-value backgrounds

### Favicon

```html
<!-- Standard -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

---

## Illustrations & Icons

### Icon System

**Library:** Lucide React (consistent with Dashflow X)

```tsx
import { Zap, Search, TrendingUp, AlertCircle } from 'lucide-react'

// Standard size
<Search className="h-5 w-5" />

// Small (inline)
<Search className="h-4 w-4" />

// Large (feature icons)
<Search className="h-6 w-6" />

// Extra large (empty states)
<Search className="h-12 w-12" />
```

### Icon Guidelines

1. **Stroke Width**: Default 2px
2. **Color**: Inherit from parent or use semantic colors
3. **Alignment**: Center-align with text
4. **Spacing**: 8px gap between icon and text
5. **States**:
   - Default: `text-neutral-400`
   - Hover: `text-neutral-200`
   - Active: `text-brand-primary-500`

### Illustration Style

**Characteristics:**
- **Style**: Minimal, geometric
- **Colors**: Brand gradient backgrounds
- **Line work**: 2px strokes, rounded caps
- **Shapes**: Rounded corners (8px radius)
- **Shadows**: Subtle, layered (0 4px 12px rgba(0,0,0,0.1))

**Usage:**
- Empty states
- Onboarding screens
- Error pages (404, 500)
- Feature highlights

**Don't:**
- Use realistic illustrations
- Mix illustration styles
- Use illustrations for critical UI elements

---

## Photography & Imagery

### Image Style

**Preferred:**
- Clean, minimal backgrounds
- High contrast
- Professional settings
- Technology-focused
- Diverse representation

**Avoid:**
- Stock photo clichés
- Overly staged
- Low resolution
- Busy backgrounds
- Outdated technology

### Image Treatment

```css
/* Card images */
.card-image {
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

/* Avatar images */
.avatar {
  border-radius: 50%;
  border: 2px solid var(--neutral-100);
}

/* Hero images */
.hero-image {
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
```

### Overlay for Text on Images

```css
.image-overlay {
  position: relative;
}

.image-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.image-overlay-text {
  position: relative;
  z-index: 1;
  color: white;
}
```

---

## Voice & Tone

### Brand Voice Principles

#### 1. Clear Over Clever
**Do:** "Fix SEO issues automatically"
**Don't:** "Supercharge your SEO game with our revolutionary AI-powered platform"

#### 2. Active Over Passive
**Do:** "We fixed 127 issues on your site"
**Don't:** "127 issues were fixed"

#### 3. Simple Over Jargon
**Do:** "Connect your Shopify store"
**Don't:** "Integrate your ecommerce CMS via OAuth 2.0"

#### 4. Helpful Over Sales-y
**Do:** "This will take about 5 minutes"
**Don't:** "Lightning-fast setup!"

### UI Copy Guidelines

#### Buttons
- Use verb + noun: "Create Site", "View Report"
- Max 3 words
- Title case
- No periods

```tsx
// Good
<Button>Create Site</Button>
<Button>View Analytics</Button>

// Bad
<Button>Click here to create a new site</Button>
<Button>view analytics</Button>
```

#### Empty States
- Acknowledge the situation
- Explain why it's empty
- Provide clear next action

```tsx
// Good
<EmptyState
  title="No sites connected yet"
  description="Connect your first site to start fixing SEO issues automatically."
  action="Connect Site"
/>

// Bad
<EmptyState
  title="Empty"
  description="No data"
  action="Add"
/>
```

#### Error Messages
- Explain what happened
- Why it happened (if relevant)
- What to do next

```tsx
// Good
"Could not connect to Shopify. Please check your store URL and try again."

// Bad
"Error: SHOPIFY_OAUTH_FAILED"
```

#### Success Messages
- Confirm the action
- Show the result
- Suggest next step (optional)

```tsx
// Good
"✓ Site connected successfully. Scanning for issues now..."

// Bad
"Success!"
```

### Tone by Context

#### Dashboard (Neutral Professional)
- "12 issues fixed this week"
- "Your site is performing well"
- "Credits remaining: 450"

#### Onboarding (Friendly Guide)
- "Let's get started!"
- "Great choice!"
- "Almost there..."

#### Errors (Helpful Problem-Solver)
- "We couldn't complete that action"
- "Here's what you can try..."
- "Need help? Contact support"

#### Marketing (Confident Informer)
- "Fix SEO issues automatically"
- "The first platform that actually makes changes"
- "Trusted by 1,000+ businesses"

---

## Component Styling

### Cards

```tsx
// Standard card
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
  <h3 className="text-h4 mb-4">Card Title</h3>
  <p className="text-body text-neutral-600">Card content</p>
</div>

// Hover-able card
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6
                transition-all duration-200
                hover:bg-white/10 hover:border-brand-primary-500/30
                cursor-pointer">
  {/* Content */}
</div>

// Featured card (with gradient border)
<div className="relative bg-neutral-50 rounded-xl p-6">
  <div className="absolute inset-0 bg-gradient-accent rounded-xl opacity-10" />
  <div className="relative">
    {/* Content */}
  </div>
</div>
```

### Buttons

```tsx
// Primary CTA
<button className="bg-brand-primary-500 hover:bg-brand-primary-600
                   text-white font-medium px-6 py-3 rounded-lg
                   transition-all duration-200
                   shadow-lg shadow-brand-primary-500/20
                   hover:shadow-xl hover:shadow-brand-primary-500/30">
  Get Started
</button>

// Secondary
<button className="bg-white/5 hover:bg-white/10
                   border border-white/10 hover:border-brand-primary-500/30
                   text-white font-medium px-6 py-3 rounded-lg
                   transition-all duration-200">
  Learn More
</button>

// Destructive
<button className="bg-semantic-error hover:bg-semantic-error/90
                   text-white font-medium px-6 py-3 rounded-lg
                   transition-all duration-200">
  Delete
</button>

// Ghost
<button className="text-neutral-600 hover:text-white hover:bg-white/5
                   font-medium px-4 py-2 rounded-lg
                   transition-all duration-200">
  Cancel
</button>
```

### Inputs

```tsx
// Text input
<input
  type="text"
  className="w-full bg-white/5 border border-white/10
             rounded-lg px-4 py-3
             text-white placeholder:text-neutral-500
             focus:outline-none focus:border-brand-primary-500 focus:ring-2 focus:ring-brand-primary-500/20
             transition-all duration-200"
  placeholder="Enter your email"
/>

// With icon
<div className="relative">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
  <input
    type="text"
    className="w-full bg-white/5 border border-white/10
               rounded-lg pl-12 pr-4 py-3
               text-white placeholder:text-neutral-500
               focus:outline-none focus:border-brand-primary-500 focus:ring-2 focus:ring-brand-primary-500/20"
    placeholder="Search..."
  />
</div>

// Error state
<input
  type="text"
  className="w-full bg-white/5 border border-semantic-error
             rounded-lg px-4 py-3
             text-white placeholder:text-neutral-500
             focus:outline-none focus:border-semantic-error focus:ring-2 focus:ring-semantic-error/20"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" className="text-semantic-error text-small mt-2">
  Please enter a valid email
</p>
```

### Badges

```tsx
// Status badges
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                 bg-semantic-success-bg text-semantic-success
                 text-small font-medium border border-semantic-success-border">
  <span className="w-1.5 h-1.5 rounded-full bg-semantic-success" />
  Active
</span>

<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                 bg-semantic-warning-bg text-semantic-warning
                 text-small font-medium border border-semantic-warning-border">
  <span className="w-1.5 h-1.5 rounded-full bg-semantic-warning" />
  Pending
</span>

<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                 bg-semantic-error-bg text-semantic-error
                 text-small font-medium border border-semantic-error-border">
  <span className="w-1.5 h-1.5 rounded-full bg-semantic-error" />
  Failed
</span>
```

### Tooltips

```tsx
// Hover tooltip
<div className="group relative inline-block">
  <button className="text-neutral-500 hover:text-white">
    <Info className="h-4 w-4" />
  </button>
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                  invisible group-hover:visible
                  bg-neutral-100 border border-white/10 rounded-lg px-3 py-2
                  text-small text-white whitespace-nowrap
                  shadow-lg backdrop-blur-xl
                  transition-all duration-200">
    This is a tooltip
    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1
                    w-2 h-2 bg-neutral-100 border-r border-b border-white/10
                    rotate-45" />
  </div>
</div>
```

### Modals

```tsx
// Modal overlay
<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50
                flex items-center justify-center p-4">
  <div className="bg-neutral-50 border border-white/10 rounded-2xl
                  max-w-lg w-full p-6
                  shadow-2xl
                  animate-in fade-in zoom-in-95 duration-200">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-h3">Modal Title</h2>
      <button className="text-neutral-500 hover:text-white">
        <X className="h-5 w-5" />
      </button>
    </div>
    <div className="mb-6">
      <p className="text-body text-neutral-600">Modal content goes here</p>
    </div>
    <div className="flex gap-3 justify-end">
      <button className="px-4 py-2 text-neutral-600 hover:text-white rounded-lg">
        Cancel
      </button>
      <button className="px-4 py-2 bg-brand-primary-500 hover:bg-brand-primary-600
                         text-white rounded-lg">
        Confirm
      </button>
    </div>
  </div>
</div>
```

---

## Animation & Motion

### Animation Principles

1. **Purpose-Driven**: Every animation should serve a purpose
2. **Subtle**: Animations should enhance, not distract
3. **Fast**: Most animations 150-300ms
4. **Reduced Motion**: Respect `prefers-reduced-motion`

### Standard Timings

```css
/* Instant - State changes */
--duration-instant: 100ms;

/* Quick - Micro-interactions */
--duration-quick: 150ms;

/* Normal - Standard transitions */
--duration-normal: 200ms;

/* Slow - Complex animations */
--duration-slow: 300ms;

/* Very slow - Page transitions */
--duration-very-slow: 500ms;
```

### Easing Functions

```css
/* Standard easing */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Smooth entry */
--ease-out: cubic-bezier(0.0, 0, 0.2, 1);

/* Smooth exit */
--ease-in: cubic-bezier(0.4, 0, 1, 1);

/* Bouncy */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Common Animations

```tsx
// Hover scale
<button className="transition-transform duration-200 hover:scale-105">
  Button
</button>

// Fade in
<div className="animate-in fade-in duration-200">
  Content
</div>

// Slide in from bottom
<div className="animate-in slide-in-from-bottom-4 duration-300">
  Content
</div>

// Stagger children
<div className="space-y-4">
  {items.map((item, i) => (
    <div
      key={item.id}
      className="animate-in fade-in slide-in-from-bottom-4 duration-200"
      style={{ animationDelay: `${i * 50}ms` }}
    >
      {item.content}
    </div>
  ))}
</div>

// Loading spinner
<div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-primary-500 border-t-transparent" />

// Pulse (loading state)
<div className="animate-pulse bg-neutral-100 rounded-lg h-20" />
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

## Dark Mode

### SEOLOGY.AI uses **dark-first design** with optional light mode.

### Dark Mode Colors (Default)

```css
:root {
  /* Backgrounds */
  --bg-base: #0a0f1f;
  --bg-elevated: #1f2d54;
  --bg-subtle: rgba(255, 255, 255, 0.05);

  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #d1d5db;
  --text-tertiary: #9ca3af;

  /* Borders */
  --border-primary: rgba(255, 255, 255, 0.1);
  --border-focus: #3b82f6;
}
```

### Light Mode Override (Optional)

```css
[data-theme="light"] {
  /* Backgrounds */
  --bg-base: #ffffff;
  --bg-elevated: #f9fafb;
  --bg-subtle: #f3f4f6;

  /* Text */
  --text-primary: #111827;
  --text-secondary: #4b5563;
  --text-tertiary: #6b7280;

  /* Borders */
  --border-primary: #e5e7eb;
  --border-focus: #3b82f6;
}
```

### Dark Mode Best Practices

1. **Never pure black** - Use #0a0f1f for base background
2. **Elevate with opacity** - Use white/5 for cards
3. **Reduce contrast on dark** - Text doesn't need to be pure white
4. **Adjust shadows** - Use lighter, more subtle shadows
5. **Test glassmorphism** - Ensure backdrop-blur works on dark

### Component Dark Mode Examples

```tsx
// Card with proper dark mode
<div className="bg-[var(--bg-elevated)] border border-[var(--border-primary)]
                [data-theme='light'] &:bg-white [data-theme='light'] &:border-gray-200">
  {/* Content */}
</div>

// Text with proper contrast
<p className="text-[var(--text-secondary)]">
  Secondary text
</p>

// Input with dark mode
<input
  className="bg-[var(--bg-subtle)] border-[var(--border-primary)]
             text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]
             focus:border-[var(--border-focus)]"
/>
```

---

## Design Tokens Reference

### Complete Token System

```css
:root {
  /* Spacing (8px base) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-24: 6rem;    /* 96px */

  /* Border Radius */
  --radius-sm: 0.25rem;   /* 4px - buttons, badges */
  --radius-md: 0.5rem;    /* 8px - inputs, cards */
  --radius-lg: 0.75rem;   /* 12px - large cards */
  --radius-xl: 1rem;      /* 16px - modals */
  --radius-2xl: 1.5rem;   /* 24px - hero cards */
  --radius-full: 9999px;  /* Fully rounded */

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* Z-index */
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-modal-backdrop: 1200;
  --z-modal: 1300;
  --z-popover: 1400;
  --z-tooltip: 1500;
  --z-toast: 1600;
}
```

---

## Accessibility Notes

All styling MUST meet [Design Principles](./design-principles.md) accessibility requirements:

1. ✅ **Color Contrast**: 4.5:1 minimum for text, 3:1 for large text
2. ✅ **Touch Targets**: 44x44px minimum
3. ✅ **Focus Indicators**: 2px outline with 4px shadow
4. ✅ **Reduced Motion**: Respect prefers-reduced-motion
5. ✅ **High Contrast**: Support prefers-contrast: high
6. ✅ **Screen Readers**: Semantic HTML + ARIA

---

## Brand Asset Checklist

### Required Assets

- [ ] Logo SVG (white on transparent)
- [ ] Logo SVG (blue on transparent)
- [ ] Logo Mark SVG
- [ ] Favicon (16x16, 32x32, 180x180)
- [ ] OG Image (1200x630)
- [ ] Twitter Card Image (1200x675)
- [ ] App Icon (multiple sizes for PWA)

### Marketing Assets

- [ ] Hero section illustrations
- [ ] Feature highlight icons
- [ ] Empty state illustrations
- [ ] Error page illustrations (404, 500)
- [ ] Loading animations
- [ ] Success/confirmation animations

---

## Quick Reference: Common Patterns

### Call to Action

```tsx
<button className="bg-gradient-accent text-white font-semibold
                   px-8 py-4 rounded-xl
                   shadow-xl shadow-brand-primary-500/20
                   hover:shadow-2xl hover:shadow-brand-primary-500/30 hover:scale-105
                   transition-all duration-200">
  Get Started - Free Trial
</button>
```

### Stats Display

```tsx
<div className="grid grid-cols-3 gap-6">
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
    <div className="text-caption text-neutral-600 mb-2">Total Fixes</div>
    <div className="text-h1 font-mono text-white">1,247</div>
    <div className="text-small text-semantic-success mt-2">+23% this week</div>
  </div>
  {/* More stats */}
</div>
```

### Feature Card

```tsx
<div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8
                hover:bg-white/10 hover:border-brand-primary-500/30
                transition-all duration-300">
  <div className="w-12 h-12 bg-brand-primary-500/10 rounded-xl flex items-center justify-center mb-4
                  group-hover:bg-brand-primary-500/20 transition-colors duration-200">
    <Zap className="h-6 w-6 text-brand-primary-500" />
  </div>
  <h3 className="text-h3 mb-3">Automatic Fixes</h3>
  <p className="text-body text-neutral-600">
    AI-powered SEO fixes applied automatically to your CMS
  </p>
</div>
```

### Data Table Cell (Numeric)

```tsx
<td className="text-right">
  <span className="font-mono text-white">$12,543.00</span>
</td>
```

---

## Revision History

- **v1.0** - 2025-01-06 - Initial style guide creation
- Based on OneRedOak S-Tier SaaS Dashboard framework
- Aligned with [Design Principles](./design-principles.md)

---

**Next Steps:**
1. Add brand assets to `/public/brand/`
2. Update CLAUDE.md with design review process
3. Create `/design-review` slash command
4. Set up design review agent for automated checks
