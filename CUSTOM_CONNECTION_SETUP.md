# Custom White-Glove Connection Setup

## The Original Vision ✅

**You manually add clients' Shopify stores** → They just log in and everything works!

---

## How It Works

### Admin Flow (You)
```
1. Client signs up or you create account for them
2. You go to Admin Panel → "Add Connection for User"
3. You input:
   - User email
   - Shopify store URL (mystore.myshopify.com)
   - Shopify API credentials (or initiate OAuth for them)
4. Click "Add Connection"
5. SEOLOGY stores encrypted credentials
6. Connection appears in their dashboard automatically
```

### Client Flow (Store Owner)
```
1. Client logs into SEOLOGY dashboard
2. Sees their store already connected ✅
3. AI immediately starts analyzing
4. They can start using AI to fix SEO issues
```

**Total client friction: ZERO**

---

## Implementation

### 1. Admin Panel Route: Add Connection for User

**File: `app/admin/connections/add/page.tsx`** (NEW)

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddConnectionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    userEmail: '',
    shopDomain: '',
    accessToken: '', // Optional - can initiate OAuth instead
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/connections/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error('Failed to add connection')

      const data = await res.json()
      alert(`✅ Connection added successfully for ${formData.userEmail}`)
      router.push('/admin/connections')
    } catch (error) {
      alert('❌ Error adding connection: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Add Shopify Connection for User</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* User Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            User Email
          </label>
          <input
            type="email"
            required
            value={formData.userEmail}
            onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
            placeholder="client@example.com"
            className="w-full px-4 py-2 border rounded"
          />
          <p className="text-sm text-gray-600 mt-1">
            The SEOLOGY user who owns this store
          </p>
        </div>

        {/* Shop Domain */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Shopify Store Domain
          </label>
          <input
            type="text"
            required
            value={formData.shopDomain}
            onChange={(e) => setFormData({...formData, shopDomain: e.target.value})}
            placeholder="mystore.myshopify.com"
            className="w-full px-4 py-2 border rounded"
          />
          <p className="text-sm text-gray-600 mt-1">
            Must be a .myshopify.com domain
          </p>
        </div>

        {/* Access Token (Optional) */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Shopify Access Token (Optional)
          </label>
          <textarea
            value={formData.accessToken}
            onChange={(e) => setFormData({...formData, accessToken: e.target.value})}
            placeholder="shpat_..."
            rows={3}
            className="w-full px-4 py-2 border rounded font-mono text-sm"
          />
          <p className="text-sm text-gray-600 mt-1">
            If empty, system will initiate OAuth flow and send client an authorization link
          </p>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Adding Connection...' : 'Add Connection'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/admin/connections')}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Instructions */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg max-w-2xl">
        <h2 className="font-bold mb-4">How to Get Shopify Credentials</h2>

        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Option 1: Custom App (Recommended)</h3>
            <ol className="list-decimal ml-5 space-y-1 text-gray-700">
              <li>Log into client's Shopify admin</li>
              <li>Go to Settings → Apps and sales channels</li>
              <li>Click "Develop apps" → "Create an app"</li>
              <li>Name it "SEOLOGY SEO Automation"</li>
              <li>Configure API scopes (see below)</li>
              <li>Install app → Copy Admin API access token</li>
              <li>Paste token above</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Option 2: OAuth Flow (If no token)</h3>
            <ol className="list-decimal ml-5 space-y-1 text-gray-700">
              <li>Leave "Access Token" field empty</li>
              <li>System generates OAuth link</li>
              <li>Send link to client</li>
              <li>Client clicks → Authorizes</li>
              <li>Connection auto-created</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Required Scopes</h3>
            <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
read_products, write_products
read_content, write_content
read_themes, write_themes
read_analytics
read_online_store_pages, write_online_store_pages
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

### 2. API Route: Add Connection

**File: `app/api/admin/connections/add/route.ts`** (NEW)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { encrypt } from '@/lib/encryption'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()

    // Check if admin
    const adminUser = await db.user.findUnique({
      where: { clerkId: userId! },
      select: { role: true }
    })

    if (adminUser?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { userEmail, shopDomain, accessToken } = body

    // Validate input
    if (!userEmail || !shopDomain) {
      return NextResponse.json(
        { error: 'Missing required fields: userEmail, shopDomain' },
        { status: 400 }
      )
    }

    if (!shopDomain.endsWith('.myshopify.com')) {
      return NextResponse.json(
        { error: 'Invalid shop domain - must be .myshopify.com' },
        { status: 400 }
      )
    }

    // Find user
    const user = await db.user.findUnique({
      where: { email: userEmail }
    })

    if (!user) {
      return NextResponse.json(
        { error: `User not found with email: ${userEmail}` },
        { status: 404 }
      )
    }

    // If access token provided, create connection immediately
    if (accessToken) {
      // Fetch shop data from Shopify
      const shopDataResponse = await fetch(
        `https://${shopDomain}/admin/api/2024-01/shop.json`,
        {
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!shopDataResponse.ok) {
        return NextResponse.json(
          { error: 'Invalid access token or shop domain' },
          { status: 400 }
        )
      }

      const shopData = await shopDataResponse.json()
      const shop = shopData.shop

      // Fetch product count
      let productCount = 0
      try {
        const productsCountResponse = await fetch(
          `https://${shopDomain}/admin/api/2024-01/products/count.json`,
          {
            headers: {
              'X-Shopify-Access-Token': accessToken,
              'Content-Type': 'application/json',
            },
          }
        )
        if (productsCountResponse.ok) {
          const countData = await productsCountResponse.json()
          productCount = countData.count || 0
        }
      } catch (error) {
        console.warn('Failed to fetch product count:', error)
      }

      // Encrypt access token
      const encryptedToken = encrypt(accessToken)

      // Create comprehensive shop metadata
      const shopMetadata = {
        shopId: shop.id,
        name: shop.name,
        email: shop.email,
        domain: shop.domain,
        myshopifyDomain: shop.myshopify_domain,
        primaryDomain: shop.primary_domain?.host || shopDomain,
        currency: shop.currency,
        timezone: shop.iana_timezone,
        shopOwner: shop.shop_owner,
        phone: shop.phone,
        planName: shop.plan_name,
        productCount,
        connectedAt: new Date().toISOString(),
        connectedBy: 'ADMIN', // Mark as admin-created
      }

      // Create connection
      const connection = await db.connection.create({
        data: {
          userId: user.id,
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
          userId: user.id,
          connectionId: connection.id,
          action: 'SHOPIFY_CONNECTED_BY_ADMIN',
          details: JSON.stringify({
            shopDomain,
            shopName: shopMetadata.name,
            productCount: shopMetadata.productCount,
            addedBy: userId,
          }),
        },
      })

      // Create notification for user
      await db.notification.create({
        data: {
          userId: user.id,
          type: 'connection_success',
          title: 'Shopify Store Connected',
          message: `Your Shopify store ${shopMetadata.name || shopDomain} has been connected by your SEOLOGY team. AI analysis is starting now.`,
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
          userId: user.id,
        },
      })

      return NextResponse.json({
        success: true,
        connection: {
          id: connection.id,
          domain: connection.domain,
          displayName: connection.displayName,
          status: connection.status,
        },
        message: 'Connection created successfully',
      })
    } else {
      // No token provided - generate OAuth link
      const crypto = require('crypto')
      const state = crypto.randomBytes(32).toString('base64url')

      // Store state temporarily (you could use Redis or database)
      // For now, we'll just return the OAuth URL

      const clientId = process.env.SHOPIFY_CLIENT_ID!
      const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/shopify/callback`
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

      const oauthUrl = `https://${shopDomain}/admin/oauth/authorize?` +
        new URLSearchParams({
          client_id: clientId,
          scope: scopes,
          redirect_uri: redirectUri,
          state,
        })

      return NextResponse.json({
        success: true,
        requiresOAuth: true,
        oauthUrl,
        message: 'Send this OAuth link to the client to authorize',
        instructions: `Send the following link to ${userEmail}: ${oauthUrl}`,
      })
    }
  } catch (error) {
    console.error('Error adding connection:', error)
    return NextResponse.json(
      { error: 'Failed to add connection', details: error.message },
      { status: 500 }
    )
  }
}
```

---

## Usage Examples

### Scenario 1: You Have Client's Shopify Credentials

```
1. Client gives you their store admin access
2. You create Custom App in their Shopify admin
3. Copy the Admin API access token
4. Go to SEOLOGY Admin → Add Connection
5. Input:
   - Email: client@example.com
   - Shop: clientstore.myshopify.com
   - Token: shpat_abc123...
6. Click "Add Connection"
7. ✅ Done! Client sees connected store in their dashboard
```

### Scenario 2: Client Authorizes Via OAuth

```
1. Go to SEOLOGY Admin → Add Connection
2. Input:
   - Email: client@example.com
   - Shop: clientstore.myshopify.com
   - Token: [leave empty]
3. Click "Add Connection"
4. System generates OAuth URL
5. Copy URL and send to client via email
6. Client clicks link → Authorizes
7. ✅ Done! Connection created automatically
```

---

## Database Storage

All stored in Supabase `Connection` table:

```typescript
{
  id: "uuid",
  userId: "user_id", // Client's user ID
  platform: "SHOPIFY",
  domain: "clientstore.com",
  displayName: "Client's Store",
  accessToken: "encrypted_token_here", // AES-256-GCM encrypted
  status: "CONNECTED",
  credentials: JSON.stringify({
    shopId: 12345678,
    name: "Client's Store",
    email: "client@example.com",
    productCount: 450,
    connectedBy: "ADMIN", // Marks as admin-created
    // ... all shop metadata
  }),
  createdAt: "2024-01-20T10:00:00Z"
}
```

---

## Client Experience

When client logs into SEOLOGY:

```
Dashboard → Sites

✅ Client's Store (clientstore.com)
   Status: Connected
   450 products
   23 SEO issues detected

   [View Details] [Scan Now] [Disconnect]
```

They can immediately:
- View detected issues
- Chat with AI about their store
- Apply fixes
- See analytics

**They never had to configure anything!** ✨

---

## Benefits of This Approach

✅ **Zero client friction** - They just log in and everything works
✅ **You control onboarding** - White-glove service
✅ **Secure** - Tokens encrypted in database
✅ **Flexible** - Can use tokens OR OAuth
✅ **Trackable** - Audit logs show who added connection
✅ **Scalable** - Can bulk-add connections for multiple clients

---

## Next Steps

1. Build admin panel UI (`app/admin/connections/add/page.tsx`)
2. Create API route (`app/api/admin/connections/add/route.ts`)
3. Test with development store
4. Document process for your team

Want me to implement these files now?
