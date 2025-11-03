import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { IssuesClient } from '@/components/dashboard/IssuesClient'
import { Prisma, Severity } from '@prisma/client'

export default async function IssuesPage({
  searchParams,
}: {
  searchParams: { severity?: string; type?: string; connectionId?: string }
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user
  const dbUser = await db.user.findUnique({
    where: { clerkId: userId },
  })

  if (!dbUser) {
    redirect('/sign-in')
  }

  // Build filters
  const where: Prisma.IssueWhereInput = {
    connection: {
      userId: dbUser.id,
    },
    status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
  }

  // Add severity filter with proper type checking
  if (searchParams.severity) {
    const severityUpper = searchParams.severity.toUpperCase()
    if (Object.values(Severity).includes(severityUpper as Severity)) {
      where.severity = severityUpper as Severity
    }
  }

  if (searchParams.type) {
    where.type = searchParams.type
  }

  if (searchParams.connectionId) {
    where.connectionId = searchParams.connectionId
  }

  // Get issues
  const issues = await db.issue.findMany({
    where,
    include: {
      connection: {
        select: {
          id: true,
          domain: true,
        },
      },
      fixes: {
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: {
          id: true,
          status: true,
        },
      },
    },
    orderBy: [{ severity: 'desc' }, { createdAt: 'desc' }],
    take: 100,
  })

  // Calculate stats
  const totalIssues = await db.issue.count({
    where: {
      connection: { userId: dbUser.id },
      status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
    },
  })

  const criticalIssues = await db.issue.count({
    where: {
      connection: { userId: dbUser.id },
      status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
      severity: 'CRITICAL',
    },
  })

  const highIssues = await db.issue.count({
    where: {
      connection: { userId: dbUser.id },
      status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
      severity: 'HIGH',
    },
  })

  const mediumIssues = await db.issue.count({
    where: {
      connection: { userId: dbUser.id },
      status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
      severity: 'MEDIUM',
    },
  })

  // Get issue type breakdown
  const issuesByType = await db.issue.groupBy({
    by: ['type'],
    where: {
      connection: { userId: dbUser.id },
      status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
    },
    _count: { type: true },
    orderBy: { _count: { type: 'desc' } },
    take: 5,
  })

  const stats = {
    totalIssues,
    criticalIssues,
    highIssues,
    mediumIssues,
  }

  return <IssuesClient issues={issues} stats={stats} issuesByType={issuesByType} />
}
