'use client'

import { useState } from 'react'

interface FilterOption {
  label: string
  value: string
}

interface SearchFilterProps {
  placeholder?: string
  filterLabel?: string
  filterOptions?: FilterOption[]
  onSearch?: (query: string) => void
  onFilter?: (value: string) => void
  showSort?: boolean
  sortOptions?: FilterOption[]
  onSort?: (value: string) => void
}

export default function SearchFilter({
  placeholder = 'Search...',
  filterLabel = 'Filter',
  filterOptions = [],
  onSearch,
  onFilter,
  showSort = false,
  sortOptions = [],
  onSort,
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [sortValue, setSortValue] = useState('')

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch?.(value)
  }

  const handleFilter = (value: string) => {
    setFilterValue(value)
    onFilter?.(value)
  }

  const handleSort = (value: string) => {
    setSortValue(value)
    onSort?.(value)
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      {filterOptions.length > 0 && (
        <div className="relative">
          <select
            value={filterValue}
            onChange={(e) => handleFilter(e.target.value)}
            className="appearance-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">{filterLabel}</option>
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}

      {/* Sort Dropdown */}
      {showSort && sortOptions.length > 0 && (
        <div className="relative">
          <select
            value={sortValue}
            onChange={(e) => handleSort(e.target.value)}
            className="appearance-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">Sort By</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
