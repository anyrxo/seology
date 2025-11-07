/**
 * Webhook Deduplication System
 *
 * Prevents duplicate webhook processing by tracking webhook IDs
 * and detecting retries from Shopify or other platforms.
 */

import crypto from 'crypto'
import { db } from '@/lib/db'

/**
 * Generate a unique webhook ID from webhook data
 * Used when platform doesn't provide a unique webhook ID
 */
export function generateWebhookId(
  shop: string,
  topic: string,
  payload: string,
  timestamp?: string
): string {
  const data = `${shop}:${topic}:${payload}:${timestamp || ''}`
  return crypto.createHash('sha256').update(data).digest('hex')
}

/**
 * Extract webhook ID from headers or payload
 * Shopify provides X-Shopify-Webhook-Id header
 */
export function extractWebhookId(headers: Headers, payload?: string): string | null {
  // Try to get Shopify's webhook ID from headers
  const shopifyWebhookId = headers.get('x-shopify-webhook-id')
  if (shopifyWebhookId) {
    return shopifyWebhookId
  }

  // Fallback: generate from payload if available
  if (payload) {
    const shop = headers.get('x-shopify-shop-domain')
    const topic = headers.get('x-shopify-topic')
    const timestamp = headers.get('x-shopify-webhook-timestamp')

    if (shop && topic) {
      return generateWebhookId(shop, topic, payload, timestamp || undefined)
    }
  }

  return null
}

/**
 * Check if a webhook has already been processed
 * Returns true if this is a duplicate, false if new
 */
export async function isWebhookDuplicate(
  webhookId: string,
  shop: string,
  topic: string
): Promise<boolean> {
  try {
    const existing = await db.webhookEvent.findUnique({
      where: { webhookId },
      select: { id: true, attempts: true },
    })

    if (existing) {
      // Increment attempt counter for monitoring
      await db.webhookEvent.update({
        where: { webhookId },
        data: {
          attempts: {
            increment: 1,
          },
        },
      })

      console.log(
        `[WEBHOOK DUPLICATE] Webhook ${webhookId} already processed for ${shop}/${topic} (attempt ${existing.attempts + 1})`
      )
      return true
    }

    return false
  } catch (error) {
    console.error('[WEBHOOK DEDUP] Error checking duplicate:', error)
    // On error, allow processing to continue (fail open)
    return false
  }
}

/**
 * Mark a webhook as processed
 * Stores webhook details for deduplication and debugging
 */
export async function markWebhookProcessed(
  webhookId: string,
  shop: string,
  topic: string,
  options?: {
    payload?: string
    headers?: Record<string, string | null>
    processed?: boolean
    error?: string
  }
): Promise<void> {
  try {
    // Set expiration to 24 hours from now
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    await db.webhookEvent.create({
      data: {
        webhookId,
        shop,
        topic,
        payload: options?.payload,
        headers: options?.headers ? JSON.stringify(options.headers) : null,
        processed: options?.processed ?? true,
        error: options?.error,
        expiresAt,
      },
    })

    console.log(`[WEBHOOK PROCESSED] Marked webhook ${webhookId} as processed for ${shop}/${topic}`)
  } catch (error) {
    // Don't throw - this is a best-effort tracking system
    console.error('[WEBHOOK DEDUP] Error marking webhook as processed:', error)
  }
}

/**
 * Clean up expired webhook events
 * Should be called periodically (e.g., via cron job)
 */
export async function cleanupExpiredWebhooks(): Promise<number> {
  try {
    const now = new Date()

    const result = await db.webhookEvent.deleteMany({
      where: {
        expiresAt: {
          lt: now,
        },
      },
    })

    console.log(`[WEBHOOK CLEANUP] Deleted ${result.count} expired webhook events`)
    return result.count
  } catch (error) {
    console.error('[WEBHOOK CLEANUP] Error cleaning up expired webhooks:', error)
    return 0
  }
}

/**
 * Get recent webhook activity for monitoring
 */
export async function getRecentWebhookActivity(
  shop: string,
  topic?: string,
  limit: number = 50
): Promise<
  Array<{
    id: string
    webhookId: string
    topic: string
    processed: boolean
    attempts: number
    processedAt: Date
    error: string | null
  }>
> {
  try {
    const webhooks = await db.webhookEvent.findMany({
      where: {
        shop,
        ...(topic && { topic }),
      },
      select: {
        id: true,
        webhookId: true,
        topic: true,
        processed: true,
        attempts: true,
        processedAt: true,
        error: true,
      },
      orderBy: {
        processedAt: 'desc',
      },
      take: limit,
    })

    return webhooks
  } catch (error) {
    console.error('[WEBHOOK ACTIVITY] Error fetching recent activity:', error)
    return []
  }
}

/**
 * Get webhook statistics for monitoring dashboard
 */
export async function getWebhookStats(
  shop: string,
  since?: Date
): Promise<{
  total: number
  duplicates: number
  failed: number
  byTopic: Record<string, number>
}> {
  try {
    const where = {
      shop,
      ...(since && {
        processedAt: {
          gte: since,
        },
      }),
    }

    const [total, duplicates, failed, byTopic] = await Promise.all([
      // Total webhooks
      db.webhookEvent.count({ where }),

      // Duplicates (attempts > 1)
      db.webhookEvent.count({
        where: {
          ...where,
          attempts: {
            gt: 1,
          },
        },
      }),

      // Failed webhooks
      db.webhookEvent.count({
        where: {
          ...where,
          processed: false,
        },
      }),

      // By topic
      db.webhookEvent.groupBy({
        by: ['topic'],
        where,
        _count: {
          topic: true,
        },
      }),
    ])

    const topicCounts = byTopic.reduce<Record<string, number>>(
      (acc, item) => {
        acc[item.topic] = item._count.topic
        return acc
      },
      {}
    )

    return {
      total,
      duplicates,
      failed,
      byTopic: topicCounts,
    }
  } catch (error) {
    console.error('[WEBHOOK STATS] Error fetching stats:', error)
    return {
      total: 0,
      duplicates: 0,
      failed: 0,
      byTopic: {},
    }
  }
}
