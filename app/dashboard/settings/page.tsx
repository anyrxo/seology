import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Manage your account preferences and execution mode
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <nav className="flex space-x-8">
          <button className="border-b-2 border-blue-500 text-blue-400 pb-4 font-medium">
            Profile
          </button>
          <button className="border-b-2 border-transparent text-gray-400 hover:text-white pb-4 font-medium">
            Execution Mode
          </button>
          <button className="border-b-2 border-transparent text-gray-400 hover:text-white pb-4 font-medium">
            Notifications
          </button>
          <button className="border-b-2 border-transparent text-gray-400 hover:text-white pb-4 font-medium">
            API Keys
          </button>
        </nav>
      </div>

      {/* Profile Section */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">Profile Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              First Name
            </label>
            <input
              type="text"
              defaultValue={user?.firstName || ''}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Last Name
            </label>
            <input
              type="text"
              defaultValue={user?.lastName || ''}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue={user?.emailAddresses[0]?.emailAddress || ''}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              User ID
            </label>
            <input
              type="text"
              defaultValue={userId}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-mono text-sm"
              disabled
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            Profile information is managed through Clerk. Visit your{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              account settings
            </a>{' '}
            to make changes.
          </p>
        </div>
      </div>

      {/* Execution Mode Section */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Fix Execution Mode
          </h2>
          <p className="text-gray-400 text-sm">
            Choose how SEO fixes are applied to your sites
          </p>
        </div>

        <div className="space-y-4">
          <ExecutionModeOption
            mode="automatic"
            title="Automatic"
            description="Fixes are applied immediately without approval. Best for hands-off automation."
            isActive={true}
          />

          <ExecutionModeOption
            mode="plan"
            title="Plan Mode"
            description="Claude AI creates a plan of all fixes. You approve once, and all fixes execute together."
            isActive={false}
          />

          <ExecutionModeOption
            mode="approve"
            title="Approve Mode"
            description="Each fix requires individual approval before application. Maximum control."
            isActive={false}
          />
        </div>

        <div className="pt-4 border-t border-gray-800">
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <p className="text-sm text-blue-200">
              <strong>Note:</strong> All execution modes include 90-day rollback protection. You can safely revert any fix within 90 days.
            </p>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Email Notifications
          </h2>
          <p className="text-gray-400 text-sm">
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
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-300 mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Delete Account</p>
            <p className="text-gray-400 text-sm">
              Permanently delete your account and all associated data
            </p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
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
      className={`block border rounded-lg p-4 cursor-pointer transition-colors ${
        isActive
          ? 'border-blue-500 bg-blue-900/20'
          : 'border-gray-700 hover:border-gray-600'
      }`}
    >
      <div className="flex items-start space-x-3">
        <input
          type="radio"
          name="execution_mode"
          value={mode}
          checked={isActive}
          className="mt-1"
        />
        <div className="flex-1">
          <p className="text-white font-semibold">{title}</p>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
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
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white font-medium">{label}</p>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <button
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}
