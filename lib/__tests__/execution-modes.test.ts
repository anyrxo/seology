/**
 * Tests for Execution Modes System
 * Tests AUTOMATIC, PLAN, and APPROVE modes
 */

import { executeFixes, approveFix, approvePlan, rollbackFix } from '../execution-modes'
import { db } from '../db'
import { applyShopifyFix } from '../shopify'
import { applyWordPressFix } from '../wordpress'
import { createMockUser, createMockConnection, createMockIssue, createMockFix } from '../../tests/utils/factories'

// Mock dependencies
jest.mock('../db', () => ({
  db: {
    connection: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
    },
    issue: {
      findMany: jest.fn(),
      update: jest.fn(),
    },
    fix: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    notification: {
      create: jest.fn(),
    },
    auditLog: {
      create: jest.fn(),
    },
  },
}))

jest.mock('../shopify')
jest.mock('../wordpress')
jest.mock('../claude')

const mockDb = (db as unknown) as {
  connection: { findFirst: jest.Mock; findUnique: jest.Mock }
  issue: { findMany: jest.Mock; update: jest.Mock }
  fix: { create: jest.Mock; update: jest.Mock; findUnique: jest.Mock; findMany: jest.Mock }
  notification: { create: jest.Mock }
  auditLog: { create: jest.Mock }
}

const mockApplyShopifyFix = applyShopifyFix as jest.MockedFunction<typeof applyShopifyFix>
const mockApplyWordPressFix = applyWordPressFix as jest.MockedFunction<typeof applyWordPressFix>

describe('Execution Modes System', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('executeFixes', () => {
    it('should return error if connection not found', async () => {
      mockDb.connection.findFirst.mockResolvedValue(null)

      const result = await executeFixes('site-123', 'user-123')

      expect(result).toEqual({
        success: false,
        message: 'Connection not found',
      })
    })

    it('should route to AUTOMATIC mode', async () => {
      const user = createMockUser({ executionMode: 'AUTOMATIC' })
      const connection = createMockConnection({ userId: user.id })
      const issue = createMockIssue()

      mockDb.connection.findFirst.mockResolvedValue({
        ...connection,
        user,
      } as never)
      mockDb.issue.findMany.mockResolvedValue([issue] as never)
      mockApplyShopifyFix.mockResolvedValue({ success: true, message: 'Fixed' })
      mockDb.fix.create.mockResolvedValue({} as never)
      mockDb.issue.update.mockResolvedValue({} as never)
      mockDb.notification.create.mockResolvedValue({} as never)
      mockDb.auditLog.create.mockResolvedValue({} as never)

      const result = await executeFixes(connection.id, user.id)

      expect(result.success).toBe(true)
      expect(result.message).toContain('Applied')
      expect(result.message).toContain('automatically')
    })

    it('should route to PLAN mode', async () => {
      const user = createMockUser({ executionMode: 'PLAN' })
      const connection = createMockConnection({ userId: user.id })
      const issue = createMockIssue()

      mockDb.connection.findFirst.mockResolvedValue({
        ...connection,
        user,
      } as never)
      mockDb.issue.findMany.mockResolvedValue([issue] as never)
      mockDb.fix.create.mockResolvedValue({ id: 'fix-123' } as never)
      mockDb.notification.create.mockResolvedValue({} as never)

      const result = await executeFixes(connection.id, user.id)

      expect(result.success).toBe(true)
      expect(result.message).toContain('plan')
      expect(result.data?.approvalUrl).toBeDefined()
    })

    it('should route to APPROVE mode', async () => {
      const user = createMockUser({ executionMode: 'APPROVE' })
      const connection = createMockConnection({ userId: user.id })
      const issue = createMockIssue()

      mockDb.connection.findFirst.mockResolvedValue({
        ...connection,
        user,
      } as never)
      mockDb.issue.findMany.mockResolvedValue([issue] as never)
      mockDb.fix.create.mockResolvedValue({ id: 'fix-123' } as never)
      mockDb.notification.create.mockResolvedValue({} as never)

      const result = await executeFixes(connection.id, user.id)

      expect(result.success).toBe(true)
      expect(result.message).toContain('approval')
    })

    it('should handle no issues to fix', async () => {
      const user = createMockUser()
      const connection = createMockConnection({ userId: user.id })

      mockDb.connection.findFirst.mockResolvedValue({
        ...connection,
        user,
      } as never)
      mockDb.issue.findMany.mockResolvedValue([])

      const result = await executeFixes(connection.id, user.id)

      expect(result.success).toBe(true)
      expect(result.message).toContain('No issues')
    })

    it('should handle specific issue IDs', async () => {
      const user = createMockUser({ executionMode: 'AUTOMATIC' })
      const connection = createMockConnection({ userId: user.id })
      const issue1 = createMockIssue({ id: 'issue-1' })
      const issue2 = createMockIssue({ id: 'issue-2' })

      mockDb.connection.findFirst.mockResolvedValue({
        ...connection,
        user,
      } as never)
      mockDb.issue.findMany.mockResolvedValue([issue1] as never)
      mockApplyShopifyFix.mockResolvedValue({ success: true, message: 'Fixed' })
      mockDb.fix.create.mockResolvedValue({} as never)
      mockDb.issue.update.mockResolvedValue({} as never)
      mockDb.notification.create.mockResolvedValue({} as never)
      mockDb.auditLog.create.mockResolvedValue({} as never)

      const result = await executeFixes(connection.id, user.id, ['issue-1'])

      expect(mockDb.issue.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            id: { in: ['issue-1'] },
          }),
        })
      )
    })
  })

  describe('AUTOMATIC mode', () => {
    it('should apply fixes immediately for Shopify', async () => {
      const user = createMockUser({ executionMode: 'AUTOMATIC' })
      const connection = createMockConnection({ userId: user.id, platform: 'SHOPIFY' })
      const issue = createMockIssue()

      mockDb.connection.findFirst.mockResolvedValue({
        ...connection,
        user,
      } as never)
      mockDb.issue.findMany.mockResolvedValue([issue] as never)
      mockApplyShopifyFix.mockResolvedValue({ success: true, message: 'Fixed' })
      mockDb.fix.create.mockResolvedValue({} as never)
      mockDb.issue.update.mockResolvedValue({} as never)
      mockDb.notification.create.mockResolvedValue({} as never)
      mockDb.auditLog.create.mockResolvedValue({} as never)

      const result = await executeFixes(connection.id, user.id)

      expect(mockApplyShopifyFix).toHaveBeenCalled()
      expect(mockDb.fix.create).toHaveBeenCalled()
      expect(mockDb.issue.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ status: 'FIXED' }),
        })
      )
      expect(result.data?.fixesApplied).toBe(1)
    })

    it('should apply fixes immediately for WordPress', async () => {
      const user = createMockUser({ executionMode: 'AUTOMATIC' })
      const connection = createMockConnection({ userId: user.id, platform: 'WORDPRESS' })
      const issue = createMockIssue()

      mockDb.connection.findFirst.mockResolvedValue({
        ...connection,
        user,
      } as never)
      mockDb.issue.findMany.mockResolvedValue([issue] as never)
      mockDb.connection.findUnique.mockResolvedValue(connection as never)
      mockApplyWordPressFix.mockResolvedValue({ success: true, message: 'Fixed' })
      mockDb.fix.create.mockResolvedValue({} as never)
      mockDb.issue.update.mockResolvedValue({} as never)
      mockDb.notification.create.mockResolvedValue({} as never)
      mockDb.auditLog.create.mockResolvedValue({} as never)

      const result = await executeFixes(connection.id, user.id)

      expect(mockApplyWordPressFix).toHaveBeenCalled()
      expect(result.data?.fixesApplied).toBe(1)
    })

    it('should handle fix application errors gracefully', async () => {
      const user = createMockUser({ executionMode: 'AUTOMATIC' })
      const connection = createMockConnection({ userId: user.id })
      const issue = createMockIssue()

      mockDb.connection.findFirst.mockResolvedValue({
        ...connection,
        user,
      } as never)
      mockDb.issue.findMany.mockResolvedValue([issue] as never)
      mockApplyShopifyFix.mockResolvedValue({ success: false, message: 'Failed' })
      mockDb.notification.create.mockResolvedValue({} as never)
      mockDb.auditLog.create.mockResolvedValue({} as never)

      const result = await executeFixes(connection.id, user.id)

      expect(result.success).toBe(true)
      expect(result.data?.errors).toBe(1)
      expect(result.data?.fixesApplied).toBe(0)
    })

    it('should create notifications for each fix', async () => {
      const user = createMockUser({ executionMode: 'AUTOMATIC' })
      const connection = createMockConnection({ userId: user.id })
      const issue = createMockIssue()

      mockDb.connection.findFirst.mockResolvedValue({
        ...connection,
        user,
      } as never)
      mockDb.issue.findMany.mockResolvedValue([issue] as never)
      mockApplyShopifyFix.mockResolvedValue({ success: true, message: 'Fixed' })
      mockDb.fix.create.mockResolvedValue({} as never)
      mockDb.issue.update.mockResolvedValue({} as never)
      mockDb.notification.create.mockResolvedValue({} as never)
      mockDb.auditLog.create.mockResolvedValue({} as never)

      await executeFixes(connection.id, user.id)

      expect(mockDb.notification.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            userId: user.id,
            title: 'Fix Applied Automatically',
            type: 'SUCCESS',
          }),
        })
      )
    })
  })

  describe('PLAN mode', () => {
    it('should create pending fixes for approval', async () => {
      const user = createMockUser({ executionMode: 'PLAN' })
      const connection = createMockConnection({ userId: user.id })
      const issues = [createMockIssue({ id: 'issue-1' }), createMockIssue({ id: 'issue-2' })]

      mockDb.connection.findFirst.mockResolvedValue({
        ...connection,
        user,
      } as never)
      mockDb.issue.findMany.mockResolvedValue(issues as never)
      mockDb.fix.create.mockResolvedValueOnce({ id: 'fix-1' } as never)
        .mockResolvedValueOnce({ id: 'fix-2' } as never)
      mockDb.notification.create.mockResolvedValue({} as never)

      const result = await executeFixes(connection.id, user.id)

      expect(mockDb.fix.create).toHaveBeenCalledTimes(2)
      expect(result.data?.fixesCreated).toBe(2)
      expect(result.data?.fixes).toHaveLength(2)
    })

    it('should provide approval URL in response', async () => {
      const user = createMockUser({ executionMode: 'PLAN' })
      const connection = createMockConnection({ userId: user.id })
      const issue = createMockIssue()

      mockDb.connection.findFirst.mockResolvedValue({
        ...connection,
        user,
      } as never)
      mockDb.issue.findMany.mockResolvedValue([issue] as never)
      mockDb.fix.create.mockResolvedValue({ id: 'fix-123' } as never)
      mockDb.notification.create.mockResolvedValue({} as never)

      const result = await executeFixes(connection.id, user.id)

      expect(result.data?.approvalUrl).toContain('/approve-plan')
      expect(result.data?.approvalUrl).toContain(connection.id)
    })
  })

  describe('approvePlan', () => {
    it('should apply all pending fixes in a plan', async () => {
      const fix1 = createMockFix({ id: 'fix-1', issueId: 'issue-1', status: 'PENDING' })
      const fix2 = createMockFix({ id: 'fix-2', issueId: 'issue-2', status: 'PENDING' })
      const issue1 = createMockIssue({ id: 'issue-1' })
      const issue2 = createMockIssue({ id: 'issue-2' })
      const connection = createMockConnection({ platform: 'SHOPIFY' })

      mockDb.fix.findMany.mockResolvedValue([
        { ...fix1, issue: issue1, connection },
        { ...fix2, issue: issue2, connection },
      ] as never)
      mockDb.connection.findUnique.mockResolvedValue(connection as never)
      mockApplyShopifyFix.mockResolvedValue({ success: true, message: 'Fixed' })
      mockDb.fix.update.mockResolvedValue({} as never)
      mockDb.issue.update.mockResolvedValue({} as never)
      mockDb.notification.create.mockResolvedValue({} as never)
      mockDb.auditLog.create.mockResolvedValue({} as never)

      const result = await approvePlan('site-123', 'user-123')

      expect(result.success).toBe(true)
      expect(result.data?.fixesApplied).toBe(2)
      expect(mockDb.fix.update).toHaveBeenCalledTimes(2)
    })

    it('should return error if no pending fixes', async () => {
      mockDb.fix.findMany.mockResolvedValue([])

      const result = await approvePlan('site-123', 'user-123')

      expect(result.success).toBe(false)
      expect(result.message).toContain('No pending fixes')
    })

    it('should handle partial failures', async () => {
      const fix1 = createMockFix({ id: 'fix-1', issueId: 'issue-1', status: 'PENDING' })
      const fix2 = createMockFix({ id: 'fix-2', issueId: 'issue-2', status: 'PENDING' })
      const issue1 = createMockIssue({ id: 'issue-1' })
      const issue2 = createMockIssue({ id: 'issue-2' })
      const connection = createMockConnection({ platform: 'SHOPIFY' })

      mockDb.fix.findMany.mockResolvedValue([
        { ...fix1, issue: issue1, connection },
        { ...fix2, issue: issue2, connection },
      ] as never)
      mockDb.connection.findUnique.mockResolvedValue(connection as never)
      mockApplyShopifyFix
        .mockResolvedValueOnce({ success: true, message: 'Fixed' })
        .mockResolvedValueOnce({ success: false, message: 'Failed' })
      mockDb.fix.update.mockResolvedValue({} as never)
      mockDb.issue.update.mockResolvedValue({} as never)
      mockDb.notification.create.mockResolvedValue({} as never)
      mockDb.auditLog.create.mockResolvedValue({} as never)

      const result = await approvePlan('site-123', 'user-123')

      expect(result.success).toBe(true)
      expect(result.data?.fixesApplied).toBe(1)
      expect(result.data?.errors).toBe(1)
    })
  })

  describe('APPROVE mode', () => {
    it('should create individual pending fixes', async () => {
      const user = createMockUser({ executionMode: 'APPROVE' })
      const connection = createMockConnection({ userId: user.id })
      const issues = [createMockIssue({ id: 'issue-1' }), createMockIssue({ id: 'issue-2' })]

      mockDb.connection.findFirst.mockResolvedValue({
        ...connection,
        user,
      } as never)
      mockDb.issue.findMany.mockResolvedValue(issues as never)
      mockDb.fix.create.mockResolvedValueOnce({ id: 'fix-1' } as never)
        .mockResolvedValueOnce({ id: 'fix-2' } as never)
      mockDb.notification.create.mockResolvedValue({} as never)

      const result = await executeFixes(connection.id, user.id)

      expect(mockDb.fix.create).toHaveBeenCalledTimes(2)
      expect(result.data?.fixesCreated).toBe(2)
    })
  })

  describe('approveFix', () => {
    it('should apply a single approved fix', async () => {
      const fix = createMockFix({ id: 'fix-123', status: 'PENDING' })
      const issue = createMockIssue()
      const connection = createMockConnection({ platform: 'SHOPIFY' })
      const user = createMockUser()

      mockDb.fix.findUnique.mockResolvedValue({
        ...fix,
        issue,
        connection: { ...connection, user },
      } as never)
      mockDb.connection.findUnique.mockResolvedValue(connection as never)
      mockApplyShopifyFix.mockResolvedValue({ success: true, message: 'Fixed' })
      mockDb.fix.update.mockResolvedValue({} as never)
      mockDb.issue.update.mockResolvedValue({} as never)
      mockDb.notification.create.mockResolvedValue({} as never)
      mockDb.auditLog.create.mockResolvedValue({} as never)

      const result = await approveFix('fix-123', user.id)

      expect(result.success).toBe(true)
      expect(mockDb.fix.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'APPLIED',
          }),
        })
      )
    })

    it('should return error if fix not found', async () => {
      mockDb.fix.findUnique.mockResolvedValue(null)

      const result = await approveFix('fix-123', 'user-123')

      expect(result.success).toBe(false)
      expect(result.message).toContain('not found')
    })

    it('should return error if user unauthorized', async () => {
      const fix = createMockFix()
      const connection = createMockConnection({ userId: 'different-user' })
      const user = createMockUser({ id: 'different-user' })

      mockDb.fix.findUnique.mockResolvedValue({
        ...fix,
        connection: { ...connection, user },
      } as never)

      const result = await approveFix(fix.id, 'user-123')

      expect(result.success).toBe(false)
      expect(result.message).toContain('Unauthorized')
    })

    it('should return error if fix not pending', async () => {
      const fix = createMockFix({ status: 'APPLIED' })
      const connection = createMockConnection()
      const user = createMockUser()

      mockDb.fix.findUnique.mockResolvedValue({
        ...fix,
        connection: { ...connection, user },
      } as never)

      const result = await approveFix(fix.id, user.id)

      expect(result.success).toBe(false)
      expect(result.message).toContain('not pending')
    })
  })

  describe('rollbackFix', () => {
    it('should rollback an applied fix', async () => {
      const appliedAt = new Date()
      const fix = createMockFix({ status: 'APPLIED', appliedAt })
      const issue = createMockIssue()
      const connection = createMockConnection()
      const user = createMockUser()

      mockDb.fix.findUnique.mockResolvedValue({
        ...fix,
        issue,
        connection: { ...connection, user },
      } as never)
      mockDb.fix.update.mockResolvedValue({} as never)
      mockDb.issue.update.mockResolvedValue({} as never)
      mockDb.notification.create.mockResolvedValue({} as never)
      mockDb.auditLog.create.mockResolvedValue({} as never)

      const result = await rollbackFix(fix.id, user.id)

      expect(result.success).toBe(true)
      expect(mockDb.fix.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'ROLLED_BACK',
          }),
        })
      )
      expect(mockDb.issue.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'OPEN',
          }),
        })
      )
    })

    it('should return error if fix not applied', async () => {
      const fix = createMockFix({ status: 'PENDING' })
      const connection = createMockConnection()
      const user = createMockUser()

      mockDb.fix.findUnique.mockResolvedValue({
        ...fix,
        connection: { ...connection, user },
      } as never)

      const result = await rollbackFix(fix.id, user.id)

      expect(result.success).toBe(false)
      expect(result.message).toContain('not applied')
    })

    it('should return error if rollback window expired', async () => {
      const appliedAt = new Date()
      appliedAt.setDate(appliedAt.getDate() - 91) // 91 days ago
      const fix = createMockFix({ status: 'APPLIED', appliedAt })
      const connection = createMockConnection()
      const user = createMockUser()

      mockDb.fix.findUnique.mockResolvedValue({
        ...fix,
        connection: { ...connection, user },
      } as never)

      const result = await rollbackFix(fix.id, user.id)

      expect(result.success).toBe(false)
      expect(result.message).toContain('expired')
    })

    it('should return error if user unauthorized', async () => {
      const appliedAt = new Date()
      const fix = createMockFix({ status: 'APPLIED', appliedAt })
      const connection = createMockConnection({ userId: 'different-user' })
      const user = createMockUser({ id: 'different-user' })

      mockDb.fix.findUnique.mockResolvedValue({
        ...fix,
        connection: { ...connection, user },
      } as never)

      const result = await rollbackFix(fix.id, 'user-123')

      expect(result.success).toBe(false)
      expect(result.message).toContain('Unauthorized')
    })
  })
})
