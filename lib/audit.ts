/**
 * Enhanced Audit Logging System
 * Comprehensive logging for security events, user actions, and system operations
 *
 * SECURITY FEATURES:
 * - Immutable audit trail
 * - Failed authentication tracking
 * - Authorization failure logging
 * - Sensitive operation logging
 * - IP address and user agent tracking
 * - Timestamp precision for forensic analysis
 */

import { db } from './db'
import type { NextRequest } from 'next/server'

// Audit event types for categorization
export enum AuditEventType {
  // Authentication events
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILURE = 'AUTH_FAILURE',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  AUTH_PASSWORD_RESET = 'AUTH_PASSWORD_RESET',
  AUTH_MFA_ENABLED = 'AUTH_MFA_ENABLED',
  AUTH_MFA_DISABLED = 'AUTH_MFA_DISABLED',

  // Authorization events
  AUTHZ_DENIED = 'AUTHZ_DENIED',
  AUTHZ_ROLE_CHANGED = 'AUTHZ_ROLE_CHANGED',
  AUTHZ_PERMISSION_GRANTED = 'AUTHZ_PERMISSION_GRANTED',
  AUTHZ_PERMISSION_REVOKED = 'AUTHZ_PERMISSION_REVOKED',

  // Connection events
  CONNECTION_CREATED = 'CONNECTION_CREATED',
  CONNECTION_UPDATED = 'CONNECTION_UPDATED',
  CONNECTION_DELETED = 'CONNECTION_DELETED',
  CONNECTION_OAUTH_SUCCESS = 'CONNECTION_OAUTH_SUCCESS',
  CONNECTION_OAUTH_FAILURE = 'CONNECTION_OAUTH_FAILURE',

  // Fix events
  FIX_APPLIED = 'FIX_APPLIED',
  FIX_FAILED = 'FIX_FAILED',
  FIX_ROLLED_BACK = 'FIX_ROLLED_BACK',
  FIX_APPROVED = 'FIX_APPROVED',
  FIX_REJECTED = 'FIX_REJECTED',

  // Issue events
  ISSUE_DETECTED = 'ISSUE_DETECTED',
  ISSUE_FIXED = 'ISSUE_FIXED',
  ISSUE_IGNORED = 'ISSUE_IGNORED',

  // Data access events
  DATA_EXPORTED = 'DATA_EXPORTED',
  DATA_IMPORTED = 'DATA_IMPORTED',
  DATA_DELETED = 'DATA_DELETED',
  DATA_VIEWED = 'DATA_VIEWED',

  // Security events
  SECURITY_RATE_LIMIT_EXCEEDED = 'SECURITY_RATE_LIMIT_EXCEEDED',
  SECURITY_CSRF_VIOLATION = 'SECURITY_CSRF_VIOLATION',
  SECURITY_INVALID_TOKEN = 'SECURITY_INVALID_TOKEN',
  SECURITY_SUSPICIOUS_ACTIVITY = 'SECURITY_SUSPICIOUS_ACTIVITY',
  SECURITY_ACCESS_DENIED = 'SECURITY_ACCESS_DENIED',

  // Configuration events
  CONFIG_UPDATED = 'CONFIG_UPDATED',
  CONFIG_EXECUTION_MODE_CHANGED = 'CONFIG_EXECUTION_MODE_CHANGED',
  CONFIG_NOTIFICATION_SETTINGS_CHANGED = 'CONFIG_NOTIFICATION_SETTINGS_CHANGED',

  // Billing events
  BILLING_SUBSCRIPTION_CREATED = 'BILLING_SUBSCRIPTION_CREATED',
  BILLING_SUBSCRIPTION_UPDATED = 'BILLING_SUBSCRIPTION_UPDATED',
  BILLING_SUBSCRIPTION_CANCELLED = 'BILLING_SUBSCRIPTION_CANCELLED',
  BILLING_PAYMENT_SUCCESS = 'BILLING_PAYMENT_SUCCESS',
  BILLING_PAYMENT_FAILED = 'BILLING_PAYMENT_FAILED',

  // Admin events
  ADMIN_USER_CREATED = 'ADMIN_USER_CREATED',
  ADMIN_USER_UPDATED = 'ADMIN_USER_UPDATED',
  ADMIN_USER_DELETED = 'ADMIN_USER_DELETED',
  ADMIN_ROLE_ASSIGNED = 'ADMIN_ROLE_ASSIGNED',
  ADMIN_BROADCAST_SENT = 'ADMIN_BROADCAST_SENT',

  // Team events
  TEAM_CREATED = 'TEAM_CREATED',
  TEAM_UPDATED = 'TEAM_UPDATED',
  TEAM_DELETED = 'TEAM_DELETED',
  TEAM_MEMBER_ADDED = 'TEAM_MEMBER_ADDED',
  TEAM_MEMBER_REMOVED = 'TEAM_MEMBER_REMOVED',
  TEAM_MEMBER_ROLE_CHANGED = 'TEAM_MEMBER_ROLE_CHANGED',

  // Webhook events
  WEBHOOK_CREATED = 'WEBHOOK_CREATED',
  WEBHOOK_UPDATED = 'WEBHOOK_UPDATED',
  WEBHOOK_DELETED = 'WEBHOOK_DELETED',
  WEBHOOK_TRIGGERED = 'WEBHOOK_TRIGGERED',
  WEBHOOK_FAILED = 'WEBHOOK_FAILED',
}

// Severity levels for audit events
export enum AuditSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

interface AuditLogOptions {
  userId?: string
  action: AuditEventType | string
  resource?: string
  resourceId?: string
  connectionId?: string
  severity?: AuditSeverity
  details?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
  req?: NextRequest
}

/**
 * Create an audit log entry
 */
export async function createAuditLog(options: AuditLogOptions): Promise<void> {
  try {
    const {
      userId,
      action,
      resource,
      resourceId,
      connectionId,
      severity = AuditSeverity.INFO,
      details = {},
      ipAddress,
      userAgent,
      req,
    } = options

    // Extract IP and user agent from request if provided
    let finalIpAddress = ipAddress
    let finalUserAgent = userAgent

    if (req) {
      if (!finalIpAddress) {
        const forwarded = req.headers.get('x-forwarded-for')
        finalIpAddress = forwarded ? forwarded.split(',')[0].trim() : req.ip || 'unknown'
      }
      if (!finalUserAgent) {
        finalUserAgent = req.headers.get('user-agent') || 'unknown'
      }
    }

    // Add severity to details
    const enrichedDetails = {
      ...details,
      severity,
      timestamp: new Date().toISOString(),
    }

    // If no userId provided, log as system event
    if (!userId) {
      // Log to console for system events
      console.log('[AUDIT]', {
        action,
        resource,
        resourceId,
        severity,
        details: enrichedDetails,
      })
      return
    }

    // Get user from database
    const user = await db.user.findFirst({
      where: {
        OR: [
          { id: userId },
          { clerkId: userId }
        ]
      },
    })

    if (!user) {
      console.warn('[AUDIT] User not found for audit log:', userId)
      return
    }

    // Create audit log in database
    await db.auditLog.create({
      data: {
        userId: user.id,
        connectionId,
        action,
        resource,
        resourceId,
        details: JSON.stringify(enrichedDetails),
        ipAddress: finalIpAddress,
        userAgent: finalUserAgent,
      },
    })
  } catch (error) {
    // Never throw errors from audit logging to avoid disrupting main flow
    console.error('[AUDIT] Failed to create audit log:', error)
  }
}

/**
 * Log authentication events
 */
export async function logAuthEvent(
  userId: string,
  event: 'success' | 'failure' | 'logout',
  req?: NextRequest,
  details?: Record<string, unknown>
): Promise<void> {
  const eventMap = {
    success: AuditEventType.AUTH_SUCCESS,
    failure: AuditEventType.AUTH_FAILURE,
    logout: AuditEventType.AUTH_LOGOUT,
  }

  await createAuditLog({
    userId,
    action: eventMap[event],
    resource: 'auth',
    severity: event === 'failure' ? AuditSeverity.WARNING : AuditSeverity.INFO,
    details,
    req,
  })
}

/**
 * Log authorization failures
 */
export async function logAuthorizationFailure(
  userId: string,
  resource: string,
  action: string,
  req?: NextRequest,
  details?: Record<string, unknown>
): Promise<void> {
  await createAuditLog({
    userId,
    action: AuditEventType.AUTHZ_DENIED,
    resource,
    severity: AuditSeverity.WARNING,
    details: {
      ...details,
      attemptedAction: action,
    },
    req,
  })
}

/**
 * Log security events
 */
export async function logSecurityEvent(
  event: 'rate_limit' | 'csrf' | 'invalid_token' | 'suspicious' | 'access_denied',
  req: NextRequest,
  details?: Record<string, unknown>
): Promise<void> {
  const eventMap = {
    rate_limit: AuditEventType.SECURITY_RATE_LIMIT_EXCEEDED,
    csrf: AuditEventType.SECURITY_CSRF_VIOLATION,
    invalid_token: AuditEventType.SECURITY_INVALID_TOKEN,
    suspicious: AuditEventType.SECURITY_SUSPICIOUS_ACTIVITY,
    access_denied: AuditEventType.SECURITY_ACCESS_DENIED,
  }

  // Extract potential user info from request
  const authHeader = req.headers.get('authorization')
  let userId: string | undefined

  // Try to extract userId from JWT or session if available
  // This is a best-effort attempt
  if (authHeader) {
    try {
      // Add logic here to extract userId from auth header if needed
      // For now, we'll log as system event
    } catch {
      // Ignore errors
    }
  }

  await createAuditLog({
    userId,
    action: eventMap[event],
    resource: 'security',
    severity: AuditSeverity.CRITICAL,
    details: {
      ...details,
      path: req.nextUrl.pathname,
      method: req.method,
    },
    req,
  })
}

/**
 * Log data access for compliance
 */
export async function logDataAccess(
  userId: string,
  action: 'viewed' | 'exported' | 'imported' | 'deleted',
  resource: string,
  resourceId: string,
  details?: Record<string, unknown>
): Promise<void> {
  const eventMap = {
    viewed: AuditEventType.DATA_VIEWED,
    exported: AuditEventType.DATA_EXPORTED,
    imported: AuditEventType.DATA_IMPORTED,
    deleted: AuditEventType.DATA_DELETED,
  }

  await createAuditLog({
    userId,
    action: eventMap[action],
    resource,
    resourceId,
    severity: action === 'deleted' ? AuditSeverity.WARNING : AuditSeverity.INFO,
    details,
  })
}

/**
 * Log sensitive operations
 */
export async function logSensitiveOperation(
  userId: string,
  operation: string,
  resource: string,
  resourceId?: string,
  details?: Record<string, unknown>
): Promise<void> {
  await createAuditLog({
    userId,
    action: operation,
    resource,
    resourceId,
    severity: AuditSeverity.WARNING,
    details: {
      ...details,
      sensitive: true,
    },
  })
}

/**
 * Query audit logs with filters
 */
export async function getAuditLogs(filters: {
  userId?: string
  action?: string
  resource?: string
  severity?: AuditSeverity
  startDate?: Date
  endDate?: Date
  limit?: number
  offset?: number
}) {
  const {
    userId,
    action,
    resource,
    severity,
    startDate,
    endDate,
    limit = 100,
    offset = 0,
  } = filters

  const where: Record<string, unknown> = {}

  if (userId) where.userId = userId
  if (action) where.action = action
  if (resource) where.resource = resource

  if (startDate || endDate) {
    where.createdAt = {}
    if (startDate) (where.createdAt as Record<string, unknown>).gte = startDate
    if (endDate) (where.createdAt as Record<string, unknown>).lte = endDate
  }

  // Filter by severity in details if provided
  const logs = await db.auditLog.findMany({
    where: where as {
      userId?: string
      action?: string
      resource?: string
      createdAt?: {
        gte?: Date
        lte?: Date
      }
    },
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: limit,
    include: {
      user: {
        select: {
          email: true,
          name: true,
          role: true,
        },
      },
    },
  })

  // Filter by severity if provided (since it's in JSON details)
  const filteredLogs = severity
    ? logs.filter((log) => {
        try {
          const details = JSON.parse(log.details)
          return details.severity === severity
        } catch {
          return false
        }
      })
    : logs

  return filteredLogs
}

/**
 * Get security event summary
 */
export async function getSecurityEventSummary(userId?: string, days = 7) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const where: Record<string, unknown> = {
    action: {
      in: Object.values(AuditEventType).filter((e) => e.startsWith('SECURITY_')),
    },
    createdAt: {
      gte: startDate,
    },
  }

  if (userId) {
    where.userId = userId
  }

  const events = await db.auditLog.findMany({
    where: where as {
      action?: { in: string[] }
      userId?: string
      createdAt?: { gte: Date }
    },
    orderBy: { createdAt: 'desc' },
  })

  return {
    total: events.length,
    byType: events.reduce(
      (acc, event) => {
        acc[event.action] = (acc[event.action] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    ),
    recent: events.slice(0, 10),
  }
}
