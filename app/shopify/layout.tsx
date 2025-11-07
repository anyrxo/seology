/**
 * Shopify App Layout
 * Bypasses Clerk authentication for embedded Shopify apps
 * Uses Shopify session tokens instead
 */

import Script from "next/script";
import { ThemeProvider } from '@/components/theme/ThemeProvider'
// TODO: Replace sonner with compatible toast library
// import { Toaster } from 'sonner'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import "../globals.css";
import "../responsive.css";

export default function ShopifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/Inter-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Inter-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Load Dashflow X CSS files - ORDER MATTERS */}
        <link href="/dashflow/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/dashflow/webflow.css" rel="stylesheet" type="text/css" />
        <link href="/dashflow/dashflow.css" rel="stylesheet" type="text/css" />
        <link href="/dashflow/dashflow-utilities.css" rel="stylesheet" type="text/css" />

        {/* Load Radiant UI CSS - CRITICAL ORDER: normalize -> webflow -> custom */}
        <link href="/radiant/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/radiant/webflow.css" rel="stylesheet" type="text/css" />
        <link href="/radiant/radiant-ui.css" rel="stylesheet" type="text/css" />

        {/* Shopify App Bridge - MUST BE FIRST, LOADED BEFORE INTERACTIVE */}
        <Script
          src="https://cdn.shopify.com/shopifycloud/app-bridge.js"
          strategy="beforeInteractive"
        />

        {/* Webflow modernizr script - critical for layout */}
        <Script id="webflow-modernizr" strategy="beforeInteractive">
          {`!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`}
        </Script>

        {/* Font smoothing and performance CSS */}
        <style>{`
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          /* Prevent layout shift */
          html { font-size: 16px; }
          body { min-height: 100vh; }
          /* Optimize animations */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </head>
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            {children}
            {/* TODO: Re-add Toaster after replacing sonner with compatible library */}
            {/* <Toaster position="top-right" richColors /> */}
          </ThemeProvider>
        </ErrorBoundary>
        {/* Webflow interactions - load after interactive */}
        <Script src="/js/webflow.js" strategy="lazyOnload" />
        {/* Radiant UI webflow.js - CRITICAL for dropdowns and interactions */}
        <Script src="/radiant/webflow.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
