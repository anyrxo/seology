/**
 * Shopify GDPR: Shop Data Deletion
 *
 * Handles shop data deletion after 48 hours of app uninstall
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
    const topic = 'shop/redact';
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
    };

    console.log(`[GDPR] Shop redaction request for ${data.shop_domain}`);

    // Find all connections for this shop
    const connections = await db.connection.findMany({
      where: {
        domain: data.shop_domain,
        platform: 'SHOPIFY',
      },
    });

    for (const connection of connections) {
      // Delete all related data
      await db.$transaction(async (tx) => {
        // Delete chat messages
        const conversations = await tx.aIConversation.findMany({
          where: { userId: connection.userId },
        });

        for (const conv of conversations) {
          await tx.chatMessage.deleteMany({
            where: { conversationId: conv.id },
          });
        }

        await tx.aIConversation.deleteMany({
          where: { userId: connection.userId, connectionId: connection.id },
        });

        // Delete page-related data
        await tx.pageKeyword.deleteMany({
          where: { page: { connectionId: connection.id } },
        });

        await tx.pageImprovement.deleteMany({
          where: { page: { connectionId: connection.id } },
        });

        await tx.pageSnapshot.deleteMany({
          where: { page: { connectionId: connection.id } },
        });

        await tx.page.deleteMany({
          where: { connectionId: connection.id },
        });

        // Delete keyword data
        await tx.keywordRanking.deleteMany({
          where: { keyword: { connectionId: connection.id } },
        });

        await tx.keyword.deleteMany({
          where: { connectionId: connection.id },
        });

        // Delete issues and fixes
        await tx.fix.deleteMany({
          where: { connectionId: connection.id },
        });

        await tx.issue.deleteMany({
          where: { connectionId: connection.id },
        });

        // Delete insights and suggestions
        await tx.aIInsight.deleteMany({
          where: { connectionId: connection.id },
        });

        await tx.contentSuggestion.deleteMany({
          where: { connectionId: connection.id },
        });

        // Delete metrics and scores
        await tx.metric.deleteMany({
          where: { connectionId: connection.id },
        });

        await tx.siteHealthScore.deleteMany({
          where: { connectionId: connection.id },
        });

        // Delete crawls
        await tx.crawl.deleteMany({
          where: { connectionId: connection.id },
        });

        // Delete image assets
        await tx.imageAsset.deleteMany({
          where: { connectionId: connection.id },
        });

        // Delete jobs
        await tx.job.deleteMany({
          where: { connectionId: connection.id },
        });

        // Delete audit logs
        await tx.auditLog.deleteMany({
          where: { connectionId: connection.id },
        });

        // Finally, delete the connection
        await tx.connection.delete({
          where: { id: connection.id },
        });
      });

      console.log(`Deleted all data for connection ${connection.id}`);
    }

    console.log(`GDPR shop redaction completed for ${data.shop_domain}`);

    // Mark webhook as processed
    if (webhookId && data.shop_domain) {
      await markWebhookProcessed(webhookId, data.shop_domain, 'shop/redact', {
        processed: true,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Shop data deleted',
      connectionsDeleted: connections.length,
    });
  } catch (error) {
    console.error('GDPR shop redaction error:', error);

    // Mark webhook as failed if we have the ID
    if (webhookId && shopDomain) {
      await markWebhookProcessed(webhookId, shopDomain, 'shop/redact', {
        processed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    return NextResponse.json({ success: true }); // Still return 200
  }
}
