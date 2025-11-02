import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function SitesPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Sites</h1>
          <p className="text-gray-400">
            Manage your connected websites and e-commerce stores
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          + Connect New Site
        </button>
      </div>

      {/* Empty State */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-12">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🌐</div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            No sites connected yet
          </h2>
          <p className="text-gray-400 mb-6">
            Connect your first website to start automating SEO fixes with Claude AI
          </p>

          {/* Connection Options */}
          <div className="grid grid-cols-1 gap-4 mt-8">
            <ConnectionOption
              title="Shopify Store"
              description="Connect via OAuth (recommended)"
              icon="🛍️"
              comingSoon={false}
            />
            <ConnectionOption
              title="WordPress Site"
              description="Connect via REST API"
              icon="📝"
              comingSoon={false}
            />
            <ConnectionOption
              title="Any Website"
              description="Universal JavaScript snippet"
              icon="⚡"
              comingSoon={false}
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
  )
}

function ConnectionOption({
  title,
  description,
  icon,
  comingSoon,
}: {
  title: string
  description: string
  icon: string
  comingSoon: boolean
}) {
  return (
    <button
      className="bg-gray-800 border border-gray-700 hover:border-blue-500 rounded-lg p-6 text-left transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={comingSoon}
    >
      <div className="flex items-start space-x-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">
            {title}
            {comingSoon && (
              <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded">
                Coming Soon
              </span>
            )}
          </h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <svg
          className="w-6 h-6 text-gray-600 group-hover:text-blue-400 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </button>
  )
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: string
}) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}
