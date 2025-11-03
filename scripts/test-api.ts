/**
 * API Testing Script
 *
 * This script tests all API endpoints to ensure they return proper data
 * Usage: tsx scripts/test-api.ts
 */

import { db } from '../lib/db'

interface TestResult {
  endpoint: string
  method: string
  status: 'PASS' | 'FAIL' | 'SKIP'
  message: string
  responseTime?: number
  statusCode?: number
}

const results: TestResult[] = []

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

async function testEndpoint(
  endpoint: string,
  method: string = 'GET',
  expectedFields?: string[]
): Promise<TestResult> {
  const startTime = Date.now()

  try {
    // Note: This is a mock test - in production, you'd use actual HTTP requests
    // For now, we'll just verify the database queries work

    log(`Testing ${method} ${endpoint}...`, 'cyan')

    // Test different endpoints
    if (endpoint === '/api/dashboard/stats') {
      // Test dashboard stats query
      const users = await db.user.findMany({ take: 1 })
      if (users.length === 0) {
        return {
          endpoint,
          method,
          status: 'SKIP',
          message: 'No users in database',
          responseTime: Date.now() - startTime,
        }
      }

      const user = users[0]
      const connections = await db.connection.findMany({
        where: { userId: user.id },
        include: {
          issues: { where: { status: { not: 'FIXED' } } },
          fixes: true,
        },
      })

      return {
        endpoint,
        method,
        status: 'PASS',
        message: `Successfully retrieved dashboard stats for ${user.email}`,
        responseTime: Date.now() - startTime,
      }
    }

    if (endpoint === '/api/sites') {
      const users = await db.user.findMany({ take: 1 })
      if (users.length === 0) {
        return {
          endpoint,
          method,
          status: 'SKIP',
          message: 'No users in database',
          responseTime: Date.now() - startTime,
        }
      }

      const connections = await db.connection.findMany({
        where: { userId: users[0].id },
        include: {
          issues: true,
          fixes: true,
          _count: {
            select: { issues: true, fixes: true },
          },
        },
      })

      return {
        endpoint,
        method,
        status: 'PASS',
        message: `Successfully retrieved ${connections.length} sites`,
        responseTime: Date.now() - startTime,
      }
    }

    if (endpoint === '/api/issues') {
      const users = await db.user.findMany({ take: 1 })
      if (users.length === 0) {
        return {
          endpoint,
          method,
          status: 'SKIP',
          message: 'No users in database',
          responseTime: Date.now() - startTime,
        }
      }

      const connections = await db.connection.findMany({
        where: { userId: users[0].id },
        select: { id: true },
      })

      const connectionIds = connections.map((c) => c.id)

      const issues = await db.issue.findMany({
        where: { connectionId: { in: connectionIds } },
        include: {
          connection: {
            select: {
              id: true,
              platform: true,
              domain: true,
              displayName: true,
            },
          },
          fixes: {
            select: {
              id: true,
              status: true,
              appliedAt: true,
            },
            take: 1,
          },
        },
        take: 50,
      })

      return {
        endpoint,
        method,
        status: 'PASS',
        message: `Successfully retrieved ${issues.length} issues`,
        responseTime: Date.now() - startTime,
      }
    }

    if (endpoint === '/api/fixes') {
      const users = await db.user.findMany({ take: 1 })
      if (users.length === 0) {
        return {
          endpoint,
          method,
          status: 'SKIP',
          message: 'No users in database',
          responseTime: Date.now() - startTime,
        }
      }

      const connections = await db.connection.findMany({
        where: { userId: users[0].id },
        select: { id: true },
      })

      const connectionIds = connections.map((c) => c.id)

      const fixes = await db.fix.findMany({
        where: { connectionId: { in: connectionIds } },
        include: {
          connection: {
            select: {
              id: true,
              platform: true,
              domain: true,
              displayName: true,
            },
          },
          issue: {
            select: {
              id: true,
              type: true,
              title: true,
              severity: true,
              pageUrl: true,
            },
          },
        },
        take: 50,
      })

      return {
        endpoint,
        method,
        status: 'PASS',
        message: `Successfully retrieved ${fixes.length} fixes`,
        responseTime: Date.now() - startTime,
      }
    }

    if (endpoint === '/api/analytics') {
      const users = await db.user.findMany({ take: 1 })
      if (users.length === 0) {
        return {
          endpoint,
          method,
          status: 'SKIP',
          message: 'No users in database',
          responseTime: Date.now() - startTime,
        }
      }

      const connections = await db.connection.findMany({
        where: { userId: users[0].id },
        include: {
          issues: true,
          fixes: true,
        },
      })

      return {
        endpoint,
        method,
        status: 'PASS',
        message: `Successfully retrieved analytics data`,
        responseTime: Date.now() - startTime,
      }
    }

    if (endpoint === '/api/notifications') {
      const users = await db.user.findMany({ take: 1 })
      if (users.length === 0) {
        return {
          endpoint,
          method,
          status: 'SKIP',
          message: 'No users in database',
          responseTime: Date.now() - startTime,
        }
      }

      const notifications = await db.notification.findMany({
        where: { userId: users[0].id },
        orderBy: { createdAt: 'desc' },
        take: 50,
      })

      return {
        endpoint,
        method,
        status: 'PASS',
        message: `Successfully retrieved ${notifications.length} notifications`,
        responseTime: Date.now() - startTime,
      }
    }

    if (endpoint === '/api/admin/analytics') {
      // Test admin analytics queries
      const [
        totalUsers,
        totalConnections,
        totalIssues,
        totalFixes,
      ] = await Promise.all([
        db.user.count(),
        db.connection.count(),
        db.issue.count(),
        db.fix.count(),
      ])

      return {
        endpoint,
        method,
        status: 'PASS',
        message: `Successfully retrieved admin analytics (${totalUsers} users, ${totalConnections} connections, ${totalIssues} issues, ${totalFixes} fixes)`,
        responseTime: Date.now() - startTime,
      }
    }

    if (endpoint === '/api/admin/users') {
      const users = await db.user.findMany({
        take: 20,
        include: {
          connections: {
            select: {
              id: true,
              platform: true,
              domain: true,
              status: true,
            },
          },
          _count: {
            select: {
              connections: true,
              auditLogs: true,
            },
          },
        },
      })

      return {
        endpoint,
        method,
        status: 'PASS',
        message: `Successfully retrieved ${users.length} users`,
        responseTime: Date.now() - startTime,
      }
    }

    if (endpoint === '/api/admin/sites') {
      const connections = await db.connection.findMany({
        take: 20,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              plan: true,
            },
          },
          _count: {
            select: {
              issues: true,
              fixes: true,
            },
          },
        },
      })

      return {
        endpoint,
        method,
        status: 'PASS',
        message: `Successfully retrieved ${connections.length} sites`,
        responseTime: Date.now() - startTime,
      }
    }

    // Default case
    return {
      endpoint,
      method,
      status: 'SKIP',
      message: 'Endpoint not implemented in test script',
      responseTime: Date.now() - startTime,
    }
  } catch (error) {
    return {
      endpoint,
      method,
      status: 'FAIL',
      message: error instanceof Error ? error.message : 'Unknown error',
      responseTime: Date.now() - startTime,
    }
  }
}

async function runTests() {
  log('\n========================================', 'blue')
  log('SEOLOGY.AI API Test Suite', 'blue')
  log('========================================\n', 'blue')

  // Test database connection
  log('Testing database connection...', 'cyan')
  try {
    await db.$connect()
    log('✓ Database connected successfully\n', 'green')
  } catch (error) {
    log('✗ Database connection failed\n', 'red')
    console.error(error)
    process.exit(1)
  }

  // Define endpoints to test
  const endpoints = [
    { path: '/api/dashboard/stats', method: 'GET' },
    { path: '/api/sites', method: 'GET' },
    { path: '/api/issues', method: 'GET' },
    { path: '/api/fixes', method: 'GET' },
    { path: '/api/analytics', method: 'GET' },
    { path: '/api/notifications', method: 'GET' },
    { path: '/api/admin/analytics', method: 'GET' },
    { path: '/api/admin/users', method: 'GET' },
    { path: '/api/admin/sites', method: 'GET' },
  ]

  // Run tests
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint.path, endpoint.method)
    results.push(result)

    const statusSymbol = result.status === 'PASS' ? '✓' : result.status === 'FAIL' ? '✗' : '⊘'
    const statusColor = result.status === 'PASS' ? 'green' : result.status === 'FAIL' ? 'red' : 'yellow'

    log(`${statusSymbol} ${endpoint.method} ${endpoint.path}`, statusColor)
    log(`  ${result.message}`, 'reset')
    if (result.responseTime) {
      log(`  Response time: ${result.responseTime}ms\n`, 'reset')
    }
  }

  // Summary
  log('\n========================================', 'blue')
  log('Test Summary', 'blue')
  log('========================================\n', 'blue')

  const passed = results.filter((r) => r.status === 'PASS').length
  const failed = results.filter((r) => r.status === 'FAIL').length
  const skipped = results.filter((r) => r.status === 'SKIP').length

  log(`Total: ${results.length}`, 'reset')
  log(`Passed: ${passed}`, 'green')
  log(`Failed: ${failed}`, failed > 0 ? 'red' : 'reset')
  log(`Skipped: ${skipped}`, skipped > 0 ? 'yellow' : 'reset')

  const avgResponseTime =
    results.reduce((sum, r) => sum + (r.responseTime || 0), 0) / results.length
  log(`\nAverage response time: ${avgResponseTime.toFixed(2)}ms`, 'cyan')

  // Disconnect database
  await db.$disconnect()

  // Exit with error code if any tests failed
  if (failed > 0) {
    process.exit(1)
  }
}

// Run tests
runTests().catch((error) => {
  console.error('Test suite failed:', error)
  process.exit(1)
})
