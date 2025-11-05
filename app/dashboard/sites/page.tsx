import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { SitesManagement } from '@/components/dashboard/SitesManagement'

export default async function SitesPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user and their connections with comprehensive data
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      connections: {
        include: {
          issues: {
            where: { status: { not: 'FIXED' } },
            orderBy: { detectedAt: 'desc' },
          },
          _count: {
            select: {
              issues: {
                where: { status: { not: 'FIXED' } }
              },
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

  const connections = user.connections || []

  return <SitesManagement connections={connections} />
}
