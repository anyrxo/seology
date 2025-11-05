import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
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

  // NOTE: Admin role checking should be done in middleware or API routes
  // Don't query database here - it causes connection pool exhaustion
  // Each page makes its own queries, and this layout query blocks the pool

  return (
    <div className="flex min-h-screen bg-gray-950 flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden w-full lg:w-auto">
        <AdminHeader />
        <main className="flex-1 overflow-auto pb-20 lg:pb-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
