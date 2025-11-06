/**
 * Shopify Monitor Page - Live Agent Execution Monitor
 * Opcode-inspired: Real-time monitoring of AI agent executions
 */

'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  Loader2,
  Play,
  Pause,
  XCircle,
  Download,
  RefreshCw,
  AlertTriangle,
  DollarSign,
  Server,
  Database,
} from 'lucide-react'

// ==================== TYPES ====================

interface LiveExecution {
  id: string
  agentId: string
  agent: {
    id: string
    name: string
    specialty: string
    icon: string
    color: string
  }
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
  startedAt: string | null
  completedAt: string | null
  duration: number | null
  targetType: string
  targetUrl: string | null
  progress?: number
  currentStep?: string
  estimatedTimeRemaining?: number
}

interface ExecutionDetails extends LiveExecution {
  input: string
  output: string
  error: string | null
  tokensUsed: number | null
  tokensInput: number | null
  tokensOutput: number | null
  costUSD: number | null
  modelUsed: string | null
  issuesFound: number
  fixesGenerated: number
  fixesApplied: number
  fixesFailed: number
  logs?: string[]
}

interface AgentStats {
  agentId: string
  agentName: string
  specialty: string
  totalRuns: number
  successfulRuns: number
  failedRuns: number
  successRate: number
  avgExecutionTime: number | null
  avgTokensUsed: number | null
  avgCostPerRun: number | null
  lastRunAt: string | null
}

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'down'
  activeExecutions: number
  queueDepth: number
  errorRate: number
  apiRateLimit: {
    remaining: number
    total: number
    resetAt: string
  }
  databaseConnected: boolean
}

// ==================== COMPONENT ====================

export default function MonitorPage() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')

  // State
  const [liveExecutions, setLiveExecutions] = useState<LiveExecution[]>([])
  const [selectedExecution, setSelectedExecution] = useState<ExecutionDetails | null>(null)
  const [agentStats, setAgentStats] = useState<AgentStats[]>([])
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null)
  const [isLiveEnabled, setIsLiveEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [filter, setFilter] = useState({
    agentId: '',
    status: '',
    startDate: '',
    endDate: '',
  })

  // ==================== LIVE UPDATES (SSE) ====================

  useEffect(() => {
    if (!shop || !isLiveEnabled) return

    const eventSource = new EventSource(`/api/shopify/monitor/live?shop=${shop}`)

    eventSource.onmessage = (event) => {
      try {
        const executions = JSON.parse(event.data)
        setLiveExecutions(executions)

        // Check for failures and play sound
        if (soundEnabled) {
          const hasFailed = executions.some((ex: LiveExecution) => ex.status === 'FAILED')
          if (hasFailed) {
            playFailureSound()
          }
        }
      } catch (error) {
        console.error('Failed to parse SSE data:', error)
      }
    }

    eventSource.onerror = () => {
      console.error('SSE connection error')
      eventSource.close()
    }

    return () => eventSource.close()
  }, [shop, isLiveEnabled, soundEnabled])

  // ==================== FETCH HEALTH STATUS ====================

  useEffect(() => {
    if (!shop) return

    const fetchHealth = async () => {
      try {
        const res = await fetch(`/api/shopify/monitor/health?shop=${shop}`)
        const data = await res.json()
        if (data.success) {
          setHealthStatus(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch health status:', error)
      }
    }

    fetchHealth()
    const interval = setInterval(fetchHealth, 5000) // Every 5 seconds

    return () => clearInterval(interval)
  }, [shop])

  // ==================== FETCH AGENT STATS ====================

  useEffect(() => {
    if (!shop) return

    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/shopify/monitor/stats?shop=${shop}`)
        const data = await res.json()
        if (data.success) {
          setAgentStats(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch agent stats:', error)
      }
    }

    fetchStats()
  }, [shop])

  // ==================== FETCH EXECUTION DETAILS ====================

  const fetchExecutionDetails = useCallback(async (executionId: string) => {
    try {
      const res = await fetch(`/api/shopify/monitor/executions/${executionId}?shop=${shop}`)
      const data = await res.json()
      if (data.success) {
        setSelectedExecution(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch execution details:', error)
    }
  }, [shop])

  // ==================== RETRY EXECUTION ====================

  const retryExecution = async (executionId: string) => {
    try {
      const res = await fetch(`/api/shopify/monitor/executions/${executionId}/retry?shop=${shop}`, {
        method: 'POST',
      })
      const data = await res.json()
      if (data.success) {
        alert('Execution retried successfully')
      }
    } catch (error) {
      console.error('Failed to retry execution:', error)
    }
  }

  // ==================== HELPER FUNCTIONS ====================

  const playFailureSound = () => {
    const audio = new Audio('/sounds/error.mp3')
    audio.play().catch(() => {})
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'RUNNING':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
      case 'COMPLETED':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'FAILED':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'CANCELLED':
        return <XCircle className="w-5 h-5 text-gray-500" />
      default:
        return <Activity className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'RUNNING':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'FAILED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A'
    if (seconds < 60) return `${seconds.toFixed(1)}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}m ${remainingSeconds}s`
  }

  const formatCost = (cost: number | null) => {
    if (!cost) return '$0.00'
    return `$${cost.toFixed(4)}`
  }

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-500'
      case 'degraded':
        return 'text-yellow-500'
      case 'down':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  // ==================== RENDER ====================

  if (!shop) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Missing shop parameter</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Live Execution Monitor
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Real-time monitoring of AI agent executions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                soundEnabled
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {soundEnabled ? '🔊' : '🔇'} Sound Alerts
            </button>
            <button
              onClick={() => setIsLiveEnabled(!isLiveEnabled)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                isLiveEnabled
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {isLiveEnabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isLiveEnabled ? 'Live' : 'Paused'}
            </button>
          </div>
        </div>

        {/* Health Status Bar */}
        {healthStatus && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="flex items-center gap-3">
                <Server className={`w-5 h-5 ${getHealthStatusColor(healthStatus.status)}`} />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                  <p className="text-sm font-semibold capitalize">{healthStatus.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
                  <p className="text-sm font-semibold">{healthStatus.activeExecutions}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Queue</p>
                  <p className="text-sm font-semibold">{healthStatus.queueDepth}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Error Rate</p>
                  <p className="text-sm font-semibold">{healthStatus.errorRate.toFixed(1)}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">API Limit</p>
                  <p className="text-sm font-semibold">
                    {healthStatus.apiRateLimit.remaining}/{healthStatus.apiRateLimit.total}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Database
                  className={`w-5 h-5 ${
                    healthStatus.databaseConnected ? 'text-green-500' : 'text-red-500'
                  }`}
                />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Database</p>
                  <p className="text-sm font-semibold">
                    {healthStatus.databaseConnected ? 'Connected' : 'Disconnected'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Executions Feed */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Live Executions
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
              {liveExecutions.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  No active executions
                </div>
              ) : (
                liveExecutions.map((execution) => (
                  <div
                    key={execution.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                    onClick={() => fetchExecutionDetails(execution.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(execution.status)}
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {execution.agent.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {execution.agent.specialty}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                          execution.status
                        )}`}
                      >
                        {execution.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>{execution.targetType}</span>
                      {execution.duration && <span>{formatDuration(execution.duration)}</span>}
                      {execution.startedAt && (
                        <span>{new Date(execution.startedAt).toLocaleTimeString()}</span>
                      )}
                    </div>
                    {execution.status === 'RUNNING' && execution.progress !== undefined && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${execution.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {execution.currentStep || 'Processing...'}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Execution Details or Agent Stats */}
        <div>
          {selectedExecution ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Execution Details
                </h2>
                <button
                  onClick={() => setSelectedExecution(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                {/* Agent Info */}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Agent</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedExecution.agent.name}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                      selectedExecution.status
                    )}`}
                  >
                    {selectedExecution.status}
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Duration</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatDuration(selectedExecution.duration)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Cost</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatCost(selectedExecution.costUSD)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tokens</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedExecution.tokensUsed || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Fixes</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedExecution.fixesApplied}/{selectedExecution.fixesGenerated}
                    </p>
                  </div>
                </div>

                {/* Error */}
                {selectedExecution.error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-red-800 dark:text-red-400">
                      {selectedExecution.error}
                    </p>
                  </div>
                )}

                {/* Output */}
                {selectedExecution.output && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Output</p>
                    <pre className="text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded-lg overflow-x-auto">
                      {JSON.stringify(JSON.parse(selectedExecution.output), null, 2)}
                    </pre>
                  </div>
                )}

                {/* Logs */}
                {selectedExecution.logs && selectedExecution.logs.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Logs</p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg max-h-48 overflow-y-auto">
                      {selectedExecution.logs.map((log, idx) => (
                        <p key={idx} className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                          {log}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Retry Button */}
                {selectedExecution.status === 'FAILED' && (
                  <button
                    onClick={() => retryExecution(selectedExecution.id)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry Execution
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Agent Performance
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
                {agentStats.map((stat) => (
                  <div key={stat.agentId} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {stat.agentName}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.totalRuns} runs
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Success Rate</p>
                        <p className="font-semibold text-green-600">{stat.successRate.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Avg Time</p>
                        <p className="font-semibold">{formatDuration(stat.avgExecutionTime)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Avg Tokens</p>
                        <p className="font-semibold">{stat.avgTokensUsed || 0}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Avg Cost</p>
                        <p className="font-semibold">{formatCost(stat.avgCostPerRun)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
