# Google Search Console Integration - Implementation Checklist

## Pre-Implementation Setup

### Google Cloud Console Setup

- [ ] **Create/Select Google Cloud Project**
  - Go to https://console.cloud.google.com/
  - Create new project: "SEOLOGY-AI-GSC"
  - Note Project ID: `________________`

- [ ] **Enable Google Search Console API**
  - Navigate to "APIs & Services" → "Library"
  - Search for "Google Search Console API"
  - Click "Enable"
  - Wait for confirmation

- [ ] **Create OAuth 2.0 Credentials**
  - Go to "APIs & Services" → "Credentials"
  - Click "Create Credentials" → "OAuth 2.0 Client ID"
  - Application type: **Web application**
  - Name: "SEOLOGY AI Production"
  - Authorized JavaScript origins:
    - `https://seology.ai`
    - `http://localhost:3000` (for testing)
  - Authorized redirect URIs:
    - `https://seology.ai/api/auth/google/callback`
    - `http://localhost:3000/api/auth/google/callback`
  - Click "Create"
  - **Save Client ID**: `________________`
  - **Save Client Secret**: `________________`

- [ ] **Configure OAuth Consent Screen**
  - Go to "OAuth consent screen"
  - User Type: **External**
  - App name: `SEOLOGY.AI`
  - User support email: `support@seology.ai`
  - App logo: Upload SEOLOGY.AI logo
  - Application home page: `https://seology.ai`
  - Privacy policy: `https://seology.ai/privacy`
  - Terms of service: `https://seology.ai/terms`
  - Add scopes:
    - `https://www.googleapis.com/auth/webmasters.readonly`
    - `https://www.googleapis.com/auth/webmasters`
  - Add test users (during development):
    - Your email
    - Team member emails
  - Submit for verification (for production)

### Environment Variables Setup

- [ ] **Local Development (.env.local)**
  ```env
  # Google Search Console OAuth
  GOOGLE_CLIENT_ID=your_dev_client_id
  GOOGLE_CLIENT_SECRET=your_dev_client_secret
  GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

  # Or use dynamic URL
  NEXT_PUBLIC_APP_URL=http://localhost:3000
  ```

- [ ] **Production (Vercel Environment Variables)**
  - Go to Vercel Dashboard → Project Settings → Environment Variables
  - Add:
    - `GOOGLE_CLIENT_ID` = `production_client_id`
    - `GOOGLE_CLIENT_SECRET` = `production_client_secret`
    - `GOOGLE_REDIRECT_URI` = `https://seology.ai/api/auth/google/callback`
  - Environment: **Production**
  - Click "Save"

- [ ] **Verify Environment Variables Loaded**
  ```typescript
  // Test in a server component
  console.log('GSC Config:', {
    clientId: process.env.GOOGLE_CLIENT_ID?.slice(0, 10) + '...',
    secretSet: !!process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI
  })
  ```

---

## Database Migration

- [ ] **Backup Existing Database**
  ```bash
  npm run db:backup
  # Or manually
  pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
  ```

- [ ] **Update Prisma Schema**
  - [ ] Add GSC models to `prisma/schema.prisma`
  - [ ] Add relations to `Connection` model
  - [ ] Add relations to `Fix` model
  - [ ] Update `CSRFToken` model for Google provider

- [ ] **Generate Prisma Client**
  ```bash
  npx prisma generate
  ```
  - Verify: No TypeScript errors
  - Verify: New types available in `@prisma/client`

- [ ] **Push Schema to Database**
  ```bash
  npx prisma db push
  ```
  - Expected: 6 new tables created
  - Expected: Indexes created
  - Expected: No errors

- [ ] **Verify Migration Success**
  ```bash
  npx prisma studio
  ```
  - [ ] `GoogleSearchConsole` table exists
  - [ ] `SearchAnalytics` table exists
  - [ ] `GSCSyncHistory` table exists
  - [ ] `GSCPerformanceSnapshot` table exists
  - [ ] `GSCQueryInsight` table exists
  - [ ] `GSCPagePerformance` table exists
  - [ ] Relations visible in Prisma Studio

---

## Package Installation

- [ ] **Install Required Packages**
  ```bash
  npm install googleapis google-auth-library
  npm install -D @types/googleapis
  ```

- [ ] **Verify Installation**
  ```bash
  npm list googleapis
  npm list google-auth-library
  ```
  - Expected versions:
    - `googleapis@^140.0.0`
    - `google-auth-library@^9.6.0`

- [ ] **Update package.json**
  - Verify dependencies added
  - Run `npm install` to update lock file

---

## Library Implementation

- [ ] **Create GSC Library**
  - [ ] File: `lib/google-search-console.ts`
  - [ ] Fix all TypeScript errors
  - [ ] Remove all `any` types
  - [ ] Add proper error handling
  - [ ] Add JSDoc comments
  - [ ] Export all public functions

- [ ] **Test Library Functions**
  ```typescript
  // test-gsc.ts
  import { getOAuth2Client, getAuthorizationUrl } from '@/lib/google-search-console'

  const client = getOAuth2Client()
  console.log('Client created:', !!client)

  const authUrl = getAuthorizationUrl('test-state')
  console.log('Auth URL:', authUrl)
  ```

- [ ] **Type Safety Verification**
  ```bash
  npx tsc --noEmit
  ```
  - Expected: 0 errors in `lib/google-search-console.ts`

---

## API Routes Implementation

### OAuth Flow

- [ ] **Create OAuth Initiation Route**
  - [ ] File: `app/api/auth/google/route.ts`
  - [ ] Implement GET handler
  - [ ] Verify user authentication
  - [ ] Generate CSRF token
  - [ ] Store token in database
  - [ ] Redirect to Google OAuth

- [ ] **Create OAuth Callback Route**
  - [ ] File: `app/api/auth/google/callback/route.ts`
  - [ ] Implement GET handler
  - [ ] Verify CSRF token
  - [ ] Exchange code for tokens
  - [ ] Encrypt tokens
  - [ ] Store in database
  - [ ] Verify site ownership
  - [ ] Create audit log
  - [ ] Redirect to dashboard

### GSC Management Routes

- [ ] **Connect Route**
  - [ ] File: `app/api/shopify/gsc/connect/route.ts`
  - [ ] POST handler
  - [ ] Generate OAuth URL
  - [ ] Return to frontend

- [ ] **Disconnect Route**
  - [ ] File: `app/api/shopify/gsc/disconnect/route.ts`
  - [ ] POST handler
  - [ ] Clear tokens
  - [ ] Set isConnected = false
  - [ ] Create audit log

- [ ] **Manual Sync Route**
  - [ ] File: `app/api/shopify/gsc/sync/route.ts`
  - [ ] POST handler
  - [ ] Trigger sync
  - [ ] Return results

- [ ] **Analytics Route**
  - [ ] File: `app/api/shopify/gsc/analytics/route.ts`
  - [ ] GET handler
  - [ ] Fetch performance summary
  - [ ] Return formatted data

### Cron Job

- [ ] **Create Daily Sync Cron**
  - [ ] File: `app/api/cron/sync-gsc/route.ts`
  - [ ] GET handler
  - [ ] Verify cron secret
  - [ ] Sync all active GSC connections
  - [ ] Log results

- [ ] **Update vercel.json**
  ```json
  {
    "crons": [
      {
        "path": "/api/cron/sync-gsc",
        "schedule": "0 2 * * *"
      }
    ]
  }
  ```

---

## Frontend Implementation

### GSC Dashboard Page

- [ ] **Create Main Dashboard**
  - [ ] File: `app/shopify/gsc/page.tsx`
  - [ ] Connection status card
  - [ ] Connect/Disconnect buttons
  - [ ] Last sync timestamp
  - [ ] Manual sync button
  - [ ] Analytics overview
  - [ ] Performance charts
  - [ ] Top queries table
  - [ ] Top pages table
  - [ ] Device breakdown
  - [ ] Sync history

### Dashboard Widgets

- [ ] **Overview Widget**
  - [ ] File: `app/shopify/dashboard/components/GSCWidget.tsx`
  - [ ] Total impressions
  - [ ] Total clicks
  - [ ] Average CTR
  - [ ] Average position
  - [ ] Trend indicators
  - [ ] Link to full dashboard

### Timeline Integration

- [ ] **Add GSC Metrics to Fix Cards**
  - [ ] File: `app/shopify/timeline/components/FixCard.tsx`
  - [ ] Show before/after impressions
  - [ ] Show before/after clicks
  - [ ] Show position improvement
  - [ ] Calculate percentage change
  - [ ] Visual indicators

### Reports Integration

- [ ] **Include GSC Data in Reports**
  - [ ] File: `app/shopify/reports/page.tsx`
  - [ ] Traffic impact section
  - [ ] ROI calculation
  - [ ] Query performance
  - [ ] Export to PDF/CSV

---

## Testing

### Unit Tests

- [ ] **Library Functions**
  - [ ] Test `getOAuth2Client()`
  - [ ] Test `getAuthorizationUrl()`
  - [ ] Test `exchangeCodeForTokens()`
  - [ ] Test `refreshAccessToken()`
  - [ ] Test error handling

### Integration Tests

- [ ] **OAuth Flow**
  - [ ] Start OAuth flow
  - [ ] Verify redirect to Google
  - [ ] Complete callback
  - [ ] Verify tokens saved
  - [ ] Verify encryption
  - [ ] Verify CSRF protection

- [ ] **Data Sync**
  - [ ] Connect GSC
  - [ ] Trigger manual sync
  - [ ] Verify data imported
  - [ ] Check analytics table
  - [ ] Verify snapshots created
  - [ ] Check sync history

- [ ] **API Endpoints**
  - [ ] Test `/api/auth/google`
  - [ ] Test `/api/auth/google/callback`
  - [ ] Test `/api/shopify/gsc/connect`
  - [ ] Test `/api/shopify/gsc/disconnect`
  - [ ] Test `/api/shopify/gsc/sync`
  - [ ] Test `/api/shopify/gsc/analytics`
  - [ ] Test `/api/cron/sync-gsc`

### End-to-End Tests

- [ ] **Full User Journey**
  1. [ ] User navigates to GSC dashboard
  2. [ ] Clicks "Connect Google Search Console"
  3. [ ] Redirects to Google OAuth
  4. [ ] User authorizes app
  5. [ ] Callback processes successfully
  6. [ ] Redirects back to dashboard
  7. [ ] Shows "Connected" status
  8. [ ] Displays site verification status
  9. [ ] Triggers initial sync
  10. [ ] Data appears in dashboard
  11. [ ] Charts render correctly
  12. [ ] Can trigger manual sync
  13. [ ] Can disconnect GSC

### Edge Cases

- [ ] **Token Expiration**
  - [ ] Manually expire token
  - [ ] Trigger sync
  - [ ] Verify auto-refresh
  - [ ] Verify continued functionality

- [ ] **API Errors**
  - [ ] Network timeout
  - [ ] 429 Rate limit
  - [ ] 401 Unauthorized
  - [ ] 403 Forbidden
  - [ ] 500 Server error

- [ ] **Site Not Verified**
  - [ ] Connect unverified domain
  - [ ] Show warning message
  - [ ] Provide verification instructions

- [ ] **No Data Available**
  - [ ] New site with no data
  - [ ] Show empty state
  - [ ] Explain wait period

---

## Security Audit

- [ ] **Token Encryption**
  - [ ] Verify tokens encrypted at rest
  - [ ] Use AES-256-GCM
  - [ ] Unique IV for each encryption
  - [ ] Test decryption

- [ ] **CSRF Protection**
  - [ ] State parameter validated
  - [ ] Token expires after use
  - [ ] 10-minute expiration
  - [ ] Test replay attack prevention

- [ ] **Rate Limiting**
  - [ ] Implement request throttling
  - [ ] Respect GSC API quotas (1200/min)
  - [ ] Add exponential backoff
  - [ ] Log rate limit hits

- [ ] **Input Validation**
  - [ ] Validate connectionId format
  - [ ] Sanitize user inputs
  - [ ] Validate date ranges
  - [ ] Check enum values

- [ ] **Access Control**
  - [ ] Verify user owns connection
  - [ ] Check authentication on all routes
  - [ ] Validate cron secret
  - [ ] Test unauthorized access

---

## Performance Optimization

- [ ] **Database Queries**
  - [ ] Add indexes (already in schema)
  - [ ] Test query performance
  - [ ] Optimize N+1 queries
  - [ ] Add connection pooling

- [ ] **Caching**
  - [ ] Cache snapshots (5 min TTL)
  - [ ] Cache analytics summary
  - [ ] Implement Redis if needed
  - [ ] Cache invalidation strategy

- [ ] **Batch Operations**
  - [ ] Use transactions for bulk inserts
  - [ ] Batch API calls
  - [ ] Chunk large datasets
  - [ ] Stream large responses

- [ ] **Frontend**
  - [ ] Lazy load charts
  - [ ] Paginate tables
  - [ ] Debounce sync button
  - [ ] Show loading states

---

## Monitoring & Logging

- [ ] **Application Logs**
  - [ ] Log OAuth flows
  - [ ] Log sync operations
  - [ ] Log API errors
  - [ ] Log rate limits

- [ ] **Metrics**
  - [ ] Track sync success rate
  - [ ] Monitor API quota usage
  - [ ] Track token refresh rate
  - [ ] Measure query performance

- [ ] **Alerts**
  - [ ] Alert on sync failures >24h
  - [ ] Alert on token refresh failures
  - [ ] Alert on API quota near limit
  - [ ] Alert on slow queries (>2s)

- [ ] **Dashboard**
  - [ ] Create admin analytics page
  - [ ] Show GSC health metrics
  - [ ] Display sync statistics
  - [ ] Monitor error rates

---

## Deployment

### Pre-Deployment

- [ ] **Code Review**
  - [ ] Review all new files
  - [ ] Check for security issues
  - [ ] Verify error handling
  - [ ] Check TypeScript strict mode

- [ ] **Type Checking**
  ```bash
  npx tsc --noEmit
  ```
  - Expected: 0 errors

- [ ] **Linting**
  ```bash
  npm run lint
  ```
  - Expected: 0 errors or warnings

- [ ] **Build Test**
  ```bash
  npm run build
  ```
  - Expected: Successful build

### Deployment Steps

- [ ] **Deploy to Staging**
  1. [ ] Push to staging branch
  2. [ ] Vercel auto-deploys
  3. [ ] Run smoke tests
  4. [ ] Test OAuth flow
  5. [ ] Verify data sync

- [ ] **Deploy to Production**
  1. [ ] Merge to main branch
  2. [ ] Verify environment variables
  3. [ ] Vercel auto-deploys
  4. [ ] Monitor deployment logs
  5. [ ] Verify cron jobs scheduled

### Post-Deployment

- [ ] **Verify Production**
  - [ ] Check health endpoint
  - [ ] Test OAuth flow
  - [ ] Verify cron job scheduled
  - [ ] Check database connections
  - [ ] Monitor error logs

- [ ] **Smoke Tests**
  1. [ ] Connect GSC
  2. [ ] Trigger sync
  3. [ ] View dashboard
  4. [ ] Check timeline data
  5. [ ] Disconnect GSC

- [ ] **Monitor First 24 Hours**
  - [ ] Watch error rates
  - [ ] Check sync success rates
  - [ ] Monitor API quota
  - [ ] Review user feedback

---

## Documentation

- [ ] **User Documentation**
  - [ ] Create "How to Connect GSC" guide
  - [ ] Add troubleshooting section
  - [ ] Create video tutorial
  - [ ] Add FAQ

- [ ] **Developer Documentation**
  - [ ] API endpoint documentation
  - [ ] Database schema documentation
  - [ ] Architecture diagrams
  - [ ] Code comments

- [ ] **Admin Documentation**
  - [ ] Monitoring guide
  - [ ] Troubleshooting runbook
  - [ ] Incident response procedures
  - [ ] Scaling considerations

---

## Rollout Plan

### Phase 1: Beta Testing (Week 1)

- [ ] Enable for internal team only
- [ ] Invite 5-10 beta users
- [ ] Gather feedback
- [ ] Fix critical bugs
- [ ] Monitor closely

### Phase 2: Limited Release (Week 2)

- [ ] Enable for 10% of users
- [ ] Monitor performance
- [ ] Track adoption rate
- [ ] Collect feedback
- [ ] Iterate on UX

### Phase 3: Full Release (Week 3)

- [ ] Enable for all users
- [ ] Announce via email/blog
- [ ] Create announcement banner
- [ ] Monitor system load
- [ ] Provide support

---

## Success Metrics

Track these KPIs:

- [ ] **Adoption Rate**
  - Target: 50% of active users connect GSC within 30 days

- [ ] **Sync Success Rate**
  - Target: >99% successful syncs

- [ ] **Data Freshness**
  - Target: <24 hours data lag

- [ ] **User Satisfaction**
  - Target: >4.5/5 rating

- [ ] **API Performance**
  - Target: <2s response time for analytics

- [ ] **Error Rate**
  - Target: <0.1% error rate

---

## Completion Checklist

### Must Have (P0)

- [ ] OAuth flow working
- [ ] Data sync operational
- [ ] Dashboard displays metrics
- [ ] Cron job running
- [ ] Security audit passed
- [ ] Performance acceptable

### Should Have (P1)

- [ ] Fix impact comparison
- [ ] Query insights
- [ ] Page performance tracking
- [ ] Dashboard widgets
- [ ] Timeline integration
- [ ] Reports integration

### Nice to Have (P2)

- [ ] AI-powered query analysis
- [ ] Automated recommendations
- [ ] Custom report templates
- [ ] Export functionality
- [ ] Mobile optimization

---

## Sign-Off

### Technical Lead

- [ ] Code reviewed
- [ ] Tests passed
- [ ] Performance verified
- [ ] Security approved
- Signed: __________________ Date: __________

### Product Manager

- [ ] Requirements met
- [ ] UX approved
- [ ] Documentation complete
- [ ] Ready for release
- Signed: __________________ Date: __________

### DevOps

- [ ] Infrastructure ready
- [ ] Monitoring configured
- [ ] Alerts set up
- [ ] Crons scheduled
- Signed: __________________ Date: __________

---

## Post-Launch

- [ ] **Week 1 Review**
  - Review metrics
  - Address critical issues
  - Gather user feedback

- [ ] **Week 2 Optimization**
  - Performance tuning
  - UX improvements
  - Bug fixes

- [ ] **Month 1 Retrospective**
  - Team retrospective
  - Document lessons learned
  - Plan enhancements

---

## Future Enhancements

Planned for future releases:

1. **AI Query Analysis** - Use Claude to analyze query opportunities
2. **Competitor Tracking** - Benchmark against competitors
3. **Custom Reports** - User-defined GSC reports
4. **Webhook Integration** - Real-time GSC notifications
5. **Multi-Property** - Support multiple GSC properties
6. **Advanced Filtering** - Complex query builders
7. **Export Templates** - Custom export formats
8. **Mobile App** - GSC data in mobile app

---

## Conclusion

This checklist ensures a complete, secure, and performant Google Search Console integration for SEOLOGY.AI. Follow each step carefully and verify completion before moving to the next phase.

**Estimated Implementation Time:** 2-3 weeks for full completion

**Team Required:**
- 1 Senior Backend Engineer
- 1 Frontend Engineer
- 1 DevOps Engineer
- 1 QA Engineer

**Key Dependencies:**
- Google Cloud Console access
- Production database access
- Vercel deployment permissions
- Claude AI API access (for future enhancements)

Good luck with the implementation! 🚀
