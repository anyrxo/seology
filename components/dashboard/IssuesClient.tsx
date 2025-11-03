'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowUpRight, CheckCircle2, Search } from 'lucide-react'

interface Issue {
  id: string
  type: string
  title: string
  severity: string
  pageUrl: string
  detectedAt: Date
  connection: {
    id: string
    domain: string
  }
  fixes: Array<{
    id: string
    status: string
  }>
}

interface Stats {
  totalIssues: number
  criticalIssues: number
  highIssues: number
  mediumIssues: number
}

interface IssuesByType {
  type: string
  _count: { type: number }
}

interface IssuesClientProps {
  issues: Issue[]
  stats: Stats
  issuesByType: IssuesByType[]
}

export function IssuesClient({ issues, stats, issuesByType }: IssuesClientProps) {
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
          SEO Issues
        </h1>
        <p className="text-base sm:text-lg text-white/70">
          Detected SEO problems across all your sites
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
        <StatCard
          title="Total Issues"
          value={stats.totalIssues}
          gradient="from-blue-500 to-cyan-500"
          icon="🔍"
          delay={0}
        />
        <StatCard
          title="Critical"
          value={stats.criticalIssues}
          gradient="from-red-500 to-rose-500"
          icon="🚨"
          delay={0.1}
        />
        <StatCard
          title="High Priority"
          value={stats.highIssues}
          gradient="from-orange-500 to-amber-500"
          icon="⚠️"
          delay={0.2}
        />
        <StatCard
          title="Medium Priority"
          value={stats.mediumIssues}
          gradient="from-yellow-500 to-yellow-400"
          icon="📊"
          delay={0.3}
        />
      </motion.div>

      {/* Issues Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden"
      >
        <div className="p-8 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">All Issues</h2>
        </div>

        {issues.length === 0 ? (
          <div className="p-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="text-7xl mb-6"
            >
              🎉
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              No issues detected
            </h3>
            <p className="text-white/60 text-lg mb-8">
              Connect a site and run a scan to detect SEO issues
            </p>
            <Link
              href="/dashboard/sites"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
            >
              <Search className="h-5 w-5 mr-2" />
              Connect Your First Site
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 text-white/70 text-sm">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold">Severity</th>
                  <th className="text-left px-6 py-4 font-semibold">Issue Type</th>
                  <th className="text-left px-6 py-4 font-semibold">Description</th>
                  <th className="text-left px-6 py-4 font-semibold">Page</th>
                  <th className="text-left px-6 py-4 font-semibold">Site</th>
                  <th className="text-left px-6 py-4 font-semibold">Detected</th>
                  <th className="text-left px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue, index) => (
                  <IssueRow key={issue.id} issue={issue} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Issue Type Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Issue Types</h3>
          <div className="space-y-4">
            {issuesByType.length > 0 ? (
              issuesByType.map((item, index) => (
                <IssueTypeRow
                  key={item.type}
                  type={item.type.replace(/_/g, ' ')}
                  count={item._count.type}
                  delay={0.6 + index * 0.1}
                />
              ))
            ) : (
              <>
                <IssueTypeRow type="Missing Meta Tags" count={0} delay={0.6} />
                <IssueTypeRow type="Broken Links" count={0} delay={0.7} />
                <IssueTypeRow type="Missing Alt Text" count={0} delay={0.8} />
                <IssueTypeRow type="Slow Page Speed" count={0} delay={0.9} />
                <IssueTypeRow type="Duplicate Content" count={0} delay={1.0} />
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6">How It Works</h3>
          <div className="space-y-6">
            <HowItWorksStep icon="🔍" title="Automatic Scanning" description="We crawl your site and detect SEO issues using AI" />
            <HowItWorksStep icon="🤖" title="AI Analysis" description="Claude AI analyzes each issue and generates fixes" />
            <HowItWorksStep icon="✅" title="Auto-Apply" description="Fixes are applied automatically based on your execution mode" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function StatCard({ title, value, gradient, icon, delay }: { title: string; value: number; gradient: string; icon: string; delay: number }) {
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

function IssueRow({ issue, index }: { issue: Issue; index: number }) {
  const severityConfig = {
    CRITICAL: { bg: 'bg-red-400/20', text: 'text-red-300', border: 'border-red-400/30' },
    HIGH: { bg: 'bg-orange-400/20', text: 'text-orange-300', border: 'border-orange-400/30' },
    MEDIUM: { bg: 'bg-yellow-400/20', text: 'text-yellow-300', border: 'border-yellow-400/30' },
    LOW: { bg: 'bg-blue-400/20', text: 'text-blue-300', border: 'border-blue-400/30' },
  }[issue.severity] || { bg: 'bg-gray-400/20', text: 'text-gray-300', border: 'border-gray-400/30' }

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.05 }}
      className="border-t border-white/10 hover:bg-white/5 transition-colors"
    >
      <td className="px-6 py-4">
        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${severityConfig.bg} ${severityConfig.text} border ${severityConfig.border}`}>
          {issue.severity}
        </span>
      </td>
      <td className="px-6 py-4 text-white font-medium">{issue.type.replace(/_/g, ' ')}</td>
      <td className="px-6 py-4 text-white/70 max-w-xs truncate">{issue.title}</td>
      <td className="px-6 py-4 text-white/70 max-w-xs truncate">
        <a href={issue.pageUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
          {issue.pageUrl}
        </a>
      </td>
      <td className="px-6 py-4 text-white/70">{issue.connection.domain}</td>
      <td className="px-6 py-4 text-white/50 text-sm">
        {new Date(issue.detectedAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        {issue.fixes.length > 0 ? (
          <span className="text-emerald-300 text-sm font-medium flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> Fixed
          </span>
        ) : (
          <button className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors">
            Create Fix
          </button>
        )}
      </td>
    </motion.tr>
  )
}

function IssueTypeRow({ type, count, delay }: { type: string; count: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex justify-between items-center p-3 bg-white/5 rounded-xl"
    >
      <span className="text-white font-medium">{type}</span>
      <span className="text-white/60 font-semibold text-lg">{count}</span>
    </motion.div>
  )
}

function HowItWorksStep({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-white font-semibold mb-1">{title}</p>
        <p className="text-white/60 text-sm">{description}</p>
      </div>
    </div>
  )
}
