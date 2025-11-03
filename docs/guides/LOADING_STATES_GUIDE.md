# Loading States & Optimistic UI Guide

Complete implementation guide for loading states and optimistic UI updates in SEOLOGY.AI.

## Table of Contents

1. [Overview](#overview)
2. [Components](#components)
3. [Hooks](#hooks)
4. [Utilities](#utilities)
5. [Usage Examples](#usage-examples)
6. [Best Practices](#best-practices)

## Overview

This implementation provides a comprehensive system for managing loading states and creating responsive, optimistic UI updates throughout the SEOLOGY.AI application.

### Key Features

- **Skeleton Screens**: Reduce perceived loading time with shimmer effects
- **Optimistic Updates**: Instant feedback for user actions
- **Progressive Loading**: Images load with blur-up effect
- **Real-time Polling**: Live updates for background jobs
- **Infinite Scroll**: Seamless pagination
- **Multi-step Forms**: Clear progress indication

## Components

### Skeleton Components

Located in `components/ui/`:

#### SkeletonCard
```tsx
import { SkeletonCard, SkeletonMetricCard, SkeletonStatsGrid } from '@/components/ui/skeleton-card'

// Basic card skeleton
<SkeletonCard showIcon iconPosition="left" lines={2} />

// Metric card skeleton
<SkeletonMetricCard />

// Stats grid skeleton
<SkeletonStatsGrid count={4} />
```

#### SkeletonTable
```tsx
import { SkeletonTable, SkeletonTableCard } from '@/components/ui/skeleton-table'

// Table skeleton
<SkeletonTable rows={5} columns={4} showHeader />

// Table with wrapper
<SkeletonTableCard />
```

#### SkeletonText
```tsx
import { SkeletonText, SkeletonHeading, SkeletonList } from '@/components/ui/skeleton-text'

// Text skeleton
<SkeletonText lines={3} lastLineWidth="60%" />

// Heading skeleton
<SkeletonHeading size="lg" />

// List skeleton
<SkeletonList items={5} />
```

### Spinner Components

Located in `components/ui/spinner.tsx`:

```tsx
import { Spinner, SpinnerDots, SpinnerPulse, SpinnerRing, SpinnerBars } from '@/components/ui/spinner'

// Default spinner
<Spinner size="md" variant="default" />

// Dots spinner
<SpinnerDots size="md" />

// Pulse spinner
<SpinnerPulse size="lg" />

// Ring spinner
<SpinnerRing size="sm" />

// Bars spinner
<SpinnerBars size="md" />
```

### Progressive Image

Located in `components/ui/progressive-image.tsx`:

```tsx
import { ProgressiveImage, ProgressiveBackgroundImage } from '@/components/ui/progressive-image'

// Progressive image
<ProgressiveImage
  src="/images/hero.jpg"
  alt="Hero"
  placeholderSrc="/images/hero-blur.jpg"
  width={1200}
  height={600}
  showSkeleton
/>

// Background image with children
<ProgressiveBackgroundImage
  src="/images/bg.jpg"
  alt="Background"
  placeholderSrc="/images/bg-blur.jpg"
>
  <div>Content here</div>
</ProgressiveBackgroundImage>
```

### Dashboard Loading States

Located in `components/dashboard/LoadingStates.tsx`:

Pre-built loading states for common dashboard views:

```tsx
import {
  DashboardStatsLoading,
  SitesTableLoading,
  ActivityFeedLoading,
  SiteDetailsLoading,
  AnalyticsLoading,
  BillingLoading,
  SettingsLoading
} from '@/components/dashboard/LoadingStates'

// Use with Suspense
<Suspense fallback={<DashboardStatsLoading />}>
  <DashboardStats />
</Suspense>
```

### Optimistic Fix Card

Located in `components/dashboard/OptimisticFixCard.tsx`:

```tsx
import { OptimisticFixCard } from '@/components/dashboard/OptimisticFixCard'

<OptimisticFixCard
  fix={fix}
  onApprove={async (fixId) => {
    await fetch(`/api/fixes/${fixId}/approve`, { method: 'POST' })
  }}
  onReject={async (fixId) => {
    await fetch(`/api/fixes/${fixId}/reject`, { method: 'POST' })
  }}
/>
```

### Job Status Tracker

Located in `components/dashboard/JobStatusTracker.tsx`:

```tsx
import { JobStatusTracker, MultiJobTracker } from '@/components/dashboard/JobStatusTracker'

// Single job
<JobStatusTracker
  jobId={jobId}
  onComplete={(job) => console.log('Job completed', job)}
  autoClose
  closeDelay={3000}
/>

// Multiple jobs
<MultiJobTracker jobIds={[jobId1, jobId2, jobId3]} />
```

### Connect Site Form

Located in `components/dashboard/ConnectSiteForm.tsx`:

Multi-step form with progress indicator:

```tsx
import { ConnectSiteForm } from '@/components/dashboard/ConnectSiteForm'

<ConnectSiteForm />
```

### Infinite Sites List

Located in `components/dashboard/InfiniteSitesList.tsx`:

```tsx
import { InfiniteSitesList } from '@/components/dashboard/InfiniteSitesList'

<InfiniteSitesList />
```

## Hooks

### useOptimisticUpdate

Located in `hooks/useOptimisticUpdate.ts`:

```tsx
import { useOptimisticUpdate, useOptimisticArray } from '@/hooks/useOptimisticUpdate'

// Basic usage
const { data, isPending, error, update } = useOptimisticUpdate(initialData, {
  onSuccess: (data) => console.log('Success', data),
  onError: (error) => console.error('Error', error),
  revalidate: true
})

// Update with optimistic value
await update(
  optimisticValue,
  async () => {
    const result = await fetch('/api/data', { method: 'POST' })
    return result.json()
  }
)

// Array operations
const { data, add, remove, update } = useOptimisticArray(initialArray)

await add(newItem, async (item) => {
  const result = await fetch('/api/items', {
    method: 'POST',
    body: JSON.stringify(item)
  })
  return result.json()
})

await remove(itemId, async (id) => {
  await fetch(`/api/items/${id}`, { method: 'DELETE' })
})

await update(itemId, updates, async (id, updates) => {
  const result = await fetch(`/api/items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates)
  })
  return result.json()
})
```

### useInfiniteScroll

Located in `hooks/useInfiniteScroll.ts`:

```tsx
import { useInfiniteScroll, useInfiniteScrollManual } from '@/hooks/useInfiniteScroll'

// Auto-loading with intersection observer
const {
  data,
  isLoading,
  isLoadingMore,
  error,
  hasMore,
  loadMore,
  reset,
  loadMoreRef
} = useInfiniteScroll('/api/items', {
  limit: 20,
  enabled: true,
  threshold: 0.8
})

// Render
<>
  {data.map(item => <ItemCard key={item.id} item={item} />)}
  {hasMore && <div ref={loadMoreRef} />}
</>

// Manual loading (with button)
const { data, loadMore, hasMore, isLoadingMore } = useInfiniteScrollManual('/api/items')

<Button onClick={loadMore} isLoading={isLoadingMore} disabled={!hasMore}>
  Load More
</Button>
```

### usePolling

Located in `hooks/usePolling.ts`:

```tsx
import { usePolling, useConditionalPolling } from '@/hooks/usePolling'

// Basic polling
const { data, isLoading, error, start, stop, reset } = usePolling(
  async () => {
    const response = await fetch('/api/status')
    return response.json()
  },
  {
    interval: 5000,
    enabled: true,
    stopOnError: false,
    maxAttempts: 10,
    onSuccess: (data) => console.log('Polled', data),
    onError: (error) => console.error('Error', error)
  }
)

// Stop when condition is met
const { data, shouldStop } = useConditionalPolling(
  fetchJobStatus,
  (job) => job.status === 'COMPLETED' || job.status === 'FAILED',
  { interval: 2000 }
)
```

## Utilities

### Loading Utilities

Located in `lib/loading.ts`:

```tsx
import {
  withLoading,
  withMinimumLoadingTime,
  useAsyncAction,
  MultiStepLoader,
  useDebouncedLoading,
  BatchLoader,
  ProgressEstimator
} from '@/lib/loading'

// Async function with loading state
await withLoading(
  async () => {
    const data = await fetchData()
    return data
  },
  setIsLoading
)

// Ensure minimum loading time (prevents flash)
const result = await withMinimumLoadingTime(
  async () => await fetchData(),
  500 // minimum 500ms
)

// Async action hook
const { execute, isLoading, error, data } = useAsyncAction()

await execute(async () => {
  const response = await fetch('/api/data')
  return response.json()
})

// Multi-step loader
const loader = new MultiStepLoader([
  { id: 'step1', label: 'Validating...' },
  { id: 'step2', label: 'Processing...' },
  { id: 'step3', label: 'Completing...' }
])

loader.start()
loader.updateStep(0, 50)
loader.nextStep()
loader.complete()

// Debounced loading (prevents rapid toggling)
const [showLoading, setLoading] = useDebouncedLoading(300)

setLoading(true) // Shows after 300ms
setLoading(false) // Hides immediately

// Batch loader (multiple operations)
const batchLoader = new BatchLoader()

batchLoader.add('operation1')
batchLoader.add('operation2')
console.log(batchLoader.isLoading()) // true
batchLoader.remove('operation1')

// Progress estimator
const estimator = new ProgressEstimator(5000, (progress) => {
  setProgress(progress)
})

estimator.start()
// ... do work ...
estimator.complete()
```

## Usage Examples

### Page with Loading States

```tsx
'use client'

import { Suspense } from 'react'
import { DashboardStatsLoading, SitesTableLoading } from '@/components/dashboard/LoadingStates'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Suspense fallback={<DashboardStatsLoading />}>
        <DashboardStats />
      </Suspense>

      <Suspense fallback={<SitesTableLoading />}>
        <SitesTable />
      </Suspense>
    </div>
  )
}
```

### Form with Progress

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { MultiStepLoader } from '@/lib/loading'

export function CreateProjectForm() {
  const [progress, setProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit() {
    setIsSubmitting(true)
    const loader = new MultiStepLoader([
      { id: '1', label: 'Creating project...' },
      { id: '2', label: 'Setting up database...' },
      { id: '3', label: 'Configuring settings...' }
    ])

    loader.subscribe((steps, current) => {
      setProgress(loader.getTotalProgress())
    })

    loader.start()

    try {
      await createProject()
      loader.nextStep()

      await setupDatabase()
      loader.nextStep()

      await configureSettings()
      loader.complete()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {isSubmitting && (
        <Progress value={progress} showLabel animated />
      )}
      <Button type="submit" isLoading={isSubmitting}>
        Create Project
      </Button>
    </form>
  )
}
```

### Optimistic List Updates

```tsx
'use client'

import { useOptimisticArray } from '@/hooks/useOptimisticUpdate'

export function TodoList({ initialTodos }) {
  const { data: todos, add, remove, update } = useOptimisticArray(initialTodos)

  async function addTodo(title: string) {
    await add(
      { id: '', title, completed: false },
      async (todo) => {
        const response = await fetch('/api/todos', {
          method: 'POST',
          body: JSON.stringify(todo)
        })
        return response.json()
      }
    )
  }

  async function toggleTodo(id: string, completed: boolean) {
    await update(
      id,
      { completed },
      async (id, updates) => {
        const response = await fetch(`/api/todos/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(updates)
        })
        return response.json()
      }
    )
  }

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id, !todo.completed)}
          />
          {todo.title}
        </div>
      ))}
    </div>
  )
}
```

## Best Practices

### 1. Use Appropriate Skeleton Screens

- Match skeleton layout to actual content
- Use shimmer effect for visual interest
- Show skeletons for perceived load time > 300ms

### 2. Implement Optimistic Updates Carefully

- Only for operations with high success rate
- Always implement rollback on error
- Show clear error messages when rollback occurs
- Provide undo option when appropriate

### 3. Progressive Enhancement

- Start with basic loading states
- Add optimistic updates for frequently used actions
- Use skeleton screens for initial page loads
- Implement infinite scroll for long lists

### 4. Performance Considerations

- Debounce loading states to prevent flashing (< 300ms)
- Use intersection observer for infinite scroll
- Implement pagination fallback for infinite scroll
- Cancel pending requests on unmount

### 5. Accessibility

- Use `aria-busy` attribute during loading
- Announce loading state changes to screen readers
- Maintain focus management during optimistic updates
- Ensure keyboard navigation works during loading

### 6. Error Handling

- Always show clear error messages
- Provide retry mechanisms
- Log errors for debugging
- Rollback optimistic updates on failure

### 7. Visual Feedback

- Use consistent loading indicators
- Show progress for long operations (> 3s)
- Use animation to indicate state changes
- Match loading animation duration to perceived wait time

## CSS Classes

Added to `app/globals.css`:

```css
/* Shimmer effect */
.shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Skeleton pulse */
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Scale animation */
@keyframes scale-in {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
```

## Testing Loading States

```tsx
// Force loading state in development
if (process.env.NODE_ENV === 'development') {
  await new Promise(resolve => setTimeout(resolve, 2000))
}

// Simulate slow network
if (typeof window !== 'undefined' && window.location.search.includes('slow')) {
  await new Promise(resolve => setTimeout(resolve, 3000))
}

// Simulate error
if (typeof window !== 'undefined' && window.location.search.includes('error')) {
  throw new Error('Simulated error')
}
```

## Summary

All loading states have been implemented with:

1. ✅ Skeleton screens for all major UI sections
2. ✅ Optimistic UI updates for mutations
3. ✅ Progressive image loading
4. ✅ Real-time polling for background jobs
5. ✅ Infinite scroll with loading indicators
6. ✅ Multi-step form progress
7. ✅ Comprehensive loading utilities
8. ✅ Custom hooks for common patterns
9. ✅ Proper TypeScript types
10. ✅ Accessibility considerations

The implementation provides instant feedback, reduces perceived wait times, and creates a polished, responsive user experience throughout SEOLOGY.AI.
