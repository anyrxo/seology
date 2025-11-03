/**
 * Webhooks API
 * Manage user webhook subscriptions
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { registerWebhook, listWebhooks } from '@/lib/webhooks'
import type { WebhookEvent } from '@/lib/webhooks'

export const dynamic = 'force-dynamic'

/**
 * List user's webhooks
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId') || session.userId

    const webhooks = await listWebhooks(userId)

    return NextResponse.json({
      success: true,
      webhooks,
    })
  } catch (error) {
    console.error('Error fetching webhooks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch webhooks' },
      { status: 500 }
    )
  }
}

/**
 * Register a new webhook
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { url, events, secret } = body as {
      url: string
      events: WebhookEvent[]
      secret?: string
    }

    if (!url || !events || !Array.isArray(events) || events.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request. Provide url and events array.' },
        { status: 400 }
      )
    }

    // Validate URL
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    // Get user ID from Clerk
    const userId = session.userId

    const webhook = await registerWebhook(userId, url, events, secret)

    return NextResponse.json({
      success: true,
      webhook,
    })
  } catch (error) {
    console.error('Error registering webhook:', error)
    return NextResponse.json(
      { error: 'Failed to register webhook' },
      { status: 500 }
    )
  }
}
