# SEOLOGY.AI Design Examples

Visual reference guide with specific implementation examples for the black & white design system.

## Quick Reference: Component Classes

### Buttons

```tsx
// Primary CTA
className="relative overflow-hidden px-8 py-4 bg-white text-black font-semibold border border-white hover:bg-black hover:text-white transition-all duration-300 group"

// Secondary CTA
className="px-8 py-4 bg-transparent text-white font-semibold border border-white/20 hover:border-white hover:bg-white/5 transition-all duration-300"

// Ghost/Text Button
className="px-6 py-3 bg-transparent text-white/70 font-medium hover:text-white hover:translate-x-1 transition-all duration-300"
```

### Cards

```tsx
// Feature Card with Hover
className="group relative p-8 bg-black-50 border border-white/10 hover:border-white/30 hover:bg-black-100 hover:-translate-y-1 transition-all duration-500"

// Glass Card
className="relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50"

// Pricing Card
className="group relative p-8 bg-black-50 border border-white/10 hover:border-white hover:shadow-2xl hover:shadow-white/10 transition-all duration-500"
```

### Navigation

```tsx
// Fixed Nav with Blur
className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl"

// Nav Link
className="text-base text-white/70 hover:text-white transition-colors duration-300"
```

### Typography

```tsx
// Display Hero Text
className="text-display-mobile md:text-display text-white"

// Gradient Text
className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent"

// Section Heading
className="text-h2-mobile md:text-h2 text-white"

// Body Text
className="text-lg-mobile md:text-lg text-white/70"

// Secondary Text
className="text-base text-white/50"
```

---

## Complete Page Examples

### 1. Landing Page Hero

```tsx
<section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
  {/* Grid Background Pattern */}
  <div className="absolute inset-0 opacity-20">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }}
    />
  </div>

  {/* Radial Gradient Spotlight */}
  <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />

  {/* Content */}
  <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
    <div className="max-w-4xl mx-auto text-center">
      {/* Hero Title with Gradient */}
      <h1 className="text-display-mobile md:text-display text-white mb-6 animate-fade-up">
        AI That Actually
        <br />
        <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
          Fixes Your SEO
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg-mobile md:text-lg text-white/70 mb-12 max-w-2xl mx-auto animate-fade-up animation-delay-200">
        The first SEO platform that doesn't just report issues—it logs into your CMS and fixes them automatically.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-400">
        <button className="w-full sm:w-auto relative overflow-hidden px-8 py-4 bg-white text-black font-semibold border border-white hover:bg-black hover:text-white transition-all duration-300 group">
          <span className="relative z-10">Start Free Trial</span>
          <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </button>
        <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold border border-white/20 hover:border-white hover:bg-white/5 transition-all duration-300">
          Watch Demo
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-white/50 animate-fade-up animation-delay-600">
        <span>No credit card required</span>
        <span className="hidden sm:inline">•</span>
        <span>14-day free trial</span>
        <span className="hidden sm:inline">•</span>
        <span>Cancel anytime</span>
      </div>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
      <div className="w-1 h-2 bg-white/50 rounded-full" />
    </div>
  </div>
</section>
```

---

### 2. Features Grid Section

```tsx
<section className="py-section-mobile md:py-section bg-black-50">
  <div className="max-w-[1280px] mx-auto px-6 md:px-12">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-h2-mobile md:text-h2 text-white mb-4">
        Everything You Need
      </h2>
      <p className="text-lg-mobile md:text-lg text-white/70 max-w-2xl mx-auto">
        Powerful features that actually fix your SEO, not just report it.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Feature Card 1 */}
      <div className="group relative p-8 bg-black-50 border border-white/10 hover:border-white/30 hover:bg-black-100 hover:-translate-y-1 transition-all duration-500">
        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="w-12 h-12 mb-6 text-white transition-transform duration-500 group-hover:scale-110">
            {/* SVG Icon Here */}
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>

          <h3 className="text-h4-mobile md:text-h4 text-white mb-3">
            Automatic Fixes
          </h3>
          <p className="text-base text-white/70">
            Claude AI analyzes and fixes SEO issues automatically—no manual work required.
          </p>
        </div>

        {/* Bottom Border Accent */}
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
      </div>

      {/* Repeat for more cards... */}
    </div>
  </div>
</section>
```

---

### 3. Pricing Cards

```tsx
<section className="py-section-mobile md:py-section bg-black">
  <div className="max-w-[1280px] mx-auto px-6 md:px-12">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-h2-mobile md:text-h2 text-white mb-4">
        Simple, Transparent Pricing
      </h2>
      <p className="text-lg-mobile md:text-lg text-white/70 max-w-2xl mx-auto">
        Choose the plan that scales with your business.
      </p>
    </div>

    {/* Pricing Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* Starter Plan */}
      <div className="group relative p-8 bg-black-50 border border-white/10 hover:border-white hover:shadow-2xl hover:shadow-white/10 transition-all duration-500">
        <div className="mb-8">
          <h3 className="text-h3-mobile md:text-h3 text-white mb-2">Starter</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-display-mobile md:text-display text-white">$49</span>
            <span className="text-base text-white/50">/month</span>
          </div>
        </div>

        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-white mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
            </svg>
            <span className="text-base text-white/70">3 connected sites</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-white mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
            </svg>
            <span className="text-base text-white/70">500 fixes per month</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-white mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
            </svg>
            <span className="text-base text-white/70">90-day rollback</span>
          </li>
        </ul>

        <button className="w-full relative overflow-hidden px-8 py-4 bg-white text-black font-semibold border border-white hover:bg-black hover:text-white transition-all duration-300 group">
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </button>
      </div>

      {/* Growth Plan (Popular) */}
      <div className="group relative p-8 bg-black-50 border border-white hover:shadow-2xl hover:shadow-white/10 transition-all duration-500">
        {/* Popular Badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs font-bold">
          POPULAR
        </div>

        {/* Same structure as Starter... */}
      </div>

      {/* Scale Plan */}
      <div className="group relative p-8 bg-black-50 border border-white/10 hover:border-white hover:shadow-2xl hover:shadow-white/10 transition-all duration-500">
        {/* Same structure as Starter... */}
      </div>
    </div>
  </div>
</section>
```

---

### 4. Testimonial Cards

```tsx
<section className="py-section-mobile md:py-section bg-black-50">
  <div className="max-w-[1280px] mx-auto px-6 md:px-12">
    <div className="text-center mb-16">
      <h2 className="text-h2-mobile md:text-h2 text-white mb-4">
        Loved by SEO Teams
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Testimonial Card */}
      <div className="group relative p-8 bg-black-50 border border-white/10 hover:border-white/30 transition-all duration-500">
        {/* Quote */}
        <p className="text-lg text-white/90 mb-6 italic">
          "SEOLOGY.AI saved us hundreds of hours. What used to take our team weeks now happens automatically overnight."
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden">
            {/* Author image or initials */}
            <div className="w-full h-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
          </div>
          <div>
            <div className="text-base text-white font-semibold">Jane Doe</div>
            <div className="text-sm text-white/50">Head of SEO at TechCorp</div>
          </div>
        </div>

        {/* Quote Mark Decoration */}
        <div className="absolute top-8 right-8 text-6xl text-white/5 font-serif">"</div>
      </div>

      {/* Repeat for more testimonials... */}
    </div>
  </div>
</section>
```

---

### 5. How It Works (Alternating Layout)

```tsx
<section className="py-section-mobile md:py-section bg-black">
  <div className="max-w-[1280px] mx-auto px-6 md:px-12">
    <div className="text-center mb-16">
      <h2 className="text-h2-mobile md:text-h2 text-white mb-4">
        How It Works
      </h2>
      <p className="text-lg-mobile md:text-lg text-white/70 max-w-2xl mx-auto">
        From connection to results in four simple steps.
      </p>
    </div>

    <div className="space-y-32">
      {/* Step 1 - Image Right */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div>
          <div className="text-8xl font-bold text-white/5 mb-4">01</div>
          <h3 className="text-h3-mobile md:text-h3 text-white mb-4">
            Connect Your Site
          </h3>
          <p className="text-lg-mobile md:text-lg text-white/70">
            Link your Shopify, WordPress, or custom site in 60 seconds.
          </p>
        </div>

        {/* Visual */}
        <div className="relative aspect-square bg-black-50 border border-white/10 p-8 hover:border-white/30 transition-all duration-500">
          {/* Placeholder for visual/screenshot */}
          <div className="w-full h-full flex items-center justify-center text-white/20">
            Visual Here
          </div>
        </div>
      </div>

      {/* Step 2 - Image Left */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="md:order-2">
          <div className="text-8xl font-bold text-white/5 mb-4">02</div>
          <h3 className="text-h3-mobile md:text-h3 text-white mb-4">
            AI Analyzes Everything
          </h3>
          <p className="text-lg-mobile md:text-lg text-white/70">
            Claude AI scans your entire site for SEO issues and opportunities.
          </p>
        </div>

        {/* Visual */}
        <div className="relative aspect-square bg-black-50 border border-white/10 p-8 hover:border-white/30 transition-all duration-500 md:order-1">
          <div className="w-full h-full flex items-center justify-center text-white/20">
            Visual Here
          </div>
        </div>
      </div>

      {/* Continue alternating for Step 3 & 4... */}
    </div>
  </div>
</section>
```

---

### 6. CTA Section with Glow

```tsx
<section className="relative py-section-mobile md:py-section bg-gradient-to-b from-black to-black-100 overflow-hidden">
  {/* Glow Effect */}
  <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent opacity-50" />

  <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-h1-mobile md:text-h1 text-white mb-6">
        Ready to Fix Your SEO?
      </h1>
      <p className="text-lg-mobile md:text-lg text-white/70 mb-12 max-w-2xl mx-auto">
        Join hundreds of companies using AI to automate their SEO. Start your 14-day free trial today.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="w-full sm:w-auto relative overflow-hidden px-12 py-5 text-lg bg-white text-black font-semibold border border-white hover:bg-black hover:text-white transition-all duration-300 group">
          <span className="relative z-10">Start Free Trial</span>
          <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </button>
        <button className="w-full sm:w-auto px-12 py-5 text-lg bg-transparent text-white font-semibold border border-white/20 hover:border-white hover:bg-white/5 transition-all duration-300">
          Book a Demo
        </button>
      </div>

      <div className="mt-8 text-sm text-white/50">
        No credit card required • 14-day free trial • Cancel anytime
      </div>
    </div>
  </div>
</section>
```

---

### 7. Navigation with Blur

```tsx
<nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
  <div className="max-w-[1280px] mx-auto px-6 md:px-12">
    <div className="flex items-center justify-between h-20">
      {/* Logo */}
      <div className="text-h4-mobile md:text-h4 text-white font-bold">
        SEOLOGY.AI
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-base text-white/70 hover:text-white transition-colors duration-300">
          Features
        </a>
        <a href="#pricing" className="text-base text-white/70 hover:text-white transition-colors duration-300">
          Pricing
        </a>
        <a href="#about" className="text-base text-white/70 hover:text-white transition-colors duration-300">
          About
        </a>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4">
        <button className="hidden sm:block px-6 py-3 bg-transparent text-white/70 font-medium hover:text-white transition-all duration-300">
          Sign In
        </button>
        <button className="relative overflow-hidden px-6 py-3 bg-white text-black font-semibold text-sm border border-white hover:bg-black hover:text-white transition-all duration-300 group">
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>
</nav>
```

---

### 8. Footer

```tsx
<footer className="border-t border-white/10 bg-black py-16">
  <div className="max-w-[1280px] mx-auto px-6 md:px-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      {/* Brand Column */}
      <div className="md:col-span-1">
        <div className="text-h4-mobile md:text-h4 text-white font-bold mb-4">
          SEOLOGY.AI
        </div>
        <p className="text-sm text-white/50">
          AI-powered SEO automation that actually fixes issues.
        </p>
      </div>

      {/* Product Column */}
      <div>
        <h4 className="text-base text-white font-semibold mb-4">Product</h4>
        <ul className="space-y-3">
          <li>
            <a href="/features" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
              Features
            </a>
          </li>
          <li>
            <a href="/pricing" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
              Pricing
            </a>
          </li>
          <li>
            <a href="/integrations" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
              Integrations
            </a>
          </li>
        </ul>
      </div>

      {/* Company Column */}
      <div>
        <h4 className="text-base text-white font-semibold mb-4">Company</h4>
        <ul className="space-y-3">
          <li>
            <a href="/about" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
              About
            </a>
          </li>
          <li>
            <a href="/blog" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
              Blog
            </a>
          </li>
        </ul>
      </div>

      {/* Legal Column */}
      <div>
        <h4 className="text-base text-white font-semibold mb-4">Legal</h4>
        <ul className="space-y-3">
          <li>
            <a href="/privacy" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
              Privacy
            </a>
          </li>
          <li>
            <a href="/terms" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
              Terms
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-white/50">
        © 2025 SEOLOGY.AI. All rights reserved.
      </p>

      <div className="flex items-center gap-6">
        <a href="#" className="text-white/50 hover:text-white transition-colors duration-300" aria-label="Twitter">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
          </svg>
        </a>
        <a href="#" className="text-white/50 hover:text-white transition-colors duration-300" aria-label="LinkedIn">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="#" className="text-white/50 hover:text-white transition-colors duration-300" aria-label="GitHub">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</footer>
```

---

## Input Components

### Text Input

```tsx
<div className="space-y-2">
  <label className="text-sm text-white/70 font-medium">
    Email Address
  </label>
  <input
    type="email"
    className="w-full px-4 py-3 bg-black-50 border border-white/10 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-all duration-300"
    placeholder="you@example.com"
  />
</div>
```

### Input with Error

```tsx
<div className="space-y-2">
  <label className="text-sm text-white/70 font-medium">
    Password
  </label>
  <input
    type="password"
    className="w-full px-4 py-3 bg-black-50 border border-red-500 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-all duration-300"
    placeholder="••••••••"
  />
  <p className="text-sm text-red-500">Password is required</p>
</div>
```

### Select Dropdown

```tsx
<div className="space-y-2">
  <label className="text-sm text-white/70 font-medium">
    Choose Plan
  </label>
  <select className="w-full px-4 py-3 bg-black-50 border border-white/10 text-white focus:border-white focus:outline-none transition-all duration-300">
    <option>Starter</option>
    <option>Growth</option>
    <option>Scale</option>
  </select>
</div>
```

---

## Badges & Tags

```tsx
{/* Success Badge */}
<span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-900/20 text-green-400 border border-green-500/20">
  Connected
</span>

{/* Warning Badge */}
<span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-yellow-900/20 text-yellow-400 border border-yellow-500/20">
  Pending
</span>

{/* Error Badge */}
<span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-red-900/20 text-red-400 border border-red-500/20">
  Error
</span>

{/* Default Badge */}
<span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-white/5 text-white/70 border border-white/10">
  New
</span>
```

---

## Modal/Dialog

```tsx
{/* Backdrop */}
<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  {/* Modal Container */}
  <div className="relative w-full max-w-lg bg-black-50 border border-white/10 p-8 shadow-2xl">
    {/* Close Button */}
    <button className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {/* Content */}
    <h3 className="text-h3-mobile md:text-h3 text-white mb-4">
      Confirm Action
    </h3>
    <p className="text-base text-white/70 mb-8">
      Are you sure you want to proceed? This action cannot be undone.
    </p>

    {/* Actions */}
    <div className="flex gap-4">
      <button className="flex-1 px-6 py-3 bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5 transition-all duration-300">
        Cancel
      </button>
      <button className="flex-1 relative overflow-hidden px-6 py-3 bg-white text-black font-semibold border border-white hover:bg-black hover:text-white transition-all duration-300 group">
        <span className="relative z-10">Confirm</span>
        <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </button>
    </div>
  </div>
</div>
```

---

## Utility Classes Quick Reference

```css
/* Backgrounds */
.bg-black           /* #000000 */
.bg-black-50        /* #0A0A0A */
.bg-black-100       /* #141414 */
.bg-white/5         /* White 5% opacity */
.bg-white/10        /* White 10% opacity */

/* Text Colors */
.text-white         /* #FFFFFF */
.text-white/70      /* White 70% opacity */
.text-white/50      /* White 50% opacity */

/* Borders */
.border-white/10    /* White 10% opacity border */
.border-white/20    /* White 20% opacity border */
.border-white       /* White border */

/* Effects */
.backdrop-blur-xl   /* Blur background */
.shadow-2xl         /* Large shadow */
.shadow-white/10    /* White shadow 10% opacity */

/* Animations */
.animate-fade-up
.animate-fade-in
.animate-bounce
.animation-delay-200
.animation-delay-400
.animation-delay-600

/* Gradients */
.bg-gradient-to-r from-white to-white/50
.bg-gradient-radial from-white/5 via-transparent to-transparent
.bg-clip-text text-transparent  /* For gradient text */
```

---

## Best Practices Checklist

- [ ] Use pure black (#000000) for backgrounds
- [ ] Use pure white (#FFFFFF) for text and accents
- [ ] Apply opacity for depth (white/70, white/50, white/10)
- [ ] Include hover states on all interactive elements
- [ ] Add smooth transitions (duration-300 to duration-500)
- [ ] Use border-white/10 for default borders
- [ ] Use border-white for hover/focus states
- [ ] Include backdrop-blur-xl for navigation and overlays
- [ ] Add animate-fade-up for scroll-triggered reveals
- [ ] Maintain consistent spacing (section, section-mobile)
- [ ] Use responsive typography classes (text-h2-mobile md:text-h2)
- [ ] Include focus states for accessibility
- [ ] Test with reduced-motion preferences

---

**Last Updated**: 2025-11-03
**Version**: 1.0.0
