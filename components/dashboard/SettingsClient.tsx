'use client'

import { Settings, Bell, AlertTriangle, User as UserIcon, Mail, Key, Link, Database, CreditCard, Check, X } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  firstName: string | null
  lastName: string | null
  email: string
  userId: string
  plan: string
  executionMode: string
}

interface SettingsClientProps {
  user: User
}

export function SettingsClient({ user }: SettingsClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'preferences' | 'integrations'>('profile')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [savingExecutionMode, setSavingExecutionMode] = useState(false)
  const [savingNotifications, setSavingNotifications] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Notification preferences state
  const [notificationPrefs, setNotificationPrefs] = useState({
    newIssues: true,
    fixesApplied: true,
    weeklyReports: false,
    billingUpdates: true,
  })

  const planLabels = {
    STARTER: 'Starter',
    GROWTH: 'Growth',
    SCALE: 'Scale',
  }

  // Get user initials for avatar
  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || 'U'

  // Handle execution mode change
  const handleExecutionModeChange = async (mode: string) => {
    setSavingExecutionMode(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      const response = await fetch('/api/settings/execution-mode', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ executionMode: mode }),
      })

      if (response.ok) {
        setSuccessMessage('Execution mode updated successfully')
        setTimeout(() => setSuccessMessage(null), 3000)
        router.refresh()
      } else {
        setErrorMessage('Failed to update execution mode')
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.')
    } finally {
      setSavingExecutionMode(false)
    }
  }

  // Handle notification preference changes
  const handleNotificationChange = async (key: keyof typeof notificationPrefs, value: boolean) => {
    setNotificationPrefs(prev => ({ ...prev, [key]: value }))
    setSavingNotifications(true)

    try {
      const response = await fetch('/api/settings/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: value }),
      })

      if (response.ok) {
        setSuccessMessage('Notification preferences saved')
        setTimeout(() => setSuccessMessage(null), 2000)
      }
    } catch (error) {
      console.error('Error saving notification preference:', error)
    } finally {
      setSavingNotifications(false)
    }
  }

  // Show success/error toast
  const showToast = (message: string, type: 'success' | 'error') => {
    if (type === 'success') {
      setSuccessMessage(message)
      setTimeout(() => setSuccessMessage(null), 3000)
    } else {
      setErrorMessage(message)
      setTimeout(() => setErrorMessage(null), 3000)
    }
  }

  return (
    <div className="bg-neutral-200 min-h-screen">
      <div className="container-default w-container">
        <div className="gap-row-24px">
          {/* Header */}
          <div className="rt-component-section gap-row-24px">
            <div className="flex-horizontal align-center gap-column-16px">
              <div className="card-icon-square _40px flex-horizontal">
                <Settings className="h-5 w-5" />
              </div>
              <div style={{ flex: 1 }}>
                <h1 className="display-2 color-neutral-800">
                  Settings
                </h1>
                <p className="text-200 medium color-neutral-600">
                  Manage your account preferences and execution mode
                </p>
              </div>
              {/* User Avatar */}
              <div className="avatar-circle _48px">
                <div className="avatar-name-circle _48px">
                  <div className="text-100 bold color-neutral-100">{initials}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="card pd-24px" style={{ marginTop: '24px', backgroundColor: 'var(--system--green-100)', border: '1px solid var(--system--green-200)' }}>
              <div className="flex-horizontal align-center gap-column-12px">
                <div className="avatar-circle _24px" style={{ backgroundColor: 'var(--system--green-200)' }}>
                  <Check className="h-3 w-3" style={{ color: 'var(--system--green-400)' }} />
                </div>
                <p className="text-100 medium color-neutral-800">{successMessage}</p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="card pd-24px" style={{ marginTop: '24px', backgroundColor: 'var(--system--red-100)', border: '1px solid var(--system--red-200)' }}>
              <div className="flex-horizontal align-center gap-column-12px">
                <div className="avatar-circle _24px" style={{ backgroundColor: 'var(--system--red-200)' }}>
                  <X className="h-3 w-3" style={{ color: 'var(--system--red-400)' }} />
                </div>
                <p className="text-100 medium color-neutral-800">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="tabs-menu links-single">
            <button
              onClick={() => setActiveTab('profile')}
              className={`tab-menu-underline-link ${activeTab === 'profile' ? 'w--current' : ''}`}
            >
              <UserIcon className="h-4 w-4" style={{ marginRight: '8px' }} />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`tab-menu-underline-link ${activeTab === 'preferences' ? 'w--current' : ''}`}
            >
              <Settings className="h-4 w-4" style={{ marginRight: '8px' }} />
              Preferences
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`tab-menu-underline-link ${activeTab === 'notifications' ? 'w--current' : ''}`}
            >
              <Bell className="h-4 w-4" style={{ marginRight: '8px' }} />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`tab-menu-underline-link ${activeTab === 'integrations' ? 'w--current' : ''}`}
            >
              <Link className="h-4 w-4" style={{ marginRight: '8px' }} />
              Integrations
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`tab-menu-underline-link ${activeTab === 'security' ? 'w--current' : ''}`}
            >
              <AlertTriangle className="h-4 w-4" style={{ marginRight: '8px' }} />
              Security
            </button>
          </div>

          {/* Profile Section */}
          {activeTab === 'profile' && (
            <div className="card pd-32px---44px" style={{ marginTop: '24px' }}>
              <div className="flex-horizontal align-center gap-column-16px mg-bottom-32px">
                <div className="avatar-circle _40px">
                  <div className="avatar-name-circle _40px">
                    <div className="text-100 bold color-neutral-100">{initials}</div>
                  </div>
                </div>
                <h2 className="text-300 bold color-neutral-800">
                  Profile Information
                </h2>
              </div>

              <div className="grid-2-columns gap-row-24px gap-column-24px">
                <div className="flex-vertical">
                  <label className="text-100 medium color-neutral-600 mg-bottom-8px">
                    First Name
                    <div className="tooltip top" style={{ marginLeft: '4px', display: 'inline-block' }}>
                      <span style={{ cursor: 'help' }}>ℹ️</span>
                      <div className="tooltip-content">Managed through Clerk authentication</div>
                    </div>
                  </label>
                  <div className="input icon-inside-left" style={{ position: 'relative' }}>
                    <UserIcon className="h-4 w-4" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral--600)' }} />
                    <input
                      type="text"
                      defaultValue={user.firstName || ''}
                      className="input"
                      style={{ paddingLeft: '36px' }}
                      disabled
                    />
                  </div>
                </div>

                <div className="flex-vertical">
                  <label className="text-100 medium color-neutral-600 mg-bottom-8px">
                    Last Name
                  </label>
                  <div className="input icon-inside-left" style={{ position: 'relative' }}>
                    <UserIcon className="h-4 w-4" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral--600)' }} />
                    <input
                      type="text"
                      defaultValue={user.lastName || ''}
                      className="input"
                      style={{ paddingLeft: '36px' }}
                      disabled
                    />
                  </div>
                </div>

                <div className="flex-vertical">
                  <label className="text-100 medium color-neutral-600 mg-bottom-8px">
                    Email
                  </label>
                  <div className="input icon-inside-left" style={{ position: 'relative' }}>
                    <Mail className="h-4 w-4" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral--600)' }} />
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="input"
                      style={{ paddingLeft: '36px' }}
                      disabled
                    />
                  </div>
                </div>

                <div className="flex-vertical">
                  <label className="text-100 medium color-neutral-600 mg-bottom-8px">
                    User ID
                  </label>
                  <input
                    type="text"
                    defaultValue={user.userId}
                    className="input"
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '14px'
                    }}
                    disabled
                  />
                </div>

                <div className="flex-vertical">
                  <label className="text-100 medium color-neutral-600 mg-bottom-8px">
                    Current Plan
                  </label>
                  <div className="flex-horizontal gap-column-12px">
                    <input
                      type="text"
                      defaultValue={planLabels[user.plan as keyof typeof planLabels]}
                      className="input"
                      style={{ flex: 1 }}
                      disabled
                    />
                    <span className="badge" style={{ alignSelf: 'center' }}>{user.plan}</span>
                  </div>
                </div>
              </div>

              <div className="divider card-small-divider mg-top-24px"></div>

              {/* Quick Actions */}
              <div className="grid-2-columns gap-row-16px gap-column-16px mg-top-24px">
                <div className="card pd-20px" style={{ backgroundColor: 'var(--neutral--200)' }}>
                  <div className="flex-horizontal align-center gap-column-12px">
                    <div className="avatar-circle _32px">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="text-100 bold color-neutral-800 mg-bottom-4px">Billing & Usage</p>
                      <p className="text-50 medium color-neutral-600">Manage subscription and view usage</p>
                    </div>
                    <button
                      onClick={() => router.push('/dashboard/billing')}
                      className="btn-tertiary small"
                    >
                      View
                    </button>
                  </div>
                </div>

                <div className="card pd-20px" style={{ backgroundColor: 'var(--neutral--200)' }}>
                  <div className="flex-horizontal align-center gap-column-12px">
                    <div className="avatar-circle _32px">
                      <Database className="h-4 w-4" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="text-100 bold color-neutral-800 mg-bottom-4px">Data Management</p>
                      <p className="text-50 medium color-neutral-600">Export, import, and manage data</p>
                    </div>
                    <button
                      onClick={() => router.push('/dashboard/settings/data')}
                      className="btn-tertiary small"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </div>

              <div className="card pd-20px mg-top-16px" style={{ backgroundColor: 'var(--system--blue-100)', border: '1px solid var(--system--blue-200)' }}>
                <div className="flex-horizontal align-center gap-column-12px">
                  <div className="avatar-circle _24px" style={{ backgroundColor: 'var(--system--blue-200)' }}>
                    <span style={{ fontSize: '12px' }}>ℹ️</span>
                  </div>
                  <p className="text-100 medium color-neutral-800">
                    Profile information is managed through Clerk authentication. Changes to name and email should be made through your{' '}
                    <a href="/user" className="text-100 medium color-accent-1 hover-opacity-85" style={{ textDecoration: 'underline' }}>
                      account settings
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Section - Execution Mode */}
          {activeTab === 'preferences' && (
            <div className="card pd-32px---44px" style={{ marginTop: '24px' }}>
            <div className="flex-horizontal align-center gap-column-16px mg-bottom-32px">
              <div className="card-icon-square _40px neutral-icon flex-horizontal">
                <Settings className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-300 bold color-neutral-800 mg-bottom-8px">
                  Fix Execution Mode
                </h2>
                <p className="text-100 medium color-neutral-600">
                  Choose how SEO fixes are applied to your sites
                </p>
              </div>
            </div>

            <div className="grid-1-column gap-row-16px">
              <ExecutionModeOption
                mode="AUTOMATIC"
                title="Automatic"
                description="Fixes are applied immediately without approval. Best for hands-off automation."
                isActive={user.executionMode === 'AUTOMATIC'}
                onChange={() => handleExecutionModeChange('AUTOMATIC')}
              />

              <ExecutionModeOption
                mode="PLAN"
                title="Plan Mode"
                description="Our AI creates a plan of all fixes. You approve once, and all fixes execute together."
                isActive={user.executionMode === 'PLAN'}
                onChange={() => handleExecutionModeChange('PLAN')}
              />

              <ExecutionModeOption
                mode="APPROVE"
                title="Approve Mode"
                description="Each fix requires individual approval before application. Maximum control."
                isActive={user.executionMode === 'APPROVE'}
                onChange={() => handleExecutionModeChange('APPROVE')}
              />
            </div>

              <div className="divider card-small-divider mg-top-24px"></div>
              <div className="card pd-24px" style={{ backgroundColor: 'var(--system--blue-100)', border: '1px solid var(--system--blue-200)' }}>
                <div className="flex-horizontal align-center gap-column-12px">
                  <div className="card-icon-square _26px flex-horizontal" style={{ flexShrink: 0 }}>
                    <span style={{ fontSize: '14px' }}>ℹ️</span>
                  </div>
                  <p className="text-100 medium color-neutral-800">
                    <strong>Note:</strong> All execution modes include 90-day rollback protection. You can safely revert any fix within 90 days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeTab === 'notifications' && (
            <div className="card pd-32px---44px" style={{ marginTop: '24px' }}>
              <div className="flex-horizontal align-center gap-column-16px mg-bottom-32px">
                <div className="card-icon-square _40px neutral-icon flex-horizontal">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-300 bold color-neutral-800 mg-bottom-8px">
                    Email Notifications
                  </h2>
                  <p className="text-100 medium color-neutral-600">
                    Choose what emails you want to receive
                  </p>
                </div>
              </div>

              <div className="grid-1-column gap-row-16px">
                <NotificationToggle
                  label="New Issues Detected"
                  description="Get notified when SEO issues are found on your sites"
                  enabled={notificationPrefs.newIssues}
                  onChange={(value) => handleNotificationChange('newIssues', value)}
                />

                <NotificationToggle
                  label="Fixes Applied"
                  description="Receive a summary of fixes applied to your sites"
                  enabled={notificationPrefs.fixesApplied}
                  onChange={(value) => handleNotificationChange('fixesApplied', value)}
                />

                <NotificationToggle
                  label="Weekly Reports"
                  description="Get a weekly summary of SEO health across all sites"
                  enabled={notificationPrefs.weeklyReports}
                  onChange={(value) => handleNotificationChange('weeklyReports', value)}
                />

                <NotificationToggle
                  label="Billing Updates"
                  description="Important updates about your subscription and usage"
                  enabled={notificationPrefs.billingUpdates}
                  onChange={(value) => handleNotificationChange('billingUpdates', value)}
                />
              </div>
            </div>
          )}

          {/* Integrations Section */}
          {activeTab === 'integrations' && (
            <div className="gap-row-24px" style={{ marginTop: '24px' }}>
              {/* Connected Sites */}
              <div className="card pd-32px---44px">
                <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
                  <div className="card-icon-square _40px neutral-icon flex-horizontal">
                    <Link className="h-5 w-5" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 className="text-300 bold color-neutral-800 mg-bottom-8px">
                      Connected Sites
                    </h2>
                    <p className="text-100 medium color-neutral-600">
                      Manage your connected websites and platforms
                    </p>
                  </div>
                  <button
                    onClick={() => router.push('/dashboard/sites/connect')}
                    className="btn-primary medium"
                  >
                    Connect New Site
                  </button>
                </div>

                <div className="card pd-20px" style={{ backgroundColor: 'var(--neutral--200)' }}>
                  <div className="flex-horizontal align-center gap-column-12px">
                    <div className="avatar-circle _32px">
                      <span style={{ fontSize: '16px' }}>🔗</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="text-100 medium color-neutral-800">
                        View and manage all your connected sites in the Data Management section
                      </p>
                    </div>
                    <button
                      onClick={() => router.push('/dashboard/settings/data')}
                      className="btn-tertiary small"
                    >
                      Go to Data Management
                    </button>
                  </div>
                </div>
              </div>

              {/* API Access */}
              <div className="card pd-32px---44px">
                <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
                  <div className="card-icon-square _40px neutral-icon flex-horizontal">
                    <Key className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-300 bold color-neutral-800 mg-bottom-8px">
                      API Keys
                    </h2>
                    <p className="text-100 medium color-neutral-600">
                      Generate API keys to access SEOLOGY.AI programmatically
                    </p>
                  </div>
                </div>

                <div className="card pd-24px" style={{ backgroundColor: 'var(--system--blue-100)', border: '1px solid var(--system--blue-200)' }}>
                  <div className="flex-horizontal align-center gap-column-12px">
                    <div className="avatar-circle _24px" style={{ backgroundColor: 'var(--system--blue-200)' }}>
                      <span style={{ fontSize: '12px' }}>🔒</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="text-100 medium color-neutral-800 mg-bottom-4px">
                        <strong>API access coming soon</strong>
                      </p>
                      <p className="text-100 medium color-neutral-600">
                        API keys will allow you to integrate SEOLOGY.AI with your existing workflows and tools.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Webhooks */}
              <div className="card pd-32px---44px">
                <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
                  <div className="card-icon-square _40px neutral-icon flex-horizontal">
                    <span style={{ fontSize: '20px' }}>🔔</span>
                  </div>
                  <div>
                    <h2 className="text-300 bold color-neutral-800 mg-bottom-8px">
                      Webhooks
                    </h2>
                    <p className="text-100 medium color-neutral-600">
                      Receive real-time notifications about SEO fixes and issues
                    </p>
                  </div>
                </div>

                <div className="card pd-24px" style={{ backgroundColor: 'var(--system--blue-100)', border: '1px solid var(--system--blue-200)' }}>
                  <div className="flex-horizontal align-center gap-column-12px">
                    <div className="avatar-circle _24px" style={{ backgroundColor: 'var(--system--blue-200)' }}>
                      <span style={{ fontSize: '12px' }}>🚀</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="text-100 medium color-neutral-800 mg-bottom-4px">
                        <strong>Webhooks coming soon</strong>
                      </p>
                      <p className="text-100 medium color-neutral-600">
                        Set up webhook endpoints to receive notifications when issues are detected or fixes are applied.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Section - Danger Zone */}
          {activeTab === 'security' && (
            <div className="card pd-32px---44px" style={{ marginTop: '24px', backgroundColor: 'var(--system--red-100)', border: '1px solid var(--system--red-200)' }}>
              <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
                <div className="card-icon-square _40px flex-horizontal" style={{ flexShrink: 0, borderColor: 'var(--system--300)', backgroundColor: 'var(--system--red-100)' }}>
                  <AlertTriangle className="h-5 w-5" style={{ color: 'var(--system--300)' }} />
                </div>
                <h2 className="text-300 bold" style={{ color: 'var(--system--red-400)' }}>
                  Danger Zone
                </h2>
              </div>
              <div className="flex-horizontal space-between align-center children-wrap gap-16px---8px">
                <div className="flex-vertical">
                  <p className="text-200 bold color-neutral-800 mg-bottom-4px">Delete Account</p>
                  <p className="text-100 medium color-neutral-600">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="btn-primary large"
                  style={{ backgroundColor: 'var(--system--red-400)', borderColor: 'var(--system--red-400)' }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="modal-wrapper">
              <div className="modal-close-overlay" onClick={() => setShowDeleteModal(false)}></div>
              <div className="modal-content">
                <div className="card pd-32px---44px">
                  <h3 className="text-300 bold color-neutral-800 mg-bottom-16px">Confirm Account Deletion</h3>
                  <p className="text-100 medium color-neutral-600 mg-bottom-24px">
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                  <div className="flex-horizontal gap-column-12px">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="btn-secondary large"
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-primary large"
                      style={{ backgroundColor: 'var(--system--red-400)', borderColor: 'var(--system--red-400)' }}
                    >
                      Yes, Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface ExecutionModeOptionProps {
  mode: string
  title: string
  description: string
  isActive: boolean
  onChange: () => void | Promise<void>
}

function ExecutionModeOption({ mode, title, description, isActive, onChange }: ExecutionModeOptionProps) {
  return (
    <label
      className="card pd-24px"
      style={{
        cursor: 'pointer',
        border: isActive ? '2px solid var(--accent--primary-1)' : '1px solid var(--neutral--400)',
        backgroundColor: isActive ? 'var(--secondary--color-3)' : 'var(--neutral--100)'
      }}
      onClick={onChange}
    >
      <div className="flex-horizontal align-start gap-column-16px">
        <input
          type="radio"
          name="execution_mode"
          value={mode}
          checked={isActive}
          className="checkbox"
          style={{ marginTop: '4px' }}
          readOnly
        />
        <div className="flex-vertical" style={{ flex: 1 }}>
          <div className="flex-horizontal space-between align-center mg-bottom-8px">
            <p className="text-200 bold color-neutral-800">{title}</p>
            {isActive && <span className="primary-badge light">Active</span>}
          </div>
          <p className="text-100 medium color-neutral-600">{description}</p>
        </div>
      </div>
    </label>
  )
}

interface NotificationToggleProps {
  label: string
  description: string
  enabled: boolean
  onChange: (enabled: boolean) => void
}

function NotificationToggle({ label, description, enabled, onChange }: NotificationToggleProps) {
  return (
    <div className="card pd-24px">
      <div className="flex-horizontal space-between align-center">
        <div className="flex-vertical" style={{ flex: 1 }}>
          <div className="flex-horizontal gap-column-12px align-center mg-bottom-4px">
            <p className="text-200 bold color-neutral-800">{label}</p>
            {enabled && <span className="color-badge green">Enabled</span>}
          </div>
          <p className="text-100 medium color-neutral-600">{description}</p>
        </div>
        <button
          className="toggle-button-wrapper"
          style={{ flexShrink: 0, marginLeft: '16px', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
          onClick={() => onChange(!enabled)}
          type="button"
        >
          <div className={`toggle-button-bg ${enabled ? 'active' : ''}`}></div>
          <div className="toggle-button-circle-inside" style={{
            transform: enabled ? 'translateX(14px)' : 'translateX(0)',
            transition: 'transform 0.3s'
          }}></div>
        </button>
      </div>
    </div>
  )
}
