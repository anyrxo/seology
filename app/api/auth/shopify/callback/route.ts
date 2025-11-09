/**
 * Shopify OAuth Callback Route
 *
 * Handles the OAuth callback from Shopify after merchant authorizes
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyShopifyHMAC } from '@/lib/shopify-hmac'
import { encrypt } from '@/lib/encryption'
import { isReturningUser } from '@/lib/shopify-session-storage'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Get shop parameter early for error handling
  const shop = req.nextUrl.searchParams.get('shop')

  console.log('[OAuth Callback] ======= START =======')
  console.log('[OAuth Callback] Shop:', shop)
  console.log('[OAuth Callback] Full URL:', req.url)

  try {
    // Get query parameters
    const code = req.nextUrl.searchParams.get('code')
    const hmac = req.nextUrl.searchParams.get('hmac')
    const state = req.nextUrl.searchParams.get('state')

    console.log('[OAuth Callback] Query params:', {
      hasCode: !!code,
      hasHmac: !!hmac,
      hasState: !!state,
      shop
    })

    if (!code || !hmac || !shop || !state) {
      return NextResponse.redirect(
        new URL('/dashboard?error=missing_params', req.url)
      )
    }

    // Verify CSRF state token
    console.log('[OAuth Callback] Looking up CSRF token:', state)
    const csrfToken = await db.cSRFToken.findUnique({
      where: { token: state },
    })

    if (!csrfToken) {
      console.error('[OAuth Callback] ❌ CSRF token not found in database')
      return NextResponse.redirect(
        new URL('/dashboard?error=invalid_state', req.url)
      )
    }

    console.log('[OAuth Callback] ✅ CSRF token found:', {
      userId: csrfToken.userId,
      expiresAt: csrfToken.expiresAt
    })

    // Verify CSRF token matches shop exactly (CSRF protection)
    const expectedUserId = `shopify_${shop}`
    if (csrfToken.userId !== expectedUserId) {
      console.error('[OAuth Callback] ❌ CSRF token userId mismatch:', {
        expected: expectedUserId,
        received: csrfToken.userId
      })
      return NextResponse.redirect(
        new URL('/dashboard?error=invalid_state', req.url)
      )
    }

    // Check if token is expired
    if (csrfToken.expiresAt < new Date()) {
      await db.cSRFToken.delete({ where: { id: csrfToken.id } })
      return NextResponse.redirect(
        new URL('/dashboard?error=expired_state', req.url)
      )
    }

    // Delete used token
    await db.cSRFToken.delete({ where: { id: csrfToken.id } })

    // Verify HMAC signature
    const clientSecret = process.env.SHOPIFY_CLIENT_SECRET

    if (!clientSecret) {
      throw new Error('SHOPIFY_CLIENT_SECRET not configured')
    }

    const queryParams: Record<string, string> = {}
    req.nextUrl.searchParams.forEach((value, key) => {
      if (key !== 'hmac') {
        queryParams[key] = value
      }
    })
    queryParams.hmac = hmac

    const isValid = verifyShopifyHMAC(queryParams, clientSecret)

    if (!isValid) {
      return NextResponse.redirect(
        new URL('/dashboard?error=invalid_hmac', req.url)
      )
    }

    // Exchange code for access token
    const clientId = process.env.SHOPIFY_CLIENT_ID

    if (!clientId) {
      throw new Error('SHOPIFY_CLIENT_ID not configured')
    }

    console.log('[OAuth Callback] Exchanging code for access token...')
    const tokenUrl = `https://${shop}/admin/oauth/access_token`
    const tokenResponse = await fetch(tokenUrl, {
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
      const errorText = await tokenResponse.text()
      console.error('[OAuth Callback] ❌ Token exchange failed:', tokenResponse.status, errorText)
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()

    // Validate token response
    if (tokenData.error) {
      console.error('[OAuth Callback] ❌ OAuth error:', tokenData.error_description || tokenData.error)
      throw new Error(`OAuth error: ${tokenData.error_description || tokenData.error}`)
    }

    if (!tokenData.access_token) {
      console.error('[OAuth Callback] ❌ No access token in response')
      throw new Error('No access token received from Shopify')
    }

    const accessToken = tokenData.access_token
    const scope = tokenData.scope

    console.log('[OAuth Callback] ✅ Access token received, scopes:', scope)

    // Fetch shop information from Shopify using GraphQL
    const shopQuery = `
      query {
        shop {
          id
          name
          email
          myshopifyDomain
          primaryDomain {
            host
            url
          }
          currencyCode
          ianaTimezone
          plan {
            displayName
            partnerDevelopment
            shopifyPlus
          }
        }
      }
    `

    console.log('[OAuth Callback] Fetching shop information from GraphQL...')
    const shopInfoResponse = await fetch(
      `https://${shop}/admin/api/2025-10/graphql.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: shopQuery }),
      }
    )

    if (!shopInfoResponse.ok) {
      const errorText = await shopInfoResponse.text()
      console.error('[OAuth Callback] ❌ Shop info fetch failed:', shopInfoResponse.status, errorText)
      throw new Error('Failed to fetch shop information')
    }

    const shopInfo = await shopInfoResponse.json()

    // Validate GraphQL response
    if (shopInfo.errors) {
      console.error('[OAuth Callback] ❌ GraphQL errors:', shopInfo.errors)
      throw new Error(`GraphQL error: ${JSON.stringify(shopInfo.errors)}`)
    }

    if (!shopInfo.data?.shop) {
      console.error('[OAuth Callback] ❌ No shop data in GraphQL response')
      throw new Error('No shop data received from Shopify GraphQL')
    }

    const shopData = shopInfo.data.shop

    console.log('[OAuth Callback] ✅ Shop info retrieved:', shopData.name)

    // Transform GraphQL response to match expected format
    const shopDataFormatted = {
      id: shopData.id,
      name: shopData.name,
      email: shopData.email,
      domain: shopData.myshopifyDomain,
      myshopify_domain: shopData.myshopifyDomain,
      primary_domain: shopData.primaryDomain,
      currency: shopData.currencyCode,
      timezone: shopData.ianaTimezone,
      plan_name: shopData.plan?.displayName,
      plan_display_name: shopData.plan?.displayName,
      shop_owner: shopData.email, // Owner email, fallback
    }

    // Get or create user from database
    // For Shopify apps, we create user automatically during OAuth if they don't exist
    const shopEmail = shopDataFormatted.email || `${shop}@shopify.app`

    console.log('[OAuth Callback] Looking for user with email:', shopEmail)
    let user = await db.user.findFirst({
      where: { email: shopEmail },
    })

    if (!user) {
      console.log('[OAuth Callback] Creating new user...')
      user = await db.user.create({
        data: {
          clerkId: `shopify_${shopDataFormatted.id}`,
          email: shopEmail,
          plan: 'STARTER',
          executionMode: 'AUTOMATIC',
        },
      })
      console.log(`[OAuth Callback] ✅ Created new Shopify user: ${user.id}`)
    } else {
      console.log(`[OAuth Callback] ✅ Found existing user: ${user.id}`)
    }

    // Encrypt access token
    const encryptedToken = encrypt(accessToken)

    // Check if connection already exists
    console.log('[OAuth Callback] Checking for existing connection...')
    const existingConnection = await db.connection.findFirst({
      where: {
        userId: user.id,
        platform: 'SHOPIFY',
        domain: shop,
      },
    })

    const connectionData = {
      shopId: shopDataFormatted.id,
      name: shopDataFormatted.name,
      email: shopDataFormatted.email,
      domain: shopDataFormatted.domain,
      myshopifyDomain: shopDataFormatted.myshopify_domain,
      primaryDomain: shopDataFormatted.primary_domain?.host || shopDataFormatted.domain,
      currency: shopDataFormatted.currency,
      timezone: shopDataFormatted.timezone,
      planName: shopDataFormatted.plan_name,
      planDisplayName: shopDataFormatted.plan_display_name,
      shopOwner: shopDataFormatted.shop_owner,
      scopes: scope,
    }

    if (existingConnection) {
      // Update existing connection
      console.log('[OAuth Callback] Updating existing connection:', existingConnection.id)
      await db.connection.update({
        where: { id: existingConnection.id },
        data: {
          accessToken: encryptedToken,
          status: 'CONNECTED',
          lastSync: new Date(),
          credentials: JSON.stringify(connectionData),
        },
      })
      console.log('[OAuth Callback] ✅ Connection updated')
    } else {
      // Create new connection
      console.log('[OAuth Callback] Creating new connection...')
      const newConnection = await db.connection.create({
        data: {
          userId: user.id,
          platform: 'SHOPIFY',
          domain: shop,
          displayName: shopDataFormatted.name,
          accessToken: encryptedToken,
          status: 'CONNECTED',
          lastSync: new Date(),
          credentials: JSON.stringify(connectionData),
        },
      })
      console.log('[OAuth Callback] ✅ Connection created:', newConnection.id)
    }

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'SHOPIFY_CONNECTED',
        resource: 'connection',
        details: JSON.stringify({
          shop,
          shopName: shopDataFormatted.name,
          scopes: scope,
        }),
      },
    })

    // Create notification
    await db.notification.create({
      data: {
        userId: user.id,
        type: 'SUCCESS',
        title: 'Shopify Store Connected!',
        message: `Successfully connected ${shopDataFormatted.name}. We're analyzing your store now.`,
        actionUrl: '/dashboard',
        icon: '🛍️',
        color: 'green',
      },
    })

    // Register webhooks automatically after successful OAuth
    // All webhooks point to single endpoint - handler routes by x-shopify-topic header
    const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify`
    const webhooks = [
      { topic: 'products/create', address: webhookUrl },
      { topic: 'products/update', address: webhookUrl },
      { topic: 'products/delete', address: webhookUrl },
      { topic: 'app/uninstalled', address: webhookUrl },
      { topic: 'shop/update', address: webhookUrl },
      { topic: 'app_subscriptions/update', address: webhookUrl },
      { topic: 'customers/data_request', address: webhookUrl },
      { topic: 'customers/redact', address: webhookUrl },
      { topic: 'shop/redact', address: webhookUrl },
    ]

    console.log('[WEBHOOK] Registering webhooks for', shop)

    for (const webhook of webhooks) {
      try {
        const webhookResponse = await fetch(
          `https://${shop}/admin/api/2025-10/webhooks.json`,
          {
            method: 'POST',
            headers: {
              'X-Shopify-Access-Token': accessToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              webhook: {
                topic: webhook.topic,
                address: webhook.address,
                format: 'json',
              },
            }),
          }
        )

        if (!webhookResponse.ok) {
          const errorText = await webhookResponse.text()
          console.error(`[WEBHOOK] Failed to register ${webhook.topic}:`, errorText)
        } else {
          console.log(`[WEBHOOK] ✅ Registered: ${webhook.topic}`)
        }
      } catch (error) {
        console.error(`[WEBHOOK] Error registering ${webhook.topic}:`, error)
        // Continue with other webhooks even if one fails
      }
    }

    // Redirect to Shopify onboarding or dashboard based on user status
    console.log('[OAuth Callback] Checking if returning user...')
    const isReturning = await isReturningUser(user.id, shop)
    const redirectPath = isReturning ? '/shopify/dashboard' : '/shopify/onboarding'
    const redirectUrl = new URL(`${redirectPath}?shop=${shop}`, req.url)

    console.log('[OAuth Callback] ✅ SUCCESS - Redirecting to:', redirectPath)
    console.log('[OAuth Callback] ======= END =======')
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('[OAuth Callback] ❌ ERROR:', error)
    console.error('[OAuth Callback] Error details:', error instanceof Error ? error.message : String(error))
    console.log('[OAuth Callback] ======= END WITH ERROR =======')
    return NextResponse.redirect(
      new URL(`/shopify/dashboard?shop=${shop}&error=connection_failed`, req.url)
    )
  }
}
