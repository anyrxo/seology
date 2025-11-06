/**
 * Shopify Webhooks Handler
 *
 * Handles incoming webhooks from Shopify
 * - app/uninstalled: Clean up when app is uninstalled
 * - shop/update: Update shop information
 * - products/update: Trigger re-scan when products change
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyShopifyWebhook } from '@/lib/shopify-hmac';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    // Get webhook HMAC and topic
    const hmac = req.headers.get('x-shopify-hmac-sha256');
    const topic = req.headers.get('x-shopify-topic');
    const shop = req.headers.get('x-shopify-shop-domain');

    if (!hmac || !topic || !shop) {
      return NextResponse.json(
        { error: 'Missing required headers' },
        { status: 401 }
      );
    }

    // Get raw body for HMAC verification
    const body = await req.text();

    // Verify webhook authenticity
    const secret = process.env.SHOPIFY_CLIENT_SECRET;
    if (!secret) {
      console.error('SHOPIFY_CLIENT_SECRET not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const isValid = verifyShopifyWebhook(body, hmac, secret);
    if (!isValid) {
      console.error('Invalid webhook HMAC signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Parse webhook data
    const data = JSON.parse(body);

    console.log(`[Shopify Webhook] ${topic} from ${shop}`);

    // Handle different webhook topics
    switch (topic) {
      case 'app/uninstalled':
        await handleAppUninstall(shop, data);
        break;

      case 'shop/update':
        await handleShopUpdate(shop, data);
        break;

      case 'products/update':
        await handleProductUpdate(shop, data);
        break;

      case 'products/create':
        await handleProductCreate(shop, data);
        break;

      case 'products/delete':
        await handleProductDelete(shop, data);
        break;

      case 'app_subscriptions/update':
        await handleSubscriptionUpdate(shop, data);
        break;

      default:
        console.log(`Unhandled webhook topic: ${topic}`);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    // Still return 200 to prevent Shopify from retrying
    return NextResponse.json({ success: true });
  }
}

/**
 * Handle app uninstall webhook
 */
async function handleAppUninstall(
  shop: string,
  data: { id: number; domain: string }
) {
  console.log(`[App Uninstalled] ${shop}`);

  try {
    // Find the connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
      },
    });

    if (connection) {
      // Mark as disconnected
      await db.connection.update({
        where: { id: connection.id },
        data: {
          status: 'DISCONNECTED',
          accessToken: null, // Clear token
          refreshToken: null,
        },
      });

      // Cancel any pending jobs
      await db.job.updateMany({
        where: {
          connectionId: connection.id,
          status: { in: ['PENDING', 'RUNNING'] },
        },
        data: {
          status: 'CANCELLED',
        },
      });

      // Create audit log
      if (connection.userId) {
        await db.auditLog.create({
          data: {
            userId: connection.userId,
            connectionId: connection.id,
            action: 'APP_UNINSTALLED',
            resource: 'connection',
            resourceId: connection.id,
            details: JSON.stringify({ shop, data }),
          },
        });

        // Send notification to user
        await db.notification.create({
          data: {
            userId: connection.userId,
            type: 'WARNING',
            title: 'Shopify App Uninstalled',
            message: `SEOLOGY has been uninstalled from ${connection.displayName || shop}`,
          },
        });
      }

      console.log(`Connection ${connection.id} marked as disconnected`);
    }
  } catch (error) {
    console.error('Error handling app uninstall:', error);
  }
}

/**
 * Handle shop update webhook
 */
async function handleShopUpdate(
  shop: string,
  data: {
    id: number;
    name: string;
    email: string;
    domain: string;
    province?: string;
    country?: string;
    currency?: string;
    timezone?: string;
  }
) {
  console.log(`[Shop Updated] ${shop}`);

  try {
    // Find and update connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
      },
    });

    if (connection) {
      await db.connection.update({
        where: { id: connection.id },
        data: {
          displayName: data.name,
          credentials: JSON.stringify({
            email: data.email,
            currency: data.currency,
            timezone: data.timezone,
            country: data.country,
          }),
          updatedAt: new Date(),
        },
      });

      console.log(`Connection ${connection.id} updated`);
    }
  } catch (error) {
    console.error('Error handling shop update:', error);
  }
}

/**
 * Handle product update webhook - trigger re-scan
 */
async function handleProductUpdate(
  shop: string,
  data: { id: number; title: string; handle: string }
) {
  console.log(`[Product Updated] ${shop} - ${data.title}`);

  try {
    // Find connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
    });

    if (connection) {
      // Create a job to scan this specific product page
      await db.job.create({
        data: {
          type: 'CRAWL_SITE',
          status: 'PENDING',
          priority: 7, // Lower priority for product updates
          payload: JSON.stringify({
            connectionId: connection.id,
            url: `https://${shop}/products/${data.handle}`,
            reason: 'product_update',
          }),
          connectionId: connection.id,
          userId: connection.userId,
        },
      });

      console.log(`Crawl job created for product ${data.handle}`);
    }
  } catch (error) {
    console.error('Error handling product update:', error);
  }
}

/**
 * Handle product create webhook
 */
async function handleProductCreate(
  shop: string,
  data: { id: number; title: string; handle: string }
) {
  console.log(`[Product Created] ${shop} - ${data.title}`);

  // Same as update - trigger scan
  await handleProductUpdate(shop, data);
}

/**
 * Handle product delete webhook
 */
async function handleProductDelete(
  shop: string,
  data: { id: number; title: string; handle: string }
) {
  console.log(`[Product Deleted] ${shop} - ${data.title}`);

  try {
    // Find connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
      },
    });

    if (connection) {
      const productUrl = `https://${shop}/products/${data.handle}`;

      // Mark any issues for this product page as ignored
      await db.issue.updateMany({
        where: {
          connectionId: connection.id,
          pageUrl: productUrl,
        },
        data: {
          status: 'IGNORED',
        },
      });

      // Delete the page record if exists
      await db.page.deleteMany({
        where: {
          connectionId: connection.id,
          url: productUrl,
        },
      });

      console.log(`Cleaned up deleted product ${data.handle}`);
    }
  } catch (error) {
    console.error('Error handling product delete:', error);
  }
}

/**
 * Handle subscription update webhook
 */
async function handleSubscriptionUpdate(
  shop: string,
  data: {
    app_subscription: {
      id: string;
      name: string;
      status: string;
      created_at: string;
      trial_ends_on?: string;
    };
  }
) {
  console.log(`[Subscription Updated] ${shop} - ${data.app_subscription.status}`);

  try {
    // Find connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
      },
      include: { user: true },
    });

    if (connection && connection.user) {
      const subscriptionData = data.app_subscription;

      // Update user plan based on subscription status
      if (subscriptionData.status === 'ACTIVE') {
        // Determine plan from subscription name
        let plan: 'STARTER' | 'GROWTH' | 'SCALE' = 'STARTER';
        if (subscriptionData.name.includes('Growth')) {
          plan = 'GROWTH';
        } else if (subscriptionData.name.includes('Scale')) {
          plan = 'SCALE';
        }

        await db.user.update({
          where: { id: connection.userId },
          data: { plan },
        });

        console.log(`User ${connection.userId} updated to ${plan} plan`);
      } else if (subscriptionData.status === 'CANCELLED' || subscriptionData.status === 'EXPIRED') {
        // Downgrade to STARTER
        await db.user.update({
          where: { id: connection.userId },
          data: { plan: 'STARTER' },
        });

        console.log(`User ${connection.userId} downgraded to STARTER`);
      }
    }
  } catch (error) {
    console.error('Error handling subscription update:', error);
  }
}
