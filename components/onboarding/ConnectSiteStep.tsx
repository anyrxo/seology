'use client'

/**
 * Onboarding Step 2: Connect Site
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ConnectSiteStepProps {
  onNext: (data: { connectionId: string; siteName: string; platform: string }) => void
  onBack: () => void
  onSkip?: () => void
}

export function ConnectSiteStep({ onNext, onBack, onSkip }: ConnectSiteStepProps) {
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
      <div className="card pd-32px---44px text-center mg-bottom-32px">
        <div className="flex-horizontal justify-center mg-bottom-24px">
          <div className="avatar-circle _48px">
            🔌
          </div>
        </div>
        <h2 className="text-400 bold color-neutral-100 mg-bottom-8px">Connect Your First Site</h2>
        <p className="text-200 medium color-neutral-400">
          Choose your platform to get started with automated SEO fixes
        </p>
      </div>

      <div className="grid-3-columns gap-row-16px gap-column-16px mg-bottom-32px">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handleConnect(platform.id)}
            disabled={!platform.available || isConnecting}
            className={`card pd-24px ${
              selectedPlatform === platform.id ? 'border-accent' : ''
            }`}
            style={{
              border: selectedPlatform === platform.id ? '2px solid var(--accent--primary-1)' : undefined,
              opacity: !platform.available || isConnecting ? 0.5 : 1,
              cursor: !platform.available || isConnecting ? 'not-allowed' : 'pointer',
              textAlign: 'left'
            }}
          >
            <div className="avatar-circle _40px mg-bottom-16px">
              {platform.icon}
            </div>
            <h3 className="text-200 bold color-neutral-100 mg-bottom-8px">
              {platform.name}
            </h3>
            <p className="text-100 medium color-neutral-400">{platform.description}</p>
            {!platform.available && (
              <span className="badge mg-top-12px" style={{ backgroundColor: 'var(--system--yellow-200)' }}>
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
