import { AnnouncementBar } from './AnnouncementBar'
import MarketingNavbar from './MarketingNavbar'
import MarketingFooter from './MarketingFooter'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Navigation */}
      <MarketingNavbar />

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <MarketingFooter />
    </div>
  )
}
