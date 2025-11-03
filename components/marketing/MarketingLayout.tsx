import { AnnouncementBar } from './AnnouncementBar'
import MarketingNavbar from './MarketingNavbar'
import MarketingFooter from './MarketingFooter'
import { AnnouncementProvider } from './AnnouncementContext'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AnnouncementProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Announcement Bar - Fixed at top */}
        <AnnouncementBar />

        {/* Navigation - Fixed below announcement bar */}
        <MarketingNavbar />

        {/* Main Content - Padding to account for fixed header */}
        <main className="pt-[112px]">{children}</main>

        {/* Footer */}
        <MarketingFooter />
      </div>
    </AnnouncementProvider>
  )
}
