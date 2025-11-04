# 🔐 Making a User an Admin in Supabase

## Quick Answer

You need to change the `role` field in the `User` table from `USER` to `ADMIN` for the logged-in user.

---

## Step-by-Step Instructions

### Method 1: Using Supabase SQL Editor (Easiest)

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Find the user's email first** (to confirm they exist):
   ```sql
   SELECT id, email, name, role, "clerkId"
   FROM "User"
   ORDER BY "createdAt" DESC
   LIMIT 10;
   ```
   This shows your 10 most recent users.

4. **Run this SQL to make them admin**:
   ```sql
   UPDATE "User"
   SET role = 'ADMIN'
   WHERE email = 'YOUR_EMAIL_HERE@example.com';
   ```

   Replace `YOUR_EMAIL_HERE@example.com` with the actual email of the user who logged in.

5. **Verify it worked**:
   ```sql
   SELECT email, role FROM "User" WHERE email = 'YOUR_EMAIL_HERE@example.com';
   ```
   Should show `role: ADMIN`

---

### Method 2: Using Supabase Table Editor (Visual)

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project

2. **Open Table Editor**
   - Click "Table Editor" in left sidebar
   - Select the **"User"** table

3. **Find your user**
   - Look for the row with your email
   - Click on the row to expand it

4. **Edit the role field**
   - Find the `role` column
   - Click on it to edit
   - Change from `USER` to `ADMIN`
   - Click the checkmark to save

5. **Refresh the page**
   - The change is immediate
   - Next time that user logs in, they'll be an admin

---

## Testing Admin Access

After making the change:

1. **Logout and Login Again**
   - Go to your app
   - Logout (if logged in)
   - Login again with the admin email

2. **Visit the Admin Panel**
   ```
   http://localhost:3000/admin
   ```

3. **What should happen:**
   - ✅ You see the admin dashboard
   - ✅ Sidebar shows admin navigation
   - ✅ You can access all admin pages

4. **If redirected to `/dashboard`:**
   - Role wasn't set correctly
   - Check Supabase again
   - Make sure it says `ADMIN` (not `Admin` or `admin`)

---

## Common Issues & Solutions

### Issue 1: "User doesn't exist in database"
**Problem:** User logged in with Clerk but wasn't created in Supabase yet.

**Solution:**
1. Visit `/dashboard` first (this auto-creates the user)
2. Then check Supabase - user should now exist
3. Update role to ADMIN
4. Try `/admin` again

### Issue 2: "Still redirecting to /dashboard"
**Problem:** Role not set correctly or case mismatch.

**Solution:**
```sql
-- Check exact value
SELECT email, role FROM "User" WHERE email = 'your@email.com';

-- If it shows anything other than 'ADMIN', fix it:
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';

-- Verify again
SELECT email, role FROM "User" WHERE email = 'your@email.com';
```

### Issue 3: "Can't find the user in Supabase"
**Problem:** User hasn't been created in database yet (only in Clerk).

**Solution:**
1. Make sure you're logged in to the app
2. Visit `/dashboard` at least once
3. This triggers user creation in Supabase
4. Now check Supabase Table Editor again

---

## SQL Cheat Sheet for Supabase

```sql
-- 1. View all users
SELECT email, role, "createdAt" FROM "User" ORDER BY "createdAt" DESC;

-- 2. Find specific user
SELECT * FROM "User" WHERE email = 'your@email.com';

-- 3. Make user admin
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';

-- 4. Make user regular again
UPDATE "User" SET role = 'USER' WHERE email = 'your@email.com';

-- 5. Count total admins
SELECT COUNT(*) FROM "User" WHERE role = 'ADMIN';

-- 6. List all admins
SELECT email, name, "createdAt" FROM "User" WHERE role = 'ADMIN';
```

---

## Video Walkthrough (Step-by-Step)

### Using SQL Editor:

1. **Supabase Dashboard** → Click your project
2. **Left Sidebar** → Click "SQL Editor"
3. **Click** "New query"
4. **Paste this** (replace email):
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
   ```
5. **Click** "Run" (or Ctrl+Enter)
6. **Should see**: "Success. No rows returned"
7. **Verify**:
   ```sql
   SELECT email, role FROM "User" WHERE email = 'your@email.com';
   ```
8. **Should show**: `role: ADMIN`

### Using Table Editor:

1. **Supabase Dashboard** → Click your project
2. **Left Sidebar** → Click "Table Editor"
3. **Select** "User" table
4. **Find** row with your email
5. **Click** on the `role` cell
6. **Change** to `ADMIN`
7. **Press** Enter or click checkmark
8. **Done!** ✅

---

## Which Email Should I Use?

The email you need is **the email you logged in with via Clerk**.

To find it:
1. In your app, click your profile/avatar
2. Check what email is shown
3. Use that exact email in the SQL query

OR

1. Go to Clerk Dashboard (https://dashboard.clerk.com)
2. Click "Users"
3. Find your user
4. Copy the email
5. Use that in Supabase

---

## Example: Complete Flow

Let's say your email is `john@example.com`:

### Step 1: Login to your app
```
http://localhost:3000/sign-in
```
Login with `john@example.com`

### Step 2: Visit dashboard once
```
http://localhost:3000/dashboard
```
This creates your user in Supabase

### Step 3: Go to Supabase
- Open https://supabase.com/dashboard
- Select your project
- Click "SQL Editor"
- Click "New query"

### Step 4: Run this SQL
```sql
UPDATE "User"
SET role = 'ADMIN'
WHERE email = 'john@example.com';
```

### Step 5: Verify
```sql
SELECT email, role FROM "User" WHERE email = 'john@example.com';
```
Should show: `role: ADMIN`

### Step 6: Visit admin panel
```
http://localhost:3000/admin
```

### Step 7: Success! 🎉
You should now see the admin dashboard!

---

## Troubleshooting Checklist

- [ ] User exists in Supabase (visited `/dashboard` at least once)
- [ ] Email matches exactly (case-sensitive)
- [ ] Role is set to `ADMIN` (all caps)
- [ ] Logged out and logged back in
- [ ] Visiting `/admin` not `/dashboard/admin`
- [ ] Dev server is running (`npm run dev`)

---

## Security Note

⚠️ **Important**: Only make trusted users admins!

Admins can:
- View all user data
- Manage all connections
- Approve/reject connection requests
- View all issues and fixes
- Access system analytics
- Broadcast notifications to all users

---

## Need Help?

If it's still not working:

1. **Check browser console** (F12)
2. **Check terminal logs** (where `npm run dev` is running)
3. **Verify in Supabase** that role = 'ADMIN'
4. **Clear browser cache** and try again
5. **Try incognito mode**

---

**TL;DR**: Go to Supabase → SQL Editor → Run:
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
```
Then visit `/admin` in your app! ✨
