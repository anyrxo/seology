import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ReportDetailClient } from '@/components/dashboard/ReportDetailClient'

export default async function ReportDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return <ReportDetailClient reportId={params.id} />
}
