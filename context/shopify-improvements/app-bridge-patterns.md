# App Bridge Usage Patterns

This document outlines best practices for using Shopify App Bridge in SEOLOGY.AI.

## Overview

App Bridge provides native Shopify UI components and navigation that make embedded apps feel like part of Shopify Admin. We've created a type-safe wrapper library and reusable components to make App Bridge easy to use.

## Core Library

**Location**: `lib/shopify-app-bridge.ts`

### Available Functions

#### Toast Notifications
```typescript
import { showToast, showSuccessToast, showErrorToast } from '@/lib/shopify-app-bridge'

// Basic toast
showToast('Product updated')

// Success toast
showSuccessToast('Changes saved successfully')

// Error toast
showErrorToast('Failed to save changes')
```

#### Confirmation Dialogs
```typescript
import { confirmDialog } from '@/lib/shopify-app-bridge'

const confirmed = await confirmDialog({
  title: 'Delete Product',
  message: 'Are you sure? This action cannot be undone.',
  primaryAction: { label: 'Delete', destructive: true },
  secondaryAction: { label: 'Cancel' }
})

if (confirmed) {
  // User clicked "Delete"
  await deleteProduct()
}
```

#### Loading States
```typescript
import { setLoading } from '@/lib/shopify-app-bridge'

setLoading(true)
await performOperation()
setLoading(false)
```

#### Navigation
```typescript
import {
  navigateToShopifyAdmin,
  navigateToProduct,
  navigateToCollection
} from '@/lib/shopify-app-bridge'

// Navigate to any admin page
navigateToShopifyAdmin('products')
navigateToShopifyAdmin('settings/domains')

// Navigate to specific product
navigateToProduct('gid://shopify/Product/123')
navigateToProduct('123') // Also works

// Navigate to collection
navigateToCollection('gid://shopify/Collection/456')
```

#### Contextual Actions
```typescript
import { setContextualActions, clearContextualActions } from '@/lib/shopify-app-bridge'

// Add action buttons to title bar
setContextualActions([
  {
    label: 'Refresh Data',
    onAction: () => fetchData()
  },
  {
    label: 'Export Report',
    onAction: () => exportReport()
  }
])

// Clear actions
clearContextualActions()
```

#### Resource Picker
```typescript
import { openResourcePicker } from '@/lib/shopify-app-bridge'

// Pick single product
const products = await openResourcePicker({
  type: 'product',
  multiple: false
})

// Pick multiple collections
const collections = await openResourcePicker({
  type: 'collection',
  multiple: true
})
```

#### Authenticated Requests
```typescript
import { authenticatedFetch } from '@/lib/shopify-app-bridge'

const data = await authenticatedFetch<{ products: Product[] }>(
  '/api/shopify/products?shop=my-store.myshopify.com'
)
```

## Reusable Components

### ProductPicker

**Location**: `components/shopify/ProductPicker.tsx`

Opens Shopify's native product picker UI.

```tsx
import { ProductPicker } from '@/components/shopify/ProductPicker'

function MyComponent() {
  const handleProductSelect = (products) => {
    console.log('Selected products:', products)
    // products is an array of PickedProduct objects
  }

  return (
    <ProductPicker
      onSelect={handleProductSelect}
      multiple={true}
      buttonLabel="Choose Products"
    />
  )
}
```

**Props**:
- `onSelect: (products: PickedProduct[]) => void` - Callback when products selected
- `multiple?: boolean` - Allow multiple selection (default: false)
- `buttonLabel?: string` - Button text (default: "Select Products")
- `disabled?: boolean` - Disable button
- `className?: string` - Additional CSS classes

**PickedProduct Type**:
```typescript
interface PickedProduct {
  id: string
  title: string
  handle: string
  images?: Array<{
    originalSrc: string
    altText?: string
  }>
  variants?: Array<{
    id: string
    title: string
    price: string
  }>
}
```

### CollectionPicker

Same as ProductPicker but for collections.

```tsx
import { CollectionPicker } from '@/components/shopify/ProductPicker'

<CollectionPicker
  onSelect={(collections) => console.log(collections)}
  multiple={false}
/>
```

### SaveBar

**Location**: `components/shopify/SaveBar.tsx`

Displays Shopify's native save bar when forms have unsaved changes.

```tsx
import { SaveBar } from '@/components/shopify/SaveBar'

function SettingsPage() {
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await saveSettings()
    setSaving(false)
    setHasChanges(false)
  }

  const handleDiscard = () => {
    resetForm()
    setHasChanges(false)
  }

  return (
    <>
      <SaveBar
        show={hasChanges}
        onSave={handleSave}
        onDiscard={handleDiscard}
        loading={saving}
      />

      <form onChange={() => setHasChanges(true)}>
        {/* Form fields */}
      </form>
    </>
  )
}
```

**useSaveBar Hook**:

Convenience hook for managing save bar state:

```tsx
import { SaveBar, useSaveBar } from '@/components/shopify/SaveBar'

function SettingsPage() {
  const { hasChanges, setHasChanges, saving, save, discard } = useSaveBar({
    onSave: async () => {
      await saveSettings()
    },
    onDiscard: () => {
      resetForm()
    }
  })

  return (
    <>
      <SaveBar show={hasChanges} onSave={save} onDiscard={discard} loading={saving} />

      <form onChange={() => setHasChanges(true)}>
        {/* Form fields */}
      </form>
    </>
  )
}
```

## Best Practices

### 1. Always Check Availability

App Bridge is only available when embedded in Shopify Admin. Always check before using:

```typescript
import { isAppBridgeAvailable } from '@/lib/shopify-app-bridge'

if (isAppBridgeAvailable()) {
  // Safe to use App Bridge
}
```

Our helper functions handle this automatically with fallbacks.

### 2. Use Toast Instead of Alert

❌ **Don't:**
```typescript
alert('Product saved!')
```

✅ **Do:**
```typescript
showSuccessToast('Product saved!')
```

### 3. Confirm Destructive Actions

Always confirm before destructive operations:

```typescript
const confirmed = await confirmDialog({
  title: 'Delete All Data',
  message: 'This will permanently delete all SEO data. Continue?',
  primaryAction: { label: 'Delete', destructive: true },
  secondaryAction: { label: 'Cancel' }
})

if (confirmed) {
  await deleteData()
}
```

### 4. Show Loading States

Use the loading indicator for long operations:

```typescript
setLoading(true)
try {
  await analyzeProducts()
} finally {
  setLoading(false)
}
```

### 5. Use Contextual Actions for Page-Level Actions

Add contextual actions to provide quick access to common operations:

```tsx
useEffect(() => {
  setContextualActions([
    { label: 'Refresh', onAction: () => fetchData() },
    { label: 'Export', onAction: () => exportData() }
  ])

  return () => clearContextualActions()
}, [])
```

### 6. Navigate Within Shopify

Use App Bridge navigation to keep users within Shopify Admin:

```typescript
// ❌ Don't open new tab
window.open(`https://${shop}/admin/products/${id}`)

// ✅ Use App Bridge navigation
navigateToProduct(id)
```

### 7. Use SaveBar for Forms

Always show the save bar when forms have unsaved changes:

```tsx
const [hasChanges, setHasChanges] = useState(false)

<SaveBar
  show={hasChanges}
  onSave={handleSave}
  onDiscard={handleDiscard}
/>
```

## Error Handling

All App Bridge functions handle errors gracefully:

- **Toast/Modal**: Falls back to console.log/window.confirm if App Bridge unavailable
- **Navigation**: Logs warning if App Bridge unavailable
- **Resource Picker**: Returns null if fails or user cancels
- **Loading**: No-op if App Bridge unavailable

## Testing

### In Development

App Bridge requires embedding in Shopify Admin. To test:

1. Install app in development store
2. Navigate to app in Shopify Admin
3. App will be embedded with App Bridge available

### Fallback Testing

To test fallback behavior (when App Bridge unavailable):

```typescript
// Temporarily disable App Bridge
delete window.shopify

// Test your component
// Should fall back to browser APIs
```

## Migration Checklist

When updating existing pages to use App Bridge:

- [ ] Replace `alert()` with `showToast()` or `showErrorToast()`
- [ ] Replace `window.confirm()` with `confirmDialog()`
- [ ] Add contextual actions for page-level operations
- [ ] Use `setLoading()` for async operations
- [ ] Replace external links with `navigateToShopifyAdmin()`
- [ ] Add SaveBar to forms with editable data
- [ ] Use ProductPicker/CollectionPicker for resource selection
- [ ] Use `authenticatedFetch()` for API calls

## Examples

### Complete Page Example

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  showSuccessToast,
  showErrorToast,
  setLoading,
  setContextualActions,
  clearContextualActions
} from '@/lib/shopify-app-bridge'
import { SaveBar, useSaveBar } from '@/components/shopify/SaveBar'
import { ProductPicker } from '@/components/shopify/ProductPicker'

export default function MyPage() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')
  const [data, setData] = useState(null)

  const { hasChanges, setHasChanges, saving, save, discard } = useSaveBar({
    onSave: async () => {
      setLoading(true)
      try {
        await saveData()
        showSuccessToast('Settings saved successfully')
      } catch (error) {
        showErrorToast('Failed to save settings')
        throw error
      } finally {
        setLoading(false)
      }
    },
    onDiscard: () => {
      resetForm()
    }
  })

  useEffect(() => {
    // Set contextual actions
    setContextualActions([
      { label: 'Refresh', onAction: () => fetchData() },
      { label: 'Export', onAction: () => exportData() }
    ])

    // Cleanup
    return () => clearContextualActions()
  }, [])

  return (
    <>
      <SaveBar show={hasChanges} onSave={save} onDiscard={discard} loading={saving} />

      <div className="p-8">
        <h1>My Page</h1>

        <ProductPicker
          onSelect={(products) => {
            console.log('Selected:', products)
            setHasChanges(true)
          }}
          multiple={true}
        />

        {/* Rest of page */}
      </div>
    </>
  )
}
```

## Resources

- [Shopify App Bridge Documentation](https://shopify.dev/docs/api/app-bridge-library)
- [Session Token Authentication](https://shopify.dev/docs/apps/auth/oauth/session-tokens)
- [App Bridge UI Components](https://shopify.dev/docs/api/app-bridge-library/apis)
