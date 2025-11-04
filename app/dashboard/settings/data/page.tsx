import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { DataManagementClient } from '@/components/dashboard/DataManagementClient'

export default async function DataManagementPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get database user
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      connections: {
        include: {
          issues: {
            orderBy: { detectedAt: 'desc' },
          },
          fixes: {
            orderBy: { createdAt: 'desc' },
          },
          _count: {
            select: {
              issues: true,
              fixes: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!user) {
    redirect('/sign-in')
  }

  // Transform data for client
  const connections = user.connections.map((conn) => ({
    id: conn.id,
    platform: conn.platform,
    domain: conn.domain,
    displayName: conn.displayName,
    status: conn.status,
    createdAt: conn.createdAt,
    lastSync: conn.lastSync,
    healthStatus: conn.healthStatus,
    pageCount: conn.pageCount,
    issueCount: conn.issueCount,
    hasCredentials: !!conn.credentials,
  }))

  const issues = user.connections.flatMap((conn) =>
    conn.issues.map((issue) => ({
      id: issue.id,
      connectionId: issue.connectionId,
      siteName: conn.displayName || conn.domain,
      type: issue.type,
      title: issue.title,
      severity: issue.severity,
      status: issue.status,
      pageUrl: issue.pageUrl,
      detectedAt: issue.detectedAt,
    }))
  )

  const fixes = user.connections.flatMap((conn) =>
    conn.fixes.map((fix) => ({
      id: fix.id,
      connectionId: fix.connectionId,
      siteName: conn.displayName || conn.domain,
      description: fix.description,
      status: fix.status,
      method: fix.method,
      appliedAt: fix.appliedAt,
      createdAt: fix.createdAt,
      canRollback: fix.status === 'APPLIED' && fix.rollbackDeadline ? new Date(fix.rollbackDeadline) > new Date() : false,
    }))
  )

  return (
    <DataManagementClient
      connections={connections}
      issues={issues}
      fixes={fixes}
    />
  )
}
