# Shopify App Distribution & Launch

**Sources**:
- https://shopify.dev/docs/apps/distribution
- https://shopify.dev/docs/apps/launch

---

## Distribution Methods

Shopify offers three primary ways to distribute apps:

### Public Distribution
Public apps reach multiple stores and require Shopify approval. They must use either token exchange with session tokens (if embedded) or authorization code grants. Developers must comply with Shopify's data syncing requirements as outlined in their API terms.

### Custom Distribution
These apps install on single stores, multiple stores within Plus organizations, or transfer-disabled development stores. They avoid the approval process but cannot leverage the Billing API to charge merchants.

### Shopify Admin
Limited to single-store installation, this method doesn't support app extensions, App Bridge embedding, or merchant billing functionality.

## Key Requirements

Public apps demand the most compliance. The documentation states: "Must sync certain data with Shopify" and require successful passage through Shopify's app review checklist before launch.

Custom apps offer flexibility without approval but come with billing restrictions.

## Important Notes

- Distribution method selection is permanent—it cannot be changed afterward
- Checkout apps have specific design requirements regardless of distribution type
- Theme app extensions face content size limits, though exceptions can be requested through Shopify's form process
- Private and unpublished app types are deprecated; custom apps replaced private apps in 2023

---

## Launching Apps on Shopify

### Pre-Launch Preparation

The guide emphasizes a structured approach with several critical phases:

**Checklist Review**: "Check for quality and understand requirements" before submission.

**Pricing Strategy**: Developers should "Determine a strategy for how you charge merchants" before going live.

### Deployment Process

The platform advises that apps typically require dual deployment: "You'll likely deploy to your own hosting provider as well as Shopify."

### App Store Distribution

Once ready, developers must "Specify how you'll distribute your app, then submit your app for review."

### Post-Launch Support

A crucial ongoing responsibility exists where "App developers must be responsible stewards of their apps" through continued merchant support.

### Financial Incentives

Shopify offers favorable terms: **0% revenue share on the first $1,000,000 USD** in annual gross app revenue through their store.

### Competitive Advantages

The Built for Shopify certification provides apps "a significant competitive edge in the Shopify App Store."

The documentation emphasizes that successful launches involve upfront quality assurance, strategic pricing decisions, proper deployment planning, and sustained customer support practices.

---

## SEOLOGY.AI Distribution Strategy

### Current Status: Custom Distribution

We are currently using **Custom Distribution** which means:
- ✅ Can install on dev stores for testing
- ✅ Can install on client stores
- ✅ No app review required
- ❌ Cannot charge via Shopify Billing API
- ❌ Not in Shopify App Store
- ❌ No Built for Shopify badge

### Future Goal: Public Distribution

To grow SEOLOGY.AI, we MUST move to Public Distribution:

**Benefits**:
- Access to millions of Shopify merchants
- Shopify App Store listing
- Built-in billing system
- Trust from Shopify badge
- 0% revenue share on first $1M

**Requirements**:
1. ✅ GraphQL Admin API (we need to migrate from REST)
2. ✅ Session tokens for authentication (we need to implement)
3. ✅ GDPR webhooks (`customers/data_request`, `customers/redact`, `shop/redact`)
4. ✅ Privacy policy
5. ✅ Support contact
6. ✅ App review checklist compliance

### Pre-Launch Checklist

#### Technical Requirements
- [ ] Migrate to GraphQL API (currently using REST - MUST DO)
- [ ] Implement session tokens (currently using OAuth tokens)
- [ ] Add GDPR webhooks
- [ ] Add proper error handling
- [ ] Implement rate limit management
- [ ] Add loading states
- [ ] Replace toast library (sonner is broken)

#### Content Requirements
- [ ] Privacy policy page
- [ ] Support email/contact
- [ ] App listing description
- [ ] Screenshots (5-8 high quality)
- [ ] Demo video
- [ ] SEO-optimized title and description

#### Quality Requirements
- [ ] All tests passing
- [ ] No console errors
- [ ] Responsive design
- [ ] Accessibility compliance (WCAG)
- [ ] Performance optimized

#### Business Requirements
- [ ] Pricing strategy defined
- [ ] Billing integration tested
- [ ] Customer support plan
- [ ] Onboarding flow optimized
- [ ] Documentation complete

### Launch Timeline

**Phase 1: Private Beta** (Current - Next 2 months)
- Custom distribution only
- 5-10 beta merchants
- Collect feedback
- Fix bugs
- Improve UX

**Phase 2: Technical Prep** (Month 3-4)
- Migrate to GraphQL
- Implement session tokens
- Add GDPR webhooks
- Complete all technical requirements

**Phase 3: Content Prep** (Month 4-5)
- Create app listing
- Record demo video
- Take screenshots
- Write documentation
- Polish onboarding

**Phase 4: App Review Submission** (Month 5)
- Submit to Shopify App Store
- Wait for review (typically 2-4 weeks)
- Address any feedback
- Resubmit if needed

**Phase 5: Public Launch** (Month 6)
- App approved and live
- Marketing campaign
- Press outreach
- Community engagement

### Pricing Strategy

**Recommended Tiers**:

**Starter**: $29/month
- 3 sites
- 500 fixes/month
- Email support

**Growth**: $99/month
- 10 sites
- 5000 fixes/month
- Priority support
- Advanced analytics

**Scale**: $299/month
- Unlimited sites
- Unlimited fixes
- Dedicated support
- White-label option

**All plans include**:
- 14-day free trial
- No credit card required
- Cancel anytime

### Shopify Billing API Integration

Once we're approved for Public Distribution:

```typescript
// app/api/billing/create-subscription/route.ts
import { shopifyGraphQL } from '@/lib/shopify-graphql'

const mutation = `
  mutation appSubscriptionCreate($name: String!, $returnUrl: URL!, $lineItems: [AppSubscriptionLineItemInput!]!) {
    appSubscriptionCreate(
      name: $name
      returnUrl: $returnUrl
      lineItems: $lineItems
    ) {
      appSubscription {
        id
      }
      confirmationUrl
      userErrors {
        field
        message
      }
    }
  }
`

const variables = {
  name: 'SEOLOGY.AI - Growth Plan',
  returnUrl: 'https://seology.ai/shopify/billing/confirm',
  lineItems: [{
    plan: {
      appRecurringPricingDetails: {
        price: { amount: 99, currencyCode: 'USD' },
        interval: 'EVERY_30_DAYS'
      }
    }
  }]
}

const data = await shopifyGraphQL(shop, accessToken, mutation, variables)

// Redirect merchant to confirmationUrl to approve subscription
return Response.redirect(data.appSubscriptionCreate.confirmationUrl)
```

### Built for Shopify Certification

**What it is**: Shopify's quality badge for top-tier apps

**Benefits**:
- Featured placement in App Store
- Higher conversion rates
- Merchant trust
- Marketing support from Shopify

**Requirements**:
- Exceptional user experience
- Fast performance
- High merchant satisfaction
- Low uninstall rate
- Responsive support
- Regular updates

**Timeline**: Apply after 6 months of public availability with strong metrics

### Post-Launch Responsibilities

1. **Support**: Respond to merchant inquiries within 24 hours
2. **Updates**: Monthly feature releases and bug fixes
3. **Monitoring**: Track errors, performance, and usage
4. **Compliance**: Stay updated with Shopify policy changes
5. **Growth**: Continuously improve based on feedback

### Key Takeaways

1. **Custom Distribution is temporary** - we need Public Distribution to scale
2. **GraphQL migration is CRITICAL** - required for public apps
3. **Launch is a process** - takes 6+ months of preparation
4. **Quality matters** - Shopify reviews are thorough
5. **Support is ongoing** - not a "set it and forget it" product

### Next Steps

1. ✅ Complete core features
2. ✅ Migrate to GraphQL
3. ✅ Implement session tokens
4. ✅ Add GDPR webhooks
5. ✅ Run private beta
6. ✅ Submit for review
7. ✅ Launch publicly
