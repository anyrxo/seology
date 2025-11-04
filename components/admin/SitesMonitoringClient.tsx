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

interface Site {
  id: string
  domain: string
  platform: string
  displayName: string | null
  userEmail: string
  userName: string | null
  status: 'active' | 'inactive' | 'error'
  issuesCount: number
  fixesCount: number
  lastScan: string | null
  createdAt: string
}

interface SitesStats {
  total: number
  active: number
  inactive: number
  byPlatform: {
    SHOPIFY: number
    WORDPRESS: number
    WIX: number
    CUSTOM: number
  }
}

export default function SitesMonitoringClient() {
  const [sites, setSites] = useState<Site[]>([])
  const [stats, setStats] = useState<SitesStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)

  useEffect(() => {
    fetchSites()
  }, [])

  async function fetchSites() {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/sites')
      const result = await response.json()
      if (result.success) {
        setSites(result.data.sites)
        setStats(result.data.stats)
      }
    } catch (error) {
      console.error('Error fetching sites:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = useMemo<ColumnDef<Site>[]>(
    () => [
      {
        accessorKey: 'domain',
        header: 'Site',
        cell: ({ row }) => (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {row.original.domain.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-medium">
                {row.original.displayName || row.original.domain}
              </p>
              <p className="text-gray-500 text-xs">{row.original.domain}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'platform',
        header: 'Platform',
        cell: ({ row }) => {
          const platform = row.original.platform
          const emoji = {
            SHOPIFY: '🛍️',
            WORDPRESS: '📝',
            WIX: '🎨',
            CUSTOM: '⚡',
          }[platform] || '🌐'
          return (
            <div className="flex items-center space-x-2">
              <span className="text-xl">{emoji}</span>
              <span className="text-gray-300">{platform}</span>
            </div>
          )
        },
        filterFn: 'equals',
      },
      {
        accessorKey: 'userEmail',
        header: 'Owner',
        cell: ({ row }) => (
          <div>
            <p className="text-white text-sm">{row.original.userName || 'Unknown'}</p>
            <p className="text-gray-500 text-xs">{row.original.userEmail}</p>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status
          const colors = {
            active: 'bg-green-900 text-green-200 border-green-700',
            inactive: 'bg-gray-800 text-gray-400 border-gray-700',
            error: 'bg-red-900 text-red-200 border-red-700',
          }
          const icons = {
            active: '✓',
            inactive: '○',
            error: '✕',
          }
          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                colors[status]
              }`}
            >
              {icons[status]} {status.toUpperCase()}
            </span>
          )
        },
        filterFn: 'equals',
      },
      {
        accessorKey: 'issuesCount',
        header: 'Issues',
        cell: ({ row }) => (
          <div className="text-center">
            <span className={`text-lg font-bold ${row.original.issuesCount > 0 ? 'text-orange-400' : 'text-gray-500'}`}>
              {row.original.issuesCount}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'fixesCount',
        header: 'Fixes',
        cell: ({ row }) => (
          <div className="text-center">
            <span className="text-lg font-bold text-green-400">
              {row.original.fixesCount}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'lastScan',
        header: 'Last Scan',
        cell: ({ row }) => (
          <p className="text-gray-400 text-sm">
            {row.original.lastScan
              ? format(new Date(row.original.lastScan), 'MMM dd, HH:mm')
              : 'Never'}
          </p>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Connected',
        cell: ({ row }) => (
          <p className="text-gray-400 text-sm">
            {format(new Date(row.original.createdAt), 'MMM dd, yyyy')}
          </p>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => setSelectedSite(row.original)}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-1 rounded hover:bg-blue-900/20 transition-colors"
            >
              Details
            </button>
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium px-3 py-1 rounded hover:bg-purple-900/20 transition-colors">
              Scan
            </button>
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: sites,
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
        pageSize: 15,
      },
    },
  })

  const platformFilter = columnFilters.find((f) => f.id === 'platform')?.value as string | undefined
  const statusFilter = columnFilters.find((f) => f.id === 'status')?.value as string | undefined

  if (loading) {
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
          <h1 className="text-3xl font-bold text-white mb-2">Sites Monitoring</h1>
          <p className="text-gray-400">Monitor all connected sites across the platform</p>
        </div>
        <Link
          href="/admin"
          className="text-gray-400 hover:text-white flex items-center text-sm"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            label="Total Sites"
            value={stats.total}
            color="text-blue-400"
            icon="🌐"
          />
          <StatCard
            label="Active"
            value={stats.active}
            color="text-green-400"
            icon="✓"
          />
          <StatCard
            label="Inactive"
            value={stats.inactive}
            color="text-gray-400"
            icon="○"
          />
          <StatCard
            label="Issues"
            value={sites.reduce((sum, s) => sum + s.issuesCount, 0)}
            color="text-orange-400"
            icon="⚠️"
          />
        </div>
      )}

      {/* Platform Breakdown */}
      {stats && (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Platform Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.byPlatform).map(([platform, count]) => {
              const emoji = {
                SHOPIFY: '🛍️',
                WORDPRESS: '📝',
                WIX: '🎨',
                CUSTOM: '⚡',
              }[platform] || '🌐'
              return (
                <div key={platform} className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">{emoji}</div>
                  <p className="text-gray-400 text-sm mb-1">{platform}</p>
                  <p className="text-2xl font-bold text-white">{count}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Sites Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">All Sites</h2>
            <div className="flex items-center space-x-3">
              <input
                type="search"
                placeholder="Search sites..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 w-64"
              />
              <select
                value={platformFilter || ''}
                onChange={(e) =>
                  table.getColumn('platform')?.setFilterValue(e.target.value || undefined)
                }
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">All Platforms</option>
                <option value="SHOPIFY">Shopify</option>
                <option value="WORDPRESS">WordPress</option>
                <option value="WIX">Wix</option>
                <option value="CUSTOM">Custom</option>
              </select>
              <select
                value={statusFilter || ''}
                onChange={(e) =>
                  table.getColumn('status')?.setFilterValue(e.target.value || undefined)
                }
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="error">Error</option>
              </select>
              <button
                onClick={fetchSites}
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
                sites.length
              )}
            </span>{' '}
            of <span className="text-white font-medium">{sites.length}</span> sites
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

      {/* Site Detail Modal */}
      {selectedSite && (
        <SiteDetailModal site={selectedSite} onClose={() => setSelectedSite(null)} />
      )}
    </div>
  )
}

function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string
  value: number
  color: string
  icon: string
}) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-gray-400 text-sm">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

function SiteDetailModal({ site, onClose }: { site: Site; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Site Details</h3>
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
          {/* Site Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-3">
              {site.displayName || site.domain}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="Domain" value={site.domain} />
              <DetailItem label="Platform" value={site.platform} />
              <DetailItem label="Status" value={site.status.toUpperCase()} />
              <DetailItem label="Owner" value={site.userEmail} />
              <DetailItem label="Issues" value={site.issuesCount.toString()} />
              <DetailItem label="Fixes Applied" value={site.fixesCount.toString()} />
              <DetailItem
                label="Last Scan"
                value={
                  site.lastScan
                    ? format(new Date(site.lastScan), 'MMMM dd, yyyy HH:mm')
                    : 'Never'
                }
              />
              <DetailItem
                label="Connected"
                value={format(new Date(site.createdAt), 'MMMM dd, yyyy')}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex space-x-3">
            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Trigger Scan
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              View Issues
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              View Fixes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  )
}
