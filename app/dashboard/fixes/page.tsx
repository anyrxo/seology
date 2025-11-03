import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { FixesClient } from '@/components/dashboard/FixesClient'
import { Prisma } from '@prisma/client'

export default async function FixesPage({
  searchParams,
}: {
  searchParams: { status?: string }
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
  const where: Prisma.FixWhereInput = {
    connection: {
      userId: dbUser.id,
    },
  }

  if (searchParams.status) {
    where.status = searchParams.status.toUpperCase() as Prisma.EnumFixStatusFilter
  }

  // Get fixes
  const fixes = await db.fix.findMany({
    where,
    include: {
      connection: {
        select: {
          id: true,
          domain: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  // Calculate stats
  const totalFixes = await db.fix.count({
    where: { connection: { userId: dbUser.id } },
  })

  const pendingFixes = await db.fix.count({
    where: {
      connection: { userId: dbUser.id },
      status: 'PENDING',
    },
  })

  const thisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const appliedThisMonth = await db.fix.count({
    where: {
      connection: { userId: dbUser.id },
      status: 'APPLIED',
      appliedAt: { gte: thisMonth },
    },
  })

  const now = new Date()
  const availableRollbacks = await db.fix.count({
    where: {
      connection: { userId: dbUser.id },
      status: 'APPLIED',
      rollbackDeadline: { gte: now },
    },
  })

  const stats = {
    totalFixes,
    pendingFixes,
    appliedThisMonth,
    availableRollbacks,
  }

  return (
    <FixesClient
      fixes={fixes}
      stats={stats}
      executionMode={dbUser.executionMode}
    />
  )
}
