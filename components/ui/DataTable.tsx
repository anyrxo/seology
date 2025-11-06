'use client'

import * as React from 'react'
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Input } from './input'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: unknown, row: T) => React.ReactNode
  width?: string
  align?: 'left' | 'right' | 'center'
  type?: 'text' | 'number' | 'date'
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (row: T) => void
  searchable?: boolean
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  mobileCardView?: boolean
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
  searchable = true,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No data available',
  className,
  mobileCardView = true,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 10
  const isMobile = useMediaQuery('(max-width: 767px)')

  // Filter data based on search
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data

    return data.filter((row) => {
      return columns.some((column) => {
        const value = row[column.key]
        if (value == null) return false
        return String(value).toLowerCase().includes(searchQuery.toLowerCase())
      })
    })
  }, [data, searchQuery, columns])

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey]
      const bValue = b[sortKey]

      if (aValue == null) return 1
      if (bValue == null) return -1

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }, [filteredData, sortKey, sortDirection])

  // Paginate data
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedData, currentPage])

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (columnKey: string) => {
    if (sortKey !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4 text-accessible-gray" aria-hidden="true" />
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4 text-blue-400" aria-label="Sorted ascending" />
    ) : (
      <ChevronDown className="h-4 w-4 text-blue-400" aria-label="Sorted descending" />
    )
  }

  // Determine column alignment based on type
  const getColumnAlignment = (column: Column<T>) => {
    if (column.align) return column.align
    if (column.type === 'number') return 'right'
    return 'left'
  }

  // Mobile Card View
  if (isMobile && mobileCardView) {
    return (
      <div className={cn('space-y-4', className)}>
        {searchable && (
          <div className="relative">
            <label htmlFor="table-search" className="sr-only">
              {searchPlaceholder}
            </label>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accessible-gray" aria-hidden="true" />
            <Input
              id="table-search"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 touch-target"
              aria-label={searchPlaceholder}
            />
          </div>
        )}

        {/* Mobile Card View */}
        <div className="space-y-4" role="list" aria-label="Data items">
          {paginatedData.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 text-center">
              <p className="text-sm text-accessible-gray">{emptyMessage}</p>
            </div>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <div
                key={rowIndex}
                role="listitem"
                className={cn(
                  'bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4',
                  'transition-all duration-200',
                  onRowClick && 'cursor-pointer hover:bg-white/10 active:scale-[0.98]'
                )}
                onClick={() => onRowClick?.(row)}
                onKeyDown={(e) => {
                  if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    onRowClick(row)
                  }
                }}
                tabIndex={onRowClick ? 0 : undefined}
              >
                {columns.map((column) => (
                  <div key={column.key} className="flex justify-between items-start py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm font-medium text-accessible-gray">{column.label}:</span>
                    <span className={cn(
                      'text-sm text-white',
                      getColumnAlignment(column) === 'right' && 'font-mono'
                    )}>
                      {column.render
                        ? (column.render(row[column.key], row) as React.ReactNode)
                        : String(row[column.key] ?? '')}
                    </span>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Mobile Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col gap-4">
            <div className="text-sm text-accessible-gray text-center">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, sortedData.length)} of{' '}
              {sortedData.length} results
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="touch-target"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <span className="text-sm text-white">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="touch-target"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Desktop Table View
  return (
    <div className={cn('space-y-4', className)}>
      {searchable && (
        <div className="relative">
          <label htmlFor="table-search" className="sr-only">
            {searchPlaceholder}
          </label>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accessible-gray" aria-hidden="true" />
          <Input
            id="table-search"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10"
            aria-label={searchPlaceholder}
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-800" role="region" aria-label="Data table">
        <table className="w-full" role="table">
          <thead className="bg-gray-900">
            <tr role="row">
              {columns.map((column) => (
                <th
                  key={column.key}
                  role="columnheader"
                  scope="col"
                  className={cn(
                    'px-6 py-3 text-xs font-medium uppercase tracking-wider text-accessible-gray',
                    column.sortable && 'cursor-pointer select-none hover:text-gray-200',
                    getColumnAlignment(column) === 'right' && 'text-right',
                    getColumnAlignment(column) === 'center' && 'text-center',
                    getColumnAlignment(column) === 'left' && 'text-left',
                    column.width
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                  onKeyDown={(e) => {
                    if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      handleSort(column.key)
                    }
                  }}
                  tabIndex={column.sortable ? 0 : undefined}
                  style={{ width: column.width }}
                  aria-sort={
                    sortKey === column.key
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  <div className={cn(
                    'flex items-center gap-2',
                    getColumnAlignment(column) === 'right' && 'justify-end',
                    getColumnAlignment(column) === 'center' && 'justify-center'
                  )}>
                    {column.label}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-950" role="rowgroup">
            {paginatedData.length === 0 ? (
              <tr role="row">
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-sm text-accessible-gray"
                  role="cell"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  role="row"
                  className={cn(
                    'transition-colors',
                    onRowClick && 'cursor-pointer hover:bg-gray-900 focus-within:bg-gray-900'
                  )}
                  onClick={() => onRowClick?.(row)}
                  onKeyDown={(e) => {
                    if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      onRowClick(row)
                    }
                  }}
                  tabIndex={onRowClick ? 0 : undefined}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      role="cell"
                      className={cn(
                        'px-6 py-4 text-sm text-gray-300',
                        getColumnAlignment(column) === 'right' && 'text-right table-cell-numeric',
                        getColumnAlignment(column) === 'center' && 'text-center'
                      )}
                    >
                      {column.render
                        ? (column.render(row[column.key], row) as React.ReactNode)
                        : String(row[column.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between" role="navigation" aria-label="Table pagination">
          <div className="text-sm text-accessible-gray" aria-live="polite">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, sortedData.length)} of{' '}
            {sortedData.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={page}
                      variant={(page === currentPage ? 'primary' : 'outline') as 'primary' | 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      aria-label={`Go to page ${page}`}
                      aria-current={page === currentPage ? 'page' : undefined}
                    >
                      {page}
                    </Button>
                  )
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-2 text-accessible-gray" aria-hidden="true">...</span>
                }
                return null
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
