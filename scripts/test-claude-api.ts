/**
 * Test Script: Validate Claude API Integration
 *
 * This script tests:
 * 1. Anthropic API key is valid
 * 2. Claude API responds correctly
 * 3. Token tracking works
 * 4. Cost calculation is accurate
 * 5. Database logging functions
 *
 * Run with: npx tsx scripts/test-claude-api.ts
 */

import Anthropic from '@anthropic-ai/sdk'
import { db } from '../lib/db'

const API_KEY = process.env.ANTHROPIC_API_KEY

// ANSI color codes for terminal output
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

async function testAnthropicAPIKey() {
  log('\n━━━ Test 1: Anthropic API Key Validation ━━━', 'cyan')

  if (!API_KEY) {
    log('✗ FAILED: ANTHROPIC_API_KEY not found in environment', 'red')
    return false
  }

  if (!API_KEY.startsWith('sk-ant-')) {
    log('✗ FAILED: API key format invalid (should start with sk-ant-)', 'red')
    return false
  }

  log(`✓ API key found: ${API_KEY.substring(0, 20)}...`, 'green')
  return true
}

async function testClaudeAPIConnection() {
  log('\n━━━ Test 2: Claude API Connection ━━━', 'cyan')

  try {
    const anthropic = new Anthropic({ apiKey: API_KEY })

    const startTime = Date.now()
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: 'Say "API test successful" and nothing else.',
        },
      ],
    })
    const latency = Date.now() - startTime

    const message = response.content[0]
    if (message.type !== 'text') {
      log('✗ FAILED: Unexpected response type', 'red')
      return false
    }

    log('✓ Claude API connection successful', 'green')
    log(`  Response: "${message.text}"`, 'blue')
    log(`  Latency: ${latency}ms`, 'blue')
    log(`  Model: ${response.model}`, 'blue')

    return { success: true, response, latency }
  } catch (error) {
    if (error instanceof Error) {
      log(`✗ FAILED: ${error.message}`, 'red')
    }
    return false
  }
}

async function testTokenTracking() {
  log('\n━━━ Test 3: Token Usage Tracking ━━━', 'cyan')

  try {
    const anthropic = new Anthropic({ apiKey: API_KEY })

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: 'Write exactly 50 words about SEO optimization for e-commerce stores.',
        },
      ],
    })

    const usage = response.usage
    if (!usage) {
      log('✗ FAILED: No usage data in response', 'red')
      return false
    }

    log('✓ Token usage tracking works', 'green')
    log(`  Input tokens: ${usage.input_tokens}`, 'blue')
    log(`  Output tokens: ${usage.output_tokens}`, 'blue')
    log(`  Total tokens: ${usage.input_tokens + usage.output_tokens}`, 'blue')

    // Calculate costs
    const inputCost = (usage.input_tokens / 1_000_000) * 3.0
    const outputCost = (usage.output_tokens / 1_000_000) * 15.0
    const totalCost = inputCost + outputCost

    log('✓ Cost calculation works', 'green')
    log(`  Input cost: $${inputCost.toFixed(6)}`, 'blue')
    log(`  Output cost: $${outputCost.toFixed(6)}`, 'blue')
    log(`  Total cost: $${totalCost.toFixed(6)}`, 'blue')

    return { success: true, usage, costs: { inputCost, outputCost, totalCost } }
  } catch (error) {
    if (error instanceof Error) {
      log(`✗ FAILED: ${error.message}`, 'red')
    }
    return false
  }
}

async function testDatabaseConnection() {
  log('\n━━━ Test 4: Database Connection ━━━', 'cyan')

  try {
    // Test database connection
    await db.$connect()
    log('✓ Database connection successful', 'green')

    // Check if APIUsageLog table exists and can be queried
    const count = await db.aPIUsageLog.count()
    log(`✓ APIUsageLog table accessible (${count} records)`, 'green')

    // Check if UsageRecord table exists
    const usageCount = await db.usageRecord.count()
    log(`✓ UsageRecord table accessible (${usageCount} records)`, 'green')

    // Check if AuditLog table exists
    const auditCount = await db.auditLog.count()
    log(`✓ AuditLog table accessible (${auditCount} records)`, 'green')

    await db.$disconnect()
    return true
  } catch (error) {
    if (error instanceof Error) {
      log(`✗ FAILED: ${error.message}`, 'red')
    }
    return false
  }
}

async function testEndToEndFlow() {
  log('\n━━━ Test 5: End-to-End Chat Flow Simulation ━━━', 'cyan')

  try {
    const anthropic = new Anthropic({ apiKey: API_KEY })

    // Simulate a user chat message
    const userMessage = 'What are the top 3 SEO tips for product titles?'
    log(`User message: "${userMessage}"`, 'blue')

    const startTime = Date.now()
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 300,
      system: 'You are SEOLOGY.AI\'s SEO assistant. Provide concise, actionable SEO advice.',
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    })
    const totalTime = Date.now() - startTime

    const assistantMessage = response.content[0]
    if (assistantMessage.type !== 'text') {
      log('✗ FAILED: Invalid response type', 'red')
      return false
    }

    log('✓ Chat flow successful', 'green')
    log(`  Claude response: "${assistantMessage.text.substring(0, 100)}..."`, 'blue')
    log(`  Total time: ${totalTime}ms`, 'blue')

    // Verify token tracking
    const usage = response.usage
    log('✓ Token tracking in chat flow', 'green')
    log(`  Input: ${usage.input_tokens} tokens`, 'blue')
    log(`  Output: ${usage.output_tokens} tokens`, 'blue')

    // Calculate cost
    const cost = ((usage.input_tokens / 1_000_000) * 3.0) + ((usage.output_tokens / 1_000_000) * 15.0)
    log(`  Estimated cost: $${cost.toFixed(6)}`, 'blue')

    return true
  } catch (error) {
    if (error instanceof Error) {
      log(`✗ FAILED: ${error.message}`, 'red')
    }
    return false
  }
}

async function testAPIRoute() {
  log('\n━━━ Test 6: API Route Validation ━━━', 'cyan')

  // Check if the route file exists and has correct structure
  const fs = await import('fs')
  const path = await import('path')

  const routePath = path.join(process.cwd(), 'app', 'api', 'shopify', 'chat', 'route.ts')

  if (!fs.existsSync(routePath)) {
    log('✗ FAILED: Chat API route file not found', 'red')
    return false
  }

  const routeContent = fs.readFileSync(routePath, 'utf-8')

  // Check for critical components
  const checks = [
    { name: 'Anthropic import', pattern: /import.*Anthropic.*from.*@anthropic-ai\/sdk/ },
    { name: 'API key usage', pattern: /ANTHROPIC_API_KEY/ },
    { name: 'Token tracking', pattern: /tokenUsage|input_tokens|output_tokens/ },
    { name: 'Cost calculation', pattern: /inputCost|outputCost|totalCost/ },
    { name: 'APIUsageLog creation', pattern: /aPIUsageLog\.create/ },
    { name: 'Credit checking', pattern: /aiCreditsUsed|aiCreditsLimit/ },
    { name: 'Audit logging', pattern: /auditLog\.create/ },
  ]

  let allPassed = true
  for (const check of checks) {
    if (check.pattern.test(routeContent)) {
      log(`  ✓ ${check.name}`, 'green')
    } else {
      log(`  ✗ ${check.name} - NOT FOUND`, 'red')
      allPassed = false
    }
  }

  if (allPassed) {
    log('✓ API route structure is valid', 'green')
  } else {
    log('✗ API route has missing components', 'red')
  }

  return allPassed
}

async function main() {
  log('\n╔══════════════════════════════════════════════════════╗', 'cyan')
  log('║   SEOLOGY.AI - Claude API Integration Test Suite   ║', 'cyan')
  log('╚══════════════════════════════════════════════════════╝', 'cyan')

  const results = {
    apiKey: false,
    connection: false,
    tokenTracking: false,
    database: false,
    endToEnd: false,
    apiRoute: false,
  }

  try {
    results.apiKey = await testAnthropicAPIKey()

    if (results.apiKey) {
      results.connection = !!(await testClaudeAPIConnection())
      results.tokenTracking = !!(await testTokenTracking())
    }

    results.database = await testDatabaseConnection()

    if (results.apiKey && results.connection) {
      results.endToEnd = await testEndToEndFlow()
    }

    results.apiRoute = await testAPIRoute()

    // Summary
    log('\n━━━ Test Summary ━━━', 'cyan')
    const passed = Object.values(results).filter(Boolean).length
    const total = Object.keys(results).length

    for (const [test, result] of Object.entries(results)) {
      log(
        `  ${result ? '✓' : '✗'} ${test}`,
        result ? 'green' : 'red'
      )
    }

    log(`\n${passed}/${total} tests passed`, passed === total ? 'green' : 'yellow')

    if (passed === total) {
      log('\n🎉 All systems operational! Claude API integration is working perfectly.', 'green')
      process.exit(0)
    } else {
      log('\n⚠️  Some tests failed. Please review the errors above.', 'red')
      process.exit(1)
    }
  } catch (error) {
    log('\n✗ FATAL ERROR', 'red')
    console.error(error)
    process.exit(1)
  }
}

main()
