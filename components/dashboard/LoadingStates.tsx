'use client'

/**
 * Loading States Examples for Dashboard
 * Shows how to use skeleton components with Suspense
 */

import { Suspense } from 'react'
import { SkeletonCard, SkeletonMetricCard, SkeletonStatsGrid } from '@/components/ui/skeleton-card'
import { SkeletonTable, SkeletonTableCard } from '@/components/ui/skeleton-table'
import { SkeletonText, SkeletonHeading } from '@/components/ui/skeleton-text'

// Dashboard Stats Loading
export function DashboardStatsLoading() {
  return <SkeletonStatsGrid count={4} />
}

// Sites Table Loading
export function SitesTableLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SkeletonHeading size="lg" />
        <div className="h-10 w-32 bg-white/10 rounded-lg shimmer" />
      </div>
      <SkeletonTableCard />
    </div>
  )
}

// Activity Feed Loading
export function ActivityFeedLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonCard key={i} showIcon iconPosition="left" lines={2} />
      ))}
    </div>
  )
}

// Issue Card Loading
export function IssueCardLoading() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-white/10 rounded w-3/4 shimmer" />
          <SkeletonText lines={2} />
        </div>
        <div className="w-20 h-8 bg-white/10 rounded-lg shimmer" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-16 h-6 bg-white/10 rounded shimmer" />
        <div className="w-24 h-6 bg-white/10 rounded shimmer" />
        <div className="w-20 h-6 bg-white/10 rounded shimmer" />
      </div>
    </div>
  )
}

// Site Details Loading
export function SiteDetailsLoading() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-xl shimmer" />
          <div className="space-y-2">
            <div className="h-6 bg-white/10 rounded w-48 shimmer" />
            <div className="h-4 bg-white/10 rounded w-32 shimmer" />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-32 h-10 bg-white/10 rounded-lg shimmer" />
          <div className="w-32 h-10 bg-white/10 rounded-lg shimmer" />
        </div>
      </div>

      {/* Stats */}
      <SkeletonStatsGrid count={4} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <SkeletonHeading size="md" />
          <div className="mt-6 h-64 bg-white/10 rounded shimmer" />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <SkeletonHeading size="md" />
          <div className="mt-6 h-64 bg-white/10 rounded shimmer" />
        </div>
      </div>

      {/* Recent Issues */}
      <div className="space-y-4">
        <SkeletonHeading size="lg" />
        {Array.from({ length: 3 }).map((_, i) => (
          <IssueCardLoading key={i} />
        ))}
      </div>
    </div>
  )
}

// Analytics Loading
export function AnalyticsLoading() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <SkeletonHeading size="xl" />
        <div className="flex gap-3">
          <div className="w-40 h-10 bg-white/10 rounded-lg shimmer" />
          <div className="w-32 h-10 bg-white/10 rounded-lg shimmer" />
        </div>
      </div>

      <SkeletonStatsGrid count={4} />

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <SkeletonHeading size="lg" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-16 h-8 bg-white/10 rounded shimmer" />
            ))}
          </div>
        </div>
        <div className="h-96 bg-white/10 rounded shimmer" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <SkeletonHeading size="md" />
            <div className="mt-6 space-y-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="flex items-center justify-between">
                  <div className="h-4 bg-white/10 rounded w-24 shimmer" />
                  <div className="h-4 bg-white/10 rounded w-16 shimmer" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Billing Page Loading
export function BillingLoading() {
  return (
    <div className="space-y-8">
      <SkeletonHeading size="xl" />

      {/* Current Plan */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <SkeletonHeading size="lg" />
            <SkeletonText lines={1} />
          </div>
          <div className="w-32 h-10 bg-white/10 rounded-lg shimmer" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonMetricCard key={i} />
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div>
        <SkeletonHeading size="lg" />
        <div className="mt-6">
          <SkeletonTable rows={5} columns={4} />
        </div>
      </div>
    </div>
  )
}

// Settings Page Loading
export function SettingsLoading() {
  return (
    <div className="space-y-8">
      <SkeletonHeading size="xl" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-white/10 rounded-lg shimmer" />
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <SkeletonHeading size="md" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-4 bg-white/10 rounded w-24 shimmer" />
                    <div className="h-10 bg-white/10 rounded shimmer" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3">
                <div className="w-24 h-10 bg-white/10 rounded-lg shimmer" />
                <div className="w-24 h-10 bg-white/10 rounded-lg shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
