import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Redirect to sign-in if not authenticated
  if (!session.userId) {
    redirect('/sign-in')
  }

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden w-full lg:w-auto">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
