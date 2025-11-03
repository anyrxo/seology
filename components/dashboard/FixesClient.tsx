'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, RotateCcw, Settings } from 'lucide-react'

interface Fix {
  id: string
  type: string
  description: string
  status: string
  appliedAt: Date | null
  rollbackDeadline: Date | null
  connection: {
    id: string
    domain: string
  }
}

interface Stats {
  totalFixes: number
  pendingFixes: number
  appliedThisMonth: number
  availableRollbacks: number
}

interface FixesClientProps {
  fixes: Fix[]
  stats: Stats
  executionMode: string
}

export function FixesClient({ fixes, stats, executionMode }: FixesClientProps) {
  const executionModeConfig = {
    AUTOMATIC: {
      label: 'Automatic',
      description: 'Fixes are applied automatically without approval. All changes include 90-day rollback.',
      color: 'from-emerald-500 to-green-500'
    },
    PLAN: {
      label: 'Plan Mode',
      description: 'Claude AI creates a plan of all fixes. You approve once, and all fixes execute together.',
      color: 'from-blue-500 to-cyan-500'
    },
    APPROVE: {
      label: 'Approve Mode',
      description: 'Each fix requires individual approval before application. Maximum control.',
      color: 'from-purple-500 to-pink-500'
    },
  }[executionMode] || {
    label: executionMode,
    description: '',
    color: 'from-gray-500 to-gray-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
          SEO Fixes
        </h1>
        <p className="text-base sm:text-lg text-white/70">
          Review, approve, and rollback automated SEO fixes
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <StatCard title="Total Fixes" value={stats.totalFixes} icon="✓" gradient="from-blue-500 to-cyan-500" />
        <StatCard title="Pending Approval" value={stats.pendingFixes} icon="⏳" gradient="from-yellow-500 to-amber-500" />
        <StatCard title="Applied This Month" value={stats.appliedThisMonth} icon="📊" gradient="from-emerald-500 to-green-500" />
        <StatCard title="Available Rollbacks" value={stats.availableRollbacks} icon="↩️" gradient="from-purple-500 to-pink-500" />
      </motion.div>

      {/* Execution Mode Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8"
      >
        <div className="flex items-start space-x-6">
          <div className={`w-16 h-16 bg-gradient-to-r ${executionModeConfig.color} rounded-2xl flex items-center justify-center text-3xl`}>
            <Settings className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white text-xl font-semibold mb-2">
              Execution Mode: <span className="text-blue-300">{executionModeConfig.label}</span>
            </h3>
            <p className="text-white/70 mb-4">
              {executionModeConfig.description}
            </p>
            <Link
              href="/dashboard/settings"
              className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors inline-flex items-center gap-1"
            >
              Change Execution Mode →
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Fixes Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden"
      >
        <div className="p-8 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Recent Fixes</h2>
        </div>

        {fixes.length === 0 ? (
          <div className="p-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="text-7xl mb-6"
            >
              ✨
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              No fixes applied yet
            </h3>
            <p className="text-white/60 text-lg mb-8">
              Once issues are detected, fixes will appear here for review or auto-application
            </p>
            <Link
              href="/dashboard/issues"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
            >
              View SEO Issues
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 text-white/70 text-sm">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold">Status</th>
                  <th className="text-left px-6 py-4 font-semibold">Fix Type</th>
                  <th className="text-left px-6 py-4 font-semibold">Description</th>
                  <th className="text-left px-6 py-4 font-semibold">Site</th>
                  <th className="text-left px-6 py-4 font-semibold">Applied</th>
                  <th className="text-left px-6 py-4 font-semibold">Rollback</th>
                  <th className="text-left px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fixes.map((fix, index) => (
                  <FixRow key={fix.id} fix={fix} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Rollback Safety Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8"
      >
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
          <RotateCcw className="h-6 w-6" />
          90-Day Rollback Protection
        </h3>
        <p className="text-white/70 mb-6">
          Every fix includes the original content state, allowing you to safely revert any changes within 90 days. After 90 days, rollback data is automatically cleaned up for compliance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Before/After State Stored', description: 'Complete content backup' },
            { label: 'One-Click Rollback', description: 'Instant reversion' },
            { label: 'Audit Trail', description: 'Full change history' },
            { label: 'Automatic Cleanup', description: '90-day retention' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-300 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm">{item.label}</p>
                <p className="text-white/50 text-xs">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function StatCard({ title, value, icon, gradient }: { title: string; value: number; icon: string; gradient: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 transition-all duration-300 hover:border-white/40"
    >
      <div className={`w-14 h-14 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
        {icon}
      </div>
      <p className="text-white/60 text-sm mb-2">{title}</p>
      <p className="text-4xl font-bold text-white">{value}</p>
    </motion.div>
  )
}

function FixRow({ fix, index }: { fix: Fix; index: number }) {
  const statusConfig = {
    PENDING: { bg: 'bg-yellow-400/20', text: 'text-yellow-300', border: 'border-yellow-400/30' },
    APPLIED: { bg: 'bg-emerald-400/20', text: 'text-emerald-300', border: 'border-emerald-400/30' },
    ROLLED_BACK: { bg: 'bg-gray-400/20', text: 'text-gray-300', border: 'border-gray-400/30' },
    FAILED: { bg: 'bg-red-400/20', text: 'text-red-300', border: 'border-red-400/30' },
  }[fix.status] || { bg: 'bg-gray-400/20', text: 'text-gray-300', border: 'border-gray-400/30' }

  const daysLeftForRollback = fix.rollbackDeadline
    ? Math.max(0, Math.ceil((new Date(fix.rollbackDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.05 }}
      className="border-t border-white/10 hover:bg-white/5 transition-colors"
    >
      <td className="px-6 py-4">
        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
          {fix.status}
        </span>
      </td>
      <td className="px-6 py-4 text-white font-medium">{fix.type.replace(/_/g, ' ')}</td>
      <td className="px-6 py-4 text-white/70 max-w-xs truncate">{fix.description}</td>
      <td className="px-6 py-4 text-white/70">{fix.connection.domain}</td>
      <td className="px-6 py-4 text-white/50 text-sm">
        {fix.appliedAt ? new Date(fix.appliedAt).toLocaleDateString() : 'Not applied'}
      </td>
      <td className="px-6 py-4 text-white/50 text-sm">
        {daysLeftForRollback !== null
          ? daysLeftForRollback > 0
            ? `${daysLeftForRollback} days left`
            : 'Expired'
          : 'N/A'}
      </td>
      <td className="px-6 py-4">
        {fix.status === 'APPLIED' && daysLeftForRollback && daysLeftForRollback > 0 ? (
          <button className="text-red-300 hover:text-red-200 text-sm font-medium transition-colors">
            Rollback
          </button>
        ) : fix.status === 'PENDING' ? (
          <button className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors">
            Approve
          </button>
        ) : (
          <span className="text-white/30 text-sm">-</span>
        )}
      </td>
    </motion.tr>
  )
}
