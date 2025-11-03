'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { LoadingSkeleton } from '@/components/ui/loading'

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: unknown, row: T) => React.ReactNode
  width?: string
}

export interface DataTableProps<T extends Record<string, unknown>> {
  data: T[]
  columns: Column<T>[]
  isLoading?: boolean
  emptyMessage?: string
  searchPlaceholder?: string
  pageSize?: number
  onRowClick?: (row: T) => void
  rowKey?: keyof T
  stickyHeader?: boolean
}

type SortDirection = 'asc' | 'desc' | null

export function EnhancedDataTable<T extends Record<string, unknown>>({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No data available',
  searchPlaceholder = 'Search...',
  pageSize = 10,
  onRowClick,
  rowKey = 'id' as keyof T,
  stickyHeader = true,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [showFilters, setShowFilters] = useState(false)

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (aValue === bValue) return 0
      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      const comparison = aValue < bValue ? -1 : 1
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [data, sortColumn, sortDirection])

  // Search filtering
  const searchedData = useMemo(() => {
    if (!searchTerm) return sortedData

    const lowerSearch = searchTerm.toLowerCase()
    return sortedData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(lowerSearch)
      )
    )
  }, [sortedData, searchTerm])

  // Column filters
  const filteredData = useMemo(() => {
    if (Object.keys(activeFilters).length === 0) return searchedData

    return searchedData.filter((row) =>
      Object.entries(activeFilters).every(([key, value]) => {
        if (!value) return true
        return String(row[key]).toLowerCase().includes(value.toLowerCase())
      })
    )
  }, [searchedData, activeFilters])

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm, activeFilters])

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortColumn(null)
        setSortDirection(null)
      }
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const handleFilterChange = (columnKey: string, value: string) => {
    setActiveFilters((prev) => {
      if (!value) {
        const { [columnKey]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [columnKey]: value }
    })
  }

  const clearFilters = () => {
    setActiveFilters({})
    setSearchTerm('')
  }

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4 text-gray-500" />
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4 text-blue-400" />
    ) : (
      <ChevronDown className="h-4 w-4 text-blue-400" />
    )
  }

  if (isLoading) {
    return <TableSkeleton columns={columns.length} rows={pageSize} />
  }

  const hasActiveFilters = searchTerm || Object.keys(activeFilters).length > 0

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {Object.keys(activeFilters).length > 0 && (
              <Badge className="ml-2 bg-blue-600 text-white">
                {Object.keys(activeFilters).length}
              </Badge>
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Column Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
              {columns
                .filter((col) => col.filterable)
                .map((col) => (
                  <div key={col.key}>
                    <label className="text-xs font-medium text-gray-400 mb-1 block">
                      {col.label}
                    </label>
                    <Input
                      placeholder={`Filter ${col.label.toLowerCase()}...`}
                      value={activeFilters[col.key] || ''}
                      onChange={(e) =>
                        handleFilterChange(col.key, e.target.value)
                      }
                      className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 text-sm"
                    />
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      <div className="text-sm text-gray-400">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of{' '}
        {filteredData.length} results
        {hasActiveFilters && ` (filtered from ${data.length} total)`}
      </div>

      {/* Table */}
      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className={`bg-gray-900 ${
                stickyHeader ? 'sticky top-0 z-10' : ''
              }`}
            >
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider ${
                      column.width || ''
                    }`}
                  >
                    {column.sortable ? (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="flex items-center space-x-1 hover:text-white transition-colors group"
                      >
                        <span>{column.label}</span>
                        <span className="opacity-50 group-hover:opacity-100 transition-opacity">
                          {getSortIcon(column.key)}
                        </span>
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-950 divide-y divide-gray-800">
              <AnimatePresence mode="wait">
                {paginatedData.length === 0 ? (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td
                      colSpan={columns.length}
                      className="px-4 py-12 text-center"
                    >
                      <div className="text-gray-500">
                        <p className="text-lg mb-2">{emptyMessage}</p>
                        {hasActiveFilters && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Clear filters
                          </Button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ) : (
                  paginatedData.map((row, idx) => (
                    <motion.tr
                      key={String(row[rowKey])}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.02 }}
                      onClick={() => onRowClick?.(row)}
                      className={`${
                        onRowClick
                          ? 'cursor-pointer hover:bg-gray-900/50'
                          : ''
                      } transition-colors`}
                    >
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className="px-4 py-3 text-sm text-gray-300"
                        >
                          {column.render
                            ? column.render(row[column.key], row)
                            : (row[column.key] as React.ReactNode)}
                        </td>
                      ))}
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {/* Page numbers */}
            <div className="hidden sm:flex items-center space-x-1">
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
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function TableSkeleton({ columns, rows }: { columns: number; rows: number }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <LoadingSkeleton className="h-10 w-64" />
        <LoadingSkeleton className="h-10 w-32" />
      </div>

      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <LoadingSkeleton className="h-4 w-24" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-950">
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i} className="border-t border-gray-800">
                {Array.from({ length: columns }).map((_, j) => (
                  <td key={j} className="px-4 py-3">
                    <LoadingSkeleton className="h-4 w-full" />
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
