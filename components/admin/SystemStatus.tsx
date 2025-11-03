'use client'

import * as React from 'react'
import { Activity, AlertCircle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SystemStatusProps {
  className?: string
}

export function SystemStatus({ className }: SystemStatusProps) {
  const [status, setStatus] = React.useState<'healthy' | 'warning' | 'error'>('healthy')

  // In a real app, fetch this from your monitoring system
  const services = [
    { name: 'API', status: 'healthy' as const },
    { name: 'Database', status: 'healthy' as const },
    { name: 'Job Queue', status: 'healthy' as const },
    { name: 'Claude AI', status: 'healthy' as const },
  ]

  const getStatusIcon = () => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-400" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'error':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('flex items-center gap-2 rounded-lg border px-3 py-1.5', getStatusColor())}>
        {getStatusIcon()}
        <span className="text-sm font-medium capitalize">{status}</span>
      </div>
      <div className="text-xs text-gray-500">
        {services.length} services operational
      </div>
    </div>
  )
}
