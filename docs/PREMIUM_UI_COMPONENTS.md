# Premium UI Components - SEOLOGY.AI Dashboard

This document outlines all premium UI components created for the SEOLOGY.AI dashboard, designed with Dashflow X aesthetics featuring glass-morphism, gradient effects, smooth animations, and hover interactions.

## Component Overview

All components follow these design principles:
- **Glass-morphism**: Backdrop blur effects with subtle transparency
- **Gradient Accents**: Multi-color gradients for visual depth
- **Smooth Animations**: Framer Motion for fluid transitions
- **Hover Effects**: Interactive glow, lift, and scale transformations
- **Dark Theme**: Optimized for dark backgrounds with proper contrast

---

## 1. Premium Button Component

**Location**: `c:\Users\manna\Downloads\iimagined.webflow (1)\components\ui\button.tsx`

### Features
- Gradient backgrounds with animated hover states
- Ripple effect on click
- Loading states with spinners
- Icon support (left/right)
- Multiple variants and sizes

### Variants
```typescript
variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'link'
size: 'sm' | 'default' | 'md' | 'lg' | 'xl' | 'icon'
```

### Usage Example
```tsx
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

// Primary gradient button with icon
<Button variant="primary" size="lg" leftIcon={<Plus />}>
  Add New Site
</Button>

// Loading state
<Button isLoading variant="success">
  Applying Fixes...
</Button>

// Danger button with hover glow
<Button variant="danger" size="md">
  Delete Site
</Button>
```

### Design Specs
- **Primary**: Indigo → Purple → Pink gradient with reverse hover effect
- **Secondary**: Glass-morphism with white/10 background
- **Danger**: Red → Rose gradient with red glow shadow
- **Success**: Emerald → Green gradient with green glow shadow
- **Hover**: Scale down to 0.95, shadow-2xl with color glow
- **Duration**: 300ms transitions

---

## 2. Glass Card Component

**Location**: `c:\Users\manna\Downloads\iimagined.webflow (1)\components\ui\glass-card.tsx`

### Features
- Multiple glass-morphism intensity levels
- Configurable blur amounts
- Hover effects (lift, glow, scale)
- Animated entrance with Framer Motion
- Optional gradient borders
- Inner glow effects

### Variants
```typescript
variant: 'light' | 'medium' | 'heavy' | 'gradient' | 'glow'
blur: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
hover: 'none' | 'lift' | 'glow' | 'scale'
padding: 'none' | 'sm' | 'md' | 'lg' | 'xl'
```

### Usage Example
```tsx
import { GlassCard } from '@/components/ui/glass-card'

// Medium glass with lift effect
<GlassCard variant="medium" hover="lift" padding="lg">
  <h3>Card Title</h3>
  <p>Card content with glass-morphism background</p>
</GlassCard>

// Gradient variant with border gradient
<GlassCard variant="gradient" borderGradient animated>
  <div>Premium content</div>
</GlassCard>

// Heavy glass with glow hover
<GlassCard variant="heavy" hover="glow" blur="2xl">
  <div>Important information</div>
</GlassCard>
```

### Additional Components
- **GlassPanel**: Glass card with inner glow and shimmer effects
- **FloatingGlass**: Glass card with floating animation

### Design Specs
- **Light**: bg-white/5, border-white/10
- **Medium**: bg-white/10, border-white/20
- **Heavy**: bg-white/20, border-white/30
- **Backdrop Blur**: 16px (xl) default
- **Hover Lift**: -4px translateY with shadow-2xl

---

## 3. Stats Card Component

**Location**: `c:\Users\manna\Downloads\iimagined.webflow (1)\components\dashboard\StatsCard.tsx`

### Features
- Gradient icon backgrounds
- Trend indicators with animated arrows
- Large number displays
- Hover lift and glow effects
- Staggered entrance animations
- Glass-morphism styling

### Props
```typescript
interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    label: string
    positive?: boolean
  }
  className?: string
  delay?: number
  loading?: boolean
}
```

### Usage Example
```tsx
import { StatsCard, StatsGrid } from '@/components/dashboard/StatsCard'
import { Globe, AlertTriangle, CheckCircle, BarChart } from 'lucide-react'

<StatsGrid cols={4}>
  <StatsCard
    title="Sites Connected"
    value={12}
    icon={Globe}
    trend={{ value: 15, label: "vs last month", positive: true }}
    delay={0}
  />
  <StatsCard
    title="Issues Detected"
    value={43}
    icon={AlertTriangle}
    trend={{ value: -20, label: "vs last month", positive: true }}
    delay={100}
  />
  <StatsCard
    title="Fixes Applied"
    value={156}
    icon={CheckCircle}
    trend={{ value: 30, label: "this month", positive: true }}
    delay={200}
  />
  <StatsCard
    title="Usage"
    value="67%"
    icon={BarChart}
    delay={300}
  />
</StatsGrid>
```

### Design Specs
- **Icon Container**: Gradient from blue/20 to purple/20, rounded-xl
- **Trend Badge**: Pill-shaped with border, emerald for positive, red for negative
- **Hover**: -4px lift, border changes to white/20, gradient overlay fades in
- **Number Font**: 4xl font-bold with tabular-nums
- **Animation**: Staggered entrance with configurable delay

---

## 4. Badge Component

**Location**: `c:\Users\manna\Downloads\iimagined.webflow (1)\components\ui\badge.tsx`

### Features
- Gradient backgrounds
- Animated pulse dot
- Multiple color variants
- Size variations
- Dismissible option
- Glow effects on hover

### Variants
```typescript
variant: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'outline' | 'gradient'
size: 'sm' | 'md' | 'lg'
```

### Usage Example
```tsx
import { Badge } from '@/components/ui/badge'

// Success badge with pulse dot
<Badge variant="success" pulse dot>
  Connected
</Badge>

// Danger badge with glow
<Badge variant="danger" glow>
  Critical Issue
</Badge>

// Gradient badge (large)
<Badge variant="gradient" size="lg">
  Premium
</Badge>

// Dismissible info badge
<Badge variant="info" dismissible onDismiss={() => console.log('dismissed')}>
  New Feature
</Badge>
```

### Design Specs
- **Success**: Emerald → Green gradient, emerald-400 text
- **Danger**: Red → Rose gradient, red-400 text
- **Warning**: Amber → Yellow gradient, amber-400 text
- **Info**: Blue → Cyan gradient, blue-400 text
- **Gradient**: Indigo → Purple → Pink gradient, purple-300 text
- **Pulse Dot**: Animated ping effect with matching color
- **Hover**: Shadow-lg with color-matched glow

---

## 5. Loading Skeleton Component

**Location**: `c:\Users\manna\Downloads\iimagined.webflow (1)\components\ui\skeleton.tsx`

### Features
- Shimmer animation effect
- Multiple animation variants
- Glass-morphism styling
- Pre-built skeleton patterns
- Configurable shapes

### Variants
```typescript
variant: 'pulse' | 'shimmer' | 'wave'
```

### Usage Example
```tsx
import {
  Skeleton,
  SkeletonCard,
  SkeletonTable,
  SkeletonChart,
  SkeletonStats
} from '@/components/ui/skeleton'

// Basic skeleton with shimmer
<Skeleton className="h-8 w-48" variant="shimmer" />

// Card skeleton
<SkeletonCard />

// Stats grid skeleton
<SkeletonStats />

// Table skeleton
<SkeletonTable />

// Chart skeleton
<SkeletonChart />
```

### Pre-built Patterns
- **SkeletonCard**: Complete card layout with title, value, and lines
- **SkeletonTable**: Table header with 5 rows
- **SkeletonChart**: Chart container with title
- **SkeletonStats**: 4-column stats grid

### Design Specs
- **Base**: bg-white/5 with backdrop-blur-sm
- **Shimmer**: Gradient from transparent → white/10 → transparent
- **Animation**: 3s linear infinite shimmer
- **Wave**: Alternative 2s ease-in-out wave effect

---

## Color Palette (Dashflow X)

```css
/* Primary Colors */
--primary-gradient: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
--success-gradient: linear-gradient(135deg, #10b981, #059669);
--warning-gradient: linear-gradient(135deg, #f59e0b, #eab308);
--danger-gradient: linear-gradient(135deg, #ef4444, #f43f5e);
--info-gradient: linear-gradient(135deg, #3b82f6, #06b6d4);

/* Glass Backgrounds */
--glass-light: rgba(255, 255, 255, 0.05);
--glass-medium: rgba(255, 255, 255, 0.10);
--glass-heavy: rgba(255, 255, 255, 0.20);

/* Borders */
--border-light: rgba(255, 255, 255, 0.10);
--border-medium: rgba(255, 255, 255, 0.20);
--border-heavy: rgba(255, 255, 255, 0.30);

/* Shadows */
--shadow-glow: 0 0 30px rgba(255, 255, 255, 0.1);
--shadow-glow-blue: 0 0 40px rgba(59, 130, 246, 0.3);
--shadow-glow-purple: 0 0 40px rgba(168, 85, 247, 0.3);
--shadow-glow-pink: 0 0 40px rgba(236, 72, 153, 0.3);
```

---

## Animation Timing

All components use consistent animation timing:

```css
/* Duration */
--duration-fast: 200ms;
--duration-default: 300ms;
--duration-slow: 500ms;

/* Easing */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
```

---

## Best Practices

### 1. Component Composition
```tsx
// Combine glass cards with stats cards for dashboard sections
<GlassCard variant="medium" padding="lg" hover="lift">
  <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
  <StatsGrid cols={3}>
    <StatsCard {...statsProps1} />
    <StatsCard {...statsProps2} />
    <StatsCard {...statsProps3} />
  </StatsGrid>
</GlassCard>
```

### 2. Loading States
```tsx
// Show skeleton while data loads
{isLoading ? (
  <SkeletonStats />
) : (
  <StatsGrid cols={4}>
    {stats.map(stat => <StatsCard key={stat.id} {...stat} />)}
  </StatsGrid>
)}
```

### 3. Interactive Elements
```tsx
// Use appropriate hover effects for clickable cards
<GlassCard hover="lift" className="cursor-pointer">
  <Button variant="primary" size="lg">
    Take Action
  </Button>
</GlassCard>
```

### 4. Status Indicators
```tsx
// Combine badges with trend indicators
<div className="flex items-center gap-3">
  <Badge variant="success" pulse dot>Active</Badge>
  <span className="text-emerald-400 text-sm">+15% growth</span>
</div>
```

---

## Responsive Design

All components are fully responsive with mobile-first breakpoints:

```tsx
// Stats grid automatically adjusts columns
<StatsGrid cols={4}> // 1 col on mobile, 2 on tablet, 4 on desktop
  {...}
</StatsGrid>

// Glass cards maintain blur and effects across devices
<GlassCard blur="xl" padding="lg"> // Padding adjusts automatically
  {...}
</GlassCard>
```

---

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- **Focus States**: Visible focus rings with proper contrast
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **ARIA Labels**: Proper labeling for screen readers
- **Color Contrast**: Text meets 4.5:1 minimum contrast ratio
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference

---

## Component Files Summary

| Component | File Path | Key Features |
|-----------|-----------|--------------|
| Button | `components/ui/button.tsx` | Gradients, loading, icons, ripple |
| Glass Card | `components/ui/glass-card.tsx` | Glass-morphism, hover effects |
| Stats Card | `components/dashboard/StatsCard.tsx` | Metrics, trends, animations |
| Badge | `components/ui/badge.tsx` | Status indicators, pulse, dismiss |
| Skeleton | `components/ui/skeleton.tsx` | Loading states, shimmer |

---

## Integration Example

Complete dashboard section using all components:

```tsx
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { StatsCard, StatsGrid } from '@/components/dashboard/StatsCard'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus, Globe, TrendingUp } from 'lucide-react'

export function DashboardOverview({ isLoading, stats }) {
  if (isLoading) {
    return <Skeleton variant="shimmer" className="h-96 w-full" />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <Badge variant="success" pulse dot>All Systems Operational</Badge>
        </div>
        <Button variant="primary" size="lg" leftIcon={<Plus />}>
          Add Site
        </Button>
      </div>

      {/* Stats Grid */}
      <StatsGrid cols={4}>
        <StatsCard
          title="Total Sites"
          value={stats.sites}
          icon={Globe}
          trend={{ value: 15, label: "vs last month", positive: true }}
          delay={0}
        />
        <StatsCard
          title="Active Issues"
          value={stats.issues}
          icon={AlertTriangle}
          trend={{ value: -20, label: "resolved this week", positive: true }}
          delay={100}
        />
        <StatsCard
          title="Fixes Applied"
          value={stats.fixes}
          icon={CheckCircle}
          trend={{ value: 30, label: "this month", positive: true }}
          delay={200}
        />
        <StatsCard
          title="Performance"
          value={stats.performance + "%"}
          icon={TrendingUp}
          trend={{ value: 12, label: "improvement", positive: true }}
          delay={300}
        />
      </StatsGrid>

      {/* Content Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard variant="medium" hover="lift" padding="lg">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
          {/* Activity content */}
        </GlassCard>

        <GlassCard variant="gradient" hover="glow" padding="lg" borderGradient>
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          {/* Actions content */}
        </GlassCard>
      </div>
    </div>
  )
}
```

---

## Conclusion

These premium UI components provide a complete design system for the SEOLOGY.AI dashboard, featuring:

- Modern glass-morphism aesthetics
- Smooth, delightful animations
- Consistent design language
- Full accessibility support
- Responsive layouts
- Easy customization

All components are production-ready and optimized for performance with proper TypeScript types and comprehensive props interfaces.
