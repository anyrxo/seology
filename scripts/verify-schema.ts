#!/usr/bin/env tsx
/**
 * Schema Verification Script
 *
 * Validates that the Prisma schema meets all requirements
 * for SEOLOGY.AI SaaS features.
 */

import * as fs from 'fs'
import * as path from 'path'

interface ValidationResult {
  category: string
  passed: boolean
  message: string
}

const results: ValidationResult[] = []

function pass(category: string, message: string) {
  results.push({ category, passed: true, message })
}

function fail(category: string, message: string) {
  results.push({ category, passed: false, message })
}

// Read schema file
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma')
const schema = fs.readFileSync(schemaPath, 'utf-8')

console.log('🔍 Verifying SEOLOGY.AI Database Schema...\n')

// ============================================================================
// MODEL EXISTENCE CHECKS
// ============================================================================

const requiredModels = [
  'User',
  'Connection',
  'Issue',
  'Fix',
  'PendingPlan',
  'Job',
  'UsageRecord',
  'Subscription',
  'Metric',
  'Crawl',
  'AuditLog',
  'Notification',
  'AIConversation',
  'Team',
  'TeamMember',
  'TeamInvitation',
  'Webhook',
  'CSRFToken',
]

console.log('📋 Checking Required Models...')
requiredModels.forEach((model) => {
  const regex = new RegExp(`model ${model} {`, 'g')
  if (regex.test(schema)) {
    pass('Models', `✓ ${model} model exists`)
  } else {
    fail('Models', `✗ ${model} model missing`)
  }
})

// ============================================================================
// ENUM CHECKS
// ============================================================================

console.log('\n📊 Checking Required Enums...')
const requiredEnums = [
  'ExecutionMode',
  'Role',
  'Plan',
  'Platform',
  'ConnectionStatus',
  'Severity',
  'IssueStatus',
  'FixMethod',
  'FixStatus',
  'JobType',
  'JobStatus',
  'PlanStatus',
  'SubscriptionStatus',
  'TeamRole',
  'InvitationStatus',
  'CrawlStatus',
]

requiredEnums.forEach((enumName) => {
  const regex = new RegExp(`enum ${enumName} {`, 'g')
  if (regex.test(schema)) {
    pass('Enums', `✓ ${enumName} enum exists`)
  } else {
    fail('Enums', `✗ ${enumName} enum missing`)
  }
})

// ============================================================================
// CRITICAL FIELD CHECKS
// ============================================================================

console.log('\n🔑 Checking Critical Fields...')

// User model
if (schema.includes('model User')) {
  schema.includes('clerkId String  @unique')
    ? pass('Fields', '✓ User.clerkId is unique')
    : fail('Fields', '✗ User.clerkId not unique')

  schema.includes('executionMode ExecutionMode')
    ? pass('Fields', '✓ User.executionMode exists')
    : fail('Fields', '✗ User.executionMode missing')

  schema.includes('onboardingCompleted Boolean')
    ? pass('Fields', '✓ User.onboardingCompleted exists')
    : fail('Fields', '✗ User.onboardingCompleted missing')

  schema.includes('onboardingStep      Int')
    ? pass('Fields', '✓ User.onboardingStep exists')
    : fail('Fields', '✗ User.onboardingStep missing')
}

// Connection model
if (schema.includes('model Connection')) {
  schema.includes('accessToken  String?')
    ? pass('Fields', '✓ Connection.accessToken exists (for OAuth)')
    : fail('Fields', '✗ Connection.accessToken missing')

  schema.includes('healthStatus String')
    ? pass('Fields', '✓ Connection.healthStatus exists')
    : fail('Fields', '✗ Connection.healthStatus missing')

  schema.includes('pageCount    Int')
    ? pass('Fields', '✓ Connection.pageCount exists')
    : fail('Fields', '✗ Connection.pageCount missing')

  schema.includes('lastCrawlAt  DateTime?')
    ? pass('Fields', '✓ Connection.lastCrawlAt exists')
    : fail('Fields', '✗ Connection.lastCrawlAt missing')
}

// Issue model
if (schema.includes('model Issue')) {
  schema.includes('impactScore        Float?')
    ? pass('Fields', '✓ Issue.impactScore exists')
    : fail('Fields', '✗ Issue.impactScore missing')

  schema.includes('elementSelector    String?')
    ? pass('Fields', '✓ Issue.elementSelector exists')
    : fail('Fields', '✗ Issue.elementSelector missing')
}

// Fix model
if (schema.includes('model Fix')) {
  schema.includes('beforeState String')
    ? pass('Fields', '✓ Fix.beforeState exists (for rollback)')
    : fail('Fields', '✗ Fix.beforeState missing')

  schema.includes('rollbackDeadline DateTime?')
    ? pass('Fields', '✓ Fix.rollbackDeadline exists')
    : fail('Fields', '✗ Fix.rollbackDeadline missing')

  schema.includes('planId String?')
    ? pass('Fields', '✓ Fix.planId exists (for PLAN mode)')
    : fail('Fields', '✗ Fix.planId missing')
}

// Job model
if (schema.includes('model Job')) {
  schema.includes('priority  Int')
    ? pass('Fields', '✓ Job.priority exists')
    : fail('Fields', '✗ Job.priority missing')

  schema.includes('progress  Int')
    ? pass('Fields', '✓ Job.progress exists')
    : fail('Fields', '✗ Job.progress missing')

  schema.includes('attempts  Int')
    ? pass('Fields', '✓ Job.attempts exists (for retry)')
    : fail('Fields', '✗ Job.attempts missing')

  schema.includes('nextRetryAt DateTime?')
    ? pass('Fields', '✓ Job.nextRetryAt exists')
    : fail('Fields', '✗ Job.nextRetryAt missing')
}

// UsageRecord model
if (schema.includes('model UsageRecord')) {
  schema.includes('fixesApplied Int')
    ? pass('Fields', '✓ UsageRecord.fixesApplied exists')
    : fail('Fields', '✗ UsageRecord.fixesApplied missing')

  schema.includes('sitesActive  Int')
    ? pass('Fields', '✓ UsageRecord.sitesActive exists')
    : fail('Fields', '✗ UsageRecord.sitesActive missing')
}

// Subscription model
if (schema.includes('model Subscription')) {
  schema.includes('trialEnd DateTime?')
    ? pass('Fields', '✓ Subscription.trialEnd exists')
    : fail('Fields', '✗ Subscription.trialEnd missing')

  schema.includes('cancelAtPeriodEnd Boolean')
    ? pass('Fields', '✓ Subscription.cancelAtPeriodEnd exists')
    : fail('Fields', '✗ Subscription.cancelAtPeriodEnd missing')
}

// AuditLog model
if (schema.includes('model AuditLog')) {
  schema.includes('ipAddress  String?')
    ? pass('Fields', '✓ AuditLog.ipAddress exists')
    : fail('Fields', '✗ AuditLog.ipAddress missing')

  schema.includes('userAgent  String?')
    ? pass('Fields', '✓ AuditLog.userAgent exists')
    : fail('Fields', '✗ AuditLog.userAgent missing')
}

// Notification model
if (schema.includes('model Notification')) {
  schema.includes('actionUrl String?')
    ? pass('Fields', '✓ Notification.actionUrl exists')
    : fail('Fields', '✗ Notification.actionUrl missing')

  schema.includes('icon      String?')
    ? pass('Fields', '✓ Notification.icon exists')
    : fail('Fields', '✗ Notification.icon missing')
}

// ============================================================================
// INDEX CHECKS
// ============================================================================

console.log('\n🔍 Checking Critical Indexes...')

const criticalIndexes = [
  ['User', 'clerkId', '@@index([clerkId])'],
  ['User', 'email', '@@index([email])'],
  ['Connection', 'userId', '@@index([userId])'],
  ['Connection', 'status', '@@index([status])'],
  ['Issue', 'connectionId', '@@index([connectionId])'],
  ['Issue', 'status', '@@index([status])'],
  ['Issue', 'severity', '@@index([severity])'],
  ['Fix', 'connectionId', '@@index([connectionId])'],
  ['Fix', 'status', '@@index([status])'],
  ['Fix', 'rollbackDeadline', '@@index([rollbackDeadline])'],
  ['Job', 'status', '@@index([status])'],
  ['Job', 'status+priority', '@@index([status, priority])'],
  ['AuditLog', 'userId', '@@index([userId])'],
  ['AuditLog', 'createdAt', '@@index([createdAt])'],
  ['Notification', 'userId', '@@index([userId])'],
  ['Notification', 'read', '@@index([read])'],
  ['UsageRecord', 'userId+month+year', '@@unique([userId, month, year])'],
]

criticalIndexes.forEach(([model, field, indexPattern]) => {
  // Extract model section from schema
  const modelRegex = new RegExp(`model ${model} \\{[\\s\\S]*?\\n\\}`, 'g')
  const modelMatch = schema.match(modelRegex)

  if (modelMatch) {
    const modelContent = modelMatch[0]
    // Check if index pattern exists in model
    if (modelContent.includes(indexPattern as string)) {
      pass('Indexes', `✓ ${model}.${field} indexed`)
    } else {
      fail('Indexes', `✗ ${model}.${field} index missing`)
    }
  }
})

// ============================================================================
// RELATIONSHIP CHECKS
// ============================================================================

console.log('\n🔗 Checking Critical Relationships...')

const criticalRelations = [
  ['User', 'connections     Connection[]'],
  ['User', 'usageRecords    UsageRecord[]'],
  ['User', 'pendingPlans    PendingPlan[]'],
  ['Connection', 'issues  Issue[]'],
  ['Connection', 'fixes   Fix[]'],
  ['Issue', 'fixes Fix[]'],
  ['PendingPlan', 'fixes Fix[]'],
  ['Fix', 'plan   PendingPlan?'],
]

criticalRelations.forEach(([model, relation]) => {
  const modelRegex = new RegExp(`model ${model} \\{[\\s\\S]*?\\n\\}`, 'g')
  const modelMatch = schema.match(modelRegex)

  if (modelMatch) {
    const modelContent = modelMatch[0]
    if (modelContent.includes(relation as string)) {
      pass('Relations', `✓ ${model} → ${(relation as string).split(' ')[0]} exists`)
    } else {
      fail('Relations', `✗ ${model} → ${(relation as string).split(' ')[0]} missing`)
    }
  }
})

// ============================================================================
// CASCADE DELETE CHECKS
// ============================================================================

console.log('\n🗑️  Checking Cascade Delete Policies...')

const cascadeChecks = [
  ['Connection', 'userId', 'onDelete: Cascade'],
  ['Issue', 'connectionId', 'onDelete: Cascade'],
  ['Fix', 'connectionId', 'onDelete: Cascade'],
  ['UsageRecord', 'userId', 'onDelete: Cascade'],
  ['Notification', 'userId', 'onDelete: Cascade'],
]

cascadeChecks.forEach(([model, field, policy]) => {
  const modelRegex = new RegExp(`model ${model} \\{[\\s\\S]*?\\n\\}`, 'g')
  const modelMatch = schema.match(modelRegex)

  if (modelMatch) {
    const modelContent = modelMatch[0]
    const fieldRegex = new RegExp(`${field}.*?${policy}`)
    if (fieldRegex.test(modelContent)) {
      pass('Cascades', `✓ ${model}.${field} has cascade delete`)
    } else {
      fail('Cascades', `✗ ${model}.${field} missing cascade delete`)
    }
  }
})

// ============================================================================
// EXECUTION MODE CHECKS
// ============================================================================

console.log('\n⚙️  Checking Execution Mode Support...')

// Check ExecutionMode enum has all three modes
if (schema.includes('enum ExecutionMode')) {
  const execModeMatch = schema.match(/enum ExecutionMode \{[\s\S]*?\}/g)
  if (execModeMatch) {
    const execModeContent = execModeMatch[0]
    execModeContent.includes('AUTOMATIC')
      ? pass('ExecutionModes', '✓ AUTOMATIC mode defined')
      : fail('ExecutionModes', '✗ AUTOMATIC mode missing')

    execModeContent.includes('PLAN')
      ? pass('ExecutionModes', '✓ PLAN mode defined')
      : fail('ExecutionModes', '✗ PLAN mode missing')

    execModeContent.includes('APPROVE')
      ? pass('ExecutionModes', '✓ APPROVE mode defined')
      : fail('ExecutionModes', '✗ APPROVE mode missing')
  }
}

// Check PendingPlan model exists for PLAN mode
schema.includes('model PendingPlan')
  ? pass('ExecutionModes', '✓ PendingPlan model exists for PLAN mode')
  : fail('ExecutionModes', '✗ PendingPlan model missing')

// ============================================================================
// RESULTS SUMMARY
// ============================================================================

console.log('\n' + '='.repeat(80))
console.log('VERIFICATION RESULTS')
console.log('='.repeat(80))

const groupedResults = results.reduce((acc, result) => {
  if (!acc[result.category]) {
    acc[result.category] = []
  }
  acc[result.category].push(result)
  return acc
}, {} as Record<string, ValidationResult[]>)

let totalPassed = 0
let totalFailed = 0

Object.entries(groupedResults).forEach(([category, categoryResults]) => {
  const passed = categoryResults.filter((r) => r.passed).length
  const failed = categoryResults.filter((r) => !r.passed).length
  totalPassed += passed
  totalFailed += failed

  console.log(`\n${category}: ${passed}/${categoryResults.length} passed`)

  // Show failures only
  const failures = categoryResults.filter((r) => !r.passed)
  if (failures.length > 0) {
    failures.forEach((f) => {
      console.log(`  ${f.message}`)
    })
  }
})

console.log('\n' + '='.repeat(80))
console.log(`TOTAL: ${totalPassed} passed, ${totalFailed} failed`)
console.log('='.repeat(80))

if (totalFailed > 0) {
  console.log('\n❌ Schema verification FAILED')
  console.log('Please review and fix the issues above.')
  process.exit(1)
} else {
  console.log('\n✅ Schema verification PASSED')
  console.log('Your schema is ready for migration!')
  process.exit(0)
}
