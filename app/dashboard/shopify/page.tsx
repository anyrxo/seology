/**
 * Shopify Dashboard Page
 *
 * Main dashboard for Shopify store SEO management
 * Shows store overview, product analytics, and AI chat integration
 */

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { ShopifyConnection } from '@/components/dashboard/ShopifyConnection'
import { ShopifyOverview } from '@/components/dashboard/ShopifyOverview'
import { ShopifyQuickActions } from '@/components/dashboard/ShopifyQuickActions'
import SeologyChat from '@/components/dashboard/SeologyChat'

export default async function ShopifyDashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user from database
  const user = await db.user.findUnique({
    where: { clerkId: userId },
  })

  if (!user) {
    redirect('/sign-in')
  }

  // Check for Shopify connection
  const connection = await db.connection.findFirst({
    where: {
      userId: user.id,
      platform: 'SHOPIFY',
      status: 'CONNECTED',
    },
  })

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopify SEO</h1>
          <p className="text-gray-600 mt-1">
            AI-powered SEO optimization for your Shopify store
          </p>
        </div>
      </div>

      {/* Connection Status */}
      <ShopifyConnection userId={user.id} />

      {/* Store Overview & Analytics (only shown when connected) */}
      {connection && (
        <>
          <ShopifyOverview connectionId={connection.id} />

          {/* Quick Actions */}
          <ShopifyQuickActions connectionId={connection.id} />

          {/* AI Chat Interface */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">AI SEO Assistant</h2>
              <p className="text-sm text-gray-600 mt-1">
                Chat with AI to analyze and optimize your store's SEO
              </p>
            </div>
            <div className="p-6">
              <SeologyChat />
            </div>
          </div>
        </>
      )}

      {/* Getting Started Guide (only shown when not connected) */}
      {!connection && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">
            Getting Started with Shopify SEO
          </h2>
          <div className="space-y-3 text-sm text-blue-800">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Connect Your Store</p>
                <p className="text-blue-700">
                  Enter your Shopify store domain and authorize SEOLOGY to access your products
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="font-medium">AI Analysis</p>
                <p className="text-blue-700">
                  Our AI will analyze all your products and collections for SEO issues
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Automatic Optimization</p>
                <p className="text-blue-700">
                  Chat with AI to apply SEO fixes, prioritized by revenue impact
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
