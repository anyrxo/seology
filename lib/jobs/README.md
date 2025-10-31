# Background Job Processors

This directory contains job processors for the Seology.ai background job system.

## Overview

Job processors handle asynchronous tasks that are queued via the job system. Each processor is responsible for executing a specific type of job.

## Available Processors

### 1. Crawl Job (`crawl-job.ts`)
**Purpose:** Crawls a website and detects SEO issues

**Triggers:**
- User initiates site crawl via `/api/sites/[id]/crawl`
- Scheduled periodic crawls (if configured)

**Process:**
1. Validates site ownership
2. Crawls site using Puppeteer
3. Analyzes pages for SEO issues
4. Stores issues in database
5. Creates audit log

**Payload:**
```typescript
{
  siteId: string     // Connection ID
  userId: string     // Clerk user ID
  maxPages: number   // Maximum pages to crawl
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

**Duration:** ~30-60 seconds for 10 pages

---

### 2. Analysis Job (`analysis-job.ts`)
**Purpose:** Analyzes SEO issues using Claude AI

**Triggers:**
- After crawl job completes
- User requests detailed analysis
- Scheduled re-analysis

**Process:**
1. Retrieves detected issues for site
2. Groups issues by severity and category
3. Generates prompt for Claude
4. Gets AI recommendations
5. Stores conversation in database

**Payload:**
```typescript
{
  siteId: string     // Connection ID
  userId: string     // Clerk user ID
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

**Duration:** ~10-20 seconds

---

### 3. Cleanup Job (`cleanup-job.ts`)
**Purpose:** Cleans up expired data and old records

**Triggers:**
- Daily cron job at midnight
- Manual trigger by admin

**Process:**
1. Cleans expired rollbacks (>90 days old)
2. Removes old completed jobs (>30 days)
3. Removes old audit logs (>1 year)
4. Removes read notifications (>90 days)

**Payload:**
```typescript
{
  daysOld?: number   // Age threshold (default: 90)
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

**Duration:** ~5-15 seconds

---

### 4. Usage Reset Job (`usage-reset-job.ts`)
**Purpose:** Resets monthly usage counters for all users

**Triggers:**
- Monthly cron job on 1st at midnight
- Manual trigger for testing

**Process:**
1. Gets all active users with subscriptions
2. Creates or resets usage records for current month
3. Resets counters to zero

**Payload:**
```typescript
{
  month: string      // YYYY-MM format
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

**Duration:** ~2-5 seconds

---

## Adding a New Processor

### 1. Create the processor file

```typescript
// lib/jobs/my-job.ts
import { db } from '../db'

export interface MyJobPayload {
  someParam: string
}

export interface MyJobResult {
  success: boolean
  data?: any
  error?: string
}

export async function processMyJob(
  payload: MyJobPayload
): Promise<MyJobResult> {
  try {
    // Job logic here

    return {
      success: true,
      data: result
    }
  } catch (error) {
    console.error('My job error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
```

### 2. Add to JobType enum

```prisma
// prisma/schema.prisma
enum JobType {
  CRAWL_SITE
  ANALYZE_SITE
  CLEANUP_ROLLBACKS
  RESET_USAGE
  MY_NEW_JOB        // Add here
}
```

### 3. Add to job processor

```typescript
// lib/jobs/index.ts
import { processMyJob, MyJobResult } from './my-job'

export type JobResult =
  | CrawlJobResult
  | AnalysisJobResult
  | CleanupJobResult
  | UsageResetJobResult
  | MyJobResult        // Add here

export async function processJob(
  type: JobType,
  payload: JobPayload
): Promise<JobResult> {
  switch (type) {
    // ... existing cases
    case JobType.MY_NEW_JOB:
      return await processMyJob(payload)
    default:
      throw new Error(`Unknown job type: ${type}`)
  }
}
```

### 4. Add queue method

```typescript
// lib/queue.ts
export class QueueService {
  async enqueueMyJob(
    someParam: string,
    priority: number = 5
  ): Promise<string> {
    const job = await db.job.create({
      data: {
        type: JobType.MY_NEW_JOB,
        status: JobStatus.PENDING,
        priority,
        payload: { someParam },
      },
    })
    return job.id
  }
}
```

### 5. Create API endpoint (optional)

```typescript
// app/api/jobs/my-job/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { queue } from '@/lib/queue'

export async function POST(request: NextRequest) {
  const { someParam } = await request.json()
  const jobId = await queue.enqueueMyJob(someParam)

  return NextResponse.json(
    { success: true, jobId },
    { status: 202 }
  )
}
```

## Best Practices

### Error Handling
- Always wrap processor logic in try-catch
- Return descriptive error messages
- Log errors with context

### Timeouts
- Keep jobs under 50 seconds
- Break large tasks into smaller jobs
- Use pagination for bulk operations

### Database Operations
- Use transactions for related updates
- Batch operations when possible
- Clean up resources in finally blocks

### Testing
- Test with various payloads
- Test error scenarios
- Test retry logic
- Test timeout handling

### Monitoring
- Log job start and completion
- Track processing duration
- Monitor success/failure rates
- Alert on repeated failures

## Debugging

### Check job status
```typescript
const status = await queue.getJobStatus(jobId)
console.log(status)
```

### View job in database
```sql
SELECT * FROM jobs WHERE id = 'job-id';
```

### Test processor directly
```typescript
import { processCrawlJob } from './crawl-job'

const result = await processCrawlJob({
  siteId: 'test-site-id',
  userId: 'test-user-id',
  maxPages: 5
})

console.log(result)
```

### Check logs
```bash
# Vercel logs
vercel logs

# Filter by function
vercel logs --filter="api/cron/process-jobs"
```

## Performance Tips

### Optimize Database Queries
- Use select to limit returned fields
- Add indexes on frequently queried columns
- Use batch operations (createMany, updateMany)

### Reduce External API Calls
- Cache results when possible
- Use batch endpoints if available
- Implement rate limiting

### Memory Management
- Stream large datasets
- Clean up resources (browser, connections)
- Avoid loading entire collections into memory

### Parallel Processing
- Use Promise.all for independent operations
- Limit concurrency to avoid overwhelming services
- Process in chunks for large datasets

## Common Issues

### Job Stuck in PROCESSING
- Check for uncaught errors
- Verify job completion is called
- Check Vercel timeout (60s max)

### Jobs Not Running
- Verify cron jobs are enabled
- Check CRON_SECRET environment variable
- Review cron endpoint logs

### High Failure Rate
- Check external service availability
- Review error messages in database
- Verify payload structure
- Test with smaller datasets

### Slow Processing
- Profile job execution time
- Optimize database queries
- Reduce external API calls
- Consider breaking into smaller jobs

## Resources

- [Main Documentation](../JOB-SYSTEM-DOCUMENTATION.md)
- [Queue Service](../queue.ts)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [Prisma Documentation](https://www.prisma.io/docs)
