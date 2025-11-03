'use client'

import * as React from 'react'
import {
  AreaChart as RechartsAreaChart,
  Area,
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

interface AreaChartProps {
  data: DataPoint[]
  areas: {
    dataKey: string
    name: string
    color: string
    fillColor?: string
  }[]
  xAxisKey: string
  title?: string
  height?: number
  className?: string
  loading?: boolean
  showGrid?: boolean
  showLegend?: boolean
  stacked?: boolean
}

export function AreaChart({
  data,
  areas,
  xAxisKey,
  title,
  height = 350,
  className,
  loading = false,
  showGrid = true,
  showLegend = true,
  stacked = false,
}: AreaChartProps) {
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
        <RechartsAreaChart data={data}>
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
          {areas.map((area) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              name={area.name}
              stroke={area.color}
              fill={area.fillColor || area.color}
              fillOpacity={0.3}
              strokeWidth={2}
              stackId={stacked ? '1' : undefined}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
