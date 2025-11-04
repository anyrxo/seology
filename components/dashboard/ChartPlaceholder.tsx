'use client'

import { TrendingUp, TrendingDown, BarChart3, LineChart, PieChart, Activity } from 'lucide-react'

export type ChartType = 'line' | 'bar' | 'pie' | 'area' | 'donut'

interface ChartPlaceholderProps {
  type?: ChartType
  title: string
  subtitle?: string
  value?: string | number
  trend?: {
    value: number
    direction: 'up' | 'down'
    label?: string
  }
  height?: string
  icon?: string
  comingSoon?: boolean
}

export function ChartPlaceholder({
  type = 'line',
  title,
  subtitle,
  value,
  trend,
  height = '300px',
  icon,
  comingSoon = true,
}: ChartPlaceholderProps) {
  const getChartIcon = () => {
    switch (type) {
      case 'line':
        return <LineChart className="h-6 w-6" />
      case 'bar':
        return <BarChart3 className="h-6 w-6" />
      case 'pie':
      case 'donut':
        return <PieChart className="h-6 w-6" />
      case 'area':
        return <Activity className="h-6 w-6" />
      default:
        return <BarChart3 className="h-6 w-6" />
    }
  }

  const getTrendColor = () => {
    if (!trend) return ''
    return trend.direction === 'up' ? 'green' : 'red'
  }

  return (
    <div className="card pd-24px">
      {/* Header */}
      <div className="w-layout-hflex flex-horizontal space-between align-center mg-bottom-16px">
        <div className="flex-horizontal gap-column-12px align-center">
          {icon && (
            <div className="card-icon-square _26px">
              <div className="text-200">{icon}</div>
            </div>
          )}
          <div className="flex-vertical">
            <h3 className="text-200 bold color-neutral-800">{title}</h3>
            {subtitle && (
              <p className="text-50 color-neutral-600">{subtitle}</p>
            )}
          </div>
        </div>

        {comingSoon && (
          <div className="badge neutral">
            <div className="text-50 medium">Coming soon</div>
          </div>
        )}
      </div>

      {/* Value and Trend */}
      {(value || trend) && (
        <div className="mg-bottom-24px">
          {value && (
            <div className="display-2 color-neutral-800 mg-bottom-8px">{value}</div>
          )}
          {trend && (
            <div className="w-layout-hflex flex-horizontal gap-column-8px align-center">
              <div className={`badge ${getTrendColor()}`}>
                <div className="flex-horizontal gap-column-4px align-center">
                  {trend.direction === 'up' ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span className="text-50 medium">
                    {Math.abs(trend.value)}%
                  </span>
                </div>
              </div>
              {trend.label && (
                <span className="text-50 color-neutral-600">{trend.label}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Chart Placeholder */}
      <div
        className="flex-vertical gap-row-16px align-center justify-center bg-neutral-100 rounded-lg"
        style={{ height, minHeight: '200px' }}
      >
        <div className="card-icon-square _40px neutral-icon">
          <div className="text-300 color-neutral-600">
            {getChartIcon()}
          </div>
        </div>
        <div className="text-center">
          <p className="text-100 medium color-neutral-700 mg-bottom-4px">
            {type.charAt(0).toUpperCase() + type.slice(1)} Chart
          </p>
          <p className="text-50 color-neutral-600">
            Chart visualization will be integrated here
          </p>
        </div>
      </div>

      {/* Chart Legend Placeholder */}
      {type === 'pie' || type === 'donut' ? (
        <div className="mg-top-16px grid-2-columns gap-column-12px gap-row-8px">
          {['Primary', 'Secondary', 'Tertiary', 'Other'].map((label, index) => (
            <div key={label} className="flex-horizontal gap-column-8px align-center">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#6b7280'][index],
                }}
              />
              <span className="text-50 color-neutral-600">{label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

// Specific chart type components for convenience
export function LineChartPlaceholder(props: Omit<ChartPlaceholderProps, 'type'>) {
  return <ChartPlaceholder {...props} type="line" />
}

export function BarChartPlaceholder(props: Omit<ChartPlaceholderProps, 'type'>) {
  return <ChartPlaceholder {...props} type="bar" />
}

export function PieChartPlaceholder(props: Omit<ChartPlaceholderProps, 'type'>) {
  return <ChartPlaceholder {...props} type="pie" />
}

export function AreaChartPlaceholder(props: Omit<ChartPlaceholderProps, 'type'>) {
  return <ChartPlaceholder {...props} type="area" />
}
