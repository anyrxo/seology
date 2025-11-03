'use client'

/**
 * DASHFLOW CARD EXAMPLES
 *
 * This file demonstrates all the premium Dashflow X card variants
 * and how to use them in your dashboard.
 */

import {
  GlassCard,
  StatCard,
  ActionCard,
  InfoCard,
  CardGrid,
  StatCardSkeleton,
  ActionCardSkeleton,
  InfoCardSkeleton
} from './dashflow-card'
import { Badge } from './badge'
import {
  TrendingUp,
  Users,
  Globe,
  Zap,
  Settings,
  Bell,
  FileText,
  Plus,
  Link as LinkIcon
} from 'lucide-react'

export function DashflowCardExamples() {
  return (
    <div className="space-y-12 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">

      {/* Section 1: Glass Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">1. Glass Cards - Base Components</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard variant="light" hover="lift">
            <h3 className="text-lg font-semibold text-white mb-2">Light Variant</h3>
            <p className="text-gray-400 text-sm">
              Subtle glass effect with light background. Perfect for secondary content.
            </p>
          </GlassCard>

          <GlassCard variant="medium" hover="glow" borderGradient>
            <h3 className="text-lg font-semibold text-white mb-2">Medium with Border Gradient</h3>
            <p className="text-gray-400 text-sm">
              Standard glass effect with animated gradient border on hover.
            </p>
          </GlassCard>

          <GlassCard variant="glow" hover="scale" shimmer innerGlow>
            <h3 className="text-lg font-semibold text-white mb-2">Glow with Effects</h3>
            <p className="text-gray-400 text-sm">
              Premium glow effect with shimmer and inner glow animations.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Section 2: Stat Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">2. Stat Cards - Dashboard Metrics</h2>

        <CardGrid cols={4}>
          <StatCard
            title="Total Sites"
            value="24"
            icon={Globe}
            color="blue"
            trend={{ value: 12, label: 'vs last month', positive: true }}
            delay={0}
          />

          <StatCard
            title="Active Users"
            value="1,234"
            icon={Users}
            color="purple"
            trend={{ value: 8, label: 'vs last week', positive: true }}
            delay={100}
          />

          <StatCard
            title="Fixes Applied"
            value="3,456"
            icon={Zap}
            color="green"
            trend={{ value: 24, label: 'this month', positive: true }}
            delay={200}
          />

          <StatCard
            title="Issues Found"
            value="89"
            icon={TrendingUp}
            color="orange"
            trend={{ value: 5, label: 'vs yesterday', positive: false }}
            delay={300}
          />
        </CardGrid>
      </section>

      {/* Section 3: Stat Card Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">3. Stat Card Color Variants</h2>

        <CardGrid cols={3}>
          <StatCard
            title="Blue Theme"
            value="100"
            icon={Globe}
            color="blue"
          />

          <StatCard
            title="Purple Theme"
            value="200"
            icon={Zap}
            color="purple"
          />

          <StatCard
            title="Green Theme"
            value="300"
            icon={TrendingUp}
            color="green"
          />

          <StatCard
            title="Red Theme"
            value="400"
            icon={Bell}
            color="red"
          />

          <StatCard
            title="Orange Theme"
            value="500"
            icon={Settings}
            color="orange"
          />

          <StatCard
            title="Cyan Theme"
            value="600"
            icon={Users}
            color="cyan"
          />
        </CardGrid>
      </section>

      {/* Section 4: Action Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">4. Action Cards - Interactive Actions</h2>

        <CardGrid cols={2}>
          <ActionCard
            title="Connect New Site"
            description="Link your website to start SEO optimization"
            icon={Plus}
            onClick={() => alert('Connect site clicked!')}
            badge="Popular"
            badgeVariant="success"
          />

          <ActionCard
            title="Configure Settings"
            description="Customize your dashboard preferences"
            icon={Settings}
            onClick={() => alert('Settings clicked!')}
          />

          <ActionCard
            title="View Documentation"
            description="Learn how to use SEOLOGY.AI effectively"
            icon={FileText}
            onClick={() => alert('Docs clicked!')}
            showArrow={true}
          />

          <ActionCard
            title="Disabled Action"
            description="This action is currently unavailable"
            icon={LinkIcon}
            disabled={true}
          />
        </CardGrid>
      </section>

      {/* Section 5: Info Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">5. Info Cards - Content Display</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            title="Basic Info Card"
            description="Simple card for displaying information"
            variant="default"
          >
            <p className="text-gray-400 text-sm">
              This is the card body content. You can put any React components here
              including text, images, forms, or custom elements.
            </p>
          </InfoCard>

          <InfoCard
            title="Card with Icon"
            description="Enhanced with an icon and badge"
            icon={Bell}
            badge={<Badge variant="info" size="sm">New</Badge>}
            variant="bordered"
          >
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">
                Icon and badge add visual hierarchy and context to your cards.
              </p>
              <div className="flex gap-2">
                <Badge variant="success">Active</Badge>
                <Badge variant="warning">Pending</Badge>
              </div>
            </div>
          </InfoCard>

          <InfoCard
            title="Collapsible Card"
            description="Click to expand or collapse"
            icon={Settings}
            collapsible={true}
            defaultExpanded={false}
            variant="elevated"
          >
            <div className="space-y-3">
              <p className="text-gray-400 text-sm">
                This card can be collapsed to save space on your dashboard.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Feature 1: Automatic collapsing</li>
                <li>• Feature 2: Smooth animations</li>
                <li>• Feature 3: Preserved state</li>
              </ul>
            </div>
          </InfoCard>

          <InfoCard
            title="Card with Footer"
            description="Includes action footer area"
            icon={FileText}
            variant="elevated"
            footer={
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Last updated: 2 hours ago</span>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                  View Details
                </button>
              </div>
            }
          >
            <p className="text-gray-400 text-sm">
              Footer section is perfect for timestamps, actions, or metadata.
            </p>
          </InfoCard>
        </div>
      </section>

      {/* Section 6: Loading States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">6. Loading Skeleton States</h2>

        <CardGrid cols={4}>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </CardGrid>

        <CardGrid cols={2}>
          <ActionCardSkeleton />
          <ActionCardSkeleton />
        </CardGrid>

        <InfoCardSkeleton />
      </section>

      {/* Section 7: Real-world Dashboard Layout */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">7. Real-World Dashboard Layout</h2>

        {/* Stats Row */}
        <CardGrid cols={4}>
          <StatCard
            title="Sites Connected"
            value="12"
            icon={Globe}
            color="blue"
            trend={{ value: 3, positive: true }}
          />
          <StatCard
            title="Issues Fixed"
            value="456"
            icon={Zap}
            color="green"
            trend={{ value: 15, positive: true }}
          />
          <StatCard
            title="Active Issues"
            value="23"
            icon={Bell}
            color="orange"
            trend={{ value: 8, positive: false }}
          />
          <StatCard
            title="Success Rate"
            value="94%"
            icon={TrendingUp}
            color="purple"
            trend={{ value: 2, positive: true }}
          />
        </CardGrid>

        {/* Action Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Quick Scan"
            description="Run immediate SEO analysis"
            icon={Zap}
            onClick={() => alert('Scanning...')}
          />
          <ActionCard
            title="Add Site"
            description="Connect another website"
            icon={Plus}
            onClick={() => alert('Adding site...')}
            badge="New"
            badgeVariant="success"
          />
          <ActionCard
            title="View Reports"
            description="Check detailed analytics"
            icon={FileText}
            onClick={() => alert('Loading reports...')}
          />
        </div>

        {/* Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            title="Recent Activity"
            description="Latest SEO fixes and updates"
            icon={Bell}
            variant="elevated"
            footer={
              <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                View All Activity →
              </button>
            }
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                <div>
                  <p className="text-white text-sm font-medium">Fixed meta descriptions</p>
                  <p className="text-gray-400 text-xs">example.com • 5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                <div>
                  <p className="text-white text-sm font-medium">Updated alt tags</p>
                  <p className="text-gray-400 text-xs">shop.example.com • 1 hour ago</p>
                </div>
              </div>
            </div>
          </InfoCard>

          <InfoCard
            title="System Status"
            description="All systems operational"
            icon={Settings}
            badge={<Badge variant="success" dot pulse>Live</Badge>}
            variant="elevated"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">API Status</span>
                <Badge variant="success" size="sm">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">AI Processing</span>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Database</span>
                <Badge variant="success" size="sm">Connected</Badge>
              </div>
            </div>
          </InfoCard>
        </div>
      </section>

    </div>
  )
}

export default DashflowCardExamples
