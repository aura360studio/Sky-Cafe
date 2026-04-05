import { useState } from 'react';
import { useApp, APP_MODES, APP_PAGES } from '../../core/context/AppContext';
import { SpecialBanner } from '../../shared/components/SpecialBanner';
import { SectionTitle } from '../../shared/components/SectionTitle';
import { Button } from '../../shared/components/Button';
import { Card } from '../../shared/components/Card';
import { Modal } from '../../shared/components/Modal';
import { Input } from '../../shared/components/Input';
import { getTodaysSpecial, getPopularItems, getPromoCombos } from '../../services/specialsService';
import { generateCallWaiterUrl, generateRequestBillUrl } from '../../services/whatsapp';
import { RestaurantStatusBanner } from '../../shared/components/RestaurantStatusBanner';

export const HomeView = () => {
  const todaysSpecial = getTodaysSpecial();
  const popularItems = getPopularItems();
  const promoCombos = getPromoCombos();

  const { mode, setActivePage, setMode, customerName, setCustomerName, tableNumber, setTableNumber, addToCart } = useApp();
  const [isQuickActionModalOpen, setIsQuickActionModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // 'waiter' or 'bill'

  const executeQuickAction = (actionType, name, table) => {
    if (actionType === 'waiter') {
      window.open(generateCallWaiterUrl(name, table), '_blank');
    } else if (actionType === 'bill') {
      window.open(generateRequestBillUrl(name, table), '_blank');
    }
  };

  const handleQuickAction = (actionType) => {
    if (!customerName || !tableNumber) {
      setPendingAction(actionType);
      setIsQuickActionModalOpen(true);
    } else {
      executeQuickAction(actionType, customerName, tableNumber);
    }
  };

  const submitQuickActionModal = () => {
    if (!customerName || !tableNumber) {
      return alert("Please provide both your name and table number.");
    }
    setIsQuickActionModalOpen(false);
    executeQuickAction(pendingAction, customerName, tableNumber);
  };

  if (mode === APP_MODES.DINE_IN) {
    return (
      <>
        <div style={{ padding: '16px', paddingBottom: '40px' }}>
          
          <RestaurantStatusBanner />

          {/* 1. Today's Special */}
          <SpecialBanner special={todaysSpecial} />
          
          {/* 2. Quick Actions */}
          <SectionTitle title="Quick Actions" />
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <Button variant="primary" style={{ flex: 1, padding: '10px 8px', fontSize: '14px' }} onClick={() => setActivePage(APP_PAGES.MENU)}>
              Menu
            </Button>
            <Button variant="secondary" style={{ flex: 1, padding: '10px 8px', fontSize: '14px' }} onClick={() => handleQuickAction('waiter')}>
              Call Waiter
            </Button>
            <Button variant="outline" style={{ flex: 1, padding: '10px 8px', fontSize: '14px', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} onClick={() => handleQuickAction('bill')}>
              Get Bill
            </Button>
          </div>

          {/* 3. Popular Items */}
          <SectionTitle title="Popular Items" subtitle="Most Ordered Today" />
          <Card style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
            {popularItems.map((item, index) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: index < popularItems.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <div>
                  <span style={{ fontWeight: '500', display: 'block' }}>{item.title}</span>
                  <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>₹{item.price.toFixed(2)}</span>
                </div>
                <Button variant="outline" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => addToCart(item)}>Add</Button>
              </div>
            ))}
          </Card>

          {/* 4. Combos / Offers */}
          <SectionTitle title="Combos & Offers" subtitle="Great value selections" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {promoCombos.map(combo => (
              <Card key={combo.id} style={{ background: 'var(--surface-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, paddingRight: '12px' }}>
                    <h3 style={{ margin: 0, marginBottom: '4px', fontSize: '16px' }}>{combo.title}</h3>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>{combo.description}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--accent-color)', display: 'block', marginBottom: '8px' }}>₹{combo.price.toFixed(2)}</span>
                    <Button variant="outline" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => addToCart(combo)}>Add</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* 5. Sky @ Night Life Banner */}
          <SectionTitle title="Sky Night Life" />
          <Card style={{ background: 'linear-gradient(45deg, #1f1c2c, #928DAB)', border: 'none', marginBottom: '24px' }}>
            <h3 style={{ color: '#fff', marginBottom: '8px' }}>Sky @ Night Life</h3>
            <ul style={{ color: '#ddd', fontSize: '14px', margin: '0 0 16px 0', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>Candle Light Dinner</li>
              <li>Live Music Saturday</li>
              <li>Birthday Party Setup</li>
            </ul>
            <Button variant="primary" style={{ width: '100%', background: '#fff', color: '#1f1c2c' }} onClick={() => setMode(APP_MODES.NIGHT_LIFE)}>
              Book Now &rarr;
            </Button>
          </Card>

          {/* 6. Cafe Information */}
          <SectionTitle title="Cafe Info" subtitle="Everything you need" />
          <Card style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>WiFi Password</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <strong style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>SKYCAFE2026</strong>
                <button onClick={() => navigator.clipboard.writeText('SKYCAFE2026')} style={{ background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-icons" style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>content_copy</span>
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Contact</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <strong>+91 74111 16694</strong>
                <button onClick={() => window.open('tel:+917411116694')} style={{ background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-icons" style={{ color: '#4caf50', fontSize: '20px' }}>call</span>
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Hours</span>
              <strong>11:00 AM - Midnight</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Instagram</span>
              <strong style={{ color: 'var(--accent-color)' }}>@SkyCafeKitchen</strong>
            </div>
            <Button variant="outline" style={{ width: '100%', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} onClick={() => window.open('https://www.google.com/search?q=Sky+Cafe+%26+Kitchen+Nagarbhavi+Bangalore#lrd=0x3bae3d00307f03f5:0x617ecb8b45905812,3,1', '_blank')}>
              ⭐️ Leave a Google Review
            </Button>
          </Card>

        </div>

        <Modal isOpen={isQuickActionModalOpen} onClose={() => setIsQuickActionModalOpen(false)} title={pendingAction === 'bill' ? "Request Bill" : "Call Waiter"}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
              {pendingAction === 'bill' 
                ? "We'll send a WhatsApp ping to our team so they can bring your check right over."
                : "We'll send a WhatsApp ping to our team so they can come right over."}
            </p>
            <Input 
              label="Your Name *" 
              placeholder="Your full name" 
              value={customerName || ''} 
              onChange={(e) => setCustomerName(e.target.value)} 
            />
            <Input 
              label="Table Number *" 
              placeholder="e.g. 12" 
              value={tableNumber || ''} 
              onChange={(e) => setTableNumber(e.target.value)} 
            />
            <Button variant="primary" style={{ marginTop: '8px' }} onClick={submitQuickActionModal}>
              {pendingAction === 'bill' ? "Request Bill Now" : "Ping Waiter Now"}
            </Button>
          </div>
        </Modal>
      </>
    );
  }

  if (mode === APP_MODES.DELIVERY) {
    return (
      <div style={{ padding: '16px', paddingBottom: '40px' }}>
        
        <RestaurantStatusBanner />

        {/* 1. Today's Special */}
        <SectionTitle title="Today's Special" />
        <SpecialBanner special={todaysSpecial} />

        {/* 2. Delivery Information */}
        <SectionTitle title="Delivery Information" />
        <Card style={{ 
          background: 'var(--surface-color)', 
          borderLeft: '4px solid var(--accent-color)',
          marginBottom: '24px' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>Swift & Safe</p>
              <h3 style={{ margin: '4px 0 0 0', fontSize: '16px' }}>Doorstep Delivery</h3>
            </div>
            <Button variant="outline" style={{ fontSize: '13px', padding: '8px 12px' }} onClick={() => setActivePage(APP_PAGES.INFO)}>
              How Delivery Works →
            </Button>
          </div>
        </Card>

        {/* 3. Popular Delivery Items */}
        <SectionTitle title="Popular Delivery Items" subtitle="Top favorites for delivery" />
        <Card style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
          {popularItems.slice(0, 3).map((item, index) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: index < 2 ? '1px solid var(--border-color)' : 'none' }}>
              <div>
                <span style={{ fontWeight: '500', display: 'block' }}>{item.title}</span>
                <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>₹{item.price.toFixed(2)}</span>
              </div>
              <Button variant="outline" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => addToCart(item)}>Add</Button>
            </div>
          ))}
        </Card>

        {/* 4. Combo Offers */}
        <SectionTitle title="Combo Offers" subtitle="Special value for you" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {promoCombos.map(combo => (
            <Card key={combo.id} style={{ background: 'var(--surface-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: '12px' }}>
                  <h3 style={{ margin: 0, marginBottom: '4px', fontSize: '16px' }}>{combo.title}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>{combo.description}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--accent-color)', display: 'block', marginBottom: '8px' }}>₹{combo.price.toFixed(2)}</span>
                  <Button variant="outline" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => addToCart(combo)}>Add</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 5. Full Delivery Menu Button */}
        <Button variant="primary" style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: '600', marginBottom: '24px' }} onClick={() => setActivePage(APP_PAGES.MENU)}>
          View Full Delivery Menu
        </Button>

      </div>
    );
  }

  if (mode === APP_MODES.NIGHT_LIFE) {
    return (
      <div style={{ padding: '0 16px' }}>
        <SectionTitle title="Sky Night Life" subtitle="Unforgettable evenings." />
        <Card style={{ background: 'linear-gradient(45deg, #2a0845, #6441A5)', border: 'none', marginBottom: '16px' }}>
           <h3 style={{ color: '#fff', marginBottom: '8px' }}>Friday Sufi Night</h3>
           <p style={{ color: '#ccc', fontSize: '14px' }}>Join us this weekend for an incredible live performance mapped perfectly under the stars.</p>
        </Card>
        <Button variant="primary" style={{ width: '100%', marginTop: '10px' }} onClick={() => setActivePage(APP_PAGES.BOOKINGS)}>
          See what's happening tonight
        </Button>
      </div>
    );
  }

  return null;
};
