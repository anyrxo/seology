/**
 * Shopify Billing Integration
 *
 * Handles Shopify App Billing (subscriptions and one-time charges)
 */

export interface ShopifyBillingPlan {
  name: string;
  price: number;
  currencyCode: 'USD' | 'EUR' | 'GBP';
  interval: 'EVERY_30_DAYS' | 'ANNUAL';
  trialDays?: number;
  features: string[];
}

export const SHOPIFY_BILLING_PLANS: Record<string, ShopifyBillingPlan> = {
  STARTER: {
    name: 'SEOLOGY Starter',
    price: 29.99,
    currencyCode: 'USD',
    interval: 'EVERY_30_DAYS',
    trialDays: 7,
    features: ['3 sites', '500 fixes/month', 'Basic AI chat'],
  },
  GROWTH: {
    name: 'SEOLOGY Growth',
    price: 99.99,
    currencyCode: 'USD',
    interval: 'EVERY_30_DAYS',
    trialDays: 7,
    features: ['10 sites', '5000 fixes/month', 'Advanced AI chat'],
  },
  SCALE: {
    name: 'SEOLOGY Scale',
    price: 299.99,
    currencyCode: 'USD',
    interval: 'EVERY_30_DAYS',
    trialDays: 7,
    features: ['Unlimited sites', 'Unlimited fixes', 'Priority support'],
  },
};

/**
 * Create Shopify subscription using GraphQL API
 */
export async function createShopifySubscription(
  shop: string,
  accessToken: string,
  planName: keyof typeof SHOPIFY_BILLING_PLANS,
  returnUrl: string,
  test: boolean = false
): Promise<{ success: boolean; confirmationUrl?: string; error?: string }> {
  const plan = SHOPIFY_BILLING_PLANS[planName];

  if (!plan) {
    return { success: false, error: 'Invalid plan' };
  }

  const mutation = `
    mutation CreateAppSubscription($name: String!, $returnUrl: URL!, $price: Decimal!, $currencyCode: CurrencyCode!, $interval: AppPricingInterval!, $trialDays: Int, $test: Boolean) {
      appSubscriptionCreate(
        name: $name
        returnUrl: $returnUrl
        test: $test
        lineItems: [
          {
            plan: {
              appRecurringPricingDetails: {
                price: { amount: $price, currencyCode: $currencyCode }
                interval: $interval
              }
            }
          }
        ]
        trialDays: $trialDays
      ) {
        appSubscription {
          id
          name
          status
          createdAt
        }
        confirmationUrl
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${shop}/admin/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            name: plan.name,
            returnUrl,
            price: plan.price.toString(),
            currencyCode: plan.currencyCode,
            interval: plan.interval,
            trialDays: plan.trialDays || 0,
            test,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      return {
        success: false,
        error: data.errors[0]?.message || 'GraphQL error',
      };
    }

    const result = data.data.appSubscriptionCreate;

    if (result.userErrors?.length > 0) {
      return {
        success: false,
        error: result.userErrors[0].message,
      };
    }

    return {
      success: true,
      confirmationUrl: result.confirmationUrl,
    };
  } catch (error) {
    console.error('Shopify subscription creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export interface ShopifySubscription {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  currentPeriodEnd?: string;
  trialDays?: number;
  test: boolean;
  lineItems: {
    plan: {
      pricingDetails: {
        price: {
          amount: string;
          currencyCode: string;
        };
        interval: string;
      };
    };
  }[];
}

/**
 * Get current active subscription
 */
export async function getCurrentSubscription(
  shop: string,
  accessToken: string
): Promise<{ success: boolean; subscription?: ShopifySubscription | null; error?: string }> {
  const query = `
    query {
      currentAppInstallation {
        activeSubscriptions {
          id
          name
          status
          createdAt
          currentPeriodEnd
          trialDays
          test
          lineItems {
            plan {
              pricingDetails {
                ... on AppRecurringPricing {
                  price {
                    amount
                    currencyCode
                  }
                  interval
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${shop}/admin/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
        body: JSON.stringify({ query }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      return {
        success: false,
        error: data.errors[0]?.message || 'GraphQL error',
      };
    }

    const subscriptions =
      data.data.currentAppInstallation?.activeSubscriptions || [];

    return {
      success: true,
      subscription: subscriptions[0] || null,
    };
  } catch (error) {
    console.error('Get subscription error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Cancel active subscription
 */
export async function cancelShopifySubscription(
  shop: string,
  accessToken: string,
  subscriptionId: string
): Promise<{ success: boolean; error?: string }> {
  const mutation = `
    mutation CancelSubscription($id: ID!) {
      appSubscriptionCancel(id: $id) {
        appSubscription {
          id
          status
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${shop}/admin/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
        body: JSON.stringify({
          query: mutation,
          variables: { id: subscriptionId },
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      return {
        success: false,
        error: data.errors[0]?.message || 'GraphQL error',
      };
    }

    const result = data.data.appSubscriptionCancel;

    if (result.userErrors?.length > 0) {
      return {
        success: false,
        error: result.userErrors[0].message,
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Cancel subscription error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Create one-time charge (for additional features/credits)
 */
export async function createOneTimeCharge(
  shop: string,
  accessToken: string,
  name: string,
  price: number,
  returnUrl: string,
  test: boolean = false
): Promise<{ success: boolean; confirmationUrl?: string; error?: string }> {
  const mutation = `
    mutation CreateOneTimeCharge($name: String!, $price: MoneyInput!, $returnUrl: URL!, $test: Boolean) {
      appPurchaseOneTimeCreate(
        name: $name
        price: $price
        returnUrl: $returnUrl
        test: $test
      ) {
        confirmationUrl
        appPurchaseOneTime {
          id
          name
          status
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${shop}/admin/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            name,
            price: { amount: price.toString(), currencyCode: 'USD' },
            returnUrl,
            test,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      return {
        success: false,
        error: data.errors[0]?.message || 'GraphQL error',
      };
    }

    const result = data.data.appPurchaseOneTimeCreate;

    if (result.userErrors?.length > 0) {
      return {
        success: false,
        error: result.userErrors[0].message,
      };
    }

    return {
      success: true,
      confirmationUrl: result.confirmationUrl,
    };
  } catch (error) {
    console.error('One-time charge creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
