'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ShoppingBag, FileText, Globe, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ConnectSiteStepProps {
  onNext: (platform: string, domain: string) => void
  onBack: () => void
}

type Platform = 'shopify' | 'wordpress' | 'custom'

export function ConnectSiteStep({ onNext, onBack }: ConnectSiteStepProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [domain, setDomain] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    if (!selectedPlatform || !domain) return

    setIsConnecting(true)
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onNext(selectedPlatform, domain)
  }

  const platforms = [
    {
      id: 'shopify' as Platform,
      name: 'Shopify',
      description: 'E-commerce stores on Shopify',
      icon: ShoppingBag,
      popular: true,
    },
    {
      id: 'wordpress' as Platform,
      name: 'WordPress',
      description: 'WordPress websites and blogs',
      icon: FileText,
      popular: true,
    },
    {
      id: 'custom' as Platform,
      name: 'Custom Site',
      description: 'Any other website platform',
      icon: Globe,
      popular: false,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">Connect Your First Site</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Choose your platform and enter your website URL
        </p>
      </div>

      {/* Platform Selection */}
      <div>
        <label className="mb-4 block text-sm font-medium">
          Select Your Platform
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          {platforms.map((platform) => {
            const Icon = platform.icon
            const isSelected = selectedPlatform === platform.id

            return (
              <Card
                key={platform.id}
                className={cn(
                  'relative cursor-pointer p-6 transition-all hover:shadow-lg',
                  isSelected
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                    : 'hover:border-green-300'
                )}
                onClick={() => setSelectedPlatform(platform.id)}
              >
                {platform.popular && (
                  <div className="absolute right-3 top-3 rounded-full bg-green-600 px-2 py-1 text-xs font-medium text-white">
                    Popular
                  </div>
                )}
                {isSelected && (
                  <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-green-100 p-3 dark:bg-green-900/20">
                  <Icon className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="mb-2 font-semibold">{platform.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {platform.description}
                </p>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Domain Input */}
      {selectedPlatform && (
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Website URL
          </label>
          <input
            type="text"
            placeholder={
              selectedPlatform === 'shopify'
                ? 'yourstore.myshopify.com'
                : selectedPlatform === 'wordpress'
                ? 'yourblog.com'
                : 'yourwebsite.com'
            }
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 dark:border-gray-600 dark:bg-gray-800"
          />

          {selectedPlatform === 'shopify' && (
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/10">
              <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-300">
                Shopify Connection
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                You'll be redirected to Shopify to authorize Seology.ai to access your store.
                We only request permissions needed for SEO fixes.
              </p>
            </div>
          )}

          {selectedPlatform === 'wordpress' && (
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/10">
              <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-300">
                WordPress Connection
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                You'll need to install our WordPress plugin to enable automatic fixes.
                We'll guide you through the installation.
              </p>
            </div>
          )}

          {selectedPlatform === 'custom' && (
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/10">
              <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-300">
                Custom Site Connection
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                We'll scan your site and provide fix recommendations. For automatic application,
                you can integrate with our API or manually apply the suggested changes.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleConnect}
          disabled={!selectedPlatform || !domain || isConnecting}
          className="bg-green-600 hover:bg-green-700"
        >
          {isConnecting ? 'Connecting...' : 'Connect Site'}
        </Button>
      </div>
    </div>
  )
}
