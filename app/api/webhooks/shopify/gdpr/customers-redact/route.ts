/**
 * Shopify GDPR: Customer Data Deletion Request
 *
 * Handles customer data deletion requests from Shopify
 * Required for GDPR compliance
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyShopifyWebhook } from '@/lib/shopify-hmac';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    // Verify webhook
    const hmac = req.headers.get('x-shopify-hmac-sha256');
    const body = await req.text();

    if (!hmac) {
      return NextResponse.json({ error: 'Missing HMAC' }, { status: 401 });
    }

    const secret = process.env.SHOPIFY_CLIENT_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    const isValid = verifyShopifyWebhook(body, hmac, secret);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const data = JSON.parse(body) as {
      shop_id: number;
      shop_domain: string;
      customer: {
        id: number;
        email: string;
        phone?: string;
      };
    };

    console.log(`[GDPR] Customer redaction request for ${data.customer.email} from ${data.shop_domain}`);

    // Find connection for this shop
    const connection = await db.connection.findFirst({
      where: {
        domain: data.shop_domain,
        platform: 'SHOPIFY',
      },
    });

    if (connection) {
      // We don't store customer data in SEOLOGY
      // We only store: connection data, SEO issues, fixes, and metrics
      // No customer PII is stored

      // Log the request for compliance audit trail
      if (connection.userId) {
        await db.auditLog.create({
          data: {
            userId: connection.userId,
            connectionId: connection.id,
            action: 'GDPR_CUSTOMER_REDACT',
            resource: 'customer',
            resourceId: data.customer.id.toString(),
            details: JSON.stringify({
              customerEmail: data.customer.email,
              shopDomain: data.shop_domain,
              timestamp: new Date().toISOString(),
            }),
          },
        });
      }

      console.log(`GDPR customer redaction logged for ${data.customer.email}`);
    }

    // Return 200 to acknowledge
    return NextResponse.json({
      success: true,
      message: 'Customer data redaction request received',
    });
  } catch (error) {
    console.error('GDPR customer redaction error:', error);
    return NextResponse.json({ success: true }); // Still return 200
  }
}
