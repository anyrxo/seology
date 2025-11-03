'use client'

import { useDashboardStats } from '@/lib/hooks/useDashboardStats'
import Link from 'next/link'

export function DashboardClient({ userName }: { userName: string }) {
  const { stats, isLoading } = useDashboardStats()

  if (isLoading || !stats) {
    return <DashboardSkeleton />
  }

  return (
    <div className="container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Welcome Header using Dashflow X typography */}
        <div className="mg-bottom-48px">
          <h1 className="display-1 color-neutral-800 mg-bottom-12px">
            Welcome back, {userName}!
          </h1>
          <p className="text-200 color-neutral-600">
            Here's what's happening with your SEO automation
          </p>
        </div>

        {/* Stats Grid using actual Dashflow X cards */}
        <div className="grid-4-columns _1-column-tablet gap-row-32px">
          {/* Sites Connected Card */}
          <div className="card pd-24px">
            <div className="mg-bottom-16px">
              <div className="text-100 medium color-neutral-600 mg-bottom-8px">Sites Connected</div>
              <div className="display-2 color-neutral-800">{stats.sitesCount}</div>
            </div>
            <div className="flex-horizontal gap-column-8px align-center">
              <div className="badge green">
                <div className="text-50 medium">{stats.sitesCount > 0 ? 'Active' : 'Get started'}</div>
              </div>
            </div>
          </div>

          {/* Issues Detected Card */}
          <div className="card pd-24px">
            <div className="mg-bottom-16px">
              <div className="text-100 medium color-neutral-600 mg-bottom-8px">Issues Detected</div>
              <div className="display-2 color-neutral-800">{stats.activeIssuesCount}</div>
            </div>
            <div className="flex-horizontal gap-column-8px align-center">
              <div className={`badge ${stats.activeIssuesCount > 0 ? 'red' : 'green'}`}>
                <div className="text-50 medium">
                  {stats.activeIssuesCount > 0 ? 'Needs attention' : 'All clear'}
                </div>
              </div>
            </div>
          </div>

          {/* Fixes Applied Card */}
          <div className="card pd-24px">
            <div className="mg-bottom-16px">
              <div className="text-100 medium color-neutral-600 mg-bottom-8px">Fixes Applied</div>
              <div className="display-2 color-neutral-800">{stats.fixesThisMonth}</div>
            </div>
            <div className="flex-horizontal gap-column-8px align-center">
              <div className="badge green">
                <div className="text-50 medium">This month</div>
              </div>
            </div>
          </div>

          {/* Usage Card */}
          <div className="card pd-24px">
            <div className="mg-bottom-16px">
              <div className="text-100 medium color-neutral-600 mg-bottom-8px">Usage This Month</div>
              <div className="display-2 color-neutral-800">{stats.usagePercent}%</div>
            </div>
            <div className="flex-horizontal gap-column-8px align-center">
              <div className={`badge ${stats.usagePercent < 80 ? 'green' : 'orange'}`}>
                <div className="text-50 medium">
                  {stats.fixesThisMonth}/{stats.fixLimit} fixes
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Progress Bar */}
        {stats.usagePercent > 0 && (
          <div className="card pd-32px---24px">
            <div className="flex-horizontal space-between align-center mg-bottom-16px">
              <h3 className="heading-h4-size color-neutral-800">Monthly Usage</h3>
              <div className={`badge ${
                stats.usagePercent >= 90 ? 'red' :
                stats.usagePercent >= 70 ? 'orange' : 'green'
              }`}>
                <div className="text-100 medium">
                  {stats.fixesThisMonth} / {stats.fixLimit} fixes
                </div>
              </div>
            </div>
            <div className="progress-bar-wrapper">
              <div className="progress-bar-bg">
                <div
                  className={`progress-bar ${
                    stats.usagePercent >= 90 ? 'red' :
                    stats.usagePercent >= 70 ? 'orange' : 'green'
                  }`}
                  style={{ width: `${stats.usagePercent}%` }}
                ></div>
              </div>
            </div>
            {stats.usagePercent >= 90 && (
              <p className="text-100 color-neutral-600 mg-top-12px">
                You're approaching your monthly limit. Consider upgrading your plan.
              </p>
            )}
          </div>
        )}

        {/* Quick Actions using Dashflow X buttons */}
        <div className="card pd-32px---24px">
          <h2 className="heading-h3-size color-neutral-800 mg-bottom-32px">Quick Actions</h2>
          <div className="grid-3-columns _1-column-mbl gap-row-24px">
            <Link href="/dashboard/sites/connect" className="btn-primary large">
              <div className="flex-horizontal gap-column-4px">
                <div>Connect Your First Site</div>
              </div>
            </Link>
            <Link href="/dashboard/analytics" className="btn-secondary large">
              <div className="flex-horizontal gap-column-4px">
                <div>View Analytics</div>
              </div>
            </Link>
            <Link href="/dashboard/billing" className="btn-primary large">
              <div className="flex-horizontal gap-column-4px">
                <div>Upgrade Plan</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card pd-32px---24px">
          <div className="flex-horizontal space-between align-center mg-bottom-24px">
            <h2 className="heading-h3-size color-neutral-800">Recent Activity</h2>
            <Link href="/dashboard/sites" className="text-100 medium color-accent-1 hover-neutral-800">
              View All →
            </Link>
          </div>
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="grid-1-column gap-row-12px">
              {stats.recentActivity.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/dashboard/sites/${activity.id}`}
                  className="card pd-16px hover-card-link"
                >
                  <div className="flex-horizontal space-between align-center">
                    <div className="flex-horizontal gap-column-16px align-center">
                      <div className="text-300">
                        {{
                          SHOPIFY: '🛍️',
                          WORDPRESS: '📝',
                          WIX: '🎨',
                          CUSTOM: '⚡',
                        }[activity.platform] || '🌐'}
                      </div>
                      <div>
                        <p className="text-100 medium color-neutral-800">
                          {activity.displayName || activity.domain}
                        </p>
                        <p className="text-100 color-neutral-600">
                          {activity.issuesCount} active issues • {activity.fixesCount} fixes this month
                        </p>
                      </div>
                    </div>
                    <div className="text-200 color-neutral-600">→</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon-wrapper">
                <div className="text-400">📈</div>
              </div>
              <div className="text-center mg-top-16px">
                <p className="text-200 medium color-neutral-800 mg-bottom-8px">No activity yet</p>
                <p className="text-100 color-neutral-600">
                  Connect a site to start seeing SEO automation in action
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Getting Started Checklist */}
        {stats.sitesCount === 0 && (
          <div className="card pd-32px---24px">
            <h2 className="heading-h4-size color-neutral-800 mg-bottom-24px">
              Getting Started
            </h2>
            <div className="grid-1-column gap-row-16px">
              <ChecklistItem completed={false} text="Connect your first site" />
              <ChecklistItem completed={false} text="Run your first SEO analysis" />
              <ChecklistItem completed={false} text="Apply AI-powered fixes" />
              <ChecklistItem completed={false} text="Review your analytics" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ChecklistItem({ completed, text }: { completed: boolean; text: string }) {
  return (
    <div className="flex-horizontal gap-column-12px align-center">
      <div className={`checkbox ${completed ? 'checked' : ''}`}>
        {completed && <span className="text-50">✓</span>}
      </div>
      <span className={`text-100 medium ${completed ? 'color-neutral-500' : 'color-neutral-800'}`}>
        {text}
      </span>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header skeleton */}
        <div>
          <div className="skeleton-box" style={{ height: '48px', width: '400px', marginBottom: '12px' }}></div>
          <div className="skeleton-box" style={{ height: '24px', width: '320px' }}></div>
        </div>

        {/* Stats grid skeleton */}
        <div className="grid-4-columns _1-column-tablet gap-row-32px">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card pd-24px">
              <div className="skeleton-box" style={{ height: '16px', width: '120px', marginBottom: '16px' }}></div>
              <div className="skeleton-box" style={{ height: '64px', width: '80px' }}></div>
            </div>
          ))}
        </div>

        {/* Actions skeleton */}
        <div className="card pd-32px---24px">
          <div className="skeleton-box" style={{ height: '32px', width: '160px', marginBottom: '32px' }}></div>
          <div className="grid-3-columns _1-column-mbl gap-row-24px">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-box" style={{ height: '48px' }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
