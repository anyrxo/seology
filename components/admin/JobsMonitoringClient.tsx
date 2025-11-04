'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import { format } from 'date-fns'
import Link from 'next/link'

interface JobResult {
  pagesFound?: number
  issuesDetected?: number
  fixesApplied?: number
  message?: string
  [key: string]: string | number | boolean | undefined
}

interface Job {
  id: string
  type: 'CRAWL_SITE' | 'ANALYZE_SITE' | 'CLEANUP_ROLLBACKS' | 'RESET_USAGE'
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  siteId: string | null
  siteDomain: string | null
  result: JobResult | null
  error: string | null
  progress: number
  attempts: number
  createdAt: string
  startedAt: string | null
  completedAt: string | null
}

interface JobsStats {
  pending: number
  processing: number
  completed: number
  failed: number
  avgProcessingTime: number
}

export default function JobsMonitoringClient() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [stats, setStats] = useState<JobsStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    fetchJobs()
    if (autoRefresh) {
      const interval = setInterval(fetchJobs, 5000) // Refresh every 5 seconds
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  async function fetchJobs() {
    try {
      const response = await fetch('/api/admin/jobs')
      const result = await response.json()
      if (result.success) {
        setJobs(result.data.jobs)
        setStats(result.data.stats)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  async function retryJob(jobId: string) {
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/retry`, {
        method: 'POST',
      })
      if (response.ok) {
        fetchJobs()
      }
    } catch (error) {
      console.error('Error retrying job:', error)
    }
  }

  async function cancelJob(jobId: string) {
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/cancel`, {
        method: 'POST',
      })
      if (response.ok) {
        fetchJobs()
      }
    } catch (error) {
      console.error('Error canceling job:', error)
    }
  }

  const columns = useMemo<ColumnDef<Job>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Job ID',
        cell: ({ row }) => (
          <div className="font-mono text-xs text-gray-400">
            {row.original.id.slice(0, 8)}...
          </div>
        ),
      },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => {
          const type = row.original.type
          const icons = {
            CRAWL_SITE: '🕷️',
            ANALYZE_SITE: '🔍',
            CLEANUP_ROLLBACKS: '🧹',
            RESET_USAGE: '🔄',
          }
          return (
            <div className="flex items-center space-x-2">
              <span className="text-xl">{icons[type]}</span>
              <span className="text-gray-300 text-sm">{type}</span>
            </div>
          )
        },
        filterFn: 'equals',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status
          const colors = {
            PENDING: 'bg-gray-800 text-gray-300 border-gray-700',
            PROCESSING: 'bg-blue-900 text-blue-200 border-blue-700',
            COMPLETED: 'bg-green-900 text-green-200 border-green-700',
            FAILED: 'bg-red-900 text-red-200 border-red-700',
          }
          const icons = {
            PENDING: '○',
            PROCESSING: '⟳',
            COMPLETED: '✓',
            FAILED: '✕',
          }
          return (
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  colors[status]
                }`}
              >
                {icons[status]} {status}
              </span>
              {status === 'PROCESSING' && (
                <div className="w-20 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${row.original.progress}%` }}
                  />
                </div>
              )}
            </div>
          )
        },
        filterFn: 'equals',
      },
      {
        accessorKey: 'siteDomain',
        header: 'Site',
        cell: ({ row }) => (
          <div className="text-gray-300 text-sm">
            {row.original.siteDomain || '-'}
          </div>
        ),
      },
      {
        accessorKey: 'attempts',
        header: 'Attempts',
        cell: ({ row }) => (
          <div className="text-center">
            <span className={`font-mono text-sm ${row.original.attempts > 1 ? 'text-orange-400' : 'text-gray-400'}`}>
              {row.original.attempts}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ row }) => (
          <div className="text-gray-400 text-xs">
            {format(new Date(row.original.createdAt), 'MMM dd, HH:mm:ss')}
          </div>
        ),
      },
      {
        accessorKey: 'completedAt',
        header: 'Duration',
        cell: ({ row }) => {
          const { startedAt, completedAt } = row.original
          if (!startedAt) return <span className="text-gray-500 text-xs">-</span>
          const end = completedAt ? new Date(completedAt) : new Date()
          const start = new Date(startedAt)
          const duration = Math.floor((end.getTime() - start.getTime()) / 1000)
          return (
            <span className="text-gray-400 text-xs font-mono">
              {duration}s
            </span>
          )
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => setSelectedJob(row.original)}
              className="text-blue-400 hover:text-blue-300 text-xs font-medium px-2 py-1 rounded hover:bg-blue-900/20 transition-colors"
            >
              Details
            </button>
            {row.original.status === 'FAILED' && (
              <button
                onClick={() => retryJob(row.original.id)}
                className="text-green-400 hover:text-green-300 text-xs font-medium px-2 py-1 rounded hover:bg-green-900/20 transition-colors"
              >
                Retry
              </button>
            )}
            {(row.original.status === 'PENDING' || row.original.status === 'PROCESSING') && (
              <button
                onClick={() => cancelJob(row.original.id)}
                className="text-red-400 hover:text-red-300 text-xs font-medium px-2 py-1 rounded hover:bg-red-900/20 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  })

  const typeFilter = columnFilters.find((f) => f.id === 'type')?.value as string | undefined
  const statusFilter = columnFilters.find((f) => f.id === 'status')?.value as string | undefined

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Background Jobs</h1>
          <p className="text-gray-400">Monitor and manage the job queue</p>
        </div>
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500"
            />
            <span>Auto-refresh</span>
          </label>
          <Link
            href="/admin"
            className="text-gray-400 hover:text-white flex items-center text-sm"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <StatCard
            label="Pending"
            value={stats.pending}
            color="text-gray-400"
            icon="○"
            bgColor="bg-gray-800"
          />
          <StatCard
            label="Processing"
            value={stats.processing}
            color="text-blue-400"
            icon="⟳"
            bgColor="bg-blue-900/20"
          />
          <StatCard
            label="Completed"
            value={stats.completed}
            color="text-green-400"
            icon="✓"
            bgColor="bg-green-900/20"
          />
          <StatCard
            label="Failed"
            value={stats.failed}
            color="text-red-400"
            icon="✕"
            bgColor="bg-red-900/20"
          />
          <StatCard
            label="Avg Time"
            value={`${stats.avgProcessingTime}s`}
            color="text-purple-400"
            icon="⏱️"
            bgColor="bg-purple-900/20"
          />
        </div>
      )}

      {/* Queue Health Indicator */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Queue Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HealthMetric
            label="Queue Depth"
            value={stats?.pending || 0}
            status={
              (stats?.pending || 0) < 10
                ? 'healthy'
                : (stats?.pending || 0) < 50
                ? 'warning'
                : 'critical'
            }
          />
          <HealthMetric
            label="Processing Rate"
            value={`${stats?.processing || 0}/min`}
            status="healthy"
          />
          <HealthMetric
            label="Error Rate"
            value={`${stats?.failed || 0} failures`}
            status={(stats?.failed || 0) < 5 ? 'healthy' : 'warning'}
          />
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">Job Queue</h2>
            <div className="flex items-center space-x-3">
              <input
                type="search"
                placeholder="Search jobs..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 w-64"
              />
              <select
                value={typeFilter || ''}
                onChange={(e) =>
                  table.getColumn('type')?.setFilterValue(e.target.value || undefined)
                }
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">All Types</option>
                <option value="CRAWL_SITE">Crawl Site</option>
                <option value="ANALYZE_SITE">Analyze Site</option>
                <option value="CLEANUP_ROLLBACKS">Cleanup</option>
                <option value="RESET_USAGE">Reset Usage</option>
              </select>
              <select
                value={statusFilter || ''}
                onChange={(e) =>
                  table.getColumn('status')?.setFilterValue(e.target.value || undefined)
                }
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="COMPLETED">Completed</option>
                <option value="FAILED">Failed</option>
              </select>
              <button
                onClick={fetchJobs}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left py-4 px-6 text-sm font-semibold text-gray-300 cursor-pointer hover:text-white"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center space-x-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() && (
                          <span>
                            {header.column.getIsSorted() === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-800">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-6">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-800 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing{' '}
            <span className="text-white font-medium">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
            </span>{' '}
            to{' '}
            <span className="text-white font-medium">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                jobs.length
              )}
            </span>{' '}
            of <span className="text-white font-medium">{jobs.length}</span> jobs
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(table.getPageCount(), 5) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => table.setPageIndex(i)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    table.getState().pagination.pageIndex === i
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onRetry={retryJob}
        />
      )}
    </div>
  )
}

function StatCard({
  label,
  value,
  color,
  icon,
  bgColor,
}: {
  label: string
  value: number | string
  color: string
  icon: string
  bgColor: string
}) {
  return (
    <div className={`${bgColor} rounded-lg border border-gray-800 p-6`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-gray-400 text-sm">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

function HealthMetric({
  label,
  value,
  status,
}: {
  label: string
  value: number | string
  status: 'healthy' | 'warning' | 'critical'
}) {
  const colors = {
    healthy: 'text-green-400 border-green-700',
    warning: 'text-yellow-400 border-yellow-700',
    critical: 'text-red-400 border-red-700',
  }
  const icons = {
    healthy: '✓',
    warning: '!',
    critical: '✕',
  }
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400 text-sm">{label}</span>
      <div className="flex items-center space-x-2">
        <span className={`text-lg font-bold ${colors[status].split(' ')[0]}`}>
          {value}
        </span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold border ${colors[status]}`}
        >
          {icons[status]}
        </span>
      </div>
    </div>
  )
}

function JobDetailModal({
  job,
  onClose,
  onRetry,
}: {
  job: Job
  onClose: () => void
  onRetry: (id: string) => void
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg border border-gray-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Job Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Job Info */}
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Job ID" value={job.id} mono />
            <DetailItem label="Type" value={job.type} />
            <DetailItem label="Status" value={job.status} />
            <DetailItem label="Site" value={job.siteDomain || 'N/A'} />
            <DetailItem label="Attempts" value={job.attempts.toString()} />
            <DetailItem label="Progress" value={`${job.progress}%`} />
            <DetailItem
              label="Created"
              value={format(new Date(job.createdAt), 'MMMM dd, yyyy HH:mm:ss')}
            />
            {job.startedAt && (
              <DetailItem
                label="Started"
                value={format(new Date(job.startedAt), 'MMMM dd, yyyy HH:mm:ss')}
              />
            )}
            {job.completedAt && (
              <DetailItem
                label="Completed"
                value={format(new Date(job.completedAt), 'MMMM dd, yyyy HH:mm:ss')}
              />
            )}
          </div>

          {/* Error Details */}
          {job.error && (
            <div>
              <h4 className="text-red-400 font-semibold mb-2">Error</h4>
              <pre className="bg-gray-800 border border-red-800 rounded-lg p-4 text-red-300 text-xs overflow-x-auto">
                {job.error}
              </pre>
            </div>
          )}

          {/* Result Details */}
          {job.result && (
            <div>
              <h4 className="text-green-400 font-semibold mb-2">Result</h4>
              <pre className="bg-gray-800 border border-green-800 rounded-lg p-4 text-green-300 text-xs overflow-x-auto">
                {JSON.stringify(job.result, null, 2)}
              </pre>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex space-x-3">
            {job.status === 'FAILED' && (
              <button
                onClick={() => {
                  onRetry(job.id)
                  onClose()
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Retry Job
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailItem({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className={`text-white font-medium ${mono ? 'font-mono text-xs' : ''}`}>
        {value}
      </p>
    </div>
  )
}
