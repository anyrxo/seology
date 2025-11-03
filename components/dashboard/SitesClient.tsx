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
    <div className="container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header */}
        <div className="_2-items-wrap-container">
          <div>
            <h1 className="text-500 bold color-neutral-800 mg-bottom-12px">
              Sites
            </h1>
            <p className="text-200 color-neutral-600">
              Manage your connected websites and e-commerce stores
            </p>
          </div>
          <Link
            href="/dashboard/sites/connect"
            className="btn-primary large"
          >
            <div className="flex-horizontal gap-column-6px">
              <Plus className="w-5 h-5" />
              <div>Connect New Site</div>
            </div>
          </Link>
        </div>

        {/* Sites Grid */}
        <div className="grid-3-columns gap-row-24px">
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
      <div className="card pd-24px">
        <div className="_2-items-wrap-container mg-bottom-16px">
          <div className="flex-horizontal gap-column-12px align-center">
            <div className="text-400">{platformEmoji}</div>
            <div>
              <h3 className="text-200 medium color-neutral-800 mg-bottom-4px">
                {connection.displayName || connection.domain}
              </h3>
              <p className="text-100 color-neutral-600">{connection.domain}</p>
            </div>
          </div>
          <div className={`badge ${statusConfig.badge}`}>
            <div className="text-50 medium">{statusConfig.label}</div>
          </div>
        </div>

        <div className="divider card-small-divider"></div>

        <div className="grid-2-columns gap-column-24px">
          <div>
            <div className="text-100 color-neutral-600 mg-bottom-4px">Active Issues</div>
            <div className="text-300 bold color-neutral-800">{connection.issues.length}</div>
          </div>
          <div>
            <div className="text-100 color-neutral-600 mg-bottom-4px">Total Fixes</div>
            <div className="text-300 bold color-neutral-800">{connection._count.fixes}</div>
          </div>
        </div>

        {connection.lastSync && (
          <div className="mg-top-16px">
            <div className="text-100 color-neutral-600">
              Last synced: {new Date(connection.lastSync).toLocaleDateString()}
            </div>
          </div>
        )}

        {/* Arrow indicator */}
        <div className="mg-top-16px">
          <div className="text-100 medium color-accent-1 flex-horizontal gap-column-4px">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header */}
        <div>
          <h1 className="text-500 bold color-neutral-800 mg-bottom-12px">
            Sites
          </h1>
          <p className="text-200 color-neutral-600">
            Manage your connected websites and e-commerce stores
          </p>
        </div>

        {/* Empty State Card */}
        <div className="card pd-32px---44px">
          <div className="text-center inner-container _400px center">
            <div className="text-600 mg-bottom-24px">🌐</div>
            <h2 className="text-300 bold color-neutral-800 mg-bottom-12px">
              No sites connected yet
            </h2>
            <p className="text-200 color-neutral-600 mg-bottom-32px">
              Connect your first website to start automating SEO fixes with Claude AI
            </p>

            <Link
              href="/dashboard/sites/connect"
              className="btn-primary large"
            >
              <div className="flex-horizontal gap-column-6px">
                <Plus className="w-5 h-5" />
                <div>Connect Your First Site</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid-3-columns gap-row-24px">
          <FeatureCard
            title="Automatic Scanning"
            description="We crawl your site and detect SEO issues automatically"
            icon="🔍"
          />
          <FeatureCard
            title="AI-Powered Fixes"
            description="Claude AI generates and applies fixes for every issue"
            icon="🤖"
          />
          <FeatureCard
            title="90-Day Rollback"
            description="Safely revert any changes with one click"
            icon="↩️"
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="card pd-24px">
      <div className="text-400 mg-bottom-16px">{icon}</div>
      <h3 className="text-200 medium color-neutral-800 mg-bottom-8px">{title}</h3>
      <p className="text-100 color-neutral-600">{description}</p>
    </div>
  )
}
