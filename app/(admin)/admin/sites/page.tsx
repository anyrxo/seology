import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/middleware/admin-guard'
import Link from 'next/link'

export default async function AdminSitesPage() {
  const session = await auth()

  if (!session?.userId) {
    redirect('/sign-in')
  }

  const hasAdminRole = await isAdmin(session.userId)
  if (!hasAdminRole) {
    redirect('/dashboard')
  }

  // Fetch sites data from API on client side
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Sites Monitoring</h1>
          <p className="text-gray-400">Monitor all connected sites across the platform</p>
        </div>
      </div>

      {/* Client Component for data fetching and display */}
      <SitesMonitoringClient />
    </div>
  )
}

function SitesMonitoringClient() {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <p className="text-gray-400">Loading sites data...</p>
      <p className="text-sm text-gray-500 mt-2">
        This page will display all connected sites. Implement client-side data fetching from /api/admin/sites
      </p>
    </div>
  )
}
