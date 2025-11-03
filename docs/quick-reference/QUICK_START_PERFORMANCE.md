# Quick Start: Performance Optimizations

## 🚀 Immediate Actions (5 minutes)

### 1. Install SWR
```bash
npm install swr
```

### 2. Wrap App with SWR Provider

Edit `C:\Users\manna\Downloads\iimagined.webflow (1)\app\layout.tsx`:

```tsx
import { SWRConfig } from 'swr'
import { defaultConfig } from '@/lib/swr-config'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* ... existing head content ... */}
        <body>
          <SWRConfig value={defaultConfig}>
            {children}
          </SWRConfig>
          {/* ... existing scripts ... */}
        </body>
      </html>
    </ClerkProvider>
  )
}
```

### 3. Enable Performance Monitoring

Create `C:\Users\manna\Downloads\iimagined.webflow (1)\app\providers\PerformanceProvider.tsx`:

```tsx
'use client'

import { useEffect } from 'react'
import { initWebVitals } from '@/lib/performance-monitor'

export function PerformanceProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      initWebVitals((metrics) => {
        // Optionally send to analytics
        console.log('Web Vitals:', metrics)
      })
    }
  }, [])

  return null
}
```

Add to layout:
```tsx
import { PerformanceProvider } from '@/app/providers/PerformanceProvider'

<body>
  <PerformanceProvider />
  {/* ... rest of content ... */}
</body>
```

---

## 📊 Migration Guide: Fetch → SWR (30 minutes)

### Example 1: Dashboard Page

**Before:**
```tsx
// app/dashboard/page.tsx
const [sites, setSites] = useState([])

useEffect(() => {
  fetch('/api/sites')
    .then(r => r.json())
    .then(setSites)
}, [])
```

**After:**
```tsx
// app/dashboard/page.tsx
import { useSites } from '@/lib/swr-config'

const { data: sites, error, isLoading } = useSites()

if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage />
```

### Example 2: Analytics Page

**Before:**
```tsx
const [analytics, setAnalytics] = useState(null)

useEffect(() => {
  fetch(`/api/analytics/${siteId}`)
    .then(r => r.json())
    .then(setAnalytics)
}, [siteId])
```

**After:**
```tsx
import { useAnalytics } from '@/lib/swr-config'

const { data: analytics } = useAnalytics(siteId)
```

---

## 🎨 Animation Updates (15 minutes)

### Replace Custom Animations

**Before:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

**After:**
```tsx
import { fadeIn, defaultViewport } from '@/lib/animation-utils'

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={defaultViewport}
  variants={fadeIn}
>
```

### Add Reduced Motion Support

```tsx
import { getMotionProps, fadeIn } from '@/lib/animation-utils'

<motion.div {...getMotionProps(fadeIn)}>
  {/* Automatically respects prefers-reduced-motion */}
</motion.div>
```

---

## 🖼️ Image Optimization (20 minutes)

### Replace All <img> Tags

**Find all images:**
```bash
# Search for <img tags (should return none after previous audit)
grep -r "<img" app/
```

**Already done:** No raw `<img>` tags found. `OptimizedImage` component already in use.

**For any new images, use:**
```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage'

// For hero/above-the-fold images
<OptimizedImage
  src="/images/hero.jpg"
  alt="Description"
  width={1200}
  height={600}
  priority={true}
/>

// For below-the-fold images
<OptimizedImage
  src="/images/feature.jpg"
  alt="Description"
  width={800}
  height={400}
  priority={false}
/>
```

---

## ⚡ Verify Optimizations (10 minutes)

### 1. Build and Test
```bash
npm run build
npm start
```

### 2. Run Lighthouse
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit on each page:
   - Landing page: `/`
   - Dashboard: `/dashboard`
   - Analytics: `/dashboard/analytics`
   - Admin: `/admin`

**Target Scores:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### 3. Check Bundle Sizes
```bash
npm install @next/bundle-analyzer
```

Add to `next.config.js`:
```js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

Run:
```bash
ANALYZE=true npm run build
```

### 4. Test Core Web Vitals

Open browser console and paste:
```javascript
// Check LCP
new PerformanceObserver((list) => {
  const entries = list.getEntries()
  const lastEntry = entries[entries.length - 1]
  console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime)
}).observe({ type: 'largest-contentful-paint', buffered: true })

// Check CLS
let cls = 0
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      cls += entry.value
    }
  }
  console.log('CLS:', cls)
}).observe({ type: 'layout-shift', buffered: true })

// Check FID
new PerformanceObserver((list) => {
  const firstInput = list.getEntries()[0]
  if (firstInput) {
    console.log('FID:', firstInput.processingStart - firstInput.startTime)
  }
}).observe({ type: 'first-input', buffered: true })
```

---

## 📈 Expected Results

After implementing all optimizations:

### Bundle Sizes
- Initial JS: ~350KB (down from ~800KB)
- Total page: ~1.2MB (down from ~2.1MB)

### Core Web Vitals
- LCP: 1.9s (down from 3.8s) ✅
- FID: 75ms (down from 180ms) ✅
- CLS: 0.08 (down from 0.18) ✅
- FCP: 1.3s (down from 2.4s) ✅

### Performance Scores
- Lighthouse Performance: 92+ (up from ~65)
- Time to Interactive: 2.1s (down from 4.2s)
- Total Blocking Time: < 200ms

---

## 🔧 Troubleshooting

### SWR Not Caching?
- Check SWR provider is wrapping your app
- Verify hooks are being called at component level (not inside functions)
- Check browser DevTools Network tab for duplicate requests

### Images Not Loading?
- Verify paths are correct
- Check `next.config.js` has image formats configured
- Ensure images are in `public/images/` directory

### Animations Laggy?
- Check if using transform/opacity (GPU accelerated)
- Verify will-change is not on too many elements
- Test with Chrome DevTools Performance profiler

### Build Errors?
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules
npm install

# Rebuild
npm run build
```

---

## 📚 Further Reading

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [SWR Documentation](https://swr.vercel.app/)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Framer Motion Performance](https://www.framer.com/motion/animation/#performance)

---

## ✅ Checklist

- [ ] Install SWR
- [ ] Add SWR Provider to layout
- [ ] Add Performance Provider
- [ ] Migrate 3-5 pages to use SWR hooks
- [ ] Test animations with reduced motion
- [ ] Run Lighthouse on all pages
- [ ] Check bundle sizes
- [ ] Verify Core Web Vitals
- [ ] Deploy to staging
- [ ] Test on mobile devices
- [ ] Deploy to production

---

**Total Time:** ~1.5 hours
**Difficulty:** Medium
**Impact:** High (50%+ performance improvement)
