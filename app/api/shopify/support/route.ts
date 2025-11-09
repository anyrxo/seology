/**
 * Shopify Support API
 * Handle support ticket submissions
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const supportRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10)
})

export async function POST(req: NextRequest) {
  try {
    // Verify authentication (session token or shop parameter)
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const connectionId = context.connection.id
    const userId = context.userId

    const body = await req.json()
    const { name, email, subject, message } = supportRequestSchema.parse(body)

    // Create support ticket
    await db.supportTicket.create({
      data: {
        connectionId,
        userId,
        name,
        email,
        subject,
        message,
        status: 'OPEN'
      }
    })

    // TODO: Send email notification to support team
    // TODO: Send confirmation email to customer

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          details: error.issues
        }
      }, { status: 400 })
    }

    console.error('Error creating support ticket:', error)
    return NextResponse.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to create support ticket' }
    }, { status: 500 })
  }
}
