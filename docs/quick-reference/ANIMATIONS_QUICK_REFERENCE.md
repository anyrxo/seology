# Animations Quick Reference Card

## Import Statements

```tsx
// Animated Components
import { AnimatedButton } from '@/components/ui/animated-button'
import { AnimatedCard } from '@/components/ui/animated-card'
import { AnimatedInput } from '@/components/ui/animated-input'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { StaggerList } from '@/components/ui/stagger-list'
import { PageTransition } from '@/components/ui/page-transition'
import { ToastContainer } from '@/components/ui/toast-container'

// Hooks
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useRipple } from '@/hooks/useRipple'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { useToast } from '@/hooks/useToast'

// Animation Variants
import { fadeIn, fadeInUp, scaleIn, staggerContainer } from '@/lib/animations'
```

## Component Examples

### Button with Ripple
```tsx
<AnimatedButton
  variant="primary"
  size="default"
  withRipple={true}
  isLoading={false}
  onClick={handleClick}
>
  Click Me
</AnimatedButton>
```

### Card with Hover
```tsx
<AnimatedCard hover={true} hoverScale={false}>
  <div className="p-6">Content</div>
</AnimatedCard>
```

### Input with Animation
```tsx
<AnimatedInput
  label="Email"
  type="email"
  placeholder="you@example.com"
  error={errors.email}
  icon={<Mail />}
/>
```

### Scroll Reveal
```tsx
<ScrollReveal threshold={0.1} delay={0}>
  <div>Revealed on scroll</div>
</ScrollReveal>
```

### Stagger List
```tsx
<StaggerList staggerDelay={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerList>
```

### Page Transition
```tsx
<PageTransition>
  <div>Page content</div>
</PageTransition>
```

## Hook Examples

### Toast Notification
```tsx
const { success, error, warning, info } = useToast()

success('Saved!', 'Changes saved successfully')
error('Error!', 'Something went wrong')
warning('Warning!', 'Please check your input')
info('Info', 'Here is some information')
```

### Keyboard Shortcut
```tsx
useKeyboardShortcut(
  { key: 's', ctrl: true },
  () => handleSave(),
  { enabled: true }
)
```

### Scroll Reveal Hook
```tsx
const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

<div ref={ref} className={isVisible ? 'visible' : 'hidden'}>
  Content
</div>
```

### Ripple Effect
```tsx
const createRipple = useRipple({ duration: 600, color: 'rgba(255,255,255,0.3)' })

<button onClick={createRipple}>Click for ripple</button>
```

## Animation Variants (Framer Motion)

### Basic Usage
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
>
  Content
</motion.div>
```

### Available Variants
- `fadeIn` - Simple fade
- `fadeInUp` - Fade + slide up
- `fadeInDown` - Fade + slide down
- `fadeInLeft` - Fade + slide left
- `fadeInRight` - Fade + slide right
- `scaleIn` - Scale from 95%
- `scaleInBounce` - Scale with bounce
- `staggerContainer` - For parent
- `staggerItem` - For children
- `pageTransition` - Page changes
- `scrollReveal` - Scroll triggered

## Common Patterns

### Loading Button
```tsx
<AnimatedButton isLoading={loading}>
  {loading ? 'Loading...' : 'Submit'}
</AnimatedButton>
```

### Form with Validation
```tsx
<AnimatedInput
  label="Email"
  error={errors.email?.message}
  {...register('email')}
/>
```

### Success Toast
```tsx
const { success } = useToast()
await saveData()
success('Success!', 'Data saved')
```

### Card Grid with Hover
```tsx
<div className="grid grid-cols-3 gap-4">
  {items.map(item => (
    <AnimatedCard key={item.id} hover>
      <div className="p-4">{item.title}</div>
    </AnimatedCard>
  ))}
</div>
```

## CSS Classes

### Hover Effects
```css
.hover-lift {
  transition: transform 0.2s;
}
.hover-lift:hover {
  transform: translateY(-4px);
}
```

### Focus Effects
```css
.focus-ring:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

## Performance Tips

✅ DO:
- Use `transform` and `opacity`
- Keep animations under 400ms
- Respect `prefers-reduced-motion`
- Test on mobile devices
- Use `will-change` sparingly

❌ DON'T:
- Animate `width`, `height`, `top`, `left`
- Chain too many animations
- Ignore accessibility
- Over-animate everything

## Animation Timing

- **Instant**: 0ms - No animation
- **Fast**: 100-200ms - Micro-interactions
- **Normal**: 200-400ms - Standard transitions
- **Slow**: 400-600ms - Emphasis
- **Very Slow**: 600ms+ - Special effects

## Easing Functions

```tsx
transition={{ ease: [0.4, 0, 0.2, 1] }} // Ease out
transition={{ ease: [0.4, 0, 1, 1] }}    // Ease in
transition={{ ease: [0.34, 1.56, 0.64, 1] }} // Bounce
```

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Debugging

```tsx
// Log animation events
<motion.div
  onAnimationStart={() => console.log('Animation started')}
  onAnimationComplete={() => console.log('Animation complete')}
>
  Content
</motion.div>
```

## Common Issues

**Animation not working?**
1. Check if Framer Motion is installed
2. Verify component is wrapped in motion element
3. Check console for errors
4. Test reduced motion settings

**Performance issues?**
1. Use Chrome DevTools Performance tab
2. Check for layout reflows
3. Reduce number of concurrent animations
4. Use `will-change` CSS property

**Accessibility concerns?**
1. Add `prefers-reduced-motion` support
2. Ensure keyboard navigation works
3. Test with screen reader
4. Verify focus indicators visible

---

**Pro Tip**: Start with subtle animations and add more gradually. Less is often more!
