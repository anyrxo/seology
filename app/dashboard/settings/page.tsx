import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { SettingsClient } from '@/components/dashboard/SettingsClient'

export default async function SettingsPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get database user
  const dbUser = await db.user.findUnique({
    where: { clerkId: userId },
  })

  if (!dbUser) {
    redirect('/sign-in')
  }

  const userData = {
    firstName: user?.firstName || null,
    lastName: user?.lastName || null,
    email: user?.emailAddresses[0]?.emailAddress || '',
    userId,
    plan: dbUser.plan,
    executionMode: dbUser.executionMode,
    businessName: dbUser.businessName,
    businessType: dbUser.businessType,
    businessStage: dbUser.businessStage,
    platform: dbUser.platform,
  }

  return <SettingsClient user={userData} />
}
