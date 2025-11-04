'use client'

import * as React from 'react'
import { Search } from 'lucide-react'

export function GlobalSearch() {
  const [query, setQuery] = React.useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // TODO: Implement search functionality
    console.log('Searching for:', query)
  }

  return (
    <form onSubmit={handleSearch} className="position-relative">
      <div className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <Search className="h-4 w-4 color-neutral-600" />
      </div>
      <input
        type="search"
        placeholder="Search sites, issues, fixes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input-field small w-input"
        style={{ paddingLeft: '40px', minWidth: '280px' }}
      />
    </form>
  )
}
