import React from 'react';
import { motion } from 'framer-motion';
import { useApp, APP_MODES } from '../../core/context/AppContext';
import { Card } from '../../shared/components/Card';

export const ModeSelectionView = () => {
  const { setMode } = useApp();

  const selectionModes = [
    {
      id: APP_MODES.DINE_IN,
      title: 'Dine In',
      subtitle: 'Order at your table',
      icon: '🍽️',
      color: 'linear-gradient(135deg, #10a37f 0%, #0e8c6c 100%)'
    },
    {
      id: APP_MODES.DELIVERY,
      title: 'Delivery',
      subtitle: 'Home Pickup & Delivery',
      icon: '🛵',
      color: 'linear-gradient(135deg, #3a3a3a 0%, #2f2f2f 100%)'
    },
    {
      id: APP_MODES.NIGHT_LIFE,
      title: 'Night Life',
      subtitle: 'Events & Vibe',
      icon: '🌙',
      color: 'linear-gradient(135deg, #2a0845 0%, #6441A5 100%)'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-color)',
      padding: '40px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Welcome to Sky Cafe
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
          How would you like to experience us today?
        </p>
      </motion.div>

      <div style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {selectionModes.map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setMode(m.id)}
            style={{ cursor: 'pointer' }}
          >
            <Card style={{ 
              background: m.color, 
              border: 'none', 
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
            }}>
              <span style={{ fontSize: '36px' }}>{m.icon}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '18px', fontWeight: '700' }}>{m.title}</h3>
                <p style={{ margin: '4px 0 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>{m.subtitle}</p>
              </div>
              <span className="material-icons" style={{ color: 'rgba(255,255,255,0.5)' }}>chevron_right</span>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ 
          marginTop: '48px', 
          fontSize: '11px', 
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '1.5px'
        }}
      >
        Powered by Sky Cafe & Kitchen
      </motion.p>
    </div>
  );
};
