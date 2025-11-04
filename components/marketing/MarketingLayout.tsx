import { AnnouncementBar } from './AnnouncementBar'
import RadiantNav from './RadiantNav'
import { RadiantFooter } from './RadiantFooter'
import { AnnouncementProvider } from './AnnouncementContext'

/**
 * MarketingLayout Component
 * Main layout for marketing pages with:
 * - Announcement bar (optional)
 * - RadiantNav (sticky navigation with mega dropdown)
 * - Main content area
 * - RadiantFooter (newsletter + multi-column footer)
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AnnouncementProvider>
      <div className="min-h-screen bg-neutral-200">
        {/* Announcement Bar - Fixed at top */}
        <AnnouncementBar />

        {/* Navigation - Radiant UI Style */}
        <RadiantNav />

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer - Radiant UI with Newsletter */}
        <RadiantFooter />
      </div>
    </AnnouncementProvider>
  )
}
