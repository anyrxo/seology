/**
 * Jest Test Setup
 * Runs before all tests to configure the test environment
 */

import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Polyfill for TextEncoder/TextDecoder (required for Node.js < 19)
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as typeof global.TextDecoder

// Mock environment variables
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/seology_test'
process.env.ENCRYPTION_KEY = 'test_encryption_key_32_chars_min'
process.env.ANTHROPIC_API_KEY = 'test_anthropic_api_key'
process.env.SHOPIFY_CLIENT_ID = 'test_shopify_client_id'
process.env.SHOPIFY_CLIENT_SECRET = 'test_shopify_client_secret'
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_mock'
process.env.CLERK_SECRET_KEY = 'sk_test_mock'
process.env.CRON_SECRET = 'test_cron_secret_32_chars_minimum'

// Mock fetch globally
global.fetch = jest.fn()

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}))

// Mock Clerk authentication
jest.mock('@clerk/nextjs', () => ({
  auth: jest.fn(() => ({
    userId: 'test-user-id',
    sessionId: 'test-session-id',
  })),
  currentUser: jest.fn(() => ({
    id: 'test-user-id',
    emailAddresses: [{ emailAddress: 'test@example.com' }],
  })),
  ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: jest.fn(() => ({
    userId: 'test-user-id',
    isLoaded: true,
    isSignedIn: true,
  })),
  useUser: jest.fn(() => ({
    user: {
      id: 'test-user-id',
      emailAddresses: [{ emailAddress: 'test@example.com' }],
    },
    isLoaded: true,
  })),
}))

// Mock Prisma client - will be properly mocked in individual test files
jest.mock('@/lib/db', () => {
  const createMockModel = () => ({
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    upsert: jest.fn(),
    count: jest.fn(),
    aggregate: jest.fn(),
    groupBy: jest.fn(),
  })

  return {
    db: {
      user: createMockModel(),
      connection: createMockModel(),
      issue: createMockModel(),
      fix: createMockModel(),
      sEOAgent: createMockModel(),
      agentExecution: createMockModel(),
      usageEvent: createMockModel(),
      aPIUsageLog: createMockModel(),
      usageRecord: createMockModel(),
      auditLog: createMockModel(),
      notification: createMockModel(),
      pendingPlan: createMockModel(),
      $transaction: jest.fn((callback: unknown) => {
        if (typeof callback === 'function') {
          return callback({})
        }
        return Promise.resolve(callback)
      }),
    },
  }
})

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks()
})
