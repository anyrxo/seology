import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import UsersManagementClient from '@/components/admin/UsersManagementClient'

export default async function AdminUsersPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get all users with their connections
  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: {
          connections: true,
        },
      },
    },
  })

  // Get credit balances efficiently with batched queries
  const now = new Date()
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1)

  // Batch fetch usage records for all users
  const usageRecords = await db.usageRecord.findMany({
    where: {
      userId: { in: users.map(u => u.id) },
      period: periodStart,
    },
  })

  // Batch fetch purchased credits for all users
  const purchasedCredits = await db.aICreditPurchase.groupBy({
    by: ['userId'],
    where: {
      userId: { in: users.map(u => u.id) },
      status: 'COMPLETED',
      creditsRemaining: { gt: 0 },
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    },
    _sum: {
      creditsRemaining: true,
    },
  })

  // Create lookup maps
  const usageMap = new Map(usageRecords.map(r => [r.userId, r]))
  const purchasedMap = new Map(purchasedCredits.map(p => [p.userId, p._sum.creditsRemaining || 0]))

  // Get plan limits
  const { getPlan } = await import('@/lib/plans')

  // Map users with their credit data
  const usersWithCredits = users.map((u) => {
    const plan = getPlan(u.plan)
    const monthlyLimit = plan.limits.aiCreditsPerMonth
    const isUnlimited = monthlyLimit === -1

    const usage = usageMap.get(u.id)
    const monthlyUsed = usage?.aiCreditsUsed || 0
    const monthlyRemaining = isUnlimited ? -1 : Math.max(0, monthlyLimit - monthlyUsed)
    const purchased = purchasedMap.get(u.id) || 0
    const totalAvailable = isUnlimited ? -1 : monthlyRemaining + purchased

    return {
      id: u.id,
      name: u.name,
      email: u.email,
      plan: u.plan,
      role: u.role,
      connectionsCount: u._count.connections,
      createdAt: u.createdAt.toISOString(),
      credits: {
        monthlyCredits: monthlyLimit,
        monthlyUsed,
        monthlyRemaining,
        purchasedCredits: purchased,
        totalAvailable,
        isUnlimited,
      },
    }
  })

  // Calculate stats
  const totalUsers = users.length
  const starterUsers = users.filter((u) => u.plan === 'STARTER').length
  const growthUsers = users.filter((u) => u.plan === 'GROWTH').length
  const scaleUsers = users.filter((u) => u.plan === 'SCALE').length

  return (
    <UsersManagementClient
      users={usersWithCredits}
      stats={{
        total: totalUsers,
        starter: starterUsers,
        growth: growthUsers,
        scale: scaleUsers,
      }}
    />
  )
}
