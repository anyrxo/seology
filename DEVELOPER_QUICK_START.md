# Developer Quick Start - SEOLOGY.AI Landing Page

## TL;DR - What You Need to Build

Build a **13-section landing page** with focus on conversion optimization. Expected build time: **7 days** (solo developer) or **3-4 days** (team).

---

## File Structure to Create

```
app/
  page.tsx                          # ← UPDATE THIS (hero, nav, features exist)
  layout.tsx                        # ← Add meta tags

components/
  landing/
    SocialProofBar.tsx              # ← NEW (stats: 127k fixes, 2.8k users)
    ProblemSection.tsx              # ← NEW (3 pain points)
    PlatformSection.tsx             # ← NEW (Shopify, WordPress, Custom)
    UseCaseTabs.tsx                 # ← NEW (Founders, Teams, Agencies)
    TestimonialsSection.tsx         # ← NEW (3 customer stories)
    PricingPreview.tsx              # ← NEW ($0, $29, Custom)
    FAQSection.tsx                  # ← NEW (8 questions, accordion)
    TrustBadges.tsx                 # ← NEW (SOC2, GDPR, etc.)
  ui/
    Button.tsx                      # ← NEW (variants: primary, secondary, ghost)
    Card.tsx                        # ← NEW (feature, pricing, testimonial)
    Badge.tsx                       # ← NEW ("Most Popular")
    Accordion.tsx                   # ← NEW (for FAQ)

public/
  images/
    hero-dashboard.mp4              # ← ASSET NEEDED (or .png mockup)
    connect-screenshot.png          # ← ASSET NEEDED
    analysis-screenshot.png         # ← ASSET NEEDED
    fixes-screenshot.png            # ← ASSET NEEDED
    og-image.png                    # ← ASSET NEEDED (1200x630)
    twitter-card.png                # ← ASSET NEEDED (1200x600)
```

---

## Component Checklist

### ✅ Already Exists (app/page.tsx)
- [x] Navigation (lines 16-44) - **Needs: Enterprise, Careers, Blog links**
- [x] Hero Section (lines 46-74) - **Needs: Copy update, visual element**
- [x] How It Works (lines 76-112) - **Needs: Screenshots, scroll animations**
- [x] Features (lines 114-153) - **Needs: Icon library, hover animations**
- [x] Final CTA (lines 156-171) - **Needs: Copy update**
- [x] Footer (lines 173-181) - **Needs: Complete rebuild (4 columns)**

### ❌ Needs to Be Built
- [ ] Social Proof Bar (between Hero and How It Works)
- [ ] Problem Section (before How It Works)
- [ ] Platform Compatibility (after Features)
- [ ] Use Case Scenarios (after Platforms)
- [ ] Testimonials (after Use Cases)
- [ ] Pricing Preview (after Testimonials)
- [ ] FAQ Section (after Pricing)
- [ ] Trust Badges (after FAQ, before Final CTA)

---

## Quick Copy Reference

### Hero (Current - Keep This)
```tsx
<h1>
  AI That <span className="text-blue-500">Fixes</span> Your SEO,
  <br />
  Not Just Reports It
</h1>
<p>
  The first SEO platform that doesn't just find problems—it logs into your
  Shopify, WordPress, or custom site and fixes them automatically.
  Powered by Claude AI.
</p>
```

### Social Proof Stats
```tsx
{ number: "127,000+", label: "SEO fixes applied" }
{ number: "2,847", label: "Active users" }
{ number: "4.9/5", label: "Average rating" }
{ number: "94%", label: "See results in 30 days" }
```

### Problem Section (3 Cards)
```tsx
[
  {
    icon: "📊",
    title: "Endless Reports",
    pain: "You get a 47-page PDF listing 200+ SEO issues",
    impact: "Takes hours to read, days to implement"
  },
  {
    icon: "🛠️",
    title: "Manual Labor",
    pain: "You or your developer manually edits each page, one by one",
    impact: "Costs $3,000+ in developer time per month"
  },
  {
    icon: "⚠️",
    title: "Mistakes Happen",
    pain: "One typo in your sitemap breaks everything",
    impact: "Rankings drop, traffic lost, revenue impacted"
  }
]
```

### Pricing Tiers
```tsx
{
  name: "Free",
  price: "$0/month",
  features: ["3 sites", "500 fixes/month", "Basic auto-fix", "90-day rollback"],
  cta: "Start Free"
}
{
  name: "Pro",
  price: "$29/month",
  badge: "Most Popular",
  features: ["10 sites", "5,000 fixes/month", "All execution modes", "Priority support"],
  cta: "Start Free Trial"
}
{
  name: "Enterprise",
  price: "Custom",
  features: ["Unlimited sites", "Unlimited fixes", "White-label reports", "API access"],
  cta: "Contact Sales"
}
```

---

## Design Tokens (Copy/Paste Ready)

```tsx
// tailwind.config.ts - Add these if not present
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // blue-600
          dark: '#2563EB',    // blue-700
        },
        accent: {
          DEFAULT: '#9333EA', // purple-600
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  }
}
```

```tsx
// Common className patterns
const styles = {
  section: "py-20 px-4 sm:px-6 lg:px-8",
  sectionDark: "py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50",
  container: "max-w-7xl mx-auto",
  heading: "text-4xl font-bold text-white text-center mb-12",
  subheading: "text-gray-400 text-center mb-12 max-w-2xl mx-auto",

  // Buttons
  btnPrimary: "bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors",
  btnSecondary: "bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors",

  // Cards
  card: "bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300",

  // Grid layouts
  grid3: "grid grid-cols-1 md:grid-cols-3 gap-8",
  grid2: "grid grid-cols-1 md:grid-cols-2 gap-8",
}
```

---

## Example Component: SocialProofBar.tsx

```tsx
export function SocialProofBar() {
  const stats = [
    { number: "127,000+", label: "SEO fixes applied" },
    { number: "2,847", label: "Active users" },
    { number: "4.9/5", label: "Average rating" },
    { number: "94%", label: "See results in 30 days" },
  ]

  return (
    <section className="py-12 bg-gray-900/50 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm mb-8">
          Trusted by growing businesses on Shopify, WordPress, and beyond
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Example Component: PricingPreview.tsx

```tsx
interface PricingTier {
  name: string
  price: string
  badge?: string
  features: string[]
  cta: string
  ctaLink: string
}

export function PricingPreview() {
  const tiers: PricingTier[] = [
    {
      name: "Free",
      price: "$0/month",
      features: ["3 sites", "500 fixes/month", "Basic auto-fix", "90-day rollback"],
      cta: "Start Free",
      ctaLink: "/sign-up"
    },
    {
      name: "Pro",
      price: "$29/month",
      badge: "Most Popular",
      features: ["10 sites", "5,000 fixes/month", "All execution modes", "Priority support"],
      cta: "Start Free Trial",
      ctaLink: "/sign-up"
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Unlimited sites", "Unlimited fixes", "White-label reports", "API access"],
      cta: "Contact Sales",
      ctaLink: "/enterprise"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Transparent Pricing That Scales With You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-gray-900 border rounded-lg p-6 relative ${
                tier.badge ? 'border-blue-500' : 'border-gray-800'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {tier.badge}
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">
                {tier.name}
              </h3>
              <div className="text-3xl font-bold text-white mb-6">
                {tier.price}
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="text-gray-400 flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaLink}
                className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                  tier.badge
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          All plans include 14-day free trial • No credit card required • Cancel anytime
        </p>

        <div className="text-center mt-6">
          <Link href="/pricing" className="text-blue-500 hover:text-blue-400">
            View Full Pricing & Features →
          </Link>
        </div>
      </div>
    </section>
  )
}
```

---

## Example Component: FAQSection.tsx

```tsx
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQ[] = [
    {
      question: "How does SEOLOGY.AI actually fix SEO issues?",
      answer: "We use secure API integrations to connect directly to your CMS (Shopify, WordPress, etc.). When Claude AI identifies an issue and generates a fix, we make the change directly in your database—just like a human would through the admin panel, but automated."
    },
    {
      question: "Is it safe? What if something goes wrong?",
      answer: "Absolutely. Every fix is logged with before/after snapshots. You can rollback any change within 90 days with one click. Plus, you choose your execution mode: auto-fix, review plans first, or approve each change individually."
    },
    // Add 6 more FAQs (see LANDING_PAGE_DESIGN.md section 11)
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Scroll Animations (Using Framer Motion)

```tsx
// Install: npm install framer-motion

import { motion } from 'framer-motion'

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Usage:
<AnimatedSection>
  <FeatureCard {...props} />
</AnimatedSection>
```

---

## Performance Optimizations

```tsx
// Use Next.js Image component for all images
import Image from 'next/image'

<Image
  src="/images/connect-screenshot.png"
  alt="Connect your site in 60 seconds"
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Generate with plaiceholder
  loading="lazy" // Only for below-fold images
/>

// Lazy load heavy components
import dynamic from 'next/dynamic'

const UseCaseTabs = dynamic(() => import('@/components/landing/UseCaseTabs'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-800" />,
  ssr: false // If it has client-side-only features
})
```

---

## SEO Meta Tags (app/layout.tsx)

```tsx
export const metadata: Metadata = {
  title: 'SEOLOGY.AI - AI That Fixes Your SEO Automatically | Powered by Claude',
  description: 'The first SEO platform that actually fixes issues instead of just reporting them. Automatic SEO for Shopify, WordPress, and custom sites. Start free.',
  keywords: 'automated seo, ai seo tool, seo automation, claude ai seo, shopify seo, wordpress seo',

  openGraph: {
    title: 'SEOLOGY.AI - AI That Fixes Your SEO Automatically',
    description: 'Stop reading SEO reports. Start fixing them automatically with Claude AI.',
    images: '/og-image.png',
    url: 'https://seology.ai',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SEOLOGY.AI - AI That Fixes Your SEO Automatically',
    description: 'The first SEO platform that actually implements fixes. Powered by Claude AI.',
    images: '/twitter-card.png',
  },

  other: {
    'theme-color': '#3B82F6',
  }
}
```

---

## Analytics Setup (PostHog Example)

```tsx
// app/providers.tsx
'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  })
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

// Track CTA clicks
import { usePostHog } from 'posthog-js/react'

export function CTAButton({ position }: { position: string }) {
  const posthog = usePostHog()

  return (
    <button
      onClick={() => {
        posthog.capture('cta_clicked', {
          position,
          page: 'landing',
        })
      }}
    >
      Get Started Free
    </button>
  )
}
```

---

## Testing Checklist

### Desktop (Chrome DevTools)
```bash
# Run Lighthouse audit
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Desktop" + all categories
4. Click "Generate report"
5. Target: All scores 90+

# Test scroll animations
1. Scroll slowly down page
2. Verify each section animates in smoothly
3. No layout shift (check CLS score)

# Test interactions
1. Click all CTAs (9 total)
2. Expand all FAQ items
3. Switch all Use Case tabs
4. Hover all cards (verify hover states)
```

### Mobile (Chrome DevTools)
```bash
# Device emulation
1. Toggle device toolbar (Ctrl+Shift+M)
2. Test on:
   - iPhone SE (375x667)
   - iPhone 14 Pro (393x852)
   - iPad (768x1024)

# Verify:
- [ ] Navigation hamburger works
- [ ] Text is readable (no tiny fonts)
- [ ] Buttons are tappable (min 44px)
- [ ] No horizontal scroll
- [ ] Images load properly
- [ ] Cards stack vertically
```

### Accessibility (axe DevTools)
```bash
# Install axe DevTools extension
1. Open DevTools
2. Go to "axe DevTools" tab
3. Click "Scan ALL of my page"
4. Fix all Critical and Serious issues
5. Target: 0 issues
```

---

## Common Pitfalls & Solutions

### Issue: "Hydration error" in console
**Cause:** Client/server HTML mismatch (often from `useEffect` or random data)
**Solution:** Use `suppressHydrationWarning` or ensure server/client render the same

```tsx
<div suppressHydrationWarning>
  {new Date().toLocaleDateString()} {/* This changes between server/client */}
</div>
```

### Issue: Images not loading
**Cause:** Next.js Image component needs `next.config.js` configuration
**Solution:**
```js
// next.config.js
module.exports = {
  images: {
    domains: ['your-cdn.com'],
  },
}
```

### Issue: Animations janky on scroll
**Cause:** Too many animations triggering at once
**Solution:** Stagger animations with delays

```tsx
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }} // Stagger
  >
    {item}
  </motion.div>
))}
```

### Issue: Page is slow
**Cause:** Large images, too much JavaScript
**Solution:**
1. Optimize images (WebP, proper sizes)
2. Lazy load below-fold content
3. Code split with `next/dynamic`
4. Run Lighthouse and fix suggestions

---

## Daily Build Plan (Solo Developer)

### Day 1 (Foundation)
- [ ] Morning: Update nav, hero copy, add Button component
- [ ] Afternoon: Build SocialProofBar, ProblemSection

### Day 2 (Core Sections)
- [ ] Morning: Enhance How It Works (screenshots, animations)
- [ ] Afternoon: Improve Features section (icons, hover states)

### Day 3 (Platforms & Use Cases)
- [ ] Morning: Build PlatformSection
- [ ] Afternoon: Build UseCaseTabs (with tabs functionality)

### Day 4 (Trust & Conversion)
- [ ] Morning: Build TestimonialsSection
- [ ] Afternoon: Build PricingPreview

### Day 5 (FAQ & Footer)
- [ ] Morning: Build FAQSection (accordion)
- [ ] Afternoon: Build TrustBadges, rebuild Footer

### Day 6 (Polish)
- [ ] Morning: Add all animations (scroll, hover)
- [ ] Afternoon: Mobile optimization, responsive testing

### Day 7 (Launch Prep)
- [ ] Morning: Performance audit (Lighthouse), fix issues
- [ ] Afternoon: Accessibility audit (axe), SEO check, deploy

---

## Resources

### Design Reference
- Full design: `LANDING_PAGE_DESIGN.md`
- Visual layout: `LANDING_PAGE_VISUAL_LAYOUT.md`
- Copy options: `COPY_VARIATIONS.md`

### Icons
- Lucide React: https://lucide.dev
- Already installed: `npm install lucide-react`

### Animations
- Framer Motion: https://www.framer.com/motion/
- Install: `npm install framer-motion`

### Images
- Unsplash (free stock): https://unsplash.com
- Mockup generator: https://mockuphone.com
- OG image generator: https://og-playground.vercel.app

---

## Got Questions?

1. **Copy/content questions:** See `COPY_VARIATIONS.md`
2. **Layout questions:** See `LANDING_PAGE_VISUAL_LAYOUT.md`
3. **Implementation details:** See `LANDING_PAGE_IMPLEMENTATION.md`
4. **Overall strategy:** See `LANDING_PAGE_README.md`

---

**Now go build!** Start with Day 1 and work through the checklist. You got this. 🚀
