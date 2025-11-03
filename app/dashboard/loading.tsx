import { SkeletonStatsGrid, SkeletonCard } from '@/components/ui/skeleton-card'

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Stats Loading */}
      <SkeletonStatsGrid />

      {/* Charts Loading */}
      <div className="grid gap-6 md:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  )
}
