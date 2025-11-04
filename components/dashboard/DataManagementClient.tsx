'use client'

import { useState } from 'react'
import { Pencil, Trash2, Plus, Search, RefreshCw, Eye, EyeOff } from 'lucide-react'
import { DataTable, Column } from '@/components/ui/DataTable'
import Modal from '@/components/ui/Modal'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Connection extends Record<string, unknown> {
  id: string
  platform: string
  domain: string
  displayName: string | null
  status: string
  createdAt: Date
  lastSync: Date | null
  healthStatus: string
  pageCount: number
  issueCount: number
  hasCredentials: boolean
}

interface Issue extends Record<string, unknown> {
  id: string
  connectionId: string
  siteName: string
  type: string
  title: string
  severity: string
  status: string
  pageUrl: string
  detectedAt: Date
}

interface Fix extends Record<string, unknown> {
  id: string
  connectionId: string
  siteName: string
  description: string
  status: string
  method: string
  appliedAt: Date | null
  createdAt: Date
  canRollback: boolean
}

interface DataManagementClientProps {
  connections: Connection[]
  issues: Issue[]
  fixes: Fix[]
}

type TabType = 'connections' | 'issues' | 'fixes'

export function DataManagementClient({
  connections,
  issues,
  fixes,
}: DataManagementClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('connections')
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null)
  const [deletingConnection, setDeletingConnection] = useState<Connection | null>(null)
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null)
  const [deletingIssue, setDeletingIssue] = useState<Issue | null>(null)
  const [rollingBackFix, setRollingBackFix] = useState<Fix | null>(null)
  const [loading, setLoading] = useState(false)

  // Edit Connection Modal State
  const [editDisplayName, setEditDisplayName] = useState('')
  const [editDomain, setEditDomain] = useState('')
  const [editCredentials, setEditCredentials] = useState('')
  const [showCredentials, setShowCredentials] = useState(false)

  // Edit Issue Modal State
  const [editIssueStatus, setEditIssueStatus] = useState('')

  const handleEditConnection = (connection: Connection) => {
    setEditingConnection(connection)
    setEditDisplayName(connection.displayName || '')
    setEditDomain(connection.domain)
    setEditCredentials('')
    setShowCredentials(false)
  }

  const handleSaveConnection = async () => {
    if (!editingConnection) return

    setLoading(true)
    try {
      const body: Record<string, unknown> = {
        displayName: editDisplayName,
        domain: editDomain,
      }

      // Only include credentials if they were changed
      if (editCredentials.trim()) {
        try {
          body.credentials = JSON.parse(editCredentials)
        } catch {
          alert('Invalid JSON format for credentials')
          setLoading(false)
          return
        }
      }

      const response = await fetch(`/api/sites/${editingConnection.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setEditingConnection(null)
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to update connection')
      }
    } catch (error) {
      console.error('Error updating connection:', error)
      alert('Failed to update connection')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteConnection = async () => {
    if (!deletingConnection) return

    setLoading(true)
    try {
      const response = await fetch(`/api/sites/${deletingConnection.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setDeletingConnection(null)
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete connection')
      }
    } catch (error) {
      console.error('Error deleting connection:', error)
      alert('Failed to delete connection')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateIssueStatus = async () => {
    if (!editingIssue) return

    setLoading(true)
    try {
      const response = await fetch(`/api/issues/${editingIssue.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: editIssueStatus }),
      })

      if (response.ok) {
        setEditingIssue(null)
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to update issue')
      }
    } catch (error) {
      console.error('Error updating issue:', error)
      alert('Failed to update issue')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteIssue = async () => {
    if (!deletingIssue) return

    setLoading(true)
    try {
      const response = await fetch(`/api/issues/${deletingIssue.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setDeletingIssue(null)
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete issue')
      }
    } catch (error) {
      console.error('Error deleting issue:', error)
      alert('Failed to delete issue')
    } finally {
      setLoading(false)
    }
  }

  const handleRollbackFix = async () => {
    if (!rollingBackFix) return

    setLoading(true)
    try {
      const response = await fetch(`/api/fixes/${rollingBackFix.id}/rollback`, {
        method: 'POST',
      })

      if (response.ok) {
        setRollingBackFix(null)
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to rollback fix')
      }
    } catch (error) {
      console.error('Error rolling back fix:', error)
      alert('Failed to rollback fix')
    } finally {
      setLoading(false)
    }
  }

  // Connection columns
  const connectionColumns: Column<Connection>[] = [
    {
      key: 'displayName',
      label: 'Name',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <div className="text-lg">{getPlatformEmoji(row.platform)}</div>
          <div>
            <div className="font-medium text-white">{row.displayName || row.domain}</div>
            <div className="text-xs text-gray-400">{row.domain}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'platform',
      label: 'Platform',
      sortable: true,
      render: (value) => (
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-700/30">
          {value as string}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const status = value as string
        const config = {
          CONNECTED: { bg: 'bg-green-900/30', text: 'text-green-400', border: 'border-green-700/30' },
          PENDING: { bg: 'bg-yellow-900/30', text: 'text-yellow-400', border: 'border-yellow-700/30' },
          ERROR: { bg: 'bg-red-900/30', text: 'text-red-400', border: 'border-red-700/30' },
          DISCONNECTED: { bg: 'bg-gray-900/30', text: 'text-gray-400', border: 'border-gray-700/30' },
        }[status] || { bg: 'bg-gray-900/30', text: 'text-gray-400', border: 'border-gray-700/30' }

        return (
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text} border ${config.border}`}>
            {status}
          </span>
        )
      },
    },
    {
      key: 'pageCount',
      label: 'Pages',
      sortable: true,
      render: (value) => <span className="text-gray-300">{value as number}</span>,
    },
    {
      key: 'issueCount',
      label: 'Issues',
      sortable: true,
      render: (value) => <span className="text-gray-300">{value as number}</span>,
    },
    {
      key: 'createdAt',
      label: 'Connected',
      sortable: true,
      render: (value) => (
        <span className="text-gray-400 text-sm">
          {new Date(value as Date).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'id',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleEditConnection(row)
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setDeletingConnection(row)
            }}
          >
            <Trash2 className="h-4 w-4 text-red-400" />
          </Button>
        </div>
      ),
    },
  ]

  // Issue columns
  const issueColumns: Column<Issue>[] = [
    {
      key: 'siteName',
      label: 'Site',
      sortable: true,
      render: (value) => <span className="font-medium text-white">{value as string}</span>,
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value) => (
        <span className="text-gray-300 text-sm">
          {(value as string).replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (value) => (
        <div className="max-w-xs truncate text-gray-300" title={value as string}>
          {value as string}
        </div>
      ),
    },
    {
      key: 'severity',
      label: 'Severity',
      sortable: true,
      render: (value) => {
        const severity = value as string
        const config = {
          CRITICAL: { bg: 'bg-red-900/30', text: 'text-red-400', border: 'border-red-700/30' },
          HIGH: { bg: 'bg-orange-900/30', text: 'text-orange-400', border: 'border-orange-700/30' },
          MEDIUM: { bg: 'bg-yellow-900/30', text: 'text-yellow-400', border: 'border-yellow-700/30' },
          LOW: { bg: 'bg-blue-900/30', text: 'text-blue-400', border: 'border-blue-700/30' },
        }[severity] || { bg: 'bg-gray-900/30', text: 'text-gray-400', border: 'border-gray-700/30' }

        return (
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text} border ${config.border}`}>
            {severity}
          </span>
        )
      },
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const status = value as string
        const config = {
          OPEN: { bg: 'bg-blue-900/30', text: 'text-blue-400', border: 'border-blue-700/30' },
          DETECTED: { bg: 'bg-purple-900/30', text: 'text-purple-400', border: 'border-purple-700/30' },
          IN_PROGRESS: { bg: 'bg-yellow-900/30', text: 'text-yellow-400', border: 'border-yellow-700/30' },
          FIXING: { bg: 'bg-yellow-900/30', text: 'text-yellow-400', border: 'border-yellow-700/30' },
          FIXED: { bg: 'bg-green-900/30', text: 'text-green-400', border: 'border-green-700/30' },
          FAILED: { bg: 'bg-red-900/30', text: 'text-red-400', border: 'border-red-700/30' },
          IGNORED: { bg: 'bg-gray-900/30', text: 'text-gray-400', border: 'border-gray-700/30' },
        }[status] || { bg: 'bg-gray-900/30', text: 'text-gray-400', border: 'border-gray-700/30' }

        return (
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text} border ${config.border}`}>
            {status}
          </span>
        )
      },
    },
    {
      key: 'detectedAt',
      label: 'Detected',
      sortable: true,
      render: (value) => (
        <span className="text-gray-400 text-sm">
          {new Date(value as Date).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'id',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setEditingIssue(row)
              setEditIssueStatus(row.status)
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setDeletingIssue(row)
            }}
          >
            <Trash2 className="h-4 w-4 text-red-400" />
          </Button>
        </div>
      ),
    },
  ]

  // Fix columns
  const fixColumns: Column<Fix>[] = [
    {
      key: 'siteName',
      label: 'Site',
      sortable: true,
      render: (value) => <span className="font-medium text-white">{value as string}</span>,
    },
    {
      key: 'description',
      label: 'Fix',
      sortable: true,
      render: (value) => (
        <div className="max-w-md truncate text-gray-300" title={value as string}>
          {value as string}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const status = value as string
        const config = {
          PENDING: { bg: 'bg-yellow-900/30', text: 'text-yellow-400', border: 'border-yellow-700/30' },
          APPLIED: { bg: 'bg-green-900/30', text: 'text-green-400', border: 'border-green-700/30' },
          ROLLED_BACK: { bg: 'bg-blue-900/30', text: 'text-blue-400', border: 'border-blue-700/30' },
          FAILED: { bg: 'bg-red-900/30', text: 'text-red-400', border: 'border-red-700/30' },
        }[status] || { bg: 'bg-gray-900/30', text: 'text-gray-400', border: 'border-gray-700/30' }

        return (
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text} border ${config.border}`}>
            {status}
          </span>
        )
      },
    },
    {
      key: 'method',
      label: 'Method',
      sortable: true,
      render: (value) => (
        <span className="text-gray-300 text-sm capitalize">{(value as string).toLowerCase()}</span>
      ),
    },
    {
      key: 'appliedAt',
      label: 'Applied',
      sortable: true,
      render: (value) => (
        <span className="text-gray-400 text-sm">
          {value ? new Date(value as Date).toLocaleDateString() : 'Not applied'}
        </span>
      ),
    },
    {
      key: 'id',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.canRollback && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setRollingBackFix(row)
              }}
              title="Rollback this fix"
            >
              <RefreshCw className="h-4 w-4 text-blue-400" />
            </Button>
          )}
        </div>
      ),
    },
  ]

  const getPlatformEmoji = (platform: string) => {
    const emojis: Record<string, string> = {
      SHOPIFY: '🛍️',
      WORDPRESS: '📝',
      WIX: '🎨',
      CUSTOM: '⚡',
    }
    return emojis[platform] || '🌐'
  }

  return (
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header */}
        <div className="rt-component-section">
          <div className="w-layout-hflex flex-horizontal space-between align-center mg-bottom-24px">
            <div className="flex-horizontal gap-column-16px align-center">
              <div className="card-icon-square _40px">
                <div className="text-300">📊</div>
              </div>
              <div className="flex-vertical">
                <h1 className="rt-component-heading-two text-500 bold color-neutral-800">
                  Data Management
                </h1>
                <p className="rt-text-block text-200 color-neutral-600">
                  View, edit, and manage all your data
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.push('/dashboard/sites/connect')}
              className="btn-primary large rt-button-font"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Site
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="card pd-24px">
          <div className="flex gap-4 border-b border-gray-800 mb-6">
            <button
              onClick={() => setActiveTab('connections')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'connections'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Connections ({connections.length})
            </button>
            <button
              onClick={() => setActiveTab('issues')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'issues'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Issues ({issues.length})
            </button>
            <button
              onClick={() => setActiveTab('fixes')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'fixes'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Fixes Applied ({fixes.length})
            </button>
          </div>

          {/* Tables */}
          {activeTab === 'connections' && (
            <DataTable
              data={connections}
              columns={connectionColumns}
              searchPlaceholder="Search connections..."
              emptyMessage="No connections found. Connect your first site to get started."
            />
          )}

          {activeTab === 'issues' && (
            <DataTable
              data={issues}
              columns={issueColumns}
              searchPlaceholder="Search issues..."
              emptyMessage="No issues found."
            />
          )}

          {activeTab === 'fixes' && (
            <DataTable
              data={fixes}
              columns={fixColumns}
              searchPlaceholder="Search fixes..."
              emptyMessage="No fixes applied yet."
            />
          )}
        </div>
      </div>

      {/* Edit Connection Modal */}
      <Modal
        isOpen={!!editingConnection}
        onClose={() => setEditingConnection(null)}
        title="Edit Connection"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Display Name
            </label>
            <Input
              value={editDisplayName}
              onChange={(e) => setEditDisplayName(e.target.value)}
              placeholder="My Store"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Domain
            </label>
            <Input
              value={editDomain}
              onChange={(e) => setEditDomain(e.target.value)}
              placeholder="example.com"
              className="w-full"
              disabled
            />
            <p className="text-xs text-gray-400 mt-1">Domain cannot be changed</p>
          </div>

          {editingConnection?.hasCredentials && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Update Credentials (Optional)
              </label>
              <div className="relative">
                <textarea
                  value={editCredentials}
                  onChange={(e) => setEditCredentials(e.target.value)}
                  placeholder='{"username": "admin", "password": "..."}'
                  className="w-full min-h-[100px] px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  style={{ fontFamily: 'monospace' }}
                />
                <button
                  type="button"
                  onClick={() => setShowCredentials(!showCredentials)}
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-300"
                >
                  {showCredentials ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Leave empty to keep existing credentials. Format: JSON object
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setEditingConnection(null)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveConnection}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Connection Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingConnection}
        onClose={() => setDeletingConnection(null)}
        onConfirm={handleDeleteConnection}
        title="Delete Connection"
        message={`Are you sure you want to delete "${deletingConnection?.displayName || deletingConnection?.domain}"? This will permanently delete all associated issues, fixes, and metrics. This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        loading={loading}
      />

      {/* Edit Issue Modal */}
      <Modal
        isOpen={!!editingIssue}
        onClose={() => setEditingIssue(null)}
        title="Update Issue Status"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Issue Title
            </label>
            <p className="text-gray-400">{editingIssue?.title}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={editIssueStatus}
              onChange={(e) => setEditIssueStatus(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="OPEN">Open</option>
              <option value="DETECTED">Detected</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="FIXING">Fixing</option>
              <option value="FIXED">Fixed</option>
              <option value="FAILED">Failed</option>
              <option value="IGNORED">Ignored</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setEditingIssue(null)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateIssueStatus}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Updating...' : 'Update Status'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Issue Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingIssue}
        onClose={() => setDeletingIssue(null)}
        onConfirm={handleDeleteIssue}
        title="Delete Issue"
        message={`Are you sure you want to delete this issue: "${deletingIssue?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        loading={loading}
      />

      {/* Rollback Fix Confirmation */}
      <ConfirmDialog
        isOpen={!!rollingBackFix}
        onClose={() => setRollingBackFix(null)}
        onConfirm={handleRollbackFix}
        title="Rollback Fix"
        message={`Are you sure you want to rollback this fix: "${rollingBackFix?.description}"? This will revert the changes made to your site.`}
        confirmText="Rollback"
        variant="warning"
        loading={loading}
      />
    </div>
  )
}
