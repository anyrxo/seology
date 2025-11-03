/**
 * Database Reset Script
 *
 * DANGER: This will delete ALL data from the database!
 * Only use in development environments.
 *
 * Usage: npm run db:reset
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function reset() {
  console.log('🗑️  Starting database reset...')
  console.log('⚠️  WARNING: This will delete ALL data from the database!')

  // Safety check - only allow in development
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Cannot reset database in production environment!')
    process.exit(1)
  }

  // Countdown warning
  console.log('\n⏳ Starting in:')
  for (let i = 3; i > 0; i--) {
    console.log(`   ${i}...`)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('\n🧹 Deleting all data...\n')

  try {
    // Delete in correct order to respect foreign key constraints
    console.log('   ➜ Deleting notifications...')
    await prisma.notification.deleteMany()

    console.log('   ➜ Deleting audit logs...')
    await prisma.auditLog.deleteMany()

    console.log('   ➜ Deleting metrics...')
    await prisma.metric.deleteMany()

    console.log('   ➜ Deleting fixes...')
    await prisma.fix.deleteMany()

    console.log('   ➜ Deleting issues...')
    await prisma.issue.deleteMany()

    console.log('   ➜ Deleting crawls...')
    await prisma.crawl.deleteMany()

    console.log('   ➜ Deleting AI conversations...')
    await prisma.aIConversation.deleteMany()

    console.log('   ➜ Deleting subscriptions...')
    await prisma.subscription.deleteMany()

    console.log('   ➜ Deleting webhooks...')
    await prisma.webhook.deleteMany()

    console.log('   ➜ Deleting team invitations...')
    await prisma.teamInvitation.deleteMany()

    console.log('   ➜ Deleting team members...')
    await prisma.teamMember.deleteMany()

    console.log('   ➜ Deleting teams...')
    await prisma.team.deleteMany()

    console.log('   ➜ Deleting connections...')
    await prisma.connection.deleteMany()

    console.log('   ➜ Deleting pending plans...')
    await prisma.pendingPlan.deleteMany()

    console.log('   ➜ Deleting usage records...')
    await prisma.usageRecord.deleteMany()

    console.log('   ➜ Deleting jobs...')
    await prisma.job.deleteMany()

    console.log('   ➜ Deleting CSRF tokens...')
    await prisma.cSRFToken.deleteMany()

    console.log('   ➜ Deleting users...')
    await prisma.user.deleteMany()

    console.log('\n✅ Database reset complete!')
    console.log('\n💡 To populate with seed data, run: npm run db:seed')
  } catch (error) {
    console.error('\n❌ Error during reset:', error)
    process.exit(1)
  }
}

reset()
  .catch((e) => {
    console.error('❌ Fatal error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
