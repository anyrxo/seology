'use client'

import { useEffect } from 'react'

export default function HomePage() {
  useEffect(() => {
    // Redirect to the complete Noura template (served as static HTML)
    window.location.href = '/index.html'
  }, [])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontSize: '24px',
      fontFamily: 'system-ui'
    }}>
      Redirecting to SEOLOGY.AI...
    </div>
  )
}
