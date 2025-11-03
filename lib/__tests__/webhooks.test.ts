/**
 * Unit tests for webhook management functions
 */

import { db } from '@/lib/db'
import {
  registerWebhook,
  deleteWebhook,
  verifyWebhookSignature,
  listWebhooks,
  updateWebhook,
} from '@/lib/webhooks'
import type { WebhookEvent } from '@/lib/webhooks'

// Mock Prisma client
jest.mock('@/lib/db', () => ({
  db: {
    webhook: {
      create: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}))

describe('Webhook Management', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('registerWebhook', () => {
    it('should create a webhook with events', async () => {
      const events: WebhookEvent[] = ['fix.applied', 'issue.detected']
      const mockWebhook = {
        id: 'webhook-123',
        userId: 'user-123',
        url: 'https://example.com/webhook',
        events: JSON.stringify(events),
        secret: 'secret-123',
        enabled: true,
        failureCount: 0,
        lastTriggeredAt: null,
        createdAt: new Date(),
      }

      ;(db.webhook.create as jest.Mock).mockResolvedValue(mockWebhook)

      const result = await registerWebhook(
        'user-123',
        'https://example.com/webhook',
        events,
        'secret-123'
      )

      expect(result).toEqual({
        id: 'webhook-123',
        url: 'https://example.com/webhook',
        events,
        secret: 'secret-123',
        enabled: true,
      })

      expect(db.webhook.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          url: 'https://example.com/webhook',
          events: JSON.stringify(events),
          secret: 'secret-123',
          enabled: true,
        },
      })
    })

    it('should generate secret if not provided', async () => {
      const events: WebhookEvent[] = ['fix.applied']
      const mockWebhook = {
        id: 'webhook-123',
        userId: 'user-123',
        url: 'https://example.com/webhook',
        events: JSON.stringify(events),
        secret: expect.any(String),
        enabled: true,
        failureCount: 0,
        lastTriggeredAt: null,
        createdAt: new Date(),
      }

      ;(db.webhook.create as jest.Mock).mockImplementation((args) => {
        return Promise.resolve({
          id: 'webhook-123',
          ...args.data,
          failureCount: 0,
          lastTriggeredAt: null,
          createdAt: new Date(),
        })
      })

      const result = await registerWebhook(
        'user-123',
        'https://example.com/webhook',
        events
      )

      expect(result.secret).toBeDefined()
      expect(typeof result.secret).toBe('string')
      expect(result.secret.length).toBeGreaterThan(0)
    })
  })

  describe('listWebhooks', () => {
    it('should return formatted list of webhooks', async () => {
      const events: WebhookEvent[] = ['fix.applied', 'issue.detected']
      const mockWebhooks = [
        {
          id: 'webhook-1',
          userId: 'user-123',
          url: 'https://example.com/webhook1',
          events: JSON.stringify(events),
          secret: 'secret-1',
          enabled: true,
          failureCount: 0,
          lastTriggeredAt: new Date('2024-01-01'),
          createdAt: new Date('2024-01-01'),
        },
        {
          id: 'webhook-2',
          userId: 'user-123',
          url: 'https://example.com/webhook2',
          events: JSON.stringify(['fix.failed']),
          secret: 'secret-2',
          enabled: false,
          failureCount: 5,
          lastTriggeredAt: null,
          createdAt: new Date('2024-01-02'),
        },
      ]

      ;(db.webhook.findMany as jest.Mock).mockResolvedValue(mockWebhooks)

      const result = await listWebhooks('user-123')

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        id: 'webhook-1',
        url: 'https://example.com/webhook1',
        events,
        enabled: true,
        failureCount: 0,
        lastTriggeredAt: '2024-01-01T00:00:00.000Z',
        createdAt: '2024-01-01T00:00:00.000Z',
      })
    })

    it('should handle null lastTriggeredAt', async () => {
      const mockWebhooks = [
        {
          id: 'webhook-1',
          userId: 'user-123',
          url: 'https://example.com/webhook1',
          events: JSON.stringify(['fix.applied']),
          secret: 'secret-1',
          enabled: true,
          failureCount: 0,
          lastTriggeredAt: null,
          createdAt: new Date('2024-01-01'),
        },
      ]

      ;(db.webhook.findMany as jest.Mock).mockResolvedValue(mockWebhooks)

      const result = await listWebhooks('user-123')

      expect(result[0]?.lastTriggeredAt).toBeNull()
    })
  })

  describe('updateWebhook', () => {
    it('should update webhook URL', async () => {
      const mockWebhook = {
        id: 'webhook-123',
        userId: 'user-123',
        url: 'https://example.com/new-webhook',
        events: JSON.stringify(['fix.applied']),
        secret: 'secret-123',
        enabled: true,
        failureCount: 0,
        lastTriggeredAt: null,
        createdAt: new Date(),
      }

      ;(db.webhook.update as jest.Mock).mockResolvedValue(mockWebhook)

      const result = await updateWebhook('webhook-123', 'user-123', {
        url: 'https://example.com/new-webhook',
      })

      expect(result.url).toBe('https://example.com/new-webhook')
      expect(db.webhook.update).toHaveBeenCalledWith({
        where: {
          id: 'webhook-123',
          userId: 'user-123',
        },
        data: {
          url: 'https://example.com/new-webhook',
        },
      })
    })

    it('should update webhook events', async () => {
      const newEvents: WebhookEvent[] = ['fix.applied', 'fix.failed', 'issue.detected']
      const mockWebhook = {
        id: 'webhook-123',
        userId: 'user-123',
        url: 'https://example.com/webhook',
        events: JSON.stringify(newEvents),
        secret: 'secret-123',
        enabled: true,
        failureCount: 0,
        lastTriggeredAt: null,
        createdAt: new Date(),
      }

      ;(db.webhook.update as jest.Mock).mockResolvedValue(mockWebhook)

      const result = await updateWebhook('webhook-123', 'user-123', {
        events: newEvents,
      })

      expect(result.events).toEqual(newEvents)
    })

    it('should enable/disable webhook', async () => {
      const mockWebhook = {
        id: 'webhook-123',
        userId: 'user-123',
        url: 'https://example.com/webhook',
        events: JSON.stringify(['fix.applied']),
        secret: 'secret-123',
        enabled: false,
        failureCount: 0,
        lastTriggeredAt: null,
        createdAt: new Date(),
      }

      ;(db.webhook.update as jest.Mock).mockResolvedValue(mockWebhook)

      const result = await updateWebhook('webhook-123', 'user-123', {
        enabled: false,
      })

      expect(result.enabled).toBe(false)
    })
  })

  describe('deleteWebhook', () => {
    it('should delete a webhook', async () => {
      ;(db.webhook.delete as jest.Mock).mockResolvedValue({})

      const result = await deleteWebhook('webhook-123', 'user-123')

      expect(result).toEqual({ success: true })
      expect(db.webhook.delete).toHaveBeenCalledWith({
        where: {
          id: 'webhook-123',
          userId: 'user-123',
        },
      })
    })
  })

  describe('verifyWebhookSignature', () => {
    it('should return true for valid signature', () => {
      const payload = JSON.stringify({ event: 'test', data: { id: '123' } })
      const secret = 'secret-123'

      // Generate valid signature
      const crypto = require('crypto')
      const hmac = crypto.createHmac('sha256', secret)
      hmac.update(payload)
      const signature = hmac.digest('hex')

      const result = verifyWebhookSignature(payload, signature, secret)

      expect(result).toBe(true)
    })

    it('should return false for invalid signature', () => {
      const payload = JSON.stringify({ event: 'test', data: { id: '123' } })
      const secret = 'secret-123'
      const invalidSignature = '0000000000000000000000000000000000000000000000000000000000000000'

      const result = verifyWebhookSignature(payload, invalidSignature, secret)

      expect(result).toBe(false)
    })

    it('should return false for tampered payload', () => {
      const payload = JSON.stringify({ event: 'test', data: { id: '123' } })
      const secret = 'secret-123'

      // Generate signature for original payload
      const crypto = require('crypto')
      const hmac = crypto.createHmac('sha256', secret)
      hmac.update(payload)
      const signature = hmac.digest('hex')

      // Tamper with payload
      const tamperedPayload = JSON.stringify({ event: 'test', data: { id: '999' } })

      const result = verifyWebhookSignature(tamperedPayload, signature, secret)

      expect(result).toBe(false)
    })
  })
})
