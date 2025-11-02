'use client'

/**
 * Onboarding Step 2: Connect Site
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ConnectSiteStepProps {
  onNext: (data: { siteId: string; siteName: string; platform: string }) => void
  onBack: () => void
}

export function ConnectSiteStep({ onNext, onBack }: ConnectSiteStepProps) {
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = useState<string>('')
  const [isConnecting, setIsConnecting] = useState(false)

  const platforms = [
    {
      id: 'shopify',
      name: 'Shopify',
      icon: '🛍️',
      description: 'Connect your Shopify store via OAuth',
      available: true,
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      icon: '📝',
      description: 'Connect your WordPress site via REST API',
      available: true,
    },
    {
      id: 'custom',
      name: 'Custom Site',
      icon: '🌐',
      description: 'Any website using Magic.js snippet',
      available: true,
    },
  ]

  const handleConnect = async (platformId: string) => {
    setIsConnecting(true)
    setSelectedPlatform(platformId)

    // Redirect to connection flow
    if (platformId === 'shopify') {
      router.push('/dashboard/sites/connect?platform=shopify&onboarding=true')
    } else if (platformId === 'wordpress') {
      router.push('/dashboard/sites/connect?platform=wordpress&onboarding=true')
    } else {
      router.push('/dashboard/sites/connect?platform=custom&onboarding=true')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🔌</div>
        <h2 className="text-3xl font-bold text-white mb-2">Connect Your First Site</h2>
        <p className="text-gray-400">
          Choose your platform to get started with automated SEO fixes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handleConnect(platform.id)}
            disabled={!platform.available || isConnecting}
            className={`
              p-6 rounded-lg border-2 transition-all text-left
              ${
                selectedPlatform === platform.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }
              ${!platform.available ? 'opacity-50 cursor-not-allowed' : ''}
              ${isConnecting ? 'opacity-50 cursor-wait' : ''}
            `}
          >
            <div className="text-4xl mb-3">{platform.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {platform.name}
            </h3>
            <p className="text-sm text-gray-400">{platform.description}</p>
            {!platform.available && (
              <span className="inline-block mt-2 text-xs text-yellow-500">
                Coming Soon
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-gray-400 hover:text-white transition-colors"
        >
          I'll do this later →
        </button>
      </div>
    </div>
  )
}
