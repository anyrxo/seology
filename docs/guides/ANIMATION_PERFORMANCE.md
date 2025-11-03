# Animation Performance Guide

This document outlines the animation performance optimizations implemented across SEOLOGY.AI marketing pages.

## Overview

All animations are optimized to achieve **60fps** across devices, including low-end hardware. We follow these core principles:

### ✅ GPU-Accelerated Properties Only

**Use these properties** (GPU accelerated):
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (use sparingly)

**Avoid these properties** (triggers layout/paint):
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `border-width`
- `font-size`
- `background-position`

### 🎯 Performance Optimizations

1. **Intersection Observer** - All scroll animations use Intersection Observer instead of scroll event listeners
2. **will-change hints** - Applied strategically before animations, removed after
3. **Spring physics** - Smooth, natural motion with Framer Motion springs
4. **Lazy loading** - Heavy animations only load when elements enter viewport
5. **Reduced motion** - Respects user's `prefers-reduced-motion` setting

## Available Hooks

### Scroll Animations

#### `useScrollAnimation`
High-performance scroll-triggered animations with Intersection Observer.

```tsx
import { useScrollAnimation } from '@/hooks'

function Component() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    triggerOnce: true,
    enableWillChange: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
    >
      Content
    </motion.div>
  )
}
```

**Options:**
- `threshold` - Visibility threshold (0-1)
- `rootMargin` - Margin around viewport
- `triggerOnce` - Animate only once (better for performance)
- `delay` - Delay before animation starts
- `enableWillChange` - Add will-change CSS hint (use sparingly)

#### `useInView`
Optimized visibility detection for viewport animations.

```tsx
import { useInView } from '@/hooks'

function Component() {
  const { ref, inView } = useInView({ threshold: 0.5 })

  return (
    <div ref={ref}>
      {inView ? 'Visible!' : 'Not visible'}
    </div>
  )
}
```

#### `useStaggeredAnimation`
Staggered animations for lists with automatic delays.

```tsx
import { useStaggeredAnimation } from '@/hooks'

function List({ items }) {
  const animations = useStaggeredAnimation(items.length, {
    baseDelay: 100, // 100ms between each item
    threshold: 0.2
  })

  return (
    <>
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          ref={animations[i].ref}
          initial={{ opacity: 0, y: 20 }}
          animate={animations[i].isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: animations[i].delay / 1000 }}
        >
          {item.content}
        </motion.div>
      ))}
    </>
  )
}
```

### Hover Effects

#### `useMagneticHover`
Magnetic cursor-following effect using GPU-accelerated transforms.

```tsx
import { useMagneticHover } from '@/hooks'
import { motion } from 'framer-motion'

function MagneticButton() {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagneticHover({
    strength: 0.3,
    stiffness: 150,
    damping: 15
  })

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Hover me!
    </motion.button>
  )
}
```

**Pre-configured variants:**
- `useMagneticCard()` - Subtle effect for cards
- `useMagneticButton()` - Stronger effect for CTAs

### Parallax Effects

#### `useParallax`
Smooth parallax scrolling effect.

```tsx
import { useParallax } from '@/hooks'
import { motion } from 'framer-motion'

function ParallaxSection() {
  const { ref, y } = useParallax({
    speed: 0.5,  // Scroll speed multiplier
    smooth: true, // Spring smoothing
    range: [-100, 100]
  })

  return (
    <motion.div ref={ref} style={{ y }}>
      <img src="/background.jpg" alt="Background" />
    </motion.div>
  )
}
```

**Variants:**
- `useViewportParallax()` - Full viewport parallax
- `useHorizontalParallax()` - Horizontal movement
- `useScaleParallax()` - Scale on scroll
- `useOpacityParallax()` - Fade on scroll

## Animation Variants Library

Located in `lib/animation-utils.ts`, these variants ensure consistent, performant animations:

### Basic Animations

```tsx
import { fadeInUp, scaleIn, slideInLeft } from '@/lib/animation-utils'

<motion.div variants={fadeInUp} initial="initial" animate="animate">
  Fades in from bottom
</motion.div>
```

Available variants:
- `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- `scaleIn`, `scaleInBounce`
- `slideInUp`, `slideInDown`, `slideInLeft`, `slideInRight`
- `rotateIn`, `blurIn` (use sparingly)

### Stagger Animations

```tsx
import { staggerContainer, fadeInUp } from '@/lib/animation-utils'

<motion.div variants={staggerContainer} initial="initial" animate="animate">
  {items.map(item => (
    <motion.div key={item.id} variants={fadeInUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

Container variants:
- `staggerContainer` - Default 100ms stagger
- `staggerContainerFast` - 50ms stagger
- `staggerContainerSlow` - 150ms stagger

### Hover Effects

```tsx
import { hoverScale, hoverLift, cardHover } from '@/lib/animation-utils'

<motion.div variants={cardHover} initial="rest" whileHover="hover" whileTap="tap">
  Hover me!
</motion.div>
```

### Transitions

```tsx
import { transitions } from '@/lib/animation-utils'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={transitions.spring}
>
  Content
</motion.div>
```

Available transitions:
- `transitions.fast` - 200ms
- `transitions.default` - 400ms
- `transitions.slow` - 800ms
- `transitions.spring` - Spring physics
- `transitions.bouncy` - Bouncy spring
- `transitions.smoothSpring` - Smooth spring

## Best Practices

### 1. Use `whileInView` for Scroll Animations

```tsx
import { viewportConfig, fadeInUp } from '@/lib/animation-utils'

<motion.div
  variants={fadeInUp}
  initial="initial"
  whileInView="animate"
  viewport={viewportConfig} // Optimized config
>
  Content
</motion.div>
```

### 2. Trigger Animations Once

```tsx
// ✅ Good - animates once, better performance
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Content
</motion.div>

// ❌ Bad - re-animates every time, can cause jank
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: false }}
>
  Content
</motion.div>
```

### 3. Avoid Animating CSS Colors/Borders

```tsx
// ❌ Bad - animates border-color (not GPU accelerated)
<div className="border-gray-800 hover:border-blue-500 transition-colors">

// ✅ Good - use transform or shadow instead
<motion.div
  className="border-gray-800"
  whileHover={{ boxShadow: '0 0 0 2px rgb(59 130 246)' }}
>
```

Or use pseudo-elements:

```tsx
<div className="relative group">
  <div className="absolute inset-0 border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
  Content
</div>
```

### 4. Use Layout Animations for Complex Changes

```tsx
<motion.div layout layoutId="unique-id">
  {/* Framer Motion automatically animates layout changes */}
  {expanded ? <LargeContent /> : <SmallContent />}
</motion.div>
```

### 5. Batch Animations

```tsx
// ❌ Bad - separate animation states
const [isOpen, setIsOpen] = useState(false)
const [isHighlighted, setIsHighlighted] = useState(false)

// ✅ Good - single animation trigger
const [state, setState] = useState<'closed' | 'open' | 'highlighted'>('closed')
```

### 6. Lazy Load Heavy Animations

```tsx
import { lazy, Suspense } from 'react'

const HeavyAnimation = lazy(() => import('./HeavyAnimation'))

function Component() {
  const { ref, inView } = useInView()

  return (
    <div ref={ref}>
      {inView && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyAnimation />
        </Suspense>
      )}
    </div>
  )
}
```

## Testing Performance

### Chrome DevTools

1. Open DevTools → Performance tab
2. Start recording
3. Scroll through page
4. Stop recording
5. Look for:
   - **Green FPS bars** (60fps is good)
   - **Layout/Paint warnings** (minimize these)
   - **Long tasks** (>50ms)

### React DevTools Profiler

1. Install React DevTools extension
2. Open Profiler tab
3. Record interaction
4. Check for:
   - Unnecessary re-renders
   - Slow components (>16ms)

### Lighthouse

```bash
npx lighthouse http://localhost:3000 --only-categories=performance --view
```

Target scores:
- **Performance**: >90
- **First Contentful Paint**: <1.8s
- **Time to Interactive**: <3.8s
- **Cumulative Layout Shift**: <0.1

## Common Issues & Solutions

### Issue: Animations are janky on scroll

**Solution**: Use Intersection Observer instead of scroll listeners

```tsx
// ❌ Bad
useEffect(() => {
  const handleScroll = () => {
    // Animation logic
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

// ✅ Good
const { ref, inView } = useInView()
```

### Issue: Page layout shifts during animations

**Solution**: Reserve space with min-height or skeleton screens

```tsx
<div className="min-h-[400px]">
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    Content
  </motion.div>
</div>
```

### Issue: Animations cause high memory usage

**Solution**: Remove will-change after animation completes

```tsx
const { ref, isVisible } = useScrollAnimation({
  enableWillChange: true // Automatically removed after animation
})
```

### Issue: Text/images flash during animation

**Solution**: Use transform instead of position properties

```tsx
// ❌ Bad
<motion.div initial={{ top: 100 }} animate={{ top: 0 }}>

// ✅ Good
<motion.div initial={{ y: 100 }} animate={{ y: 0 }}>
```

## Browser Support

All animation hooks support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Fallbacks are provided for older browsers:
- Intersection Observer polyfill not needed (95%+ support)
- Animations gracefully degrade if motion is disabled
- Spring physics use CSS fallback if JavaScript is disabled

## Reduced Motion Support

All animations respect `prefers-reduced-motion`:

```tsx
import { prefersReducedMotion } from '@/lib/animation-utils'

function Component() {
  const shouldAnimate = !prefersReducedMotion()

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Content
    </motion.div>
  )
}
```

Or use the utility function:

```tsx
import { getMotionProps, fadeInUp } from '@/lib/animation-utils'

<motion.div {...getMotionProps(fadeInUp)}>
  Content
</motion.div>
```

## Performance Checklist

- [ ] All animations use `transform` or `opacity` only
- [ ] Scroll animations use Intersection Observer
- [ ] `whileInView` animations have `viewport={{ once: true }}`
- [ ] Heavy animations are lazy loaded
- [ ] `will-change` is removed after animations
- [ ] No layout-triggering properties are animated
- [ ] Stagger delays are reasonable (<200ms between items)
- [ ] Reduced motion preferences are respected
- [ ] Performance tested on low-end devices
- [ ] Lighthouse performance score >90

## Additional Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [web.dev: Animations Guide](https://web.dev/animations/)
- [Paul Lewis: FLIP Animation Technique](https://aerotwist.com/blog/flip-your-animations/)
- [High Performance Animations](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)
