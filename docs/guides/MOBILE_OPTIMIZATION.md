# Mobile Optimization Guide for SEOLOGY.AI

This document outlines all the mobile-first optimizations and touch gesture features implemented in SEOLOGY.AI.

## Table of Contents

1. [Touch Gesture Hooks](#touch-gesture-hooks)
2. [Mobile Components](#mobile-components)
3. [Responsive Design](#responsive-design)
4. [Performance Optimizations](#performance-optimizations)
5. [Testing on Mobile Devices](#testing-on-mobile-devices)

---

## Touch Gesture Hooks

### Location: `lib/hooks/use-touch.ts`

Provides custom React hooks for touch interactions:

### `useSwipe()`

Detect swipe gestures in all directions.

```tsx
import { useSwipe } from '@/lib/hooks/use-touch'

function MyComponent() {
  const swipeHandlers = useSwipe({
    onSwipeLeft: () => console.log('Swiped left'),
    onSwipeRight: () => console.log('Swiped right'),
    onSwipeUp: () => console.log('Swiped up'),
    onSwipeDown: () => console.log('Swiped down'),
  }, 50) // threshold in pixels

  return (
    <div {...swipeHandlers}>
      Swipe me!
    </div>
  )
}
```

### `usePullToRefresh()`

Implement pull-to-refresh functionality.

```tsx
import { usePullToRefresh } from '@/lib/hooks/use-touch'

function MyComponent() {
  const refreshData = async () => {
    await fetch('/api/data')
  }

  const { pullDistance, isRefreshing, handleTouchStart, handleTouchMove, handleTouchEnd } =
    usePullToRefresh(refreshData, 80)

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Content */}
    </div>
  )
}
```

### `useHaptic()`

Trigger haptic feedback (vibration) on supported devices.

```tsx
import { useHaptic } from '@/lib/hooks/use-touch'

function MyButton() {
  const { lightTap, success, error } = useHaptic()

  return (
    <button onClick={() => {
      lightTap() // Quick vibration
      // OR: success(), error(), mediumTap(), heavyTap()
    }}>
      Tap me
    </button>
  )
}
```

---

## Mobile Components

### 1. BottomNav

**Location:** `components/mobile/BottomNav.tsx`

Mobile-only bottom navigation bar that appears on screens smaller than `md` (768px).

**Features:**
- Fixed bottom position with safe area padding
- Animated active indicator with layout animations
- Touch-friendly 44x44px minimum tap targets
- Active state highlighting

**Usage:**
Already integrated in `app/dashboard/layout.tsx`.

```tsx
import { BottomNav } from '@/components/mobile'

<BottomNav />
```

---

### 2. PullToRefresh

**Location:** `components/mobile/PullToRefresh.tsx`

Wrapper component that adds pull-to-refresh functionality.

**Features:**
- Visual pull indicator with rotation animation
- Customizable threshold
- Loading state with spinner
- Smooth spring animations

**Usage:**
```tsx
import { PullToRefresh } from '@/components/mobile'

<PullToRefresh
  onRefresh={async () => {
    await fetchData()
  }}
  threshold={80}
>
  <YourContent />
</PullToRefresh>
```

---

### 3. SwipeableNotification

**Location:** `components/mobile/SwipeableNotification.tsx`

Wrap notifications with swipe-to-dismiss functionality.

**Features:**
- Swipe left to delete
- Swipe right to mark as read (if unread)
- Visual feedback with trash icon
- Smooth drag animations with constraints

**Usage:**
Already integrated in `components/notifications/NotificationCenter.tsx`.

```tsx
import { SwipeableNotification } from '@/components/mobile'

<SwipeableNotification
  notification={notification}
  onDismiss={(id) => deleteNotification(id)}
  onMarkAsRead={(id) => markAsRead(id)}
>
  <NotificationContent />
</SwipeableNotification>
```

---

### 4. SlideInMenu

**Location:** `components/mobile/SlideInMenu.tsx`

Animated slide-in menu panel from left or right.

**Features:**
- Backdrop with blur effect
- Body scroll locking when open
- Spring animation
- Safe area padding
- Customizable side (left/right)

**Usage:**
```tsx
import { SlideInMenu } from '@/components/mobile'

const [isOpen, setIsOpen] = useState(false)

<SlideInMenu
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Menu"
  side="right"
>
  <MenuContent />
</SlideInMenu>
```

---

### 5. MobileInput

**Location:** `components/mobile/MobileInput.tsx`

Touch-optimized form input with proper keyboard types.

**Features:**
- Automatic `inputMode` based on type
- 16px font size to prevent iOS zoom
- Touch-friendly 44px minimum height
- Error and helper text support
- Proper autocomplete attributes

**Usage:**
```tsx
import { MobileInput } from '@/components/mobile'

<MobileInput
  type="email"
  label="Email Address"
  placeholder="your@email.com"
  error={errors.email}
  helperText="We'll never share your email"
/>
```

**Input Types & Keyboards:**
- `type="email"` → Email keyboard
- `type="tel"` → Phone number keyboard
- `type="url"` → URL keyboard
- `type="number"` → Numeric keyboard
- `type="search"` → Search keyboard

---

### 6. SwipeableTabs

**Location:** `components/mobile/SwipeableTabs.tsx`

Tab component with swipe gesture support.

**Features:**
- Swipe left/right to change tabs
- Animated tab indicator
- Pagination dots on mobile
- Touch-friendly tab headers

**Usage:**
```tsx
import { SwipeableTabs } from '@/components/mobile'

const tabs = [
  { id: 'tab1', label: 'Overview', content: <Overview /> },
  { id: 'tab2', label: 'Details', content: <Details /> },
  { id: 'tab3', label: 'Settings', content: <Settings /> },
]

<SwipeableTabs
  tabs={tabs}
  defaultTab="tab1"
  onChange={(tabId) => console.log('Active:', tabId)}
/>
```

---

### 7. ScrollSnapCarousel

**Location:** `components/mobile/ScrollSnapCarousel.tsx`

Horizontal carousel with scroll snap and pagination.

**Features:**
- CSS scroll snap for smooth scrolling
- Pagination dots
- Optional desktop controls
- Auto-scroll support
- Responsive widths (85vw on mobile, 400px on desktop)

**Usage:**
```tsx
import { ScrollSnapCarousel } from '@/components/mobile'

<ScrollSnapCarousel
  showControls={true}
  autoScroll={true}
  interval={5000}
>
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</ScrollSnapCarousel>
```

---

### 8. TouchButton

**Location:** `components/mobile/TouchButton.tsx`

Touch-optimized button with haptic feedback and animations.

**Features:**
- Haptic feedback on tap
- Scale animation (whileTap)
- Touch-friendly sizes
- Multiple variants and sizes
- Accessible focus states

**Usage:**
```tsx
import { TouchButton } from '@/components/mobile'

<TouchButton
  variant="primary"
  size="lg"
  fullWidth={true}
  haptic={true}
  onClick={() => handleSubmit()}
>
  Submit Form
</TouchButton>
```

**Variants:**
- `primary` - Blue background
- `secondary` - Gray background
- `outline` - Transparent with border
- `ghost` - Transparent, no border
- `danger` - Red background

**Sizes:**
- `sm` - 40px height
- `md` - 44px height (default, touch-friendly)
- `lg` - 52px height

---

## Responsive Design

### Breakpoints

Defined in `tailwind.config.ts`:

```typescript
screens: {
  'xs': '475px',    // Extra small devices
  'sm': '640px',    // Mobile devices
  'md': '768px',    // Tablets
  'lg': '1024px',   // Small laptops
  'xl': '1280px',   // Desktops
  '2xl': '1536px',  // Large desktops
}
```

### Touch Target Sizes

Minimum touch targets are 44x44px as per Apple's HIG and Material Design guidelines:

```css
.min-h-touch { min-height: 44px; }
.min-w-touch { min-width: 44px; }
```

Use the `btn-touch` utility class for buttons:

```tsx
<button className="btn-touch px-4 py-3">
  Touch-Friendly Button
</button>
```

### Safe Area Padding

For devices with notches (iPhone X and newer):

```css
.safe-top { padding-top: env(safe-area-inset-top); }
.safe-bottom { padding-bottom: max(env(safe-area-inset-bottom), 1rem); }
.safe-left { padding-left: env(safe-area-inset-left); }
.safe-right { padding-right: env(safe-area-inset-right); }
.safe-area-inset { /* All sides */ }
```

**Usage:**
```tsx
<nav className="fixed bottom-0 left-0 right-0 safe-bottom">
  Bottom Navigation
</nav>
```

### Mobile-First Approach

All styles use mobile-first approach:

```tsx
<div className="
  text-2xl        // Mobile
  md:text-3xl     // Tablet (768px+)
  lg:text-4xl     // Desktop (1024px+)
  xl:text-5xl     // Large desktop (1280px+)
">
```

---

## Performance Optimizations

### 1. Prevent iOS Zoom on Focus

All inputs use `text-base` (16px) to prevent auto-zoom:

```tsx
<input className="text-base" />
```

### 2. Scrollbar Hiding

For carousels and horizontal scrolling:

```css
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

### 3. Touch Action

Control touch behavior:

```css
.touch-pan-x { touch-action: pan-x; } /* Only horizontal scroll */
.touch-pan-y { touch-action: pan-y; } /* Only vertical scroll */
.touch-none { touch-action: none; }   /* No browser handling */
```

### 4. Tap Highlight Removal

Remove default tap highlights on all interactive elements:

```css
button, a, [role="button"] {
  -webkit-tap-highlight-color: transparent;
}
```

### 5. User Select Prevention

During touch interactions:

```css
.select-none-touch {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}
```

---

## Testing on Mobile Devices

### Desktop Testing

1. **Chrome DevTools:**
   - Press `F12`
   - Click device toolbar icon (or `Ctrl+Shift+M`)
   - Select device: iPhone 14 Pro, Pixel 7, etc.
   - Test touch events by clicking

2. **Firefox Responsive Design Mode:**
   - Press `Ctrl+Shift+M`
   - Select device preset
   - Enable touch simulation

### Real Device Testing

#### iOS Testing

1. **On Mac with iPhone:**
   ```bash
   # Start dev server
   npm run dev

   # Find your Mac's IP address
   ipconfig getifaddr en0

   # On iPhone, navigate to:
   http://YOUR_MAC_IP:3000
   ```

2. **Safari Web Inspector:**
   - Enable "Web Inspector" in iPhone Settings > Safari > Advanced
   - Connect iPhone to Mac via USB
   - Open Safari on Mac > Develop > [Your iPhone] > localhost

#### Android Testing

1. **Chrome Remote Debugging:**
   - Enable Developer Options on Android
   - Enable USB Debugging
   - Connect to computer via USB
   - Open `chrome://inspect` in desktop Chrome
   - Click "inspect" on your device

### Test Checklist

- [ ] Touch targets are minimum 44x44px
- [ ] Swipe gestures work smoothly
- [ ] Pull-to-refresh functions correctly
- [ ] Bottom nav doesn't overlap content
- [ ] Safe area padding works on notched devices
- [ ] No horizontal scroll on any page
- [ ] Forms show correct keyboards
- [ ] No zoom on input focus
- [ ] Animations are smooth (60fps)
- [ ] Haptic feedback works (if supported)
- [ ] All interactive elements are tappable
- [ ] Text is readable without zooming

---

## Browser Support

### Desktop
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Mobile
- ✅ iOS Safari 14+
- ✅ Chrome Mobile 90+
- ✅ Samsung Internet 14+
- ✅ Firefox Mobile 88+

### Feature Detection

Haptic feedback (vibration):
```typescript
if ('vibrate' in navigator) {
  navigator.vibrate(10)
}
```

Safe area support:
```css
@supports (padding: env(safe-area-inset-top)) {
  .safe-top {
    padding-top: env(safe-area-inset-top);
  }
}
```

---

## Best Practices

### 1. Always Use Touch-Friendly Sizes

```tsx
// ❌ Bad
<button className="p-1">Tiny</button>

// ✅ Good
<button className="min-h-touch px-6 py-3">Touch Friendly</button>
```

### 2. Prevent Accidental Taps

Add spacing between interactive elements:

```tsx
<div className="space-y-4"> {/* 16px gap */}
  <TouchButton>Button 1</TouchButton>
  <TouchButton>Button 2</TouchButton>
</div>
```

### 3. Provide Visual Feedback

```tsx
<motion.button
  whileTap={{ scale: 0.95 }}
  className="active:bg-gray-800"
>
  Interactive
</motion.button>
```

### 4. Use Proper Input Types

```tsx
// ✅ Shows email keyboard on mobile
<input type="email" inputMode="email" autoComplete="email" />

// ✅ Shows number keyboard
<input type="tel" inputMode="tel" autoComplete="tel" />
```

### 5. Test on Real Devices

Emulators are good, but always test on:
- At least one iOS device
- At least one Android device
- Different screen sizes

---

## Resources

- [Apple Human Interface Guidelines - Touch](https://developer.apple.com/design/human-interface-guidelines/inputs/touch-and-gestures)
- [Material Design - Touch Targets](https://m2.material.io/design/usability/accessibility.html#layout-and-typography)
- [Web.dev - Responsive Web Design](https://web.dev/responsive-web-design-basics/)
- [MDN - Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [CSS-Tricks - Safe Area Insets](https://css-tricks.com/the-notch-and-css/)

---

## Troubleshooting

### Swipe not working

1. Check if parent has `overflow: hidden`
2. Verify drag constraints are set correctly
3. Ensure element has proper `touch-action` CSS

### Pull-to-refresh conflicts with scroll

```tsx
// Ensure it only triggers at scroll position 0
if (window.scrollY === 0 && distance > 0) {
  setPullDistance(distance)
}
```

### Haptic feedback not working

- Only works on devices that support vibration
- Check browser permissions
- Won't work in cross-origin iframes

### Bottom nav covers content

Add bottom padding to main content:

```tsx
<main className="pb-16 md:pb-0">
  {children}
</main>
```

---

**Last Updated:** 2025-11-03
