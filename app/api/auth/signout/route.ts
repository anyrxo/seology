import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function POST() {
  const { userId } = await auth()

  if (userId) {
    // Clerk handles the sign out automatically through their middleware
    // We just need to redirect to the sign-in page
    redirect('/sign-in')
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/sign-in',
    },
  })
}
