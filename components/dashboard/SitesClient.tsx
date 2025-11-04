'use client'

import Link from 'next/link'
import { Plus, ArrowRight } from 'lucide-react'

interface Issue {
  id: string
  status: string
  type: string
  title: string
  severity: string
  detectedAt: Date
}

interface Connection {
  id: string
  platform: string
  domain: string
  displayName: string | null
  status: string
  lastSync: Date | null
  issues: Issue[]
  _count: {
    issues: number
    fixes: number
  }
}

interface SitesClientProps {
  connections: Connection[]
}

export function SitesClient({ connections }: SitesClientProps) {
  if (connections.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header with Radiant UI components */}
        <div className="rt-component-section">
          <div className="w-layout-hflex flex-horizontal space-between align-center mg-bottom-24px">
            <div className="flex-horizontal gap-column-16px align-center">
              <div className="card-icon-square _40px">
                <div className="text-300">🌐</div>
              </div>
              <div className="flex-vertical">
                <h1 className="rt-component-heading-two text-500 bold color-neutral-800">
                  Sites
                </h1>
                <p className="rt-text-block text-200 color-neutral-600">
                  Manage your connected websites and e-commerce stores
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/sites/connect"
              className="btn-primary large rt-button-font"
            >
              <div className="flex-horizontal gap-column-6px">
                <Plus className="w-5 h-5" />
                <div>Connect New Site</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Sites Grid using grid-3-columns with card-image-right style */}
        <div className="grid-3-columns gap-row-24px gap-column-12px">
          {connections.map((connection) => (
            <SiteCard
              key={connection.id}
              connection={connection}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function SiteCard({ connection }: { connection: Connection }) {
  const platformEmojis: Record<string, string> = {
    SHOPIFY: '🛍️',
    WORDPRESS: '📝',
    WIX: '🎨',
    CUSTOM: '⚡',
  }
  const platformEmoji = platformEmojis[connection.platform] || '🌐'

  const statusConfig = {
    CONNECTED: {
      badge: 'green',
      label: 'Connected'
    },
    PENDING: {
      badge: 'orange',
      label: 'Pending'
    },
    ERROR: {
      badge: 'red',
      label: 'Error'
    },
    DISCONNECTED: {
      badge: 'red',
      label: 'Disconnected'
    },
  }[connection.status] || {
    badge: 'red',
    label: connection.status
  }

  return (
    <Link href={`/dashboard/sites/${connection.id}`} className="text-decoration-none">
      <div className="card pd-24px hover-card-link">
        {/* Header with card-icon-square for platform */}
        <div className="w-layout-hflex flex-horizontal space-between align-center mg-bottom-16px">
          <div className="flex-horizontal gap-column-12px align-center">
            <div className="card-icon-square _40px">
              <div className="text-300">{platformEmoji}</div>
            </div>
            <div className="flex-vertical">
              <h3 className="text-200 medium color-neutral-800 mg-bottom-4px">
                {connection.displayName || connection.domain}
              </h3>
              <p className="rt-text-block text-100 color-neutral-600">{connection.domain}</p>
            </div>
          </div>
          <div className={`badge ${statusConfig.badge}`}>
            <div className="text-50 medium">{statusConfig.label}</div>
          </div>
        </div>

        <div className="divider card-small-divider mg-bottom-16px"></div>

        {/* Metrics with card-icon-square */}
        <div className="w-layout-vflex flex-vertical gap-row-12px mg-bottom-16px">
          <div className="card pd-16px">
            <div className="flex-horizontal gap-column-12px align-center">
              <div className="card-icon-square _26px neutral-icon">
                <div className="text-100">🔍</div>
              </div>
              <div className="flex-vertical flex-1">
                <div className="text-50 color-neutral-600">Active Issues</div>
                <div className="card-amount-container red">
                  <div className="text-300 bold color-neutral-800">{connection.issues.length}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="card pd-16px">
            <div className="flex-horizontal gap-column-12px align-center">
              <div className="card-icon-square _26px">
                <div className="text-100">✅</div>
              </div>
              <div className="flex-vertical flex-1">
                <div className="text-50 color-neutral-600">Total Fixes</div>
                <div className="card-amount-container green">
                  <div className="text-300 bold color-neutral-800">{connection._count.fixes}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {connection.lastSync && (
          <div className="flex-horizontal gap-column-8px align-center mg-bottom-12px">
            <div className="rt-icon-box card-icon-square _26px neutral-icon">
              <div className="text-100">⏱️</div>
            </div>
            <div className="text-50 color-neutral-600">
              Last synced: {new Date(connection.lastSync).toLocaleDateString()}
            </div>
          </div>
        )}

        {/* Arrow indicator with Radiant UI */}
        <div className="flex-horizontal gap-column-4px align-center">
          <span className="rt-nav-text text-100 medium color-accent-1">View Details</span>
          <ArrowRight className="w-4 h-4 color-accent-1" />
        </div>
      </div>
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header with card-icon-square */}
        <div className="rt-component-section">
          <div className="flex-horizontal gap-column-16px align-center">
            <div className="card-icon-square _40px neutral-icon">
              <div className="text-300">🌐</div>
            </div>
            <div className="flex-vertical">
              <h1 className="rt-component-heading-two text-500 bold color-neutral-800 mg-bottom-8px">
                Sites
              </h1>
              <p className="rt-text-block text-200 color-neutral-600">
                Manage your connected websites and e-commerce stores
              </p>
            </div>
          </div>
        </div>

        {/* Empty State Card with pd-32px---44px */}
        <div className="rt-component-section card pd-32px---44px">
          <div className="text-center inner-container _400px center">
            <div className="card-icon-square _40px neutral-icon" style={{ margin: '0 auto', marginBottom: '24px' }}>
              <div className="text-600">🌐</div>
            </div>
            <h2 className="text-400 bold color-neutral-800 mg-bottom-12px">
              No sites connected yet
            </h2>
            <p className="rt-text-block text-200 color-neutral-600 mg-bottom-32px">
              Connect your first website to start automating SEO fixes with SEOLOGY.AI
            </p>

            <Link
              href="/dashboard/sites/connect"
              className="btn-primary large rt-button-font"
            >
              <div className="flex-horizontal gap-column-6px">
                <Plus className="w-5 h-5" />
                <div>Connect Your First Site</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Features using different card padding variants */}
        <div className="grid-3-columns gap-row-24px gap-column-12px">
          <FeatureCard
            title="Automatic Scanning"
            description="We crawl your site and detect SEO issues automatically"
            icon="🔍"
            cardStyle="pd-24px"
          />
          <FeatureCard
            title="AI-Powered Fixes"
            description="Our AI generates and applies fixes for every issue"
            icon="🤖"
            cardStyle="pd-32px---24px"
          />
          <FeatureCard
            title="90-Day Rollback"
            description="Safely revert any changes with one click"
            icon="↩️"
            cardStyle="pd-22px---18px"
          />
        </div>

        {/* Additional info cards with pd-16px */}
        <div className="card pd-32px---24px">
          <div className="flex-horizontal gap-column-12px align-center mg-bottom-24px">
            <div className="card-icon-square _40px">
              <div className="text-300">💡</div>
            </div>
            <h2 className="text-300 bold color-neutral-800">
              Getting Started is Easy
            </h2>
          </div>
          <div className="w-layout-vflex flex-vertical gap-row-12px">
            <div className="card pd-16px">
              <div className="flex-horizontal gap-column-12px align-center">
                <div className="card-icon-square _26px">
                  <div className="text-100">1️⃣</div>
                </div>
                <div className="flex-vertical">
                  <div className="text-100 medium color-neutral-800">Connect Platform</div>
                  <div className="text-50 color-neutral-600">Link Shopify, WordPress, or custom site</div>
                </div>
              </div>
            </div>
            <div className="card pd-16px">
              <div className="flex-horizontal gap-column-12px align-center">
                <div className="card-icon-square _26px neutral-icon">
                  <div className="text-100">2️⃣</div>
                </div>
                <div className="flex-vertical">
                  <div className="text-100 medium color-neutral-800">Analyze Site</div>
                  <div className="text-50 color-neutral-600">AI scans for SEO issues automatically</div>
                </div>
              </div>
            </div>
            <div className="card pd-16px">
              <div className="flex-horizontal gap-column-12px align-center">
                <div className="card-icon-square _26px">
                  <div className="text-100">3️⃣</div>
                </div>
                <div className="flex-vertical">
                  <div className="text-100 medium color-neutral-800">Apply Fixes</div>
                  <div className="text-50 color-neutral-600">AI fixes issues automatically</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  icon,
  cardStyle = 'pd-24px'
}: {
  title: string
  description: string
  icon: string
  cardStyle?: string
}) {
  return (
    <div className={`card ${cardStyle} hover-card-link`}>
      <div className="flex-vertical gap-row-16px">
        <div className="card-icon-square _40px">
          <div className="text-400">{icon}</div>
        </div>
        <div className="flex-vertical gap-row-8px">
          <h3 className="text-200 medium color-neutral-800">{title}</h3>
          <p className="rt-text-block text-100 color-neutral-600">{description}</p>
        </div>
      </div>
    </div>
  )
}
