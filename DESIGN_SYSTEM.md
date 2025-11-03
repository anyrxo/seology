# SEOLOGY.AI Design System

A sophisticated black & white design system combining Apple's minimalism with Stripe's elegance.

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Component Library](#component-library)
5. [Animation System](#animation-system)
6. [Page Templates](#page-templates)
7. [Implementation Guide](#implementation-guide)

---

## Color Palette

### Primary Colors

```css
--black-pure: #000000        /* Primary backgrounds, text on light */
--white-pure: #FFFFFF        /* Primary text, accents, borders */
```

### Background Gradients

```css
--black-000: #000000         /* Pure black - Hero sections */
--black-050: #0A0A0A         /* Subtle elevation - Cards */
--black-100: #141414         /* Secondary sections */
--black-200: #1A1A1A         /* Elevated cards */
--black-300: #262626         /* Hover states */
--black-400: #333333         /* Borders, dividers */
```

### White Variations

```css
--white-000: #FFFFFF         /* Pure white - Primary text */
--white-050: #FAFAFA         /* Subtle backgrounds */
--white-100: #F5F5F5         /* Light sections */
--white-200: #E5E5E5         /* Borders on light */
```

### Opacity System

```css
--white-alpha-10: rgba(255, 255, 255, 0.1)   /* Subtle borders */
--white-alpha-20: rgba(255, 255, 255, 0.2)   /* Card borders */
--white-alpha-30: rgba(255, 255, 255, 0.3)   /* Hover borders */
--white-alpha-50: rgba(255, 255, 255, 0.5)   /* Secondary text */
--white-alpha-70: rgba(255, 255, 255, 0.7)   /* Muted text */

--black-alpha-10: rgba(0, 0, 0, 0.1)         /* Light shadows */
--black-alpha-20: rgba(0, 0, 0, 0.2)         /* Medium shadows */
--black-alpha-50: rgba(0, 0, 0, 0.5)         /* Deep shadows */
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#000000',
          50: '#0A0A0A',
          100: '#141414',
          200: '#1A1A1A',
          300: '#262626',
          400: '#333333',
        },
        white: {
          DEFAULT: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
        }
      }
    }
  }
}
```

---

## Typography

### Font Stack

**Primary**: Inter (Variable)
**Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

### Type Scale

```css
/* Display - For hero sections */
--text-display: 72px / 1.1 / -0.02em / 700
--text-display-mobile: 40px / 1.1 / -0.02em / 700

/* Heading 1 - Page titles */
--text-h1: 56px / 1.2 / -0.01em / 700
--text-h1-mobile: 32px / 1.2 / -0.01em / 700

/* Heading 2 - Section titles */
--text-h2: 40px / 1.3 / -0.01em / 600
--text-h2-mobile: 28px / 1.3 / -0.01em / 600

/* Heading 3 - Subsections */
--text-h3: 32px / 1.4 / 0 / 600
--text-h3-mobile: 24px / 1.4 / 0 / 600

/* Heading 4 - Card titles */
--text-h4: 24px / 1.5 / 0 / 600
--text-h4-mobile: 20px / 1.5 / 0 / 600

/* Body Large */
--text-lg: 20px / 1.6 / 0 / 400
--text-lg-mobile: 18px / 1.6 / 0 / 400

/* Body */
--text-base: 16px / 1.6 / 0 / 400

/* Body Small */
--text-sm: 14px / 1.5 / 0 / 400

/* Caption */
--text-xs: 12px / 1.4 / 0 / 500
```

### Tailwind Typography Classes

```javascript
// tailwind.config.js
fontSize: {
  'display': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
  'display-mobile': ['40px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
  'h1': ['56px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
  'h1-mobile': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
  'h2': ['40px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
  'h2-mobile': ['28px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
  'h3': ['32px', { lineHeight: '1.4', fontWeight: '600' }],
  'h3-mobile': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
  'h4': ['24px', { lineHeight: '1.5', fontWeight: '600' }],
  'h4-mobile': ['20px', { lineHeight: '1.5', fontWeight: '600' }],
  'lg': ['20px', { lineHeight: '1.6' }],
  'lg-mobile': ['18px', { lineHeight: '1.6' }],
}
```

### Typography Components

```tsx
// components/ui/Typography.tsx
export const Display = ({ children, className = "" }) => (
  <h1 className={`text-display-mobile md:text-display text-white ${className}`}>
    {children}
  </h1>
)

export const H1 = ({ children, className = "" }) => (
  <h1 className={`text-h1-mobile md:text-h1 text-white ${className}`}>
    {children}
  </h1>
)

export const H2 = ({ children, className = "" }) => (
  <h2 className={`text-h2-mobile md:text-h2 text-white ${className}`}>
    {children}
  </h2>
)

export const BodyLarge = ({ children, className = "" }) => (
  <p className={`text-lg-mobile md:text-lg text-white/70 ${className}`}>
    {children}
  </p>
)
```

---

## Spacing & Layout

### Spacing Scale

```javascript
// tailwind.config.js
spacing: {
  'section': '128px',        // Section vertical padding
  'section-mobile': '64px',  // Section mobile padding
  'container': '1280px',     // Max container width
  'gap-lg': '48px',          // Large gaps
  'gap': '24px',             // Default gaps
  'gap-sm': '16px',          // Small gaps
}
```

### Container System

```tsx
// components/layout/Container.tsx
export const Container = ({ children, className = "" }) => (
  <div className={`max-w-[1280px] mx-auto px-6 md:px-12 ${className}`}>
    {children}
  </div>
)

export const Section = ({ children, className = "" }) => (
  <section className={`py-section-mobile md:py-section ${className}`}>
    <Container>{children}</Container>
  </section>
)
```

### Grid System

```css
/* 12-column grid */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* Responsive feature grid */
.grid-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
```

---

## Component Library

### 1. Buttons

#### Primary Button

```tsx
// components/ui/Button.tsx
export const ButtonPrimary = ({ children, className = "", ...props }) => (
  <button
    className={`
      relative overflow-hidden
      px-8 py-4
      bg-white text-black
      font-semibold text-base
      border border-white
      transition-all duration-300
      hover:bg-black hover:text-white
      group
      ${className}
    `}
    {...props}
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
  </button>
)
```

**Tailwind Classes**:
```
bg-white text-black border border-white px-8 py-4 font-semibold
hover:bg-black hover:text-white transition-all duration-300
```

#### Secondary Button

```tsx
export const ButtonSecondary = ({ children, className = "", ...props }) => (
  <button
    className={`
      px-8 py-4
      bg-transparent text-white
      font-semibold text-base
      border border-white/20
      transition-all duration-300
      hover:border-white hover:bg-white/5
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
)
```

**Tailwind Classes**:
```
bg-transparent text-white border border-white/20 px-8 py-4 font-semibold
hover:border-white hover:bg-white/5 transition-all duration-300
```

#### Ghost Button

```tsx
export const ButtonGhost = ({ children, className = "", ...props }) => (
  <button
    className={`
      px-6 py-3
      bg-transparent text-white/70
      font-medium text-sm
      transition-all duration-300
      hover:text-white hover:translate-x-1
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
)
```

### 2. Cards

#### Feature Card

```tsx
// components/ui/Card.tsx
export const FeatureCard = ({ icon, title, description, className = "" }) => (
  <div
    className={`
      group
      relative
      p-8
      bg-black-50
      border border-white/10
      transition-all duration-500
      hover:border-white/30
      hover:bg-black-100
      hover:-translate-y-1
      ${className}
    `}
  >
    {/* Glow effect on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
    </div>

    {/* Content */}
    <div className="relative z-10">
      <div className="w-12 h-12 mb-6 text-white transition-transform duration-500 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-h4 text-white mb-3">{title}</h3>
      <p className="text-base text-white/70">{description}</p>
    </div>

    {/* Bottom border accent */}
    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
  </div>
)
```

**Tailwind Classes**:
```
group relative p-8 bg-black-50 border border-white/10
hover:border-white/30 hover:bg-black-100 hover:-translate-y-1
transition-all duration-500
```

#### Glass Card

```tsx
export const GlassCard = ({ children, className = "" }) => (
  <div
    className={`
      relative
      p-8
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      shadow-2xl shadow-black/50
      ${className}
    `}
  >
    {children}
  </div>
)
```

**Tailwind Classes**:
```
relative p-8 bg-white/5 backdrop-blur-xl border border-white/10
shadow-2xl shadow-black/50
```

#### Pricing Card

```tsx
export const PricingCard = ({
  plan,
  price,
  features,
  isPopular = false,
  className = ""
}) => (
  <div
    className={`
      group
      relative
      p-8
      bg-black-50
      border
      ${isPopular ? 'border-white' : 'border-white/10'}
      transition-all duration-500
      hover:border-white
      hover:shadow-2xl hover:shadow-white/10
      ${className}
    `}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs font-bold">
        POPULAR
      </div>
    )}

    <div className="mb-8">
      <h3 className="text-h3 text-white mb-2">{plan}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-display text-white">${price}</span>
        <span className="text-base text-white/50">/month</span>
      </div>
    </div>

    <ul className="space-y-4 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3">
          <svg className="w-5 h-5 text-white mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
          </svg>
          <span className="text-base text-white/70">{feature}</span>
        </li>
      ))}
    </ul>

    <ButtonPrimary className="w-full">Get Started</ButtonPrimary>
  </div>
)
```

### 3. Navigation

#### Main Navigation

```tsx
// components/layout/Navigation.tsx
export const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
    <Container>
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <div className="text-h4 text-white font-bold">
          SEOLOGY.AI
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#about">About</NavLink>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <ButtonGhost>Sign In</ButtonGhost>
          <ButtonPrimary>Get Started</ButtonPrimary>
        </div>
      </div>
    </Container>
  </nav>
)

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-base text-white/70 hover:text-white transition-colors duration-300"
  >
    {children}
  </a>
)
```

**Tailwind Classes**:
```
fixed top-0 left-0 right-0 z-50 border-b border-white/10
bg-black/80 backdrop-blur-xl
```

### 4. Hero Sections

#### Main Hero

```tsx
// components/sections/Hero.tsx
export const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
    {/* Animated grid background */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }} />
    </div>

    {/* Radial gradient spotlight */}
    <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />

    <Container className="relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <Display className="mb-6 animate-fade-up">
          AI That Actually
          <br />
          <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
            Fixes Your SEO
          </span>
        </Display>

        <BodyLarge className="mb-12 max-w-2xl mx-auto animate-fade-up animation-delay-200">
          The first SEO platform that doesn't just report issues—it logs into your CMS and fixes them automatically.
        </BodyLarge>

        <div className="flex items-center justify-center gap-4 animate-fade-up animation-delay-400">
          <ButtonPrimary>Start Free Trial</ButtonPrimary>
          <ButtonSecondary>Watch Demo</ButtonSecondary>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex items-center justify-center gap-8 text-sm text-white/50 animate-fade-up animation-delay-600">
          <span>No credit card required</span>
          <span>•</span>
          <span>14-day free trial</span>
          <span>•</span>
          <span>Cancel anytime</span>
        </div>
      </div>
    </Container>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
        <div className="w-1 h-2 bg-white/50 rounded-full" />
      </div>
    </div>
  </section>
)
```

### 5. Input Fields

```tsx
// components/ui/Input.tsx
export const Input = ({ label, error, className = "", ...props }) => (
  <div className="space-y-2">
    {label && (
      <label className="text-sm text-white/70 font-medium">
        {label}
      </label>
    )}
    <input
      className={`
        w-full px-4 py-3
        bg-black-50
        border border-white/10
        text-white placeholder:text-white/30
        focus:border-white focus:outline-none
        transition-all duration-300
        ${error ? 'border-red-500' : ''}
        ${className}
      `}
      {...props}
    />
    {error && (
      <p className="text-sm text-red-500">{error}</p>
    )}
  </div>
)
```

### 6. Testimonials

```tsx
// components/sections/Testimonial.tsx
export const TestimonialCard = ({ quote, author, role, company, image }) => (
  <div className="group relative p-8 bg-black-50 border border-white/10 hover:border-white/30 transition-all duration-500">
    {/* Quote */}
    <p className="text-lg text-white/90 mb-6 italic">
      "{quote}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden">
        {image && <img src={image} alt={author} className="w-full h-full object-cover" />}
      </div>
      <div>
        <div className="text-base text-white font-semibold">{author}</div>
        <div className="text-sm text-white/50">{role} at {company}</div>
      </div>
    </div>

    {/* Quote mark decoration */}
    <div className="absolute top-8 right-8 text-6xl text-white/5 font-serif">"</div>
  </div>
)
```

---

## Animation System

### Framer Motion Variants

```tsx
// lib/animations.ts
export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

export const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -40
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 40
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

// Magnetic button effect
export const magneticVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
}

// Glow effect
export const glowVariants = {
  rest: {
    boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)'
  },
  hover: {
    boxShadow: '0 0 40px 0 rgba(255, 255, 255, 0.2)',
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
}
```

### Usage Examples

```tsx
import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainerVariants } from '@/lib/animations'

// Fade up on scroll
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeUpVariants}
>
  <H2>Amazing Feature</H2>
</motion.div>

// Stagger children
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainerVariants}
  className="grid grid-cols-3 gap-6"
>
  {features.map((feature) => (
    <motion.div key={feature.id} variants={fadeUpVariants}>
      <FeatureCard {...feature} />
    </motion.div>
  ))}
</motion.div>

// Magnetic button
<motion.button
  variants={magneticVariants}
  initial="rest"
  whileHover="hover"
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

### CSS Animations

```css
/* Tailwind config animations */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
  }
}

/* Utility classes */
.animate-fade-up {
  animation: fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out both;
}

.animate-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

/* Animation delays */
.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}
```

### Tailwind Animation Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.8s ease-out both',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 255, 255, 0.2)' },
        },
      },
    },
  },
}
```

---

## Page Templates

### Landing Page Structure

```tsx
// app/page.tsx
export default function LandingPage() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Social Proof */}
      <TrustedBySection />

      {/* Features Grid */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Benefits */}
      <BenefitsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Pricing */}
      <PricingSection />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </>
  )
}
```

### Features Section

```tsx
// components/sections/Features.tsx
const features = [
  {
    icon: <SparklesIcon />,
    title: "Automatic Fixes",
    description: "Claude AI analyzes and fixes SEO issues automatically—no manual work required."
  },
  {
    icon: <LinkIcon />,
    title: "Direct CMS Integration",
    description: "Connects to Shopify, WordPress, and custom sites to make permanent changes."
  },
  {
    icon: <ShieldIcon />,
    title: "Safe Rollbacks",
    description: "Every change is tracked with 90-day rollback capability for peace of mind."
  },
  // ... more features
]

export const FeaturesSection = () => (
  <Section className="bg-black-50">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div variants={fadeUpVariants}>
          <H2 className="mb-4">Everything You Need</H2>
          <BodyLarge className="max-w-2xl mx-auto">
            Powerful features that actually fix your SEO, not just report it.
          </BodyLarge>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div key={i} variants={fadeUpVariants}>
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  </Section>
)
```

### Pricing Section

```tsx
// components/sections/Pricing.tsx
const plans = [
  {
    plan: "Starter",
    price: 49,
    features: [
      "3 connected sites",
      "500 fixes per month",
      "All SEO fix types",
      "90-day rollback",
      "Email support"
    ]
  },
  {
    plan: "Growth",
    price: 149,
    isPopular: true,
    features: [
      "10 connected sites",
      "5,000 fixes per month",
      "All SEO fix types",
      "90-day rollback",
      "Priority support",
      "Custom workflows"
    ]
  },
  {
    plan: "Scale",
    price: 499,
    features: [
      "Unlimited sites",
      "Unlimited fixes",
      "All SEO fix types",
      "90-day rollback",
      "Dedicated support",
      "Custom integrations",
      "API access"
    ]
  }
]

export const PricingSection = () => (
  <Section className="bg-black">
    <div className="text-center mb-16">
      <H2 className="mb-4">Simple, Transparent Pricing</H2>
      <BodyLarge className="max-w-2xl mx-auto">
        Choose the plan that scales with your business.
      </BodyLarge>
    </div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainerVariants}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
    >
      {plans.map((plan, i) => (
        <motion.div key={i} variants={fadeUpVariants}>
          <PricingCard {...plan} />
        </motion.div>
      ))}
    </motion.div>
  </Section>
)
```

### How It Works Section

```tsx
// components/sections/HowItWorks.tsx
const steps = [
  {
    number: "01",
    title: "Connect Your Site",
    description: "Link your Shopify, WordPress, or custom site in 60 seconds.",
    visual: <ConnectionVisual />
  },
  {
    number: "02",
    title: "AI Analyzes Everything",
    description: "Claude AI scans your entire site for SEO issues and opportunities.",
    visual: <AnalysisVisual />
  },
  {
    number: "03",
    title: "Approve & Apply",
    description: "Review proposed fixes and apply them with one click—or let AI handle it.",
    visual: <ApplyVisual />
  },
  {
    number: "04",
    title: "Track Results",
    description: "Monitor rankings, traffic, and ROI from your dashboard.",
    visual: <DashboardVisual />
  }
]

export const HowItWorksSection = () => (
  <Section className="bg-black">
    <div className="text-center mb-16">
      <H2 className="mb-4">How It Works</H2>
      <BodyLarge className="max-w-2xl mx-auto">
        From connection to results in four simple steps.
      </BodyLarge>
    </div>

    <div className="space-y-32">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className={`grid md:grid-cols-2 gap-12 items-center ${
            i % 2 === 1 ? 'md:flex-row-reverse' : ''
          }`}
        >
          {/* Content */}
          <div className={i % 2 === 1 ? 'md:order-2' : ''}>
            <div className="text-8xl font-bold text-white/5 mb-4">
              {step.number}
            </div>
            <H3 className="mb-4">{step.title}</H3>
            <BodyLarge>{step.description}</BodyLarge>
          </div>

          {/* Visual */}
          <div className={i % 2 === 1 ? 'md:order-1' : ''}>
            <div className="relative aspect-square bg-black-50 border border-white/10 p-8 hover:border-white/30 transition-all duration-500">
              {step.visual}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
)
```

### CTA Section

```tsx
// components/sections/CTA.tsx
export const CTASection = () => (
  <Section className="bg-gradient-to-b from-black to-black-100">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUpVariants}
      className="max-w-4xl mx-auto text-center"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent opacity-50" />

      <div className="relative z-10">
        <H1 className="mb-6">
          Ready to Fix Your SEO?
        </H1>
        <BodyLarge className="mb-12 max-w-2xl mx-auto">
          Join hundreds of companies using AI to automate their SEO.
          Start your 14-day free trial today.
        </BodyLarge>

        <div className="flex items-center justify-center gap-4">
          <ButtonPrimary className="text-lg px-12 py-5">
            Start Free Trial
          </ButtonPrimary>
          <ButtonSecondary className="text-lg px-12 py-5">
            Book a Demo
          </ButtonSecondary>
        </div>

        <div className="mt-8 text-sm text-white/50">
          No credit card required • 14-day free trial • Cancel anytime
        </div>
      </div>
    </motion.div>
  </Section>
)
```

### Footer

```tsx
// components/layout/Footer.tsx
export const Footer = () => (
  <footer className="border-t border-white/10 bg-black py-16">
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="text-h4 text-white font-bold mb-4">
            SEOLOGY.AI
          </div>
          <p className="text-sm text-white/50">
            AI-powered SEO automation that actually fixes issues.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-base text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-3">
            <FooterLink href="/features">Features</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/integrations">Integrations</FooterLink>
            <FooterLink href="/changelog">Changelog</FooterLink>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-base text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-3">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-base text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-3">
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
            <FooterLink href="/security">Security</FooterLink>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-white/50">
          © 2025 SEOLOGY.AI. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <SocialLink href="#" aria-label="Twitter">
            <TwitterIcon />
          </SocialLink>
          <SocialLink href="#" aria-label="LinkedIn">
            <LinkedInIcon />
          </SocialLink>
          <SocialLink href="#" aria-label="GitHub">
            <GitHubIcon />
          </SocialLink>
        </div>
      </div>
    </Container>
  </footer>
)

const FooterLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="text-sm text-white/50 hover:text-white transition-colors duration-300"
    >
      {children}
    </a>
  </li>
)

const SocialLink = ({ href, children, ...props }) => (
  <a
    href={href}
    className="text-white/50 hover:text-white transition-colors duration-300"
    {...props}
  >
    {children}
  </a>
)
```

---

## Implementation Guide

### 1. Setup Tailwind Config

```javascript
// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        black: {
          DEFAULT: '#000000',
          50: '#0A0A0A',
          100: '#141414',
          200: '#1A1A1A',
          300: '#262626',
          400: '#333333',
        },
        white: {
          DEFAULT: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      fontSize: {
        'display': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-mobile': ['40px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['56px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h1-mobile': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['40px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h2-mobile': ['28px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['32px', { lineHeight: '1.4', fontWeight: '600' }],
        'h3-mobile': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['24px', { lineHeight: '1.5', fontWeight: '600' }],
        'h4-mobile': ['20px', { lineHeight: '1.5', fontWeight: '600' }],
        'lg': ['20px', { lineHeight: '1.6' }],
        'lg-mobile': ['18px', { lineHeight: '1.6' }],
      },
      spacing: {
        'section': '128px',
        'section-mobile': '64px',
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.8s ease-out both',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 255, 255, 0.2)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

### 2. Setup Global Styles

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-black text-white antialiased;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-black-100;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-white/20 hover:bg-white/30 rounded-full;
  }
}

@layer utilities {
  .animation-delay-200 {
    animation-delay: 200ms;
  }

  .animation-delay-400 {
    animation-delay: 400ms;
  }

  .animation-delay-600 {
    animation-delay: 600ms;
  }

  .text-gradient {
    @apply bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent;
  }

  .glass {
    @apply bg-white/5 backdrop-blur-xl border border-white/10;
  }

  .glow {
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
  }
}
```

### 3. Setup Fonts

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

### 4. Install Dependencies

```bash
npm install framer-motion
npm install tailwindcss-animate
npm install clsx tailwind-merge
```

### 5. Create Utility Functions

```tsx
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 6. File Structure

```
components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Typography.tsx
├── layout/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── Container.tsx
└── sections/
    ├── Hero.tsx
    ├── Features.tsx
    ├── HowItWorks.tsx
    ├── Pricing.tsx
    ├── Testimonials.tsx
    └── CTA.tsx

lib/
├── animations.ts
└── utils.ts
```

---

## Design Principles

### 1. Contrast is King
- Use pure black (#000000) and pure white (#FFFFFF) for maximum impact
- Leverage subtle grays only for depth and hierarchy
- Avoid mid-tones—embrace the extremes

### 2. Whitespace as Design
- Generous padding and margins (section: 128px desktop, 64px mobile)
- Let content breathe
- Use negative space to create focus

### 3. Typography Hierarchy
- Large, bold headlines that command attention
- Clean, readable body text with generous line height
- Tight letter-spacing on display text (-0.02em)

### 4. Subtle Motion
- Animations should enhance, not distract
- Use 0.3-0.6s durations with custom easing
- Prefer opacity and transform over other properties
- Always provide reduced-motion alternatives

### 5. Progressive Disclosure
- Reveal content on scroll using intersection observers
- Stagger child animations for elegance
- Use hover states to reveal additional information

### 6. Glass & Glow
- Glass morphism for overlay elements (bg-white/5, backdrop-blur-xl)
- Subtle white glows on hover (shadow-white/20)
- Border animations from transparent to white

### 7. Responsive Design
- Mobile-first approach
- Fluid typography using clamp() where needed
- Touch-friendly targets (minimum 44px)
- Simplified animations on mobile

---

## Accessibility

### Color Contrast
All text meets WCAG AA standards:
- White text on black: 21:1 (AAA)
- White/70 on black: 14.7:1 (AAA)
- White/50 on black: 10.5:1 (AA for large text)

### Focus States
```css
.focus-visible {
  @apply outline-none ring-2 ring-white ring-offset-2 ring-offset-black;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Clear focus indicators
- Skip to content link
- Logical tab order

---

## Performance

### Image Optimization
- Use Next.js Image component
- Provide width/height to prevent CLS
- Use WebP format with PNG fallback
- Lazy load below-the-fold images

### Animation Performance
- Use transform and opacity only
- Enable GPU acceleration with will-change
- Limit concurrent animations
- Use Framer Motion's `layoutId` for shared element transitions

### Code Splitting
- Lazy load sections below the fold
- Dynamic imports for heavy components
- Prefetch on hover for navigation links

---

## Brand Voice in Design

### Confident
- Bold typography
- Strong contrasts
- Decisive CTAs

### Professional
- Clean layouts
- Consistent spacing
- Refined animations

### Innovative
- Modern design patterns
- Cutting-edge animations
- Glass morphism effects

### Trustworthy
- Clear hierarchy
- Transparent pricing
- Accessible design

---

## Next Steps

1. **Implement Core Components**: Start with Button, Card, Typography
2. **Build Navigation**: Fixed header with blur background
3. **Create Hero**: Animated hero with gradient text
4. **Features Grid**: Staggered animation on scroll
5. **Pricing Section**: Glass cards with hover effects
6. **Polish Animations**: Fine-tune timing and easing
7. **Test Accessibility**: Verify WCAG compliance
8. **Optimize Performance**: Measure and improve Core Web Vitals

---

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Performance](https://web.dev/performance/)

---

**Last Updated**: 2025-11-03
**Version**: 1.0.0
**Design System Owner**: SEOLOGY.AI Design Team
