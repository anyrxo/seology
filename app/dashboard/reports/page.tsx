import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ReportsClient } from '@/components/dashboard/ReportsClient'

export default async function ReportsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return <ReportsClient />
}
