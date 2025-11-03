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
    <div className="bg-neutral-200 min-h-screen">
      <div className="container-default w-container">
        <div className="gap-row-24px">
          {/* Header */}
          <div className="rt-component-section gap-row-24px">
            <div className="flex-horizontal align-center gap-column-16px">
              <div className="card-icon-square _40px flex-horizontal">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h1 className="display-2 color-neutral-800">
                  Analytics
                </h1>
                <p className="text-200 medium color-neutral-600">
                  Track your SEO performance and improvements
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid with card-amount-container */}
          <div className="grid-2-columns gap-row-24px gap-column-24px" style={{ marginTop: '48px' }}>
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
          <div className="rt-component-section" style={{ marginTop: '48px' }}>
            <div className="card pd-32px---44px">
              <div className="flex-horizontal align-center gap-column-16px mg-bottom-32px">
                <div className="card-icon-square _40px neutral-icon flex-horizontal">
                  <span style={{ fontSize: '20px' }}>📊</span>
                </div>
                <h2 className="text-300 bold color-neutral-800">
                  Performance Overview
                </h2>
              </div>
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div className="empty-state" style={{ maxWidth: '400px', margin: '0 auto' }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>📈</div>
                  <h3 className="text-300 bold color-neutral-800 mg-bottom-12px">Charts Coming Soon</h3>
                  <p className="text-200 medium color-neutral-600">
                    Advanced analytics and visualizations are being prepared for you
                  </p>
                </div>
              </div>
            </div>
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
        <div className="card-icon-square _40px neutral-icon flex-horizontal">
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <div className={`card-amount-container ${trendUp ? 'green' : 'red'}`}>
            <span className="text-100 bold">{trend}</span>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="text-100 medium color-neutral-600 mg-bottom-12px" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </div>

      {/* Value */}
      <div className="text-600 bold color-neutral-800" style={{ fontSize: '48px', lineHeight: '1' }}>
        {value}
      </div>
    </div>
  )
}
