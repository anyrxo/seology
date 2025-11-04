import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import ConnectionRequestsClient from '@/components/admin/ConnectionRequestsClient'

export default async function ConnectionRequestsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Check if user is admin
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  })

  if (!user || user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  // Get all connection requests with user details
  const requests = await db.connectionRequest.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          plan: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <ConnectionRequestsClient
      requests={requests.map((r) => ({
        id: r.id,
        userId: r.userId,
        userEmail: r.user.email,
        userName: r.user.name,
        userPlan: r.user.plan,
        platform: r.platform,
        storeUrl: r.storeUrl,
        storeName: r.storeName,
        message: r.message,
        status: r.status,
        oauthUrl: r.oauthUrl,
        connectionId: r.connectionId,
        rejectionReason: r.rejectionReason,
        reviewedBy: r.reviewedBy,
        reviewedAt: r.reviewedAt ? r.reviewedAt.toISOString() : null,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      }))}
    />
  )
}
