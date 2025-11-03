# Animation Quick Reference Card

## 🚀 Quick Start

### Import Performance Utilities
```tsx
import {
  usePrefersReducedMotion,
  useHoverSupport,
  useVisibilityPause,
  getStaggerDelay,
  ANIMATION_DURATION,
} from '@/lib/animation-performance'
```

### Import Optimized Components
```tsx
import MagneticButton from '@/components/ui/MagneticButton'
import PerformantFeatureCard from '@/components/marketing/PerformantFeatureCard'
import OptimizedHeroParticles from '@/components/marketing/OptimizedHeroParticles'
```

## ⚡ Performance Rules

### DO ✅
```tsx
// 1. Animate transform and opacity only
animate={{ x: 100, opacity: 0.5, scale: 1.2 }}

// 2. Use viewport config
viewport={{ once: true, margin: '-50px' }}

// 3. Respect reduced motion
const prefersReducedMotion = usePrefersReducedMotion()
animate={prefersReducedMotion ? {} : complexAnimation}

// 4. Cap stagger delays
transition={{ delay: getStaggerDelay(index, 50) / 1000 }}

// 5. Dynamic will-change
style={{ willChange: isAnimating ? 'transform' : 'auto' }}
```

### DON'T ❌
```tsx
// 1. Don't animate layout properties
animate={{ width: '100%', height: '500px' }}

// 2. Don't use excessive stagger
transition={{ delay: index * 200 }} // Too slow!

// 3. Don't animate repeatedly
viewport={{ once: false }} // Bad performance

// 4. Don't keep will-change active
style={{ willChange: 'transform' }} // Always on
```

## 📦 Component Examples

### Magnetic Button
```tsx
<MagneticButton href="/signup" variant="primary">
  Get Started
</MagneticButton>
```

### Feature Card
```tsx
<PerformantFeatureCard
  icon={Zap}
  title="Fast Performance"
  description="Lightning fast animations"
  delay={0.1}
/>
```

### Hero Particles
```tsx
<OptimizedHeroParticles />
```

## ⏱️ Timing Standards
- INSTANT: 100ms (Button press)
- FAST: 200ms (Hover effects)
- NORMAL: 300ms (Modals, dropdowns)
- MEDIUM: 500ms (Section reveals)
- SLOW: 800ms (Hero entrances)
- MAX: 1000ms (Never exceed)

## 📚 Full Documentation
- Complete Guide: ANIMATION_PERFORMANCE.md
- Fixes Summary: PERFORMANCE_FIXES_SUMMARY.md
- Utilities: lib/animation-performance.ts
