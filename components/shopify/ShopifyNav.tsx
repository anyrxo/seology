/**
 * Shopify Navigation Component
 * Accessible navigation with semantic HTML and ARIA labels
 */

'use client'

interface ShopifyNavProps {
  shop: string | null
}

// Extend JSX to support ui-nav-menu web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ui-nav-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

export function ShopifyNav({ shop }: ShopifyNavProps) {
  return (
    <nav aria-label="Main navigation">
      {/* @ts-expect-error - Shopify App Bridge web component not in type definitions */}
      <ui-nav-menu>
        <a href={`/shopify/dashboard?shop=${shop}`} rel="home" aria-label="Dashboard home">Dashboard</a>
        <a href={`/shopify/products?shop=${shop}`} aria-label="Products page">Products</a>
        <a href={`/shopify/analytics?shop=${shop}`} aria-label="Analytics page">Analytics</a>
        <a href={`/shopify/timeline?shop=${shop}`} aria-label="Timeline page">Timeline</a>
        <a href={`/shopify/agents?shop=${shop}`} aria-label="AI Agents page">AI Agents</a>
        <a href={`/shopify/monitor?shop=${shop}`} aria-label="Monitor page">Monitor</a>
        <a href={`/shopify/reports?shop=${shop}`} aria-label="SEO Reports page">SEO Reports</a>
        <a href={`/shopify/chat?shop=${shop}`} aria-label="AI Chat page">AI Chat</a>
        <a href={`/shopify/settings?shop=${shop}`} aria-label="Settings page">Settings</a>
        <a href={`/shopify/support?shop=${shop}`} aria-label="Support page">Support</a>
        {/* @ts-expect-error - Shopify App Bridge web component not in type definitions */}
      </ui-nav-menu>
    </nav>
  )
}
