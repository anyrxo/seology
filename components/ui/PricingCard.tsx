'use client'

import * as React from 'react'
import { Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Card } from './card'

interface PricingCardProps {
  name: string
  price: number | string
  period?: string
  description: string
  features: string[]
  highlighted?: boolean
  buttonText?: string
  onButtonClick?: () => void
  badge?: string
  className?: string
}

export function PricingCard({
  name,
  price,
  period = '/month',
  description,
  features,
  highlighted = false,
  buttonText = 'Get Started',
  onButtonClick,
  badge,
  className,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        'relative flex flex-col p-8',
        highlighted && 'border-blue-500 shadow-lg shadow-blue-500/20',
        className
      )}
    >
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
            <Sparkles className="h-3 w-3" />
            {badge}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="mt-2 text-sm text-gray-400">{description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">
            {typeof price === 'number' ? `$${price}` : price}
          </span>
          {typeof price === 'number' && (
            <span className="text-gray-400">{period}</span>
          )}
        </div>

        <Button
          className="w-full"
          variant={highlighted ? 'primary' : 'outline'}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>

      <div className="mt-8 flex-1">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-blue-500/10 p-1">
                <Check className="h-4 w-4 text-blue-400" />
              </div>
              <span className="text-sm text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
