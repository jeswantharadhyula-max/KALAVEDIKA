import React from 'react'

function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      fontFamily: 'sans-serif',
      color: '#fff'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#e94560' }}>KalaVedika</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Your app is running! 🎉</p>
      </div>
    </div>
  )
}

export default Home
