'use client'

/**
 * Test page WITHOUT toast import to identify if toast/sonner is the issue
 */

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AGENT_TEMPLATES } from '@/lib/seo-agent-templates'
import {
  Sparkles, FileText, Code, Image, ClipboardCheck,
  Plus, Play, Edit, Trash2, TrendingUp, Clock, DollarSign,
  Filter, Search, Star, Download, Users
} from 'lucide-react'
import { ShopifyNav } from '@/components/shopify/ShopifyNav'

interface AgentTemplate {
  id: string
  name: string
  description: string
  specialty: string
  icon: string
  color: string
  isTemplate: true
}

const iconMap = {
  sparkles: Sparkles,
  'file-text': FileText,
  code: Code,
  image: Image,
  'clipboard-check': ClipboardCheck,
}

export default function AgentsNoToastPage() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')

  const [activeTab, setActiveTab] = useState<'templates' | 'custom'>('templates')

  const templates: AgentTemplate[] = Object.entries(AGENT_TEMPLATES).map(([id, template]) => ({
    id,
    ...template,
    isTemplate: true as const,
  }))

  return (
    <>
      <ShopifyNav shop={shop} />

      <main className="p-8 max-w-7xl mx-auto">
        <header className="mb-8" role="banner">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Agent Library (No Toast Test)
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Testing without toast import - {templates.length} templates
          </p>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'templates'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Templates ({templates.length})
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'custom'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Custom (0)
          </button>
        </div>

        {/* Template Grid */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map(template => {
              const IconComponent = iconMap[template.icon as keyof typeof iconMap] || Sparkles

              return (
                <div key={template.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${template.color}20` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: template.color }} />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {template.description}
                  </p>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Play className="w-4 h-4" />
                    Use Agent
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="text-center py-12">
            <p className="text-gray-600">No custom agents yet</p>
          </div>
        )}
      </main>
    </>
  )
}
