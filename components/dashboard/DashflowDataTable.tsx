'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'

export interface TableColumn<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (value: unknown, row: T) => React.ReactNode
  width?: string
}

export interface DashflowDataTableProps<T extends Record<string, unknown>> {
  data: T[]
  columns: TableColumn<T>[]
  isLoading?: boolean
  emptyIcon?: string
  emptyTitle?: string
  emptyMessage?: string
  onRowClick?: (row: T) => void
  rowKey?: keyof T
  pageSize?: number
  showPagination?: boolean
}

type SortConfig<T> = {
  key: keyof T | null
  direction: 'asc' | 'desc'
}

export function DashflowDataTable<T extends Record<string, unknown>>({
  data,
  columns,
  isLoading = false,
  emptyIcon = '📊',
  emptyTitle = 'No data available',
  emptyMessage = 'Data will appear here when available',
  onRowClick,
  rowKey = 'id' as keyof T,
  pageSize = 10,
  showPagination = true,
}: DashflowDataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: null,
    direction: 'asc',
  })
  const [currentPage, setCurrentPage] = useState(1)

  // Sorting logic
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue === bValue) return 0
    if (aValue == null) return 1
    if (bValue == null) return -1

    const comparison = aValue < bValue ? -1 : 1
    return sortConfig.direction === 'asc' ? comparison : -comparison
  })

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedData = showPagination
    ? sortedData.slice(startIndex, startIndex + pageSize)
    : sortedData

  const handleSort = (columnKey: string, sortable: boolean = true) => {
    if (!sortable) return

    setSortConfig((current) => {
      if (current.key === columnKey) {
        return {
          key: columnKey as keyof T,
          direction: current.direction === 'asc' ? 'desc' : 'asc',
        }
      }
      return { key: columnKey as keyof T, direction: 'asc' }
    })
  }

  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) return null
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    )
  }

  if (isLoading) {
    return <TableSkeleton columns={columns.length} rows={5} />
  }

  if (data.length === 0) {
    return (
      <div className="card pd-32px---44px">
        <div className="flex-vertical gap-row-16px align-center text-center">
          <div className="card-icon-square _40px neutral-icon">
            <div className="text-400">{emptyIcon}</div>
          </div>
          <div>
            <h3 className="text-200 bold color-neutral-800 mg-bottom-8px">{emptyTitle}</h3>
            <p className="text-100 color-neutral-600">{emptyMessage}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card pd-0">
      {/* Table wrapper with Dashflow X styling */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-neutral-100 border-b border-neutral-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left px-4 py-3 ${column.width || ''}`}
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key, column.sortable)}
                      className="flex-horizontal gap-column-8px align-center text-50 medium color-neutral-600 uppercase tracking-wider hover:color-neutral-800 transition-colors w-full text-left"
                    >
                      <span>{column.label}</span>
                      {getSortIcon(column.key)}
                    </button>
                  ) : (
                    <div className="text-50 medium color-neutral-600 uppercase tracking-wider">
                      {column.label}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-neutral-50 divide-y divide-neutral-200">
            <AnimatePresence mode="wait">
              {paginatedData.map((row, rowIndex) => (
                <motion.tr
                  key={String(row[rowKey])}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: rowIndex * 0.02 }}
                  onClick={() => onRowClick?.(row)}
                  className={`${
                    onRowClick
                      ? 'cursor-pointer hover:bg-neutral-100 transition-colors'
                      : ''
                  }`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-4 py-3 text-100 color-neutral-800"
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : (row[column.key] as React.ReactNode)}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination - Dashflow X style */}
      {showPagination && totalPages > 1 && (
        <div className="border-t border-neutral-200 px-4 py-3 bg-neutral-50">
          <div className="w-layout-hflex flex-horizontal space-between align-center">
            {/* Page info */}
            <div className="text-50 color-neutral-600">
              Showing {startIndex + 1} to {Math.min(startIndex + pageSize, sortedData.length)} of{' '}
              {sortedData.length} results
            </div>

            {/* Page controls */}
            <div className="flex-horizontal gap-column-8px align-center">
              {/* Previous button */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`btn-secondary ${
                  currentPage === 1 ? 'disabled' : ''
                }`}
                style={{ padding: '8px 16px' }}
              >
                <div className="text-50 medium">Previous</div>
              </button>

              {/* Page numbers */}
              <div className="flex-horizontal gap-column-4px">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`btn-${
                        currentPage === pageNum ? 'primary' : 'secondary'
                      }`}
                      style={{
                        padding: '8px 12px',
                        minWidth: '40px',
                      }}
                    >
                      <div className="text-50 medium">{pageNum}</div>
                    </button>
                  )
                })}
              </div>

              {/* Next button */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`btn-secondary ${
                  currentPage === totalPages ? 'disabled' : ''
                }`}
                style={{ padding: '8px 16px' }}
              >
                <div className="text-50 medium">Next</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TableSkeleton({ columns, rows }: { columns: number; rows: number }) {
  return (
    <div className="card pd-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-100 border-b border-neutral-200">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <div className="skeleton-box" style={{ height: '16px', width: '100px' }} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-neutral-50">
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i} className="border-b border-neutral-200">
                {Array.from({ length: columns }).map((_, j) => (
                  <td key={j} className="px-4 py-3">
                    <div className="skeleton-box" style={{ height: '16px' }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
