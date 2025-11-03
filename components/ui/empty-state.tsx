'use client'

import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { motion } from "framer-motion"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl",
        "border-2 border-dashed border-white/10",
        "bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm",
        "p-12 text-center",
        className
      )}
    >
      {Icon && (
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-6 rounded-full bg-white/10 p-4 backdrop-blur-sm border border-white/10"
        >
          <Icon className="h-8 w-8 text-white/40" />
        </motion.div>
      )}
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      {description && (
        <p className="text-sm text-white/60 mb-8 max-w-md leading-relaxed">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="secondary">
          {action.label}
        </Button>
      )}
    </motion.div>
  )
}
