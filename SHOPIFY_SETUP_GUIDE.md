# Shopify App Setup Guide

## What You Have ✅
- Shopify custom app created in dev dashboard
- 1 test installation
- Full OAuth flow already built in code
- API client with rate limiting and error handling

## What You Need 🔧

### 1. Get Your App Credentials

From your Shopify dev dashboard (the screenshot you showed):

1. Click on **Settings** in the left sidebar
2. Under "App credentials", you'll see:
   - **Client ID** (API key)
   - **Client secret** (API secret key)
3. Copy both values

### 2. Set Environment Variables

Add these to your Vercel environment variables (or `.env.local` for local dev):

```bash
# Shopify App Credentials
SHOPIFY_CLIENT_ID=your_client_id_from_settings
SHOPIFY_CLIENT_SECRET=your_client_secret_from_settings

# Encryption Key (for storing access tokens securely)
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
ENCRYPTION_KEY=your_generated_32_byte_key

# App URL
NEXT_PUBLIC_APP_URL=https://seology.ai
```

### 3. Configure App URLs in Shopify Dashboard

In your Shopify app dashboard → Settings:

**App URL:**
```
https://seology.ai
```

**Allowed redirection URL(s):**
```
https://seology.ai/api/auth/shopify/callback
https://seology.ai/api/auth/shopify/install
```

### 4. Configure Access Scopes

In your Shopify app dashboard → Configuration → API access:

Check these scopes:
- ✅ `read_products` - Read product catalog
- ✅ `write_products` - Update product SEO (titles, descriptions)
- ✅ `read_content` - Read pages, blog posts
- ✅ `write_content` - Update page meta tags
- ✅ `read_themes` - Read theme files (for script injection)
- ✅ `write_themes` - Inject SEO optimization scripts
- ✅ `read_analytics` - Read store performance data
- ✅ `read_online_store_pages` - Read pages for SEO analysis
- ✅ `write_online_store_pages` - Update page SEO

## How It Works 🔄

### User Flow (Already Built!)

1. **User enters store URL**
   - They go to SEOLOGY dashboard → Connect Site
   - Enter: `mystore.myshopify.com`

2. **OAuth begins**
   - User clicks "Connect Shopify"
   - Redirected to: `/api/auth/shopify/install?shop=mystore.myshopify.com`
   - System generates secure state token

3. **Shopify authorization**
   - User redirected to Shopify admin
   - Shopify shows: "SEOLOGY wants to access your store"
   - Lists all the permissions (scopes above)
   - User clicks "Install"

4. **Callback & token exchange**
   - Shopify redirects to: `/api/auth/shopify/callback?code=xxx&shop=xxx`
   - Your app exchanges code for permanent access token
   - Token is **encrypted** and stored in database
   - Connection created and linked to user

5. **AI can now control store!**
   - Chat can read products, pages, analytics
   - Chat can update product SEO (titles, descriptions)
   - Chat can fix broken links with redirects
   - Chat can optimize page content
   - Chat can add structured data

## Testing the Connection 🧪

### Local Testing

1. Set env variables in `.env.local`
2. Run dev server: `npm run dev`
3. Go to: `http://localhost:3000/dashboard/sites/connect`
4. Enter your test store: `your-test-store.myshopify.com`
5. Complete OAuth flow

### Production Testing

1. Set env variables in Vercel dashboard
2. Deploy to production
3. Use your app install URL from Shopify dashboard
4. Complete installation on test store

## What the AI Chat Can Do 🤖

Once connected, users can ask:

**Product SEO:**
- "Optimize the meta description for my best selling products"
- "Add alt text to all product images"
- "Improve product titles for SEO"

**Content SEO:**
- "Fix all broken links on my site"
- "Add structured data to my product pages"
- "Optimize my blog posts for SEO"

**Technical SEO:**
- "Analyze my site speed and fix issues"
- "Add redirects for 404 errors"
- "Optimize my sitemap"

**The AI will:**
1. Connect to their Shopify store via the encrypted access token
2. Use GraphQL API to read current state
3. Generate the fix
4. Apply it directly to their store
5. Show before/after comparison

## Troubleshooting 🔧

### "Connection failed"
- Check if `SHOPIFY_CLIENT_ID` and `SHOPIFY_CLIENT_SECRET` are set
- Verify redirect URLs match exactly (no trailing slash)
- Check if encryption key is 32 bytes

### "Access denied"
- User may have clicked "Cancel" during OAuth
- Check if all required scopes are configured
- Verify store is active (not in trial/frozen)

### "Token expired"
- Shopify access tokens are permanent by default
- If expired, user needs to reconnect
- Check if token is properly encrypted/decrypted

## Code Files (Already Built!) ✅

Your app already has all this code:

- **`lib/shopify.ts`** - Full Shopify API client with rate limiting
- **`app/api/auth/shopify/install/route.ts`** - OAuth initiation
- **`app/api/auth/shopify/callback/route.ts`** - OAuth callback & token exchange
- **`lib/encryption.ts`** - Secure token storage
- **`lib/ai-tools.ts`** - AI functions for Shopify operations

## Next Steps 📋

1. ✅ Get Client ID and Secret from Shopify dashboard
2. ✅ Set environment variables in Vercel
3. ✅ Configure redirect URLs in Shopify app settings
4. ✅ Test installation on your development store
5. ✅ Test AI chat making changes to products
6. ✅ Deploy to production
7. ✅ Ready for users!

## Distribution Options 🚀

### Option 1: Custom App (Current Setup)
- Users install via direct URL
- You provide install link
- Good for beta/controlled rollout

### Option 2: Shopify App Store (Future)
- Submit app for review
- Listed in public app store
- Users discover via search
- More visibility and installs

**Note:** Your current setup works for Option 1 immediately. You can launch and get users today!
