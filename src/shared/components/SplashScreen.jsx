import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); // 2.5 seconds splash
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'var(--bg-color)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut"
        }}
        style={{ textAlign: 'center' }}
      >
        <motion.div
          animate={{ 
            boxShadow: [
              "0 0 0px rgba(16, 163, 127, 0)",
              "0 0 20px rgba(16, 163, 127, 0.4)",
              "0 0 0px rgba(16, 163, 127, 0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            backgroundColor: 'var(--accent-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            margin: '0 auto 20px'
          }}
        >
          <span className="material-icons" style={{ fontSize: '40px', color: '#fff' }}>restaurant</span>
        </motion.div>
        
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ 
            fontSize: '32px', 
            fontWeight: '800', 
            letterSpacing: '4px',
            margin: 0,
            color: 'var(--text-primary)'
          }}
        >
          SKY
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ 
            fontSize: '12px', 
            fontWeight: '500', 
            letterSpacing: '2px',
            color: 'var(--accent-color)',
            margin: '4px 0 0 0',
            textTransform: 'uppercase'
          }}
        >
          Cafe & Kitchen
        </motion.p>
      </motion.div>

      {/* Decorative background element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          fontSize: '300px',
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      >
        🍱
      </motion.div>
    </div>
  );
};
