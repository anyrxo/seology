import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/middleware/admin-guard'

export default async function AdminBroadcastPage() {
  const session = await auth()

  if (!session?.userId) {
    redirect('/sign-in')
  }

  const hasAdminRole = await isAdmin(session.userId)
  if (!hasAdminRole) {
    redirect('/dashboard')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Broadcast Notifications</h1>
        <p className="text-gray-400">Send platform-wide announcements to users</p>
      </div>

      {/* Broadcast Form */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Create Broadcast</h2>

        <form className="space-y-6">
          {/* Notification Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notification Type
            </label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600">
              <option value="INFO">Info</option>
              <option value="SUCCESS">Success</option>
              <option value="WARNING">Warning</option>
              <option value="ERROR">Error</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Notification title"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Notification message"
            />
          </div>

          {/* Action URL (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Action URL (optional)
            </label>
            <input
              type="url"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="/dashboard/settings"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Audience
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="radio" name="audience" value="all" defaultChecked className="text-purple-600" />
                <span className="text-white">All Users</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="audience" value="plan" className="text-purple-600" />
                <span className="text-white">Specific Plan</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="audience" value="role" className="text-purple-600" />
                <span className="text-white">Specific Role</span>
              </label>
            </div>
          </div>

          {/* Plan Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Plan Filter (if applicable)
            </label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600">
              <option value="">All Plans</option>
              <option value="STARTER">Starter</option>
              <option value="GROWTH">Growth</option>
              <option value="SCALE">Scale</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Send Broadcast
            </button>
          </div>
        </form>
      </div>

      {/* Recent Broadcasts */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Broadcasts</h2>
        <p className="text-gray-400">No recent broadcasts</p>
      </div>
    </div>
  )
}
