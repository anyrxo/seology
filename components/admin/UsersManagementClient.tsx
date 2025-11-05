'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
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

interface CreditBalance {
  monthlyCredits: number
  monthlyUsed: number
  monthlyRemaining: number
  purchasedCredits: number
  totalAvailable: number
  isUnlimited: boolean
}

interface User {
  id: string
  name: string | null
  email: string
  plan: string
  role: string
  connectionsCount: number
  createdAt: string
  credits: CreditBalance | null
}

interface UsersManagementClientProps {
  users: User[]
  stats: {
    total: number
    starter: number
    growth: number
    scale: number
  }
}

export default function UsersManagementClient({
  users: initialUsers,
  stats,
}: UsersManagementClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [userDetailModal, setUserDetailModal] = useState<User | null>(null)
  const [creditModalUser, setCreditModalUser] = useState<User | null>(null)
  const [creditAction, setCreditAction] = useState<'ADD' | 'SET' | 'RESET'>('ADD')
  const [creditAmount, setCreditAmount] = useState('')
  const [creditReason, setCreditReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500"
          />
        ),
      },
      {
        accessorKey: 'name',
        header: 'User',
        cell: ({ row }) => (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
              {(row.original.name || row.original.email).charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-medium">
                {row.original.name || 'No name'}
              </p>
              <p className="text-gray-500 text-xs">ID: {row.original.id.slice(0, 8)}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
          <p className="text-gray-300">{row.original.email}</p>
        ),
      },
      {
        accessorKey: 'plan',
        header: 'Plan',
        cell: ({ row }) => {
          const plan = row.original.plan
          const colors = {
            STARTER: 'bg-green-900 text-green-200',
            GROWTH: 'bg-purple-900 text-purple-200',
            SCALE: 'bg-yellow-900 text-yellow-200',
          }
          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                colors[plan as keyof typeof colors] || 'bg-gray-900 text-gray-200'
              }`}
            >
              {plan}
            </span>
          )
        },
        filterFn: 'equals',
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
          <span className="text-gray-400 text-sm">{row.original.role}</span>
        ),
      },
      {
        accessorKey: 'connectionsCount',
        header: 'Sites',
        cell: ({ row }) => (
          <div className="text-gray-300">
            {row.original.connectionsCount}{' '}
            <span className="text-gray-500">sites</span>
          </div>
        ),
      },
      {
        accessorKey: 'credits',
        header: 'AI Credits',
        cell: ({ row }) => {
          const credits = row.original.credits
          if (!credits) {
            return <span className="text-gray-500 text-sm">N/A</span>
          }
          if (credits.isUnlimited) {
            return <span className="text-green-400 font-semibold">Unlimited</span>
          }
          const percentUsed = credits.monthlyCredits > 0
            ? Math.round((credits.monthlyUsed / credits.monthlyCredits) * 100)
            : 0
          const isLow = percentUsed > 80
          return (
            <div className="flex flex-col">
              <span className={`text-sm font-medium ${isLow ? 'text-yellow-400' : 'text-gray-300'}`}>
                {credits.totalAvailable} available
              </span>
              <span className="text-xs text-gray-500">
                {credits.monthlyUsed}/{credits.monthlyCredits} used
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Joined',
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
              onClick={() => setUserDetailModal(row.original)}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-1 rounded hover:bg-blue-900/20 transition-colors"
            >
              View
            </button>
            <button
              onClick={() => setCreditModalUser(row.original)}
              className="text-green-400 hover:text-green-300 text-sm font-medium px-3 py-1 rounded hover:bg-green-900/20 transition-colors"
            >
              Credits
            </button>
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium px-3 py-1 rounded hover:bg-purple-900/20 transition-colors">
              Edit
            </button>
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: users,
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
        pageSize: 10,
      },
    },
  })

  const planFilter = columnFilters.find((f) => f.id === 'plan')?.value as string | undefined

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Plan', 'Role', 'Sites', 'Joined']
    const rows = users.map((u) => [
      u.id,
      u.name || '',
      u.email,
      u.plan,
      u.role,
      u.connectionsCount.toString(),
      format(new Date(u.createdAt), 'yyyy-MM-dd'),
    ])

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `users-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCreditAdjustment = async () => {
    if (!creditModalUser) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/admin/users/${creditModalUser.id}/credits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: creditAction,
          credits: parseInt(creditAmount) || 0,
          reason: creditReason,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Update local state with new balance
        setUsers(users.map(u =>
          u.id === creditModalUser.id
            ? { ...u, credits: data.data.balance }
            : u
        ))

        // Close modal and reset form
        setCreditModalUser(null)
        setCreditAmount('')
        setCreditReason('')
        alert(`Credits ${creditAction.toLowerCase()}ed successfully!`)
      } else {
        alert(`Error: ${data.error?.message || 'Failed to adjust credits'}`)
      }
    } catch (error) {
      console.error('Credit adjustment error:', error)
      alert('Failed to adjust credits. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage all user accounts and permissions</p>
        </div>
        <Link
          href="/admin"
          className="text-gray-400 hover:text-white flex items-center text-sm"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <QuickStat label="Total Users" value={stats.total} color="text-blue-400" />
        <QuickStat label="Starter Plan" value={stats.starter} color="text-green-400" />
        <QuickStat label="Growth Plan" value={stats.growth} color="text-purple-400" />
        <QuickStat label="Scale Plan" value={stats.scale} color="text-yellow-400" />
      </div>

      {/* Users Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">All Users</h2>
            <div className="flex items-center space-x-3">
              <input
                type="search"
                placeholder="Search users..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 w-64"
              />
              <select
                value={planFilter || ''}
                onChange={(e) =>
                  table.getColumn('plan')?.setFilterValue(e.target.value || undefined)
                }
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">All Plans</option>
                <option value="STARTER">Starter</option>
                <option value="GROWTH">Growth</option>
                <option value="SCALE">Scale</option>
              </select>
              <button
                onClick={exportToCSV}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Export CSV
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
                users.length
              )}
            </span>{' '}
            of <span className="text-white font-medium">{users.length}</span> users
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
              {Array.from({ length: table.getPageCount() }, (_, i) => (
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

      {/* Bulk Actions */}
      <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-4 text-left transition-colors group">
            <div className="text-2xl mb-2">📧</div>
            <h4 className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors">
              Send Email to All
            </h4>
            <p className="text-gray-400 text-sm">Broadcast message to all users</p>
          </button>
          <button
            onClick={exportToCSV}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-4 text-left transition-colors group"
          >
            <div className="text-2xl mb-2">📊</div>
            <h4 className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors">
              Export User Data
            </h4>
            <p className="text-gray-400 text-sm">Download CSV of all users</p>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-4 text-left transition-colors group">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors">
              Manage Permissions
            </h4>
            <p className="text-gray-400 text-sm">Update user roles and access</p>
          </button>
        </div>
      </div>

      {/* User Detail Modal */}
      {userDetailModal && (
        <UserDetailModal
          user={userDetailModal}
          onClose={() => setUserDetailModal(null)}
        />
      )}

      {/* Credit Management Modal */}
      {creditModalUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg border border-gray-800 max-w-lg w-full">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Manage AI Credits</h3>
              <button
                onClick={() => setCreditModalUser(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <p className="text-white font-medium">{creditModalUser.name || 'No name'}</p>
                <p className="text-gray-400 text-sm">{creditModalUser.email}</p>
                <p className="text-gray-500 text-xs mt-2">Plan: {creditModalUser.plan}</p>
              </div>

              {/* Current Credits */}
              {creditModalUser.credits && (
                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-white font-medium mb-2">Current Balance</h4>
                  <div className="space-y-1 text-sm">
                    {creditModalUser.credits.isUnlimited ? (
                      <p className="text-green-400 font-semibold">Unlimited Credits</p>
                    ) : (
                      <>
                        <p className="text-gray-300">
                          <span className="text-gray-500">Monthly:</span>{' '}
                          {creditModalUser.credits.monthlyRemaining} / {creditModalUser.credits.monthlyCredits}
                        </p>
                        <p className="text-gray-300">
                          <span className="text-gray-500">Purchased:</span>{' '}
                          {creditModalUser.credits.purchasedCredits}
                        </p>
                        <p className="text-white font-medium mt-2">
                          Total Available: {creditModalUser.credits.totalAvailable}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Action Selection */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Action</label>
                <select
                  value={creditAction}
                  onChange={(e) => setCreditAction(e.target.value as 'ADD' | 'SET' | 'RESET')}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="ADD">Add credits (grant free credits)</option>
                  <option value="SET">Set monthly usage (adjust current month)</option>
                  <option value="RESET">Reset monthly usage to 0</option>
                </select>
              </div>

              {/* Credit Amount */}
              {creditAction !== 'RESET' && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    {creditAction === 'ADD' ? 'Credits to Add' : 'Set Usage To'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              )}

              {/* Reason */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Reason (optional)
                </label>
                <textarea
                  value={creditReason}
                  onChange={(e) => setCreditReason(e.target.value)}
                  placeholder="Why are you adjusting credits?"
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setCreditModalUser(null)}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreditAdjustment}
                  disabled={isSubmitting || (creditAction !== 'RESET' && !creditAmount)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 font-medium"
                >
                  {isSubmitting ? 'Processing...' : 'Apply Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function QuickStat({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

function UserDetailModal({ user, onClose }: { user: User; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">User Details</h3>
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
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {(user.name || user.email).charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold">{user.name || 'No name'}</h4>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <DetailItem label="User ID" value={user.id} />
            <DetailItem label="Plan" value={user.plan} />
            <DetailItem label="Role" value={user.role} />
            <DetailItem label="Sites" value={user.connectionsCount.toString()} />
            <DetailItem
              label="Joined"
              value={format(new Date(user.createdAt), 'MMMM dd, yyyy')}
            />
          </div>

          <div className="pt-4 flex space-x-3">
            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Edit User
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              View Activity
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
