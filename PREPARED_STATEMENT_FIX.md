# Fix for "Prepared Statement Already Exists" Error

## Problem

Production logs show recurring error:
```
ERROR: prepared statement "s1" already exists (PostgreSQL error code: 42P05)
```

This error occurs because:
1. Prisma uses prepared statements by default
2. In serverless environments (Vercel), Lambda instances reuse database connections
3. Prepared statements persist across invocations
4. When a new invocation tries to create the same prepared statement, PostgreSQL rejects it

## Root Cause

The `DATABASE_URL` environment variable in production does not include the `?pgbouncer=true` parameter, which tells Prisma to disable prepared statements.

## Solution

Add `?pgbouncer=true` to the DATABASE_URL in Vercel production environment.

### Step 1: Update DATABASE_URL in Vercel Dashboard

1. Go to [Vercel Environment Variables](https://vercel.com/iimagined/seology-ai/settings/environment-variables)
2. Find `DATABASE_URL` in **Production** environment
3. Click **Edit**
4. Update the value from:
   ```
   postgresql://postgres.qkczsucvrtqstowuxegi:Onfroy1738!@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
   ```

   To (add `?pgbouncer=true` at the end):
   ```
   postgresql://postgres.qkczsucvrtqstowuxegi:Onfroy1738!@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

5. Click **Save**

### Step 2: Redeploy

The environment variable change requires a new deployment:

```bash
# Option 1: Trigger redeploy via dashboard
# Go to Vercel dashboard → Deployments → ... → Redeploy

# Option 2: Push a commit
git add .
git commit -m "docs: Add prepared statement fix documentation"
git push

# Option 3: Force redeploy via CLI
vercel --prod --force
```

### Step 3: Verify Fix

After deployment completes, check production logs:

```bash
# Check recent logs for prepared statement errors
vercel logs https://seology.ai --since 2m | grep -i "prepared statement"

# Should return NO results if fixed

# Test API endpoints
curl -s "https://seology.ai/api/shopify/onboarding/status?shop=seology-3.myshopify.com"
curl -s "https://seology.ai/api/shopify/execution-mode?shop=seology-3.myshopify.com"
```

Both endpoints should return JSON responses without errors.

## How ?pgbouncer=true Works

When `pgbouncer=true` is in the connection string:
- Prisma disables prepared statements
- Every query is sent as a plain SQL string
- No "prepared statement already exists" conflicts
- Slightly slower queries (negligible in practice)
- **Essential for serverless/connection pooling**

## Related Files

- [prisma/schema.prisma](prisma/schema.prisma) - Updated with documentation
- [SCHEMA_SYNC_STATUS.md](SCHEMA_SYNC_STATUS.md) - Previous troubleshooting (schema is already in sync)

## Technical Details

### Error Details
```
PrismaClientUnknownRequestError: Invalid `prisma.connection.findFirst()` invocation

Error occurred during query execution:
ConnectorError(ConnectorError {
  user_facing_error: None,
  kind: QueryError(PostgresError {
    code: "42P05",
    message: "prepared statement \"s1\" already exists",
    severity: "ERROR",
    detail: None,
    column: None,
    hint: None
  }),
  transient: false
})
```

### Why This Happens in Serverless
1. Lambda function starts → Prisma Client creates connection
2. Prisma executes `PREPARE s1 AS SELECT ...`
3. Lambda finishes, connection is pooled (not closed)
4. New Lambda invocation reuses the same connection
5. Prisma tries to execute `PREPARE s1 AS SELECT ...` again
6. PostgreSQL: "s1 already exists" → Error

### Alternative Solutions (Not Recommended)

1. **Use Prisma Accelerate** - Adds connection pooling layer
   - Requires paid Prisma Cloud subscription
   - Not necessary if `pgbouncer=true` works

2. **Use Supabase Direct Connection (port 5432)** - Bypasses pooler but less performant
   - Would be: `postgresql://postgres.qkczsucvrtqstowuxegi:Onfroy1738!@db.qkczsucvrtqstowuxegi.supabase.co:5432/postgres`
   - Not recommended: Serverless needs connection pooling for performance
   - Better to use pooler with `?pgbouncer=true`

3. **Disable connection pooling** - Not possible in serverless
   - Vercel Lambda reuses connections automatically

## Status

- [x] Identified root cause
- [x] Verified database schema is in sync
- [x] Updated Prisma schema documentation
- [ ] Update DATABASE_URL in Vercel (MANUAL STEP REQUIRED)
- [ ] Deploy and verify fix

---

**Created**: 2025-11-09
**Issue**: Prepared statement conflicts in serverless PostgreSQL connections
**Fix**: Add `?pgbouncer=true` to DATABASE_URL environment variable
