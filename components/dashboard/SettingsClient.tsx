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
    <div className="min-h-screen">
      <div className="container-default w-container">
        <div className="gap-row-24px">
          {/* Header */}
          <div className="rt-component-section gap-row-24px">
            <div className="flex-horizontal align-center gap-column-16px">
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-center">
                <Settings className="h-6 w-6 text-blue-400" />
              </div>
              <div style={{ flex: 1 }}>
                <h1 className="text-3xl font-bold text-white">
                  Settings
                </h1>
                <p className="text-base text-gray-400">
                  Manage your account preferences and execution mode
                </p>
              </div>
              {/* User Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-sm font-bold text-white">{initials}</div>
              </div>
            </div>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4" style={{ marginTop: '24px' }}>
              <div className="flex-horizontal align-center gap-column-12px">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-400" />
                </div>
                <p className="text-sm font-medium text-green-400">{successMessage}</p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4" style={{ marginTop: '24px' }}>
              <div className="flex-horizontal align-center gap-column-12px">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="h-3 w-3 text-red-400" />
                </div>
                <p className="text-sm font-medium text-red-400">{errorMessage}</p>
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
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8" style={{ marginTop: '24px' }}>
              <div className="flex-horizontal align-center gap-column-16px mg-bottom-32px">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-sm font-bold text-white">{initials}</div>
                </div>
                <h2 className="text-xl font-bold text-white">
                  Profile Information
                </h2>
              </div>

              <div className="grid-2-columns gap-row-24px gap-column-24px">
                <div className="flex-vertical">
                  <label className="text-sm font-medium text-gray-400 mg-bottom-8px">
                    First Name
                    <div className="tooltip top" style={{ marginLeft: '4px', display: 'inline-block' }}>
                      <span style={{ cursor: 'help' }}>ℹ️</span>
                      <div className="tooltip-content">Managed through Clerk authentication</div>
                    </div>
                  </label>
                  <div className="input icon-inside-left" style={{ position: 'relative' }}>
                    <UserIcon className="h-4 w-4" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                      type="text"
                      defaultValue={user.firstName || ''}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white w-full"
                      style={{ paddingLeft: '36px' }}
                      disabled
                    />
                  </div>
                </div>

                <div className="flex-vertical">
                  <label className="text-sm font-medium text-gray-400 mg-bottom-8px">
                    Last Name
                  </label>
                  <div className="input icon-inside-left" style={{ position: 'relative' }}>
                    <UserIcon className="h-4 w-4" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                      type="text"
                      defaultValue={user.lastName || ''}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white w-full"
                      style={{ paddingLeft: '36px' }}
                      disabled
                    />
                  </div>
                </div>

                <div className="flex-vertical">
                  <label className="text-sm font-medium text-gray-400 mg-bottom-8px">
                    Email
                  </label>
                  <div className="input icon-inside-left" style={{ position: 'relative' }}>
                    <Mail className="h-4 w-4" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white w-full"
                      style={{ paddingLeft: '36px' }}
                      disabled
                    />
                  </div>
                </div>

                <div className="flex-vertical">
                  <label className="text-sm font-medium text-gray-400 mg-bottom-8px">
                    User ID
                  </label>
                  <input
                    type="text"
                    defaultValue={user.userId}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white w-full"
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '14px'
                    }}
                    disabled
                  />
                </div>

                <div className="flex-vertical">
                  <label className="text-sm font-medium text-gray-400 mg-bottom-8px">
                    Current Plan
                  </label>
                  <div className="flex-horizontal gap-column-12px">
                    <input
                      type="text"
                      defaultValue={planLabels[user.plan as keyof typeof planLabels]}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                      style={{ flex: 1 }}
                      disabled
                    />
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium" style={{ alignSelf: 'center' }}>{user.plan}</span>
                  </div>
                </div>
              </div>

              <div className="divider card-small-divider mg-top-24px"></div>

              {/* Quick Actions */}
              <div className="grid-2-columns gap-row-16px gap-column-16px mg-top-24px">
                <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                  <div className="flex-horizontal align-center gap-column-12px">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-blue-400" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="text-sm font-semibold text-white mg-bottom-4px">Billing & Usage</p>
                      <p className="text-xs text-gray-400">Manage subscription and view usage</p>
                    </div>
                    <button
                      onClick={() => router.push('/dashboard/billing')}
                      className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-medium rounded-lg border border-blue-500/20 transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                  <div className="flex-horizontal align-center gap-column-12px">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Database className="h-4 w-4 text-purple-400" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="text-sm font-semibold text-white mg-bottom-4px">Data Management</p>
                      <p className="text-xs text-gray-400">Export, import, and manage data</p>
                    </div>
                    <button
                      onClick={() => router.push('/dashboard/settings/data')}
                      className="px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-xs font-medium rounded-lg border border-purple-500/20 transition-colors"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 mg-top-16px">
                <div className="flex-horizontal align-center gap-column-12px">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span style={{ fontSize: '12px' }}>ℹ️</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Profile information is managed through Clerk authentication. Changes to name and email should be made through your{' '}
                    <a href="/user" className="text-blue-400 hover:text-blue-300 transition-colors" style={{ textDecoration: 'underline' }}>
                      account settings
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Section - Execution Mode */}
          {activeTab === 'preferences' && (
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8" style={{ marginTop: '24px' }}>
            <div className="flex-horizontal align-center gap-column-16px mg-bottom-32px">
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-center">
                <Settings className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mg-bottom-8px">
                  Fix Execution Mode
                </h2>
                <p className="text-sm text-gray-400">
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
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5" style={{ marginTop: '24px' }}>
                <div className="flex-horizontal align-center gap-column-12px">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span style={{ fontSize: '14px' }}>ℹ️</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">Note:</strong> All execution modes include 90-day rollback protection. You can safely revert any fix within 90 days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeTab === 'notifications' && (
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8" style={{ marginTop: '24px' }}>
              <div className="flex-horizontal align-center gap-column-16px mg-bottom-32px">
                <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mg-bottom-8px">
                    Email Notifications
                  </h2>
                  <p className="text-sm text-gray-400">
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
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
                  <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-center">
                    <Link className="h-6 w-6 text-green-400" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 className="text-xl font-bold text-white mg-bottom-8px">
                      Connected Sites
                    </h2>
                    <p className="text-sm text-gray-400">
                      Manage your connected websites and platforms
                    </p>
                  </div>
                  <button
                    onClick={() => router.push('/dashboard/sites/connect')}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg text-sm font-medium transition-all duration-300"
                  >
                    Connect New Site
                  </button>
                </div>

                <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                  <div className="flex-horizontal align-center gap-column-12px">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      <span style={{ fontSize: '16px' }}>🔗</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="text-sm text-gray-300">
                        View and manage all your connected sites in the Data Management section
                      </p>
                    </div>
                    <button
                      onClick={() => router.push('/dashboard/settings/data')}
                      className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs font-medium rounded-lg border border-green-500/20 transition-colors"
                    >
                      Go to Data Management
                    </button>
                  </div>
                </div>
              </div>

              {/* API Access */}
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8" style={{ marginTop: '24px' }}>
                <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
                  <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-center">
                    <Key className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mg-bottom-8px">
                      API Keys
                    </h2>
                    <p className="text-sm text-gray-400">
                      Generate API keys to access SEOLOGY.AI programmatically
                    </p>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
                  <div className="flex-horizontal align-center gap-column-12px">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span style={{ fontSize: '12px' }}>🔒</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="text-sm font-semibold text-white mg-bottom-4px">
                        API access coming soon
                      </p>
                      <p className="text-sm text-gray-300">
                        API keys will allow you to integrate SEOLOGY.AI with your existing workflows and tools.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Webhooks */}
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8" style={{ marginTop: '24px' }}>
                <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
                  <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-center">
                    <span style={{ fontSize: '20px' }}>🔔</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mg-bottom-8px">
                      Webhooks
                    </h2>
                    <p className="text-sm text-gray-400">
                      Receive real-time notifications about SEO fixes and issues
                    </p>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
                  <div className="flex-horizontal align-center gap-column-12px">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span style={{ fontSize: '12px' }}>🚀</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="text-sm font-semibold text-white mg-bottom-4px">
                        Webhooks coming soon
                      </p>
                      <p className="text-sm text-gray-300">
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
            <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8" style={{ marginTop: '24px' }}>
              <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-red-400">
                  Danger Zone
                </h2>
              </div>
              <div className="flex-horizontal space-between align-center children-wrap gap-16px---8px">
                <div className="flex-vertical">
                  <p className="text-base font-semibold text-white mg-bottom-4px">Delete Account</p>
                  <p className="text-sm text-gray-300">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg border border-red-500/50 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}></div>
              <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <h3 className="text-xl font-bold text-white mg-bottom-16px">Confirm Account Deletion</h3>
                <p className="text-sm text-gray-300 mg-bottom-24px">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
                <div className="flex-horizontal gap-column-12px">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg border border-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg border border-red-500/50 transition-colors"
                  >
                    Yes, Delete My Account
                  </button>
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
      className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl rounded-xl p-6 hover:border-white/20 transition-all cursor-pointer"
      style={{
        border: isActive ? '2px solid rgb(59 130 246)' : '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : undefined
      }}
      onClick={onChange}
    >
      <div className="flex-horizontal align-start gap-column-16px">
        <input
          type="radio"
          name="execution_mode"
          value={mode}
          checked={isActive}
          className="w-5 h-5 text-blue-500 border-white/10 focus:ring-blue-500"
          style={{ marginTop: '4px' }}
          readOnly
        />
        <div className="flex-vertical" style={{ flex: 1 }}>
          <div className="flex-horizontal space-between align-center mg-bottom-8px">
            <p className="text-base font-semibold text-white">{title}</p>
            {isActive && <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">Active</span>}
          </div>
          <p className="text-sm text-gray-400">{description}</p>
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
    <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
      <div className="flex-horizontal space-between align-center">
        <div className="flex-vertical" style={{ flex: 1 }}>
          <div className="flex-horizontal gap-column-12px align-center mg-bottom-4px">
            <p className="text-base font-semibold text-white">{label}</p>
            {enabled && <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">Enabled</span>}
          </div>
          <p className="text-sm text-gray-400">{description}</p>
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
