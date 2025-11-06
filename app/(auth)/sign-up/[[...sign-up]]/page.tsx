import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
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
              Start Fixing SEO Issues Automatically
            </h1>
            <p className="text-200 color-neutral-600">
              Join thousands of businesses using AI-powered SEO automation
            </p>
          </div>

          {/* Value Proposition Badges */}
          <div className="flex flex-wrap justify-center gap-2 mg-bottom-24px">
            <div className="badge green">
              <span className="text-50 medium">Free 14-day trial</span>
            </div>
            <div className="badge primary">
              <span className="text-50 medium">No credit card required</span>
            </div>
            <div className="badge neutral">
              <span className="text-50 medium">Cancel anytime</span>
            </div>
          </div>

          {/* Sign Up Card */}
          <div className="card pd-32px---24px bg-white">
            <SignUp
              forceRedirectUrl="/dashboard/onboarding"
              signInUrl="/sign-in"
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
                <span className="text-100 color-neutral-700">GDPR Compliant</span>
              </div>
            </div>

            {/* Legal */}
            <p className="text-100 color-neutral-600 text-center">
              By signing up, you agree to our{' '}
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

      {/* Right Side - Social Proof & Features */}
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
          <div className="mg-bottom-40px">
            <h2 className="text-600 bold mg-bottom-16px">
              The Future of SEO is Automated
            </h2>
            <p className="text-300 opacity-90">
              Stop spending hours on manual SEO fixes. Let AI do the heavy lifting while you focus on growing your business.
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-6 mg-bottom-48px">
            {[
              {
                number: '01',
                title: 'Connect Your Site',
                description: 'Works with Shopify, WordPress, or any custom site'
              },
              {
                number: '02',
                title: 'AI Analyzes Everything',
                description: 'Our AI scans your site for SEO opportunities'
              },
              {
                number: '03',
                title: 'Automatic Fixes Applied',
                description: 'Watch as fixes are deployed directly to your CMS'
              },
              {
                number: '04',
                title: 'Track Your Growth',
                description: 'Real-time metrics show your SEO improvements'
              }
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-300 bold">{step.number}</span>
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-200 bold mg-bottom-4px">{step.title}</h3>
                  <p className="text-100 opacity-80">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="pt-40px border-t border-white/20">
            <div className="mg-bottom-16px">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 fill-current text-yellow-300" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-200 mg-bottom-16px">
              "We saw a 60% increase in organic traffic within 3 months. SEOLOGY.AI handles everything automatically - it's incredible."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/30 border-2 border-white"></div>
              <div>
                <p className="text-100 bold">Michael Chen</p>
                <p className="text-100 opacity-80">CEO, TechStart Inc.</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mg-top-48px pt-40px border-t border-white/20">
            <div>
              <div className="text-500 bold mg-bottom-4px">10K+</div>
              <div className="text-100 opacity-80">Active Users</div>
            </div>
            <div>
              <div className="text-500 bold mg-bottom-4px">2M+</div>
              <div className="text-100 opacity-80">Fixes Applied</div>
            </div>
            <div>
              <div className="text-500 bold mg-bottom-4px">40%</div>
              <div className="text-100 opacity-80">Avg. Traffic Increase</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
