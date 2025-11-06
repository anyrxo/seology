import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { PendingFixesClient } from '@/components/dashboard/PendingFixesClient'

export const metadata = {
  title: 'Pending Fixes - SEOLOGY.AI',
  description: 'Review and approve pending SEO fixes'
}

export default async function PendingFixesPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user
  const user = await db.user.findFirst({
    where: { clerkId: userId },
    select: { id: true, executionMode: true }
  })

  if (!user) {
    redirect('/sign-in')
  }

  // Get all pending fixes for this user
  const pendingFixes = await db.fix.findMany({
    where: {
      connection: {
        userId: user.id
      },
      status: 'PENDING'
    },
    include: {
      issue: {
        select: {
          id: true,
          type: true,
          severity: true,
          pageUrl: true,
          title: true,
          details: true
        }
      },
      connection: {
        select: {
          id: true,
          domain: true,
          platform: true
        }
      }
    },
    orderBy: [
      { issue: { severity: 'desc' } },
      { createdAt: 'desc' }
    ]
  })

  return (
    <PendingFixesClient
      fixes={pendingFixes.map(fix => ({
        id: fix.id,
        description: fix.description,
        changes: fix.changes,
        createdAt: fix.createdAt,
        issue: fix.issue ? {
          id: fix.issue.id,
          type: fix.issue.type,
          severity: fix.issue.severity,
          pageUrl: fix.issue.pageUrl,
          title: fix.issue.title,
          details: fix.issue.details
        } : null,
        connection: {
          id: fix.connection.id,
          domain: fix.connection.domain,
          platform: fix.connection.platform
        }
      }))}
      executionMode={user.executionMode}
    />
  )
}
