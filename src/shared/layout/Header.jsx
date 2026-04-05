import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useApp, APP_MODES } from '../../core/context/AppContext';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { getDineInItems, getDeliveryItems } from '../../services/menuService';
import { getTodaysSpecial, getPopularItems, getPromoCombos } from '../../services/specialsService';

export const Header = () => {
  const { mode, setMode, setIsHamburgerOpen, cartItems, removeFromCart } = useApp();
  const [pendingMode, setPendingMode] = useState(null);

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    if (newMode === mode) return;

    if (cartItems.length > 0) {
      setPendingMode(newMode);
    } else {
      setMode(newMode);
    }
  };

  const confirmModeChange = () => {
    let validItems = [];
    
    // Specials, Combos, and Popular items are available cross-mode in Home View
    const universalItems = [
      getTodaysSpecial(),
      ...getPopularItems(),
      ...getPromoCombos()
    ].filter(Boolean);

    if (pendingMode === APP_MODES.DINE_IN) {
      validItems = [...getDineInItems(), ...universalItems];
    } else if (pendingMode === APP_MODES.DELIVERY) {
      validItems = [...getDeliveryItems(), ...universalItems];
    }
    // Night Life has no menu, so validItems remains empty.

    const validIds = new Set(validItems.map(item => item.id));

    cartItems.forEach(cartItem => {
      if (!validIds.has(cartItem.id)) {
        removeFromCart(cartItem.cartItemId);
      }
    });

    setMode(pendingMode);
    setPendingMode(null);
  };

  const modeLabels = {
    [APP_MODES.DINE_IN]: "Dine In",
    [APP_MODES.DELIVERY]: "Delivery",
    [APP_MODES.NIGHT_LIFE]: "Night Life"
  };

  return (
    <>
      <header className="header" style={{ justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '18px', margin: 0, fontWeight: 700 }}>Sky Cafe</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <select 
                value={mode} 
                onChange={handleModeChange}
                style={{
                  background: 'var(--accent-color)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '6px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(16, 163, 127, 0.3)'
                }}
              >
                <option value={APP_MODES.DINE_IN}>Dine In ▼</option>
                <option value={APP_MODES.DELIVERY}>Delivery ▼</option>
                <option value={APP_MODES.NIGHT_LIFE}>Night Life ▼</option>
              </select>
            </motion.div>
          </AnimatePresence>
          <button 
            className="icon-btn" 
            onClick={() => setIsHamburgerOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      <Modal isOpen={!!pendingMode} onClose={() => setPendingMode(null)} title="Change Mode?">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            The {pendingMode && modeLabels[pendingMode]} menu has different items. 
            If you have added any items to your cart that are not available in {pendingMode && modeLabels[pendingMode]}, 
            they will be removed automatically. Do you want to proceed?
          </p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Button variant="outline" style={{ flex: 1 }} onClick={() => setPendingMode(null)}>
              Cancel
            </Button>
            <Button variant="primary" style={{ flex: 1 }} onClick={confirmModeChange}>
              Proceed
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
