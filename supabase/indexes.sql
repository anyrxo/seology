-- ============================================================================
-- SEOLOGY.AI - Performance Indexes & Database Roles
-- ============================================================================
-- Purpose: Optimize query performance and set up database roles
-- Priority: 🟠 HIGH - Significant performance impact
-- ============================================================================

-- ============================================================================
-- DATABASE ROLES
-- ============================================================================

-- Service Account Role (for backend operations)
CREATE ROLE seology_service WITH LOGIN PASSWORD 'CHANGE_THIS_PASSWORD_IN_SUPABASE_DASHBOARD';
GRANT CONNECT ON DATABASE postgres TO seology_service;
GRANT USAGE ON SCHEMA public TO seology_service;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO seology_service;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO seology_service;

-- Read-Only Role (for analytics and reporting)
CREATE ROLE seology_readonly WITH LOGIN PASSWORD 'CHANGE_THIS_PASSWORD_IN_SUPABASE_DASHBOARD';
GRANT CONNECT ON DATABASE postgres TO seology_readonly;
GRANT USAGE ON SCHEMA public TO seology_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO seology_readonly;

-- Admin Role (for migrations and schema changes)
CREATE ROLE seology_admin WITH LOGIN PASSWORD 'CHANGE_THIS_PASSWORD_IN_SUPABASE_DASHBOARD' SUPERUSER;

-- ============================================================================
-- COMPOSITE INDEXES (Most Important)
-- ============================================================================

-- Connection table: Filter by user and status
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_connection_user_status
ON "Connection" ("userId", "status")
WHERE "status" = 'CONNECTED';

-- Page table: Common query pattern (connection + SEO score)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_connection_score
ON "Page" ("connectionId", "seoScore" DESC NULLS LAST);

-- Page table: Find pages needing optimization
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_connection_score_low
ON "Page" ("connectionId", "seoScore")
WHERE "seoScore" < 70;

-- Issue table: Filter by connection and status
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_issue_connection_status
ON "Issue" ("connectionId", "status", "severity" DESC);

-- Issue table: Open issues by type
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_issue_connection_type_open
ON "Issue" ("connectionId", "type")
WHERE "status" = 'OPEN';

-- Fix table: Filter by connection and status
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_fix_connection_status
ON "Fix" ("connectionId", "status", "appliedAt" DESC NULLS LAST);

-- Fix table: Pending approvals
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_fix_connection_pending
ON "Fix" ("connectionId", "status")
WHERE "status" = 'PENDING';

-- Job table: Queue processing
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_job_status_priority
ON "Job" ("status", "priority" DESC, "createdAt" ASC)
WHERE "status" IN ('PENDING', 'PROCESSING');

-- Crawl table: Recent crawls by connection
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_crawl_connection_date
ON "Crawl" ("connectionId", "startedAt" DESC);

-- Keyword table: Search performance by connection
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_keyword_connection_volume
ON "Keyword" ("connectionId", "searchVolume" DESC NULLS LAST);

-- KeywordRanking table: Historical ranking data
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_keyword_ranking_keyword_date
ON "KeywordRanking" ("keywordId", "date" DESC);

-- PageKeyword table: Keyword associations
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_keyword_page
ON "PageKeyword" ("pageId", "position" ASC NULLS LAST);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_keyword_keyword
ON "PageKeyword" ("keywordId", "position" ASC NULLS LAST);

-- AIInsight table: Recent insights by connection
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ai_insight_connection_date
ON "AIInsight" ("connectionId", "createdAt" DESC);

-- AIInsight table: Insights by category
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ai_insight_connection_category
ON "AIInsight" ("connectionId", "category", "priority" DESC);

-- ContentSuggestion table: Pending suggestions
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_suggestion_page_status
ON "ContentSuggestion" ("pageId", "status")
WHERE "status" = 'PENDING';

-- PageImprovement table: Recent improvements
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_improvement_page_date
ON "PageImprovement" ("pageId", "implementedAt" DESC);

-- SiteHealthScore table: Historical health tracking
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_site_health_connection_date
ON "SiteHealthScore" ("connectionId", "date" DESC);

-- PageSnapshot table: Historical page state
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_snapshot_page_date
ON "PageSnapshot" ("pageId", "snapshotDate" DESC);

-- Metric table: Time series data
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_metric_connection_date
ON "Metric" ("connectionId", "date" DESC);

-- AuditLog table: User activity tracking
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_log_user_date
ON "AuditLog" ("userId", "timestamp" DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_log_connection_date
ON "AuditLog" ("connectionId", "timestamp" DESC)
WHERE "connectionId" IS NOT NULL;

-- Notification table: Unread notifications
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_notification_user_read
ON "Notification" ("userId", "read", "createdAt" DESC);

-- UsageRecord table: Current month usage
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_usage_record_user_period
ON "UsageRecord" ("userId", "period" DESC);

-- ============================================================================
-- JSONB INDEXES (For metadata and credentials columns)
-- ============================================================================

-- Connection credentials (for Shopify metadata queries)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_connection_credentials
ON "Connection" USING gin("credentials" jsonb_path_ops);

-- Page metadata (for SEO data queries)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_metadata
ON "Page" USING gin("metadata" jsonb_path_ops);

-- AIInsight recommendations (for searching recommendations)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ai_insight_recommendations
ON "AIInsight" USING gin("recommendations" jsonb_path_ops);

-- PageImprovement metrics (for before/after analysis)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_improvement_metrics_before
ON "PageImprovement" USING gin("metricsBefore" jsonb_path_ops);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_improvement_metrics_after
ON "PageImprovement" USING gin("metricsAfter" jsonb_path_ops);

-- ============================================================================
-- FULL-TEXT SEARCH INDEXES
-- ============================================================================

-- Page title and description full-text search
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_title_fts
ON "Page" USING gin(
  to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(description, ''))
);

-- Issue title and description search
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_issue_search
ON "Issue" USING gin(
  to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(description, ''))
);

-- Keyword search
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_keyword_search
ON "Keyword" USING gin(
  to_tsvector('english', keyword)
);

-- ContentSuggestion search
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_suggestion_search
ON "ContentSuggestion" USING gin(
  to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(suggestion, ''))
);

-- ============================================================================
-- PARTIAL INDEXES (For specific query patterns)
-- ============================================================================

-- Active connections only
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_connection_active
ON "Connection" ("userId", "lastSync" DESC)
WHERE "status" = 'CONNECTED';

-- High-priority open issues
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_issue_high_priority_open
ON "Issue" ("connectionId", "createdAt" DESC)
WHERE "status" = 'OPEN' AND "severity" = 'HIGH';

-- Recent successful fixes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_fix_success_recent
ON "Fix" ("connectionId", "appliedAt" DESC)
WHERE "status" = 'SUCCESS' AND "appliedAt" > NOW() - INTERVAL '30 days';

-- Failed jobs for retry
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_job_failed
ON "Job" ("type", "createdAt" DESC)
WHERE "status" = 'FAILED';

-- Recent crawls (last 90 days)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_crawl_recent
ON "Crawl" ("connectionId", "startedAt" DESC)
WHERE "startedAt" > NOW() - INTERVAL '90 days';

-- Unread notifications
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_notification_unread
ON "Notification" ("userId", "createdAt" DESC)
WHERE "read" = false;

-- ============================================================================
-- UNIQUE INDEXES (For data integrity)
-- ============================================================================

-- One subscription per user
CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_subscription_user_unique
ON "Subscription" ("userId")
WHERE "status" IN ('ACTIVE', 'TRIALING');

-- No duplicate keywords per connection
CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_keyword_connection_unique
ON "Keyword" ("connectionId", "keyword");

-- No duplicate page keywords
CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_page_keyword_unique
ON "PageKeyword" ("pageId", "keywordId");

-- One usage record per user per period
CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_usage_record_unique
ON "UsageRecord" ("userId", "period");

-- ============================================================================
-- FOREIGN KEY INDEXES (For join performance)
-- ============================================================================

-- These are often auto-created by Prisma, but including for completeness

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_connection_user_id
ON "Connection" ("userId");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_connection_id
ON "Page" ("connectionId");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_issue_connection_id
ON "Issue" ("connectionId");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_issue_page_id
ON "Issue" ("pageId")
WHERE "pageId" IS NOT NULL;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_fix_connection_id
ON "Fix" ("connectionId");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_fix_issue_id
ON "Fix" ("issueId")
WHERE "issueId" IS NOT NULL;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_job_connection_id
ON "Job" ("connectionId")
WHERE "connectionId" IS NOT NULL;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_crawl_connection_id
ON "Crawl" ("connectionId");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_keyword_connection_id
ON "Keyword" ("connectionId");

-- ============================================================================
-- PERFORMANCE MONITORING SETUP
-- ============================================================================

-- Enable query statistics
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Enable trigram similarity for fuzzy search (optional)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- INDEX USAGE MONITORING QUERIES
-- ============================================================================

-- Check index usage
-- SELECT
--   schemaname,
--   tablename,
--   indexname,
--   idx_scan as index_scans,
--   idx_tup_read as tuples_read,
--   idx_tup_fetch as tuples_fetched
-- FROM pg_stat_user_indexes
-- WHERE schemaname = 'public'
-- ORDER BY idx_scan ASC;

-- Find unused indexes
-- SELECT
--   schemaname,
--   tablename,
--   indexname,
--   idx_scan
-- FROM pg_stat_user_indexes
-- WHERE schemaname = 'public'
-- AND idx_scan = 0
-- ORDER BY pg_relation_size(indexrelid) DESC;

-- Check table sizes
-- SELECT
--   schemaname,
--   tablename,
--   pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
--   n_live_tup as row_count
-- FROM pg_stat_user_tables
-- WHERE schemaname = 'public'
-- ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ============================================================================
-- VACUUM AND ANALYZE
-- ============================================================================

-- Run after creating indexes to update query planner statistics
ANALYZE;

-- ============================================================================
-- NOTES
-- ============================================================================
-- 1. Apply these indexes in Supabase SQL Editor
-- 2. CONCURRENTLY option allows index creation without locking tables
-- 3. Monitor index usage with pg_stat_user_indexes
-- 4. Remove unused indexes after monitoring period
-- 5. Re-run ANALYZE after bulk data changes
-- 6. Update role passwords in Supabase Dashboard after creation
-- ============================================================================
