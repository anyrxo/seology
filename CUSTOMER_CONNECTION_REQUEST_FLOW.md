# Customer Connection Request Flow

## Complete Workflow

### Customer Side:
```
1. Customer logs into SEOLOGY dashboard
2. Clicks "Connect Store" button
3. Fills out form:
   - Store platform (Shopify/WordPress)
   - Store URL (mystore.myshopify.com)
   - Optional message/reason
4. Clicks "Request Connection"
5. Sees confirmation: "Request sent to SEOLOGY team"
6. Waits for admin approval...
7. Gets notification: "Your store connection is ready!"
8. Clicks notification → Redirects to authorization
9. Authorizes → Store connected! ✅
```

### Admin Side (You):
```
1. New request appears in /admin/connection-requests
2. You see:
   - Customer name & email
   - Requested store URL
   - Platform type
   - Message from customer
   - Request date
3. You click "Approve & Send Link"
4. System generates OAuth URL
5. Customer gets notification with link
6. You see status change to "Link Sent"
7. When customer authorizes → Status: "Connected" ✅
```

---

## Database Schema

```prisma
// Add to schema.prisma

model ConnectionRequest {
  id String @id @default(uuid())

  // Who requested
  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  // What they want to connect
  platform Platform // SHOPIFY, WORDPRESS, etc.
  storeUrl String // mystore.myshopify.com
  storeName String? // Optional friendly name
  message String? // Why they want to connect

  // Request status
  status ConnectionRequestStatus @default(PENDING)

  // Admin actions
  reviewedBy String? // Admin user ID
  reviewedAt DateTime?
  approvalNote String? // Internal note from admin

  // OAuth link (generated on approval)
  oauthUrl String?
  oauthExpiry DateTime?

  // Connection result
  connectionId String? // Created connection ID
  connection Connection? @relation(fields: [connectionId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([status])
  @@index([createdAt])
}

enum ConnectionRequestStatus {
  PENDING        // Customer submitted, waiting for admin
  APPROVED       // Admin approved, link sent to customer
  LINK_SENT      // OAuth link sent to customer
  CONNECTED      // Customer authorized, connection created
  REJECTED       // Admin rejected
  EXPIRED        // OAuth link expired
  CANCELLED      // Customer cancelled
}

// Update User model
model User {
  // ... existing fields
  connectionRequests ConnectionRequest[]
}

// Update Connection model
model Connection {
  // ... existing fields
  connectionRequests ConnectionRequest[]
}
```

---

## Implementation

### 1. Customer Request Form

**Component: `components/dashboard/ConnectStoreRequest.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ConnectStoreRequest() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    platform: 'SHOPIFY',
    storeUrl: '',
    storeName: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/connection-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to submit request')

      // Show success and redirect
      alert('✅ Connection request submitted! Our team will review it shortly.')
      router.push('/dashboard')
    } catch (error) {
      alert('❌ Error submitting request: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Request Store Connection</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Platform */}
        <div>
          <label className="block text-sm font-medium mb-2">Platform</label>
          <select
            required
            value={formData.platform}
            onChange={(e) => setFormData({...formData, platform: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="SHOPIFY">Shopify</option>
            <option value="WORDPRESS">WordPress</option>
            <option value="WEBFLOW">Webflow</option>
            <option value="CUSTOM">Custom/Other</option>
          </select>
        </div>

        {/* Store URL */}
        <div>
          <label className="block text-sm font-medium mb-2">Store URL</label>
          <input
            type="text"
            required
            value={formData.storeUrl}
            onChange={(e) => setFormData({...formData, storeUrl: e.target.value})}
            placeholder="mystore.myshopify.com"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-sm text-gray-600 mt-1">
            Enter your store's URL (e.g., mystore.myshopify.com)
          </p>
        </div>

        {/* Store Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Store Name (Optional)</label>
          <input
            type="text"
            value={formData.storeName}
            onChange={(e) => setFormData({...formData, storeName: e.target.value})}
            placeholder="My Awesome Store"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Message (Optional)
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder="Any additional info or questions..."
            rows={4}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
```

### 2. API Route: Submit Request

**File: `app/api/connection-requests/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

// POST: Create connection request
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await req.json()
    const { platform, storeUrl, storeName, message } = body

    if (!platform || !storeUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: platform and storeUrl' },
        { status: 400 }
      )
    }

    // Create connection request
    const request = await db.connectionRequest.create({
      data: {
        userId: user.id,
        platform,
        storeUrl,
        storeName,
        message,
        status: 'PENDING',
      },
    })

    // Create notification for admins
    const admins = await db.user.findMany({
      where: { role: 'ADMIN' },
      select: { id: true },
    })

    await Promise.all(
      admins.map((admin) =>
        db.notification.create({
          data: {
            userId: admin.id,
            type: 'connection_request',
            title: 'New Connection Request',
            message: `${user.email} wants to connect their ${platform} store: ${storeUrl}`,
            actionUrl: `/admin/connection-requests/${request.id}`,
          },
        })
      )
    )

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'CONNECTION_REQUEST_CREATED',
        details: JSON.stringify({
          platform,
          storeUrl,
          storeName,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      request: {
        id: request.id,
        status: request.status,
      },
      message: 'Connection request submitted successfully',
    })
  } catch (error) {
    console.error('Error creating connection request:', error)
    return NextResponse.json(
      { error: 'Failed to create request', details: error.message },
      { status: 500 }
    )
  }
}

// GET: List user's connection requests
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const requests = await db.connectionRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        connection: {
          select: {
            id: true,
            domain: true,
            status: true,
          },
        },
      },
    })

    return NextResponse.json({ requests })
  } catch (error) {
    console.error('Error fetching connection requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    )
  }
}
```

### 3. Admin: Connection Requests Page

**File: `app/(admin)/admin/connection-requests/page.tsx`**

```typescript
import { db } from '@/lib/db'
import Link from 'next/link'
import ApproveRequestButton from './ApproveRequestButton'

export const dynamic = 'force-dynamic'

export default async function ConnectionRequestsPage() {
  const requests = await db.connectionRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          plan: true,
        },
      },
      connection: {
        select: {
          id: true,
          domain: true,
          status: true,
        },
      },
    },
  })

  const pendingRequests = requests.filter((r) => r.status === 'PENDING')
  const approvedRequests = requests.filter((r) => r.status === 'APPROVED' || r.status === 'LINK_SENT')
  const completedRequests = requests.filter((r) => r.status === 'CONNECTED')

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Connection Requests</h1>
        <p className="text-gray-600 mt-2">
          Customers requesting to connect their stores
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Pending" value={pendingRequests.length} color="yellow" />
        <StatCard title="Approved" value={approvedRequests.length} color="blue" />
        <StatCard title="Connected" value={completedRequests.length} color="green" />
        <StatCard title="Total" value={requests.length} color="gray" />
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Pending Requests ({pendingRequests.length})
          </h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Store
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Platform
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {request.user.name || request.user.email}
                        </div>
                        <div className="text-sm text-gray-500">{request.user.email}</div>
                        <div className="text-xs text-gray-400">{request.user.plan}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{request.storeUrl}</div>
                      {request.storeName && (
                        <div className="text-sm text-gray-500">{request.storeName}</div>
                      )}
                      {request.message && (
                        <div className="text-xs text-gray-400 mt-1 italic">
                          "{request.message}"
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {request.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <ApproveRequestButton requestId={request.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* All Requests */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          All Requests ({requests.length})
        </h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Store
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 text-sm">
                    {request.user.name || request.user.email}
                  </td>
                  <td className="px-6 py-4 text-sm">{request.storeUrl}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/connection-requests/${request.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  const colors = {
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    gray: 'bg-gray-50 border-gray-200 text-gray-800',
  }

  return (
    <div className={`${colors[color]} rounded-lg border p-6`}>
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-blue-100 text-blue-800',
    LINK_SENT: 'bg-purple-100 text-purple-800',
    CONNECTED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    EXPIRED: 'bg-gray-100 text-gray-800',
  }

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${colors[status]}`}>
      {status}
    </span>
  )
}
```

### 4. Approve Request Button (Client Component)

**File: `app/(admin)/admin/connection-requests/ApproveRequestButton.tsx`**

```typescript
'use client'

import { useState } from 'react'

export default function ApproveRequestButton({ requestId }: { requestId: string }) {
  const [loading, setLoading] = useState(false)

  const handleApprove = async () => {
    if (!confirm('Send connection link to customer?')) return

    setLoading(true)

    try {
      const res = await fetch(`/api/admin/connection-requests/${requestId}/approve`, {
        method: 'POST',
      })

      if (!res.ok) throw new Error('Failed to approve request')

      alert('✅ Connection link sent to customer!')
      window.location.reload()
    } catch (error) {
      alert('❌ Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleApprove}
      disabled={loading}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 text-sm"
    >
      {loading ? 'Approving...' : 'Approve & Send Link'}
    </button>
  )
}
```

### 5. API: Approve Request

**File: `app/api/admin/connection-requests/[id]/approve/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if admin
    const admin = await db.user.findUnique({
      where: { clerkId: userId },
      select: { id: true, role: true, email: true },
    })

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get request
    const request = await db.connectionRequest.findUnique({
      where: { id: params.id },
      include: { user: true },
    })

    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    // Generate OAuth URL
    const state = crypto.randomBytes(32).toString('base64url')
    const clientId = process.env.SHOPIFY_CLIENT_ID!
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/shopify/callback`

    const scopes = [
      'read_products',
      'write_products',
      'read_content',
      'write_content',
      'read_themes',
      'write_themes',
    ].join(',')

    const oauthUrl =
      `https://${request.storeUrl}/admin/oauth/authorize?` +
      new URLSearchParams({
        client_id: clientId,
        scope: scopes,
        redirect_uri: redirectUri,
        state,
      }).toString()

    // Set expiry (7 days from now)
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 7)

    // Update request
    await db.connectionRequest.update({
      where: { id: params.id },
      data: {
        status: 'APPROVED',
        oauthUrl,
        oauthExpiry: expiry,
        reviewedBy: admin.id,
        reviewedAt: new Date(),
      },
    })

    // Send notification to customer
    await db.notification.create({
      data: {
        userId: request.userId,
        type: 'connection_approved',
        title: 'Your Store Connection is Ready!',
        message: `Your ${request.platform} store connection request has been approved. Click here to authorize and connect your store.`,
        actionUrl: oauthUrl, // Direct link to OAuth
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: admin.id,
        action: 'CONNECTION_REQUEST_APPROVED',
        details: JSON.stringify({
          requestId: request.id,
          customerEmail: request.user.email,
          storeUrl: request.storeUrl,
          approvedBy: admin.email,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Connection request approved and notification sent to customer',
      oauthUrl,
    })
  } catch (error) {
    console.error('Error approving request:', error)
    return NextResponse.json(
      { error: 'Failed to approve request', details: error.message },
      { status: 500 }
    )
  }
}
```

---

## Complete Flow Summary

### 1. Customer Requests Connection
- Goes to `/dashboard/request-connection`
- Fills form (platform, store URL, message)
- Clicks "Submit Request"
- **Stored in Supabase** `ConnectionRequest` table
- Status: `PENDING`

### 2. Admin Gets Notified
- **Notification appears in your admin dashboard**
- See request in `/admin/connection-requests`
- View customer details, store URL, message
- **All data visible from Supabase**

### 3. Admin Approves
- Click "Approve & Send Link"
- System generates OAuth URL
- **Stored in Supabase** with expiry date
- Status: `APPROVED`

### 4. Customer Gets Notified
- **Notification appears in their dashboard**
- "Your Store Connection is Ready!"
- Click notification → Redirects to OAuth
- Status: `LINK_SENT`

### 5. Customer Authorizes
- OAuth flow → Shopify authorization
- Callback creates connection
- **Connection stored in Supabase**
- Status: `CONNECTED` ✅

---

This gives you **complete visibility and control** over customer connection requests from your admin dashboard! 🎉
