import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import WordPressConnectionClient from '@/components/dashboard/WordPressConnectionClient'

export default async function WordPressConnectionPage({
  searchParams,
}: {
  searchParams: { domain?: string; requestId?: string }
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <WordPressConnectionClient
      domain={searchParams.domain}
      requestId={searchParams.requestId}
    />
  )
}
