'use client'

import { useState, ReactNode } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'

export interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface SwipeableTabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (tabId: string) => void
}

export function SwipeableTabs({ tabs, defaultTab, onChange }: SwipeableTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab)

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50

    // Swiped left - next tab
    if (info.offset.x < -swipeThreshold && activeIndex < tabs.length - 1) {
      handleTabChange(tabs[activeIndex + 1].id)
    }
    // Swiped right - previous tab
    else if (info.offset.x > swipeThreshold && activeIndex > 0) {
      handleTabChange(tabs[activeIndex - 1].id)
    }
  }

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-800 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                relative px-4 py-3 min-h-touch
                font-medium text-sm whitespace-nowrap
                transition-colors duration-200
                ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-300'}
              `}
            >
              {tab.label}

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Content with Swipe */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="py-4 cursor-grab active:cursor-grabbing"
          >
            {tabs.find(tab => tab.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Swipe indicator */}
      <div className="flex items-center justify-center gap-1 mt-2 md:hidden">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`
              h-1 rounded-full transition-all duration-200
              ${index === activeIndex ? 'w-6 bg-blue-500' : 'w-1 bg-gray-700'}
            `}
          />
        ))}
      </div>
    </div>
  )
}
