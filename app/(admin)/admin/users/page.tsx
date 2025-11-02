import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'

export default async function AdminUsersPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get all users with their connections
  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      connections: true,
      _count: {
        select: {
          connections: true,
          notifications: true,
        },
      },
    },
  })

  // Calculate stats
  const totalUsers = users.length
  const starterUsers = users.filter((u) => u.plan === 'STARTER').length
  const growthUsers = users.filter((u) => u.plan === 'GROWTH').length
  const scaleUsers = users.filter((u) => u.plan === 'SCALE').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage all user accounts and permissions</p>
        </div>
        <Link
          href="/admin"
          className="text-gray-400 hover:text-white flex items-center text-sm"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <QuickStat label="Total Users" value={totalUsers} color="text-blue-400" />
        <QuickStat label="Starter Plan" value={starterUsers} color="text-green-400" />
        <QuickStat label="Growth Plan" value={growthUsers} color="text-purple-400" />
        <QuickStat label="Scale Plan" value={scaleUsers} color="text-yellow-400" />
      </div>

      {/* Users Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">All Users</h2>
            <div className="flex items-center space-x-3">
              <input
                type="search"
                placeholder="Search users..."
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 w-64"
              />
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500">
                <option>All Plans</option>
                <option>Starter</option>
                <option>Growth</option>
                <option>Scale</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                  User
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                  Email
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                  Plan
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                  Sites
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                  Joined
                </th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                        {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {user.name || 'No name'}
                        </p>
                        <p className="text-gray-500 text-xs">ID: {user.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-300">{user.email}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.plan === 'STARTER'
                          ? 'bg-green-900 text-green-200'
                          : user.plan === 'GROWTH'
                          ? 'bg-purple-900 text-purple-200'
                          : 'bg-yellow-900 text-yellow-200'
                      }`}
                    >
                      {user.plan}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-300">
                      {user._count.connections}{' '}
                      <span className="text-gray-500">sites</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-400 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-1 rounded hover:bg-blue-900/20 transition-colors">
                        View
                      </button>
                      <button className="text-purple-400 hover:text-purple-300 text-sm font-medium px-3 py-1 rounded hover:bg-purple-900/20 transition-colors">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-800 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing <span className="text-white font-medium">{users.length}</span> of{' '}
            <span className="text-white font-medium">{totalUsers}</span> users
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium">
              1
            </button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
              2
            </button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-4 text-left transition-colors group">
            <div className="text-2xl mb-2">📧</div>
            <h4 className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors">
              Send Email to All
            </h4>
            <p className="text-gray-400 text-sm">
              Broadcast message to all users
            </p>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-4 text-left transition-colors group">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors">
              Export User Data
            </h4>
            <p className="text-gray-400 text-sm">
              Download CSV of all users
            </p>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-4 text-left transition-colors group">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors">
              Manage Permissions
            </h4>
            <p className="text-gray-400 text-sm">
              Update user roles and access
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

function QuickStat({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  )
}
