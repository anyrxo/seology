import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { BottomNav } from '@/components/mobile/BottomNav'
import { Footer } from '@/components/layout/Footer'
import { db } from '@/lib/db'

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

  // Check if user is admin and redirect to admin panel
  const dbUser = await db.user.findUnique({
    where: { clerkId: session.userId },
    select: { role: true },
  })

  if (dbUser?.role === 'ADMIN') {
    redirect('/admin')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated gradient orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-breathe"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-breathe" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-breathe" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header with navigation - Full width */}
      <DashboardHeader />

      {/* Main Content Area - Full width, no sidebar */}
      <main className="flex-1 overflow-auto pb-20 md:pb-6 pt-2 md:pt-0 relative z-10">
        <div className="w-full px-4 md:px-6 lg:px-10 py-4 md:py-6 max-w-[100vw] overflow-x-hidden">
          {children}
        </div>
      </main>

      {/* Footer - Hide on mobile */}
      <div className="hidden md:block mt-auto relative z-10">
        <Footer variant="minimal" />
      </div>

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <BottomNav />
    </div>
  )
}
