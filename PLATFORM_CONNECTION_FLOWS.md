# Platform-Specific Connection Flows

## Overview

SEOLOGY now supports different connection methods for each platform type, providing the most appropriate user experience for each:

---

## 1. Shopify Connection 🛍️

### Flow:
1. **Customer** clicks "Connect Store" → Selects Shopify → Submits request
2. **Admin** approves request in admin dashboard
3. System generates **Shopify OAuth URL**
4. **Customer** receives notification with OAuth link
5. Customer clicks link → Redirects to Shopify admin
6. Customer **authorizes app** (one-click)
7. Shopify redirects back with access token
8. Connection created ✅

### Technical Details:
- **Method**: OAuth 2.0
- **Scopes**: products, content, themes, customers, online_store_pages (read/write)
- **Access**: Full API access via encrypted access token
- **Setup Time**: ~30 seconds

### Customer Experience:
- ✅ Easiest method
- ✅ One-click authorization
- ✅ No credentials needed
- ✅ Instant connection

---

## 2. WordPress Connection 📝

### Flow:
1. **Customer** clicks "Connect Store" → Selects WordPress → Submits request
2. **Admin** approves request
3. System sends link to **WordPress setup page**
4. **Customer** follows REST API setup:
   1. Verify WordPress REST API is enabled (default)
   2. Create Application Password: `Users → Profile → Application Passwords`
   3. Enter WordPress username + application password in form
   4. Submit credentials
   5. Connection created ✅

### Technical Details:
- **Method**: REST API with Application Passwords
- **Access**: WordPress REST API endpoints
- **Credentials**: Encrypted application password (not user password)
- **Setup Time**: 3-5 minutes

### Customer Experience:
- ✅ No plugins required
- ✅ Uses WordPress native features
- ✅ Secure Application Passwords
- ⚠️ Requires manual setup (3 steps)

### Future Enhancement:
- 🔮 WordPress plugin coming soon for one-click setup

---

## 3. Custom Sites (Magic.js) ⚡

### Flow:
1. **Customer** clicks "Connect Store" → Selects Custom → Submits request
2. **Admin** approves request
3. System generates unique **Magic.js snippet**
4. **Customer** receives notification with snippet
5. Customer adds snippet to website `<head>` section
6. System detects snippet on next page load
7. Connection created ✅

### Technical Details:
- **Method**: JavaScript tracking snippet (Magic.js)
- **Implementation**: Add `<script>` tag to HTML
- **Detection**: Auto-detects on page load
- **Fixes**: Applied client-side via snippet
- **Setup Time**: 1-2 minutes

### Customer Experience:
- ✅ Works with any platform
- ✅ No backend access needed
- ✅ Copy-paste setup
- ⚠️ Requires website editing access

---

## 4. WIX / Webflow 🎨

### Flow:
Same as Custom Sites (Magic.js method)

1. **Customer** selects platform → Submits request
2. **Admin** approves → Generates Magic.js snippet
3. **Customer** adds snippet to platform settings:
   - **WIX**: `Settings → Custom Code → Add code to all pages`
   - **Webflow**: `Project Settings → Custom Code → Head Code`
4. Connection detected ✅

### Technical Details:
- **Method**: Magic.js snippet (same as custom sites)
- **Platform-specific**: Instructions tailored to each builder
- **Setup Time**: 2-3 minutes

---

## Connection Request Workflow

### Customer Side:
```
[Dashboard] → Click "Connect Store"
            ↓
[Modal Opens] → Select Platform
              → Enter Store URL
              → Optional: Store Name, Message
              ↓
[Submit Request] → "Request submitted! You'll be notified when approved"
```

### Admin Side:
```
[Admin Dashboard] → /admin/connection-requests
                  ↓
[View Requests] → Filter by status
                → See customer details
                → Review platform & store URL
                ↓
[Approve] → System generates appropriate link/instructions
          → Customer notified
          ↓
[Customer Connects] → Connection status updates
                    → Admin sees in connections list
```

---

## API Routes

### Customer APIs:
- `POST /api/connection-requests` - Submit connection request
- `GET /api/connection-requests` - Get user's request history
- `POST /api/connections/wordpress` - Complete WordPress API connection

### Admin APIs:
- `GET /api/admin/connection-requests` - List all requests (via page)
- `POST /api/admin/connection-requests/[id]/approve` - Approve request
- `POST /api/admin/connection-requests/[id]/reject` - Reject request

---

## Database Schema

### ConnectionRequest Model:
```prisma
model ConnectionRequest {
  id               String                    @id @default(uuid())
  userId           String
  user             User                      @relation(...)

  platform         Platform                  // SHOPIFY, WORDPRESS, CUSTOM
  storeUrl         String
  storeName        String?
  message          String?

  status           ConnectionRequestStatus   // PENDING, APPROVED, CONNECTED, etc.
  oauthUrl         String?                   // Generated link for customer
  connectionId     String?                   // Once connected
  rejectionReason  String?

  reviewedBy       String?                   // Admin user ID
  reviewedAt       DateTime?

  createdAt        DateTime                  @default(now())
  updatedAt        DateTime                  @updatedAt
}

enum ConnectionRequestStatus {
  PENDING     // Customer submitted, awaiting admin review
  APPROVED    // Admin approved, link generated
  LINK_SENT   // Link/instructions sent to customer
  CONNECTED   // Customer completed connection
  REJECTED    // Admin rejected
  EXPIRED     // Request expired (7 days)
}
```

---

## UI Components

### Customer Components:
- **ConnectStoreButton** (`components/dashboard/ConnectStoreButton.tsx`)
  - Modal with platform selection
  - Platform-specific help text
  - Dynamic "What happens next" instructions

- **WordPressConnectionClient** (`components/dashboard/WordPressConnectionClient.tsx`)
  - Plugin vs API method selection
  - Step-by-step instructions
  - API credentials form

### Admin Components:
- **ConnectionRequestsClient** (`components/admin/ConnectionRequestsClient.tsx`)
  - List all connection requests
  - Filter by status
  - Approve/Reject actions
  - View customer details

---

## Platform-Specific Notifications

### Shopify:
> 🎉 **Your Shopify Store is Ready to Connect!**
>
> Click below to authorize SEOLOGY in your Shopify admin. This will take just a few seconds.

### WordPress:
> 📝 **WordPress Connection Instructions Ready!**
>
> Click below to view setup instructions. You can install our plugin or connect via REST API.

### Custom/Magic.js:
> ⚡ **Your Magic.js Snippet is Ready!**
>
> Click below to get your tracking snippet. Just add it to your website's <head> section and you're done!

---

## Future Enhancements

### Planned Features:
- [ ] WooCommerce-specific connection (separate from WordPress)
- [ ] BigCommerce OAuth integration
- [ ] Squarespace connection via snippet
- [ ] Auto-detect platform from URL
- [ ] Connection health monitoring
- [ ] Auto-renewal for expired OAuth tokens
- [ ] Bulk approve for admins
- [ ] Connection templates for common setups

---

## Security Considerations

### Shopify:
- ✅ OAuth 2.0 with state parameter (CSRF protection)
- ✅ HTTPS-only redirects
- ✅ Access tokens encrypted at rest (AES-256-GCM)
- ✅ Scopes limited to necessary permissions

### WordPress:
- ✅ Application Passwords (not user passwords)
- ✅ Credentials encrypted at rest
- ✅ HTTPS required for API calls
- ✅ Read-only access where possible

### Magic.js:
- ✅ Unique snippet per customer
- ✅ Domain verification
- ✅ Rate limiting on snippet detection
- ✅ No sensitive data in client-side code

---

## Support & Documentation

### For Customers:
- Shopify: [docs.seology.ai/shopify-connection](https://docs.seology.ai/shopify-connection)
- WordPress: [docs.seology.ai/wordpress-connection](https://docs.seology.ai/wordpress-connection)
- Custom Sites: [docs.seology.ai/magicjs-setup](https://docs.seology.ai/magicjs-setup)

### For Admins:
- Connection Management: [docs.seology.ai/admin/connections](https://docs.seology.ai/admin/connections)
- Troubleshooting: [docs.seology.ai/admin/troubleshooting](https://docs.seology.ai/admin/troubleshooting)
