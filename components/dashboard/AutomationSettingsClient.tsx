'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  Zap,
  CheckCircle2,
  AlertCircle,
  Globe,
  Mail,
  Bell,
  Save,
} from 'lucide-react'

interface AutomationSettings {
  dailyAutomationEnabled: boolean
  dailyAutomationTime: string
  dailyAutomationTimezone: string
  executionMode: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
  emailReportsEnabled: boolean
  dashboardNotificationsEnabled: boolean
}

const TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Anchorage',
  'Pacific/Honolulu',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Dubai',
  'Australia/Sydney',
  'Pacific/Auckland',
]

const EXECUTION_MODES = [
  {
    value: 'AUTOMATIC',
    label: 'Automatic',
    description: 'Apply all fixes immediately without approval',
    icon: Zap,
    color: 'var(--success--500)',
    bgColor: 'var(--success--100)',
  },
  {
    value: 'PLAN',
    label: 'Plan Mode',
    description: 'Create a batch of fixes for single approval',
    icon: Calendar,
    color: 'var(--primary--500)',
    bgColor: 'var(--primary--100)',
  },
  {
    value: 'APPROVE',
    label: 'Approve Each',
    description: 'Review and approve each fix individually',
    icon: CheckCircle2,
    color: 'var(--warning--500)',
    bgColor: 'var(--warning--100)',
  },
]

export function AutomationSettingsClient() {
  const [settings, setSettings] = useState<AutomationSettings>({
    dailyAutomationEnabled: false,
    dailyAutomationTime: '09:00',
    dailyAutomationTimezone: 'America/New_York',
    executionMode: 'APPROVE',
    emailReportsEnabled: true,
    dashboardNotificationsEnabled: true,
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/user/automation-settings')
      const data = await response.json()

      if (data.success) {
        setSettings({
          dailyAutomationEnabled: data.data.dailyAutomationEnabled || false,
          dailyAutomationTime: data.data.dailyAutomationTime || '09:00',
          dailyAutomationTimezone: data.data.dailyAutomationTimezone || 'America/New_York',
          executionMode: data.data.executionMode || 'APPROVE',
          emailReportsEnabled: data.data.emailReportsEnabled ?? true,
          dashboardNotificationsEnabled: data.data.dashboardNotificationsEnabled ?? true,
        })
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveStatus('idle')

    try {
      const response = await fetch('/api/user/automation-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      const data = await response.json()

      if (data.success) {
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } else {
        setSaveStatus('error')
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
      setSaveStatus('error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-container pd-64px">
        <div className="max-width-1200px mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
            <div className="h-64 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            <div className="h-64 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container pd-64px">
      <div className="max-width-1200px mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--primary--100)' }}>
              <Clock className="w-6 h-6" style={{ color: 'var(--primary--500)' }} />
            </div>
            <h1 className="text-400 bold" style={{ color: 'var(--neutral--800)' }}>
              Automation Settings
            </h1>
          </div>
          <p className="text-200" style={{ color: 'var(--neutral--600)' }}>
            Configure when and how your SEO fixes are automatically applied
          </p>
        </div>

        {/* Daily Automation Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card pd-24px mb-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--success--100)' }}>
                <Zap className="w-6 h-6" style={{ color: 'var(--success--500)' }} />
              </div>
              <div>
                <h2 className="text-300 bold mb-2" style={{ color: 'var(--neutral--800)' }}>
                  Enable Daily Automation
                </h2>
                <p className="text-200" style={{ color: 'var(--neutral--600)' }}>
                  Automatically scan, analyze, and fix SEO issues every day at your scheduled time
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.dailyAutomationEnabled}
                onChange={(e) =>
                  setSettings({ ...settings, dailyAutomationEnabled: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {settings.dailyAutomationEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t"
              style={{ borderColor: 'var(--neutral--300)' }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Time Picker */}
                <div>
                  <label className="block text-200 bold mb-2" style={{ color: 'var(--neutral--700)' }}>
                    <Clock className="w-4 h-4 inline mr-2" />
                    Automation Time
                  </label>
                  <input
                    type="time"
                    value={settings.dailyAutomationTime}
                    onChange={(e) =>
                      setSettings({ ...settings, dailyAutomationTime: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    style={{
                      borderColor: 'var(--neutral--300)',
                      backgroundColor: 'var(--neutral--50)',
                      color: 'var(--neutral--800)',
                    }}
                  />
                  <p className="text-100 mt-2" style={{ color: 'var(--neutral--500)' }}>
                    Choose when automation should run daily
                  </p>
                </div>

                {/* Timezone Picker */}
                <div>
                  <label className="block text-200 bold mb-2" style={{ color: 'var(--neutral--700)' }}>
                    <Globe className="w-4 h-4 inline mr-2" />
                    Timezone
                  </label>
                  <select
                    value={settings.dailyAutomationTimezone}
                    onChange={(e) =>
                      setSettings({ ...settings, dailyAutomationTimezone: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    style={{
                      borderColor: 'var(--neutral--300)',
                      backgroundColor: 'var(--neutral--50)',
                      color: 'var(--neutral--800)',
                    }}
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                  <p className="text-100 mt-2" style={{ color: 'var(--neutral--500)' }}>
                    Your local timezone
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Execution Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card pd-24px mb-6"
        >
          <h2 className="text-300 bold mb-2" style={{ color: 'var(--neutral--800)' }}>
            Execution Mode
          </h2>
          <p className="text-200 mb-6" style={{ color: 'var(--neutral--600)' }}>
            Choose how you want SEO fixes to be handled
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {EXECUTION_MODES.map((mode) => {
              const Icon = mode.icon
              const isSelected = settings.executionMode === mode.value

              return (
                <button
                  key={mode.value}
                  onClick={() =>
                    setSettings({
                      ...settings,
                      executionMode: mode.value as 'AUTOMATIC' | 'PLAN' | 'APPROVE',
                    })
                  }
                  className={`p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                    isSelected ? 'shadow-lg' : ''
                  }`}
                  style={{
                    borderColor: isSelected ? mode.color : 'var(--neutral--300)',
                    backgroundColor: isSelected ? mode.bgColor : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: mode.bgColor,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: mode.color }} />
                    </div>
                    <h3 className="text-200 bold" style={{ color: 'var(--neutral--800)' }}>
                      {mode.label}
                    </h3>
                  </div>
                  <p className="text-100" style={{ color: 'var(--neutral--600)' }}>
                    {mode.description}
                  </p>
                  {isSelected && (
                    <div className="mt-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" style={{ color: mode.color }} />
                      <span className="text-100 bold" style={{ color: mode.color }}>
                        Currently Active
                      </span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card pd-24px mb-6"
        >
          <h2 className="text-300 bold mb-2" style={{ color: 'var(--neutral--800)' }}>
            Notification Preferences
          </h2>
          <p className="text-200 mb-6" style={{ color: 'var(--neutral--600)' }}>
            Choose how you want to receive daily reports
          </p>

          <div className="space-y-4">
            {/* Email Reports */}
            <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: 'var(--neutral--300)' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--primary--100)' }}>
                  <Mail className="w-5 h-5" style={{ color: 'var(--primary--500)' }} />
                </div>
                <div>
                  <h3 className="text-200 bold" style={{ color: 'var(--neutral--800)' }}>
                    Email Reports
                  </h3>
                  <p className="text-100" style={{ color: 'var(--neutral--600)' }}>
                    Receive detailed reports via email
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailReportsEnabled}
                  onChange={(e) =>
                    setSettings({ ...settings, emailReportsEnabled: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Dashboard Notifications */}
            <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: 'var(--neutral--300)' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--success--100)' }}>
                  <Bell className="w-5 h-5" style={{ color: 'var(--success--500)' }} />
                </div>
                <div>
                  <h3 className="text-200 bold" style={{ color: 'var(--neutral--800)' }}>
                    Dashboard Notifications
                  </h3>
                  <p className="text-100" style={{ color: 'var(--neutral--600)' }}>
                    Show notifications in dashboard
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.dashboardNotificationsEnabled}
                  onChange={(e) =>
                    setSettings({ ...settings, dashboardNotificationsEnabled: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-4">
          {saveStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
              style={{ color: 'var(--success--500)' }}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-200 bold">Settings saved successfully!</span>
            </motion.div>
          )}

          {saveStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
              style={{ color: 'var(--error--500)' }}
            >
              <AlertCircle className="w-5 h-5" />
              <span className="text-200 bold">Failed to save settings</span>
            </motion.div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="button primary large inline-flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  )
}
