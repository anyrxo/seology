# Dashflow X Button Components Library

Premium button components for SEOLOGY.AI dashboard with Dashflow X styling and animations.

## Components Created

### File: `components/ui/dashflow-button.tsx`

A comprehensive button library with 4 variants and complete accessibility support.

## Button Variants

### 1. Primary Button (`DashflowButtonPrimary`)
**Style:** Gradient background (blue to purple) with glow effect
**Use Case:** Primary actions (Submit, Save, Get Started, Continue)
**Features:**
- Gradient from `#3d7fff` to `#4b5dff`
- White text with shadow glow on hover
- Smooth scale animation (1.02x on hover)
- Ripple effect on click
- Loading spinner state

```tsx
<DashflowButtonPrimary
  size="lg"
  leftIcon={<Save className="h-4 w-4" />}
  isLoading={false}
  onClick={() => handleSave()}
>
  Save Changes
</DashflowButtonPrimary>
```

### 2. Secondary Button (`DashflowButtonSecondary`)
**Style:** Glass-morphism with backdrop blur
**Use Case:** Secondary actions (Cancel, Back, Settings)
**Features:**
- Translucent background with backdrop blur
- Gradient border
- Lift effect on hover (y: -2px)
- Smooth transitions

```tsx
<DashflowButtonSecondary
  size="md"
  leftIcon={<Settings className="h-4 w-4" />}
>
  Settings
</DashflowButtonSecondary>
```

### 3. Ghost Button (`DashflowButtonGhost`)
**Style:** Transparent with border
**Use Case:** Tertiary actions, less prominent options
**Features:**
- Transparent background
- Border with smooth fill on hover
- Text color transition
- Minimal visual weight

```tsx
<DashflowButtonGhost size="md">
  Learn More
</DashflowButtonGhost>
```

### 4. Icon Button (`DashflowButtonIcon`)
**Style:** Circular button with icon
**Use Case:** Toolbars, quick actions, minimal space
**Features:**
- Circular shape (11x11)
- Glow effect on hover
- Rotation animation (3deg on hover)
- Gradient background on hover

```tsx
<DashflowButtonIcon ariaLabel="Settings">
  <Settings className="h-5 w-5" />
</DashflowButtonIcon>
```

## Size Variants

All button variants (except icon) support these sizes:

- `sm`: height 36px (h-9), padding 12px, text xs
- `md`: height 40px (h-10), padding 16px, text sm (default)
- `lg`: height 48px (h-12), padding 24px, text base
- `xl`: height 56px (h-14), padding 32px, text lg
- `icon`: 44x44px circular (icon button only)

All sizes maintain minimum 44px tap target for accessibility.

## Props Interface

```typescript
interface DashflowButtonProps {
  // Visual variants
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon'

  // Content
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode

  // States
  isLoading?: boolean
  loadingText?: string  // Custom text during loading
  disabled?: boolean

  // Interaction
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  ripple?: boolean  // Enable/disable ripple effect (default: true)

  // Accessibility
  ariaLabel?: string

  // Standard button props
  type?: 'button' | 'submit' | 'reset'
  className?: string
}
```

## Features

### Animations (Framer Motion)
- **Scale animation:** Smooth scale on hover and tap
- **Spring physics:** Natural, bouncy feel (stiffness: 400, damping: 17)
- **Ripple effect:** Click feedback with expanding circle
- **Rotation:** Icon buttons rotate 3deg on hover
- **Lift effect:** Secondary buttons lift 2px on hover

### Loading States
```tsx
<DashflowButtonPrimary isLoading loadingText="Saving...">
  Save Changes
</DashflowButtonPrimary>
```

- Displays spinner (Loader2 from lucide-react)
- Hides icons during loading
- Custom loading text optional
- Disabled during loading

### Disabled States
```tsx
<DashflowButtonPrimary disabled>
  Disabled Button
</DashflowButtonPrimary>
```

- 50% opacity
- No hover effects
- Cursor: not-allowed
- Proper ARIA attributes

### Icons
```tsx
// Left icon
<DashflowButtonPrimary leftIcon={<Save className="h-4 w-4" />}>
  Save
</DashflowButtonPrimary>

// Right icon
<DashflowButtonPrimary rightIcon={<ArrowRight className="h-4 w-4" />}>
  Continue
</DashflowButtonPrimary>

// Both icons
<DashflowButtonPrimary
  leftIcon={<Download className="h-4 w-4" />}
  rightIcon={<ArrowRight className="h-4 w-4" />}
>
  Download Report
</DashflowButtonPrimary>
```

### Ripple Effect
Automatic ripple effect on click (can be disabled with `ripple={false}`):
- Expands from click position
- 600ms animation duration
- White with 30% opacity
- Automatically cleans up

## Accessibility Features

### ARIA Support
- `aria-label`: Custom label for screen readers
- `aria-busy`: Set during loading states
- `aria-disabled`: Proper disabled state
- Semantic button element

### Keyboard Navigation
- Full keyboard support (Enter, Space)
- Visible focus indicators
- Focus ring with proper offset
- Respects user preferences

### Touch Targets
- Minimum 44px tap targets (WCAG 2.1 Level AAA)
- Appropriate spacing between buttons
- Touch-friendly hit areas

## Usage Examples

### Form Actions
```tsx
<div className="flex gap-3">
  <DashflowButtonSecondary onClick={handleCancel}>
    Cancel
  </DashflowButtonSecondary>

  <DashflowButtonPrimary
    type="submit"
    leftIcon={<Save className="h-4 w-4" />}
    isLoading={isSaving}
    loadingText="Saving..."
  >
    Save Changes
  </DashflowButtonPrimary>
</div>
```

### Call to Action
```tsx
<DashflowButtonPrimary
  size="xl"
  rightIcon={<ArrowRight className="h-5 w-5" />}
  onClick={handleGetStarted}
>
  Get Started Free
</DashflowButtonPrimary>
```

### Toolbar Actions
```tsx
<div className="flex gap-2">
  <DashflowButtonIcon ariaLabel="Settings">
    <Settings className="h-5 w-5" />
  </DashflowButtonIcon>

  <DashflowButtonIcon ariaLabel="Download">
    <Download className="h-5 w-5" />
  </DashflowButtonIcon>

  <DashflowButtonIcon ariaLabel="Refresh">
    <RefreshCw className="h-5 w-5" />
  </DashflowButtonIcon>
</div>
```

### Unified API
```tsx
// All variants available through single component
<DashflowButton variant="primary" size="lg">
  Primary Button
</DashflowButton>

<DashflowButton variant="secondary">
  Secondary Button
</DashflowButton>

<DashflowButton variant="ghost">
  Ghost Button
</DashflowButton>

<DashflowButton variant="icon" ariaLabel="Settings">
  <Settings className="h-5 w-5" />
</DashflowButton>
```

## Styling

### Tailwind Classes
Uses Tailwind CSS with custom utilities:
- Gradient backgrounds
- Backdrop blur effects
- Custom shadows
- Smooth transitions

### Dark Mode
Full dark mode support built-in:
- Automatic color adjustments
- Proper contrast ratios
- Consistent styling across themes

### Custom Styling
Override with `className` prop:
```tsx
<DashflowButtonPrimary className="w-full">
  Full Width Button
</DashflowButtonPrimary>
```

## Demo

View all button variants and examples:
```tsx
import { DashflowButtonDemo } from '@/components/ui/dashflow-button-demo'

<DashflowButtonDemo />
```

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support with touch optimization

## Performance

- Optimized animations with `transform` and `opacity`
- Hardware acceleration via `transform: translate3d`
- Minimal repaints and reflows
- Framer Motion performance optimizations

## Dependencies

- `framer-motion`: ^12.23.24
- `lucide-react`: Latest (for icons)
- `class-variance-authority`: For variant management
- `@radix-ui/react-slot`: For composition

## Migration from Old Buttons

Replace existing button components:

**Before:**
```tsx
<Button variant="primary">Save</Button>
```

**After:**
```tsx
<DashflowButtonPrimary>Save</DashflowButtonPrimary>
// or
<DashflowButton variant="primary">Save</DashflowButton>
```

## Best Practices

1. **Use Primary sparingly:** Only one primary action per view
2. **Provide loading states:** Always show feedback for async actions
3. **Include ARIA labels:** Especially for icon buttons
4. **Size appropriately:** Match button size to importance
5. **Consistent spacing:** Use standard gap utilities (gap-2, gap-3, gap-4)

## Files Created

1. **`components/ui/dashflow-button.tsx`** - Main button library
2. **`components/ui/dashflow-button-demo.tsx`** - Interactive demo
3. **`DASHFLOW_BUTTON_README.md`** - This documentation

## Next Steps

Replace existing buttons throughout the dashboard:
- Dashboard page
- Settings pages
- Forms
- Modals
- Toolbars

All buttons now follow Dashflow X design system with premium animations and accessibility.
