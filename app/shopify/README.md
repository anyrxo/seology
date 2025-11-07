# Shopify Embedded App - Developer Guide

This directory contains the embedded Shopify app for SEOLOGY.AI.

## App Bridge Integration

We use **Shopify App Bridge** for native Shopify Admin UI components like toast notifications, modals, and loading indicators.

### Setup

The App Bridge is loaded in [layout.tsx](layout.tsx) with the following configuration:

```tsx
// Meta tag for API key
<meta name="shopify-api-key" content={process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID} />

// Script loaded before interactive
<Script
  src="https://cdn.shopify.com/shopifycloud/app-bridge.js"
  strategy="beforeInteractive"
/>
```

### Using App Bridge Utilities

Import the utilities from `@/lib/shopify-app-bridge`:

```tsx
import {
  showSuccessToast,
  showErrorToast,
  confirmDialog,
  setLoading,
  getSessionToken,
  openResourcePicker
} from '@/lib/shopify-app-bridge'
```

### Toast Notifications

**Success Toast:**
```tsx
showSuccessToast('Agent created successfully')
```

**Error Toast:**
```tsx
showErrorToast('Failed to delete agent')
```

**Custom Toast:**
```tsx
showToast('Processing...', { duration: 5000 })
```

### Confirmation Dialogs

Replace `window.confirm()` with App Bridge modals:

```tsx
const confirmed = await confirmDialog({
  title: 'Delete Agent',
  message: 'Are you sure you want to delete this agent? This action cannot be undone.',
  primaryAction: { label: 'Delete', destructive: true },
  secondaryAction: { label: 'Cancel' }
})

if (confirmed) {
  // Proceed with deletion
}
```

### Loading Indicators

Show/hide loading state:

```tsx
setLoading(true)
await performOperation()
setLoading(false)
```

### Session Tokens

Get authenticated session token for API calls:

```tsx
const token = await getSessionToken()

fetch('/api/shopify/products', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

### Resource Picker

Let users select products, collections, or variants:

```tsx
const products = await openResourcePicker({
  type: 'product',
  multiple: true
})

// products = [{ id: 'gid://...', title: '...' }]
```

## Fallback Behavior

All App Bridge utilities include fallback behavior:

- **Toasts**: Fall back to `console.log/error` if App Bridge unavailable
- **Modals**: Fall back to native `window.confirm()`
- **Loading**: No-op if App Bridge unavailable
- **Session Tokens**: Return `null` if unavailable

This ensures the app works in development and non-embedded contexts.

## Testing

To test App Bridge functionality:

1. Run dev server: `npm run dev`
2. Install app in a Shopify development store
3. Navigate to the app in Shopify Admin
4. Open Chrome DevTools
5. Switch console context to app iframe
6. Type `window.shopify` to inspect available methods

## Environment Variables

Required environment variable:

```env
NEXT_PUBLIC_SHOPIFY_CLIENT_ID=your_shopify_api_key_here
```

This is used in the `<meta name="shopify-api-key">` tag.

## Important Notes

- **Do NOT** use `window.confirm()` - use `confirmDialog()` instead
- **Do NOT** use `console.log('[SUCCESS]')` - use `showSuccessToast()` instead
- **Do NOT** use `console.error('[ERROR]')` - use `showErrorToast()` instead
- **Do NOT** duplicate the global `Window` type declaration - import `@/lib/shopify-app-bridge` to get types

## Documentation

Full Shopify App Bridge documentation: [context/shopify-docs/03-app-bridge-library.md](../../context/shopify-docs/03-app-bridge-library.md)
