/**
 * Test Data Factories
 * Generate mock data for testing
 */

import { Platform, ExecutionMode, IssueStatus, FixStatus, Severity, ConnectionStatus } from '@prisma/client'

export const createMockUser = (overrides = {}) => ({
  id: 'user-123',
  clerkId: 'clerk_user_123',
  email: 'test@example.com',
  name: 'Test User',
  plan: 'STARTER',
  executionMode: 'APPROVE' as ExecutionMode,
  onboardingCompleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

export const createMockConnection = (overrides = {}) => ({
  id: 'conn-123',
  userId: 'user-123',
  teamId: null,
  platform: 'SHOPIFY' as Platform,
  domain: 'test-store.myshopify.com',
  displayName: null,
  accessToken: 'encrypted-token-123',
  refreshToken: null,
  credentials: null,
  status: 'CONNECTED' as ConnectionStatus,
  lastSync: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

export const createMockSite = (overrides = {}) => ({
  id: 'site-123',
  userId: 'user-123',
  connectionId: 'conn-123',
  url: 'https://example.com',
  name: 'Test Site',
  platform: 'CUSTOM' as Platform,
  magicKey: 'magic-key-123',
  status: 'ACTIVE',
  lastCrawledAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

export const createMockIssue = (overrides = {}) => ({
  id: 'issue-123',
  connectionId: 'conn-123',
  type: 'missing_meta_title',
  title: 'Missing meta title',
  description: 'Page is missing a meta title tag',
  severity: 'HIGH' as Severity,
  status: 'OPEN' as IssueStatus,
  pageUrl: '/products/test-product',
  details: JSON.stringify({ element: 'title', expected: 'Present' }),
  recommendation: 'Add a descriptive meta title',
  detectedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

export const createMockFix = (overrides = {}) => ({
  id: 'fix-123',
  connectionId: 'conn-123',
  issueId: 'issue-123',
  description: 'Add missing meta title',
  changes: JSON.stringify({ title: 'New Product Title' }),
  status: 'PENDING' as FixStatus,
  appliedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

export const createMockJob = (overrides = {}) => ({
  id: 'job-123',
  type: 'CRAWL_SITE',
  status: 'PENDING',
  data: JSON.stringify({ siteId: 'site-123' }),
  result: null,
  error: null,
  attempts: 0,
  maxAttempts: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
  startedAt: null,
  completedAt: null,
  ...overrides,
})

export const createMockNotification = (overrides = {}) => ({
  id: 'notif-123',
  userId: 'user-123',
  title: 'Test Notification',
  message: 'This is a test notification',
  type: 'INFO',
  read: false,
  actionUrl: null,
  createdAt: new Date(),
  ...overrides,
})

export const createMockSubscription = (overrides = {}) => ({
  id: 'sub-123',
  userId: 'user-123',
  stripeCustomerId: 'cus_123',
  stripeSubscriptionId: 'sub_123',
  stripePriceId: 'price_123',
  status: 'ACTIVE',
  currentPeriodStart: new Date(),
  currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  cancelAtPeriodEnd: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

export const createMockUsageRecord = (overrides = {}) => ({
  id: 'usage-123',
  userId: 'user-123',
  month: '2025-01',
  fixesUsed: 10,
  sitesUsed: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

export const createMockAuditLog = (overrides = {}) => ({
  id: 'audit-123',
  userId: 'user-123',
  connectionId: 'conn-123',
  action: 'FIX_APPLIED',
  resource: 'fix',
  resourceId: 'fix-123',
  details: JSON.stringify({ issueId: 'issue-123' }),
  ipAddress: '127.0.0.1',
  userAgent: 'Mozilla/5.0',
  createdAt: new Date(),
  ...overrides,
})

export const createMockTeam = (overrides = {}) => ({
  id: 'team-123',
  name: 'Test Team',
  ownerId: 'user-123',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

export const createMockTeamMember = (overrides = {}) => ({
  id: 'member-123',
  teamId: 'team-123',
  userId: 'user-456',
  role: 'MEMBER',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})
