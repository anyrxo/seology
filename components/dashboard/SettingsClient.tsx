'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Settings, Bell, Key, AlertTriangle } from 'lucide-react'

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
  const planLabels = {
    STARTER: 'Starter',
    GROWTH: 'Growth',
    SCALE: 'Scale',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
          Settings
        </h1>
        <p className="text-base sm:text-lg text-white/70">
          Manage your account preferences and execution mode
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="border-b border-white/20"
      >
        <nav className="flex space-x-8">
          <button className="border-b-2 border-blue-400 text-blue-300 pb-4 font-semibold transition-colors">
            Profile
          </button>
          <button className="border-b-2 border-transparent text-white/50 hover:text-white pb-4 font-semibold transition-colors">
            Execution Mode
          </button>
          <button className="border-b-2 border-transparent text-white/50 hover:text-white pb-4 font-semibold transition-colors">
            Notifications
          </button>
          <button className="border-b-2 border-transparent text-white/50 hover:text-white pb-4 font-semibold transition-colors">
            API Keys
          </button>
        </nav>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
          <Settings className="h-6 w-6" />
          Profile Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              First Name
            </label>
            <input
              type="text"
              defaultValue={user.firstName || ''}
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Last Name
            </label>
            <input
              type="text"
              defaultValue={user.lastName || ''}
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue={user.email}
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              User ID
            </label>
            <input
              type="text"
              defaultValue={user.userId}
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white font-mono text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Current Plan
            </label>
            <input
              type="text"
              defaultValue={planLabels[user.plan as keyof typeof planLabels]}
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              disabled
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-sm text-white/60">
            Profile information is managed through Clerk. Visit your{' '}
            <a href="#" className="text-blue-300 hover:text-blue-200 transition-colors">
              account settings
            </a>{' '}
            to make changes.
          </p>
        </div>
      </motion.div>

      {/* Execution Mode Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 space-y-6"
      >
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Fix Execution Mode
          </h2>
          <p className="text-white/60 text-sm">
            Choose how SEO fixes are applied to your sites
          </p>
        </div>

        <div className="space-y-4">
          <ExecutionModeOption
            mode="AUTOMATIC"
            title="Automatic"
            description="Fixes are applied immediately without approval. Best for hands-off automation."
            isActive={user.executionMode === 'AUTOMATIC'}
          />

          <ExecutionModeOption
            mode="PLAN"
            title="Plan Mode"
            description="Claude AI creates a plan of all fixes. You approve once, and all fixes execute together."
            isActive={user.executionMode === 'PLAN'}
          />

          <ExecutionModeOption
            mode="APPROVE"
            title="Approve Mode"
            description="Each fix requires individual approval before application. Maximum control."
            isActive={user.executionMode === 'APPROVE'}
          />
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="bg-blue-400/10 border border-blue-400/30 rounded-2xl p-4">
            <p className="text-sm text-blue-200">
              <strong>Note:</strong> All execution modes include 90-day rollback protection. You can safely revert any fix within 90 days.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Notifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 space-y-6"
      >
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2 flex items-center gap-3">
            <Bell className="h-6 w-6" />
            Email Notifications
          </h2>
          <p className="text-white/60 text-sm">
            Choose what emails you want to receive
          </p>
        </div>

        <div className="space-y-4">
          <NotificationToggle
            label="New Issues Detected"
            description="Get notified when SEO issues are found on your sites"
            enabled={true}
          />

          <NotificationToggle
            label="Fixes Applied"
            description="Receive a summary of fixes applied to your sites"
            enabled={true}
          />

          <NotificationToggle
            label="Weekly Reports"
            description="Get a weekly summary of SEO health across all sites"
            enabled={false}
          />

          <NotificationToggle
            label="Billing Updates"
            description="Important updates about your subscription and usage"
            enabled={true}
          />
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-red-400/10 border border-red-400/30 rounded-3xl p-8"
      >
        <h2 className="text-2xl font-semibold text-red-300 mb-6 flex items-center gap-3">
          <AlertTriangle className="h-6 w-6" />
          Danger Zone
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold mb-1">Delete Account</p>
            <p className="text-white/60 text-sm">
              Permanently delete your account and all associated data
            </p>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
            Delete Account
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ExecutionModeOption({
  mode,
  title,
  description,
  isActive,
}: {
  mode: string
  title: string
  description: string
  isActive: boolean
}) {
  return (
    <label
      className={`block border rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
        isActive
          ? 'border-blue-400 bg-blue-400/10 shadow-lg shadow-blue-500/20'
          : 'border-white/20 hover:border-white/40'
      }`}
    >
      <div className="flex items-start space-x-4">
        <input
          type="radio"
          name="execution_mode"
          value={mode}
          checked={isActive}
          className="mt-1"
          readOnly
        />
        <div className="flex-1">
          <p className="text-white font-semibold text-lg">{title}</p>
          <p className="text-white/60 text-sm mt-1">{description}</p>
        </div>
      </div>
    </label>
  )
}

function NotificationToggle({
  label,
  description,
  enabled,
}: {
  label: string
  description: string
  enabled: boolean
}) {
  return (
    <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl">
      <div>
        <p className="text-white font-semibold">{label}</p>
        <p className="text-white/60 text-sm">{description}</p>
      </div>
      <button
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-500' : 'bg-white/20'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}
