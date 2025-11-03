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
    <div className="header-sidebar-wrapper bg-neutral-200">
      {/* Sidebar with Dashflow X classes */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="page-wrapper full-page-wrapper" style={{ marginLeft: '0' }}>
        {/* Header */}
        <DashboardHeader />

        {/* Main Content */}
        <main className="flex-1 overflow-auto pb-16 md:pb-0">
          <div className="container-default w-container" style={{ padding: '24px 40px' }}>
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer variant="minimal" />
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
