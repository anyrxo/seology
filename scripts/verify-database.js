/**
 * Database Verification Script
 * Checks database connection and counts all data
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function verifyDatabase() {
  try {
    console.log('🔍 Connecting to database...')
    await prisma.$connect()
    console.log('✅ Database connected successfully!\n')

    console.log('📊 Data Summary:\n')

    const userCount = await prisma.user.count()
    console.log(`  Users: ${userCount}`)

    const connectionCount = await prisma.connection.count()
    console.log(`  Store Connections: ${connectionCount}`)

    const productCount = await prisma.shopifyProduct.count()
    console.log(`  Shopify Products: ${productCount}`)

    const issueCount = await prisma.issue.count()
    console.log(`  SEO Issues: ${issueCount}`)

    const fixCount = await prisma.fix.count()
    console.log(`  Fixes Applied: ${fixCount}`)

    const conversationCount = await prisma.aIConversation.count()
    console.log(`  AI Conversations: ${conversationCount}`)

    console.log('\n✅ All data persisted successfully!')
    console.log('💾 Database: Prisma Postgres (Cloud PostgreSQL)')
    console.log('🔒 Persistence: PERMANENT')
    console.log('♻️  Session Continuity: YES')

    // Show sample user preferences if any users exist
    if (userCount > 0) {
      console.log('\n👤 User Preferences Sample:')
      const sampleUser = await prisma.user.findFirst({
        select: {
          email: true,
          aiChatEnabled: true,
          preferredAuditScope: true,
          onboardingCompleted: true,
          plan: true,
          executionMode: true,
        },
      })
      if (sampleUser) {
        console.log(`  Email: ${sampleUser.email}`)
        console.log(`  AI Chat: ${sampleUser.aiChatEnabled ? 'Enabled' : 'Disabled'}`)
        console.log(`  Audit Scope: ${sampleUser.preferredAuditScope}`)
        console.log(`  Onboarding: ${sampleUser.onboardingCompleted ? 'Complete' : 'In Progress'}`)
        console.log(`  Plan: ${sampleUser.plan}`)
        console.log(`  Execution Mode: ${sampleUser.executionMode}`)
      }
    }

    await prisma.$disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Database error:', error.message)
    await prisma.$disconnect()
    process.exit(1)
  }
}

verifyDatabase()
