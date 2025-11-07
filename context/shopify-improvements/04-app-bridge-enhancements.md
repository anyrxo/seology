# App Bridge Enhancements

**Agent**: APP BRIDGE SPECIALIST
**Status**: ✅ Enhancements Specified
**Priority**: MEDIUM (Improves UX significantly)

---

## Current State

We have basic App Bridge implementation:
- ✅ Toast notifications
- ✅ Session token retrieval
- ✅ Shop config access
- ✅ Loading states
- ✅ Confirmation dialogs

**File**: `lib/shopify-app-bridge.ts`

---

## Recommended Enhancements

### 1. Resource Picker (HIGH PRIORITY)

**Use Case**: Let users select products/collections for bulk SEO fixes

**Current**: Manual product ID entry or "analyze all"
**Improved**: Beautiful Shopify native product picker

#### Implementation

```typescript
// Add to lib/shopify-app-bridge.ts

/**
 * Open product picker with multiple selection
 * Returns selected products with full data
 */
export async function selectProducts(): Promise<SelectedProduct[]> {
  if (!isAppBridgeAvailable()) {
    throw new Error('App Bridge not available')
  }

  const products = await window.shopify!.resourcePicker({
    type: 'product',
    multiple: true,
    filter: {
      variants: false, // Don't show variant selection
      archived: false, // Hide archived products
      draft: false, // Hide draft products
    },
  })

  return products
}

/**
 * Open collection picker
 */
export async function selectCollections(): Promise<SelectedCollection[]> {
  if (!isAppBridgeAvailable()) {
    throw new Error('App Bridge not available')
  }

  const collections = await window.shopify!.resourcePicker({
    type: 'collection',
    multiple: true,
  })

  return collections
}

interface SelectedProduct {
  id: string // "gid://shopify/Product/123"
  title: string
  handle: string
  images: Array<{ originalSrc: string }>
  variants: Array<{ id: string; title: string }>
}

interface SelectedCollection {
  id: string
  title: string
  handle: string
}
```

#### Usage in Components

```tsx
// Example: Bulk SEO Fix Component
import { selectProducts } from '@/lib/shopify-app-bridge'

function BulkFixSelector() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const handleSelectProducts = async () => {
    try {
      const products = await selectProducts()
      setSelectedProducts(products.map(p => p.id))
      showSuccessToast(`Selected ${products.length} products`)
    } catch (error) {
      showErrorToast('Failed to select products')
    }
  }

  return (
    <button onClick={handleSelectProducts}>
      Select Products to Optimize
    </button>
  )
}
```

---

### 2. App Bridge Navigation

**Use Case**: Navigate within Shopify Admin while keeping context

**Current**: Using `window.location` or Next.js router
**Improved**: Shopify-aware navigation with history preservation

#### Implementation

```typescript
// Add to lib/shopify-app-bridge.ts

/**
 * Navigate to different sections of SEOLOGY app
 */
export function navigateToPage(path: string): void {
  if (isAppBridgeAvailable()) {
    window.shopify!.navigate(path)
  } else {
    // Fallback for non-embedded context
    window.location.href = path
  }
}

/**
 * Navigate to Shopify Admin pages
 */
export function navigateToShopifyAdmin(path: string): void {
  if (isAppBridgeAvailable()) {
    window.shopify!.navigate(`shopify://admin/${path}`)
  }
}

/**
 * Open product in Shopify Admin (new tab)
 */
export function openProductInAdmin(productId: string): void {
  const cleanId = productId.replace('gid://shopify/Product/', '')
  navigateToShopifyAdmin(`products/${cleanId}`)
}

/**
 * Open collection in Shopify Admin (new tab)
 */
export function openCollectionInAdmin(collectionId: string): void {
  const cleanId = collectionId.replace('gid://shopify/Collection/', '')
  navigateToShopifyAdmin(`collections/${cleanId}`)
}
```

#### Usage Examples

```tsx
// Navigate within app
<button onClick={() => navigateToPage('/shopify/dashboard')}>
  Back to Dashboard
</button>

// Open product in Shopify Admin
<button onClick={() => openProductInAdmin(product.id)}>
  Edit in Shopify
</button>

// Navigate to Shopify Orders
<button onClick={() => navigateToShopifyAdmin('orders')}>
  View Orders
</button>
```

---

### 3. Contextual Save Bar

**Use Case**: Shopify-style save bar for unsaved changes

**Current**: Custom save button
**Improved**: Native Shopify save bar with discard option

#### Implementation

```typescript
// Add to lib/shopify-app-bridge.ts

interface SaveBarOptions {
  message?: string
  onSave: () => Promise<void> | void
  onDiscard: () => void
}

/**
 * Show Shopify-style save bar
 */
export function showSaveBar(options: SaveBarOptions): void {
  if (!isAppBridgeAvailable()) {
    // Fallback: show custom save prompt
    const shouldSave = window.confirm(options.message || 'Save changes?')
    if (shouldSave) {
      options.onSave()
    }
    return
  }

  window.shopify!.saveBar.show({
    message: options.message || 'Unsaved changes',
    saveAction: {
      label: 'Save',
      onAction: async () => {
        await options.onSave()
        window.shopify!.saveBar.hide()
      },
    },
    discardAction: {
      label: 'Discard',
      onAction: () => {
        options.onDiscard()
        window.shopify!.saveBar.hide()
      },
    },
  })
}

/**
 * Hide save bar
 */
export function hideSaveBar(): void {
  if (isAppBridgeAvailable()) {
    window.shopify!.saveBar.hide()
  }
}
```

#### Usage Example

```tsx
function SettingsForm() {
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (hasChanges) {
      showSaveBar({
        message: 'You have unsaved settings',
        onSave: async () => {
          await saveSettings()
          setHasChanges(false)
        },
        onDiscard: () => {
          resetForm()
          setHasChanges(false)
        },
      })
    } else {
      hideSaveBar()
    }

    return () => hideSaveBar() // Cleanup
  }, [hasChanges])
}
```

---

### 4. Title Bar Customization

**Use Case**: Update page title and breadcrumbs dynamically

**Current**: Static page titles
**Improved**: Dynamic titles matching current context

#### Implementation

```typescript
// Add to lib/shopify-app-bridge.ts

interface TitleBarOptions {
  title: string
  breadcrumbs?: Array<{
    label: string
    path: string
  }>
  primaryAction?: {
    label: string
    onAction: () => void
  }
  secondaryActions?: Array<{
    label: string
    onAction: () => void
  }>
}

/**
 * Update title bar
 */
export function updateTitleBar(options: TitleBarOptions): void {
  if (!isAppBridgeAvailable()) {
    // Fallback: update document title
    document.title = `${options.title} - SEOLOGY`
    return
  }

  window.shopify!.titleBar.set({
    title: options.title,
    breadcrumbs: options.breadcrumbs,
    primaryAction: options.primaryAction,
    secondaryActions: options.secondaryActions,
  })
}
```

#### Usage Example

```tsx
// Product Analysis Page
useEffect(() => {
  updateTitleBar({
    title: product.title,
    breadcrumbs: [
      { label: 'Dashboard', path: '/shopify/dashboard' },
      { label: 'Products', path: '/shopify/products' },
    ],
    primaryAction: {
      label: 'Apply Fixes',
      onAction: () => applyAllFixes(),
    },
    secondaryActions: [
      {
        label: 'View in Shopify',
        onAction: () => openProductInAdmin(product.id),
      },
    ],
  })
}, [product])
```

---

### 5. Banner Notifications

**Use Case**: Show persistent notifications at page top

**Current**: Toast messages (disappear)
**Improved**: Banners for important info that stays visible

#### Implementation

```typescript
// Add to lib/shopify-app-bridge.ts

type BannerStatus = 'success' | 'info' | 'warning' | 'critical'

interface BannerOptions {
  title: string
  status: BannerStatus
  onDismiss?: () => void
}

/**
 * Show banner notification
 */
export function showBanner(options: BannerOptions): void {
  if (!isAppBridgeAvailable()) {
    // Fallback: use alert
    alert(`[${options.status.toUpperCase()}] ${options.title}`)
    return
  }

  window.shopify!.banner.show({
    title: options.title,
    status: options.status,
    dismissible: !!options.onDismiss,
    onDismiss: options.onDismiss,
  })
}

/**
 * Hide banner
 */
export function hideBanner(): void {
  if (isAppBridgeAvailable()) {
    window.shopify!.banner.hide()
  }
}
```

#### Usage Examples

```tsx
// Show rate limit warning
showBanner({
  title: 'Approaching API rate limit. Slowing down requests.',
  status: 'warning',
  onDismiss: () => console.log('Warning dismissed'),
})

// Show success after bulk operation
showBanner({
  title: 'Successfully fixed 127 SEO issues!',
  status: 'success',
})

// Show error
showBanner({
  title: 'Failed to connect to Shopify API. Please check your connection.',
  status: 'critical',
})
```

---

## Type Definitions

Update `lib/shopify-app-bridge.ts` with complete types:

```typescript
interface ShopifyAppBridge {
  // Existing
  toast: ShopifyToast
  modal: ShopifyModal
  config: ShopifyConfig
  idToken: () => Promise<string>
  loading: (isLoading: boolean) => void

  // New additions
  resourcePicker: (options: ResourcePickerOptions) => Promise<Resource[]>
  navigate: (path: string) => void
  saveBar: {
    show: (options: SaveBarOptions) => void
    hide: () => void
  }
  titleBar: {
    set: (options: TitleBarOptions) => void
  }
  banner: {
    show: (options: BannerOptions) => void
    hide: () => void
  }
}

interface ResourcePickerOptions {
  type: 'product' | 'collection' | 'variant'
  multiple?: boolean
  filter?: {
    variants?: boolean
    archived?: boolean
    draft?: boolean
  }
}

interface Resource {
  id: string
  title: string
  handle: string
  images?: Array<{ originalSrc: string }>
  variants?: Array<{ id: string; title: string }>
}
```

---

## Use Cases in SEOLOGY

### 1. Bulk Product Optimization

```tsx
// Shopify Products Page
function ProductsBulkOptimizer() {
  const handleOptimize = async () => {
    // 1. Let user select products
    const products = await selectProducts()

    // 2. Show loading
    setLoading(true)

    // 3. Analyze each product
    for (const product of products) {
      await analyzeProduct(product.id)
    }

    // 4. Show results banner
    showBanner({
      title: `Analyzed ${products.length} products. Found 47 issues.`,
      status: 'info',
    })

    setLoading(false)
  }

  return <button onClick={handleOptimize}>Bulk Optimize</button>
}
```

### 2. Collection-Based Analysis

```tsx
// Analyze all products in a collection
function CollectionAnalyzer() {
  const handleAnalyze = async () => {
    const collections = await selectCollections()

    for (const collection of collections) {
      // Fetch products in collection via GraphQL
      const products = await getCollectionProducts(collection.id)
      // Analyze each product
      for (const product of products) {
        await analyzeProduct(product.id)
      }
    }

    showSuccessToast('Collection analysis complete')
  }

  return <button onClick={handleAnalyze}>Analyze Collection</button>
}
```

### 3. Issue Details with Actions

```tsx
// Issue detail page with contextual actions
function IssueDetailPage({ issue }: { issue: Issue }) {
  useEffect(() => {
    updateTitleBar({
      title: issue.title,
      breadcrumbs: [
        { label: 'Dashboard', path: '/shopify/dashboard' },
        { label: 'Issues', path: '/shopify/issues' },
      ],
      primaryAction: {
        label: 'Apply Fix',
        onAction: () => applyFix(issue.id),
      },
      secondaryActions: [
        {
          label: 'View Product',
          onAction: () => openProductInAdmin(issue.productId),
        },
        {
          label: 'Ignore Issue',
          onAction: () => ignoreIssue(issue.id),
        },
      ],
    })
  }, [issue])

  // Component render...
}
```

---

## Testing

### Manual Testing

1. **Load app in Shopify Admin iframe**
2. **Open DevTools Console**
3. **Test each function**:
   ```javascript
   // Test resource picker
   await window.shopify.resourcePicker({ type: 'product', multiple: true })

   // Test navigation
   window.shopify.navigate('/shopify/dashboard')

   // Test toast
   window.shopify.toast.show('Test message')
   ```

### Automated Testing

```typescript
// Mock App Bridge for tests
jest.mock('@/lib/shopify-app-bridge', () => ({
  isAppBridgeAvailable: () => true,
  selectProducts: jest.fn(() => Promise.resolve([
    { id: 'gid://shopify/Product/1', title: 'Test Product' }
  ])),
  showToast: jest.fn(),
  navigateToPage: jest.fn(),
}))
```

---

## Migration Checklist

- [ ] Add new type definitions to `lib/shopify-app-bridge.ts`
- [ ] Implement resource picker functions
- [ ] Implement navigation functions
- [ ] Implement save bar functions
- [ ] Implement title bar functions
- [ ] Implement banner functions
- [ ] Update components to use new functions
- [ ] Test in Shopify Admin iframe
- [ ] Add fallbacks for non-embedded context
- [ ] Update documentation

---

## Priority Order

### Phase 1: High Impact (This Week)
1. ✅ Resource picker for product selection
2. ✅ Navigation helpers for Shopify Admin links
3. ✅ Banner notifications for important alerts

### Phase 2: UX Polish (Next Week)
4. ⏳ Save bar for forms
5. ⏳ Title bar customization
6. ⏳ Advanced modal options

### Phase 3: Nice to Have (Future)
7. ⏳ Context menus
8. ⏳ Custom modals with components
9. ⏳ File upload via App Bridge

---

## Resources

- **Current Implementation**: `lib/shopify-app-bridge.ts`
- **Documentation**: `context/shopify-docs/03-app-bridge-library.md`
- **Official Docs**: https://shopify.dev/docs/api/app-bridge-library
- **Examples**: https://github.com/Shopify/app-bridge-examples
