/**
 * Shopify App Bridge Provider
 *
 * Placeholder for Shopify embedded app support
 */

'use client';

import { ReactNode, useEffect } from 'react';

interface ShopifyAppProviderProps {
  children: ReactNode;
}

export function ShopifyAppProvider({ children }: ShopifyAppProviderProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const host = urlParams.get('host');
      const shop = urlParams.get('shop');

      if (host && shop) {
        console.log('[Shopify] Embedded mode detected:', { shop, host });
      }
    }
  }, []);

  return <>{children}</>;
}
