'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  title: string
  content: React.ReactNode
  defaultOpen?: boolean
}

interface AccordionProps {
  items: AccordionItemProps[]
  allowMultiple?: boolean
  className?: string
}

export function Accordion({
  items,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openIndices, setOpenIndices] = React.useState<Set<number>>(
    new Set(items.map((item, i) => (item.defaultOpen ? i : -1)).filter((i) => i !== -1))
  )

  const toggleItem = (index: number) => {
    setOpenIndices((prev) => {
      const newSet = allowMultiple ? new Set(prev) : new Set<number>()
      if (prev.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => {
        const isOpen = openIndices.has(index)

        return (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900"
          >
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-800"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-white">{item.title}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-gray-400 transition-transform',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            {isOpen && (
              <div className="border-t border-gray-800 px-6 py-4 text-sm text-gray-300">
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function AccordionItem({ title, content }: AccordionItemProps) {
  return <Accordion items={[{ title, content }]} />
}
