/**
 * API Route: Get Shopify Connection
 *
 * Fetches the current user's Shopify connection details
 */

import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Find Shopify connection
    const connection = await db.connection.findFirst({
      where: {
        userId: user.id,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
      select: {
        id: true,
        platform: true,
        domain: true,
        displayName: true,
        status: true,
        lastSync: true,
        credentials: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!connection) {
      return NextResponse.json({
        success: true,
        connection: null,
      })
    }

    // Parse credentials
    const credentials = JSON.parse(connection.credentials || '{}')

    return NextResponse.json({
      success: true,
      connection: {
        ...connection,
        credentials,
      },
    })
  } catch (error) {
    console.error('Error fetching Shopify connection:', error)
    return NextResponse.json(
      { error: 'Failed to fetch connection' },
      { status: 500 }
    )
  }
}
