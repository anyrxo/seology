/**
 * Shopify Agents - AI Agent Library and Creation
 * Opcode-inspired feature for specialized SEO automation agents
 */

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AGENT_TEMPLATES } from '@/lib/seo-agent-templates'
import { showSuccessToast, showErrorToast, confirmDialog } from '@/lib/shopify-app-bridge'
import {
  Sparkles, FileText, Code, Image, ClipboardCheck,
  Plus, Play, Edit, Trash2, TrendingUp, Clock, DollarSign,
  Filter, Search, Star, Download, Users
} from 'lucide-react'
import { ShopifyNav } from '@/components/shopify/ShopifyNav'

// Type definitions
interface AgentTemplate {
  id: string
  name: string
  description: string
  specialty: string
  icon: string
  color: string
  isTemplate: true
  avgExecutionTime?: number
  avgTokensUsed?: number
  avgCostPerRun?: number
  successRate?: number
}

interface CustomAgent {
  id: string
  name: string
  description: string
  specialty: string
  icon?: string
  color: string
  systemPrompt: string
  model: string
  temperature: number
  maxTokens: number
  totalRuns: number
  successfulRuns: number
  avgExecutionTime?: number
  avgTokensUsed?: number
  avgCostPerRun?: number
  lastUsedAt?: string
  createdAt: string
  isPublic: boolean
}

interface PublicAgent extends CustomAgent {
  createdBy: string
  rating?: number
  ratingCount: number
  downloads: number
}

type Category = 'all' | 'content' | 'technical' | 'visual' | 'comprehensive'

// Icon mapping
const iconMap = {
  sparkles: Sparkles,
  'file-text': FileText,
  code: Code,
  image: Image,
  'clipboard-check': ClipboardCheck,
}

export default function AgentsPage() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')

  // State
  const [activeTab, setActiveTab] = useState<'templates' | 'custom' | 'marketplace'>('templates')
  const [categoryFilter, setCategoryFilter] = useState<Category>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [customAgents, setCustomAgents] = useState<CustomAgent[]>([])
  const [publicAgents, setPublicAgents] = useState<PublicAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showExecuteModal, setShowExecuteModal] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<AgentTemplate | CustomAgent | null>(null)
  const [editingAgent, setEditingAgent] = useState<CustomAgent | null>(null)

  // Convert templates to array format
  const templates: AgentTemplate[] = Object.entries(AGENT_TEMPLATES).map(([id, template]) => ({
    id,
    ...template,
    isTemplate: true as const,
    // Mock performance data for templates
    avgExecutionTime: 2.5,
    avgTokensUsed: 850,
    avgCostPerRun: 0.015,
    successRate: 98,
  }))

  // Fetch custom agents
  useEffect(() => {
    if (!shop) return

    fetch(`/api/shopify/agents?shop=${shop}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCustomAgents(data.data.customAgents || [])
          setPublicAgents(data.data.publicAgents || [])
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [shop])

  // Filter agents by category and search
  const filterAgents = (agents: (AgentTemplate | CustomAgent | PublicAgent)[]) => {
    return agents.filter(agent => {
      // Category filter
      if (categoryFilter !== 'all') {
        const category = agent.specialty.toLowerCase()
        if (categoryFilter === 'content' && !['title_optimizer', 'meta_description'].includes(category)) return false
        if (categoryFilter === 'technical' && category !== 'schema_org') return false
        if (categoryFilter === 'visual' && category !== 'alt_text') return false
        if (categoryFilter === 'comprehensive' && category !== 'comprehensive') return false
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return agent.name.toLowerCase().includes(query) ||
               agent.description.toLowerCase().includes(query)
      }

      return true
    })
  }

  const filteredTemplates = filterAgents(templates)
  const filteredCustomAgents = filterAgents(customAgents)
  const filteredPublicAgents = filterAgents(publicAgents)

  // Handle agent execution
  const handleUseAgent = (agent: AgentTemplate | CustomAgent) => {
    setSelectedAgent(agent)
    setShowExecuteModal(true)
  }

  // Handle agent editing
  const handleEditAgent = (agentId: string) => {
    const agent = customAgents.find(a => a.id === agentId)
    if (!agent) return

    setEditingAgent(agent)
    setShowCreateModal(true)
  }

  // Handle agent deletion
  const handleDeleteAgent = async (agentId: string) => {
    const confirmed = await confirmDialog({
      title: 'Delete Agent',
      message: 'Are you sure you want to delete this agent? This action cannot be undone.',
      primaryAction: { label: 'Delete', destructive: true },
      secondaryAction: { label: 'Cancel' }
    })

    if (!confirmed) return

    try {
      const res = await fetch(`/api/shopify/agents/${agentId}?shop=${shop}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      if (data.success) {
        setCustomAgents(prev => prev.filter(a => a.id !== agentId))
        showSuccessToast('Agent deleted successfully')
      } else {
        showErrorToast(data.error?.message || 'Failed to delete agent')
      }
    } catch (error) {
      showErrorToast('Failed to delete agent')
      console.error('Failed to delete agent:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <>
      <ShopifyNav shop={shop} />

      <main className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8" role="banner">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Agent Library
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Specialized AI agents for automated SEO optimization
          </p>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'templates'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Pre-built Templates ({templates.length})
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'custom'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            My Agents ({customAgents.length})
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'marketplace'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Marketplace ({publicAgents.length})
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as Category)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="content">Content</option>
              <option value="technical">Technical</option>
              <option value="visual">Visual</option>
              <option value="comprehensive">Comprehensive</option>
            </select>

            {activeTab === 'custom' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Agent
              </button>
            )}
          </div>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'templates' && filteredTemplates.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onUse={() => handleUseAgent(agent)}
              type="template"
            />
          ))}

          {activeTab === 'custom' && filteredCustomAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onUse={() => handleUseAgent(agent)}
              onEdit={() => handleEditAgent(agent.id)}
              onDelete={() => handleDeleteAgent(agent.id)}
              type="custom"
            />
          ))}

          {activeTab === 'marketplace' && filteredPublicAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onUse={() => handleUseAgent(agent)}
              type="marketplace"
            />
          ))}
        </div>

        {/* Empty State */}
        {activeTab === 'templates' && filteredTemplates.length === 0 && (
          <EmptyState message="No templates match your filters" />
        )}
        {activeTab === 'custom' && filteredCustomAgents.length === 0 && (
          <EmptyState
            message="You haven't created any custom agents yet"
            action={
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Agent
              </button>
            }
          />
        )}
        {activeTab === 'marketplace' && filteredPublicAgents.length === 0 && (
          <EmptyState message="No public agents available yet" />
        )}
    </main>

      {/* Modals */}
      {showCreateModal && (
        <CreateAgentModal
          shop={shop || ''}
          editingAgent={editingAgent}
          onClose={() => {
            setShowCreateModal(false)
            setEditingAgent(null)
          }}
          onSuccess={(agent) => {
            if (editingAgent) {
              // Update existing agent
              setCustomAgents(prev => prev.map(a => a.id === agent.id ? agent : a))
            } else {
              // Add new agent
              setCustomAgents(prev => [...prev, agent])
            }
            setShowCreateModal(false)
            setEditingAgent(null)
          }}
        />
      )}

      {showExecuteModal && selectedAgent && (
        <ExecuteAgentModal
          shop={shop || ''}
          agent={selectedAgent}
          onClose={() => {
            setShowExecuteModal(false)
            setSelectedAgent(null)
          }}
        />
      )}
    </>
  )
}

// Agent Card Component
function AgentCard({
  agent,
  onUse,
  onEdit,
  onDelete,
  type
}: {
  agent: AgentTemplate | CustomAgent | PublicAgent
  onUse: () => void
  onEdit?: () => void
  onDelete?: () => void
  type: 'template' | 'custom' | 'marketplace'
}) {
  const IconComponent = iconMap[agent.icon as keyof typeof iconMap] || Sparkles
  const successRate = 'successfulRuns' in agent && 'totalRuns' in agent
    ? agent.totalRuns > 0 ? ((agent.successfulRuns / agent.totalRuns) * 100).toFixed(0) : 98
    : 98

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${agent.color}20` }}
        >
          <IconComponent className="w-6 h-6" style={{ color: agent.color }} />
        </div>

        {type === 'marketplace' && 'rating' in agent && agent.rating && (
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-gray-900 dark:text-white">{agent.rating.toFixed(1)}</span>
            <span className="text-gray-500">({agent.ratingCount})</span>
          </div>
        )}
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {agent.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {agent.description}
      </p>

      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
            <Clock className="w-3 h-3" />
            Time
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {agent.avgExecutionTime ? `${agent.avgExecutionTime.toFixed(1)}s` : '2.5s'}
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
            <TrendingUp className="w-3 h-3" />
            Success
          </div>
          <div className="text-sm font-semibold text-green-600">
            {successRate}%
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
            <DollarSign className="w-3 h-3" />
            Cost
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            ${agent.avgCostPerRun ? agent.avgCostPerRun.toFixed(3) : '0.015'}
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      {type !== 'template' && 'totalRuns' in agent && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Used {agent.totalRuns} times
          {agent.lastUsedAt && ` • Last used ${new Date(agent.lastUsedAt).toLocaleDateString()}`}
        </div>
      )}

      {type === 'marketplace' && 'downloads' in agent && (
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <Users className="w-3 h-3" />
          <span>{agent.downloads} installs</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onUse}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Play className="w-4 h-4" />
          {type === 'marketplace' ? 'Install & Use' : 'Use Agent'}
        </button>

        {type === 'custom' && (
          <>
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                title="Edit Agent"
              >
                <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="px-3 py-2 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="Delete Agent"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Empty State Component
function EmptyState({ message, action }: { message: string; action?: React.ReactNode }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
      {action}
    </div>
  )
}

// Create Agent Modal Component
function CreateAgentModal({
  shop,
  editingAgent,
  onClose,
  onSuccess
}: {
  shop: string
  editingAgent?: CustomAgent | null
  onClose: () => void
  onSuccess: (agent: CustomAgent) => void
}) {
  const [formData, setFormData] = useState({
    name: editingAgent?.name || '',
    description: editingAgent?.description || '',
    systemPrompt: editingAgent?.systemPrompt || '',
    model: editingAgent?.model || 'claude-sonnet-4-5-20250929',
    maxTokens: editingAgent?.maxTokens || 2000,
    temperature: editingAgent?.temperature || 0.7,
    isPublic: editingAgent?.isPublic || false,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingAgent
        ? `/api/shopify/agents/${editingAgent.id}?shop=${shop}`
        : `/api/shopify/agents?shop=${shop}`

      const res = await fetch(url, {
        method: editingAgent ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.success) {
        showSuccessToast(editingAgent ? 'Agent updated successfully' : 'Agent created successfully')
        onSuccess(data.data)
      } else {
        showErrorToast(data.error?.message || `Failed to ${editingAgent ? 'update' : 'create'} agent`)
      }
    } catch (error) {
      showErrorToast(`Failed to ${editingAgent ? 'update' : 'create'} agent`)
      console.error(`Failed to ${editingAgent ? 'update' : 'create'} agent:`, error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {editingAgent ? 'Edit Agent' : 'Create Custom Agent'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Agent Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Product Description Enhancer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="What does this agent do?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                System Prompt
              </label>
              <textarea
                required
                value={formData.systemPrompt}
                onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="You are an expert SEO specialist..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Model
                </label>
                <select
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="claude-sonnet-4-5-20250929">Claude 3.5 Sonnet</option>
                  <option value="claude-3-opus-20240229">Claude 3 Opus</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Max Tokens
                </label>
                <input
                  type="number"
                  min={100}
                  max={4000}
                  value={formData.maxTokens}
                  onChange={(e) => setFormData({ ...formData, maxTokens: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Make this agent public (share with community)
                </span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Agent'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Agent execution result type
interface AgentExecutionResult {
  executionId: string
  status: 'completed' | 'failed'
  output: Record<string, unknown>
  tokensUsed: number
  costUSD: number
  duration: number
}

// Execute Agent Modal Component
function ExecuteAgentModal({
  shop,
  agent,
  onClose
}: {
  shop: string
  agent: AgentTemplate | CustomAgent
  onClose: () => void
}) {
  const [input, setInput] = useState('')
  const [executing, setExecuting] = useState(false)
  const [result, setResult] = useState<AgentExecutionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleExecute = async () => {
    if (!input.trim()) return

    setExecuting(true)
    setError(null)

    try {
      const res = await fetch(`/api/shopify/agents/${agent.id}/execute?shop=${shop}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: JSON.parse(input) // Expect JSON input
        }),
      })
      const data = await res.json()

      if (data.success) {
        setResult(data.data)
      } else {
        setError(data.error?.message || 'Execution failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Execution failed')
    } finally {
      setExecuting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Execute: {agent.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {agent.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {!result ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Input Data (JSON format)
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={10}
                  placeholder={`{\n  "productTitle": "Example Product",\n  "productDescription": "Description here...",\n  "keywords": ["keyword1", "keyword2"]\n}`}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <button
                onClick={handleExecute}
                disabled={executing || !input.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {executing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Executing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Execute Agent
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              {/* Results */}
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  Execution Complete
                </h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-green-700 dark:text-green-300">Duration:</span>{' '}
                    <span className="font-semibold text-green-900 dark:text-green-100">
                      {result.duration.toFixed(2)}s
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700 dark:text-green-300">Tokens:</span>{' '}
                    <span className="font-semibold text-green-900 dark:text-green-100">
                      {result.tokensUsed}
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700 dark:text-green-300">Cost:</span>{' '}
                    <span className="font-semibold text-green-900 dark:text-green-100">
                      ${result.costUSD.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Agent Output
                </label>
                <pre className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-x-auto text-sm">
                  {JSON.stringify(result.output, null, 2)}
                </pre>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setResult(null)
                    setInput('')
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Run Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
