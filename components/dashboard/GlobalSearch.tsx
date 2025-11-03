'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function GlobalSearch() {
  const [query, setQuery] = React.useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // TODO: Implement search functionality
    console.log('Searching for:', query)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        type="search"
        placeholder="Search sites, issues, fixes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-64 pl-10"
      />
    </form>
  )
}
