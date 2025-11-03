import { SkeletonStats, SkeletonChart } from '@/components/ui/Skeleton'

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Stats Loading */}
      <SkeletonStats />

      {/* Charts Loading */}
      <div className="grid gap-6 md:grid-cols-2">
        <SkeletonChart />
        <SkeletonChart />
      </div>
    </div>
  )
}
