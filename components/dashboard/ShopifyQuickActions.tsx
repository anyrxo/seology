'use client'

/**
 * Shopify Quick Actions Component
 *
 * Provides quick action buttons for common SEO tasks
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Search, Zap, TrendingUp, Loader2 } from 'lucide-react'

interface ShopifyQuickActionsProps {
  connectionId: string
  onActionComplete?: (action: string) => void
}

export function ShopifyQuickActions({ connectionId, onActionComplete }: ShopifyQuickActionsProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleQuickAction = async (action: string, prompt: string) => {
    setLoading(action)

    try {
      // Send message to AI chat
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          connectionId,
        }),
      })

      if (response.ok) {
        onActionComplete?.(action)
      }
    } catch (error) {
      console.error('Quick action failed:', error)
    } finally {
      setLoading(null)
    }
  }

  const quickActions = [
    {
      id: 'analyze-all',
      title: 'Analyze All Products',
      description: 'Run a full SEO analysis on all your products',
      icon: Search,
      color: 'blue',
      prompt: 'Analyze all my products for SEO issues and show me the top priorities',
    },
    {
      id: 'fix-critical',
      title: 'Fix Critical Issues',
      description: 'Automatically fix the most critical SEO problems',
      icon: Zap,
      color: 'red',
      prompt: 'Find and fix the most critical SEO issues in my store',
    },
    {
      id: 'optimize-top',
      title: 'Optimize Best Sellers',
      description: 'Optimize your highest-revenue products',
      icon: TrendingUp,
      color: 'green',
      prompt: 'Analyze and optimize my best-selling products for maximum SEO impact',
    },
    {
      id: 'store-health',
      title: 'Store Health Check',
      description: 'Get a complete SEO health report',
      icon: Sparkles,
      color: 'purple',
      prompt: 'Give me a comprehensive SEO health check for my entire store',
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50 hover:bg-blue-100',
        icon: 'text-blue-600',
        border: 'border-blue-200',
      },
      red: {
        bg: 'bg-red-50 hover:bg-red-100',
        icon: 'text-red-600',
        border: 'border-red-200',
      },
      green: {
        bg: 'bg-green-50 hover:bg-green-100',
        icon: 'text-green-600',
        border: 'border-green-200',
      },
      purple: {
        bg: 'bg-purple-50 hover:bg-purple-100',
        icon: 'text-purple-600',
        border: 'border-purple-200',
      },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          Quick Actions
        </CardTitle>
        <CardDescription>
          Start common SEO tasks with one click
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const colors = getColorClasses(action.color)
            const Icon = action.icon
            const isLoading = loading === action.id

            return (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.id, action.prompt)}
                disabled={isLoading || !!loading}
                className={`text-left p-4 rounded-lg border transition-all ${colors.bg} ${colors.border} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-white ${isLoading ? 'animate-pulse' : ''}`}>
                    {isLoading ? (
                      <Loader2 className={`h-5 w-5 ${colors.icon} animate-spin`} />
                    ) : (
                      <Icon className={`h-5 w-5 ${colors.icon}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
