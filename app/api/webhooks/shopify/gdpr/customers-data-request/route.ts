/**
 * Shopify GDPR: Customer Data Request
 *
 * Handles customer data requests from Shopify
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
    const topic = 'customers/data_request';
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

    console.log(`[GDPR] Customer data request for ${data.customer.email} from ${data.shop_domain}`);

    // Find connection
    const connection = await db.connection.findFirst({
      where: {
        domain: data.shop_domain,
        platform: 'SHOPIFY',
      },
    });

    const customerData = {
      message: 'SEOLOGY does not store any customer personal data.',
      details: 'We only store SEO-related data (page URLs, meta tags, issue descriptions, and fixes). No customer names, emails, addresses, or purchase history is collected or stored.',
      dataStored: {
        connection: connection ? {
          shopDomain: connection.domain,
          connectedAt: connection.createdAt,
          status: connection.status,
        } : null,
        customerSpecificData: 'None - we do not track individual customers',
      },
    };

    if (connection && connection.userId) {
      // Log the request
      await db.auditLog.create({
        data: {
          userId: connection.userId,
          connectionId: connection.id,
          action: 'GDPR_CUSTOMER_DATA_REQUEST',
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

    console.log(`GDPR customer data request logged for ${data.customer.email}`);

    // Mark webhook as processed
    if (webhookId) {
      await markWebhookProcessed(webhookId, data.shop_domain, 'customers/data_request', {
        processed: true,
      });
    }

    // Return the (empty) data we have
    return NextResponse.json({
      success: true,
      data: customerData,
    });
  } catch (error) {
    console.error('GDPR customer data request error:', error);

    // Mark webhook as failed if we have the ID
    if (webhookId && shopDomain) {
      await markWebhookProcessed(webhookId, shopDomain, 'customers/data_request', {
        processed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        message: 'No customer data stored',
      },
    });
  }
}
