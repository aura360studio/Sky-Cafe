import { useApp, APP_PAGES, APP_MODES } from '../../core/context/AppContext';
import { Button } from '../../shared/components/Button';
import { SectionTitle } from '../../shared/components/SectionTitle';

export const OrderSuccessView = () => {
  const { setActivePage, setMode } = useApp();

  return (
    <div style={{ padding: '0 16px', paddingBottom: '40px', textAlign: 'center', paddingTop: '40px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--accent-color)' }}>✓</div>
      <SectionTitle title="Order Sent to Sky Cafe" subtitle="Order sent successfully" />
      
      <div style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '12px', marginBottom: '32px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
        <p style={{ marginBottom: '16px', lineHeight: '1.5' }}>
          We hope you have successfully shared your order details on WhatsApp.<br /><br />
          <strong>Please inform the waiter once about your order.</strong>
        </p>
        <p style={{ marginBottom: '16px', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
          You can continue ordering more items from the menu,
          or explore Sky @ Night Life for events and bookings.
        </p>
        <p style={{ fontSize: '13px', fontStyle: 'italic', fontWeight: '500', color: 'var(--accent-color)' }}>
          Average preparation time is around 15–20 minutes.<br />
          Thank you for visiting Sky Cafe & Kitchen.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Button variant="primary" size="lg" onClick={() => setActivePage(APP_PAGES.MENU)}>
          Continue Menu
        </Button>
        <Button variant="secondary" size="lg" onClick={() => setMode(APP_MODES.NIGHT_LIFE)}>
          Explore Night Life
        </Button>
        <Button variant="outline" size="lg" onClick={() => setActivePage(APP_PAGES.HOME)} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
          Go to Home
        </Button>
      </div>
    </div>
  );
};
