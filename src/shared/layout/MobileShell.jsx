import { motion } from 'framer-motion';
import { useApp, APP_MODES } from '../../core/context/AppContext';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { CartBar } from './CartBar';
import { HamburgerMenu } from '../components/HamburgerMenu';
import { useState, useEffect } from 'react';

export const MobileShell = ({ children }) => {
  const { isStartupComplete, setShowLandingPage } = useApp();
  const [isDesktop, setIsDesktop] = useState(false);


  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <div className="layout-root">
      {/* Desktop Background Reveal */}
      {isDesktop && isStartupComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(180deg, var(--desktop-bg-top) 50%, var(--desktop-bg-bottom) 50%)',
            zIndex: 0
          }}
        />
      )}

      {/* Back to Landing Page Button (Desktop Only) */}
      {isDesktop && isStartupComplete && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          onClick={() => setShowLandingPage(true)}
          style={{
            position: 'fixed',
            top: '40px',
            left: '40px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 100,
            backdropFilter: 'blur(5px)'
          }}
          title="Back to Landing Page"
        >
          <span className="material-icons">home</span>
        </motion.button>
      )}

      <motion.div 
        key={isStartupComplete ? 'app-ready' : 'app-startup'}
        className={`mobile-shell ${isDesktop && isStartupComplete ? 'is-desktop-mockup' : ''}`}
        initial={isDesktop && isStartupComplete ? { y: '30px', opacity: 0, scale: 0.98 } : false}
        animate={{ y: 0, opacity: 1, scale: 1,
          boxShadow: isDesktop && isStartupComplete 
                    ? '0 0 100px rgba(16, 163, 127, 0.15), 0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
                    : 'none'
        }}

        transition={{ 
          duration: 1.0, 
          ease: "easeOut"
        }}

      >

        <Header />
        <main className="content-area">
          {children}
        </main>
        <CartBar />
        <BottomNavigation />
        <HamburgerMenu />
      </motion.div>
      {isDesktop && isStartupComplete && (
        <motion.a
          href="https://aura360studio.com/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '1.5px',
            color: 'rgba(255,255,255,0.2)',

            textTransform: 'uppercase',
            zIndex: 1,
            textDecoration: 'none',
            cursor: 'pointer'
          }}
        >
          POWERED BY AURA 360 STUDIO
        </motion.a>
      )}

    </div>
  );
};



