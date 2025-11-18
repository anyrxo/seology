'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

interface DashflowTooltipProps {
  children: React.ReactNode
  content: string
  position?: "top" | "bottom" | "left" | "right"
  className?: string
}

/**
 * DashflowTooltip - Exact implementation from Dashflow X Webflow template
 *
 * Matches the tooltip structure from components.html with:
 * - 4 directional variants (top, bottom, left, right)
 * - Triangle arrows pointing to trigger
 * - Hover interaction
 * - Clean, simple design
 */
export function DashflowTooltip({
  children,
  content,
  position = "top",
  className
}: DashflowTooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  const positionClasses = {
    top: "tooltip top",
    bottom: "tooltip bottom",
    left: "tooltip left",
    right: "tooltip right"
  }

  const triangleImages = {
    top: "/images/tooltip-triangle-bottom-dashflow-webflow-template.svg",
    bottom: "/images/tooltip-triangle-top-dashflow-webflow-template.svg",
    left: "/images/tooltip-triangle-right-dashflow-webflow-template.svg",
    right: "/images/tooltip-triangle-left-dashflow-webflow-template.svg"
  }

  const triangleClasses = {
    top: "tooltip-triangle-bottom",
    bottom: "tooltip-triangle-top",
    left: "tooltip-triangle-right",
    right: "tooltip-triangle-left"
  }

  const containerClasses = {
    top: "flex-vertical align-center",
    bottom: "flex-vertical align-center",
    left: "flex-horizontal justify-end",
    right: "flex-horizontal justify-start"
  }

  return (
    <div
      className={cn("display-inline-block position-relative---z-index-1", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className={containerClasses[position]}>
        {children}
        {isVisible && (
          <div className={positionClasses[position]}>
            <div className={position === "top" || position === "bottom" ? "width-100" : ""}>
              {content}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={triangleImages[position]}
              loading="eager"
              alt=""
              className={triangleClasses[position]}
            />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Example usage:
 *
 * <DashflowTooltip content="Right tooltip" position="right">
 *   <div className="text-100 medium color-neutral-800">Simple text</div>
 * </DashflowTooltip>
 *
 * <DashflowTooltip content="Top tooltip" position="top">
 *   <div className="text-100 medium color-neutral-800">Simple text</div>
 * </DashflowTooltip>
 */
