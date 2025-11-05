import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getAICreditBalance } from '@/lib/ai-credits'
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

  // Get credit balances for all users
  const usersWithCredits = await Promise.all(
    users.map(async (u) => {
      try {
        const balance = await getAICreditBalance(u.id)
        return {
          id: u.id,
          name: u.name,
          email: u.email,
          plan: u.plan,
          role: u.role,
          connectionsCount: u._count.connections,
          createdAt: u.createdAt.toISOString(),
          credits: {
            monthlyCredits: balance.monthlyCredits,
            monthlyUsed: balance.monthlyUsed,
            monthlyRemaining: balance.monthlyRemaining,
            purchasedCredits: balance.purchasedCredits,
            totalAvailable: balance.totalAvailable,
            isUnlimited: balance.isUnlimited,
          },
        }
      } catch (error) {
        // If credit fetch fails, return user without credit data
        return {
          id: u.id,
          name: u.name,
          email: u.email,
          plan: u.plan,
          role: u.role,
          connectionsCount: u._count.connections,
          createdAt: u.createdAt.toISOString(),
          credits: null,
        }
      }
    })
  )

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
