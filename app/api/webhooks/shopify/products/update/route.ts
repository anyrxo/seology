/**
 * Shopify Webhook: products/update
 *
 * Triggered when a product is updated in Shopify
 * Updates our database to stay in sync
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyWebhook, type ProductWebhookPayload } from '@/lib/shopify-webhook'

export const dynamic = 'force-dynamic'

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
    const payload: ProductWebhookPayload = JSON.parse(body)

    // Find connection for this shop
    const connection = await db.connection.findFirst({
      where: {
        platform: 'SHOPIFY',
        domain: shop,
        status: 'CONNECTED',
      },
    })

    if (!connection) {
      console.warn(`No connection found for shop: ${shop}`)
      // Return 200 to prevent Shopify from retrying
      return NextResponse.json({ success: true, message: 'No connection found' })
    }

    // Update or create ShopifyProduct record
    const shopifyProductId = payload.id.toString()

    // Calculate basic SEO score
    let seoScore = 100
    if (!payload.title || payload.title.length < 30) seoScore -= 20
    if (!payload.title || payload.title.length > 60) seoScore -= 10
    if (!payload.body_html || payload.body_html.length < 200) seoScore -= 20
    if (payload.images.some((img) => !img.alt)) seoScore -= 15
    if (!payload.tags || payload.tags.length === 0) seoScore -= 10

    const issuesCount = 100 - seoScore

    await db.shopifyProduct.upsert({
      where: {
        connectionId_shopifyProductId: {
          connectionId: connection.id,
          shopifyProductId,
        },
      },
      create: {
        connectionId: connection.id,
        shopifyProductId,
        shopifyHandle: payload.handle,
        title: payload.title,
        status: payload.status,
        seoScore,
        issuesCount,
        // Price from first variant
        price: payload.variants[0] ? parseFloat(payload.variants[0].price) : null,
      },
      update: {
        shopifyHandle: payload.handle,
        title: payload.title,
        status: payload.status,
        seoScore,
        issuesCount,
        price: payload.variants[0] ? parseFloat(payload.variants[0].price) : null,
      },
    })

    console.log(`Updated product ${payload.id} (${payload.title}) for shop ${shop}`)

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: connection.userId,
        action: 'SHOPIFY_PRODUCT_UPDATED_WEBHOOK',
        resource: 'shopify_product',
        resourceId: shopifyProductId,
        details: JSON.stringify({
          productTitle: payload.title,
          handle: payload.handle,
          seoScore,
        }),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing products/update webhook:', error)
    // Return 200 to prevent Shopify from retrying on our errors
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 200 })
  }
}
