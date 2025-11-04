'use client'

import { useState, useEffect } from 'react'
import { Send, Users, Calendar, BarChart3, Clock, CheckCircle, XCircle, Loader2, Eye, Save, Trash2, MessageSquare } from 'lucide-react'

interface Broadcast {
  id: string
  type: string
  title: string
  message: string
  richMessage?: string
  actionUrl?: string
  actionText?: string
  targetAudience: string
  targetPlans: string
  targetRoles: string
  targetUserIds: string
  scheduledFor?: string
  sendImmediately: boolean
  status: string
  sentAt?: string
  recipientCount: number
  deliveredCount: number
  openedCount: number
  clickedCount: number
  isTemplate: boolean
  templateName?: string
  createdAt: string
}

interface BroadcastStats {
  summary: {
    totalBroadcasts: number
    draftCount: number
    scheduledCount: number
    sentCount: number
    failedCount: number
    totalRecipients: number
    totalDelivered: number
    deliveryRate: number
  }
  recentBroadcasts: Array<{
    id: string
    title: string
    type: string
    sentAt: string
    recipientCount: number
    deliveredCount: number
  }>
}

interface FormData {
  type: string
  title: string
  message: string
  richMessage: string
  actionUrl: string
  actionText: string
  targetAudience: string
  targetPlans: string[]
  targetRoles: string[]
  sendImmediately: boolean
  scheduledFor: string
  isTemplate: boolean
  templateName: string
}

const NOTIFICATION_TYPES = [
  { value: 'INFO', label: 'Info', color: 'blue', icon: '💡' },
  { value: 'SUCCESS', label: 'Success', color: 'green', icon: '✅' },
  { value: 'WARNING', label: 'Warning', color: 'orange', icon: '⚠️' },
  { value: 'ERROR', label: 'Error', color: 'red', icon: '❌' },
]

const TEMPLATE_LIBRARY = [
  {
    name: 'New Feature Announcement',
    type: 'INFO',
    title: 'Exciting New Feature: [Feature Name]',
    message: 'We\'re thrilled to announce [feature name]! This new feature will help you [benefit]. Check it out now!',
  },
  {
    name: 'Maintenance Notice',
    type: 'WARNING',
    title: 'Scheduled Maintenance',
    message: 'We\'ll be performing system maintenance on [date] from [time] to [time]. During this time, the platform may be unavailable.',
  },
  {
    name: 'Security Update',
    type: 'ERROR',
    title: 'Important Security Update',
    message: 'We\'ve detected unusual activity. Please review your account settings and ensure your password is secure.',
  },
  {
    name: 'Welcome Message',
    type: 'SUCCESS',
    title: 'Welcome to SEOLOGY.AI!',
    message: 'Thanks for joining us! We\'re excited to help you optimize your SEO. Get started by connecting your first site.',
  },
]

export default function BroadcastClient() {
  const [activeTab, setActiveTab] = useState<'compose' | 'history' | 'analytics'>('compose')
  const [formData, setFormData] = useState<FormData>({
    type: 'INFO',
    title: '',
    message: '',
    richMessage: '',
    actionUrl: '',
    actionText: '',
    targetAudience: 'all',
    targetPlans: [],
    targetRoles: [],
    sendImmediately: true,
    scheduledFor: '',
    isTemplate: false,
    templateName: '',
  })
  const [recipientCount, setRecipientCount] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([])
  const [stats, setStats] = useState<BroadcastStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [loadingRecipientCount, setLoadingRecipientCount] = useState(false)

  // Fetch broadcasts and stats
  useEffect(() => {
    fetchBroadcasts()
    fetchStats()
  }, [])

  // Calculate recipient count when targeting changes
  useEffect(() => {
    calculateRecipientCount()
  }, [formData.targetAudience, formData.targetPlans, formData.targetRoles])

  const fetchBroadcasts = async () => {
    try {
      const res = await fetch('/api/admin/broadcasts')
      const data = await res.json()
      if (data.success) {
        setBroadcasts(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch broadcasts:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/broadcasts/stats')
      const data = await res.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const calculateRecipientCount = async () => {
    setLoadingRecipientCount(true)
    try {
      const params = new URLSearchParams({
        audience: formData.targetAudience,
        plans: JSON.stringify(formData.targetPlans),
        roles: JSON.stringify(formData.targetRoles),
      })

      // For now, use a simple estimate based on audience type
      // In production, you'd call an API endpoint to get the exact count
      let count = 0
      if (formData.targetAudience === 'all') {
        count = 1500 // Example: total user count
      } else if (formData.targetAudience === 'plan') {
        count = formData.targetPlans.length * 300 // Estimate per plan
      } else if (formData.targetAudience === 'role') {
        count = formData.targetRoles.includes('ADMIN') ? 5 : 1495
      }

      setRecipientCount(count)
    } catch (error) {
      console.error('Failed to calculate recipient count:', error)
      setRecipientCount(0)
    } finally {
      setLoadingRecipientCount(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.sendImmediately) {
      // Save as draft or schedule
      await saveBroadcast()
    } else {
      // Show confirmation modal
      setShowConfirmModal(true)
    }
  }

  const saveBroadcast = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/broadcasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          targetPlans: JSON.stringify(formData.targetPlans),
          targetRoles: JSON.stringify(formData.targetRoles),
        }),
      })

      const data = await res.json()

      if (data.success) {
        alert(formData.sendImmediately ? 'Broadcast saved as draft' : 'Broadcast scheduled successfully')
        resetForm()
        fetchBroadcasts()
      } else {
        alert('Failed to save broadcast: ' + data.error.message)
      }
    } catch (error) {
      console.error('Failed to save broadcast:', error)
      alert('Failed to save broadcast')
    } finally {
      setLoading(false)
    }
  }

  const sendBroadcast = async () => {
    setSending(true)
    setShowConfirmModal(false)

    try {
      // First create the broadcast
      const createRes = await fetch('/api/admin/broadcasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          targetPlans: JSON.stringify(formData.targetPlans),
          targetRoles: JSON.stringify(formData.targetRoles),
        }),
      })

      const createData = await createRes.json()

      if (!createData.success) {
        throw new Error(createData.error.message)
      }

      // Then send it
      const sendRes = await fetch(`/api/admin/broadcasts/${createData.data.id}/send`, {
        method: 'POST',
      })

      const sendData = await sendRes.json()

      if (sendData.success) {
        alert(`Broadcast sent successfully to ${sendData.meta.recipientCount} users!`)
        resetForm()
        fetchBroadcasts()
        fetchStats()
      } else {
        throw new Error(sendData.error.message)
      }
    } catch (error) {
      console.error('Failed to send broadcast:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert('Failed to send broadcast: ' + errorMessage)
    } finally {
      setSending(false)
    }
  }

  const sendExistingBroadcast = async (id: string) => {
    if (!confirm('Are you sure you want to send this broadcast?')) return

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/broadcasts/${id}/send`, {
        method: 'POST',
      })

      const data = await res.json()

      if (data.success) {
        alert(`Broadcast sent to ${data.meta.recipientCount} users!`)
        fetchBroadcasts()
        fetchStats()
      } else {
        alert('Failed to send: ' + data.error.message)
      }
    } catch (error) {
      console.error('Failed to send broadcast:', error)
      alert('Failed to send broadcast')
    } finally {
      setLoading(false)
    }
  }

  const deleteBroadcast = async (id: string) => {
    if (!confirm('Are you sure you want to delete this broadcast?')) return

    try {
      const res = await fetch(`/api/admin/broadcasts/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (data.success) {
        fetchBroadcasts()
      } else {
        alert('Failed to delete: ' + data.error.message)
      }
    } catch (error) {
      console.error('Failed to delete broadcast:', error)
      alert('Failed to delete broadcast')
    }
  }

  const applyTemplate = (template: typeof TEMPLATE_LIBRARY[0]) => {
    setFormData({
      ...formData,
      type: template.type,
      title: template.title,
      message: template.message,
    })
  }

  const resetForm = () => {
    setFormData({
      type: 'INFO',
      title: '',
      message: '',
      richMessage: '',
      actionUrl: '',
      actionText: '',
      targetAudience: 'all',
      targetPlans: [],
      targetRoles: [],
      sendImmediately: true,
      scheduledFor: '',
      isTemplate: false,
      templateName: '',
    })
  }

  const typeConfig = NOTIFICATION_TYPES.find(t => t.value === formData.type) || NOTIFICATION_TYPES[0]

  return (
    <div className="flex-vertical gap-row-32px">
      {/* Header with Stats */}
      <div className="flex-horizontal space-between align-center">
        <div className="flex-vertical gap-row-8px">
          <h1 className="display-2 color-neutral-800">Broadcast Center</h1>
          <p className="text-200 color-neutral-600">
            Send platform-wide announcements and notifications to users
          </p>
        </div>

        {stats && (
          <div className="flex-horizontal gap-column-16px">
            <div className="card pd-16px" style={{ minWidth: '120px' }}>
              <div className="text-50 medium color-neutral-600 mg-bottom-4px">Total Sent</div>
              <div className="text-400 bold color-neutral-800">{stats.summary.sentCount}</div>
            </div>
            <div className="card pd-16px" style={{ minWidth: '120px' }}>
              <div className="text-50 medium color-neutral-600 mg-bottom-4px">Recipients</div>
              <div className="text-400 bold color-neutral-800">{stats.summary.totalRecipients.toLocaleString()}</div>
            </div>
            <div className="card pd-16px" style={{ minWidth: '120px' }}>
              <div className="text-50 medium color-neutral-600 mg-bottom-4px">Delivery Rate</div>
              <div className="text-400 bold color-neutral-800">{stats.summary.deliveryRate.toFixed(1)}%</div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="card-tabs-horizontal">
        <button
          onClick={() => setActiveTab('compose')}
          className={`card-tab ${activeTab === 'compose' ? 'active' : ''}`}
        >
          <MessageSquare className="h-4 w-4" style={{ marginRight: '8px' }} />
          Compose
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`card-tab ${activeTab === 'history' ? 'active' : ''}`}
        >
          <Clock className="h-4 w-4" style={{ marginRight: '8px' }} />
          History
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`card-tab ${activeTab === 'analytics' ? 'active' : ''}`}
        >
          <BarChart3 className="h-4 w-4" style={{ marginRight: '8px' }} />
          Analytics
        </button>
      </div>

      {/* Compose Tab */}
      {activeTab === 'compose' && (
        <div className="grid-2-columns _1-column-mbl gap-row-24px gap-column-24px">
          {/* Left Column - Composer */}
          <div className="flex-vertical gap-row-24px">
            {/* Template Library */}
            <div className="card pd-24px">
              <h3 className="text-300 bold color-neutral-800 mg-bottom-16px">Quick Templates</h3>
              <div className="grid-2-columns gap-column-12px gap-row-12px">
                {TEMPLATE_LIBRARY.map((template, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyTemplate(template)}
                    className="card pd-16px hover-card-link text-left"
                  >
                    <div className="text-100 bold color-neutral-800 mg-bottom-4px">{template.name}</div>
                    <div className="text-50 color-neutral-600">{template.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Broadcast Form */}
            <form onSubmit={handleSubmit} className="card pd-32px---44px flex-vertical gap-row-24px">
              {/* Notification Type */}
              <div>
                <label className="text-100 medium color-neutral-800 mg-bottom-12px" style={{ display: 'block' }}>
                  Notification Type
                </label>
                <div className="grid-4-columns gap-column-12px">
                  {NOTIFICATION_TYPES.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.value })}
                      className={`card pd-16px hover-card-link ${
                        formData.type === type.value ? 'border-accent-1' : ''
                      }`}
                      style={{
                        border: formData.type === type.value ? '2px solid var(--accent--primary-1)' : undefined,
                      }}
                    >
                      <div className="text-300 mg-bottom-4px">{type.icon}</div>
                      <div className="text-50 medium color-neutral-700">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-100 medium color-neutral-800 mg-bottom-12px" style={{ display: 'block' }}>
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input large"
                  placeholder="Enter notification title"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-100 medium color-neutral-800 mg-bottom-12px" style={{ display: 'block' }}>
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input large"
                  rows={5}
                  placeholder="Enter notification message"
                  required
                  style={{ resize: 'vertical' }}
                />
                <div className="text-50 color-neutral-600 mg-top-8px">
                  {formData.message.length} characters
                </div>
              </div>

              {/* Action URL (Optional) */}
              <div>
                <label className="text-100 medium color-neutral-800 mg-bottom-12px" style={{ display: 'block' }}>
                  Action URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.actionUrl}
                  onChange={(e) => setFormData({ ...formData, actionUrl: e.target.value })}
                  className="input large"
                  placeholder="/dashboard/settings"
                />
              </div>

              {/* Action Button Text */}
              {formData.actionUrl && (
                <div>
                  <label className="text-100 medium color-neutral-800 mg-bottom-12px" style={{ display: 'block' }}>
                    Action Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.actionText}
                    onChange={(e) => setFormData({ ...formData, actionText: e.target.value })}
                    className="input large"
                    placeholder="View Details"
                  />
                </div>
              )}

              {/* Target Audience */}
              <div>
                <label className="text-100 medium color-neutral-800 mg-bottom-12px" style={{ display: 'block' }}>
                  Target Audience
                </label>
                <div className="flex-vertical gap-row-12px">
                  <label className="flex-horizontal align-center gap-column-12px">
                    <input
                      type="radio"
                      name="audience"
                      value="all"
                      checked={formData.targetAudience === 'all'}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value, targetPlans: [], targetRoles: [] })}
                      className="radio"
                    />
                    <span className="text-200 medium color-neutral-800">All Users</span>
                  </label>
                  <label className="flex-horizontal align-center gap-column-12px">
                    <input
                      type="radio"
                      name="audience"
                      value="plan"
                      checked={formData.targetAudience === 'plan'}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value, targetRoles: [] })}
                      className="radio"
                    />
                    <span className="text-200 medium color-neutral-800">Specific Plan(s)</span>
                  </label>
                  <label className="flex-horizontal align-center gap-column-12px">
                    <input
                      type="radio"
                      name="audience"
                      value="role"
                      checked={formData.targetAudience === 'role'}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value, targetPlans: [] })}
                      className="radio"
                    />
                    <span className="text-200 medium color-neutral-800">Specific Role(s)</span>
                  </label>
                </div>
              </div>

              {/* Plan Selection */}
              {formData.targetAudience === 'plan' && (
                <div>
                  <label className="text-100 medium color-neutral-800 mg-bottom-12px" style={{ display: 'block' }}>
                    Select Plans
                  </label>
                  <div className="flex-vertical gap-row-12px">
                    {['STARTER', 'GROWTH', 'SCALE'].map((plan) => (
                      <label key={plan} className="flex-horizontal align-center gap-column-12px">
                        <input
                          type="checkbox"
                          checked={formData.targetPlans.includes(plan)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, targetPlans: [...formData.targetPlans, plan] })
                            } else {
                              setFormData({ ...formData, targetPlans: formData.targetPlans.filter(p => p !== plan) })
                            }
                          }}
                          className="checkbox"
                        />
                        <span className="text-200 medium color-neutral-800">{plan}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Role Selection */}
              {formData.targetAudience === 'role' && (
                <div>
                  <label className="text-100 medium color-neutral-800 mg-bottom-12px" style={{ display: 'block' }}>
                    Select Roles
                  </label>
                  <div className="flex-vertical gap-row-12px">
                    {['USER', 'ADMIN'].map((role) => (
                      <label key={role} className="flex-horizontal align-center gap-column-12px">
                        <input
                          type="checkbox"
                          checked={formData.targetRoles.includes(role)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, targetRoles: [...formData.targetRoles, role] })
                            } else {
                              setFormData({ ...formData, targetRoles: formData.targetRoles.filter(r => r !== role) })
                            }
                          }}
                          className="checkbox"
                        />
                        <span className="text-200 medium color-neutral-800">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Recipient Count */}
              <div className="card pd-16px" style={{ background: 'var(--accent--primary-1)', color: 'white' }}>
                <div className="flex-horizontal align-center gap-column-12px">
                  <Users className="h-5 w-5" />
                  <div>
                    <div className="text-50 medium" style={{ opacity: 0.9 }}>Estimated Recipients</div>
                    <div className="text-300 bold">
                      {loadingRecipientCount ? 'Calculating...' : recipientCount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Options */}
              <div>
                <label className="flex-horizontal align-center gap-column-12px mg-bottom-12px">
                  <input
                    type="checkbox"
                    checked={!formData.sendImmediately}
                    onChange={(e) => setFormData({ ...formData, sendImmediately: !e.target.checked })}
                    className="checkbox"
                  />
                  <span className="text-200 medium color-neutral-800">Schedule for later</span>
                </label>

                {!formData.sendImmediately && (
                  <input
                    type="datetime-local"
                    value={formData.scheduledFor}
                    onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                    className="input large"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                )}
              </div>

              {/* Actions */}
              <div className="flex-horizontal gap-column-12px">
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="btn-secondary large"
                  style={{ flex: 1 }}
                >
                  <Eye className="h-5 w-5" style={{ marginRight: '8px' }} />
                  Preview
                </button>
                {!formData.sendImmediately && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-secondary large"
                    style={{ flex: 1 }}
                  >
                    <Save className="h-5 w-5" style={{ marginRight: '8px' }} />
                    {loading ? 'Saving...' : 'Save Draft'}
                  </button>
                )}
                <button
                  type="submit"
                  disabled={sending || loading}
                  className="btn-primary large"
                  style={{ flex: 1 }}
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" style={{ marginRight: '8px' }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" style={{ marginRight: '8px' }} />
                      {formData.sendImmediately ? 'Send Now' : 'Schedule'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Preview */}
          <div className="flex-vertical gap-row-24px">
            <div className="card pd-32px---44px" style={{ position: 'sticky', top: '24px' }}>
              <h3 className="text-300 bold color-neutral-800 mg-bottom-24px">Live Preview</h3>

              {/* Preview Card */}
              <div className="card pd-24px" style={{ border: '2px solid var(--neutral--300)' }}>
                <div className="flex-horizontal align-start gap-column-16px">
                  <div className="avatar-circle _48px" style={{ backgroundColor: `var(--system--${typeConfig.color}-200)` }}>
                    <span className="text-300">{typeConfig.icon}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className={`badge ${typeConfig.color} mg-bottom-8px`}>
                      {typeConfig.label}
                    </div>
                    <h4 className="text-200 bold color-neutral-800 mg-bottom-8px">
                      {formData.title || 'Your title will appear here'}
                    </h4>
                    <p className="text-100 medium color-neutral-700 mg-bottom-16px">
                      {formData.message || 'Your message will appear here. This is how users will see your broadcast notification.'}
                    </p>
                    {formData.actionUrl && (
                      <button className="btn-primary small">
                        {formData.actionText || 'Action Button'}
                      </button>
                    )}
                    <div className="text-50 color-neutral-500 mg-top-12px">Just now</div>
                  </div>
                </div>
              </div>

              {/* Preview Info */}
              <div className="mg-top-24px flex-vertical gap-row-12px">
                <div className="flex-horizontal space-between">
                  <span className="text-100 medium color-neutral-600">Type</span>
                  <span className="text-100 bold color-neutral-800">{typeConfig.label}</span>
                </div>
                <div className="flex-horizontal space-between">
                  <span className="text-100 medium color-neutral-600">Target</span>
                  <span className="text-100 bold color-neutral-800">
                    {formData.targetAudience === 'all' ? 'All Users' :
                     formData.targetAudience === 'plan' ? formData.targetPlans.join(', ') || 'None selected' :
                     formData.targetRoles.join(', ') || 'None selected'}
                  </span>
                </div>
                <div className="flex-horizontal space-between">
                  <span className="text-100 medium color-neutral-600">Recipients</span>
                  <span className="text-100 bold color-neutral-800">{recipientCount.toLocaleString()}</span>
                </div>
                <div className="flex-horizontal space-between">
                  <span className="text-100 medium color-neutral-600">Send Time</span>
                  <span className="text-100 bold color-neutral-800">
                    {formData.sendImmediately ? 'Immediately' : formData.scheduledFor ? new Date(formData.scheduledFor).toLocaleString() : 'Not scheduled'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="card pd-32px---44px">
          <h2 className="text-300 bold color-neutral-800 mg-bottom-24px">Broadcast History</h2>

          {broadcasts.length === 0 ? (
            <div className="text-center pd-64px">
              <div className="avatar-circle _64px" style={{ margin: '0 auto 16px', backgroundColor: 'var(--neutral--200)' }}>
                <MessageSquare className="h-8 w-8" style={{ color: 'var(--neutral--500)' }} />
              </div>
              <p className="text-200 medium color-neutral-600">No broadcasts yet</p>
            </div>
          ) : (
            <div className="flex-vertical gap-row-16px">
              {broadcasts.map((broadcast) => {
                const type = NOTIFICATION_TYPES.find(t => t.value === broadcast.type) || NOTIFICATION_TYPES[0]

                return (
                  <div key={broadcast.id} className="card pd-24px hover-card-link">
                    <div className="flex-horizontal space-between align-start">
                      <div className="flex-horizontal gap-column-16px align-start" style={{ flex: 1 }}>
                        <div className="avatar-circle _48px" style={{ backgroundColor: `var(--system--${type.color}-200)` }}>
                          <span className="text-300">{type.icon}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="flex-horizontal align-center gap-column-12px mg-bottom-8px">
                            <div className={`badge ${getStatusBadgeClass(broadcast.status)}`}>
                              {broadcast.status}
                            </div>
                            <span className="text-50 color-neutral-500">
                              {new Date(broadcast.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <h4 className="text-200 bold color-neutral-800 mg-bottom-4px">{broadcast.title}</h4>
                          <p className="text-100 medium color-neutral-700 mg-bottom-12px">{broadcast.message.substring(0, 150)}...</p>

                          <div className="flex-horizontal gap-column-24px">
                            <div className="flex-horizontal align-center gap-column-8px">
                              <Users className="h-4 w-4" style={{ color: 'var(--neutral--500)' }} />
                              <span className="text-100 medium color-neutral-600">
                                {broadcast.recipientCount} recipients
                              </span>
                            </div>
                            {broadcast.status === 'SENT' && (
                              <div className="flex-horizontal align-center gap-column-8px">
                                <CheckCircle className="h-4 w-4" style={{ color: 'var(--system--green-400)' }} />
                                <span className="text-100 medium color-neutral-600">
                                  {broadcast.deliveredCount} delivered
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex-horizontal gap-column-8px">
                        {broadcast.status === 'DRAFT' && (
                          <button
                            onClick={() => sendExistingBroadcast(broadcast.id)}
                            className="btn-primary small"
                            disabled={loading}
                          >
                            <Send className="h-4 w-4" style={{ marginRight: '4px' }} />
                            Send
                          </button>
                        )}
                        <button
                          onClick={() => deleteBroadcast(broadcast.id)}
                          className="btn-icon-secondary"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && stats && (
        <div className="flex-vertical gap-row-24px">
          {/* Summary Stats */}
          <div className="grid-4-columns _1-column-tablet gap-row-24px gap-column-12px">
            <div className="card pd-24px">
              <div className="flex-horizontal space-between align-center mg-bottom-16px">
                <div className="avatar-circle _40px" style={{ backgroundColor: 'var(--system--blue-200)' }}>
                  <Send className="h-5 w-5" style={{ color: 'var(--system--blue-600)' }} />
                </div>
              </div>
              <div className="text-100 medium color-neutral-600 mg-bottom-8px">Total Broadcasts</div>
              <div className="text-400 bold color-neutral-800">{stats.summary.totalBroadcasts}</div>
            </div>

            <div className="card pd-24px">
              <div className="flex-horizontal space-between align-center mg-bottom-16px">
                <div className="avatar-circle _40px" style={{ backgroundColor: 'var(--system--green-200)' }}>
                  <CheckCircle className="h-5 w-5" style={{ color: 'var(--system--green-600)' }} />
                </div>
              </div>
              <div className="text-100 medium color-neutral-600 mg-bottom-8px">Sent</div>
              <div className="text-400 bold color-neutral-800">{stats.summary.sentCount}</div>
            </div>

            <div className="card pd-24px">
              <div className="flex-horizontal space-between align-center mg-bottom-16px">
                <div className="avatar-circle _40px" style={{ backgroundColor: 'var(--system--yellow-200)' }}>
                  <Users className="h-5 w-5" style={{ color: 'var(--system--yellow-600)' }} />
                </div>
              </div>
              <div className="text-100 medium color-neutral-600 mg-bottom-8px">Total Recipients</div>
              <div className="text-400 bold color-neutral-800">{stats.summary.totalRecipients.toLocaleString()}</div>
            </div>

            <div className="card pd-24px">
              <div className="flex-horizontal space-between align-center mg-bottom-16px">
                <div className="avatar-circle _40px" style={{ backgroundColor: 'var(--system--purple-200)' }}>
                  <BarChart3 className="h-5 w-5" style={{ color: 'var(--system--purple-600)' }} />
                </div>
              </div>
              <div className="text-100 medium color-neutral-600 mg-bottom-8px">Delivery Rate</div>
              <div className="text-400 bold color-neutral-800">{stats.summary.deliveryRate.toFixed(1)}%</div>
            </div>
          </div>

          {/* Recent Broadcasts Performance */}
          <div className="card pd-32px---44px">
            <h3 className="text-300 bold color-neutral-800 mg-bottom-24px">Recent Performance</h3>
            <div className="flex-vertical gap-row-16px">
              {stats.recentBroadcasts.map((broadcast) => {
                const deliveryRate = broadcast.recipientCount > 0
                  ? (broadcast.deliveredCount / broadcast.recipientCount) * 100
                  : 0

                return (
                  <div key={broadcast.id} className="card pd-20px">
                    <div className="flex-horizontal space-between align-center mg-bottom-12px">
                      <h4 className="text-200 bold color-neutral-800">{broadcast.title}</h4>
                      <span className="text-50 color-neutral-500">
                        {new Date(broadcast.sentAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex-horizontal space-between align-center">
                      <div className="flex-horizontal gap-column-24px">
                        <div>
                          <div className="text-50 medium color-neutral-600 mg-bottom-4px">Recipients</div>
                          <div className="text-200 bold color-neutral-800">{broadcast.recipientCount}</div>
                        </div>
                        <div>
                          <div className="text-50 medium color-neutral-600 mg-bottom-4px">Delivered</div>
                          <div className="text-200 bold color-neutral-800">{broadcast.deliveredCount}</div>
                        </div>
                        <div>
                          <div className="text-50 medium color-neutral-600 mg-bottom-4px">Rate</div>
                          <div className="text-200 bold color-neutral-800">{deliveryRate.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="progress-bar-wrapper" style={{ width: '200px' }}>
                        <div className="progress-bar-bg">
                          <div
                            className="progress-bar green"
                            style={{ width: `${deliveryRate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-300 bold color-neutral-800">Confirm Broadcast</h3>
            </div>
            <div className="modal-body">
              <p className="text-200 medium color-neutral-700 mg-bottom-16px">
                You are about to send this broadcast to <strong>{recipientCount.toLocaleString()} users</strong>.
              </p>
              <p className="text-100 medium color-neutral-600">
                This action cannot be undone. Are you sure you want to proceed?
              </p>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn-secondary large"
                disabled={sending}
              >
                Cancel
              </button>
              <button
                onClick={sendBroadcast}
                className="btn-primary large"
                disabled={sending}
              >
                {sending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" style={{ marginRight: '8px' }} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" style={{ marginRight: '8px' }} />
                    Send Broadcast
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'SENT':
      return 'success'
    case 'DRAFT':
      return 'default'
    case 'SCHEDULED':
      return 'info'
    case 'SENDING':
      return 'warning'
    case 'FAILED':
      return 'danger'
    case 'CANCELLED':
      return 'default'
    default:
      return 'default'
  }
}
