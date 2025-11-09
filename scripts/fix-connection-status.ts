/**
 * Fix connection status from DISCONNECTED to CONNECTED
 * Use this when a shop has a valid access token but status is wrong
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixConnectionStatus(shop: string) {
  console.log(`\n🔧 Fixing connection status for: ${shop}`)
  console.log('=' .repeat(50))

  try {
    // Find the connection
    const connection = await prisma.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
      },
      select: {
        id: true,
        domain: true,
        status: true,
        accessToken: true,
        userId: true,
        displayName: true,
        updatedAt: true,
      },
    })

    if (!connection) {
      console.error('❌ No connection found for shop:', shop)
      console.log('\n💡 Run OAuth flow first:')
      console.log(`   https://seology.ai/api/auth/shopify?shop=${shop}`)
      return
    }

    console.log('\n📋 Current connection state:')
    console.log('   ID:', connection.id)
    console.log('   Shop:', connection.domain)
    console.log('   Status:', connection.status)
    console.log('   Display Name:', connection.displayName)
    console.log('   Has Access Token:', !!connection.accessToken)
    console.log('   Token Length:', connection.accessToken?.length || 0)
    console.log('   Last Updated:', connection.updatedAt)

    if (connection.status === 'CONNECTED') {
      console.log('\n✅ Connection is already CONNECTED - no changes needed')
      return
    }

    if (!connection.accessToken) {
      console.error('\n❌ Cannot fix - connection has no access token')
      console.log('💡 Re-run OAuth flow to get a new access token:')
      console.log(`   https://seology.ai/api/auth/shopify?shop=${shop}`)
      return
    }

    // Update status to CONNECTED
    console.log(`\n🔄 Updating status from ${connection.status} to CONNECTED...`)

    const updated = await prisma.connection.update({
      where: { id: connection.id },
      data: {
        status: 'CONNECTED',
        lastSync: new Date(),
      },
    })

    console.log('✅ Connection status updated successfully!')
    console.log('\n📋 New connection state:')
    console.log('   Status:', updated.status)
    console.log('   Last Sync:', updated.lastSync)

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: connection.userId,
        action: 'CONNECTION_STATUS_FIXED',
        resource: 'connection',
        resourceId: connection.id,
        details: JSON.stringify({
          shop: connection.domain,
          oldStatus: connection.status,
          newStatus: 'CONNECTED',
          fixedBy: 'script',
          reason: 'Manual status correction',
        }),
      },
    })

    console.log('✅ Audit log created')

    console.log('\n🎉 Done! You can now use the onboarding flow:')
    console.log(`   https://seology.ai/shopify/onboarding?shop=${shop}`)

  } catch (error) {
    console.error('\n❌ Error:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Get shop from command line argument
const shop = process.argv[2]

if (!shop) {
  console.error('❌ Usage: npx tsx scripts/fix-connection-status.ts SHOP.myshopify.com')
  console.error('\nExample:')
  console.error('  npx tsx scripts/fix-connection-status.ts seology-3.myshopify.com')
  process.exit(1)
}

// Run the fix
fixConnectionStatus(shop)
  .then(() => {
    console.log('\n✅ Script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error)
    process.exit(1)
  })
