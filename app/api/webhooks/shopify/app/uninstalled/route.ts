/**
 * Shopify Webhook: app/uninstalled
 *
 * Triggered when the app is uninstalled from a Shopify store
 * Cleans up connection and related data
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyWebhook } from '@/lib/shopify-webhook'

export const dynamic = 'force-dynamic'

interface AppUninstalledPayload {
  id: number
  name: string
  domain: string
  myshopify_domain: string
}

export async function POST(req: NextRequest) {
  try {
    // Get webhook headers
    const hmac = req.headers.get('x-shopify-hmac-sha256')
    const shop = req.headers.get('x-shopify-shop-domain')
    const topic = req.headers.get('x-shopify-topic')

    if (!hmac || !shop) {
      return NextResponse.json({ error: 'Missing webhook headers' }, { status: 400 })
    }

    // Get raw body for HMAC verification
    const body = await req.text()

    // Verify webhook signature
    const secret = process.env.SHOPIFY_CLIENT_SECRET
    if (!secret) {
      console.error('SHOPIFY_CLIENT_SECRET not configured')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const isValid = verifyWebhook(body, hmac, secret)
    if (!isValid) {
      console.error('Invalid webhook signature from', shop)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Parse payload
    const payload: AppUninstalledPayload = JSON.parse(body)

    // Find connection for this shop
    const connection = await db.connection.findFirst({
      where: {
        platform: 'SHOPIFY',
        domain: shop,
      },
    })

    if (!connection) {
      console.warn(`No connection found for shop: ${shop}`)
      // Return 200 to prevent Shopify from retrying
      return NextResponse.json({ success: true, message: 'No connection found' })
    }

    // Update connection status to DISCONNECTED
    // We don't delete it to preserve audit history
    await db.connection.update({
      where: { id: connection.id },
      data: {
        status: 'DISCONNECTED',
      },
    })

    console.log(`App uninstalled from shop ${shop} (${payload.name})`)

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: connection.userId,
        action: 'SHOPIFY_APP_UNINSTALLED_WEBHOOK',
        resource: 'connection',
        resourceId: connection.id,
        details: JSON.stringify({
          shopId: payload.id,
          shopName: payload.name,
          shopDomain: payload.domain,
          myshopifyDomain: payload.myshopify_domain,
        }),
      },
    })

    // Optional: Send notification to user
    await db.notification.create({
      data: {
        userId: connection.userId,
        type: 'WARNING',
        title: 'Shopify App Uninstalled',
        message: `Your Shopify store "${payload.name}" has been disconnected.`,
        actionUrl: '/dashboard/shopify',
        icon: 'alert-triangle',
        color: 'yellow',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing app/uninstalled webhook:', error)
    // Return 200 to prevent Shopify from retrying on our errors
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 200 })
  }
}
