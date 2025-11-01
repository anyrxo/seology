import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEOLOGY.AI - AI-Powered SEO Automation That Actually Fixes Issues",
  description: "The first SEO tool that doesn't just report problems—it fixes them. Connect your CMS and let Claude AI automatically optimize your SEO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="/css/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/css/webflow.css" rel="stylesheet" type="text/css" />
        <link href="/css/anyros-fresh-site.webflow.css" rel="stylesheet" type="text/css" />
        <link href="/css/anyros-wondrous-site.webflow.css" rel="stylesheet" type="text/css" />
        {/* Webflow modernizr script */}
        <Script id="webflow-modernizr" strategy="beforeInteractive">
          {`!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`}
        </Script>
        {/* Font smoothing */}
        <style>{`* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }`}</style>
      </head>
      <body>
        {children}
        {/* Webflow interactions */}
        <Script src="/js/webflow.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
