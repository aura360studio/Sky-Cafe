import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp, APP_PAGES } from '../../core/context/AppContext';

export const LandingPageView = () => {
  const { setShowLandingPage, setActivePage } = useApp();


  // Memoize stars to prevent re-shuffling on re-render / exit
  const stars = useMemo(() => [...Array(50)].map((_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5
  })), []);

  // Memoize buildings to prevent 'stretching' glitch on exit
  const buildings = useMemo(() => [...Array(20)].map((_, i) => ({
    height: Math.random() * 60 + 30,
    width: Math.random() * 50 + 40,
    color: ['#10a37f', '#f9b752', '#fcd292', '#e5534b', '#9333ea', '#2563eb'][i % 6],
    windows: [...Array(5)].map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 70 + 10}%`,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 10
    }))
  })), []);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >

      {/* Starry Sky Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {stars.map((star, i) => (
          <motion.div
            key={`star-${i}`}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ 
              duration: star.duration, 
              repeat: Infinity, 
              delay: star.delay 
            }}
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              width: '2px',
              height: '2px',
              backgroundColor: '#fff',
              borderRadius: '50%'
            }}
          />
        ))}
      </div>

      {/* Midnight Cityscape Background */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '45vh',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '2px',
        opacity: 0.6,
        zIndex: 1,
        maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
      }}>
        {buildings.map((b, i) => (
          <motion.div
            key={`building-${i}`}
            initial={{ height: 0 }}
            animate={{ height: `${b.height}%` }}
            transition={{ duration: 1.5, delay: i * 0.05 }}
            style={{
              width: `${b.width}px`,
              backgroundColor: '#111',
              borderTop: `2px solid ${b.color}`,
              borderRadius: '2px 2px 0 0',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255, 255, 255, 0.05) 8px, rgba(255, 255, 255, 0.05) 12px),
                repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(255, 255, 255, 0.05) 6px, rgba(255, 255, 255, 0.05) 10px)`
            }}
          >
            {b.windows.map((w, j) => (
              <motion.div
                key={`window-${i}-${j}`}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  duration: w.duration, 
                  repeat: Infinity, 
                  delay: w.delay 
                }}
                style={{
                  position: 'absolute',
                  top: w.top,
                  left: w.left,
                  width: '4px',
                  height: '4px',
                  backgroundColor: j % 2 === 0 ? '#ffeb3b' : b.color,
                  boxShadow: `0 0 8px ${b.color}`
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>



      {/* Main Content Card (Glassmorphism) */}
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        style={{ 
          zIndex: 10, 
          textAlign: 'center', 
          maxWidth: '650px', 
          padding: '60px 40px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(15px)',
          borderRadius: '40px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          margin: '0 20px'
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--accent-color)',
            borderRadius: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            boxShadow: '0 20px 40px rgba(16, 163, 127, 0.3)'
          }}
        >
          <span className="material-icons" style={{ fontSize: '50px', color: '#fff' }}>restaurant</span>
        </motion.div>

        <h1 style={{ 
          fontSize: '44px', 
          fontWeight: '900', 
          marginBottom: '20px', 
          letterSpacing: '-1.5px',
          lineHeight: '1.1',
          color: '#fff'
        }}>
          Sky Cafe is a <span style={{ color: 'var(--accent-color)' }}>Mobile-First</span> Experience
        </h1>

        <p style={{ 
          fontSize: '17px', 
          lineHeight: '1.6', 
          color: 'rgba(255,255,255,0.5)', 
          marginBottom: '40px',
          fontWeight: '400'
        }}>
          To enjoy our full table-ordering and immersive booking system, please scan the QR code at our restaurant or visit this site on your mobile device.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowLandingPage(false)}
            style={{
              padding: '16px 36px',
              backgroundColor: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 10px 20px rgba(255,255,255,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 15px 25px rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 20px rgba(255,255,255,0.1)';
            }}
          >
            Explore Anyway
          </button>
          
          <button
            onClick={() => {
              setActivePage(APP_PAGES.ADMIN_LOGIN);
              setShowLandingPage(false);
            }}
            style={{
              padding: '16px 36px',
              backgroundColor: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Admin Login
          </button>

        </div>
      </motion.div>
    </motion.div>

  );
};

