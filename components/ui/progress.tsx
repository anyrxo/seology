'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: "default" | "success" | "warning" | "danger" | "gradient"
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  animated?: boolean
  showGlow?: boolean
}

export function Progress({
  value,
  max = 100,
  variant = "gradient",
  size = "md",
  showLabel = false,
  animated = true,
  showGlow = true,
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const variantClasses = {
    default: "bg-white",
    success: "bg-gradient-to-r from-green-500 to-emerald-500",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500",
    danger: "bg-gradient-to-r from-red-500 to-rose-500",
    gradient: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
  }

  const glowClasses = {
    default: "shadow-[0_0_10px_rgba(255,255,255,0.5)]",
    success: "shadow-[0_0_10px_rgba(34,197,94,0.5)]",
    warning: "shadow-[0_0_10px_rgba(234,179,8,0.5)]",
    danger: "shadow-[0_0_10px_rgba(239,68,68,0.5)]",
    gradient: "shadow-[0_0_10px_rgba(147,51,234,0.5)]",
  }

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  }

  // Determine color based on percentage
  const autoVariant = React.useMemo(() => {
    if (variant !== "default") return variant
    if (percentage < 30) return "danger"
    if (percentage < 70) return "warning"
    return "success"
  }, [percentage, variant])

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative w-full rounded-full bg-white/10 overflow-hidden",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {/* Shimmer background effect */}
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        )}

        {/* Progress fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={animated ? { duration: 1, ease: "easeOut" } : {}}
          className={cn(
            "h-full rounded-full transition-all relative",
            variantClasses[autoVariant],
            showGlow && glowClasses[autoVariant]
          )}
        >
          {/* Glowing dot at end */}
          {showGlow && percentage > 0 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-glow animate-pulse" />
          )}
        </motion.div>
      </div>

      {/* Percentage label */}
      {showLabel && (
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-white/60">Progress</span>
          <span
            className={cn(
              "font-semibold tabular-nums",
              percentage >= 100 ? "text-green-400" : "text-white"
            )}
          >
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
}
