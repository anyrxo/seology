'use client'

import * as React from 'react'
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

interface DataPoint {
  name: string
  value: number
  [key: string]: string | number
}

interface PieChartProps {
  data: DataPoint[]
  colors: string[]
  title?: string
  height?: number
  className?: string
  loading?: boolean
  showLegend?: boolean
  showLabels?: boolean
  innerRadius?: number
  outerRadius?: number
}

export function PieChart({
  data,
  colors,
  title,
  height = 350,
  className,
  loading = false,
  showLegend = true,
  showLabels = true,
  innerRadius = 0,
  outerRadius = 100,
}: PieChartProps) {
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

  const renderLabel = (props: { percent?: number; name?: string; [key: string]: unknown }) => {
    if (!showLabels) return null
    const percent = props.percent || 0
    return `${props.name} (${(percent * 100).toFixed(0)}%)`
  }

  return (
    <Card className={cn('p-6', className)}>
      {title && <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={showLabels}
            label={showLabels ? renderLabel : undefined}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#F3F4F6',
            }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ color: '#9CA3AF' }}
              verticalAlign="bottom"
              height={36}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </Card>
  )
}
