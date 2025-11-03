import type { Metadata } from "next";
import Script from "next/script";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

export const metadata: Metadata = {
  title: "SEOLOGY.AI - AI-Powered SEO Automation That Actually Fixes Issues",
  description: "The first SEO tool that doesn't just report problems—it fixes them. Connect your CMS and let Claude AI automatically optimize your SEO.",
  metadataBase: new URL('https://seology.ai'),
  openGraph: {
    title: "SEOLOGY.AI - AI-Powered SEO Automation",
    description: "The first SEO tool that actually fixes issues automatically using Claude AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEOLOGY.AI - AI-Powered SEO Automation",
    description: "The first SEO tool that actually fixes issues automatically using Claude AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
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

          {/* Preload critical CSS - use media print trick to load async */}
          <link
            rel="preload"
            href="/css/normalize.css"
            as="style"
            onLoad={(e) => {
              const target = e.target as HTMLLinkElement;
              target.onload = null;
              target.rel = 'stylesheet';
            }}
          />
          <noscript>
            <link href="/css/normalize.css" rel="stylesheet" type="text/css" />
          </noscript>

          {/* Load Webflow CSS */}
          <link href="/css/webflow.css" rel="stylesheet" type="text/css" />
          <link href="/css/anyros-fantabulous-site.webflow.css" rel="stylesheet" type="text/css" />
          <link href="/css/anyros-wondrous-site.webflow.css" rel="stylesheet" type="text/css" />

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
          {children}
          {/* Webflow interactions - load after interactive */}
          <Script src="/js/webflow.js" strategy="lazyOnload" />
        </body>
      </html>
    </ClerkProvider>
  );
}
