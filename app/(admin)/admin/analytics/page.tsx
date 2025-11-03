import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AnalyticsOverview from '@/components/admin/AnalyticsOverview'

export default async function AdminAnalyticsPage() {
  const session = await auth()

  if (!session?.userId) {
    redirect('/sign-in')
  }

  // In production, verify user is admin via Clerk roles or database check
  // For now, we'll rely on the API endpoint to check admin status

  return (
    <div>
      <AnalyticsOverview />
    </div>
  )
}
