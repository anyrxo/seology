-- Performance Optimization Indexes
-- Created: 2025-11-06
-- Purpose: Add compound indexes for critical performance bottlenecks

-- Connection: Optimize shop domain + platform + status lookups (used in automation and overview)
CREATE INDEX IF NOT EXISTS "Connection_domain_platform_status_idx"
ON "Connection"("domain", "platform", "status");

-- Issue: Optimize N+1 query in automation-engine.ts
CREATE INDEX IF NOT EXISTS "Issue_connectionId_status_detectedAt_idx"
ON "Issue"("connectionId", "status", "detectedAt");

-- Fix: Optimize fix queries by issue and status
CREATE INDEX IF NOT EXISTS "Fix_issueId_status_idx"
ON "Fix"("issueId", "status");

-- Job: Optimize job queue processing
CREATE INDEX IF NOT EXISTS "Job_status_scheduledFor_priority_idx"
ON "Job"("status", "scheduledFor", "priority");

-- Add comments for documentation
COMMENT ON INDEX "Connection_domain_platform_status_idx" IS 'Optimizes connection lookups in overview route and automation engine';
COMMENT ON INDEX "Issue_connectionId_status_detectedAt_idx" IS 'Prevents N+1 queries when fetching issues for products in automation';
COMMENT ON INDEX "Fix_issueId_status_idx" IS 'Optimizes fix queries when looking up fixes by issue';
COMMENT ON INDEX "Job_status_scheduledFor_priority_idx" IS 'Optimizes job queue worker queries for pending jobs';
