'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle2, Clock, XCircle, Search } from 'lucide-react'

interface Issue {
  id: string
  type: string
  severity: string
  siteName: string
  status: string
  createdAt: string
  description: string
}

export default function IssuesManagementClient() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchIssues()
  }, [])

  const fetchIssues = async () => {
    try {
      const response = await fetch('/api/admin/issues')
      if (response.ok) {
        const data = await response.json()
        setIssues(data.issues || [])
      }
    } catch (error) {
      console.error('Error fetching issues:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredIssues = issues.filter(issue => {
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus
    const matchesSearch = issue.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.type.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: issues.length,
    active: issues.filter(i => i.status === 'ACTIVE').length,
    fixed: issues.filter(i => i.status === 'FIXED').length,
    ignored: issues.filter(i => i.status === 'IGNORED').length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-200 color-neutral-600">Loading issues...</div>
      </div>
    )
  }

  return (
    <div className="pd-global">
      <div className="container-default w-container">
        <div className="mg-bottom-32px">
          <h1 className="display-1 bold color-neutral-900 mg-bottom-16px">
            Issues Management
          </h1>
          <p className="text-200 color-neutral-600">
            Monitor and manage all SEO issues across all sites
          </p>
        </div>

        <div className="grid-4-columns _1-column-tablet gap-column-24px mg-bottom-32px">
          <div className="card pd-24px">
            <div className="flex-horizontal align-center gap-column-12px mg-bottom-12px">
              <div className="card-icon-square _26px neutral-icon">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="text-100 medium color-neutral-600">Total Issues</div>
            </div>
            <div className="display-2 color-neutral-900">{stats.total}</div>
          </div>

          <div className="card pd-24px">
            <div className="flex-horizontal align-center gap-column-12px mg-bottom-12px">
              <div className="card-icon-square _26px">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="text-100 medium color-neutral-600">Active</div>
            </div>
            <div className="display-2 color-neutral-900">{stats.active}</div>
          </div>

          <div className="card pd-24px">
            <div className="flex-horizontal align-center gap-column-12px mg-bottom-12px">
              <div className="card-icon-square _26px">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-100 medium color-neutral-600">Fixed</div>
            </div>
            <div className="display-2 color-neutral-900">{stats.fixed}</div>
          </div>

          <div className="card pd-24px">
            <div className="flex-horizontal align-center gap-column-12px mg-bottom-12px">
              <div className="card-icon-square _26px neutral-icon">
                <XCircle className="w-4 h-4" />
              </div>
              <div className="text-100 medium color-neutral-600">Ignored</div>
            </div>
            <div className="display-2 color-neutral-900">{stats.ignored}</div>
          </div>
        </div>

        <div className="card pd-24px mg-bottom-24px">
          <div className="flex-horizontal gap-column-16px">
            <div className="flex-1">
              <div className="position-relative">
                <Search className="w-4 h-4 position-absolute" />
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rt-footer-newsletter-input w-full"
                />
              </div>
            </div>

            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rt-footer-newsletter-input"
              >
                <option value="all">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="FIXED">Fixed</option>
                <option value="IGNORED">Ignored</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card pd-0">
          <div className="w-full">
            {filteredIssues.length === 0 ? (
              <div className="pd-32px text-center">
                <div className="text-200 color-neutral-600">No issues found</div>
              </div>
            ) : (
              <div className="pd-24px">
                {filteredIssues.map((issue) => (
                  <div key={issue.id} className="card pd-16px mg-bottom-16px">
                    <div className="text-100 medium color-neutral-800">{issue.type}</div>
                    <div className="text-100 color-neutral-600">{issue.siteName}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
