'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  status?: "online" | "away" | "busy" | "offline"
  statusPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  border?: boolean
}

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  status,
  statusPosition = "bottom-right",
  border = false,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false)

  const sizeClasses = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
    "2xl": "h-20 w-20 text-xl",
  }

  const statusColors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    busy: "bg-red-500",
    offline: "bg-gray-500",
  }

  const statusPositions = {
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
  }

  const statusSizes = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
    "2xl": "w-5 h-5",
  }

  const initials = fallback
    ? fallback
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?"

  return (
    <div className="relative inline-block group">
      <div
        className={cn(
          "relative inline-flex items-center justify-center rounded-full",
          "bg-gradient-to-br from-white/20 to-white/10",
          "text-white font-semibold overflow-hidden",
          "transition-all duration-200",
          border && "ring-2 ring-white/20",
          "group-hover:ring-2 group-hover:ring-white/30 group-hover:shadow-lg group-hover:shadow-white/10",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {/* Status indicator */}
      {status && (
        <div
          className={cn(
            "absolute rounded-full border-2 border-black",
            statusColors[status],
            statusPositions[statusPosition],
            statusSizes[size],
            status === "online" && "animate-pulse"
          )}
        />
      )}
    </div>
  )
}
