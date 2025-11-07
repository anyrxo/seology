'use client'

/**
 * Simplified Agents page - adding complexity step by step
 */

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AGENT_TEMPLATES } from '@/lib/seo-agent-templates'
import { ShopifyNav } from '@/components/shopify/ShopifyNav'

export default function AgentsSimplePage() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')

  const [activeTab, setActiveTab] = useState<'templates' | 'custom'>('templates')

  // Convert templates to array format
  const templates = Object.entries(AGENT_TEMPLATES).map(([id, template]) => ({
    id,
    ...template,
  }))

  return (
    <>
      <ShopifyNav shop={shop} />

      <main className="p-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            AI Agent Library (Simplified)
          </h1>
          <p className="text-gray-600">
            {templates.length} templates available
          </p>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'templates'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            Templates ({templates.length})
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'custom'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            Custom (0)
          </button>
        </div>

        {/* Template Grid */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map(template => (
              <div key={template.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: template.color }}
                  >
                    {template.icon.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="font-semibold">{template.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {template.description}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Use Agent
                </button>
              </div>
            ))}
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
