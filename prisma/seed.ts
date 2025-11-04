/**
 * Database Seed File for SEOLOGY.AI
 *
 * Creates comprehensive demo data including:
 * - Admin and regular users with various plans
 * - Sample Shopify/WordPress connections
 * - Realistic SEO issues (missing meta, broken links, etc.)
 * - Applied, failed, and pending fixes
 * - Notifications, audit logs, and metrics
 *
 * Run with: npm run seed
 */

import { PrismaClient } from '@prisma/client'
import { encrypt } from '../lib/encryption'

const prisma = new PrismaClient()

// Helper function to create deterministic but realistic dates
function daysAgo(days: number): Date {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

function hoursAgo(hours: number): Date {
  const date = new Date()
  date.setHours(date.getHours() - hours)
  return date
}

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean existing data (in development only)
  if (process.env.NODE_ENV !== 'production') {
    console.log('🧹 Cleaning existing data...')
    await prisma.notification.deleteMany()
    await prisma.auditLog.deleteMany()
    await prisma.metric.deleteMany()
    await prisma.fix.deleteMany()
    await prisma.issue.deleteMany()
    await prisma.crawl.deleteMany()
    await prisma.aIConversation.deleteMany()
    await prisma.subscription.deleteMany()
    await prisma.webhook.deleteMany()
    await prisma.teamInvitation.deleteMany()
    await prisma.teamMember.deleteMany()
    await prisma.team.deleteMany()
    await prisma.connection.deleteMany()
    await prisma.cSRFToken.deleteMany()
    await prisma.user.deleteMany()
    console.log('✅ Existing data cleaned')
  }

  // ===================================================================
  // 1. CREATE USERS
  // ===================================================================
  console.log('\n👥 Creating users...')

  const adminUser = await prisma.user.create({
    data: {
      clerkId: 'user_admin_demo_001',
      email: 'admin@seology.ai',
      name: 'Admin User',
      role: 'ADMIN',
      plan: 'SCALE',
      executionMode: 'PLAN',
      stripeCustomerId: 'cus_admin_demo_001',
      stripeSubscriptionId: 'sub_admin_demo_001',
    },
  })

  const users = await Promise.all([
    // Starter plan user - new to platform
    prisma.user.create({
      data: {
        clerkId: 'user_starter_demo_001',
        email: 'sarah@example.com',
        name: 'Sarah Johnson',
        role: 'USER',
        plan: 'STARTER',
        executionMode: 'APPROVE',
        stripeCustomerId: 'cus_starter_demo_001',
        stripeSubscriptionId: 'sub_starter_demo_001',
      },
    }),

    // Growth plan user - active user
    prisma.user.create({
      data: {
        clerkId: 'user_growth_demo_001',
        email: 'michael@techstartup.io',
        name: 'Michael Chen',
        role: 'USER',
        plan: 'GROWTH',
        executionMode: 'PLAN',
        stripeCustomerId: 'cus_growth_demo_001',
        stripeSubscriptionId: 'sub_growth_demo_001',
      },
    }),

    // Scale plan user - enterprise
    prisma.user.create({
      data: {
        clerkId: 'user_scale_demo_001',
        email: 'jennifer@enterprise.com',
        name: 'Jennifer Williams',
        role: 'USER',
        plan: 'SCALE',
        executionMode: 'AUTOMATIC',
        stripeCustomerId: 'cus_scale_demo_001',
        stripeSubscriptionId: 'sub_scale_demo_001',
      },
    }),

    // Starter plan user - evaluating
    prisma.user.create({
      data: {
        clerkId: 'user_starter_demo_002',
        email: 'alex@shopowner.com',
        name: 'Alex Martinez',
        role: 'USER',
        plan: 'STARTER',
        executionMode: 'AUTOMATIC',
        stripeCustomerId: 'cus_starter_demo_002',
        stripeSubscriptionId: 'sub_starter_demo_002',
      },
    }),

    // Growth plan user - agency
    prisma.user.create({
      data: {
        clerkId: 'user_growth_demo_002',
        email: 'david@digitalagency.com',
        name: 'David Thompson',
        role: 'USER',
        plan: 'GROWTH',
        executionMode: 'PLAN',
        stripeCustomerId: 'cus_growth_demo_002',
        stripeSubscriptionId: 'sub_growth_demo_002',
      },
    }),
  ])

  console.log(`✅ Created ${users.length + 1} users (1 admin, ${users.length} regular)`)

  // ===================================================================
  // 2. CREATE SUBSCRIPTIONS
  // ===================================================================
  console.log('\n💳 Creating subscriptions...')

  const now = new Date()
  const nextMonth = new Date()
  nextMonth.setMonth(nextMonth.getMonth() + 1)

  const subscriptions = await Promise.all([
    // Admin subscription
    prisma.subscription.create({
      data: {
        userId: adminUser.id,
        stripeSubscriptionId: 'sub_admin_demo_001',
        plan: 'SCALE',
        status: 'ACTIVE',
        currentPeriodStart: daysAgo(15),
        currentPeriodEnd: new Date(nextMonth),
      },
    }),

    // User subscriptions
    ...users.map((user, index) =>
      prisma.subscription.create({
        data: {
          userId: user.id,
          stripeSubscriptionId: `sub_${user.plan.toLowerCase()}_demo_${String(index + 1).padStart(3, '0')}`,
          plan: user.plan,
          status: index === 0 ? 'TRIALING' : 'ACTIVE',
          currentPeriodStart: daysAgo(Math.floor(Math.random() * 25) + 5),
          currentPeriodEnd: new Date(nextMonth),
        },
      })
    ),
  ])

  console.log(`✅ Created ${subscriptions.length} subscriptions`)

  // ===================================================================
  // 3. CREATE CONNECTIONS
  // ===================================================================
  console.log('\n🔌 Creating platform connections...')

  // Encrypt sample tokens (FAKE tokens for demo/development only)
  const sampleShopifyToken = encrypt('FAKE_SHOPIFY_TOKEN_FOR_DEMO_ONLY_DO_NOT_USE')
  const sampleWPPassword = encrypt('FAKE_WP_PASSWORD_FOR_DEMO_ONLY_DO_NOT_USE')

  const connections = await Promise.all([
    // Sarah's Shopify store (Starter)
    prisma.connection.create({
      data: {
        userId: users[0].id,
        platform: 'SHOPIFY',
        domain: 'sarahs-boutique.myshopify.com',
        displayName: "Sarah's Fashion Boutique",
        accessToken: sampleShopifyToken,
        status: 'CONNECTED',
        lastSync: hoursAgo(2),
      },
    }),

    // Michael's WordPress sites (Growth)
    prisma.connection.create({
      data: {
        userId: users[1].id,
        platform: 'WORDPRESS',
        domain: 'techstartup.io',
        displayName: 'Tech Startup Blog',
        credentials: encrypt(
          JSON.stringify({
            username: 'admin',
            password: 'wp_app_password_demo_001',
            apiUrl: 'https://techstartup.io/wp-json',
          })
        ),
        status: 'CONNECTED',
        lastSync: hoursAgo(5),
      },
    }),

    prisma.connection.create({
      data: {
        userId: users[1].id,
        platform: 'CUSTOM',
        domain: 'techstartup.com',
        displayName: 'Tech Startup Main Site',
        status: 'CONNECTED',
        lastSync: hoursAgo(8),
      },
    }),

    // Jennifer's enterprise sites (Scale)
    prisma.connection.create({
      data: {
        userId: users[2].id,
        platform: 'SHOPIFY',
        domain: 'enterprise-store.myshopify.com',
        displayName: 'Enterprise E-commerce',
        accessToken: sampleShopifyToken,
        status: 'CONNECTED',
        lastSync: hoursAgo(1),
      },
    }),

    prisma.connection.create({
      data: {
        userId: users[2].id,
        platform: 'WORDPRESS',
        domain: 'enterprise-blog.com',
        displayName: 'Enterprise Knowledge Base',
        credentials: encrypt(
          JSON.stringify({
            username: 'admin',
            password: 'wp_app_password_demo_002',
            apiUrl: 'https://enterprise-blog.com/wp-json',
          })
        ),
        status: 'CONNECTED',
        lastSync: hoursAgo(3),
      },
    }),

    prisma.connection.create({
      data: {
        userId: users[2].id,
        platform: 'CUSTOM',
        domain: 'enterprise.com',
        displayName: 'Enterprise Corporate Site',
        status: 'CONNECTED',
        lastSync: hoursAgo(4),
      },
    }),

    // Alex's Shopify store (Starter)
    prisma.connection.create({
      data: {
        userId: users[3].id,
        platform: 'SHOPIFY',
        domain: 'alex-shop.myshopify.com',
        displayName: 'Alex Electronics Shop',
        accessToken: sampleShopifyToken,
        status: 'CONNECTED',
        lastSync: hoursAgo(6),
      },
    }),

    // David's agency client sites (Growth)
    prisma.connection.create({
      data: {
        userId: users[4].id,
        platform: 'WORDPRESS',
        domain: 'client1.com',
        displayName: 'Agency Client - Fitness Studio',
        credentials: encrypt(
          JSON.stringify({
            username: 'admin',
            password: 'wp_app_password_demo_003',
            apiUrl: 'https://client1.com/wp-json',
          })
        ),
        status: 'CONNECTED',
        lastSync: hoursAgo(12),
      },
    }),

    prisma.connection.create({
      data: {
        userId: users[4].id,
        platform: 'SHOPIFY',
        domain: 'client2-store.myshopify.com',
        displayName: 'Agency Client - Organic Foods',
        accessToken: sampleShopifyToken,
        status: 'CONNECTED',
        lastSync: hoursAgo(10),
      },
    }),

    // One connection with ERROR status
    prisma.connection.create({
      data: {
        userId: users[4].id,
        platform: 'WORDPRESS',
        domain: 'client3.com',
        displayName: 'Agency Client - Law Firm (Auth Error)',
        status: 'ERROR',
        lastSync: daysAgo(3),
      },
    }),
  ])

  console.log(`✅ Created ${connections.length} platform connections`)

  // ===================================================================
  // 4. CREATE SEO ISSUES
  // ===================================================================
  console.log('\n🔍 Creating SEO issues...')

  const issueTypes = [
    {
      type: 'missing_meta_description',
      title: 'Missing Meta Description',
      severity: 'HIGH' as const,
      recommendation: 'Add a compelling meta description between 150-160 characters that includes target keywords.',
    },
    {
      type: 'missing_meta_title',
      title: 'Missing Page Title',
      severity: 'CRITICAL' as const,
      recommendation: 'Add a unique, descriptive page title under 60 characters.',
    },
    {
      type: 'missing_alt_text',
      title: 'Images Missing Alt Text',
      severity: 'MEDIUM' as const,
      recommendation: 'Add descriptive alt text to all images for accessibility and SEO.',
    },
    {
      type: 'broken_link',
      title: 'Broken Internal Link',
      severity: 'HIGH' as const,
      recommendation: 'Update or remove broken links that return 404 errors.',
    },
    {
      type: 'duplicate_content',
      title: 'Duplicate Page Content',
      severity: 'MEDIUM' as const,
      recommendation: 'Consolidate or differentiate duplicate content to avoid SEO penalties.',
    },
    {
      type: 'slow_page_speed',
      title: 'Slow Page Load Time',
      severity: 'HIGH' as const,
      recommendation: 'Optimize images, enable caching, and minimize JavaScript to improve load times.',
    },
    {
      type: 'missing_h1',
      title: 'Missing H1 Heading',
      severity: 'HIGH' as const,
      recommendation: 'Add a clear H1 heading that describes the page content.',
    },
    {
      type: 'thin_content',
      title: 'Thin Content (Low Word Count)',
      severity: 'MEDIUM' as const,
      recommendation: 'Expand content to at least 300 words with valuable information.',
    },
  ]

  const samplePages = [
    '/products/wireless-headphones',
    '/products/smart-watch',
    '/blog/seo-tips-2024',
    '/about-us',
    '/contact',
    '/services',
    '/products/laptop-sleeve',
    '/blog/marketing-strategies',
    '/category/electronics',
    '/products/phone-case',
  ]

  const issues = []

  // Create issues for each connection
  for (const connection of connections) {
    if (connection.status !== 'CONNECTED') continue

    const issueCount = Math.floor(Math.random() * 6) + 3 // 3-8 issues per site

    for (let i = 0; i < issueCount; i++) {
      const issueTemplate = issueTypes[Math.floor(Math.random() * issueTypes.length)]
      const pageUrl = `https://${connection.domain}${samplePages[Math.floor(Math.random() * samplePages.length)]}`

      const statuses: Array<'DETECTED' | 'OPEN' | 'FIXED' | 'IN_PROGRESS'> = ['DETECTED', 'OPEN', 'FIXED', 'IN_PROGRESS']
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      const issue = await prisma.issue.create({
        data: {
          connectionId: connection.id,
          type: issueTemplate.type,
          title: issueTemplate.title,
          severity: issueTemplate.severity,
          pageUrl,
          details: JSON.stringify({
            detectedBy: 'crawler',
            context: `Found on ${pageUrl}`,
            impact: 'SEO ranking may be negatively affected',
            estimatedTrafficImpact: Math.floor(Math.random() * 500) + 50,
          }),
          recommendation: issueTemplate.recommendation,
          status,
          detectedAt: daysAgo(Math.floor(Math.random() * 30)),
          fixedAt: status === 'FIXED' ? daysAgo(Math.floor(Math.random() * 10)) : null,
        },
      })

      issues.push(issue)
    }
  }

  console.log(`✅ Created ${issues.length} SEO issues`)

  // ===================================================================
  // 5. CREATE FIXES
  // ===================================================================
  console.log('\n🔧 Creating fixes...')

  const fixes = []

  // Create fixes for some of the issues
  for (const issue of issues) {
    if (issue.status === 'FIXED' || issue.status === 'IN_PROGRESS' || Math.random() > 0.5) {
      const fixStatuses: Array<'APPLIED' | 'FAILED' | 'PENDING'> =
        issue.status === 'FIXED' ? ['APPLIED'] :
        issue.status === 'IN_PROGRESS' ? ['PENDING'] :
        ['APPLIED', 'FAILED', 'PENDING']

      const fixStatus = fixStatuses[Math.floor(Math.random() * fixStatuses.length)]

      const fix = await prisma.fix.create({
        data: {
          connectionId: issue.connectionId,
          issueId: issue.id,
          description: `Fix: ${issue.title} on ${issue.pageUrl}`,
          type: 'seo_fix',
          targetUrl: issue.pageUrl,
          changes: JSON.stringify({
            action: 'update_meta',
            field: issue.type,
            oldValue: null,
            newValue: 'Auto-generated SEO-optimized content',
          }),
          beforeState: JSON.stringify({
            hasMetaDescription: false,
            content: '',
          }),
          afterState: JSON.stringify({
            hasMetaDescription: true,
            content: 'SEO-optimized meta description with target keywords',
          }),
          method: 'AUTOMATIC',
          status: fixStatus,
          appliedAt: fixStatus === 'APPLIED' ? daysAgo(Math.floor(Math.random() * 15)) : null,
          createdAt: daysAgo(Math.floor(Math.random() * 20)),
        },
      })

      fixes.push(fix)
    }
  }

  console.log(`✅ Created ${fixes.length} fixes`)

  // ===================================================================
  // 6. CREATE CRAWLS
  // ===================================================================
  console.log('\n🕷️  Creating crawl records...')

  const crawls = []

  for (const connection of connections) {
    if (connection.status !== 'CONNECTED') continue

    // Recent completed crawl
    const recentCrawl = await prisma.crawl.create({
      data: {
        connectionId: connection.id,
        status: 'COMPLETED',
        pagesFound: Math.floor(Math.random() * 50) + 10,
        issuesFound: issues.filter(i => i.connectionId === connection.id).length,
        startedAt: daysAgo(1),
        completedAt: hoursAgo(Math.floor(Math.random() * 12) + 1),
      },
    })

    crawls.push(recentCrawl)

    // Older crawl history
    if (Math.random() > 0.5) {
      const oldCrawl = await prisma.crawl.create({
        data: {
          connectionId: connection.id,
          status: 'COMPLETED',
          pagesFound: Math.floor(Math.random() * 40) + 10,
          issuesFound: Math.floor(Math.random() * 20) + 5,
          startedAt: daysAgo(15),
          completedAt: daysAgo(15),
        },
      })

      crawls.push(oldCrawl)
    }
  }

  console.log(`✅ Created ${crawls.length} crawl records`)

  // ===================================================================
  // 7. CREATE METRICS
  // ===================================================================
  console.log('\n📊 Creating performance metrics...')

  const metrics = []

  for (const connection of connections) {
    if (connection.status !== 'CONNECTED') continue

    // Create metrics for the last 30 days
    for (let day = 30; day >= 0; day--) {
      const date = daysAgo(day)

      const metric = await prisma.metric.create({
        data: {
          connectionId: connection.id,
          date,
          organicTraffic: Math.floor(Math.random() * 1000) + 200,
          rankings: JSON.stringify({
            'seo tools': Math.floor(Math.random() * 20) + 1,
            'website optimization': Math.floor(Math.random() * 30) + 1,
            'search ranking': Math.floor(Math.random() * 40) + 1,
          }),
          pageSpeed: parseFloat((Math.random() * 2 + 2).toFixed(2)), // 2-4 seconds
          issuesCount: issues.filter(i => i.connectionId === connection.id && i.status !== 'FIXED').length,
          fixesCount: fixes.filter(f => f.connectionId === connection.id && f.status === 'APPLIED').length,
        },
      })

      metrics.push(metric)
    }
  }

  console.log(`✅ Created ${metrics.length} performance metrics`)

  // ===================================================================
  // 8. CREATE NOTIFICATIONS
  // ===================================================================
  console.log('\n🔔 Creating notifications...')

  const notifications = []

  // Create notifications for all users
  for (const user of [...users, adminUser]) {
    const userConnections = connections.filter(c => c.userId === user.id)

    // Success notifications
    const successNotif = await prisma.notification.create({
      data: {
        userId: user.id,
        type: 'SUCCESS',
        title: 'SEO Fixes Applied Successfully',
        message: `${Math.floor(Math.random() * 10) + 5} SEO issues have been automatically fixed on your site.`,
        actionUrl: '/dashboard',
        read: Math.random() > 0.5,
        createdAt: hoursAgo(Math.floor(Math.random() * 48)),
      },
    })
    notifications.push(successNotif)

    // Info notifications
    if (userConnections.length > 0) {
      const infoNotif = await prisma.notification.create({
        data: {
          userId: user.id,
          type: 'INFO',
          title: 'Site Crawl Completed',
          message: `Found ${Math.floor(Math.random() * 15) + 5} new SEO opportunities on ${userConnections[0].displayName}.`,
          actionUrl: '/dashboard',
          read: Math.random() > 0.3,
          createdAt: hoursAgo(Math.floor(Math.random() * 72)),
        },
      })
      notifications.push(infoNotif)
    }

    // Warning notification for some users
    if (Math.random() > 0.6) {
      const warningNotif = await prisma.notification.create({
        data: {
          userId: user.id,
          type: 'WARNING',
          title: 'High Priority Issues Detected',
          message: `${Math.floor(Math.random() * 5) + 1} critical SEO issues require your attention.`,
          actionUrl: '/dashboard',
          read: false,
          createdAt: hoursAgo(Math.floor(Math.random() * 24)),
        },
      })
      notifications.push(warningNotif)
    }
  }

  // Admin-specific notifications
  const adminNotif = await prisma.notification.create({
    data: {
      userId: adminUser.id,
      type: 'INFO',
      title: 'System Update',
      message: 'Database seed completed successfully. All demo data has been created.',
      actionUrl: '/admin',
      read: false,
      createdAt: new Date(),
    },
  })
  notifications.push(adminNotif)

  console.log(`✅ Created ${notifications.length} notifications`)

  // ===================================================================
  // 9. CREATE AUDIT LOGS
  // ===================================================================
  console.log('\n📝 Creating audit logs...')

  const auditLogs = []

  // Create audit logs for various actions
  for (const user of [...users, adminUser]) {
    const userConnections = connections.filter(c => c.userId === user.id)
    const userFixes = fixes.filter(f =>
      userConnections.some(c => c.id === f.connectionId)
    )

    // Connection created logs
    for (const connection of userConnections) {
      const log = await prisma.auditLog.create({
        data: {
          userId: user.id,
          connectionId: connection.id,
          action: 'CONNECTION_CREATED',
          resource: 'connection',
          resourceId: connection.id,
          details: JSON.stringify({
            platform: connection.platform,
            domain: connection.domain,
          }),
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          createdAt: connection.createdAt,
        },
      })
      auditLogs.push(log)
    }

    // Fix applied logs
    for (const fix of userFixes.slice(0, 5)) {
      if (fix.status === 'APPLIED') {
        const log = await prisma.auditLog.create({
          data: {
            userId: user.id,
            connectionId: fix.connectionId,
            action: 'FIX_APPLIED',
            resource: 'fix',
            resourceId: fix.id,
            details: JSON.stringify({
              type: fix.type,
              description: fix.description,
            }),
            ipAddress: '192.168.1.1',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            createdAt: fix.appliedAt || fix.createdAt,
          },
        })
        auditLogs.push(log)
      }
    }

    // Settings updated logs
    const settingsLog = await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'SETTINGS_UPDATED',
        resource: 'user',
        resourceId: user.id,
        details: JSON.stringify({
          field: 'executionMode',
          value: user.executionMode,
        }),
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        createdAt: daysAgo(Math.floor(Math.random() * 20)),
      },
    })
    auditLogs.push(settingsLog)
  }

  console.log(`✅ Created ${auditLogs.length} audit logs`)

  // ===================================================================
  // 10. CREATE AI CONVERSATIONS
  // ===================================================================
  console.log('\n🤖 Creating AI conversation samples...')

  const conversations = []

  for (const user of users.slice(0, 3)) {
    const userConnections = connections.filter(c => c.userId === user.id)

    if (userConnections.length > 0) {
      const conversation = await prisma.aIConversation.create({
        data: {
          userId: user.id,
          connectionId: userConnections[0].id,
          title: 'SEO Analysis',
          messages: {
            create: [
              {
                role: 'user',
                content: 'Can you analyze my homepage for SEO issues?',
              },
              {
                role: 'assistant',
                content: "I've analyzed your homepage and found several opportunities for improvement:\n\n1. Missing meta description - this helps search engines understand your page\n2. H1 heading could be more descriptive\n3. Several images lack alt text\n\nWould you like me to fix these automatically?",
              },
              {
                role: 'user',
                content: 'Yes, please fix them automatically.',
              },
              {
                role: 'assistant',
                content: "Perfect! I've applied the following fixes:\n\n✅ Added SEO-optimized meta description\n✅ Updated H1 heading\n✅ Added descriptive alt text to 8 images\n\nYour homepage is now optimized for better search engine visibility!",
              },
            ],
          },
          context: JSON.stringify({
            siteUrl: userConnections[0].domain,
            platform: userConnections[0].platform,
            analysisDate: new Date().toISOString(),
          }),
          createdAt: daysAgo(Math.floor(Math.random() * 10)),
        },
      })
      conversations.push(conversation)
    }
  }

  console.log(`✅ Created ${conversations.length} AI conversations`)

  // ===================================================================
  // 11. CREATE WEBHOOKS
  // ===================================================================
  console.log('\n🎣 Creating webhooks...')

  const webhooks = []

  // Create webhooks for power users
  for (const user of users.slice(1, 3)) {
    const webhook = await prisma.webhook.create({
      data: {
        userId: user.id,
        url: `https://webhook.site/${user.id}/seology`,
        events: JSON.stringify(['fix.applied', 'issue.detected', 'crawl.completed']),
        secret: `whsec_${Math.random().toString(36).substring(2, 15)}`,
        enabled: true,
        failureCount: 0,
        lastTriggeredAt: hoursAgo(Math.floor(Math.random() * 48)),
      },
    })
    webhooks.push(webhook)
  }

  console.log(`✅ Created ${webhooks.length} webhooks`)

  // ===================================================================
  // 12. CREATE TEAMS (OPTIONAL)
  // ===================================================================
  console.log('\n👥 Creating teams...')

  // Create a team for the agency user
  const agencyUser = users[4] // David Thompson

  const agencyTeam = await prisma.team.create({
    data: {
      name: 'Digital Agency Team',
      description: 'Managing multiple client websites',
      ownerId: agencyUser.id,
      plan: 'GROWTH',
    },
  })

  // Add team member
  await prisma.teamMember.create({
    data: {
      teamId: agencyTeam.id,
      userId: agencyUser.id,
      role: 'OWNER',
    },
  })

  console.log(`✅ Created 1 team with members`)

  // ===================================================================
  // SUMMARY
  // ===================================================================
  console.log('\n' + '='.repeat(60))
  console.log('🎉 DATABASE SEED COMPLETED SUCCESSFULLY!')
  console.log('='.repeat(60))
  console.log('\n📊 Summary:')
  console.log(`   👤 Users: ${users.length + 1} (1 admin, ${users.length} regular)`)
  console.log(`   💳 Subscriptions: ${subscriptions.length}`)
  console.log(`   🔌 Connections: ${connections.length}`)
  console.log(`   🔍 Issues: ${issues.length}`)
  console.log(`   🔧 Fixes: ${fixes.length}`)
  console.log(`   🕷️  Crawls: ${crawls.length}`)
  console.log(`   📊 Metrics: ${metrics.length}`)
  console.log(`   🔔 Notifications: ${notifications.length}`)
  console.log(`   📝 Audit Logs: ${auditLogs.length}`)
  console.log(`   🤖 AI Conversations: ${conversations.length}`)
  console.log(`   🎣 Webhooks: ${webhooks.length}`)
  console.log(`   👥 Teams: 1`)
  console.log('\n' + '='.repeat(60))
  console.log('\n🔐 Demo Accounts:')
  console.log('\n   Admin:')
  console.log('   - Email: admin@seology.ai')
  console.log('   - Clerk ID: user_admin_demo_001')
  console.log('   - Plan: SCALE')
  console.log('\n   Regular Users:')
  users.forEach((user, index) => {
    console.log(`   ${index + 1}. ${user.name} (${user.email})`)
    console.log(`      - Plan: ${user.plan}`)
    console.log(`      - Execution Mode: ${user.executionMode}`)
    console.log(`      - Connections: ${connections.filter(c => c.userId === user.id).length}`)
  })
  console.log('\n' + '='.repeat(60))
  console.log('\n✅ You can now run: npm run dev')
  console.log('   Then navigate to /dashboard to see the seeded data\n')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
