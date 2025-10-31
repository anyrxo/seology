# Quick Start Guide: Background Job System

This guide will help you set up and start using the background job system in Seology.ai.

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Vercel account (for deployment and cron jobs)

## Setup Steps

### 1. Update Database Schema

```bash
cd app-saas

# Generate Prisma client with new Job model
npx prisma generate

# Create migration
npx prisma migrate dev --name add_job_table

# Or push schema changes (for development)
npx prisma db push
```

### 2. Configure Environment Variables

Add to your `.env.local` (or Vercel environment variables):

```bash
# Generate a random secret for cron job authentication
CRON_SECRET=$(openssl rand -hex 32)

# Optional: Configure job processing
JOB_MAX_ATTEMPTS=3
JOB_PROCESS_BATCH_SIZE=5
JOB_RETENTION_DAYS=30
```

### 3. Test Locally

#### Start the development server:
```bash
npm run dev
```

#### Test queueing a job:
```bash
curl -X POST http://localhost:3000/api/jobs/crawl \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{
    "siteId": "your-site-id",
    "maxPages": 5
  }'
```

#### Process jobs manually (simulating cron):
```bash
curl -X POST http://localhost:3000/api/jobs/process \
  -H "Authorization: Bearer $CRON_SECRET"
```

#### Check job status:
```bash
curl http://localhost:3000/api/jobs/YOUR_JOB_ID/status \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN"
```

### 4. Deploy to Vercel

#### Push your code:
```bash
git add .
git commit -m "Add background job system"
git push
```

#### Configure Vercel:

1. Go to your project in Vercel dashboard
2. Navigate to **Settings → Environment Variables**
3. Add `CRON_SECRET`:
   ```
   CRON_SECRET=your-generated-secret-here
   ```
4. Optionally add job configuration variables

#### Verify cron jobs:

1. Go to **Settings → Cron Jobs**
2. You should see three cron jobs:
   - `/api/cron/process-jobs` - Every minute
   - `/api/cron/daily` - Daily at midnight
   - `/api/cron/monthly` - Monthly on 1st

### 5. Test in Production

#### Queue a crawl job:
```bash
curl -X POST https://your-app.vercel.app/api/jobs/crawl \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{
    "siteId": "your-site-id",
    "maxPages": 10
  }'
```

#### Monitor job processing:
```bash
# View Vercel logs
vercel logs --follow

# Filter by cron function
vercel logs --filter="api/cron/process-jobs"
```

## Usage Examples

### From API Endpoint

```typescript
import { queue } from '@/lib/queue'

export async function POST(request: NextRequest) {
  // Queue a crawl job
  const jobId = await queue.enqueueCrawl(siteId, userId, 10)

  return NextResponse.json(
    {
      success: true,
      jobId,
      statusUrl: `/api/jobs/${jobId}/status`
    },
    { status: 202 }
  )
}
```

### From Client-Side Code

```typescript
// Queue the job
const response = await fetch('/api/jobs/crawl', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    siteId: 'abc-123',
    maxPages: 10
  })
})

const { jobId } = await response.json()

// Poll for status
const checkStatus = async () => {
  const res = await fetch(`/api/jobs/${jobId}/status`)
  const { job } = await res.json()

  if (job.status === 'COMPLETED') {
    console.log('Job completed!', job.result)
  } else if (job.status === 'FAILED') {
    console.error('Job failed:', job.error)
  } else {
    // Still processing, check again in 2 seconds
    setTimeout(checkStatus, 2000)
  }
}

checkStatus()
```

### From Server-Side Code

```typescript
import { queue } from '@/lib/queue'

// Queue multiple jobs
const crawlJobId = await queue.enqueueCrawl(siteId, userId, 10, 8) // High priority
const analysisJobId = await queue.enqueueAnalysis(siteId, userId, 5)

// Check status
const status = await queue.getJobStatus(crawlJobId)
console.log(`Job ${crawlJobId} is ${status.status}`)

// Get statistics
const stats = await queue.getJobStats()
console.log(`Queue has ${stats.pending} pending jobs`)
```

## Common Tasks

### Trigger Cleanup Manually

```bash
curl -X POST https://your-app.vercel.app/api/jobs/cleanup \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "daysOld": 90 }'
```

### View Queue Statistics

```bash
curl https://your-app.vercel.app/api/jobs/process \
  -H "Authorization: Bearer $CRON_SECRET"
```

### Cancel a Job

```typescript
await queue.cancelJob(jobId)
```

### Retry a Failed Job

Failed jobs automatically retry up to 3 times. To manually retry:

```typescript
// Update job status back to PENDING
await db.job.update({
  where: { id: jobId },
  data: { status: 'PENDING', attempts: 0 }
})
```

## Monitoring

### Check Job Status in Database

```sql
-- View all pending jobs
SELECT id, type, status, priority, created_at, attempts
FROM jobs
WHERE status = 'PENDING'
ORDER BY priority DESC, created_at ASC;

-- View failed jobs
SELECT id, type, error, attempts, created_at
FROM jobs
WHERE status = 'FAILED'
ORDER BY created_at DESC;

-- View job statistics
SELECT
  type,
  status,
  COUNT(*) as count,
  AVG(EXTRACT(EPOCH FROM (completed_at - started_at))) as avg_duration
FROM jobs
WHERE completed_at IS NOT NULL
GROUP BY type, status;
```

### View Vercel Logs

```bash
# Real-time logs
vercel logs --follow

# Last 100 lines
vercel logs -n 100

# Filter by function
vercel logs --filter="api/cron/process-jobs"

# Search for errors
vercel logs --filter="error"
```

### Get Queue Stats via API

```typescript
const stats = await queue.getJobStats()
/*
{
  pending: 5,
  processing: 2,
  completed: 1234,
  failed: 12,
  total: 1253
}
*/
```

## Troubleshooting

### Jobs Not Processing

**Problem:** Jobs stay in PENDING status

**Solutions:**
1. Check cron jobs are enabled in Vercel
2. Verify `CRON_SECRET` environment variable
3. Check Vercel logs for errors
4. Manually trigger job processor: `POST /api/jobs/process`

### Jobs Failing Repeatedly

**Problem:** Jobs immediately fail or timeout

**Solutions:**
1. Check error messages in database
2. Reduce job complexity (fewer pages, smaller datasets)
3. Verify external dependencies (Puppeteer, Claude API)
4. Check resource limits (memory, timeout)

### Cron Jobs Not Running

**Problem:** Scheduled jobs don't execute

**Solutions:**
1. Verify `vercel.json` cron configuration
2. Check Vercel dashboard for cron job status
3. Ensure deployment is on a paid plan (cron requires Hobby+)
4. Check cron endpoint logs

### High Queue Depth

**Problem:** Too many pending jobs

**Solutions:**
1. Process more jobs per cron run (increase `JOB_PROCESS_BATCH_SIZE`)
2. Optimize job processors
3. Consider multiple concurrent workers
4. Clean up old/stuck jobs

## Migration from Blocking to Async

If you have existing blocking endpoints, here's how to migrate:

### Before (Blocking):
```typescript
export async function POST(request: NextRequest) {
  const { results, issues } = await crawler.crawlSite(url, maxPages)
  return NextResponse.json({ results, issues })
}
```

### After (Async with Jobs):
```typescript
export async function POST(request: NextRequest) {
  const jobId = await queue.enqueueCrawl(siteId, userId, maxPages)
  return NextResponse.json(
    { jobId, statusUrl: `/api/jobs/${jobId}/status` },
    { status: 202 }
  )
}
```

### Update Frontend:
```typescript
// Before
const data = await fetch('/api/crawl').then(r => r.json())
showResults(data.results)

// After
const { jobId } = await fetch('/api/crawl').then(r => r.json())
const result = await pollJobStatus(jobId)
showResults(result)
```

## Next Steps

- Read the [full documentation](./JOB-SYSTEM-DOCUMENTATION.md)
- Review [job processors](./lib/jobs/README.md)
- Set up monitoring and alerts
- Configure job priorities for your use case
- Optimize job processing times

## Support

For issues or questions:
- Check [troubleshooting section](#troubleshooting)
- Review [full documentation](./JOB-SYSTEM-DOCUMENTATION.md)
- Check Vercel logs and database job records
- Contact the development team

---

**Quick Reference Commands:**

```bash
# Setup
npx prisma migrate dev --name add_job_table
npx prisma generate

# Generate secrets
openssl rand -hex 32

# Testing
curl -X POST localhost:3000/api/jobs/crawl -H "Content-Type: application/json" -d '{"siteId":"123"}'
curl localhost:3000/api/jobs/JOB_ID/status

# Deployment
git push
vercel --prod

# Monitoring
vercel logs --follow
vercel logs --filter="api/cron/process-jobs"
```
