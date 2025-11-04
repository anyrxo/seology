-- ============================================================================
-- SEOLOGY.AI - Row Level Security (RLS) Policies
-- ============================================================================
-- Purpose: Secure database access at row level for multi-tenant SaaS
-- Priority: 🔴 CRITICAL - Must be implemented before production
-- ============================================================================

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Get current user's internal ID from Clerk ID
CREATE OR REPLACE FUNCTION auth.user_id()
RETURNS INTEGER AS $$
  SELECT id FROM "User" WHERE "clerkId" = auth.uid()::text LIMIT 1;
$$ LANGUAGE SQL STABLE;

-- Check if current user is admin
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN AS $$
  SELECT role = 'ADMIN' FROM "User" WHERE "clerkId" = auth.uid()::text LIMIT 1;
$$ LANGUAGE SQL STABLE;

-- ============================================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================================

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Connection" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Site" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Page" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Issue" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Fix" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Job" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Crawl" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Keyword" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "KeywordRanking" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PageKeyword" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AIInsight" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ContentSuggestion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PageImprovement" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SiteHealthScore" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PageSnapshot" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Metric" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AuditLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UsageRecord" ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- USER TABLE POLICIES
-- ============================================================================

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
ON "User"
FOR SELECT
USING ("clerkId" = auth.uid()::text);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON "User"
FOR UPDATE
USING ("clerkId" = auth.uid()::text);

-- Admins can read all users
CREATE POLICY "Admins can read all users"
ON "User"
FOR SELECT
USING (auth.is_admin());

-- Service account bypass (for backend operations)
CREATE POLICY "Service account full access to users"
ON "User"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- CONNECTION TABLE POLICIES
-- ============================================================================

-- Users can read their own connections
CREATE POLICY "Users can read own connections"
ON "Connection"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Connection"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Users can create their own connections
CREATE POLICY "Users can create own connections"
ON "Connection"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Connection"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Users can update their own connections
CREATE POLICY "Users can update own connections"
ON "Connection"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Connection"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Users can delete their own connections
CREATE POLICY "Users can delete own connections"
ON "Connection"
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Connection"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Admins can read all connections
CREATE POLICY "Admins can read all connections"
ON "Connection"
FOR SELECT
USING (auth.is_admin());

-- Service account bypass
CREATE POLICY "Service account full access to connections"
ON "Connection"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- SITE TABLE POLICIES
-- ============================================================================

-- Users can read their own sites
CREATE POLICY "Users can read own sites"
ON "Site"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Site"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Users can manage their own sites
CREATE POLICY "Users can manage own sites"
ON "Site"
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Site"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to sites"
ON "Site"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- PAGE TABLE POLICIES
-- ============================================================================

-- Users can read pages for their connections
CREATE POLICY "Users can read own pages"
ON "Page"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Connection"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Connection".id = "Page"."connectionId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account can manage all pages
CREATE POLICY "Service account full access to pages"
ON "Page"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- ISSUE TABLE POLICIES
-- ============================================================================

-- Users can read issues for their connections
CREATE POLICY "Users can read own issues"
ON "Issue"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Connection"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Connection".id = "Issue"."connectionId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Users can update issue status (for approval)
CREATE POLICY "Users can update own issues"
ON "Issue"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "Connection"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Connection".id = "Issue"."connectionId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to issues"
ON "Issue"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- FIX TABLE POLICIES
-- ============================================================================

-- Users can read fixes for their connections
CREATE POLICY "Users can read own fixes"
ON "Fix"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Connection"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Connection".id = "Fix"."connectionId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Users can approve/rollback their own fixes
CREATE POLICY "Users can update own fixes"
ON "Fix"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "Connection"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Connection".id = "Fix"."connectionId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to fixes"
ON "Fix"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- JOB TABLE POLICIES
-- ============================================================================

-- Users can read their own jobs
CREATE POLICY "Users can read own jobs"
ON "Job"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Job"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account can manage all jobs
CREATE POLICY "Service account full access to jobs"
ON "Job"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- CRAWL TABLE POLICIES
-- ============================================================================

-- Users can read crawls for their connections
CREATE POLICY "Users can read own crawls"
ON "Crawl"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Connection"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Connection".id = "Crawl"."connectionId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to crawls"
ON "Crawl"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- KEYWORD TABLE POLICIES
-- ============================================================================

-- Users can read keywords for their connections
CREATE POLICY "Users can read own keywords"
ON "Keyword"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Connection"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Connection".id = "Keyword"."connectionId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to keywords"
ON "Keyword"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- KEYWORD RANKING TABLE POLICIES
-- ============================================================================

-- Users can read keyword rankings for their keywords
CREATE POLICY "Users can read own keyword rankings"
ON "KeywordRanking"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Keyword"
    INNER JOIN "Connection" ON "Connection".id = "Keyword"."connectionId"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Keyword".id = "KeywordRanking"."keywordId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to keyword rankings"
ON "KeywordRanking"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- PAGE KEYWORD TABLE POLICIES
-- ============================================================================

-- Users can read page keywords for their pages
CREATE POLICY "Users can read own page keywords"
ON "PageKeyword"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Page"
    INNER JOIN "Connection" ON "Connection".id = "Page"."connectionId"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Page".id = "PageKeyword"."pageId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to page keywords"
ON "PageKeyword"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- AI INSIGHT TABLE POLICIES
-- ============================================================================

-- Users can read AI insights for their connections
CREATE POLICY "Users can read own ai insights"
ON "AIInsight"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Connection"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Connection".id = "AIInsight"."connectionId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to ai insights"
ON "AIInsight"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- CONTENT SUGGESTION TABLE POLICIES
-- ============================================================================

-- Users can read content suggestions for their pages
CREATE POLICY "Users can read own content suggestions"
ON "ContentSuggestion"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Page"
    INNER JOIN "Connection" ON "Connection".id = "Page"."connectionId"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Page".id = "ContentSuggestion"."pageId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Users can mark suggestions as applied
CREATE POLICY "Users can update own content suggestions"
ON "ContentSuggestion"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "Page"
    INNER JOIN "Connection" ON "Connection".id = "Page"."connectionId"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Page".id = "ContentSuggestion"."pageId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to content suggestions"
ON "ContentSuggestion"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- PAGE IMPROVEMENT TABLE POLICIES
-- ============================================================================

-- Users can read page improvements for their pages
CREATE POLICY "Users can read own page improvements"
ON "PageImprovement"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Page"
    INNER JOIN "Connection" ON "Connection".id = "Page"."connectionId"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Page".id = "PageImprovement"."pageId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to page improvements"
ON "PageImprovement"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- SITE HEALTH SCORE TABLE POLICIES
-- ============================================================================

-- Users can read health scores for their connections
CREATE POLICY "Users can read own site health scores"
ON "SiteHealthScore"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Connection"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Connection".id = "SiteHealthScore"."connectionId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to site health scores"
ON "SiteHealthScore"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- PAGE SNAPSHOT TABLE POLICIES
-- ============================================================================

-- Users can read page snapshots for their pages
CREATE POLICY "Users can read own page snapshots"
ON "PageSnapshot"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Page"
    INNER JOIN "Connection" ON "Connection".id = "Page"."connectionId"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Page".id = "PageSnapshot"."pageId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to page snapshots"
ON "PageSnapshot"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- METRIC TABLE POLICIES
-- ============================================================================

-- Users can read metrics for their connections
CREATE POLICY "Users can read own metrics"
ON "Metric"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Connection"
    INNER JOIN "User" ON "User".id = "Connection"."userId"
    WHERE "Connection".id = "Metric"."connectionId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to metrics"
ON "Metric"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- AUDIT LOG TABLE POLICIES
-- ============================================================================

-- Users can read their own audit logs
CREATE POLICY "Users can read own audit logs"
ON "AuditLog"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "AuditLog"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Admins can read all audit logs
CREATE POLICY "Admins can read all audit logs"
ON "AuditLog"
FOR SELECT
USING (auth.is_admin());

-- Service account bypass
CREATE POLICY "Service account full access to audit logs"
ON "AuditLog"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- SUBSCRIPTION TABLE POLICIES
-- ============================================================================

-- Users can read their own subscription
CREATE POLICY "Users can read own subscription"
ON "Subscription"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Subscription"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to subscriptions"
ON "Subscription"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- NOTIFICATION TABLE POLICIES
-- ============================================================================

-- Users can read their own notifications
CREATE POLICY "Users can read own notifications"
ON "Notification"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Notification"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
ON "Notification"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Notification"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to notifications"
ON "Notification"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- USAGE RECORD TABLE POLICIES
-- ============================================================================

-- Users can read their own usage records
CREATE POLICY "Users can read own usage records"
ON "UsageRecord"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "UsageRecord"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Service account bypass
CREATE POLICY "Service account full access to usage records"
ON "UsageRecord"
FOR ALL
USING (current_user = 'seology_service');

-- ============================================================================
-- VERIFICATION & TESTING
-- ============================================================================

-- Test with specific user ID
-- SELECT * FROM "Connection" WHERE "userId" = 1;

-- Test admin access
-- SELECT COUNT(*) FROM "User";

-- Test service account bypass
-- SET ROLE seology_service;
-- SELECT COUNT(*) FROM "User";
-- RESET ROLE;

-- ============================================================================
-- NOTES
-- ============================================================================
-- 1. Apply these policies in Supabase SQL Editor
-- 2. Create service account role first (see indexes.sql)
-- 3. Test each policy with actual user authentication
-- 4. Monitor policy performance with pg_stat_statements
-- 5. Update policies as schema evolves
-- ============================================================================
