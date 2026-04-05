import { motion } from 'framer-motion';
import { useApp, APP_PAGES, APP_MODES } from '../../core/context/AppContext';
import { Button } from '../../shared/components/Button';
import { SectionTitle } from '../../shared/components/SectionTitle';

export const OrderSuccessView = () => {
  const { setActivePage, setMode, mode } = useApp();

  return (
    <div style={{ padding: '0 16px', paddingBottom: '40px', textAlign: 'center', paddingTop: '40px' }}>
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ fontSize: '64px', marginBottom: '16px', color: 'var(--accent-color)' }}
      >
        ✓
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <SectionTitle title="Order Sent to Sky Cafe" subtitle="Order sent successfully" />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '12px', marginBottom: '32px', border: '1px solid var(--border-color)', textAlign: 'left' }}
      >
        <p style={{ marginBottom: '16px', lineHeight: '1.5' }}>
          We hope you have successfully shared your order details on WhatsApp.
        </p>
        
        {mode === APP_MODES.DINE_IN ? (
          <p style={{ marginBottom: '16px', lineHeight: '1.5' }}>
            <strong>Please inform the waiter once about your order.</strong>
          </p>
        ) : (
          <p style={{ marginBottom: '16px', lineHeight: '1.5' }}>
            <strong>We'll notify you when your order is ready for pickup.</strong>
            <br /><br />
            Please book your delivery partner (Dunzo/Rapido) once you receive the notification.
          </p>
        )}

        <p style={{ marginBottom: '16px', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
          You can continue ordering more items from the menu,
          or explore Sky @ Night Life for events and bookings.
        </p>
        
        <p style={{ fontSize: '13px', fontStyle: 'italic', fontWeight: '500', color: 'var(--accent-color)' }}>
          Average preparation time: {mode === APP_MODES.DINE_IN ? '15–20 minutes' : '30–45 minutes'}.<br />
          Thank you for visiting Sky Cafe & Kitchen.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <Button variant="primary" size="lg" onClick={() => setActivePage(APP_PAGES.MENU)}>
          Continue Menu
        </Button>
        <Button variant="secondary" size="lg" onClick={() => setMode(APP_MODES.NIGHT_LIFE)}>
          Explore Night Life
        </Button>
        <Button variant="outline" size="lg" onClick={() => setActivePage(APP_PAGES.HOME)} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
          Go to Home
        </Button>
      </motion.div>
    </div>
  );
};
