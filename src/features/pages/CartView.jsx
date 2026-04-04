import { useState } from 'react';
import { useApp, APP_MODES, APP_PAGES } from '../../core/context/AppContext';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { SectionTitle } from '../../shared/components/SectionTitle';
import { Modal } from '../../shared/components/Modal';
import { generateDineInUrl, generateDeliveryUrl } from '../../services/whatsapp';

export const CartView = () => {
  const { 
    mode, cartItems, cartTotal, removeFromCart, updateCartItemQuantity, clearCart,
    sessionOrders, syncSessionOrders, sessionTotal, clearSessionOrders,
    customerName, setCustomerName, tableNumber, setTableNumber, location, setLocation, setActivePage
  } = useApp();

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const handleCheckout = () => {
    if (!customerName || customerName.trim() === '') {
      return alert("Please enter your name.");
    }
    
    if (mode === APP_MODES.DINE_IN) {
      if (!tableNumber) return alert("Please specify your table number.");
      window.open(generateDineInUrl(cartItems, customerName, tableNumber, cartTotal), '_blank');
      syncSessionOrders(cartItems);
      clearCart();
      setActivePage(APP_PAGES.ORDER_SUCCESS);
    } else {
      window.open(generateDeliveryUrl(cartItems, customerName, cartTotal), '_blank');
      clearCart();
      setActivePage(APP_PAGES.ORDER_SUCCESS);
    }
  };

  if (cartItems.length === 0 && sessionOrders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Your cart is empty</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          Explore our menu and add your favorite dishes.<br/>
          Once ready, you can place the order through WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 16px', paddingBottom: '40px' }}>
      
      {sessionOrders.length > 0 && mode === APP_MODES.DINE_IN && (
        <div style={{ marginBottom: '32px' }}>
          <SectionTitle title="Running Order" subtitle={`${sessionOrders.length} confirmed items`} />
          <div style={{ background: 'var(--surface-color)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
            {sessionOrders.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', marginBottom: '8px', borderBottom: idx < sessionOrders.length - 1 ? '1px dashed var(--border-color)' : 'none' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{item.quantity}x {item.title}</span>
                <span style={{ fontWeight: '500' }}>₹{item.lineTotal.toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', fontWeight: 'bold' }}>
              <span>Total Running Bill:</span>
              <span style={{ color: 'var(--accent-color)' }}>₹{sessionTotal.toFixed(2)}</span>
            </div>
          </div>
          <Button variant="outline" style={{ width: '100%' }} onClick={() => {
             if(Math.random() >= 0) { // Keep syntax clean
               window.open(`https://wa.me/917411116694?text=${encodeURIComponent(`🧾 *PING: Bill Requested!*\n*Name:* ${customerName}\n*Table:* ${tableNumber}\n\nPlease bring the final bill to this table.`)}`, "_blank");
               clearSessionOrders();
             }
          }}>
            Request Final Bill & Clear Session
          </Button>
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <SectionTitle title="New Items" subtitle={`${cartItems.length} items securely staged`} />
            <button 
              onClick={() => setIsClearModalOpen(true)}
              style={{ background: 'transparent', color: 'var(--danger-color)', border: '1px solid var(--danger-color)', borderRadius: '4px', padding: '6px 12px', fontSize: '13px', cursor: 'pointer', fontWeight: 600, marginTop: '4px' }}
            >
              Clear All
            </button>
          </div>
      
      <div style={{ marginBottom: '20px' }}>
        {cartItems.map(item => (
          <div key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{item.title}</p>
              <p style={{ margin: '4px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                ₹{item.price.toFixed(2)}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface-color)', padding: '2px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <button 
                  onClick={() => updateCartItemQuantity(item.cartItemId, -1)}
                  style={{ background: 'transparent', color: 'var(--text-primary)', border: 'none', cursor: 'pointer', fontWeight: 'bold', padding: '4px 8px' }}
                >
                  -
                </button>
                <span style={{ fontSize: '14px', fontWeight: '500', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <button 
                  onClick={() => updateCartItemQuantity(item.cartItemId, 1)}
                  style={{ background: 'transparent', color: 'var(--text-primary)', border: 'none', cursor: 'pointer', fontWeight: 'bold', padding: '4px 8px' }}
                >
                  +
                </button>
              </div>
              <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>₹{item.lineTotal.toFixed(2)}</span>
              <button 
                onClick={() => removeFromCart(item.cartItemId)} 
                style={{ background: 'rgba(229, 83, 75, 0.2)', color: 'var(--danger-color)', border: 'none', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
        <span>Total Payload:</span>
        <span style={{ color: 'var(--accent-color)' }}>₹{cartTotal.toFixed(2)}</span>
      </div>

      <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {mode === APP_MODES.DINE_IN && (
          <Input 
            label="Table Number *" 
            placeholder="e.g. 12" 
            value={tableNumber || ''} 
            onChange={(e) => setTableNumber(e.target.value)} 
          />
        )}
        
        <Input 
          label="Customer Name *" 
          placeholder="Your full name" 
          value={customerName || ''} 
          onChange={(e) => setCustomerName(e.target.value)} 
        />
      </div>

        <Button variant="primary" size="lg" style={{ width: '100%', padding: '14px 0' }} onClick={handleCheckout}>
          Send Secure WhatsApp Order
        </Button>

        <Modal isOpen={isClearModalOpen} onClose={() => setIsClearModalOpen(false)} title="Clear Cart?">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
              Are you sure you want to remove all {cartItems.length} new items from your cart? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <Button variant="outline" style={{ flex: 1 }} onClick={() => setIsClearModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" style={{ flex: 1, background: 'var(--danger-color)' }} onClick={() => {
                clearCart();
                setIsClearModalOpen(false);
              }}>
                Yes, Clear All
              </Button>
            </div>
          </div>
        </Modal>

      </>
    )}
    </div>
  );
};
