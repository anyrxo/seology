'use client'

/**
 * Onboarding Step 2: Connect Site
 * Enhanced with better platform cards, hover effects, and loading states
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingBag, FileText, Globe, Loader2, ArrowRight, Sparkles, Check, type LucideIcon } from 'lucide-react'

interface ConnectSiteStepProps {
  onNext: (data: { connectionId: string; siteName: string; platform: string }) => void
  onBack: () => void
  onSkip?: () => void
}

export function ConnectSiteStep({ onNext, onBack, onSkip }: ConnectSiteStepProps) {
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = useState<string>('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null)

  const platforms: Array<{
    id: string
    name: string
    Icon: LucideIcon
    iconColor: string
    bgGradient: string
    borderColor: string
    glowColor: string
    description: string
    features: string[]
    available: boolean
  }> = [
    {
      id: 'shopify',
      name: 'Shopify',
      Icon: ShoppingBag,
      iconColor: 'text-green-400',
      bgGradient: 'from-green-500/20 to-emerald-600/10',
      borderColor: 'border-green-500/30',
      glowColor: 'shadow-green-500/20',
      description: 'Connect your Shopify store via OAuth',
      features: ['One-click setup', 'Auto-sync products', 'Theme editing'],
      available: true,
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      Icon: FileText,
      iconColor: 'text-blue-400',
      bgGradient: 'from-blue-500/20 to-cyan-600/10',
      borderColor: 'border-blue-500/30',
      glowColor: 'shadow-blue-500/20',
      description: 'Connect your WordPress site via REST API',
      features: ['Plugin-free setup', 'REST API access', 'Content updates'],
      available: true,
    },
    {
      id: 'custom',
      name: 'Custom Site',
      Icon: Globe,
      iconColor: 'text-purple-400',
      bgGradient: 'from-purple-500/20 to-pink-600/10',
      borderColor: 'border-purple-500/30',
      glowColor: 'shadow-purple-500/20',
      description: 'Any website using Magic.js snippet',
      features: ['Universal support', 'Simple snippet', 'Works anywhere'],
      available: true,
    },
  ]

  const handleConnect = async (platformId: string) => {
    console.log('handleConnect called with:', platformId)
    setIsConnecting(true)
    setSelectedPlatform(platformId)

    // Redirect to connection flow
    if (platformId === 'shopify') {
      console.log('Redirecting to Shopify connect...')
      router.push('/dashboard/sites/connect?platform=shopify&onboarding=true')
    } else if (platformId === 'wordpress') {
      console.log('Redirecting to WordPress connect...')
      router.push('/dashboard/sites/connect?platform=wordpress&onboarding=true')
    } else {
      console.log('Redirecting to Custom connect...')
      router.push('/dashboard/sites/connect?platform=custom&onboarding=true')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="avatar-circle _64px bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Connect Your First Site</h2>
        <p className="text-gray-400">
          Choose your platform to get started with automated SEO fixes
        </p>
      </motion.div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {platforms.map((platform, index) => {
          const isSelected = selectedPlatform === platform.id
          const isHovered = hoveredPlatform === platform.id
          const Icon = platform.Icon

          return (
            <motion.button
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => handleConnect(platform.id)}
              onMouseEnter={() => setHoveredPlatform(platform.id)}
              onMouseLeave={() => setHoveredPlatform(null)}
              disabled={!platform.available || isConnecting}
              className={`
                relative group
                bg-gradient-to-br ${platform.bgGradient}
                border-2 ${isSelected ? platform.borderColor : 'border-gray-700'}
                rounded-2xl p-6
                transition-all duration-300
                ${!platform.available || isConnecting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                ${isSelected ? `${platform.glowColor} shadow-xl` : ''}
                text-left
              `}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1"
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              )}

              {/* Loading Indicator */}
              {isConnecting && isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              )}

              {/* Icon */}
              <div className={`${platform.iconColor} mb-4 transform transition-transform ${isHovered ? 'scale-110' : ''}`}>
                <Icon size={48} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">
                {platform.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-4">
                {platform.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {platform.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                    className="flex items-center text-xs text-gray-500"
                  >
                    <div className={`w-1 h-1 rounded-full ${platform.iconColor.replace('text-', 'bg-')} mr-2`} />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              {/* Coming Soon Badge */}
              {!platform.available && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full border border-yellow-500/30">
                    Coming Soon
                  </span>
                </div>
              )}

              {/* Hover Arrow */}
              {isHovered && platform.available && !isConnecting && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute bottom-6 right-6"
                >
                  <ArrowRight className={`w-5 h-5 ${platform.iconColor}`} />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-blue-400 mb-1">Quick Setup</h4>
            <p className="text-sm text-gray-400">
              All connections are secure and encrypted. You can disconnect at any time from your dashboard settings.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          disabled={isConnecting}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => {
            if (onSkip) {
              onSkip()
            } else {
              router.push('/dashboard')
            }
          }}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          disabled={isConnecting}
        >
          I'll do this later
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  )
}
