import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { BottomNav } from '@/components/mobile/BottomNav'
import { Footer } from '@/components/layout/Footer'

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
    <div className="flex min-h-screen bg-neutral-200">
      {/* Sidebar with Dashflow X classes - Hidden on mobile, visible on desktop */}
      <Sidebar />

      {/* Main Content Area - Full width on mobile, adjusted for sidebar on desktop */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <DashboardHeader />

        {/* Main Content - Add padding bottom for mobile nav */}
        <main className="flex-1 overflow-auto pb-20 lg:pb-0">
          <div className="container-default w-container px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
            {children}
          </div>
        </main>

        {/* Footer - Hide on small mobile */}
        <div className="hidden sm:block mt-auto">
          <Footer variant="minimal" />
        </div>
      </div>

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <BottomNav />
    </div>
  )
}
