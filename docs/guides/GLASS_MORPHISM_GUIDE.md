# Glass-Morphism & Gradient Effects Guide

Complete implementation of premium glass-morphism and gradient effects for SEOLOGY.AI.

## Table of Contents

1. [Glass Card Components](#glass-card-components)
2. [Gradient Borders](#gradient-borders)
3. [Premium Buttons](#premium-buttons)
4. [Premium Modals](#premium-modals)
5. [Glass Navigation](#glass-navigation)
6. [Gradient Text](#gradient-text)
7. [Background Effects](#background-effects)
8. [Usage Examples](#usage-examples)

---

## Glass Card Components

### GlassCard

Basic glass-morphism card with customizable blur and opacity.

```tsx
import { GlassCard } from '@/components/ui/glass-card'

<GlassCard variant="medium" blur="xl" hover>
  <div className="p-6">
    <h3>Premium Card</h3>
    <p>Content goes here</p>
  </div>
</GlassCard>
```

**Props:**
- `variant`: 'light' | 'medium' | 'heavy' - Opacity level
- `blur`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' - Backdrop blur intensity
- `hover`: boolean - Adds hover effects
- `className`: Additional CSS classes

### GlassPanel

Glass card with inner glow and shimmer effects.

```tsx
import { GlassPanel } from '@/components/ui/glass-card'

<GlassPanel
  variant="medium"
  blur="xl"
  innerGlow
  shimmer
>
  <div className="p-8">
    Interactive content with premium effects
  </div>
</GlassPanel>
```

**Additional Props:**
- `innerGlow`: boolean - Adds inner glow on hover
- `shimmer`: boolean - Adds shimmer animation on hover

### FloatingGlass

Glass card with floating animation.

```tsx
import { FloatingGlass } from '@/components/ui/glass-card'

<FloatingGlass variant="medium" blur="xl" floatAnimation>
  <div className="p-6">
    Floating card content
  </div>
</FloatingGlass>
```

---

## Gradient Borders

### GradientBorder

Animated gradient border wrapper.

```tsx
import { GradientBorder } from '@/components/ui/gradient-border'

<GradientBorder
  gradient="rainbow"
  animated
  borderWidth="2"
>
  <div className="p-6">
    Content with gradient border
  </div>
</GradientBorder>
```

**Props:**
- `gradient`: 'blue' | 'purple' | 'rainbow' | 'white'
- `animated`: boolean - Rotates gradient border
- `borderWidth`: '1' | '2' | '3' - Border thickness in pixels

### GradientOutline

Button-style gradient outline.

```tsx
import { GradientOutline } from '@/components/ui/gradient-border'

<GradientOutline gradient="rainbow">
  Outlined Button Text
</GradientOutline>
```

---

## Premium Buttons

### PremiumButton

Feature-rich button with gradient and effects.

```tsx
import { PremiumButton } from '@/components/ui/premium-button'

{/* Gradient Button */}
<PremiumButton
  variant="gradient"
  gradient="rainbow"
  size="lg"
  onClick={() => {}}
>
  Get Started
</PremiumButton>

{/* Glass Button */}
<PremiumButton variant="glass" size="md">
  Learn More
</PremiumButton>

{/* Outline Button */}
<PremiumButton variant="outline" gradient="blue" size="md">
  Contact Us
</PremiumButton>

{/* Glow Button */}
<PremiumButton variant="glow" gradient="purple" size="lg">
  Premium Feature
</PremiumButton>
```

**Props:**
- `variant`: 'gradient' | 'outline' | 'glass' | 'glow'
- `gradient`: 'blue' | 'purple' | 'rainbow'
- `size`: 'sm' | 'md' | 'lg' | 'xl'

### GradientLink

Gradient text link.

```tsx
import { GradientLink } from '@/components/ui/premium-button'

<GradientLink gradient="rainbow" href="/features">
  View all features →
</GradientLink>
```

---

## Premium Modals

### PremiumModal

Modal with backdrop blur and glass effects.

```tsx
import {
  PremiumModal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@/components/ui/premium-modal'
import { PremiumButton } from '@/components/ui/premium-button'

const [isOpen, setIsOpen] = useState(false)

<PremiumModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  size="lg"
  closeOnBackdrop
  showCloseButton
>
  <ModalHeader>Premium Feature</ModalHeader>

  <ModalBody>
    <p>This modal has backdrop blur and glass-morphism effects.</p>
  </ModalBody>

  <ModalFooter>
    <PremiumButton
      variant="glass"
      onClick={() => setIsOpen(false)}
    >
      Cancel
    </PremiumButton>
    <PremiumButton
      variant="gradient"
      gradient="rainbow"
      onClick={() => {}}
    >
      Confirm
    </PremiumButton>
  </ModalFooter>
</PremiumModal>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `closeOnBackdrop`: boolean - Close when clicking backdrop
- `showCloseButton`: boolean - Show X button in top-right

---

## Glass Navigation

### Complete Navigation System

```tsx
import {
  GlassNav,
  NavContainer,
  NavLogo,
  NavLinks,
  NavLink,
  NavActions,
  MobileMenuButton,
  MobileMenu,
  MobileMenuLink,
} from '@/components/ui/glass-nav'
import { PremiumButton } from '@/components/ui/premium-button'

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <GlassNav variant="fixed" blurOnScroll>
      <NavContainer>
        <NavLogo href="/">
          <span>SEOLOGY.AI</span>
        </NavLogo>

        <NavLinks>
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/about" active>About</NavLink>
        </NavLinks>

        <NavActions>
          <NavLink href="/sign-in">Sign In</NavLink>
          <PremiumButton
            variant="gradient"
            gradient="rainbow"
            size="sm"
          >
            Get Started
          </PremiumButton>

          <MobileMenuButton
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </NavActions>
      </NavContainer>

      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileMenuLink href="/features">Features</MobileMenuLink>
        <MobileMenuLink href="/pricing">Pricing</MobileMenuLink>
        <MobileMenuLink href="/about" active>About</MobileMenuLink>
        <MobileMenuLink href="/sign-in">Sign In</MobileMenuLink>
      </MobileMenu>
    </GlassNav>
  )
}
```

---

## Gradient Text

### Using Typography Utilities

```tsx
import { gradientText, textEffects } from '@/lib/typography'
import { cn } from '@/lib/utils'

{/* Rainbow gradient */}
<h1 className={cn('text-6xl font-bold', gradientText.rainbow)}>
  Premium Heading
</h1>

{/* Shimmer effect */}
<h2 className={cn('text-4xl font-bold', gradientText.shimmer)}>
  Animated Shimmer Text
</h2>

{/* Blue gradient with glow */}
<h3 className={cn(
  'text-3xl font-semibold',
  gradientText.blue,
  textEffects.glowBlue
)}>
  Glowing Blue Text
</h3>

{/* Subtle white gradient */}
<p className={cn('text-xl', gradientText.white)}>
  Subtle gradient paragraph
</p>
```

### Available Gradients

```typescript
gradientText.blue       // Blue gradient
gradientText.purple     // Purple to pink
gradientText.rainbow    // Blue → Purple → Pink
gradientText.white      // White fade
gradientText.shimmer    // Animated shimmer
gradientText.subtle     // Subtle white
gradientText.accent     // Light accent colors
gradientText.gold       // Gold shimmer
```

### Available Text Effects

```typescript
textEffects.glow         // White glow
textEffects.glowBlue     // Blue glow
textEffects.glowPurple   // Purple glow
textEffects.shadow       // Drop shadow
textEffects.outline      // Text outline
```

---

## Background Effects

### Gradient Backgrounds

```tsx
{/* Mesh gradient */}
<div className="bg-gradient-mesh min-h-screen">
  Content with mesh gradient background
</div>

{/* Animated gradient */}
<div className="bg-gradient-animated min-h-screen">
  Content with animated gradient
</div>

{/* Radial gradient */}
<div className="bg-gradient-radial p-20">
  Content with radial gradient overlay
</div>

{/* Spotlight effect */}
<div className="bg-spotlight min-h-screen">
  Content with moving spotlight
</div>
```

### CSS Classes Available

```css
/* Glass utilities */
.glass-light      /* Light glass effect */
.glass-medium     /* Medium glass effect */
.glass-heavy      /* Heavy glass effect */

/* Shadow utilities */
.shadow-glow          /* White glow shadow */
.shadow-glow-blue     /* Blue glow shadow */
.shadow-glow-purple   /* Purple glow shadow */
.shadow-glow-pink     /* Pink glow shadow */

/* Effect utilities */
.glass-reflection     /* Adds reflection effect */
.inner-glow          /* Inner glow effect */
.nav-glass           /* Frosted navigation glass */

/* Gradient overlays */
.gradient-overlay-top     /* Top fade overlay */
.gradient-overlay-bottom  /* Bottom fade overlay */
```

---

## Usage Examples

### Hero Section with Glass Effects

```tsx
<section className="relative min-h-screen bg-gradient-mesh overflow-hidden">
  {/* Spotlight animation */}
  <div className="bg-spotlight absolute inset-0" />

  <div className="relative z-10 container mx-auto px-4 py-20">
    {/* Gradient heading */}
    <h1 className={cn(
      'text-7xl font-bold mb-6 text-center',
      gradientText.rainbow,
      textEffects.glow
    )}>
      AI-Powered SEO Automation
    </h1>

    {/* Glass card */}
    <GlassPanel
      variant="medium"
      blur="xl"
      innerGlow
      shimmer
      className="max-w-4xl mx-auto"
    >
      <div className="p-12 text-center">
        <p className="text-xl text-white/80 mb-8">
          First platform to actually fix SEO issues, not just report them.
        </p>

        <div className="flex gap-4 justify-center">
          <PremiumButton
            variant="gradient"
            gradient="rainbow"
            size="lg"
          >
            Start Free Trial
          </PremiumButton>

          <PremiumButton
            variant="glass"
            size="lg"
          >
            Watch Demo
          </PremiumButton>
        </div>
      </div>
    </GlassPanel>
  </div>
</section>
```

### Feature Cards Grid

```tsx
<div className="grid md:grid-cols-3 gap-6">
  {features.map((feature, i) => (
    <FloatingGlass
      key={i}
      variant="medium"
      blur="xl"
      className="p-6 hover:scale-105 transition-transform"
    >
      <div className={cn('text-4xl mb-4', textEffects.glowBlue)}>
        {feature.icon}
      </div>
      <h3 className={cn('text-xl font-bold mb-2', gradientText.white)}>
        {feature.title}
      </h3>
      <p className="text-white/70">{feature.description}</p>
    </FloatingGlass>
  ))}
</div>
```

### Pricing Cards with Gradient Borders

```tsx
<div className="grid md:grid-cols-3 gap-8">
  {plans.map((plan, i) => (
    <GradientBorder
      key={i}
      gradient="rainbow"
      animated={plan.featured}
      borderWidth={plan.featured ? "2" : "1"}
    >
      <GlassCard variant="heavy" blur="xl" className="p-8 h-full">
        {plan.featured && (
          <span className={cn(
            'inline-block px-3 py-1 mb-4 text-sm font-semibold rounded-full',
            'bg-gradient-to-r from-blue-500 to-purple-600',
            'text-white'
          )}>
            Most Popular
          </span>
        )}

        <h3 className={cn('text-2xl font-bold mb-2', gradientText.accent)}>
          {plan.name}
        </h3>

        <div className="text-4xl font-bold mb-6">
          <span className={gradientText.white}>${plan.price}</span>
          <span className="text-white/60 text-lg">/month</span>
        </div>

        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, j) => (
            <li key={j} className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-white/80">{feature}</span>
            </li>
          ))}
        </ul>

        <PremiumButton
          variant={plan.featured ? "gradient" : "outline"}
          gradient="rainbow"
          size="lg"
          className="w-full"
        >
          {plan.cta}
        </PremiumButton>
      </GlassCard>
    </GradientBorder>
  ))}
</div>
```

### Dashboard Stats with Glass Cards

```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  {stats.map((stat, i) => (
    <GlassPanel
      key={i}
      variant="light"
      blur="xl"
      innerGlow
      className="p-6"
    >
      <div className="text-sm text-white/60 mb-2">{stat.label}</div>
      <div className={cn('text-3xl font-bold', gradientText.white)}>
        {stat.value}
      </div>
      <div className={cn(
        'text-sm mt-2',
        stat.change > 0 ? 'text-green-400' : 'text-red-400'
      )}>
        {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
      </div>
    </GlassPanel>
  ))}
</div>
```

---

## Best Practices

### Performance

1. **Use backdrop-blur sparingly** - It's GPU-intensive
2. **Limit animated gradients** - Use on key elements only
3. **Avoid nesting glass effects** - Can cause rendering issues
4. **Use will-change for animations** - Improves performance

### Accessibility

1. **Maintain contrast ratios** - Glass effects can reduce readability
2. **Test with screen readers** - Ensure content is accessible
3. **Provide focus indicators** - Visible on glass backgrounds
4. **Use semantic HTML** - Don't rely only on visual effects

### Design Guidelines

1. **Consistency** - Use the same variant/blur across similar elements
2. **Hierarchy** - Reserve heavy effects for important elements
3. **Context** - Glass works best on dark backgrounds
4. **Balance** - Mix glass with solid elements for contrast

---

## Animation Reference

All animations are defined in `tailwind.config.ts` and `app/globals.css`:

- `animate-shimmer` - Text shimmer effect (3s)
- `animate-float` - Floating motion (6s)
- `animate-spin-slow` - Slow rotation (8s)
- `animate-gradient-shift` - Background gradient shift (15s)
- `animate-spotlight` - Moving spotlight (20s)

---

## Component File Locations

```
components/ui/
├── glass-card.tsx         # Glass card components
├── gradient-border.tsx    # Gradient border components
├── premium-button.tsx     # Premium button variants
├── premium-modal.tsx      # Modal with glass effects
└── glass-nav.tsx          # Navigation components

lib/
└── typography.ts          # Gradient text utilities

app/
└── globals.css            # Glass & gradient CSS

tailwind.config.ts         # Animation & shadow config
```

---

## Migration Guide

### Updating Existing Components

Replace standard components with premium versions:

**Before:**
```tsx
<div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
  <h3 className="text-white">Title</h3>
  <button className="bg-blue-500 text-white px-4 py-2 rounded">
    Click Me
  </button>
</div>
```

**After:**
```tsx
<GlassPanel variant="medium" blur="xl" innerGlow shimmer>
  <div className="p-6">
    <h3 className={gradientText.white}>Title</h3>
    <PremiumButton variant="gradient" gradient="rainbow">
      Click Me
    </PremiumButton>
  </div>
</GlassPanel>
```

---

## Troubleshooting

### Glass effect not visible
- Ensure parent has dark background
- Check z-index stacking
- Verify backdrop-filter support

### Animations not working
- Run `npm run dev` to rebuild Tailwind
- Check browser support for backdrop-filter
- Verify keyframes in tailwind.config.ts

### Performance issues
- Reduce backdrop-blur values
- Limit number of glass elements
- Use CSS containment: `contain: layout style paint`

---

## Browser Support

All effects work in modern browsers:
- Chrome 76+
- Firefox 103+
- Safari 9+
- Edge 79+

Fallbacks are built-in for older browsers.
