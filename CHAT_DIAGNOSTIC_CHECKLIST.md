# Shopify Chat - Diagnostic Checklist

**Status**: Awaiting User Feedback on Specific Issues

---

## What Was Implemented

### ✅ Completed Features

1. **Chat Layout (75/25 Split)**
   - Left: 75% Store Overview
   - Right: 25% Chat Interface

2. **Quick Actions Under Chat Input**
   - 🔍 Analyze Products
   - 🔧 Fix Store Issues
   - 📄 Audit Content

3. **Execution Mode Switching**
   - Clickable mode card
   - Modal with AUTOMATIC/PLAN/APPROVE options
   - API integration working
   - System messages in chat

4. **Command Detection**
   - Intent patterns for analyze/fix commands
   - Direct API execution
   - Claude AI summaries

5. **Dashboard Data Loading**
   - Fixed API response mapping
   - Proper data display

---

## Potential Issues to Check

### Issue 1: No Shopify Connection in Database
**Problem**: Chat needs a real Shopify connection to work
**Symptoms**:
- Dashboard shows "0" for everything
- Chat returns "Shop not connected" error
- Execution mode shows "Loading..."

**Solution Needed**: Create Shopify development store and complete OAuth

---

### Issue 2: Missing Environment Variables
**Problem**: API keys not configured
**Check**:
```bash
# Required environment variables
ANTHROPIC_API_KEY=sk-ant-...
DATABASE_URL=postgresql://...
```

**Symptoms**:
- Chat returns 500 errors
- No AI responses
- Database connection failures

---

### Issue 3: Chat API Endpoint Issues
**Problem**: `/api/shopify/chat` not processing correctly
**Check**:
- Line 92: Shop parameter validation
- Line 100-109: Connection lookup
- Line 66-88: Intent detection

**Possible Errors**:
- Missing shop parameter
- Connection not found in DB
- Intent detection failing

---

### Issue 4: GraphQL Helpers Not Working
**Problem**: Shopify GraphQL queries failing
**Dependencies**:
- `lib/shopify-graphql.ts` - getProducts, getPages, getCollections
- `lib/shopify-fix-engine.ts` - createFixesFromAudit
- `lib/usage-enforcement.ts` - canApplyFixes

**Symptoms**:
- "Failed to fetch products" errors
- No audit results
- No fixes created

---

### Issue 5: Frontend State Management
**Problem**: React state not updating correctly
**Check Chat Page** (`app/shopify/chat/page.tsx`):
- Line 66-79: fetchStoreContext()
- Line 81-144: sendMessage()
- Line 153-216: changeExecutionMode()

**Symptoms**:
- Execution mode doesn't update
- Messages don't appear
- Modal doesn't close

---

### Issue 6: TypeScript Compilation Errors
**Status**: ✅ PASSING (zero errors)
```bash
npx tsc --noEmit
# Result: No output = success
```

---

### Issue 7: API Route Missing/Not Found
**Check These Routes Exist**:
- ✅ `/api/shopify/chat/route.ts`
- ✅ `/api/shopify/context/route.ts`
- ✅ `/api/shopify/execution-mode/route.ts`
- ❓ `/api/shopify/analyze-and-fix/route.ts` (may be needed)

---

### Issue 8: Database Schema Issues
**Check Prisma Schema** (`prisma/schema.prisma`):
- ✅ User model with executionMode
- ✅ Connection model
- ✅ ShopifyProduct model
- ✅ Issue model
- ✅ Fix model

**Run**: `npx prisma generate` to regenerate client

---

### Issue 9: Missing Clerk Authentication
**Problem**: User not authenticated
**Check**:
- Clerk environment variables set
- User logged in to system
- Session valid

**Symptoms**:
- Redirected to sign-in
- No user ID in requests
- Database queries fail

---

### Issue 10: Context API Returning Wrong Data
**Problem**: `/api/shopify/context` response doesn't match expected format
**Expected Response**:
```json
{
  "success": true,
  "data": {
    "executionMode": "PLAN",
    "productCount": 20,
    "issueCount": 5,
    "planName": "GROWTH",
    "credits": {
      "used": 10,
      "limit": 5000,
      "remaining": 4990
    }
  }
}
```

**Check**: `app/api/shopify/context/route.ts` lines 67-76

---

## Quick Diagnostic Steps

### Step 1: Check Dev Server
```bash
npm run dev
# Open http://localhost:3000/shopify/chat?shop=test.myshopify.com
```

### Step 2: Check Browser Console
```
F12 → Console tab
Look for errors in red
```

### Step 3: Check Network Tab
```
F12 → Network tab
Watch for failed API calls (red status codes)
```

### Step 4: Test API Directly
```bash
# Test context API
curl http://localhost:3000/api/shopify/context?shop=test.myshopify.com

# Test chat API
curl -X POST http://localhost:3000/api/shopify/chat \
  -H "Content-Type: application/json" \
  -d '{"shop":"test.myshopify.com","messages":[{"role":"user","content":"analyze my products"}]}'
```

---

## Common Error Messages

### "Missing shop parameter"
**Cause**: URL missing `?shop=` query parameter
**Fix**: Add `?shop=yourstore.myshopify.com` to URL

### "Shop not connected"
**Cause**: No connection in database for this shop
**Fix**: Complete Shopify OAuth flow to create connection

### "Failed to fetch store context"
**Cause**: Context API returning error
**Fix**: Check database connection, ensure connection exists

### "Failed to change execution mode"
**Cause**: API parameter mismatch or connection not found
**Fix**: ✅ Already fixed - changed `mode` to `executionMode`

### "Network error while changing execution mode"
**Cause**: API endpoint not responding
**Fix**: Ensure dev server running, check API route exists

---

## Next Steps for User

**Please provide**:
1. **Specific error message** you're seeing
2. **What you're trying to do** when it breaks
3. **Browser console errors** (F12 → Console)
4. **Network tab errors** (F12 → Network)
5. **Current URL** you're accessing

**Example useful info**:
```
Issue: When I click "Analyze Products", nothing happens
URL: http://localhost:3000/shopify/chat?shop=mystore.myshopify.com
Console Error: "TypeError: Cannot read property 'productCount' of null"
Network: POST /api/shopify/chat returned 404 Not Found
```

---

## Files to Check for Issues

1. **Chat Page**: `app/shopify/chat/page.tsx`
   - Frontend React component
   - State management
   - UI rendering

2. **Chat API**: `app/api/shopify/chat/route.ts`
   - Intent detection
   - Command execution
   - AI integration

3. **Context API**: `app/api/shopify/context/route.ts`
   - Store data fetching
   - Dashboard stats

4. **Execution Mode API**: `app/api/shopify/execution-mode/route.ts`
   - Mode switching logic
   - Database updates

5. **GraphQL Helpers**: `lib/shopify-graphql.ts`
   - Shopify API integration
   - Product/page queries

6. **Fix Engine**: `lib/shopify-fix-engine.ts`
   - Fix generation
   - Fix application

7. **Usage Enforcement**: `lib/usage-enforcement.ts`
   - Plan limits
   - Usage tracking

---

## Status: Awaiting Specific Issue Details

Once you provide details on what's broken, I can:
1. Identify the root cause
2. Fix the specific issue
3. Test the solution
4. Update this diagnostic
