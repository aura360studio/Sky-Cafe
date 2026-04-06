import { motion, AnimatePresence } from 'framer-motion';
import { useApp, APP_MODES, APP_PAGES } from '../../core/context/AppContext';

export const HamburgerMenu = () => {
  const { isHamburgerOpen, setIsHamburgerOpen, mode, setMode, activePage, setActivePage, customerName, tableNumber } = useApp();

  const handleNavigate = (page) => {
    setActivePage(page);
    setIsHamburgerOpen(false);
  };

  const menuSections = [
    {
      title: 'Current Session',
      condition: !!customerName,
      items: [
        { label: 'Name', sub: customerName || 'Guest User', icon: 'person' },
        { label: 'Table Number', sub: tableNumber || 'Not Set', icon: 'table_restaurant', condition: mode === APP_MODES.DINE_IN }
      ]
    },
    {
      title: 'Explore',
      items: [
        { label: 'Night Life', icon: 'celebration', page: APP_PAGES.HOME, newMode: APP_MODES.NIGHT_LIFE },
        { label: 'Events', icon: 'event', page: APP_PAGES.EVENTS },
        { label: 'Services', icon: 'layers', page: APP_PAGES.SERVICES },
        { label: 'Gallery', icon: 'collections', action: () => alert("Gallery coming soon!") },
      ]
    },
    {
      title: 'Support & Info',
      items: [
        { label: 'Location / Map', sub: 'Nagarbhavi, Bangalore', icon: 'location_on', action: () => window.open('https://maps.app.goo.gl/uP9pXJd2R6R2qG2e9', '_blank') },
        { label: 'Phone Number', sub: '+91 74111 6694', icon: 'call', action: () => window.open('tel:+917411116694') },
        { label: 'Email', sub: 'kidosokka@gmail.com', icon: 'email', action: () => window.open('mailto:kidosokka@gmail.com') },
        { label: 'About Sky', icon: 'info', page: APP_PAGES.INFO },
      ]
    }
  ];

  const getInitials = (name) => {
    if (!name) return 'SC';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <AnimatePresence>
      {isHamburgerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#000',
            zIndex: 1000,
            overflowY: 'auto',
            paddingBottom: '40px'
          }}
        >
          {/* Header Controls */}
          <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={() => setIsHamburgerOpen(false)}
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}
            >
              <span className="material-icons">arrow_back</span>
            </button>
          </div>

          {/* Profile Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#555', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: '28px', fontWeight: 'bold', color: '#fff', position: 'relative',
              marginBottom: '12px'
            }}>
              {getInitials(customerName)}
            </div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>{customerName || 'Sky Cafe'}</h2>
          </div>

          {/* Menu Sections (Cards) */}
          <div style={{ padding: '0 16px' }}>
            {menuSections.map((section, sIdx) => {
              if (section.condition === false) return null;

              return (
                <div key={sIdx} style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '8px', paddingLeft: '12px' }}>
                    {section.title}
                  </div>
                  <div style={{ 
                    backgroundColor: 'var(--surface-color)', 
                    borderRadius: '20px', 
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    {section.items.map((item, iIdx) => {
                      if (item.condition === false) return null;
                      return (
                        <button
                          key={iIdx}
                          onClick={() => {
                            if (item.newMode) setMode(item.newMode);
                            if (item.page) handleNavigate(item.page);
                            if (item.action) item.action();
                          }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '16px 20px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: iIdx < section.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                            textAlign: 'left',
                            cursor: 'pointer'
                          }}
                        >
                          <span className="material-icons" style={{ color: 'var(--text-secondary)', fontSize: '22px' }}>{item.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>{item.label}</div>
                            {item.sub && <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>{item.sub}</div>}
                          </div>
                          {item.action || item.page || item.newMode ? <span className="material-icons" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '18px' }}>chevron_right</span> : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Appearance / Switch Mode Cards */}
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '8px', paddingLeft: '12px' }}>
              Switch Experience
            </div>
            <div style={{ backgroundColor: 'var(--surface-color)', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
              <button
                onClick={() => { setMode(APP_MODES.DINE_IN); setIsHamburgerOpen(false); }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'left', cursor: 'pointer' }}
              >
                <span className="material-icons" style={{ color: mode === APP_MODES.DINE_IN ? 'var(--accent-color)' : 'var(--text-secondary)' }}>restaurant</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>Dine In</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Current Active Experience</div>
                </div>
              </button>
              <button
                onClick={() => { setMode(APP_MODES.DELIVERY); setIsHamburgerOpen(false); }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'left', cursor: 'pointer' }}
              >
                <span className="material-icons" style={{ color: mode === APP_MODES.DELIVERY ? 'var(--accent-color)' : 'var(--text-secondary)' }}>delivery_dining</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>Home Delivery</div>
                </div>
              </button>
              <button
                onClick={() => { setMode(APP_MODES.NIGHT_LIFE); setIsHamburgerOpen(false); }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }}
              >
                <span className="material-icons" style={{ color: mode === APP_MODES.NIGHT_LIFE ? 'var(--accent-color)' : 'var(--text-secondary)' }}>nightlife</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>Night Life</div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
