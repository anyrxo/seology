'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Search,
  Filter,
  ChevronDown,
  AlertCircle,
  XCircle,
  Clock,
  Zap,
  Globe,
  BarChart3,
  TrendingUp,
  ChevronRight,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow, parseISO } from 'date-fns'

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
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(
    searchParams.get('severity')
  )
  const [selectedType, setSelectedType] = useState<string | null>(
    searchParams.get('type')
  )
  const [selectedIssues, setSelectedIssues] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter issues based on search and filters
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      searchQuery === '' ||
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.connection.domain.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSeverity = !selectedSeverity || issue.severity === selectedSeverity
    const matchesType = !selectedType || issue.type === selectedType

    return matchesSearch && matchesSeverity && matchesType
  })

  const handleSelectAll = () => {
    if (selectedIssues.length === filteredIssues.length) {
      setSelectedIssues([])
    } else {
      setSelectedIssues(filteredIssues.map((i) => i.id))
    }
  }

  const handleSelectIssue = (issueId: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId]
    )
  }

  const handleBulkAction = async (action: 'fix' | 'ignore' | 'delete') => {
    console.log(`Bulk ${action} for:`, selectedIssues)
    // Implement bulk actions
  }

  const clearFilters = () => {
    setSelectedSeverity(null)
    setSelectedType(null)
    setSearchQuery('')
    router.push('/dashboard/issues')
  }

  const hasActiveFilters = selectedSeverity || selectedType

  return (
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-vertical gap-row-16px"
        >
          <div className="flex-horizontal gap-column-16px align-center">
            <div className="card-icon-square _56px">
              <AlertCircle className="w-8 h-8 text-orange-400" />
            </div>
            <div className="flex-1">
              <h1 className="display-1 text-white">SEO Issues</h1>
              <p className="text-200 text-gray-400">
                Detected SEO problems across all your sites
              </p>
            </div>
            <Link
              href="/dashboard/ai-analysis"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-2xl font-medium transition-all shadow-lg shadow-blue-600/30"
            >
              <Zap className="w-4 h-4" />
              Run AI Analysis
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid-4-columns _1-column-tablet gap-row-24px gap-column-12px"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
        >
          <StatCard
            title="Total Issues"
            value={stats.totalIssues}
            icon={<AlertCircle className="w-5 h-5" />}
            gradient="from-blue-500/20 to-cyan-500/20"
            color="blue"
          />
          <StatCard
            title="Critical"
            value={stats.criticalIssues}
            icon={<XCircle className="w-5 h-5" />}
            gradient="from-red-500/20 to-pink-500/20"
            color="red"
          />
          <StatCard
            title="High Priority"
            value={stats.highIssues}
            icon={<AlertTriangle className="w-5 h-5" />}
            gradient="from-orange-500/20 to-yellow-500/20"
            color="orange"
          />
          <StatCard
            title="Medium Priority"
            value={stats.mediumIssues}
            icon={<Clock className="w-5 h-5" />}
            gradient="from-yellow-500/20 to-amber-500/20"
            color="yellow"
          />
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card pd-24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
        >
          <div className="flex-horizontal gap-column-16px align-center flex-wrap">
            {/* Search */}
            <div className="flex-1 min-w-[280px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search issues..."
                  className="w-full pl-12 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                hasActiveFilters
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/[0.05] border border-white/10 text-gray-300 hover:bg-white/[0.1]'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {[selectedSeverity, selectedType].filter(Boolean).length}
                </span>
              )}
            </button>

            {/* Bulk Actions */}
            {selectedIssues.length > 0 && (
              <div className="flex-horizontal gap-column-8px">
                <span className="text-100 text-gray-400">
                  {selectedIssues.length} selected
                </span>
                <button
                  onClick={() => handleBulkAction('fix')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-100 medium transition-all"
                >
                  Fix All
                </button>
                <button
                  onClick={() => handleBulkAction('ignore')}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-100 medium transition-all"
                >
                  Ignore
                </button>
                <button
                  onClick={() => setSelectedIssues([])}
                  className="px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white rounded-xl text-100 medium transition-all"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mg-top-16px pt-16px border-t border-white/10"
              >
                <div className="grid-2-columns _1-column-mbl gap-column-16px gap-row-16px">
                  {/* Severity Filter */}
                  <div className="flex-vertical gap-row-8px">
                    <label className="text-100 medium text-gray-400">Severity</label>
                    <div className="flex-horizontal gap-column-8px flex-wrap">
                      {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((severity) => (
                        <button
                          key={severity}
                          onClick={() =>
                            setSelectedSeverity(
                              selectedSeverity === severity ? null : severity
                            )
                          }
                          className={`px-4 py-2 rounded-xl text-100 medium transition-all ${
                            selectedSeverity === severity
                              ? 'bg-blue-600 text-white'
                              : 'bg-white/[0.05] border border-white/10 text-gray-300 hover:bg-white/[0.1]'
                          }`}
                        >
                          {severity}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="flex-vertical gap-row-8px">
                    <label className="text-100 medium text-gray-400">Issue Type</label>
                    <div className="flex-horizontal gap-column-8px flex-wrap">
                      {issuesByType.slice(0, 4).map((item) => (
                        <button
                          key={item.type}
                          onClick={() =>
                            setSelectedType(selectedType === item.type ? null : item.type)
                          }
                          className={`px-4 py-2 rounded-xl text-100 medium transition-all ${
                            selectedType === item.type
                              ? 'bg-blue-600 text-white'
                              : 'bg-white/[0.05] border border-white/10 text-gray-300 hover:bg-white/[0.1]'
                          }`}
                        >
                          {item.type.replace(/_/g, ' ')} ({item._count.type})
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mg-top-16px inline-flex items-center gap-2 text-100 medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear all filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Issues List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
        >
          <div className="flex-horizontal space-between align-center mg-bottom-24px">
            <h2 className="text-400 bold text-white">
              {filteredIssues.length} {filteredIssues.length === 1 ? 'Issue' : 'Issues'}
            </h2>
            {filteredIssues.length > 0 && (
              <button
                onClick={handleSelectAll}
                className="text-100 medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                {selectedIssues.length === filteredIssues.length
                  ? 'Deselect All'
                  : 'Select All'}
              </button>
            )}
          </div>

          {filteredIssues.length === 0 ? (
            <div className="flex-vertical gap-row-24px align-center text-center pd-64px">
              <div className="card-icon-square _56px">
                {issues.length === 0 ? (
                  <div className="text-600">🎉</div>
                ) : (
                  <Search className="w-8 h-8 text-gray-500" />
                )}
              </div>
              <div>
                <h3 className="text-300 bold text-white mg-bottom-8px">
                  {issues.length === 0 ? 'No issues detected' : 'No matching issues'}
                </h3>
                <p className="text-200 text-gray-400">
                  {issues.length === 0
                    ? 'Connect a site and run a scan to detect SEO issues'
                    : 'Try adjusting your search or filters'}
                </p>
              </div>
              {issues.length === 0 && (
                <Link
                  href="/dashboard/sites"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-2xl font-medium transition-all shadow-lg shadow-blue-600/30"
                >
                  <Globe className="w-4 h-4" />
                  Connect Your First Site
                </Link>
              )}
            </div>
          ) : (
            <div className="flex-vertical gap-row-12px">
              <AnimatePresence mode="popLayout">
                {filteredIssues.map((issue, index) => (
                  <IssueRow
                    key={issue.id}
                    issue={issue}
                    index={index}
                    selected={selectedIssues.includes(issue.id)}
                    onSelect={() => handleSelectIssue(issue.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Issue Type Breakdown */}
        {issuesByType.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid-2-columns _1-column-tablet gap-column-24px gap-row-24px"
          >
            {/* Issue Types */}
            <div className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg">
              <div className="flex-horizontal gap-column-12px align-center mg-bottom-24px">
                <div className="card-icon-square _40px">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-300 bold text-white">Issue Types</h3>
              </div>
              <div className="flex-vertical gap-row-12px">
                {issuesByType.map((item, index) => (
                  <motion.div
                    key={item.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="card pd-16px bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className="flex-horizontal space-between align-center">
                      <span className="text-200 medium text-white">
                        {item.type.replace(/_/g, ' ')}
                      </span>
                      <div className="badge blue">
                        <div className="text-50 medium">{item._count.type}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="card pd-32px---24px bg-gradient-to-br from-purple-500/10 via-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-purple-500/20 shadow-lg shadow-purple-500/5">
              <div className="flex-horizontal gap-column-12px align-center mg-bottom-24px">
                <div className="card-icon-square _40px">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-300 bold text-white">How It Works</h3>
              </div>
              <div className="flex-vertical gap-row-20px">
                <HowItWorksStep
                  icon={<Search className="w-5 h-5" />}
                  title="Automatic Scanning"
                  description="We crawl your site and detect SEO issues using AI"
                  color="blue"
                />
                <HowItWorksStep
                  icon={<Zap className="w-5 h-5" />}
                  title="AI Analysis"
                  description="Our AI analyzes each issue and generates fixes"
                  color="purple"
                />
                <HowItWorksStep
                  icon={<CheckCircle2 className="w-5 h-5" />}
                  title="Auto-Apply"
                  description="Fixes are applied automatically based on your execution mode"
                  color="green"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Stat Card Component
interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  gradient: string
  color: string
}

function StatCard({ title, value, icon, gradient, color }: StatCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`card pd-24px relative overflow-hidden bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
    >
      <div className={`card-icon-square _40px text-${color}-400 mg-bottom-16px`}>{icon}</div>
      <div className="flex-vertical gap-row-8px">
        <div className="text-100 medium text-gray-400">{title}</div>
        <div className="display-2 text-white">{value}</div>
      </div>
    </motion.div>
  )
}

// Issue Row Component
interface IssueRowProps {
  issue: Issue
  index: number
  selected: boolean
  onSelect: () => void
}

function IssueRow({ issue, index, selected, onSelect }: IssueRowProps) {
  const severityConfig = {
    CRITICAL: { badge: 'red', icon: XCircle },
    HIGH: { badge: 'orange', icon: AlertTriangle },
    MEDIUM: { badge: 'orange', icon: AlertCircle },
    LOW: { badge: 'blue', icon: Clock },
  }
  const config = severityConfig[issue.severity as keyof typeof severityConfig] || {
    badge: 'neutral',
    icon: AlertCircle,
  }
  const SeverityIcon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.05 }}
      className={`card pd-20px transition-all ${
        selected
          ? 'bg-blue-500/10 border border-blue-500/30'
          : 'bg-white/[0.02] border border-white/5 hover:border-white/10'
      }`}
    >
      <div className="flex-horizontal gap-column-16px align-start">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="mt-1 w-4 h-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800 bg-gray-700 cursor-pointer"
        />

        {/* Icon */}
        <div className={`card-icon-square _40px ${config.badge}-icon`}>
          <SeverityIcon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex-horizontal space-between align-center gap-column-12px mg-bottom-8px">
            <div className="flex-horizontal gap-column-12px align-center flex-wrap">
              <h3 className="text-200 medium text-white">{issue.type.replace(/_/g, ' ')}</h3>
              <div className={`badge ${config.badge}`}>
                <div className="text-50 medium">{issue.severity}</div>
              </div>
            </div>
            {issue.fixes.length > 0 && (
              <div className="badge green">
                <CheckCircle2 className="w-3 h-3" />
                <div className="text-50 medium">Fixed</div>
              </div>
            )}
          </div>

          <p className="text-100 text-gray-300 mg-bottom-12px line-clamp-2">
            {issue.title}
          </p>

          <div className="flex-horizontal gap-column-16px flex-wrap align-center mg-bottom-12px">
            <div className="flex-horizontal gap-column-8px align-center">
              <Globe className="w-3 h-3 text-gray-500" />
              <span className="text-50 text-gray-400">{issue.connection.domain}</span>
            </div>
            <a
              href={issue.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-horizontal gap-column-4px align-center text-50 medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Page <ArrowUpRight className="w-3 h-3" />
            </a>
            <div className="flex-horizontal gap-column-8px align-center">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-50 text-gray-500">
                {formatDistanceToNow(new Date(issue.detectedAt), { addSuffix: true })}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex-horizontal gap-column-8px">
            {issue.fixes.length === 0 && (
              <Link
                href={`/dashboard/issues/${issue.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-100 medium transition-all shadow-lg shadow-blue-600/20"
              >
                Create Fix <ChevronRight className="w-3 h-3" />
              </Link>
            )}
            <Link
              href={`/dashboard/issues/${issue.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white rounded-xl text-100 medium transition-all"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// How It Works Step Component
interface HowItWorksStepProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

function HowItWorksStep({ icon, title, description, color }: HowItWorksStepProps) {
  return (
    <div className="flex-horizontal gap-column-16px align-start">
      <div className={`card-icon-square _40px text-${color}-400`}>{icon}</div>
      <div className="flex-vertical gap-row-4px">
        <p className="text-200 medium text-white">{title}</p>
        <p className="text-100 text-gray-400">{description}</p>
      </div>
    </div>
  )
}
