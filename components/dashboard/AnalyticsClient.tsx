'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Clock,
  Target,
  CheckCircle2,
  AlertCircle,
  Zap,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { AnimatedCounter } from './AnimatedCounter'

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

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4']

export function AnalyticsClient({ data }: { data: AnalyticsData }) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  return (
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-vertical gap-row-12px"
        >
          <div className="flex-horizontal gap-column-16px align-center">
            <div className="card-icon-square _40px">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-vertical">
              <h1 className="display-1 text-white">Analytics Dashboard</h1>
              <p className="text-200 text-gray-400">
                Track your SEO performance and automation impact
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          className="grid-4-columns _1-column-tablet gap-row-24px gap-column-12px"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          <MetricCard
            title="Issues Fixed"
            value={data.issuesFixed}
            icon={<CheckCircle2 className="w-5 h-5" />}
            gradient="from-green-500/20 to-emerald-500/20"
            color="green"
            subtitle="Total issues resolved"
          />

          <MetricCard
            title="Time Saved"
            value={data.timeSaved}
            icon={<Clock className="w-5 h-5" />}
            gradient="from-blue-500/20 to-cyan-500/20"
            color="blue"
            subtitle="Manual work automated"
          />

          <MetricCard
            title="SEO Score Boost"
            value={data.seoScoreImprovement}
            icon={<TrendingUp className="w-5 h-5" />}
            gradient="from-purple-500/20 to-pink-500/20"
            color="purple"
            subtitle="Average improvement"
          />

          <MetricCard
            title="Pages Optimized"
            value={data.pagesOptimized}
            icon={<Target className="w-5 h-5" />}
            gradient="from-orange-500/20 to-red-500/20"
            color="orange"
            subtitle="Unique pages enhanced"
          />
        </motion.div>

        {/* Charts Grid */}
        <div className="grid-2-columns _1-column-tablet gap-column-24px gap-row-24px">
          {/* Issues vs Fixes Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <div className="flex-horizontal space-between align-center mg-bottom-24px">
              <div className="flex-horizontal gap-column-12px align-center">
                <div className="card-icon-square _40px">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-300 bold text-white">Issues vs Fixes</h3>
                  <p className="text-50 text-gray-500">Last 4 weeks</p>
                </div>
              </div>
              <div className="flex-horizontal gap-column-8px">
                {(['7d', '30d', '90d'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 rounded-lg text-50 font-medium transition-all ${
                      timeRange === range
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {range === '7d' ? '7D' : range === '30d' ? '30D' : '90D'}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="week" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                />
                <Legend />
                <Bar dataKey="issues" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                <Bar dataKey="fixes" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Issue Type Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <div className="flex-horizontal gap-column-12px align-center mg-bottom-24px">
              <div className="card-icon-square _40px">
                <AlertCircle className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-300 bold text-white">Issue Breakdown</h3>
                <p className="text-50 text-gray-500">By type</p>
              </div>
            </div>
            {data.issueBreakdown.length > 0 ? (
              <div className="grid-2-columns gap-column-24px">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data.issueBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {data.issueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-vertical justify-center gap-row-12px">
                  {data.issueBreakdown.map((item, index) => (
                    <div key={item.type} className="flex-horizontal space-between align-center">
                      <div className="flex-horizontal gap-column-8px align-center">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-100 text-gray-300 capitalize">
                          {item.type.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="flex-horizontal gap-column-8px align-center">
                        <span className="text-100 medium text-white">{item.count}</span>
                        <span className="text-50 text-gray-500">({item.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-vertical align-center justify-center py-16 text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-200 text-gray-400">No issue data yet</p>
                <p className="text-100 text-gray-500">Connect sites to see analytics</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Performance Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card pd-32px---24px bg-gradient-to-br from-purple-500/10 via-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-purple-500/20 shadow-lg shadow-purple-500/5"
        >
          <div className="flex-horizontal gap-column-16px align-center mg-bottom-24px">
            <div className="card-icon-square _40px">
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-400 bold text-white">Automation Impact</h3>
              <p className="text-100 text-gray-400">
                See how SEOLOGY.AI has improved your workflow
              </p>
            </div>
          </div>
          <div className="grid-3-columns _1-column-mbl gap-row-24px gap-column-24px">
            <ImpactCard
              icon={<CheckCircle2 className="w-6 h-6 text-green-400" />}
              value={data.issuesFixed}
              label="Automated Fixes"
              description="Issues resolved without manual intervention"
              color="green"
            />
            <ImpactCard
              icon={<Clock className="w-6 h-6 text-blue-400" />}
              value={data.timeSaved}
              label="Time Saved"
              description="Hours saved from manual SEO work"
              color="blue"
            />
            <ImpactCard
              icon={<Target className="w-6 h-6 text-purple-400" />}
              value={`${data.pagesOptimized}`}
              label="Pages Enhanced"
              description="Unique pages with SEO improvements"
              color="purple"
            />
          </div>
        </motion.div>

        {/* Empty State */}
        {data.issuesFixed === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card pd-48px text-center bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <div className="card-icon-square _56px mx-auto mg-bottom-24px">
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-400 bold text-white mg-bottom-12px">
              No Analytics Data Yet
            </h2>
            <p className="text-200 text-gray-400 mg-bottom-32px max-w-2xl mx-auto">
              Connect your sites and run an analysis to start tracking your SEO performance
              and automation impact.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Metric Card Component
function MetricCard({
  title,
  value,
  icon,
  gradient,
  color,
  subtitle,
}: {
  title: string
  value: number | string
  icon: React.ReactNode
  gradient: string
  color: string
  subtitle?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`card pd-24px relative overflow-hidden bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <div className="flex-horizontal space-between align-center mg-bottom-16px relative z-10">
        <div className={`card-icon-square _40px text-${color}-400`}>{icon}</div>
      </div>
      <div className="flex-vertical gap-row-12px relative z-10">
        <div className="text-100 medium text-gray-400">{title}</div>
        <div className="display-2 text-white">
          {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
        </div>
        {subtitle && <p className="text-50 text-gray-500">{subtitle}</p>}
      </div>
    </motion.div>
  )
}

// Impact Card Component
function ImpactCard({
  icon,
  value,
  label,
  description,
  color,
}: {
  icon: React.ReactNode
  value: number | string
  label: string
  description: string
  color: string
}) {
  return (
    <div className="card pd-24px bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all duration-300 group">
      <div className="flex-vertical gap-row-12px">
        <div className={`card-icon-square _48px text-${color}-400`}>{icon}</div>
        <div className="display-3 text-white">
          {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
        </div>
        <div>
          <p className="text-200 medium text-white mg-bottom-4px">{label}</p>
          <p className="text-50 text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  )
}
