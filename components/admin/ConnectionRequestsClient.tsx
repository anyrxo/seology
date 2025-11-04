'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ConnectionRequest {
  id: string
  userId: string
  userEmail: string
  userName: string | null
  userPlan: string
  platform: string
  storeUrl: string
  storeName: string | null
  message: string | null
  status: string
  oauthUrl: string | null
  connectionId: string | null
  rejectionReason: string | null
  reviewedBy: string | null
  reviewedAt: string | null
  createdAt: string
  updatedAt: string
}

interface ConnectionRequestsClientProps {
  requests: ConnectionRequest[]
}

export default function ConnectionRequestsClient({ requests }: ConnectionRequestsClientProps) {
  const router = useRouter()
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [processingId, setProcessingId] = useState<string | null>(null)

  const filteredRequests = requests.filter((req) => {
    if (selectedStatus === 'all') return true
    return req.status === selectedStatus
  })

  const handleApprove = async (requestId: string) => {
    if (!confirm('Generate OAuth link and notify customer?')) return

    setProcessingId(requestId)
    try {
      const res = await fetch(`/api/admin/connection-requests/${requestId}/approve`, {
        method: 'POST',
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to approve request')
      }

      alert('✅ OAuth link generated and customer notified!')
      router.refresh()
    } catch (error) {
      alert('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (requestId: string) => {
    const reason = prompt('Reason for rejection (optional):')
    if (reason === null) return // User cancelled

    setProcessingId(requestId)
    try {
      const res = await fetch(`/api/admin/connection-requests/${requestId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to reject request')
      }

      alert('Request rejected')
      router.refresh()
    } catch (error) {
      alert('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setProcessingId(null)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-500',
      APPROVED: 'bg-blue-500',
      LINK_SENT: 'bg-purple-500',
      CONNECTED: 'bg-green-500',
      REJECTED: 'bg-red-500',
      EXPIRED: 'bg-gray-500',
    }
    return colors[status] || 'bg-gray-500'
  }

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
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Connection Requests</h1>
        <p className="text-gray-400">Review and approve customer connection requests</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4 items-center">
        <label className="text-gray-400 text-sm">Filter by status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Requests</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="LINK_SENT">Link Sent</option>
          <option value="CONNECTED">Connected</option>
          <option value="REJECTED">Rejected</option>
          <option value="EXPIRED">Expired</option>
        </select>
        <div className="text-gray-400 text-sm ml-auto">
          {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-xl font-bold text-white mb-2">No requests found</h2>
          <p className="text-gray-400">
            {selectedStatus === 'all'
              ? 'No connection requests yet'
              : `No ${selectedStatus.toLowerCase()} requests`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between">
                {/* Left: Request Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{getPlatformEmoji(request.platform)}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {request.storeName || request.storeUrl}
                      </h3>
                      <p className="text-sm text-gray-400">{request.storeUrl}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Customer</div>
                      <div className="text-sm text-white">
                        {request.userName || request.userEmail}
                      </div>
                      <div className="text-xs text-gray-400">{request.userEmail}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Plan</div>
                      <div className="text-sm text-white">{request.userPlan}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Platform</div>
                      <div className="text-sm text-white">{request.platform}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Requested</div>
                      <div className="text-sm text-white">
                        {new Date(request.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {request.message && (
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">Message</div>
                      <div className="text-sm text-gray-300 bg-gray-900 p-3 rounded">
                        {request.message}
                      </div>
                    </div>
                  )}

                  {request.rejectionReason && (
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">Rejection Reason</div>
                      <div className="text-sm text-red-300 bg-red-900/20 p-3 rounded border border-red-900">
                        {request.rejectionReason}
                      </div>
                    </div>
                  )}

                  {request.oauthUrl && (
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">OAuth URL</div>
                      <div className="text-xs text-blue-400 bg-gray-900 p-2 rounded font-mono break-all">
                        {request.oauthUrl}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Status & Actions */}
                <div className="ml-6 flex flex-col items-end gap-3">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(request.status)}`}
                  >
                    {request.status}
                  </div>

                  {request.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        disabled={processingId === request.id}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                      >
                        {processingId === request.id ? 'Processing...' : '✅ Approve'}
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        disabled={processingId === request.id}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}

                  {request.status === 'APPROVED' && (
                    <div className="text-xs text-gray-400 text-right">
                      Waiting for customer authorization
                    </div>
                  )}

                  {request.status === 'CONNECTED' && request.connectionId && (
                    <a
                      href={`/admin/connections?id=${request.connectionId}`}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      View Connection →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
