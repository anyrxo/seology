import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <section className="rt-component-section">
      <div className="w-layout-blockcontainer rt-component-container w-container">
        <div className="container-default w-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Header with Radiant UI styling */}
          <div className="rt-footer-four-title-main mg-bottom-48px">
            <h1 className="rt-component-heading-two mg-bottom-16px">
              Start Fixing SEO Issues with <span className="color-accent--primary-1">AI</span>
            </h1>
            <p className="text-200 color-neutral-600">
              Join thousands of businesses automating their SEO with SEOLOGY.AI
            </p>
          </div>

          {/* Dashflow X Card with Radiant UI elements */}
          <div className="card pd-32px---24px">
            <SignUp
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none border-0 bg-transparent p-0',
                  headerTitle: 'text-500 bold color-neutral-800',
                  headerSubtitle: 'text-200 color-neutral-600',
                  formButtonPrimary: 'btn-primary large w-full',
                  formFieldLabel: 'text-100 medium color-neutral-800',
                  formFieldInput: 'rt-footer-newsletter-input w-full',
                  footerActionLink: 'text-accent--primary-1 text-100 medium',
                  socialButtonsBlockButton: 'btn-secondary large w-full mg-bottom-12px',
                  dividerLine: 'bg-neutral--400',
                  dividerText: 'text-100 color-neutral-600',
                  formFieldLabelRow: 'mg-bottom-8px',
                  footer: 'mg-top-24px',
                },
              }}
            />
          </div>

          {/* Additional info with Radiant UI text */}
          <div className="mg-top-32px text-center">
            <p className="text-100 color-neutral-600">
              By signing up, you agree to our{' '}
              <a href="#" className="color-accent--primary-1 text-100 medium">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="color-accent--primary-1 text-100 medium">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
