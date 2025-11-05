import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect('/sign-in')
  }

  // Ensure user exists in database
  let dbUser = await db.user.findUnique({
    where: { clerkId: userId },
  })

  // Create user if doesn't exist
  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        clerkId: userId,
        email: user?.emailAddresses[0]?.emailAddress || `${userId}@placeholder.com`,
        name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName || null,
        plan: 'STARTER',
        executionMode: 'AUTOMATIC',
        onboardingCompleted: false,
        onboardingStep: 0,
      },
    })
  }

  // Redirect admins to admin panel
  if (dbUser.role === 'ADMIN') {
    redirect('/admin')
  }

  // Redirect new users to onboarding
  if (!dbUser.onboardingCompleted) {
    redirect('/dashboard/onboarding')
  }

  // Redirect to chat as the default landing page
  redirect('/dashboard/chat')
}
