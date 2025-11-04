import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { encrypt } from '@/lib/encryption'
import { validateOAuthState } from '@/lib/csrf'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

// Shopify API response types
interface ShopifyShopData {
  id?: number
  name?: string
  email?: string
  domain?: string
  myshopify_domain?: string
  primary_domain?: { host: string }
  currency?: string
  iana_timezone?: string
  money_format?: string
  weight_unit?: string
  shop_owner?: string
  phone?: string
  address1?: string
  address2?: string
  city?: string
  province?: string
  country?: string
  zip?: string
  plan_name?: string
  plan_display_name?: string
  has_storefront?: boolean
  has_discounts?: boolean
  has_gift_cards?: boolean
  multi_location_enabled?: boolean
  setup_required?: boolean
  taxes_included?: boolean
  tax_shipping?: boolean
  county_taxes?: boolean
}

interface ShopMetadata {
  shopId?: number
  name?: string
  email?: string
  domain?: string
  myshopifyDomain?: string
  primaryDomain?: string
  currency?: string
  timezone?: string
  moneyFormat?: string
  weightUnit?: string
  shopOwner?: string
  phone?: string
  address?: {
    address1?: string
    address2?: string
    city?: string
    province?: string
    country?: string
    zip?: string
  }
  planName?: string
  planDisplayName?: string
  productCount?: number
  collectionCount?: number
  customerCount?: number
  hasStorefront?: boolean
  hasDiscounts?: boolean
  hasGiftCards?: boolean
  multiLocationEnabled?: boolean
  setupRequired?: boolean
  taxesIncluded?: boolean
  taxShipping?: boolean
  countyTaxes?: boolean
  connectedAt?: string
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const code = searchParams.get('code')
  const shop = searchParams.get('shop')
  const state = searchParams.get('state')
  const hmac = searchParams.get('hmac')

  if (!code || !shop || !state) {
    return NextResponse.redirect(
      new URL('/dashboard/sites?error=missing_params', req.url)
    )
  }

  // Validate CSRF-protected state parameter
  const stateValidation = await validateOAuthState(state, 'SHOPIFY')

  if (!stateValidation.valid || !stateValidation.userId) {
    return NextResponse.redirect(
      new URL('/dashboard/sites?error=invalid_state', req.url)
    )
  }

  const userId = stateValidation.userId

  // Exchange code for access token
  const clientId = process.env.SHOPIFY_CLIENT_ID || '0b87ac78cf0783fd1dd829bf5421fae5'
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET || ''

  if (!clientSecret) {
    return NextResponse.redirect(
      new URL('/dashboard/sites?error=config_error', req.url)
    )
  }

  try {
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.redirect(
        new URL('/dashboard/sites?error=user_not_found', req.url)
      )
    }

    // Encrypt access token before storing
    const encryptedToken = encrypt(accessToken)

    // Fetch comprehensive shop data from Shopify API
    console.log('Fetching shop data from Shopify API...')
    const shopDataResponse = await fetch(`https://${shop}/admin/api/2024-01/shop.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    })

    let shopData: ShopifyShopData = {}
    let shopMetadata: ShopMetadata = {}

    if (shopDataResponse.ok) {
      const data = await shopDataResponse.json()
      shopData = data.shop || {}

      // Extract key shop information
      shopMetadata = {
        shopId: shopData.id,
        name: shopData.name,
        email: shopData.email,
        domain: shopData.domain,
        myshopifyDomain: shopData.myshopify_domain,
        primaryDomain: shopData.primary_domain?.host || shop,
        currency: shopData.currency,
        timezone: shopData.iana_timezone,
        moneyFormat: shopData.money_format,
        weightUnit: shopData.weight_unit,

        // Business info
        shopOwner: shopData.shop_owner,
        phone: shopData.phone,
        address: {
          address1: shopData.address1,
          address2: shopData.address2,
          city: shopData.city,
          province: shopData.province,
          country: shopData.country,
          zip: shopData.zip,
        },

        // Plan info
        planName: shopData.plan_name,
        planDisplayName: shopData.plan_display_name,

        // Store counts (useful for AI context)
        productCount: 0, // Will fetch separately
        collectionCount: 0,
        customerCount: 0,

        // Features
        hasStorefront: shopData.has_storefront,
        hasDiscounts: shopData.has_discounts,
        hasGiftCards: shopData.has_gift_cards,
        multiLocationEnabled: shopData.multi_location_enabled,

        // Setup
        setupRequired: shopData.setup_required,
        taxesIncluded: shopData.taxes_included,
        taxShipping: shopData.tax_shipping,
        countyTaxes: shopData.county_taxes,

        // Connected at
        connectedAt: new Date().toISOString(),
      }

      console.log('Shop data fetched successfully:', shopMetadata.name)
    } else {
      console.warn('Failed to fetch shop data, proceeding with basic info')
    }

    // Fetch product count for AI context
    try {
      const productsCountResponse = await fetch(
        `https://${shop}/admin/api/2024-01/products/count.json`,
        {
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
          },
        }
      )
      if (productsCountResponse.ok) {
        const countData = await productsCountResponse.json()
        shopMetadata.productCount = countData.count || 0
      }
    } catch (error) {
      console.warn('Failed to fetch product count:', error)
    }

    // Create connection in database with enriched data
    const connection = await db.connection.create({
      data: {
        userId: user.id,
        platform: 'SHOPIFY',
        domain: shopMetadata.primaryDomain || shop,
        displayName: shopMetadata.name || shop.replace('.myshopify.com', ''),
        accessToken: encryptedToken, // Encrypted using AES-256-GCM
        status: 'CONNECTED',
        credentials: JSON.stringify(shopMetadata), // Store all shop metadata
        lastSync: new Date(),
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        connectionId: connection.id,
        action: 'SHOPIFY_CONNECTED',
        details: JSON.stringify({
          shop,
          shopName: shopMetadata.name,
          productCount: shopMetadata.productCount,
          planName: shopMetadata.planName,
        }),
      },
    })

    // Create notification
    await db.notification.create({
      data: {
        userId: user.id,
        type: 'connection_success',
        title: 'Shopify Store Connected',
        message: `Successfully connected ${shopMetadata.name || shop}${shopMetadata.productCount ? ` with ${shopMetadata.productCount} products` : ''}`,
        actionUrl: `/dashboard/sites/${connection.id}`,
      },
    })

    // Automatically trigger a crawl job to analyze the site
    console.log('Creating crawl job for new Shopify store...')
    await db.job.create({
      data: {
        type: 'CRAWL_SITE',
        status: 'PENDING',
        priority: 1, // High priority for new connections
        payload: JSON.stringify({
          connectionId: connection.id,
          url: `https://${shopMetadata.primaryDomain || shop}`,
          fullCrawl: true,
        }),
        connectionId: connection.id,
        userId: user.id,
      },
    })

    console.log('Shopify connection complete, redirecting to site details')

    // Redirect to site details page
    return NextResponse.redirect(
      new URL(`/dashboard/sites/${connection.id}?success=shopify_connected&scanning=true`, req.url)
    )
  } catch (error) {
    console.error('Shopify OAuth error:', error)
    return NextResponse.redirect(
      new URL('/dashboard/sites?error=oauth_failed', req.url)
    )
  }
}
