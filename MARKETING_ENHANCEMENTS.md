# MARKETING ENHANCEMENTS - Radiant UI Component Integration

## Mission: Make Marketing Pages Look EXACTLY Like Radiant UI Showcase

This document outlines all enhancements needed to bring SEOLOGY.AI marketing pages to the same level of polish and professionalism as the Radiant UI component library.

---

## Table of Contents

1. [Radiant UI Component Inventory](#radiant-ui-component-inventory)
2. [Current State Analysis](#current-state-analysis)
3. [Missing Components & Sections](#missing-components--sections)
4. [Page-by-Page Enhancement Plan](#page-by-page-enhancement-plan)
5. [Implementation Guide](#implementation-guide)
6. [Radiant UI CSS Reference](#radiant-ui-css-reference)

---

## Radiant UI Component Inventory

### Available Components (From index.html Analysis)

The Radiant UI library includes **200+ pre-built components** across these categories:

#### Navigation & Structure
- **Navigation (6 variants)** - Multi-level dropdowns, sticky navs, mobile menus
- **Topbar (6 variants)** - Announcement bars, top navigation, utility bars
- **Footer (14 variants)** - Multi-column footers, newsletter footers, social footers

#### Content Components
- **Icon Box (11 variants)** - Feature showcases, service displays, benefit highlights
- **Tabs (8 variants)** - Horizontal/vertical tabs, content switchers
- **Accordion (7 variants)** - FAQs, collapsible content sections
- **Timeline (5 variants)** - Company history, roadmap, process steps
- **Pricing (8 variants)** - Pricing tables, comparison charts, plan cards

#### Interactive Elements
- **Buttons (5 variants)** - Primary, secondary, ghost, icon buttons
- **Toggle (2 variants)** - Switches, boolean controls
- **Counter (12 variants)** - Animated stat counters, number animations
- **Progress Bar (3 variants)** - Loading indicators, completion trackers

#### Media & Visual
- **Image Slider (8 variants)** - Carousels, galleries, product showcases
- **Video (5 variants)** - Embedded videos, video modals, background videos
- **Gallery (12 variants)** - Grid layouts, masonry, lightbox galleries
- **Carousel (6 variants)** - Content sliders, testimonial carousels

#### Content Blocks
- **Image & Text Block (20 variants)** - Split layouts, alternating sections
- **Blog (8 variants)** - Article cards, blog grids, post listings
- **Testimonial (13 variants)** - Customer quotes, review cards, social proof
- **Team (8 variants)** - Team member cards, bio sections, staff showcase
- **Call To Action (10 variants)** - CTA banners, conversion sections

#### Marketing Components
- **Newsletter (1 variant)** - Email signup forms
- **Clients/Logo Cloud (5 variants)** - Partner logos, client showcases
- **Awards (6 variants)** - Badge displays, recognition sections
- **Marquee (4 variants)** - Scrolling text, infinite loops
- **Contact (7 variants)** - Contact forms, info sections
- **UI Cards (8 variants)** - General purpose card components

---

## Current State Analysis

### Landing Page (LandingPageContent.tsx)
**Status:** Good foundation with Radiant UI classes

**What's Working:**
- Using Radiant UI structure (`rt-component-section`, `rt-newsletter-wrap`)
- Proper grid layouts with `rt-nav-one-dropdown-upper-wrap`
- Icon boxes with hover effects
- Newsletter section with Radiant UI form styling
- Badge components for visual hierarchy

**What's Missing:**
- Animated hero particles/gradients
- Logo cloud (trusted by companies section)
- Video section with modal popup
- Interactive demo/preview section
- Accordion-style FAQ (currently using simple cards)
- Timeline/roadmap visualization
- Counter animations (stats that count up)
- Image gallery/portfolio showcase
- Blog/article card section
- Marquee with scrolling logos

### Pricing Page (pricing/page.tsx)
**Status:** Uses Radiant UI variables but needs more components

**What's Working:**
- Radiant UI color variables
- Layout structure with containers
- Pricing cards with hover effects
- Feature comparison table
- Trust badges section
- FAQ section with card layout

**What's Missing:**
- Interactive pricing toggle animation (better than current version)
- Feature tabs for different plan comparisons
- Testimonial carousel specific to pricing
- ROI calculator widget
- Plan comparison matrix (advanced)
- Video testimonials section
- Live chat widget integration
- Money-back guarantee visual

### Features Page (features/page.tsx)
**Status:** Dark theme, custom animations, NOT using Radiant UI

**What's Working:**
- Beautiful dark design
- Framer Motion animations
- Interactive tabs
- Platform integration cards
- Security showcase

**What's Missing (Radiant UI Components):**
- Radiant UI structure classes
- Light/white background option
- Feature comparison table component
- Radiant UI icon boxes
- Carousel for feature showcase
- Timeline for feature releases
- Interactive feature cards (Radiant UI style)
- Progress bars showing feature completion

### About Page (about/page.tsx)
**Status:** Dark theme with custom components, needs Radiant UI

**What's Working:**
- Animated counters
- Timeline component (custom)
- Team cards
- Values grid
- Technology stack showcase

**What's Missing (Radiant UI Components):**
- Radiant UI team card variants
- Company timeline (Radiant UI style)
- Office/culture photo gallery
- Awards & recognition section
- Company milestones counter
- Partners/clients logo cloud
- Video about the company
- Leadership team carousel

---

## Missing Components & Sections

### 1. Animated Hero with Particles/Gradients

**What It Is:**
A visually stunning hero section with:
- Floating gradient orbs (animated)
- Particle effects or subtle animations
- Parallax scrolling effects
- Glassmorphism/backdrop blur

**Where to Add:** Landing page hero section

**Radiant UI Reference:**
```html
<!-- Based on Radiant UI newsletter section structure -->
<section class="rt-component-section rt-newsletter-blue-section">
  <div class="w-layout-blockcontainer rt-component-container w-container">
    <div class="rt-newsletter-wrap">
      <!-- Animated background -->
      <div class="rt-hero-particles"></div>
      <!-- Content -->
    </div>
  </div>
</section>
```

**Implementation:** Create `components/marketing/AnimatedHero.tsx`

---

### 2. Logo Cloud (Trusted By Companies)

**What It Is:**
Scrolling or static grid of company/partner logos

**Where to Add:**
- Below hero on landing page
- On about page for partners

**Radiant UI Classes:**
```css
.rt-clients-section
.rt-marquee-wrapper
.rt-logo-grid
```

**Example Structure:**
```tsx
<section className="rt-component-section bg-neutral-100">
  <div className="w-layout-blockcontainer rt-component-container w-container">
    <div className="rt-component-heading-two">Trusted by Leading Brands</div>
    <div className="rt-logo-grid">
      {/* Logo items */}
    </div>
  </div>
</section>
```

**Implementation:** Create `components/marketing/LogoCloud.tsx`

---

### 3. Video Section with Modal

**What It Is:**
Video preview with play button that opens modal/lightbox

**Where to Add:**
- Landing page (demo video)
- Features page (feature showcase)
- About page (company story)

**Radiant UI Component:** Video (5 variants available)

**Example:**
```tsx
<div className="rt-video-wrapper">
  <div className="rt-video-preview">
    <img src="/video-thumbnail.jpg" alt="Demo" />
    <button className="rt-video-play-button">
      <PlayIcon />
    </button>
  </div>
</div>
```

**Implementation:** Create `components/marketing/VideoModal.tsx`

---

### 4. Interactive Demo Section

**What It Is:**
Live preview or interactive walkthrough of the product

**Where to Add:** Landing page, Features page

**Radiant UI Components:**
- Tabs for different demo views
- Image & Text Block (20 variants)
- UI Cards for feature callouts

**Implementation:** Create `components/marketing/InteractiveDemo.tsx`

---

### 5. Accordion FAQ (Not Just Cards)

**What It Is:**
Expandable/collapsible FAQ items with smooth animations

**Current State:** Using static cards on landing page

**Radiant UI Component:** Accordion (7 variants)

**Example Structure:**
```tsx
<div className="rt-accordion-wrapper">
  <div className="rt-accordion-item">
    <button className="rt-accordion-header">
      <span>Question here?</span>
      <ChevronDown />
    </button>
    <div className="rt-accordion-content">
      <p>Answer here...</p>
    </div>
  </div>
</div>
```

**Implementation:** Create `components/marketing/AccordionFAQ.tsx`

---

### 6. Timeline/Roadmap Section

**What It Is:**
Visual timeline showing:
- Company history
- Product roadmap
- Development milestones

**Current State:**
- About page has custom timeline (good!)
- Could use Radiant UI styling

**Radiant UI Component:** Timeline (5 variants)

**Enhancement:**
- Add to Features page for feature release timeline
- Add to Pricing page for plan evolution
- Enhance About page timeline with Radiant UI classes

**Implementation:** Create `components/marketing/RadiantTimeline.tsx`

---

### 7. Counter Animations (Stats That Count Up)

**What It Is:**
Numbers that animate from 0 to target value when scrolled into view

**Current State:**
- About page has custom AnimatedCounter (good!)
- Missing from landing page and features page

**Radiant UI Component:** Counter (12 variants)

**Where to Add:**
- Landing page hero (social proof stats)
- Features page (usage stats)
- Pricing page (ROI calculator)

**Radiant UI Classes:**
```css
.rt-counter-wrapper
.rt-counter-number
.rt-counter-label
```

**Implementation:** Enhance existing AnimatedCounter with Radiant UI styling

---

### 8. Image Gallery/Portfolio

**What It Is:**
Grid or masonry layout showcasing:
- Product screenshots
- Case studies
- Client results
- Platform integrations

**Where to Add:**
- Features page (platform screenshots)
- About page (office/culture photos)

**Radiant UI Component:** Gallery (12 variants)

**Implementation:** Create `components/marketing/ImageGallery.tsx`

---

### 9. Blog/Article Cards

**What It Is:**
Blog post previews with:
- Featured image
- Title, excerpt
- Author, date
- Category tags

**Where to Add:**
- New blog landing page
- Related articles section on other pages

**Radiant UI Component:** Blog (8 variants)

**Implementation:** Create `components/marketing/BlogCard.tsx`

---

### 10. Newsletter Popup

**What It Is:**
Modal that appears after:
- Time delay
- Scroll depth
- Exit intent

**Current State:** Newsletter in footer only

**Radiant UI Component:** Newsletter (1 variant) + Modal

**Implementation:** Create `components/marketing/NewsletterPopup.tsx`

---

### 11. Proper Multi-Column Footer

**Current State:** MarketingFooter.tsx is good but could use more Radiant UI classes

**Enhancement Needed:**
- Add more Radiant UI footer variants
- Include newsletter signup in footer (already done)
- Add recent blog posts section
- Add quick links grid
- Add contact info prominently

**Radiant UI Component:** Footer (14 variants)

**Implementation:** Enhance existing MarketingFooter.tsx

---

## Page-by-Page Enhancement Plan

### Landing Page Enhancements

#### Priority 1 (Must Have)
1. **Animated Hero Background**
   - Component: `AnimatedHero.tsx`
   - Floating gradients, subtle particle effects
   - Glassmorphism on cards

2. **Logo Cloud Section**
   - Component: `LogoCloud.tsx`
   - "Trusted by 500+ businesses" with company logos
   - Marquee scrolling animation

3. **Video Demo Section**
   - Component: `VideoModal.tsx`
   - "See SEOLOGY.AI in Action" with play button
   - Modal with full video player

4. **Accordion FAQ**
   - Replace current card-based FAQ with accordion
   - Component: `AccordionFAQ.tsx`
   - Smooth expand/collapse animations

5. **Counter Stats**
   - Add animated counters to hero or mid-page CTA
   - "10,000+ Fixes Applied" counting up
   - Component: Enhanced AnimatedCounter

#### Priority 2 (Nice to Have)
6. **Interactive Demo**
   - Component: `InteractiveDemo.tsx`
   - Tabbed interface showing different features
   - Live preview or screenshot carousel

7. **Testimonial Carousel**
   - Replace static testimonial grid with carousel
   - Component: `TestimonialCarousel.tsx`
   - Auto-rotating with navigation

8. **Blog Preview Section**
   - "Latest SEO Insights" with 3 recent articles
   - Component: `BlogCard.tsx`
   - Links to full blog

#### Priority 3 (Future)
9. **Newsletter Popup**
   - Exit intent or time-based trigger
   - Component: `NewsletterPopup.tsx`

10. **Product Screenshots Gallery**
    - Interactive gallery showing dashboard
    - Component: `ImageGallery.tsx`

---

### Pricing Page Enhancements

#### Priority 1 (Must Have)
1. **Enhanced Pricing Toggle**
   - Better animation for monthly/annual switch
   - Highlight savings more prominently
   - Radiant UI toggle component

2. **Feature Tabs**
   - Tab navigation for different feature categories
   - Component: `PricingFeatureTabs.tsx`
   - On-Page SEO, Technical SEO, Content, Performance

3. **Testimonials Specific to Pricing**
   - "Why I upgraded to Growth plan" quotes
   - Component: Reuse TestimonialCard with filtering

4. **Plan Comparison Matrix**
   - Enhanced version of current table
   - Sticky header on scroll
   - Better mobile responsive design

#### Priority 2 (Nice to Have)
5. **ROI Calculator Widget**
   - Component: `ROICalculator.tsx`
   - Input hours saved, calculate value
   - "This pays for itself in X days"

6. **Video Testimonials**
   - Component: VideoModal for customer stories
   - Embedded in pricing cards or separate section

7. **FAQ Accordion**
   - Replace current FAQ cards with accordion
   - Pricing-specific questions

#### Priority 3 (Future)
8. **Live Chat Widget**
   - "Questions? Chat with us" for Enterprise plan
   - Intercom or similar integration

9. **Money-Back Guarantee Visual**
   - Badge/seal graphic
   - "30-day money-back guarantee"

---

### Features Page Enhancements

#### Priority 1 (Must Have)
1. **Convert to Light Theme Option**
   - Add toggle for light/dark mode
   - Use Radiant UI color variables
   - Component: Theme toggle

2. **Add Radiant UI Structure**
   - Replace custom dark sections with `rt-component-section`
   - Use Radiant UI containers and grids
   - Maintain current animations

3. **Feature Comparison Table**
   - Component: `FeatureComparisonTable.tsx`
   - SEOLOGY.AI vs Traditional Tools vs Manual
   - Radiant UI table styling

4. **Radiant UI Icon Boxes**
   - Replace current FeatureCard with Radiant UI icon box
   - Hover effects from Radiant UI
   - Maintain current icons

#### Priority 2 (Nice to Have)
5. **Feature Carousel**
   - Component: `FeatureCarousel.tsx`
   - Showcase features with auto-rotation
   - Image + description slides

6. **Timeline for Feature Releases**
   - "Product Roadmap" section
   - Component: RadiantTimeline
   - Past milestones + future features

7. **Progress Bars**
   - Show feature completion percentage
   - "On-Page SEO: 95% coverage"
   - Component: Radiant UI Progress Bar

8. **Interactive Feature Cards**
   - Click to expand for more details
   - Modal or accordion expansion
   - Radiant UI card + modal combo

#### Priority 3 (Future)
9. **Feature Request Board**
   - Integration with Canny or similar
   - Community voting on features

10. **Beta Features Showcase**
    - "Try our latest features" section
    - Opt-in toggle for beta access

---

### About Page Enhancements

#### Priority 1 (Must Have)
1. **Radiant UI Team Cards**
   - Component: `TeamCard.tsx`
   - Use Radiant UI team variants
   - Add hover effects, social links

2. **Company Timeline**
   - Enhance existing timeline with Radiant UI classes
   - Component: RadiantTimeline
   - Add more visual elements (icons, images)

3. **Office/Culture Photo Gallery**
   - Component: `ImageGallery.tsx`
   - Grid layout with lightbox
   - "Life at SEOLOGY.AI"

4. **Awards & Recognition Section**
   - Component: `AwardsSection.tsx`
   - Badges for certifications (SOC 2, etc.)
   - Press mentions, awards won

#### Priority 2 (Nice to Have)
5. **Company Milestones Counter**
   - Enhanced AnimatedCounter
   - "Founded in 2023, 500+ customers, 50K+ fixes"
   - Visual timeline with counters

6. **Partners/Clients Logo Cloud**
   - Component: LogoCloud
   - "Powered by" (Anthropic, Vercel, etc.)
   - "Integrates with" (Shopify, WordPress)

7. **Video About the Company**
   - Component: VideoModal
   - Founder story or team introduction
   - 1-2 minute video

8. **Leadership Team Carousel**
   - Component: TeamCarousel
   - If team grows beyond 3-4 people
   - Rotating team member profiles

#### Priority 3 (Future)
9. **Investor Section**
   - If applicable, showcase investors/funding
   - Logo cloud of investor firms

10. **Press & Media**
    - Media kit download
    - Press releases
    - Featured articles

---

## Implementation Guide

### Step 1: Set Up Radiant UI CSS

Add Radiant UI CSS to the project:

```tsx
// app/layout.tsx or app/(marketing)/layout.tsx
import '@/styles/radiant-ui.css'
```

Copy Radiant UI CSS files to `public/radiant-ui/`:
```
public/
  radiant-ui/
    normalize.css
    webflow.css
    radiant-ui-component-library.css
```

### Step 2: Create Shared Radiant UI Components

#### File Structure
```
components/
  marketing/
    radiant/
      RadiantSection.tsx       # Wrapper for rt-component-section
      RadiantContainer.tsx     # Wrapper for rt-component-container
      RadiantHeading.tsx       # Typography helpers
      RadiantBadge.tsx         # Badge component
      RadiantCard.tsx          # Card wrapper
      RadiantIconBox.tsx       # Icon box component
      RadiantGrid.tsx          # Grid layouts
```

#### Example: RadiantSection.tsx
```tsx
interface RadiantSectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'neutral-100' | 'neutral-200' | 'accent-1' | 'neutral-800'
}

export function RadiantSection({
  children,
  className = '',
  background = 'white'
}: RadiantSectionProps) {
  const bgClass = {
    'white': '',
    'neutral-100': 'bg-neutral-100',
    'neutral-200': 'bg-neutral-200',
    'accent-1': 'bg-accent-1',
    'neutral-800': 'bg-neutral-800'
  }[background]

  return (
    <section className={`rt-component-section ${bgClass} ${className}`}>
      <div className="w-layout-blockcontainer rt-component-container w-container">
        <div className="rt-newsletter-wrap">
          {children}
        </div>
      </div>
    </section>
  )
}
```

### Step 3: Implement Priority 1 Components

#### 1. AnimatedHero.tsx
```tsx
'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function AnimatedHero() {
  return (
    <section className="rt-component-section relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(56, 152, 236, 0.15) 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(56, 152, 236, 0.1) 0%, transparent 70%)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="w-layout-blockcontainer rt-component-container w-container">
        <div className="rt-newsletter-wrap relative z-10">
          <div className="rt-footer-four-title-main">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="badge green mg-bottom-24px"
            >
              <div className="w-layout-hflex rt-text-icon-wrap">
                <Sparkles className="w-4 h-4" />
                <span>Powered by Claude 3.5 Sonnet AI</span>
              </div>
            </motion.div>

            {/* Rest of hero content */}
          </div>
        </div>
      </div>
    </section>
  )
}
```

#### 2. LogoCloud.tsx
```tsx
'use client'

import { motion } from 'framer-motion'

const companies = [
  { name: 'TechCorp', logo: '/logos/techcorp.svg' },
  { name: 'GrowthCo', logo: '/logos/growthco.svg' },
  // ... more companies
]

export function LogoCloud() {
  return (
    <section className="rt-component-section bg-neutral-100">
      <div className="w-layout-blockcontainer rt-component-container w-container">
        <div className="rt-newsletter-wrap">
          <div className="rt-footer-four-title-main mg-bottom-48px">
            <div className="text-100 color-neutral-600 mg-bottom-32px">
              Trusted by 500+ businesses worldwide
            </div>
          </div>

          {/* Logo Grid */}
          <div className="w-layout-hflex rt-nav-one-dropdown-upper-wrap">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rt-nav-top-wrap-contain"
              >
                <div className="card pd-24px flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-8 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

#### 3. VideoModal.tsx
```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'

interface VideoModalProps {
  videoUrl: string
  thumbnailUrl: string
  title: string
}

export function VideoModal({ videoUrl, thumbnailUrl, title }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Video Preview */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="card pd-0 overflow-hidden cursor-pointer relative group"
        onClick={() => setIsOpen(true)}
      >
        <img src={thumbnailUrl} alt={title} className="w-full" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="card-icon-square _64px"
          >
            <Play className="w-8 h-8 text-white fill-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-neutral-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Video */}
              <div className="relative pt-[56.25%]">
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

#### 4. AccordionFAQ.tsx
```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface AccordionFAQProps {
  items: FAQItem[]
}

export function AccordionFAQ({ items }: AccordionFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="w-layout-vflex">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="card pd-24px---18px cursor-pointer"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full"
          >
            <div className="w-layout-hflex rt-text-icon-wrap justify-between">
              <div className="rt-nav-text text-left">{item.question}</div>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 color-accent-1" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-100 color-neutral-600 mg-top-16px">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
```

---

## Radiant UI CSS Reference

### Core Variables
```css
:root {
  --radiant-ui-components-library-marketplace--color--white: white;
  --radiant-ui-components-library-marketplace--color--body-font-dark: #6d6d6d;
  --radiant-ui-components-library-marketplace--color--heading-dark: #150438;
}
```

### Layout Classes
```css
.rt-component-section              /* Main section wrapper */
.rt-component-container             /* Container with max-width */
.rt-newsletter-wrap                 /* Content wrapper with flex centering */

/* Grid Layouts */
.rt-nav-one-dropdown-upper-wrap     /* Multi-column grid (responsive) */
.rt-nav-top-wrap-contain            /* Column wrapper with padding/borders */
```

### Typography
```css
.rt-component-heading-two           /* Large heading */
.rt-button-font                     /* Button text style */
.rt-nav-text                        /* Navigation/card title text */
```

### Components
```css
/* Cards */
.card                               /* Base card */
.card-highlighted                   /* Highlighted card (pricing) */
.card-dark                          /* Dark theme card */
.card-icon-square                   /* Icon container */

/* Badges */
.badge                              /* Base badge */
.badge.green                        /* Green badge */
.badge.blue                         /* Blue badge */
.badge.yellow                       /* Yellow badge */

/* Buttons */
.btn-primary                        /* Primary button */
.btn-secondary                      /* Secondary button */
.btn-primary.large                  /* Large primary button */

/* Icon Box */
.rt-icon-box                        /* Icon container */
.rt-text-icon-wrap                  /* Icon + text flex wrapper */
```

### Utility Classes
```css
/* Spacing */
.mg-bottom-8px                      /* margin-bottom: 8px */
.mg-bottom-16px                     /* margin-bottom: 16px */
.mg-bottom-24px                     /* margin-bottom: 24px */
.mg-bottom-32px                     /* margin-bottom: 32px */
.mg-bottom-48px                     /* margin-bottom: 48px */
.mg-top-16px                        /* margin-top: 16px */
.mg-top-24px                        /* margin-top: 24px */

.pd-24px                            /* padding: 24px */
.pd-32px---24px                     /* padding: 32px 24px */
.pd-32px---44px                     /* padding: 32px 44px */

/* Colors */
.color-neutral-600                  /* Text color */
.color-neutral-800                  /* Dark text color */
.color-neutral-100                  /* Light text color */
.color-accent-1                     /* Accent color (blue) */

.bg-neutral-100                     /* Light gray background */
.bg-neutral-200                     /* Lighter gray background */
.bg-accent-1                        /* Accent background */
.bg-neutral-800                     /* Dark background */

/* Typography Sizes */
.text-50                            /* Small text (12px) */
.text-100                           /* Body text (17px) */
.text-200                           /* Large body (19px) */
.text-300                           /* Heading (24px) */
.text-400                           /* Large heading (36px) */
.text-600                           /* Extra large (48px) */

/* Font Weights */
.medium                             /* font-weight: 500 */
.bold                               /* font-weight: 700 */
```

### Layout Helpers
```css
.w-layout-hflex                     /* Horizontal flex */
.w-layout-vflex                     /* Vertical flex */
.w-layout-blockcontainer            /* Block container */

.width-100                          /* width: 100% */

.divider                            /* Horizontal divider line */
.card-small-divider                 /* Small card divider */
```

---

## Implementation Priority

### Week 1: Landing Page
- [ ] AnimatedHero with particles
- [ ] LogoCloud section
- [ ] VideoModal for demo
- [ ] AccordionFAQ
- [ ] Enhanced counters

### Week 2: Features & Pricing
- [ ] Features page light mode
- [ ] FeatureComparisonTable
- [ ] Enhanced pricing toggle
- [ ] PricingFeatureTabs
- [ ] ROI calculator

### Week 3: About & Extras
- [ ] Radiant UI team cards
- [ ] ImageGallery for office photos
- [ ] AwardsSection
- [ ] BlogCard component
- [ ] NewsletterPopup

### Week 4: Polish & Testing
- [ ] Responsive testing all pages
- [ ] Animation performance optimization
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Documentation updates

---

## Component File Checklist

### Create These Files:
```
components/marketing/
  radiant/
    ✅ RadiantSection.tsx
    ✅ RadiantContainer.tsx
    ✅ RadiantHeading.tsx
    ✅ RadiantBadge.tsx
    ✅ RadiantCard.tsx
    ✅ RadiantIconBox.tsx
    ✅ RadiantGrid.tsx

  ✅ AnimatedHero.tsx
  ✅ LogoCloud.tsx
  ✅ VideoModal.tsx
  ✅ AccordionFAQ.tsx
  ⬜ InteractiveDemo.tsx
  ⬜ TestimonialCarousel.tsx
  ⬜ ImageGallery.tsx
  ⬜ BlogCard.tsx
  ⬜ NewsletterPopup.tsx
  ⬜ FeatureComparisonTable.tsx
  ⬜ PricingFeatureTabs.tsx
  ⬜ ROICalculator.tsx
  ⬜ TeamCard.tsx
  ⬜ AwardsSection.tsx
  ⬜ RadiantTimeline.tsx
```

---

## CSS Files to Copy

Copy from `C:\Users\manna\Downloads\Website inspo\radiant-ui-component-library-s-34e5e8.webflow\css\`:

1. `normalize.css` → `public/radiant-ui/normalize.css`
2. `webflow.css` → `public/radiant-ui/webflow.css`
3. `radiant-ui-component-library-s-34e5e8.webflow.css` → `public/radiant-ui/radiant-ui.css`

Add to `app/(marketing)/layout.tsx`:
```tsx
import '@/public/radiant-ui/normalize.css'
import '@/public/radiant-ui/webflow.css'
import '@/public/radiant-ui/radiant-ui.css'
```

---

## Testing Checklist

- [ ] All Radiant UI classes render correctly
- [ ] Animations are smooth (60fps)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Dark mode toggle works (if added)
- [ ] All modals/popups close properly
- [ ] Forms submit correctly
- [ ] Videos play in modals
- [ ] Counters animate on scroll
- [ ] Accordions expand/collapse smoothly
- [ ] Hover effects work on all components
- [ ] All links go to correct destinations
- [ ] Newsletter signup functional
- [ ] Accessibility: keyboard navigation
- [ ] Accessibility: screen reader friendly
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge

---

## Notes

- All components should use Radiant UI CSS classes for consistency
- Framer Motion can be used for additional animations on top of Radiant UI
- Keep dark theme as option for Features page (user preference)
- Ensure all new components are TypeScript
- Follow existing naming conventions (PascalCase for components)
- Add prop types and JSDoc comments
- Test on real devices, not just browser DevTools

---

## Success Criteria

Marketing pages will be considered "complete" when:

1. ✅ All Radiant UI components are integrated
2. ✅ Landing page has animated hero, logo cloud, video, accordion FAQ
3. ✅ Pricing page has enhanced toggle, feature tabs, testimonials
4. ✅ Features page has light mode option, comparison table, carousel
5. ✅ About page has Radiant team cards, gallery, awards section
6. ✅ Footer is multi-column with newsletter, links, social
7. ✅ All pages are fully responsive
8. ✅ Animations are smooth and performant
9. ✅ Accessibility standards met (WCAG AA)
10. ✅ Cross-browser compatible
