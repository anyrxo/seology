# Glass Effects Quick Reference

Quick reference for using glass-morphism and gradient effects in SEOLOGY.AI.

## Import Statements

```tsx
// Glass components
import { GlassCard, GlassPanel, FloatingGlass } from '@/components/ui/glass-card'
import { GradientBorder, GradientOutline } from '@/components/ui/gradient-border'

// Premium components
import { PremiumButton, GradientLink } from '@/components/ui/premium-button'
import { PremiumModal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/premium-modal'
import {
  GlassNav, NavContainer, NavLogo, NavLinks, NavLink, NavActions,
  MobileMenuButton, MobileMenu, MobileMenuLink
} from '@/components/ui/glass-nav'

// Typography utilities
import { gradientText, textEffects } from '@/lib/typography'
import { cn } from '@/lib/utils'
```

## Common Patterns

### Glass Card
```tsx
<GlassCard variant="medium" blur="xl" hover>
  <div className="p-6">Content</div>
</GlassCard>
```

### Glass Card with Effects
```tsx
<GlassPanel variant="medium" blur="xl" innerGlow shimmer>
  <div className="p-6">Content</div>
</GlassPanel>
```

### Floating Card
```tsx
<FloatingGlass variant="medium" blur="xl">
  <div className="p-6">Content</div>
</FloatingGlass>
```

### Gradient Border
```tsx
<GradientBorder gradient="rainbow" animated borderWidth="2">
  <div className="p-6">Content</div>
</GradientBorder>
```

### Premium Button
```tsx
<PremiumButton variant="gradient" gradient="rainbow" size="lg">
  Click Me
</PremiumButton>
```

### Gradient Text
```tsx
<h1 className={cn('text-6xl font-bold', gradientText.rainbow)}>
  Heading
</h1>
```

### Gradient Text with Glow
```tsx
<h1 className={cn(
  'text-6xl font-bold',
  gradientText.rainbow,
  textEffects.glow
)}>
  Heading
</h1>
```

### Modal
```tsx
<PremiumModal isOpen={open} onClose={() => setOpen(false)} size="lg">
  <ModalHeader>Title</ModalHeader>
  <ModalBody>Content</ModalBody>
  <ModalFooter>
    <PremiumButton onClick={handleConfirm}>Confirm</PremiumButton>
  </ModalFooter>
</PremiumModal>
```

### Navigation
```tsx
<GlassNav variant="fixed" blurOnScroll>
  <NavContainer>
    <NavLogo>SEOLOGY.AI</NavLogo>
    <NavLinks>
      <NavLink href="/features">Features</NavLink>
    </NavLinks>
    <NavActions>
      <PremiumButton variant="gradient">Sign Up</PremiumButton>
    </NavActions>
  </NavContainer>
</GlassNav>
```

## CSS Classes

### Glass Effects
```css
.glass-light      /* bg-white/5 + blur */
.glass-medium     /* bg-white/10 + blur */
.glass-heavy      /* bg-white/20 + blur */
```

### Backgrounds
```css
.bg-gradient-mesh      /* Multi-color mesh */
.bg-gradient-animated  /* Animated gradient */
.bg-gradient-radial    /* Radial overlay */
.bg-spotlight          /* Moving spotlight */
```

### Shadows
```css
.shadow-glow           /* White glow */
.shadow-glow-blue      /* Blue glow */
.shadow-glow-purple    /* Purple glow */
.shadow-glow-pink      /* Pink glow */
```

### Animations
```css
.animate-shimmer       /* Text shimmer (3s) */
.animate-float         /* Float up/down (6s) */
.animate-spin-slow     /* Slow rotation (8s) */
.animate-gradient-shift /* Gradient shift (15s) */
.animate-spotlight     /* Spotlight move (20s) */
```

## Prop Options

### GlassCard
- `variant`: 'light' | 'medium' | 'heavy'
- `blur`: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
- `hover`: boolean

### GlassPanel
- Same as GlassCard plus:
- `innerGlow`: boolean
- `shimmer`: boolean

### GradientBorder
- `gradient`: 'blue' | 'purple' | 'rainbow' | 'white'
- `animated`: boolean
- `borderWidth`: '1' | '2' | '3'

### PremiumButton
- `variant`: 'gradient' | 'outline' | 'glass' | 'glow'
- `gradient`: 'blue' | 'purple' | 'rainbow'
- `size`: 'sm' | 'md' | 'lg' | 'xl'

### PremiumModal
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `closeOnBackdrop`: boolean
- `showCloseButton`: boolean

### GlassNav
- `variant`: 'fixed' | 'sticky' | 'static'
- `blurOnScroll`: boolean

## Gradient Text Options

```tsx
gradientText.blue       // Blue gradient
gradientText.purple     // Purple → Pink
gradientText.rainbow    // Blue → Purple → Pink
gradientText.white      // White fade
gradientText.shimmer    // Animated shimmer
gradientText.subtle     // Subtle white
gradientText.accent     // Light accents
gradientText.gold       // Gold shimmer
```

## Text Effects

```tsx
textEffects.glow         // White glow
textEffects.glowBlue     // Blue glow
textEffects.glowPurple   // Purple glow
textEffects.shadow       // Drop shadow
textEffects.outline      // Text outline
```

## Complete Examples

### Hero Section
```tsx
<section className="bg-gradient-mesh min-h-screen">
  <div className="bg-spotlight absolute inset-0" />
  <div className="relative z-10 container mx-auto px-4 py-20">
    <h1 className={cn(
      'text-7xl font-bold text-center mb-6',
      gradientText.rainbow,
      textEffects.glow
    )}>
      AI-Powered SEO
    </h1>
    <GlassPanel variant="medium" blur="xl" innerGlow shimmer className="max-w-4xl mx-auto">
      <div className="p-12 text-center">
        <p className="text-xl text-white/80 mb-8">
          Revolutionary platform
        </p>
        <PremiumButton variant="gradient" gradient="rainbow" size="lg">
          Get Started
        </PremiumButton>
      </div>
    </GlassPanel>
  </div>
</section>
```

### Feature Grid
```tsx
<div className="grid md:grid-cols-3 gap-6">
  {features.map((feature) => (
    <FloatingGlass key={feature.id} variant="medium" blur="xl">
      <div className="p-6">
        <div className={cn('text-4xl mb-4', textEffects.glowBlue)}>
          {feature.icon}
        </div>
        <h3 className={cn('text-xl font-bold mb-2', gradientText.white)}>
          {feature.title}
        </h3>
        <p className="text-white/70">{feature.description}</p>
      </div>
    </FloatingGlass>
  ))}
</div>
```

### Pricing Card
```tsx
<GradientBorder gradient="rainbow" animated borderWidth="2">
  <GlassCard variant="heavy" blur="xl">
    <div className="p-8">
      <h3 className={cn('text-2xl font-bold mb-4', gradientText.accent)}>
        Premium Plan
      </h3>
      <div className="text-4xl font-bold mb-6">
        <span className={gradientText.white}>$99</span>
        <span className="text-white/60 text-lg">/mo</span>
      </div>
      <PremiumButton variant="gradient" gradient="rainbow" className="w-full">
        Get Started
      </PremiumButton>
    </div>
  </GlassCard>
</GradientBorder>
```

### Stats Dashboard
```tsx
<div className="grid md:grid-cols-4 gap-6">
  {stats.map((stat) => (
    <GlassPanel key={stat.id} variant="light" blur="xl" innerGlow>
      <div className="p-6">
        <div className="text-sm text-white/60 mb-2">{stat.label}</div>
        <div className={cn('text-3xl font-bold', gradientText.white)}>
          {stat.value}
        </div>
        <div className="text-sm text-green-400 mt-2">
          ↑ {stat.change}%
        </div>
      </div>
    </GlassPanel>
  ))}
</div>
```

## Tips

1. **Use glass on dark backgrounds** - Effects work best on black/dark gray
2. **Layer effects carefully** - Too many glass elements can reduce readability
3. **Reserve heavy effects for CTAs** - Keep visual hierarchy clear
4. **Test on mobile** - Some effects may need simplification
5. **Maintain contrast** - Ensure text remains readable

## Performance

- Use `variant="light"` for better performance
- Limit `backdrop-blur` to visible elements
- Avoid deep nesting of glass components
- Use `will-change` sparingly
- Test on lower-end devices

## Accessibility

- All components maintain WCAG AA contrast
- Keyboard navigation fully supported
- Screen reader compatible
- Focus indicators included
- Respects `prefers-reduced-motion`

---

**For complete documentation, see:** `GLASS_MORPHISM_GUIDE.md`
