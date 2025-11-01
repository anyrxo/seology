import { Navbar } from '@/components/marketing/Navbar'

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$297',
      period: '/month',
      description: 'Perfect for small businesses getting started with SEO automation',
      features: [
        '3 connected sites',
        '500 fixes per month',
        'Shopify & WordPress support',
        'Approve mode only',
        'Email support',
        '90-day rollback protection',
      ],
      cta: 'Get Started',
      highlight: false,
    },
    {
      name: 'Growth',
      price: '$997',
      period: '/month',
      description: 'For growing businesses that need more power and flexibility',
      features: [
        '10 connected sites',
        '5,000 fixes per month',
        'All platforms supported',
        'All execution modes',
        'Priority support',
        'API access',
        '90-day rollback protection',
        'Advanced analytics',
      ],
      cta: 'Start Free Trial',
      highlight: true,
    },
    {
      name: 'Scale',
      price: '$2,497',
      period: '/month',
      description: 'Enterprise-grade automation for agencies and large organizations',
      features: [
        'Unlimited sites',
        'Unlimited fixes',
        'All platforms supported',
        'All execution modes',
        'Dedicated support',
        'API access',
        '90-day rollback protection',
        'White label option',
        'Custom integrations',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      highlight: false,
    },
  ]

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="main-wrapper">
        {/* Hero Section */}
        <section className="padding-global" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <div className="container-large">
            <div className="text-align-center">
              <h1 className="header-title">Simple, Transparent Pricing</h1>
              <div className="spacer-medium"></div>
              <p className="text-size-large text-color-grey max-width-large align-center">
                Choose the plan that fits your needs. All plans include Claude AI-powered analysis and automatic SEO fixes.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="padding-global" style={{ paddingBottom: '80px' }}>
          <div className="container-large">
            <div className="w-layout-grid" style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              alignItems: 'start'
            }}>
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="card"
                  style={{
                    background: plan.highlight
                      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    padding: '40px',
                    border: plan.highlight
                      ? '2px solid #667eea'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    transform: plan.highlight ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {plan.highlight && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      padding: '6px 20px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
                      {plan.name}
                    </h3>
                    <p className="text-color-grey text-size-small" style={{ marginBottom: '24px' }}>
                      {plan.description}
                    </p>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ fontSize: '48px', fontWeight: '700' }}>{plan.price}</span>
                      <span className="text-color-grey">{plan.period}</span>
                    </div>
                  </div>

                  <a
                    href="#waitlist"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '16px 24px',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      textDecoration: 'none',
                      marginBottom: '32px',
                      background: plan.highlight
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      border: plan.highlight ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    {plan.cta}
                  </a>

                  <div>
                    <div style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      What's included:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {plan.features.map((feature) => (
                        <li key={feature} style={{
                          marginBottom: '12px',
                          paddingLeft: '24px',
                          position: 'relative',
                          fontSize: '14px',
                          color: '#b0b0b0'
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            color: '#667eea'
                          }}>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="padding-global" style={{ paddingBottom: '80px' }}>
          <div className="container-large">
            <div className="max-width-medium align-center">
              <h2 className="text-size-huge text-align-center" style={{ marginBottom: '48px' }}>
                Frequently Asked Questions
              </h2>

              <div style={{ textAlign: 'left' }}>
                {[
                  {
                    q: 'What counts as a "fix"?',
                    a: 'A fix is any SEO change we make to your site, such as updating meta descriptions, fixing broken links, adding alt text to images, or implementing structured data.'
                  },
                  {
                    q: 'Can I change plans later?',
                    a: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
                  },
                  {
                    q: 'What if something breaks?',
                    a: 'Every fix we make is reversible for 90 days. If you notice any issues, you can roll back changes with one click.'
                  },
                  {
                    q: 'Do you offer refunds?',
                    a: 'Yes, we offer a 30-day money-back guarantee. If you're not satisfied with SEOLOGY.AI, we'll refund your first month.'
                  }
                ].map((faq, i) => (
                  <div key={i} style={{
                    marginBottom: '32px',
                    paddingBottom: '32px',
                    borderBottom: i < 3 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                  }}>
                    <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{faq.q}</h3>
                    <p className="text-color-grey">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="waitlist" className="padding-global" style={{ paddingTop: '80px', paddingBottom: '80px', background: 'rgba(102, 126, 234, 0.05)' }}>
          <div className="container-large">
            <div className="max-width-medium align-center">
              <h2 className="text-size-huge text-align-center">Start Your Free Trial</h2>
              <div className="spacer-medium"></div>
              <p className="text-size-regular text-align-center text-color-grey">
                No credit card required. 14-day free trial on any plan.
              </p>
              <div className="spacer-large"></div>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '16px'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '16px 32px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Start Free Trial
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
