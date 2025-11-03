/**
 * Webhook System
 * Allows external services to subscribe to platform events
 */

import { db } from './db'
import crypto from 'crypto'

export type WebhookEvent =
  | 'fix.applied'
  | 'fix.failed'
  | 'issue.detected'
  | 'site.connected'
  | 'site.disconnected'
  | 'analysis.completed'

// Define specific data types for each event
export interface FixAppliedData {
  fixId: string
  issueId: string
  issueTitle: string
  siteId: string
  siteName: string
  appliedAt: string
}

export interface FixFailedData {
  fixId: string
  issueId: string
  issueTitle: string
  siteId: string
  error: string
  failedAt: string
}

export interface IssueDetectedData {
  issueId: string
  type: string
  severity: string
  pageUrl: string
  siteId: string
  detectedAt: string
}

export interface SiteConnectedData {
  siteId: string
  platform: string
  domain: string
  connectedAt: string
}

export interface SiteDisconnectedData {
  siteId: string
  platform: string
  domain: string
  disconnectedAt: string
}

export interface AnalysisCompletedData {
  siteId: string
  issuesFound: number
  completedAt: string
}

export type WebhookEventData =
  | FixAppliedData
  | FixFailedData
  | IssueDetectedData
  | SiteConnectedData
  | SiteDisconnectedData
  | AnalysisCompletedData

interface WebhookPayload {
  event: WebhookEvent
  data: WebhookEventData
  timestamp: string
  webhookId: string
}

/**
 * Register a new webhook
 */
export async function registerWebhook(
  userId: string,
  url: string,
  events: WebhookEvent[],
  secret?: string
) {
  // Generate secret if not provided
  const webhookSecret = secret || crypto.randomBytes(32).toString('hex')

  const webhook = await db.webhook.create({
    data: {
      userId,
      url,
      events: JSON.stringify(events),
      secret: webhookSecret,
      enabled: true,
    },
  })

  return {
    id: webhook.id,
    url: webhook.url,
    events,
    secret: webhookSecret,
    enabled: webhook.enabled,
  }
}

/**
 * Trigger webhooks for an event
 */
export async function triggerWebhooks(
  userId: string,
  event: WebhookEvent,
  data: WebhookEventData
) {
  // Get all webhooks for this user that listen to this event
  const webhooks = await db.webhook.findMany({
    where: {
      userId,
      enabled: true,
    },
  })

  // Filter webhooks that listen to this event
  const relevantWebhooks = webhooks.filter((webhook) => {
    const events = JSON.parse(webhook.events) as WebhookEvent[]
    return events.includes(event)
  })

  // Trigger each webhook
  const results = await Promise.allSettled(
    relevantWebhooks.map((webhook) =>
      sendWebhook(webhook.id, webhook.url, webhook.secret, event, data)
    )
  )

  // Log results
  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    const webhook = relevantWebhooks[i]
    if (!webhook) continue

    if (result.status === 'fulfilled') {
      // Update last triggered time
      await db.webhook.update({
        where: { id: webhook.id },
        data: { lastTriggeredAt: new Date() },
      })
    } else {
      // Log failure
      console.error(`Webhook ${webhook.id} failed:`, result.reason)

      // Update failure count
      await db.webhook.update({
        where: { id: webhook.id },
        data: {
          failureCount: {
            increment: 1,
          },
        },
      })

      // Disable if too many failures
      if (webhook.failureCount >= 10) {
        await db.webhook.update({
          where: { id: webhook.id },
          data: { enabled: false },
        })
      }
    }
  }

  return {
    triggered: relevantWebhooks.length,
    succeeded: results.filter((r): r is PromiseFulfilledResult<void> => r.status === 'fulfilled').length,
    failed: results.filter((r): r is PromiseRejectedResult => r.status === 'rejected').length,
  }
}

/**
 * Send a single webhook
 */
async function sendWebhook(
  webhookId: string,
  url: string,
  secret: string,
  event: WebhookEvent,
  eventData: WebhookEventData
): Promise<void> {
  const payload: WebhookPayload = {
    event,
    data: eventData,
    timestamp: new Date().toISOString(),
    webhookId,
  }

  // Generate signature
  const signature = generateSignature(JSON.stringify(payload), secret)

  // Send webhook
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': signature,
      'X-Webhook-Event': event,
      'User-Agent': 'SEOLOGY.AI-Webhook/1.0',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Webhook failed with status ${response.status}`)
  }
}

/**
 * Generate HMAC signature for webhook payload
 */
function generateSignature(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex')
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = generateSignature(payload, secret)
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

/**
 * Delete a webhook
 */
export async function deleteWebhook(webhookId: string, userId: string) {
  await db.webhook.delete({
    where: {
      id: webhookId,
      userId, // Ensure user owns this webhook
    },
  })

  return { success: true }
}

/**
 * List user's webhooks
 */
export async function listWebhooks(userId: string) {
  const webhooks = await db.webhook.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return webhooks.map((webhook) => ({
    id: webhook.id,
    url: webhook.url,
    events: JSON.parse(webhook.events) as WebhookEvent[],
    enabled: webhook.enabled,
    failureCount: webhook.failureCount,
    lastTriggeredAt: webhook.lastTriggeredAt ? webhook.lastTriggeredAt.toISOString() : null,
    createdAt: webhook.createdAt.toISOString(),
  }))
}

/**
 * Update webhook
 */
export async function updateWebhook(
  webhookId: string,
  userId: string,
  updates: {
    url?: string
    events?: WebhookEvent[]
    enabled?: boolean
  }
) {
  const webhook = await db.webhook.update({
    where: {
      id: webhookId,
      userId,
    },
    data: {
      ...(updates.url && { url: updates.url }),
      ...(updates.events && { events: JSON.stringify(updates.events) }),
      ...(updates.enabled !== undefined && { enabled: updates.enabled }),
    },
  })

  return {
    id: webhook.id,
    url: webhook.url,
    events: JSON.parse(webhook.events) as WebhookEvent[],
    enabled: webhook.enabled,
  }
}
