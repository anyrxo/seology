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

interface StatCardProps {
  title: string
  value: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  trend?: string
  trendUp?: boolean
}

export function AnalyticsClient({ data }: AnalyticsClientProps) {
  return (
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header */}
        <div className="rt-component-section">
          <div className="flex-horizontal gap-column-16px align-center">
            <div className="card-icon-square _40px">
              <TrendingUp className="w-5 h-5 color-accent-1" />
            </div>
            <div className="flex-vertical">
              <h1 className="display-2 color-neutral-800">
                Analytics
              </h1>
              <p className="text-200 color-neutral-600">
                Track your SEO performance and improvements
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid with card-amount-container */}
        <div className="grid-4-columns _1-column-tablet gap-row-24px gap-column-12px">
          <StatCard
            title="Issues Fixed"
            value={data.issuesFixed.toString()}
            icon={FileCheck}
            trend="+12%"
            trendUp={true}
          />
          <StatCard
            title="Time Saved"
            value={data.timeSaved}
            icon={Clock}
            trend="+24h"
            trendUp={true}
          />
          <StatCard
            title="SEO Score"
            value={data.seoScoreImprovement}
            icon={TrendingUp}
            trend="+8%"
            trendUp={true}
          />
          <StatCard
            title="Pages Optimized"
            value={data.pagesOptimized.toString()}
            icon={Target}
            trend="+15"
            trendUp={true}
          />
        </div>

        {/* Performance Overview Section */}
        <div className="card pd-32px---44px">
          <div className="flex-horizontal gap-column-16px align-center mg-bottom-32px">
            <div className="card-icon-square _40px neutral-icon">
              <div className="text-300">📊</div>
            </div>
            <h2 className="text-300 bold color-neutral-800">
              Performance Overview
            </h2>
          </div>
          <div className="flex-vertical gap-row-24px align-center text-center" style={{ padding: '80px 0' }}>
            <div className="card-icon-square _40px neutral-icon">
              <div className="text-600">📈</div>
            </div>
            <h3 className="text-300 bold color-neutral-800">Charts Coming Soon</h3>
            <p className="text-200 color-neutral-600" style={{ maxWidth: '400px', margin: '0 auto' }}>
              Advanced analytics and visualizations are being prepared for you
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="card pd-32px---44px">
      {/* Icon and Title */}
      <div className="flex-horizontal space-between align-center mg-bottom-24px">
        <div className="card-icon-square _40px neutral-icon">
          <Icon className="w-5 h-5 color-accent-1" />
        </div>
        {trend && (
          <div className={`badge ${trendUp ? 'green' : 'red'}`}>
            <div className="text-50 medium">{trend}</div>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="text-100 medium color-neutral-600 mg-bottom-12px">
        {title}
      </div>

      {/* Value */}
      <div className="card-amount-container">
        <div className="display-2 color-neutral-800">{value}</div>
      </div>
    </div>
  )
}
