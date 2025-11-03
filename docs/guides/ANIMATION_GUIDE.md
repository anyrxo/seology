# Animation Guide

Comprehensive guide to animations, transitions, and motion design in SEOLOGY.AI.

## Table of Contents

- [Animation Philosophy](#animation-philosophy)
- [CSS Transitions](#css-transitions)
- [Tailwind Animations](#tailwind-animations)
- [Framer Motion Examples](#framer-motion-examples)
- [Animation Patterns](#animation-patterns)
- [Performance Best Practices](#performance-best-practices)
- [Accessibility Considerations](#accessibility-considerations)
- [Common Animations](#common-animations)

---

## Animation Philosophy

### Principles

1. **Purposeful**: Animations should have a clear purpose (feedback, guidance, delight)
2. **Subtle**: Don't distract from content - enhance the experience
3. **Fast**: Keep animations quick (150-300ms for most interactions)
4. **Consistent**: Use the same timing and easing throughout the app
5. **Accessible**: Respect `prefers-reduced-motion` preference

### When to Use Animations

DO use animations for:
- State transitions (loading → loaded)
- User feedback (button click, form submission)
- Attention direction (new notification)
- Spatial relationships (dialog opening)
- Progressive disclosure (accordion, dropdown)

DON'T use animations for:
- Every single interaction (animation fatigue)
- Long, complex sequences (>1 second)
- Essential content (never hide important info)
- Purely decorative purposes (consider performance)

---

## CSS Transitions

### Basic Transitions

Most UI interactions use simple CSS transitions for performance.

```css
/* Standard transition timing */
.element {
  transition: all 150ms ease-in-out;
}

/* Specific property transition */
.button {
  transition: background-color 200ms ease-out,
              transform 150ms ease-out;
}

/* Hover states */
.card {
  border-color: theme('colors.gray.800');
  transition: border-color 200ms ease-out;
}

.card:hover {
  border-color: theme('colors.blue.500');
}
```

### Tailwind Transition Classes

SEOLOGY.AI uses Tailwind's built-in transition utilities:

```tsx
// Basic transition
<div className="transition-colors duration-200 ease-out">

// Multiple properties
<div className="transition-all duration-300">

// Transform transitions
<div className="transition-transform duration-200 hover:scale-105">

// Opacity transitions
<div className="transition-opacity duration-150 hover:opacity-80">
```

### Common Transition Patterns

#### Button Hover

```tsx
<button className="
  bg-blue-600 text-white px-6 py-3 rounded-lg
  transition-all duration-200 ease-out
  hover:bg-blue-700 hover:shadow-lg
  active:scale-95
">
  Click Me
</button>
```

#### Card Hover

```tsx
<div className="
  border border-gray-800 rounded-lg p-6
  transition-all duration-200
  hover:border-blue-500 hover:shadow-xl
  cursor-pointer
">
  <h3 className="transition-colors duration-200 group-hover:text-blue-400">
    Card Title
  </h3>
</div>
```

#### Link Hover

```tsx
<a className="
  text-blue-500 underline-offset-4
  transition-all duration-150
  hover:text-blue-400 hover:underline
">
  Learn More →
</a>
```

#### Focus States

```tsx
<input className="
  border border-gray-700 rounded-lg px-3 py-2
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
" />
```

---

## Tailwind Animations

### Built-in Animations

Tailwind provides several keyframe animations:

#### Spin (Loading Spinners)

```tsx
<svg className="animate-spin h-8 w-8 text-blue-600">
  <circle /* ... */ />
</svg>
```

#### Pulse (Subtle attention)

```tsx
<div className="animate-pulse bg-gray-800 h-4 w-full rounded" />
```

#### Bounce (Notification badge)

```tsx
<div className="animate-bounce bg-red-500 h-3 w-3 rounded-full" />
```

#### Ping (Active indicator)

```tsx
<span className="relative flex h-3 w-3">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
</span>
```

### Custom Tailwind Animations

Add to `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'slide-down': 'slideDown 300ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
}
```

Usage:

```tsx
<div className="animate-fade-in">Fades in</div>
<div className="animate-slide-up">Slides up</div>
```

---

## Framer Motion Examples

For complex animations, SEOLOGY.AI uses Framer Motion.

### Installation

```bash
npm install framer-motion
```

### Basic Motion Components

#### Fade In

```tsx
import { motion } from 'framer-motion'

function FadeInComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      Content fades in
    </motion.div>
  )
}
```

#### Slide In from Bottom

```tsx
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  Slides up and fades in
</motion.div>
```

#### Scale In

```tsx
<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.2 }}
>
  Scales up
</motion.div>
```

### List Animations (Stagger Children)

```tsx
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
}

function SitesList({ sites }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 gap-4"
    >
      {sites.map(site => (
        <motion.div
          key={site.id}
          variants={item}
          className="bg-gray-900 rounded-lg p-6"
        >
          {site.name}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### Exit Animations

```tsx
import { motion, AnimatePresence } from 'framer-motion'

function NotificationList({ notifications }) {
  return (
    <AnimatePresence>
      {notifications.map(notification => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
        >
          {notification.message}
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
```

### Modal/Dialog Animation

```tsx
import { motion, AnimatePresence } from 'framer-motion'

function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 flex items-center justify-center"
          >
            <div className="bg-gray-900 rounded-lg p-6 max-w-lg">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

### Hover Animations

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="cursor-pointer"
>
  Hover to scale
</motion.div>
```

### Layout Animations

Automatically animates layout changes:

```tsx
<motion.div layout className="flex flex-col">
  {items.map(item => (
    <motion.div key={item.id} layout>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## Animation Patterns

### Page Transitions

```tsx
// app/layout.tsx or page wrapper
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

function PageTransition({ children }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### Loading States

#### Spinner

```tsx
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-8 w-8 text-blue-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
```

#### Skeleton Loader

```tsx
function SkeletonCard() {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-800 rounded w-3/4" />
        <div className="h-4 bg-gray-800 rounded w-1/2" />
        <div className="h-24 bg-gray-800 rounded" />
      </div>
    </div>
  )
}
```

#### Progress Bar Animation

```tsx
import { motion } from 'framer-motion'

function ProgressBar({ progress }) {
  return (
    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-blue-600"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  )
}
```

### Toast Notifications

```tsx
import { motion, AnimatePresence } from 'framer-motion'

function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-lg"
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
```

### Accordion/Collapsible

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-800 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex justify-between items-center"
      >
        <span>{title}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-800">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

### Dropdown Menu

```tsx
import { motion, AnimatePresence } from 'framer-motion'

function Dropdown({ trigger, items, isOpen, setIsOpen }) {
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 bg-gray-900 border border-gray-800 rounded-lg shadow-xl min-w-[200px]"
          >
            {items.map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                className="w-full text-left px-4 py-2 text-sm"
                onClick={() => {
                  item.onClick()
                  setIsOpen(false)
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

### Number Counter Animation

```tsx
import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

function AnimatedNumber({ value }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 })
  const display = useTransform(spring, (latest) => Math.round(latest))

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return <motion.span>{display}</motion.span>
}

// Usage
<div>
  <AnimatedNumber value={fixesCount} /> fixes applied
</div>
```

---

## Performance Best Practices

### 1. Animate Transform and Opacity Only

These properties are GPU-accelerated and don't trigger reflow:

```tsx
// GOOD - GPU accelerated
<motion.div
  animate={{
    transform: 'translateY(0)',
    opacity: 1
  }}
/>

// AVOID - triggers reflow
<motion.div
  animate={{
    height: 'auto',
    marginTop: 20
  }}
/>
```

### 2. Use CSS Transitions for Simple Animations

Don't reach for Framer Motion for everything:

```tsx
// For simple hover effects, use CSS
<button className="transition-colors hover:bg-blue-700">
  Click me
</button>

// Only use Motion for complex animations
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

### 3. Optimize AnimatePresence

```tsx
// Use mode="wait" to prevent multiple animations
<AnimatePresence mode="wait">
  {show && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>

// Use initial={false} to skip initial animation
<AnimatePresence initial={false}>
  {items.map(item => <motion.div key={item.id} />)}
</AnimatePresence>
```

### 4. Debounce Scroll Animations

```tsx
import { useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

function useScrollAnimation() {
  const { scrollY } = useScroll()
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let timeout
    const unsubscribe = scrollY.onChange(() => {
      setIsScrolling(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setIsScrolling(false), 150)
    })
    return unsubscribe
  }, [scrollY])

  return isScrolling
}
```

### 5. Reduce Motion for Accessibility

```tsx
const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

<motion.div
  animate={{ opacity: 1 }}
  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
/>
```

Or globally:

```tsx
// framer-motion.config.ts
import { MotionConfig } from 'framer-motion'

export function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
```

---

## Accessibility Considerations

### 1. Respect `prefers-reduced-motion`

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

### 2. Don't Hide Content with Animations

Never use `display: none` or `visibility: hidden` for important content:

```tsx
// BAD - content hidden from screen readers
<div className={isOpen ? 'block' : 'hidden'}>
  {content}
</div>

// GOOD - content accessible, visually hidden
<div className={isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}>
  {content}
</div>
```

### 3. Maintain Focus During Animations

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  onAnimationComplete={() => {
    // Restore focus if needed
    firstInputRef.current?.focus()
  }}
>
  <input ref={firstInputRef} />
</motion.div>
```

### 4. Provide Alternative Feedback

For users who disable animations, provide immediate visual feedback:

```tsx
<button
  className={cn(
    'bg-blue-600 text-white',
    isPending && 'opacity-50 cursor-wait' // immediate feedback
  )}
>
  {isPending ? 'Saving...' : 'Save'}
</button>
```

---

## Common Animations Reference

### Button Click Feedback

```tsx
<motion.button
  whileTap={{ scale: 0.95 }}
  className="bg-blue-600 px-6 py-3 rounded-lg"
>
  Click Me
</motion.button>
```

### Card Entrance

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="bg-gray-900 rounded-lg p-6"
>
  Card content
</motion.div>
```

### Badge Pulse (New Item)

```tsx
<div className="relative">
  <span className="animate-pulse absolute -top-1 -right-1 flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
  </span>
  <Bell className="h-6 w-6" />
</div>
```

### Smooth Height Transition

```tsx
<motion.div
  initial={false}
  animate={{ height: isExpanded ? 'auto' : 0 }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
  className="overflow-hidden"
>
  {content}
</motion.div>
```

### Slide-In Notification

```tsx
<motion.div
  initial={{ x: 400 }}
  animate={{ x: 0 }}
  exit={{ x: 400 }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  className="fixed top-4 right-4 bg-gray-900 p-4 rounded-lg"
>
  Notification content
</motion.div>
```

### Loading Dots

```tsx
<div className="flex items-center space-x-1">
  <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
  <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
  <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" />
</div>
```

---

## Animation Timing Reference

| Animation Type | Duration | Easing |
|---------------|----------|--------|
| Button hover | 150ms | ease-out |
| Link hover | 150ms | ease-out |
| Card hover | 200ms | ease-out |
| Dialog open | 200ms | ease-out |
| Toast appear | 300ms | ease-out |
| Page transition | 200ms | ease-out |
| Dropdown | 150ms | ease-out |
| Skeleton pulse | 2s | ease-in-out |
| Loading spinner | 1s | linear |

---

## Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Animations](https://tailwindcss.com/docs/animation)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [CSS Triggers (Performance)](https://csstriggers.com/)
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

