import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardClient } from '@/components/dashboard/DashboardClient'

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <DashboardClient userName={user?.firstName || 'there'} />
  )
}
