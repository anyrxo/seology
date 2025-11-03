# Animation Quick Reference Card

## 🚀 Performance-Optimized Hooks

### Scroll Animations
```tsx
import { useScrollAnimation } from '@/hooks'

const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
  threshold: 0.3,        // Trigger at 30% visibility
  triggerOnce: true,     // Animate only once (better performance)
  enableWillChange: true // Add will-change hint
})

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 20 }}
  animate={isVisible ? { opacity: 1, y: 0 } : {}}
/>
```

### Visibility Detection
```tsx
import { useInView } from '@/hooks'

const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 })

<div ref={ref}>
  {inView ? 'Visible!' : 'Hidden'}
</div>
```

### Magnetic Hover
```tsx
import { useMagneticButton } from '@/hooks'

const { ref, x, y, onMouseMove, onMouseLeave } = useMagneticButton<HTMLButtonElement>()

<motion.button
  ref={ref}
  style={{ x, y }}
  onMouseMove={onMouseMove}
  onMouseLeave={onMouseLeave}
  whileHover={{ scale: 1.05 }}
>
  Click me
</motion.button>
```

### Parallax
```tsx
import { useParallax } from '@/hooks'

const { ref, y } = useParallax({ speed: 0.5, smooth: true })

<motion.div ref={ref} style={{ y }}>
  Background
</motion.div>
```

## 📦 Animation Variants

```tsx
import {
  fadeIn,
  slideInLeft,
  staggerChildren,
  defaultViewport
} from '@/lib/animation-utils'

// Fade In
<motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={defaultViewport}>
  Content
</motion.div>

// Stagger Children
<motion.div variants={staggerChildren} initial="hidden" whileInView="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={fadeIn}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## ✅ Do's and Don'ts

### ✅ DO:
- Use `transform` (translateX/Y, scale, rotate)
- Use `opacity`
- Use `useInView` or `useScrollAnimation` for scroll effects
- Add `transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}`
- Test on low-end devices (Chrome DevTools CPU throttling)

### ❌ DON'T:
- Animate `width`, `height`, `margin`, `padding`
- Animate `border-color`, `background-color`, `color`
- Animate `top`, `left`, `right`, `bottom`
- Use scroll event listeners (use Intersection Observer)
- Animate many elements simultaneously (use stagger)

## 🎨 Common Patterns

### Card Hover Effect
```tsx
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 150, damping: 15 }}
  className="bg-gray-900 rounded-lg p-6"
>
  Card content
</motion.div>
```

### Button Press
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Click me
</motion.button>
```

### Fade In on Scroll
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
>
  Content
</motion.div>
```

### Staggered List
```tsx
import { useStaggeredAnimation } from '@/hooks'

const animations = useStaggeredAnimation(items.length, {
  baseDelay: 100, // 100ms between each
  threshold: 0.2
})

{items.map((item, i) => (
  <motion.div
    key={item.id}
    ref={animations[i].ref as React.RefObject<HTMLDivElement>}
    initial={{ opacity: 0, x: -20 }}
    animate={animations[i].isVisible ? { opacity: 1, x: 0 } : {}}
    transition={{ delay: animations[i].delay / 1000 }}
  >
    {item.content}
  </motion.div>
))}
```

## 🔧 Easing & Timing

```tsx
import { springConfig } from '@/lib/animation-utils'

// Smooth easing (recommended)
transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}

// Snappy easing
transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}

// Spring physics
transition={springConfig}
// or
transition={{ type: 'spring', stiffness: 150, damping: 15 }}
```

## 🧪 Testing

```bash
# Check TypeScript
npx tsc --noEmit

# Run Lighthouse
npx lighthouse http://localhost:3000 --only-categories=performance --view

# Chrome DevTools
1. Open DevTools → Performance
2. Enable CPU throttling (4x slowdown)
3. Record while scrolling
4. Look for green 60fps bars
```

## 📚 Full Documentation

- **Complete guide**: `ANIMATION_PERFORMANCE.md`
- **Implementation summary**: `ANIMATION_IMPLEMENTATION_SUMMARY.md`
- **Examples**: `components/marketing/examples/AnimationExamples.tsx`
- **Hooks**: `hooks/` directory
- **Utilities**: `lib/animation-utils.ts`
