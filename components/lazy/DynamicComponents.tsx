/**
 * Dynamic Component Imports for Code Splitting
 *
 * Heavy components are loaded only when needed, reducing initial bundle size
 */

import dynamic from 'next/dynamic'

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  )
}

// Skeleton loader for better UX
function SkeletonLoader({ height = 'h-64' }: { height?: string }) {
  return (
    <div className={`${height} bg-gray-800 rounded-lg animate-pulse`}>
      <div className="h-full w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent animate-shimmer"></div>
      </div>
    </div>
  )
}

// Admin components (heavy, only for admin users)
export const AdminAnalyticsOverview = dynamic(
  () => import('@/components/admin/AnalyticsOverview'),
  {
    loading: () => <SkeletonLoader height="h-96" />,
    ssr: false, // Admin components don't need SSR
  }
)

export const AdminSidebar = dynamic(
  () => import('@/components/admin/AdminSidebar'),
  {
    loading: () => <LoadingFallback />,
  }
)

// Chart components (recharts is heavy) - using named exports
export const SimpleLineChart = dynamic(() => import('@/components/ui/Chart').then((mod) => ({ default: mod.SimpleLineChart })), {
  loading: () => <SkeletonLoader height="h-80" />,
  ssr: false, // Charts are client-side only
})

export const SimpleAreaChart = dynamic(() => import('@/components/ui/Chart').then((mod) => ({ default: mod.SimpleAreaChart })), {
  loading: () => <SkeletonLoader height="h-80" />,
  ssr: false,
})

export const SimpleBarChart = dynamic(() => import('@/components/ui/Chart').then((mod) => ({ default: mod.SimpleBarChart })), {
  loading: () => <SkeletonLoader height="h-80" />,
  ssr: false,
})

// Notification center (not needed immediately) - using default export
export const NotificationCenter = dynamic(
  () => import('@/components/notifications/NotificationCenter'),
  {
    loading: () => <LoadingFallback />,
    ssr: false,
  }
)

// Modal/Dialog components (loaded on demand) - using default exports
export const Modal = dynamic(() => import('@/components/ui/Modal'), {
  loading: () => <LoadingFallback />,
  ssr: false,
})

export const ConfirmDialog = dynamic(() => import('@/components/ui/ConfirmDialog'), {
  loading: () => <LoadingFallback />,
  ssr: false,
})

// Onboarding wizard steps (loaded progressively)
export const WelcomeStep = dynamic(
  () => import('@/components/onboarding/WelcomeStep').then((mod) => ({ default: mod.WelcomeStep })),
  { loading: () => <LoadingFallback /> }
)

export const ConnectSiteStep = dynamic(
  () => import('@/components/onboarding/ConnectSiteStep').then((mod) => ({ default: mod.ConnectSiteStep })),
  { loading: () => <LoadingFallback /> }
)

export const ScanningStep = dynamic(
  () => import('@/components/onboarding/ScanningStep').then((mod) => ({ default: mod.ScanningStep })),
  { loading: () => <LoadingFallback /> }
)

export const ReviewIssuesStep = dynamic(
  () => import('@/components/onboarding/ReviewIssuesStep').then((mod) => ({ default: mod.ReviewIssuesStep })),
  { loading: () => <LoadingFallback /> }
)

export const ExecutionModeStep = dynamic(
  () => import('@/components/onboarding/ExecutionModeStep').then((mod) => ({ default: mod.ExecutionModeStep })),
  { loading: () => <LoadingFallback /> }
)

export const FirstFixStep = dynamic(
  () => import('@/components/onboarding/FirstFixStep').then((mod) => ({ default: mod.FirstFixStep })),
  { loading: () => <LoadingFallback /> }
)

export const CompleteStep = dynamic(
  () => import('@/components/onboarding/CompleteStep').then((mod) => ({ default: mod.CompleteStep })),
  { loading: () => <LoadingFallback /> }
)

// Marketing components (for landing page)
export const FeatureCard = dynamic(
  () => import('@/components/marketing/FeatureCard'),
  { loading: () => <SkeletonLoader height="h-48" /> }
)

export const TestimonialCard = dynamic(
  () => import('@/components/marketing/TestimonialCard'),
  { loading: () => <SkeletonLoader height="h-64" /> }
)

export const StatsSection = dynamic(
  () => import('@/components/marketing/StatsSection'),
  { loading: () => <SkeletonLoader height="h-80" /> }
)

export const CTASection = dynamic(
  () => import('@/components/marketing/CTASection'),
  { loading: () => <LoadingFallback /> }
)

// Export loading components for reuse
export { LoadingFallback, SkeletonLoader }
