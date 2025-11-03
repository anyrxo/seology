'use client'

import { motion } from 'framer-motion'
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-12"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-none tracking-tight">
          Analytics
        </h1>
        <p className="text-xl sm:text-2xl text-white/80 font-light">
          Track your SEO performance and improvements
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        <StatCard
          title="Issues Fixed"
          value={data.issuesFixed.toString()}
          icon={FileCheck}
          delay={0}
        />
        <StatCard
          title="Time Saved"
          value={data.timeSaved}
          icon={Clock}
          delay={100}
        />
        <StatCard
          title="SEO Score"
          value={data.seoScoreImprovement}
          icon={TrendingUp}
          delay={200}
        />
        <StatCard
          title="Pages Optimized"
          value={data.pagesOptimized.toString()}
          icon={Target}
          delay={300}
        />
      </motion.div>

      {/* Charts Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 hover:bg-white/15 hover:border-white/30 transition-all duration-500"
      >
        <h2 className="text-3xl font-bold text-white mb-8">Performance Overview</h2>
        <div className="text-center py-20">
          <p className="text-white/60 text-xl">Charts coming soon...</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  delay: number
}

function StatCard({ title, value, icon: Icon, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full"
    >
      <div className="group relative h-full overflow-hidden rounded-3xl transition-all duration-500 bg-white/10 backdrop-blur-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_20px_80px_-20px_rgba(255,255,255,0.3)]">
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/5 group-hover:to-transparent transition-all duration-700 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-10">
          {/* Title */}
          <h3 className="text-xs font-bold text-white/70 mb-8 uppercase tracking-[0.2em] leading-none">
            {title}
          </h3>

          {/* Value */}
          <div className="mb-6">
            <motion.p
              className="text-7xl sm:text-8xl font-black text-white tabular-nums tracking-tighter leading-none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: (delay / 1000) + 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 100
              }}
            >
              {value}
            </motion.p>
          </div>

          {/* Icon */}
          <Icon className="h-8 w-8 text-white/40 group-hover:text-white/60 transition-colors" />
        </div>

        {/* Bottom shine line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}
