/**
 * Unit Tests for Shopify Chat API Route
 * Tests message handling, credit tracking, and Claude AI integration
 */

import { NextRequest } from 'next/server'
import { POST } from '../route'
import { db } from '@/lib/db'
import Anthropic from '@anthropic-ai/sdk'
import { Connection, User, UsageRecord, Issue, Fix, AuditLog } from '@prisma/client'

// Mock dependencies
jest.mock('@/lib/db')
jest.mock('@anthropic-ai/sdk')

const mockDb = db as jest.Mocked<typeof db>
const mockAnthropic = Anthropic as jest.MockedClass<typeof Anthropic>

// Type definitions for mocks
interface MockConnection extends Partial<Connection> {
  user: { id: string; executionMode: string }
}

interface MockUsageRecord extends Partial<UsageRecord> {
  aiCreditsUsed: number
  aiCreditsLimit: number
}

interface MockIssue extends Partial<Issue> {
  type: string
  title: string
  severity: string
  pageUrl: string
}

interface MockFix extends Partial<Fix> {
  type: string
  description: string
  appliedAt: Date
}

interface MockAnthropicMessages {
  create: jest.Mock<Promise<{
    content: Array<{ type: string; text?: string; source?: Record<string, unknown> }>
  }>>
}

interface MockAnthropicInstance {
  messages: MockAnthropicMessages
}

describe('POST /api/shopify/chat', () => {
  let mockAnthropicInstance: MockAnthropicInstance

  beforeEach(() => {
    jest.clearAllMocks()

    // Mock Anthropic instance
    mockAnthropicInstance = {
      messages: {
        create: jest.fn(),
      },
    }
    mockAnthropic.mockImplementation(() => mockAnthropicInstance as unknown as Anthropic)
  })

  describe('Validation', () => {
    it('should return 400 if shop parameter is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error.code).toBe('MISSING_SHOP')
    })

    it('should return 400 if messages parameter is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error.code).toBe('INVALID_MESSAGES')
    })

    it('should return 400 if messages is not an array', async () => {
      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: 'not an array',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error.code).toBe('INVALID_MESSAGES')
    })
  })

  describe('Authentication', () => {
    it('should return 404 if connection not found', async () => {
      mockDb.connection.findFirst.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'nonexistent.myshopify.com',
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.success).toBe(false)
      expect(data.error.code).toBe('NO_CONNECTION')
    })

    it('should verify connection is in CONNECTED status', async () => {
      mockDb.connection.findFirst.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      })

      await POST(request)

      expect(mockDb.connection.findFirst).toHaveBeenCalledWith({
        where: {
          domain: 'test-store.myshopify.com',
          platform: 'SHOPIFY',
          status: 'CONNECTED',
        },
        include: {
          user: {
            select: {
              id: true,
              executionMode: true,
            },
          },
        },
      })
    })
  })

  describe('Credit Management', () => {
    it('should return 403 if user has insufficient credits', async () => {
      const mockConnection = {
        id: 'conn-123',
        userId: 'user-123',
        user: { id: 'user-123', executionMode: 'PLAN' },
      }

      const mockUsageRecord = {
        aiCreditsUsed: 100,
        aiCreditsLimit: 100,
      }

      mockDb.connection.findFirst.mockResolvedValue(mockConnection as unknown as Connection & { user: User })
      mockDb.usageRecord.findUnique.mockResolvedValue(mockUsageRecord as unknown as UsageRecord)

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.success).toBe(false)
      expect(data.error.code).toBe('INSUFFICIENT_CREDITS')
    })

    it('should check current month usage record', async () => {
      const mockConnection = {
        id: 'conn-123',
        userId: 'user-123',
        user: { id: 'user-123', executionMode: 'PLAN' },
      }

      mockDb.connection.findFirst.mockResolvedValue(mockConnection as unknown as Connection & { user: User })
      mockDb.usageRecord.findUnique.mockResolvedValue(null)
      mockDb.issue.findMany.mockResolvedValue([])
      mockDb.fix.findMany.mockResolvedValue([])
      mockDb.shopifyProduct.count.mockResolvedValue(0)
      mockDb.user.findUnique.mockResolvedValue({ plan: 'STARTER' } as unknown as User)
      mockDb.usageRecord.create.mockResolvedValue({ aiCreditsUsed: 1, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.auditLog.create.mockResolvedValue({} as unknown as AuditLog)

      mockAnthropicInstance.messages.create.mockResolvedValue({
        content: [{ type: 'text', text: 'Response' }],
      })

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      })

      await POST(request)

      expect(mockDb.usageRecord.findUnique).toHaveBeenCalledWith({
        where: {
          userId_period: {
            userId: 'user-123',
            period: expect.any(Date),
          },
        },
        select: {
          aiCreditsUsed: true,
          aiCreditsLimit: true,
        },
      })
    })

    it('should increment credit usage after successful message', async () => {
      const mockConnection = {
        id: 'conn-123',
        userId: 'user-123',
        user: { id: 'user-123', executionMode: 'PLAN' },
      }

      const mockUsageRecord = {
        aiCreditsUsed: 50,
        aiCreditsLimit: 100,
      }

      mockDb.connection.findFirst.mockResolvedValue(mockConnection as unknown as Connection & { user: User })
      mockDb.usageRecord.findUnique.mockResolvedValue(mockUsageRecord as unknown as UsageRecord)
      mockDb.issue.findMany.mockResolvedValue([])
      mockDb.fix.findMany.mockResolvedValue([])
      mockDb.shopifyProduct.count.mockResolvedValue(0)
      mockDb.usageRecord.update.mockResolvedValue({ aiCreditsUsed: 51, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.auditLog.create.mockResolvedValue({} as unknown as AuditLog)

      mockAnthropicInstance.messages.create.mockResolvedValue({
        content: [{ type: 'text', text: 'Response' }],
      })

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      })

      await POST(request)

      expect(mockDb.usageRecord.update).toHaveBeenCalledWith({
        where: {
          userId_period: {
            userId: 'user-123',
            period: expect.any(Date),
          },
        },
        data: {
          aiCreditsUsed: {
            increment: 1,
          },
        },
      })
    })

    it('should create usage record if it does not exist', async () => {
      const mockConnection = {
        id: 'conn-123',
        userId: 'user-123',
        user: { id: 'user-123', executionMode: 'PLAN' },
      }

      mockDb.connection.findFirst.mockResolvedValue(mockConnection as unknown as Connection & { user: User })
      mockDb.usageRecord.findUnique.mockResolvedValue(null)
      mockDb.issue.findMany.mockResolvedValue([])
      mockDb.fix.findMany.mockResolvedValue([])
      mockDb.shopifyProduct.count.mockResolvedValue(0)
      mockDb.user.findUnique.mockResolvedValue({ plan: 'GROWTH' } as unknown as User)
      mockDb.usageRecord.create.mockResolvedValue({ aiCreditsUsed: 1, aiCreditsLimit: 500 } as unknown as UsageRecord)
      mockDb.auditLog.create.mockResolvedValue({} as unknown as AuditLog)

      mockAnthropicInstance.messages.create.mockResolvedValue({
        content: [{ type: 'text', text: 'Response' }],
      })

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      })

      await POST(request)

      expect(mockDb.usageRecord.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          period: expect.any(Date),
          aiCreditsUsed: 1,
          aiCreditsLimit: 500,
          sitesLimit: 10,
          fixesLimit: 5000,
        },
      })
    })
  })

  describe('Claude AI Integration', () => {
    it('should call Claude API with correct parameters', async () => {
      const mockConnection = {
        id: 'conn-123',
        userId: 'user-123',
        domain: 'test-store.myshopify.com',
        user: { id: 'user-123', executionMode: 'PLAN' },
      }

      mockDb.connection.findFirst.mockResolvedValue(mockConnection as unknown as Connection & { user: User })
      mockDb.usageRecord.findUnique.mockResolvedValue({ aiCreditsUsed: 10, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.issue.findMany.mockResolvedValue([])
      mockDb.fix.findMany.mockResolvedValue([])
      mockDb.shopifyProduct.count.mockResolvedValue(25)
      mockDb.usageRecord.update.mockResolvedValue({ aiCreditsUsed: 11, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.auditLog.create.mockResolvedValue({} as unknown as AuditLog)

      mockAnthropicInstance.messages.create.mockResolvedValue({
        content: [{ type: 'text', text: 'Here are some SEO tips...' }],
      })

      const messages = [
        { role: 'user' as const, content: 'How can I improve SEO?' },
      ]

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages,
        }),
      })

      await POST(request)

      expect(mockAnthropicInstance.messages.create).toHaveBeenCalledWith({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1000,
        system: expect.stringContaining('SEOLOGY.AI'),
        messages: expect.arrayContaining([
          { role: 'user', content: 'How can I improve SEO?' },
        ]),
      })
    })

    it('should include store context in system prompt', async () => {
      const mockConnection = {
        id: 'conn-123',
        userId: 'user-123',
        domain: 'test-store.myshopify.com',
        user: { id: 'user-123', executionMode: 'AUTOMATIC' },
      }

      mockDb.connection.findFirst.mockResolvedValue(mockConnection as unknown as Connection & { user: User })
      mockDb.usageRecord.findUnique.mockResolvedValue({ aiCreditsUsed: 10, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.issue.findMany.mockResolvedValue([])
      mockDb.fix.findMany.mockResolvedValue([])
      mockDb.shopifyProduct.count.mockResolvedValue(42)
      mockDb.usageRecord.update.mockResolvedValue({ aiCreditsUsed: 11, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.auditLog.create.mockResolvedValue({} as unknown as AuditLog)

      mockAnthropicInstance.messages.create.mockResolvedValue({
        content: [{ type: 'text', text: 'Response' }],
      })

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      })

      await POST(request)

      const systemPrompt = mockAnthropicInstance.messages.create.mock.calls[0][0].system

      expect(systemPrompt).toContain('test-store.myshopify.com')
      expect(systemPrompt).toContain('42 products')
      expect(systemPrompt).toContain('AUTOMATIC')
    })

    it('should include recent issues in context', async () => {
      const mockConnection = {
        id: 'conn-123',
        userId: 'user-123',
        user: { id: 'user-123', executionMode: 'PLAN' },
      }

      const mockIssues = [
        {
          type: 'missing_meta_title',
          title: 'Missing meta title',
          severity: 'HIGH',
          pageUrl: '/products/test',
        },
      ]

      mockDb.connection.findFirst.mockResolvedValue(mockConnection as unknown as Connection & { user: User })
      mockDb.usageRecord.findUnique.mockResolvedValue({ aiCreditsUsed: 10, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.issue.findMany.mockResolvedValue(mockIssues as unknown as Issue[])
      mockDb.fix.findMany.mockResolvedValue([])
      mockDb.shopifyProduct.count.mockResolvedValue(10)
      mockDb.usageRecord.update.mockResolvedValue({ aiCreditsUsed: 11, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.auditLog.create.mockResolvedValue({} as unknown as AuditLog)

      mockAnthropicInstance.messages.create.mockResolvedValue({
        content: [{ type: 'text', text: 'Response' }],
      })

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'What issues do I have?' }],
        }),
      })

      await POST(request)

      const systemPrompt = mockAnthropicInstance.messages.create.mock.calls[0][0].system

      expect(systemPrompt).toContain('Active Issues')
      expect(systemPrompt).toContain('Missing meta title')
      expect(systemPrompt).toContain('HIGH')
    })

    it('should include recent fixes in context', async () => {
      const mockConnection = {
        id: 'conn-123',
        userId: 'user-123',
        user: { id: 'user-123', executionMode: 'PLAN' },
      }

      const mockFixes = [
        {
          type: 'meta_title',
          description: 'Added meta title to product page',
          appliedAt: new Date('2025-01-01'),
        },
      ]

      mockDb.connection.findFirst.mockResolvedValue(mockConnection as unknown as Connection & { user: User })
      mockDb.usageRecord.findUnique.mockResolvedValue({ aiCreditsUsed: 10, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.issue.findMany.mockResolvedValue([])
      mockDb.fix.findMany.mockResolvedValue(mockFixes as unknown as Fix[])
      mockDb.shopifyProduct.count.mockResolvedValue(10)
      mockDb.usageRecord.update.mockResolvedValue({ aiCreditsUsed: 11, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.auditLog.create.mockResolvedValue({} as unknown as AuditLog)

      mockAnthropicInstance.messages.create.mockResolvedValue({
        content: [{ type: 'text', text: 'Response' }],
      })

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'What have you fixed?' }],
        }),
      })

      await POST(request)

      const systemPrompt = mockAnthropicInstance.messages.create.mock.calls[0][0].system

      expect(systemPrompt).toContain('Recent Fixes')
      expect(systemPrompt).toContain('Added meta title to product page')
    })

    it('should handle non-text Claude responses', async () => {
      const mockConnection = {
        id: 'conn-123',
        userId: 'user-123',
        user: { id: 'user-123', executionMode: 'PLAN' },
      }

      mockDb.connection.findFirst.mockResolvedValue(mockConnection as unknown as Connection & { user: User })
      mockDb.usageRecord.findUnique.mockResolvedValue({ aiCreditsUsed: 10, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.issue.findMany.mockResolvedValue([])
      mockDb.fix.findMany.mockResolvedValue([])
      mockDb.shopifyProduct.count.mockResolvedValue(10)

      mockAnthropicInstance.messages.create.mockResolvedValue({
        content: [{ type: 'image', source: {} }],
      })

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
    })
  })

  describe('Response Format', () => {
    it('should return success response with message and credits', async () => {
      const mockConnection = {
        id: 'conn-123',
        userId: 'user-123',
        user: { id: 'user-123', executionMode: 'PLAN' },
      }

      mockDb.connection.findFirst.mockResolvedValue(mockConnection as unknown as Connection & { user: User })
      mockDb.usageRecord.findUnique.mockResolvedValue({ aiCreditsUsed: 10, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.issue.findMany.mockResolvedValue([])
      mockDb.fix.findMany.mockResolvedValue([])
      mockDb.shopifyProduct.count.mockResolvedValue(10)
      mockDb.usageRecord.update.mockResolvedValue({ aiCreditsUsed: 11, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.auditLog.create.mockResolvedValue({} as unknown as AuditLog)

      mockAnthropicInstance.messages.create.mockResolvedValue({
        content: [{ type: 'text', text: 'Here is my response' }],
      })

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.message).toBe('Here is my response')
      expect(data.data.credits).toEqual({
        used: 11,
        limit: 100,
        remaining: 89,
      })
    })
  })

  describe('Audit Logging', () => {
    it('should create audit log for chat message', async () => {
      const mockConnection = {
        id: 'conn-123',
        userId: 'user-123',
        user: { id: 'user-123', executionMode: 'PLAN' },
      }

      mockDb.connection.findFirst.mockResolvedValue(mockConnection as unknown as Connection & { user: User })
      mockDb.usageRecord.findUnique.mockResolvedValue({ aiCreditsUsed: 10, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.issue.findMany.mockResolvedValue([])
      mockDb.fix.findMany.mockResolvedValue([])
      mockDb.shopifyProduct.count.mockResolvedValue(10)
      mockDb.usageRecord.update.mockResolvedValue({ aiCreditsUsed: 11, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.auditLog.create.mockResolvedValue({} as unknown as AuditLog)

      mockAnthropicInstance.messages.create.mockResolvedValue({
        content: [{ type: 'text', text: 'Response' }],
      })

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'Test message' }],
        }),
      })

      await POST(request)

      expect(mockDb.auditLog.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          connectionId: 'conn-123',
          action: 'CHAT_MESSAGE',
          resource: 'chat',
          resourceId: 'conn-123',
          details: expect.stringContaining('Test message'),
        },
      })
    })

    it('should include credits remaining in audit log', async () => {
      const mockConnection = {
        id: 'conn-123',
        userId: 'user-123',
        user: { id: 'user-123', executionMode: 'PLAN' },
      }

      mockDb.connection.findFirst.mockResolvedValue(mockConnection as unknown as Connection & { user: User })
      mockDb.usageRecord.findUnique.mockResolvedValue({ aiCreditsUsed: 25, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.issue.findMany.mockResolvedValue([])
      mockDb.fix.findMany.mockResolvedValue([])
      mockDb.shopifyProduct.count.mockResolvedValue(10)
      mockDb.usageRecord.update.mockResolvedValue({ aiCreditsUsed: 26, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.auditLog.create.mockResolvedValue({} as unknown as AuditLog)

      mockAnthropicInstance.messages.create.mockResolvedValue({
        content: [{ type: 'text', text: 'Response' }],
      })

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      })

      await POST(request)

      const auditDetails = JSON.parse(mockDb.auditLog.create.mock.calls[0][0].data.details)
      expect(auditDetails.creditsRemaining).toBe(74) // 100 - 26
    })
  })

  describe('Error Handling', () => {
    it('should return 500 on database errors', async () => {
      mockDb.connection.findFirst.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error.code).toBe('INTERNAL_ERROR')
    })

    it('should return 500 on Claude API errors', async () => {
      const mockConnection = {
        id: 'conn-123',
        userId: 'user-123',
        user: { id: 'user-123', executionMode: 'PLAN' },
      }

      mockDb.connection.findFirst.mockResolvedValue(mockConnection as unknown as Connection & { user: User })
      mockDb.usageRecord.findUnique.mockResolvedValue({ aiCreditsUsed: 10, aiCreditsLimit: 100 } as unknown as UsageRecord)
      mockDb.issue.findMany.mockResolvedValue([])
      mockDb.fix.findMany.mockResolvedValue([])
      mockDb.shopifyProduct.count.mockResolvedValue(10)

      mockAnthropicInstance.messages.create.mockRejectedValue(new Error('API error'))

      const request = new NextRequest('http://localhost:3000/api/shopify/chat', {
        method: 'POST',
        body: JSON.stringify({
          shop: 'test-store.myshopify.com',
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
    })
  })
})
