'use client'

import { TrendingUp, Clock, Target, FileCheck } from 'lucide-react'

interface AnalyticsData {
  issuesFixed: number
  timeSaved: string
  seoScoreImprovement: string
  pagesOptimized: number
  weeklyData: Array<{
    week: string
    issues: number
    fixes: number
  }>
  issueBreakdown: Array<{
    type: string
    count: number
    percentage: number
  }>
}

interface AnalyticsClientProps {
  data: AnalyticsData
}

export function AnalyticsClient({ data }: AnalyticsClientProps) {
  return (
    <div className="container-default w-container">
      {/* Header */}
      <div className="gap-row-24px">
        <h1 className="text-500 bold color-neutral-800">
          Analytics
        </h1>
        <p className="text-200 color-neutral-600">
          Track your SEO performance and improvements
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid-2-columns gap-row-24px" style={{ marginTop: '48px' }}>
        <StatCard
          title="Issues Fixed"
          value={data.issuesFixed.toString()}
          icon={FileCheck}
        />
        <StatCard
          title="Time Saved"
          value={data.timeSaved}
          icon={Clock}
        />
        <StatCard
          title="SEO Score"
          value={data.seoScoreImprovement}
          icon={TrendingUp}
        />
        <StatCard
          title="Pages Optimized"
          value={data.pagesOptimized.toString()}
          icon={Target}
        />
      </div>

      {/* Charts Section */}
      <div className="card pd-32px---24px" style={{ marginTop: '48px' }}>
        <h2 className="text-300 bold color-neutral-800" style={{ marginBottom: '24px' }}>
          Performance Overview
        </h2>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p className="text-200 color-neutral-600">Charts coming soon...</p>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="card pd-24px">
      {/* Title */}
      <div className="text-100 color-neutral-600" style={{ marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </div>

      {/* Value */}
      <div style={{ marginBottom: '16px' }}>
        <p className="text-500 bold color-neutral-800" style={{ fontSize: '48px', lineHeight: '1' }}>
          {value}
        </p>
      </div>

      {/* Icon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
        <Icon className="color-neutral-600" />
      </div>
    </div>
  )
}
