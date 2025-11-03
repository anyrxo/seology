import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { AnalyticsClient } from '@/components/dashboard/AnalyticsClient'

export default async function AnalyticsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Mock data - in production, fetch from database
  const analyticsData = {
    issuesFixed: 247,
    timeSaved: '18.5 hrs',
    seoScoreImprovement: '+34%',
    pagesOptimized: 156,
    weeklyData: [
      { week: 'Week 1', issues: 45, fixes: 38 },
      { week: 'Week 2', issues: 52, fixes: 48 },
      { week: 'Week 3', issues: 38, fixes: 35 },
      { week: 'Week 4', issues: 61, fixes: 58 },
    ],
    issueBreakdown: [
      { type: 'Missing Meta Tags', count: 89, percentage: 36 },
      { type: 'Missing Alt Text', count: 64, percentage: 26 },
      { type: 'Poor Headings', count: 45, percentage: 18 },
      { type: 'Broken Links', count: 32, percentage: 13 },
      { type: 'Other', count: 17, percentage: 7 },
    ],
  }

  return <AnalyticsClient data={analyticsData} />
}
