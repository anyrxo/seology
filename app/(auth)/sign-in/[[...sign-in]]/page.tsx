import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral--100">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mg-bottom-40px">
            <Link href="/" className="inline-block">
              <h2 className="text-600 bold color-neutral-900">
                SEOLOGY<span className="color-accent--primary-1">.AI</span>
              </h2>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mg-bottom-32px">
            <h1 className="text-500 bold color-neutral-900 mg-bottom-12px">
              Welcome Back
            </h1>
            <p className="text-200 color-neutral-600">
              Sign in to continue optimizing your SEO automatically
            </p>
          </div>

          {/* Sign In Card */}
          <div className="card pd-32px---24px bg-white">
            <SignIn
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none border-0 bg-transparent p-0',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  formButtonPrimary: 'btn-primary large w-full',
                  formFieldLabel: 'text-100 medium color-neutral-800',
                  formFieldInput: 'rt-footer-newsletter-input w-full',
                  footerActionLink: 'color-accent--primary-1 text-100 medium hover:underline',
                  socialButtonsBlockButton: 'btn-secondary large w-full mg-bottom-12px',
                  dividerLine: 'bg-neutral--400',
                  dividerText: 'text-100 color-neutral-600',
                  formFieldLabelRow: 'mg-bottom-8px',
                  footer: 'mg-top-24px text-center',
                },
              }}
            />
          </div>

          {/* Trust Signals */}
          <div className="mg-top-32px">
            <div className="flex items-center justify-center gap-4 mg-bottom-24px">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 color-accent--success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-100 color-neutral-700">SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 color-accent--success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-100 color-neutral-700">Privacy Protected</span>
              </div>
            </div>

            {/* Legal */}
            <p className="text-100 color-neutral-600 text-center">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="color-accent--primary-1 text-100 medium hover:underline">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="color-accent--primary-1 text-100 medium hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Branding & Benefits */}
      <div className="hidden lg:flex flex-1 items-center justify-center px-8 relative overflow-hidden"
           style={{
             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
           }}>
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-lg text-white">
          <h2 className="text-600 bold mg-bottom-24px">
            AI-Powered SEO Automation
          </h2>
          <p className="text-300 mg-bottom-40px opacity-90">
            The first platform that actually fixes your SEO issues automatically, not just reports them.
          </p>

          {/* Benefits List */}
          <div className="space-y-4">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Automatic Fixes',
                description: 'AI applies SEO fixes directly to your CMS'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Verified Results',
                description: 'Track improvements with real-time metrics'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Enterprise Security',
                description: 'Bank-level encryption for all connections'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: 'Proven Growth',
                description: 'Average 40% increase in organic traffic'
              }
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-200 bold mg-bottom-4px">{benefit.title}</h3>
                  <p className="text-100 opacity-80">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="mg-top-48px pt-40px border-t border-white/20">
            <div className="flex items-center gap-2 mg-bottom-12px">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/30 border-2 border-white"></div>
                ))}
              </div>
              <span className="text-100 opacity-90">+10,000 users</span>
            </div>
            <p className="text-100 opacity-80">
              "SEOLOGY.AI increased our organic traffic by 60% in just 3 months"
            </p>
            <p className="text-100 bold mg-top-8px">
              - Sarah Johnson, Marketing Director
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
