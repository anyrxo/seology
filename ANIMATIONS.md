# Animation System Documentation

Complete guide to animations and interactions in SEOLOGY.AI, based on Webflow Dashflow X template patterns.

## Table of Contents

1. [Overview](#overview)
2. [Animation Library](#animation-library)
3. [Framer Motion Patterns](#framer-motion-patterns)
4. [CSS Animation Classes](#css-animation-classes)
5. [Component-Specific Animations](#component-specific-animations)
6. [Best Practices](#best-practices)
7. [Performance Considerations](#performance-considerations)

---

## Overview

All animations in SEOLOGY.AI follow the Webflow Dashflow X template patterns with these core principles:

- **Duration**: 300ms for most interactions (fast: 150ms, slow: 500ms)
- **Easing**: `[0.4, 0, 0.2, 1]` (ease-out cubic-bezier)
- **Scale**: 1.02 for hover, 0.98 for active/tap
- **Lift**: -4px translateY for card hovers
- **Shadows**: Increase on hover for depth

### Animation Utilities Location

All animation utilities are centralized in:
```
lib/animations.ts
```

---

## Animation Library

### Import Animations

```typescript
import {
  // Variants
  fadeIn,
  fadeInUp,
  cardHover,
  buttonPrimaryHover,
  dropdownContainer,
  modalContent,

  // Configs
  easings,
  springConfigs,

  // CSS Classes
  animationClasses,
  combineAnimations,
} from '@/lib/animations'
```

---

## Framer Motion Patterns

### 1. Button Animations

Based on Webflow `.btn-primary` and `.btn-secondary` patterns.

**Primary Button:**
```tsx
import { motion } from 'framer-motion'
import { buttonPrimaryHover, buttonTap } from '@/lib/animations'

<motion.button
  whileHover={buttonPrimaryHover}
  whileTap={buttonTap}
  className="btn-primary"
>
  Click Me
</motion.button>
```

**Animation Details:**
- Hover: `scale: 1.02`, enhanced shadow
- Tap: `scale: 0.98`
- Duration: 300ms
- Shadow: `0 2px 16px 1px rgba(74, 58, 255, 0.3)`

**Secondary Button:**
```tsx
<motion.button
  whileHover={buttonSecondaryHover}
  whileTap={buttonTap}
  className="btn-secondary"
>
  Click Me
</motion.button>
```

**Animation Details:**
- Hover: `scale: 1.02`, lighter shadow
- Shadow: `0 2px 6px 0 rgba(20, 20, 43, 0.1)`

### 2. Card Animations

Based on Webflow card hover patterns with lift effect.

**Hover Lift:**
```tsx
import { cardHover } from '@/lib/animations'

<motion.div
  whileHover={cardHover}
  className="card"
>
  Card Content
</motion.div>
```

**Animation Details:**
- Transform: `translateY(-4px)`
- Shadow: `0 8px 24px 0 rgba(20, 20, 43, 0.15)`
- Duration: 300ms

**Clickable Card:**
```tsx
import { cardHoverLift } from '@/lib/animations'

<motion.div
  whileHover={cardHoverLift}
  whileTap={{ scale: 0.99, y: -2 }}
  className="card cursor-pointer"
>
  Clickable Card
</motion.div>
```

### 3. Icon Animations

Icons transition from neutral to accent color on hover.

```tsx
import { iconHover } from '@/lib/animations'

<motion.div
  whileHover={iconHover}
  className="icon"
>
  <IconComponent />
</motion.div>
```

**Animation Details:**
- Scale: `1.1`
- Color: changes to `var(--accent--primary-1)`
- Duration: 300ms

**Scale Only:**
```tsx
import { iconScaleHover } from '@/lib/animations'

<motion.div whileHover={iconScaleHover}>
  <LogoIcon />
</motion.div>
```

### 4. Sidebar Link Animations

Based on Webflow `.sidebar-link` patterns with bounce effect for active state.

```tsx
import { sidebarLinkHover, sidebarLinkActive } from '@/lib/animations'

<motion.a
  whileHover={sidebarLinkHover}
  animate={isActive ? sidebarLinkActive : 'initial'}
  className="sidebar-link"
>
  Dashboard
</motion.a>
```

**Animation Details:**
- **Hover**: Background changes, scale 1.01
- **Active**: Background accent color, scale 1.06 with bounce easing

### 5. Dropdown Animations

Fade in with slide down effect.

```tsx
import { AnimatePresence } from 'framer-motion'
import { dropdownContainer } from '@/lib/animations'

<AnimatePresence>
  {isOpen && (
    <motion.div
      variants={dropdownContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="dropdown-menu"
    >
      Dropdown Content
    </motion.div>
  )}
</AnimatePresence>
```

**Animation Details:**
- Enter: Fade in + slide down + scale up
- Exit: Fade out + slide up + scale down
- Duration: 150ms (fast)

### 6. Modal Animations

Background fade + content scale with slight delay.

```tsx
import { modalBackdropVariants, modalContentVariants } from '@/lib/animations'

<AnimatePresence>
  {isOpen && (
    <>
      <motion.div
        variants={modalBackdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal-backdrop"
      />
      <motion.div
        variants={modalContentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal-content"
      >
        Modal Content
      </motion.div>
    </>
  )}
</AnimatePresence>
```

### 7. Tab Animations

Content fades and slides when switching tabs.

```tsx
import { tabContentVariants } from '@/lib/animations'

<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    variants={tabContentVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    Tab Content
  </motion.div>
</AnimatePresence>
```

### 8. List Stagger Animations

Animate lists with staggered entrance.

```tsx
import { staggerContainer, staggerItem } from '@/lib/animations'

<motion.ul
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.li
      key={item.id}
      variants={staggerItem}
    >
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

**Animation Details:**
- Stagger delay: 100ms between items
- Each item fades in + slides up

### 9. Page Transitions

```tsx
import { pageTransition } from '@/lib/animations'

<motion.div
  variants={pageTransition}
  initial="hidden"
  animate="visible"
  exit="exit"
>
  Page Content
</motion.div>
```

### 10. Toast/Notification Animations

Slide in from right.

```tsx
import { toastSlideIn } from '@/lib/animations'

<motion.div
  variants={toastSlideIn}
  initial="hidden"
  animate="visible"
  exit="exit"
  className="toast"
>
  Notification
</motion.div>
```

---

## CSS Animation Classes

For components where Framer Motion is not available or overkill, use CSS animation classes from `animationClasses`.

### Button Classes

```tsx
import { animationClasses } from '@/lib/animations'

// Primary button
<button className={animationClasses.buttonPrimaryHover}>
  Primary Action
</button>

// Secondary button
<button className={animationClasses.buttonSecondaryHover}>
  Secondary Action
</button>

// Generic button
<button className={animationClasses.buttonHover}>
  Generic Button
</button>
```

### Card Classes

```tsx
// Hover lift effect
<div className={animationClasses.cardHover}>
  Card with hover lift
</div>

// Hover with scale
<div className={animationClasses.cardHoverScale}>
  Card with hover scale
</div>

// Clickable card (lift + scale + active state)
<div className={animationClasses.cardClickable}>
  Clickable card
</div>
```

### Icon Classes

```tsx
// Icon with color change
<div className={animationClasses.iconHover}>
  <IconComponent />
</div>

// Icon scale only
<div className={animationClasses.iconScale}>
  <IconComponent />
</div>

// Icon with rotation
<div className={animationClasses.iconRotate}>
  <IconComponent />
</div>
```

### Sidebar Link Classes

```tsx
// Sidebar link
<a className={animationClasses.sidebarLink}>
  Link Text
</a>

// Active sidebar link
<a className={animationClasses.sidebarLinkActive}>
  Active Link
</a>
```

### Combining Classes

```tsx
import { combineAnimations, animationClasses } from '@/lib/animations'

<div className={combineAnimations(
  animationClasses.cardHover,
  animationClasses.transition,
  'custom-class'
)}>
  Combined animations
</div>
```

---

## Component-Specific Animations

### Button Component

Located at: `components/ui/button.tsx`

The Button component already includes:
- **Ripple effect**: Click ripple animation
- **Loading state**: Spinner animation
- **Hover states**: Built-in scale and shadow effects
- **Active states**: Scale down on click

Usage:
```tsx
import { Button } from '@/components/ui/button'

<Button
  variant="primary"
  ripple={true}
  isLoading={false}
>
  Click Me
</Button>
```

### Glass Card Component

Located at: `components/ui/glass-card.tsx`

Includes glassmorphism with hover effects:
```tsx
import { GlassCard } from '@/components/ui/glass-card'

<GlassCard className="hover-effect">
  Content
</GlassCard>
```

### Badge Component

Located at: `components/ui/badge.tsx`

For notification badges, use pulse animation:
```tsx
import { motion } from 'framer-motion'
import { badgePulseVariants } from '@/lib/animations'
import { Badge } from '@/components/ui/badge'

<motion.div
  variants={badgePulseVariants}
  initial="initial"
  animate="animate"
>
  <Badge>3</Badge>
</motion.div>
```

### Skeleton Component

Located at: `components/ui/Skeleton.tsx`

Includes automatic pulse animation:
```tsx
import { Skeleton } from '@/components/ui/Skeleton'

<Skeleton className="h-4 w-full" />
```

---

## Best Practices

### 1. Use Appropriate Animation Duration

```typescript
// Fast (150ms): Dropdowns, tooltips, quick feedback
// Normal (300ms): Buttons, cards, most interactions
// Slow (500ms): Page transitions, large modal entrances
```

### 2. Respect Motion Preferences

Always check for `prefers-reduced-motion`:

```tsx
import { useReducedMotion } from 'framer-motion'

function Component() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : animations}
    >
      Content
    </motion.div>
  )
}
```

### 3. Use AnimatePresence for Exit Animations

```tsx
import { AnimatePresence } from 'framer-motion'

<AnimatePresence mode="wait">
  {isVisible && <Component key="unique-key" />}
</AnimatePresence>
```

### 4. Optimize Performance

- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (triggers layout)
- Use `will-change` sparingly

```tsx
<motion.div
  style={{ willChange: 'transform' }}
  whileHover={{ scale: 1.02 }}
>
  Optimized Animation
</motion.div>
```

### 5. Consistent Easing

Use centralized easing functions:

```typescript
import { easings } from '@/lib/animations'

const animation = {
  duration: 0.3,
  ease: easings.easeOut  // [0.4, 0, 0.2, 1]
}
```

---

## Performance Considerations

### GPU Acceleration

These properties are GPU-accelerated:
- `transform` (scale, rotate, translate)
- `opacity`
- `filter` (blur, etc.)

### Layout Thrashing

Avoid these properties in animations:
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `border-width`

### Best Practices

1. **Batch animations**: Animate multiple properties together
2. **Use transform3d**: Forces GPU acceleration
   ```tsx
   <motion.div style={{ transform: 'translate3d(0,0,0)' }} />
   ```
3. **Limit concurrent animations**: Max 5-10 elements animating simultaneously
4. **Use CSS for simple animations**: Save Framer Motion for complex interactions

---

## Animation Timing Reference

Based on Webflow Dashflow X template:

| Interaction | Duration | Easing | Effect |
|-------------|----------|--------|---------|
| Button hover | 300ms | ease-out | scale(1.02) + shadow |
| Button tap | 100ms | ease-out | scale(0.98) |
| Card hover | 300ms | ease-out | translateY(-4px) + shadow |
| Icon hover | 300ms | ease-out | scale(1.1) + color |
| Sidebar active | 300ms | bounce | scale(1.06) + bg color |
| Dropdown | 150ms | ease-out | fade + slide + scale |
| Modal enter | 300ms | ease-entrance | fade + scale + slide |
| Modal exit | 200ms | ease-exit | fade + scale |
| Page transition | 400ms | ease-entrance | fade + slide |
| Toast | 300ms | ease-entrance | slide from right |

---

## Spring Configurations

For more natural, physics-based animations:

```typescript
import { springConfigs } from '@/lib/animations'

// Gentle spring (subtle bounce)
const gentleAnimation = {
  type: 'spring',
  ...springConfigs.gentle  // stiffness: 120, damping: 14
}

// Wobbly spring (fun bounce)
const wobbleAnimation = {
  type: 'spring',
  ...springConfigs.wobbly  // stiffness: 180, damping: 12
}

// Stiff spring (snappy)
const stiffAnimation = {
  type: 'spring',
  ...springConfigs.stiff  // stiffness: 400, damping: 30
}
```

---

## Testing Animations

### Visual Testing

1. Check animations in Chrome DevTools
   - Open DevTools > More Tools > Animations
   - Slow down animations to inspect

2. Test on different devices
   - Desktop (Chrome, Firefox, Safari)
   - Mobile (iOS Safari, Android Chrome)
   - Reduced motion preferences

### Performance Testing

```typescript
// Monitor frame rate during animations
const beforeTime = performance.now()
// ... trigger animation
const afterTime = performance.now()
console.log(`Animation took ${afterTime - beforeTime}ms`)
```

---

## Troubleshooting

### Animation Not Working

1. Check if Framer Motion is imported
2. Verify animation variant names match
3. Ensure AnimatePresence wraps exit animations
4. Check for CSS conflicts (e.g., `!important` overrides)

### Janky Animations

1. Use Chrome DevTools Performance tab
2. Check for layout thrashing
3. Limit concurrent animations
4. Use transform instead of position properties

### Hover Not Working on Mobile

Use tap events instead:
```tsx
<motion.div
  whileTap={hoverAnimation}  // Mobile
  whileHover={hoverAnimation}  // Desktop
>
  Works on both!
</motion.div>
```

---

## Examples

### Complete Button Example

```tsx
import { motion } from 'framer-motion'
import { buttonPrimaryHover, buttonTap } from '@/lib/animations'

export function AnimatedButton() {
  return (
    <motion.button
      whileHover={buttonPrimaryHover}
      whileTap={buttonTap}
      className="btn-primary"
    >
      <span>Click Me</span>
    </motion.button>
  )
}
```

### Complete Card Example

```tsx
import { motion } from 'framer-motion'
import { cardHover } from '@/lib/animations'

export function AnimatedCard({ children }) {
  return (
    <motion.div
      whileHover={cardHover}
      className="card"
    >
      {children}
    </motion.div>
  )
}
```

### Complete Modal Example

```tsx
import { AnimatePresence, motion } from 'framer-motion'
import { modalBackdropVariants, modalContentVariants } from '@/lib/animations'

export function AnimatedModal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

## Resources

- **Framer Motion Docs**: https://www.framer.com/motion/
- **Webflow Interactions**: https://university.webflow.com/lesson/interactions-overview
- **Animation Easing**: https://easings.net/
- **Performance**: https://web.dev/animations/

---

## Summary

All animations in SEOLOGY.AI follow these principles from the Webflow Dashflow X template:

1. **300ms duration** for most interactions
2. **ease-out easing** `[0.4, 0, 0.2, 1]`
3. **Scale 1.02** for hover, **0.98** for active
4. **translateY(-4px)** for card lifts
5. **Enhanced shadows** on hover for depth
6. **Consistent patterns** across all components

Import from `@/lib/animations` and use the pre-configured variants for consistency!
