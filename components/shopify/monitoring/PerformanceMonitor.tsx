/**
 * Performance Monitor Component
 *
 * Displays real-time performance metrics, error rates, and system health
 * for Shopify app operations.
 */

'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

interface PerformanceMetrics {
  totalCalls: number
  successfulCalls: number
  failedCalls: number
  avgDuration: number
  p95Duration: number
  errorRate: number
  totalCost: number
}

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  metrics: {
    errorRate: number
    avgResponseTime: number
    rateLimitHealth: {
      percentAvailable: number
      nearLimit: boolean
      atRisk: boolean
    } | null
  }
  issues: string[]
}

interface PerformanceMonitorProps {
  shop: string
  period?: 'hour' | 'day' | 'week' | 'month'
  refreshInterval?: number // milliseconds
}

export function PerformanceMonitor({
  shop,
  period = 'day',
  refreshInterval = 60000, // 1 minute default
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [health, setHealth] = useState<SystemHealth | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMetrics()
    const interval = setInterval(fetchMetrics, refreshInterval)
    return () => clearInterval(interval)
  }, [shop, period, refreshInterval])

  async function fetchMetrics() {
    try {
      const response = await fetch(
        `/api/shopify/monitor/analytics?shop=${encodeURIComponent(shop)}&period=${period}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch metrics')
      }

      const data = await response.json()

      if (data.success) {
        setMetrics(data.data.performance)
        setHealth(data.data.systemHealth)
        setError(null)
      } else {
        setError(data.error?.message || 'Failed to load metrics')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-6 border-red-200 bg-red-50">
        <p className="text-red-600">Error loading metrics: {error}</p>
      </Card>
    )
  }

  if (!metrics || !health) {
    return (
      <Card className="p-6">
        <p className="text-gray-500">No metrics available</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">System Health</h3>
          <StatusBadge status={health.status} />
        </div>

        {health.issues.length > 0 && (
          <div className="space-y-2">
            {health.issues.map((issue, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <svg
                  className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-sm text-yellow-800">{issue}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total API Calls"
          value={metrics.totalCalls.toLocaleString()}
          subtitle={`${period} period`}
          icon="📊"
        />

        <MetricCard
          title="Success Rate"
          value={`${((metrics.successfulCalls / metrics.totalCalls) * 100).toFixed(1)}%`}
          subtitle={`${metrics.successfulCalls} successful`}
          icon="✅"
          trend={metrics.failedCalls === 0 ? 'up' : undefined}
        />

        <MetricCard
          title="Avg Response Time"
          value={`${metrics.avgDuration.toFixed(0)}ms`}
          subtitle={`P95: ${metrics.p95Duration.toFixed(0)}ms`}
          icon="⚡"
          trend={metrics.avgDuration < 500 ? 'up' : metrics.avgDuration > 2000 ? 'down' : undefined}
        />

        <MetricCard
          title="Error Rate"
          value={`${metrics.errorRate.toFixed(2)}%`}
          subtitle={`${metrics.failedCalls} errors`}
          icon="❌"
          trend={metrics.errorRate < 1 ? 'up' : metrics.errorRate > 10 ? 'down' : undefined}
        />
      </div>

      {/* Rate Limit Status */}
      {health.metrics.rateLimitHealth && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Rate Limit Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Available Capacity</span>
              <span className="text-lg font-semibold">
                {health.metrics.rateLimitHealth.percentAvailable.toFixed(1)}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  health.metrics.rateLimitHealth.atRisk
                    ? 'bg-red-500'
                    : health.metrics.rateLimitHealth.nearLimit
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{
                  width: `${health.metrics.rateLimitHealth.percentAvailable}%`,
                }}
              />
            </div>

            {health.metrics.rateLimitHealth.atRisk && (
              <p className="text-sm text-red-600">
                Critical: Rate limit capacity below 10%
              </p>
            )}
            {health.metrics.rateLimitHealth.nearLimit &&
              !health.metrics.rateLimitHealth.atRisk && (
                <p className="text-sm text-yellow-600">
                  Warning: Rate limit capacity below 20%
                </p>
              )}
          </div>
        </Card>
      )}
    </div>
  )
}

/**
 * Status Badge Component
 */
function StatusBadge({ status }: { status: 'healthy' | 'degraded' | 'unhealthy' }) {
  const styles = {
    healthy: 'bg-green-100 text-green-800 border-green-200',
    degraded: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    unhealthy: 'bg-red-100 text-red-800 border-red-200',
  }

  const icons = {
    healthy: '✓',
    degraded: '⚠',
    unhealthy: '✗',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}
    >
      <span>{icons[status]}</span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

/**
 * Metric Card Component
 */
interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  icon: string
  trend?: 'up' | 'down'
}

function MetricCard({ title, value, subtitle, icon, trend }: MetricCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="text-2xl">{icon}</div>
        {trend && (
          <div
            className={`text-xs font-medium px-2 py-1 rounded ${
              trend === 'up'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {trend === 'up' ? '↑' : '↓'}
          </div>
        )}
      </div>

      <h4 className="text-sm font-medium text-gray-600 mb-1">{title}</h4>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </Card>
  )
}
