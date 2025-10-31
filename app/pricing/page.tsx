export default function PricingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: 'linear-gradient(to bottom, #f9fafb, #ffffff)',
      padding: '2rem'
    }}>
      <h1 style={{
        fontSize: '3.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Choose Your <span style={{color: '#16a34a'}}>Seology.ai</span> Plan
      </h1>

      <p style={{
        fontSize: '1.25rem',
        textAlign: 'center',
        color: '#4b5563',
        maxWidth: '42rem',
        marginBottom: '3rem'
      }}>
        AI-powered SEO automation that actually fixes your website. Start free, scale as you grow.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        width: '100%'
      }}>
        {/* Free Plan */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          border: '2px solid #e5e7eb'
        }}>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Free</h2>
          <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '1rem'}}>
            $0<span style={{fontSize: '1rem', color: '#6b7280'}}>/month</span>
          </div>
          <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ 1 website</li>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ 10 SEO fixes per month</li>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ Basic analytics</li>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ Email support</li>
          </ul>
          <a href="/sign-up" style={{
            display: 'block',
            background: '#16a34a',
            color: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Get Started Free
          </a>
        </div>

        {/* Pro Plan */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
          border: '3px solid #16a34a',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '20px',
            background: '#16a34a',
            color: 'white',
            padding: '0.25rem 1rem',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            POPULAR
          </div>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Pro</h2>
          <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '1rem'}}>
            $99<span style={{fontSize: '1rem', color: '#6b7280'}}>/month</span>
          </div>
          <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ 5 websites</li>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ Unlimited SEO fixes</li>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ Advanced analytics</li>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ Priority support</li>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ API access</li>
          </ul>
          <a href="/sign-up" style={{
            display: 'block',
            background: '#16a34a',
            color: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Start Pro Trial
          </a>
        </div>

        {/* Enterprise Plan */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          border: '2px solid #e5e7eb'
        }}>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Enterprise</h2>
          <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '1rem'}}>
            Custom
          </div>
          <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ Unlimited websites</li>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ Unlimited SEO fixes</li>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ Custom analytics</li>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ Dedicated support</li>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ SLA guarantee</li>
            <li style={{padding: '0.5rem 0', color: '#4b5563'}}>✓ White-label option</li>
          </ul>
          <a href="mailto:sales@seology.ai" style={{
            display: 'block',
            background: '#111827',
            color: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Contact Sales
          </a>
        </div>
      </div>

      <div style={{
        marginTop: '4rem',
        textAlign: 'center',
        maxWidth: '42rem'
      }}>
        <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>
          All plans include:
        </h3>
        <p style={{color: '#6b7280', marginBottom: '2rem'}}>
          Claude AI-powered fixes • Universal CMS connectors • Real-time monitoring • Automatic deployment • SEO analytics • Mobile optimization
        </p>
        <a href="/" style={{
          color: '#16a34a',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          ← Back to Home
        </a>
      </div>
    </div>
  )
}
