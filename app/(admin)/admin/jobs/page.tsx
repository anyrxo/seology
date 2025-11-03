import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/middleware/admin-guard'
import Link from 'next/link'

export default async function AdminJobsPage() {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Background Jobs</h1>
          <p className="text-gray-400">Monitor and manage the job queue</p>
        </div>
      </div>

      {/* Client Component for jobs monitoring */}
      <JobsMonitoringClient />
    </div>
  )
}

function JobsMonitoringClient() {
  return (
    <div className="space-y-6">
      {/* Job Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-900/20 rounded-lg border border-blue-700 p-6">
          <h3 className="text-gray-400 text-sm mb-1">Pending Jobs</h3>
          <p className="text-4xl font-bold text-blue-400">-</p>
        </div>
        <div className="bg-green-900/20 rounded-lg border border-green-700 p-6">
          <h3 className="text-gray-400 text-sm mb-1">Running Jobs</h3>
          <p className="text-4xl font-bold text-green-400">-</p>
        </div>
        <div className="bg-purple-900/20 rounded-lg border border-purple-700 p-6">
          <h3 className="text-gray-400 text-sm mb-1">Completed</h3>
          <p className="text-4xl font-bold text-purple-400">-</p>
        </div>
        <div className="bg-red-900/20 rounded-lg border border-red-700 p-6">
          <h3 className="text-gray-400 text-sm mb-1">Failed</h3>
          <p className="text-4xl font-bold text-red-400">-</p>
        </div>
      </div>

      {/* Job Queue */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Job Queue</h2>
        <p className="text-gray-400">Loading jobs...</p>
        <p className="text-sm text-gray-500 mt-2">
          This page will display the job queue. Implement client-side data fetching from /api/admin/jobs
        </p>
      </div>
    </div>
  )
}
