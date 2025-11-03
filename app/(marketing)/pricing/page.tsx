'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import {
  Check,
  X,
  ArrowRight,
  Shield,
  CreditCard,
  Clock,
  HelpCircle,
  Users,
  Lock,
  Sparkles,
} from 'lucide-react'
import CTASection from '@/components/marketing/CTASection'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    'monthly'
  )

  const plans = [
    {
      name: 'STARTER',
      description: 'Perfect for Small Businesses',
      monthlyPrice: 29,
      annualPrice: 24,
      features: [
        { name: 'Up to 3 sites', included: true },
        { name: '500 SEO fixes per month', included: true },
        { name: 'Shopify & WordPress integration', included: true },
        { name: 'Claude AI analysis', included: true },
        { name: 'Email support', included: true },
        { name: '90-day rollback', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Priority support', included: false },
        { name: 'API access', included: false },
        { name: 'Custom integrations', included: false },
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'GROWTH',
      description: 'For Growing Companies',
      monthlyPrice: 99,
      annualPrice: 82,
      features: [
        { name: 'Up to 10 sites', included: true },
        { name: '5,000 SEO fixes per month', included: true },
        { name: 'All Starter features', included: true },
        { name: 'Priority email & chat support', included: true },
        { name: 'Advanced analytics & reporting', included: true },
        { name: 'Custom fix rules', included: true },
        { name: 'Full API access', included: true },
        { name: 'Team collaboration (5 users)', included: true },
        { name: 'A/B testing', included: true },
        { name: 'Scheduled fixes', included: true },
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'SCALE',
      description: 'For Enterprise Teams',
      monthlyPrice: 299,
      annualPrice: 249,
      features: [
        { name: 'Unlimited sites', included: true },
        { name: 'Unlimited SEO fixes', included: true },
        { name: 'All Growth features', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'White-label options', included: true },
        { name: '99.9% SLA guarantee', included: true },
        { name: 'Custom CMS integrations', included: true },
        { name: 'Phone & Slack support', included: true },
        { name: 'Unlimited team members', included: true },
        { name: 'Custom contract terms', included: true },
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
  }

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyCost = plan.monthlyPrice * 12
    const annualCost = plan.annualPrice * 12
    const savings = monthlyCost - annualCost
    return savings
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Radiant UI Component Section */}
      <section className="rt-component-section">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="w-layout-vflex" style={{ alignItems: 'center' }}>
            {/* Badge */}
            <div className="w-layout-hflex rt-text-icon-wrap rt-icon-gap" style={{
              backgroundColor: '#f4f4f4',
              borderRadius: '20px',
              padding: '8px 20px',
              marginBottom: '30px'
            }}>
              <Sparkles className="w-4 h-4" style={{ color: '#3898ec' }} />
              <div className="rt-button-font" style={{ textTransform: 'none', fontSize: '14px' }}>
                14-day free trial • No credit card required
              </div>
            </div>

            {/* Heading */}
            <div style={{ textAlign: 'center', maxWidth: '900px' }}>
              <h1 className="rt-component-heading-two" style={{
                fontSize: '60px',
                lineHeight: '70px',
                marginBottom: '20px',
                fontWeight: 600
              }}>
                Simple, Transparent Pricing.
                <br />
                <span style={{ color: 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)' }}>
                  No Hidden Fees.
                </span>
              </h1>

              <p style={{
                color: 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)',
                fontSize: '18px',
                lineHeight: '30px',
                marginBottom: '40px',
                maxWidth: '700px',
                margin: '0 auto 40px'
              }}>
                Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime. All plans include AI-powered SEO fixes, secure integrations, and 90-day rollback protection.
              </p>

              {/* Billing Toggle - Radiant UI Style */}
              <div className="w-layout-hflex" style={{
                justifyContent: 'center',
                gap: '10px',
                backgroundColor: '#f4f4f4',
                padding: '8px',
                borderRadius: '10px',
                display: 'inline-flex'
              }}>
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`rt-button-font ${billingCycle === 'monthly' ? 'rt-active-toggle' : ''}`}
                  style={{
                    padding: '12px 30px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: billingCycle === 'monthly' ? '#3898ec' : 'transparent',
                    color: billingCycle === 'monthly' ? 'white' : 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)',
                    transition: 'all 0.3s ease',
                    textTransform: 'none',
                    fontSize: '16px'
                  }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`rt-button-font ${billingCycle === 'annual' ? 'rt-active-toggle' : ''}`}
                  style={{
                    padding: '12px 30px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: billingCycle === 'annual' ? '#3898ec' : 'transparent',
                    color: billingCycle === 'annual' ? 'white' : 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    textTransform: 'none',
                    fontSize: '16px'
                  }}
                >
                  Annual
                  <span style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    backgroundColor: '#3898ec',
                    color: 'white',
                    fontSize: '10px',
                    padding: '4px 8px',
                    borderRadius: '10px',
                    fontWeight: 600
                  }}>
                    Save 17%
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards - Radiant UI Grid */}
      <section className="rt-component-section" style={{ paddingTop: '40px' }}>
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="w-layout-hflex" style={{
            gap: '30px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="w-layout-vflex"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '40px 30px',
                  border: plan.popular ? '2px solid #3898ec' : '1px solid #e5e5e5',
                  boxShadow: plan.popular ? '0 4px 30px rgba(56, 152, 236, 0.2)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
                  position: 'relative',
                  flex: '1',
                  minWidth: '320px',
                  maxWidth: '380px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = plan.popular
                    ? '0 8px 40px rgba(56, 152, 236, 0.3)'
                    : '0 8px 30px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = plan.popular
                    ? '0 4px 30px rgba(56, 152, 236, 0.2)'
                    : '0 2px 10px rgba(0, 0, 0, 0.05)'
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#3898ec',
                    color: 'white',
                    padding: '6px 20px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.5px'
                  }}>
                    MOST POPULAR
                  </div>
                )}

                <div style={{ marginBottom: '30px' }}>
                  <div className="rt-button-font" style={{
                    color: 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)',
                    marginBottom: '10px',
                    fontSize: '14px',
                    letterSpacing: '1px'
                  }}>
                    {plan.name}
                  </div>
                  <div className="w-layout-hflex" style={{ alignItems: 'baseline', marginBottom: '10px' }}>
                    <span style={{
                      fontSize: '48px',
                      fontWeight: 600,
                      color: 'var(--radiant-ui-components-library-marketplace--color--heading-dark)'
                    }}>
                      ${getPrice(plan)}
                    </span>
                    <span style={{
                      fontSize: '18px',
                      marginLeft: '8px',
                      color: 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)'
                    }}>
                      /month
                    </span>
                  </div>
                  {billingCycle === 'annual' && (
                    <div style={{
                      color: '#22c55e',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '10px'
                    }}>
                      Save ${getSavings(plan)}/year
                    </div>
                  )}
                  <div style={{
                    color: 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)',
                    fontSize: '16px',
                    lineHeight: '26px'
                  }}>
                    {plan.description}
                  </div>
                </div>

                <Link
                  href="/sign-up"
                  className="w-inline-block"
                  style={{
                    backgroundColor: plan.popular ? '#3898ec' : '#f4f4f4',
                    color: plan.popular ? 'white' : 'var(--radiant-ui-components-library-marketplace--color--heading-dark)',
                    padding: '16px 32px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    marginBottom: '30px',
                    transition: 'all 0.3s ease',
                    display: 'block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = plan.popular ? '#2a7bc4' : '#e5e5e5'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = plan.popular ? '#3898ec' : '#f4f4f4'
                  }}
                >
                  <div className="rt-button-font" style={{ textTransform: 'none' }}>
                    {plan.cta}
                  </div>
                </Link>

                <div className="w-layout-vflex" style={{ gap: '15px' }}>
                  {plan.features.map((feature, i) => (
                    <div
                      key={i}
                      className="w-layout-hflex rt-text-icon-wrap"
                      style={{ gap: '12px', alignItems: 'flex-start' }}
                    >
                      {feature.included ? (
                        <Check
                          className="w-5 h-5"
                          style={{
                            color: '#22c55e',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}
                        />
                      ) : (
                        <X
                          className="w-5 h-5"
                          style={{
                            color: '#d5d5d5',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}
                        />
                      )}
                      <span style={{
                        fontSize: '15px',
                        lineHeight: '24px',
                        color: feature.included
                          ? 'var(--radiant-ui-components-library-marketplace--color--heading-dark)'
                          : 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)',
                        opacity: feature.included ? 1 : 0.6
                      }}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table - Radiant UI Section */}
      <section className="rt-component-section" style={{
        backgroundColor: '#fafafa',
        borderTop: '1px solid #e5e5e5'
      }}>
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="rt-component-heading-two" style={{ marginBottom: '15px' }}>
              Compare All Features
            </h2>
            <p style={{
              color: 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)',
              fontSize: '18px'
            }}>
              See exactly what is included in each plan
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '30px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            overflowX: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e5e5' }}>
                  <th className="rt-button-font" style={{
                    padding: '20px',
                    textAlign: 'left',
                    fontSize: '14px',
                    color: 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)'
                  }}>
                    FEATURE
                  </th>
                  <th className="rt-button-font" style={{
                    padding: '20px',
                    textAlign: 'center',
                    fontSize: '14px',
                    color: 'var(--radiant-ui-components-library-marketplace--color--heading-dark)'
                  }}>
                    STARTER
                  </th>
                  <th className="rt-button-font" style={{
                    padding: '20px',
                    textAlign: 'center',
                    fontSize: '14px',
                    color: 'var(--radiant-ui-components-library-marketplace--color--heading-dark)'
                  }}>
                    GROWTH
                  </th>
                  <th className="rt-button-font" style={{
                    padding: '20px',
                    textAlign: 'center',
                    fontSize: '14px',
                    color: 'var(--radiant-ui-components-library-marketplace--color--heading-dark)'
                  }}>
                    SCALE
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Sites', values: ['3', '10', 'Unlimited'] },
                  { feature: 'SEO Fixes/Month', values: ['500', '5,000', 'Unlimited'] },
                  { feature: 'Claude AI Analysis', values: [true, true, true] },
                  { feature: 'Platform Integrations', values: [true, true, true] },
                  { feature: '90-Day Rollback', values: [true, true, true] },
                  { feature: 'Support', values: ['Email', 'Email & Chat', 'Phone & Slack'] },
                  { feature: 'Analytics', values: ['Basic', 'Advanced', 'Advanced'] },
                  { feature: 'API Access', values: [false, true, true] },
                  { feature: 'Team Members', values: ['1', '5', 'Unlimited'] },
                  { feature: 'Custom Integrations', values: [false, false, true] },
                  { feature: 'White-Label', values: [false, false, true] },
                  { feature: 'SLA Guarantee', values: [false, false, true] },
                ].map((row, index) => (
                  <tr
                    key={index}
                    style={{ borderBottom: '1px solid #f4f4f4' }}
                  >
                    <td style={{
                      padding: '18px 20px',
                      fontSize: '15px',
                      color: 'var(--radiant-ui-components-library-marketplace--color--heading-dark)'
                    }}>
                      {row.feature}
                    </td>
                    {row.values.map((value, i) => (
                      <td key={i} style={{ padding: '18px 20px', textAlign: 'center' }}>
                        {typeof value === 'boolean' ? (
                          value ? (
                            <Check className="w-5 h-5" style={{
                              color: '#22c55e',
                              margin: '0 auto',
                              display: 'block'
                            }} />
                          ) : (
                            <X className="w-5 h-5" style={{
                              color: '#d5d5d5',
                              margin: '0 auto',
                              display: 'block'
                            }} />
                          )
                        ) : (
                          <span style={{
                            fontSize: '15px',
                            fontWeight: 500,
                            color: 'var(--radiant-ui-components-library-marketplace--color--heading-dark)'
                          }}>
                            {value}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust Badges - Radiant UI Icon Boxes */}
      <section className="rt-component-section">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="w-layout-hflex" style={{
            gap: '30px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[
              { icon: Shield, title: 'Secure Payments', description: 'Powered by Stripe' },
              { icon: Lock, title: 'Bank-Level Security', description: 'AES-256 encryption' },
              { icon: Clock, title: '14-Day Free Trial', description: 'No credit card needed' },
              { icon: CreditCard, title: 'Cancel Anytime', description: 'No long-term contracts' },
            ].map((badge, index) => (
              <div
                key={index}
                className="w-layout-vflex"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '30px',
                  border: '1px solid #e5e5e5',
                  textAlign: 'center',
                  flex: '1',
                  minWidth: '220px',
                  maxWidth: '280px',
                  alignItems: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="rt-icon-box" style={{ marginBottom: '20px' }}>
                  <badge.icon className="w-12 h-12" style={{ color: '#3898ec' }} />
                </div>
                <div className="rt-nav-text" style={{
                  fontSize: '18px',
                  marginBottom: '8px',
                  fontWeight: 500
                }}>
                  {badge.title}
                </div>
                <div style={{
                  color: 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)',
                  fontSize: '15px'
                }}>
                  {badge.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section - Radiant UI Call to Action */}
      <section className="rt-component-section" style={{
        backgroundColor: '#fafafa',
        borderTop: '1px solid #e5e5e5'
      }}>
        <div className="w-layout-blockcontainer rt-component-container w-container" style={{ maxWidth: '900px' }}>
          <div className="w-layout-vflex" style={{
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '60px 40px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
          }}>
            <Users className="w-16 h-16" style={{
              color: '#3898ec',
              marginBottom: '30px'
            }} />

            <h2 className="rt-component-heading-two" style={{
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              Need a Custom Enterprise Plan?
            </h2>
            <p style={{
              color: 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)',
              fontSize: '18px',
              lineHeight: '30px',
              textAlign: 'center',
              maxWidth: '600px',
              marginBottom: '40px'
            }}>
              Get custom pricing, dedicated support, and tailored features for your agency or large organization. We will work with you to build the perfect solution.
            </p>
            <div className="w-layout-hflex" style={{ gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link
                href="/sign-up"
                className="w-inline-block w-layout-hflex rt-text-icon-wrap"
                style={{
                  backgroundColor: '#3898ec',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2a7bc4'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3898ec'
                }}
              >
                <span className="rt-button-font" style={{ textTransform: 'none' }}>
                  Contact Sales Team
                </span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="w-inline-block"
                style={{
                  backgroundColor: '#f4f4f4',
                  color: 'var(--radiant-ui-components-library-marketplace--color--heading-dark)',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 500,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e5e5'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f4f4f4'
                }}
              >
                <span className="rt-button-font" style={{ textTransform: 'none' }}>
                  Learn More About Us
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Radiant UI Accordion Style */}
      <section className="rt-component-section">
        <div className="w-layout-blockcontainer rt-component-container w-container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="rt-icon-box" style={{ marginBottom: '30px' }}>
              <HelpCircle className="w-16 h-16" style={{ color: '#3898ec', margin: '0 auto' }} />
            </div>
            <h2 className="rt-component-heading-two" style={{ marginBottom: '15px' }}>
              Pricing Questions?
            </h2>
            <p style={{
              color: 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)',
              fontSize: '18px'
            }}>
              Common questions about billing and plans
            </p>
          </div>

          <div className="w-layout-vflex" style={{ gap: '20px' }}>
            {[
              {
                question: 'What counts as an SEO fix?',
                answer: 'A fix is any change applied to your website, such as adding meta descriptions, fixing alt text, correcting broken links, optimizing headings, or updating structured data. Each individual change counts as one fix.',
              },
              {
                question: 'Can I upgrade or downgrade my plan?',
                answer: 'Yes! You can upgrade or downgrade at any time from your dashboard. Changes take effect immediately, and we will prorate the difference. Upgrades give you instant access to higher limits.',
              },
              {
                question: 'What happens if I exceed my monthly fix limit?',
                answer: 'We will notify you when you are approaching your limit (at 80% and 90%). Once you hit your limit, automatic fixes pause until next month or you can upgrade immediately to continue.',
              },
              {
                question: 'Do you offer refunds?',
                answer: 'We offer a 14-day free trial, so you can test everything before paying. For paid plans, we offer a 30-day money-back guarantee if you are not satisfied.',
              },
              {
                question: 'How does the annual billing discount work?',
                answer: 'Annual plans save you 17% compared to monthly billing. You are billed once per year and get 2 months free. All annual plans come with the same features and limits as monthly plans.',
              },
              {
                question: 'Can I add more team members?',
                answer: 'Starter plans include 1 user. Growth plans include 5 users. Scale plans have unlimited users. You can add extra user seats to Growth plans for $15/user/month.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards (Visa, Mastercard, Amex, Discover) via Stripe. Enterprise customers can pay via ACH transfer or invoice.',
              },
              {
                question: 'Is there a setup fee or long-term contract?',
                answer: 'No setup fees. No long-term contracts. You can cancel anytime and you will not be charged again. Your data remains accessible for 30 days after cancellation.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '30px',
                  border: '1px solid #e5e5e5',
                  transition: 'box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 500,
                  color: 'var(--radiant-ui-components-library-marketplace--color--heading-dark)',
                  marginBottom: '15px'
                }}>
                  {faq.question}
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '28px',
                  color: 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)',
                  margin: 0
                }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Ready to Fix Your SEO Automatically?"
        description="Start your 14-day free trial today. No credit card required."
        primaryCTA={{ text: 'Start Free Trial', href: '/sign-up' }}
        secondaryCTA={{ text: 'View Features', href: '/features' }}
      />
    </div>
  )
}
