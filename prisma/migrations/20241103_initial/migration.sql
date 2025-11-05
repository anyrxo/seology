-- Performance Optimization: Database Indexes
-- Run with: psql $DATABASE_URL < prisma/migrations/add_performance_indexes.sql

-- User lookups by Clerk ID (most common query)
CREATE INDEX IF NOT EXISTS idx_user_clerk_id ON "User"("clerkId");

-- Connection queries
CREATE INDEX IF NOT EXISTS idx_connection_user_id ON "Connection"("userId");
CREATE INDEX IF NOT EXISTS idx_connection_team_id ON "Connection"("teamId");
CREATE INDEX IF NOT EXISTS idx_connection_status ON "Connection"("status");
CREATE INDEX IF NOT EXISTS idx_connection_user_status ON "Connection"("userId", "status");

-- Issue queries (frequently filtered by status and connection)
CREATE INDEX IF NOT EXISTS idx_issue_connection_id ON "Issue"("connectionId");
CREATE INDEX IF NOT EXISTS idx_issue_status ON "Issue"("status");
CREATE INDEX IF NOT EXISTS idx_issue_severity ON "Issue"("severity");
CREATE INDEX IF NOT EXISTS idx_issue_connection_status ON "Issue"("connectionId", "status");
CREATE INDEX IF NOT EXISTS idx_issue_detected_at ON "Issue"("detectedAt" DESC);

-- Fix queries (frequently filtered by connection and status)
CREATE INDEX IF NOT EXISTS idx_fix_connection_id ON "Fix"("connectionId");
CREATE INDEX IF NOT EXISTS idx_fix_status ON "Fix"("status");
CREATE INDEX IF NOT EXISTS idx_fix_issue_id ON "Fix"("issueId");
CREATE INDEX IF NOT EXISTS idx_fix_connection_status ON "Fix"("connectionId", "status");
CREATE INDEX IF NOT EXISTS idx_fix_created_at ON "Fix"("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_fix_applied_at ON "Fix"("appliedAt" DESC) WHERE "appliedAt" IS NOT NULL;

-- Metric queries (time-series data)
CREATE INDEX IF NOT EXISTS idx_metric_connection_id ON "Metric"("connectionId");
CREATE INDEX IF NOT EXISTS idx_metric_date ON "Metric"("date" DESC);
CREATE INDEX IF NOT EXISTS idx_metric_connection_date ON "Metric"("connectionId", "date" DESC);

-- Notification queries
CREATE INDEX IF NOT EXISTS idx_notification_user_id ON "Notification"("userId");
CREATE INDEX IF NOT EXISTS idx_notification_read ON "Notification"("read");
CREATE INDEX IF NOT EXISTS idx_notification_user_read ON "Notification"("userId", "read");
CREATE INDEX IF NOT EXISTS idx_notification_created_at ON "Notification"("createdAt" DESC);

-- Audit log queries (time-based searches)
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON "AuditLog"("userId");
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON "AuditLog"("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON "AuditLog"("action");

-- Crawl queries
CREATE INDEX IF NOT EXISTS idx_crawl_connection_id ON "Crawl"("connectionId");
CREATE INDEX IF NOT EXISTS idx_crawl_status ON "Crawl"("status");
CREATE INDEX IF NOT EXISTS idx_crawl_created_at ON "Crawl"("createdAt" DESC);

-- Subscription queries
CREATE INDEX IF NOT EXISTS idx_subscription_user_id ON "Subscription"("userId");
CREATE INDEX IF NOT EXISTS idx_subscription_status ON "Subscription"("status");
CREATE INDEX IF NOT EXISTS idx_subscription_period_end ON "Subscription"("currentPeriodEnd");

-- Team queries
CREATE INDEX IF NOT EXISTS idx_team_owner_id ON "Team"("ownerId");
CREATE INDEX IF NOT EXISTS idx_team_member_team_id ON "TeamMember"("teamId");
CREATE INDEX IF NOT EXISTS idx_team_member_user_id ON "TeamMember"("userId");
CREATE INDEX IF NOT EXISTS idx_team_invitation_team_id ON "TeamInvitation"("teamId");
CREATE INDEX IF NOT EXISTS idx_team_invitation_email ON "TeamInvitation"("email");
CREATE INDEX IF NOT EXISTS idx_team_invitation_token ON "TeamInvitation"("token");
CREATE INDEX IF NOT EXISTS idx_team_invitation_status ON "TeamInvitation"("status");

-- Webhook queries
CREATE INDEX IF NOT EXISTS idx_webhook_user_id ON "Webhook"("userId");
CREATE INDEX IF NOT EXISTS idx_webhook_enabled ON "Webhook"("enabled");

-- CSRF token queries
CREATE INDEX IF NOT EXISTS idx_csrf_token_user_id ON "CSRFToken"("userId");
CREATE INDEX IF NOT EXISTS idx_csrf_token_token ON "CSRFToken"("token");
CREATE INDEX IF NOT EXISTS idx_csrf_token_expires_at ON "CSRFToken"("expiresAt");

-- Partial indexes for better performance on specific queries
CREATE INDEX IF NOT EXISTS idx_issue_open_critical ON "Issue"("connectionId", "detectedAt" DESC)
  WHERE "status" = 'OPEN' AND "severity" = 'CRITICAL';

CREATE INDEX IF NOT EXISTS idx_fix_this_month ON "Fix"("connectionId", "createdAt" DESC)
  WHERE "createdAt" >= date_trunc('month', CURRENT_DATE);

-- Analyze tables to update statistics
ANALYZE "User";
ANALYZE "Connection";
ANALYZE "Issue";
ANALYZE "Fix";
ANALYZE "Metric";
ANALYZE "Notification";
ANALYZE "AuditLog";
ANALYZE "Subscription";
