import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function HomePage() {
  const session = await auth()

  // If user is logged in, redirect to dashboard
  if (session.userId) {
    redirect('/dashboard')
  }

  // If not logged in, redirect to sign-in
  redirect('/sign-in')
}
