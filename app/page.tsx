export default function HomePage() {
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
        fontSize: '4rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        SEO Automation That <span style={{color: '#16a34a'}}>Actually Fixes</span> Your Website
      </h1>

      <p style={{
        fontSize: '1.25rem',
        textAlign: 'center',
        color: '#4b5563',
        maxWidth: '42rem',
        marginBottom: '2rem'
      }}>
        We don't tell you what's wrong with your SEO. We fix it. Claude AI + automation + universal CMS connectors.
      </p>

      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '3rem'
      }}>
        <a href="/sign-up" style={{
          background: '#16a34a',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          Start Free Trial
        </a>
        <a href="/pricing" style={{
          background: 'white',
          color: '#16a34a',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: '600',
          border: '2px solid #16a34a'
        }}>
          View Pricing
        </a>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#16a34a'}}>500+</div>
          <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Sites Automated</div>
        </div>
        <div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#16a34a'}}>50K+</div>
          <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Fixes Applied</div>
        </div>
        <div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#16a34a'}}>24/7</div>
          <div style={{fontSize: '0.875rem', color: '#6b7280'}}>AI Monitoring</div>
        </div>
      </div>

      <div style={{
        marginTop: '4rem',
        padding: '1.5rem',
        background: '#dcfce7',
        borderRadius: '0.75rem',
        border: '2px solid #16a34a',
        textAlign: 'center'
      }}>
        <p style={{color: '#15803d', fontWeight: '600'}}>
          ✅ Deployment Successful | Platform Status: Operational
        </p>
      </div>
    </div>
  )
}
