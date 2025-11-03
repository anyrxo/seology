'use client'

import * as React from 'react'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

interface DataPoint {
  [key: string]: string | number
}

interface BarChartProps {
  data: DataPoint[]
  bars: {
    dataKey: string
    name: string
    color: string
  }[]
  xAxisKey: string
  title?: string
  height?: number
  className?: string
  loading?: boolean
  showGrid?: boolean
  showLegend?: boolean
  layout?: 'horizontal' | 'vertical'
}

export function BarChart({
  data,
  bars,
  xAxisKey,
  title,
  height = 350,
  className,
  loading = false,
  showGrid = true,
  showLegend = true,
  layout = 'horizontal',
}: BarChartProps) {
  if (loading) {
    return (
      <Card className={cn('p-6', className)}>
        {title && <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>}
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 rounded bg-gray-800" />
          <div className="h-64 w-full rounded bg-gray-800" />
        </div>
      </Card>
    )
  }

  if (data.length === 0) {
    return (
      <Card className={cn('p-6', className)}>
        {title && <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>}
        <div className="flex h-64 items-center justify-center text-gray-400">
          No data available
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn('p-6', className)}>
      {title && <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} layout={layout}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          )}
          <XAxis
            dataKey={xAxisKey}
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#F3F4F6',
            }}
            labelStyle={{ color: '#9CA3AF' }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ color: '#9CA3AF' }}
            />
          )}
          {bars.map((bar) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.name}
              fill={bar.color}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Card>
  )
}
