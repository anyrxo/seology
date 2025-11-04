// ============================================================================
// SEOLOGY.AI - Supabase Realtime Integration (OPTIONAL)
// ============================================================================
// Purpose: Real-time subscriptions for live updates
// Status: STUB IMPLEMENTATION - Install @supabase/supabase-js to enable
// ============================================================================

// ============================================================================
// INSTALLATION INSTRUCTIONS
// ============================================================================
// This is a STUB implementation. To enable Realtime features:
//
// 1. Install Supabase client:
//    npm install @supabase/supabase-js
//
// 2. Add environment variables to .env.local:
//    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
//    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
//
// 3. Enable Realtime in Supabase Dashboard:
//    Database > Replication > Enable
//
// 4. Add tables to publication:
//    Database > Publications > supabase_realtime
//    Add: Crawl, Issue, Fix, Job, Notification, etc.
//
// 5. Replace this stub with full implementation from:
//    https://supabase.com/docs/guides/realtime
// ============================================================================

export interface RealtimeConfig {
  enabled: boolean
  message: string
}

// Check if Realtime is configured
export function getRealtimeStatus(): RealtimeConfig {
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!hasUrl || !hasKey) {
    return {
      enabled: false,
      message: 'Supabase Realtime not configured. This is optional - app works without it.',
    }
  }

  // Check if package is installed
  try {
    require('@supabase/supabase-js')
    return {
      enabled: true,
      message: 'Supabase Realtime is configured and ready',
    }
  } catch {
    return {
      enabled: false,
      message: 'Install @supabase/supabase-js to enable Realtime features',
    }
  }
}

export function isRealtimeEnabled(): boolean {
  return getRealtimeStatus().enabled
}

// ============================================================================
// STUB IMPLEMENTATIONS (return null until package is installed)
// ============================================================================

export function subscribeToCrawlUpdates(
  _connectionId: number,
  _callback: (payload: unknown) => void
): null {
  console.warn('Supabase Realtime not configured. Install @supabase/supabase-js to enable.')
  return null
}

export function subscribeToIssueUpdates(
  _connectionId: number,
  _callback: (payload: unknown) => void
): null {
  console.warn('Supabase Realtime not configured. Install @supabase/supabase-js to enable.')
  return null
}

export function subscribeToFixUpdates(
  _connectionId: number,
  _callback: (payload: unknown) => void
): null {
  console.warn('Supabase Realtime not configured. Install @supabase/supabase-js to enable.')
  return null
}

export function subscribeToJobUpdates(
  _callback: (payload: unknown) => void
): null {
  console.warn('Supabase Realtime not configured. Install @supabase/supabase-js to enable.')
  return null
}

export function subscribeToUserNotifications(
  _userId: number,
  _callback: (payload: unknown) => void
): null {
  console.warn('Supabase Realtime not configured. Install @supabase/supabase-js to enable.')
  return null
}

export function subscribeToHealthScoreUpdates(
  _connectionId: number,
  _callback: (payload: unknown) => void
): null {
  console.warn('Supabase Realtime not configured. Install @supabase/supabase-js to enable.')
  return null
}

export function unsubscribeAll(): void {
  // No-op when not configured
}

// ============================================================================
// USAGE NOTES
// ============================================================================
// Current State: STUB IMPLEMENTATION
// - All subscription functions return null
// - App works normally without Realtime
// - UI should poll for updates instead (already implemented)
//
// When to implement:
// - When real-time updates become critical
// - When polling creates too much load
// - When collaborative features are needed
//
// Alternative: Use polling in components
// - useEffect with setInterval for updates
// - API routes already return latest data
// - Good enough for most use cases
// ============================================================================
