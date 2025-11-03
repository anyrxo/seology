'use client'

import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format, subDays } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from './button'

export interface DateRange {
  from: Date
  to: Date
}

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
  className?: string
}

const presets = [
  { label: 'Today', days: 0 },
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
]

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [range, setRange] = React.useState<DateRange>(
    value || {
      from: subDays(new Date(), 30),
      to: new Date(),
    }
  )

  const handlePresetClick = (days: number) => {
    const newRange = {
      from: days === 0 ? new Date() : subDays(new Date(), days),
      to: new Date(),
    }
    setRange(newRange)
    onChange?.(newRange)
    setIsOpen(false)
  }

  const displayText = range
    ? `${format(range.from, 'MMM d, yyyy')} - ${format(range.to, 'MMM d, yyyy')}`
    : 'Select date range'

  return (
    <div className={cn('relative', className)}>
      <Button
        variant="outline"
        className="w-full justify-start text-left font-normal"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {displayText}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-lg">
            <div className="space-y-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePresetClick(preset.days)}
                  className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-800"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
