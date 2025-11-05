import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in?redirect_url=/admin')
  }

  // Admin role check - re-enabled after DATABASE_URL fix
  let userEmail = 'Admin User'
  let isAdmin = false

  try {
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: { role: true, email: true },
    })

    if (!user || user.role !== 'ADMIN') {
      redirect('/dashboard') // Not authorized
    }

    userEmail = user.email
    isAdmin = true
  } catch (error) {
    console.error('Admin layout auth error:', error)
    redirect('/dashboard')
  }

  // This layout only handles auth check
  // The actual admin layout with sidebar is in app/(admin)/admin/layout.tsx
  return <>{children}</>
}
