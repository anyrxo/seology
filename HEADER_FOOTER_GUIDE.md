# Header & Footer Implementation Guide

This guide documents the header and footer components implemented from the Dashflow X and Radiant UI Webflow templates for SEOLOGY.AI.

## Overview

The project uses two distinct design systems:
- **Dashflow X** - For the dashboard/admin interface
- **Radiant UI** - For the marketing website

## Dashboard Components (Dashflow X)

### DashboardHeader Component

**Location**: `components/dashboard/DashboardHeader.tsx`

**Features**:
- Sticky header with backdrop blur effect
- Dynamic breadcrumb navigation
- Global search functionality
- Command palette (⌘K keyboard shortcut)
- Notifications dropdown with unread count
- User menu with avatar
- Theme toggle (light/dark mode)
- Settings icon
- Fully responsive mobile layout

**Template Source**: Based on Dashflow X Webflow template header structure
**CSS Classes**: Uses Dashflow X classes (`header-wrapper`, `header-content-wrapper`, `header-right-side-container`)

**Key Elements**:
```tsx
// Header structure
<header className="header-wrapper sticky top-0 z-50">
  <div className="container-default w-container">
    <div className="header-content-wrapper">
      {/* Left: Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Right: Actions */}
      <div className="header-right-side-container">
        <CommandPalette trigger />
        <GlobalSearch />
        <ThemeToggle />
        <NotificationDropdown />
        <UserMenu />
      </div>
    </div>
  </div>
</header>
```

**CSS Variables Used**:
- `--neutral--100` - Background color
- `--neutral--600` - Text color
- `--neutral--800` - Dark text
- `--accent--primary-1` - Accent/hover color

**Responsive Breakpoints**:
- Desktop (1280px+): Full header with all actions
- Tablet (768px-1279px): Condensed search, hidden command palette
- Mobile (<768px): Page title only, mobile menu icon

### Dashboard Layout

**Location**: `app/dashboard/layout.tsx`

Uses:
- `DashboardHeader` for top navigation
- `Sidebar` for left navigation (desktop)
- `BottomNav` for bottom navigation (mobile)
- `Footer` with minimal variant

## Marketing Components (Radiant UI)

### RadiantNav Component

**Location**: `components/marketing/RadiantNav.tsx`

**Features**:
- Sticky navigation with scroll effect
- Mega dropdown menu with icons and descriptions
- Multi-column layout for Products menu
- Smooth hover animations
- CTA buttons (Sign In, Start Free Trial)
- Authentication-aware navigation
- Mobile hamburger menu
- Icon hover effects (black → blue transition)

**Template Source**: Based on Radiant UI Component Library navigation
**CSS Classes**: Uses Radiant UI classes (`rt-nav-one`, `rt-nav-one-dropdown`, `rt-nav-one-dropdown-list`)

**Key Elements**:
```tsx
<nav className="rt-nav-one">
  <div className="rt-nav-one-container w-layout-blockcontainer">
    <div className="rt-nav-one-wrap w-layout-hflex">
      {/* Logo */}
      <Link href="/">SEOLOGY.AI</Link>

      {/* Desktop Navigation */}
      <div className="rt-nav-menu">
        {/* Products Mega Dropdown */}
        <div className="rt-nav-one-dropdown">
          <nav className="rt-nav-one-dropdown-list">
            {/* Multi-column layout with icons */}
          </nav>
        </div>

        {/* Other links */}
        <Link href="/features">Features</Link>
        <Link href="/pricing">Pricing</Link>
      </div>

      {/* Right CTAs */}
      <div className="rt-nav-top-wrap-contain">
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">Start Free Trial</Link>
      </div>
    </div>
  </div>
</nav>
```

**Mega Menu Structure**:
The Products dropdown uses a 4-column grid layout:
1. Core Features (Automatic Fixes, Security, Analytics, Rollback)
2. Integrations (Shopify, WordPress, Magic.js, Custom)
3. Use Cases (E-commerce, Blogs, SaaS, Agencies)
4. Resources (Documentation, API, Support, Blog)

Each menu item includes:
- Icon (with hover effect)
- Title
- Description
- Link to page

**CSS Variables Used**:
- `--radiant-ui-components-library-marketplace--color--white` - White color
- `--radiant-ui-components-library-marketplace--color--body-font-dark` - Body text
- `--radiant-ui-components-library-marketplace--color--heading-dark` - Headings

**Hover Effects**:
```css
.rt-icon-box:hover .rt-black-icon { opacity: 0; }
.rt-icon-box:hover .rt-blue-icon { opacity: 1; }
```

### RadiantFooter Component

**Location**: `components/marketing/RadiantFooter.tsx`

**Features**:
- Newsletter signup section with email input
- Multi-column footer layout (5 columns)
- Social media icons with hover effects
- Category-organized links (Product, Resources, Company, Legal)
- Responsive grid layout
- Form submission handling
- Success/error message display
- Dark background with light text

**Template Source**: Based on Radiant UI newsletter and footer components
**CSS Classes**: Uses Radiant UI classes (`rt-component-section`, `rt-newsletter-wrap`, `rt-footer-newsletter`)

**Structure**:
```tsx
<footer>
  {/* Newsletter Section */}
  <section className="rt-component-section rt-newsletter-blue-section">
    <div className="rt-newsletter-wrap">
      <h2>Get the latest stories into your inbox</h2>
      <form onSubmit={handleNewsletterSubmit}>
        <div className="rt-footer-newsletter-main">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </div>
      </form>
    </div>
  </section>

  {/* Main Footer Content */}
  <div className="bg-[#150438]">
    <div className="grid grid-cols-5 gap-8">
      {/* Company Info + Social */}
      <div>
        <h3>SEOLOGY.AI</h3>
        <p>Description...</p>
        <div className="social-links">
          {/* Social icons */}
        </div>
      </div>

      {/* Product Links */}
      <div>...</div>

      {/* Resources Links */}
      <div>...</div>

      {/* Company Links */}
      <div>...</div>

      {/* Legal Links */}
      <div>...</div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t">
      <p>&copy; 2025 SEOLOGY.AI</p>
      <div className="legal-links">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </div>
    </div>
  </div>
</footer>
```

**Newsletter Form**:
- Email validation (HTML5 required attribute)
- Loading state during submission
- Success/error message display
- Auto-clear messages after 3 seconds
- Disabled state while submitting

**Footer Links**:
- **Product**: Features, Pricing, Integrations, Changelog, Roadmap
- **Resources**: Documentation, API Reference, Guides, Blog, Case Studies
- **Company**: About Us, Careers, Contact, Support, Partners
- **Legal**: Privacy Policy, Terms of Service, Cookie Policy, Security, Compliance

**Social Media Icons**:
- Twitter, LinkedIn, GitHub, Facebook, Instagram
- Hover effect: background changes to brand color (#3898ec)
- Opens in new tab with `rel="noopener noreferrer"`

### Marketing Layout

**Location**: `components/marketing/MarketingLayout.tsx`

Structure:
```tsx
<AnnouncementProvider>
  <div className="min-h-screen bg-neutral-200">
    <AnnouncementBar />
    <RadiantNav />
    <main>{children}</main>
    <RadiantFooter />
  </div>
</AnnouncementProvider>
```

## CSS Integration

### Dashflow X CSS Files

Located in `C:\Users\manna\Downloads\Website inspo\anyros-wondrous-site.webflow\css\`:
- `normalize.css` - CSS reset
- `webflow.css` - Webflow framework
- `anyros-wondrous-site.webflow.css` - Custom Dashflow X styles

**Key Classes**:
```css
.header-wrapper {
  z-index: 999;
  background-color: var(--neutral--100);
  box-shadow: 1px 0 3px 0 var(--general--shadow-01);
  padding-top: 16px;
  padding-bottom: 16px;
}

.header-content-wrapper {
  grid-column-gap: 20px;
  align-items: center;
  display: flex;
}

.header-right-side-container {
  grid-column-gap: 12px;
  align-items: center;
  display: flex;
}

.card-icon-square {
  border: 1px solid var(--neutral--400);
  background-color: var(--neutral--100);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-icon-square._40px {
  width: 40px;
  height: 40px;
}
```

### Radiant UI CSS Files

Located in `C:\Users\manna\Downloads\Website inspo\radiant-ui-component-library-s-34e5e8.webflow\css\`:
- `normalize.css` - CSS reset
- `webflow.css` - Webflow framework
- `radiant-ui-component-library-s-34e5e8.webflow.css` - Custom Radiant UI styles

**Key Classes**:
```css
.rt-nav-one {
  z-index: 999;
  background-color: white;
  border-bottom: 1px solid #d5d5d5;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 30px rgba(17, 37, 66, 0.15);
}

.rt-nav-one-container {
  max-width: 1320px;
  padding-left: 15px;
  padding-right: 15px;
}

.rt-nav-one-wrap {
  flex-direction: row;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.rt-footer-newsletter-main {
  background-color: #f4f4f4;
  display: flex;
}

.rt-footer-newsletter-input {
  color: #6d6d6d;
  background-color: transparent;
  border: 0;
  height: 62px;
  padding: 0 25px;
  font-size: 16px;
}

.rt-footer-newsletter-button {
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  place-items: center;
  min-width: 180px;
  display: grid;
}
```

## Responsive Design

### Desktop (1280px and above)
- Full navigation with all menu items
- Mega dropdown menus visible on hover
- All header actions visible
- 5-column footer layout

### Tablet (768px - 1279px)
- Condensed navigation
- Reduced header actions
- 3-column footer layout
- Simplified dropdowns

### Mobile (below 768px)
- Hamburger menu
- Mobile-optimized navigation drawer
- Stacked footer columns
- Touch-friendly buttons
- Bottom navigation for dashboard

## Usage Examples

### Using DashboardHeader

The header is automatically included in the dashboard layout. To customize:

```tsx
// app/dashboard/layout.tsx
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

export default function DashboardLayout({ children }) {
  return (
    <div className="header-sidebar-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <DashboardHeader />
        <main>{children}</main>
      </div>
    </div>
  )
}
```

### Using RadiantNav

The navigation is automatically included in the marketing layout:

```tsx
// app/(marketing)/layout.tsx
import RadiantNav from '@/components/marketing/RadiantNav'

export default function MarketingLayout({ children }) {
  return (
    <div>
      <RadiantNav />
      <main>{children}</main>
    </div>
  )
}
```

### Customizing Mega Menu

To modify the mega menu items in RadiantNav:

```tsx
// components/marketing/RadiantNav.tsx
const featuresMegaMenu: MegaMenuColumn[] = [
  {
    title: 'Your Category',
    items: [
      {
        title: 'Your Feature',
        description: 'Feature description',
        href: '/your-link',
        icon: <YourIcon className="w-5 h-5" />
      }
    ]
  }
]
```

### Customizing Footer Links

To modify footer links in RadiantFooter:

```tsx
// components/marketing/RadiantFooter.tsx
const footerLinks = {
  product: [
    { name: 'Your Link', href: '/your-path' },
    // ... more links
  ],
  // ... other categories
}
```

## Styling Guidelines

### Dashflow X Colors
- Primary: `#3d73ff` (`--accent--primary-1`)
- Neutral Dark: `#1f2d54` (`--neutral--800`)
- Neutral Light: `#f7f8fc` (`--neutral--200`)
- Border: `#e6e9f1` (`--neutral--400`)

### Radiant UI Colors
- Primary Blue: `#3898ec`
- Dark Purple: `#150438`
- Body Text: `#6d6d6d`
- White: `white`

### Typography
Both templates use:
- Font Family: Inter (Dashflow X), Outfit (Radiant UI)
- Heading weights: 700 (bold)
- Body weights: 400 (regular), 500 (medium)

## Accessibility

All components include:
- ARIA labels for icon buttons
- Keyboard navigation support
- Focus states
- Screen reader friendly structure
- Semantic HTML elements

## Performance Considerations

- Components use React.memo where appropriate
- Images use Next.js Image component (where applicable)
- CSS is loaded only when needed
- Smooth scroll behavior for navigation
- Optimized hover effects

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

Potential improvements:
- Add mobile swipe gestures for dropdowns
- Implement search functionality in nav
- Add animation library (Framer Motion) for smoother transitions
- Create dark mode variants for marketing pages
- Add analytics tracking to navigation clicks
- Implement A/B testing for CTA buttons

## Troubleshooting

### Header not sticky
Ensure parent container doesn't have `overflow: hidden`

### Dropdown not showing
Check z-index values and parent stacking context

### Mobile menu not responsive
Verify Tailwind breakpoint classes are correct

### Footer layout broken
Check grid column settings match content

## Resources

- [Dashflow X Documentation](https://dashflowtemplate.webflow.io/)
- [Radiant UI Components](https://radiant-ui-component-library.webflow.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Clerk Authentication](https://clerk.com/docs)

---

**Last Updated**: November 4, 2025
**Version**: 1.0
**Maintained by**: SEOLOGY.AI Development Team
