# Debugging Guide - "An error occurred"

When you see "An error occurred", here's how to find the real issue:

## 🔍 Step 1: Check Browser Console

1. Open your browser
2. Press **F12** (or right-click → Inspect)
3. Click **Console** tab
4. Look for **red error messages**
5. Screenshot or copy the error text

Common errors you might see:
- `Failed to fetch` → API route not working
- `401 Unauthorized` → Not logged in
- `403 Forbidden` → Wrong permissions
- `500 Internal Server Error` → Backend error

## 🔍 Step 2: Check Network Tab

1. In DevTools, click **Network** tab
2. Reproduce the error
3. Look for **red items** in the list
4. Click on the failed request
5. Check the **Response** tab

This shows you the actual error from the API.

## 🔍 Step 3: Check Terminal/Server Logs

If running `npm run dev`, check your terminal for errors like:
```
Error: Cannot find module...
Error: Environment variable not set
Error: Database connection failed
```

## 🐛 Common Issues & Fixes

### Issue 1: "Failed to connect to database"
**Fix:** Check your `.env.local` file has `DATABASE_URL`
```bash
# Verify it's set
cat .env.local | grep DATABASE_URL
```

### Issue 2: "User not found" or "Unauthorized"
**Fix:** Make sure you're logged in with Clerk
1. Go to `/sign-in`
2. Log in
3. Try again

### Issue 3: "Cannot find module '@/components/...'"
**Fix:** File might not exist or path is wrong
```bash
# Check if file exists
ls components/dashboard/ConnectStoreButton.tsx
```

### Issue 4: API route returns 404
**Fix:** Check the API route file exists and is named correctly
```bash
# API routes should be named 'route.ts'
ls app/api/connection-requests/route.ts
```

### Issue 5: "Role is not ADMIN"
**Fix:** Your user account needs admin role in database
```sql
-- Run in Supabase SQL Editor
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## 🚨 Specific Page Errors

### Dashboard Page (`/dashboard`)
**Error:** "Cannot read properties of undefined"
**Fix:** User might not exist in database yet. First login creates user automatically.

### Sites Page (`/dashboard/sites`)
**Error:** Empty or not loading
**Check:**
1. Are you logged in?
2. Do you have connections in database?
3. Check browser console for errors

### Admin Page (`/admin`)
**Error:** Redirects to `/dashboard`
**Fix:** Your user role is not ADMIN. Update in database:
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
```

### Connection Request Submit
**Error:** "Failed to submit request"
**Check:**
1. Is API route working? → `/api/connection-requests`
2. Are all required fields filled? (platform, storeUrl)
3. Check browser console

### WordPress Connection Page
**Error:** "Module not found"
**Fix:** Component might not be imported correctly
```bash
# Check if file exists
ls components/dashboard/WordPressConnectionClient.tsx
```

## 🔧 Quick Diagnostic Commands

Run these in your terminal to check everything:

```bash
# 1. Check if build works
npm run build

# 2. Check TypeScript errors
npx tsc --noEmit

# 3. Check if database is accessible
npx prisma studio
# Should open browser to view database

# 4. Check if dev server starts
npm run dev
# Should see "Ready on http://localhost:3000"

# 5. Check environment variables
cat .env.local | grep -E "DATABASE_URL|CLERK|ANTHROPIC"
# Should show all required vars
```

## 📝 How to Report an Error

If you still can't fix it, provide:

1. **Exact error message** (from browser console)
2. **What you were doing** (clicked X button on Y page)
3. **Screenshot** of the error
4. **Browser console output** (copy the red errors)
5. **Server logs** (from terminal if running `npm run dev`)

Example good error report:
```
Error: "Failed to fetch POST /api/connection-requests"

What I did:
1. Went to /dashboard/sites
2. Clicked "Connect Store" button
3. Filled out form (Shopify, mystore.myshopify.com)
4. Clicked "Submit Request"

Browser console shows:
POST http://localhost:3000/api/connection-requests 500 (Internal Server Error)

Server terminal shows:
PrismaClientKnownRequestError: Invalid `prisma.connectionRequest.create()` invocation
```

## 🎯 Most Likely Causes

Based on what we just built:

1. **Database schema not pushed**
   ```bash
   npx prisma db push
   ```

2. **Missing environment variable**
   - Check `.env.local` has all required vars

3. **Not logged in**
   - Go to `/sign-in` first

4. **User doesn't exist in database**
   - First login creates user automatically

5. **Admin role not set**
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
   ```

6. **API route typo**
   - Check URL in browser DevTools Network tab matches the route file

7. **Component import error**
   - Check file exists and path is correct

## 🛠️ Reset Database (if needed)

If database is corrupted or wrong schema:
```bash
# Push current schema to database
npx prisma db push --force-reset

# View in browser
npx prisma studio
```

⚠️ **Warning:** `--force-reset` deletes all data!

## 💡 Pro Tips

1. **Always check browser console first** - 90% of errors show there
2. **Check server terminal** - Backend errors appear here
3. **Use Prisma Studio** to verify database data
4. **Try incognito mode** - Rules out cache issues
5. **Clear browser cache** - Old code might be cached

---

Still stuck? Share the exact error message and I'll help fix it!
