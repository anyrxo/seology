import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { AutomationSettingsClient } from '@/components/dashboard/AutomationSettingsClient'

export default async function AutomationSettingsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return <AutomationSettingsClient />
}
