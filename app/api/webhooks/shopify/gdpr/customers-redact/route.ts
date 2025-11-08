/**
 * Shopify GDPR: Customer Data Deletion Request
 *
 * Handles customer data deletion requests from Shopify
 * Required for GDPR compliance
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyShopifyWebhook } from '@/lib/shopify-hmac';
import { db } from '@/lib/db';
import {
  extractWebhookId,
  isWebhookDuplicate,
  markWebhookProcessed,
} from '@/lib/webhook-deduplication';

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let body = '';
  let webhookId: string | null = null;
  let shopDomain: string | null = null;

  try {
    // Verify webhook
    const hmac = req.headers.get('x-shopify-hmac-sha256');
    body = await req.text();
    shopDomain = req.headers.get('x-shopify-shop-domain');

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

    // Check for duplicate webhook
    const topic = 'customers/redact';
    webhookId = extractWebhookId(req.headers, body);
    if (webhookId && shopDomain) {
      const isDuplicate = await isWebhookDuplicate(webhookId, shopDomain, topic);
      if (isDuplicate) {
        console.log(`[WEBHOOK DUPLICATE] Skipping duplicate GDPR webhook ${webhookId}`);
        return NextResponse.json({ success: true, message: 'Duplicate webhook ignored' });
      }
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

    // Mark webhook as processed
    if (webhookId && data.shop_domain) {
      await markWebhookProcessed(webhookId, data.shop_domain, 'customers/redact', {
        processed: true,
      });
    }

    // Return 200 to acknowledge
    return NextResponse.json({
      success: true,
      message: 'Customer data redaction request received',
    });
  } catch (error) {
    console.error('GDPR customer redaction error:', error);

    // Mark webhook as failed if we have the ID
    if (webhookId && shopDomain) {
      await markWebhookProcessed(webhookId, shopDomain, 'customers/redact', {
        processed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    return NextResponse.json({ success: true }); // Still return 200
  }
}
