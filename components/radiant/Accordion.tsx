'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface AccordionItem {
  id: string
  title: string
  content: string | React.ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  variant?: 'default' | 'bordered' | 'filled' | 'minimal' | 'card' | 'gradient' | 'modern'
  allowMultiple?: boolean
  defaultOpen?: string[]
  className?: string
}

export function Accordion({
  items,
  variant = 'default',
  allowMultiple = false,
  defaultOpen = [],
  className = '',
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen))

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        if (!allowMultiple) {
          newSet.clear()
        }
        newSet.add(id)
      }
      return newSet
    })
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return {
          container: 'border border-gray-200 rounded-lg overflow-hidden',
          item: 'border-b border-gray-200 last:border-b-0',
          trigger: 'w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors',
          content: 'px-6 py-4 bg-white',
        }
      case 'filled':
        return {
          container: 'space-y-2',
          item: 'bg-gray-50 rounded-lg overflow-hidden',
          trigger: 'w-full px-6 py-4 text-left hover:bg-gray-100 transition-colors',
          content: 'px-6 py-4 bg-white',
        }
      case 'minimal':
        return {
          container: 'space-y-1',
          item: 'border-b border-gray-100 last:border-b-0',
          trigger: 'w-full px-2 py-3 text-left hover:text-[#3898ec] transition-colors',
          content: 'px-2 py-3',
        }
      case 'card':
        return {
          container: 'space-y-4',
          item: 'border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow',
          trigger: 'w-full px-6 py-4 text-left',
          content: 'px-6 py-4 border-t border-gray-200',
        }
      case 'gradient':
        return {
          container: 'space-y-3',
          item: 'bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg overflow-hidden',
          trigger: 'w-full px-6 py-4 text-left hover:from-blue-100 hover:to-purple-100 transition-all',
          content: 'px-6 py-4 bg-white/80 backdrop-blur-sm',
        }
      case 'modern':
        return {
          container: 'space-y-3',
          item: 'bg-white border-l-4 border-[#3898ec] rounded-r-lg shadow-sm',
          trigger: 'w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors',
          content: 'px-6 py-4 bg-gray-50/50',
        }
      default:
        return {
          container: 'space-y-2',
          item: 'bg-white rounded-lg overflow-hidden',
          trigger: 'w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors',
          content: 'px-6 py-4',
        }
    }
  }

  const variantClasses = getVariantClasses()

  return (
    <div className={`rt-accordion ${variantClasses.container} ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id)

        return (
          <div key={item.id} className={`rt-accordion-item ${variantClasses.item}`}>
            <button
              onClick={() => toggleItem(item.id)}
              className={`rt-accordion-trigger ${variantClasses.trigger} flex items-center justify-between`}
              aria-expanded={isOpen}
            >
              <span className="text-[#150438] font-medium text-base">{item.title}</span>
              <div className="rt-icon-box ml-4">
                <ChevronDown
                  className={`w-5 h-5 transition-all duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                  style={{ color: isOpen ? '#3898ec' : '#150438' }}
                />
              </div>
            </button>

            <div
              className={`rt-accordion-content transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className={variantClasses.content}>
                <div className="text-[#6d6d6d] text-sm leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <style jsx>{`
        .rt-accordion-content {
          transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .rt-accordion-trigger:focus {
          outline: none;
          ring: 2px solid #3898ec;
          ring-opacity: 0.5;
        }

        .rt-accordion-trigger:hover .rt-icon-box svg {
          color: #3898ec !important;
        }
      `}</style>
    </div>
  )
}

// FAQ variant - specialized accordion for FAQs
export interface FAQProps {
  faqs: Array<{ question: string; answer: string | React.ReactNode }>
  variant?: AccordionProps['variant']
  className?: string
}

export function FAQ({ faqs, variant = 'card', className = '' }: FAQProps) {
  const items: AccordionItem[] = faqs.map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.question,
    content: faq.answer,
  }))

  return (
    <section className={`rt-component-section ${className}`}>
      <div className="w-layout-blockcontainer rt-component-container w-container">
        <div className="text-center mb-12">
          <h2 className="rt-component-heading-two text-4xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#6d6d6d] text-lg">
            Find answers to common questions about our platform
          </p>
        </div>
        <Accordion items={items} variant={variant} allowMultiple />
      </div>
    </section>
  )
}
