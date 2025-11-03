'use client'

import { Settings, Bell, AlertTriangle } from 'lucide-react'

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
    <div className="container-default w-container">
      {/* Header */}
      <div className="gap-row-24px">
        <h1 className="text-500 bold color-neutral-800">
          Settings
        </h1>
        <p className="text-200 color-neutral-600">
          Manage your account preferences and execution mode
        </p>
      </div>

      {/* Profile Section */}
      <div className="card pd-32px---24px" style={{ marginTop: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
            <Settings className="color-neutral-800" />
          </div>
          <h2 className="text-300 bold color-neutral-800">
            Profile Information
          </h2>
        </div>

        <div className="grid-2-columns gap-row-24px">
          <div>
            <label className="text-100 color-neutral-600" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              First Name
            </label>
            <input
              type="text"
              defaultValue={user.firstName || ''}
              className="input"
              disabled
            />
          </div>

          <div>
            <label className="text-100 color-neutral-600" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Last Name
            </label>
            <input
              type="text"
              defaultValue={user.lastName || ''}
              className="input"
              disabled
            />
          </div>

          <div>
            <label className="text-100 color-neutral-600" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Email
            </label>
            <input
              type="email"
              defaultValue={user.email}
              className="input"
              disabled
            />
          </div>

          <div>
            <label className="text-100 color-neutral-600" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              User ID
            </label>
            <input
              type="text"
              defaultValue={user.userId}
              className="input"
              style={{ fontFamily: 'monospace', fontSize: '14px' }}
              disabled
            />
          </div>

          <div>
            <label className="text-100 color-neutral-600" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Current Plan
            </label>
            <input
              type="text"
              defaultValue={planLabels[user.plan as keyof typeof planLabels]}
              className="input"
              disabled
            />
          </div>
        </div>

        <div style={{ paddingTop: '24px', borderTop: '1px solid #e5e7eb', marginTop: '24px' }}>
          <p className="text-100 color-neutral-600">
            Profile information is managed through Clerk. Visit your{' '}
            <a href="#" className="color-accent-1" style={{ textDecoration: 'underline' }}>
              account settings
            </a>{' '}
            to make changes.
          </p>
        </div>
      </div>

      {/* Execution Mode Section */}
      <div className="card pd-32px---24px" style={{ marginTop: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 className="text-300 bold color-neutral-800" style={{ marginBottom: '8px' }}>
            Fix Execution Mode
          </h2>
          <p className="text-100 color-neutral-600">
            Choose how SEO fixes are applied to your sites
          </p>
        </div>

        <div className="gap-row-24px">
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

        <div style={{ paddingTop: '24px', borderTop: '1px solid #e5e7eb', marginTop: '24px' }}>
          <div style={{ backgroundColor: '#dbeafe', border: '1px solid #93c5fd', borderRadius: '12px', padding: '16px' }}>
            <p className="text-100 color-neutral-800">
              <strong>Note:</strong> All execution modes include 90-day rollback protection. You can safely revert any fix within 90 days.
            </p>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="card pd-32px---24px" style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
            <Bell className="color-neutral-800" />
          </div>
          <div>
            <h2 className="text-300 bold color-neutral-800" style={{ marginBottom: '4px' }}>
              Email Notifications
            </h2>
            <p className="text-100 color-neutral-600">
              Choose what emails you want to receive
            </p>
          </div>
        </div>

        <div className="gap-row-24px">
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
      </div>

      {/* Danger Zone */}
      <div className="card pd-32px---24px" style={{ marginTop: '24px', backgroundColor: '#fee2e2', border: '1px solid #fca5a5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', color: '#dc2626' }}>
            <AlertTriangle />
          </div>
          <h2 className="text-300 bold" style={{ color: '#dc2626' }}>
            Danger Zone
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <p className="text-200 bold color-neutral-800" style={{ marginBottom: '4px' }}>Delete Account</p>
            <p className="text-100 color-neutral-600">
              Permanently delete your account and all associated data
            </p>
          </div>
          <button className="btn-primary" style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
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
      className="card pd-24px"
      style={{
        cursor: 'pointer',
        border: isActive ? '2px solid #3b82f6' : '1px solid #e5e7eb',
        backgroundColor: isActive ? '#eff6ff' : 'white'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <input
          type="radio"
          name="execution_mode"
          value={mode}
          checked={isActive}
          className="checkbox"
          style={{ marginTop: '4px' }}
          readOnly
        />
        <div style={{ flex: 1 }}>
          <p className="text-200 bold color-neutral-800">{title}</p>
          <p className="text-100 color-neutral-600" style={{ marginTop: '4px' }}>{description}</p>
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
    <div className="card pd-24px" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <p className="text-200 bold color-neutral-800">{label}</p>
        <p className="text-100 color-neutral-600">{description}</p>
      </div>
      <div className="toggle-button-wrapper">
        <input
          type="checkbox"
          checked={enabled}
          readOnly
          style={{
            width: '48px',
            height: '28px',
            borderRadius: '14px',
            backgroundColor: enabled ? '#3b82f6' : '#d1d5db',
            position: 'relative',
            cursor: 'pointer'
          }}
        />
      </div>
    </div>
  )
}
