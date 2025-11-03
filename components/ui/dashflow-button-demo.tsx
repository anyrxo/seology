'use client'

import {
  DashflowButton,
  DashflowButtonPrimary,
  DashflowButtonSecondary,
  DashflowButtonGhost,
  DashflowButtonIcon
} from './dashflow-button'
import { Sparkles, ArrowRight, Download, Settings, Zap, Save } from 'lucide-react'

/**
 * Dashflow Button Component Demo
 *
 * This file demonstrates all button variants and their usage patterns.
 * Use this as a reference for implementing buttons throughout the dashboard.
 */

export function DashflowButtonDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Dashflow X Button Library
          </h1>
          <p className="text-gray-400 text-lg">
            Premium button components with animations and accessibility
          </p>
        </div>

        {/* Primary Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Primary Buttons</h2>
          <p className="text-gray-400">
            Gradient background with glow effect. Use for primary actions.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <DashflowButtonPrimary size="sm">
              Small Button
            </DashflowButtonPrimary>

            <DashflowButtonPrimary size="md">
              Medium Button
            </DashflowButtonPrimary>

            <DashflowButtonPrimary size="lg">
              Large Button
            </DashflowButtonPrimary>

            <DashflowButtonPrimary size="xl">
              Extra Large
            </DashflowButtonPrimary>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <DashflowButtonPrimary leftIcon={<Sparkles className="h-4 w-4" />}>
              With Left Icon
            </DashflowButtonPrimary>

            <DashflowButtonPrimary rightIcon={<ArrowRight className="h-4 w-4" />}>
              With Right Icon
            </DashflowButtonPrimary>

            <DashflowButtonPrimary
              leftIcon={<Download className="h-4 w-4" />}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Both Icons
            </DashflowButtonPrimary>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <DashflowButtonPrimary isLoading>
              Loading...
            </DashflowButtonPrimary>

            <DashflowButtonPrimary isLoading loadingText="Saving...">
              Save Changes
            </DashflowButtonPrimary>

            <DashflowButtonPrimary disabled>
              Disabled Button
            </DashflowButtonPrimary>
          </div>
        </section>

        {/* Secondary Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Secondary Buttons</h2>
          <p className="text-gray-400">
            Glass-morphism style with backdrop blur. Use for secondary actions.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <DashflowButtonSecondary size="sm">
              Small
            </DashflowButtonSecondary>

            <DashflowButtonSecondary size="md">
              Medium
            </DashflowButtonSecondary>

            <DashflowButtonSecondary size="lg">
              Large
            </DashflowButtonSecondary>

            <DashflowButtonSecondary size="xl">
              Extra Large
            </DashflowButtonSecondary>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <DashflowButtonSecondary leftIcon={<Settings className="h-4 w-4" />}>
              Settings
            </DashflowButtonSecondary>

            <DashflowButtonSecondary isLoading>
              Processing...
            </DashflowButtonSecondary>

            <DashflowButtonSecondary disabled>
              Disabled
            </DashflowButtonSecondary>
          </div>
        </section>

        {/* Ghost Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Ghost Buttons</h2>
          <p className="text-gray-400">
            Transparent with border, smooth fill on hover. Use for tertiary actions.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <DashflowButtonGhost size="sm">
              Small
            </DashflowButtonGhost>

            <DashflowButtonGhost size="md">
              Medium
            </DashflowButtonGhost>

            <DashflowButtonGhost size="lg">
              Large
            </DashflowButtonGhost>

            <DashflowButtonGhost size="xl">
              Extra Large
            </DashflowButtonGhost>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <DashflowButtonGhost leftIcon={<Zap className="h-4 w-4" />}>
              Quick Action
            </DashflowButtonGhost>

            <DashflowButtonGhost isLoading>
              Loading...
            </DashflowButtonGhost>

            <DashflowButtonGhost disabled>
              Disabled
            </DashflowButtonGhost>
          </div>
        </section>

        {/* Icon Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Icon Buttons</h2>
          <p className="text-gray-400">
            Circular buttons with icon only. Includes glow and rotation on hover.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <DashflowButtonIcon ariaLabel="Settings">
              <Settings className="h-5 w-5" />
            </DashflowButtonIcon>

            <DashflowButtonIcon ariaLabel="Download">
              <Download className="h-5 w-5" />
            </DashflowButtonIcon>

            <DashflowButtonIcon ariaLabel="Save">
              <Save className="h-5 w-5" />
            </DashflowButtonIcon>

            <DashflowButtonIcon ariaLabel="Sparkles">
              <Sparkles className="h-5 w-5" />
            </DashflowButtonIcon>

            <DashflowButtonIcon isLoading ariaLabel="Loading">
              <Settings className="h-5 w-5" />
            </DashflowButtonIcon>

            <DashflowButtonIcon disabled ariaLabel="Disabled">
              <Settings className="h-5 w-5" />
            </DashflowButtonIcon>
          </div>
        </section>

        {/* Unified API */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Unified Button Component</h2>
          <p className="text-gray-400">
            Use the DashflowButton component with variant prop for consistent API.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <DashflowButton variant="primary">
              Primary
            </DashflowButton>

            <DashflowButton variant="secondary">
              Secondary
            </DashflowButton>

            <DashflowButton variant="ghost">
              Ghost
            </DashflowButton>

            <DashflowButton
              variant="icon"
              ariaLabel="Icon Button"
            >
              <Settings className="h-5 w-5" />
            </DashflowButton>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Interactive Examples</h2>
          <p className="text-gray-400">
            Click buttons to see ripple effects and animations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Form Actions</h3>
              <div className="flex gap-3">
                <DashflowButtonSecondary>
                  Cancel
                </DashflowButtonSecondary>
                <DashflowButtonPrimary leftIcon={<Save className="h-4 w-4" />}>
                  Save Changes
                </DashflowButtonPrimary>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Call to Action</h3>
              <div className="flex gap-3">
                <DashflowButtonPrimary
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Get Started
                </DashflowButtonPrimary>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Loading States</h3>
              <div className="flex gap-3">
                <DashflowButtonPrimary isLoading loadingText="Analyzing...">
                  Analyze Site
                </DashflowButtonPrimary>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Icon Actions</h3>
              <div className="flex gap-3">
                <DashflowButtonIcon ariaLabel="Settings">
                  <Settings className="h-5 w-5" />
                </DashflowButtonIcon>
                <DashflowButtonIcon ariaLabel="Download">
                  <Download className="h-5 w-5" />
                </DashflowButtonIcon>
                <DashflowButtonIcon ariaLabel="Quick Action">
                  <Zap className="h-5 w-5" />
                </DashflowButtonIcon>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Usage Guidelines</h2>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">When to use each variant:</h3>
              <ul className="text-gray-400 space-y-2 ml-6 list-disc">
                <li><strong className="text-white">Primary:</strong> Main action on a page (Submit, Save, Continue, Get Started)</li>
                <li><strong className="text-white">Secondary:</strong> Secondary actions (Cancel, Back, Learn More)</li>
                <li><strong className="text-white">Ghost:</strong> Tertiary actions, less important options</li>
                <li><strong className="text-white">Icon:</strong> Quick actions in toolbars, minimal space contexts</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Accessibility:</h3>
              <ul className="text-gray-400 space-y-2 ml-6 list-disc">
                <li>All buttons include proper ARIA labels and keyboard navigation</li>
                <li>Minimum 44px tap targets for touch devices</li>
                <li>Loading and disabled states properly communicated to screen readers</li>
                <li>Focus indicators visible for keyboard navigation</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
