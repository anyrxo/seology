'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

interface DashflowTabsProps {
  defaultTab?: string
  variant?: "badge" | "underline"
  children: React.ReactNode
  className?: string
}

interface DashflowTabsContextValue {
  activeTab: string
  setActiveTab: (tab: string) => void
  variant: "badge" | "underline"
}

const DashflowTabsContext = React.createContext<DashflowTabsContextValue | null>(null)

function useDashflowTabs() {
  const context = React.useContext(DashflowTabsContext)
  if (!context) {
    throw new Error('DashflowTabs components must be used within DashflowTabs')
  }
  return context
}

/**
 * DashflowTabs - Exact implementation from Dashflow X Webflow template
 *
 * Two variants:
 * 1. Badge style - Pills with background
 * 2. Underline style - Links with underline
 *
 * Based on Webflow's w-tabs component structure
 */
export function DashflowTabs({
  defaultTab = "Tab 1",
  variant = "badge",
  children,
  className
}: DashflowTabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab)

  return (
    <DashflowTabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
      <div
        data-current={activeTab}
        data-easing="ease"
        data-duration-in="300"
        data-duration-out="100"
        className={cn(
          "w-tabs",
          variant === "badge" && "flex-vertical align-center",
          className
        )}
      >
        {children}
      </div>
    </DashflowTabsContext.Provider>
  )
}

/**
 * DashflowTabsList - Container for tab triggers
 */
export function DashflowTabsList({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  const { variant } = useDashflowTabs()

  return (
    <div
      className={cn(
        "tabs-menu w-tab-menu",
        variant === "underline" && "links-single",
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * DashflowTabsTrigger - Individual tab button/link
 */
export function DashflowTabsTrigger({
  value,
  children,
  className
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const { activeTab, setActiveTab, variant } = useDashflowTabs()
  const isActive = activeTab === value

  const baseClass = variant === "badge"
    ? "tab-menu-badge-link"
    : "tab-menu-underline-link"

  return (
    <a
      data-w-tab={value}
      onClick={(e) => {
        e.preventDefault()
        setActiveTab(value)
      }}
      className={cn(
        baseClass,
        "w-inline-block w-tab-link",
        isActive && "w--current",
        className
      )}
    >
      <div>{children}</div>
    </a>
  )
}

/**
 * DashflowTabsContent - Container for all tab panels
 */
export function DashflowTabsContent({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("overflow-visible w-tab-content", className)}>
      {children}
    </div>
  )
}

/**
 * DashflowTabPanel - Individual tab content panel
 */
export function DashflowTabPanel({
  value,
  children,
  className
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const { activeTab } = useDashflowTabs()
  const isActive = activeTab === value

  return (
    <div
      data-w-tab={value}
      className={cn(
        "w-tab-pane",
        isActive && "w--tab-active",
        className
      )}
      style={{ display: isActive ? 'block' : 'none' }}
    >
      {children}
    </div>
  )
}

/**
 * Example usage - Badge variant:
 *
 * <DashflowTabs variant="badge" defaultTab="Tab 1">
 *   <DashflowTabsList>
 *     <DashflowTabsTrigger value="Tab 1">Tab item</DashflowTabsTrigger>
 *     <DashflowTabsTrigger value="Tab 2">Tab item</DashflowTabsTrigger>
 *     <DashflowTabsTrigger value="Tab 3">Tab item</DashflowTabsTrigger>
 *   </DashflowTabsList>
 *   <DashflowTabsContent>
 *     <DashflowTabPanel value="Tab 1">
 *       <div className="card pd-32px---24px">
 *         <img src="..." className="card-icon-square mg-bottom-16px" />
 *         <h3 className="text-200 bold">Card title</h3>
 *         <p className="mg-bottom-24px">Content here...</p>
 *       </div>
 *     </DashflowTabPanel>
 *     <DashflowTabPanel value="Tab 2">...</DashflowTabPanel>
 *     <DashflowTabPanel value="Tab 3">...</DashflowTabPanel>
 *   </DashflowTabsContent>
 * </DashflowTabs>
 *
 * Example usage - Underline variant:
 *
 * <DashflowTabs variant="underline" defaultTab="Tab 1">
 *   <DashflowTabsList>
 *     <DashflowTabsTrigger value="Tab 1">Tab item</DashflowTabsTrigger>
 *     <DashflowTabsTrigger value="Tab 2">Tab item</DashflowTabsTrigger>
 *     <DashflowTabsTrigger value="Tab 3">Tab item</DashflowTabsTrigger>
 *   </DashflowTabsList>
 *   <DashflowTabsContent>
 *     ...panels...
 *   </DashflowTabsContent>
 * </DashflowTabs>
 */
