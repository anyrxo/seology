'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
}

interface DashflowBreadcrumbsProps {
  items: BreadcrumbItem[]
  variant?: "simple" | "badge"
  className?: string
}

/**
 * DashflowBreadcrumbs - Exact implementation from Dashflow X Webflow template
 *
 * Two variants:
 * 1. Simple - Text links with underline hover effect
 * 2. Badge - Badge-style links with icons
 *
 * Features:
 * - Automatic dividers between items
 * - Current item styling (no link, special styling)
 * - Hover effects on links
 */
export function DashflowBreadcrumbs({
  items,
  variant = "simple",
  className
}: DashflowBreadcrumbsProps) {
  const lastIndex = items.length - 1

  return (
    <div className={cn("breadcrumb-wrapper", className)}>
      {items.map((item, index) => {
        const isLast = index === lastIndex
        const isBadgeVariant = variant === "badge"

        return (
          <React.Fragment key={index}>
            <div className="flex align-center">
              {!isLast ? (
                // Link items
                isBadgeVariant ? (
                  <a href={item.href || "#"} className="breadcrumb-badge w-inline-block">
                    {item.icon && (
                      <img
                        src={item.icon}
                        loading="eager"
                        alt=""
                        className="max-w-14px max-w-12px-mbp"
                      />
                    )}
                    <div>{item.label}</div>
                  </a>
                ) : (
                  <a
                    href={item.href || "#"}
                    className="breadcrumb-link-wrapper w-inline-block"
                  >
                    <div>{item.label}</div>
                    <div className="breadcrumb-underline"></div>
                  </a>
                )
              ) : (
                // Current/last item
                isBadgeVariant ? (
                  <div className="breadcrumb-badge current">
                    {item.icon && (
                      <img
                        loading="eager"
                        alt=""
                        src={item.icon}
                        className="max-w-14px max-w-12px-mbp cursor-not-allowed"
                      />
                    )}
                    <div className="cursor-not-allowed">{item.label}</div>
                  </div>
                ) : (
                  <div className="text-100 breadcrumb-current">{item.label}</div>
                )
              )}

              {/* Divider - don't show after last item */}
              {!isLast && (
                <img
                  src={
                    isBadgeVariant
                      ? "/images/breadcrumb-divider-dashflow-webflow-template.svg"
                      : "/images/breadcrumb-divider-icon-dashflow-webflow-template.svg"
                  }
                  loading="eager"
                  alt=""
                  className="breadcrumb-divider"
                />
              )}
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

/**
 * Example usage - Simple variant:
 *
 * <DashflowBreadcrumbs
 *   variant="simple"
 *   items={[
 *     { label: "Breadcrumb item", href: "#" },
 *     { label: "Breadcrumb item", href: "#" },
 *     { label: "Breadcrumb Current" }
 *   ]}
 * />
 *
 * Example usage - Badge variant with icons:
 *
 * <DashflowBreadcrumbs
 *   variant="badge"
 *   items={[
 *     {
 *       label: "Breadcrumb item",
 *       href: "#",
 *       icon: "/images/breadcrumb-icon-1-dashflow-webflow-template.svg"
 *     },
 *     {
 *       label: "Breadcrumb item",
 *       href: "#",
 *       icon: "/images/breadcrumb-icon-2-dashflow-webflow-template.svg"
 *     },
 *     {
 *       label: "Breadcrumb current",
 *       icon: "/images/breadcrumb-icon-3-dashflow-webflow-template.svg"
 *     }
 *   ]}
 * />
 */
