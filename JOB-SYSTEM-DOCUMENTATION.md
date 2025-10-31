# Seology.ai Background Job System

## Overview

The background job system provides asynchronous task processing for Seology.ai, enabling long-running operations like site crawls, AI analysis, and maintenance tasks to run without blocking API requests.

## Architecture

### Components

1. **Job Queue** (`lib/queue.ts`)
   - Database-backed job queue using PostgreSQL
   - Priority-based job scheduling
   - Automatic retry with exponential backoff
   - Job status tracking and monitoring

2. **Job Processors** (`lib/jobs/`)
   - `crawl-job.ts` - Crawls websites for SEO issues
   - `analysis-job.ts` - Performs AI analysis using Claude
   - `cleanup-job.ts` - Cleans expired rollbacks and old data
   - `usage-reset-job.ts` - Resets monthly usage counters

3. **API Endpoints**
   - `/api/jobs/crawl` - Queue a site crawl
   - `/api/jobs/cleanup` - Queue a cleanup job (admin)
   - `/api/jobs/[id]/status` - Check job status
   - `/api/jobs/process` - Process next job (internal)

4. **Cron Jobs**
   - `/api/cron/process-jobs` - Process jobs every minute
   - `/api/cron/daily` - Daily cleanup at midnight
   - `/api/cron/monthly` - Monthly usage reset on 1st

### Database Schema

```prisma
model Job {
  id          String    @id @default(uuid())
  type        JobType
  status      JobStatus @default(PENDING)
  priority    Int       @default(0)
  payload     Json
  result      Json?
  error       String?
  attempts    Int       @default(0)
  maxAttempts Int       @default(3)
  scheduledFor DateTime @default(now())
  startedAt   DateTime?
  completedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum JobType {
  CRAWL_SITE
  ANALYZE_SITE
  CLEANUP_ROLLBACKS
  RESET_USAGE
  SYNC_METRICS
}

enum JobStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  CANCELLED
}
```

## Usage

### 1. Queueing Jobs

#### Site Crawl
```typescript
import { queue } from '@/lib/queue'

// Queue a site crawl
const jobId = await queue.enqueueCrawl(
  siteId,      // Site/connection ID
  userId,      // User who initiated
  maxPages,    // Max pages to crawl (default: 10)
  priority     // Priority 0-10 (default: 5)
)
```

#### AI Analysis
```typescript
const jobId = await queue.enqueueAnalysis(
  siteId,
  userId,
  priority
)
```

#### Rollback Cleanup
```typescript
const jobId = await queue.enqueueRollbackCleanup(
  daysOld,     // Clean rollbacks older than X days (default: 90)
  priority
)
```

#### Usage Reset
```typescript
const month = '2024-01' // YYYY-MM format
const jobId = await queue.enqueueUsageReset(
  month,
  priority
)
```

### 2. Checking Job Status

```typescript
const status = await queue.getJobStatus(jobId)

// Returns:
{
  id: "uuid",
  type: "CRAWL_SITE",
  status: "PROCESSING",
  progress: 50,
  result: null,
  error: null,
  attempts: 1,
  maxAttempts: 3,
  scheduledFor: "2024-01-01T00:00:00Z",
  startedAt: "2024-01-01T00:01:00Z",
  completedAt: null,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:01:00Z"
}
```

### 3. API Endpoints

#### Queue a Crawl Job
```bash
POST /api/jobs/crawl
Content-Type: application/json

{
  "siteId": "uuid",
  "maxPages": 10
}

# Response (202 Accepted):
{
  "success": true,
  "jobId": "uuid",
  "message": "Crawl job queued successfully"
}
```

#### Check Job Status
```bash
GET /api/jobs/{jobId}/status

# Response:
{
  "success": true,
  "job": {
    "id": "uuid",
    "type": "CRAWL_SITE",
    "status": "COMPLETED",
    "progress": 100,
    "result": {
      "success": true,
      "pagesAnalyzed": 10,
      "issuesFound": 45
    }
  }
}
```

#### Trigger Cleanup (Admin Only)
```bash
POST /api/jobs/cleanup
Authorization: Bearer {token}
Content-Type: application/json

{
  "daysOld": 90
}

# Response (202 Accepted):
{
  "success": true,
  "jobId": "uuid",
  "message": "Cleanup job queued successfully"
}
```

### 4. Client-Side Polling Pattern

```typescript
// Queue the job
const response = await fetch('/api/jobs/crawl', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ siteId, maxPages: 10 })
})

const { jobId } = await response.json()

// Poll for status
const pollInterval = setInterval(async () => {
  const statusResponse = await fetch(`/api/jobs/${jobId}/status`)
  const { job } = await statusResponse.json()

  console.log(`Job status: ${job.status} (${job.progress}%)`)

  if (job.status === 'COMPLETED') {
    clearInterval(pollInterval)
    console.log('Job completed:', job.result)
  } else if (job.status === 'FAILED') {
    clearInterval(pollInterval)
    console.error('Job failed:', job.error)
  }
}, 2000) // Poll every 2 seconds
```

## Vercel Cron Setup

### 1. Configuration (vercel.json)

The `vercel.json` file is already configured with three cron jobs:

```json
{
  "crons": [
    {
      "path": "/api/cron/process-jobs",
      "schedule": "* * * * *"
    },
    {
      "path": "/api/cron/daily",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/monthly",
      "schedule": "0 0 1 * *"
    }
  ]
}
```

### 2. Cron Schedule Format

- `* * * * *` - Every minute (job processor)
- `0 0 * * *` - Daily at midnight UTC (cleanup)
- `0 0 1 * *` - Monthly on 1st at midnight UTC (usage reset)

### 3. Security

Set the `CRON_SECRET` environment variable in Vercel:

```bash
# In Vercel dashboard:
CRON_SECRET=your-random-secret-here
```

All cron endpoints verify this secret:

```typescript
const authHeader = request.headers.get('authorization')
const cronSecret = process.env.CRON_SECRET

if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

### 4. Vercel Dashboard Setup

1. Deploy your app to Vercel
2. Go to Project Settings > Cron Jobs
3. Verify the three cron jobs are listed
4. Add `CRON_SECRET` to Environment Variables
5. Redeploy to apply changes

## Job Processing Flow

### 1. Job Lifecycle

```
PENDING → PROCESSING → COMPLETED
                    ↓
                 FAILED (with retry)
                    ↓
        PENDING (retry) → PROCESSING → COMPLETED/FAILED
```

### 2. Retry Logic

- Failed jobs automatically retry up to 3 times (configurable)
- Exponential backoff: retry after 1 min, 2 min, 3 min
- After max attempts, job is marked as FAILED

### 3. Processing Queue

The cron job at `/api/cron/process-jobs` runs every minute and:

1. Fetches up to 5 pending jobs (ordered by priority, then time)
2. Processes each job sequentially
3. Marks jobs as COMPLETED or FAILED
4. Returns statistics about processed jobs

## Job Processors

### Crawl Job
- Crawls the site using Puppeteer
- Detects SEO issues
- Stores issues in database
- Creates audit logs

**Payload:**
```typescript
{
  siteId: string
  userId: string
  maxPages: number
}
```

**Result:**
```typescript
{
  success: boolean
  pagesAnalyzed: number
  issuesFound: number
  error?: string
}
```

### Analysis Job
- Analyzes existing issues with Claude AI
- Generates detailed recommendations
- Creates AI conversation record
- Stores messages in database

**Payload:**
```typescript
{
  siteId: string
  userId: string
}
```

**Result:**
```typescript
{
  success: boolean
  conversationId?: string
  issuesAnalyzed: number
  error?: string
}
```

### Cleanup Job
- Cleans expired rollbacks (90 days old)
- Removes old completed jobs (30 days)
- Removes old audit logs (1 year)
- Removes read notifications (90 days)

**Payload:**
```typescript
{
  daysOld?: number
}
```

**Result:**
```typescript
{
  success: boolean
  rollbacksCleaned: number
  jobsCleaned: number
  error?: string
}
```

### Usage Reset Job
- Resets monthly usage counters
- Creates new usage records for active users
- Runs on 1st of each month

**Payload:**
```typescript
{
  month: string // YYYY-MM format
}
```

**Result:**
```typescript
{
  success: boolean
  usersReset: number
  error?: string
}
```

## Monitoring & Debugging

### Get Job Statistics
```typescript
const stats = await queue.getJobStats()

// Returns:
{
  pending: 5,
  processing: 2,
  completed: 1234,
  failed: 12,
  total: 1253
}
```

### Query Jobs
```typescript
// Get all pending crawl jobs
const jobs = await queue.getJobs(
  JobType.CRAWL_SITE,
  JobStatus.PENDING,
  50 // limit
)

// Get recent jobs
const recentJobs = await queue.getJobs(undefined, undefined, 20)
```

### Clean Up Old Jobs
```typescript
// Remove jobs older than 30 days
const count = await queue.cleanupOldJobs(30)
console.log(`Cleaned ${count} old jobs`)
```

## Migration Guide

### 1. Update Database Schema
```bash
cd app-saas
npx prisma migrate dev --name add_job_table
npx prisma generate
```

### 2. Update Existing Endpoints

Before:
```typescript
// Blocking crawl
const { results, issues } = await crawler.crawlSite(url, maxPages)
return NextResponse.json({ results, issues })
```

After:
```typescript
// Non-blocking with job queue
const jobId = await queue.enqueueCrawl(siteId, userId, maxPages)
return NextResponse.json(
  { jobId, statusUrl: `/api/jobs/${jobId}/status` },
  { status: 202 }
)
```

### 3. Update Frontend

Before:
```typescript
const response = await fetch('/api/sites/123/crawl', { method: 'POST' })
const data = await response.json()
// Use data.results immediately
```

After:
```typescript
// Queue the job
const response = await fetch('/api/sites/123/crawl', { method: 'POST' })
const { jobId } = await response.json()

// Poll for completion
const result = await pollJobStatus(jobId)
```

## Best Practices

### 1. Job Priorities
- **High (8-10):** User-initiated crawls, critical operations
- **Medium (4-7):** AI analysis, metrics sync
- **Low (1-3):** Cleanup, maintenance tasks

### 2. Error Handling
- Always return success/error in job results
- Log errors for debugging
- Provide actionable error messages

### 3. Timeout Management
- Keep jobs under 50 seconds to avoid Vercel timeout
- Break large tasks into smaller jobs
- Use pagination for bulk operations

### 4. Database Optimization
- Add indexes on frequently queried fields
- Clean up old jobs regularly
- Use batch operations where possible

### 5. Monitoring
- Track job success/failure rates
- Monitor queue depth
- Set up alerts for failed jobs

## Environment Variables

```bash
# Required
DATABASE_URL=postgresql://...
CRON_SECRET=your-random-secret

# Optional
JOB_MAX_ATTEMPTS=3          # Default retry attempts
JOB_PROCESS_BATCH_SIZE=5    # Jobs per cron run
JOB_RETENTION_DAYS=30       # Keep completed jobs for X days
```

## Troubleshooting

### Jobs Not Processing
1. Check cron jobs are running in Vercel dashboard
2. Verify `CRON_SECRET` is set correctly
3. Check job processor endpoint logs
4. Verify database connection

### Jobs Failing
1. Check job error messages in database
2. Review job processor logs
3. Verify external dependencies (Puppeteer, Claude API)
4. Check resource limits (memory, timeout)

### High Queue Depth
1. Increase cron frequency
2. Process more jobs per run
3. Optimize job processors
4. Add more concurrent workers

## Future Enhancements

- [ ] Job dependencies (job chains)
- [ ] Scheduled jobs (run at specific time)
- [ ] Job cancellation support
- [ ] Job progress updates (0-100%)
- [ ] Dead letter queue for failed jobs
- [ ] Job prioritization by user plan
- [ ] Real-time job updates via WebSockets
- [ ] Job metrics and analytics dashboard

## API Reference

### QueueService Methods

```typescript
class QueueService {
  // Queue jobs
  enqueueCrawl(siteId, userId, maxPages?, priority?): Promise<string>
  enqueueAnalysis(siteId, userId, priority?): Promise<string>
  enqueueRollbackCleanup(daysOld?, priority?): Promise<string>
  enqueueUsageReset(month, priority?): Promise<string>

  // Job management
  getJobStatus(jobId): Promise<JobStatus | null>
  getNextJob(): Promise<Job | null>
  completeJob(jobId, result): Promise<void>
  failJob(jobId, error): Promise<void>
  cancelJob(jobId): Promise<void>

  // Queries
  getJobs(type?, status?, limit?): Promise<Job[]>
  getJobStats(): Promise<JobStats>
  cleanupOldJobs(daysOld?): Promise<number>
}
```

### Job Result Types

```typescript
interface CrawlJobResult {
  success: boolean
  pagesAnalyzed: number
  issuesFound: number
  error?: string
}

interface AnalysisJobResult {
  success: boolean
  conversationId?: string
  issuesAnalyzed: number
  error?: string
}

interface CleanupJobResult {
  success: boolean
  rollbacksCleaned: number
  jobsCleaned: number
  error?: string
}

interface UsageResetJobResult {
  success: boolean
  usersReset: number
  error?: string
}
```

## Support

For issues or questions:
1. Check the logs in Vercel dashboard
2. Review the database for job status
3. Test endpoints manually with cURL
4. Contact the development team

---

**Last Updated:** 2024-01-01
**Version:** 1.0.0
