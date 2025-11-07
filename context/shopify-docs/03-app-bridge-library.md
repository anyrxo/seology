# Shopify App Bridge Library Overview

**Source**: https://shopify.dev/docs/api/app-bridge-library

---

## What is App Bridge?

App Bridge is Shopify's JavaScript SDK designed for embedded applications within the Shopify Admin. It provides "access to data and UI rendering within the Shopify Admin" while integrating with standard web platform APIs developers already know.

## Setup & Installation

### Basic Implementation
To add App Bridge to your application, include a script tag and your API key in the document head:

```html
<head>
  <meta name="shopify-api-key" content="%SHOPIFY_API_KEY%" />
  <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
</head>
```

The script "loads directly from Shopify and automatically keeps itself up-to-date," eliminating manual version management. Apps created with the Shopify Remix App template come pre-configured with App Bridge.

### React Integration
For React projects, install the companion library:
```bash
npm install @shopify/app-bridge-react
```

TypeScript support is available through `@shopify/app-bridge-types`.

## Core Functionality

### Global Variable Access
After setup, developers access the `shopify` global variable to leverage various functionalities like "displaying toast notifications or retrieving app configuration details."

### Direct API Access
Apps can make authenticated requests to the Admin GraphQL API using the standard `fetch()` API. These calls are "automatically authenticated by default," and Shopify handles requests directly for improved performance.

Example API call syntax:
```javascript
fetch('shopify:admin/api/2025-04/graphql.json', {
  method: 'POST',
  body: JSON.stringify({
    query: `...GraphQL query...`,
    variables: {...}
  })
})
```

Direct API access must be explicitly enabled in the app's TOML configuration file.

### Resource Picker
The library provides a Resource Picker component enabling users to "browse, find, and select products from their store using a familiar experience."

## Key Features & APIs

App Bridge exposes numerous capabilities including:
- Loading indicators
- Modal windows
- Navigation controls
- Toast notifications
- Save bar functionality
- Scanner integration
- Print capabilities
- User information retrieval
- App configuration access

## Best Practices

Developers can explore available functionality by accessing the Chrome developer console within the Shopify Admin, switching to the app's iframe context, and examining the `shopify` object directly.

Support is available through the API & SDK community forum and the official GitHub issue tracker for bug reports and feature requests.

---

## SEOLOGY.AI Implementation

### Current Setup

We've implemented App Bridge in [app/shopify/layout.tsx](../../../app/shopify/layout.tsx:54-58):

```typescript
<Script
  src="https://cdn.shopify.com/shopifycloud/app-bridge.js"
  strategy="beforeInteractive"
/>
```

**Critical Details**:
- Uses Next.js `Script` component with `strategy="beforeInteractive"`
- Loads BEFORE our app JavaScript runs (required for App Bridge)
- Cannot use `async` or `defer` attributes (Shopify requirement)
- Added `https://cdn.shopify.com` to CSP in middleware.ts

### What We're NOT Using Yet

1. **`shopify` Global Variable** - We haven't accessed this yet for toast notifications, modals, etc.
2. **Direct API Access** - We're not using the `shopify:admin/api/...` pattern yet
3. **Resource Picker** - We could use this for selecting products
4. **Session Tokens** - We should use App Bridge to get session tokens for authentication

### How We SHOULD Be Using App Bridge

**Authentication with Session Tokens**:
```typescript
// In our Shopify pages (client-side)
const sessionToken = await shopify.idToken();

// Send with API requests
const response = await fetch('/api/shopify/products', {
  headers: {
    'Authorization': `Bearer ${sessionToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ shop: shopify.config.shop })
});
```

**Toast Notifications** (Instead of our broken sonner library):
```typescript
// Show success message
shopify.toast.show('Product updated successfully!');

// Show error message
shopify.toast.show('Failed to update product', { isError: true });
```

**Resource Picker** (For selecting products/images):
```typescript
// Open product picker
const products = await shopify.resourcePicker({
  type: 'product',
  multiple: true
});

// User selected products
console.log(products); // [{ id: 'gid://...', title: '...' }]
```

**Loading States**:
```typescript
// Show loading indicator
shopify.loading(true);

// Hide loading indicator
shopify.loading(false);
```

**Modals**:
```typescript
// Open a modal
shopify.modal.show({
  title: 'Confirm Action',
  message: 'Are you sure you want to delete this agent?',
  primaryAction: {
    label: 'Delete',
    destructive: true
  },
  secondaryAction: {
    label: 'Cancel'
  }
});
```

### Debugging App Bridge

To inspect available App Bridge functionality:

1. Open Shopify Admin
2. Navigate to our app (loads in iframe)
3. Open Chrome DevTools
4. Switch to our app's iframe context (in console dropdown)
5. Type `shopify` in console
6. Explore available methods

### Next Steps

1. **Replace Toast Notifications** - Use `shopify.toast.show()` instead of sonner
2. **Implement Session Tokens** - Use `shopify.idToken()` for authentication
3. **Add Resource Pickers** - Let users select products/images for optimization
4. **Use Loading States** - Show `shopify.loading()` during API calls
5. **Add Modals** - Use `shopify.modal.show()` for confirmations

### Important Notes

**API Key Configuration**: We need to add our Shopify API key to the page:
```html
<meta name="shopify-api-key" content="%SHOPIFY_API_KEY%" />
```

This should be added in [app/shopify/layout.tsx](../../../app/shopify/layout.tsx:22).

**Shop Parameter**: App Bridge needs to know which shop is accessing the app. We're currently getting this from the URL `?shop=` parameter, which is correct.

**TOML Configuration**: We don't use Shopify CLI, so we don't have a TOML file. We configured everything manually in Shopify Partners dashboard.
