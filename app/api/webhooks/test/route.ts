import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

// POST /api/webhooks/test - Test webhook delivery
export const dynamic = 'force-dynamic'

// Helper function to send a single webhook for testing
async function sendTestWebhook(
  url: string,
  payload: Record<string, unknown>,
  secret: string
): Promise<Response> {
  const payloadString = JSON.stringify(payload)

  // Create HMAC signature
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payloadString)
    .digest('hex')

  // Send webhook
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': signature,
      'User-Agent': 'SEOLOGY.AI-Webhook/1.0',
    },
    body: payloadString,
  })
}

export async function POST(req: NextRequest) {
  const session = await auth()

  if (!session.userId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      },
      { status: 401 }
    )
  }

  try {
    const body = await req.json()
    const { webhookId } = body

    if (!webhookId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'webhookId is required'
          }
        },
        { status: 400 }
      )
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: session.userId },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        },
        { status: 404 }
      )
    }

    // Verify webhook exists and belongs to user
    const webhook = await db.webhook.findFirst({
      where: {
        id: webhookId,
        userId: user.id,
      },
    })

    if (!webhook) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'WEBHOOK_NOT_FOUND',
            message: 'Webhook not found or access denied'
          }
        },
        { status: 404 }
      )
    }

    // Create test payload
    const testPayload = {
      event: 'webhook.test',
      timestamp: new Date().toISOString(),
      webhookId: webhook.id,
      data: {
        message: 'This is a test webhook from SEOLOGY.AI',
        userId: user.id,
      },
    }

    // Trigger the webhook
    try {
      const response = await sendTestWebhook(
        webhook.url,
        testPayload,
        webhook.secret
      )

      // Update last triggered timestamp
      await db.webhook.update({
        where: { id: webhookId },
        data: {
          lastTriggeredAt: new Date(),
        },
      })

      // Create audit log
      await db.auditLog.create({
        data: {
          userId: user.id,
          action: 'WEBHOOK_TESTED',
          resource: 'webhook',
          resourceId: webhookId,
          details: JSON.stringify({
            url: webhook.url,
            statusCode: response.status,
            success: response.ok,
          }),
        },
      })

      return NextResponse.json({
        success: true,
        data: {
          webhookId: webhook.id,
          url: webhook.url,
          statusCode: response.status,
          statusText: response.statusText,
          delivered: response.ok,
          timestamp: new Date().toISOString(),
        },
      })
    } catch (deliveryError) {
      // Increment failure count
      await db.webhook.update({
        where: { id: webhookId },
        data: {
          failureCount: { increment: 1 },
          lastTriggeredAt: new Date(),
        },
      })

      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DELIVERY_FAILED',
            message: 'Failed to deliver webhook',
            details: deliveryError instanceof Error ? deliveryError.message : 'Unknown error'
          }
        },
        { status: 502 }
      )
    }
  } catch (error) {
    console.error('POST /api/webhooks/test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to test webhook',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
