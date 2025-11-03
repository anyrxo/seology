import { AnnouncementBar } from './AnnouncementBar'
import { MarketingHeader } from './MarketingHeader'
import { Footer } from '@/components/layout/Footer'
import { AnnouncementProvider } from './AnnouncementContext'

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

        {/* Navigation - Dashflow X Header */}
        <MarketingHeader />

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer - Dashflow X Footer */}
        <Footer />
      </div>
    </AnnouncementProvider>
  )
}
