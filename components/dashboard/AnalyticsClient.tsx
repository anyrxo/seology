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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10">
          <TrendingUp className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Analytics
          </h1>
          <p className="text-gray-400">
            Track your SEO performance and improvements
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-[1.01] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10">
            <div className="text-2xl">📊</div>
          </div>
          <h2 className="text-xl font-bold text-white">
            Performance Overview
          </h2>
        </div>
        <div className="flex flex-col items-center text-center py-20">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 mb-6">
            <div className="text-4xl">📈</div>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Charts Coming Soon</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Advanced analytics and visualizations are being prepared for you
          </p>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Icon and Trend */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        {trend && (
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
            trendUp
              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {trend}
          </div>
        )}
      </div>

      {/* Title */}
      <div className="text-sm font-medium text-gray-400 mb-3">
        {title}
      </div>

      {/* Value */}
      <div className="text-3xl font-bold text-white">
        {value}
      </div>
    </div>
  )
}
