# Radiant UI - Quick Reference Guide

## 🚀 TL;DR

Radiant UI is FULLY INTEGRATED. Use these classes in your components:

```tsx
// Navigation
<nav className="rt-nav-one">
  <div className="rt-nav-one-container w-layout-blockcontainer">
    <div className="rt-nav-one-wrap w-layout-hflex">
      {/* Your nav items */}
    </div>
  </div>
</nav>

// Newsletter
<section className="rt-component-section rt-newsletter-blue-section">
  <div className="rt-newsletter-wrap">
    <input className="rt-footer-newsletter-input w-input" />
  </div>
</section>

// Icon with Hover Effect
<div className="rt-icon-box">
  <div className="rt-black-icon">{/* Black icon */}</div>
  <div className="rt-blue-icon">{/* Blue icon */}</div>
</div>
```

---

## 📦 What's Included

✅ 3 CSS files (normalize, webflow, radiant-ui)
✅ 1 JavaScript file (webflow.js - 47 KB)
✅ 60 SVG icons (all component types)
✅ Full navigation with mega menu
✅ Newsletter component
✅ Form components
✅ Icon hover effects

---

## 🎨 Common Classes

### Layout
```css
.rt-component-section          /* Full-width section wrapper */
.rt-component-container         /* Max-width container (1290px) */
.w-layout-blockcontainer        /* Responsive container (940px) */
.w-layout-hflex                /* Horizontal flex layout */
.w-layout-vflex                /* Vertical flex layout */
```

### Navigation
```css
.rt-nav-one                    /* Main navigation bar */
.rt-nav-one-container          /* Nav container (1320px) */
.rt-nav-one-dropdown           /* Dropdown wrapper */
.rt-nav-one-dropdown-toggle    /* Dropdown trigger */
.rt-nav-one-dropdown-list      /* Dropdown content */
.rt-nav-text                   /* Navigation link text */
```

### Icons
```css
.rt-icon-box                   /* Icon container */
.rt-black-icon                 /* Default black icon */
.rt-blue-icon                  /* Hover blue icon */
.rt-text-icon-wrap             /* Icon + text wrapper */
```

### Forms
```css
.rt-footer-newsletter-input    /* Email input field */
.rt-footer-newsletter-button   /* Submit button wrapper */
.rt-button-font               /* Button text styling */
.rt-form-block                /* Form wrapper */
```

### Typography
```css
.rt-component-heading-two      /* Section headings (30px) */
.rt-nav-text                  /* Navigation text */
.rt-button-font               /* Button text (uppercase) */
```

---

## 🎯 Color Variables

```css
--radiant-ui-components-library-marketplace--color--white: white
--radiant-ui-components-library-marketplace--color--body-font-dark: #6d6d6d
--radiant-ui-components-library-marketplace--color--heading-dark: #150438
```

**Quick Colors**:
- Heading: `#150438` (dark purple)
- Body: `#6d6d6d` (gray)
- Accent: `#3898ec` (blue)
- Background: `white`

---

## 🔧 Required JSX Styles for Dropdowns

Add this to any component with dropdowns:

```tsx
<style jsx>{`
  .w-dropdown-list {
    display: none;
  }
  .w-dropdown-list.w--open {
    display: flex;
  }
  .rt-icon-box:hover .rt-black-icon {
    opacity: 0;
  }
  .rt-icon-box:hover .rt-blue-icon {
    opacity: 1;
  }
  .rt-blue-icon {
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .rt-black-icon {
    transition: opacity 0.3s ease;
  }
`}</style>
```

---

## 📱 Responsive Breakpoints

```css
@media (min-width: 1920px)  /* Large screens */
@media (max-width: 991px)   /* Tablet - hide desktop nav */
@media (max-width: 767px)   /* Mobile */
@media (max-width: 479px)   /* Small mobile */
```

---

## 🖼️ Icon Assets

All icons located at: `/radiant/images/`

**Format**: Component-Black.svg & Component-Blue.svg

Examples:
- `/radiant/images/Navgiation-Icon.svg`
- `/radiant/images/Blog-Black.svg`
- `/radiant/images/Newsletter.svg`
- `/radiant/images/Pricing-Blue.svg`

---

## ⚡ Copy-Paste Examples

### Mega Menu Dropdown

```tsx
<div
  className="rt-nav-one-dropdown w-dropdown"
  onMouseEnter={() => setActiveDropdown('features')}
>
  <div className="rt-nav-one-dropdown-toggle w-dropdown-toggle">
    <div className="rt-text-icon-wrap w-layout-hflex">
      <div className="rt-nav-text">Features</div>
      <ChevronDown className="w-4 h-4" />
    </div>
  </div>

  <nav className={`rt-nav-one-dropdown-list w-dropdown-list ${active ? 'w--open' : ''}`}>
    <div className="rt-nav-one-dropdown-list-wrap">
      {/* Menu content */}
    </div>
  </nav>
</div>
```

### Newsletter Form

```tsx
<form className="rt-form-block w-form">
  <div className="rt-footer-newsletter-main">
    <input
      className="rt-footer-newsletter-input w-input"
      type="email"
      placeholder="Enter your email"
      required
    />
    <div className="rt-footer-newsletter-line"></div>
    <button className="rt-footer-newsletter-button">
      <div className="rt-button-font">Subscribe</div>
    </button>
  </div>
</form>
```

### Icon with Hover

```tsx
<Link href="/path" className="rt-nav-top-link-wrap w-inline-block">
  <div className="rt-text-icon-wrap rt-icon-gap w-layout-hflex">
    <div className="rt-icon-box">
      <Zap className="rt-black-icon w-5 h-5" />
      <Zap className="rt-blue-icon w-5 h-5" style={{ color: '#3898ec' }} />
    </div>
    <div>
      <div className="rt-nav-text font-semibold">Feature Name</div>
      <div className="text-sm text-gray-600">Description</div>
    </div>
  </div>
</Link>
```

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Dropdowns not opening | Check `webflow.js` is loaded, add JSX styles |
| Icons not changing color | Ensure both black & blue icon divs exist |
| Input not styled | Use `.rt-footer-newsletter-input w-input` |
| Layout breaks on mobile | Check CSS load order, verify breakpoints |

---

## 📚 Full Documentation

For complete details, see: `RADIANT_UI_INTEGRATION.md`

---

## ✅ Current Implementation

Radiant UI is used in:
- ✅ `components/marketing/MarketingNavbar.tsx` - Main navigation
- ✅ `components/marketing/RadiantNav.tsx` - Standalone nav
- ✅ `components/marketing/LandingPageContent.tsx` - Landing page sections

**Status**: FULLY FUNCTIONAL

**Last Updated**: November 4, 2025
