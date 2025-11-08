/**
 * Shopify Analytics Dashboard
 * Opcode-inspired usage analytics with charts and budget tracking
 */

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import {
  DollarSign,
  Activity,
  Zap,
  TrendingUp,
  Download,
  Calendar,
  AlertCircle,
  CheckCircle,
  Settings,
} from 'lucide-react'
import { ShopifyAppNav } from '@/components/shopify/ShopifyAppNav'

interface OverviewData {
  totalCalls: number
  totalCost: number
  totalTokens: number
  inputTokens: number
  outputTokens: number
  avgCostPerCall: number
  budget: {
    limit: number
    spent: number
    remaining: number
    percentUsed: number
  } | null
}

interface UsageDataPoint {
  date: string
  calls: number
  cost: number
  tokens: number
  isForecast?: boolean
}

interface EndpointBreakdown {
  endpoint: string
  calls: number
  cost: number
  tokens: number
  avgLatency: number | null
}

interface ModelBreakdown {
  model: string
  calls: number
  cost: number
  tokens: number
}

interface ProductBreakdown {
  productId: string
  productName: string
  calls: number
  cost: number
  tokens: number
}

const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

export default function ShopifyAnalyticsPage() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')

  const [overview, setOverview] = useState<OverviewData | null>(null)
  const [usageData, setUsageData] = useState<{ historical: UsageDataPoint[]; forecast: UsageDataPoint[] }>({
    historical: [],
    forecast: [],
  })
  const [endpointData, setEndpointData] = useState<EndpointBreakdown[]>([])
  const [modelData, setModelData] = useState<ModelBreakdown[]>([])
  const [productData, setProductData] = useState<ProductBreakdown[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')
  const [metric, setMetric] = useState<'calls' | 'cost' | 'tokens'>('cost')
  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [budgetAmount, setBudgetAmount] = useState('')

  useEffect(() => {
    if (!shop) return

    const fetchData = async () => {
      setLoading(true)
      try {
        // Calculate date range
        const end = new Date()
        const start = new Date()
        switch (dateRange) {
          case '7d':
            start.setDate(start.getDate() - 7)
            break
          case '30d':
            start.setDate(start.getDate() - 30)
            break
          case '90d':
            start.setDate(start.getDate() - 90)
            break
          case 'all':
            start.setFullYear(start.getFullYear() - 1)
            break
        }

        // Fetch all data in parallel
        const [overviewRes, usageRes, endpointRes, modelRes, productRes] = await Promise.all([
          fetch(`/api/shopify/analytics/overview?shop=${shop}`),
          fetch(
            `/api/shopify/analytics/usage?shop=${shop}&startDate=${start.toISOString()}&endDate=${end.toISOString()}`
          ),
          fetch(`/api/shopify/analytics/breakdown?shop=${shop}&groupBy=endpoint`),
          fetch(`/api/shopify/analytics/breakdown?shop=${shop}&groupBy=model`),
          fetch(`/api/shopify/analytics/breakdown?shop=${shop}&groupBy=product`),
        ])

        const [overviewData, usageResult, endpointResult, modelResult, productResult] = await Promise.all([
          overviewRes.json(),
          usageRes.json(),
          endpointRes.json(),
          modelRes.json(),
          productRes.json(),
        ])

        if (overviewData.success) setOverview(overviewData.data)
        if (usageResult.success) setUsageData(usageResult.data)
        if (endpointResult.success) setEndpointData(endpointResult.data.byEndpoint || [])
        if (modelResult.success) setModelData(modelResult.data.byModel || [])
        if (productResult.success) setProductData(productResult.data.byProduct || [])
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [shop, dateRange])

  const handleSetBudget = async () => {
    if (!shop || !budgetAmount) return

    try {
      const res = await fetch(`/api/shopify/analytics/budget?shop=${shop}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monthlyLimit: parseFloat(budgetAmount),
          alerts: { at50: true, at75: true, at90: true, at100: true },
        }),
      })

      const data = await res.json()
      if (data.success) {
        setShowBudgetModal(false)
        // Refresh overview
        const overviewRes = await fetch(`/api/shopify/analytics/overview?shop=${shop}`)
        const overviewData = await overviewRes.json()
        if (overviewData.success) setOverview(overviewData.data)
      }
    } catch (error) {
      console.error('Error setting budget:', error)
    }
  }

  const handleExport = async (format: 'csv' | 'pdf') => {
    if (!shop) return

    try {
      const res = await fetch(`/api/shopify/analytics/export?shop=${shop}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format }),
      })

      if (format === 'csv') {
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `analytics-${shop}-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
      } else {
        window.print()
      }
    } catch (error) {
      console.error('Error exporting:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#191A1B] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Combine historical and forecast data for chart
  const chartData = [...usageData.historical, ...usageData.forecast]

  return (
    <div className="min-h-screen bg-[#191A1B] flex">
      <ShopifyAppNav />
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8" role="banner">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Usage Analytics</h1>
            <p className="text-gray-400">
              Track your AI API usage and costs
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center gap-2 px-4 py-2 bg-[#262A2B] border border-white/5 rounded-lg hover:border-white/10 transition-colors text-white"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity text-white"
            >
              <Download className="w-4 h-4" />
              Print Report
            </button>
          </div>
        </header>

      {/* Overview Cards */}
      {overview && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-[#262A2B] border border-white/5 rounded-lg p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Total API Calls</p>
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-white">
              {overview.totalCalls.toLocaleString()}
            </p>
          </div>

          <div className="bg-[#262A2B] border border-white/5 rounded-lg p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Total Cost</p>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-white">
              ${overview.totalCost.toFixed(2)}
            </p>
          </div>

          <div className="bg-[#262A2B] border border-white/5 rounded-lg p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Total Tokens</p>
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-white">
              {overview.totalTokens.toLocaleString()}
            </p>
          </div>

          <div className="bg-[#262A2B] border border-white/5 rounded-lg p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Avg Cost/Call</p>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-white">
              ${overview.avgCostPerCall.toFixed(4)}
            </p>
          </div>

          <div className="bg-[#262A2B] border border-white/5 rounded-lg p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Budget</p>
              <Settings className="w-5 h-5 text-gray-400" />
            </div>
            {overview.budget ? (
              <div>
                <p className="text-2xl font-bold text-white">
                  ${overview.budget.remaining.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  of ${overview.budget.limit} remaining
                </p>
              </div>
            ) : (
              <button
                onClick={() => setShowBudgetModal(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Set Budget
              </button>
            )}
          </div>
        </div>
      )}

      {/* Budget Alert */}
      {overview?.budget && overview.budget.percentUsed > 80 && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
            overview.budget.percentUsed >= 100
              ? 'bg-red-900/20 border border-red-800'
              : 'bg-yellow-900/20 border border-yellow-800'
          }`}
        >
          <AlertCircle
            className={`w-5 h-5 mt-0.5 ${
              overview.budget.percentUsed >= 100 ? 'text-red-600' : 'text-yellow-600'
            }`}
          />
          <div>
            <p className="font-medium text-white">
              {overview.budget.percentUsed >= 100 ? 'Budget Exceeded' : 'Budget Warning'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              You've used {overview.budget.percentUsed.toFixed(1)}% of your monthly budget ($
              {overview.budget.spent.toFixed(2)} / ${overview.budget.limit})
            </p>
          </div>
        </div>
      )}

      {/* Usage Over Time Chart */}
      <div className="bg-[#262A2B] border border-white/5 rounded-lg p-6 mb-8 hover:border-white/10 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Usage Over Time</h2>
          <div className="flex gap-2">
            {/* Date Range Selector */}
            <div className="flex gap-1 bg-[#191A1B] rounded-lg p-1">
              {(['7d', '30d', '90d', 'all'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    dateRange === range
                      ? 'bg-[#262A2B] text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range === 'all' ? 'All' : range.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Metric Selector */}
            <div className="flex gap-1 bg-[#191A1B] rounded-lg p-1">
              {(['calls', 'cost', 'tokens'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={`px-3 py-1 rounded text-sm font-medium capitalize transition-colors ${
                    metric === m
                      ? 'bg-[#262A2B] text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: number, name: string, props: any) => {
                if (props.payload.isForecast) {
                  return [
                    metric === 'cost' ? `$${value.toFixed(4)}` : value.toLocaleString(),
                    `Forecast ${name}`,
                  ]
                }
                return [metric === 'cost' ? `$${value.toFixed(4)}` : value.toLocaleString(), name]
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey={metric}
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorMetric)"
            />
            {usageData.forecast.length > 0 && (
              <Area
                type="monotone"
                dataKey={metric}
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="none"
                data={usageData.forecast}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Historical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-px bg-blue-500 border-t-2 border-dashed"></div>
            <span>Forecast (7 days)</span>
          </div>
        </div>
      </div>

      {/* Breakdown by Endpoint */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-[#262A2B] border border-white/5 rounded-lg p-6 hover:border-white/10 transition-colors">
          <h2 className="text-xl font-semibold text-white mb-6">
            Cost by Endpoint
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={endpointData as any}
                dataKey="cost"
                nameKey="endpoint"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={(props: any) => {
                  const entry = endpointData[props.index]
                  return `${entry.endpoint}: $${entry.cost.toFixed(2)}`
                }}
              >
                {endpointData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `$${value.toFixed(4)}`}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Endpoint Table */}
          <div className="mt-6 space-y-2">
            {endpointData.map((endpoint, index) => (
              <div
                key={endpoint.endpoint}
                className="flex items-center justify-between p-3 bg-[#191A1B] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="font-medium text-white">
                    {endpoint.endpoint}
                  </span>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold text-white">
                    ${endpoint.cost.toFixed(2)}
                  </p>
                  <p className="text-gray-500">
                    {endpoint.calls} calls • {endpoint.avgLatency ? `${endpoint.avgLatency}ms` : 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Usage */}
        <div className="bg-[#262A2B] border border-white/5 rounded-lg p-6 hover:border-white/10 transition-colors">
          <h2 className="text-xl font-semibold text-white mb-6">
            Usage by Model
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={modelData as any}
                dataKey="cost"
                nameKey="model"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                label={(props: any) => {
                  const entry = modelData[props.index]
                  const modelName = entry.model.includes('sonnet') ? 'Sonnet' : entry.model.includes('opus') ? 'Opus' : 'Haiku'
                  return `${modelName}: $${entry.cost.toFixed(2)}`
                }}
              >
                {modelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `$${value.toFixed(4)}`}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Model Comparison Table */}
          <div className="mt-6 space-y-2">
            {modelData.map((model, index) => {
              const modelName = model.model.includes('sonnet')
                ? 'SEOLOGY AI Pro'
                : model.model.includes('opus')
                ? 'SEOLOGY AI Advanced'
                : 'SEOLOGY AI Standard'

              return (
                <div
                  key={model.model}
                  className="flex items-center justify-between p-3 bg-[#191A1B] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="font-medium text-white">{modelName}</span>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold text-white">
                      ${model.cost.toFixed(2)}
                    </p>
                    <p className="text-gray-500">
                      {model.calls} calls • {model.tokens.toLocaleString()} tokens
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Cost by Product */}
      {productData.length > 0 && (
        <div className="bg-[#262A2B] border border-white/5 rounded-lg p-6 mb-8 hover:border-white/10 transition-colors">
          <h2 className="text-xl font-semibold text-white mb-6">
            Top Products by API Cost
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis
                dataKey="productName"
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => `$${value.toFixed(4)}`}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="cost" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#262A2B] border border-white/5 rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">
              Set Monthly Budget
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Get notified when you reach 50%, 75%, 90%, and 100% of your budget.
            </p>
            <input
              type="number"
              step="0.01"
              min="0"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              placeholder="Enter amount in USD"
              className="w-full px-4 py-2 border border-white/5 rounded-lg bg-[#191A1B] text-white placeholder-gray-500 mb-4 focus:border-blue-500 focus:outline-none"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowBudgetModal(false)}
                className="px-4 py-2 border border-white/5 rounded-lg hover:border-white/10 transition-colors text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSetBudget}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Set Budget
              </button>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  )
}
