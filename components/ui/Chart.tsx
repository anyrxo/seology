'use client'

import React from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'

interface ChartDataPoint {
  [key: string]: string | number | null | undefined
}

// Alias for external usage
export type ChartDataInput = ChartDataPoint

interface BaseChartProps {
  data: ChartDataPoint[]
  className?: string
}

interface LineChartProps extends BaseChartProps {
  dataKey: string
  xAxisKey?: string
  color?: string
}

export function SimpleLineChart({ data, dataKey, xAxisKey = 'date', color = '#3b82f6', className = '' }: LineChartProps) {
  return (
    <div className={className} style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey={xAxisKey} stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#f3f4f6',
            }}
          />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ fill: color }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

interface AreaChartProps extends BaseChartProps {
  dataKey: string
  xAxisKey?: string
  color?: string
  fillOpacity?: number
}

export function SimpleAreaChart({
  data,
  dataKey,
  xAxisKey = 'date',
  color = '#3b82f6',
  fillOpacity = 0.3,
  className = '',
}: AreaChartProps) {
  return (
    <div className={className} style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey={xAxisKey} stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#f3f4f6',
            }}
          />
          <Area type="monotone" dataKey={dataKey} stroke={color} fill={color} fillOpacity={fillOpacity} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

interface BarChartProps extends BaseChartProps {
  dataKey: string
  xAxisKey?: string
  color?: string
}

export function SimpleBarChart({ data, dataKey, xAxisKey = 'date', color = '#3b82f6', className = '' }: BarChartProps) {
  return (
    <div className={className} style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey={xAxisKey} stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#f3f4f6',
            }}
          />
          <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface MultiLineChartProps extends BaseChartProps {
  lines: Array<{
    dataKey: string
    color: string
    name: string
  }>
  xAxisKey?: string
}

export function MultiLineChart({ data, lines, xAxisKey = 'date', className = '' }: MultiLineChartProps) {
  return (
    <div className={className} style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey={xAxisKey} stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#f3f4f6',
            }}
          />
          <Legend />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              strokeWidth={2}
              name={line.name}
              dot={{ fill: line.color }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
