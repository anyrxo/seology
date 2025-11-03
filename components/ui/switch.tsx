'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  loading?: boolean
  className?: string
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  description,
  disabled,
  loading,
  className,
}: SwitchProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-white/80">{label}</span>
          )}
          {description && (
            <span className="text-xs text-white/40">{description}</span>
          )}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled || loading}
        onClick={() => !disabled && !loading && onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          checked ? "bg-white shadow-lg shadow-white/20" : "bg-white/20 border border-white/20",
          (disabled || loading) && "opacity-50 cursor-not-allowed",
          !disabled && !loading && "hover:shadow-xl"
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "inline-flex h-4 w-4 items-center justify-center rounded-full shadow-md",
            checked ? "bg-black translate-x-6" : "bg-white translate-x-1"
          )}
        >
          {loading && (
            <Loader2 className={cn("h-3 w-3 animate-spin", checked ? "text-white" : "text-black")} />
          )}
        </motion.span>
      </button>
    </div>
  )
}
