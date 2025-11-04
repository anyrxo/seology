import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/middleware/admin-guard'
import BroadcastClient from '@/components/admin/BroadcastClient'

export default async function AdminBroadcastPage() {
  const session = await auth()

  if (!session?.userId) {
    redirect('/sign-in')
  }

  const hasAdminRole = await isAdmin(session.userId)
  if (!hasAdminRole) {
    redirect('/dashboard')
  }

  return <BroadcastClient />
}
