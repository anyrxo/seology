import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/middleware/admin-guard'
import SitesMonitoringClient from '@/components/admin/SitesMonitoringClient'

export default async function AdminSitesPage() {
  const session = await auth()

  if (!session?.userId) {
    redirect('/sign-in')
  }

  const hasAdminRole = await isAdmin(session.userId)
  if (!hasAdminRole) {
    redirect('/dashboard')
  }

  return <SitesMonitoringClient />
}
