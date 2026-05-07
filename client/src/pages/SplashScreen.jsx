import { useEffect, useState } from 'react'

export default function SplashScreen({ onFinish }) {
  const [animationStage, setAnimationStage] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setAnimationStage(1), 300)
    const t2 = setTimeout(() => setAnimationStage(2), 1200)
    const t3 = setTimeout(() => setAnimationStage(3), 2000)
    const t4 = setTimeout(() => onFinish(), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      overflow: 'hidden',
    }}>

      {/* Floating background orbs */}
      <div style={{
        position: 'absolute', width: '400px', height: '400px',
        borderRadius: '50%', top: '-100px', left: '-100px',
        background: 'rgba(108, 99, 255, 0.15)',
        filter: 'blur(80px)', animation: 'pulse 4s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute', width: '300px', height: '300px',
        borderRadius: '50%', bottom: '-80px', right: '-80px',
        background: 'rgba(118, 75, 162, 0.2)',
        filter: 'blur(60px)', animation: 'pulse 3s ease-in-out infinite reverse'
      }} />
      <div style={{
        position: 'absolute', width: '200px', height: '200px',
        borderRadius: '50%', top: '40%', right: '15%',
        background: 'rgba(102, 126, 234, 0.1)',
        filter: 'blur(40px)', animation: 'pulse 5s ease-in-out infinite'
      }} />

      {/* Logo container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        opacity: animationStage >= 1 ? 1 : 0,
        transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>

        {/* Logo Icon */}
        <div style={{
          width: '100px', height: '100px',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(108, 99, 255, 0.5)',
          transform: animationStage >= 2 ? 'scale(1)' : 'scale(0.8)',
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>
          {/* Ethara lotus-inspired SVG */}
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="32" r="5" fill="white" opacity="0.9"/>
            <ellipse cx="28" cy="20" rx="5" ry="9" fill="white" opacity="0.95"/>
            <ellipse cx="28" cy="20" rx="5" ry="9" fill="white" opacity="0.95"
              transform="rotate(45 28 28)"/>
            <ellipse cx="28" cy="20" rx="5" ry="9" fill="white" opacity="0.95"
              transform="rotate(-45 28 28)"/>
            <ellipse cx="28" cy="20" rx="5" ry="9" fill="white" opacity="0.7"
              transform="rotate(90 28 28)"/>
            <ellipse cx="28" cy="20" rx="5" ry="9" fill="white" opacity="0.7"
              transform="rotate(-90 28 28)"/>
            <circle cx="28" cy="38" r="2" fill="white" opacity="0.6"/>
          </svg>
        </div>

        {/* Brand name */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '52px',
            fontWeight: '700',
            color: 'white',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-1px',
            lineHeight: 1,
            margin: 0,
          }}>
            Ethara<span style={{
              background: 'linear-gradient(135deg, #667eea, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>.AI</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '13px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginTop: '8px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Assignment Submission
          </p>
        </div>

        {/* Divider line */}
        <div style={{
          width: animationStage >= 2 ? '200px' : '0px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          transition: 'width 0.8s ease 0.3s',
        }} />

        {/* Project name */}
        <div style={{
          opacity: animationStage >= 2 ? 1 : 0,
          transform: animationStage >= 2 ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.6s ease 0.4s',
          textAlign: 'center',
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
            fontWeight: '500',
          }}>
            Team Task Manager
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            marginTop: '4px',
          }}>
            Full Stack Web Application
          </p>
        </div>
      </div>

      {/* Loading bar at bottom */}
      <div style={{
        position: 'absolute',
        bottom: '60px',
        width: '200px',
        opacity: animationStage >= 2 ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        <div style={{
          height: '3px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '999px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: animationStage >= 3 ? '100%' : '30%',
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            borderRadius: '999px',
            transition: 'width 1s ease',
          }} />
        </div>
        <p style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: '11px',
          textAlign: 'center',
          marginTop: '10px',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          Loading...
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}