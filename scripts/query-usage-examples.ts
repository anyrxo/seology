/**
 * Example Queries: Token Usage & Credit Analytics
 *
 * Run any of these functions to query your Claude API usage data
 * Usage: npx tsx scripts/query-usage-examples.ts
 */

import { db } from '../lib/db'
import {
  getTokenUsageStats,
  getMonthlyTokenUsage,
  getTokenUsageByEndpoint,
  getCreditStatus,
  getRemainingCredits,
} from '../lib/credits'

// Example 1: Get total token usage for a specific user
async function getUserTotalUsage(userId: string) {
  const stats = await getTokenUsageStats(userId)

  console.log('\n📊 Total User Token Usage:')
  console.log(`  API Calls: ${stats.apiCalls}`)
  console.log(`  Total Tokens: ${stats.totalTokens.toLocaleString()}`)
  console.log(`  Input Tokens: ${stats.totalInputTokens.toLocaleString()}`)
  console.log(`  Output Tokens: ${stats.totalOutputTokens.toLocaleString()}`)
  console.log(`  Total Cost: $${stats.totalCost.toFixed(4)}`)
  console.log(`  Avg Tokens/Call: ${Math.round(stats.averageTokensPerCall)}`)
  console.log(`  Avg Cost/Call: $${stats.averageCostPerCall.toFixed(6)}`)

  return stats
}

// Example 2: Get current month's usage
async function getCurrentMonthUsage(userId: string) {
  const now = new Date()
  const stats = await getMonthlyTokenUsage(userId, now.getFullYear(), now.getMonth() + 1)

  console.log('\n📅 Current Month Token Usage:')
  console.log(`  Month: ${now.toLocaleString('default', { month: 'long', year: 'numeric' })}`)
  console.log(`  API Calls: ${stats.apiCalls}`)
  console.log(`  Total Tokens: ${stats.totalTokens.toLocaleString()}`)
  console.log(`  Total Cost: $${stats.totalCost.toFixed(4)}`)

  return stats
}

// Example 3: Get usage breakdown by endpoint
async function getUsageByEndpoint(userId: string) {
  const breakdown = await getTokenUsageByEndpoint(userId)

  console.log('\n🔗 Usage By Endpoint:')
  breakdown.forEach((endpoint) => {
    console.log(`\n  ${endpoint.endpoint}:`)
    console.log(`    API Calls: ${endpoint.apiCalls}`)
    console.log(`    Total Tokens: ${endpoint.totalTokens.toLocaleString()}`)
    console.log(`    Total Cost: $${endpoint.totalCost.toFixed(4)}`)
  })

  return breakdown
}

// Example 4: Get credit status (message limits)
async function checkCreditStatus(userId: string) {
  const status = await getCreditStatus(userId)

  console.log('\n💳 Credit Status:')
  console.log(`  Used: ${status.used} messages`)
  console.log(`  Limit: ${status.limit} messages`)
  console.log(`  Remaining: ${status.remaining} messages`)
  console.log(`  Usage: ${status.percentage.toFixed(1)}%`)
  console.log(`  Status: ${status.status.toUpperCase()}`)

  return status
}

// Example 5: Get date range usage
async function getUsageForDateRange(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  const stats = await getTokenUsageStats(userId, { startDate, endDate })

  console.log('\n📆 Date Range Usage:')
  console.log(`  From: ${startDate.toLocaleDateString()}`)
  console.log(`  To: ${endDate.toLocaleDateString()}`)
  console.log(`  API Calls: ${stats.apiCalls}`)
  console.log(`  Total Tokens: ${stats.totalTokens.toLocaleString()}`)
  console.log(`  Total Cost: $${stats.totalCost.toFixed(4)}`)

  return stats
}

// Example 6: Get all API usage logs for a user
async function getAllAPILogs(userId: string, limit: number = 10) {
  const logs = await db.aPIUsageLog.findMany({
    where: { userId },
    orderBy: { timestamp: 'desc' },
    take: limit,
  })

  console.log(`\n📝 Recent API Calls (last ${limit}):`)
  logs.forEach((log, i) => {
    console.log(`\n  ${i + 1}. ${log.timestamp.toLocaleString()}`)
    console.log(`     Endpoint: ${log.endpoint}`)
    console.log(`     Model: ${log.model}`)
    console.log(`     Tokens: ${log.totalTokens} (${log.inputTokens} in, ${log.outputTokens} out)`)
    console.log(`     Cost: $${log.totalCost.toFixed(6)}`)
    console.log(`     Status: ${log.status}`)
  })

  return logs
}

// Type for audit log details
interface AuditLogDetails {
  userMessage?: string
  assistantResponse?: string
  creditsRemaining?: number | null
  tokensUsed?: {
    input: number
    output: number
    total: number
  }
  costUSD?: {
    input: string
    output: string
    total: string
  }
}

// Example 7: Get audit logs (conversation history)
async function getRecentConversations(userId: string, limit: number = 5) {
  const audits = await db.auditLog.findMany({
    where: {
      userId,
      action: 'CHAT_MESSAGE',
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

  console.log(`\n💬 Recent Conversations (last ${limit}):`)
  audits.forEach((audit, i) => {
    const details = JSON.parse(audit.details) as AuditLogDetails
    console.log(`\n  ${i + 1}. ${audit.createdAt.toLocaleString()}`)
    console.log(`     User: "${details.userMessage?.substring(0, 60)}..."`)
    console.log(`     Assistant: "${details.assistantResponse?.substring(0, 60)}..."`)
    if (details.tokensUsed) {
      console.log(`     Tokens: ${details.tokensUsed.total}`)
      console.log(`     Cost: $${details.costUSD?.total}`)
    }
    if (details.creditsRemaining !== null && details.creditsRemaining !== undefined) {
      console.log(`     Credits Remaining: ${details.creditsRemaining}`)
    }
  })

  return audits
}

// Example 8: Generate billing report for a user
async function generateBillingReport(userId: string) {
  console.log('\n═══════════════════════════════════════')
  console.log('📊 BILLING REPORT')
  console.log('═══════════════════════════════════════')

  // Get user info
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
      plan: true,
      name: true,
    },
  })

  if (!user) {
    console.log('❌ User not found')
    return
  }

  console.log(`\nUser: ${user.name || 'N/A'}`)
  console.log(`Email: ${user.email}`)
  console.log(`Plan: ${user.plan}`)

  // Current month usage
  await getCurrentMonthUsage(userId)

  // Credit status
  await checkCreditStatus(userId)

  // Total all-time usage
  await getUserTotalUsage(userId)

  // Breakdown by endpoint
  await getUsageByEndpoint(userId)

  // Recent activity
  await getAllAPILogs(userId, 5)

  console.log('\n═══════════════════════════════════════\n')
}

// Example 9: Compare usage across time periods
async function compareMonthlyUsage(userId: string, monthsBack: number = 3) {
  console.log('\n📈 Monthly Usage Comparison:')

  const now = new Date()
  const comparisons = []

  for (let i = 0; i < monthsBack; i++) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const stats = await getMonthlyTokenUsage(
      userId,
      targetDate.getFullYear(),
      targetDate.getMonth() + 1
    )

    comparisons.push({
      month: targetDate.toLocaleString('default', { month: 'long', year: 'numeric' }),
      ...stats,
    })
  }

  comparisons.forEach((month) => {
    console.log(`\n  ${month.month}:`)
    console.log(`    Calls: ${month.apiCalls}`)
    console.log(`    Tokens: ${month.totalTokens.toLocaleString()}`)
    console.log(`    Cost: $${month.totalCost.toFixed(4)}`)
  })

  return comparisons
}

// Example 10: Find expensive API calls
async function findExpensiveCalls(userId: string, minCost: number = 0.01) {
  const logs = await db.aPIUsageLog.findMany({
    where: {
      userId,
      totalCost: { gte: minCost },
    },
    orderBy: { totalCost: 'desc' },
    take: 10,
  })

  console.log(`\n💰 Most Expensive API Calls (>$${minCost}):`)
  logs.forEach((log, i) => {
    console.log(`\n  ${i + 1}. $${log.totalCost.toFixed(6)} - ${log.timestamp.toLocaleString()}`)
    console.log(`     Endpoint: ${log.endpoint}`)
    console.log(`     Tokens: ${log.totalTokens.toLocaleString()}`)
    console.log(`     Model: ${log.model}`)
  })

  return logs
}

// ============================================
// MAIN EXECUTION
// ============================================

async function main() {
  // Example: Get first user from database for demonstration
  const firstUser = await db.user.findFirst({
    select: { id: true, email: true },
  })

  if (!firstUser) {
    console.log('❌ No users found in database')
    return
  }

  console.log(`\n🔍 Running analytics for user: ${firstUser.email}`)
  console.log(`User ID: ${firstUser.id}`)

  // Run comprehensive billing report
  await generateBillingReport(firstUser.id)

  // Uncomment any of these to run specific queries:

  // await getUserTotalUsage(firstUser.id)
  // await getCurrentMonthUsage(firstUser.id)
  // await getUsageByEndpoint(firstUser.id)
  // await checkCreditStatus(firstUser.id)
  // await getAllAPILogs(firstUser.id, 10)
  // await getRecentConversations(firstUser.id, 5)
  // await compareMonthlyUsage(firstUser.id, 3)
  // await findExpensiveCalls(firstUser.id, 0.005)

  // Example with custom date range:
  // const lastWeekStart = new Date()
  // lastWeekStart.setDate(lastWeekStart.getDate() - 7)
  // await getUsageForDateRange(firstUser.id, lastWeekStart, new Date())

  await db.$disconnect()
}

// Run if executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Error:', error)
    process.exit(1)
  })
}

// Export functions for use in other scripts
export {
  getUserTotalUsage,
  getCurrentMonthUsage,
  getUsageByEndpoint,
  checkCreditStatus,
  getUsageForDateRange,
  getAllAPILogs,
  getRecentConversations,
  generateBillingReport,
  compareMonthlyUsage,
  findExpensiveCalls,
}
