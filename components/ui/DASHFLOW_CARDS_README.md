# Dashflow Card Components

Premium glass-morphism card components for the SEOLOGY.AI dashboard, based on the Dashflow X Webflow template.

## Overview

This component library provides four main card variants with extensive customization options:

1. **GlassCard** - Base glass-morphism card with backdrop blur effects
2. **StatCard** - Metric cards with icons, values, and trend indicators
3. **ActionCard** - Interactive cards for user actions with hover effects
4. **InfoCard** - Content display cards with headers, body, and footers

## Installation

The components are already integrated into the project. Import them like this:

```tsx
import {
  GlassCard,
  StatCard,
  ActionCard,
  InfoCard,
  CardGrid,
  // Skeleton loaders
  GlassCardSkeleton,
  StatCardSkeleton,
  ActionCardSkeleton,
  InfoCardSkeleton
} from '@/components/ui/dashflow-card'
```

## 1. GlassCard

Base glass-morphism card with customizable blur, variants, and hover effects.

### Props

```typescript
interface GlassCardProps {
  variant?: 'light' | 'medium' | 'heavy' | 'gradient' | 'glow'
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  hover?: 'none' | 'lift' | 'glow' | 'scale'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  borderGradient?: boolean
  shimmer?: boolean
  innerGlow?: boolean
  className?: string
  children: React.ReactNode
}
```

### Usage

```tsx
// Basic usage
<GlassCard>
  <h3>Content goes here</h3>
</GlassCard>

// With all features
<GlassCard
  variant="medium"
  blur="xl"
  hover="lift"
  padding="lg"
  animated={true}
  borderGradient={true}
  shimmer={true}
  innerGlow={true}
>
  <h3 className="text-white">Premium Card</h3>
  <p className="text-gray-400">With all the bells and whistles</p>
</GlassCard>
```

### Variants

- **light**: Subtle background (5% opacity)
- **medium**: Standard background (10% opacity) - Default
- **heavy**: Solid background (20% opacity)
- **gradient**: Gradient background effect
- **glow**: Background with purple glow shadow

### Hover Effects

- **lift**: Moves up 4px on hover
- **glow**: Purple glow shadow on hover
- **scale**: Scales up 2% on hover
- **none**: No hover effect

## 2. StatCard

Metric display cards with icons, values, and trend indicators.

### Props

```typescript
interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    label?: string
    positive?: boolean
  }
  color?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'cyan'
  className?: string
  delay?: number
  loading?: boolean
  onClick?: () => void
}
```

### Usage

```tsx
import { TrendingUp } from 'lucide-react'

// Basic stat
<StatCard
  title="Total Sites"
  value="24"
  icon={TrendingUp}
  color="blue"
/>

// With trend indicator
<StatCard
  title="Active Users"
  value="1,234"
  icon={Users}
  color="purple"
  trend={{
    value: 12,
    label: 'vs last month',
    positive: true
  }}
  delay={100}
  onClick={() => console.log('Clicked')}
/>

// Loading state
<StatCard
  title="Loading"
  value="..."
  icon={Globe}
  loading={true}
/>
```

### Color Variants

Each color provides a consistent gradient background and hover effects:

- **blue**: Blue to cyan gradient
- **purple**: Purple to pink gradient
- **green**: Green to emerald gradient
- **red**: Red to rose gradient
- **orange**: Orange to amber gradient
- **cyan**: Cyan to sky gradient

### Trend Indicators

```tsx
// Positive trend (green with up arrow)
trend={{ value: 12, positive: true }}

// Negative trend (red with down arrow)
trend={{ value: 5, positive: false }}

// With label
trend={{ value: 12, label: 'vs last week', positive: true }}
```

## 3. ActionCard

Interactive cards for triggering user actions.

### Props

```typescript
interface ActionCardProps {
  title: string
  description?: string
  icon: LucideIcon
  onClick?: () => void
  disabled?: boolean
  className?: string
  badge?: string
  badgeVariant?: 'success' | 'warning' | 'danger' | 'info' | 'default'
  showArrow?: boolean
  loading?: boolean
}
```

### Usage

```tsx
import { Plus } from 'lucide-react'

// Basic action card
<ActionCard
  title="Connect New Site"
  description="Link your website to start SEO optimization"
  icon={Plus}
  onClick={() => handleConnect()}
/>

// With badge
<ActionCard
  title="Premium Feature"
  description="Upgrade to unlock this feature"
  icon={Zap}
  badge="Pro"
  badgeVariant="success"
  onClick={() => handleUpgrade()}
/>

// Disabled state
<ActionCard
  title="Coming Soon"
  description="This feature is under development"
  icon={Settings}
  disabled={true}
/>

// Loading state
<ActionCard
  title="Processing"
  description="Please wait..."
  icon={Loader}
  loading={true}
/>
```

### Features

- **Ripple Effect**: Click creates an animated ripple
- **Icon Rotation**: Icon rotates 15° on hover
- **Gradient Overlay**: Colorful gradient appears on hover
- **Arrow Indicator**: Optional right arrow (shown by default)

## 4. InfoCard

Content display cards with structured sections.

### Props

```typescript
interface InfoCardProps {
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  badge?: React.ReactNode
  icon?: LucideIcon
  variant?: 'default' | 'bordered' | 'elevated'
  collapsible?: boolean
  defaultExpanded?: boolean
  className?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
}
```

### Usage

```tsx
// Basic info card
<InfoCard
  title="Card Title"
  description="Card description"
>
  <p>Card body content goes here</p>
</InfoCard>

// With icon and badge
<InfoCard
  title="Recent Activity"
  description="Latest updates"
  icon={Bell}
  badge={<Badge variant="info">New</Badge>}
  variant="elevated"
>
  <div>Activity list...</div>
</InfoCard>

// With footer
<InfoCard
  title="Stats Overview"
  footer={
    <button>View Details →</button>
  }
>
  <p>Statistics content</p>
</InfoCard>

// Collapsible
<InfoCard
  title="Advanced Settings"
  collapsible={true}
  defaultExpanded={false}
>
  <div>Settings form...</div>
</InfoCard>
```

### Variants

- **default**: Basic glass card styling
- **bordered**: Enhanced border visibility
- **elevated**: Increased shadow for prominence

## 5. CardGrid

Responsive grid layout for cards.

### Props

```typescript
interface CardGridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4
  className?: string
}
```

### Usage

```tsx
// 4-column grid (default)
<CardGrid>
  <StatCard {...props1} />
  <StatCard {...props2} />
  <StatCard {...props3} />
  <StatCard {...props4} />
</CardGrid>

// 2-column grid
<CardGrid cols={2}>
  <ActionCard {...props1} />
  <ActionCard {...props2} />
</CardGrid>

// 3-column grid
<CardGrid cols={3}>
  <InfoCard {...props1} />
  <InfoCard {...props2} />
  <InfoCard {...props3} />
</CardGrid>
```

### Responsive Breakpoints

- **cols={4}**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- **cols={3}**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **cols={2}**: `grid-cols-1 md:grid-cols-2`
- **cols={1}**: `grid-cols-1`

## Loading States

All cards have skeleton loader variants for loading states:

```tsx
import {
  StatCardSkeleton,
  ActionCardSkeleton,
  InfoCardSkeleton,
  GlassCardSkeleton
} from '@/components/ui/dashflow-card'

// Show skeleton while loading
{loading ? (
  <StatCardSkeleton />
) : (
  <StatCard {...props} />
)}
```

## Styling & Customization

### Dark Mode

All cards are optimized for dark mode by default:

```css
/* Light backgrounds in dark mode */
bg-white/5 dark:bg-gray-900/30

/* Borders adjust automatically */
border-white/10 dark:border-gray-700/30
```

### Custom Padding

Cards use responsive padding by default:

```tsx
// Mobile: p-4, Desktop: p-6
<GlassCard padding="md">

// Mobile: p-6, Desktop: p-8
<GlassCard padding="lg">
```

### Custom Animations

All cards use Framer Motion. Customize delays for staggered animations:

```tsx
<StatCard delay={0} {...props1} />
<StatCard delay={100} {...props2} />
<StatCard delay={200} {...props3} />
<StatCard delay={300} {...props4} />
```

## Best Practices

### 1. Use Appropriate Card Types

- **StatCard**: Metrics, KPIs, numbers
- **ActionCard**: Buttons, CTAs, navigation
- **InfoCard**: Complex content, lists, forms
- **GlassCard**: Custom layouts, special cases

### 2. Color Coding

Use consistent colors for card categories:

```tsx
// Traffic metrics = Blue
<StatCard color="blue" />

// User metrics = Purple
<StatCard color="purple" />

// Success/fixes = Green
<StatCard color="green" />

// Issues/errors = Red
<StatCard color="red" />

// Warnings = Orange
<StatCard color="orange" />
```

### 3. Accessibility

Cards include proper ARIA attributes and keyboard navigation:

```tsx
// Clickable cards are keyboard accessible
<ActionCard
  onClick={handleClick}
  // Automatically gets role="button" and keyboard handlers
/>

// Screen reader support
<InfoCard
  title="Clear descriptive title"
  description="Helpful description"
/>
```

### 4. Performance

- Use `loading` prop for async data
- Implement skeletons during fetch
- Set `animated={false}` for better performance on low-end devices

```tsx
const { data, loading } = useQuery()

return loading ? (
  <StatCardSkeleton />
) : (
  <StatCard {...data} />
)
```

## Real-World Examples

### Dashboard Stats Row

```tsx
<CardGrid cols={4}>
  <StatCard
    title="Total Sites"
    value={sites.length}
    icon={Globe}
    color="blue"
    trend={{ value: 12, positive: true }}
  />
  <StatCard
    title="Fixes Applied"
    value={fixesCount}
    icon={Zap}
    color="green"
    trend={{ value: 24, positive: true }}
  />
  <StatCard
    title="Active Issues"
    value={issuesCount}
    icon={AlertCircle}
    color="orange"
    trend={{ value: 5, positive: false }}
  />
  <StatCard
    title="Success Rate"
    value={`${successRate}%`}
    icon={TrendingUp}
    color="purple"
    trend={{ value: 2, positive: true }}
  />
</CardGrid>
```

### Quick Actions

```tsx
<CardGrid cols={3}>
  <ActionCard
    title="Scan Site"
    description="Run immediate SEO analysis"
    icon={Search}
    onClick={handleScan}
    badge="Quick"
    badgeVariant="info"
  />
  <ActionCard
    title="Apply Fixes"
    description="Execute pending SEO fixes"
    icon={Zap}
    onClick={handleApplyFixes}
    disabled={!hasPendingFixes}
  />
  <ActionCard
    title="View Reports"
    description="Check detailed analytics"
    icon={FileText}
    onClick={handleViewReports}
  />
</CardGrid>
```

### Activity Feed

```tsx
<InfoCard
  title="Recent Activity"
  description="Latest SEO fixes and updates"
  icon={Bell}
  badge={<Badge variant="success" dot pulse>Live</Badge>}
  variant="elevated"
  footer={
    <button className="text-blue-400 hover:text-blue-300">
      View All Activity →
    </button>
  }
>
  {activities.map(activity => (
    <ActivityItem key={activity.id} {...activity} />
  ))}
</InfoCard>
```

## Animation Details

### Entry Animations

All cards fade in and slide up by default:

```typescript
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.5, ease: 'easeOut' }
```

### Hover Animations

- **Lift**: `translateY(-4px)` with shadow increase
- **Glow**: Purple shadow `shadow-[0_0_30px_rgba(139,92,246,0.4)]`
- **Scale**: `scale(1.02)`

### Gradient Animations

- Border gradient fades in over 500ms
- Shimmer sweeps across over 1000ms
- Inner glow fades in over 500ms

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (includes -webkit prefixes)
- Mobile: Optimized for touch interactions

## Troubleshooting

### Cards not showing glass effect

Ensure parent has a background:

```tsx
<div className="bg-gradient-to-br from-gray-900 to-gray-800">
  <GlassCard>Content</GlassCard>
</div>
```

### Animations not working

Check that Framer Motion is installed:

```bash
npm install framer-motion
```

### TypeScript errors

Import types correctly:

```tsx
import { LucideIcon } from 'lucide-react'
import type { StatCardProps } from '@/components/ui/dashflow-card'
```

## Credits

Design inspired by Dashflow X Webflow template by Anyros.
Implemented with React, TypeScript, Tailwind CSS, and Framer Motion.
