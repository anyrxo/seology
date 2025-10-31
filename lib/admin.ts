// Admin authentication and utilities
// Only authorized users can access admin routes

import { auth, currentUser } from '@clerk/nextjs/server'

// Admin user IDs or emails (environment variable recommended)
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || []
const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS?.split(',') || []

/**
 * Check if the current user is an admin
 * @returns Promise<boolean> - true if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const user = await currentUser()
    if (!user) return false

    // Check if user ID is in admin list
    if (ADMIN_USER_IDS.includes(user.id)) return true

    // Check if email is in admin list
    const email = user.emailAddresses?.[0]?.emailAddress
    if (email && ADMIN_EMAILS.includes(email)) return true

    // Check Clerk metadata for admin role
    const publicMetadata = user.publicMetadata as { role?: string }
    if (publicMetadata?.role === 'admin') return true

    return false
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

/**
 * Require admin authentication - throws error if not admin
 * Use this in server components and API routes
 */
export async function requireAdmin() {
  const adminStatus = await isAdmin()

  if (!adminStatus) {
    throw new Error('Unauthorized: Admin access required')
  }

  return true
}

/**
 * Get admin user info
 */
export async function getAdminUser() {
  await requireAdmin()
  const user = await currentUser()
  return user
}
