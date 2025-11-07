/**
 * Shopify Webhook: products/delete
 *
 * Triggered when a product is deleted in Shopify
 * Removes product from our database
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyWebhook } from '@/lib/shopify-webhook'
import {
  extractWebhookId,
  isWebhookDuplicate,
  markWebhookProcessed,
} from '@/lib/webhook-deduplication'

export const dynamic = 'force-dynamic'

interface ProductDeletePayload {
  id: number
}

export async function POST(req: NextRequest) {
  try {
    // Get webhook headers
    const hmac = req.headers.get('x-shopify-hmac-sha256')
    const shop = req.headers.get('x-shopify-shop-domain')
    const topic = req.headers.get('x-shopify-topic')

    if (!hmac || !shop || !topic) {
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

    // Check for duplicate webhook
    const webhookId = extractWebhookId(req.headers, body)
    if (webhookId) {
      const isDuplicate = await isWebhookDuplicate(webhookId, shop, topic)
      if (isDuplicate) {
        console.log(`[WEBHOOK DUPLICATE] Skipping duplicate webhook ${webhookId} for ${shop}/${topic}`)
        return NextResponse.json({ success: true, message: 'Duplicate webhook ignored' })
      }
    }

    // Parse payload
    const payload: ProductDeletePayload = JSON.parse(body)

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

    // Delete ShopifyProduct record
    const shopifyProductId = payload.id.toString()

    const deletedProduct = await db.shopifyProduct.deleteMany({
      where: {
        connectionId: connection.id,
        shopifyProductId,
      },
    })

    console.log(`Deleted product ${payload.id} for shop ${shop} (${deletedProduct.count} records)`)

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: connection.userId,
        action: 'SHOPIFY_PRODUCT_DELETED_WEBHOOK',
        resource: 'shopify_product',
        resourceId: shopifyProductId,
        details: JSON.stringify({
          productId: payload.id,
          shop,
          deletedCount: deletedProduct.count,
        }),
      },
    })

    // Mark webhook as processed
    if (webhookId) {
      await markWebhookProcessed(webhookId, shop, topic, {
        payload: body,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing products/delete webhook:', error)

    // Mark webhook as failed if we have the ID
    const shop = req.headers.get('x-shopify-shop-domain')
    const topic = req.headers.get('x-shopify-topic')
    const body = await req.text().catch(() => '')
    const webhookId = extractWebhookId(req.headers, body)

    if (webhookId && shop && topic) {
      await markWebhookProcessed(webhookId, shop, topic, {
        processed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }

    // Return 200 to prevent Shopify from retrying on our errors
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 200 })
  }
}
