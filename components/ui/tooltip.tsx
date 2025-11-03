'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactElement
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  delay?: number
}

export function Tooltip({ children, content, side = "top", delay = 300 }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  }

  const arrowClasses = {
    top: "bottom-[-5px] left-1/2 -translate-x-1/2",
    bottom: "top-[-5px] left-1/2 -translate-x-1/2",
    left: "right-[-5px] top-1/2 -translate-y-1/2",
    right: "left-[-5px] top-1/2 -translate-y-1/2",
  }

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  const handleFocus = () => {
    setIsVisible(true)
  }

  const handleBlur = () => {
    setIsVisible(false)
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 px-3 py-2 text-sm text-white",
            "bg-black/90 backdrop-blur-lg border border-white/10",
            "rounded-lg shadow-xl whitespace-nowrap",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            "pointer-events-none",
            sideClasses[side]
          )}
        >
          {content}
          {/* Arrow */}
          <div
            className={cn(
              "absolute w-2.5 h-2.5 bg-black/90 border-white/10 transform rotate-45",
              side === "top" && "border-r border-b",
              side === "bottom" && "border-l border-t",
              side === "left" && "border-t border-r",
              side === "right" && "border-l border-b",
              arrowClasses[side]
            )}
          />
        </div>
      )}
    </div>
  )
}
