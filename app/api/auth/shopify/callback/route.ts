/**
 * Shopify OAuth Callback Route
 *
 * Handles the OAuth callback from Shopify after merchant authorizes
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { verifyShopifyHMAC } from '@/lib/shopify-hmac'
import { encrypt } from '@/lib/encryption'
import { isReturningUser } from '@/lib/shopify-session-storage'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Get shop parameter early for error handling
  const shop = req.nextUrl.searchParams.get('shop')

  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in?error=unauthorized', req.url))
    }

    // Get query parameters
    const code = req.nextUrl.searchParams.get('code')
    const hmac = req.nextUrl.searchParams.get('hmac')
    const state = req.nextUrl.searchParams.get('state')

    if (!code || !hmac || !shop || !state) {
      return NextResponse.redirect(
        new URL('/dashboard?error=missing_params', req.url)
      )
    }

    // Verify CSRF state token
    const csrfToken = await db.cSRFToken.findUnique({
      where: { token: state },
    })

    if (!csrfToken || csrfToken.userId !== userId) {
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
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token
    const scope = tokenData.scope

    // Fetch shop information from Shopify
    const shopInfoResponse = await fetch(
      `https://${shop}/admin/api/2024-01/shop.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
        },
      }
    )

    if (!shopInfoResponse.ok) {
      throw new Error('Failed to fetch shop information')
    }

    const shopInfo = await shopInfoResponse.json()
    const shopData = shopInfo.shop

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Encrypt access token
    const encryptedToken = encrypt(accessToken)

    // Check if connection already exists
    const existingConnection = await db.connection.findFirst({
      where: {
        userId: user.id,
        platform: 'SHOPIFY',
        domain: shop,
      },
    })

    if (existingConnection) {
      // Update existing connection
      await db.connection.update({
        where: { id: existingConnection.id },
        data: {
          accessToken: encryptedToken,
          status: 'CONNECTED',
          lastSync: new Date(),
          credentials: JSON.stringify({
            shopId: shopData.id,
            name: shopData.name,
            email: shopData.email,
            domain: shopData.domain,
            myshopifyDomain: shopData.myshopify_domain,
            primaryDomain: shopData.primary_domain?.host || shopData.domain,
            currency: shopData.currency,
            timezone: shopData.timezone,
            productCount: shopData.product_count || 0,
            collectionCount: shopData.collection_count || 0,
            customerCount: shopData.customer_count || 0,
            planName: shopData.plan_name,
            planDisplayName: shopData.plan_display_name,
            shopOwner: shopData.shop_owner,
            phone: shopData.phone,
            address: {
              address1: shopData.address1,
              address2: shopData.address2,
              city: shopData.city,
              province: shopData.province,
              country: shopData.country_name,
              zip: shopData.zip,
            },
            scopes: scope,
          }),
        },
      })
    } else {
      // Create new connection
      await db.connection.create({
        data: {
          userId: user.id,
          platform: 'SHOPIFY',
          domain: shop,
          displayName: shopData.name,
          accessToken: encryptedToken,
          status: 'CONNECTED',
          lastSync: new Date(),
          credentials: JSON.stringify({
            shopId: shopData.id,
            name: shopData.name,
            email: shopData.email,
            domain: shopData.domain,
            myshopifyDomain: shopData.myshopify_domain,
            primaryDomain: shopData.primary_domain?.host || shopData.domain,
            currency: shopData.currency,
            timezone: shopData.timezone,
            productCount: shopData.product_count || 0,
            collectionCount: shopData.collection_count || 0,
            customerCount: shopData.customer_count || 0,
            planName: shopData.plan_name,
            planDisplayName: shopData.plan_display_name,
            shopOwner: shopData.shop_owner,
            phone: shopData.phone,
            address: {
              address1: shopData.address1,
              address2: shopData.address2,
              city: shopData.city,
              province: shopData.province,
              country: shopData.country_name,
              zip: shopData.zip,
            },
            scopes: scope,
          }),
        },
      })
    }

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'SHOPIFY_CONNECTED',
        resource: 'connection',
        details: JSON.stringify({
          shop,
          shopName: shopData.name,
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
        message: `Successfully connected ${shopData.name}. We're analyzing your store now.`,
        actionUrl: '/dashboard',
        icon: '🛍️',
        color: 'green',
      },
    })

    // Register webhooks automatically after successful OAuth
    const webhooks = [
      { topic: 'products/update', address: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/products/update` },
      { topic: 'products/delete', address: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/products/delete` },
      { topic: 'app/uninstalled', address: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/app/uninstalled` },
      { topic: 'customers/data_request', address: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/gdpr/customers-data-request` },
      { topic: 'customers/redact', address: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/gdpr/customers-redact` },
      { topic: 'shop/redact', address: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/gdpr/shop-redact` },
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
    const isReturning = await isReturningUser(user.id, shop)
    const redirectPath = isReturning ? '/shopify/dashboard' : '/shopify/onboarding'
    const redirectUrl = new URL(`${redirectPath}?shop=${shop}`, req.url)
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('Shopify OAuth callback error:', error)
    return NextResponse.redirect(
      new URL(`/shopify/dashboard?shop=${shop}&error=connection_failed`, req.url)
    )
  }
}
