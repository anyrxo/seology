import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics & Performance</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your SEO improvements and website performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Organic Traffic"
          value="+23.5%"
          subtitle="vs last month"
          trend="up"
          icon={TrendingUp}
        />
        <MetricCard
          title="Avg Position"
          value="12.3"
          subtitle="↑ from 18.7"
          trend="up"
          icon={Target}
        />
        <MetricCard
          title="Issues Fixed"
          value="127"
          subtitle="this month"
          trend="neutral"
          icon={Zap}
        />
        <MetricCard
          title="Bounce Rate"
          value="-8.2%"
          subtitle="improvement"
          trend="up"
          icon={TrendingDown}
        />
      </div>

      {/* Traffic Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Organic Traffic Trend</CardTitle>
          <CardDescription>
            Daily organic traffic over the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-gray-500">
              Chart visualization (integrate with Recharts)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Top Pages */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Pages</CardTitle>
            <CardDescription>Pages with highest traffic gain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <PageRow
                url="/products/example-1"
                traffic={2847}
                change={+45}
                fixes={8}
              />
              <PageRow
                url="/collections/summer-sale"
                traffic={1923}
                change={+32}
                fixes={5}
              />
              <PageRow
                url="/products/new-arrival"
                traffic={1456}
                change={+28}
                fixes={3}
              />
              <PageRow
                url="/blog/seo-tips"
                traffic={1234}
                change={+18}
                fixes={6}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Improved Keywords</CardTitle>
            <CardDescription>Keywords with best ranking improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <KeywordRow
                keyword="eco-friendly products"
                position={8}
                previousPosition={23}
                volume={2400}
              />
              <KeywordRow
                keyword="sustainable fashion"
                position={12}
                previousPosition={34}
                volume={1800}
              />
              <KeywordRow
                keyword="organic clothing"
                position={15}
                previousPosition={41}
                volume={1200}
              />
              <KeywordRow
                keyword="green lifestyle"
                position={18}
                previousPosition={52}
                volume={980}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sites Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Site</CardTitle>
          <CardDescription>SEO metrics across all your connected sites</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SitePerformanceRow
              name="Example Store"
              domain="example-store.myshopify.com"
              traffic={8234}
              trafficChange={+23}
              issues={12}
              fixes={45}
            />
            <SitePerformanceRow
              name="My Blog"
              domain="myblog.com"
              traffic={3421}
              trafficChange={+18}
              issues={8}
              fixes={23}
            />
            <SitePerformanceRow
              name="Portfolio Site"
              domain="portfolio.example.com"
              traffic={1234}
              trafficChange={+12}
              issues={5}
              fixes={8}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
}: {
  title: string
  value: string
  subtitle: string
  trend: 'up' | 'down' | 'neutral'
  icon: any
}) {
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</div>
          <Icon className={`h-5 w-5 ${trendColor}`} />
        </div>
        <div className="mt-2 text-3xl font-bold">{value}</div>
        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</div>
      </CardContent>
    </Card>
  )
}

function PageRow({
  url,
  traffic,
  change,
  fixes,
}: {
  url: string
  traffic: number
  change: number
  fixes: number
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex-1">
        <div className="font-medium">{url}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {fixes} fixes applied
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold">{traffic.toLocaleString()}</div>
        <div className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change > 0 ? '+' : ''}{change}% traffic
        </div>
      </div>
    </div>
  )
}

function KeywordRow({
  keyword,
  position,
  previousPosition,
  volume,
}: {
  keyword: string
  position: number
  previousPosition: number
  volume: number
}) {
  const improvement = previousPosition - position

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex-1">
        <div className="font-medium">{keyword}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {volume.toLocaleString()} monthly searches
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold">Position #{position}</div>
        <div className="text-sm text-green-600">
          ↑ {improvement} positions
        </div>
      </div>
    </div>
  )
}

function SitePerformanceRow({
  name,
  domain,
  traffic,
  trafficChange,
  issues,
  fixes,
}: {
  name: string
  domain: string
  traffic: number
  trafficChange: number
  issues: number
  fixes: number
}) {
  return (
    <div className="grid grid-cols-4 gap-4 rounded-lg border p-4">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{domain}</div>
      </div>
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">Traffic</div>
        <div className="font-semibold">{traffic.toLocaleString()}</div>
        <div className={`text-xs ${trafficChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trafficChange > 0 ? '+' : ''}{trafficChange}%
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">Issues</div>
        <div className="font-semibold text-orange-600">{issues}</div>
      </div>
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">Fixes</div>
        <div className="font-semibold text-green-600">{fixes}</div>
      </div>
    </div>
  )
}
