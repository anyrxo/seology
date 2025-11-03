import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user from database
  const user = await db.user.findUnique({
    where: { clerkId: userId },
  })

  // Check if user is admin (you can implement your own admin check logic)
  // For now, we'll check if there's a custom claim or use a simple check
  // TODO: Implement proper admin role checking with Clerk metadata

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
