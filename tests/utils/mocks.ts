/**
 * Mock Generators for External Services
 */

import { jest } from '@jest/globals'

type MockFunction = ReturnType<typeof jest.fn>

export const mockPrismaClient = () => ({
  user: {
    findUnique: jest.fn() as MockFunction,
    findFirst: jest.fn() as MockFunction,
    findMany: jest.fn() as MockFunction,
    create: jest.fn() as MockFunction,
    update: jest.fn() as MockFunction,
    delete: jest.fn() as MockFunction,
  },
  connection: {
    findUnique: jest.fn() as MockFunction,
    findFirst: jest.fn() as MockFunction,
    findMany: jest.fn() as MockFunction,
    create: jest.fn() as MockFunction,
    update: jest.fn() as MockFunction,
    delete: jest.fn() as MockFunction,
  },
  site: {
    findUnique: jest.fn() as MockFunction,
    findFirst: jest.fn() as MockFunction,
    findMany: jest.fn() as MockFunction,
    create: jest.fn() as MockFunction,
    update: jest.fn() as MockFunction,
    delete: jest.fn() as MockFunction,
  },
  issue: {
    findUnique: jest.fn() as MockFunction,
    findFirst: jest.fn() as MockFunction,
    findMany: jest.fn() as MockFunction,
    create: jest.fn() as MockFunction,
    update: jest.fn() as MockFunction,
    delete: jest.fn() as MockFunction,
    count: jest.fn() as MockFunction,
  },
  fix: {
    findUnique: jest.fn() as MockFunction,
    findFirst: jest.fn() as MockFunction,
    findMany: jest.fn() as MockFunction,
    create: jest.fn() as MockFunction,
    update: jest.fn() as MockFunction,
    delete: jest.fn() as MockFunction,
  },
  job: {
    findUnique: jest.fn() as MockFunction,
    findFirst: jest.fn() as MockFunction,
    findMany: jest.fn() as MockFunction,
    create: jest.fn() as MockFunction,
    update: jest.fn() as MockFunction,
    delete: jest.fn() as MockFunction,
  },
  notification: {
    findMany: jest.fn() as MockFunction,
    create: jest.fn() as MockFunction,
    update: jest.fn() as MockFunction,
    updateMany: jest.fn() as MockFunction,
    delete: jest.fn() as MockFunction,
  },
  auditLog: {
    create: jest.fn() as MockFunction,
    findMany: jest.fn() as MockFunction,
  },
  subscription: {
    findUnique: jest.fn() as MockFunction,
    findFirst: jest.fn() as MockFunction,
    create: jest.fn() as MockFunction,
    update: jest.fn() as MockFunction,
  },
  usageRecord: {
    findFirst: jest.fn() as MockFunction,
    create: jest.fn() as MockFunction,
    update: jest.fn() as MockFunction,
  },
  team: {
    findUnique: jest.fn() as MockFunction,
    findMany: jest.fn() as MockFunction,
    create: jest.fn() as MockFunction,
    update: jest.fn() as MockFunction,
    delete: jest.fn() as MockFunction,
  },
  teamMember: {
    findUnique: jest.fn() as MockFunction,
    findMany: jest.fn() as MockFunction,
    create: jest.fn() as MockFunction,
    update: jest.fn() as MockFunction,
    delete: jest.fn() as MockFunction,
  },
  $transaction: jest.fn((callback: (tx: ReturnType<typeof mockPrismaClient>) => unknown) => callback(mockPrismaClient())) as MockFunction,
})

interface ClaudeMessage {
  content: Array<{
    type: string
    text: string
  }>
}

export const mockClaudeAPI = () => ({
  messages: {
    create: jest.fn<() => Promise<ClaudeMessage>>().mockResolvedValue({
      content: [{
        type: 'text',
        text: JSON.stringify({
          issues: [],
          recommendations: [],
        }),
      }],
    }),
  },
})

interface StripeCustomer {
  id: string
}

interface StripeCheckoutSession {
  url: string
}

interface StripeBillingPortalSession {
  url: string
}

interface StripeSubscription {
  id: string
  status: string
}

export const mockStripeAPI = () => ({
  customers: {
    create: jest.fn<() => Promise<StripeCustomer>>().mockResolvedValue({ id: 'cus_123' }),
    retrieve: jest.fn<() => Promise<StripeCustomer>>().mockResolvedValue({ id: 'cus_123' }),
  },
  checkout: {
    sessions: {
      create: jest.fn<() => Promise<StripeCheckoutSession>>().mockResolvedValue({ url: 'https://checkout.stripe.com/test' }),
    },
  },
  billingPortal: {
    sessions: {
      create: jest.fn<() => Promise<StripeBillingPortalSession>>().mockResolvedValue({ url: 'https://billing.stripe.com/test' }),
    },
  },
  subscriptions: {
    retrieve: jest.fn<() => Promise<StripeSubscription>>().mockResolvedValue({
      id: 'sub_123',
      status: 'active',
    }),
  },
})

interface ShopifyAPIResponse {
  data: {
    product: {
      id: string
      title: string
    }
  }
}

export const mockShopifyAPI = () => ({
  request: jest.fn<() => Promise<ShopifyAPIResponse>>().mockResolvedValue({
    data: {
      product: {
        id: 'gid://shopify/Product/123',
        title: 'Test Product',
      },
    },
  }),
})

interface WordPressPost {
  id: number
  title: { rendered: string }
}

export const mockWordPressAPI = () => ({
  request: jest.fn<() => Promise<WordPressPost>>().mockResolvedValue({
    id: 123,
    title: { rendered: 'Test Post' },
  }),
})

interface MockResponse {
  ok: boolean
  json: () => Promise<unknown>
  text: () => Promise<string>
  status: number
  statusText: string
}

export const mockFetch = <T = unknown>(response: T, ok = true) => {
  return jest.fn<() => Promise<MockResponse>>().mockResolvedValue({
    ok,
    json: async () => response,
    text: async () => JSON.stringify(response),
    status: ok ? 200 : 400,
    statusText: ok ? 'OK' : 'Bad Request',
  })
}

interface JobResult {
  id: string
}

export const mockQueue = () => ({
  add: jest.fn<() => Promise<JobResult>>().mockResolvedValue({ id: 'job-123' }),
  process: jest.fn() as MockFunction,
  on: jest.fn() as MockFunction,
  close: jest.fn() as MockFunction,
})

interface MockPage {
  goto: MockFunction
  content: MockFunction
  close: MockFunction
  evaluate: MockFunction
}

export const mockPuppeteerBrowser = () => ({
  newPage: jest.fn<() => Promise<MockPage>>().mockResolvedValue({
    goto: jest.fn() as MockFunction,
    content: jest.fn<() => Promise<string>>().mockResolvedValue('<html></html>'),
    close: jest.fn() as MockFunction,
    evaluate: jest.fn() as MockFunction,
  }),
  close: jest.fn() as MockFunction,
})
