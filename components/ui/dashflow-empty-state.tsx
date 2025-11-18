'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

interface DashflowEmptyStateProps {
  icon: string
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  variant?: "centered" | "left"
  className?: string
}

/**
 * DashflowEmptyState - Exact implementation from Dashflow X Webflow template
 *
 * Two variants:
 * 1. Centered - Icon and text centered, button below
 * 2. Left - Icon and text left-aligned in horizontal layout
 *
 * Use for:
 * - Empty table states
 * - No data scenarios
 * - Onboarding prompts
 */
export function DashflowEmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = "centered",
  className
}: DashflowEmptyStateProps) {
  if (variant === "centered") {
    return (
      <div className={cn("card pd-32px---18px text-center", className)}>
        <div className="mg-bottom-16px">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={icon}
            loading="eager"
            alt=""
            className="card-icon-square neutral-icon"
          />
        </div>
        <h3 className="text-200 bold mg-bottom-4px">{title}</h3>
        <p>{description}</p>
        {actionLabel && onAction && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onAction()
            }}
            className="btn-secondary w-inline-block"
          >
            <div className="flex-horizontal gap-column-4px">
              <div>{actionLabel}</div>
            </div>
          </a>
        )}
      </div>
    )
  }

  // Left variant
  return (
    <div className={cn("card pd-32px---18px", className)}>
      <div className="flex align-start gap-column-16px">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          loading="eager"
          alt=""
          className="card-icon-square neutral-icon"
        />
        <div>
          <h3 className="text-200 bold mg-bottom-4px">{title}</h3>
          <p>{description}</p>
          {actionLabel && onAction && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onAction()
              }}
              className="btn-secondary w-inline-block"
            >
              <div className="flex-horizontal gap-column-4px">
                <div>{actionLabel}</div>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Example usage - Centered variant:
 *
 * <DashflowEmptyState
 *   variant="centered"
 *   icon="/images/empty-state-card-icon-dashflow-webflow-template.png"
 *   title="State title"
 *   description="Donec enim lectus elit suspendisse nisi sodales pretium sed sed etiam amet porttitor urna vel massa nisl mattis aliquet eu consectet."
 *   actionLabel="Create file"
 *   onAction={() => console.log('Create clicked')}
 * />
 *
 * Example usage - Left-aligned variant:
 *
 * <DashflowEmptyState
 *   variant="left"
 *   icon="/images/empty-state-card-icon-dashflow-webflow-template.png"
 *   title="State title"
 *   description="Donec enim lectus elit suspendisse nisi sodales pretium sed sed etiam ametoler porttitor urna vel massa nisl mattis."
 *   actionLabel="Create file"
 *   onAction={() => console.log('Create clicked')}
 * />
 */
