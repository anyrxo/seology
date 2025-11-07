/**
 * Example API Route Using Session Token Authentication
 *
 * This demonstrates the modern approach for embedded Shopify apps
 * Replace the old OAuth token approach with this pattern
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedConnection } from '@/lib/shopify-session-token'
import { decrypt } from '@/lib/encryption'

export const dynamic = 'force-dynamic'

interface ShopifyProduct {
  id: string
  title: string
  handle: string
  seo: {
    title: string | null
    description: string | null
  }
}

interface ShopifyProductEdge {
  node: ShopifyProduct
}

interface ShopifyProductsResponse {
  data: {
    products: {
      edges: ShopifyProductEdge[]
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get authenticated connection using session token
    // This replaces: const { userId } = await auth() + manual connection lookup
    const connection = await getAuthenticatedConnection(request)

    // Now you have the connection with decrypted access token
    const accessToken = decrypt(connection.accessToken!)

    // Make Shopify GraphQL request
    const response = await fetch(
      `https://${connection.domain}/admin/api/2025-10/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
        body: JSON.stringify({
          query: `
            query {
              products(first: 10) {
                edges {
                  node {
                    id
                    title
                    handle
                    seo {
                      title
                      description
                    }
                  }
                }
              }
            }
          `,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`)
    }

    const data = await response.json() as ShopifyProductsResponse

    return NextResponse.json({
      success: true,
      products: data.data.products.edges.map((edge) => edge.node),
      shop: connection.domain,
    })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 401 }
    )
  }
}
