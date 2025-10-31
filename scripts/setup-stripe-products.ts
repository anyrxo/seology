/**
 * Script to create Stripe products and prices
 * Run with: npx ts-node scripts/setup-stripe-products.ts
 */

import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
})

async function setupStripeProducts() {
  console.log('🚀 Setting up Stripe products and prices...\n')

  try {
    // 1. Create Starter Product
    console.log('Creating Starter product...')
    const starterProduct = await stripe.products.create({
      name: 'Seology Starter',
      description: 'Perfect for small businesses getting started with SEO',
      metadata: {
        plan: 'STARTER',
        sites: '3',
        fixes: '50',
        aiAnalyses: '100',
      },
    })

    const starterPrice = await stripe.prices.create({
      product: starterProduct.id,
      unit_amount: 2900, // $29.00
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        plan: 'STARTER',
      },
    })

    console.log(`✅ Starter Product: ${starterProduct.id}`)
    console.log(`✅ Starter Price: ${starterPrice.id}\n`)

    // 2. Create Professional Product
    console.log('Creating Professional product...')
    const growthProduct = await stripe.products.create({
      name: 'Seology Professional',
      description: 'For growing businesses that need more power',
      metadata: {
        plan: 'GROWTH',
        sites: '10',
        fixes: '200',
        aiAnalyses: '500',
      },
    })

    const growthPrice = await stripe.prices.create({
      product: growthProduct.id,
      unit_amount: 9900, // $99.00
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        plan: 'GROWTH',
      },
    })

    console.log(`✅ Professional Product: ${growthProduct.id}`)
    console.log(`✅ Professional Price: ${growthPrice.id}\n`)

    // 3. Create Enterprise Product
    console.log('Creating Enterprise product...')
    const scaleProduct = await stripe.products.create({
      name: 'Seology Enterprise',
      description: 'For enterprises with complex needs',
      metadata: {
        plan: 'SCALE',
        sites: 'unlimited',
        fixes: '1000',
        aiAnalyses: 'unlimited',
      },
    })

    const scalePrice = await stripe.prices.create({
      product: scaleProduct.id,
      unit_amount: 29900, // $299.00
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        plan: 'SCALE',
      },
    })

    console.log(`✅ Enterprise Product: ${scaleProduct.id}`)
    console.log(`✅ Enterprise Price: ${scalePrice.id}\n`)

    // Print environment variables to add
    console.log('📝 Add these to your .env.local file:\n')
    console.log(`STRIPE_PRICE_STARTER=${starterPrice.id}`)
    console.log(`STRIPE_PRICE_GROWTH=${growthPrice.id}`)
    console.log(`STRIPE_PRICE_SCALE=${scalePrice.id}`)

    console.log('\n✅ Stripe products and prices created successfully!')
    console.log('\n📋 Next steps:')
    console.log('1. Copy the price IDs above to your .env.local file')
    console.log('2. Configure Stripe webhook endpoint')
    console.log('3. Test the billing flow')
  } catch (error) {
    console.error('❌ Error creating Stripe products:', error)
    throw error
  }
}

// Run the setup
setupStripeProducts()
  .then(() => {
    console.log('\n🎉 Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Setup failed:', error)
    process.exit(1)
  })
