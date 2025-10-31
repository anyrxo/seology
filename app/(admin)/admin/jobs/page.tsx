import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Activity,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Zap
} from 'lucide-react'

// Mock job data - In production, this would come from a job queue system like Bull, BullMQ, or similar
const mockJobs = [
  {
    id: '1',
    name: 'Site Crawl Job',
    description: 'Crawls all connected sites for SEO issues',
    status: 'running',
    lastRun: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    nextRun: new Date(Date.now() + 1000 * 60 * 45), // in 45 mins
    interval: '1 hour',
    successCount: 234,
    failureCount: 3,
  },
  {
    id: '2',
    name: 'Issue Analysis Job',
    description: 'Analyzes detected issues with Claude AI',
    status: 'running',
    lastRun: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    nextRun: new Date(Date.now() + 1000 * 60 * 25), // in 25 mins
    interval: '30 minutes',
    successCount: 456,
    failureCount: 8,
  },
  {
    id: '3',
    name: 'Fix Application Job',
    description: 'Applies approved fixes to sites',
    status: 'idle',
    lastRun: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    nextRun: new Date(Date.now() + 1000 * 60 * 60), // in 1 hour
    interval: '3 hours',
    successCount: 189,
    failureCount: 12,
  },
  {
    id: '4',
    name: 'Metrics Collection Job',
    description: 'Collects SEO metrics from Google Search Console',
    status: 'running',
    lastRun: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    nextRun: new Date(Date.now() + 1000 * 60 * 330), // in 5.5 hours
    interval: '6 hours',
    successCount: 78,
    failureCount: 2,
  },
  {
    id: '5',
    name: 'Cleanup Job',
    description: 'Removes expired rollback data and old audit logs',
    status: 'idle',
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    nextRun: new Date(Date.now() + 1000 * 60 * 60 * 12), // in 12 hours
    interval: '24 hours',
    successCount: 45,
    failureCount: 0,
  },
  {
    id: '6',
    name: 'Subscription Sync Job',
    description: 'Syncs subscription status from Stripe',
    status: 'running',
    lastRun: new Date(Date.now() - 1000 * 60 * 10), // 10 mins ago
    nextRun: new Date(Date.now() + 1000 * 60 * 50), // in 50 mins
    interval: '1 hour',
    successCount: 123,
    failureCount: 1,
  },
  {
    id: '7',
    name: 'Usage Tracking Job',
    description: 'Updates usage statistics for billing',
    status: 'idle',
    lastRun: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    nextRun: new Date(Date.now() + 1000 * 60 * 60), // in 1 hour
    interval: '4 hours',
    successCount: 67,
    failureCount: 0,
  },
  {
    id: '8',
    name: 'Email Notification Job',
    description: 'Sends email notifications for important events',
    status: 'error',
    lastRun: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
    nextRun: new Date(Date.now() + 1000 * 60 * 15), // in 15 mins
    interval: '1 hour',
    successCount: 234,
    failureCount: 15,
  },
]

const recentJobRuns = [
  {
    id: '1',
    jobName: 'Site Crawl Job',
    status: 'completed',
    duration: '2m 34s',
    itemsProcessed: 47,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: '2',
    jobName: 'Subscription Sync Job',
    status: 'completed',
    duration: '45s',
    itemsProcessed: 12,
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: '3',
    jobName: 'Issue Analysis Job',
    status: 'completed',
    duration: '1m 12s',
    itemsProcessed: 23,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '4',
    jobName: 'Email Notification Job',
    status: 'failed',
    duration: '12s',
    itemsProcessed: 0,
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    error: 'SMTP connection timeout',
  },
]

export const dynamic = 'force-dynamic'

export default function AdminJobs() {
  const runningJobs = mockJobs.filter(j => j.status === 'running').length
  const totalJobs = mockJobs.length
  const totalSuccess = mockJobs.reduce((sum, j) => sum + j.successCount, 0)
  const totalFailures = mockJobs.reduce((sum, j) => sum + j.failureCount, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Background Jobs
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Monitor and manage scheduled background tasks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="default" size="sm">
            <Play className="mr-2 h-4 w-4" />
            Run All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Jobs
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {totalJobs}
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
              <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Running
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {runningJobs}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
              <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Success
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {totalSuccess}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Failures
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {totalFailures}
              </p>
            </div>
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900">
              <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Jobs List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Job
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Last Run
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Next Run
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Success / Fail
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              {mockJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {job.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {job.description}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        Runs every {job.interval}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        job.status === 'running' ? 'default' :
                        job.status === 'error' ? 'destructive' :
                        'outline'
                      }
                    >
                      {job.status === 'running' && <Activity className="mr-1 h-3 w-3 animate-pulse" />}
                      {job.status === 'error' && <XCircle className="mr-1 h-3 w-3" />}
                      {job.status === 'idle' && <Clock className="mr-1 h-3 w-3" />}
                      {job.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(job.lastRun).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(job.nextRun).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600 dark:text-green-400">
                        {job.successCount}
                      </span>
                      <span className="text-gray-400">/</span>
                      <span className="text-sm text-red-600 dark:text-red-400">
                        {job.failureCount}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" title="Run now">
                        <Play className="h-4 w-4" />
                      </Button>
                      {job.status === 'running' && (
                        <Button variant="ghost" size="sm" title="Pause">
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Job Runs */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Job Runs
        </h2>
        <div className="space-y-4">
          {recentJobRuns.map((run) => (
            <div key={run.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
              <div className={`rounded-full p-2 ${
                run.status === 'completed'
                  ? 'bg-green-100 dark:bg-green-900'
                  : 'bg-red-100 dark:bg-red-900'
              }`}>
                {run.status === 'completed' ? (
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {run.jobName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {run.status === 'completed'
                    ? `Processed ${run.itemsProcessed} items in ${run.duration}`
                    : `Failed: ${run.error}`
                  }
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {new Date(run.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
