import { db } from '@/lib/db'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AlertTriangle,
  Search,
  Filter,
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  TrendingDown
} from 'lucide-react'

// Get all issues across all sites
async function getAllIssues() {
  const issues = await db.issue.findMany({
    include: {
      connection: {
        include: {
          user: {
            select: {
              email: true,
              name: true
            }
          }
        }
      },
      _count: {
        select: {
          fixes: true
        }
      }
    },
    orderBy: {
      detectedAt: 'desc'
    },
    take: 100 // Limit for performance
  })

  return issues
}

// Get issue statistics
async function getIssueStats() {
  const [totalIssues, criticalIssues, fixedIssues, bySeverity, byCategory] = await Promise.all([
    db.issue.count({
      where: {
        status: {
          in: ['DETECTED', 'FIXING']
        }
      }
    }),
    db.issue.count({
      where: {
        severity: 'CRITICAL',
        status: {
          in: ['DETECTED', 'FIXING']
        }
      }
    }),
    db.issue.count({
      where: {
        status: 'FIXED'
      }
    }),
    db.issue.groupBy({
      by: ['severity'],
      where: {
        status: {
          in: ['DETECTED', 'FIXING']
        }
      },
      _count: true
    }),
    db.issue.groupBy({
      by: ['category'],
      where: {
        status: {
          in: ['DETECTED', 'FIXING']
        }
      },
      _count: true
    })
  ])

  return { totalIssues, criticalIssues, fixedIssues, bySeverity, byCategory }
}

export const dynamic = 'force-dynamic'

export default async function AdminIssues() {
  const [issues, stats] = await Promise.all([
    getAllIssues(),
    getIssueStats()
  ])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Platform Issues
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Monitor all SEO issues detected across the platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Active Issues
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalIssues}
              </p>
            </div>
            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
              <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Critical
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.criticalIssues}
              </p>
            </div>
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900">
              <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Fixed
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.fixedIssues}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              By Severity
            </p>
            <div className="space-y-1">
              {stats.bySeverity.map((severity) => (
                <div key={severity.severity} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">{severity.severity}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{severity._count}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Issues by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {stats.byCategory.map((category) => (
            <div key={category.category} className="flex flex-col">
              <Badge variant="outline" className="mb-2">
                {category.category}
              </Badge>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {category._count}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search issues by type, site, or URL..."
            className="h-10 w-full rounded-lg border bg-gray-50 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </Card>

      {/* Issues Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Issue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Site
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Detected
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              {issues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {issue.type}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {issue.pageUrl}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {issue.connection.domain}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {issue.connection.user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        issue.severity === 'CRITICAL' ? 'destructive' :
                        issue.severity === 'HIGH' ? 'default' :
                        issue.severity === 'MEDIUM' ? 'secondary' :
                        'outline'
                      }
                    >
                      {issue.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline">
                      {issue.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        issue.status === 'FIXED' ? 'default' :
                        issue.status === 'FIXING' ? 'secondary' :
                        issue.status === 'FAILED' ? 'destructive' :
                        'outline'
                      }
                    >
                      {issue.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(issue.detectedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" title="View details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="More actions">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing 1 to {issues.length} issues
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
