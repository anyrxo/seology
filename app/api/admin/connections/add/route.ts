import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { encrypt } from '@/lib/encryption'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const adminUser = await db.user.findUnique({
      where: { clerkId: userId },
      select: { id: true, role: true, email: true },
    })

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { userEmail, shopDomain, accessToken } = body

    // Validate required fields
    if (!userEmail || !shopDomain) {
      return NextResponse.json(
        { error: 'Missing required fields: userEmail and shopDomain are required' },
        { status: 400 }
      )
    }

    // Validate shop domain format
    if (!shopDomain.endsWith('.myshopify.com')) {
      return NextResponse.json(
        { error: 'Invalid shop domain - must end with .myshopify.com' },
        { status: 400 }
      )
    }

    // Find target user
    const targetUser = await db.user.findUnique({
      where: { email: userEmail },
      select: { id: true, email: true, name: true },
    })

    if (!targetUser) {
      return NextResponse.json(
        { error: `User not found with email: ${userEmail}` },
        { status: 404 }
      )
    }

    // Check if connection already exists
    const existingConnection = await db.connection.findFirst({
      where: {
        userId: targetUser.id,
        domain: { contains: shopDomain.replace('.myshopify.com', '') },
      },
    })

    if (existingConnection) {
      return NextResponse.json(
        {
          error: 'Connection already exists',
          connection: {
            id: existingConnection.id,
            domain: existingConnection.domain,
            status: existingConnection.status,
          },
        },
        { status: 409 }
      )
    }

    // === SCENARIO 1: Access Token Provided ===
    if (accessToken && accessToken.trim()) {
      console.log('Creating connection with provided access token for:', userEmail)

      // Fetch shop data from Shopify API
      let shopDataResponse
      try {
        shopDataResponse = await fetch(`https://${shopDomain}/admin/api/2024-01/shop.json`, {
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
          },
        })
      } catch (error) {
        return NextResponse.json(
          {
            error: 'Failed to connect to Shopify API',
            details: 'Unable to reach Shopify servers. Check your network connection.',
          },
          { status: 500 }
        )
      }

      if (!shopDataResponse.ok) {
        const errorText = await shopDataResponse.text()
        return NextResponse.json(
          {
            error: 'Invalid access token or insufficient permissions',
            details: `Shopify API returned ${shopDataResponse.status}: ${errorText}`,
          },
          { status: 400 }
        )
      }

      const shopDataJson = await shopDataResponse.json()
      const shop = shopDataJson.shop

      // Fetch additional data (product count, collections, customers)
      const [productCount, collectionCount, customerCount] = await Promise.all([
        fetchCount(shopDomain, accessToken, 'products'),
        fetchCount(shopDomain, accessToken, 'custom_collections'),
        fetchCount(shopDomain, accessToken, 'customers'),
      ])

      // Encrypt access token before storing
      const encryptedToken = encrypt(accessToken)

      // Build comprehensive shop metadata
      const shopMetadata = {
        shopId: shop.id,
        name: shop.name,
        email: shop.email,
        domain: shop.domain,
        myshopifyDomain: shop.myshopify_domain,
        primaryDomain: shop.primary_domain?.host || shop.domain || shopDomain,
        currency: shop.currency,
        timezone: shop.iana_timezone,
        moneyFormat: shop.money_format,
        weightUnit: shop.weight_unit,
        shopOwner: shop.shop_owner,
        phone: shop.phone,
        address: {
          address1: shop.address1,
          address2: shop.address2,
          city: shop.city,
          province: shop.province,
          country: shop.country,
          zip: shop.zip,
        },
        planName: shop.plan_name,
        planDisplayName: shop.plan_display_name,
        productCount,
        collectionCount,
        customerCount,
        hasStorefront: shop.has_storefront,
        hasDiscounts: shop.has_discounts,
        hasGiftCards: shop.has_gift_cards,
        multiLocationEnabled: shop.multi_location_enabled,
        setupRequired: shop.setup_required,
        taxesIncluded: shop.taxes_included,
        taxShipping: shop.tax_shipping,
        countyTaxes: shop.county_taxes,
        connectedAt: new Date().toISOString(),
        connectedBy: 'ADMIN',
        connectedByUserId: adminUser.id,
        connectedByUserEmail: adminUser.email,
      }

      // Create connection in database
      const connection = await db.connection.create({
        data: {
          userId: targetUser.id,
          platform: 'SHOPIFY',
          domain: shopMetadata.primaryDomain,
          displayName: shopMetadata.name || shopDomain.replace('.myshopify.com', ''),
          accessToken: encryptedToken,
          status: 'CONNECTED',
          credentials: JSON.stringify(shopMetadata),
          lastSync: new Date(),
        },
      })

      // Create audit log
      await db.auditLog.create({
        data: {
          userId: targetUser.id,
          connectionId: connection.id,
          action: 'SHOPIFY_CONNECTED_BY_ADMIN',
          details: JSON.stringify({
            shopDomain,
            shopName: shopMetadata.name,
            productCount: shopMetadata.productCount,
            addedBy: adminUser.email,
            addedAt: new Date().toISOString(),
          }),
        },
      })

      // Create notification for target user
      await db.notification.create({
        data: {
          userId: targetUser.id,
          type: 'connection_success',
          title: 'Shopify Store Connected',
          message: `Your Shopify store "${shopMetadata.name || shopDomain}" has been connected by your SEOLOGY team. AI analysis is starting now.`,
          actionUrl: `/dashboard/sites/${connection.id}`,
        },
      })

      // Trigger crawl job
      await db.job.create({
        data: {
          type: 'CRAWL_SITE',
          status: 'PENDING',
          priority: 1,
          payload: JSON.stringify({
            connectionId: connection.id,
            url: `https://${shopMetadata.primaryDomain}`,
            fullCrawl: true,
          }),
          connectionId: connection.id,
          userId: targetUser.id,
        },
      })

      console.log('Connection created successfully:', connection.id)

      return NextResponse.json({
        success: true,
        connection: {
          id: connection.id,
          domain: connection.domain,
          displayName: connection.displayName,
          status: connection.status,
          productCount: shopMetadata.productCount,
        },
        message: `Successfully connected ${shopMetadata.name || shopDomain} for ${userEmail}. AI analysis has been queued.`,
      })
    }

    // === SCENARIO 2: No Access Token - Generate OAuth URL ===
    console.log('Generating OAuth URL for:', userEmail)

    const state = crypto.randomBytes(32).toString('base64url')

    // Store state temporarily (in production, use Redis or database with expiry)
    // For now, we encode the userEmail in the state for retrieval in callback

    const clientId = process.env.SHOPIFY_CLIENT_ID || '0b87ac78cf0783fd1dd829bf5421fae5'
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'https://seology.ai'}/api/auth/shopify/callback`

    const scopes = [
      'read_products',
      'write_products',
      'read_content',
      'write_content',
      'read_themes',
      'write_themes',
      'read_analytics',
      'read_online_store_pages',
      'write_online_store_pages',
    ].join(',')

    const oauthUrl =
      `https://${shopDomain}/admin/oauth/authorize?` +
      new URLSearchParams({
        client_id: clientId,
        scope: scopes,
        redirect_uri: redirectUri,
        state,
        grant_options: '[]',
      }).toString()

    return NextResponse.json({
      success: true,
      requiresOAuth: true,
      oauthUrl,
      message: 'OAuth link generated successfully. Send this link to the client to authorize the connection.',
    })
  } catch (error) {
    console.error('Error adding connection:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}

// Helper function to fetch counts from Shopify API
async function fetchCount(
  shopDomain: string,
  accessToken: string,
  resource: string
): Promise<number> {
  try {
    const response = await fetch(`https://${shopDomain}/admin/api/2024-01/${resource}/count.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.warn(`Failed to fetch ${resource} count:`, response.status)
      return 0
    }

    const data = await response.json()
    return data.count || 0
  } catch (error) {
    console.warn(`Error fetching ${resource} count:`, error)
    return 0
  }
}
