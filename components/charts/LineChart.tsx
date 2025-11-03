'use client'

import * as React from 'react'
import {
  LineChart as RechartsLineChart,
  Line,
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

interface LineChartProps {
  data: DataPoint[]
  lines: {
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
}

export function LineChart({
  data,
  lines,
  xAxisKey,
  title,
  height = 350,
  className,
  loading = false,
  showGrid = true,
  showLegend = true,
}: LineChartProps) {
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
        <RechartsLineChart data={data}>
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
              iconType="line"
            />
          )}
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name}
              stroke={line.color}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </Card>
  )
}
