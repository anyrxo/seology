# Micro-Interactions & UX Enhancements Guide

This document describes all the delightful micro-interactions and smooth UX enhancements added to SEOLOGY.AI.

## Table of Contents
1. [Animation System](#animation-system)
2. [Custom Hooks](#custom-hooks)
3. [Animated Components](#animated-components)
4. [Usage Examples](#usage-examples)
5. [Performance Considerations](#performance-considerations)

## Animation System

### Core Animation Library (`lib/animations.ts`)

A comprehensive collection of Framer Motion animation variants for consistent animations across the app.

#### Available Animations

**Fade Animations:**
- `fadeIn` - Simple fade in/out
- `fadeInUp` - Fade in with slide from bottom
- `fadeInDown` - Fade in with slide from top
- `fadeInLeft` - Fade in with slide from left
- `fadeInRight` - Fade in with slide from right

**Scale Animations:**
- `scaleIn` - Scale from 95% to 100%
- `scaleInBounce` - Scale with spring bounce effect

**List Animations:**
- `staggerContainer` - Container for staggered children
- `staggerItem` - Individual items in stagger list

**Modal/Dialog:**
- `modalOverlay` - Backdrop fade animation
- `modalContent` - Modal content scale + fade

**Dropdown:**
- `dropdownContainer` - Dropdown menu animation

**Toast:**
- `toastSlideIn` - Slide in from right with scale

**Hover Effects:**
- `cardHover` - Card lift on hover (-4px)
- `cardHoverScale` - Card scale on hover (102%)
- `buttonTap` - Button press effect (97%)

**Page Transitions:**
- `pageTransition` - Page enter/exit animations

**Scroll:**
- `scrollReveal` - Reveal elements on scroll

**Progress:**
- `progressBar` - Progress bar fill animation
- `skeletonPulse` - Loading skeleton pulse

#### Spring Configs

```typescript
springConfigs.gentle    // Smooth and gentle
springConfigs.wobbly    // Fun and bouncy
springConfigs.stiff     // Quick and responsive
springConfigs.slow      // Slow and deliberate
```

#### Easing Functions

```typescript
easings.easeOut    // [0.4, 0, 0.2, 1]
easings.easeIn     // [0.4, 0, 1, 1]
easings.easeInOut  // [0.4, 0, 0.2, 1]
easings.bounce     // [0.34, 1.56, 0.64, 1]
```

## Custom Hooks

### `useScrollReveal()`

Reveals elements when they scroll into view using Intersection Observer.

```typescript
import { useScrollReveal } from '@/hooks/useScrollReveal'

function Component() {
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <div ref={ref} className={isVisible ? 'visible' : 'hidden'}>
      Content
    </div>
  )
}
```

**Options:**
- `threshold` - Percentage of element visible before triggering (default: 0.1)
- `rootMargin` - Margin around root (default: '0px')
- `triggerOnce` - Only trigger once (default: true)

### `useRipple()`

Creates Material Design ripple effect on click.

```typescript
import { useRipple } from '@/hooks/useRipple'

function Button() {
  const createRipple = useRipple({
    duration: 600,
    color: 'rgba(255, 255, 255, 0.3)'
  })

  return (
    <button onClick={createRipple}>
      Click me
    </button>
  )
}
```

**Options:**
- `duration` - Ripple animation duration in ms (default: 600)
- `color` - Ripple color (default: 'rgba(255, 255, 255, 0.3)')

### `useKeyboardShortcut()`

Register keyboard shortcuts for quick actions.

```typescript
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'

function Component() {
  useKeyboardShortcut(
    { key: 's', ctrl: true },
    () => console.log('Save triggered!'),
    { enabled: true }
  )
}
```

**Key Combo Options:**
- `key` - The key to press
- `ctrl` - Requires Ctrl key
- `shift` - Requires Shift key
- `alt` - Requires Alt key
- `meta` - Requires Cmd/Win key

### `useToast()`

Show toast notifications with animations.

```typescript
import { useToast } from '@/hooks/useToast'

function Component() {
  const { toast, success, error, warning, info } = useToast()

  const handleClick = () => {
    success('Success!', 'Your changes have been saved.')
    // or
    toast({
      title: 'Custom toast',
      description: 'With custom styling',
      variant: 'info',
      duration: 5000
    })
  }
}
```

**Variants:**
- `default` - Gray (neutral)
- `success` - Green (positive action)
- `error` - Red (errors/failures)
- `warning` - Yellow (warnings)
- `info` - Blue (information)

## Animated Components

### `<AnimatedButton>`

Enhanced button with ripple effect, hover animations, and loading states.

```tsx
import { AnimatedButton } from '@/components/ui/animated-button'

<AnimatedButton
  variant="primary"
  size="default"
  isLoading={false}
  withRipple={true}
  onClick={handleClick}
>
  Click me
</AnimatedButton>
```

**Features:**
- Ripple effect on click
- Hover scale animation
- Tap feedback (scale down)
- Loading spinner
- All standard button variants

### `<AnimatedCard>`

Card component with hover lift/scale effects.

```tsx
import {
  AnimatedCard,
  AnimatedCardHeader,
  AnimatedCardTitle,
  AnimatedCardContent
} from '@/components/ui/animated-card'

<AnimatedCard hover={true} hoverScale={false}>
  <AnimatedCardHeader>
    <AnimatedCardTitle>Title</AnimatedCardTitle>
  </AnimatedCardHeader>
  <AnimatedCardContent>
    Content here
  </AnimatedCardContent>
</AnimatedCard>
```

**Props:**
- `hover` - Enable hover effects (default: true)
- `hoverScale` - Use scale instead of lift (default: false)

### `<AnimatedInput>`

Input with focus animations and error states.

```tsx
import { AnimatedInput } from '@/components/ui/animated-input'

<AnimatedInput
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={errors.email}
  icon={<Mail />}
/>
```

**Features:**
- Label opacity animation on focus
- Container scale animation on focus
- Error message slide in
- Icon support
- All standard input props

### `<ScrollReveal>`

Wrapper component that reveals children on scroll.

```tsx
import { ScrollReveal } from '@/components/ui/scroll-reveal'

<ScrollReveal threshold={0.1} delay={0.2}>
  <div>This content will fade in when scrolled into view</div>
</ScrollReveal>
```

**Props:**
- `threshold` - Visibility threshold (default: 0.1)
- `delay` - Animation delay in seconds (default: 0)

### `<StaggerList>`

Animates children in sequence with stagger effect.

```tsx
import { StaggerList } from '@/components/ui/stagger-list'

<StaggerList staggerDelay={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerList>
```

**Props:**
- `staggerDelay` - Delay between items in seconds (default: 0.1)

### `<PageTransition>`

Smooth page transitions for route changes.

```tsx
import { PageTransition } from '@/components/ui/page-transition'

export default function Page() {
  return (
    <PageTransition>
      <div>Page content</div>
    </PageTransition>
  )
}
```

### `<ToastContainer>`

Global toast notification container (add to layout).

```tsx
import { ToastContainer } from '@/components/ui/toast-container'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
```

## Usage Examples

### Dashboard Card with Hover Effect

```tsx
import { AnimatedCard, AnimatedCardContent } from '@/components/ui/animated-card'

export function MetricCard({ title, value, trend }) {
  return (
    <AnimatedCard hover={true}>
      <AnimatedCardContent className="p-6">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <div className="flex items-end gap-2 mt-2">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-green-500 text-sm">{trend}%</span>
        </div>
      </AnimatedCardContent>
    </AnimatedCard>
  )
}
```

### Form with Animated Inputs

```tsx
import { AnimatedInput } from '@/components/ui/animated-input'
import { AnimatedButton } from '@/components/ui/animated-button'
import { Mail, Lock } from 'lucide-react'

export function LoginForm() {
  const [loading, setLoading] = useState(false)

  return (
    <form className="space-y-4">
      <AnimatedInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        icon={<Mail className="h-4 w-4" />}
      />
      <AnimatedInput
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={<Lock className="h-4 w-4" />}
      />
      <AnimatedButton
        type="submit"
        className="w-full"
        isLoading={loading}
      >
        Sign In
      </AnimatedButton>
    </form>
  )
}
```

### List with Stagger Animation

```tsx
import { StaggerList } from '@/components/ui/stagger-list'

export function NotificationList({ notifications }) {
  return (
    <StaggerList staggerDelay={0.08}>
      {notifications.map(notification => (
        <div key={notification.id} className="p-4 bg-gray-800 rounded-lg">
          {notification.message}
        </div>
      ))}
    </StaggerList>
  )
}
```

### Scroll Reveal Sections

```tsx
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export function FeaturesSection() {
  return (
    <div className="space-y-12">
      <ScrollReveal delay={0}>
        <Feature1 />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <Feature2 />
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <Feature3 />
      </ScrollReveal>
    </div>
  )
}
```

### Toast Notifications

```tsx
import { useToast } from '@/hooks/useToast'

export function ActionsPanel() {
  const { success, error } = useToast()

  const handleSave = async () => {
    try {
      await saveData()
      success('Saved!', 'Your changes have been saved successfully.')
    } catch (err) {
      error('Error', 'Failed to save changes. Please try again.')
    }
  }

  return (
    <button onClick={handleSave}>Save</button>
  )
}
```

### Keyboard Shortcuts

```tsx
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { useToast } from '@/hooks/useToast'

export function Editor() {
  const { info } = useToast()

  // Cmd/Ctrl + S to save
  useKeyboardShortcut(
    { key: 's', ctrl: true },
    () => {
      handleSave()
      info('Saved', 'Keyboard shortcut: Ctrl+S')
    }
  )

  // Escape to close modal
  useKeyboardShortcut(
    { key: 'Escape' },
    () => closeModal()
  )
}
```

## Performance Considerations

### GPU Acceleration

All animations use GPU-accelerated properties (transform, opacity) for 60fps performance:

✅ **Good (GPU accelerated):**
- `transform: translate()`, `scale()`, `rotate()`
- `opacity`

❌ **Avoid (causes layout reflow):**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

### Reduce Motion

Respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Lazy Loading

Heavy animated components should be lazy loaded:

```tsx
import dynamic from 'next/dynamic'

const HeavyAnimatedComponent = dynamic(
  () => import('./HeavyAnimatedComponent'),
  { ssr: false }
)
```

### Animation Budget

Guidelines for maintaining smooth performance:

- **Max 3-4** concurrent complex animations
- **Keep duration** under 400ms for UI feedback
- **Use stagger** carefully (delays add up)
- **Disable on low-end** devices if needed

### Testing Performance

```typescript
// Check frame rate
const measureFPS = () => {
  let frames = 0
  let lastTime = performance.now()

  const tick = () => {
    frames++
    const now = performance.now()
    if (now >= lastTime + 1000) {
      console.log(`FPS: ${frames}`)
      frames = 0
      lastTime = now
    }
    requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}
```

## Ripple Effect CSS

Add this to your global CSS for ripple animations:

```css
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
```

## Best Practices

1. **Be Consistent**: Use the same animations for similar actions across the app
2. **Be Purposeful**: Every animation should serve a purpose (feedback, guidance, delight)
3. **Be Subtle**: Micro-interactions should enhance, not distract
4. **Be Fast**: Keep animations snappy (200-400ms)
5. **Be Accessible**: Respect prefers-reduced-motion
6. **Be Performant**: Use GPU-accelerated properties
7. **Test on Mobile**: Ensure animations work smoothly on mobile devices

## Component Checklist

When creating new components, consider adding:

- [ ] Hover states (scale, lift, color change)
- [ ] Active/pressed states (scale down)
- [ ] Focus states (ring, scale)
- [ ] Loading states (spinner, skeleton)
- [ ] Error states (shake, color)
- [ ] Success states (checkmark, color)
- [ ] Enter animations (fade, slide)
- [ ] Exit animations (fade, scale)
- [ ] Keyboard support
- [ ] Ripple effect (for buttons/cards)
- [ ] Tooltip on hover
- [ ] Accessible labels

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Principles](https://material.io/design/motion/understanding-motion.html)
- [Easing Functions](https://easings.net/)
- [Performance Tips](https://web.dev/animations/)
