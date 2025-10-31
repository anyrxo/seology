'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

export default function SettingsPage() {
  const [executionMode, setExecutionMode] = useState<'AUTOMATIC' | 'PLAN' | 'APPROVE'>('APPROVE')
  const [notifications, setNotifications] = useState({
    email: true,
    issuesDetected: true,
    fixesApplied: true,
    weeklyReport: false,
  })

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account preferences and SEO automation settings
        </p>
      </div>

      {/* Execution Mode */}
      <Card>
        <CardHeader>
          <CardTitle>Execution Mode</CardTitle>
          <CardDescription>
            Choose how Seology applies SEO fixes to your websites
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ExecutionModeOption
            mode="AUTOMATIC"
            title="Automatic"
            description="Fixes are applied immediately without review"
            benefits={[
              'Fastest SEO improvements',
              'Zero manual work required',
              'Daily email summary only'
            ]}
            recommended={false}
            selected={executionMode === 'AUTOMATIC'}
            onSelect={() => setExecutionMode('AUTOMATIC')}
          />

          <ExecutionModeOption
            mode="PLAN"
            title="Plan Mode"
            description="Review the plan, then execute all fixes at once"
            benefits={[
              'See what will change before it happens',
              'Batch approval for efficiency',
              'Balanced control and automation'
            ]}
            recommended={true}
            selected={executionMode === 'PLAN'}
            onSelect={() => setExecutionMode('PLAN')}
          />

          <ExecutionModeOption
            mode="APPROVE"
            title="Approve Each Fix"
            description="Manually approve every single fix before application"
            benefits={[
              'Maximum control over all changes',
              'Perfect for brand-sensitive sites',
              'Instant notification for each issue'
            ]}
            recommended={false}
            selected={executionMode === 'APPROVE'}
            onSelect={() => setExecutionMode('APPROVE')}
          />

          <div className="flex justify-end pt-4">
            <Button className="bg-green-600 hover:bg-green-700">
              Save Execution Mode
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Choose what updates you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <NotificationToggle
            label="Email Notifications"
            description="Receive notifications via email"
            checked={notifications.email}
            onChange={(checked) => setNotifications({ ...notifications, email: checked })}
          />
          <NotificationToggle
            label="Issues Detected"
            description="Alert me when new SEO issues are found"
            checked={notifications.issuesDetected}
            onChange={(checked) => setNotifications({ ...notifications, issuesDetected: checked })}
          />
          <NotificationToggle
            label="Fixes Applied"
            description="Notify me when fixes are successfully applied"
            checked={notifications.fixesApplied}
            onChange={(checked) => setNotifications({ ...notifications, fixesApplied: checked })}
          />
          <NotificationToggle
            label="Weekly Report"
            description="Receive a weekly summary of SEO improvements"
            checked={notifications.weeklyReport}
            onChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
          />

          <div className="flex justify-end pt-4">
            <Button className="bg-green-600 hover:bg-green-700">
              Save Notification Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            View your account details and subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-medium">Current Plan</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Starter - $297/month
              </div>
            </div>
            <Button variant="outline">Upgrade Plan</Button>
          </div>
          <div className="flex items-center justify-between border-t py-3">
            <div>
              <div className="font-medium">Sites Connected</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                3 of 3 sites used
              </div>
            </div>
            <Button variant="outline" disabled>Add Site</Button>
          </div>
          <div className="flex items-center justify-between border-t py-3">
            <div>
              <div className="font-medium">Fixes This Month</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                127 of 500 fixes used
              </div>
            </div>
            <div className="text-sm text-gray-500">Resets in 12 days</div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Delete Account</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Permanently delete your account and all data
              </div>
            </div>
            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ExecutionModeOption({
  mode,
  title,
  description,
  benefits,
  recommended,
  selected,
  onSelect,
}: {
  mode: string
  title: string
  description: string
  benefits: string[]
  recommended: boolean
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={`relative w-full rounded-lg border-2 p-6 text-left transition-all ${
        selected
          ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
          : 'border-gray-200 hover:border-green-300 dark:border-gray-800'
      }`}
    >
      {recommended && (
        <Badge variant="success" className="absolute -top-3 right-4">
          Recommended
        </Badge>
      )}
      <div className="flex items-start gap-4">
        <div
          className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
            selected
              ? 'border-green-600 bg-green-600'
              : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          {selected && <Check className="h-3 w-3 text-white" />}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
          <ul className="mt-3 space-y-2">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  )
}

function NotificationToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}
